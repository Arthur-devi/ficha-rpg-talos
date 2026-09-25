import { useState } from 'react';
import RestHealingOverlay from './RestHealingOverlay';
import DiceStage3D from './DiceStage3D';
import { DAMAGE_SCALINGS, DAMAGE_TYPES, buildCustomDamageRoll, damageTypeLabel, validateDamageFormula } from '../data/damageRuntime';
import { pushDiceHistory } from '../data/diceRuntime';

const SPELL_SCHOOLS = ['Fogo', 'Gelo', 'Raio', 'Necromancia', 'Arcano', 'Cura', 'Ilusão', 'Invocação', 'Transmutação', 'Abjuração', 'Outro'];
const ACTION_OPTIONS = [
  { value: 'full:1', type: 'full', cost: 1, label: '1 ação completa' },
  { value: 'full:2', type: 'full', cost: 2, label: '2 ações completas' },
  { value: 'bonus:1', type: 'bonus', cost: 1, label: '1 ação bônus' },
  { value: 'reaction:0', type: 'reaction', cost: 0, label: 'Reação' },
  { value: 'free:0', type: 'free', cost: 0, label: 'Sem ação' },
];

function actionLabel(power = {}) {
  if (power.tipo === 'passiva') return 'Passiva';
  const found = ACTION_OPTIONS.find(option => option.type === power.actionType && option.cost === Number(power.actionCost || 0));
  return found?.label || '1 ação completa';
}

const EMPTY_POWER = {
  nome: '',
  escola: 'Arcano',
  desc: '',
  usos: 0,
  maxUsos: 0,
  tipo: 'magia',
  damageFormula: '',
  damageType: '',
  damageScaling: '',
  actionType: 'full',
  actionCost: 1,
};

function normalizedPower(power = {}) {
  const merged = { ...EMPTY_POWER, ...power, usos: Number(power.usos) || 0, maxUsos: Number(power.maxUsos) || 0 };
  if (merged.tipo === 'passiva') { merged.actionType = 'free'; merged.actionCost = 0; }
  return merged;
}

