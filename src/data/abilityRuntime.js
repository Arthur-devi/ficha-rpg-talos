import { getEvolucao } from './evolucoes.js';
import { getOfficialAbilityDamageSpec } from './damageRuntime.js';
import { getAbilityActionSpec } from './turnRuntime.js';

const PERIOD_LABELS = {
  short: 'descanso curto',
  long: 'descanso longo',
  turn: 'turno',
  combat: 'combate',
  day: 'dia',
  week: 'semana',
  month: 'mês',
  none: 'sem recarga automática',
};

function normalizeText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/→/g, '->')
    .replace(/\s+/g, ' ')
    .trim();
}

function activeEvolutionTexts(shikataId, abilityName, level) {
  const rows = getEvolucao(shikataId, abilityName) || [];
  if (!rows.length) return [];
  const eligible = rows.filter(row => Number(row.nivel) <= Number(level || 1));
  if (!eligible.length) return [];
  const maxLevel = Math.max(...eligible.map(row => Number(row.nivel) || 0));
  return eligible.filter(row => Number(row.nivel) === maxLevel).map(row => row.desc || '');
}

function findFirst(texts, regex) {
  for (const text of texts) {
    const match = normalizeText(text).match(regex);
    if (match) return match;
  }
  return null;
}

function parseUsage(texts) {
  const joined = texts.map(normalizeText);
  const cooldown = findFirst(joined, /(\d+)x?\s*a cada\s*(\d+)\s*(turnos?|dias?)/);
  if (cooldown) {
    const unit = cooldown[3].startsWith('turn') ? 'turn' : 'day';
    return {
      // Cooldowns are availability gates, not a finite charge pool. Keeping
      // maxUses null prevents a 1x/a-cada-N ability from becoming permanently
      // exhausted after its first activation.
      maxUses: null,
      resetType: null,
      cooldown: { every: Number(cooldown[2]) || 1, unit, uses: Number(cooldown[1]) || 1 },
      label: `${cooldown[1]}x a cada ${cooldown[2]} ${unit === 'turn' ? 'turnos' : 'dias'}`,
    };
  }

  const patterns = [
    { regex: /(\d+)\s*(?:x|flechas?|invocacoes?|invocacao)\s*(?:\/|por\s+)?\s*desc\.?\s*curto/, resetType: 'short' },
    { regex: /(\d+)\s*(?:x|flechas?|invocacoes?|invocacao)\s*(?:\/|por\s+)?\s*desc\.?\s*longo/, resetType: 'long' },
    { regex: /(\d+)x?\s*(?:\/|por\s+)?\s*turno\b/, resetType: 'turn' },
    { regex: /(\d+)x?\s*(?:por\s+)?combate\b/, resetType: 'combat' },
    { regex: /(\d+)x?\s*(?:\/|por\s+)?\s*dia\b/, resetType: 'day' },
    { regex: /(\d+)x?\s*por\s+semana\b/, resetType: 'week' },
    { regex: /(\d+)x?\s*semanal\b/, resetType: 'week' },
    { regex: /(\d+)x?\s*por\s+mes\b/, resetType: 'month' },
  ];

  for (const { regex, resetType } of patterns) {
    const match = findFirst(joined, regex);
    if (match) {
      const maxUses = Number(match[1]) || 1;
      return { maxUses, resetType, label: `${maxUses}x por ${PERIOD_LABELS[resetType]}` };
    }
  }

  if (joined.some(text => /\b(?:ilimitado|ilimitada|ilimitados|ilimitadas|sem limite por turno)\b/.test(text))) {
    return { maxUses: null, resetType: null, label: 'Ilimitado' };
  }

  return { maxUses: null, resetType: null, label: null };
}

function parseLifetime(texts) {
  const match = findFirst(texts, /(\d+)x?\s*em\s*vida/);
  return match ? Number(match[1]) || null : null;
}

function parseTargetRule(texts, defaultReset) {
  const options = [
    { regex: /1x\s*por\s*aliado\s*\/\s*inimigo/, label: 'aliado/inimigo' },
    { regex: /1x\s*por\s*inimigo\s*\/\s*combate/, label: 'inimigo', resetType: 'combat' },
    { regex: /1x\s*por\s*inimigo\s*\/\s*desc\.?\s*curto/, label: 'inimigo', resetType: 'short' },
    { regex: /1x\s*por\s*pessoa\s*\/\s*dia/, label: 'pessoa', resetType: 'day' },
    { regex: /1x\s*por\s*criatura/, label: 'criatura' },
    { regex: /1x\s*por\s*monstro/, label: 'monstro' },
    { regex: /1x\s*por\s*inimigo/, label: 'inimigo' },
    { regex: /(?:\(|\b)1\s*\/\s*inimigo(?:\)|\b)/, label: 'inimigo' },
    { regex: /1x\s*por\s*alvo/, label: 'alvo' },
  ];
  for (const option of options) {
    if (findFirst(texts, option.regex)) {
      return {
        label: option.label,
        resetType: option.resetType || defaultReset || null,
      };
    }
  }
  return null;
}

