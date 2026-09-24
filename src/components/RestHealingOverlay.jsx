import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export default function RestHealingOverlay({ scene, onDone }) {
  const [healedShown, setHealedShown] = useState(0);
  const [phase, setPhase] = useState('enter');
  const exitTimerRef = useRef(0);

  const finishScene = useCallback((smooth = true) => {
    window.clearTimeout(exitTimerRef.current);
    const reducedMotion = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!smooth || reducedMotion) {
      onDone?.();
      return;
    }
    setPhase('exiting');
    exitTimerRef.current = window.setTimeout(() => onDone?.(), 700);
  }, [onDone]);

  useEffect(() => {
    if (!scene) return undefined;

    const recovered = Math.max(0, Number(scene.recovered) || 0);
    const reducedMotion = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    setPhase(recovered > 0 ? 'counting' : 'settled');
    setHealedShown(recovered > 0 ? 1 : 0);

    if (reducedMotion) {
      setHealedShown(recovered);
      const timeout = window.setTimeout(() => onDone?.(), recovered > 0 ? 2050 : 2250);
      return () => window.clearTimeout(timeout);
    }

    if (recovered <= 0) {
      const settleTimeout = window.setTimeout(() => setPhase('exiting'), 1550);
      const closeTimeout = window.setTimeout(() => onDone?.(), 2250);
      return () => {
        window.clearTimeout(settleTimeout);
        window.clearTimeout(closeTimeout);
      };
    }

    const duration = clamp(900 + recovered * 24, 1050, 2800);
    let animationFrame = 0;
    let settleTimeout = 0;
    let closeTimeout = 0;
    const startedAt = performance.now();

    const tick = (now) => {
      const progress = clamp((now - startedAt) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = clamp(Math.max(1, Math.ceil(eased * recovered)), 1, recovered);
      setHealedShown(nextValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      } else {
        setPhase('settled');
        // Lote 4: permanece 1 segundo a mais na tela e então desaparece suavemente.
        settleTimeout = window.setTimeout(() => setPhase('exiting'), 1250);
        closeTimeout = window.setTimeout(() => onDone?.(), 1950);
      }
    };

    animationFrame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(settleTimeout);
      window.clearTimeout(closeTimeout);
    };
  }, [scene, onDone]);

  useEffect(() => () => window.clearTimeout(exitTimerRef.current), []);

  useEffect(() => {
    if (!scene) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') finishScene(true);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scene, finishScene]);

  if (!scene || typeof document === 'undefined') return null;

  const isLong = scene.type === 'long';
  const currentDisplayedHp = Math.min(scene.endHp, scene.startHp + healedShown);

  return createPortal(
    <div className={`rest-cinematic-overlay ${phase}`} role="dialog" aria-modal="true" aria-label={isLong ? 'Descanso longo concluído' : 'Descanso curto concluído'}>
      <div className="rest-cinematic-vignette" />
      <div className="rest-cinematic-stars" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => <i key={index} style={{ '--rest-star': index }} />)}
      </div>

      <div className="rest-cinematic-content">
        <div className="rest-cinematic-symbol" aria-hidden="true">{isLong ? '☾' : '☀'}</div>
        <div className="rest-cinematic-kicker">{isLong ? 'DESCANSO LONGO' : 'DESCANSO CURTO'}</div>
        <h2>{isLong ? 'O corpo desperta restaurado' : 'As feridas começam a fechar'}</h2>

        <div className="rest-heal-equation" aria-live="polite">
          <span className="rest-hp-start">{scene.startHp}</span>
          <span className="rest-heal-plus">+{healedShown}</span>
          <span className="rest-heal-equals">=</span>
          <strong>{currentDisplayedHp}</strong>
        </div>

        <div className="rest-heal-bar" aria-hidden="true">
          <span style={{ width: `${scene.hpMax > 0 ? (currentDisplayedHp / scene.hpMax) * 100 : 0}%` }} />
        </div>

        <div className="rest-cinematic-meta">
          {scene.recovered > 0
            ? <span>Vida recuperada: <strong>+{scene.recovered} HP</strong></span>
            : <span>A vida já estava completa.</span>}
          {scene.fatigueRecovered > 0 && <span>Cansaço recuperado: <strong>{scene.fatigueRecovered}</strong></span>}
          <span>HP {scene.endHp}/{scene.hpMax}</span>
        </div>

        {(phase === 'settled' || phase === 'exiting') && scene.recovered > 0 && (
          <div className="rest-cinematic-complete">VIDA RESTAURADA</div>
        )}

        <button type="button" className="rest-cinematic-skip" onClick={() => finishScene(true)}>Pular</button>
      </div>
    </div>,
    document.body,
  );
}
