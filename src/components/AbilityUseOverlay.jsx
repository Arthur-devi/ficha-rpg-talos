import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

function unitLabel(unit, count) {
  if (unit === 'day') return count === 1 ? 'DIA' : 'DIAS';
  return count === 1 ? 'TURNO' : 'TURNOS';
}

export default function AbilityUseOverlay({ scene, onDone }) {
  const [revealed, setRevealed] = useState(false);
  const [closing, setClosing] = useState(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);

  useEffect(() => {
    if (!scene) return undefined;
    setRevealed(false);
    setClosing(false);

    const revealTimer = window.setTimeout(() => setRevealed(true), 620);
    const holdMs = scene.exhausted || scene.lifetimeExhausted ? 2350 : 1850;
    const closeTimer = window.setTimeout(() => setClosing(true), holdMs);
    const doneTimer = window.setTimeout(() => onDoneRef.current?.(scene), holdMs + 400);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(closeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [scene?.id]);

  useEffect(() => {
    if (!scene || typeof document === 'undefined') return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [scene?.id]);

  if (!scene || typeof document === 'undefined') return null;

  const hasCharges = Number.isFinite(scene.before) && Number.isFinite(scene.after) && Number.isFinite(scene.maxUses);
  const exhausted = !!(scene.exhausted || scene.lifetimeExhausted);
  const canRenderPips = hasCharges && scene.maxUses > 0 && scene.maxUses <= 12;

  return createPortal(
    <div className={`ability-use-overlay ${revealed ? 'revealed' : ''} ${closing ? 'closing' : ''} ${exhausted ? 'exhausted' : ''}`} role="status" aria-live="assertive">
      <div className="ability-use-vignette" />
      <div className="ability-use-flare" />
      <div className="ability-use-content">
        <span className="ability-use-symbol">✦</span>
        <small>HABILIDADE UTILIZADA</small>
        <strong>{scene.name}</strong>

        {scene.extraUse ? (
          <div className="ability-use-unlimited">USO EXTRA LIBERADO POR ML</div>
        ) : hasCharges ? (
          <>
            <div className="ability-use-caption">USOS DISPONÍVEIS</div>
            <div className="ability-use-counter" aria-label={`${scene.before} de ${scene.maxUses} para ${scene.after} de ${scene.maxUses}`}>
              <span className="ability-use-count before">{scene.before}<i>/{scene.maxUses}</i></span>
              <b>→</b>
              <span className={`ability-use-count after ${revealed ? 'visible' : ''} ${scene.after === 0 ? 'zero' : ''}`}>{scene.after}<i>/{scene.maxUses}</i></span>
            </div>
            {canRenderPips && (
              <div className="ability-use-pips" aria-hidden="true">
                {Array.from({ length: scene.maxUses }, (_, index) => {
                  const activeBefore = index < scene.before;
                  const activeAfter = index < scene.after;
                  const spentNow = activeBefore && !activeAfter;
                  const active = revealed ? activeAfter : activeBefore;
                  return <i key={index} className={`${active ? 'active' : ''} ${revealed && spentNow ? 'spent-now' : ''}`} />;
                })}
              </div>
            )}
          </>
        ) : scene.cooldown ? (
          <div className="ability-use-cooldown">
            <span>RECARGA INICIADA</span>
            <strong>{scene.cooldown.every} {unitLabel(scene.cooldown.unit, scene.cooldown.every)}</strong>
          </div>
        ) : (
          <div className="ability-use-unlimited">USO REGISTRADO</div>
        )}

        {scene.lifetimeBefore != null && (
          <div className={`ability-use-lifetime ${scene.lifetimeExhausted ? 'danger' : ''}`}>
            LIMITE EM VIDA: {scene.lifetimeBefore} → {scene.lifetimeAfter}
          </div>
        )}

        {scene.actionType && (
          <div className={`ability-use-action ${scene.actionAfter === 0 && (scene.actionType === 'full' || scene.actionType === 'bonus') ? 'depleted' : ''}`}>
            <span>ECONOMIA DO TURNO</span>
            {(scene.actionType === 'full' || scene.actionType === 'bonus') ? (
              <strong>{scene.actionLabel?.toUpperCase() || 'AÇÃO'}: {scene.actionBefore} → {scene.actionAfter}</strong>
            ) : scene.actionType === 'reaction' ? (
              <strong>REAÇÃO REGISTRADA</strong>
            ) : (
              <strong>SEM CONSUMO DE AÇÃO</strong>
            )}
            {scene.actionEffect && (
              <em>+{scene.actionEffect.amount} {scene.actionEffect.type === 'bonus' ? 'AÇÃO BÔNUS' : 'AÇÃO COMPLETA'} · {scene.actionEffect.remainingTurns} TURNO(S)</em>
            )}
          </div>
        )}

        {revealed && exhausted && (
          <div className="ability-use-exhausted">
            <span>!</span>
            <strong>{scene.lifetimeExhausted ? 'LIMITE EM VIDA ESGOTADO' : 'USOS ESGOTADOS'}</strong>
            <small>{scene.resetLabel ? `RECUPERA EM: ${scene.resetLabel.toUpperCase()}` : 'SEM RECARGA AUTOMÁTICA'}</small>
          </div>
        )}

        <em>+1 Cansaço registrado</em>
      </div>
    </div>,
    document.body,
  );
}
