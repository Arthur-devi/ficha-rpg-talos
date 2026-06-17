import { useState, useCallback } from 'react';
import itemsRaw from '../data/items_raw.json';
import { ORIGENS, getProfissaoData } from '../data/system';
import { ITEM_ATTRIBUTE_KEYS, aggregateItemEffects } from '../data/itemEffects';
import { getOriginEffects } from '../data/originEffects';

const CURRENT_RULES_VERSION = 2;
const DEFAULT_DESLOCAMENTO_BASE = 2;
const DEFAULT_LIMITE_CANSACO_BASE = 4;

const defaultCharacter = {
  // Identity
  name: '',
  player: '',
  nivel: 1,
  origem: '',
  shikata: '',
  subclasse: '',
  profissao: '',
  tendencia: '',
  deus: '',

  // Backstory
  tracos: '',
  ideais: '',
  vinculos: '',
  defeitos: '',
  vicios: '',

  // Attributes (base values set by player)
  attrs: {
    forca: 0,
    magia: 0,
    constituicao: 0,
    inteligencia: 0,
    percepcao: 0,
    destreza: 0,
    carisma: 0,
    defesa: 0,
    sorte: 0,
  },

  // HP
  hpMax: 12,
  hpAtual: 12,
  hpTemp: 0,
  hpLevelRolls: [],
  diceHistory: [],

  // CA
  caBase: 8,
  caBonus: 0,

  // Other derived
  deslocamento: 0,
  limiteCansaco: 0,
  cansacoAtual: 0,
  xp: 0,
  inspiracao: 0,
  talosRulesVersion: CURRENT_RULES_VERSION,

  // Perícias
  pericias: [],

  // Inventory
  inventario: [], // { itemId, qty, equipped, slot, notes }
  equippedSlots: {}, // slot -> itemId

  // Active states
  estados: [],

  // Class-specific trackers
  classResources: {
    bardo: {
      performance: 0,
      armasSonoras: 0,
      concertosSucesso: 0,
    },
    hemomante: {
      reservaSangue: 0,
    },
  },

  // Notes
  notas: '',
  moedas: { pc: 0, pp: 0, po: 0, pd: 0 },
};

