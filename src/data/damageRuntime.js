import { getEvolucao } from './evolucoes.js';
import { makeDiceEntry, normalizeResolvedFormula, rollFormula } from './diceRuntime.js';

export const DAMAGE_TYPES = [
  { value: '', label: 'Não definido' },
  { value: 'fisico', label: 'Físico' },
  { value: 'magico', label: 'Mágico' },
  { value: 'real', label: 'Dano Real' },
  { value: 'fogo', label: 'Fogo' },
  { value: 'gelo', label: 'Gelo / Gélido' },
  { value: 'raio', label: 'Raio / Elétrico' },
  { value: 'necrotico', label: 'Necrótico' },
  { value: 'acido', label: 'Ácido / Corrosivo' },
  { value: 'veneno', label: 'Veneno' },
  { value: 'sangramento', label: 'Sangramento' },
  { value: 'concussao', label: 'Concussão' },
  { value: 'cortante', label: 'Cortante' },
  { value: 'perfurante', label: 'Perfurante' },
  { value: 'flamejante', label: 'Flamejante' },
  { value: 'explosivo', label: 'Explosivo' },
  { value: 'outro', label: 'Outro' },
];

export const DAMAGE_SCALINGS = [
  { value: '', label: 'Sem modificador' },
  { value: 'forca', label: 'Mod. Força' },
  { value: 'magia', label: 'Mod. Magia' },
  { value: 'constituicao', label: 'Mod. Constituição' },
  { value: 'inteligencia', label: 'Mod. Inteligência' },
  { value: 'percepcao', label: 'Mod. Percepção' },
  { value: 'destreza', label: 'Mod. Destreza' },
  { value: 'carisma', label: 'Mod. Carisma' },
  { value: 'defesa', label: 'Mod. Defesa' },
  { value: 'sorte', label: 'Mod. Sorte' },
];

const MODIFIER_ALIASES = {
  forca: 'forca', for: 'forca',
  magia: 'magia', mag: 'magia',
  constituicao: 'constituicao', con: 'constituicao', cons: 'constituicao',
  inteligencia: 'inteligencia', int: 'inteligencia',
  percepcao: 'percepcao', per: 'percepcao',
  destreza: 'destreza', des: 'destreza', dest: 'destreza',
  carisma: 'carisma', car: 'carisma',
  defesa: 'defesa', def: 'defesa',
  sorte: 'sorte', sor: 'sorte',
};

const DAMAGE_TYPE_PATTERNS = [
  ['real', /dano\s+real/],
  ['fisico', /dano\s+fisic|fisico/],
  ['magico', /dano\s+magic|magico/],
  ['fogo', /\bfogo\b/],
  ['gelo', /gelid|\bgelo\b|congel/],
  ['raio', /eletric|dano\s+(?:de\s+)?raio|trovao/],
  ['necrotico', /necrot/],
  ['acido', /acid|corrosiv/],
  ['veneno', /veneno/],
  ['sangramento', /sangramento/],
  ['concussao', /concuss/],
  ['cortante', /cortante/],
  ['perfurante', /perfurante/],
  ['flamejante', /flamejante/],
  ['explosivo', /explosiv/],
];

function normalizeText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[–—]/g, ' - ')
    .replace(/\s+/g, ' ')
    .trim();
}

function activeEvolutionTexts(shikataId, abilityName, level) {
  const rows = getEvolucao(shikataId, abilityName) || [];
  const eligible = rows.filter(row => Number(row.nivel) <= Number(level || 1));
  if (!eligible.length) return [];
  const maxLevel = Math.max(...eligible.map(row => Number(row.nivel) || 0));
  return eligible.filter(row => Number(row.nivel) === maxLevel).map(row => row.desc || '').filter(Boolean);
}

function canonicalModifier(raw = '') {
  const token = normalizeText(raw)
    .replace(/mod(?:ificador)?\s*(?:de\s*)?/, '')
    .trim();
  return MODIFIER_ALIASES[token] || null;
}

function isLikelyNonDamageDice(text, matchIndex, matchLength) {
  const after = text.slice(matchIndex + matchLength, matchIndex + matchLength + 28);
  return /^\s*(?:turnos?|dias?|horas?|minuto(?:\(s\)|s)?|metros?|m\b|km\b|alvos?|criaturas?)/.test(after);
}

