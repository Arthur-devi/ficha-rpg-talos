import { useEffect, useMemo, useState } from 'react';
import { ATTRIBUTES, PERICIAS_INFO, SHIKATAS } from '../data/system';
import { SKILL_TEST_GUIDANCE, UNTRAINED_DISADVANTAGE_SKILLS, allSkills, characterProficiencySources, initiativeBonusFromLuta, professionSkillSpecialty, skillModifier } from '../data/skillRuntime';
import { DEATH_SAVE_TABLE_RULE, INSPIRATION_TABLE_RULE } from '../data/tableRules';
import DiceStage3D from './DiceStage3D';
import TalosIcon from './TalosIcon';
import InfoTip from './InfoTip';

const QUICK_ROLLS = ['1d2', '1d4', '1d6', '1d8', '1d10', '1d12', '1d20', '1d100', '2d6', '2d8', '2d10'];
const HISTORY_LIMIT = 50;

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function assertRollBounds(count, sides) {
  if (!Number.isInteger(count) || !Number.isInteger(sides) || count < 1 || sides < 1) {
    throw new Error('Fórmula inválida.');
  }

  if (count > 100 || sides > 1000) {
    throw new Error('Limite máximo: 100 dados, d1000.');
  }
}

function formatSignedNumber(value) {
  return value >= 0 ? `${value}` : `${value}`;
}

function normalizeResolvedFormula(formula) {
  return formula
    .replace(/\+-/g, '-')
    .replace(/--/g, '+')
    .replace(/^\+/, '');
}

function rollFormula(rawFormula) {
  const clean = rawFormula.replace(/\s+/g, '').toLowerCase();
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
    if (!Number.isInteger(value)) throw new Error('Fórmula inválida.');
    return { type: 'flat', sign, value, subtotal: value * sign };
  });

  return {
    formula: rawFormula,
    total: parts.reduce((sum, part) => sum + part.subtotal, 0),
    parts,
  };
}

function rollTalosAttribute() {
  const rolls = Array.from({ length: 3 }, () => rollDie(4));
  const kept = [...rolls].sort((a, b) => a - b).slice(0, 2);
  const total = kept.reduce((sum, roll) => sum + roll, 0);
  return {
    label: 'Atributo TALOS',
    formula: '3d4, soma dos 2 menores',
    total,
    parts: [{ type: 'attribute', rolls, kept, subtotal: total }],
  };
}

function formatPart(part, index) {
  if (part.type === 'attribute') {
    return `3d4 [${part.rolls.join(', ')}] | usados: ${part.kept.join(' + ')} = ${part.subtotal}`;
  }

  const prefix = part.sign < 0 ? '-' : index === 0 ? '' : '+';
  if (part.type === 'flat') return `${prefix}${part.value} = ${part.subtotal}`;

  return `${prefix}${part.count}d${part.sides} [${part.rolls.join(', ')}] = ${part.subtotal}`;
}

function makeEntry(result, extra = {}) {
  const createdAt = new Date().toISOString();
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt,
    time: new Date(createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    ...result,
    ...extra,
  };
}

function resolveHitDiceFormula(shikataData, derived) {
  if (!shikataData || !shikataData.dadoVida || shikataData.dadoVida.toLowerCase().includes('não informado')) {
    return null;
  }

  const rawFormula = shikataData.dadoVida.split(/\s+ou\s+/i)[0].trim();
  const resolvedFormula = normalizeResolvedFormula(rawFormula
    .replace(/mod\s*cons?/gi, formatSignedNumber(derived.modCon || 0))
    .replace(/mod\s*con/gi, formatSignedNumber(derived.modCon || 0))
    .replace(/\bconstituição\b/gi, formatSignedNumber(derived.attrsTotal?.constituicao || 0))
    .replace(/\bcon\b/gi, formatSignedNumber(derived.attrsTotal?.constituicao || 0)));

  return { rawFormula, resolvedFormula };
}

function DeathTrack({ label, value, kind }) {
  const max = kind === 'success' ? DEATH_SAVE_TABLE_RULE.successesToRecover : DEATH_SAVE_TABLE_RULE.failuresToDie;
  const numeric = Math.max(0, Math.min(max, Number(value) || 0));
  return (
    <div className={`death-save-track ${kind}`}>
      <span>{label}</span>
      <div>{Array.from({ length: max }, (_, index) => <i key={index} className={index < numeric ? 'filled' : ''}>{kind === 'success' ? '✓' : '×'}</i>)}</div>
      <strong>{numeric}/{max}</strong>
    </div>
  );
}

