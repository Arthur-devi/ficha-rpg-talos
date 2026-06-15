import { useState } from 'react';

const SPELL_SCHOOLS = ['Fogo', 'Gelo', 'Raio', 'Necromancia', 'Arcano', 'Cura', 'Ilusão', 'Invocação', 'Transmutação', 'Abjuração', 'Outro'];

export default function TabMagias({ char, update }) {
  const [novaHabilidade, setNovaHabilidade] = useState({ nome: '', escola: 'Arcano', desc: '', usos: 0, maxUsos: 0, tipo: 'magia' });
  const [showForm, setShowForm] = useState(false);

  const habilidades = char.habilidadesMagicas || [];

  const resetForm = () => {
    setNovaHabilidade({ nome: '', escola: 'Arcano', desc: '', usos: 0, maxUsos: 0, tipo: 'magia' });
  };

  const addHabilidade = () => {
    if (!novaHabilidade.nome) return;
    update('habilidadesMagicas', [...habilidades, { ...novaHabilidade, id: Date.now() }]);
    resetForm();
    setShowForm(false);
  };

  const removeHabilidade = (id) => {
    update('habilidadesMagicas', habilidades.filter(h => h.id !== id));
  };

  const usarHabilidade = (id) => {
    update('habilidadesMagicas', habilidades.map(h => {
      if (h.id !== id) return h;
      const newUsos = Math.min((h.usos || 0) + 1, h.maxUsos || 99);
      return { ...h, usos: newUsos };
    }));
  };

  const resetUsos = (id) => {
    update('habilidadesMagicas', habilidades.map(h => h.id === id ? { ...h, usos: 0 } : h));
  };

  return (
    <div className="stack">
      <div className="card">
        <div className="card-header">
          <span>✦</span>
          <h3>Habilidades e Poderes ({habilidades.length})</h3>
          <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }} onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : '+ Novo Poder'}
          </button>
        </div>
        <div className="card-body">
          {showForm && (
            <div style={{ padding: 14, border: '1px dashed var(--parch-400)', borderRadius: 'var(--radius-md)', marginBottom: 16, background: 'rgba(253,246,227,0.4)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Nova Habilidade / Poder</div>
              <div className="grid2">
                <div className="field">
                  <label>Nome</label>
                  <input value={novaHabilidade.nome} onChange={e => setNovaHabilidade(p => ({ ...p, nome: e.target.value }))} placeholder="Nome do poder..." />
                </div>
                <div className="field">
                  <label>Tipo</label>
                  <select value={novaHabilidade.tipo} onChange={e => setNovaHabilidade(p => ({ ...p, tipo: e.target.value }))}>
                    <option value="magia">Magia</option>
                    <option value="habilidade">Habilidade</option>
                    <option value="passiva">Passiva</option>
                    <option value="ritual">Ritual</option>
                  </select>
                </div>
              </div>
              <div className="grid2" style={{ marginTop: 10 }}>
                <div className="field">
                  <label>Escola</label>
                  <select value={novaHabilidade.escola} onChange={e => setNovaHabilidade(p => ({ ...p, escola: e.target.value }))}>
                    {SPELL_SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Usos máx. (0 = ∞)</label>
                  <input type="number" min={0} value={novaHabilidade.maxUsos}
                    onChange={e => setNovaHabilidade(p => ({ ...p, maxUsos: Number(e.target.value) }))} />
                </div>
              </div>
              <div className="field" style={{ marginTop: 10 }}>
                <label>Descrição / Efeito</label>
                <textarea value={novaHabilidade.desc} onChange={e => setNovaHabilidade(p => ({ ...p, desc: e.target.value }))}
                  placeholder="Dano, alcance, efeito, duração..." rows={2} />
              </div>
              <div style={{ marginTop: 10, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setShowForm(false)}>Cancelar</button>
                <button className="btn btn-primary btn-sm" onClick={addHabilidade}>Adicionar</button>
              </div>
            </div>
          )}

          {habilidades.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--ink-faded)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>✦</div>
              <p style={{ fontStyle: 'italic', fontSize: '0.88rem' }}>Nenhuma habilidade cadastrada. Adicione seus poderes acima.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {habilidades.map(h => {
                const usosLeft = h.maxUsos > 0 ? h.maxUsos - (h.usos || 0) : null;
                const esgotada = usosLeft !== null && usosLeft <= 0;
                return (
                  <div key={h.id} style={{ border: `1px solid ${esgotada ? 'var(--parch-300)' : 'var(--parch-400)'}`, borderRadius: 'var(--radius-md)', padding: '12px 14px', opacity: esgotada ? 0.55 : 1, background: 'var(--parch-100)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: 'var(--ink-dark)' }}>{h.nome}</span>
                          <span className="badge" style={{ background: '#eff6ff', borderColor: '#93c5fd', color: '#1d4ed8' }}>{h.escola}</span>
                          <span className="badge" style={{ background: '#f5f3ff', borderColor: '#c4b5fd', color: '#7c3aed' }}>{h.tipo}</span>
                          {h.maxUsos > 0 && <span style={{ fontSize: '0.72rem', color: esgotada ? 'var(--red-old)' : 'var(--ink-faded)', fontFamily: 'var(--font-heading)' }}>{usosLeft}/{h.maxUsos} usos</span>}
                        </div>
                        {h.desc && <p style={{ fontSize: '0.82rem', color: 'var(--ink-mid)', fontStyle: 'italic', lineHeight: 1.45 }}>{h.desc}</p>}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
                        <button className="btn btn-primary btn-sm" onClick={() => usarHabilidade(h.id)} disabled={esgotada}>
                          Usar
                        </button>
                        {h.maxUsos > 0 && h.usos > 0 && (
                          <button className="btn btn-secondary btn-sm" onClick={() => resetUsos(h.id)}>↺</button>
                        )}
                        <button className="btn btn-danger btn-sm" onClick={() => removeHabilidade(h.id)}>×</button>
                      </div>
                    </div>

                    {h.maxUsos > 0 && (
                      <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
                        {Array.from({ length: h.maxUsos }, (_, i) => (
                          <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: i < (h.usos || 0) ? 'var(--red-old)' : 'var(--parch-300)', border: '1px solid var(--parch-400)' }} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header"><span>🌙</span><h3>Descanso</h3></div>
        <div className="card-body">
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={() => {
              update('hpAtual', Math.min(char.hpMax, (char.hpAtual || 0) + Math.floor(char.hpMax * 0.2)));
            }}>
              ☀️ Descanso Curto (1h) - +20% HP
            </button>
            <button className="btn btn-primary" onClick={() => {
              update('hpAtual', char.hpMax);
              update('habilidadesMagicas', habilidades.map(h => ({ ...h, usos: 0 })));
            }}>
              🌙 Descanso Longo (8h) - HP pleno e usos resetados
            </button>
          </div>
          <p style={{ marginTop: 10, fontSize: '0.78rem', color: 'var(--ink-faded)', fontStyle: 'italic' }}>
            Descanso longo reseta todos os usos de habilidades. Apenas 1 descanso longo por dia.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><span>📝</span><h3>Notas Arcanas</h3></div>
        <div className="card-body">
          <textarea value={char.notasMagia || ''} onChange={e => update('notasMagia', e.target.value)}
            placeholder="Magias aprendidas, combinações, rituais conhecidos, notas de poderes..."
            rows={5} />
        </div>
      </div>
    </div>
  );
}
