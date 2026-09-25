import { ITEM_ATTRIBUTE_KEYS } from './itemEffects';

export const ELEMENTAL_ELEMENTS = ['Água', 'Fogo', 'Terra', 'Ar'];
export const DRAGON_ANCESTORS = ['Negro', 'Azul Escuro', 'Verde', 'Cinza', 'Amarelo', 'Vermelho'];
export const SLIME_PATHS = ['Gula', 'Ira', 'Orgulho', 'Preguiça', 'Inveja', 'Avareza', 'Luxúria'];
export const SLIME_PATH_INFO = {
  Gula: '+10 Constituição, +10 HP. Devorar passa a atingir área 2×2 e o dano pode se acumular.',
  Ira: 'Cresce 1m por kg comido e recebe +1d6 de dano por metro de tamanho.',
  Orgulho: '+10 Sorte, Inteligência, Destreza e Percepção. Chance de dano dobrado quando d20 + Sorte > 15.',
  Preguiça: '+15 Constituição, +50 HP, -5 Inteligência/Destreza/Percepção. Aplica 1d6 de veneno + sangramento + ácido por 2 turnos, cumulativo.',
  Inveja: '+3 em 6 atributos. Sincroniza temporariamente com a última presa devorada e pode devorar ataques para obter imunidade.',
  Avareza: '+10 em 5 atributos, +20 HP, dano cortante 2d8. Inimigos mortos por Devorar viram ouro equivalente ao peso.',
  Luxúria: 'Corpo mágico; alimenta-se de magia. Cria cópias 5 níveis abaixo por 2d6 HP e pode devorá-las para curar 2d10 cada.',
};

export const DEFAULT_ORIGIN_STATE = {
  proficiencies: [],
  totalDarkness: false,
  inWater: false,
  hoursOutOfWater: 0,
  naturalEnvironment: false,
  sunlight: false,
  fullMoon: false,
  secondaryOriginId: '',
  dragonAncestor: '',
  elementalElement: '',
  demonPart: '',
  demonEffect: '',
  demonMechanicalEffects: {},
  feralPart: '',
  feralEffect: '',
  feralMechanicalEffects: {},
  slimePath: '',
  slimeChosenAttrs: [],
  thunganRoll: null,
  thunganItem: '',
  metamorphAttributePoints: {},
  metamorphForms: [
    { name: '', notes: '', effects: {} },
    { name: '', notes: '', effects: {} },
  ],
  activeMetamorphForm: -1,
  vampireActive: false,
  vampireTurnsRemaining: 0,
  werewolfActive: false,
  lorvHostAttrs: {},
  guardianCaBonus: 0,
  guardianTurnsRemaining: 0,
  guardianCriticalCombat: false,
  guardianAttemptsTurn: 0,
  dracInvulnerableTurns: 0,
  cronoTimeStoppedTurns: 0,
  kvaldirDefenseActive: false,
  precisionReady: false,
  originAbilityUsage: {},
};

export function normalizeOriginState(raw = {}) {
  const forms = Array.isArray(raw.metamorphForms) ? raw.metamorphForms.slice(0, 2) : [];
  while (forms.length < 2) forms.push({ name: '', notes: '', effects: {} });
  return {
    ...DEFAULT_ORIGIN_STATE,
    ...raw,
    proficiencies: Array.isArray(raw.proficiencies) ? raw.proficiencies : [],
    slimeChosenAttrs: Array.isArray(raw.slimeChosenAttrs) ? raw.slimeChosenAttrs : [],
    metamorphAttributePoints: raw.metamorphAttributePoints && typeof raw.metamorphAttributePoints === 'object' ? raw.metamorphAttributePoints : {},
    demonMechanicalEffects: raw.demonMechanicalEffects && typeof raw.demonMechanicalEffects === 'object' ? raw.demonMechanicalEffects : {},
    feralMechanicalEffects: raw.feralMechanicalEffects && typeof raw.feralMechanicalEffects === 'object' ? raw.feralMechanicalEffects : {},
    metamorphForms: forms.map(form => ({ name: '', notes: '', effects: {}, ...(form || {}), effects: { ...(form?.effects || {}) } })),
    originAbilityUsage: raw.originAbilityUsage && typeof raw.originAbilityUsage === 'object' ? raw.originAbilityUsage : {},
  };
}

