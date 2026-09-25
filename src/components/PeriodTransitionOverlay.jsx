import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import TalosIcon from './TalosIcon';

const HOLD_MS = 780;
const FADE_MS = 420;

export default function PeriodTransitionOverlay({ scene, onDone }) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!scene?.id) return undefined;
    setClosing(false);
    const hold = window.setTimeout(() => setClosing(true), HOLD_MS);
    const done = window.setTimeout(() => onDone?.(), HOLD_MS + FADE_MS);
    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(done);
    };
  }, [scene?.id, onDone]);

  if (!scene) return null;

  return createPortal(
    <div className={`period-transition-overlay ${closing ? 'closing' : ''}`} aria-live="polite" aria-label={scene.label}>
      <div className="period-transition-vignette" />
      <div className="period-transition-content">
        <span className="period-transition-icon">{scene.iconName ? <TalosIcon name={scene.iconName} size={50} strokeWidth={1.35} /> : scene.icon}</span>
        <small>{scene.kicker || 'TEMPO AVANÇOU'}</small>
        <strong>{scene.label}</strong>
        <div className="period-transition-counter">
          <span>{scene.before}</span>
          <i>→</i>
          <span>{scene.after}</span>
        </div>
        {scene.detail && <em>{scene.detail}</em>}
      </div>
    </div>,
    document.body,
  );
}
