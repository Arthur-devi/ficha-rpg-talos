export const ITEM_ATTRIBUTE_KEYS = [
  'forca',
  'magia',
  'constituicao',
  'inteligencia',
  'percepcao',
  'destreza',
  'carisma',
  'defesa',
  'sorte',
];

export const ITEM_ATTRIBUTE_LABELS = {
  forca: 'Força',
  magia: 'Magia',
  constituicao: 'Constituição',
  inteligencia: 'Inteligência',
  percepcao: 'Percepção',
  destreza: 'Destreza',
  carisma: 'Carisma',
  defesa: 'Defesa',
  sorte: 'Sorte',
};

const ATTRIBUTE_ALIASES = [
  ['forca', ['força', 'forca', 'for']],
  ['magia', ['magia', 'mag']],
  ['constituicao', ['constituição', 'constituicao', 'con', 'cons']],
  ['inteligencia', ['inteligência', 'inteligencia', 'int']],
  ['percepcao', ['percepção', 'percepcao', 'per']],
  ['destreza', ['destreza', 'des']],
  ['carisma', ['carisma', 'car']],
  ['defesa', ['defesa', 'def']],
  ['sorte', ['sorte', 'sor']],
];

const ATTRIBUTE_PATTERN = ATTRIBUTE_ALIASES
  .flatMap(([, aliases]) => aliases)
  .sort((a, b) => b.length - a.length)
  .join('|');

function createEffects() {
  return {
    ca: 0,
    attrs: Object.fromEntries(ITEM_ATTRIBUTE_KEYS.map(key => [key, 0])),
    deslocamento: 0,
    hpMax: 0,
    damage: '',
    special: [],
  };
}