function parseDiceOrNumber(raw) {
  if (!raw) return null;
  const token = String(raw).trim().toLowerCase();
  if (/^\d+d\d+$/.test(token)) return { kind: 'dice', formula: token };
  const value = Number(token);
  if (Number.isFinite(value)) return { kind: 'fixed', value };
  return null;
}

function parseHpCost(primaryTexts, description) {
  const explicit = findFirst(primaryTexts, /(?:custa\s*)?(\d+d\d+|\d+(?:[.,]\d+)?)\s*(?:de\s*)?hp\b/);
  if (explicit) return parseDiceOrNumber(explicit[1].replace(',', '.'));

  const desc = normalizeText(description);
  const fromDesc = desc.match(/custa\s*(\d+d\d+|\d+(?:[.,]\d+)?)\s*(?:de\s*)?(?:hp|vida)\b/);
  if (fromDesc) return parseDiceOrNumber(fromDesc[1].replace(',', '.'));
  return null;
}

function parsePerformanceCost(primaryTexts) {
  const match = findFirst(primaryTexts, /(\d+)\s*performance\b/);
  return match ? Number(match[1]) || 0 : 0;
}

function parseOptionalMlCost(texts) {
  const normalized = texts.map(normalizeText);
  const patterns = [
    /(?:gastar|usar)\s*(\d+)\s*ml\b/,
    /(?:por|=)\s*(\d+)\s*ml\b/,
    /(\d+)\s*ml\s*(?:=|cria|explode|dobra|adiciona|permite)/,
  ];
  for (const regex of patterns) {
    const match = findFirst(normalized, regex);
    if (match) return Number(match[1]) || 0;
  }
  return 0;
}

function parseEssenceCost(shikataId, primaryTexts) {
  if (shikataId !== 'manipulador-essencia') return null;
  const match = findFirst(primaryTexts, /(\d+)\s*(dias?|semanas?|meses?|anos?)\b/);
  if (!match) return null;
  return { amount: Number(match[1]) || 0, unit: match[2] };
}

function parseCurrentUsageText(shikataId, ability, level) {
  const evolution = activeEvolutionTexts(shikataId, ability.nome, level);
  const usageMarkers = /(desc\.?\s*(?:curto|longo)|\/turno|por turno|por combate|\bcombate\b|por dia|\/dia|por semana|semanal|por mes|a cada|em vida)/i;
  const evolutionUsage = evolution.filter(text => usageMarkers.test(text));
  return evolutionUsage.length ? evolutionUsage : (ability.usos ? [ability.usos] : []);
}

export function getAbilityKey(shikataId, abilityName) {
  return `${shikataId || 'sem-shikata'}::${abilityName || 'habilidade'}`;
}

