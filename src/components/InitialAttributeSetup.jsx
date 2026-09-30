import { useMemo, useState } from 'react';
import { ATTRIBUTES } from '../data/system';
import TalosIcon from './TalosIcon';

const FIXED_INITIAL_VALUES = [6, 5, 4, 4, 4, 3, 2, 2];

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function rollInitialAttribute(index) {
  const rolls = Array.from({ length: 3 }, () => rollDie(4));
  const kept = [...rolls].sort((a, b) => a - b).slice(0, 2);
  return {
    id: `roll-${index}`,
    rolls,
    kept,
    value: kept.reduce((sum, value) => sum + value, 0),
  };
}

function fixedTokens() {
  return FIXED_INITIAL_VALUES.map((value, index) => ({ id: `fixed-${index}`, value }));
}

export default function InitialAttributeSetup({ char, finalizeInitialAttributes }) {
  const [method, setMethod] = useState('');
  const [rolls, setRolls] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [message, setMessage] = useState('');

  const tokens = useMemo(() => {
    if (method === 'fixed') return fixedTokens();
    if (method === 'dice') return rolls;
    return [];
  }, [method, rolls]);

  const assignedTokenIds = useMemo(() => new Set(Object.values(assignments).filter(Boolean)), [assignments]);
  const assignedCount = assignedTokenIds.size;
  const readyToConfirm = tokens.length === 8 && assignedCount === 8;

  const chooseMethod = nextMethod => {
    setMethod(nextMethod);
    setAssignments({});
    setRolls([]);
    setMessage('');
  };

  const rollAll = () => {
    const nextRolls = Array.from({ length: 8 }, (_, index) => rollInitialAttribute(index));
    setRolls(nextRolls);
    setAssignments({});
    setMessage('');
  };

  const assignToken = (attrKey, tokenId) => {
    setAssignments(current => {
      const next = { ...current };
      if (!tokenId) {
        delete next[attrKey];
        return next;
      }

      for (const [key, value] of Object.entries(next)) {
        if (value === tokenId && key !== attrKey) delete next[key];
      }
      next[attrKey] = tokenId;
      return next;
    });
    setMessage('');
  };

  const confirmDistribution = () => {
    if (!readyToConfirm) {
      setMessage('Distribua os 8 valores antes de confirmar. Um atributo deve permanecer em 0.');
      return;
    }

    const tokenMap = new Map(tokens.map(token => [token.id, token]));
    const attrs = Object.fromEntries(ATTRIBUTES.map(attribute => [attribute.key, 0]));
    for (const [attrKey, tokenId] of Object.entries(assignments)) {
      const token = tokenMap.get(tokenId);
      if (token) attrs[attrKey] = token.value;
    }

    const result = finalizeInitialAttributes?.({
      method,
      attrs,
      values: tokens.map(token => token.value),
      rolls: method === 'dice'
        ? rolls.map(({ rolls: dice, kept, value }) => ({ rolls: dice, kept, value }))
        : [],
    });

    setMessage(result?.ok === false ? result.message : 'Atributos iniciais confirmados. A progressão para o nível 2 está liberada.');
  };

  if (char.initialAttributeSetup?.completed) return null;

  return (
    <div className="card initial-attributes-card">
      <div className="card-header">
        <TalosIcon name="attributes" size={18} />
        <h3>Atributos Iniciais</h3>
        <span className="initial-attributes-required">OBRIGATÓRIO NO NÍVEL 1</span>
      </div>
      <div className="card-body">
        <p className="initial-attributes-intro">
          Antes da primeira evolução, escolha como os atributos-base serão criados. Os <strong>8 valores</strong> devem ser distribuídos livremente entre os <strong>9 atributos</strong>; o atributo que não receber valor permanece em <strong>0</strong>.
        </p>

        <div className="initial-attribute-methods">
          <button type="button" className={`btn ${method === 'fixed' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => chooseMethod('fixed')}>
            Distribuição fixa
          </button>
          <button type="button" className={`btn ${method === 'dice' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => chooseMethod('dice')}>
            <TalosIcon name="dice" size={15} /> Distribuição por dados
          </button>
        </div>

        {method === 'fixed' && (
          <div className="initial-values-panel">
            <div className="initial-values-heading">
              <strong>Valores disponíveis</strong>
              <span>6, 5, 4, 4, 4, 3, 2 e 2</span>
            </div>
          </div>
        )}

        {method === 'dice' && (
          <div className="initial-values-panel">
            <div className="initial-values-heading">
              <strong>3d4 · soma dos 2 menores · 8 vezes</strong>
              <button type="button" className="btn btn-primary btn-sm" onClick={rollAll}>
                <TalosIcon name="dice" size={14} /> {rolls.length ? 'Rolar novamente' : 'Rolar os 8 resultados'}
              </button>
            </div>
            {rolls.length > 0 && (
              <div className="initial-roll-results">
                {rolls.map((roll, index) => (
                  <div key={roll.id}>
                    <span>#{index + 1}</span>
                    <strong>{roll.value}</strong>
                    <small>[{roll.rolls.join(', ')}] → {roll.kept.join(' + ')}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tokens.length > 0 && (
          <>
            <div className="initial-values-pool" aria-label="Valores ainda disponíveis">
              {tokens.map(token => (
                <span key={token.id} className={assignedTokenIds.has(token.id) ? 'used' : ''}>{token.value}</span>
              ))}
            </div>

            <div className="initial-attribute-grid">
              {ATTRIBUTES.map(attribute => {
                const currentTokenId = assignments[attribute.key] || '';
                return (
                  <label className="initial-attribute-row" key={attribute.key}>
                    <span><b>{attribute.abbr}</b> {attribute.label}</span>
                    <select value={currentTokenId} onChange={event => assignToken(attribute.key, event.target.value)}>
                      <option value="">0 · sem valor</option>
                      {tokens.map(token => {
                        const unavailable = assignedTokenIds.has(token.id) && token.id !== currentTokenId;
                        return <option key={token.id} value={token.id} disabled={unavailable}>{token.value}</option>;
                      })}
                    </select>
                  </label>
                );
              })}
            </div>

            <div className="initial-attributes-footer">
              <span>{assignedCount}/8 valores distribuídos</span>
              <button type="button" className="btn btn-primary" disabled={!readyToConfirm} onClick={confirmDistribution}>
                Confirmar atributos iniciais
              </button>
            </div>
          </>
        )}

        {message && <div className="initial-attributes-message">{message}</div>}
      </div>
    </div>
  );
}
