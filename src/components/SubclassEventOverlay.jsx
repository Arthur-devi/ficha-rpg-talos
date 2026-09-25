import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { SHIKATAS, SHIKATAS_HABILIDADES } from '../data/system';

export default function SubclassEventOverlay({ event, onChoose, onDismiss }) {
  const [selected, setSelected] = useState('');
  const shikata = SHIKATAS.find(item => item.id === event?.shikataId);

  useEffect(() => {
    if (!event?.shikataId) return undefined;
    setSelected('');
    if (typeof document === 'undefined') return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [event?.shikataId, event?.createdAt]);

  const options = useMemo(() => {
    if (!shikata) return [];
    return (shikata.subclasses || []).map(name => {
      const preview = (SHIKATAS_HABILIDADES[shikata.id] || [])
        .filter(ability => ability.subclasse === name)
        .slice(0, 3)
        .map(ability => ({ nivel: ability.nivel, nome: ability.nome }));
      return { name, preview };
    });
  }, [shikata]);

  if (!event || !shikata || typeof document === 'undefined') return null;

  const confirm = () => {
    if (!selected) return;
    onChoose?.(event.shikataId, selected);
  };

  return createPortal(
    <div className="subclass-event-overlay" role="dialog" aria-modal="true" aria-label="Escolha de subclasse">
      <div className="subclass-event-vignette" />
      <div className="subclass-event-content">
        <div className="subclass-event-kicker">EVENTO DE EVOLUÇÃO</div>
        <div className="subclass-event-level">NÍVEL {event.level}</div>
        <h2>ESCOLHA SUA SUBCLASSE</h2>
        <p>{shikata.name} atingiu o ponto de especialização. Escolha um caminho agora ou deixe para selecionar depois no menu normal da Shikata.</p>

        <div className="subclass-event-grid">
          {options.map(option => (
            <button
              key={option.name}
              type="button"
              className={`subclass-event-option ${selected === option.name ? 'selected' : ''}`}
              onClick={() => setSelected(option.name)}
            >
              <span className="subclass-event-option-mark">{selected === option.name ? '✦' : '◇'}</span>
              <strong>{option.name}</strong>
              {option.preview.length > 0 && (
                <ul>
                  {option.preview.map(item => <li key={`${item.nivel}-${item.nome}`}>Nv. {item.nivel} — {item.nome}</li>)}
                </ul>
              )}
            </button>
          ))}
        </div>

        <div className="subclass-event-actions">
          <button type="button" className="btn btn-secondary" onClick={onDismiss}>Escolher depois</button>
          <button type="button" className="btn btn-primary" disabled={!selected} onClick={confirm}>Confirmar caminho</button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
