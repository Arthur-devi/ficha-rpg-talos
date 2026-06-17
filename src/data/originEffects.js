import { ITEM_ATTRIBUTE_KEYS, ITEM_ATTRIBUTE_LABELS } from './itemEffects';

function createEffects() {
  return {
    attrs: Object.fromEntries(ITEM_ATTRIBUTE_KEYS.map(key => [key, 0])),
    ca: 0,
    hpMax: 0,
    deslocamentoBase: 0,
    limiteCansacoBase: 0,
    special: [],
    summary: [],
  };
}

function formatSigned(value, label) {
  if (!value) return null;
  return `${value > 0 ? '+' : ''}${value} ${label}`;
}

function parseExtra(extra, effects) {
  const text = String(extra || '');

  for (const match of text.matchAll(/([+-]\d+)\s*(?:HP|vida|pontos de vida)/gi)) {
    effects.hpMax += Number(match[1]);
  }

  for (const match of text.matchAll(/([+-]\d+)\s*CA/gi)) {
    effects.ca += Number(match[1]);
  }

  const remaining = text
    .replace(/[+-]\d+\s*(?:HP|vida|pontos de vida)/gi, '')
    .replace(/[+-]\d+\s*CA/gi, '')
    .replace(/[,;|]/g, '')
    .trim();

  if (remaining) effects.special.push(remaining);
}

export function getOriginEffects(origin) {
  const effects = createEffects();
  if (!origin) return effects;

  for (const key of ITEM_ATTRIBUTE_KEYS) {
    effects.attrs[key] = (origin.bonus?.[key] || 0) + (origin.malus?.[key] || 0);
  }

  effects.deslocamentoBase = origin.deslocamento || 0;
  effects.limiteCansacoBase = origin.limiteCansaco || 0;
  parseExtra(origin.extra, effects);

  effects.summary = summarizeOriginEffects(effects);
  return effects;
}

export function summarizeOriginEffects(effects) {
  const summary = [];

  for (const key of ITEM_ATTRIBUTE_KEYS) {
    const text = formatSigned(effects.attrs[key], ITEM_ATTRIBUTE_LABELS[key]);
    if (text) summary.push(text);
  }

  const ca = formatSigned(effects.ca, 'CA');
  const hp = formatSigned(effects.hpMax, 'HP');
  if (ca) summary.push(ca);
  if (hp) summary.push(hp);

  if (effects.deslocamentoBase) summary.push(`Deslocamento base ${effects.deslocamentoBase}`);
  if (effects.limiteCansacoBase) summary.push(`Cansaço base ${effects.limiteCansacoBase}`);

  summary.push(...effects.special);
  return summary;
}
