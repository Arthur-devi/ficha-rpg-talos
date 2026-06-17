import { useState } from 'react';

const QUICK_ROLLS = ['1d4', '1d6', '1d8', '1d10', '1d12', '1d20', '1d100', '2d6', '2d8', '2d10'];

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function assertRollBounds(count, sides) {
  if (!Number.isInteger(count) || !Number.isInteger(sides) || count < 1 || sides < 2) {
    throw new Error('Formula invalida.');
  }

  if (count > 100 || sides > 1000) {
    throw new Error('Limite maximo: 100 dados, d1000.');
  }
}

function formatPart(part, index) {
  const prefix = part.sign < 0 ? '-' : index === 0 ? '' : '+';
  if (part.type === 'flat') return `${prefix}${part.value}`;

  const rolls = part.rolls.join(', ');
  return `${prefix}${part.count}d${part.sides} [${rolls}]`;
}

function rollFormula(rawFormula) {
  const clean = rawFormula.replace(/\s+/g, '').toLowerCase();
  if (!clean) throw new Error('Digite uma formula.');

  const tokens = clean.match(/[+-]?[^+-]+/g);
  if (!tokens || tokens.join('') !== clean) throw new Error('Formula invalida.');

  const parts = tokens.map(token => {
    const sign = token.startsWith('-') ? -1 : 1;
    const body = token.replace(/^[+-]/, '');

    if (body.includes('d')) {
      const split = body.split('d');
      if (split.length !== 2) throw new Error('Formula invalida.');

      const count = split[0] ? Number(split[0]) : 1;
      const sides = Number(split[1]);
      assertRollBounds(count, sides);

      const rolls = Array.from({ length: count }, () => rollDie(sides));
      const subtotal = rolls.reduce((sum, roll) => sum + roll, 0) * sign;
      return { type: 'dice', sign, count, sides, rolls, subtotal };
    }

    const value = Number(body);
    if (!Number.isInteger(value)) throw new Error('Formula invalida.');
    return { type: 'flat', sign, value, subtotal: value * sign };
  });

  return {
    label: rawFormula,
    total: parts.reduce((sum, part) => sum + part.subtotal, 0),
    parts,
  };
}

function rollTalosAttribute() {
  const rolls = Array.from({ length: 3 }, () => rollDie(4));
  const kept = [...rolls].sort((a, b) => a - b).slice(0, 2);
  return {
    label: 'Atributo TALOS',
    total: kept.reduce((sum, roll) => sum + roll, 0),
    parts: [{
      type: 'attribute',
      rolls,
      kept,
      subtotal: kept.reduce((sum, roll) => sum + roll, 0),
    }],
  };
}

function makeEntry(result) {
  return {
    ...result,
    id: `${Date.now()}-${Math.random()}`,
    time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  };
}

export default function TabDados() {
  const [formula, setFormula] = useState('1d20');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  const commitRoll = (nextResult) => {
    const entry = makeEntry(nextResult);
    setResult(entry);
    setHistory(prev => [entry, ...prev].slice(0, 10));
    setError('');
  };

  const handleRoll = (nextFormula = formula) => {
    try {
      const rolled = rollFormula(nextFormula);
      setFormula(nextFormula);
      commitRoll(rolled);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTalosAttribute = () => {
    commitRoll(rollTalosAttribute());
  };

  return (
    <div className="stack">
      <div className="card">
        <div className="card-header"><span>D20</span><h3>Dados</h3></div>
        <div className="card-body">
          <div className="grid2" style={{ alignItems: 'end' }}>
            <div className="field">
              <label>Formula</label>
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

          {error && (
            <div style={{ marginTop: 12, color: '#b91c1c', fontFamily: 'var(--font-heading)', fontSize: '0.82rem' }}>
              {error}
            </div>
          )}

          {result && (
            <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'minmax(120px, 180px) 1fr', gap: 16, alignItems: 'stretch' }}>
              <div style={{ border: '1px solid var(--gold-dark)', background: 'rgba(212,160,23,0.08)', borderRadius: 'var(--radius-md)', padding: 16, textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.68rem', color: 'var(--gold-dark)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{result.label}</div>
                <div className="big-num" style={{ fontSize: '3rem', marginTop: 4 }}>{result.total}</div>
              </div>
              <div style={{ border: '1px solid var(--parch-300)', borderRadius: 'var(--radius-md)', padding: 14, background: 'rgba(253,246,227,0.45)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.68rem', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Detalhe</div>
                {result.parts.map((part, index) => (
                  part.type === 'attribute' ? (
                    <div key={index} style={{ fontSize: '0.9rem', color: 'var(--ink-mid)', lineHeight: 1.6 }}>
                      3d4 [{part.rolls.join(', ')}] | usados: {part.kept.join(' + ')} = {part.subtotal}
                    </div>
                  ) : (
                    <div key={index} style={{ fontSize: '0.9rem', color: 'var(--ink-mid)', lineHeight: 1.6 }}>
                      {formatPart(part, index)} = {part.subtotal}
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {history.length > 0 && (
        <div className="card">
          <div className="card-header"><span>#</span><h3>Rolagens Recentes</h3></div>
          <div className="card-body">
            <div style={{ display: 'grid', gap: 8 }}>
              {history.map(entry => (
                <div key={entry.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 64px', gap: 10, alignItems: 'center', padding: '8px 10px', border: '1px solid var(--parch-300)', borderRadius: 'var(--radius-sm)', background: 'rgba(253,246,227,0.35)' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink-faded)', fontSize: '0.75rem' }}>{entry.time}</span>
                  <span style={{ color: 'var(--ink-mid)' }}>{entry.label}</span>
                  <strong style={{ fontFamily: 'var(--font-heading)', textAlign: 'right', color: 'var(--ink-dark)' }}>{entry.total}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
