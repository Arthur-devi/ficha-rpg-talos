import { getEvolucao } from './evolucoes.js';

export const ACTION_LABELS = {
  full: 'Ação completa',
  bonus: 'Ação bônus',
  reaction: 'Reação',
  free: 'Sem ação',
};

function normalizeText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function cumulativeEvolutionTexts(shikataId, abilityName, level) {
  const rows = getEvolucao(shikataId, abilityName) || [];
  return rows
    .filter(row => Number(row.nivel) <= Number(level || 1))
    .map(row => row.desc || '');
}

function applicableLevelClauses(description, level) {
  const text = String(description || '');
  const clauses = [];
  const regex = /(?:nv\.?|nivel)\s*(\d+)\s*:\s*([^.;]+)/gi;
  let match;
  while ((match = regex.exec(text))) {
    if (Number(level || 1) >= Number(match[1])) clauses.push(match[2]);
  }
  return clauses;
}

function uniqueOptions(options) {
  const map = new Map();
  options.forEach(option => {
    const key = `${option.type}:${option.cost}`;
    if (!map.has(key)) map.set(key, option);
  });
  return [...map.values()];
}

export function getAbilityActionSpec(shikataId, ability, level) {
  if (!ability || ability.tipo === 'passiva') {
    return { options: [{ type: 'free', cost: 0, label: ACTION_LABELS.free }], defaultMode: 'free', source: 'passiva' };
  }

  const usage = normalizeText(ability.usos || '');
  const rawDesc = String(ability.desc || '');
  const desc = normalizeText(rawDesc);
  const descWithoutFutureClauses = normalizeText(rawDesc.replace(/(?:nv\.?|nivel)\s*\d+\s*:\s*[^.;]+[.;]?/gi, ' '));
  const evolutionTexts = cumulativeEvolutionTexts(shikataId, ability.nome, level).map(normalizeText);
  const levelClauses = applicableLevelClauses(ability.desc, level).map(normalizeText);
  const currentTexts = [usage, ...evolutionTexts, ...levelClauses].filter(Boolean);
  const all = [usage, desc, ...evolutionTexts, ...levelClauses].filter(Boolean).join(' | ');

  // The Monk's CHI attacks explicitly do not consume actions in TALOS v6.
  if (shikataId === 'monge' && Number(level || 1) >= 2 && /\[chi\]/i.test(ability.nome || '')) {
    return { options: [{ type: 'free', cost: 0, label: ACTION_LABELS.free }], defaultMode: 'free', source: 'chi' };
  }

  // Only treat "sem ação" as the ability's own cost when it appears in its usage/current evolution.
  // This avoids false positives such as "after using X, you may use Y without an action" in a description.
  if (currentTexts.some(text => /\bsem acao\b|nao consome acao|nao consomem acoes/.test(text))) {
    return { options: [{ type: 'free', cost: 0, label: ACTION_LABELS.free }], defaultMode: 'free', source: 'explicit' };
  }

  const options = [];
  let defaultMode = null;

  const twoFull = currentTexts.some(text => /2\s*acoes?(?:\s+completas?)?\b/.test(text));
  if (twoFull) {
    options.push({ type: 'full', cost: 2, label: '2 ações completas' });
    defaultMode = 'full';
  } else {
    if (ability.tipo === 'ativo') {
      options.push({ type: 'full', cost: 1, label: ACTION_LABELS.full });
      defaultMode = 'full';
    }
    if (ability.tipo === 'bonus') {
      options.push({ type: 'bonus', cost: 1, label: ACTION_LABELS.bonus });
      defaultMode = 'bonus';
    }
    if (ability.tipo === 'reacao') {
      options.push({ type: 'reaction', cost: 0, label: ACTION_LABELS.reaction });
      defaultMode = 'reaction';
    }
  }

  // Some abilities gain alternative modes as they evolve (e.g. action bonus or reaction).
  const optionTexts = [descWithoutFutureClauses, ...evolutionTexts, ...levelClauses].join(' | ');
  if (/acao bonus/.test(optionTexts)) options.push({ type: 'bonus', cost: 1, label: ACTION_LABELS.bonus });
  if (/\breacao\b/.test(optionTexts)) options.push({ type: 'reaction', cost: 0, label: ACTION_LABELS.reaction });

  // Explicit "sem ação" in the ability's own usage wins over generic type metadata.
  if (/\bsem acao\b/.test(usage)) options.push({ type: 'free', cost: 0, label: ACTION_LABELS.free });

  const finalOptions = uniqueOptions(options.length ? options : [{ type: 'full', cost: 1, label: ACTION_LABELS.full }]);
  if (!defaultMode || !finalOptions.some(option => option.type === defaultMode)) defaultMode = finalOptions[0].type;

  return {
    options: finalOptions,
    defaultMode,
    source: all,
  };
}