export default function TabDados({ char, update, derived, spendTurnAction, rollDeathSave, reviveCharacter }) {
  const [formula, setFormula] = useState('1d20');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [useInspiration, setUseInspiration] = useState(false);
  const [attackModifierKey, setAttackModifierKey] = useState('');
  const [attackActionMode, setAttackActionMode] = useState('full');
  const [skillName, setSkillName] = useState('Atletismo');
  const [skillAdjustment, setSkillAdjustment] = useState(0);

  const shikataData = SHIKATAS.find(shikata => shikata.id === char.shikata);
  const activeHpRolls = derived.activeHpLevelRolls || [];
  const maxHpRolls = Math.max(0, (Number(derived.activeShikataLevel) || 1) - 1);
  const remainingHpRolls = Math.max(0, maxHpRolls - activeHpRolls.length);
  const hitDiceFormula = useMemo(() => resolveHitDiceFormula(shikataData, derived), [shikataData, derived]);
  const diceHistory = Array.isArray(char.diceHistory) ? char.diceHistory : [];
  const attackModifierOptions = derived.attackModifierOptions || [];
  const selectedAttackModifier = attackModifierOptions.find(option => option.key === attackModifierKey) || attackModifierOptions[0] || null;
  const attackActionOptions = (derived.learnedShikataIds || []).includes('monge')
    ? [
      { type: 'full', cost: 1, label: 'Ação completa' },
      { type: 'bonus', cost: 1, label: 'Ação bônus (ação marcial)' },
    ]
    : [{ type: 'full', cost: 1, label: 'Ação completa' }];
  const selectedAttackAction = attackActionOptions.find(option => option.type === attackActionMode) || attackActionOptions[0];
  const combatActive = Boolean(char.abilityTimeline?.combatActive);
  const attackActionRemaining = selectedAttackAction.type === 'bonus' ? (derived.turnEconomy?.bonusRemaining || 0) : (derived.turnEconomy?.fullRemaining || 0);
  const attackActionBlocked = combatActive && attackActionRemaining < selectedAttackAction.cost;
  const skillCatalog = useMemo(() => allSkills(), []);
  const selectedSkill = skillCatalog.find(skill => skill.name === skillName) || skillCatalog[0];
  const selectedSkillAttr = ATTRIBUTES.find(attribute => attribute.key === selectedSkill?.attributeKey);
  const selectedSkillModifier = selectedSkill ? skillModifier(derived, selectedSkill.name) : 0;
  const selectedSkillSources = selectedSkill ? characterProficiencySources(char, derived, selectedSkill.name) : [];
  const selectedSkillProficient = selectedSkillSources.length > 0;
  const initiativeExtra = selectedSkill?.name === 'Iniciativa' ? initiativeBonusFromLuta(char, derived) : 0;
  const selectedSkillGuidance = selectedSkill ? SKILL_TEST_GUIDANCE[selectedSkill.name] : null;
  const selectedSkillSpecialty = selectedSkill ? professionSkillSpecialty(char, selectedSkill.name) : '';
  const untrainedDisadvantage = selectedSkill ? (!selectedSkillProficient && UNTRAINED_DISADVANTAGE_SKILLS.has(selectedSkill.name)) : false;
  const deathState = derived.deathSaveState || { successes: 0, failures: 0, dead: false, lastRoll: null };

  useEffect(() => {
    if (!attackModifierOptions.length) {
      setAttackModifierKey('');
      return;
    }
    if (!attackModifierOptions.some(option => option.key === attackModifierKey)) {
      setAttackModifierKey(attackModifierOptions[0].key);
    }
  }, [attackModifierKey, attackModifierOptions]);

  useEffect(() => {
    if (!attackActionOptions.some(option => option.type === attackActionMode)) setAttackActionMode(attackActionOptions[0].type);
  }, [attackActionMode, shikataData?.id]);

  const saveHistory = (entry) => {
    update('diceHistory', [entry, ...diceHistory].slice(0, HISTORY_LIMIT));
  };

  const commitFreeRoll = (nextResult, extra = {}) => {
    const inspirationAvailable = Math.max(0, Number(char.inspiracao) || 0);
    const inspirationUsed = useInspiration && inspirationAvailable > 0;
    const resolvedResult = inspirationUsed
      ? {
        ...nextResult,
        baseTotal: nextResult.total,
        total: nextResult.total + INSPIRATION_TABLE_RULE.bonus,
        inspirationUsed: true,
        inspirationBonus: INSPIRATION_TABLE_RULE.bonus,
      }
      : nextResult;

    const entry = makeEntry(resolvedResult, { type: 'free-roll', ...extra });
    setResult(entry);
    saveHistory(entry);
    if (inspirationUsed) update('inspiracao', inspirationAvailable - 1);
    setUseInspiration(false);
    setError('');
  };

  const handleSkillTest = () => {
    try {
      if (!selectedSkill) throw new Error('Selecione uma perícia.');
      const manual = Math.max(-50, Math.min(50, Number(skillAdjustment) || 0));
      const automaticBonus = selectedSkillModifier + initiativeExtra;
      const resolved = normalizeResolvedFormula(`1d20+${automaticBonus + manual}`);
      const rolled = rollFormula(resolved);
      commitFreeRoll({
        label: `Perícia — ${selectedSkill.name}`,
        formula: resolved,
        total: rolled.total,
        parts: rolled.parts,
        skillName: selectedSkill.name,
        skillAttribute: selectedSkillAttr?.label || selectedSkill.attributeKey,
        skillModifier: selectedSkillModifier,
        skillAdjustment: manual,
        initiativeBonus: initiativeExtra,
        skillProficient: selectedSkillProficient,
        skillProficiencySources: selectedSkillSources,
        untrainedDisadvantage,
      }, { type: 'skill-test', skillName: selectedSkill.name });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRoll = (nextFormula = formula) => {
    try {
      const rolled = rollFormula(nextFormula);
      setFormula(nextFormula);
      commitFreeRoll({
        label: nextFormula,
        formula: nextFormula,
        total: rolled.total,
        parts: rolled.parts,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTalosAttribute = () => {
    commitFreeRoll(rollTalosAttribute());
  };

  const handleDeathSave = () => {
    const outcome = rollDeathSave?.();
    if (!outcome?.ok) {
      setError(outcome?.message || 'Não foi possível realizar o Teste de Vontade.');
      return;
    }
    setResult(outcome.roll);
    setError('');
  };

  const handleRevive = () => {
    const outcome = reviveCharacter?.(1);
    if (!outcome?.ok) {
      setError(outcome?.message || 'Não foi possível registrar a ressurreição.');
      return;
    }
    setResult(null);
    setError('');
  };

  const handleClassAttack = () => {
    try {
      if (!shikataData) throw new Error('Selecione uma Shikata antes de rolar um ataque TALOS.');
      if (!selectedAttackModifier) throw new Error('A Shikata atual não possui modificador de acerto configurado.');
      const actionResult = spendTurnAction?.(selectedAttackAction.type, selectedAttackAction.cost, 'Ataque TALOS');
      if (actionResult && !actionResult.ok) throw new Error(actionResult.message);

      if (char.originState?.precisionReady) {
        const entry = makeEntry({ label: 'Ataque TALOS — PRECISÃO', formula: 'ACERTO CERTEIRO', total: 'CERTEIRO', parts: [], precisionAutoHit: true, noCinematic: true }, { type: 'class-attack-auto-hit' });
        update('originState.precisionReady', false);
        setResult(entry);
        saveHistory(entry);
        setError('');
        return;
      }

      const natural = rollFormula('1d20');
      const classBonus = derived.isCansado ? 0 : Number(selectedAttackModifier.modifier) || 0;
      const total = natural.total + classBonus;
      const bonusPart = { type: 'flat', sign: classBonus < 0 ? -1 : 1, value: Math.abs(classBonus), subtotal: classBonus };
      const parts = classBonus === 0 ? natural.parts : [...natural.parts, bonusPart];

      commitFreeRoll({
        label: `Ataque TALOS — ${selectedAttackModifier.label}`,
        formula: classBonus === 0 ? '1d20' : normalizeResolvedFormula(`1d20+${classBonus}`),
        total,
        parts,
        attackModifierLabel: selectedAttackModifier.label,
        attackModifierValue: Number(selectedAttackModifier.modifier) || 0,
        fatiguePenaltyApplied: Boolean(derived.isCansado),
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const buildHpRollEntry = (level) => {
    if (!hitDiceFormula) throw new Error('A shikata atual não possui dado de vida pós nível 1 configurado.');

    const rolled = rollFormula(hitDiceFormula.resolvedFormula);
    return makeEntry({
      label: `Vida nível ${level} - ${shikataData.name}`,
      formula: hitDiceFormula.rawFormula,
      resolvedFormula: hitDiceFormula.resolvedFormula,
      total: rolled.total,
      parts: rolled.parts,
    }, {
      type: 'hp-level-roll',
      shikataId: shikataData.id,
      shikataName: shikataData.name,
      level,
      characterLevel: Number(char.nivel) || 1,
    });
  };

  const commitHpRolls = (entries) => {
    if (entries.length === 0) return;
    const nextHpRolls = [...(char.hpLevelRolls || []), ...entries];
    update('hpLevelRolls', nextHpRolls);
    update('diceHistory', [...entries].reverse().concat(diceHistory).slice(0, HISTORY_LIMIT));
    setResult(entries[entries.length - 1]);
    setError('');
  };

  const rollNextHp = () => {
    try {
      if (!shikataData) throw new Error('Selecione uma shikata antes de girar vida.');
      if (remainingHpRolls <= 0) throw new Error('Todas as rolagens de vida disponíveis para o nível atual já foram feitas.');

      const nextLevel = activeHpRolls.length + 2;
      commitHpRolls([buildHpRollEntry(nextLevel)]);
    } catch (err) {
      setError(err.message);
    }
  };

  const rollAllHp = () => {
    try {
      if (!shikataData) throw new Error('Selecione uma shikata antes de girar vida.');
      if (remainingHpRolls <= 0) throw new Error('Todas as rolagens de vida disponíveis para o nível atual já foram feitas.');

      const entries = Array.from({ length: remainingHpRolls }, (_, index) => buildHpRollEntry(activeHpRolls.length + index + 2));
      commitHpRolls(entries);
    } catch (err) {
      setError(err.message);
    }
  };

  const removeLastHpRoll = () => {
    const activeIds = new Set(activeHpRolls.map(roll => roll.id));
    const lastActiveId = activeHpRolls[activeHpRolls.length - 1]?.id;
    if (!lastActiveId) return;

    update('hpLevelRolls', (char.hpLevelRolls || []).filter(roll => roll.id !== lastActiveId || !activeIds.has(roll.id)));
  };

  return (
    <div className="dice-page-layout">
      <div className="stack dice-main-column">
      {(derived.isMorrendo || derived.isDead) && (
        <div className={`card death-save-card ${derived.isDead ? 'dead' : ''}`}>
          <div className="card-header"><span>✚</span><h3>{derived.isDead ? 'Morte Confirmada' : 'Teste de Vontade — Morrendo'}</h3></div>
          <div className="card-body">
            {derived.isDead ? (
              <>
                <div className="death-save-dead-title">MORTO</div>
                <p className="death-save-rule">Foram registradas 3 falhas. Cura comum não remove este estado. Use o botão abaixo somente quando uma habilidade de ressurreição ou o Mestre devolver o personagem à vida.</p>
                <div className="death-save-actions">
                  <button type="button" className="btn btn-secondary" onClick={handleRevive}>✦ Registrar ressurreição · 1 HP</button>
                </div>
              </>
            ) : (
              <>
                <div className="death-save-heading">
                  <div>
                    <span>REGRA DA MESA</span>
                    <strong>{DEATH_SAVE_TABLE_RULE.die} natural · {DEATH_SAVE_TABLE_RULE.dc}+ sucesso · {DEATH_SAVE_TABLE_RULE.dc - 1}− falha</strong>
                  </div>
                  <div className="death-save-hp">HP {char.hpAtual}/{derived.hpMaxTotal}</div>
                </div>

                <div className="death-save-tracks">
                  <DeathTrack label="Sucessos" value={deathState.successes} kind="success" />
                  <DeathTrack label="Falhas" value={deathState.failures} kind="failure" />
                </div>

                <p className="death-save-rule"><strong>{DEATH_SAVE_TABLE_RULE.successesToRecover} sucessos</strong> → recupera {DEATH_SAVE_TABLE_RULE.recoveryHp} HP e sai de MORRENDO. <strong>{DEATH_SAVE_TABLE_RULE.failuresToDie} falhas</strong> → MORTE. Qualquer cura que deixe o HP acima de 0 antes da morte zera ambos os contadores. Sem modificadores e sem Inspiração.</p>
                <div className="death-save-actions">
                  <button type="button" className="btn btn-primary death-save-roll-btn" onClick={handleDeathSave}><TalosIcon name="dice" size={16} /> Girar Teste de Vontade</button>
                  {deathState.lastRoll != null && <span className="death-save-last">Último d20: <strong>{deathState.lastRoll}</strong></span>}
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <div className="card">
        <div className="card-header"><span>D20</span><h3>Vida por Nível</h3></div>
        <div className="card-body">
          {remainingHpRolls > 0 && (
            <div style={{ marginBottom: 14, padding: '10px 12px', border: '1px solid #d97706', borderRadius: 'var(--radius-md)', background: '#fff7ed', color: '#92400e', fontSize: '0.82rem', lineHeight: 1.45 }}>
              <strong>Evolução pendente:</strong> há {remainingHpRolls} rolagem(ns) de vida disponível(is). Ao subir de nível, o TALOS manda rolar o dado de vida pós-nível 1 da Shikata que evoluiu.
              {(char.pontosDistributivos || 0) > 0 && (
                <div style={{ marginTop: 4 }}>
                  Pontos distributivos disponíveis: <strong>{char.pontosDistributivos}</strong>. Depois da rolagem, distribua-os na aba Atributos.
                </div>
              )}
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 14 }}>
            <div style={{ border: '1px solid var(--parch-300)', borderRadius: 'var(--radius-md)', padding: 12, background: 'rgba(253,246,227,0.45)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.68rem', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Shikata</div>
              <div style={{ marginTop: 4, fontFamily: 'var(--font-heading)', color: 'var(--ink-dark)' }}>{shikataData?.name || 'Nenhuma'}</div>
              <div style={{ marginTop: 4, fontSize: '0.78rem', color: 'var(--ink-faded)' }}>{shikataData?.dadoVida || 'Selecione em Identidade'}</div>
            </div>
            <div style={{ border: '1px solid var(--parch-300)', borderRadius: 'var(--radius-md)', padding: 12, background: 'rgba(253,246,227,0.45)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.68rem', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Rolagens</div>
              <div className="big-num" style={{ fontSize: '2rem', marginTop: 2 }}>{activeHpRolls.length}/{maxHpRolls}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--ink-faded)' }}>Bônus na vida máxima: +{derived.hpLevelRollBonus || 0}</div>
            </div>
            <div style={{ border: '1px solid var(--parch-300)', borderRadius: 'var(--radius-md)', padding: 12, background: 'rgba(253,246,227,0.45)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.68rem', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Vida Máxima</div>
              <div className="big-num" style={{ fontSize: '2rem', marginTop: 2 }}>{derived.hpMaxTotal}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--ink-faded)', lineHeight: 1.4 }}>
                Base TALOS {derived.hpBase} + níveis {derived.hpLevelRollBonus || 0} + ajuste manual {derived.hpManualBonus || 0}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={rollNextHp} disabled={!shikataData || remainingHpRolls <= 0 || !hitDiceFormula}>
              {remainingHpRolls > 0 ? `Girar vida do nível ${activeHpRolls.length + 2}` : 'Vida em dia'}
            </button>
            <button className="btn btn-secondary" onClick={rollAllHp} disabled={!shikataData || remainingHpRolls <= 0 || !hitDiceFormula}>Girar restantes</button>
            <button className="btn btn-secondary" onClick={removeLastHpRoll} disabled={activeHpRolls.length === 0}>Remover última vida</button>
          </div>

          {activeHpRolls.length > 0 && (
            <div style={{ display: 'grid', gap: 8, marginTop: 14 }}>
              {activeHpRolls.map(roll => (
                <div key={roll.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 64px', gap: 10, alignItems: 'center', padding: '8px 10px', border: '1px solid var(--parch-300)', borderRadius: 'var(--radius-sm)', background: 'rgba(253,246,227,0.35)' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink-faded)', fontSize: '0.75rem' }}>Nv. {roll.level}</span>
                  <span style={{ color: 'var(--ink-mid)' }}>{roll.resolvedFormula || roll.formula}</span>
                  <strong style={{ fontFamily: 'var(--font-heading)', textAlign: 'right', color: 'var(--ink-dark)' }}>+{roll.total}</strong>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card shikata-attack-card">
        <div className="card-header">
          <TalosIcon name="combat" size={18} />
          <h3>Acerto da Shikata</h3>
          {shikataData && attackModifierOptions.length > 0 && (
            <InfoTip className="card-header-info" align="end" title="Regra de acerto TALOS" label="Regra completa do acerto da Shikata">
              <span>Ataque normal = d20 + modificador principal da Shikata. Em combate, consome 1 ação completa; fora de combate, nenhuma ação é consumida. O Monge pode usar ação bônus para uma ação marcial conforme ESSÊNCIA.</span>
              <span className="info-tip-paragraph">Ao esgotar o Limite de Cansaço, o ataque continua disponível, mas o bônus do modificador deixa de ser somado. A Inspiração armada na página também pode ser usada nesta rolagem.</span>
              {attackModifierOptions.some(option => option.sourceAmbiguous) && (
                <span className="info-tip-paragraph info-tip-warning">O v6 lista esta Shikata com mais de um modificador ligado por “e”, mas não explicita neste trecho se eles são somados. A ficha mantém escolha manual para não inventar a regra.</span>
              )}
            </InfoTip>
          )}
        </div>
        <div className="card-body">
          {!shikataData ? (
            <p className="sheet-empty-note">Selecione uma Shikata em Personagem para liberar o ataque TALOS.</p>
          ) : attackModifierOptions.length === 0 ? (
            <p className="sheet-empty-note">O modificador de acerto desta Shikata ainda não está estruturado.</p>
          ) : (
            <div className="shikata-attack-layout">
              <div className="field">
                <label>Modificador de acerto</label>
                {attackModifierOptions.length > 1 ? (
                  <select value={selectedAttackModifier?.key || ''} onChange={e => setAttackModifierKey(e.target.value)}>
                    {attackModifierOptions.map(option => (
                      <option key={option.key} value={option.key}>{option.label} ({option.modifier >= 0 ? '+' : ''}{option.modifier})</option>
                    ))}
                  </select>
                ) : (
                  <div className="shikata-attack-modifier">
                    <span>{selectedAttackModifier?.label}</span>
                    <strong className={`semantic-value ${Number(selectedAttackModifier?.modifier || 0) >= 0 ? 'is-positive' : 'is-negative'}`}>{selectedAttackModifier?.modifier >= 0 ? '+' : ''}{selectedAttackModifier?.modifier || 0}</strong>
                  </div>
                )}
              </div>
              <div className="shikata-attack-actions">
                {attackActionOptions.length > 1 && (
                  <select value={selectedAttackAction.type} onChange={e => setAttackActionMode(e.target.value)} title="Forma de ataque neste turno">
                    {attackActionOptions.map(option => <option key={option.type} value={option.type}>{option.label}</option>)}
                  </select>
                )}
                <button className="btn btn-primary" onClick={handleClassAttack} disabled={attackActionBlocked}>{char.originState?.precisionReady ? 'Usar ataque CERTEIRO' : 'Rolar ataque TALOS'}</button>
                <span className={`badge semantic-badge ${derived.isCansado ? 'is-negative fatigue-danger' : 'is-positive'}`}>
                  {derived.isCansado ? 'CANSADO · bônus +0' : `Bônus ativo ${selectedAttackModifier?.modifier >= 0 ? '+' : ''}${selectedAttackModifier?.modifier || 0}`}
                </span>
                <span className={`badge ${attackActionBlocked ? 'fatigue-danger' : ''}`}>{combatActive ? selectedAttackAction.label.toUpperCase() : 'FORA DE COMBATE · AÇÃO NÃO CONSUMIDA'}</span>
                {char.originState?.precisionReady && <span className="badge semantic-badge is-positive">PRECISÃO ARMADA · PRÓXIMO ATAQUE CERTEIRO</span>}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card skill-test-card">
        <div className="card-header"><span>◆</span><h3>Teste de Perícia</h3></div>
        <div className="card-body">
          <div className="skill-test-grid">
            <div className="field">
              <label>Perícia</label>
              <select value={selectedSkill?.name || ''} onChange={e => setSkillName(e.target.value)}>
                {skillCatalog.map(skill => <option key={skill.name} value={skill.name}>{skill.name}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Atributo / modificador</label>
              <div className="skill-test-static">{selectedSkillAttr?.label || '—'} <strong>{selectedSkillModifier >= 0 ? '+' : ''}{selectedSkillModifier}</strong></div>
            </div>
            <div className="field">
              <label>Ajuste do Mestre</label>
              <input type="number" min="-50" max="50" value={skillAdjustment} onChange={e => setSkillAdjustment(Number(e.target.value) || 0)} />
            </div>
          </div>

          <div className="skill-test-summary">
            <div className="skill-test-status-line">
              <span className={`badge ${selectedSkillProficient ? 'skill-trained' : 'skill-untrained'}`}>
                {selectedSkillProficient ? `PROFICIENTE · ${selectedSkillSources.join(' + ')}` : 'SEM PROFICIÊNCIA'}
              </span>
              {initiativeExtra > 0 && <span className="badge skill-trained">LUTA: +2 INICIATIVA</span>}
              {selectedSkillGuidance?.difficulty && <span className="badge">DT / REFERÊNCIA: {selectedSkillGuidance.difficulty}</span>}
              {selectedSkillSpecialty && <span className="badge">ESPECIALIDADE: {selectedSkillSpecialty}</span>}
            </div>
            <p><strong>{selectedSkill?.name}:</strong> {PERICIAS_INFO[selectedSkill?.name] || 'Sem descrição própria na seção PERÍCIAS do TALOS v6.'}</p>
            {selectedSkillGuidance?.note && <p className="skill-guidance">{selectedSkillGuidance.note}</p>}
            {untrainedDisadvantage && (
              <p className="skill-warning">O TALOS v6 diz explicitamente que <strong>{selectedSkill.name}</strong> pode ser tentada sem a perícia, mas com desvantagem. Como o trecho não fixa uma fórmula numérica universal para “desvantagem”, a ficha não inventa penalidade: use “Ajuste do Mestre” conforme a mesa.</p>
            )}
            {!selectedSkillProficient && !untrainedDisadvantage && (
              <p className="skill-note">Sem proficiência. O v6 avisa que certas ações podem ser exclusivas ou muito mais difíceis para quem não possui a perícia; o Mestre decide o caso concreto.</p>
            )}
          </div>

          <div className="skill-test-actions">
            <button type="button" className="btn btn-primary" onClick={handleSkillTest}><TalosIcon name="dice" size={16} /> Rolar teste de {selectedSkill?.name}</button>
            <span className="skill-formula-preview">
              1d20 {selectedSkillModifier + initiativeExtra >= 0 ? '+' : '−'} {Math.abs(selectedSkillModifier + initiativeExtra)}{Number(skillAdjustment) ? ` ${Number(skillAdjustment) >= 0 ? '+' : '−'} ${Math.abs(Number(skillAdjustment))}` : ''}
            </span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><span>#</span><h3>Rolagem Livre</h3></div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(160px, 1fr) auto', gap: 10, alignItems: 'end' }}>
            <div className="field">
              <label>Fórmula</label>
              <input
                value={formula}
                onChange={e => setFormula(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleRoll(); }}
                placeholder="Ex: 2d6+3"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => handleRoll()}>Girar</button>
              <button className="btn btn-secondary" onClick={handleTalosAttribute}>3d4 atributo</button>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
            {QUICK_ROLLS.map(quick => (
              <button key={quick} className="btn btn-secondary btn-sm" onClick={() => handleRoll(quick)}>
                {quick}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 14, padding: '10px 12px', border: `1px solid ${useInspiration ? 'var(--gold-dark)' : 'var(--parch-300)'}`, borderRadius: 'var(--radius-md)', background: useInspiration ? 'rgba(212,160,23,0.10)' : 'rgba(253,246,227,0.45)', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`btn btn-sm ${useInspiration ? 'btn-primary' : 'btn-secondary'}`}
              disabled={(Number(char.inspiracao) || 0) <= 0}
              onClick={() => setUseInspiration(value => !value)}
              aria-pressed={useInspiration}
            >
              ✦ {useInspiration ? 'Inspiração armada' : `Usar Inspiração (+${INSPIRATION_TABLE_RULE.bonus})`}
            </button>
            <div style={{ flex: 1, minWidth: 180, fontSize: '0.78rem', color: 'var(--ink-mid)', lineHeight: 1.4 }}>
              Disponível: <strong>{Math.max(0, Number(char.inspiracao) || 0)}</strong>. Ao ativar, a próxima rolagem desta aba recebe <strong>+{INSPIRATION_TABLE_RULE.bonus}</strong> e consome 1 Inspiração. Valores máximos naturais continuam marcados no dado.
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div style={{ color: '#b91c1c', fontFamily: 'var(--font-heading)', fontSize: '0.82rem', padding: '8px 12px', border: '1px solid #fecaca', borderRadius: 'var(--radius-sm)', background: '#fff1f2' }}>
          {error}
        </div>
      )}

      {result && (
        <div className="card">
          <div className="card-header"><span>=</span><h3>Resultado</h3></div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(110px, 160px) 1fr', gap: 16, alignItems: 'stretch' }}>
              <div style={{ border: '1px solid var(--gold-dark)', background: 'rgba(212,160,23,0.08)', borderRadius: 'var(--radius-md)', padding: 16, textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.68rem', color: 'var(--gold-dark)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{result.label}</div>
                <div className="big-num" style={{ fontSize: '3rem', marginTop: 4 }}>{result.total}</div>
              </div>
              <div style={{ border: '1px solid var(--parch-300)', borderRadius: 'var(--radius-md)', padding: 14, background: 'rgba(253,246,227,0.45)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.68rem', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Detalhe</div>
                {(result.parts || []).map((part, index) => (
                  <div key={index} style={{ fontSize: '0.9rem', color: 'var(--ink-mid)', lineHeight: 1.6 }}>
                    {formatPart(part, index)}
                  </div>
                ))}
                {result.inspirationUsed && (
                  <div style={{ marginTop: 6, fontSize: '0.86rem', color: 'var(--gold-dark)', fontFamily: 'var(--font-heading)' }}>
                    ✦ Inspiração: {result.baseTotal} + {result.inspirationBonus ?? INSPIRATION_TABLE_RULE.bonus} = {result.total}
                  </div>
                )}
                {result.type === 'skill-test' && (
                  <div className="skill-result-meta">
                    <strong>{result.skillName}</strong> · {result.skillAttribute} {result.skillModifier >= 0 ? '+' : ''}{result.skillModifier}
                    {result.initiativeBonus ? ` · Luta +${result.initiativeBonus}` : ''}
                    {result.skillAdjustment ? ` · ajuste ${result.skillAdjustment >= 0 ? '+' : ''}${result.skillAdjustment}` : ''}
                    <span>{result.skillProficient ? `Proficiência: ${(result.skillProficiencySources || []).join(' + ')}` : 'Sem proficiência'}</span>
                    {result.untrainedDisadvantage && <span className="skill-result-warning">Desvantagem prevista pelo v6; valor definido pela mesa.</span>}
                  </div>
                )}
                {result.type === 'death-save' && (
                  <div className={`death-save-result ${result.deathSaveSuccess ? 'success' : 'failure'} ${result.deathSaveResolution || ''}`}>
                    <strong>{result.deathSaveResolution === 'recovered' ? `${DEATH_SAVE_TABLE_RULE.successesToRecover} SUCESSOS · ${DEATH_SAVE_TABLE_RULE.recoveryHp} HP RECUPERADO` : result.deathSaveResolution === 'dead' ? `${DEATH_SAVE_TABLE_RULE.failuresToDie} FALHAS · MORTE` : result.deathSaveSuccess ? 'SUCESSO' : 'FALHA'}</strong>
                    <span>Sucessos {result.deathSaveSuccesses}/{DEATH_SAVE_TABLE_RULE.successesToRecover} · Falhas {result.deathSaveFailures}/{DEATH_SAVE_TABLE_RULE.failuresToDie}</span>
                    <small>Teste natural: {DEATH_SAVE_TABLE_RULE.die}, sem modificadores.</small>
                  </div>
                )}
                {result.fatiguePenaltyApplied && (
                  <div style={{ marginTop: 6, fontSize: '0.82rem', color: 'var(--red-old)', fontFamily: 'var(--font-heading)' }}>
                    CANSADO: modificador de acerto da Shikata ({result.attackModifierLabel} {result.attackModifierValue >= 0 ? '+' : ''}{result.attackModifierValue}) não foi somado.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {diceHistory.length > 0 && (
        <div className="card">
          <div className="card-header"><span>↺</span><h3>Histórico Salvo</h3></div>
          <div className="card-body">
            <div style={{ display: 'grid', gap: 8 }}>
              {diceHistory.slice(0, 12).map(entry => (
                <div key={entry.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 64px', gap: 10, alignItems: 'center', padding: '8px 10px', border: '1px solid var(--parch-300)', borderRadius: 'var(--radius-sm)', background: 'rgba(253,246,227,0.35)' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink-faded)', fontSize: '0.75rem' }}>{entry.time || ''}</span>
                  <span style={{ color: 'var(--ink-mid)' }}>{entry.label}{entry.inspirationUsed ? ' ✦ Inspiração' : ''}</span>
                  <strong style={{ fontFamily: 'var(--font-heading)', textAlign: 'right', color: 'var(--ink-dark)' }}>{entry.total}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
      <DiceStage3D result={result} />
    </div>
  );
}
