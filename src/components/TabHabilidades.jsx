import { useState } from 'react';
import { SHIKATAS, SHIKATAS_HABILIDADES, getHabilidadesPorNivel, getHabilidadesFuturas } from '../data/system';
import { getEvolucao } from '../data/evolucoes';
import { formatHpCost, getAbilityAvailability, getAbilityRuntimeSpec } from '../data/abilityRuntime';
import { buildOfficialDamageRoll, damageTypeLabel } from '../data/damageRuntime';
import { pushDiceHistory } from '../data/diceRuntime';
import DiceStage3D from './DiceStage3D';
import PeriodTransitionOverlay from './PeriodTransitionOverlay';
import AbilityUseOverlay from './AbilityUseOverlay';

function clampCounter(value) {
  return Math.max(0, Number(value) || 0);
}

function EvolucaoTable({ shikataId, nome, nivelAtual }) {
  const rows = getEvolucao(shikataId, nome);
  if (!rows || rows.length === 0) return null;
  return (
    <div style={{ marginTop: 8, borderRadius: 4, overflow: 'hidden', border: '1px solid var(--parch-300)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
        <thead>
          <tr style={{ background: 'var(--parch-200)' }}>
            <th style={{ fontFamily: 'var(--font-heading)', fontSize: '0.62rem', letterSpacing: '0.07em', textTransform: 'uppercase', padding: '4px 8px', textAlign: 'left', color: 'var(--ink-light)', width: 64, borderBottom: '1px solid var(--parch-300)' }}>Nível</th>
            <th style={{ fontFamily: 'var(--font-heading)', fontSize: '0.62rem', letterSpacing: '0.07em', textTransform: 'uppercase', padding: '4px 8px', textAlign: 'left', color: 'var(--ink-light)', borderBottom: '1px solid var(--parch-300)' }}>Efeito</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const unlocked = r.nivel <= nivelAtual;
            const isCurrent = rows.filter(x => x.nivel <= nivelAtual).length > 0 &&
              r.nivel === Math.max(...rows.filter(x => x.nivel <= nivelAtual).map(x => x.nivel));
            return (
              <tr key={i} style={{
                background: isCurrent ? 'rgba(212,160,23,0.08)' : unlocked ? 'rgba(253,246,227,0.4)' : 'transparent',
                opacity: unlocked ? 1 : 0.45,
                borderBottom: i < rows.length - 1 ? '1px solid var(--parch-200)' : 'none',
              }}>
                <td style={{ padding: '4px 8px', fontFamily: 'var(--font-heading)', fontWeight: 600, color: isCurrent ? 'var(--gold-dark)' : unlocked ? 'var(--ink-dark)' : 'var(--ink-faded)', whiteSpace: 'nowrap' }}>
                  {isCurrent && <span style={{ marginRight: 4 }}>▶</span>}
                  Nv. {r.nivel}
                </td>
                <td style={{ padding: '4px 8px', color: unlocked ? 'var(--ink-mid)' : 'var(--ink-faded)', lineHeight: 1.4 }}>{r.desc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function BardoResources({ char, update }) {
  const resources = char.classResources?.bardo || {};
  const setResource = (key, value) => update(`classResources.bardo.${key}`, clampCounter(value));
  const adjust = (key, delta) => setResource(key, (resources[key] || 0) + delta);
  const subclasse = char.subclasse || '';

  const fields = [
    { key: 'performance', label: 'Performance', step: 10 },
    { key: 'concertosSucesso', label: 'Concertos Seguidos', step: 1 },
  ];
  if (subclasse === 'Artista') {
    fields.splice(1, 0, { key: 'armasSonoras', label: 'Armas Sonoras', step: 1 });
  }

  return (
    <div className="card">
      <div className="card-header"><span>♪</span><h3>Recursos do Bardo</h3></div>
      <div className="card-body">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
          {fields.map(field => (
            <div key={field.key} style={{ border: '1px solid var(--parch-300)', borderRadius: 'var(--radius-md)', padding: 12, background: 'rgba(253,246,227,0.45)' }}>
              <label>{field.label}</label>
              <input
                type="number"
                min={0}
                value={resources[field.key] || 0}
                onChange={e => setResource(field.key, e.target.value)}
                style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: 8 }}
              />
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => adjust(field.key, -field.step)}>-{field.step}</button>
                <button className="btn btn-secondary btn-sm" onClick={() => adjust(field.key, field.step)}>+{field.step}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HemomanteResources({ char, update }) {
  const resources = char.classResources?.hemomante || {};
  const setResource = (key, value) => update(`classResources.hemomante.${key}`, clampCounter(value));
  const adjust = (key, delta) => setResource(key, (resources[key] || 0) + delta);
  const maxReserva = Math.max(0, (Number(char.nivel) || 1) * 4);

  const aprimoramentosPorTurno = nivel => nivel >= 20 ? 4 : nivel >= 14 ? 3 : nivel >= 5 ? 2 : 1;
  const maxAprimoramentos = aprimoramentosPorTurno(Number(char.nivel) || 1);

  const fields = [{ key: 'reservaSangue', label: 'Reserva ML', step: 1, max: maxReserva }];

  return (
    <div className="card">
      <div className="card-header"><span>ML</span><h3>Recursos do Hemomante</h3></div>
      <div className="card-body">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
          {fields.map(field => {
            const value = resources[field.key] || 0;
            const nextValue = field.max ? Math.min(value, field.max) : value;
            return (
              <div key={field.key} style={{ border: '1px solid var(--parch-300)', borderRadius: 'var(--radius-md)', padding: 12, background: 'rgba(253,246,227,0.45)' }}>
                <label>{field.label}</label>
                <input
                  type="number"
                  min={0}
                  max={field.max}
                  value={nextValue}
                  onChange={e => setResource(field.key, field.max ? Math.min(field.max, clampCounter(e.target.value)) : e.target.value)}
                  style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: 8 }}
                />
                <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => adjust(field.key, -field.step)}>-{field.step}</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setResource(field.key, field.max ? Math.min(field.max, value + field.step) : value + field.step)}>+{field.step}</button>
                </div>
                {field.key === 'reservaSangue' && (
                  <div style={{ marginTop: 6, fontSize: '0.72rem', color: 'var(--ink-faded)', fontFamily: 'var(--font-heading)', textAlign: 'center' }}>
                    Máx {maxReserva} | Defesa +{Math.floor(nextValue / 2)} | Aprimoramentos: {resources.aprimoramentosUsadosTurno || 0}/{maxAprimoramentos} por turno
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


function AbilityRuntimePanel({ ability, char, onUse, onReset, onFeedback }) {
  const [target, setTarget] = useState('');
  const [useMlEnhancement, setUseMlEnhancement] = useState(false);
  const [damageVariantId, setDamageVariantId] = useState('');
  const spec = getAbilityRuntimeSpec(char.shikata, ability, char.nivel, char.subclasse);
  if (!spec.trackable) return null;

  const record = char.officialAbilityUsage?.[spec.key] || {};
  const availability = getAbilityAvailability(spec, record, char.abilityTimeline, {
    performance: char.classResources?.bardo?.performance || 0,
    ml: char.classResources?.hemomante?.reservaSangue || 0,
  });

  const hpCostLabel = formatHpCost(spec.hpCost);
  const damageBaseVariants = spec.damageSpec?.baseVariants || [];
  const selectedDamageVariantId = damageVariantId || damageBaseVariants[0]?.id || '';
  const hasRuntimeInfo = spec.maxUses != null || spec.cooldown || spec.lifetimeCap || spec.targetRule
    || hpCostLabel || spec.performanceCost > 0 || spec.optionalMlCost > 0 || spec.essenceCost;
  const normalizedTarget = target.trim().toLocaleLowerCase('pt-BR');
  const targetMissing = !!spec.targetRule && !target.trim();
  const targetAlreadyUsed = !!spec.targetRule && !!normalizedTarget && (record.targets || []).some(entry => entry.normalized === normalizedTarget);
  const enhancementLimit = Number(char.nivel) >= 20 ? 4 : Number(char.nivel) >= 14 ? 3 : Number(char.nivel) >= 5 ? 2 : 1;
  const enhancementsUsed = Math.max(0, Number(char.classResources?.hemomante?.aprimoramentosUsadosTurno) || 0);
  const canBypassUseLimitWithMl = useMlEnhancement && spec.mlAllowsExtraUse
    && (Number(char.classResources?.hemomante?.reservaSangue) || 0) >= spec.optionalMlCost
    && enhancementsUsed < enhancementLimit;
  const runtimeAvailable = availability.available
    || (availability.blockedByUses && canBypassUseLimitWithMl && !availability.blockedByLifetime && !availability.blockedByCooldown && !availability.blockedByPerformance);
  const canUse = runtimeAvailable && !targetMissing && !targetAlreadyUsed;
  const targetInputId = `target-${spec.key.replace(/[^a-zA-Z0-9_-]/g, '-')}`;

  const handleUse = () => {
    const result = onUse?.(ability, { target, useMlEnhancement, damageVariantId: selectedDamageVariantId });
    if (!result) return;
    onFeedback?.({ ok: result.ok, message: result.message, detail: result });
    if (result.ok && spec.targetRule) setTarget('');
    if (result.ok) setUseMlEnhancement(false);
  };

  const remainingText = spec.maxUses != null
    ? `${availability.remaining}/${spec.maxUses} restantes`
    : spec.cooldown
      ? availability.cooldownRemaining > 0
        ? `recarga: ${availability.cooldownRemaining} ${spec.cooldown.unit === 'day' ? 'dia(s)' : 'turno(s)'}`
        : 'pronta'
      : null;

  return (
    <div className={`ability-runtime ${!runtimeAvailable ? 'blocked' : ''}`}>
      <div className="ability-runtime-meta">
        {spec.usageLabel && <span className="ability-runtime-pill usage">{spec.usageLabel}</span>}
        {spec.damageSpec && (
          <span className="ability-runtime-pill ability-damage-pill">
            🎲 {damageBaseVariants.length > 1 ? `${damageBaseVariants.length} opções de dano` : spec.damageSpec.displayFormula}{spec.damageSpec.damageTypes?.length ? ` · ${spec.damageSpec.damageTypes.map(damageTypeLabel).join(' + ')}` : ''}
          </span>
        )}
        {remainingText && <span className={`ability-runtime-pill ${runtimeAvailable ? 'ready' : 'danger'}`}>{remainingText}</span>}
        {spec.lifetimeCap != null && <span className="ability-runtime-pill lifetime">Vida: {availability.lifetimeRemaining}/{spec.lifetimeCap}</span>}
        {hpCostLabel && <span className="ability-runtime-pill cost">Custo: {spec.lifeCostMultiplier < 1 ? `${hpCostLabel} × ${spec.lifeCostMultiplier}` : hpCostLabel}{spec.lifeCostDiscountLabel ? ` (${spec.lifeCostDiscountLabel})` : ''}</span>}
        {spec.performanceCost > 0 && <span className="ability-runtime-pill cost">-{spec.performanceCost} Performance</span>}
        {spec.optionalMlCost > 0 && <span className="ability-runtime-pill optional">Aprimoramento: {spec.optionalMlCost} ML</span>}
        {spec.essenceCost && <span className="ability-runtime-pill essence">Essência: {spec.essenceCost.amount} {spec.essenceCost.unit}</span>}
        <span className="ability-runtime-pill fatigue">+1 Cansaço</span>
      </div>

      {spec.targetRule && (
        <div className="ability-target-row">
          <label htmlFor={targetInputId}>Alvo ({spec.targetRule.label})</label>
          <input
            id={targetInputId}
            type="text"
            value={target}
            onChange={event => setTarget(event.target.value)}
            placeholder={`Nome/identificação do ${spec.targetRule.label}`}
          />
          {(record.targets || []).length > 0 && (
            <small className={targetAlreadyUsed ? 'target-used-warning' : ''}>Já usados: {(record.targets || []).map(entry => entry.label).join(', ')}</small>
          )}
        </div>
      )}

      {damageBaseVariants.length > 1 && (
        <div className="ability-target-row">
          <label>Dano a rolar</label>
          <select value={selectedDamageVariantId} onChange={event => setDamageVariantId(event.target.value)}>
            {damageBaseVariants.map(variant => (
              <option key={variant.id} value={variant.id}>{variant.label} — {variant.displayFormula}</option>
            ))}
          </select>
          <small>Escolha qual modo/impacto da habilidade está sendo aplicado nesta ativação.</small>
        </div>
      )}

      {spec.optionalMlCost > 0 && (
        <label className="ability-ml-toggle">
          <input
            type="checkbox"
            checked={useMlEnhancement}
            onChange={event => setUseMlEnhancement(event.target.checked)}
          />
          <span>Usar aprimoramento de {spec.optionalMlCost} ML nesta ativação ({enhancementsUsed}/{enhancementLimit} no turno){spec.mlAllowsExtraUse ? ' — pode liberar uso extra' : ''}</span>
        </label>
      )}

      <div className="ability-runtime-actions">
        <button type="button" className="btn btn-primary btn-sm" onClick={handleUse} disabled={!canUse}>
          ✦ Usar habilidade
        </button>
        {(record.used > 0 || (record.targets || []).length > 0 || record.lastUsedTurn || record.lastUsedDay) && (
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => onReset?.(spec.key, { resetLifetime: spec.lifetimeCap != null })} title="Corrigir o contador desta habilidade">
            ↺ Corrigir contador
          </button>
        )}
      </div>

      {targetAlreadyUsed && <div className="ability-runtime-warning">Este {spec.targetRule?.label} já recebeu esta habilidade dentro do limite registrado.</div>}
      {!runtimeAvailable && (
        <div className="ability-runtime-warning">
          {availability.blockedByLifetime && 'Limite de usos em vida atingido.'}
          {availability.blockedByUses && ` Sem usos restantes até ${spec.resetLabel || 'o próximo reset'}.`}
          {availability.blockedByCooldown && ` Recarga ativa por mais ${availability.cooldownRemaining} ${spec.cooldown?.unit === 'day' ? 'dia(s)' : 'turno(s)'}.`}
          {availability.blockedByPerformance && ` Performance insuficiente (${spec.performanceCost} necessária).`}
        </div>
      )}
      {!hasRuntimeInfo && <div className="ability-runtime-note">Sem limite explícito no texto atual: o botão registra a ativação e o Cansaço.</div>}
      {spec.essenceCost && <div className="ability-runtime-note">O custo de Essência é exibido, mas permanece manual até o subsistema de longevidade do Manipulador ser estruturado.</div>}
    </div>
  );
}

function AbilityTimelineControls({ char, onAdvance }) {
  const timeline = char.abilityTimeline || {};
  const [transitionScene, setTransitionScene] = useState(null);
  const controls = [
    { key: 'turn', label: 'Novo turno', icon: '↻', counter: 'turn' },
    { key: 'combat', label: 'Novo combate', icon: '⚔', counter: 'combat' },
    { key: 'day', label: 'Novo dia', icon: '☀', counter: 'day' },
    { key: 'week', label: 'Nova semana', icon: '7d', counter: 'week' },
    { key: 'month', label: 'Novo mês', icon: '☾', counter: 'month' },
  ];

  const handleAdvance = (control) => {
    const before = Math.max(1, Number(timeline[control.counter]) || 1);
    const after = before + 1;
    onAdvance?.(control.key);
    setTransitionScene({
      id: `${Date.now()}-${control.key}`,
      icon: control.icon,
      label: control.label.toUpperCase(),
      before,
      after,
      detail: control.key === 'combat' ? 'O turno foi reiniciado em 1.' : control.key === 'turn' ? 'Recargas por turno foram atualizadas.' : 'Recargas ligadas a este período foram atualizadas.',
    });
  };

  return (
    <>
    <div className="card ability-engine-card">
      <div className="card-header"><span>⏱</span><h3>Motor de Habilidades</h3></div>
      <div className="card-body">
        <div className="ability-timeline-stats">
          <span>Turno <strong>{timeline.turn || 1}</strong></span>
          <span>Combate <strong>{timeline.combat || 1}</strong></span>
          <span>Dia <strong>{timeline.day || 1}</strong></span>
          <span>Semana <strong>{timeline.week || 1}</strong></span>
          <span>Mês <strong>{timeline.month || 1}</strong></span>
        </div>
        <div className="ability-timeline-actions">
          {controls.map(control => (
            <button key={control.key} type="button" className="btn btn-secondary btn-sm" onClick={() => handleAdvance(control)}>
              <span>{control.icon}</span> {control.label}
            </button>
          ))}
        </div>
        <p className="ability-engine-help">
          A ficha controla usos por turno, combate, descanso, dia, semana e mês. "Novo combate" também reinicia o turno. Descansos curto/longo resetam automaticamente as habilidades correspondentes.
        </p>
      </div>
    </div>
    <PeriodTransitionOverlay scene={transitionScene} onDone={() => setTransitionScene(null)} />
    </>
  );
}

export default function TabHabilidades({ char, update, derived, useOfficialAbility, resetOfficialAbilityUse, advanceAbilityPeriod }) {
  const shikataData = SHIKATAS.find(s => s.id === char.shikata);
  const [runtimeFeedback, setRuntimeFeedback] = useState(null);
  const [damageRoll, setDamageRoll] = useState(null);
  const [abilityUseScene, setAbilityUseScene] = useState(null);

  const handleOfficialAbilityUse = (ability, options) => {
    const specBefore = getAbilityRuntimeSpec(char.shikata, ability, char.nivel, char.subclasse);
    const recordBefore = char.officialAbilityUsage?.[specBefore.key] || {};
    const availabilityBefore = getAbilityAvailability(specBefore, recordBefore, char.abilityTimeline, {
      performance: char.classResources?.bardo?.performance || 0,
      ml: char.classResources?.hemomante?.reservaSangue || 0,
    });

    const result = useOfficialAbility?.(ability, options);
    if (!result?.ok) return result;

    let rolledDamage = null;
    if (result.spec?.damageSpec) {
      try {
        rolledDamage = buildOfficialDamageRoll(ability, result.spec.damageSpec, derived, { variantId: options?.damageVariantId, useMlEnhancement: options?.useMlEnhancement, mlCost: result.mlCost });
        if (rolledDamage) update('diceHistory', pushDiceHistory(char.diceHistory, rolledDamage));
      } catch (error) {
        return { ...result, damageError: error.message || 'Não foi possível rolar o dano automaticamente.' };
      }
    }

    const remainingBefore = availabilityBefore.remaining;
    const remainingAfter = remainingBefore == null ? null : Math.max(0, remainingBefore - 1);
    const lifetimeBefore = availabilityBefore.lifetimeRemaining;
    const lifetimeAfter = lifetimeBefore == null ? null : Math.max(0, lifetimeBefore - 1);
    const extraUse = remainingBefore === 0 && !!options?.useMlEnhancement && !!result.spec?.mlAllowsExtraUse;

    setAbilityUseScene({
      id: `${Date.now()}-${result.spec?.key || ability.nome}`,
      name: ability.nome,
      before: remainingBefore,
      after: remainingAfter,
      maxUses: result.spec?.maxUses,
      resetLabel: result.spec?.resetLabel || null,
      cooldown: result.spec?.cooldown || null,
      extraUse,
      exhausted: remainingBefore != null && remainingBefore > 0 && remainingAfter === 0,
      lifetimeBefore,
      lifetimeAfter,
      lifetimeExhausted: lifetimeBefore != null && lifetimeBefore > 0 && lifetimeAfter === 0,
      damageRoll: rolledDamage,
    });

    return { ...result, damageRoll: rolledDamage };
  };

  const handleAbilityUseSceneDone = (scene) => {
    setAbilityUseScene(null);
    if (scene?.damageRoll) setDamageRoll(scene.damageRoll);
  };

  if (!shikataData) {
    return (
      <div className="card">
        <div className="card-body" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>⚔️</div>
          <h3 style={{ marginBottom: 8, color: 'var(--ink-light)' }}>Nenhuma Shikata Selecionada</h3>
          <p style={{ color: 'var(--ink-faded)', fontSize: '0.9rem' }}>Vá até a aba <strong>Identidade</strong> e selecione sua Shikata para ver as habilidades.</p>
        </div>
      </div>
    );
  }

  const nivel = char.nivel || 1;
  const subclasse = char.subclasse || '';
  const unlockedSkills = getHabilidadesPorNivel(char.shikata, nivel, subclasse);
  const lockedSkills = getHabilidadesFuturas(char.shikata, nivel, subclasse);
  const subclasseUnlocked = nivel >= (shikataData.subclasseNivel || 999);

  return (
    <div className="stack">
      <AbilityTimelineControls char={char} onAdvance={advanceAbilityPeriod} />
      {runtimeFeedback && (
        <div className={`ability-runtime-feedback ${runtimeFeedback.ok ? 'success' : 'error'}`}>
          <span>{runtimeFeedback.ok ? '✓' : '!'}</span>
          <div>
            <strong>{runtimeFeedback.ok ? 'Habilidade registrada' : 'Não foi possível usar'}</strong>
            <p>{runtimeFeedback.message}</p>
            {runtimeFeedback.ok && runtimeFeedback.detail?.hpCost > 0 && <small>Custo aplicado: {runtimeFeedback.detail.hpCost} HP.</small>}
            {runtimeFeedback.ok && runtimeFeedback.detail?.mlCost > 0 && <small>Aprimoramento aplicado: {runtimeFeedback.detail.mlCost} ML.</small>}
            {runtimeFeedback.ok && runtimeFeedback.detail?.performanceCost > 0 && <small>Performance consumida: {runtimeFeedback.detail.performanceCost}.</small>}
            {runtimeFeedback.ok && runtimeFeedback.detail?.damageRoll && <small>Dano rolado: {runtimeFeedback.detail.damageRoll.formula} = {runtimeFeedback.detail.damageRoll.total}.</small>}
            {runtimeFeedback.ok && runtimeFeedback.detail?.damageError && <small>{runtimeFeedback.detail.damageError}</small>}
          </div>
          <button type="button" onClick={() => setRuntimeFeedback(null)} aria-label="Fechar aviso">×</button>
        </div>
      )}
      {/* Class header */}
      <div className="card">
        <div className="card-header">
          <span>⚔️</span>
          <h3>{shikataData.name} — Nível {nivel}</h3>
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--ink-mid)', marginBottom: 10 }}>
            <span>🎲 Dado de vida pós nv.1: <strong>{shikataData.dadoVida}</strong></span>
            <span>📊 Mod. acerto: <strong>{shikataData.modificador}</strong></span>
            <span>⚡ Dificuldade: <strong>{shikataData.dificuldade}</strong></span>
            <span>💫 Poder: <strong>{shikataData.poder}</strong></span>
          </div>
          <p style={{ fontStyle: 'italic', color: 'var(--ink-mid)', fontSize: '0.88rem', lineHeight: 1.55 }}>{shikataData.desc}</p>

          {/* Subclasse */}
          {shikataData.subclasses.length > 0 && (
            <div style={{ marginTop: 14, padding: '10px 14px', background: subclasseUnlocked ? 'rgba(212,160,23,0.08)' : 'transparent', border: `1px solid ${subclasseUnlocked ? 'var(--gold-dark)' : 'var(--parch-300)'}`, borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', color: subclasseUnlocked ? 'var(--gold-dark)' : 'var(--ink-faded)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                {subclasseUnlocked ? '✦ Subclasse Desbloqueada' : `🔒 Subclasse disponível no nível ${shikataData.subclasseNivel}`}
              </div>
              {subclasseUnlocked && char.subclasse ? (
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--ink-dark)' }}>{char.subclasse}</div>
              ) : subclasseUnlocked ? (
                <div style={{ fontSize: '0.82rem', color: 'var(--ink-faded)' }}>Subclasse não selecionada. Vá em Identidade.</div>
              ) : (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {shikataData.subclasses.map(sc => (
                    <span key={sc} className="badge" style={{ opacity: 0.5, borderColor: 'var(--parch-400)', color: 'var(--ink-faded)' }}>{sc}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {char.shikata === 'bardo' && <BardoResources char={char} update={update} />}
      {char.shikata === 'hemomante' && <HemomanteResources char={char} update={update} />}

      {/* Unlocked abilities - grouped by level */}
      <div className="card">
        <div className="card-header">
          <span>✦</span>
          <h3>Habilidades Desbloqueadas ({unlockedSkills.length})</h3>
        </div>
        <div className="card-body">
          {unlockedSkills.length === 0 ? (
            <p style={{ color: 'var(--ink-faded)', fontSize: '0.85rem', fontStyle: 'italic' }}>Nenhuma habilidade desbloqueada ainda.</p>
          ) : (
            (() => {
              // Agrupa por nível
              const byLevel = {};
              unlockedSkills.forEach(h => {
                if (!byLevel[h.nivel]) byLevel[h.nivel] = [];
                byLevel[h.nivel].push(h);
              });
              return Object.keys(byLevel).sort((a,b) => Number(a)-Number(b)).map(lvl => (
                <div key={lvl} style={{ marginBottom: 16 }}>
                  {/* Separador de nível */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8,
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-heading)', fontSize: '0.72rem', fontWeight: 600,
                      color: 'var(--parch-100)', background: Number(lvl) === nivel ? 'var(--gold-dark)' : 'var(--ink-dark)',
                      padding: '3px 10px', borderRadius: 4, letterSpacing: '0.08em',
                      whiteSpace: 'nowrap', flexShrink: 0,
                    }}>
                      Nível {lvl}
                      {Number(lvl) === nivel && <span style={{ marginLeft: 6, fontSize: '0.6rem', opacity: 0.85 }}>← atual</span>}
                    </div>
                    <div style={{ flex: 1, height: 1, background: 'var(--parch-300)' }} />
                  </div>
                  {byLevel[lvl].map((h, idx) => (
                    <div key={idx} className="habilidade-row unlocked" style={{ marginLeft: 8 }}>
                      <div style={{display:'flex',gap:6,alignItems:'center',marginBottom:4,flexWrap:'wrap'}}>
                        {h.tipo && <span style={{fontSize:'0.6rem',fontFamily:'var(--font-heading)',textTransform:'uppercase',letterSpacing:'0.06em',padding:'1px 6px',borderRadius:3,background:h.tipo==='passiva'?'#e8f5e9':h.tipo==='reacao'?'#fce4ec':h.tipo==='bonus'?'#e3f2fd':'#f3e5f5',color:h.tipo==='passiva'?'#2e7d32':h.tipo==='reacao'?'#c62828':h.tipo==='bonus'?'#1565c0':'#6a1b9a'}}>{h.tipo}</span>}
                        {h.usos && <span style={{fontSize:'0.65rem',fontFamily:'var(--font-heading)',color:'var(--ink-faded)'}}>{h.usos}</span>}
                        {h.subclasse && <span style={{fontSize:'0.6rem',fontFamily:'var(--font-heading)',color:'var(--gold-dark)',background:'rgba(212,160,23,0.08)',padding:'1px 6px',borderRadius:3,border:'1px solid var(--gold-dark)'}}>{h.subclasse}</span>}
                      </div>
                      <div className="habilidade-nome">{h.nome}</div>
                      <div className="habilidade-desc">{h.desc}</div>
                      <EvolucaoTable shikataId={char.shikata} nome={h.nome} nivelAtual={nivel} />
                      <AbilityRuntimePanel
                        ability={h}
                        char={char}
                        onUse={handleOfficialAbilityUse}
                        onReset={resetOfficialAbilityUse}
                        onFeedback={setRuntimeFeedback}
                      />
                    </div>
                  ))}
                </div>
              ));
            })()
          )}
        </div>
      </div>

      {/* Locked abilities - grouped by level */}
      {lockedSkills.length > 0 && (
        <div className="card">
          <div className="card-header">
            <span>🔒</span>
            <h3>Habilidades Futuras</h3>
          </div>
          <div className="card-body">
            {(() => {
              const byLevel = {};
              lockedSkills.forEach(h => {
                if (!byLevel[h.nivel]) byLevel[h.nivel] = [];
                byLevel[h.nivel].push(h);
              });
              return Object.keys(byLevel).sort((a,b) => Number(a)-Number(b)).map(lvl => (
                <div key={lvl} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{
                      fontFamily: 'var(--font-heading)', fontSize: '0.72rem', fontWeight: 600,
                      color: 'var(--ink-faded)', background: 'var(--parch-200)',
                      padding: '3px 10px', borderRadius: 4, letterSpacing: '0.08em',
                      border: '1px solid var(--parch-400)', whiteSpace: 'nowrap', flexShrink: 0,
                    }}>
                      Nível {lvl}
                    </div>
                    <div style={{ flex: 1, height: 1, background: 'var(--parch-300)' }} />
                  </div>
                  {byLevel[lvl].map((h, idx) => (
                    <div key={idx} className="habilidade-row locked" style={{ marginLeft: 8 }}>
                      <div style={{display:'flex',gap:6,alignItems:'center',marginBottom:4,flexWrap:'wrap'}}>
                        {h.tipo && <span style={{fontSize:'0.6rem',fontFamily:'var(--font-heading)',textTransform:'uppercase',letterSpacing:'0.06em',padding:'1px 6px',borderRadius:3,background:'var(--parch-200)',color:'var(--ink-faded)'}}>{h.tipo}</span>}
                        {h.subclasse && <span style={{fontSize:'0.6rem',fontFamily:'var(--font-heading)',color:'var(--ink-faded)',padding:'1px 6px',borderRadius:3,border:'1px solid var(--parch-400)'}}>{h.subclasse}</span>}
                      </div>
                      <div className="habilidade-nome">{h.nome}</div>
                      <div className="habilidade-desc">{h.desc}</div>
                      <EvolucaoTable shikataId={char.shikata} nome={h.nome} nivelAtual={nivel} />
                    </div>
                  ))}
                </div>
              ));
            })()}
          </div>
        </div>
      )}

      {/* Evolução */}
      <div className="card">
        <div className="card-header"><span>📈</span><h3>Progressão</h3></div>
        <div className="card-body">
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {Array.from({ length: Math.max(20, nivel) }, (_, i) => i + 1).map(n => {
              const allSkills = SHIKATAS_HABILIDADES[char.shikata] || [];
              const hasSkill = allSkills.some(h => h.nivel === n);
              const isSubclass = n === shikataData.subclasseNivel;
              return (
                <div key={n} style={{
                  width: 32, height: 32, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-heading)', fontSize: '0.65rem', fontWeight: 600,
                  background: n <= nivel ? (isSubclass ? 'var(--gold-dark)' : hasSkill ? 'var(--ink-dark)' : 'var(--parch-400)') : 'transparent',
                  color: n <= nivel ? 'var(--parch-100)' : 'var(--parch-400)',
                  border: `1px solid ${n <= nivel ? 'transparent' : 'var(--parch-400)'}`,
                  cursor: 'default',
                  position: 'relative',
                }}>
                  {n}
                  {isSubclass && n <= nivel && <div style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, background: 'var(--gold-bright)', borderRadius: '50%' }} />}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 10, fontSize: '0.72rem', color: 'var(--ink-faded)', fontFamily: 'var(--font-heading)', display: 'flex', gap: 16 }}>
            <span><span style={{ display: 'inline-block', width: 12, height: 12, background: 'var(--ink-dark)', borderRadius: 2, verticalAlign: 'middle', marginRight: 4 }} />Habilidade nova</span>
            <span><span style={{ display: 'inline-block', width: 12, height: 12, background: 'var(--gold-dark)', borderRadius: 2, verticalAlign: 'middle', marginRight: 4 }} />Subclasse</span>
            <span><span style={{ display: 'inline-block', width: 12, height: 12, background: 'var(--parch-400)', borderRadius: 2, verticalAlign: 'middle', marginRight: 4 }} />Nível normal</span>
          </div>

          <div style={{ marginTop: 16, padding: '10px 14px', background: 'rgba(253,246,227,0.5)', borderRadius: 'var(--radius-md)', border: '1px solid var(--parch-300)' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Regras de Evolução</div>
            <ul style={{ paddingLeft: 16, fontSize: '0.82rem', color: 'var(--ink-mid)', lineHeight: 1.7, listStyle: 'disc' }}>
              <li>Cada shikata recebe <strong>2 pontos de atributo</strong> por nível</li>
              <li>Ao evoluir: use o <strong>dado de vida pós nv.1</strong> indicado pela shikata</li>
              <li>Multiclasse: proficiente no novo atributo, mas não soma modificadores</li>
              <li>Só pode evoluir <strong>1 nível de shikata por vez</strong></li>
            </ul>
          </div>
        </div>
      </div>
      <AbilityUseOverlay scene={abilityUseScene} onDone={handleAbilityUseSceneDone} />
      <DiceStage3D result={damageRoll} showDock={false} />
    </div>
  );
}
