import { useState, useCallback } from 'react';
import itemsRaw from '../data/items_raw.json';
import { ORIGENS, SHIKATAS, getProfissaoData } from '../data/system';
import { ITEM_ATTRIBUTE_KEYS, aggregateItemEffects } from '../data/itemEffects';
import { getOriginEffects } from '../data/originEffects';
import { getAbilityAvailability, getAbilityRuntimeSpec, rollCost } from '../data/abilityRuntime';
import { adjustActionState, advanceTurnActionState, applyAbilityActionEffect, canSpendAction, getTurnEconomySnapshot, spendActionState } from '../data/turnRuntime';

const CURRENT_RULES_VERSION = 7;
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
  hpManualBonus: 0,
  hpAtual: 12,
  hpTemp: 0,
  hpLevelRolls: [],
  diceHistory: [],

  // Level progression
  pontosDistributivos: 0,
  pontosDistribuidosNivel: {
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
  levelUpHistory: [],

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
  customItems: [], // itens criados manualmente pelo jogador
  equippedSlots: {}, // slot -> itemId

  // Active states
  estados: [],

  // Class-specific trackers
  officialAbilityUsage: {},
  abilityTimeline: {
    turn: 1,
    combat: 1,
    day: 1,
    week: 1,
    month: 1,
  },
  turnEconomy: {
    fullSpent: 0,
    bonusSpent: 0,
    manualFullAdjustment: 0,
    manualBonusAdjustment: 0,
    temporaryEffects: [],
    reactionUses: [],
  },

  classResources: {
    bardo: {
      performance: 0,
      armasSonoras: 0,
      concertosSucesso: 0,
    },
    hemomante: {
      reservaSangue: 0,
      aprimoramentosUsadosTurno: 0,
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

  const levelUp = useCallback(() => {
    const currentLevel = Math.max(1, Number(char.nivel) || 1);
    if (!char.shikata) {
      return { ok: false, message: 'Selecione uma Shikata antes de subir de nível.' };
    }
    if (currentLevel >= 30) {
      return { ok: false, message: 'O nível máximo configurado na ficha é 30.' };
    }

    const nextLevel = currentLevel + 1;
    const entry = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      createdAt: new Date().toISOString(),
      fromLevel: currentLevel,
      toLevel: nextLevel,
      shikataId: char.shikata,
      pontosConcedidos: 2,
    };

    setChar(prev => {
      const next = {
        ...prev,
        nivel: nextLevel,
        pontosDistributivos: (Number(prev.pontosDistributivos) || 0) + 2,
        levelUpHistory: [...(prev.levelUpHistory || []), entry],
      };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {
        // Keep in-memory edits even when persistence is blocked.
      }
      return next;
    });

    return { ok: true, nextLevel, pontosConcedidos: 2 };
  }, [char.nivel, char.shikata]);

  const spendAttributePoint = useCallback((attr) => {
    if (!ITEM_ATTRIBUTE_KEYS.includes(attr)) return;
    setChar(prev => {
      const available = Number(prev.pontosDistributivos) || 0;
      if (available <= 0) return prev;

      const next = {
        ...prev,
        pontosDistributivos: available - 1,
        attrs: {
          ...prev.attrs,
          [attr]: (Number(prev.attrs?.[attr]) || 0) + 1,
        },
        pontosDistribuidosNivel: {
          ...defaultCharacter.pontosDistribuidosNivel,
          ...(prev.pontosDistribuidosNivel || {}),
          [attr]: (Number(prev.pontosDistribuidosNivel?.[attr]) || 0) + 1,
        },
      };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {
        // Keep in-memory edits even when persistence is blocked.
      }
      return next;
    });
  }, []);

  const refundAttributePoint = useCallback((attr) => {
    if (!ITEM_ATTRIBUTE_KEYS.includes(attr)) return;
    setChar(prev => {
      const allocated = Number(prev.pontosDistribuidosNivel?.[attr]) || 0;
      if (allocated <= 0) return prev;

      const next = {
        ...prev,
        pontosDistributivos: (Number(prev.pontosDistributivos) || 0) + 1,
        attrs: {
          ...prev.attrs,
          [attr]: (Number(prev.attrs?.[attr]) || 0) - 1,
        },
        pontosDistribuidosNivel: {
          ...defaultCharacter.pontosDistribuidosNivel,
          ...(prev.pontosDistribuidosNivel || {}),
          [attr]: allocated - 1,
        },
      };
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

  const addCustomInventoryItem = useCallback((itemData) => {
    setChar(prev => {
      const id = `custom-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const customItem = {
        ...itemData,
        id,
        isCustom: true,
        source: 'manual',
      };
      const next = {
        ...prev,
        customItems: [...(prev.customItems || []), customItem],
        inventario: [...prev.inventario, { itemId: id, qty: 1, equipped: false, slot: null, notes: '' }],
      };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {
        // Keep in-memory edits even when persistence is blocked.
      }
      return next;
    });
  }, []);

  const updateCustomInventoryItem = useCallback((itemId, itemData) => {
    setChar(prev => {
      const next = {
        ...prev,
        customItems: (prev.customItems || []).map(item => item.id === itemId ? { ...item, ...itemData, id: item.id, isCustom: true, source: 'manual' } : item),
      };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {
        // Keep in-memory edits even when persistence is blocked.
      }
      return next;
    });
  }, []);

  const removeInventoryItem = useCallback((itemId) => {
    setChar(prev => {
      const nextSlots = { ...prev.equippedSlots };
      Object.keys(nextSlots).forEach(slot => {
        if (nextSlots[slot] === itemId) delete nextSlots[slot];
      });
      const next = {
        ...prev,
        inventario: prev.inventario.filter(i => i.itemId !== itemId),
        customItems: (prev.customItems || []).filter(item => item.id !== itemId),
        equippedSlots: nextSlots,
      };
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

  const allItems = [...itemsRaw, ...(char.customItems || [])];
  const equippedItems = Object.values(char.equippedSlots || {})
    .map(itemId => allItems.find(item => item.id === itemId))
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
  const limiteCansacoTotal = Math.max(0, originLimiteCansacoBase + manualLimiteCansaco + limiteCansacoBonus);
  const cansacoAtual = Math.max(0, Math.min(limiteCansacoTotal, Number(char.cansacoAtual) || 0));
  const cansadoPorCansaco = limiteCansacoTotal > 0 && cansacoAtual >= limiteCansacoTotal;
  const isCansado = cansadoPorCansaco || (char.estados || []).includes('cansado');

  const shikataData = SHIKATAS.find(shikata => shikata.id === char.shikata);
  const modifierValues = {
    forca: getMod(attrsTotal.forca),
    magia: getMod(magiaTotal),
    constituicao: getMod(attrsTotal.constituicao),
    inteligencia: getMod(attrsTotal.inteligencia),
    percepcao: getMod(attrsTotal.percepcao),
    destreza: getMod(attrsTotal.destreza),
    carisma: getMod(attrsTotal.carisma),
    defesa: getMod(attrsTotal.defesa),
    sorte: getMod(attrsTotal.sorte),
  };
  const attackModifierOptions = buildAttackModifierOptions(shikataData, modifierValues);
  const turnEconomy = getTurnEconomySnapshot(char);

  const maxHpLevelRolls = Math.max(0, (Number(char.nivel) || 1) - 1);
  const activeHpLevelRolls = Array.isArray(char.hpLevelRolls)
    ? char.hpLevelRolls
      .filter(roll => roll.shikataId === char.shikata)
      .slice(0, maxHpLevelRolls)
    : [];
  const hpLevelRollBonus = activeHpLevelRolls.reduce((sum, roll) => sum + (Number(roll.total) || 0), 0);
  const hpBase = 12 + getMod(attrsTotal.constituicao) + originEffects.hpMax + itemEffects.hpMax;
  const hpManualBonus = Number(char.hpManualBonus) || 0;
  const hpMaxTotal = Math.max(1, hpBase + hpManualBonus + hpLevelRollBonus);

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
    hpManualBonus,
    hpMaxTotal,
    // Int -> Magia bonus: 2 INT = 1 Magia
    magiaFromInt,
    magiaTotal,
    // Destreza -> Deslocamento: 5 DES = +1
    deslocamentoBonus,
    deslocamentoTotal: originDeslocamentoBase + manualDeslocamento + deslocamentoBonus + itemEffects.deslocamento,
    // CON -> Limite Cansaço: 2 CON = +1
    limiteCansacoBonus,
    limiteCansacoTotal,
    cansacoAtual,
    cansacoRestante: Math.max(0, limiteCansacoTotal - cansacoAtual),
    cansacoPercentual: limiteCansacoTotal > 0 ? Math.min(100, (cansacoAtual / limiteCansacoTotal) * 100) : 0,
    isCansado,
    cansadoPorCansaco,
    attackModifierOptions,
    classAttackBonusActive: !isCansado,
    turnEconomy,
    // CA = 8 + mod DES (limit 4) + mod CON (limit 4)
    caTotal: 8 + Math.min(getMod(attrsTotal.destreza), 4) + Math.min(getMod(attrsTotal.constituicao), 4) + (Number(char.caBonus) || 0) + originEffects.ca + itemEffects.ca,
    // HP base = 12 + mod CON
    hpBase,
  };

  const setCansaco = useCallback((value) => {
    const limit = Math.max(0, Number(limiteCansacoTotal) || 0);
    const nextValue = Math.max(0, Math.min(limit, Number(value) || 0));
    setChar(prev => {
      const estados = Array.isArray(prev.estados) ? prev.estados.filter(estado => estado !== 'cansado') : [];
      if (limit > 0 && nextValue >= limit) estados.push('cansado');
      const next = { ...prev, cansacoAtual: nextValue, estados };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {
        // Keep in-memory edits even when persistence is blocked.
      }
      return next;
    });
  }, [limiteCansacoTotal]);

  const registerAbilityUse = useCallback(() => {
    const limit = Math.max(0, Number(limiteCansacoTotal) || 0);
    setChar(prev => {
      const current = Math.max(0, Number(prev.cansacoAtual) || 0);
      const nextValue = limit > 0 ? Math.min(limit, current + 1) : 0;
      const estados = Array.isArray(prev.estados) ? prev.estados.filter(estado => estado !== 'cansado') : [];
      if (limit > 0 && nextValue >= limit) estados.push('cansado');
      const next = { ...prev, cansacoAtual: nextValue, estados };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {
        // Keep in-memory edits even when persistence is blocked.
      }
      return next;
    });
  }, [limiteCansacoTotal]);

  const useOfficialAbility = useCallback((ability, options = {}) => {
    if (!ability || !char.shikata) return { ok: false, message: 'Habilidade inválida.' };

    const spec = getAbilityRuntimeSpec(char.shikata, ability, char.nivel, char.subclasse);
    if (!spec.trackable) return { ok: false, message: 'Habilidades passivas não consomem uso.' };

    const actionOptions = spec.actionSpec?.options || [{ type: 'full', cost: 1, label: 'Ação completa' }];
    const selectedAction = actionOptions.find(option => option.type === options.actionMode)
      || actionOptions.find(option => option.type === spec.actionSpec?.defaultMode)
      || actionOptions[0];
    const actionAvailability = canSpendAction(char, selectedAction);
    if (!actionAvailability.ok) return actionAvailability;
    const actionBefore = getTurnEconomySnapshot(char);

    const record = char.officialAbilityUsage?.[spec.key] || {};
    const resources = {
      performance: char.classResources?.bardo?.performance || 0,
      ml: char.classResources?.hemomante?.reservaSangue || 0,
    };
    const availability = getAbilityAvailability(spec, record, char.abilityTimeline, resources);
    const useMlEnhancement = !!options.useMlEnhancement && spec.optionalMlCost > 0;
    const enhancementLimit = Number(char.nivel) >= 20 ? 4 : Number(char.nivel) >= 14 ? 3 : Number(char.nivel) >= 5 ? 2 : 1;
    const enhancementsUsed = Math.max(0, Number(char.classResources?.hemomante?.aprimoramentosUsadosTurno) || 0);
    const canBypassUseLimitWithMl = useMlEnhancement && spec.mlAllowsExtraUse && resources.ml >= spec.optionalMlCost && enhancementsUsed < enhancementLimit;

    if (!availability.available && !(availability.blockedByUses && canBypassUseLimitWithMl && !availability.blockedByLifetime && !availability.blockedByCooldown && !availability.blockedByPerformance)) {
      if (availability.blockedByLifetime) return { ok: false, message: 'O limite de usos em vida desta habilidade já foi atingido.' };
      if (availability.blockedByCooldown) return { ok: false, message: `Habilidade em recarga: faltam ${availability.cooldownRemaining} ${spec.cooldown?.unit === 'day' ? 'dia(s)' : 'turno(s)'}.` };
      if (availability.blockedByUses) return { ok: false, message: `Sem usos restantes até o próximo ${spec.resetLabel || 'reset'}.` };
      if (availability.blockedByPerformance) return { ok: false, message: `Performance insuficiente. Necessário: ${spec.performanceCost}.` };
      return { ok: false, message: 'A habilidade não está disponível agora.' };
    }

    const target = String(options.target || '').trim();
    const normalizedTarget = target.toLocaleLowerCase('pt-BR');
    if (spec.targetRule) {
      if (!target) return { ok: false, message: `Informe o ${spec.targetRule.label} antes de usar esta habilidade.` };
      const usedTargets = Array.isArray(record.targets) ? record.targets : [];
      if (usedTargets.some(entry => entry.normalized === normalizedTarget)) {
        return { ok: false, message: `Esta habilidade já foi usada neste ${spec.targetRule.label}: ${target}.` };
      }
    }

    const rawHpCost = rollCost(spec.hpCost);
    const hpCost = rawHpCost * (Number(spec.lifeCostMultiplier) || 1);
    if (hpCost > 0 && (Number(char.hpAtual) || 0) < hpCost) {
      return { ok: false, message: `HP insuficiente para pagar o custo de ${hpCost} HP.` };
    }

    if (useMlEnhancement && resources.ml < spec.optionalMlCost) {
      return { ok: false, message: `Reserva de sangue insuficiente. O aprimoramento exige ${spec.optionalMlCost} ML.` };
    }
    if (useMlEnhancement && enhancementsUsed >= enhancementLimit) {
      return { ok: false, message: `Limite de aprimoramentos por turno atingido (${enhancementLimit}). Avance o turno para recuperar.` };
    }

    const limit = Math.max(0, Number(limiteCansacoTotal) || 0);
    const timeline = char.abilityTimeline || defaultCharacter.abilityTimeline;
    const now = new Date().toISOString();

    setChar(prev => {
      const currentRecord = prev.officialAbilityUsage?.[spec.key] || {};
      const nextTargets = Array.isArray(currentRecord.targets) ? [...currentRecord.targets] : [];
      if (spec.targetRule && target) nextTargets.push({ label: target, normalized: normalizedTarget, usedAt: now });

      const nextRecord = {
        ...currentRecord,
        used: (Number(currentRecord.used) || 0) + 1,
        lifetimeUsed: (Number(currentRecord.lifetimeUsed) || 0) + 1,
        resetType: spec.resetType || null,
        targetResetType: spec.targetRule?.resetType || null,
        targets: nextTargets,
        lastUsedAt: now,
      };
      if (spec.cooldown?.unit === 'turn') nextRecord.lastUsedTurn = Number(timeline.turn) || 1;
      if (spec.cooldown?.unit === 'day') nextRecord.lastUsedDay = Number(timeline.day) || 1;

      const currentFatigue = Math.max(0, Number(prev.cansacoAtual) || 0);
      const nextFatigue = limit > 0 ? Math.min(limit, currentFatigue + 1) : 0;
      const estados = Array.isArray(prev.estados) ? prev.estados.filter(estado => estado !== 'cansado') : [];
      if (limit > 0 && nextFatigue >= limit) estados.push('cansado');

      let nextTurnEconomy = spendActionState(prev.turnEconomy, selectedAction, ability.nome);
      const actionEffectResult = applyAbilityActionEffect(nextTurnEconomy, prev.shikata, ability, prev.nivel);
      nextTurnEconomy = actionEffectResult.turnEconomy;

      const next = {
        ...prev,
        hpAtual: Math.max(0, (Number(prev.hpAtual) || 0) - hpCost),
        cansacoAtual: nextFatigue,
        estados,
        turnEconomy: nextTurnEconomy,
        officialAbilityUsage: {
          ...(prev.officialAbilityUsage || {}),
          [spec.key]: nextRecord,
        },
        classResources: {
          ...prev.classResources,
          bardo: {
            ...defaultCharacter.classResources.bardo,
            ...(prev.classResources?.bardo || {}),
            performance: Math.max(0, (Number(prev.classResources?.bardo?.performance) || 0) - spec.performanceCost),
          },
          hemomante: {
            ...defaultCharacter.classResources.hemomante,
            ...(prev.classResources?.hemomante || {}),
            reservaSangue: Math.max(0, (Number(prev.classResources?.hemomante?.reservaSangue) || 0) - (useMlEnhancement ? spec.optionalMlCost : 0)),
            aprimoramentosUsadosTurno: useMlEnhancement
              ? (Number(prev.classResources?.hemomante?.aprimoramentosUsadosTurno) || 0) + 1
              : (Number(prev.classResources?.hemomante?.aprimoramentosUsadosTurno) || 0),
          },
        },
      };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {
        // Keep in-memory edits even when persistence is blocked.
      }
      return next;
    });

    return {
      ok: true,
      spec,
      hpCost,
      hpCostRolled: spec.hpCost?.kind === 'dice' ? rawHpCost : null,
      performanceCost: spec.performanceCost,
      mlCost: useMlEnhancement ? spec.optionalMlCost : 0,
      essenceCost: spec.essenceCost,
      target: target || null,
      action: selectedAction,
      actionBefore,
      actionAfter: (() => {
        const simulated = { ...char, turnEconomy: spendActionState(char.turnEconomy, selectedAction, ability.nome) };
        const effected = applyAbilityActionEffect(simulated.turnEconomy, char.shikata, ability, char.nivel);
        return getTurnEconomySnapshot({ ...simulated, turnEconomy: effected.turnEconomy });
      })(),
      actionEffect: applyAbilityActionEffect(spendActionState(char.turnEconomy, selectedAction, ability.nome), char.shikata, ability, char.nivel).effect,
      message: `${ability.nome} utilizada.`,
    };
  }, [char, limiteCansacoTotal]);

  const resetOfficialAbilityUse = useCallback((abilityKey, options = {}) => {
    setChar(prev => {
      const record = prev.officialAbilityUsage?.[abilityKey];
      if (!record) return prev;
      const nextRecord = {
        ...record,
        used: 0,
        targets: [],
        lastUsedTurn: null,
        lastUsedDay: null,
      };
      if (options.resetLifetime) nextRecord.lifetimeUsed = 0;
      const next = {
        ...prev,
        officialAbilityUsage: { ...(prev.officialAbilityUsage || {}), [abilityKey]: nextRecord },
      };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {
        // Keep in-memory edits even when persistence is blocked.
      }
      return next;
    });
  }, []);

  const advanceAbilityPeriod = useCallback((period) => {
    const valid = ['turn', 'combat', 'day', 'week', 'month'];
    if (!valid.includes(period)) return;

    setChar(prev => {
      const timeline = { ...defaultCharacter.abilityTimeline, ...(prev.abilityTimeline || {}) };
      if (period === 'combat') {
        timeline.combat = (Number(timeline.combat) || 1) + 1;
        timeline.turn = 1;
      } else {
        timeline[period] = (Number(timeline[period]) || 1) + 1;
      }

      const periodsToReset = period === 'combat' ? new Set(['combat', 'turn']) : new Set([period]);
      const nextUsage = Object.fromEntries(Object.entries(prev.officialAbilityUsage || {}).map(([key, record]) => {
        const shouldResetUses = periodsToReset.has(record.resetType);
        const shouldResetTargets = periodsToReset.has(record.targetResetType);
        const nextRecord = { ...record };
        if (shouldResetUses) nextRecord.used = 0;
        if (shouldResetTargets) nextRecord.targets = [];
        if (period === 'combat') nextRecord.lastUsedTurn = null;
        return [key, nextRecord];
      }));

      const nextClassResources = { ...prev.classResources };
      if (period === 'turn' || period === 'combat') {
        nextClassResources.hemomante = {
          ...defaultCharacter.classResources.hemomante,
          ...(prev.classResources?.hemomante || {}),
          aprimoramentosUsadosTurno: 0,
        };
      }
      const nextTurnEconomy = advanceTurnActionState(prev.turnEconomy, period);
      const next = { ...prev, abilityTimeline: timeline, officialAbilityUsage: nextUsage, classResources: nextClassResources, turnEconomy: nextTurnEconomy };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {
        // Keep in-memory edits even when persistence is blocked.
      }
      return next;
    });
  }, []);

  const spendTurnAction = useCallback((type, cost = 1, label = 'Ação manual') => {
    const option = { type, cost: Math.max(0, Number(cost) || 0), label };
    const availability = canSpendAction(char, option);
    if (!availability.ok) return availability;
    const before = getTurnEconomySnapshot(char);
    const previewTurnEconomy = spendActionState(char.turnEconomy, option, label);
    const after = getTurnEconomySnapshot({ ...char, turnEconomy: previewTurnEconomy });
    setChar(prev => {
      const nextTurnEconomy = spendActionState(prev.turnEconomy, option, label);
      const next = { ...prev, turnEconomy: nextTurnEconomy };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {
        // Keep in-memory edits even when persistence is blocked.
      }
      return next;
    });
    return { ok: true, action: option, before, after, message: `${label} registrada.` };
  }, [char]);

  const adjustTurnActions = useCallback((type, delta) => {
    setChar(prev => {
      const next = { ...prev, turnEconomy: adjustActionState(prev.turnEconomy, type, delta) };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {
        // Keep in-memory edits even when persistence is blocked.
      }
      return next;
    });
  }, []);

  const performRest = useCallback((type) => {
    const hpMax = Math.max(1, Number(hpMaxTotal) || 1);
    const startHp = Math.max(0, Math.min(hpMax, Number(char.hpAtual) || 0));
    const shortHeal = Math.max(0, Math.floor(hpMax * 0.2));
    const endHp = type === 'long' ? hpMax : Math.min(hpMax, startHp + shortHeal);
    const recovered = Math.max(0, endHp - startHp);

    setChar(prev => {
      const resetPeriods = type === 'long' ? new Set(['short', 'long']) : new Set(['short']);
      const officialAbilityUsage = Object.fromEntries(Object.entries(prev.officialAbilityUsage || {}).map(([key, record]) => {
        const nextRecord = { ...record };
        if (resetPeriods.has(record.resetType)) nextRecord.used = 0;
        if (resetPeriods.has(record.targetResetType)) nextRecord.targets = [];
        return [key, nextRecord];
      }));

      const next = {
        ...prev,
        hpAtual: endHp,
        cansacoAtual: 0,
        estados: (prev.estados || []).filter(estado => estado !== 'cansado'),
        officialAbilityUsage,
        classResources: {
          ...prev.classResources,
          hemomante: {
            ...defaultCharacter.classResources.hemomante,
            ...(prev.classResources?.hemomante || {}),
            aprimoramentosUsadosTurno: 0,
          },
        },
      };

      if (type === 'long' && Array.isArray(prev.habilidadesMagicas)) {
        next.habilidadesMagicas = prev.habilidadesMagicas.map(habilidade => ({ ...habilidade, usos: 0 }));
      }

      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {
        // Keep in-memory edits even when persistence is blocked.
      }
      return next;
    });

    return {
      type,
      startHp,
      endHp,
      recovered,
      hpMax,
      fatigueRecovered: Math.max(0, Number(char.cansacoAtual) || 0),
    };
  }, [char.cansacoAtual, char.hpAtual, hpMaxTotal]);

  return {
    char,
    update,
    updateAttr,
    levelUp,
    spendAttributePoint,
    refundAttributePoint,
    setCansaco,
    registerAbilityUse,
    useOfficialAbility,
    resetOfficialAbilityUse,
    advanceAbilityPeriod,
    spendTurnAction,
    adjustTurnActions,
    performRest,
    exportChar,
    importChar,
    addInventoryItem,
    addCustomInventoryItem,
    updateCustomInventoryItem,
    removeInventoryItem,
    equipItem,
    toggleEstado,
    togglePericia,
    derived,
  };
}

const ATTRIBUTE_LABEL_TO_KEY = {
  'força': 'forca',
  'magia': 'magia',
  'constituição': 'constituicao',
  'inteligência': 'inteligencia',
  'percepção': 'percepcao',
  'destreza': 'destreza',
  'carisma': 'carisma',
  'defesa': 'defesa',
  'sorte': 'sorte',
};

function buildAttackModifierOptions(shikataData, modifierValues) {
  const raw = shikataData?.modificador?.trim();
  if (!raw) return [];

  const normalizeLabel = label => label.trim();
  const optionFromLabel = label => {
    const normalized = normalizeLabel(label);
    const key = ATTRIBUTE_LABEL_TO_KEY[normalized.toLocaleLowerCase('pt-BR')];
    if (!key) return null;
    return { key, label: normalized, modifier: Number(modifierValues[key]) || 0 };
  };

  // "X ou Y" and comma-separated modifiers represent alternatives in the class header.
  if (/\bou\b/i.test(raw) || raw.includes(',')) {
    return raw
      .replace(/\bou\b/gi, ',')
      .split(',')
      .map(optionFromLabel)
      .filter(Boolean);
  }

  // Lanceiro is written as "Força e Destreza" in the TALOS v6 header, but the
  // document excerpt does not define whether both modifiers are summed or chosen.
  // Expose both options instead of silently inventing a combined rule.
  if (/\be\b/i.test(raw)) {
    const parts = raw.split(/\be\b/i).map(optionFromLabel).filter(Boolean);
    if (parts.length > 1) return parts.map(part => ({ ...part, sourceAmbiguous: true }));
  }

  const single = optionFromLabel(raw);
  return single ? [single] : [];
}

function normalizeCharacter(data = {}) {
  const merged = {
    ...defaultCharacter,
    ...data,
    attrs: { ...defaultCharacter.attrs, ...(data.attrs || {}) },
    moedas: { ...defaultCharacter.moedas, ...(data.moedas || {}) },
    hpLevelRolls: Array.isArray(data.hpLevelRolls) ? data.hpLevelRolls : [],
    diceHistory: Array.isArray(data.diceHistory) ? data.diceHistory : [],
    inventario: Array.isArray(data.inventario) ? data.inventario : [],
    customItems: Array.isArray(data.customItems) ? data.customItems : [],
    pontosDistributivos: Number(data.pontosDistributivos) || 0,
    pontosDistribuidosNivel: {
      ...defaultCharacter.pontosDistribuidosNivel,
      ...(data.pontosDistribuidosNivel || {}),
    },
    levelUpHistory: Array.isArray(data.levelUpHistory) ? data.levelUpHistory : [],
    officialAbilityUsage: data.officialAbilityUsage && typeof data.officialAbilityUsage === 'object' ? data.officialAbilityUsage : {},
    abilityTimeline: {
      ...defaultCharacter.abilityTimeline,
      ...(data.abilityTimeline || {}),
    },
    turnEconomy: {
      ...defaultCharacter.turnEconomy,
      ...(data.turnEconomy || {}),
      temporaryEffects: Array.isArray(data.turnEconomy?.temporaryEffects) ? data.turnEconomy.temporaryEffects : [],
      reactionUses: Array.isArray(data.turnEconomy?.reactionUses) ? data.turnEconomy.reactionUses : [],
    },
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

    if ((data.talosRulesVersion || 0) < 2) {
      merged.deslocamento = Math.max(0, (Number(merged.deslocamento) || 0) - movementBase);
      merged.limiteCansaco = Math.max(0, (Number(merged.limiteCansaco) || 0) - fatigueBase);
    }

    if ((data.talosRulesVersion || 0) < 3) {
      // hpMax used to store the sheet's manual/base maximum. From v3 onward the
      // TALOS base (12 + mod CON + origin + items) is calculated automatically.
      // Preserve explicit legacy overrides, but treat the untouched default 12
      // as "no manual override" so old saves receive the corrected TALOS base.
      if (data.hpManualBonus == null) {
        const legacyHpMax = Number(data.hpMax);
        if (Number.isFinite(legacyHpMax) && legacyHpMax !== 12) {
          merged.hpManualBonus = legacyHpMax - calculateRuleHpBase(merged);
        } else {
          merged.hpManualBonus = 0;
        }
      }
    }

    if ((data.talosRulesVersion || 0) < 5) {
      // CANSADO is automatic from the fatigue counter from rules v5 onward.
      merged.estados = (Array.isArray(merged.estados) ? merged.estados : []).filter(estado => estado !== 'cansado');
      merged.cansacoAtual = Math.max(0, Number(merged.cansacoAtual) || 0);
    }

    if ((data.talosRulesVersion || 0) < 6) {
      merged.officialAbilityUsage = merged.officialAbilityUsage && typeof merged.officialAbilityUsage === 'object' ? merged.officialAbilityUsage : {};
      merged.abilityTimeline = { ...defaultCharacter.abilityTimeline, ...(merged.abilityTimeline || {}) };
    }
    if ((data.talosRulesVersion || 0) < 7) {
      merged.turnEconomy = {
        ...defaultCharacter.turnEconomy,
        ...(merged.turnEconomy || {}),
        fullSpent: 0,
        bonusSpent: 0,
        temporaryEffects: [],
        reactionUses: [],
      };
    }
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

function calculateRuleHpBase(character) {
  const allItems = [...itemsRaw, ...(character.customItems || [])];
  const equippedItems = Object.values(character.equippedSlots || {})
    .map(itemId => allItems.find(item => item.id === itemId))
    .filter(Boolean);
  const itemEffects = aggregateItemEffects(equippedItems);
  const originData = ORIGENS.find(origin => origin.id === character.origem);
  const originEffects = getOriginEffects(originData);
  const totalConstitution = (Number(character.attrs?.constituicao) || 0)
    + (originEffects.attrs.constituicao || 0)
    + (itemEffects.attrs.constituicao || 0);

  return 12 + Math.floor(totalConstitution / 2) + originEffects.hpMax + itemEffects.hpMax;
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
