import { useMemo, useState } from 'react';
import { SHIKATAS, SHIKATAS_HABILIDADES, getHabilidadesPorNivel, getHabilidadesFuturas } from '../data/system';
import { getEvolucao } from '../data/evolucoes';
import { formatHpCost, getAbilityAvailability, getAbilityGroupSpec, getAbilityProgressionLevel, getAbilityRuntimeSpec } from '../data/abilityRuntime';
import { buildOfficialDamageRoll, damageTypeLabel } from '../data/damageRuntime';
import { pushDiceHistory } from '../data/diceRuntime';
import { canSpendAction } from '../data/turnRuntime';
import { applyElementalOriginToDamageRoll } from '../data/originRuntime';
import DiceStage3D from './DiceStage3D';
import AbilityUseOverlay from './AbilityUseOverlay';
import { getShikataLevel, getShikataSubclass } from '../data/multiclassRuntime';
import TalosIcon from './TalosIcon';
import InfoTip from './InfoTip';

function clampCounter(value) {
  return Math.max(0, Number(value) || 0);
}


function groupAbilitiesByLevel(skills) {
  const grouped = new Map();
  for (const ability of skills) {
    const level = Number(ability.nivel) || 0;
    if (!grouped.has(level)) grouped.set(level, []);
    grouped.get(level).push(ability);
  }
  return [...grouped.entries()].sort((a, b) => a[0] - b[0]);
}

