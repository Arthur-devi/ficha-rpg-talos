import { PERICIAS_BY_ATTR, getProfissaoData } from './system.js';

export const OFICIO_SPECIALTIES = [
  'Administração',
  'Alquimia',
  'Alvenaria',
  'Armas de Cerco',
  'Carpintaria',
  'Joalheria',
  'Metalurgia',
  'Arte — Escrita',
  'Arte — Escultura',
  'Arte — Pintura',
  'Profissão — Cozinheiro',
  'Profissão — Fazendeiro',
  'Profissão — Pescador',
  'Profissão — Estalajadeiro',
  'Profissão — Pastor',
];

export const ATUACAO_SPECIALTIES = ['Dramaturgia', 'Dança', 'Música', 'Oratória'];

export const SKILL_TEST_GUIDANCE = {
  Acrobacia: { difficulty: '10', note: 'O v6 usa dificuldade 10 para as situações descritas em Acrobacia.' },
  Prestidigitação: { difficulty: '16', note: 'Dificuldade 16 para guardar ou retirar itens dos bolsos alheios sem ser percebido.' },
  Investigação: { difficulty: '18', note: 'Dificuldade 18 para descobrir a origem dos rastros.' },
  Cura: { difficulty: '13', note: 'Dificuldade 13 no tratamento de doenças. Estabilizar personagem com 0 PV ou menos não recebe uma DT explícita nesse trecho.' },
  Fortitude: { difficulty: '16', note: 'Dificuldade 16 para resistir a doenças e venenos.' },
  Atuação: { difficulty: '8 / 16 / 20+', note: 'Referências do v6: 8 = rotineira, 16 = grande atuação, 20+ = espetáculo inesquecível.' },
  Vontade: { note: 'Com 0 PV ou menos, o v6 permite um teste de Constituição como ação livre para permanecer consciente por mais 1d4 rodadas. O trecho não informa uma DT universal.' },
  Cavalgar: { note: 'Ações simples de montaria não exigem teste; combate ou perigo podem exigir.' },
  Diplomacia: { note: 'Barganhas usam testes opostos. Vitória altera preço em 10% (20% se vencer por 10+); derrota por 5+ ofende o negociante.' },
};

export const UNTRAINED_DISADVANTAGE_SKILLS = new Set(['Luta', 'Enganação']);

export const SKILL_ATTRIBUTE_MAP = Object.fromEntries(
  Object.entries(PERICIAS_BY_ATTR).flatMap(([attributeKey, skills]) => skills.map(skill => [skill, attributeKey]))
);

const MODIFIER_KEY_BY_ATTRIBUTE = {
  forca: 'modForca',
  magia: 'modMagia',
  constituicao: 'modCon',
  inteligencia: 'modInt',
  percepcao: 'modPer',
  destreza: 'modDes',
  carisma: 'modCar',
  defesa: 'modDef',
  sorte: 'modSor',
};

export function allSkills() {
  return Object.entries(PERICIAS_BY_ATTR).flatMap(([attributeKey, skills]) => skills.map(name => ({ name, attributeKey })));
}

export function skillAttributeKey(skillName) {
  return SKILL_ATTRIBUTE_MAP[skillName] || null;
}

export function skillModifier(derived, skillName) {
  const attributeKey = skillAttributeKey(skillName);
  const modifierKey = MODIFIER_KEY_BY_ATTRIBUTE[attributeKey];
  return modifierKey ? Number(derived?.[modifierKey]) || 0 : 0;
}

export function characterProficiencySources(char, derived, skillName) {
  const sources = [];
  const professionSkills = getProfissaoData(char?.profissao)?.pericias || [];
  const originSkills = Array.isArray(derived?.originProficiencies) ? derived.originProficiencies : [];
  const manualSkills = Array.isArray(char?.pericias) ? char.pericias : [];
  if (professionSkills.includes(skillName)) sources.push('Profissão');
  if (originSkills.includes(skillName)) sources.push('Origem');
  if (manualSkills.includes(skillName)) sources.push('Manual');
  return sources;
}

export function isSkillProficient(char, derived, skillName) {
  return characterProficiencySources(char, derived, skillName).length > 0;
}

export function initiativeBonusFromLuta(char, derived) {
  return isSkillProficient(char, derived, 'Luta') ? 2 : 0;
}

const FIXED_OFICIO_BY_PROFESSION = {
  'Assistente de Laboratório': 'Alquimia',
  Taverneiro: 'Culinária',
  Fazendeiro: 'Fazendeiro',
  Marujo: 'Marinheiro',
  Minerador: 'Minerador',
};

const ANY_OFICIO_PROFESSIONS = new Set(['Seguidor', 'Herdeiro', 'Herói Camponês', 'Membro de Guilda', 'Mercador']);

export function professionChoiceSpec(professionName) {
  if (professionName === 'Artesão') {
    return {
      type: 'oficio-multi',
      max: 3,
      label: 'Especialidades de Ofício',
      options: OFICIO_SPECIALTIES,
      note: 'O TALOS v6 permite escolher até 3 Ofícios para Artesão.',
    };
  }
  if (ANY_OFICIO_PROFESSIONS.has(professionName)) {
    return {
      type: 'oficio-single',
      label: 'Especialidade de Ofício',
      options: OFICIO_SPECIALTIES,
      note: 'A profissão concede Ofício (qualquer); escolha a especialidade usada pelo personagem.',
    };
  }
  if (professionName === 'Diplomata') {
    return {
      type: 'atuacao-single',
      label: 'Variação de Atuação',
      options: ATUACAO_SPECIALTIES,
      note: 'A tabela de Profissões pede uma variação de Atuação à escolha.',
    };
  }
  if (FIXED_OFICIO_BY_PROFESSION[professionName]) {
    return {
      type: 'oficio-fixed',
      label: 'Especialidade de Ofício',
      value: FIXED_OFICIO_BY_PROFESSION[professionName],
      note: `A própria tabela do v6 fixa Ofício (${FIXED_OFICIO_BY_PROFESSION[professionName].toLowerCase()}).`,
    };
  }
  if (professionName === 'Amnésico') {
    return {
      type: 'amnestic',
      label: 'Perícias do passado revelado',
      note: 'O v6 não fixa uma lista: escolha conforme o passado for revelado. Use as marcações manuais na aba Atributos conforme validação do Mestre.',
    };
  }
  return null;
}

export function professionSkillSpecialty(char, skillName) {
  const state = char?.professionState || {};
  if (skillName === 'Ofício') {
    if (char?.profissao === 'Artesão') {
      const values = Array.isArray(state.oficioEspecialidades) ? state.oficioEspecialidades.filter(Boolean) : [];
      return values.length ? values.join(', ') : '';
    }
    const spec = professionChoiceSpec(char?.profissao);
    if (spec?.type === 'oficio-fixed') return spec.value;
    if (spec?.type === 'oficio-single') return state.oficioEspecialidade || '';
  }
  if (skillName === 'Atuação' && char?.profissao === 'Diplomata') return state.atuacaoEspecialidade || '';
  return '';
}
