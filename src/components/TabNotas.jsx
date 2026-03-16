export default function TabNotas({ char, update }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div className="card">
        <div className="card-header"><span>📝</span><h3>Notas da Campanha</h3></div>
        <div className="card-body">
          <textarea value={char.notas || ''} onChange={e => update('notas', e.target.value)}
            placeholder="Notas de sessão, NPCs importantes, objetivos, segredos descobertos..."
            rows={10} />
        </div>
      </div>

      <div className="card">
        <div className="card-header"><span>🗺️</span><h3>Lugares e Missões</h3></div>
        <div className="card-body">
          <textarea value={char.lugares || ''} onChange={e => update('lugares', e.target.value)}
            placeholder="Lugares visitados, locais de interesse, quests ativas..."
            rows={6} />
        </div>
      </div>

      <div className="card">
        <div className="card-header"><span>👥</span><h3>Aliados e Inimigos</h3></div>
        <div className="card-body">
          <textarea value={char.aliados || ''} onChange={e => update('aliados', e.target.value)}
            placeholder="NPCs aliados, inimigos conhecidos, facções..."
            rows={5} />
        </div>
      </div>
    </div>
  );
}
