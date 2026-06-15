import { useState } from 'react';

const SPELL_SCHOOLS = ['Fogo', 'Gelo', 'Raio', 'Necromancia', 'Arcano', 'Cura', 'Ilusão', 'Invocação', 'Transmutação', 'Abjuração', 'Outro'];

export default function TabMagias({ char, update, derived }) {
  const [novaHabilidade, setNovaHabilidade] = useState({ nome: '', custo: 0, escola: 'Arcano', desc: '', usos: 0, maxUsos: 0, tipo: 'magia' });
  const [showForm, setShowForm] = useState(false);

  const habilidades = char.habilidadesMagicas || [];

  const addHabilidade = () => {
    if (!novaHabilidade.nome) return;
    const list = [...habilidades, { ...novaHabilidade, id: Date.now() }];
    update('habilidadesMagicas', list);
    setNovaHabilidade({ nome: '', custo: 0, escola: 'Arcano', desc: '', usos: 0, maxUsos: 0, tipo: 'magia' });
    setShowForm(false);
  };

  const removeHabilidade = (id) => {
    update('habilidadesMagicas', habilidades.filter(h => h.id !== id));
  };

  const usarHabilidade = (id) => {
    update('habilidadesMagicas', habilidades.map(h => {
      if (h.id !== id) return h;
      const newUsos = Math.min(h.usos + 1, h.maxUsos || 99);
      return { ...h, usos: newUsos };
    }));
    // Also deduct mana
    const h = habilidades.find(h => h.id === id);
    if (h && h.custo > 0) {
      update('manaAtual', Math.max(0, (char.manaAtual || 0) - h.custo));
    }
  };

  const resetUsos = (id) => {
    update('habilidadesMagicas', habilidades.map(h => h.id === id ? { ...h, usos: 0 } : h));
  };

  const manaPct = derived.manaBase > 0 ? Math.max(0, Math.min(100, ((char.manaAtual || 0) / derived.manaBase) * 100)) : 0;
  const manaColor = manaPct > 60 ? '#2563eb' : manaPct > 30 ? '#7c3aed' : '#dc2626';

  return (
    <div className="stack">
      {/* Mana Overview */}
      <div className="card">
        <div className="card-header"><span>✨</span><h3>Mana e Derivações</h3></div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 16 }}>
            {/* Current mana */}
            <div>
              <label>Mana Atual / Máximo</label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                <input type="number" value={char.manaAtual || 0} min={0} max={derived.manaBase}
                  onChange={e => update('manaAtual', Math.max(0, Math.min(derived.manaBase, Number(e.target.value))))}
                  style={{ width: 70, textAlign: 'center', fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: manaColor }} />
                <span style={{ color: 'var(--ink-faded)', fontFamily: 'var(--font-heading)' }}>/</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--ink-mid)' }}>{derived.manaBase}</span>
              </div>
              <div className="stat-bar-track" style={{ height: 14 }}>
                <div className="stat-bar-fill" style={{ width: `${manaPct}%`, background: `linear-gradient(90deg, ${manaColor}cc, ${manaColor})` }} />
              </div>
              <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                <button className="btn btn-secondary btn-sm" onClick={() => update('manaAtual', derived.manaBase)}>🔄 Regenerar Tudo</button>
                <button className="btn btn-secondary btn-sm" onClick={() => update('manaAtual', Math.max(0, (char.manaAtual || 0) - 1))}>-1</button>
                <button className="btn btn-secondary btn-sm" onClick={() => update('manaAtual', Math.min(derived.manaBase, (char.manaAtual || 0) + 1))}>+1</button>
              </div>
            </div>

            {/* Derivations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ padding: '8px 12px', background: 'rgba(29,78,216,0.06)', border: '1px solid rgba(29,78,216,0.15)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-heading)', color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Atributo de Magia</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--ink-dark)' }}>{char.attrs.magia} <span style={{ fontSize: '0.8rem', color: 'var(--ink-faded)' }}>base</span></div>
              </div>
              <div style={{ padding: '8px 12px', background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-heading)', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Bônus INT→Magia</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--ink-dark)' }}>+{derived.magiaFromInt} <span style={{ fontSize: '0.8rem', color: 'var(--ink-faded)' }}>de INT {char.attrs.inteligencia}</span></div>
              </div>
              <div style={{ padding: '8px 12px', background: 'rgba(212,160,23,0.06)', border: '1px solid rgba(212,160,23,0.15)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-heading)', color: 'var(--gold-dark)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Mana Total</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--ink-dark)' }}>{derived.manaBase}</div>
              </div>
            </div>

            {/* Mod */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-heading)', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 2 }}>Modificador de Magia</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 52, height: 52, background: '#1d4ed8', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700 }}>
                  {derived.modMagia >= 0 ? '+' : ''}{derived.modMagia}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--ink-mid)', lineHeight: 1.5 }}>
                  Mod = Magia total÷2 = {derived.magiaTotal}÷2<br />
                  Usado em testes de arcanismo
                </div>
              </div>
              <div style={{ padding: '6px 10px', background: 'rgba(253,246,227,0.5)', border: '1px solid var(--parch-300)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', color: 'var(--ink-faded)', fontStyle: 'italic' }}>
                Mana regenera completamente após descanso longo (8h)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Habilidades mágicas */}
      <div className="card">
        <div className="card-header">
          <span>🔮</span>
          <h3>Habilidades Mágicas ({habilidades.length})</h3>
          <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }} onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : '+ Nova Habilidade'}
          </button>
        </div>
        <div className="card-body">
          {/* New ability form */}
          {showForm && (
            <div style={{ padding: 14, border: '1px dashed var(--parch-400)', borderRadius: 'var(--radius-md)', marginBottom: 16, background: 'rgba(253,246,227,0.4)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Nova Habilidade / Magia</div>
              <div className="grid2">
                <div className="field">
                  <label>Nome</label>
                  <input value={novaHabilidade.nome} onChange={e => setNovaHabilidade(p => ({ ...p, nome: e.target.value }))} placeholder="Nome da magia..." />
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
              <div className="grid3" style={{ marginTop: 10 }}>
                <div className="field">
                  <label>Escola</label>
                  <select value={novaHabilidade.escola} onChange={e => setNovaHabilidade(p => ({ ...p, escola: e.target.value }))}>
                    {SPELL_SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Custo de Mana</label>
                  <input type="number" min={0} value={novaHabilidade.custo}
                    onChange={e => setNovaHabilidade(p => ({ ...p, custo: Number(e.target.value) }))} />
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
              <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>🔮</div>
              <p style={{ fontStyle: 'italic', fontSize: '0.88rem' }}>Nenhuma habilidade cadastrada. Adicione suas magias e poderes acima.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {habilidades.map(h => {
                const usosLeft = h.maxUsos > 0 ? h.maxUsos - h.usos : null;
                const esgotada = usosLeft !== null && usosLeft <= 0;
                return (
                  <div key={h.id} style={{ border: `1px solid ${esgotada ? 'var(--parch-300)' : 'var(--parch-400)'}`, borderRadius: 'var(--radius-md)', padding: '12px 14px', opacity: esgotada ? 0.55 : 1, background: 'var(--parch-100)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: 'var(--ink-dark)' }}>{h.nome}</span>
                          <span className="badge" style={{ background: '#eff6ff', borderColor: '#93c5fd', color: '#1d4ed8' }}>{h.escola}</span>
                          <span className="badge" style={{ background: '#f5f3ff', borderColor: '#c4b5fd', color: '#7c3aed' }}>{h.tipo}</span>
                          {h.custo > 0 && <span style={{ fontSize: '0.72rem', color: '#1d4ed8', fontFamily: 'var(--font-heading)' }}>✨ {h.custo} mana</span>}
                          {h.maxUsos > 0 && <span style={{ fontSize: '0.72rem', color: esgotada ? 'var(--red-old)' : 'var(--ink-faded)', fontFamily: 'var(--font-heading)' }}>{usosLeft}/{h.maxUsos} usos</span>}
                        </div>
                        {h.desc && <p style={{ fontSize: '0.82rem', color: 'var(--ink-mid)', fontStyle: 'italic', lineHeight: 1.45 }}>{h.desc}</p>}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
                        <button className="btn btn-primary btn-sm" onClick={() => usarHabilidade(h.id)} disabled={esgotada}>
                          ▶ Usar
                        </button>
                        {h.maxUsos > 0 && h.usos > 0 && (
                          <button className="btn btn-secondary btn-sm" onClick={() => resetUsos(h.id)}>↺</button>
                        )}
                        <button className="btn btn-danger btn-sm" onClick={() => removeHabilidade(h.id)}>×</button>
                      </div>
                    </div>

                    {/* Usos dots */}
                    {h.maxUsos > 0 && (
                      <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
                        {Array.from({ length: h.maxUsos }, (_, i) => (
                          <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: i < h.usos ? 'var(--red-old)' : 'var(--parch-300)', border: '1px solid var(--parch-400)' }} />
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

      {/* Descanso */}
      <div className="card">
        <div className="card-header"><span>🌙</span><h3>Descanso</h3></div>
        <div className="card-body">
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={() => {
              update('hpAtual', Math.min(char.hpMax, (char.hpAtual || 0) + Math.floor(char.hpMax * 0.2)));
            }}>
              ☀️ Descanso Curto (1h) — +20% HP
            </button>
            <button className="btn btn-primary" onClick={() => {
              update('hpAtual', char.hpMax);
              update('manaAtual', derived.manaBase);
              update('habilidadesMagicas', habilidades.map(h => ({ ...h, usos: 0 })));
            }}>
              🌙 Descanso Longo (8h) — HP e Mana plenos
            </button>
          </div>
          <p style={{ marginTop: 10, fontSize: '0.78rem', color: 'var(--ink-faded)', fontStyle: 'italic' }}>
            Descanso longo também reseta todos os usos de habilidades. Apenas 1 descanso longo por dia.
          </p>
        </div>
      </div>

      {/* Notas de Magia */}
      <div className="card">
        <div className="card-header"><span>📝</span><h3>Notas Arcanas</h3></div>
        <div className="card-body">
          <textarea value={char.notasMagia || ''} onChange={e => update('notasMagia', e.target.value)}
            placeholder="Magias aprendidas, combinações, rituais conhecidos, notas de spellcasting..."
            rows={5} />
        </div>
      </div>
    </div>
  );
}