export default function TabMagias({ char, update, derived, registerAbilityUse, spendTurnAction, performRest }) {
  const [novaHabilidade, setNovaHabilidade] = useState(EMPTY_POWER);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState('');
  const [runtimeError, setRuntimeError] = useState('');
  const [damageRoll, setDamageRoll] = useState(null);
  const [restScene, setRestScene] = useState(null);

  const habilidades = char.habilidadesMagicas || [];

  const resetForm = () => {
    setNovaHabilidade(EMPTY_POWER);
    setEditingId(null);
    setFormError('');
  };

  const closeForm = () => {
    resetForm();
    setShowForm(false);
  };

  const openNew = () => {
    resetForm();
    setShowForm(true);
  };

  const openEdit = (power) => {
    setNovaHabilidade(normalizedPower(power));
    setEditingId(power.id);
    setFormError('');
    setShowForm(true);
  };

  const saveHabilidade = () => {
    if (!novaHabilidade.nome.trim()) {
      setFormError('Informe o nome do poder.');
      return;
    }
    const validation = validateDamageFormula(novaHabilidade.damageFormula);
    if (!validation.ok) {
      setFormError(`Dados de dano: ${validation.message}`);
      return;
    }

    const payload = {
      ...normalizedPower(novaHabilidade),
      nome: novaHabilidade.nome.trim(),
      desc: novaHabilidade.desc.trim(),
      damageFormula: novaHabilidade.damageFormula.trim(),
      usos: editingId ? Number(novaHabilidade.usos) || 0 : 0,
    };

    if (editingId) {
      update('habilidadesMagicas', habilidades.map(h => h.id === editingId ? { ...h, ...payload, id: h.id } : h));
    } else {
      update('habilidadesMagicas', [...habilidades, { ...payload, id: Date.now() }]);
    }
    closeForm();
  };

  const removeHabilidade = (id) => {
    update('habilidadesMagicas', habilidades.filter(h => h.id !== id));
    if (editingId === id) closeForm();
  };

  const usarHabilidade = (id) => {
    const habilidade = habilidades.find(h => h.id === id);
    if (!habilidade) return;
    const usosLeft = habilidade.maxUsos > 0 ? habilidade.maxUsos - (habilidade.usos || 0) : null;
    if (usosLeft !== null && usosLeft <= 0) return;

    setRuntimeError('');
    if (habilidade.tipo !== 'passiva') {
      const actionType = habilidade.actionType || 'full';
      const actionCost = actionType === 'full' || actionType === 'bonus' ? Math.max(1, Number(habilidade.actionCost) || 1) : 0;
      const actionResult = spendTurnAction?.(actionType, actionCost, habilidade.nome);
      if (actionResult && !actionResult.ok) {
        setRuntimeError(actionResult.message);
        return;
      }
    }
    update('habilidadesMagicas', habilidades.map(h => {
      if (h.id !== id) return h;
      const newUsos = Math.min((h.usos || 0) + 1, h.maxUsos || 99);
      return { ...h, usos: newUsos };
    }));
    if (habilidade.tipo !== 'passiva') registerAbilityUse?.();

    if (habilidade.tipo !== 'passiva' && habilidade.damageFormula) {
      try {
        const rolled = buildCustomDamageRoll(habilidade, derived);
        if (rolled) {
          setDamageRoll(rolled);
          update('diceHistory', pushDiceHistory(char.diceHistory, rolled));
        }
      } catch (error) {
        setRuntimeError(`O poder foi utilizado, mas o dano não pôde ser rolado: ${error.message || 'fórmula inválida'}.`);
      }
    }
  };

  const descansar = (type) => {
    const result = performRest?.(type);
    if (!result) return;
    if (result.ok === false) {
      setRuntimeError(result.message || 'Não foi possível realizar o descanso.');
      return;
    }
    setRuntimeError('');
    setRestScene({ ...result, id: `${Date.now()}-${type}` });
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
          <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }} onClick={() => showForm ? closeForm() : openNew()}>
            {showForm ? 'Cancelar' : '+ Novo Poder'}
          </button>
        </div>
        <div className="card-body">
          {showForm && (
            <div style={{ padding: 14, border: '1px dashed var(--parch-400)', borderRadius: 'var(--radius-md)', marginBottom: 16, background: 'rgba(253,246,227,0.4)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                {editingId ? 'Editar Habilidade / Poder' : 'Nova Habilidade / Poder'}
              </div>
              <div className="grid2">
                <div className="field">
                  <label>Nome</label>
                  <input value={novaHabilidade.nome} onChange={e => setNovaHabilidade(p => ({ ...p, nome: e.target.value }))} placeholder="Nome do poder..." />
                </div>
                <div className="field">
                  <label>Tipo</label>
                  <select value={novaHabilidade.tipo} onChange={e => setNovaHabilidade(p => {
                    const tipo = e.target.value;
                    if (tipo === 'passiva') return { ...p, tipo, actionType: 'free', actionCost: 0 };
                    if (p.tipo === 'passiva') return { ...p, tipo, actionType: 'full', actionCost: 1 };
                    return { ...p, tipo };
                  })}>
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
                <label>Custo no turno</label>
                <select
                  value={`${novaHabilidade.actionType || 'full'}:${Number(novaHabilidade.actionCost) || 0}`}
                  disabled={novaHabilidade.tipo === 'passiva'}
                  onChange={e => {
                    const option = ACTION_OPTIONS.find(item => item.value === e.target.value) || ACTION_OPTIONS[0];
                    setNovaHabilidade(p => ({ ...p, actionType: option.type, actionCost: option.cost }));
                  }}
                >
                  {ACTION_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                <small>O poder só será executado se houver ações suficientes. Reações são registradas, mas o TALOS v6 não define um limite global de reações por turno.</small>
              </div>

              <div className="power-damage-box">
                <div className="power-damage-box-title">⚔ Dano automatizado</div>
                <div className="grid3">
                  <div className="field">
                    <label>Dados de dano</label>
                    <input
                      value={novaHabilidade.damageFormula}
                      onChange={e => setNovaHabilidade(p => ({ ...p, damageFormula: e.target.value }))}
                      placeholder="Ex: 2d8+3"
                    />
                  </div>
                  <div className="field">
                    <label>Tipo de dano</label>
                    <select value={novaHabilidade.damageType} onChange={e => setNovaHabilidade(p => ({ ...p, damageType: e.target.value }))}>
                      {DAMAGE_TYPES.map(type => <option key={type.value || 'none'} value={type.value}>{type.label}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>Escalonamento</label>
                    <select value={novaHabilidade.damageScaling} onChange={e => setNovaHabilidade(p => ({ ...p, damageScaling: e.target.value }))}>
                      {DAMAGE_SCALINGS.map(option => <option key={option.value || 'none'} value={option.value}>{option.label}</option>)}
                    </select>
                  </div>
                </div>
                <p style={{ marginTop: 8, fontSize: '0.72rem', color: 'var(--ink-faded)', lineHeight: 1.45 }}>
                  Exemplo: <strong>2d8</strong> + <strong>Mod. Força</strong>. Ao usar o poder, a ficha resolve o modificador atual e rola os dados na cena 3D automaticamente.
                </p>
              </div>

              <div className="field" style={{ marginTop: 10 }}>
                <label>Descrição / Efeito</label>
                <textarea value={novaHabilidade.desc} onChange={e => setNovaHabilidade(p => ({ ...p, desc: e.target.value }))}
                  placeholder="Alcance, efeito, duração, condição..." rows={2} />
              </div>
              {formError && <div className="ability-runtime-warning" style={{ marginTop: 10 }}>{formError}</div>}
              <div style={{ marginTop: 10, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary btn-sm" onClick={closeForm}>Cancelar</button>
                <button className="btn btn-primary btn-sm" onClick={saveHabilidade}>{editingId ? 'Salvar alterações' : 'Adicionar'}</button>
              </div>
            </div>
          )}

          {runtimeError && <div className="ability-runtime-feedback error" style={{ marginBottom: 12 }}><span>!</span><div><strong>Rolagem de dano</strong><p>{runtimeError}</p></div><button type="button" onClick={() => setRuntimeError('')}>×</button></div>}

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
                const scalingLabel = DAMAGE_SCALINGS.find(option => option.value === h.damageScaling)?.label;
                return (
                  <div key={h.id} style={{ border: `1px solid ${esgotada ? 'var(--parch-300)' : 'var(--parch-400)'}`, borderRadius: 'var(--radius-md)', padding: '12px 14px', opacity: esgotada ? 0.55 : 1, background: 'var(--parch-100)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: 'var(--ink-dark)' }}>{h.nome}</span>
                          <span className="badge" style={{ background: '#eff6ff', borderColor: '#93c5fd', color: '#1d4ed8' }}>{h.escola}</span>
                          <span className="badge" style={{ background: '#f5f3ff', borderColor: '#c4b5fd', color: '#7c3aed' }}>{h.tipo}</span>
                          {h.tipo !== 'passiva' && <span className="ability-runtime-pill action">⏱ {actionLabel(h)}</span>}
                          {h.maxUsos > 0 && <span style={{ fontSize: '0.72rem', color: esgotada ? 'var(--red-old)' : 'var(--ink-faded)', fontFamily: 'var(--font-heading)' }}>{usosLeft}/{h.maxUsos} usos</span>}
                        </div>
                        {(h.damageFormula || h.damageType || h.damageScaling) && (
                          <div className="power-damage-summary">
                            {h.damageFormula && <span className="ability-runtime-pill ability-damage-pill">🎲 {h.damageFormula}</span>}
                            {h.damageType && <span className="ability-runtime-pill">⚔ {damageTypeLabel(h.damageType)}</span>}
                            {h.damageScaling && <span className="ability-runtime-pill">↗ {scalingLabel}</span>}
                          </div>
                        )}
                        {h.desc && <p style={{ fontSize: '0.82rem', color: 'var(--ink-mid)', fontStyle: 'italic', lineHeight: 1.45, marginTop: 6 }}>{h.desc}</p>}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
                        <button className="btn btn-primary btn-sm" onClick={() => usarHabilidade(h.id)} disabled={esgotada || h.tipo === 'passiva' || ((h.actionType || 'full') === 'full' && (derived.turnEconomy?.fullRemaining || 0) < Math.max(1, Number(h.actionCost) || 1)) || (h.actionType === 'bonus' && (derived.turnEconomy?.bonusRemaining || 0) < Math.max(1, Number(h.actionCost) || 1))}>
                          {h.damageFormula && h.tipo !== 'passiva' ? '🎲 Usar + Dano' : 'Usar'}
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={() => openEdit(h)}>Editar</button>
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
            <button className="btn btn-secondary" onClick={() => descansar('short')}>
              ☀️ Descanso Curto (1h) - +20% HP
            </button>
            <button className="btn btn-primary" onClick={() => descansar('long')}>
              🌙 Descanso Longo (8h) - HP pleno e usos resetados
            </button>
          </div>
          <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <span className={`badge ${derived?.isCansado ? 'fatigue-danger' : ''}`}>Cansaço {derived?.cansacoAtual || 0}/{derived?.limiteCansacoTotal || 0}</span>
            {derived?.isCansado && <span className="badge fatigue-danger">CANSADO — bônus de acerto desativado</span>}
          </div>
          <p style={{ marginTop: 10, fontSize: '0.78rem', color: 'var(--ink-faded)', fontStyle: 'italic' }}>
            Ambos os descansos recuperam o estado CANSADO. O curto cura 20% da vida máxima; o longo restaura 100% da vida e também reseta os usos dos poderes manuais desta aba. Apenas 1 descanso longo por dia.
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
      <DiceStage3D result={damageRoll} showDock={false} />
      <RestHealingOverlay scene={restScene} onDone={() => setRestScene(null)} />
    </div>
  );
}