export function useCharacter() {
  const [char, setChar] = useState(() => {
    try {
      const saved = localStorage.getItem('talos_char_draft');
      if (saved) {
        const normalized = normalizeCharacter(JSON.parse(saved));
        localStorage.setItem('talos_char_draft', JSON.stringify(normalized));
        return normalized;
      }
    } catch {
      // localStorage can be unavailable in restricted browser contexts.
    }
    return normalizeCharacter(defaultCharacter);
  });

  const update = useCallback((path, value) => {
    setChar(prev => {
      const next = deepSet({ ...prev }, path, value);
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {
        // Keep in-memory edits even when persistence is blocked.
      }
      return next;
    });
  }, []);

  const updateAttr = useCallback((attr, value) => {
    setChar(prev => {
      const next = { ...prev, attrs: { ...prev.attrs, [attr]: Number(value) || 0 } };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {
        // Keep in-memory edits even when persistence is blocked.
      }
      return next;
    });
  }, []);

  const exportChar = useCallback(() => {
    const blob = new Blob([JSON.stringify(char, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${char.name || 'personagem'}-talos.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [char]);

  const importChar = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const merged = normalizeCharacter(data);
        setChar(merged);
        localStorage.setItem('talos_char_draft', JSON.stringify(merged));
      } catch {
        alert('Arquivo inválido. Certifique-se de importar um arquivo de personagem TALOS.');
      }
    };
    reader.readAsText(file);
  }, []);

  const addInventoryItem = useCallback((item) => {
    setChar(prev => {
      const exists = prev.inventario.find(i => i.itemId === item.id);
      let newInv;
      if (exists) {
        newInv = prev.inventario.map(i => i.itemId === item.id ? { ...i, qty: i.qty + 1 } : i);
      } else {
        newInv = [...prev.inventario, { itemId: item.id, qty: 1, equipped: false, slot: null, notes: '' }];
      }
      const next = { ...prev, inventario: newInv };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {
        // Keep in-memory edits even when persistence is blocked.
      }
      return next;
    });
  }, []);

  const removeInventoryItem = useCallback((itemId) => {
    setChar(prev => {
      const next = { ...prev, inventario: prev.inventario.filter(i => i.itemId !== itemId) };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {
        // Keep in-memory edits even when persistence is blocked.
      }
      return next;
    });
  }, []);

  const equipItem = useCallback((itemId, slot) => {
    setChar(prev => {
      const newSlots = { ...prev.equippedSlots };
      // Unequip from previous slot and replace any item already in the target slot.
      Object.keys(newSlots).forEach(s => { if (newSlots[s] === itemId) delete newSlots[s]; });
      if (slot) {
        Object.keys(newSlots).forEach(s => { if (s === slot) delete newSlots[s]; });
      }
      if (slot) newSlots[slot] = itemId;
      const newInv = prev.inventario.map(i =>
        i.itemId === itemId
          ? { ...i, equipped: !!slot, slot }
          : slot && i.slot === slot
            ? { ...i, equipped: false, slot: null }
            : i
      );
      const next = { ...prev, equippedSlots: newSlots, inventario: newInv };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {
        // Keep in-memory edits even when persistence is blocked.
      }
      return next;
    });
  }, []);

  const toggleEstado = useCallback((estadoId) => {
    setChar(prev => {
      const has = prev.estados.includes(estadoId);
      const next = { ...prev, estados: has ? prev.estados.filter(e => e !== estadoId) : [...prev.estados, estadoId] };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {
        // Keep in-memory edits even when persistence is blocked.
      }
      return next;
    });
  }, []);

  const togglePericia = useCallback((pericia) => {
    setChar(prev => {
      const periciasProfissao = getProfissaoData(prev.profissao)?.pericias || [];
      if (periciasProfissao.includes(pericia)) return prev;
      const has = prev.pericias.includes(pericia);
      const next = { ...prev, pericias: has ? prev.pericias.filter(p => p !== pericia) : [...prev.pericias, pericia] };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {
        // Keep in-memory edits even when persistence is blocked.
      }
      return next;
    });
  }, []);

  // Derived stats
  const getMod = (attrVal) => Math.floor(attrVal / 2);

  const equippedItems = Object.values(char.equippedSlots || {})
    .map(itemId => itemsRaw.find(item => item.id === itemId))
    .filter(Boolean);
  const itemEffects = aggregateItemEffects(equippedItems);
  const originData = ORIGENS.find(origin => origin.id === char.origem);
  const originEffects = getOriginEffects(originData);
  const classAttrBonuses = Object.fromEntries(ITEM_ATTRIBUTE_KEYS.map(key => [key, 0]));
  if (char.shikata === 'hemomante') {
    const maxReservaSangue = Math.max(0, (Number(char.nivel) || 1) * 4);
    const reservaSangue = Math.min(maxReservaSangue, Number(char.classResources?.hemomante?.reservaSangue) || 0);
    classAttrBonuses.defesa += Math.floor(reservaSangue / 2);
  }

  const attrsTotal = Object.fromEntries(
    ITEM_ATTRIBUTE_KEYS.map(key => [
      key,
      (char.attrs[key] || 0) + (originEffects.attrs[key] || 0) + (itemEffects.attrs[key] || 0) + (classAttrBonuses[key] || 0),
    ])
  );

  // Total magia = base + bônus de itens + INT÷2 (conversão automática do sistema)
  const magiaFromInt = Math.floor(attrsTotal.inteligencia / 2);
  const magiaTotal = attrsTotal.magia + magiaFromInt;

  const deslocamentoBonus = Math.floor(attrsTotal.destreza / 5);
  const limiteCansacoBonus = Math.floor(attrsTotal.constituicao / 2);
  const originDeslocamentoBase = originData ? originEffects.deslocamentoBase : DEFAULT_DESLOCAMENTO_BASE;
  const originLimiteCansacoBase = originData ? originEffects.limiteCansacoBase : DEFAULT_LIMITE_CANSACO_BASE;
  const manualDeslocamento = Number(char.deslocamento) || 0;
  const manualLimiteCansaco = Number(char.limiteCansaco) || 0;
  const maxHpLevelRolls = Math.max(0, (Number(char.nivel) || 1) - 1);
  const activeHpLevelRolls = Array.isArray(char.hpLevelRolls)
    ? char.hpLevelRolls
      .filter(roll => roll.shikataId === char.shikata)
      .slice(0, maxHpLevelRolls)
    : [];
  const hpLevelRollBonus = activeHpLevelRolls.reduce((sum, roll) => sum + (Number(roll.total) || 0), 0);
  const hpBase = 12 + getMod(attrsTotal.constituicao) + originEffects.hpMax + itemEffects.hpMax;
  const hpMaxTotal = Math.max(1, (Number(char.hpMax) || 0) + hpLevelRollBonus);

  const derived = {
    modForca: getMod(attrsTotal.forca),
    modMagia: getMod(magiaTotal),   // modificador usa magia total (com bônus INT)
    modCon: getMod(attrsTotal.constituicao),
    modInt: getMod(attrsTotal.inteligencia),
    modPer: getMod(attrsTotal.percepcao),
    modDes: getMod(attrsTotal.destreza),
    modCar: getMod(attrsTotal.carisma),
    modDef: getMod(attrsTotal.defesa),
    modSor: getMod(attrsTotal.sorte),
    attrsTotal,
    originEffects,
    originAttrBonuses: originEffects.attrs,
    classAttrBonuses,
    caOriginBonus: originEffects.ca,
    hpOriginBonus: originEffects.hpMax,
    itemEffects,
    itemAttrBonuses: itemEffects.attrs,
    caItemBonus: itemEffects.ca,
    hpItemBonus: itemEffects.hpMax,
    deslocamentoItemBonus: itemEffects.deslocamento,
    originDeslocamentoBase,
    originLimiteCansacoBase,
    manualDeslocamento,
    manualLimiteCansaco,
    activeHpLevelRolls,
    hpLevelRollBonus,
    hpMaxTotal,
    // Int -> Magia bonus: 2 INT = 1 Magia
    magiaFromInt,
    magiaTotal,
    // Destreza -> Deslocamento: 5 DES = +1
    deslocamentoBonus,
    deslocamentoTotal: originDeslocamentoBase + manualDeslocamento + deslocamentoBonus + itemEffects.deslocamento,
    // CON -> Limite Cansaço: 2 CON = +1
    limiteCansacoBonus,
    limiteCansacoTotal: originLimiteCansacoBase + manualLimiteCansaco + limiteCansacoBonus,
    // CA = 8 + mod DES (limit 4) + mod CON (limit 4)
    caTotal: 8 + Math.min(getMod(attrsTotal.destreza), 4) + Math.min(getMod(attrsTotal.constituicao), 4) + (Number(char.caBonus) || 0) + originEffects.ca + itemEffects.ca,
    // HP base = 12 + mod CON
    hpBase,
  };

  return { char, update, updateAttr, exportChar, importChar, addInventoryItem, removeInventoryItem, equipItem, toggleEstado, togglePericia, derived };
}

