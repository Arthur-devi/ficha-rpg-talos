import { useState, useCallback, useRef, useEffect } from 'react';
import itemsRaw from '../data/items_raw.json';
import { ORIGENS, SHIKATAS, getProfissaoData } from '../data/system';
import { ITEM_ATTRIBUTE_KEYS, aggregateItemEffects } from '../data/itemEffects';
import { getOriginEffects } from '../data/originEffects';
import { DEFAULT_ORIGIN_STATE, advanceOriginTurnState, celestialHealAmount, dragonBreathFormula, getOriginAbilityDefs, normalizeOriginState, resetOriginUsageForPeriod, vampireDuration, vampireHpBonus, werewolfNaturalFormula } from '../data/originRuntime';
import { makeDiceEntry, pushDiceHistory, rollFormula } from '../data/diceRuntime';
import { getAbilityAvailability, getAbilityGroupSpec, getAbilityProgressionLevel, getAbilityRuntimeSpec, rollCost } from '../data/abilityRuntime';
import { adjustActionState, advanceTurnActionState, applyAbilityActionEffect, canSpendAction, getTurnEconomySnapshot, spendActionState } from '../data/turnRuntime';
import { DEFAULT_SHIKATA_PROGRESS, getAccumulatedShikataLevel, getLearnedShikataIds, getShikataEntry, getShikataLevel, getShikataSubclass, getSubclassUnlock, learnedShikataSummary, normalizeShikataProgress, syncLegacyShikataFields } from '../data/multiclassRuntime';
import { getStateRuntime, IMPARAVEL_EXACT_IMMUNITIES } from '../data/stateRuntime';
import { DEATH_SAVE_TABLE_RULE } from '../data/tableRules';
import { clearDeathSavesOnHealing, DEFAULT_DEATH_SAVE_STATE, normalizeDeathSaveState, resolveDeathSaveRoll, reviveDeathSaveState } from '../data/deathSaveRuntime';

