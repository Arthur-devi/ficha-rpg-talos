export const OFFICIAL_STATE_DEFS = [
  { id: 'imparavel', name: 'IMPARÁVEL', desc: 'Imune a atordoamento, enraizamento, congelamento e debilitações similares. Nada te para.' },
  { id: 'concentracao', name: 'CONCENTRAÇÃO', desc: 'Desvia do primeiro ataque inimigo que receber no turno e recebe +10 de Defesa até o efeito acabar.' },
  { id: 'cansado', name: 'CANSADO', desc: 'Pode usar habilidades, mas perde o bônus de acerto da Shikata. Recupera com descanso curto.', automatic: true },
];

export const CONDITION_MARKERS = [
  { id: 'atordoado', name: 'ATORDOADO' },
  { id: 'enraizado', name: 'ENRAIZADO' },
  { id: 'congelado', name: 'CONGELADO' },
  { id: 'sangrando', name: 'SANGRANDO' },
  { id: 'envenenado', name: 'ENVENENADO' },
];

export const IMPARAVEL_EXACT_IMMUNITIES = new Set(['atordoado', 'enraizado', 'congelado']);

export function getStateRuntime(char) {
  const states = new Set(Array.isArray(char?.estados) ? char.estados : []);
  const imparavel = states.has('imparavel');
  const concentracao = states.has('concentracao');
  return {
    imparavel,
    concentracao,
    defenseBonus: concentracao ? 10 : 0,
    exactImmunities: imparavel ? [...IMPARAVEL_EXACT_IMMUNITIES] : [],
  };
}
