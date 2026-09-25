import { useState } from 'react';
import RestHealingOverlay from './RestHealingOverlay';
import DiceStage3D from './DiceStage3D';
import { DAMAGE_SCALINGS, DAMAGE_TYPES, buildCustomDamageRoll, damageTypeLabel, validateDamageFormula } from '../data/damageRuntime';
import { pushDiceHistory } from '../data/diceRuntime';

import TalosIcon from './TalosIcon';
import InfoTip from './InfoTip';
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


const POWER_TYPE_LABELS = {
  magia: 'Magia',
  habilidade: 'Habilidade',
  passiva: 'Passiva',
  ritual: 'Ritual',
};

function powerKind(power = {}) {
  if (power.tipo === 'passiva') return 'passiva';
  if (power.actionType === 'reaction') return 'reacao';
  if (power.actionType === 'bonus') return 'bonus';
  return 'ativa';
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
    <div className="stack powers-page-stack">
      <div className="card powers-register-card">
        <div className="card-header powers-section-header">
          <TalosIcon name="powers" size={18} />
          <div className="powers-section-title">
            <h3>Grimório de Poderes</h3>
            <small>{habilidades.length} {habilidades.length === 1 ? 'registro manual' : 'registros manuais'}</small>
          </div>
          <InfoTip title="Poderes manuais" align="end" label="Sobre os poderes manuais">
            Esta página guarda poderes, rituais e habilidades adicionados manualmente pelo jogador. As habilidades oficiais da Shikata continuam na página Habilidades e não são duplicadas aqui.
          </InfoTip>
          <button className="btn btn-secondary btn-sm powers-new-button" onClick={() => showForm ? closeForm() : openNew()}>
            <TalosIcon name={showForm ? 'reset' : 'upgrade'} size={14} />
            {showForm ? 'Cancelar edição' : 'Novo poder'}
          </button>
        </div>
        <div className="card-body powers-register-body">
          {showForm && (
            <section className="power-editor-sheet" aria-label={editingId ? 'Editar poder' : 'Novo poder'}>
              <div className="power-editor-heading">
                <div>
                  <span>{editingId ? 'REGISTRO EM EDIÇÃO' : 'NOVO REGISTRO'}</span>
                  <strong>{editingId ? 'Editar Habilidade / Poder' : 'Registrar Habilidade / Poder'}</strong>
                </div>
                <TalosIcon name="book" size={20} />
              </div>

              <div className="grid2 power-editor-grid">
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

              <div className="grid2 power-editor-grid">
                <div className="field">
                  <label>Escola</label>
                  <select value={novaHabilidade.escola} onChange={e => setNovaHabilidade(p => ({ ...p, escola: e.target.value }))}>
                    {SPELL_SCHOOLS.map(school => <option key={school} value={school}>{school}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label className="field-label-with-info">
                    <span>Usos máximos</span>
                    <InfoTip title="Controle de usos" label="Sobre usos máximos">Use 0 quando o poder não possuir um limite de usos controlado por esta ficha.</InfoTip>
                  </label>
                  <input type="number" min={0} value={novaHabilidade.maxUsos}
                    onChange={e => setNovaHabilidade(p => ({ ...p, maxUsos: Number(e.target.value) }))} />
                </div>
              </div>

              <div className="field">
                <label className="field-label-with-info">
                  <span>Custo no turno</span>
                  <InfoTip title="Economia de ações" label="Sobre o custo no turno">
                    O poder só será executado quando houver ações suficientes. Reações são registradas, mas o TALOS v6 não define um limite global de reações por turno.
                  </InfoTip>
                </label>
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
              </div>

              <div className="power-damage-box power-damage-editor">
                <div className="power-damage-box-title">
                  <TalosIcon name="dice" size={15} />
                  <span>Dano automatizado</span>
                  <InfoTip title="Rolagem automática" align="end" label="Sobre o dano automatizado">
                    Exemplo: 2d8 + Mod. Força. Ao usar o poder, a ficha resolve o modificador atual e rola os dados na cena 3D automaticamente.
                  </InfoTip>
                </div>
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
              </div>

              <div className="field">
                <label>Descrição / Efeito</label>
                <textarea value={novaHabilidade.desc} onChange={e => setNovaHabilidade(p => ({ ...p, desc: e.target.value }))}
                  placeholder="Alcance, efeito, duração, condição..." rows={3} />
              </div>

              {formError && <div className="ability-runtime-warning power-form-warning">{formError}</div>}
              <div className="power-editor-actions">
                <button className="btn btn-secondary btn-sm" onClick={closeForm}>Cancelar</button>
                <button className="btn btn-primary btn-sm" onClick={saveHabilidade}>{editingId ? 'Salvar alterações' : 'Adicionar ao grimório'}</button>
              </div>
            </section>
          )}

          {runtimeError && (
            <div className="ability-runtime-feedback error powers-runtime-feedback">
              <span>!</span>
              <div><strong>Não foi possível concluir</strong><p>{runtimeError}</p></div>
              <button type="button" onClick={() => setRuntimeError('')} aria-label="Fechar aviso">×</button>
            </div>
          )}

          {habilidades.length === 0 ? (
            <div className="ability-empty-state powers-empty-state">
              <TalosIcon name="powers" size={38} />
              <h3>Grimório vazio</h3>
              <p>Registre aqui poderes, rituais ou habilidades que não fazem parte do catálogo oficial da Shikata.</p>
            </div>
          ) : (
            <div className="power-entry-list">
              {habilidades.map(h => {
                const usosLeft = h.maxUsos > 0 ? h.maxUsos - (h.usos || 0) : null;
                const esgotada = usosLeft !== null && usosLeft <= 0;
                const scalingLabel = DAMAGE_SCALINGS.find(option => option.value === h.damageScaling)?.label;
                const kind = powerKind(h);
                const longDescription = (h.desc || '').length > 190;
                const actionUnavailable = h.tipo !== 'passiva' && (
                  ((h.actionType || 'full') === 'full' && (derived.turnEconomy?.fullRemaining || 0) < Math.max(1, Number(h.actionCost) || 1))
                  || (h.actionType === 'bonus' && (derived.turnEconomy?.bonusRemaining || 0) < Math.max(1, Number(h.actionCost) || 1))
                );

                return (
                  <article key={h.id} className={`habilidade-row power-entry ability-kind-${kind} ${esgotada ? 'depleted' : ''}`}>
                    <div className="power-entry-heading">
                      <div className="power-entry-title-block">
                        <div className="ability-entry-meta">
                          <span className={`ability-type-badge ${kind}`}>{POWER_TYPE_LABELS[h.tipo] || h.tipo}</span>
                          <span className="power-school-badge">{h.escola}</span>
                          {h.maxUsos > 0 && <span className={`ability-uses-badge ${esgotada ? 'depleted' : ''}`}>{usosLeft}/{h.maxUsos} usos</span>}
                        </div>
                        <h4 className="habilidade-nome">{h.nome}</h4>
                      </div>
                      {longDescription && (
                        <InfoTip title={h.nome} align="end" label={`Ver descrição completa de ${h.nome}`}>
                          {h.desc}
                        </InfoTip>
                      )}
                    </div>

                    {h.desc && <p className={`habilidade-desc power-entry-description ${longDescription ? 'is-long' : ''}`}>{h.desc}</p>}

                    <div className="power-runtime-facts">
                      {h.tipo !== 'passiva' && (
                        <span className="ability-runtime-pill action"><TalosIcon name="clock" size={12} /> {actionLabel(h)}</span>
                      )}
                      {h.damageFormula && <span className="ability-runtime-pill ability-damage-pill"><TalosIcon name="dice" size={13} /> {h.damageFormula}</span>}
                      {h.damageType && <span className="ability-runtime-pill power-damage-type">{damageTypeLabel(h.damageType)}</span>}
                      {h.damageScaling && <span className="ability-runtime-pill power-scaling-pill">Escala: {scalingLabel}</span>}
                      {h.tipo === 'passiva' && <span className="ability-runtime-pill ready">Sempre ativa</span>}
                    </div>

                    <div className="power-entry-control">
                      <div className="power-use-meter">
                        <span>CONTROLE DE USO</span>
                        {h.maxUsos > 0 ? (
                          <div className="power-use-pips" aria-label={`${h.usos || 0} de ${h.maxUsos} usos consumidos`}>
                            {Array.from({ length: h.maxUsos }, (_, i) => (
                              <i key={i} className={i < (h.usos || 0) ? 'spent' : ''} />
                            ))}
                          </div>
                        ) : (
                          <strong>Sem limite cadastrado</strong>
                        )}
                      </div>

                      <div className="power-entry-actions">
                        {h.tipo !== 'passiva' && (
                          <button className="btn btn-primary btn-sm" onClick={() => usarHabilidade(h.id)} disabled={esgotada || actionUnavailable}>
                            <TalosIcon name={h.damageFormula ? 'dice' : 'powers'} size={14} />
                            {h.damageFormula ? 'Usar + dano' : 'Usar'}
                          </button>
                        )}
                        <button className="btn btn-secondary btn-sm" onClick={() => openEdit(h)}>Editar</button>
                        {h.maxUsos > 0 && h.usos > 0 && (
                          <button className="btn btn-secondary btn-sm" onClick={() => resetUsos(h.id)} title="Zerar contador de usos">
                            <TalosIcon name="reset" size={14} /> Zerar usos
                          </button>
                        )}
                        <button className="btn btn-danger btn-sm" onClick={() => removeHabilidade(h.id)}>Remover</button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="card rest-ledger-card">
        <div className="card-header powers-section-header">
          <TalosIcon name="rest" size={18} />
          <div className="powers-section-title">
            <h3>Descanso</h3>
            <small>Recuperação e reset de recursos</small>
          </div>
          <InfoTip title="Regras de descanso" align="end" label="Sobre descansos">
            Ambos os descansos recuperam o estado CANSADO. O curto cura 20% da vida máxima; o longo restaura 100% da vida e também reseta os usos dos poderes manuais desta página. Apenas 1 descanso longo por dia.
          </InfoTip>
        </div>
        <div className="card-body rest-ledger-body">
          <div className="rest-option-grid">
            <button type="button" className="rest-option short" onClick={() => descansar('short')}>
              <TalosIcon name="rest" size={20} />
              <span><small>1 HORA</small><strong>Descanso Curto</strong><em>+20% da vida máxima</em></span>
            </button>
            <button type="button" className="rest-option long" onClick={() => descansar('long')}>
              <TalosIcon name="moon" size={20} />
              <span><small>8 HORAS</small><strong>Descanso Longo</strong><em>HP pleno + reset de usos manuais</em></span>
            </button>
          </div>
          <div className="rest-status-line">
            <span className={`rest-status-chip ${derived?.isCansado ? 'danger' : ''}`}>Cansaço <strong>{derived?.cansacoAtual || 0}/{derived?.limiteCansacoTotal || 0}</strong></span>
            {derived?.isCansado && <span className="rest-status-chip danger">CANSADO · bônus de acerto desativado</span>}
          </div>
        </div>
      </div>

      <div className="card arcane-notes-card">
        <div className="card-header powers-section-header">
          <TalosIcon name="notes" size={18} />
          <div className="powers-section-title">
            <h3>Notas Arcanas</h3>
            <small>Anotações livres do personagem</small>
          </div>
        </div>
        <div className="card-body arcane-notes-body">
          <textarea value={char.notasMagia || ''} onChange={e => update('notasMagia', e.target.value)}
            placeholder="Magias aprendidas, combinações, rituais conhecidos, notas de poderes..."
            rows={6} />
        </div>
      </div>
      <DiceStage3D result={damageRoll} showDock={false} />
      <RestHealingOverlay scene={restScene} onDone={() => setRestScene(null)} />
    </div>
  );
}
