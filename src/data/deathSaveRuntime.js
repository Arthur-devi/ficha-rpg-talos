import { DEATH_SAVE_TABLE_RULE } from './tableRules.js';

export const DEFAULT_DEATH_SAVE_STATE = {
  successes: 0,
  failures: 0,
  dead: false,
  lastRoll: null,
  lastOutcome: null,
};

export function normalizeDeathSaveState(value = {}) {
  const source = value && typeof value === 'object' ? value : {};
  return {
    ...DEFAULT_DEATH_SAVE_STATE,
    ...source,
    successes: Math.max(0, Math.min(DEATH_SAVE_TABLE_RULE.successesToRecover, Number(source.successes) || 0)),
    failures: Math.max(0, Math.min(DEATH_SAVE_TABLE_RULE.failuresToDie, Number(source.failures) || 0)),
    dead: Boolean(source.dead),
    lastRoll: Number.isFinite(Number(source.lastRoll)) ? Number(source.lastRoll) : null,
    lastOutcome: source.lastOutcome || null,
  };
}

export function resolveDeathSaveRoll(currentState, roll) {
  const state = normalizeDeathSaveState(currentState);
  const natural = Number(roll);
  if (!Number.isInteger(natural) || natural < 1 || natural > 20) {
    throw new Error('Teste de Vontade exige resultado natural entre 1 e 20.');
  }
  if (state.dead) {
    return { ok: false, state, message: 'MORTE já confirmada.' };
  }

  const success = natural >= DEATH_SAVE_TABLE_RULE.dc;
  const successes = Math.min(
    DEATH_SAVE_TABLE_RULE.successesToRecover,
    state.successes + (success ? 1 : 0),
  );
  const failures = Math.min(
    DEATH_SAVE_TABLE_RULE.failuresToDie,
    state.failures + (success ? 0 : 1),
  );

  let resolution = null;
  let recoveredHp = 0;
  let nextState = {
    ...state,
    successes,
    failures,
    lastRoll: natural,
    lastOutcome: success ? 'success' : 'failure',
  };

  if (successes >= DEATH_SAVE_TABLE_RULE.successesToRecover) {
    resolution = 'recovered';
    recoveredHp = DEATH_SAVE_TABLE_RULE.recoveryHp;
    nextState = {
      ...DEFAULT_DEATH_SAVE_STATE,
      lastRoll: natural,
      lastOutcome: 'recovered',
    };
  } else if (failures >= DEATH_SAVE_TABLE_RULE.failuresToDie) {
    resolution = 'dead';
    nextState = {
      ...nextState,
      dead: true,
      failures: DEATH_SAVE_TABLE_RULE.failuresToDie,
      lastOutcome: 'dead',
    };
  }

  return {
    ok: true,
    success,
    successes,
    failures,
    resolution,
    recoveredHp,
    state: nextState,
  };
}

export function clearDeathSavesOnHealing(currentState, hp) {
  const state = normalizeDeathSaveState(currentState);
  if ((Number(hp) || 0) <= 0 || state.dead) return state;
  if (state.successes === 0 && state.failures === 0) return state;
  return { ...DEFAULT_DEATH_SAVE_STATE, lastOutcome: 'healed' };
}

export function reviveDeathSaveState() {
  return { ...DEFAULT_DEATH_SAVE_STATE, lastOutcome: 'resurrected' };
}
