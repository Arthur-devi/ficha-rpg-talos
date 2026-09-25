import { ITEM_ATTRIBUTE_KEYS, ITEM_ATTRIBUTE_LABELS } from './itemEffects';
import { ORIGENS } from './system';
import { normalizeOriginState, slimePathStaticEffects } from './originRuntime';

function createEffects() {
  return {
    attrs: Object.fromEntries(ITEM_ATTRIBUTE_KEYS.map(key => [key, 0])),
    ca: 0,
    hpMax: 0,
    deslocamentoBase: null,
    limiteCansacoBase: null,
    skillBonuses: {},
    special: [],
    summary: [],
    missing: [],
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

function getStaticOriginEffects(origin) {
  const effects = createEffects();
  if (!origin) return effects;

  for (const key of ITEM_ATTRIBUTE_KEYS) {
    effects.attrs[key] = (Number(origin.bonus?.[key]) || 0) + (Number(origin.malus?.[key]) || 0);
  }

  effects.deslocamentoBase = Number.isFinite(Number(origin.deslocamento)) && origin.deslocamento !== null
    ? Number(origin.deslocamento)
    : null;
  effects.limiteCansacoBase = Number.isFinite(Number(origin.limiteCansaco)) && origin.limiteCansaco !== null
    ? Number(origin.limiteCansaco)
    : null;
  parseExtra(origin.extra, effects);
  return effects;
}

function mergeHalfStaticOrigin(effects, secondary) {
  if (!secondary) return;
  const secondaryEffects = getStaticOriginEffects(secondary);
  for (const key of ITEM_ATTRIBUTE_KEYS) effects.attrs[key] += (secondaryEffects.attrs[key] || 0) / 2;
  effects.hpMax += (secondaryEffects.hpMax || 0) / 2;
  effects.ca += (secondaryEffects.ca || 0) / 2;
}


function mergeCustomMechanicalEffects(effects, custom = {}) {
  if (!custom || typeof custom !== 'object') return;
  for (const key of ITEM_ATTRIBUTE_KEYS) effects.attrs[key] += Number(custom[key]) || 0;
  effects.ca += Number(custom.ca) || 0;
  effects.hpMax += Number(custom.hpMax) || 0;
  if (Number(custom.deslocamento)) effects.deslocamentoBase = (effects.deslocamentoBase || 0) + Number(custom.deslocamento);
}

function mergeMetamorphForm(effects, form) {
  if (!form?.effects) return;
  for (const key of ITEM_ATTRIBUTE_KEYS) effects.attrs[key] += Number(form.effects[key]) || 0;
  effects.ca += Number(form.effects.ca) || 0;
  effects.hpMax += Number(form.effects.hpMax) || 0;
  if (Number(form.effects.deslocamento)) {
    effects.deslocamentoBase = (effects.deslocamentoBase || 0) + Number(form.effects.deslocamento);
  }
}

export function getOriginEffects(origin, context = {}) {
  const effects = getStaticOriginEffects(origin);
  if (!origin) return effects;

  const level = Math.max(1, Number(context.level) || 1);
  const state = normalizeOriginState(context.originState);

  if (origin.id === 'manchados') {
    for (const key of ITEM_ATTRIBUTE_KEYS) effects.attrs[key] += 1;
    if (level >= 2) effects.attrs.magia += 4;
    if (level >= 3) effects.special.push('Olhos Escarlates nv.3: percepção revela obscuridades e ataques na cabeça são parados pela força dos olhos');
    effects.special.push(level >= 4 ? 'Olhos Escarlates nv.4+: evolução a critério do mestre' : `Olhos Escarlates ativos até o nível ${Math.min(level, 3)}`);
  }

  if (origin.id === 'elfo-maritimo') {
    if (state.inWater) {
      for (const key of ITEM_ATTRIBUTE_KEYS) {
        if (key !== 'constituicao') effects.attrs[key] += 4;
      }
      effects.special.push('SUBMERSO: +4 em todos os atributos, exceto Constituição');
    } else {
      effects.special.push(`FORA D'ÁGUA: ${Math.max(0, Number(state.hoursOutOfWater) || 0)}/12h registradas`);
    }
  }

  if (origin.id === 'elfo-negro' && state.totalDarkness) {
    effects.attrs.destreza += 3;
    effects.attrs.carisma += 1;
    effects.special.push('SOMBRIO ATIVO: bônus raciais de Destreza e Carisma dobrados');
  }

  if (origin.id === 'meio-orc') {
    const secondary = ORIGENS.find(item => item.id === state.secondaryOriginId && item.id !== 'meio-orc');
    if (secondary) {
      mergeHalfStaticOrigin(effects, secondary);
      if (secondary.limiteCansaco != null) effects.limiteCansacoBase = (6 + Number(secondary.limiteCansaco)) / 2;
      effects.special.push(`Fusão: metade dos bônus/malefícios de ${secondary.name}`);
    } else {
      effects.special.push('Fusão pendente: escolha a segunda origem');
    }
  }

  if (origin.id === 'meio-demonio') {
    mergeCustomMechanicalEffects(effects, state.demonMechanicalEffects);
    if (Object.values(state.demonMechanicalEffects || {}).some(value => Number(value))) effects.special.push('Crescimento do Mal: ajustes mecânicos definidos pelo mestre aplicados');
  }

  if (origin.id === 'feral') {
    mergeCustomMechanicalEffects(effects, state.feralMechanicalEffects);
    if (Object.values(state.feralMechanicalEffects || {}).some(value => Number(value))) effects.special.push('Atributos Novos: ajustes mecânicos definidos pelo mestre aplicados');
  }

  if (origin.id === 'goblin') effects.skillBonuses.Furtividade = 2;

  if (origin.id === 'slime' && level >= 5 && state.slimePath) {
    const pathEffects = slimePathStaticEffects(state.slimePath, state.slimeChosenAttrs);
    for (const key of ITEM_ATTRIBUTE_KEYS) effects.attrs[key] += pathEffects.attrs[key] || 0;
    effects.hpMax += pathEffects.hpMax || 0;
    effects.special.push(`Caminho do Slime: ${state.slimePath}`);
  }

  if (origin.id === 'lobisomem' && state.werewolfActive) {
    for (const key of ITEM_ATTRIBUTE_KEYS) effects.attrs[key] += 2;
    effects.ca += 2;
    effects.special.push('FORMA DE LOBISOMEM: +2 em todos os atributos e CA; habilidades de Shikata indisponíveis');
  }

  if (origin.id === 'metamorfo') {
    for (const key of ITEM_ATTRIBUTE_KEYS) effects.attrs[key] += Math.max(0, Number(state.metamorphAttributePoints?.[key]) || 0);
    const chosen = Object.values(state.metamorphAttributePoints || {}).reduce((sum, value) => sum + Math.max(0, Number(value) || 0), 0);
    if (chosen < 2) effects.special.push(`Metamorfo: ${2 - chosen} ponto(s) de atributo da Origem ainda disponível(is)`);
  }

  if (origin.id === 'metamorfo' && Number(state.activeMetamorphForm) >= 0) {
    const form = state.metamorphForms?.[Number(state.activeMetamorphForm)];
    if (form) {
      mergeMetamorphForm(effects, form);
      effects.special.push(`Forma ativa: ${form.name || `Forma ${Number(state.activeMetamorphForm) + 1}`}`);
    }
  }

  if (origin.id === 'lorv') {
    for (const key of ITEM_ATTRIBUTE_KEYS) effects.attrs[key] += (Number(state.lorvHostAttrs?.[key]) || 0) / 2;
    effects.special.push('Lorv: metade dos atributos positivos e negativos informados do hospedeiro');
  }

  if (origin.id === 'guardiao' && Number(state.guardianCaBonus) > 0) {
    effects.ca += Number(state.guardianCaBonus);
    effects.special.push(state.guardianCriticalCombat
      ? `REVESTIMENTO CRÍTICO: +${state.guardianCaBonus} CA até o fim do combate`
      : `REVESTIMENTO: +${state.guardianCaBonus} CA por ${state.guardianTurnsRemaining} turno(s)`);
  }

  if (origin.id === 'drac' && state.dracInvulnerableTurns > 0) effects.special.push(`INVENCIBILIDADE ATIVA: invulnerável por ${state.dracInvulnerableTurns} turno(s)`);
  if (origin.id === 'crono' && state.cronoTimeStoppedTurns > 0) effects.special.push(`QUEBRA DO TEMPO ATIVA: ${state.cronoTimeStoppedTurns} turno(s)`);
  if (origin.id === 'kvaldir' && state.kvaldirDefenseActive) effects.special.push('DEFESA GROTESCA ATIVA: bloqueia ataques físicos e reflete metade do dano mágico neste combate');

  if (origin.id === 'vampiro' && state.vampireActive) {
    effects.special.push(`DESPERTAR DA MALDIÇÃO ATIVO: ${state.vampireTurnsRemaining} turno(s) restante(s)`);
  }

  if (origin.deslocamento == null) effects.missing.push('Deslocamento não especificado no TALOS v6');
  if (origin.limiteCansaco == null && effects.limiteCansacoBase == null) effects.missing.push(origin.id === 'meio-orc' ? 'Limite de cansaço depende da origem mesclada' : 'Limite de cansaço não especificado no TALOS v6');

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

  if (effects.deslocamentoBase != null) summary.push(`Deslocamento base ${effects.deslocamentoBase}`);
  if (effects.limiteCansacoBase != null) summary.push(`Cansaço base ${effects.limiteCansacoBase}`);

  for (const [skill, bonus] of Object.entries(effects.skillBonuses || {})) summary.push(`${skill} +${bonus}`);
  summary.push(...effects.special);
  summary.push(...(effects.missing || []));
  return summary;
}
