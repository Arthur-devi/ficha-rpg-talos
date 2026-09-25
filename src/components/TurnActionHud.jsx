import { useState } from 'react';
import TalosIcon from './TalosIcon';
import PeriodTransitionOverlay from './PeriodTransitionOverlay';

function ActionPips({ total, remaining, type }) {
  const count = Math.max(0, Math.min(8, Number(total) || 0));
  if (count <= 0) return <span className="turn-action-empty">0</span>;
  return (
    <span className={`turn-action-pips ${type}`} aria-label={`${remaining} de ${total} disponíveis`}>
      {Array.from({ length: count }, (_, index) => (
        <i key={index} className={index < remaining ? 'available' : 'spent'} />
      ))}
      {total > 8 && <b>+{total - 8}</b>}
    </span>
  );
}

export default function TurnActionHud({ char, derived, spendTurnAction, adjustTurnActions, advanceAbilityPeriod, endCombat }) {
  const [showAdjust, setShowAdjust] = useState(false);
  const [transitionScene, setTransitionScene] = useState(null);
  const economy = derived?.turnEconomy;
  if (!economy || !char?.abilityTimeline?.combatActive) return null;

  const effects = economy.temporaryEffects || [];
  const reactions = economy.reactionUses || [];
  const timeline = char?.abilityTimeline || {};

  const showTransition = scene => setTransitionScene({ id: `${Date.now()}-${scene.label}`, ...scene });

  const handleNewTurn = () => {
    const before = Math.max(1, Number(timeline.turn) || 1);
    const result = advanceAbilityPeriod?.('turn');
    if (result && result.ok === false) return;
    showTransition({
      iconName: 'progress',
      kicker: `COMBATE ${timeline.combat || 1}`,
      label: 'NOVO TURNO',
      before,
      after: before + 1,
      detail: 'Ações, recargas por turno e efeitos temporários foram atualizados.',
    });
  };

  const handleEndCombat = () => {
    endCombat?.();
  };

  return (
    <>
      <div className="turn-action-hud" role="status" aria-live="polite">
        <div className="turn-combat-toolbar">
          <div className="turn-combat-status">
            <TalosIcon name="combat" size={18} />
            <div>
              <small>COMBATE {timeline.combat || 1}</small>
              <strong>Turno {timeline.turn || 1}</strong>
            </div>
          </div>
          <div className="turn-combat-controls">
            <button type="button" className="primary" onClick={handleNewTurn}>
              <TalosIcon name="progress" size={14} /> Novo turno
            </button>
            <button type="button" className="danger" onClick={handleEndCombat}>
              <TalosIcon name="combat" size={14} /> Encerrar
            </button>
          </div>
        </div>

        <div className="turn-action-title">
          <small>TURNO</small>
          <strong>T{timeline.turn || 1}</strong>
        </div>

        <div className={`turn-action-block ${economy.fullRemaining <= 0 ? 'depleted' : ''}`}>
          <div>
            <small>AÇÕES COMPLETAS</small>
            <strong>{economy.fullRemaining}/{economy.fullTotal}</strong>
          </div>
          <ActionPips total={economy.fullTotal} remaining={economy.fullRemaining} type="full" />
        </div>

        <div className={`turn-action-block bonus ${economy.bonusRemaining <= 0 ? 'depleted' : ''}`}>
          <div>
            <small>AÇÕES BÔNUS</small>
            <strong>{economy.bonusRemaining}/{economy.bonusTotal}</strong>
          </div>
          <ActionPips total={economy.bonusTotal} remaining={economy.bonusRemaining} type="bonus" />
        </div>

        <div className="turn-action-reaction">
          <small>REAÇÃO</small>
          <strong>CONTEXTUAL</strong>
          <span>{reactions.length ? `${reactions.length} registrada(s)` : 'sem limite global definido'}</span>
        </div>

        <div className="turn-action-quick">
          <button type="button" disabled={economy.fullRemaining < 1} onClick={() => spendTurnAction?.('full', 1, 'Correr / Fugir')}><TalosIcon name="run" size={14} /> Correr/Fugir</button>
          <button type="button" disabled={economy.bonusRemaining < 1} onClick={() => spendTurnAction?.('bonus', 1, 'Andar / Falar')}><TalosIcon name="walk" size={14} /> Andar/Falar</button>
        </div>

        {effects.length > 0 && (
          <div className="turn-action-effects">
            {effects.map(effect => (
              <span key={effect.id}>+{effect.amount} {effect.type === 'bonus' ? 'bônus' : 'completa'} · {effect.source} · {effect.remainingTurns}t</span>
            ))}
          </div>
        )}

        <button type="button" className="turn-action-adjust-toggle" onClick={() => setShowAdjust(value => !value)} aria-expanded={showAdjust}>
          {showAdjust ? 'Fechar ajuste' : 'Ajustar turno'}
        </button>

        {showAdjust && (
          <div className="turn-action-adjust-panel">
            <span>Ajuste manual válido só neste turno:</span>
            <div>
              <button type="button" disabled={economy.fullTotal <= 0} onClick={() => adjustTurnActions?.('full', -1)}>-1 completa</button>
              <button type="button" onClick={() => adjustTurnActions?.('full', 1)}>+1 completa</button>
              <button type="button" disabled={economy.bonusTotal <= 0} onClick={() => adjustTurnActions?.('bonus', -1)}>-1 bônus</button>
              <button type="button" onClick={() => adjustTurnActions?.('bonus', 1)}>+1 bônus</button>
            </div>
          </div>
        )}
      </div>
      <PeriodTransitionOverlay scene={transitionScene} onDone={() => setTransitionScene(null)} />
    </>
  );
}