export function originProficiencyLimit(originId, originState = {}) {
  if (originId === 'humano') return 4;
  if (originId === 'elfo-maritimo') return 2;
  if (originId === 'meio-orc') {
    const secondary = normalizeOriginState(originState).secondaryOriginId;
    if (secondary === 'humano') return 2;
    if (secondary === 'elfo-maritimo') return 1;
  }
  return 0;
}

export function slimePathStaticEffects(path, chosenAttrs = []) {
  const attrs = Object.fromEntries(ITEM_ATTRIBUTE_KEYS.map(key => [key, 0]));
  let hpMax = 0;
  if (path === 'Gula') {
    attrs.constituicao += 10;
    hpMax += 10;
  } else if (path === 'Orgulho') {
    for (const key of ['sorte', 'inteligencia', 'destreza', 'percepcao']) attrs[key] += 10;
  } else if (path === 'Preguiça') {
    attrs.constituicao += 15;
    attrs.inteligencia -= 5;
    attrs.destreza -= 5;
    attrs.percepcao -= 5;
    hpMax += 50;
  } else if (path === 'Inveja') {
    chosenAttrs.slice(0, 6).forEach(key => { if (key in attrs) attrs[key] += 3; });
  } else if (path === 'Avareza') {
    chosenAttrs.slice(0, 5).forEach(key => { if (key in attrs) attrs[key] += 10; });
    hpMax += 20;
  }
  return { attrs, hpMax };
}

export function dragonBreathFormula(ancestor, level) {
  const extraLevels = Math.max(0, (Number(level) || 1) - 1);
  switch (ancestor) {
    case 'Negro': return { formula: `${1 + extraLevels}d6`, type: 'Fogo', note: 'Bola de fogo negra; explode em 4m.' };
    case 'Azul Escuro': return { formula: `${2 + extraLevels}d4`, type: 'Flamejante', note: 'Cone de chamas azuis escuras.' };
    case 'Verde': return { formula: `${1 + extraLevels}d4`, type: 'Corrosivo', note: `${2 + extraLevels} de dano necrótico por turno durante 4 turnos.` };
    case 'Cinza': return { formula: `${2 + Math.floor((Number(level) || 1) / 2)}`, type: 'Dano adicional', note: 'Mãos em fogo cinza; duração do combate.' };
    case 'Amarelo': return { formula: `${1 + extraLevels}d8`, type: 'Fogo', note: 'Fio de fogo invisível em linha reta.' };
    case 'Vermelho': return { formula: `${3 + extraLevels * 2}d4`, type: 'Fogo', note: 'Bola de fogo em um único alvo.' };
    default: return null;
  }
}

export function trollMountainFormula(level) {
  return `${2 + Math.floor(Math.max(1, Number(level) || 1) / 2)}d6`;
}

export function undeadThrowFormula(level) {
  return `${2 + Math.floor(Math.max(1, Number(level) || 1) / 2)}d4`;
}

export function werewolfNaturalFormula(level) {
  return `${1 + Math.floor(Math.max(1, Number(level) || 1) / 2)}d6`;
}

export function celestialHealAmount(level) {
  return 2 + Math.floor(Math.max(1, Number(level) || 1) / 2);
}

export function vampireHpBonus(level) {
  return 5 + 2 * (Number(level) || 1);
}

export function vampireDuration(level) {
  return 2 + Math.floor((Number(level) || 1) / 5);
}

