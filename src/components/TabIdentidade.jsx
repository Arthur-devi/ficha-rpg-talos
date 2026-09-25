import { useState } from 'react';
import { ORIGENS, SHIKATAS, PROFISSOES, TENDENCIAS, getProfissaoData } from '../data/system';
import { DEFAULT_ORIGIN_STATE } from '../data/originRuntime';
import OriginRuntimePanel from './OriginRuntimePanel';
import { requirementForShikata } from '../data/multiclassRuntime';
import { professionChoiceSpec } from '../data/skillRuntime';

export default function TabIdentidade({ char, update, onLevelUp, learnShikata, setActiveShikata, setShikataLevel, chooseSubclass, derived, useOriginAbility, attemptGuardianRevestimento, rollThunganItem, setWerewolfForm, clearMetamorphForm, applyVampireLifesteal }) {
  const [levelUpMessage, setLevelUpMessage] = useState('');
  const [multiclassCandidate, setMulticlassCandidate] = useState('');
  const [multiclassConfirmed, setMulticlassConfirmed] = useState(false);
  const [multiclassMessage, setMulticlassMessage] = useState('');
  const origemData = ORIGENS.find(o => o.id === char.origem);
  const shikataData = SHIKATAS.find(s => s.id === char.shikata);
  const activeShikataLevel = Math.max(1, Number(derived.activeShikataLevel) || 1);
  const learnedShikatas = derived.learnedShikatas || [];
  const learnedIds = new Set((derived.learnedShikataIds || []));
  const unlearnedShikatas = SHIKATAS.filter(s => !learnedIds.has(s.id));
  const profissaoData = getProfissaoData(char.profissao);
  const professionChoice = professionChoiceSpec(char.profissao);
  const professionState = char.professionState || { oficioEspecialidades: [], oficioEspecialidade: '', atuacaoEspecialidade: '' };
  const handleOrigemChange = (value) => {
    update('origem', value);
    update('originState', { ...DEFAULT_ORIGIN_STATE, metamorphForms: DEFAULT_ORIGIN_STATE.metamorphForms.map(form => ({ ...form, effects: {} })) });
    update('deslocamento', 0);
    update('limiteCansaco', 0);
  };

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
              <label>Nível acumulado</label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input type="number" value={char.nivel} readOnly style={{ width: 78 }} title="Soma dos níveis das Shikatas aprendidas" />
                <button
                  className="btn btn-primary btn-sm"
                  type="button"
                  disabled={!char.shikata}
                  onClick={() => {
                    const result = onLevelUp?.();
                    if (!result) return;
                    setLevelUpMessage(result.ok
                      ? `${shikataData?.name || 'Shikata'} Nv. ${result.nextLevel}: +${result.pontosConcedidos} pontos distributivos${result.nextLevel > 1 ? '. Role a vida na aba Dados.' : '.'}`
                      : result.message);
                  }}
                >
                  ↑ Evoluir {shikataData?.name || 'Shikata'}
                </button>
              </div>
              <div style={{ marginTop: 5, fontSize: '0.7rem', color: 'var(--ink-faded)', lineHeight: 1.35 }}>
                No multiclasse, cada Shikata possui nível independente. O nível acumulado é a soma para referência geral; o botão evolui apenas a Shikata ativa.
              </div>
              {levelUpMessage && (
                <div style={{ marginTop: 6, fontSize: '0.72rem', color: levelUpMessage.includes('Selecione') ? '#b91c1c' : '#166534', fontFamily: 'var(--font-heading)', lineHeight: 1.35 }}>
                  {levelUpMessage}
                </div>
              )}
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

          {profissaoData && (
            <div style={{ marginTop: 12, padding: '10px 14px', background: 'rgba(253,246,227,0.55)', border: '1px solid var(--parch-300)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                Profissão escolhida
              </div>
              <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--ink-mid)', lineHeight: 1.5, marginBottom: 8 }}>
                {profissaoData.desc}
              </p>
              <div style={{ fontSize: '0.78rem', color: 'var(--ink-light)', fontFamily: 'var(--font-heading)', lineHeight: 1.45, marginBottom: 8 }}>
                Perícias: {profissaoData.texto}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: profissaoData.nota ? 8 : 0 }}>
                {(profissaoData.pericias || []).length > 0 ? profissaoData.pericias.map(pericia => (
                  <span key={pericia} className="badge" style={{ background: '#f8fafc', borderColor: 'var(--parch-400)', color: 'var(--ink-mid)' }}>
                    {pericia}
                  </span>
                )) : (
                  <span className="badge" style={{ background: 'transparent', borderColor: 'var(--parch-400)', color: 'var(--ink-faded)' }}>
                    Sem perícia fixa
                  </span>
                )}
              </div>
              {profissaoData.nota && (
                <div style={{ fontSize: '0.78rem', color: 'var(--ink-faded)', fontFamily: 'var(--font-heading)', lineHeight: 1.45 }}>
                  {profissaoData.nota}
                </div>
              )}
            </div>
          )}

          {professionChoice && (
            <div className="profession-choice-panel">
              <div className="profession-choice-title">
                <span>✦ ESCOLHA DA PROFISSÃO</span>
                <strong>{professionChoice.label}</strong>
              </div>

              {professionChoice.type === 'oficio-multi' && (
                <div className="profession-choice-options">
                  {professionChoice.options.map(option => {
                    const selected = (professionState.oficioEspecialidades || []).includes(option);
                    const maxed = !selected && (professionState.oficioEspecialidades || []).length >= professionChoice.max;
                    return (
                      <label key={option} className={`profession-choice-check ${selected ? 'selected' : ''} ${maxed ? 'disabled' : ''}`}>
                        <input
                          type="checkbox"
                          checked={selected}
                          disabled={maxed}
                          onChange={() => {
                            const current = professionState.oficioEspecialidades || [];
                            const next = selected ? current.filter(item => item !== option) : [...current, option].slice(0, professionChoice.max);
                            update('professionState.oficioEspecialidades', next);
                          }}
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                  <small>{(professionState.oficioEspecialidades || []).length}/{professionChoice.max} escolhidos.</small>
                </div>
              )}

              {professionChoice.type === 'oficio-single' && (
                <select value={professionState.oficioEspecialidade || ''} onChange={e => update('professionState.oficioEspecialidade', e.target.value)}>
                  <option value="">Escolha a especialidade...</option>
                  {professionChoice.options.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
              )}

              {professionChoice.type === 'atuacao-single' && (
                <select value={professionState.atuacaoEspecialidade || ''} onChange={e => update('professionState.atuacaoEspecialidade', e.target.value)}>
                  <option value="">Escolha a variação...</option>
                  {professionChoice.options.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
              )}

              {professionChoice.type === 'oficio-fixed' && (
                <div className="profession-fixed-choice">{professionChoice.value}</div>
              )}

              {professionChoice.type === 'amnestic' && (
                <div className="profession-amnestic-note">Use as perícias manuais da aba <strong>Atributos</strong> conforme o passado do personagem for revelado pelo Mestre.</div>
              )}

              <small className="profession-choice-note">{professionChoice.note}</small>
            </div>
          )}

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
            <select value={char.origem} onChange={e => handleOrigemChange(e.target.value)}>
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
                <span>🏃 Deslocamento: <strong>{origemData.deslocamento == null ? 'Não informado no v6' : `${origemData.deslocamento}sqm`}</strong></span>
                <span>⚡ Limite cansaço: <strong>{origemData.id === 'meio-orc' ? 'Dinâmico pela Fusão' : origemData.limiteCansaco == null ? 'Não informado no v6' : origemData.limiteCansaco}</strong></span>
                {origemData.altura && <span>📏 Altura média: <strong>{origemData.altura}</strong></span>}
                {origemData.carga && <span>🎒 Carga: <strong>{origemData.carga}</strong></span>}
              </div>
              <div style={{ padding: '8px 12px', background: 'rgba(253,246,227,0.6)', border: '1px solid var(--parch-300)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Habilidade Única</span>
                <p style={{ marginTop: 4, fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--ink-dark)' }}>{origemData.habilidade}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {origemData && (
        <OriginRuntimePanel
          char={char}
          derived={derived}
          update={update}
          useOriginAbility={useOriginAbility}
          attemptGuardianRevestimento={attemptGuardianRevestimento}
          rollThunganItem={rollThunganItem}
          setWerewolfForm={setWerewolfForm}
          clearMetamorphForm={clearMetamorphForm}
          applyVampireLifesteal={applyVampireLifesteal}
        />
      )}

      {/* Shikata */}
      <div className="card">
        <div className="card-header">
          <span>⚔️</span>
          <h3>Shikatas & Multiclasse</h3>
        </div>
        <div className="card-body">
          <div className="grid3" style={{ marginBottom: 12 }}>
            <div className="field">
              <label>Shikata ativa</label>
              <select
                value={char.shikata}
                onChange={e => {
                  const id = e.target.value;
                  if (!id) return;
                  if (learnedIds.has(id)) setActiveShikata?.(id);
                  else learnShikata?.(id);
                }}
              >
                <option value="">Selecione sua Shikata...</option>
                {(learnedShikatas.length ? learnedShikatas : SHIKATAS).map(s => (
                  <option key={s.id} value={s.id}>{s.name}{learnedShikatas.length ? ` — Nv. ${s.nivel}` : ''}</option>
                ))}
              </select>
              <small>Trocar a Shikata ativa muda apenas a classe exibida/operada. As demais continuam aprendidas.</small>
            </div>

            <div className="field">
              <label>Nível da Shikata ativa</label>
              <input
                type="number"
                min="1"
                max="30"
                value={char.shikata ? activeShikataLevel : 1}
                disabled={!char.shikata}
                onChange={e => char.shikata && setShikataLevel?.(char.shikata, Number(e.target.value))}
              />
              <small>Ajuste manual não concede pontos nem cria rolagem de HP. Para evolução normal use o botão “Evoluir”.</small>
            </div>

            <div className="field">
              <label>Subclasse {shikataData?.subclasseNivel ? `(Nível ${shikataData.subclasseNivel}+)` : ''}</label>
              <select
                value={derived.activeSubclass || ''}
                onChange={e => char.shikata && chooseSubclass?.(char.shikata, e.target.value)}
                disabled={!shikataData || shikataData.subclasses.length === 0 || activeShikataLevel < (shikataData?.subclasseNivel || 99)}
              >
                <option value="">{shikataData && activeShikataLevel >= (shikataData?.subclasseNivel || 99) ? 'Escolha subclasse...' : shikataData ? `Disponível no nível ${shikataData.subclasseNivel}` : 'Selecione Shikata primeiro'}</option>
                {shikataData?.subclasses.map(sc => <option key={sc} value={sc}>{sc}</option>)}
              </select>
              <small>Ao atingir o nível de especialização pela evolução normal, a escolha também aparece em uma Tela de Evento.</small>
            </div>
          </div>

          {learnedShikatas.length > 0 && (
            <div className="multiclass-learned-strip">
              {learnedShikatas.map(item => (
                <button
                  key={item.id}
                  type="button"
                  className={`multiclass-learned-chip ${char.shikata === item.id ? 'active' : ''}`}
                  onClick={() => setActiveShikata?.(item.id)}
                >
                  <strong>{item.name}</strong>
                  <span>Nv. {item.nivel}</span>
                  {item.subclasse && <small>{item.subclasse}</small>}
                </button>
              ))}
            </div>
          )}

          {shikataData && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: '0.82rem', color: 'var(--ink-mid)' }}>
                <span>🎲 Dado de vida pós nv.1: <strong>{shikataData.dadoVida}</strong></span>
                <span>📊 Modificador: <strong>{shikataData.modificador}</strong></span>
                <span>⚡ Dificuldade: <strong>{shikataData.dificuldade}</strong></span>
              </div>
              <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--ink-mid)', lineHeight: 1.5 }}>{shikataData.desc}</p>
              <div style={{ padding: '6px 12px', background: 'rgba(253,246,227,0.6)', border: '1px solid var(--parch-300)', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: 'var(--ink-light)' }}>
                ⚡ Poder: {shikataData.poder}
              </div>
            </div>
          )}

          {learnedShikatas.length > 0 && unlearnedShikatas.length > 0 && (
            <div className="multiclass-panel">
              <div className="multiclass-panel-title">
                <div>
                  <span>✦ MULTICLASSE</span>
                  <strong>Aprender outra Shikata</strong>
                </div>
                <small>A ficha não tenta adivinhar se o requisito narrativo foi cumprido; o jogador confirma conforme a mesa.</small>
              </div>
              <div className="grid2">
                <div className="field">
                  <label>Nova Shikata</label>
                  <select value={multiclassCandidate} onChange={e => { setMulticlassCandidate(e.target.value); setMulticlassConfirmed(false); setMulticlassMessage(''); }}>
                    <option value="">Selecione...</option>
                    {unlearnedShikatas.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                  </select>
                </div>
                <div className="multiclass-requirement">
                  <span>REQUISITO TALOS v6</span>
                  <strong>{multiclassCandidate ? requirementForShikata(multiclassCandidate) : 'Selecione uma Shikata para consultar o requisito.'}</strong>
                </div>
              </div>
              {multiclassCandidate && (
                <label className="multiclass-confirm">
                  <input type="checkbox" checked={multiclassConfirmed} onChange={e => setMulticlassConfirmed(e.target.checked)} />
                  <span>Confirmo que o requisito foi cumprido/validado pelo Mestre.</span>
                </label>
              )}
              <div className="multiclass-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!multiclassCandidate || !multiclassConfirmed}
                  onClick={() => {
                    const result = learnShikata?.(multiclassCandidate);
                    if (!result) return;
                    setMulticlassMessage(result.ok ? `${result.name} aprendida no nível 1 e definida como Shikata ativa.` : result.message);
                    if (result.ok) { setMulticlassCandidate(''); setMulticlassConfirmed(false); }
                  }}
                >
                  ✦ Aprender Shikata
                </button>
                <small>Aprender uma nova Shikata inicia essa classe no Nv. 1. A rolagem de vida ocorre somente ao evoluí-la para níveis pós-Nv.1.</small>
              </div>
              {multiclassMessage && <div className="multiclass-message">{multiclassMessage}</div>}
            </div>
          )}

          {learnedShikatas.length > 1 && (
            <div className="multiclass-rule-note">
              <strong>Regra de acerto multiclasse ativa:</strong> a partir da segunda Shikata, a aba D20 Dados oferece os modificadores das Shikatas aprendidas como alternativas. Eles não são somados entre si.
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
