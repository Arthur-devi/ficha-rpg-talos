export const LADINO_CRITICAL_BASE_PERCENT = 20;

export const DEFAULT_REI_FALSO_STATE = {
  active: false,
  bonuses: {},
  totalPool: 0,
  activatedDay: null,
  expiresDay: null,
  activatedAt: null,
};

export function getLadinoCriticalBonusPercent(dexterityPoints) {
  const dexterity = Math.max(0, Number(dexterityPoints) || 0);
  return LADINO_CRITICAL_BASE_PERCENT + (Math.floor(dexterity / 5) * 20);
}

export function getInvisibleIntelligenceModifier(baseModifier, ladinoLevel) {
  const base = Number(baseModifier) || 0;
  if ((Number(ladinoLevel) || 0) < 5) return base;
  return Math.max(1, Math.abs(base) * 2);
}

export function getReiFalsoModifierPool(modifierValues = {}) {
  return Math.max(0, Object.values(modifierValues).reduce((sum, value) => sum + (Number(value) || 0), 0));
}

export function normalizeReiFalsoState(raw = {}) {
  const bonuses = raw?.bonuses && typeof raw.bonuses === 'object'
    ? Object.fromEntries(Object.entries(raw.bonuses)
      .map(([skill, value]) => [skill, Math.max(0, Math.trunc(Number(value) || 0))])
      .filter(([, value]) => value > 0))
    : {};
  return {
    ...DEFAULT_REI_FALSO_STATE,
    ...(raw || {}),
    active: Boolean(raw?.active),
    bonuses,
    totalPool: Math.max(0, Math.trunc(Number(raw?.totalPool) || 0)),
    activatedDay: Number.isFinite(Number(raw?.activatedDay)) ? Number(raw.activatedDay) : null,
    expiresDay: Number.isFinite(Number(raw?.expiresDay)) ? Number(raw.expiresDay) : null,
    activatedAt: raw?.activatedAt || null,
  };
}

export function isReiFalsoActive(rawState, currentDay) {
  const state = normalizeReiFalsoState(rawState);
  if (!state.active) return false;
  const day = Math.max(1, Number(currentDay) || 1);
  if (state.expiresDay == null) return true;
  return day < state.expiresDay;
}

export function reiFalsoBonusesForDay(rawState, currentDay) {
  return isReiFalsoActive(rawState, currentDay) ? normalizeReiFalsoState(rawState).bonuses : {};
}