export function getOriginAbilityDefs(originId, char = {}) {
  const level = Number(char.nivel) || 1;
  const state = normalizeOriginState(char.originState);
  const common = { defaultAction: 'full', fatigue: true };
  const defs = {
    drac: [
      { ...common, id: 'invencibilidade', name: 'Invencibilidade', maxUses: 1, resetType: 'long', summary: 'Invulnerável durante 1 turno.' },
    ],
    crono: [
      { ...common, id: 'quebra-tempo', name: 'Quebra do Tempo', maxUses: 1, resetType: 'long', summary: 'Para o tempo por 10 segundos (1 turno em combate).' },
    ],
    elfo: [
      { ...common, id: 'precisao', name: 'Precisão', maxUses: 1, resetType: 'long', summary: 'O próximo ataque é automaticamente certeiro.' },
    ],
    'elfo-floresta': [
      { ...common, id: 'chamado-floresta', name: 'Chamado da Floresta', maxUses: null, resetType: null, defaultAction: 'free', fatigue: false, summary: 'Em ambiente natural, 1 hora recupera 10 HP.', heal: 10, requiresNatural: true, requiresOutOfCombat: true },
    ],
    'meio-dragao': [
      { ...common, id: 'sopro-ancestral', name: 'Sopro do Dragão Ancestral', maxUses: 2, resetType: 'long', summary: state.dragonAncestor ? `Dragão ${state.dragonAncestor}` : 'Escolha o dragão ancestral.', damage: dragonBreathFormula(state.dragonAncestor, level), requiresChoice: 'dragonAncestor' },
    ],
    cursed: [
      { ...common, id: 'imortal', name: 'Imortal', maxUses: 1, resetType: 'day', defaultAction: 'free', fatigue: false, summary: 'Ao zerar HP, volta com metade da vida completa.', requiresZeroHp: true },
    ],
    kvaldir: [
      { ...common, id: 'defesa-grotesca', name: 'Defesa Grotesca', maxUses: 1, resetType: 'combat', summary: 'Bloqueia ataques físicos e reflete metade do dano mágico; exige carne consumida há até 1 semana.', requiresCombat: true },
    ],
    tita: [
      { ...common, id: 'conhecimento-vida', name: 'Conhecimento da Vida', maxUses: 1, resetType: 'long', summary: 'Lê todas as memórias de uma criatura viva ou morta.' },
    ],
    guardiao: [
      { ...common, id: 'revestimento', name: 'Revestimento', maxUses: 1, resetType: 'long', summary: 'Até 3 tentativas por turno. d20 acima de 10 ativa +5 CA por 2 turnos; crítico dobra o efeito até o fim do combate.', custom: 'guardian' },
    ],
    fada: [
      { ...common, id: 'adaptacao', name: 'Adaptação', maxUses: 1, resetType: 'long', defaultAction: 'free', fatigue: false, summary: 'Fora de combate, forja armas/armaduras de fada com sucata em cerca de 2 horas.', requiresOutOfCombat: true },
      { ...common, id: 'encantamento', name: 'Encantamento', maxUses: 2, resetType: 'long', summary: 'Imbui uma arma com +1d4 de dano mágico. O 1d4 é dano adicional da arma, não uma rolagem na ativação.' },
    ],
    slime: [
      { ...common, id: 'explosao-acida', name: 'Explosão Ácida', maxUses: null, resetType: null, defaultAction: 'bonus', summary: 'Ação bônus: sofre 1d3 e causa 2d6 ácido numa área 5×5.', selfDamage: '1d3', damage: { formula: '2d6', type: 'Ácido', note: 'Área 5×5.' } },
      { ...common, id: 'devorar', name: 'Devorar', maxUses: null, resetType: null, summary: 'Ação completa para engolir um inimigo vivo; após falha do alvo, causa 1d6 ácido por turno.', damage: { formula: '1d6', type: 'Ácido', note: 'Use esta rolagem após a falha no teste de Constituição do alvo.' } },
    ],
    undead: [
      { ...common, id: 'lancar-parte', name: 'Lançar Parte Corporal', maxUses: null, resetType: null, summary: 'Arremessa uma parte corporal como ataque físico.', damage: { formula: undeadThrowFormula(level), type: 'Físico', note: '+1 dado a cada 2 níveis.' } },
    ],
    'troll-montanha': [
      { ...common, id: 'mordida-feroz', name: 'Mordida Feroz', maxUses: 1, resetType: 'long', summary: 'Dano físico e sangramento por 2 turnos.', damage: { formula: trollMountainFormula(level), type: 'Físico', note: 'Sangramento por 2 turnos.' } },
    ],
    'troll-floresta': [
      { ...common, id: 'armadura-enferrujada', name: 'Armadura Enferrujada', maxUses: 1, resetType: 'long', summary: 'Todos os alvos sofrem -1 CA até o fim do combate.' },
    ],
    celestial: [
      { ...common, id: 'cura-celestial', name: 'Cura Celestial', maxUses: null, resetType: null, defaultAction: 'free', fatigue: false, summary: `Registre um ataque bem-sucedido para curar ${celestialHealAmount(level)} HP.`, heal: celestialHealAmount(level) },
    ],
    velkro: [
      { ...common, id: 'fervor-sanguinario', name: 'Fervor Sanguinário', maxUses: null, resetType: null, defaultAction: 'free', fatigue: false, summary: 'Após receber um ataque, recupera 1d4 HP.', healRoll: '1d4' },
    ],
    metamorfo: [
      { ...common, id: 'transformacao', name: 'Transformação', maxUses: 2, resetType: 'long', summary: 'Transforma-se em uma das 2 formas permanentes definidas.' },
    ],
    lobisomem: [
      { ...common, id: 'garras-mordida', name: 'Garras / Mordida', maxUses: null, resetType: null, summary: 'Ataque natural disponível durante a forma de Lobisomem.', damage: { formula: werewolfNaturalFormula(level), type: 'Físico', note: '+1d6 a cada 2 níveis.' }, requiresWerewolf: true },
    ],
    vampiro: [
      { ...common, id: 'despertar-maldicao', name: 'Despertar da Maldição', maxUses: 1, resetType: 'long', summary: `Recebe +${vampireHpBonus(level)} HP e rouba metade do dano causado por ${vampireDuration(level)} turnos.`, requiresNoSunlight: true },
    ],
  };
  return defs[originId] || [];
}

