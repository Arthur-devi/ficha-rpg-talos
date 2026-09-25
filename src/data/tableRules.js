// Regras específicas desta mesa/projeto que complementam ou alteram o TALOS v6.
// Mantidas separadas da fonte canônica para evitar que sejam confundidas com o DOCX oficial.

export const TABLE_RULES_VERSION = 1;

export const INSPIRATION_TABLE_RULE = {
  mode: 'flat-bonus',
  bonus: 1,
  label: 'Inspiração +1',
  source: 'Regra da mesa',
  note: 'Nesta ficha, Inspiração adiciona +1 à rolagem e é consumida no uso.',
};

export const DEATH_SAVE_TABLE_RULE = {
  die: '1d20',
  dc: 10,
  successesToRecover: 3,
  failuresToDie: 3,
  recoveryHp: 1,
  naturalSpecials: false,
  source: 'Regra da mesa',
  note: '10+ = sucesso; 9 ou menos = falha; 3 sucessos recuperam 1 HP; 3 falhas causam morte. Cura antes da morte encerra o episódio.',
};