function hasDamageContext(text, index) {
  const start = Math.max(0, index - 90);
  const end = Math.min(text.length, index + 120);
  const window = text.slice(start, end);
  const positive = /dano|caus|inflig|ating|golpe|ataque|impacto|sofre|recebe|ferimento|explod|perfura|corta|queima/.test(window);
  const healingOnly = /cura|curar|recupera|regenera|escudo/.test(window) && !/dano|caus|inflig|ataque|golpe|impacto/.test(window);
  return positive && !healingOnly;
}

function extractExpressions(text, allowBareFormula = false) {
  const normalized = normalizeText(text);
  const diceRegex = /\b(\d+)d(\d+)\b/g;
  const found = [];
  let match;
  while ((match = diceRegex.exec(normalized))) {
    const index = match.index;
    const diceToken = match[0];
    if (isLikelyNonDamageDice(normalized, index, diceToken.length)) continue;
    const damageContext = hasDamageContext(normalized, index);
    if (!damageContext && !allowBareFormula) continue;
    if (!damageContext && allowBareFormula) {
      const window = normalized.slice(Math.max(0, index - 70), Math.min(normalized.length, index + 100));
      if (/cura|curar|recupera|regenera|escudo/.test(window) && !/dano|caus|inflig|ataque|golpe|impacto/.test(window)) continue;
    }

    const tail = normalized.slice(index + diceToken.length, index + diceToken.length + 90);
    const additions = [];
    const addBlock = tail.match(/^\s*(?:\+\s*(?:\d+|(?:mod(?:ificador)?\s*(?:de\s*)?)?(?:forca|for|magia|mag|constituicao|cons?|inteligencia|int|percepcao|per|destreza|dest?|carisma|car|defesa|def|sorte|sor))){0,3}/)?.[0] || '';
    const tokens = [...addBlock.matchAll(/\+\s*(\d+|(?:mod(?:ificador)?\s*(?:de\s*)?)?(?:forca|for|magia|mag|constituicao|cons?|inteligencia|int|percepcao|per|destreza|dest?|carisma|car|defesa|def|sorte|sor))/g)];
    for (const tokenMatch of tokens) {
      const token = tokenMatch[1];
      if (/^\d+$/.test(token)) additions.push({ kind: 'fixed', value: Number(token) });
      else {
        const modifier = canonicalModifier(token);
        if (modifier) additions.push({ kind: 'modifier', key: modifier });
      }
    }
    found.push({ dice: diceToken, additions });
  }
  return found;
}

function detectDamageTypes(texts) {
  const normalized = normalizeText(texts.join(' '));
  const types = [];
  for (const [type, regex] of DAMAGE_TYPE_PATTERNS) {
    if (regex.test(normalized) && !types.includes(type)) types.push(type);
  }
  return types;
}

function formatExpressionPart(part) {
  const additions = part.additions.map(addition => addition.kind === 'fixed' ? `+${addition.value}` : `+mod ${addition.key}`).join('');
  return `${part.dice}${additions}`;
}

function parseMlCost(text) {
  const normalized = normalizeText(text);
  const direct = normalized.match(/(?:por|gastar|usar|=|:)?\s*(\d+)\s*ml\b/);
  return direct ? Number(direct[1]) || 0 : 0;
}

function buildVariantLabel(segment, expressions, index, optionalMlCost) {
  if (optionalMlCost > 0) return `Bônus por ${optionalMlCost} ML`;
  const normalized = normalizeText(segment);
  const firstDice = normalized.search(/\b\d+d\d+\b/);
  const prefix = firstDice >= 0 ? normalized.slice(0, firstDice) : '';
  const colonPieces = prefix.split(':')
    .map(piece => piece.replace(/^[\s,;:+\-]+|[\s,;:+\-]+$/g, '').trim())
    .filter(Boolean);
  let label = colonPieces.length ? colonPieces[colonPieces.length - 1] : prefix;
  label = label
    .replace(/\b\d+x?\s*(?:por\s+)?(?:turno|combate|dia|semana|mes|descanso|desc\.?\s*(?:curto|longo))\b/g, '')
    .replace(/\b\d+(?:d\d+)?\s*hp\b/g, '')
    .replace(/^[\s,;:\-]+|[\s,;:\-]+$/g, '')
    .trim();
  if (label.length > 42) label = '';
  if (!label || /^(dano|area|alvo|tabela)$/.test(label)) return index === 0 ? 'Dano principal' : `Dano ${index + 1}`;
  return label.replace(/\b\w/g, char => char.toUpperCase());
}