const CURRENT_RULES_VERSION = 13;
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
  shikataProgress: { ...DEFAULT_SHIKATA_PROGRESS, entries: {} },
  pendingSubclassChoice: null,
  profissao: '',
  professionState: {
    oficioEspecialidades: [],
    oficioEspecialidade: '',
    atuacaoEspecialidade: '',
  },
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

  // Regra da mesa — estabilização estilo D&D enquanto estiver MORRENDO.
  deathSaveState: { ...DEFAULT_DEATH_SAVE_STATE },

  // Class-specific trackers
  officialAbilityUsage: {},
  abilityTimeline: {
    turn: 1,
    combat: 0,
    combatActive: false,
    day: 1,
    week: 1,
    month: 1,
  },
  originState: { ...DEFAULT_ORIGIN_STATE },

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
    bruxo: {
      mutacaoNivel: 1,
      mutacaoXp: 0,
      signalLevels: {
        IGNITE: 1,
        ARXIS: 1,
        BREN: 1,
        ECRYPT: 1,
      },
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
  const charRef = useRef(char);
  charRef.current = char;

  const commitCharacter = useCallback((next) => {
    charRef.current = next;
    setChar(next);
    try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {
      // Keep in-memory edits even when persistence is blocked.
    }
    return next;
  }, []);

  // Qualquer cura recebida enquanto o personagem ainda está MORRENDO encerra
  // o episódio de estabilização. MORTE já confirmada não é removida por cura comum;
  // nesse caso é necessário registrar uma ressurreição explicitamente.
  useEffect(() => {
    const current = charRef.current;
    const death = normalizeDeathSaveState(current.deathSaveState);

    // MORTE confirmada é um estado terminal até uma ressurreição explícita.
    // Qualquer tentativa de cura/edição comum de HP é mantida em 0 para não
    // produzir a situação visual de um personagem MORTO com HP positivo.
    if (death.dead && (Number(current.hpAtual) || 0) !== 0) {
      commitCharacter({
        ...current,
        hpAtual: 0,
        deathSaveState: death,
      });
      return;
    }

    const cleared = clearDeathSavesOnHealing(death, current.hpAtual);
    if (cleared === death || (cleared.successes === death.successes && cleared.failures === death.failures && cleared.dead === death.dead && cleared.lastOutcome === death.lastOutcome)) return;

    commitCharacter({
      ...current,
      deathSaveState: cleared,
    });
  }, [char.hpAtual, char.deathSaveState?.successes, char.deathSaveState?.failures, char.deathSaveState?.dead, commitCharacter]);

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
    const current = charRef.current;
    if (!current.shikata) return { ok: false, message: 'Selecione uma Shikata antes de subir de nível.' };

    const currentLevel = getShikataLevel(current, current.shikata);
    if (currentLevel >= 30) return { ok: false, message: 'O nível máximo configurado por Shikata é 30.' };

    const nextLevel = currentLevel + 1;
    const now = new Date().toISOString();
    const progress = normalizeShikataProgress(current.shikataProgress, current);
    const currentEntry = progress.entries[current.shikata] || { nivel: currentLevel, subclasse: current.subclasse || '', learnedAt: null, learnedOrder: 1 };
    progress.entries[current.shikata] = { ...currentEntry, nivel: nextLevel };

    const subclassUnlock = getSubclassUnlock({ ...current, shikataProgress: progress }, current.shikata);
    const shouldOpenSubclassEvent = Boolean(
      subclassUnlock
      && nextLevel >= subclassUnlock.level
      && currentLevel < subclassUnlock.level
      && !currentEntry.subclasse
    );

    const entry = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      createdAt: now,
      fromLevel: currentLevel,
      toLevel: nextLevel,
      shikataId: current.shikata,
      pontosConcedidos: 2,
    };

    const next = syncLegacyShikataFields({
      ...current,
      shikataProgress: progress,
      pontosDistributivos: (Number(current.pontosDistributivos) || 0) + 2,
      levelUpHistory: [...(current.levelUpHistory || []), entry],
      pendingSubclassChoice: shouldOpenSubclassEvent
        ? { shikataId: current.shikata, level: subclassUnlock.level, createdAt: now }
        : current.pendingSubclassChoice,
    });
    commitCharacter(next);

    return {
      ok: true,
      nextLevel,
      characterLevel: next.nivel,
      shikataId: current.shikata,
      pontosConcedidos: 2,
      subclassEvent: shouldOpenSubclassEvent ? next.pendingSubclassChoice : null,
    };
  }, [commitCharacter]);

  const learnShikata = useCallback((shikataId) => {
    const current = charRef.current;
    const data = SHIKATAS.find(shikata => shikata.id === shikataId);
    if (!data) return { ok: false, message: 'Shikata inválida.' };
    const progress = normalizeShikataProgress(current.shikataProgress, current);
    if (progress.entries[shikataId]) return { ok: false, message: `${data.name} já foi aprendida.` };

    const learnedOrder = Object.keys(progress.entries).length + 1;
    progress.entries[shikataId] = {
      nivel: 1,
      subclasse: '',
      learnedAt: new Date().toISOString(),
      learnedOrder,
    };
    const next = syncLegacyShikataFields({
      ...current,
      shikataProgress: progress,
      shikata: shikataId,
      subclasse: '',
    });
    commitCharacter(next);
    return { ok: true, shikataId, name: data.name, level: 1, characterLevel: next.nivel };
  }, [commitCharacter]);

  const setActiveShikata = useCallback((shikataId) => {
    const current = charRef.current;
    const entry = getShikataEntry(current, shikataId);
    if (!entry) return { ok: false, message: 'Aprenda esta Shikata antes de ativá-la.' };
    const next = syncLegacyShikataFields({ ...current, shikata: shikataId, subclasse: entry.subclasse || '' });
    commitCharacter(next);
    return { ok: true, shikataId, level: entry.nivel };
  }, [commitCharacter]);

  const setShikataLevel = useCallback((shikataId, value) => {
    const current = charRef.current;
    const progress = normalizeShikataProgress(current.shikataProgress, current);
    const entry = progress.entries[shikataId];
    if (!entry) return { ok: false, message: 'Shikata não aprendida.' };
    const previousLevel = Math.max(1, Number(entry.nivel) || 1);
    const nextLevel = Math.max(1, Math.min(30, Number(value) || 1));
    progress.entries[shikataId] = { ...entry, nivel: nextLevel };
    const subclassUnlock = getSubclassUnlock({ ...current, shikataProgress: progress }, shikataId);
    const pending = subclassUnlock && nextLevel >= subclassUnlock.level && previousLevel < subclassUnlock.level && !entry.subclasse
      ? { shikataId, level: subclassUnlock.level, createdAt: new Date().toISOString() }
      : current.pendingSubclassChoice;
    const next = syncLegacyShikataFields({ ...current, shikataProgress: progress, pendingSubclassChoice: pending });
    commitCharacter(next);
    return { ok: true, level: nextLevel, characterLevel: next.nivel };
  }, [commitCharacter]);

  const chooseSubclass = useCallback((shikataId, subclass) => {
    const current = charRef.current;
    const data = SHIKATAS.find(shikata => shikata.id === shikataId);
    const progress = normalizeShikataProgress(current.shikataProgress, current);
    const entry = progress.entries[shikataId];
    if (!data || !entry) return { ok: false, message: 'Shikata inválida para escolha de subclasse.' };
    if (subclass && !data.subclasses.includes(subclass)) return { ok: false, message: 'Subclasse inválida.' };
    if (subclass && Number(entry.nivel) < Number(data.subclasseNivel || 999)) return { ok: false, message: `Subclasse disponível no nível ${data.subclasseNivel}.` };
    progress.entries[shikataId] = { ...entry, subclasse: subclass || '' };
    const next = syncLegacyShikataFields({
      ...current,
      shikataProgress: progress,
      pendingSubclassChoice: current.pendingSubclassChoice?.shikataId === shikataId ? null : current.pendingSubclassChoice,
    });
    commitCharacter(next);
    return { ok: true, shikataId, subclass: subclass || '' };
  }, [commitCharacter]);

  const dismissSubclassEvent = useCallback(() => {
    const current = charRef.current;
    commitCharacter({ ...current, pendingSubclassChoice: null });
  }, [commitCharacter]);

  const spendAttributePoint = useCallback((attr) => {
    if (!ITEM_ATTRIBUTE_KEYS.includes(attr)) return;
    setChar(prev => {
      const available = Number(prev.pontosDistributivos) || 0;
      if (available <= 0) return prev;
      if (prev.origem === 'tita' && attr === 'carisma') return prev;

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
    const current = charRef.current;
    const states = Array.isArray(current.estados) ? current.estados : [];
    const has = states.includes(estadoId);

    if (estadoId === 'cansado') {
      return { ok: false, message: 'CANSADO é controlado automaticamente pelo Limite de Cansaço.' };
    }

    if (!has && states.includes('imparavel') && IMPARAVEL_EXACT_IMMUNITIES.has(estadoId)) {
      return { ok: false, blockedByImparavel: true, message: `IMPARÁVEL impede ${String(estadoId).toUpperCase()}.` };
    }

    let nextStates = has ? states.filter(state => state !== estadoId) : [...states, estadoId];
    let removedConditions = [];
    if (!has && estadoId === 'imparavel') {
      removedConditions = nextStates.filter(state => IMPARAVEL_EXACT_IMMUNITIES.has(state));
      nextStates = nextStates.filter(state => !IMPARAVEL_EXACT_IMMUNITIES.has(state));
    }

    commitCharacter({ ...current, estados: nextStates });
    return {
      ok: true,
      active: !has,
      removedConditions,
      message: !has && removedConditions.length
        ? `IMPARÁVEL ativado e removeu: ${removedConditions.map(item => item.toUpperCase()).join(', ')}.`
        : `${String(estadoId).toUpperCase()} ${has ? 'removido' : 'ativado'}.`,
    };
  }, [commitCharacter]);

  const consumeConcentration = useCallback(() => {
    const current = charRef.current;
    const states = Array.isArray(current.estados) ? current.estados : [];
    if (!states.includes('concentracao')) return { ok: false, message: 'CONCENTRAÇÃO não está ativa.' };
    commitCharacter({ ...current, estados: states.filter(state => state !== 'concentracao') });
    return { ok: true, message: 'Primeiro ataque inimigo registrado. CONCENTRAÇÃO foi consumida.' };
  }, [commitCharacter]);

  const togglePericia = useCallback((pericia) => {
    setChar(prev => {
      const periciasProfissao = getProfissaoData(prev.profissao)?.pericias || [];
      const periciasOrigem = normalizeOriginState(prev.originState).proficiencies || [];
      if (periciasProfissao.includes(pericia) || periciasOrigem.includes(pericia)) return prev;
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
  const originEffects = getOriginEffects(originData, { level: char.nivel, originState: char.originState });
  const stateEffects = getStateRuntime(char);
  const stateAttrBonuses = Object.fromEntries(ITEM_ATTRIBUTE_KEYS.map(key => [key, 0]));
  stateAttrBonuses.defesa = stateEffects.defenseBonus;
  const classAttrBonuses = Object.fromEntries(ITEM_ATTRIBUTE_KEYS.map(key => [key, 0]));
  const hemomanteLevel = getShikataLevel(char, 'hemomante');
  if (hemomanteLevel > 0) {
    const maxReservaSangue = Math.max(0, hemomanteLevel * 4);
    const reservaSangue = Math.min(maxReservaSangue, Number(char.classResources?.hemomante?.reservaSangue) || 0);
    classAttrBonuses.defesa += Math.floor(reservaSangue / 2);
  }

  const attrsTotal = Object.fromEntries(
    ITEM_ATTRIBUTE_KEYS.map(key => [
      key,
      (char.attrs[key] || 0) + (originEffects.attrs[key] || 0) + (itemEffects.attrs[key] || 0) + (classAttrBonuses[key] || 0) + (stateAttrBonuses[key] || 0),
    ])
  );

  // Total magia = base + bônus de itens + INT÷2 (conversão automática do sistema)
  const magiaFromInt = Math.floor(attrsTotal.inteligencia / 2);
  const magiaTotal = attrsTotal.magia + magiaFromInt;

  const deslocamentoBonus = Math.floor(attrsTotal.destreza / 5);
  const limiteCansacoBonus = Math.floor(attrsTotal.constituicao / 2);
  const originDeslocamentoBase = originData ? (originEffects.deslocamentoBase ?? 0) : DEFAULT_DESLOCAMENTO_BASE;
  const originLimiteCansacoBase = originData ? (originEffects.limiteCansacoBase ?? 0) : DEFAULT_LIMITE_CANSACO_BASE;
  const manualDeslocamento = Number(char.deslocamento) || 0;
  const manualLimiteCansaco = Number(char.limiteCansaco) || 0;
  const limiteCansacoTotal = Math.max(0, originLimiteCansacoBase + manualLimiteCansaco + limiteCansacoBonus);
  const cansacoAtual = Math.max(0, Math.min(limiteCansacoTotal, Number(char.cansacoAtual) || 0));
  const cansadoPorCansaco = limiteCansacoTotal > 0 && cansacoAtual >= limiteCansacoTotal;
  const isCansado = cansadoPorCansaco || (char.estados || []).includes('cansado');

  const shikataData = SHIKATAS.find(shikata => shikata.id === char.shikata);
  const activeShikataLevel = getShikataLevel(char, char.shikata);
  const activeSubclass = getShikataSubclass(char, char.shikata);
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
  const attackModifierOptions = buildMulticlassAttackModifierOptions(char, modifierValues);
  const turnEconomy = getTurnEconomySnapshot(char);

  const maxHpLevelRolls = Math.max(0, activeShikataLevel - 1);
  const allValidHpLevelRolls = Array.isArray(char.hpLevelRolls)
    ? char.hpLevelRolls.filter(roll => {
      const shikataLevel = getShikataLevel(char, roll.shikataId);
      const rolledLevel = Number(roll.level) || 0;
      return shikataLevel > 0 && rolledLevel >= 2 && rolledLevel <= shikataLevel;
    })
    : [];
  const activeHpLevelRolls = allValidHpLevelRolls
    .filter(roll => roll.shikataId === char.shikata)
    .sort((a, b) => (Number(a.level) || 0) - (Number(b.level) || 0))
    .slice(0, maxHpLevelRolls);
  const hpLevelRollBonus = allValidHpLevelRolls.reduce((sum, roll) => sum + (Number(roll.total) || 0), 0);
  const gnomeLuckHpBonus = char.origem === 'gnomo' ? getMod(attrsTotal.sorte) : 0;
  const vampireActiveHpBonus = char.origem === 'vampiro' && char.originState?.vampireActive ? vampireHpBonus(char.nivel) : 0;
  const originDynamicHpBonus = gnomeLuckHpBonus + vampireActiveHpBonus;
  const hpBase = 12 + getMod(attrsTotal.constituicao) + originEffects.hpMax + originDynamicHpBonus + itemEffects.hpMax;
  const hpManualBonus = Number(char.hpManualBonus) || 0;
  const hpMaxTotal = Math.max(1, hpBase + hpManualBonus + hpLevelRollBonus);
  const deathSaveState = normalizeDeathSaveState(char.deathSaveState);
  const isDead = Boolean(deathSaveState.dead);
  const isMorrendo = !isDead && (Number(char.hpAtual) || 0) <= 0;

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
    activeShikataLevel,
    activeSubclass,
    learnedShikatas: learnedShikataSummary(char),
    learnedShikataIds: getLearnedShikataIds(char),
    accumulatedShikataLevel: getAccumulatedShikataLevel(char),
    originAttrBonuses: originEffects.attrs,
    classAttrBonuses,
    stateAttrBonuses,
    stateEffects,
    stateDefenseBonus: stateEffects.defenseBonus,
    isMorrendo,
    isDead,
    deathSaveState,
    caOriginBonus: originEffects.ca,
    hpOriginBonus: originEffects.hpMax + originDynamicHpBonus,
    originDynamicHpBonus,
    gnomeLuckHpBonus,
    vampireActiveHpBonus,
    itemEffects,
    itemAttrBonuses: itemEffects.attrs,
    caItemBonus: itemEffects.ca,
    hpItemBonus: itemEffects.hpMax,
    deslocamentoItemBonus: itemEffects.deslocamento,
    originDeslocamentoBase,
    originLimiteCansacoBase,
    originMovementSpecified: originEffects.deslocamentoBase != null,
    originFatigueSpecified: originEffects.limiteCansacoBase != null,
    originProficiencies: Array.isArray(char.originState?.proficiencies) ? char.originState.proficiencies : [],
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
    const current = charRef.current;
    if (!ability || !current.shikata) return { ok: false, message: 'Habilidade inválida.' };
    if (current.origem === 'lobisomem' && current.originState?.werewolfActive) return { ok: false, message: 'Na forma de Lobisomem, o personagem não pode usar habilidades de Shikata.' };
    const combatActive = Boolean(current.abilityTimeline?.combatActive);
    const activeLevel = getShikataLevel(current, current.shikata);
    const activeSubclass = getShikataSubclass(current, current.shikata);

    const progressionLevel = getAbilityProgressionLevel(current, ability);
    const spec = getAbilityRuntimeSpec(current.shikata, ability, progressionLevel, activeSubclass);
    if (!spec.trackable) return { ok: false, message: 'Habilidades passivas não consomem uso.' };

    const actionOptions = spec.actionSpec?.options || [{ type: 'full', cost: 1, label: 'Ação completa' }];
    const selectedAction = actionOptions.find(option => option.type === options.actionMode)
      || actionOptions.find(option => option.type === spec.actionSpec?.defaultMode)
      || actionOptions[0];
    const actionAvailability = canSpendAction(current, selectedAction);
    if (!actionAvailability.ok) return actionAvailability;
    const actionBefore = getTurnEconomySnapshot(current);

    const record = current.officialAbilityUsage?.[spec.key] || {};
    const groupSpec = getAbilityGroupSpec(current, ability);
    const groupRecord = groupSpec ? (current.officialAbilityUsage?.[groupSpec.key] || {}) : null;
    if (groupSpec && (Number(groupRecord?.used) || 0) >= groupSpec.maxUses) {
      return { ok: false, blockedBeforeCommit: true, message: `Limite compartilhado dos Sinais atingido (${groupSpec.maxUses}/${groupSpec.maxUses} neste turno). Nenhum uso, ação, custo ou Cansaço foi consumido.` };
    }

    const resources = {
      performance: current.classResources?.bardo?.performance || 0,
      ml: current.classResources?.hemomante?.reservaSangue || 0,
    };
    const availability = getAbilityAvailability(spec, record, current.abilityTimeline, resources);
    const useMlEnhancement = !!options.useMlEnhancement && spec.optionalMlCost > 0;
    const enhancementLimit = activeLevel >= 20 ? 4 : activeLevel >= 14 ? 3 : activeLevel >= 5 ? 2 : 1;
    const enhancementsUsed = Math.max(0, Number(current.classResources?.hemomante?.aprimoramentosUsadosTurno) || 0);
    const canBypassUseLimitWithMl = useMlEnhancement && spec.mlAllowsExtraUse && resources.ml >= spec.optionalMlCost && enhancementsUsed < enhancementLimit;

    if (!availability.available && !(availability.blockedByUses && canBypassUseLimitWithMl && !availability.blockedByLifetime && !availability.blockedByCooldown && !availability.blockedByPerformance)) {
      if (availability.blockedByLifetime) return { ok: false, blockedBeforeCommit: true, message: 'O limite de usos em vida desta habilidade já foi atingido.' };
      if (availability.blockedByCooldown) return { ok: false, blockedBeforeCommit: true, message: `Habilidade em recarga: faltam ${availability.cooldownRemaining} ${spec.cooldown?.unit === 'day' ? 'dia(s)' : 'turno(s)'}.` };
      if (availability.blockedByUses) return { ok: false, blockedBeforeCommit: true, message: `Sem usos restantes até o próximo ${spec.resetLabel || 'reset'}.` };
      if (availability.blockedByPerformance) return { ok: false, blockedBeforeCommit: true, message: `Performance insuficiente. Necessário: ${spec.performanceCost}.` };
      return { ok: false, blockedBeforeCommit: true, message: 'A habilidade não está disponível agora.' };
    }

    const target = String(options.target || '').trim();
    const normalizedTarget = target.toLocaleLowerCase('pt-BR');
    if (spec.targetRule) {
      if (!target) return { ok: false, blockedBeforeCommit: true, message: `Informe o ${spec.targetRule.label} antes de usar esta habilidade.` };
      const usedTargets = Array.isArray(record.targets) ? record.targets : [];
      if (usedTargets.some(entry => entry.normalized === normalizedTarget)) {
        return { ok: false, blockedBeforeCommit: true, message: `Esta habilidade já foi usada neste ${spec.targetRule.label}: ${target}.` };
      }
    }

    const rawHpCost = rollCost(spec.hpCost);
    const hpCost = rawHpCost * (Number(spec.lifeCostMultiplier) || 1);
    if (hpCost > 0 && (Number(current.hpAtual) || 0) < hpCost) {
      return { ok: false, blockedBeforeCommit: true, message: `HP insuficiente para pagar o custo de ${hpCost} HP.` };
    }
    if (useMlEnhancement && resources.ml < spec.optionalMlCost) {
      return { ok: false, blockedBeforeCommit: true, message: `Reserva de sangue insuficiente. O aprimoramento exige ${spec.optionalMlCost} ML.` };
    }
    if (useMlEnhancement && enhancementsUsed >= enhancementLimit) {
      return { ok: false, blockedBeforeCommit: true, message: `Limite de aprimoramentos por turno atingido (${enhancementLimit}). Avance o turno para recuperar.` };
    }

    const limit = Math.max(0, Number(limiteCansacoTotal) || 0);
    const timeline = current.abilityTimeline || defaultCharacter.abilityTimeline;
    const now = new Date().toISOString();
    const nextTargets = Array.isArray(record.targets) ? [...record.targets] : [];
    if (spec.targetRule && target) nextTargets.push({ label: target, normalized: normalizedTarget, usedAt: now });

    const nextRecord = {
      ...record,
      used: (Number(record.used) || 0) + 1,
      lifetimeUsed: (Number(record.lifetimeUsed) || 0) + 1,
      resetType: spec.resetType || null,
      targetResetType: spec.targetRule?.resetType || null,
      targets: nextTargets,
      lastUsedAt: now,
    };
    if (spec.cooldown?.unit === 'turn') nextRecord.lastUsedTurn = Number(timeline.turn) || 1;
    if (spec.cooldown?.unit === 'day') nextRecord.lastUsedDay = Number(timeline.day) || 1;

    const currentFatigue = Math.max(0, Number(current.cansacoAtual) || 0);
    const nextFatigue = limit > 0 ? Math.min(limit, currentFatigue + 1) : 0;
    const estados = Array.isArray(current.estados) ? current.estados.filter(estado => estado !== 'cansado') : [];
    if (limit > 0 && nextFatigue >= limit) estados.push('cansado');

    let nextTurnEconomy = current.turnEconomy;
    let actionEffectResult = { turnEconomy: nextTurnEconomy, effect: null };
    if (combatActive) {
      nextTurnEconomy = spendActionState(current.turnEconomy, selectedAction, ability.nome);
      actionEffectResult = applyAbilityActionEffect(nextTurnEconomy, current.shikata, ability, activeLevel);
      nextTurnEconomy = actionEffectResult.turnEconomy;
    }

    const nextOfficialUsage = { ...(current.officialAbilityUsage || {}), [spec.key]: nextRecord };
    if (groupSpec) {
      nextOfficialUsage[groupSpec.key] = {
        ...(groupRecord || {}),
        used: (Number(groupRecord?.used) || 0) + 1,
        resetType: 'turn',
        lastUsedAt: now,
      };
    }

    const next = {
      ...current,
      hpAtual: Math.max(0, (Number(current.hpAtual) || 0) - hpCost),
      cansacoAtual: nextFatigue,
      estados,
      turnEconomy: nextTurnEconomy,
      officialAbilityUsage: nextOfficialUsage,
      classResources: {
        ...current.classResources,
        bardo: {
          ...defaultCharacter.classResources.bardo,
          ...(current.classResources?.bardo || {}),
          performance: Math.max(0, (Number(current.classResources?.bardo?.performance) || 0) - spec.performanceCost),
        },
        hemomante: {
          ...defaultCharacter.classResources.hemomante,
          ...(current.classResources?.hemomante || {}),
          reservaSangue: Math.max(0, (Number(current.classResources?.hemomante?.reservaSangue) || 0) - (useMlEnhancement ? spec.optionalMlCost : 0)),
          aprimoramentosUsadosTurno: useMlEnhancement
            ? (Number(current.classResources?.hemomante?.aprimoramentosUsadosTurno) || 0) + 1
            : (Number(current.classResources?.hemomante?.aprimoramentosUsadosTurno) || 0),
        },
      },
    };
    commitCharacter(next);

    const actionAfter = combatActive ? getTurnEconomySnapshot(next) : actionBefore;
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
      actionAfter,
      actionEffect: combatActive ? actionEffectResult.effect : null,
      actionConsumed: combatActive,
      message: `${ability.nome} utilizada.`,
    };
  }, [commitCharacter, limiteCansacoTotal]);

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

  const startCombat = useCallback(() => {
    if (char.abilityTimeline?.combatActive) return { ok: false, message: 'Já existe um combate ativo.' };
    const before = Math.max(0, Number(char.abilityTimeline?.combat) || 0);
    setChar(prev => {
      const timeline = { ...defaultCharacter.abilityTimeline, ...(prev.abilityTimeline || {}) };
      timeline.combat = Math.max(0, Number(timeline.combat) || 0) + 1;
      timeline.turn = 1;
      timeline.combatActive = true;

      const officialAbilityUsage = Object.fromEntries(Object.entries(prev.officialAbilityUsage || {}).map(([key, record]) => {
        const nextRecord = { ...record };
        if (record.resetType === 'combat' || record.resetType === 'turn') nextRecord.used = 0;
        if (record.targetResetType === 'combat' || record.targetResetType === 'turn') nextRecord.targets = [];
        nextRecord.lastUsedTurn = null;
        return [key, nextRecord];
      }));

      const nextOriginState = advanceOriginTurnState(resetOriginUsageForPeriod(prev.originState, 'combat'), 'combat');
      const next = {
        ...prev,
        abilityTimeline: timeline,
        officialAbilityUsage,
        originState: nextOriginState,
        turnEconomy: advanceTurnActionState(prev.turnEconomy, 'combat'),
        classResources: {
          ...prev.classResources,
          hemomante: {
            ...defaultCharacter.classResources.hemomante,
            ...(prev.classResources?.hemomante || {}),
            aprimoramentosUsadosTurno: 0,
          },
        },
      };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {}
      return next;
    });
    return { ok: true, before, after: before + 1, message: 'Combate iniciado. Turno 1 aberto.' };
  }, [char.abilityTimeline]);

  const endCombat = useCallback(() => {
    if (!char.abilityTimeline?.combatActive) return { ok: false, message: 'Não há combate ativo.' };
    setChar(prev => {
      const timeline = { ...defaultCharacter.abilityTimeline, ...(prev.abilityTimeline || {}), combatActive: false };
      let originState = advanceOriginTurnState(prev.originState, 'combat');
      const next = {
        ...prev,
        abilityTimeline: timeline,
        originState,
        turnEconomy: advanceTurnActionState(prev.turnEconomy, 'combat'),
      };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {}
      return next;
    });
    return { ok: true, message: 'Combate encerrado. A economia de ações foi desativada.' };
  }, [char.abilityTimeline]);

  const advanceAbilityPeriod = useCallback((period) => {
    const valid = ['turn', 'day', 'week', 'month'];
    if (!valid.includes(period)) return { ok: false, message: 'Período inválido.' };
    if (period === 'turn' && !char.abilityTimeline?.combatActive) return { ok: false, message: 'Inicie um combate antes de avançar o turno.' };

    setChar(prev => {
      const timeline = { ...defaultCharacter.abilityTimeline, ...(prev.abilityTimeline || {}) };
      timeline[period] = (Number(timeline[period]) || 1) + 1;

      const nextUsage = Object.fromEntries(Object.entries(prev.officialAbilityUsage || {}).map(([key, record]) => {
        const nextRecord = { ...record };
        if (record.resetType === period) nextRecord.used = 0;
        if (record.targetResetType === period) nextRecord.targets = [];
        return [key, nextRecord];
      }));

      const nextClassResources = { ...prev.classResources };
      if (period === 'turn') {
        nextClassResources.hemomante = {
          ...defaultCharacter.classResources.hemomante,
          ...(prev.classResources?.hemomante || {}),
          aprimoramentosUsadosTurno: 0,
        };
      }

      let nextOriginState = resetOriginUsageForPeriod(prev.originState, period);
      const wasVampire = Boolean(nextOriginState.vampireActive);
      const vampireBonus = wasVampire ? vampireHpBonus(prev.nivel) : 0;
      nextOriginState = advanceOriginTurnState(nextOriginState, period);
      const vampireExpired = wasVampire && !nextOriginState.vampireActive;

      const next = {
        ...prev,
        hpAtual: vampireExpired ? Math.max(0, (Number(prev.hpAtual) || 0) - vampireBonus) : prev.hpAtual,
        abilityTimeline: timeline,
        officialAbilityUsage: nextUsage,
        classResources: nextClassResources,
        originState: nextOriginState,
        turnEconomy: period === 'turn' ? advanceTurnActionState(prev.turnEconomy, period) : prev.turnEconomy,
      };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {}
      return next;
    });
    return { ok: true };
  }, [char.abilityTimeline, char.nivel]);

  const spendTurnAction = useCallback((type, cost = 1, label = 'Ação manual') => {
    const option = { type, cost: Math.max(0, Number(cost) || 0), label };
    if (!char.abilityTimeline?.combatActive) {
      const snapshot = getTurnEconomySnapshot(char);
      return { ok: true, action: option, before: snapshot, after: snapshot, outsideCombat: true, message: `${label} usada fora de combate; nenhuma ação foi consumida.` };
    }
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
    if (!char.abilityTimeline?.combatActive) return;
    setChar(prev => {
      const next = { ...prev, turnEconomy: adjustActionState(prev.turnEconomy, type, delta) };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {
        // Keep in-memory edits even when persistence is blocked.
      }
      return next;
    });
  }, [char.abilityTimeline?.combatActive]);

  const useOriginAbility = useCallback((abilityId, options = {}) => {
    if (!char.origem) return { ok: false, message: 'Selecione uma Origem.' };
    const defs = getOriginAbilityDefs(char.origem, char);
    const def = defs.find(item => item.id === abilityId);
    if (!def) return { ok: false, message: 'Habilidade de origem não estruturada.' };
    if (def.custom === 'guardian') return { ok: false, message: 'Use o botão de tentativa do Revestimento.' };

    const state = normalizeOriginState(char.originState);
    const record = state.originAbilityUsage?.[abilityId] || {};
    if (def.maxUses != null && (Number(record.used) || 0) >= def.maxUses) {
      return { ok: false, message: `Sem usos restantes até ${def.resetType === 'long' ? 'o descanso longo' : def.resetType === 'day' ? 'o próximo dia' : def.resetType === 'combat' ? 'o próximo combate' : 'o reset'}.` };
    }
    if (def.requiresCombat && !char.abilityTimeline?.combatActive) return { ok: false, message: 'Esta habilidade exige um combate ativo.' };
    if (def.requiresOutOfCombat && char.abilityTimeline?.combatActive) return { ok: false, message: 'Esta habilidade exige o tempo indicado fora de combate.' };
    if (def.requiresNatural && !state.naturalEnvironment) return { ok: false, message: 'Marque que o personagem está em ambiente natural para usar Chamado da Floresta.' };
    if (def.requiresNoSunlight && state.sunlight) return { ok: false, message: 'Despertar da Maldição não pode ser ativado sob luz do sol.' };
    if (def.requiresZeroHp && Number(char.hpAtual) > 0) return { ok: false, message: 'Imortal só pode ser ativado quando o personagem estiver com 0 HP.' };
    if (def.requiresChoice && !state[def.requiresChoice]) return { ok: false, message: 'Complete a escolha permanente desta origem antes de usar a habilidade.' };
    if (def.requiresWerewolf && !state.werewolfActive) return { ok: false, message: 'Ative a forma de Lobisomem antes de usar este ataque natural.' };
    if (char.origem === 'metamorfo') {
      const formIndex = Number(options.formIndex);
      if (![0,1].includes(formIndex) || !state.metamorphForms?.[formIndex]?.name) return { ok: false, message: 'Escolha uma das duas formas configuradas.' };
    }

    const actionType = def.defaultAction || 'full';
    const actionOption = actionType === 'free' ? { type: 'free', cost: 0, label: 'Sem ação' }
      : actionType === 'bonus' ? { type: 'bonus', cost: 1, label: 'Ação bônus' }
        : { type: 'full', cost: 1, label: 'Ação completa' };
    const actionAvailability = canSpendAction(char, actionOption);
    if (!actionAvailability.ok) return actionAvailability;

    let mainRoll = null;
    let selfRoll = null;
    let heal = Number(def.heal) || 0;
    if (def.damage?.formula) {
      const rolled = rollFormula(def.damage.formula);
      mainRoll = makeDiceEntry({
        label: `${def.name} — ${def.damage.type || 'Dano'}`,
        formula: def.damage.formula,
        total: rolled.total,
        parts: rolled.parts,
        damageTypes: def.damage.type ? [def.damage.type] : [],
      }, { type: 'origin-damage', originId: char.origem, originAbilityId: abilityId });
    }
    if (def.selfDamage) {
      const rolled = rollFormula(def.selfDamage);
      selfRoll = makeDiceEntry({ label: `${def.name} — dano em si`, formula: def.selfDamage, total: rolled.total, parts: rolled.parts }, { type: 'origin-self-damage', originId: char.origem });
    }
    if (def.healRoll) {
      const rolled = rollFormula(def.healRoll);
      heal = rolled.total;
      mainRoll = makeDiceEntry({ label: `${def.name} — Cura`, formula: def.healRoll, total: rolled.total, parts: rolled.parts }, { type: 'origin-heal', originId: char.origem });
    }

    const limit = Math.max(0, Number(limiteCansacoTotal) || 0);
    const hpMax = Math.max(1, Number(hpMaxTotal) || 1);
    const now = new Date().toISOString();
    setChar(prev => {
      const prevState = normalizeOriginState(prev.originState);
      const prevRecord = prevState.originAbilityUsage?.[abilityId] || {};
      const nextRecord = {
        ...prevRecord,
        used: (Number(prevRecord.used) || 0) + 1,
        resetType: def.resetType || null,
        lastUsedAt: now,
      };
      let nextState = {
        ...prevState,
        originAbilityUsage: { ...prevState.originAbilityUsage, [abilityId]: nextRecord },
      };

      let nextHp = Number(prev.hpAtual) || 0;
      if (selfRoll) nextHp = Math.max(0, nextHp - selfRoll.total);
      if (heal > 0) nextHp = Math.min(hpMax, nextHp + heal);
      if (abilityId === 'imortal') nextHp = Math.ceil(hpMax / 2);
      if (abilityId === 'precisao') nextState.precisionReady = true;
      if (abilityId === 'invencibilidade' && prev.abilityTimeline?.combatActive) nextState.dracInvulnerableTurns = 1;
      if (abilityId === 'quebra-tempo' && prev.abilityTimeline?.combatActive) nextState.cronoTimeStoppedTurns = 1;
      if (abilityId === 'defesa-grotesca') nextState.kvaldirDefenseActive = true;
      if (abilityId === 'transformacao') nextState.activeMetamorphForm = Number(options.formIndex);
      if (abilityId === 'despertar-maldicao') {
        nextState.vampireActive = true;
        nextState.vampireTurnsRemaining = vampireDuration(prev.nivel);
        nextHp += vampireHpBonus(prev.nivel);
      }

      let nextTurnEconomy = prev.turnEconomy;
      if (prev.abilityTimeline?.combatActive) nextTurnEconomy = spendActionState(prev.turnEconomy, actionOption, def.name);

      const currentFatigue = Math.max(0, Number(prev.cansacoAtual) || 0);
      const nextFatigue = def.fatigue && limit > 0 ? Math.min(limit, currentFatigue + 1) : currentFatigue;
      const estados = Array.isArray(prev.estados) ? prev.estados.filter(estado => estado !== 'cansado') : [];
      if (limit > 0 && nextFatigue >= limit) estados.push('cansado');

      let diceHistory = prev.diceHistory || [];
      if (selfRoll) diceHistory = pushDiceHistory(diceHistory, selfRoll);
      if (mainRoll) diceHistory = pushDiceHistory(diceHistory, mainRoll);

      const next = {
        ...prev,
        hpAtual: nextHp,
        cansacoAtual: nextFatigue,
        estados,
        turnEconomy: nextTurnEconomy,
        originState: nextState,
        diceHistory,
      };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {}
      return next;
    });

    return {
      ok: true,
      def,
      roll: mainRoll,
      selfRoll,
      heal,
      action: actionOption,
      message: `${def.name} utilizada.`,
    };
  }, [char, hpMaxTotal, limiteCansacoTotal]);

  const attemptGuardianRevestimento = useCallback(() => {
    if (char.origem !== 'guardiao') return { ok: false, message: 'Esta ação pertence ao Guardião.' };
    const state = normalizeOriginState(char.originState);
    if (!char.abilityTimeline?.combatActive) return { ok: false, message: 'Inicie um combate para usar Revestimento e controlar suas tentativas por turno.' };
    const record = state.originAbilityUsage?.revestimento || {};
    if ((Number(record.used) || 0) >= 1) return { ok: false, message: 'Revestimento já foi ativado; recupera no descanso longo.' };
    if ((Number(state.guardianAttemptsTurn) || 0) >= 3) return { ok: false, message: 'Limite de 3 tentativas neste turno atingido.' };
    const actionOption = { type: 'full', cost: 1, label: 'Ação completa' };
    const actionAvailability = canSpendAction(char, actionOption);
    if (!actionAvailability.ok) return actionAvailability;

    const rolled = rollFormula('1d20');
    const entry = makeDiceEntry({ label: 'Guardião — Revestimento', formula: '1d20', total: rolled.total, parts: rolled.parts }, { type: 'origin-check', originId: 'guardiao' });
    const success = rolled.total > 10;
    const critical = rolled.total === 20;
    const limit = Math.max(0, Number(limiteCansacoTotal) || 0);

    setChar(prev => {
      const prevState = normalizeOriginState(prev.originState);
      const prevRecord = prevState.originAbilityUsage?.revestimento || {};
      const nextState = {
        ...prevState,
        guardianAttemptsTurn: (Number(prevState.guardianAttemptsTurn) || 0) + 1,
        guardianCaBonus: success ? (critical ? 10 : 5) : prevState.guardianCaBonus,
        guardianTurnsRemaining: success ? (critical ? 999 : 2) : prevState.guardianTurnsRemaining,
        guardianCriticalCombat: success ? critical : prevState.guardianCriticalCombat,
        originAbilityUsage: {
          ...prevState.originAbilityUsage,
          revestimento: success ? { ...prevRecord, used: 1, resetType: 'long', lastUsedAt: new Date().toISOString() } : prevRecord,
        },
      };
      const currentFatigue = Math.max(0, Number(prev.cansacoAtual) || 0);
      const nextFatigue = limit > 0 ? Math.min(limit, currentFatigue + 1) : currentFatigue;
      const estados = Array.isArray(prev.estados) ? prev.estados.filter(estado => estado !== 'cansado') : [];
      if (limit > 0 && nextFatigue >= limit) estados.push('cansado');
      const next = {
        ...prev,
        cansacoAtual: nextFatigue,
        estados,
        originState: nextState,
        turnEconomy: prev.abilityTimeline?.combatActive ? spendActionState(prev.turnEconomy, actionOption, 'Revestimento') : prev.turnEconomy,
        diceHistory: pushDiceHistory(prev.diceHistory, entry),
      };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {}
      return next;
    });
    return { ok: true, roll: entry, success, critical, message: critical ? 'CRÍTICO: +10 CA até o fim do combate.' : success ? 'Revestimento ativado: +5 CA por 2 turnos.' : 'Tentativa falhou.' };
  }, [char, limiteCansacoTotal]);

  const rollThunganItem = useCallback(() => {
    if (char.origem !== 'thungan') return { ok: false, message: 'Esta rolagem pertence ao Thungan.' };
    if (char.originState?.thunganRoll != null) return { ok: false, message: 'A Sorte Amaldiçoada já foi rolada. Use correção manual apenas se necessário.' };
    const rolled = rollFormula('1d20');
    const entry = makeDiceEntry({ label: 'Thungan — Sorte Amaldiçoada', formula: '1d20', total: rolled.total, parts: rolled.parts }, { type: 'origin-check', originId: 'thungan' });
    setChar(prev => {
      const state = normalizeOriginState(prev.originState);
      const next = { ...prev, originState: { ...state, thunganRoll: rolled.total }, diceHistory: pushDiceHistory(prev.diceHistory, entry) };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {}
      return next;
    });
    return { ok: true, roll: entry, message: `Resultado ${rolled.total}. O v6 não fornece nesta seção a tabela que converte o resultado em item; registre o equipamento definido pelo mestre.` };
  }, [char.origem, char.originState]);

  const setWerewolfForm = useCallback((active) => {
    if (char.origem !== 'lobisomem') return { ok: false, message: 'Esta forma pertence ao Lobisomem.' };
    const state = normalizeOriginState(char.originState);
    if (active && !state.fullMoon) return { ok: false, message: 'A transformação exige noite de lua.' };
    const conNow = Number(derived.attrsTotal?.constituicao) || 0;
    const wolfConBonus = state.werewolfActive ? 2 : 0;
    const baseCon = conNow - wolfConBonus;
    const baseHpCap = Math.max(1, (Number(hpMaxTotal) || 1) - (Math.floor((baseCon + 2) / 2) - Math.floor(baseCon / 2)));
    const projectedHpMax = active && !state.werewolfActive
      ? Math.max(1, Number(hpMaxTotal) || 1) + (Math.floor((conNow + 2) / 2) - Math.floor(conNow / 2))
      : Math.max(1, Number(hpMaxTotal) || 1);
    setChar(prev => {
      const prevState = normalizeOriginState(prev.originState);
      const nextState = { ...prevState, werewolfActive: Boolean(active) };
      const next = { ...prev, originState: nextState, hpAtual: active ? projectedHpMax : Math.min(baseHpCap, Number(prev.hpAtual) || 0) };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {}
      return next;
    });
    return { ok: true, message: active ? 'Forma de Lobisomem ativada; vida restaurada.' : 'Forma de Lobisomem encerrada.' };
  }, [char, hpMaxTotal, derived.attrsTotal]);

  const clearMetamorphForm = useCallback(() => {
    setChar(prev => {
      const state = normalizeOriginState(prev.originState);
      const next = { ...prev, originState: { ...state, activeMetamorphForm: -1 } };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const applyVampireLifesteal = useCallback((damage) => {
    if (char.origem !== 'vampiro' || !char.originState?.vampireActive) return { ok: false, message: 'Despertar da Maldição não está ativo.' };
    const dealt = Math.max(0, Number(damage) || 0);
    const heal = Math.floor(dealt / 2);
    if (heal <= 0) return { ok: false, message: 'Informe um dano causado maior que zero.' };
    const cap = Math.max(1, Number(hpMaxTotal) || 1);
    setChar(prev => {
      const next = { ...prev, hpAtual: Math.min(cap, (Number(prev.hpAtual) || 0) + heal) };
      try { localStorage.setItem('talos_char_draft', JSON.stringify(next)); } catch {}
      return next;
    });
    return { ok: true, heal, message: `Roubo de vitalidade: +${heal} HP.` };
  }, [char.origem, char.originState, hpMaxTotal]);

  const rollDeathSave = useCallback(() => {
    const current = charRef.current;
    const death = normalizeDeathSaveState(current.deathSaveState);
    if (death.dead) return { ok: false, message: 'O personagem já está MORTO. Registre uma ressurreição válida para voltar.' };
    if ((Number(current.hpAtual) || 0) > 0) return { ok: false, message: 'Teste de Vontade só fica disponível com HP em 0 ou menos.' };

    const rolled = rollFormula(DEATH_SAVE_TABLE_RULE.die);
    const resolved = resolveDeathSaveRoll(death, rolled.total);
    if (!resolved.ok) return resolved;

    const { success, successes, failures, resolution } = resolved;
    const nextHp = resolution === 'recovered'
      ? resolved.recoveredHp
      : resolution === 'dead'
        ? 0
        : (Number(current.hpAtual) || 0);
    const nextDeathState = resolved.state;

    const entry = makeDiceEntry({
      label: 'Teste de Vontade — MORRENDO',
      formula: DEATH_SAVE_TABLE_RULE.die,
      total: rolled.total,
      parts: rolled.parts,
      deathSaveSuccess: success,
      deathSaveSuccesses: successes,
      deathSaveFailures: failures,
      deathSaveResolution: resolution,
      deathSaveRule: DEATH_SAVE_TABLE_RULE.note,
    }, { type: 'death-save' });

    const next = {
      ...current,
      hpAtual: nextHp,
      deathSaveState: nextDeathState,
      diceHistory: pushDiceHistory(current.diceHistory, entry),
    };
    commitCharacter(next);

    return {
      ok: true,
      roll: entry,
      success,
      successes,
      failures,
      resolution,
      message: resolution === 'recovered'
        ? `${DEATH_SAVE_TABLE_RULE.successesToRecover} sucessos: o personagem recuperou ${DEATH_SAVE_TABLE_RULE.recoveryHp} HP e saiu de MORRENDO.`
        : resolution === 'dead'
          ? `${DEATH_SAVE_TABLE_RULE.failuresToDie} falhas: MORTE confirmada.`
          : success
            ? `Sucesso (${successes}/${DEATH_SAVE_TABLE_RULE.successesToRecover}).`
            : `Falha (${failures}/${DEATH_SAVE_TABLE_RULE.failuresToDie}).`,
    };
  }, [commitCharacter]);

  const reviveCharacter = useCallback((hp = 1) => {
    const current = charRef.current;
    const death = normalizeDeathSaveState(current.deathSaveState);
    if (!death.dead) return { ok: false, message: 'O personagem não está com MORTE confirmada.' };
    const restoredHp = Math.max(1, Math.min(Math.max(1, Number(hpMaxTotal) || 1), Number(hp) || 1));
    const next = {
      ...current,
      hpAtual: restoredHp,
      deathSaveState: reviveDeathSaveState(),
    };
    commitCharacter(next);
    return { ok: true, hp: restoredHp, message: `Ressurreição registrada: ${restoredHp} HP.` };
  }, [commitCharacter, hpMaxTotal]);

  const performRest = useCallback((type) => {
    const death = normalizeDeathSaveState(char.deathSaveState);
    if (death.dead) {
      return { ok: false, message: 'Personagem MORTO não recupera HP por descanso. Registre uma ressurreição válida primeiro.' };
    }
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

      let originState = resetOriginUsageForPeriod(prev.originState, type === 'long' ? 'long' : 'short');
      if (type === 'long') originState = resetOriginUsageForPeriod(originState, 'short');
      const next = {
        ...prev,
        hpAtual: endHp,
        cansacoAtual: 0,
        estados: (prev.estados || []).filter(estado => estado !== 'cansado'),
        officialAbilityUsage,
        originState,
        deathSaveState: endHp > 0 && !normalizeDeathSaveState(prev.deathSaveState).dead
          ? { ...DEFAULT_DEATH_SAVE_STATE, lastOutcome: 'healed' }
          : normalizeDeathSaveState(prev.deathSaveState),
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
      ok: true,
      type,
      startHp,
      endHp,
      recovered,
      hpMax,
      fatigueRecovered: Math.max(0, Number(char.cansacoAtual) || 0),
    };
  }, [char.cansacoAtual, char.hpAtual, char.deathSaveState, hpMaxTotal]);

  return {
    char,
    update,
    updateAttr,
    levelUp,
    learnShikata,
    setActiveShikata,
    setShikataLevel,
    chooseSubclass,
    dismissSubclassEvent,
    spendAttributePoint,
    refundAttributePoint,
    setCansaco,
    registerAbilityUse,
    useOfficialAbility,
    resetOfficialAbilityUse,
    startCombat,
    endCombat,
    advanceAbilityPeriod,
    spendTurnAction,
    adjustTurnActions,
    useOriginAbility,
    attemptGuardianRevestimento,
    rollThunganItem,
    setWerewolfForm,
    clearMetamorphForm,
    applyVampireLifesteal,
    rollDeathSave,
    reviveCharacter,
    performRest,
    exportChar,
    importChar,
    addInventoryItem,
    addCustomInventoryItem,
    updateCustomInventoryItem,
    removeInventoryItem,
    equipItem,
    toggleEstado,
    consumeConcentration,
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


function buildMulticlassAttackModifierOptions(char, modifierValues) {
  const learned = learnedShikataSummary(char);
  if (!learned.length) return [];
  const multi = learned.length > 1;
  const options = [];
  for (const shikata of learned) {
    for (const option of buildAttackModifierOptions(shikata, modifierValues)) {
      options.push({
        ...option,
        key: `${shikata.id}:${option.key}`,
        attributeKey: option.key,
        shikataId: shikata.id,
        shikataName: shikata.name,
        label: multi ? `${shikata.name} — ${option.label}` : option.label,
      });
    }
  }
  return options;
}

function normalizeCharacter(data = {}) {
  const merged = {
    ...defaultCharacter,
    ...data,
    attrs: { ...defaultCharacter.attrs, ...(data.attrs || {}) },
    moedas: { ...defaultCharacter.moedas, ...(data.moedas || {}) },
    professionState: {
      ...defaultCharacter.professionState,
      ...(data.professionState || {}),
      oficioEspecialidades: Array.isArray(data.professionState?.oficioEspecialidades) ? data.professionState.oficioEspecialidades : [],
    },
    deathSaveState: normalizeDeathSaveState(data.deathSaveState),
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
    shikataProgress: normalizeShikataProgress(data.shikataProgress, data),
    pendingSubclassChoice: data.pendingSubclassChoice && typeof data.pendingSubclassChoice === 'object' ? data.pendingSubclassChoice : null,
    officialAbilityUsage: data.officialAbilityUsage && typeof data.officialAbilityUsage === 'object' ? data.officialAbilityUsage : {},
    abilityTimeline: {
      ...defaultCharacter.abilityTimeline,
      ...(data.abilityTimeline || {}),
    },
    originState: normalizeOriginState(data.originState),
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
      bruxo: {
        ...defaultCharacter.classResources.bruxo,
        ...(data.classResources?.bruxo || {}),
        signalLevels: {
          ...defaultCharacter.classResources.bruxo.signalLevels,
          ...(data.classResources?.bruxo?.signalLevels || {}),
        },
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
    if ((data.talosRulesVersion || 0) < 8) {
      merged.originState = normalizeOriginState(merged.originState);
      merged.abilityTimeline = { ...defaultCharacter.abilityTimeline, ...(merged.abilityTimeline || {}), combatActive: false };
      merged.turnEconomy = { ...defaultCharacter.turnEconomy, ...(merged.turnEconomy || {}), fullSpent: 0, bonusSpent: 0, manualFullAdjustment: 0, manualBonusAdjustment: 0, temporaryEffects: [], reactionUses: [] };
    }
    if ((data.talosRulesVersion || 0) < 9) {
      // Lote 07: o DOCX v6 nomeia a subclasse do Spellstealer apenas como "Ditador".
      // Saves antigos usavam o alias "Ditador das Almas".
      if (merged.shikata === 'spellstealer' && merged.subclasse === 'Ditador das Almas') {
        merged.subclasse = 'Ditador';
      }
    }
    if ((data.talosRulesVersion || 0) < 10) {
      merged.classResources = {
        ...merged.classResources,
        bruxo: {
          ...defaultCharacter.classResources.bruxo,
          ...(merged.classResources?.bruxo || {}),
          signalLevels: {
            ...defaultCharacter.classResources.bruxo.signalLevels,
            ...(merged.classResources?.bruxo?.signalLevels || {}),
          },
        },
      };
    }
    if ((data.talosRulesVersion || 0) < 11) {
      merged.shikataProgress = normalizeShikataProgress(merged.shikataProgress, merged);
      merged.pendingSubclassChoice = null;
    }
    if ((data.talosRulesVersion || 0) < 12) {
      merged.professionState = {
        ...defaultCharacter.professionState,
        ...(merged.professionState || {}),
        oficioEspecialidades: Array.isArray(merged.professionState?.oficioEspecialidades) ? merged.professionState.oficioEspecialidades : [],
      };
      // MORRENDO agora é derivado automaticamente de HP <= 0.
      merged.estados = (Array.isArray(merged.estados) ? merged.estados : []).filter(estado => estado !== 'morrendo');
    }
    if ((data.talosRulesVersion || 0) < 13) {
      merged.deathSaveState = { ...DEFAULT_DEATH_SAVE_STATE };
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

  merged.deathSaveState = normalizeDeathSaveState(merged.deathSaveState);
  if ((Number(merged.hpAtual) || 0) > 0 && !merged.deathSaveState.dead) {
    merged.deathSaveState = { ...DEFAULT_DEATH_SAVE_STATE };
  }

  const spellstealerEntry = merged.shikataProgress?.entries?.spellstealer;
  if (spellstealerEntry?.subclasse === 'Ditador das Almas') spellstealerEntry.subclasse = 'Ditador';
  const bardoEntry = merged.shikataProgress?.entries?.bardo;
  if (bardoEntry) {
    const legacyBardoSubclasses = { 'Artista (Ofensivo)': 'Artista', 'Poeta (Defensivo)': 'Poeta' };
    bardoEntry.subclasse = legacyBardoSubclasses[bardoEntry.subclasse] || bardoEntry.subclasse;
  }

  return syncLegacyShikataFields(merged);
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
