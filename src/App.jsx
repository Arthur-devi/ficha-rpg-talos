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
import TalosIcon from './components/TalosIcon';
import PeriodTransitionOverlay from './components/PeriodTransitionOverlay';
import { ORIGENS, SHIKATAS } from './data/system';

const TABS = [
  { id: 'identidade', label: 'Personagem', short: 'Personagem', icon: 'character' },
  { id: 'atributos', label: 'Atributos', short: 'Atributos', icon: 'attributes' },
  { id: 'dados', label: 'Dados', short: 'Dados', icon: 'dice' },
  { id: 'habilidades', label: 'Habilidades', short: 'Técnicas', icon: 'abilities' },
  { id: 'inventario', label: 'Equipamentos', short: 'Itens', icon: 'inventory' },
  { id: 'magias', label: 'Poderes', short: 'Poderes', icon: 'powers' },
  { id: 'notas', label: 'Diário', short: 'Diário', icon: 'journal' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('identidade');
  const [periodScene, setPeriodScene] = useState(null);
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
  const activeTabIndex = Math.max(0, TABS.findIndex(tab => tab.id === activeTab));
  const activeTabConfig = TABS[activeTabIndex] || TABS[0];

  const navigateToTab = nextTab => {
    if (!nextTab || nextTab === activeTab) return;
    const nextIndex = TABS.findIndex(tab => tab.id === nextTab);
    if (nextIndex < 0) return;

    // A troca V11.9 é intencionalmente direta: sem lâmina de pergaminho e sem
    // transformar a página inteira. O scroll volta ao topo antes do novo conteúdo
    // para evitar paint em uma posição vertical herdada de páginas longas.
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }

    setActiveTab(nextTab);
  };

  const handleLevelUp = () => {
    const result = levelUp();
    if (result.ok) navigateToTab('dados');
    return result;
  };

  const showPeriodScene = scene => setPeriodScene({ id: `${Date.now()}-${scene.label}`, ...scene });

  const handleStartCombat = () => {
    const before = Math.max(0, Number(char.abilityTimeline?.combat) || 0);
    const result = startCombat?.();
    if (!result?.ok) return result;
    showPeriodScene({
      iconName: 'combat',
      kicker: 'SESSÃO DE COMBATE',
      label: 'COMBATE INICIADO',
      before,
      after: before + 1,
      detail: 'Turno 1 aberto. A economia de ações está ativa.',
    });
    return result;
  };

  const handleEndCombat = () => {
    const combat = Math.max(1, Number(char.abilityTimeline?.combat) || 1);
    const before = Math.max(1, Number(char.abilityTimeline?.turn) || 1);
    const result = endCombat?.();
    if (!result?.ok) return result;
    showPeriodScene({
      iconName: 'combat',
      kicker: `COMBATE ${combat}`,
      label: 'COMBATE ENCERRADO',
      before,
      after: '—',
      detail: 'A economia de ações foi desativada. Usos ligados ao fim do combate foram atualizados.',
    });
    return result;
  };

  const handleAdvanceSidebarPeriod = key => {
    const labels = {
      day: { label: 'NOVO DIA', iconName: 'sun', counter: 'day' },
      week: { label: 'NOVA SEMANA', iconName: 'calendar', counter: 'week' },
      month: { label: 'NOVO MÊS', iconName: 'moon', counter: 'month' },
    };
    const config = labels[key];
    if (!config) return null;
    const before = Math.max(1, Number(char.abilityTimeline?.[config.counter]) || 1);
    const result = advanceAbilityPeriod?.(key);
    if (result && result.ok === false) return result;
    showPeriodScene({
      iconName: config.iconName,
      kicker: 'TEMPO AVANÇOU',
      label: config.label,
      before,
      after: before + 1,
      detail: 'Recargas e limites vinculados a este período foram atualizados.',
    });
    return result;
  };

  return (
    <div className="talos-app-shell">
      {/* V11.2 — fixed character-sheet page rail */}
      <aside className="sheet-sidebar" aria-label="Páginas da ficha">
        <div className="sheet-sidebar-brand">
          <div className="sheet-sidebar-sigil" aria-hidden="true">T</div>
          <div>
            <strong>TALOS</strong>
            <small>Ficha de Personagem</small>
          </div>
        </div>

        {char.name && (
          <div className="sheet-sidebar-character">
            <div className="sheet-sidebar-character-name" title={char.name}>{char.name}</div>
            <div className="sheet-sidebar-vitals">
              <span><TalosIcon name="heart" size={14} /> {char.hpAtual}/{hpMaxTotal}</span>
              {derived.isCansado && <b>CANSADO</b>}
            </div>
            <div className="sheet-sidebar-hp-track" aria-hidden="true">
              <span style={{ width: `${hpPct}%`, background: hpColor }} />
            </div>
          </div>
        )}

        <div className="sheet-sidebar-caption">Páginas</div>
        <nav className="sheet-sidebar-nav">
          {TABS.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              className={`sheet-nav-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => navigateToTab(tab.id)}
              aria-current={activeTab === tab.id ? 'page' : undefined}
              title={tab.label}
            >
              <span className="sheet-nav-index">{String(index + 1).padStart(2, '0')}</span>
              <TalosIcon name={tab.icon} size={20} />
              <span className="sheet-nav-label">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="sheet-sidebar-session">
          {char.abilityTimeline?.combatActive ? (
            <div className="sheet-combat-status active">
              <TalosIcon name="combat" size={18} />
              <div>
                <small>COMBATE ATIVO</small>
                <strong>Combate {char.abilityTimeline?.combat || 1} · Turno {char.abilityTimeline?.turn || 1}</strong>
              </div>
            </div>
          ) : (
            <button type="button" className="sheet-combat-start" onClick={handleStartCombat}>
              <TalosIcon name="combat" size={18} />
              <span>Iniciar combate</span>
            </button>
          )}
          <div className="sheet-time-grid" aria-label="Avanço de tempo">
            <button type="button" onClick={() => handleAdvanceSidebarPeriod('day')} title="Novo dia">
              <TalosIcon name="sun" size={15} /><span>Dia</span><b>{char.abilityTimeline?.day || 1}</b>
            </button>
            <button type="button" onClick={() => handleAdvanceSidebarPeriod('week')} title="Nova semana">
              <TalosIcon name="calendar" size={15} /><span>Semana</span><b>{char.abilityTimeline?.week || 1}</b>
            </button>
            <button type="button" onClick={() => handleAdvanceSidebarPeriod('month')} title="Novo mês">
              <TalosIcon name="moon" size={15} /><span>Mês</span><b>{char.abilityTimeline?.month || 1}</b>
            </button>
          </div>
        </div>

        <div className="sheet-sidebar-spacer" />

        <div className="sheet-sidebar-actions">
          <input ref={importRef} type="file" accept=".json" style={{ display: 'none' }}
            onChange={e => { if (e.target.files[0]) { importChar(e.target.files[0]); e.target.value = ''; } }} />
          <button type="button" className="sheet-action-btn" onClick={() => importRef.current?.click()} title="Abrir ficha salva">
            <TalosIcon name="import" size={17} />
            <span>Abrir ficha</span>
          </button>
          <button type="button" className="sheet-action-btn primary" onClick={exportChar} title="Salvar ficha como JSON">
            <TalosIcon name="save" size={17} />
            <span>Salvar ficha</span>
          </button>
        </div>
        <div className="sheet-sidebar-version">V11.9.2 · Carteira bidirecional</div>
      </aside>

      <div className="sheet-content-column">

      {(derived.isMorrendo || derived.isDead || derived.isCansado || char.abilityTimeline?.combatActive) && (
        <div className="runtime-sticky-stack">
          {(derived.isMorrendo || derived.isDead) && (
            <div className={`global-death-alert ${derived.isDead ? 'dead' : ''}`} role="alert" aria-live="assertive">
              <span className="global-death-alert-icon">✚</span>
              <strong>{derived.isDead ? 'MORTO' : 'MORRENDO'}</strong>
              <span>{derived.isDead ? '3 FALHAS REGISTRADAS · MORTE CONFIRMADA' : 'TESTE DE VONTADE DISPONÍVEL · 1D20 NATURAL'}</span>
              {!derived.isDead && <small>✓ {derived.deathSaveState?.successes || 0}/3 · × {derived.deathSaveState?.failures || 0}/3 · HP {char.hpAtual}/{hpMaxTotal}</small>}
              {derived.isDead && <small>RESSURREIÇÃO EXPLÍCITA NECESSÁRIA</small>}
              <button type="button" className="global-death-alert-action" onClick={() => navigateToTab('dados')}>{derived.isDead ? 'VER ESTADO' : 'GIRAR TESTE'}</button>
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
          <TurnActionHud char={char} derived={derived} spendTurnAction={spendTurnAction} adjustTurnActions={adjustTurnActions} advanceAbilityPeriod={advanceAbilityPeriod} endCombat={handleEndCombat} />
        </div>
      )}

      {/* Page content */}
      <main
        key={activeTab}
        className={`page page-${activeTab}`}
        data-page-index={activeTabIndex + 1}
      >
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
          {activeTab === 'habilidades' && <TabHabilidades char={char} update={update} derived={derived} chooseSubclass={chooseSubclass} useOfficialAbility={useOfficialAbility} resetOfficialAbilityUse={resetOfficialAbilityUse} />}
          {activeTab === 'inventario' && <TabInventario char={char} derived={derived} addInventoryItem={addInventoryItem} addCustomInventoryItem={addCustomInventoryItem} updateCustomInventoryItem={updateCustomInventoryItem} removeInventoryItem={removeInventoryItem} equipItem={equipItem} />}
          {activeTab === 'magias' && <TabMagias char={char} update={update} derived={derived} registerAbilityUse={registerAbilityUse} spendTurnAction={spendTurnAction} performRest={performRest} />}
          {activeTab === 'notas' && <TabNotas char={char} update={update} />}
        </section>

        <div className="sheet-page-folio" aria-hidden="true">
          <span>{String(activeTabIndex + 1).padStart(2, '0')} / {String(TABS.length).padStart(2, '0')}</span>
          <small>{activeTabConfig.label}</small>
        </div>
      </main>

      </div>
      <SubclassEventOverlay
        event={char.pendingSubclassChoice}
        onChoose={chooseSubclass}
        onDismiss={dismissSubclassEvent}
      />
      <PeriodTransitionOverlay scene={periodScene} onDone={() => setPeriodScene(null)} />

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