function buildDamageSpec(texts, source, allowBareFormula = false, contextTexts = []) {
  const variants = [];
  texts.forEach((text, textIndex) => {
    const segments = String(text || '').split('|').map(segment => segment.trim()).filter(Boolean);
    segments.forEach((segment, segmentIndex) => {
      const expressions = extractExpressions(segment, allowBareFormula);
      if (!expressions.length) return;
      const optionalMlCost = parseMlCost(segment);
      const optional = optionalMlCost > 0 && /(?:por|gastar|usar|\bml\s*:|\bml\s*=|\bml\b.*(?:adicion|bonus|extra|explode|dobra|cria))/i.test(normalizeText(segment));
      const index = variants.length;
      variants.push({
        id: `${source}-${textIndex}-${segmentIndex}-${index}`,
        label: buildVariantLabel(segment, expressions, index, optional ? optionalMlCost : 0),
        expressions,
        displayFormula: expressions.map(formatExpressionPart).join(' + '),
        damageTypes: detectDamageTypes([segment, ...contextTexts]),
        optional,
        optionalMlCost: optional ? optionalMlCost : 0,
        sourceText: segment,
      });
    });
  });
  if (!variants.length) return null;
  const baseVariants = variants.filter(variant => !variant.optional);
  const optionalVariants = variants.filter(variant => variant.optional);
  return {
    variants,
    baseVariants,
    optionalVariants,
    displayFormula: baseVariants.length === 1
      ? baseVariants[0].displayFormula
      : baseVariants.map(variant => `${variant.label}: ${variant.displayFormula}`).join(' / '),
    damageTypes: [...new Set(variants.flatMap(variant => variant.damageTypes || []))],
    source,
  };
}

function activeDescriptionText(description, level) {
  const source = String(description || '');
  const marker = /\bNv\.?\s*(\d+)\s*:/gi;
  const matches = [...source.matchAll(marker)];
  if (!matches.length) return source;

  const currentLevel = Number(level) || 1;
  let selected = null;
  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const markerLevel = Number(match[1]) || 0;
    if (markerLevel > currentLevel) continue;
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : source.length;
    if (!selected || markerLevel >= selected.level) selected = { level: markerLevel, text: source.slice(start, end).trim() };
  }
  if (selected) {
    if (/\+\s*mod\b(?!\s*(?:for|mag|con|int|per|des|car|def|sor))/i.test(selected.text)) {
      const base = source.slice(0, matches[0].index);
      const baseModifier = normalizeText(base).match(/\+\s*(?:mod(?:ificador)?\s*(?:de\s*)?)?(forca|magia|constituicao|inteligencia|percepcao|destreza|carisma|defesa|sorte|for|mag|cons?|int|per|dest?|car|def|sor)/);
      if (baseModifier) selected.text = selected.text.replace(/\+\s*mod\b/i, `+mod ${baseModifier[1]}`);
    }
    const baseContext = source.slice(0, matches[0].index)
      .replace(/\b\d+d\d+(?:\s*\+\s*(?:\d+|(?:mod(?:ificador)?\s*(?:de\s*)?)?(?:força|forca|for|magia|mag|constituição|constituicao|cons?|inteligência|inteligencia|int|percepção|percepcao|per|destreza|dest?|carisma|car|defesa|def|sorte|sor))){0,3}/gi, '[dado]')
      .trim();
    return `${baseContext} ${selected.text}`.trim();
  }
  return source.slice(0, matches[0].index).trim();
}

export function getOfficialAbilityDamageSpec(shikataId, ability, level) {
  if (!ability || ability.tipo === 'passiva') return null;
  const evolutionTexts = activeEvolutionTexts(shikataId, ability.nome, level);
  const evolutionSpec = buildDamageSpec(evolutionTexts, 'evolucao', true, [ability.desc || '']);
  if (evolutionSpec) return evolutionSpec;
  const activeDescription = activeDescriptionText(ability.desc || '', level);
  return buildDamageSpec([activeDescription], 'descricao', true, [ability.desc || '']);
}

