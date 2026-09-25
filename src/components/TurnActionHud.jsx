import { useState } from 'react';

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

export default function TurnActionHud({ char, derived, spendTurnAction, adjustTurnActions }) {
  const [showAdjust, setShowAdjust] = useState(false);
  const economy = derived?.turnEconomy;
  if (!economy || !char?.abilityTimeline?.combatActive) return null;

  const effects = economy.temporaryEffects || [];
  const reactions = economy.reactionUses || [];
  const timeline = char?.abilityTimeline || {};

  return (
    <div className="turn-action-hud" role="status" aria-live="polite">
      <div className="turn-action-title">
        <small>COMBATE {timeline.combat || 1}</small>
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
        <button type="button" disabled={economy.fullRemaining < 1} onClick={() => spendTurnAction?.('full', 1, 'Correr / Fugir')}>🏃 Correr/Fugir</button>
        <button type="button" disabled={economy.bonusRemaining < 1} onClick={() => spendTurnAction?.('bonus', 1, 'Andar / Falar')}>🚶 Andar/Falar</button>
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
  );
}
