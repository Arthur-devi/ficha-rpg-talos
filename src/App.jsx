import { useState, useRef } from 'react';
import './styles/global.css';
import { useCharacter } from './hooks/useCharacter';
import TabIdentidade from './components/TabIdentidade';
import TabAtributos from './components/TabAtributos';
import TabHabilidades from './components/TabHabilidades';
import TabInventario from './components/TabInventario';
import TabMagias from './components/TabMagias';
import TabNotas from './components/TabNotas';
import TabSistema from './components/TabSistema';
import { ORIGENS, SHIKATAS } from './data/system';

const TABS = [
  { id: 'identidade', label: 'Identidade', icon: '📜' },
  { id: 'atributos', label: 'Atributos', icon: '💪' },
  { id: 'habilidades', label: 'Habilidades', icon: '⚔️' },
  { id: 'inventario', label: 'Inventário', icon: '🎒' },
  { id: 'magias', label: 'Magias', icon: '✨' },
  { id: 'sistema', label: 'Sistema', icon: '📚' },
  { id: 'notas', label: 'Notas', icon: '📝' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('identidade');
  const { char, update, updateAttr, exportChar, importChar, addInventoryItem, removeInventoryItem, equipItem, toggleEstado, togglePericia, derived } = useCharacter();
  const importRef = useRef();

  const hpPct = char.hpMax > 0 ? Math.max(0, Math.min(100, (char.hpAtual / char.hpMax) * 100)) : 0;
  const hpColor = hpPct > 60 ? '#16a34a' : hpPct > 25 ? '#d97706' : '#dc2626';

  return (
    <div>
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-title">TALOS</div>
        <div className="nav-sep" />

        {TABS.map(tab => (
          <button key={tab.id} className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}>
            <span style={{ fontSize: '0.85rem' }}>{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}

        <div className="nav-sep" />

        {/* Quick vitals in nav */}
        {char.name && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 4, padding: '0 8px' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', color: 'var(--parch-300)', whiteSpace: 'nowrap', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis' }}>{char.name}</div>
            <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-heading)', color: hpColor, whiteSpace: 'nowrap' }}>❤️ {char.hpAtual}/{char.hpMax}</div>
          </div>
        )}

        <div className="nav-actions">
          {/* Import */}
          <input ref={importRef} type="file" accept=".json" style={{ display: 'none' }}
            onChange={e => { if (e.target.files[0]) { importChar(e.target.files[0]); e.target.value = ''; } }} />
          <button className="btn btn-secondary btn-sm" onClick={() => importRef.current?.click()} title="Importar personagem">
            📂 Importar
          </button>
          <button className="btn btn-primary btn-sm" onClick={exportChar} title="Baixar personagem como JSON">
            💾 Salvar
          </button>
        </div>
      </nav>

      {/* Page content */}
      <main className="page">
        {/* Character title bar */}
        {char.name && (
          <div className="ornamental-header" style={{ marginBottom: 16 }}>
            <h1 style={{ color: 'var(--ink-dark)' }}>{char.name}</h1>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', color: 'var(--ink-faded)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>
              {[char.origem && ORIGIN_NAME(char.origem), char.shikata && SHIKATA_NAME(char.shikata), char.nivel && `Nível ${char.nivel}`].filter(Boolean).join(' • ')}
            </div>
          </div>
        )}

        {activeTab === 'identidade' && <TabIdentidade char={char} update={update} />}
        {activeTab === 'atributos' && <TabAtributos char={char} update={update} updateAttr={updateAttr} derived={derived} toggleEstado={toggleEstado} togglePericia={togglePericia} />}
        {activeTab === 'habilidades' && <TabHabilidades char={char} update={update} />}
        {activeTab === 'inventario' && <TabInventario char={char} addInventoryItem={addInventoryItem} removeInventoryItem={removeInventoryItem} equipItem={equipItem} />}
        {activeTab === 'magias' && <TabMagias char={char} update={update} derived={derived} />}
        {activeTab === 'sistema' && <TabSistema />}
        {activeTab === 'notas' && <TabNotas char={char} update={update} />}
      </main>

      {/* Mobile bottom nav */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(180deg, var(--parch-800) 0%, var(--parch-700) 100%)',
        borderTop: '2px solid var(--gold-dark)',
        display: 'flex', justifyContent: 'space-around',
        padding: '8px 0 max(8px, env(safe-area-inset-bottom))',
        zIndex: 99,
      }} className="mobile-bottom-nav">
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              color: activeTab === tab.id ? 'var(--gold-bright)' : 'var(--parch-400)',
              padding: '4px 8px', borderRadius: 6, transition: 'color 0.15s',
            }}>
            <span style={{ fontSize: '1.1rem' }}>{tab.icon}</span>
            <span style={{ fontSize: '0.55rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Helpers to get display names
function ORIGIN_NAME(id) {
  return ORIGENS.find(origem => origem.id === id)?.name || id;
}
function SHIKATA_NAME(id) {
  return SHIKATAS.find(shikata => shikata.id === id)?.name || id;
}