function EvolucaoTable({ shikataId, nome, nivelAtual }) {
  const rows = getEvolucao(shikataId, nome);
  if (!rows || rows.length === 0) return null;
  const unlockedRows = rows.filter(row => row.nivel <= nivelAtual);
  const currentLevel = unlockedRows.length ? Math.max(...unlockedRows.map(row => row.nivel)) : null;

  return (
    <div className="ability-evolution-block">
      <div className="ability-evolution-title">
        <TalosIcon name="progress" size={14} />
        <span>Evolução da habilidade</span>
      </div>
      <table className="ability-evolution-table">
        <thead>
          <tr>
            <th>Nível</th>
            <th>Efeito</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const unlocked = row.nivel <= nivelAtual;
            const isCurrent = row.nivel === currentLevel;
            return (
              <tr key={index} className={`${unlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''}`}>
                <td>
                  {isCurrent && <span className="ability-evolution-current-mark" aria-hidden="true" />}
                  Nv. {row.nivel}
                </td>
                <td>{row.desc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}


function AbilityDescription({ ability }) {
  const description = ability?.desc || '';
  const isLong = description.length > 230;
  if (!description) return null;
  return (
    <div className={`ability-description-row ${isLong ? 'compact' : ''}`}>
      <p className="habilidade-desc">{description}</p>
      {isLong && (
        <InfoTip title={ability.nome} align="end" label={`Ver regra completa de ${ability.nome}`}>
          {description}
        </InfoTip>
      )}
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
    <div className="card class-resource-sheet">
      <div className="card-header class-resource-header">
        <TalosIcon name="powers" size={18} />
        <div><h3>Recursos do Bardo</h3><small>Performance e progressão de concerto</small></div>
        <InfoTip title="Recursos do Bardo" align="end" label="Sobre os recursos do Bardo">
          Estes contadores acompanham os recursos especiais da Shikata. Os ajustes permanecem manuais para registrar o estado real da sessão sem inventar regras além do TALOS.
        </InfoTip>
      </div>
      <div className="card-body class-resource-body">
        <div className="class-resource-grid">
          {fields.map(field => (
            <div key={field.key} className="class-resource-counter">
              <span>{field.label}</span>
              <input
                type="number"
                min={0}
                value={resources[field.key] || 0}
                onChange={e => setResource(field.key, e.target.value)}
              />
              <div className="class-resource-actions">
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
  const hemomanteLevel = Math.max(1, getShikataLevel(char, 'hemomante') || 1);
  const maxReserva = Math.max(0, hemomanteLevel * 4);

  const aprimoramentosPorTurno = nivel => nivel >= 20 ? 4 : nivel >= 14 ? 3 : nivel >= 5 ? 2 : 1;
  const maxAprimoramentos = aprimoramentosPorTurno(hemomanteLevel);
  const reserva = Math.min(maxReserva, resources.reservaSangue || 0);

  return (
    <div className="card class-resource-sheet">
      <div className="card-header class-resource-header">
        <TalosIcon name="vitality" size={18} />
        <div><h3>Recursos do Hemomante</h3><small>Reserva de sangue e aprimoramentos</small></div>
        <InfoTip title="Reserva ML" align="end" label="Sobre a Reserva ML">
          Máximo atual: {maxReserva} ML ({hemomanteLevel} nível(is) × 4). A reserva concede Defesa igual à metade do valor atual. Limite de aprimoramentos neste turno: {maxAprimoramentos}.
        </InfoTip>
      </div>
      <div className="card-body class-resource-body">
        <div className="class-resource-grid compact">
          <div className="class-resource-counter featured">
            <span>Reserva ML</span>
            <input
              type="number"
              min={0}
              max={maxReserva}
              value={reserva}
              onChange={e => setResource('reservaSangue', Math.min(maxReserva, clampCounter(e.target.value)))}
            />
            <div className="class-resource-actions">
              <button className="btn btn-secondary btn-sm" onClick={() => adjust('reservaSangue', -1)}>-1</button>
              <button className="btn btn-secondary btn-sm" onClick={() => setResource('reservaSangue', Math.min(maxReserva, reserva + 1))}>+1</button>
            </div>
          </div>
          <div className="class-resource-facts">
            <span><small>MÁXIMO</small><strong>{maxReserva}</strong></span>
            <span><small>DEFESA</small><strong className="semantic-positive">+{Math.floor(reserva / 2)}</strong></span>
            <span><small>APRIMORAMENTOS</small><strong>{resources.aprimoramentosUsadosTurno || 0}/{maxAprimoramentos}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BruxoResources({ char, update }) {
  const defaults = { IGNITE: 1, ARXIS: 1, BREN: 1, ECRYPT: 1 };
  const resources = char.classResources?.bruxo || {};
  const mutationLevel = Math.max(1, Number(resources.mutacaoNivel) || 1);
  const mutationXp = Math.max(0, Number(resources.mutacaoXp) || 0);
  const signalLevels = { ...defaults, ...(resources.signalLevels || {}) };
  const spentUpgrades = Object.values(signalLevels).reduce((sum, value) => sum + Math.max(0, Math.min(6, Number(value) || 1) - 1), 0);
  const availableUpgrades = Math.max(0, mutationLevel - 1 - spentUpgrades);

  const setMutationLevel = value => {
    const minimum = spentUpgrades + 1;
    update('classResources.bruxo.mutacaoNivel', Math.max(minimum, Number(value) || 1));
  };
  const adjustSignal = (name, delta) => {
    const current = Math.max(1, Math.min(6, Number(signalLevels[name]) || 1));
    if (delta > 0 && (current >= 6 || availableUpgrades <= 0)) return;
    const next = Math.max(1, Math.min(6, current + delta));
    update(`classResources.bruxo.signalLevels.${name}`, next);
  };

  return (
    <div className="card class-resource-sheet">
      <div className="card-header class-resource-header">
        <TalosIcon name="sparkle" size={18} />
        <div><h3>Mutação & Sinais do Bruxo</h3><small>Evolução independente dos quatro Sinais</small></div>
        <InfoTip title="Mutação" align="end" label="Sobre Mutação e Sinais">
          Os níveis 2–6 de IGNITE, ARXIS, BREN e ECRYPT são níveis do próprio Sinal obtidos por MUTAÇÃO, e não o nível da Shikata. Cada nível de Mutação permite evoluir 1 Sinal.
        </InfoTip>
      </div>
      <div className="card-body class-resource-body">
        <div className="bruxo-mutation-summary grimoire-resource-summary">
          <div>
            <span>Nível de Mutação</span>
            <strong>{mutationLevel}</strong>
            <div className="bruxo-mutation-actions">
              <button type="button" className="btn btn-secondary btn-sm" disabled={mutationLevel <= spentUpgrades + 1} onClick={() => setMutationLevel(mutationLevel - 1)}>−</button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setMutationLevel(mutationLevel + 1)}>+ Subir Mutação</button>
            </div>
          </div>
          <div>
            <span>XP de Mutação</span>
            <input type="number" min="0" value={mutationXp} onChange={event => update('classResources.bruxo.mutacaoXp', Math.max(0, Number(event.target.value) || 0))} />
          </div>
          <div>
            <span>Evoluções disponíveis</span>
            <strong className={availableUpgrades > 0 ? 'semantic-positive' : ''}>{availableUpgrades}</strong>
            <small>Cada nível de Mutação permite evoluir 1 Sinal.</small>
          </div>
        </div>
        <div className="bruxo-signal-grid grimoire-signal-grid">
          {Object.keys(defaults).map(name => {
            const level = Math.max(1, Math.min(6, Number(signalLevels[name]) || 1));
            return (
              <div key={name} className="bruxo-signal-card">
                <span>{name}</span>
                <strong>NÍVEL {level}/6</strong>
                <div>
                  <button type="button" className="btn btn-secondary btn-sm" disabled={level <= 1} onClick={() => adjustSignal(name, -1)}>−</button>
                  <button type="button" className="btn btn-secondary btn-sm" disabled={level >= 6 || availableUpgrades <= 0} onClick={() => adjustSignal(name, 1)}>+</button>
                </div>
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
  const [actionMode, setActionMode] = useState('');
  const progressionLevel = getAbilityProgressionLevel(char, ability);
  const spec = getAbilityRuntimeSpec(char.shikata, ability, progressionLevel, char.subclasse);
  if (!spec.trackable) return null;

  const actionOptions = spec.actionSpec?.options || [{ type: 'full', cost: 1, label: 'Ação completa' }];
  const selectedAction = actionOptions.find(option => option.type === actionMode)
    || actionOptions.find(option => option.type === spec.actionSpec?.defaultMode)
    || actionOptions[0];
  const actionAvailability = canSpendAction(char, selectedAction);
  const record = char.officialAbilityUsage?.[spec.key] || {};
  const availability = getAbilityAvailability(spec, record, char.abilityTimeline, {
    performance: char.classResources?.bardo?.performance || 0,
    ml: char.classResources?.hemomante?.reservaSangue || 0,
  });
  const groupSpec = getAbilityGroupSpec(char, ability);
  const groupRecord = groupSpec ? (char.officialAbilityUsage?.[groupSpec.key] || {}) : null;
  const groupUsed = Math.max(0, Number(groupRecord?.used) || 0);
  const groupRemaining = groupSpec ? Math.max(0, groupSpec.maxUses - groupUsed) : null;
  const groupAvailable = !groupSpec || groupRemaining > 0;

  const hpCostLabel = formatHpCost(spec.hpCost);
  const damageBaseVariants = spec.damageSpec?.baseVariants || [];
  const selectedDamageVariantId = damageVariantId || damageBaseVariants[0]?.id || '';
  const hasRuntimeInfo = spec.maxUses != null || spec.cooldown || spec.lifetimeCap || spec.targetRule
    || hpCostLabel || spec.performanceCost > 0 || spec.optionalMlCost > 0 || spec.essenceCost;
  const normalizedTarget = target.trim().toLocaleLowerCase('pt-BR');
  const targetMissing = !!spec.targetRule && !target.trim();
  const targetAlreadyUsed = !!spec.targetRule && !!normalizedTarget && (record.targets || []).some(entry => entry.normalized === normalizedTarget);
  const currentShikataLevel = Math.max(1, getShikataLevel(char, char.shikata) || 1);
  const enhancementLimit = currentShikataLevel >= 20 ? 4 : currentShikataLevel >= 14 ? 3 : currentShikataLevel >= 5 ? 2 : 1;
  const enhancementsUsed = Math.max(0, Number(char.classResources?.hemomante?.aprimoramentosUsadosTurno) || 0);
  const canBypassUseLimitWithMl = useMlEnhancement && spec.mlAllowsExtraUse
    && (Number(char.classResources?.hemomante?.reservaSangue) || 0) >= spec.optionalMlCost
    && enhancementsUsed < enhancementLimit;
  const runtimeAvailable = availability.available
    || (availability.blockedByUses && canBypassUseLimitWithMl && !availability.blockedByLifetime && !availability.blockedByCooldown && !availability.blockedByPerformance);
  const canUse = runtimeAvailable && groupAvailable && !targetMissing && !targetAlreadyUsed && actionAvailability.ok;
  const targetInputId = `target-${spec.key.replace(/[^a-zA-Z0-9_-]/g, '-')}`;

  const handleUse = () => {
    const result = onUse?.(ability, { target, useMlEnhancement, damageVariantId: selectedDamageVariantId, actionMode: selectedAction.type });
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
            <TalosIcon name="dice" size={13} /> {damageBaseVariants.length > 1 ? `${damageBaseVariants.length} opções de dano` : spec.damageSpec.displayFormula}{spec.damageSpec.damageTypes?.length ? ` · ${spec.damageSpec.damageTypes.map(damageTypeLabel).join(' + ')}` : ''}
          </span>
        )}
        {remainingText && <span className={`ability-runtime-pill ${runtimeAvailable ? 'ready' : 'danger'}`}>{remainingText}</span>}
        {groupSpec && <span className={`ability-runtime-pill ${groupAvailable ? 'ready' : 'danger'}`}>Sinais no turno: {groupRemaining}/{groupSpec.maxUses}</span>}
        {spec.lifetimeCap != null && <span className="ability-runtime-pill lifetime">Vida: {availability.lifetimeRemaining}/{spec.lifetimeCap}</span>}
        {hpCostLabel && <span className="ability-runtime-pill cost">Custo: {spec.lifeCostMultiplier < 1 ? `${hpCostLabel} × ${spec.lifeCostMultiplier}` : hpCostLabel}{spec.lifeCostDiscountLabel ? ` (${spec.lifeCostDiscountLabel})` : ''}</span>}
        {spec.performanceCost > 0 && <span className="ability-runtime-pill cost">-{spec.performanceCost} Performance</span>}
        {spec.optionalMlCost > 0 && <span className="ability-runtime-pill optional">Aprimoramento: {spec.optionalMlCost} ML</span>}
        {spec.essenceCost && <span className="ability-runtime-pill essence">Essência: {spec.essenceCost.amount} {spec.essenceCost.unit}</span>}
        <span className={`ability-runtime-pill action ${!actionAvailability.ok ? 'danger' : ''}`}><TalosIcon name="clock" size={12} /> {char.abilityTimeline?.combatActive ? selectedAction.label : 'FORA DE COMBATE · AÇÃO LIVRE'}</span>
        <span className={`ability-runtime-pill ${canUse ? 'fatigue' : 'ready'}`}>{canUse ? '+1 Cansaço' : 'Bloqueada: nenhum custo'}</span>
      </div>

      {actionOptions.length > 1 && (
        <div className="ability-target-row">
          <label>Forma de uso no turno</label>
          <select value={selectedAction.type} onChange={event => setActionMode(event.target.value)}>
            {actionOptions.map(option => (
              <option key={`${option.type}-${option.cost}`} value={option.type}>{option.label}</option>
            ))}
          </select>
          <small>Algumas habilidades evoluem para permitir ação bônus ou reação. Escolha a forma usada nesta ativação.</small>
        </div>
      )}

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
          <TalosIcon name="abilities" size={14} /> Usar habilidade
        </button>
        {(record.used > 0 || (record.targets || []).length > 0 || record.lastUsedTurn || record.lastUsedDay) && (
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => onReset?.(spec.key, { resetLifetime: spec.lifetimeCap != null })} title="Corrigir o contador desta habilidade">
            <TalosIcon name="reset" size={14} /> Corrigir contador
          </button>
        )}
      </div>

      {targetAlreadyUsed && <div className="ability-runtime-warning">Este {spec.targetRule?.label} já recebeu esta habilidade dentro do limite registrado.</div>}
      {!actionAvailability.ok && <div className="ability-runtime-warning">{actionAvailability.message}</div>}
      {!groupAvailable && <div className="ability-runtime-warning">Limite compartilhado de Sinais atingido neste turno. Avance para o próximo turno para liberar novamente.</div>}
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

export default function TabHabilidades({ char, update, derived, useOfficialAbility: executeOfficialAbility, resetOfficialAbilityUse }) {
  const shikataData = SHIKATAS.find(s => s.id === char.shikata);
  const [runtimeFeedback, setRuntimeFeedback] = useState(null);
  const [damageRoll, setDamageRoll] = useState(null);
  const [abilityUseScene, setAbilityUseScene] = useState(null);
  const [showFutureAbilities, setShowFutureAbilities] = useState(false);

  const handleOfficialAbilityUse = (ability, options) => {
    const progressionLevel = getAbilityProgressionLevel(char, ability);
    const specBefore = getAbilityRuntimeSpec(char.shikata, ability, progressionLevel, char.subclasse);
    const recordBefore = char.officialAbilityUsage?.[specBefore.key] || {};
    const availabilityBefore = getAbilityAvailability(specBefore, recordBefore, char.abilityTimeline, {
      performance: char.classResources?.bardo?.performance || 0,
      ml: char.classResources?.hemomante?.reservaSangue || 0,
    });

    const result = executeOfficialAbility?.(ability, options);
    if (!result?.ok) return result;

    let rolledDamage = null;
    if (result.spec?.damageSpec) {
      try {
        rolledDamage = buildOfficialDamageRoll(ability, result.spec.damageSpec, derived, { variantId: options?.damageVariantId, useMlEnhancement: options?.useMlEnhancement, mlCost: result.mlCost });
        rolledDamage = applyElementalOriginToDamageRoll(rolledDamage, char, derived);
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
      actionType: result.actionConsumed ? (result.action?.type || null) : 'free',
      actionLabel: result.actionConsumed ? (result.action?.label || null) : 'Fora de combate',
      actionCost: result.actionConsumed ? (Number(result.action?.cost) || 0) : 0,
      actionBefore: result.actionConsumed && result.action?.type === 'full' ? result.actionBefore?.fullRemaining : result.actionConsumed && result.action?.type === 'bonus' ? result.actionBefore?.bonusRemaining : null,
      actionAfter: result.actionConsumed && result.action?.type === 'full' ? Math.max(0, (result.actionBefore?.fullRemaining || 0) - (Number(result.action?.cost) || 0)) : result.actionConsumed && result.action?.type === 'bonus' ? Math.max(0, (result.actionBefore?.bonusRemaining || 0) - (Number(result.action?.cost) || 0)) : null,
      actionEffect: result.actionConsumed ? (result.actionEffect || null) : null,
    });

    return { ...result, damageRoll: rolledDamage };
  };

  const handleAbilityUseSceneDone = (scene) => {
    setAbilityUseScene(null);
    if (scene?.damageRoll) setDamageRoll(scene.damageRoll);
  };

  const nivel = Math.max(1, getShikataLevel(char, char.shikata) || 1);
  const subclasse = getShikataSubclass(char, char.shikata);
  const unlockedSkills = useMemo(
    () => getHabilidadesPorNivel(char.shikata, nivel, subclasse),
    [char.shikata, nivel, subclasse],
  );
  const lockedSkills = useMemo(
    () => getHabilidadesFuturas(char.shikata, nivel, subclasse),
    [char.shikata, nivel, subclasse],
  );
  const unlockedByLevel = useMemo(() => groupAbilitiesByLevel(unlockedSkills), [unlockedSkills]);
  const lockedByLevel = useMemo(() => groupAbilitiesByLevel(lockedSkills), [lockedSkills]);
  const abilityLevels = useMemo(
    () => new Set((SHIKATAS_HABILIDADES[char.shikata] || []).map(ability => Number(ability.nivel) || 0)),
    [char.shikata],
  );

  if (!shikataData) {
    return (
      <div className="stack">
        <div className="card">
          <div className="card-body ability-empty-state">
            <TalosIcon name="abilities" size={38} />
            <h3>Nenhuma Shikata Selecionada</h3>
            <p>Vá até <strong>Personagem</strong> e selecione uma Shikata para carregar o grimório de habilidades da classe.</p>
          </div>
        </div>
      </div>
    );
  }

  const subclasseUnlocked = nivel >= (shikataData.subclasseNivel || 999);

  return (
    <div className="stack abilities-page-stack">
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
      <div className="card shikata-grimoire-card">
        <div className="card-header shikata-grimoire-header">
          <TalosIcon name="abilities" size={18} />
          <div className="shikata-grimoire-title">
            <h3>{shikataData.name}</h3>
            <small>Nível {nivel} · {(SHIKATAS_HABILIDADES[char.shikata] || []).length} entradas oficiais</small>
          </div>
          <InfoTip title={shikataData.name} align="end" label={`Sobre a Shikata ${shikataData.name}`}>
            {shikataData.desc} Fonte canônica: TALOS v6, com progressões sincronizadas do DOCX.{shikataData.itensIniciais ? ` Itens iniciais: ${shikataData.itensIniciais}` : ''}
          </InfoTip>
        </div>
        <div className="card-body shikata-grimoire-body">
          <div className="shikata-facts-grid">
            <span><TalosIcon name="dice" size={14} /><small>VIDA PÓS NV.1</small><strong>{shikataData.dadoVida}</strong></span>
            <span><TalosIcon name="chart" size={14} /><small>MOD. ACERTO</small><strong>{shikataData.modificador}</strong></span>
            <span><TalosIcon name="engine" size={14} /><small>DIFICULDADE</small><strong>{shikataData.dificuldade}</strong></span>
            <span><TalosIcon name="sparkle" size={14} /><small>PODER</small><strong>{shikataData.poder}</strong></span>
          </div>

          {shikataData.subclasses.length > 0 && (
            <div className={`shikata-subclass-strip ${subclasseUnlocked ? 'unlocked' : 'locked'}`}>
              <div>
                <small>{subclasseUnlocked ? 'SUBCLASSE' : `SUBCLASSE NO NÍVEL ${shikataData.subclasseNivel}`}</small>
                <strong>{subclasseUnlocked ? (subclasse || 'Não selecionada') : 'Ainda bloqueada'}</strong>
              </div>
              {!subclasseUnlocked && (
                <InfoTip title="Subclasses futuras" align="end" label="Ver subclasses disponíveis">
                  {shikataData.subclasses.join(' · ')}
                </InfoTip>
              )}
            </div>
          )}
        </div>
      </div>

      {char.shikata === 'bardo' && <BardoResources char={char} update={update} />}
      {char.shikata === 'hemomante' && <HemomanteResources char={char} update={update} />}
      {char.shikata === 'bruxo' && <BruxoResources char={char} update={update} />}

      {/* Unlocked abilities - grouped by level */}
      <div className="card abilities-section-card">
        <div className="card-header abilities-section-header">
          <TalosIcon name="abilities" size={18} />
          <h3>Habilidades Desbloqueadas ({unlockedSkills.length})</h3>
        </div>
        <div className="card-body abilities-list-body">
          {unlockedSkills.length === 0 ? (
            <p className="abilities-empty-copy">Nenhuma habilidade desbloqueada ainda.</p>
          ) : (
            unlockedByLevel.map(([lvl, abilities]) => {
              const isCurrentLevel = lvl === nivel;
              return (
                <section key={lvl} className={`ability-level-group ${isCurrentLevel ? 'current' : ''}`}>
                  <div className="ability-level-heading">
                    <div>
                      <span className="ability-level-number">Nível {lvl}</span>
                      {isCurrentLevel && <small>Nível atual</small>}
                    </div>
                    <span className="ability-level-count">{abilities.length} {abilities.length === 1 ? 'entrada' : 'entradas'}</span>
                  </div>
                  <div className="ability-level-list">
                    {abilities.map(ability => (
                      <article key={`${ability.nivel}-${ability.nome}-${ability.subclasse || 'base'}`} className={`habilidade-row unlocked ability-kind-${ability.tipo || 'ativa'}`}>
                        <div className="ability-entry-meta">
                          {ability.tipo && <span className={`ability-type-badge ${ability.tipo}`}>{ability.tipo}</span>}
                          {ability.usos && <span className="ability-uses-badge">{ability.usos}</span>}
                          {ability.subclasse && <span className="ability-subclass-badge">{ability.subclasse}</span>}
                        </div>
                        <h4 className="habilidade-nome">{ability.nome}</h4>
                        <AbilityDescription ability={ability} />
                        <EvolucaoTable shikataId={char.shikata} nome={ability.nome} nivelAtual={getAbilityProgressionLevel(char, ability)} />
                        <AbilityRuntimePanel
                          ability={ability}
                          char={char}
                          onUse={handleOfficialAbilityUse}
                          onReset={resetOfficialAbilityUse}
                          onFeedback={setRuntimeFeedback}
                        />
                      </article>
                    ))}
                  </div>
                </section>
              );
            })
          )}
        </div>
      </div>

      {/* Future abilities stay available, but remain unmounted until requested to keep the grimoire responsive. */}
      {lockedSkills.length > 0 && (
        <div className="card abilities-section-card abilities-future-card">
          <div className="card-header abilities-section-header">
            <TalosIcon name="lock" size={18} />
            <h3>Habilidades Futuras</h3>
            <span className="ability-future-count">{lockedSkills.length}</span>
          </div>
          <div className="card-body abilities-list-body">
            {!showFutureAbilities ? (
              <div className="ability-future-summary">
                <div>
                  <strong>{lockedSkills.length} habilidades ainda bloqueadas</strong>
                  <span>O conteúdo futuro fica recolhido para manter a página leve. Nenhuma regra ou progressão foi removida.</span>
                </div>
                <button type="button" className="btn btn-secondary" onClick={() => setShowFutureAbilities(true)}>
                  <TalosIcon name="book" size={15} /> Consultar habilidades futuras
                </button>
              </div>
            ) : (
              <>
                <div className="ability-future-toolbar">
                  <span>Exibindo {lockedSkills.length} entradas futuras.</span>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowFutureAbilities(false)}>
                    Recolher futuras
                  </button>
                </div>
                {lockedByLevel.map(([lvl, abilities]) => (
                  <section key={lvl} className="ability-level-group future">
                    <div className="ability-level-heading">
                      <div><span className="ability-level-number">Nível {lvl}</span></div>
                      <span className="ability-level-count">{abilities.length} {abilities.length === 1 ? 'entrada' : 'entradas'}</span>
                    </div>
                    <div className="ability-level-list">
                      {abilities.map(ability => (
                        <article key={`${ability.nivel}-${ability.nome}-${ability.subclasse || 'base'}`} className={`habilidade-row locked ability-kind-${ability.tipo || 'ativa'}`}>
                          <div className="ability-entry-meta">
                            {ability.tipo && <span className={`ability-type-badge ${ability.tipo}`}>{ability.tipo}</span>}
                            {ability.subclasse && <span className="ability-subclass-badge">{ability.subclasse}</span>}
                          </div>
                          <h4 className="habilidade-nome">{ability.nome}</h4>
                          <AbilityDescription ability={ability} />
                          <EvolucaoTable shikataId={char.shikata} nome={ability.nome} nivelAtual={getAbilityProgressionLevel(char, ability)} />
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </>
            )}
          </div>
        </div>
      )}

      {/* Evolução */}
      <div className="card ability-progression-card">
        <div className="card-header abilities-section-header">
          <TalosIcon name="progress" size={18} />
          <h3>Progressão</h3>
          <InfoTip title="Regras de evolução" align="end" label="Sobre a progressão da Shikata">
            Cada Shikata recebe 2 pontos de atributo por nível. Ao evoluir, use o dado de vida pós nível 1 indicado pela Shikata. Em multiclasse os modificadores não são somados entre si e apenas 1 nível de Shikata evolui por vez.
          </InfoTip>
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {Array.from({ length: Math.max(20, nivel) }, (_, i) => i + 1).map(n => {
              const hasSkill = abilityLevels.has(n);
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
        </div>
      </div>
      <AbilityUseOverlay scene={abilityUseScene} onDone={handleAbilityUseSceneDone} />
      <DiceStage3D result={damageRoll} showDock={false} />
    </div>
  );
}
