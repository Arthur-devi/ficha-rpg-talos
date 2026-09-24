export const DICE_HISTORY_LIMIT = 50;

export function rollDie(sides) {
  const numericSides = Number(sides);
  if (!Number.isInteger(numericSides) || numericSides < 1) throw new Error('Dado inválido.');
  return Math.floor(Math.random() * numericSides) + 1;
}

function assertRollBounds(count, sides) {
  if (!Number.isInteger(count) || !Number.isInteger(sides) || count < 1 || sides < 1) {
    throw new Error('Fórmula inválida.');
  }
  if (count > 100 || sides > 1000) {
    throw new Error('Limite máximo: 100 dados, d1000.');
  }
}

export function normalizeResolvedFormula(formula) {
  return String(formula || '')
    .replace(/\+-/g, '-')
    .replace(/--/g, '+')
    .replace(/^\+/, '');
}

export function rollFormula(rawFormula) {
  const clean = String(rawFormula || '').replace(/\s+/g, '').toLowerCase();
  if (!clean) throw new Error('Digite uma fórmula.');

  const tokens = clean.match(/[+-]?[^+-]+/g);
  if (!tokens || tokens.join('') !== clean) throw new Error('Fórmula inválida.');

  const parts = tokens.map(token => {
    const sign = token.startsWith('-') ? -1 : 1;
    const body = token.replace(/^[+-]/, '');

    if (body.includes('d')) {
      const split = body.split('d');
      if (split.length !== 2) throw new Error('Fórmula inválida.');
      const count = split[0] ? Number(split[0]) : 1;
      const sides = Number(split[1]);
      assertRollBounds(count, sides);
      const rolls = Array.from({ length: count }, () => rollDie(sides));
      const subtotal = rolls.reduce((sum, roll) => sum + roll, 0) * sign;
      return { type: 'dice', sign, count, sides, rolls, subtotal };
    }

    const value = Number(body);
    if (!Number.isFinite(value)) throw new Error('Fórmula inválida.');
    return { type: 'flat', sign, value: Math.abs(value), subtotal: value * sign };
  });

  return {
    formula: rawFormula,
    total: parts.reduce((sum, part) => sum + part.subtotal, 0),
    parts,
  };
}

export function makeDiceEntry(result, extra = {}) {
  const createdAt = new Date().toISOString();
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt,
    time: new Date(createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    ...result,
    ...extra,
  };
}

export function pushDiceHistory(history, entry, limit = DICE_HISTORY_LIMIT) {
  return [entry, ...(Array.isArray(history) ? history : [])].slice(0, limit);
}