export function getBaseTurnEconomy(char) {
  const level = Number(char?.nivel) || 1;
  const fullBase = 2;
  // Maestria Tática: Ladino level 5 permanently gains +1 bonus action.
  const bonusBase = 1 + (char?.shikata === 'ladino' && level >= 5 ? 1 : 0);
  return { fullBase, bonusBase };
}

function activeEffectBonus(turnEconomy, type) {
  return (turnEconomy?.temporaryEffects || [])
    .filter(effect => effect.type === type && Number(effect.remainingTurns) > 0)
    .reduce((sum, effect) => sum + (Number(effect.amount) || 0), 0);
}

export function getTurnEconomySnapshot(char) {
  const state = char?.turnEconomy || {};
  const base = getBaseTurnEconomy(char);
  const fullAdjustment = Number(state.manualFullAdjustment) || 0;
  const bonusAdjustment = Number(state.manualBonusAdjustment) || 0;
  const fullEffectBonus = activeEffectBonus(state, 'full');
  const bonusEffectBonus = activeEffectBonus(state, 'bonus');
  const fullTotal = Math.max(0, base.fullBase + fullAdjustment + fullEffectBonus);
  const bonusTotal = Math.max(0, base.bonusBase + bonusAdjustment + bonusEffectBonus);
  const fullSpent = Math.max(0, Math.min(fullTotal, Number(state.fullSpent) || 0));
  const bonusSpent = Math.max(0, Math.min(bonusTotal, Number(state.bonusSpent) || 0));

  return {
    fullBase: base.fullBase,
    bonusBase: base.bonusBase,
    fullAdjustment,
    bonusAdjustment,
    fullEffectBonus,
    bonusEffectBonus,
    fullTotal,
    bonusTotal,
    fullSpent,
    bonusSpent,
    fullRemaining: Math.max(0, fullTotal - fullSpent),
    bonusRemaining: Math.max(0, bonusTotal - bonusSpent),
    temporaryEffects: Array.isArray(state.temporaryEffects) ? state.temporaryEffects : [],
    reactionUses: Array.isArray(state.reactionUses) ? state.reactionUses : [],
  };
}

export function canSpendAction(char, actionOption) {
  if (!actionOption || actionOption.type === 'free' || actionOption.type === 'reaction') {
    return { ok: true };
  }
  const snapshot = getTurnEconomySnapshot(char);
  const cost = Math.max(0, Number(actionOption.cost) || 0);
  if (actionOption.type === 'full' && snapshot.fullRemaining < cost) {
    return { ok: false, message: `Ações completas insuficientes: ${snapshot.fullRemaining}/${cost} disponível(is).` };
  }
  if (actionOption.type === 'bonus' && snapshot.bonusRemaining < cost) {
    return { ok: false, message: `Ações bônus insuficientes: ${snapshot.bonusRemaining}/${cost} disponível(is).` };
  }
  return { ok: true };
}

