import { ORIGENS, SHIKATAS, PROFISSOES, TENDENCIAS } from '../data/system';

export default function TabIdentidade({ char, update }) {
  const origemData = ORIGENS.find(o => o.id === char.origem);
  const shikataData = SHIKATAS.find(s => s.id === char.shikata);

  return (
    <div className="stack">
      {/* Header info */}
      <div className="card">
        <div className="card-header">
          <span>📜</span>
          <h3>Identificação do Personagem</h3>
        </div>
        <div className="card-body">
          <div className="grid2">
            <div className="field">
              <label>Nome do Personagem</label>
              <input value={char.name} onChange={e => update('name', e.target.value)} placeholder="Nome..." />
            </div>
            <div className="field">
              <label>Nome do Jogador</label>
              <input value={char.player} onChange={e => update('player', e.target.value)} placeholder="Jogador..." />
            </div>
          </div>

          <div style={{ marginTop: 12 }} className="grid3">
            <div className="field">
              <label>Nível</label>
              <input type="number" min="1" max="30" value={char.nivel}
                onChange={e => update('nivel', Math.max(1, Number(e.target.value)))} />
            </div>
            <div className="field">
              <label>Tendência</label>
              <select value={char.tendencia} onChange={e => update('tendencia', e.target.value)}>
                <option value="">Selecione...</option>
                {TENDENCIAS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Profissão</label>
              <select value={char.profissao} onChange={e => update('profissao', e.target.value)}>
                <option value="">Selecione...</option>
                {PROFISSOES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginTop: 12 }} className="grid2">
            <div className="field">
              <label>Deus / Divindade (Paladino)</label>
              <input value={char.deus} onChange={e => update('deus', e.target.value)} placeholder="Nome do deus..." />
            </div>
            <div className="field">
              <label>XP Total</label>
              <input type="number" min="0" value={char.xp} onChange={e => update('xp', Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>

      {/* Origem */}
      <div className="card">
        <div className="card-header">
          <span>🌍</span>
          <h3>Origem (Raça)</h3>
        </div>
        <div className="card-body">
          <div className="field" style={{ marginBottom: 12 }}>
            <label>Origem</label>
            <select value={char.origem} onChange={e => update('origem', e.target.value)}>
              <option value="">Selecione sua origem...</option>
              {ORIGENS.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>
          </div>

          {origemData && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {Object.entries(origemData.bonus).filter(([,v]) => v > 0).map(([k, v]) => (
                  <span key={k} className="badge" style={{ background: '#e8f5e9', borderColor: '#4caf50', color: '#2e7d32' }}>
                    +{v} {k.charAt(0).toUpperCase() + k.slice(1)}
                  </span>
                ))}
                {origemData.extra && <span className="badge" style={{ background: '#e8f5e9', borderColor: '#4caf50', color: '#2e7d32' }}>{origemData.extra}</span>}
                {Object.entries(origemData.malus || {}).filter(([,v]) => v < 0).map(([k, v]) => (
                  <span key={k} className="badge" style={{ background: '#fce4ec', borderColor: '#ef9a9a', color: '#c62828' }}>
                    {v} {k.charAt(0).toUpperCase() + k.slice(1)}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: '0.82rem', color: 'var(--ink-mid)' }}>
                <span>🏃 Deslocamento: <strong>{origemData.deslocamento}sqm</strong></span>
                <span>⚡ Limite cansaço: <strong>{origemData.limiteCansaco}</strong></span>
              </div>
              <div style={{ padding: '8px 12px', background: 'rgba(253,246,227,0.6)', border: '1px solid var(--parch-300)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Habilidade Única</span>
                <p style={{ marginTop: 4, fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--ink-dark)' }}>{origemData.habilidade}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Shikata */}
      <div className="card">
        <div className="card-header">
          <span>⚔️</span>
          <h3>Shikata (Classe)</h3>
        </div>
        <div className="card-body">
          <div className="grid2" style={{ marginBottom: 12 }}>
            <div className="field">
              <label>Shikata</label>
              <select value={char.shikata} onChange={e => { update('shikata', e.target.value); update('subclasse', ''); }}>
                <option value="">Selecione sua classe...</option>
                {SHIKATAS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Subclasse {shikataData?.subclasseNivel ? `(Nível ${shikataData.subclasseNivel}+)` : ''}</label>
              <select value={char.subclasse} onChange={e => update('subclasse', e.target.value)}
                disabled={!shikataData || shikataData.subclasses.length === 0 || char.nivel < (shikataData?.subclasseNivel || 99)}>
                <option value="">{shikataData && char.nivel >= (shikataData?.subclasseNivel || 99) ? 'Escolha subclasse...' : shikataData ? `Disponível no nível ${shikataData.subclasseNivel}` : 'Selecione shikata primeiro'}</option>
                {shikataData?.subclasses.map(sc => <option key={sc} value={sc}>{sc}</option>)}
              </select>
            </div>
          </div>

          {shikataData && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: '0.82rem', color: 'var(--ink-mid)' }}>
                <span>🎲 Dado de vida: <strong>{shikataData.dadoVida}+mod CON</strong></span>
                <span>📊 Modificador: <strong>{shikataData.modificador}</strong></span>
                <span>⚡ Dificuldade: <strong>{shikataData.dificuldade}</strong></span>
              </div>
              <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--ink-mid)', lineHeight: 1.5 }}>{shikataData.desc}</p>
              <div style={{ padding: '6px 12px', background: 'rgba(253,246,227,0.6)', border: '1px solid var(--parch-300)', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: 'var(--ink-light)' }}>
                ⚡ Poder: {shikataData.poder}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Backstory */}
      <div className="card">
        <div className="card-header">
          <span>📖</span>
          <h3>Características do Personagem</h3>
        </div>
        <div className="card-body stack">
          <div className="grid2">
            <div className="field">
              <label>Traços de Personalidade</label>
              <textarea value={char.tracos} onChange={e => update('tracos', e.target.value)}
                placeholder="Gostos, desgostos, feitos, influências e maneirismos..." rows={3} />
            </div>
            <div className="field">
              <label>Ideais</label>
              <textarea value={char.ideais} onChange={e => update('ideais', e.target.value)}
                placeholder="Motivação, princípios éticos e morais..." rows={3} />
            </div>
          </div>
          <div className="grid2">
            <div className="field">
              <label>Vínculos</label>
              <textarea value={char.vinculos} onChange={e => update('vinculos', e.target.value)}
                placeholder="Conexões com pessoas, lugares e histórias..." rows={3} />
            </div>
            <div className="field">
              <label>Defeitos</label>
              <textarea value={char.defeitos} onChange={e => update('defeitos', e.target.value)}
                placeholder="Fraquezas, medos, compulsões (mínimo 2)..." rows={3} />
            </div>
          </div>
          <div className="field">
            <label>Vícios</label>
            <textarea value={char.vicios} onChange={e => update('vicios', e.target.value)}
              placeholder="O que te atrai inconscientemente..." rows={2} />
          </div>
        </div>
      </div>
    </div>
  );
}
