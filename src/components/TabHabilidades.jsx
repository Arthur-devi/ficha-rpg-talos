import { SHIKATAS, SHIKATAS_HABILIDADES, getHabilidadesPorNivel, getHabilidadesFuturas } from '../data/system';

export default function TabHabilidades({ char }) {
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
            <span>🎲 Dado de vida: <strong>{shikataData.dadoVida}</strong></span>
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

      {/* Unlocked abilities */}
      <div className="card">
        <div className="card-header">
          <span>✦</span>
          <h3>Habilidades Desbloqueadas ({unlockedSkills.length})</h3>
        </div>
        <div className="card-body">
          {unlockedSkills.length === 0 ? (
            <p style={{ color: 'var(--ink-faded)', fontSize: '0.85rem', fontStyle: 'italic' }}>Nenhuma habilidade desbloqueada ainda.</p>
          ) : (
            unlockedSkills.map((h, idx) => (
              <div key={idx} className="habilidade-row unlocked">
                <div style={{display:'flex',gap:6,alignItems:'center',marginBottom:4,flexWrap:'wrap'}}>
                  <div className="habilidade-nivel">Nível {h.nivel}</div>
                  {h.tipo && <span style={{fontSize:'0.6rem',fontFamily:'var(--font-heading)',textTransform:'uppercase',letterSpacing:'0.06em',padding:'1px 6px',borderRadius:3,background:h.tipo==='passiva'?'#e8f5e9':h.tipo==='reacao'?'#fce4ec':h.tipo==='bonus'?'#e3f2fd':'#f3e5f5',color:h.tipo==='passiva'?'#2e7d32':h.tipo==='reacao'?'#c62828':h.tipo==='bonus'?'#1565c0':'#6a1b9a'}}>{h.tipo}</span>}
                  {h.usos && <span style={{fontSize:'0.65rem',fontFamily:'var(--font-heading)',color:'var(--ink-faded)'}}>{h.usos}</span>}
                  {h.subclasse && <span style={{fontSize:'0.6rem',fontFamily:'var(--font-heading)',color:'var(--gold-dark)',background:'rgba(212,160,23,0.08)',padding:'1px 6px',borderRadius:3,border:'1px solid var(--gold-dark)'}}>{h.subclasse}</span>}
                </div>
                <div className="habilidade-nome">{h.nome}</div>
                <div className="habilidade-desc">{h.desc}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Locked abilities */}
      {lockedSkills.length > 0 && (
        <div className="card">
          <div className="card-header">
            <span>🔒</span>
            <h3>Habilidades Futuras</h3>
          </div>
          <div className="card-body">
            {lockedSkills.map((h, idx) => (
              <div key={idx} className="habilidade-row locked">
                <div style={{display:'flex',gap:6,alignItems:'center',marginBottom:4,flexWrap:'wrap'}}>
                  <div className="habilidade-nivel">Nível {h.nivel}</div>
                  {h.tipo && <span style={{fontSize:'0.6rem',fontFamily:'var(--font-heading)',textTransform:'uppercase',letterSpacing:'0.06em',padding:'1px 6px',borderRadius:3,background:'var(--parch-200)',color:'var(--ink-faded)'}}>{h.tipo}</span>}
                  {h.subclasse && <span style={{fontSize:'0.6rem',fontFamily:'var(--font-heading)',color:'var(--ink-faded)',padding:'1px 6px',borderRadius:3,border:'1px solid var(--parch-400)'}}>{h.subclasse}</span>}
                </div>
                <div className="habilidade-nome">{h.nome}</div>
                <div className="habilidade-desc">{h.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evolução */}
      <div className="card">
        <div className="card-header"><span>📈</span><h3>Progressão</h3></div>
        <div className="card-body">
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {Array.from({ length: Math.max(20, nivel) }, (_, i) => i + 1).map(n => {
              const hasSkill = shikataData.habilidades.some(h => h.nivel === n);
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
              <li>Ao evoluir: role o <strong>dado de vida</strong> + mod CON da shikata</li>
              <li>Multiclasse: proficiente no novo atributo, mas não soma modificadores</li>
              <li>Só pode evoluir <strong>1 nível de shikata por vez</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}