export function spendActionState(turnEconomy, actionOption, label = '') {
  const next = {
    fullSpent: Math.max(0, Number(turnEconomy?.fullSpent) || 0),
    bonusSpent: Math.max(0, Number(turnEconomy?.bonusSpent) || 0),
    manualFullAdjustment: Number(turnEconomy?.manualFullAdjustment) || 0,
    manualBonusAdjustment: Number(turnEconomy?.manualBonusAdjustment) || 0,
    temporaryEffects: Array.isArray(turnEconomy?.temporaryEffects) ? [...turnEconomy.temporaryEffects] : [],
    reactionUses: Array.isArray(turnEconomy?.reactionUses) ? [...turnEconomy.reactionUses] : [],
  };

  if (!actionOption || actionOption.type === 'free') return next;
  if (actionOption.type === 'reaction') {
    next.reactionUses.push({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, label, at: new Date().toISOString() });
    return next;
  }
  const cost = Math.max(0, Number(actionOption.cost) || 0);
  if (actionOption.type === 'full') next.fullSpent += cost;
  if (actionOption.type === 'bonus') next.bonusSpent += cost;
  return next;
}

function actionEffectForAbility(shikataId, ability, level) {
  const name = normalizeText(ability?.nome || '');

  if (shikataId === 'guerreiro' && /impulso explosivo|adrenalina/.test(name)) {
    return { type: 'full', amount: 1, remainingTurns: 1, source: ability.nome };
  }
  if (shikataId === 'necromante' && /necromancia rapida/.test(name)) {
    return { type: 'full', amount: 2, remainingTurns: 1, source: ability.nome };
  }
  if (shikataId === 'monge' && /o oceano/.test(name)) {
    return { type: 'full', amount: 1, remainingTurns: 2, source: ability.nome };
  }
  if (shikataId === 'hemomante' && /renascimento epico/.test(name)) {
    return { type: 'full', amount: 1, remainingTurns: 1, source: ability.nome };
  }


  return null;
}

export function applyAbilityActionEffect(turnEconomy, shikataId, ability, level) {
  const effect = actionEffectForAbility(shikataId, ability, level);
  if (!effect) return { turnEconomy, effect: null };
  const next = {
    ...turnEconomy,
    temporaryEffects: [...(turnEconomy?.temporaryEffects || []), {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      ...effect,
    }],
  };
  return { turnEconomy: next, effect };
}

export function advanceTurnActionState(turnEconomy, period) {
  const state = {
    fullSpent: 0,
    bonusSpent: 0,
    manualFullAdjustment: Number(turnEconomy?.manualFullAdjustment) || 0,
    manualBonusAdjustment: Number(turnEconomy?.manualBonusAdjustment) || 0,
    temporaryEffects: Array.isArray(turnEconomy?.temporaryEffects) ? [...turnEconomy.temporaryEffects] : [],
    reactionUses: [],
  };

  if (period === 'turn') {
    state.manualFullAdjustment = 0;
    state.manualBonusAdjustment = 0;
    state.temporaryEffects = state.temporaryEffects
      .map(effect => ({ ...effect, remainingTurns: Math.max(0, (Number(effect.remainingTurns) || 0) - 1) }))
      .filter(effect => Number(effect.remainingTurns) > 0);
    return state;
  }

  if (period === 'combat') {
    state.manualFullAdjustment = 0;
    state.manualBonusAdjustment = 0;
    state.temporaryEffects = [];
    return state;
  }

  // Day/week/month do not themselves change the current turn's spent actions.
  return {
    ...turnEconomy,
    reactionUses: Array.isArray(turnEconomy?.reactionUses) ? turnEconomy.reactionUses : [],
  };
}

export function adjustActionState(turnEconomy, type, delta) {
  const next = {
    fullSpent: Math.max(0, Number(turnEconomy?.fullSpent) || 0),
    bonusSpent: Math.max(0, Number(turnEconomy?.bonusSpent) || 0),
    manualFullAdjustment: Number(turnEconomy?.manualFullAdjustment) || 0,
    manualBonusAdjustment: Number(turnEconomy?.manualBonusAdjustment) || 0,
    temporaryEffects: Array.isArray(turnEconomy?.temporaryEffects) ? [...turnEconomy.temporaryEffects] : [],
    reactionUses: Array.isArray(turnEconomy?.reactionUses) ? [...turnEconomy.reactionUses] : [],
  };
  if (type === 'full') next.manualFullAdjustment += Number(delta) || 0;
  if (type === 'bonus') next.manualBonusAdjustment += Number(delta) || 0;
  return next;
}