function normalizeText(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function toSignedNumber(value, sign = 1) {
  if (value === undefined || value === null || value === '') return 0;
  const parsed = Number(String(value).replace('+', '').replace(',', '.'));
  return Number.isFinite(parsed) ? parsed * sign : 0;
}

function formatSigned(value, label) {
  if (!value) return null;
  return `${value > 0 ? '+' : ''}${value} ${label}`;
}

function attrKeyFromAlias(alias) {
  const normalized = normalizeText(alias);
  return ATTRIBUTE_ALIASES.find(([, aliases]) => aliases.some(item => normalizeText(item) === normalized))?.[0] || null;
}

function addAttr(effects, attrKey, value) {
  if (!attrKey || !value) return;
  effects.attrs[attrKey] = (effects.attrs[attrKey] || 0) + value;
}

function addMovement(effects, value) {
  if (!value) return;
  effects.deslocamento += value;
}

function parseDamage(item, effects) {
  const statDamage = String(item.stats || '').match(/\bDano\s*:\s*([^|.\n]+)/i)?.[1]?.trim();
  const damage = String(item.damage || statDamage || '').trim();
  if (!damage || /^[-—]$/.test(damage)) return;
  effects.damage = damage;
}

function parseStructuredStats(item, effects) {
  const stats = String(item.stats || '');

  for (const match of stats.matchAll(/\bCA\s*:\s*([+-]?\d+|infinito)/gi)) {
    if (normalizeText(match[1]) === 'infinito') {
      effects.special.push('CA infinito');
    } else {
      effects.ca += toSignedNumber(match[1]);
    }
  }

  for (const match of stats.matchAll(/\b(?:Defesa|Def)\s*:\s*([+-]?\d+)/gi)) {
    addAttr(effects, 'defesa', toSignedNumber(match[1]));
  }

  parseBonusText(stats, effects, true);
}

function parseBonusText(text, effects, isStructured = false) {
  const segments = String(text || '')
    .split(/[\n.;|]+/)
    .map(part => part.trim())
    .filter(Boolean);

  for (const segment of segments) {
    const normalized = normalizeText(segment);
    const isEquipmentContext = isStructured ||
      /\b(equipad|carregar|portador|usuario|usuário|utilizar|concede|recebe|ganha|aumenta|aumente|perde|perdera|perderá)\b/.test(normalized);
    if (!isEquipmentContext) continue;

    const affectsEnemy = /\b(inimig|alvo|adversari|criatura atingida|oponente)\b/.test(normalized);
    if (affectsEnemy && !/\busuario|usuário|portador\b/.test(normalized)) continue;

    const lossMatch = normalized.match(/\bperd(?:e|era|erao|eram|erao|era|er[aá])\s+(\d+)\s+de\s+([a-z]+)(?:\s+e\s+(?:de\s+)?([a-z]+))?/);
    if (lossMatch) {
      for (const alias of [lossMatch[2], lossMatch[3]].filter(Boolean)) {
        const attrKey = attrKeyFromAlias(alias);
        if (attrKey) addAttr(effects, attrKey, -toSignedNumber(lossMatch[1]));
        if (alias === 'deslocamento') addMovement(effects, -toSignedNumber(lossMatch[1]));
      }
      continue;
    }

    const caMatch = normalized.match(/\b(?:concede|recebe|ganha|aumenta|aumente)\s+([+-]?\d+)\s+de\s+ca\b/);
    if (caMatch) effects.ca += toSignedNumber(caMatch[1]);

    const movementMatch = normalized.match(/\b(?:deslocamento|mobilidade)\s+em\s+([+-]?\d+)/) ||
      normalized.match(/\b([+-]?\d+)\s+de\s+(?:deslocamento|mobilidade)\b/);
    if (movementMatch) addMovement(effects, toSignedNumber(movementMatch[1]));

    const hpMatch = normalized.match(/\b([+-]?\d+)\s+(?:hp|pontos?\s+de\s+vida|vida)\b/);
    if (hpMatch) effects.hpMax += toSignedNumber(hpMatch[1]);

    const attrRegex = new RegExp(`([+-]?\\d+)\\s+(?:de\\s+|em\\s+|no\\s+|na\\s+)?(${ATTRIBUTE_PATTERN})\\b`, 'gi');
    for (const match of segment.matchAll(attrRegex)) {
      const attrKey = attrKeyFromAlias(match[2]);
      if (!attrKey) continue;
      addAttr(effects, attrKey, toSignedNumber(match[1]));
    }

    const attrAfterRegex = new RegExp(`(${ATTRIBUTE_PATTERN})\\s+em\\s+([+-]?\\d+)`, 'gi');
    for (const match of segment.matchAll(attrAfterRegex)) {
      const attrKey = attrKeyFromAlias(match[1]);
      if (!attrKey) continue;
      addAttr(effects, attrKey, toSignedNumber(match[2]));
    }
  }
}

export function parseItemEffects(item) {
  const effects = createEffects();
  if (!item) return effects;

  parseDamage(item, effects);
  parseStructuredStats(item, effects);
  parseBonusText(item.desc, effects);

  return effects;
}

export function summarizeEffects(effects, { includeEmpty = false } = {}) {
  const summary = [];

  if (effects.damage) summary.push(`Dano: ${effects.damage}`);
  if (effects.ca) summary.push(formatSigned(effects.ca, 'CA'));
  if (effects.hpMax) summary.push(formatSigned(effects.hpMax, 'HP'));
  if (effects.deslocamento) summary.push(formatSigned(effects.deslocamento, 'Deslocamento'));

  for (const key of ITEM_ATTRIBUTE_KEYS) {
    const label = ITEM_ATTRIBUTE_LABELS[key];
    const text = formatSigned(effects.attrs[key], label);
    if (text) summary.push(text);
  }

  summary.push(...effects.special);
  return summary.length > 0 ? summary : includeEmpty ? ['Sem bônus automático detectado'] : [];
}

export function summarizeItemEffects(item, options) {
  return summarizeEffects(parseItemEffects(item), options);
}

export function aggregateItemEffects(items) {
  const total = createEffects();

  for (const item of items.filter(Boolean)) {
    const effects = parseItemEffects(item);
    total.ca += effects.ca;
    total.deslocamento += effects.deslocamento;
    total.hpMax += effects.hpMax;
    total.special.push(...effects.special.map(text => `${item.name}: ${text}`));

    for (const key of ITEM_ATTRIBUTE_KEYS) {
      total.attrs[key] += effects.attrs[key] || 0;
    }

    if (effects.damage) {
      total.special.push(`${item.name}: dano ${effects.damage}`);
    }
  }

  total.summary = summarizeEffects(total);
  return total;
}
