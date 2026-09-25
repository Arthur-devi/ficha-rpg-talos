import { SHIKATAS } from './system.js';

export const MULTICLASS_REQUIREMENTS = {
  vanguarda: 'Sobreviver ao estado morrendo 3 vezes.',
  inclemente: 'Fazer 3 origens diferentes sobreviverem ao estado morrendo 3 vezes.',
  ladino: 'Arrombar 15 fechaduras em uma semana.',
  guerreiro: 'Atacar com espada ou escudo 3 vezes em situação desesperadora.',
  cacador: 'Viver sozinho na floresta por um ano.',
  necromante: 'Utilizar mortos para atacar ou defender 10 vezes.',
  mago: 'Conseguir um dos raros livros de magia, lê-lo e entendê-lo.',
  feiticeiro: 'Sentir a mana no ar (necessário treinar com outro feiticeiro).',
  monge: 'Jurar fidelidade a um monastério.',
  espadachim: 'Realizar 3 ataques consecutivos com katana num único alvo, todos críticos.',
  ceifeiro: 'Roubar o receptáculo de outro ceifeiro.',
  bardo: 'Compor mil e uma músicas em um ano OU compor uma obra-prima.',
  paladino: 'Ser devoto a um deus.',
  hemomante: 'Provar o sangue de 10 origens diferentes.',
  spellstealer: 'Matar um rei e usurpar sua coroa.',
  bruxo: 'Requisito ainda a definir no TALOS v6.',
  lanceiro: 'Transpassar 10 origens diferentes com uma lança.',
  'manipulador-essencia': 'Requisito ainda a definir no TALOS v6.',
  fulgor: 'Ser atingido por um raio e sobreviver.',
  sentinela: 'Ser ensinado por outro sentinela.',
  'invocador-funereo': 'Requisito ainda a definir no TALOS v6.',
};

export const DEFAULT_SHIKATA_PROGRESS = Object.freeze({ entries: {} });

export function normalizeShikataProgress(rawProgress, legacy = {}) {
  const rawEntries = rawProgress?.entries && typeof rawProgress.entries === 'object'
    ? rawProgress.entries
    : {};
  const entries = {};

  for (const [id, rawEntry] of Object.entries(rawEntries)) {
    if (!SHIKATAS.some(shikata => shikata.id === id)) continue;
    const level = Math.max(1, Math.min(30, Number(rawEntry?.nivel) || 1));
    entries[id] = {
      nivel: level,
      subclasse: String(rawEntry?.subclasse || ''),
      learnedAt: rawEntry?.learnedAt || null,
      learnedOrder: Number(rawEntry?.learnedOrder) || 0,
    };
  }

  const legacyId = String(legacy.shikata || '');
  if (legacyId && SHIKATAS.some(shikata => shikata.id === legacyId) && !entries[legacyId]) {
    entries[legacyId] = {
      nivel: Math.max(1, Math.min(30, Number(legacy.nivel) || 1)),
      subclasse: String(legacy.subclasse || ''),
      learnedAt: null,
      learnedOrder: 1,
    };
  }

  return { entries };
}

export function getLearnedShikataIds(char) {
  return Object.keys(char?.shikataProgress?.entries || {});
}

export function getShikataEntry(char, shikataId = char?.shikata) {
  if (!shikataId) return null;
  return char?.shikataProgress?.entries?.[shikataId] || null;
}

export function getShikataLevel(char, shikataId = char?.shikata) {
  const entry = getShikataEntry(char, shikataId);
  if (entry) return Math.max(1, Number(entry.nivel) || 1);
  if (shikataId && shikataId === char?.shikata) return Math.max(1, Number(char?.nivel) || 1);
  return 0;
}

export function getShikataSubclass(char, shikataId = char?.shikata) {
  const entry = getShikataEntry(char, shikataId);
  if (entry) return String(entry.subclasse || '');
  if (shikataId && shikataId === char?.shikata) return String(char?.subclasse || '');
  return '';
}

export function getAccumulatedShikataLevel(charOrProgress) {
  const progress = charOrProgress?.shikataProgress || charOrProgress || DEFAULT_SHIKATA_PROGRESS;
  const sum = Object.values(progress?.entries || {}).reduce((total, entry) => total + Math.max(1, Number(entry?.nivel) || 1), 0);
  return Math.max(1, sum || 1);
}

export function learnedShikataSummary(char) {
  return getLearnedShikataIds(char)
    .map(id => {
      const data = SHIKATAS.find(shikata => shikata.id === id);
      const entry = getShikataEntry(char, id);
      return data && entry ? { ...data, ...entry, id } : null;
    })
    .filter(Boolean)
    .sort((a, b) => (Number(a.learnedOrder) || 999) - (Number(b.learnedOrder) || 999));
}

export function syncLegacyShikataFields(character) {
  const progress = normalizeShikataProgress(character?.shikataProgress, character);
  const ids = Object.keys(progress.entries);
  let activeId = String(character?.shikata || '');
  if (!activeId || !progress.entries[activeId]) activeId = ids[0] || '';
  const active = activeId ? progress.entries[activeId] : null;
  return {
    ...character,
    shikataProgress: progress,
    shikata: activeId,
    subclasse: active?.subclasse || '',
    nivel: getAccumulatedShikataLevel(progress),
  };
}

export function getSubclassUnlock(char, shikataId = char?.shikata) {
  const data = SHIKATAS.find(shikata => shikata.id === shikataId);
  if (!data || !data.subclasses?.length) return null;
  return {
    shikataId,
    level: Number(data.subclasseNivel) || 5,
    options: [...data.subclasses],
  };
}

export function requirementForShikata(shikataId) {
  return MULTICLASS_REQUIREMENTS[shikataId] || 'Requisito não especificado no TALOS v6.';
}