export function getModifierValue(key, derived) {
  const map = {
    forca: derived?.modForca,
    magia: derived?.modMagia,
    constituicao: derived?.modCon,
    inteligencia: derived?.modInt,
    percepcao: derived?.modPer,
    destreza: derived?.modDes,
    carisma: derived?.modCar,
    defesa: derived?.modDef,
    sorte: derived?.modSor,
  };
  return Number(map[key]) || 0;
}

function resolveExpressionsFormula(expressions, derived) {
  const pieces = [];
  for (const expression of expressions || []) {
    let piece = expression.dice;
    for (const addition of expression.additions || []) {
      const value = addition.kind === 'fixed' ? Number(addition.value) || 0 : getModifierValue(addition.key, derived);
      if (value !== 0) piece += value > 0 ? `+${value}` : `${value}`;
    }
    pieces.push(piece);
  }
  return pieces.join('+');
}

export function resolveOfficialDamageFormula(spec, derived, options = {}) {
  if (!spec?.baseVariants?.length) return null;
  const selected = spec.baseVariants.find(variant => variant.id === options.variantId) || spec.baseVariants[0];
  const expressions = [...(selected.expressions || [])];
  const includedOptional = [];
  if (options.useMlEnhancement) {
    for (const variant of spec.optionalVariants || []) {
      if (!variant.optionalMlCost || !options.mlCost || Number(variant.optionalMlCost) === Number(options.mlCost)) {
        expressions.push(...(variant.expressions || []));
        includedOptional.push(variant);
      }
    }
  }
  const formula = normalizeResolvedFormula(resolveExpressionsFormula(expressions, derived));
  return formula ? { formula, selected, includedOptional } : null;
}

export function damageTypeLabel(value) {
  return DAMAGE_TYPES.find(type => type.value === value)?.label || value || 'Dano';
}

export function buildOfficialDamageRoll(ability, damageSpec, derived, options = {}) {
  const resolved = resolveOfficialDamageFormula(damageSpec, derived, options);
  if (!resolved) return null;
  const rolled = rollFormula(resolved.formula);
  const types = [...new Set([...(resolved.selected.damageTypes || []), ...resolved.includedOptional.flatMap(variant => variant.damageTypes || [])])];
  const suffix = types.length ? ` · ${types.map(damageTypeLabel).join(' + ')}` : '';
  const variantSuffix = damageSpec.baseVariants.length > 1 ? ` · ${resolved.selected.label}` : '';
  return makeDiceEntry({
    label: `${ability.nome} — Dano${variantSuffix}${suffix}`,
    formula: resolved.formula,
    total: rolled.total,
    parts: rolled.parts,
    damageTypes: types,
    damageVariant: resolved.selected.label,
  }, { type: 'ability-damage', abilityName: ability.nome });
}

export function resolveCustomDamageFormula(power, derived) {
  const base = String(power?.damageFormula || '').trim();
  if (!base) return null;
  const scaling = power?.damageScaling || '';
  const modifier = scaling ? getModifierValue(scaling, derived) : 0;
  return normalizeResolvedFormula(modifier === 0 ? base : `${base}${modifier > 0 ? '+' : ''}${modifier}`);
}

export function buildCustomDamageRoll(power, derived) {
  const formula = resolveCustomDamageFormula(power, derived);
  if (!formula) return null;
  const rolled = rollFormula(formula);
  const typeLabel = damageTypeLabel(power.damageType);
  return makeDiceEntry({
    label: `${power.nome} — Dano${power.damageType ? ` · ${typeLabel}` : ''}`,
    formula,
    total: rolled.total,
    parts: rolled.parts,
    damageTypes: power.damageType ? [power.damageType] : [],
  }, { type: 'custom-power-damage', abilityName: power.nome });
}

export function validateDamageFormula(rawFormula) {
  const formula = String(rawFormula || '').trim();
  if (!formula) return { ok: true };
  try {
    rollFormula(formula);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.message || 'Fórmula de dano inválida.' };
  }
}