export function resetOriginUsageForPeriod(originState, period) {
  const state = normalizeOriginState(originState);
  const usage = { ...(state.originAbilityUsage || {}) };
  for (const key of Object.keys(usage)) {
    if (usage[key]?.resetType === period || (period === 'long' && usage[key]?.resetType === 'short')) {
      usage[key] = { ...usage[key], used: 0 };
    }
  }
  return { ...state, originAbilityUsage: usage };
}

export function advanceOriginTurnState(originState, period) {
  let state = normalizeOriginState(originState);
  if (period === 'turn') {
    state = {
      ...state,
      guardianAttemptsTurn: 0,
      dracInvulnerableTurns: Math.max(0, Number(state.dracInvulnerableTurns) - 1),
      cronoTimeStoppedTurns: Math.max(0, Number(state.cronoTimeStoppedTurns) - 1),
      vampireTurnsRemaining: state.vampireActive ? Math.max(0, Number(state.vampireTurnsRemaining) - 1) : 0,
      guardianTurnsRemaining: state.guardianCriticalCombat ? state.guardianTurnsRemaining : Math.max(0, Number(state.guardianTurnsRemaining) - 1),
    };
    if (state.vampireActive && state.vampireTurnsRemaining <= 0) state.vampireActive = false;
    if (!state.guardianCriticalCombat && state.guardianTurnsRemaining <= 0) state.guardianCaBonus = 0;
  }
  if (period === 'combat') {
    state.guardianCriticalCombat = false;
    state.kvaldirDefenseActive = false;
    state.dracInvulnerableTurns = 0;
    state.cronoTimeStoppedTurns = 0;
    state.guardianTurnsRemaining = 0;
    state.guardianCaBonus = 0;
  }
  return state;
}

export function applyElementalOriginToDamageRoll(entry, char, derived) {
  if (!entry || char?.origem !== 'elemental') return entry;
  const element = normalizeOriginState(char.originState).elementalElement;
  if (!element) return entry;
  const existingTypes = (entry.damageTypes || []).map(value => String(value).toLocaleLowerCase('pt-BR'));
  const elementalMarkers = ['fogo', 'gelo', 'raio', 'elétr', 'eletr', 'ácido', 'corros', 'água', 'agua', 'terra', 'ar', 'flamejante'];
  if (existingTypes.some(type => elementalMarkers.some(marker => type.includes(marker)))) return entry;
  const bonus = Number(derived?.modMagia) || 0;
  const parts = bonus === 0 ? entry.parts : [...(entry.parts || []), { type: 'flat', sign: bonus < 0 ? -1 : 1, value: Math.abs(bonus), subtotal: bonus }];
  return {
    ...entry,
    total: Number(entry.total || 0) + bonus,
    formula: bonus === 0 ? entry.formula : `${entry.formula}${bonus > 0 ? '+' : ''}${bonus}`,
    parts,
    damageTypes: [element],
    label: `${entry.label} · Elemental (${element})`,
    elementalOriginApplied: true,
    elementalOriginBonus: bonus,
  };
}

export function metamorphEffectKeys() {
  return [...ITEM_ATTRIBUTE_KEYS, 'ca', 'hpMax', 'deslocamento'];
}