export function getAbilityRuntimeSpec(shikataId, ability, level, subclasse) {
  const evolutionTexts = activeEvolutionTexts(shikataId, ability.nome, level);
  const baseUsageTexts = [ability.usos || ''].filter(Boolean);
  const fallbackTexts = [...baseUsageTexts, ability.desc || ''].filter(Boolean);
  const allTexts = [...evolutionTexts, ...fallbackTexts];
  const evolutionUsage = parseUsage(evolutionTexts);
  const hasEvolutionUsage = evolutionUsage.maxUses != null || !!evolutionUsage.resetType || !!evolutionUsage.cooldown || evolutionUsage.label === 'Ilimitado';
  const usage = hasEvolutionUsage ? evolutionUsage : parseUsage(baseUsageTexts);
  const currentUsageTexts = hasEvolutionUsage ? evolutionTexts : baseUsageTexts;
  const lifetimeCap = parseLifetime(allTexts);
  const targetRule = parseTargetRule(allTexts, usage.resetType);
  const damageSpec = getOfficialAbilityDamageSpec(shikataId, ability, level);
  const actionSpec = getAbilityActionSpec(shikataId, ability, level);

  const costEvolutionTexts = evolutionTexts.filter(text => {
    const normalized = normalizeText(text);
    const hasHp = /(?:\d+d\d+|\d+(?:[.,]\d+)?)\s*hp\b/.test(normalized);
    if (!hasHp) return false;
    return /desc\.?\s*(?:curto|longo)|custa|^\s*(?:\d+d\d+|\d+(?:[.,]\d+)?)\s*hp\b|\|\s*(?:\d+d\d+|\d+(?:[.,]\d+)?)\s*hp\b/.test(normalized);
  });
  const hpCost = parseHpCost([...costEvolutionTexts, ...baseUsageTexts], ability.desc || '');
  const performanceCost = parsePerformanceCost(evolutionTexts) || parsePerformanceCost(baseUsageTexts);

  let mlCost = 0;
  if (shikataId === 'hemomante') {
    const evolutionMl = parseOptionalMlCost(evolutionTexts);
    const saysUnspecified = evolutionTexts.some(text => /nao especificad/.test(normalizeText(text)));
    mlCost = evolutionMl || (saysUnspecified ? 0 : parseOptionalMlCost([ability.desc || '']));
  }
  const essenceCost = parseEssenceCost(shikataId, evolutionTexts.length ? evolutionTexts : baseUsageTexts);

  const empiricalDiscount = shikataId === 'hemomante'
    && subclasse === 'Hemomante Empírico'
    && Number(level) >= 14;
  const bloodMageDiscount = shikataId === 'mago'
    && subclasse === 'Mago de Sangue'
    && Number(level) >= 17;
  const lifeCostMultiplier = empiricalDiscount || bloodMageDiscount ? 0.5 : 1;
  const lifeCostDiscountLabel = empiricalDiscount
    ? 'Custo Empírico'
    : bloodMageDiscount
      ? 'O Controle do Sangue'
      : null;

  return {
    key: getAbilityKey(shikataId, ability.nome),
    trackable: ability.tipo !== 'passiva',
    maxUses: usage.maxUses,
    resetType: usage.resetType,
    resetLabel: usage.resetType ? PERIOD_LABELS[usage.resetType] : null,
    usageLabel: usage.label,
    cooldown: usage.cooldown || null,
    lifetimeCap,
    targetRule,
    damageSpec,
    actionSpec,
    hpCost,
    performanceCost,
    optionalMlCost: mlCost,
    mlAllowsExtraUse: mlCost > 0 && /permite uso extra/.test(normalizeText(ability.desc || '')),
    essenceCost,
    empiricalDiscount,
    bloodMageDiscount,
    lifeCostMultiplier,
    lifeCostDiscountLabel,
    currentUsageTexts,
  };
}

export function rollCost(cost) {
  if (!cost) return 0;
  if (cost.kind === 'fixed') return Number(cost.value) || 0;
  const match = String(cost.formula || '').match(/^(\d+)d(\d+)$/i);
  if (!match) return 0;
  const count = Math.max(1, Number(match[1]) || 1);
  const sides = Math.max(1, Number(match[2]) || 1);
  let total = 0;
  for (let i = 0; i < count; i += 1) total += Math.floor(Math.random() * sides) + 1;
  return total;
}

export function getAbilityAvailability(spec, record = {}, timeline = {}, resources = {}) {
  const used = Math.max(0, Number(record.used) || 0);
  const lifetimeUsed = Math.max(0, Number(record.lifetimeUsed) || 0);
  const remaining = spec.maxUses == null ? null : Math.max(0, spec.maxUses - used);
  const lifetimeRemaining = spec.lifetimeCap == null ? null : Math.max(0, spec.lifetimeCap - lifetimeUsed);

  let cooldownRemaining = 0;
  if (spec.cooldown) {
    const counter = Number(timeline[spec.cooldown.unit]) || 0;
    const lastUsed = Number(record[spec.cooldown.unit === 'turn' ? 'lastUsedTurn' : 'lastUsedDay']);
    if (Number.isFinite(lastUsed) && lastUsed > 0) {
      cooldownRemaining = Math.max(0, spec.cooldown.every - (counter - lastUsed));
    }
  }

  const performance = Math.max(0, Number(resources.performance) || 0);
  const ml = Math.max(0, Number(resources.ml) || 0);

  const blockedByUses = remaining !== null && remaining <= 0;
  const blockedByLifetime = lifetimeRemaining !== null && lifetimeRemaining <= 0;
  const blockedByCooldown = cooldownRemaining > 0;
  const blockedByPerformance = spec.performanceCost > 0 && performance < spec.performanceCost;

  return {
    used,
    remaining,
    lifetimeUsed,
    lifetimeRemaining,
    cooldownRemaining,
    blockedByUses,
    blockedByLifetime,
    blockedByCooldown,
    blockedByPerformance,
    mlAvailable: ml,
    available: !(blockedByUses || blockedByLifetime || blockedByCooldown || blockedByPerformance),
  };
}

export function formatHpCost(cost) {
  if (!cost) return null;
  if (cost.kind === 'dice') return `${cost.formula.toUpperCase()} HP`;
  return `${cost.value} HP`;
}

export function resetLabel(resetType) {
  return PERIOD_LABELS[resetType] || null;
}
