import { useState, useRef } from 'react';
import './styles/global.css';
import { useCharacter } from './hooks/useCharacter';
import TabIdentidade from './components/TabIdentidade';
import TabAtributos from './components/TabAtributos';
import TabDados from './components/TabDados';
import TabHabilidades from './components/TabHabilidades';
import TabInventario from './components/TabInventario';
import TabMagias from './components/TabMagias';
import TabNotas from './components/TabNotas';
import TurnActionHud from './components/TurnActionHud';
import SubclassEventOverlay from './components/SubclassEventOverlay';
import { ORIGENS, SHIKATAS } from './data/system';

const TABS = [
  { id: 'identidade', label: 'Identidade', icon: '📜' },
  { id: 'atributos', label: 'Atributos', icon: '💪' },
  { id: 'dados', label: 'Dados', icon: 'D20' },
  { id: 'habilidades', label: 'Habilidades', icon: '⚔️' },
  { id: 'inventario', label: 'Inventário', icon: '🎒' },
  { id: 'magias', label: 'Poderes', icon: '✦' },
  { id: 'notas', label: 'Notas', icon: '📝' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('identidade');
  const {
    char,
    update,
    updateAttr,
    levelUp,
    learnShikata,
    setActiveShikata,
    setShikataLevel,
    chooseSubclass,
    dismissSubclassEvent,
    spendAttributePoint,
    refundAttributePoint,
    setCansaco,
    registerAbilityUse,
    useOfficialAbility,
    resetOfficialAbilityUse,
    startCombat,
    endCombat,
    advanceAbilityPeriod,
    spendTurnAction,
    adjustTurnActions,
    useOriginAbility,
    attemptGuardianRevestimento,
    rollThunganItem,
    setWerewolfForm,
    clearMetamorphForm,
    applyVampireLifesteal,
    rollDeathSave,
    reviveCharacter,
    performRest,
    exportChar,
    importChar,
    addInventoryItem,
    addCustomInventoryItem,
    updateCustomInventoryItem,
    removeInventoryItem,
    equipItem,
    toggleEstado,
    consumeConcentration,
    togglePericia,
    derived,
  } = useCharacter();
  const importRef = useRef();

  const hpMaxTotal = derived.hpMaxTotal || char.hpMax;
  const hpPct = hpMaxTotal > 0 ? Math.max(0, Math.min(100, (char.hpAtual / hpMaxTotal) * 100)) : 0;
  const hpColor = hpPct > 60 ? '#16a34a' : hpPct > 25 ? '#d97706' : '#dc2626';

  const handleLevelUp = () => {
    const result = levelUp();
    if (result.ok) setActiveTab('dados');
    return result;
  };

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
            <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-heading)', color: hpColor, whiteSpace: 'nowrap' }}>❤️ {char.hpAtual}/{hpMaxTotal}</div>
            {derived.isCansado && <div className="nav-fatigue-pill">CANSADO</div>}
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

      {(derived.isMorrendo || derived.isDead || derived.isCansado || char.abilityTimeline?.combatActive) && (
        <div className="runtime-sticky-stack">
          {(derived.isMorrendo || derived.isDead) && (
            <div className={`global-death-alert ${derived.isDead ? 'dead' : ''}`} role="alert" aria-live="assertive">
              <span className="global-death-alert-icon">✚</span>
              <strong>{derived.isDead ? 'MORTO' : 'MORRENDO'}</strong>
              <span>{derived.isDead ? '3 FALHAS REGISTRADAS · MORTE CONFIRMADA' : 'TESTE DE VONTADE DISPONÍVEL · 1D20 NATURAL'}</span>
              {!derived.isDead && <small>✓ {derived.deathSaveState?.successes || 0}/3 · × {derived.deathSaveState?.failures || 0}/3 · HP {char.hpAtual}/{hpMaxTotal}</small>}
              {derived.isDead && <small>RESSURREIÇÃO EXPLÍCITA NECESSÁRIA</small>}
              <button type="button" className="global-death-alert-action" onClick={() => setActiveTab('dados')}>{derived.isDead ? 'VER ESTADO' : 'GIRAR TESTE'}</button>
            </div>
          )}
          {derived.isCansado && (
            <div className="global-fatigue-alert" role="alert" aria-live="assertive">
              <span className="global-fatigue-alert-icon">!</span>
              <strong>CANSADO</strong>
              <span>BÔNUS DE ACERTO DA SHIKATA DESATIVADO</span>
              <small>Cansaço {derived.cansacoAtual}/{derived.limiteCansacoTotal}</small>
            </div>
          )}
          <TurnActionHud char={char} derived={derived} spendTurnAction={spendTurnAction} adjustTurnActions={adjustTurnActions} />
        </div>
      )}

      {/* Page content */}
      <main className="page">
        {/* Character title bar */}
        {char.name && (
          <div className="ornamental-header" style={{ marginBottom: 16 }}>
            <h1 style={{ color: 'var(--ink-dark)' }}>{char.name}</h1>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', color: 'var(--ink-faded)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>
              {[char.origem && ORIGIN_NAME(char.origem), (derived.learnedShikatas || []).length > 1 ? (derived.learnedShikatas || []).map(item => `${item.name} ${item.nivel}`).join(' / ') : char.shikata && `${SHIKATA_NAME(char.shikata)} ${derived.activeShikataLevel || 1}`, char.nivel && `Nível acumulado ${char.nivel}`].filter(Boolean).join(' • ')}
            </div>
          </div>
        )}

        <section key={activeTab} className="tab-transition" aria-live="polite">
          {activeTab === 'identidade' && <TabIdentidade char={char} update={update} onLevelUp={handleLevelUp} learnShikata={learnShikata} setActiveShikata={setActiveShikata} setShikataLevel={setShikataLevel} chooseSubclass={chooseSubclass} derived={derived} useOriginAbility={useOriginAbility} attemptGuardianRevestimento={attemptGuardianRevestimento} rollThunganItem={rollThunganItem} setWerewolfForm={setWerewolfForm} clearMetamorphForm={clearMetamorphForm} applyVampireLifesteal={applyVampireLifesteal} />}
          {activeTab === 'atributos' && <TabAtributos char={char} update={update} updateAttr={updateAttr} derived={derived} toggleEstado={toggleEstado} consumeConcentration={consumeConcentration} togglePericia={togglePericia} spendAttributePoint={spendAttributePoint} refundAttributePoint={refundAttributePoint} setCansaco={setCansaco} />}
          {activeTab === 'dados' && <TabDados char={char} update={update} derived={derived} spendTurnAction={spendTurnAction} rollDeathSave={rollDeathSave} reviveCharacter={reviveCharacter} />}
          {activeTab === 'habilidades' && <TabHabilidades char={char} update={update} derived={derived} chooseSubclass={chooseSubclass} useOfficialAbility={useOfficialAbility} resetOfficialAbilityUse={resetOfficialAbilityUse} advanceAbilityPeriod={advanceAbilityPeriod} startCombat={startCombat} endCombat={endCombat} />}
          {activeTab === 'inventario' && <TabInventario char={char} derived={derived} addInventoryItem={addInventoryItem} addCustomInventoryItem={addCustomInventoryItem} updateCustomInventoryItem={updateCustomInventoryItem} removeInventoryItem={removeInventoryItem} equipItem={equipItem} />}
          {activeTab === 'magias' && <TabMagias char={char} update={update} derived={derived} registerAbilityUse={registerAbilityUse} spendTurnAction={spendTurnAction} performRest={performRest} />}
          {activeTab === 'notas' && <TabNotas char={char} update={update} />}
        </section>
      </main>

      <SubclassEventOverlay
        event={char.pendingSubclassChoice}
        onChoose={chooseSubclass}
        onDismiss={dismissSubclassEvent}
      />

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
