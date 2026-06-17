import { SHIKATAS, SHIKATAS_HABILIDADES, getHabilidadesPorNivel, getHabilidadesFuturas } from '../data/system';
import { getEvolucao } from '../data/evolucoes';

function clampCounter(value) {
  return Math.max(0, Number(value) || 0);
}

function EvolucaoTable({ shikataId, nome, nivelAtual }) {
  const rows = getEvolucao(shikataId, nome);
  if (!rows || rows.length === 0) return null;
  return (
    <div style={{ marginTop: 8, borderRadius: 4, overflow: 'hidden', border: '1px solid var(--parch-300)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
        <thead>
          <tr style={{ background: 'var(--parch-200)' }}>
            <th style={{ fontFamily: 'var(--font-heading)', fontSize: '0.62rem', letterSpacing: '0.07em', textTransform: 'uppercase', padding: '4px 8px', textAlign: 'left', color: 'var(--ink-light)', width: 64, borderBottom: '1px solid var(--parch-300)' }}>Nível</th>
            <th style={{ fontFamily: 'var(--font-heading)', fontSize: '0.62rem', letterSpacing: '0.07em', textTransform: 'uppercase', padding: '4px 8px', textAlign: 'left', color: 'var(--ink-light)', borderBottom: '1px solid var(--parch-300)' }}>Efeito</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const unlocked = r.nivel <= nivelAtual;
            const isCurrent = rows.filter(x => x.nivel <= nivelAtual).length > 0 &&
              r.nivel === Math.max(...rows.filter(x => x.nivel <= nivelAtual).map(x => x.nivel));
            return (
              <tr key={i} style={{
                background: isCurrent ? 'rgba(212,160,23,0.08)' : unlocked ? 'rgba(253,246,227,0.4)' : 'transparent',
                opacity: unlocked ? 1 : 0.45,
                borderBottom: i < rows.length - 1 ? '1px solid var(--parch-200)' : 'none',
              }}>
                <td style={{ padding: '4px 8px', fontFamily: 'var(--font-heading)', fontWeight: 600, color: isCurrent ? 'var(--gold-dark)' : unlocked ? 'var(--ink-dark)' : 'var(--ink-faded)', whiteSpace: 'nowrap' }}>
                  {isCurrent && <span style={{ marginRight: 4 }}>▶</span>}
                  Nv. {r.nivel}
                </td>
                <td style={{ padding: '4px 8px', color: unlocked ? 'var(--ink-mid)' : 'var(--ink-faded)', lineHeight: 1.4 }}>{r.desc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function BardoResources({ char, update }) {
  const resources = char.classResources?.bardo || {};
  const setResource = (key, value) => update(`classResources.bardo.${key}`, clampCounter(value));
  const adjust = (key, delta) => setResource(key, (resources[key] || 0) + delta);

  const fields = [
    { key: 'performance', label: 'Performance', step: 10 },
    { key: 'armasSonoras', label: 'Armas Sonoras', step: 1 },
    { key: 'concertosSucesso', label: 'Concertos Seguidos', step: 1 },
  ];

  return (
    <div className="card">
      <div className="card-header"><span>♪</span><h3>Recursos do Bardo</h3></div>
      <div className="card-body">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
          {fields.map(field => (
            <div key={field.key} style={{ border: '1px solid var(--parch-300)', borderRadius: 'var(--radius-md)', padding: 12, background: 'rgba(253,246,227,0.45)' }}>
              <label>{field.label}</label>
              <input
                type="number"
                min={0}
                value={resources[field.key] || 0}
                onChange={e => setResource(field.key, e.target.value)}
                style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: 8 }}
              />
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => adjust(field.key, -field.step)}>-{field.step}</button>
                <button className="btn btn-secondary btn-sm" onClick={() => adjust(field.key, field.step)}>+{field.step}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HemomanteResources({ char, update }) {
  const resources = char.classResources?.hemomante || {};
  const setResource = (key, value) => update(`classResources.hemomante.${key}`, clampCounter(value));
  const adjust = (key, delta) => setResource(key, (resources[key] || 0) + delta);
  const maxReserva = Math.max(0, (Number(char.nivel) || 1) * 4);
  const subclasse = char.subclasse || '';

  const fields = [{ key: 'reservaSangue', label: 'Reserva ML', step: 5, max: maxReserva }];
  if (subclasse === 'Hemomante Empírico') {
    fields.push(
      { key: 'pontosAcumulo', label: 'Pontos Acúmulo', step: 1 },
      { key: 'curasAcumuladas', label: 'Curas +', step: 1 },
    );
  }
  if (subclasse === 'Hemomante da Guerra') {
    fields.push({ key: 'litrosSangue', label: 'Litros de Sangue', step: 1 });
  }

  return (
    <div className="card">
      <div className="card-header"><span>ML</span><h3>Recursos do Hemomante</h3></div>
      <div className="card-body">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
          {fields.map(field => {
            const value = resources[field.key] || 0;
            const nextValue = field.max ? Math.min(value, field.max) : value;
            return (
              <div key={field.key} style={{ border: '1px solid var(--parch-300)', borderRadius: 'var(--radius-md)', padding: 12, background: 'rgba(253,246,227,0.45)' }}>
                <label>{field.label}</label>
                <input
                  type="number"
                  min={0}
                  max={field.max}
                  value={nextValue}
                  onChange={e => setResource(field.key, field.max ? Math.min(field.max, clampCounter(e.target.value)) : e.target.value)}
                  style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: 8 }}
                />
                <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => adjust(field.key, -field.step)}>-{field.step}</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setResource(field.key, field.max ? Math.min(field.max, value + field.step) : value + field.step)}>+{field.step}</button>
                </div>
                {field.key === 'reservaSangue' && (
                  <div style={{ marginTop: 6, fontSize: '0.72rem', color: 'var(--ink-faded)', fontFamily: 'var(--font-heading)', textAlign: 'center' }}>
                    Máx {maxReserva} | Defesa +{Math.floor(nextValue / 2)}
                  </div>
                )}
                {field.key === 'litrosSangue' && (
                  <div style={{ marginTop: 6, fontSize: '0.72rem', color: 'var(--ink-faded)', fontFamily: 'var(--font-heading)', textAlign: 'center' }}>
                    Legião: CA/DEF +{Math.min(nextValue, 8)} | +2 dados/litro acima de 10L
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function TabHabilidades({ char, update }) {
  const shikataData = SHIKATAS.find(s => s.id === char.shikata);

  if (!shikataData) {
    return (
      <div className="card">
        <div className="card-body" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>⚔️</div>
          <h3 style={{ marginBottom: 8, color: 'var(--ink-light)' }}>Nenhuma Shikata Selecionada</h3>
          <p style={{ color: 'var(--ink-faded)', fontSize: '0.9rem' }}>Vá até a aba <strong>Identidade</strong> e selecione sua Shikata para ver as habilidades.</p>
        </div>
      </div>
    );
  }

  const nivel = char.nivel || 1;
  const subclasse = char.subclasse || '';
  const unlockedSkills = getHabilidadesPorNivel(char.shikata, nivel, subclasse);
  const lockedSkills = getHabilidadesFuturas(char.shikata, nivel, subclasse);
  const subclasseUnlocked = nivel >= (shikataData.subclasseNivel || 999);

  return (
    <div className="stack">
      {/* Class header */}
      <div className="card">
        <div className="card-header">
          <span>⚔️</span>
          <h3>{shikataData.name} — Nível {nivel}</h3>
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--ink-mid)', marginBottom: 10 }}>
            <span>🎲 Dado de vida pós nv.1: <strong>{shikataData.dadoVida}</strong></span>
            <span>📊 Mod. acerto: <strong>{shikataData.modificador}</strong></span>
            <span>⚡ Dificuldade: <strong>{shikataData.dificuldade}</strong></span>
            <span>💫 Poder: <strong>{shikataData.poder}</strong></span>
          </div>
          <p style={{ fontStyle: 'italic', color: 'var(--ink-mid)', fontSize: '0.88rem', lineHeight: 1.55 }}>{shikataData.desc}</p>

          {/* Subclasse */}
          {shikataData.subclasses.length > 0 && (
            <div style={{ marginTop: 14, padding: '10px 14px', background: subclasseUnlocked ? 'rgba(212,160,23,0.08)' : 'transparent', border: `1px solid ${subclasseUnlocked ? 'var(--gold-dark)' : 'var(--parch-300)'}`, borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', color: subclasseUnlocked ? 'var(--gold-dark)' : 'var(--ink-faded)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                {subclasseUnlocked ? '✦ Subclasse Desbloqueada' : `🔒 Subclasse disponível no nível ${shikataData.subclasseNivel}`}
              </div>
              {subclasseUnlocked && char.subclasse ? (
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--ink-dark)' }}>{char.subclasse}</div>
              ) : subclasseUnlocked ? (
                <div style={{ fontSize: '0.82rem', color: 'var(--ink-faded)' }}>Subclasse não selecionada. Vá em Identidade.</div>
              ) : (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {shikataData.subclasses.map(sc => (
                    <span key={sc} className="badge" style={{ opacity: 0.5, borderColor: 'var(--parch-400)', color: 'var(--ink-faded)' }}>{sc}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {char.shikata === 'bardo' && <BardoResources char={char} update={update} />}
      {char.shikata === 'hemomante' && <HemomanteResources char={char} update={update} />}

      {/* Unlocked abilities - grouped by level */}
      <div className="card">
        <div className="card-header">
          <span>✦</span>
          <h3>Habilidades Desbloqueadas ({unlockedSkills.length})</h3>
        </div>
        <div className="card-body">
          {unlockedSkills.length === 0 ? (
            <p style={{ color: 'var(--ink-faded)', fontSize: '0.85rem', fontStyle: 'italic' }}>Nenhuma habilidade desbloqueada ainda.</p>
          ) : (
            (() => {
              // Agrupa por nível
              const byLevel = {};
              unlockedSkills.forEach(h => {
                if (!byLevel[h.nivel]) byLevel[h.nivel] = [];
                byLevel[h.nivel].push(h);
              });
              return Object.keys(byLevel).sort((a,b) => Number(a)-Number(b)).map(lvl => (
                <div key={lvl} style={{ marginBottom: 16 }}>
                  {/* Separador de nível */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8,
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-heading)', fontSize: '0.72rem', fontWeight: 600,
                      color: 'var(--parch-100)', background: Number(lvl) === nivel ? 'var(--gold-dark)' : 'var(--ink-dark)',
                      padding: '3px 10px', borderRadius: 4, letterSpacing: '0.08em',
                      whiteSpace: 'nowrap', flexShrink: 0,
                    }}>
                      Nível {lvl}
                      {Number(lvl) === nivel && <span style={{ marginLeft: 6, fontSize: '0.6rem', opacity: 0.85 }}>← atual</span>}
                    </div>
                    <div style={{ flex: 1, height: 1, background: 'var(--parch-300)' }} />
                  </div>
                  {byLevel[lvl].map((h, idx) => (
                    <div key={idx} className="habilidade-row unlocked" style={{ marginLeft: 8 }}>
                      <div style={{display:'flex',gap:6,alignItems:'center',marginBottom:4,flexWrap:'wrap'}}>
                        {h.tipo && <span style={{fontSize:'0.6rem',fontFamily:'var(--font-heading)',textTransform:'uppercase',letterSpacing:'0.06em',padding:'1px 6px',borderRadius:3,background:h.tipo==='passiva'?'#e8f5e9':h.tipo==='reacao'?'#fce4ec':h.tipo==='bonus'?'#e3f2fd':'#f3e5f5',color:h.tipo==='passiva'?'#2e7d32':h.tipo==='reacao'?'#c62828':h.tipo==='bonus'?'#1565c0':'#6a1b9a'}}>{h.tipo}</span>}
                        {h.usos && <span style={{fontSize:'0.65rem',fontFamily:'var(--font-heading)',color:'var(--ink-faded)'}}>{h.usos}</span>}
                        {h.subclasse && <span style={{fontSize:'0.6rem',fontFamily:'var(--font-heading)',color:'var(--gold-dark)',background:'rgba(212,160,23,0.08)',padding:'1px 6px',borderRadius:3,border:'1px solid var(--gold-dark)'}}>{h.subclasse}</span>}
                      </div>
                      <div className="habilidade-nome">{h.nome}</div>
                      <div className="habilidade-desc">{h.desc}</div>
                      <EvolucaoTable shikataId={char.shikata} nome={h.nome} nivelAtual={nivel} />
                    </div>
                  ))}
                </div>
              ));
            })()
          )}
        </div>
      </div>

      {/* Locked abilities - grouped by level */}
      {lockedSkills.length > 0 && (
        <div className="card">
          <div className="card-header">
            <span>🔒</span>
            <h3>Habilidades Futuras</h3>
          </div>
          <div className="card-body">
            {(() => {
              const byLevel = {};
              lockedSkills.forEach(h => {
                if (!byLevel[h.nivel]) byLevel[h.nivel] = [];
                byLevel[h.nivel].push(h);
              });
              return Object.keys(byLevel).sort((a,b) => Number(a)-Number(b)).map(lvl => (
                <div key={lvl} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{
                      fontFamily: 'var(--font-heading)', fontSize: '0.72rem', fontWeight: 600,
                      color: 'var(--ink-faded)', background: 'var(--parch-200)',
                      padding: '3px 10px', borderRadius: 4, letterSpacing: '0.08em',
                      border: '1px solid var(--parch-400)', whiteSpace: 'nowrap', flexShrink: 0,
                    }}>
                      Nível {lvl}
                    </div>
                    <div style={{ flex: 1, height: 1, background: 'var(--parch-300)' }} />
                  </div>
                  {byLevel[lvl].map((h, idx) => (
                    <div key={idx} className="habilidade-row locked" style={{ marginLeft: 8 }}>
                      <div style={{display:'flex',gap:6,alignItems:'center',marginBottom:4,flexWrap:'wrap'}}>
                        {h.tipo && <span style={{fontSize:'0.6rem',fontFamily:'var(--font-heading)',textTransform:'uppercase',letterSpacing:'0.06em',padding:'1px 6px',borderRadius:3,background:'var(--parch-200)',color:'var(--ink-faded)'}}>{h.tipo}</span>}
                        {h.subclasse && <span style={{fontSize:'0.6rem',fontFamily:'var(--font-heading)',color:'var(--ink-faded)',padding:'1px 6px',borderRadius:3,border:'1px solid var(--parch-400)'}}>{h.subclasse}</span>}
                      </div>
                      <div className="habilidade-nome">{h.nome}</div>
                      <div className="habilidade-desc">{h.desc}</div>
                      <EvolucaoTable shikataId={char.shikata} nome={h.nome} nivelAtual={nivel} />
                    </div>
                  ))}
                </div>
              ));
            })()}
          </div>
        </div>
      )}

      {/* Evolução */}
      <div className="card">
        <div className="card-header"><span>📈</span><h3>Progressão</h3></div>
        <div className="card-body">
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {Array.from({ length: Math.max(20, nivel) }, (_, i) => i + 1).map(n => {
              const allSkills = SHIKATAS_HABILIDADES[char.shikata] || [];
              const hasSkill = allSkills.some(h => h.nivel === n);
              const isSubclass = n === shikataData.subclasseNivel;
              return (
                <div key={n} style={{
                  width: 32, height: 32, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-heading)', fontSize: '0.65rem', fontWeight: 600,
                  background: n <= nivel ? (isSubclass ? 'var(--gold-dark)' : hasSkill ? 'var(--ink-dark)' : 'var(--parch-400)') : 'transparent',
                  color: n <= nivel ? 'var(--parch-100)' : 'var(--parch-400)',
                  border: `1px solid ${n <= nivel ? 'transparent' : 'var(--parch-400)'}`,
                  cursor: 'default',
                  position: 'relative',
                }}>
                  {n}
                  {isSubclass && n <= nivel && <div style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, background: 'var(--gold-bright)', borderRadius: '50%' }} />}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 10, fontSize: '0.72rem', color: 'var(--ink-faded)', fontFamily: 'var(--font-heading)', display: 'flex', gap: 16 }}>
            <span><span style={{ display: 'inline-block', width: 12, height: 12, background: 'var(--ink-dark)', borderRadius: 2, verticalAlign: 'middle', marginRight: 4 }} />Habilidade nova</span>
            <span><span style={{ display: 'inline-block', width: 12, height: 12, background: 'var(--gold-dark)', borderRadius: 2, verticalAlign: 'middle', marginRight: 4 }} />Subclasse</span>
            <span><span style={{ display: 'inline-block', width: 12, height: 12, background: 'var(--parch-400)', borderRadius: 2, verticalAlign: 'middle', marginRight: 4 }} />Nível normal</span>
          </div>

          <div style={{ marginTop: 16, padding: '10px 14px', background: 'rgba(253,246,227,0.5)', borderRadius: 'var(--radius-md)', border: '1px solid var(--parch-300)' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Regras de Evolução</div>
            <ul style={{ paddingLeft: 16, fontSize: '0.82rem', color: 'var(--ink-mid)', lineHeight: 1.7, listStyle: 'disc' }}>
              <li>Cada shikata recebe <strong>2 pontos de atributo</strong> por nível</li>
              <li>Ao evoluir: use o <strong>dado de vida pós nv.1</strong> indicado pela shikata</li>
              <li>Multiclasse: proficiente no novo atributo, mas não soma modificadores</li>
              <li>Só pode evoluir <strong>1 nível de shikata por vez</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