function normalizeCharacter(data = {}) {
  const merged = {
    ...defaultCharacter,
    ...data,
    attrs: { ...defaultCharacter.attrs, ...(data.attrs || {}) },
    moedas: { ...defaultCharacter.moedas, ...(data.moedas || {}) },
    hpLevelRolls: Array.isArray(data.hpLevelRolls) ? data.hpLevelRolls : [],
    diceHistory: Array.isArray(data.diceHistory) ? data.diceHistory : [],
    classResources: {
      ...defaultCharacter.classResources,
      ...(data.classResources || {}),
      bardo: {
        ...defaultCharacter.classResources.bardo,
        ...(data.classResources?.bardo || {}),
      },
      hemomante: {
        ...defaultCharacter.classResources.hemomante,
        ...(data.classResources?.hemomante || {}),
      },
    },
  };

  if ((data.talosRulesVersion || 0) < CURRENT_RULES_VERSION) {
    const originData = ORIGENS.find(origin => origin.id === merged.origem);
    const movementBase = originData?.deslocamento ?? DEFAULT_DESLOCAMENTO_BASE;
    const fatigueBase = originData?.limiteCansaco ?? DEFAULT_LIMITE_CANSACO_BASE;

    merged.deslocamento = Math.max(0, (Number(merged.deslocamento) || 0) - movementBase);
    merged.limiteCansaco = Math.max(0, (Number(merged.limiteCansaco) || 0) - fatigueBase);
    merged.talosRulesVersion = CURRENT_RULES_VERSION;
  }

  for (const legacyField of ['ma' + 'naMax', 'ma' + 'naAtual']) {
    delete merged[legacyField];
  }

  for (const legacyHemomanteResource of ['pontosAcumulo', 'curasAcumuladas', 'litrosSangue']) {
    delete merged.classResources.hemomante[legacyHemomanteResource];
  }

  if (merged.shikata === 'bardo') {
    const legacyBardoSubclasses = {
      'Artista (Ofensivo)': 'Artista',
      'Poeta (Defensivo)': 'Poeta',
    };
    merged.subclasse = legacyBardoSubclasses[merged.subclasse] || merged.subclasse;
  }

  if (Array.isArray(merged.habilidadesMagicas)) {
    merged.habilidadesMagicas = merged.habilidadesMagicas.map(habilidade => {
      const cleaned = { ...habilidade };
      delete cleaned.custo;
      return cleaned;
    });
  }

  return merged;
}

function deepSet(obj, path, value) {
  if (typeof path === 'string') {
    const parts = path.split('.');
    if (parts.length === 1) return { ...obj, [path]: value };
    const [head, ...rest] = parts;
    return { ...obj, [head]: deepSet(obj[head] || {}, rest.join('.'), value) };
  }
  return obj;
}
