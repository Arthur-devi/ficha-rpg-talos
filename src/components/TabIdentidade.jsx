import { useRef, useState } from 'react';
import { ORIGENS, SHIKATAS, PROFISSOES, TENDENCIAS, getProfissaoData } from '../data/system';
import { DEFAULT_ORIGIN_STATE } from '../data/originRuntime';
import OriginRuntimePanel from './OriginRuntimePanel';
import { requirementForShikata } from '../data/multiclassRuntime';
import { professionChoiceSpec } from '../data/skillRuntime';
import TalosIcon from './TalosIcon';
import InfoTip from './InfoTip';

function CharacterSilhouette() {
  return (
    <svg className="character-portrait-silhouette" viewBox="0 0 260 390" aria-hidden="true">
      <path d="M130 29c-29 0-49 23-49 55 0 22 10 42 26 52-7 12-20 20-36 29-26 14-38 40-43 72l-14 91h42l8-68 9 79h114l9-79 8 68h42l-14-91c-5-32-17-58-43-72-16-9-29-17-36-29 16-10 26-30 26-52 0-32-20-55-49-55z" />
      <path d="M75 174c15 28 32 42 55 42s40-14 55-42" fill="none" stroke="currentColor" strokeWidth="3" opacity=".28" />
      <path d="M89 339h82M61 328h138" fill="none" stroke="currentColor" strokeWidth="2" opacity=".16" />
    </svg>
  );
}

function StatSeal({ label, value, sub, tone = '' }) {
  return (
    <div className={`character-stat-seal ${tone ? `tone-${tone}` : ''}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      {sub && <small>{sub}</small>}
    </div>
  );
}

function compactAbilityName(text = '') {
  const [name] = String(text).split(':');
  return name?.trim() || 'Habilidade única';
}

export default function TabIdentidade({ char, update, onLevelUp, learnShikata, setActiveShikata, setShikataLevel, chooseSubclass, derived, useOriginAbility, attemptGuardianRevestimento, rollThunganItem, setWerewolfForm, clearMetamorphForm, applyVampireLifesteal }) {
  const [levelUpMessage, setLevelUpMessage] = useState('');
  const [multiclassCandidate, setMulticlassCandidate] = useState('');
  const [multiclassConfirmed, setMulticlassConfirmed] = useState(false);
  const [multiclassMessage, setMulticlassMessage] = useState('');
  const portraitInputRef = useRef(null);

  const origemData = ORIGENS.find(o => o.id === char.origem);
  const shikataData = SHIKATAS.find(s => s.id === char.shikata);
  const activeShikataLevel = Math.max(1, Number(derived.activeShikataLevel) || 1);
  const learnedShikatas = derived.learnedShikatas || [];
  const learnedIds = new Set((derived.learnedShikataIds || []));
  const unlearnedShikatas = SHIKATAS.filter(s => !learnedIds.has(s.id));
  const profissaoData = getProfissaoData(char.profissao);
  const professionChoice = professionChoiceSpec(char.profissao);
  const professionState = char.professionState || { oficioEspecialidades: [], oficioEspecialidade: '', atuacaoEspecialidade: '' };
  const hpMax = Math.max(1, Number(derived.hpMaxTotal) || 1);
  const hpCurrent = Math.max(0, Number(char.hpAtual) || 0);
  const fatigueLimit = Math.max(0, Number(derived.limiteCansacoTotal) || 0);
  const fatigueCurrent = Math.max(0, Number(derived.cansacoAtual) || 0);

  const handleOrigemChange = (value) => {
    update('origem', value);
    update('originState', { ...DEFAULT_ORIGIN_STATE, metamorphForms: DEFAULT_ORIGIN_STATE.metamorphForms.map(form => ({ ...form, effects: {} })) });
    update('deslocamento', 0);
    update('limiteCansaco', 0);
  };

  const handlePortraitUpload = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxWidth = 720;
        const maxHeight = 900;
        const scale = Math.min(1, maxWidth / Math.max(1, image.width), maxHeight / Math.max(1, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext('2d');
        if (!context) return;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        update('portrait', canvas.toDataURL('image/jpeg', 0.82));
      };
      image.src = String(reader.result || '');
    };
    reader.readAsDataURL(file);
  };

  const handleLevelUp = () => {
    const result = onLevelUp?.();
    if (!result) return;
    setLevelUpMessage(result.ok
      ? `${shikataData?.name || 'Shikata'} Nv. ${result.nextLevel}: +${result.pontosConcedidos} pontos distributivos${result.nextLevel > 1 ? '. Role a vida na página Dados.' : '.'}`
      : result.message);
  };

  return (
    <div className="character-page-stack">
      <section className="character-sheet-front" aria-labelledby="character-sheet-title">
        <div className="character-sheet-corner corner-a" aria-hidden="true" />
        <div className="character-sheet-corner corner-b" aria-hidden="true" />

        <header className="character-sheet-titlebar">
          <div className="character-name-field">
            <label htmlFor="character-name">Personagem</label>
            <input id="character-name" value={char.name} onChange={e => update('name', e.target.value)} placeholder="Nome do personagem" />
          </div>
          <div className="character-player-field">
            <label htmlFor="character-player">Jogador</label>
            <input id="character-player" value={char.player} onChange={e => update('player', e.target.value)} placeholder="Nome do jogador" />
          </div>
          <div className="character-level-seal" title="Soma dos níveis das Shikatas aprendidas">
            <span>Nível</span>
            <strong>{char.nivel || 1}</strong>
            <small>acumulado</small>
          </div>
        </header>

        <div className="character-sheet-meta-row">
          <div className="field character-line-field">
            <label>Profissão</label>
            <select value={char.profissao} onChange={e => update('profissao', e.target.value)}>
              <option value="">Selecione...</option>
              {PROFISSOES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="field character-line-field">
            <label>Tendência</label>
            <select value={char.tendencia} onChange={e => update('tendencia', e.target.value)}>
              <option value="">Selecione...</option>
              {TENDENCIAS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="field character-line-field">
            <label>Deus / Divindade</label>
            <input value={char.deus} onChange={e => update('deus', e.target.value)} placeholder="—" />
          </div>
          <div className="field character-line-field character-xp-field">
            <label>Experiência</label>
            <input type="number" min="0" value={char.xp} onChange={e => update('xp', Number(e.target.value))} />
          </div>
        </div>

        <div className="character-sheet-core">
          <aside className="character-vitals-column character-vitals-left" aria-label="Vitais do personagem">
            <StatSeal label="HP" value={`${hpCurrent}/${hpMax}`} sub={char.hpTemp > 0 ? `+${char.hpTemp} temp.` : 'vida'} tone="blood" />
            <StatSeal label="CA" value={derived.caTotal ?? 8} sub="armadura" />
            <StatSeal label="DEF" value={derived.attrsTotal?.defesa ?? 0} sub="defesa" />
          </aside>

          <div className="character-portrait-column">
            <input ref={portraitInputRef} className="character-portrait-input" type="file" accept="image/*" onChange={handlePortraitUpload} />
            <button type="button" className={`character-portrait-frame ${char.portrait ? 'has-image' : ''}`} onClick={() => portraitInputRef.current?.click()} title="Escolher retrato do personagem">
              <span className="character-portrait-ornament top" aria-hidden="true" />
              {char.portrait ? <img src={char.portrait} alt={`Retrato de ${char.name || 'personagem'}`} /> : <CharacterSilhouette />}
              {!char.portrait && (
                <span className="character-portrait-caption">
                  <TalosIcon name="character" size={14} />
                  Adicionar retrato
                </span>
              )}
            </button>
            {char.portrait && (
              <div className="character-portrait-actions" aria-label="Ações do retrato">
                <button type="button" className="character-portrait-action" onClick={() => portraitInputRef.current?.click()}><TalosIcon name="character" size={13} /> Trocar</button>
                <button type="button" className="character-portrait-action danger" onClick={() => update('portrait', '')}><TalosIcon name="reset" size={13} /> Remover</button>
              </div>
            )}
            <div className="character-active-class-ribbon">
              <span>{shikataData?.name || 'Shikata não escolhida'}</span>
              <strong>{shikataData ? `Nv. ${activeShikataLevel}` : '—'}</strong>
              {derived.activeSubclass && <small>{derived.activeSubclass}</small>}
            </div>
          </div>

          <aside className="character-vitals-column character-vitals-right" aria-label="Recursos do personagem">
            <StatSeal label="DESL" value={derived.deslocamentoTotal ?? 0} sub="sqm" />
            <StatSeal label="CANS" value={fatigueLimit > 0 ? `${fatigueCurrent}/${fatigueLimit}` : '—'} sub={derived.isCansado ? 'CANSADO' : 'limite'} tone={derived.isCansado ? 'danger' : ''} />
            <StatSeal label="INSP" value={char.inspiracao || 0} sub="inspiração" tone="gold" />
          </aside>
        </div>

        <div className="character-sheet-foundation">
          <div className="character-foundation-panel">
            <div className="character-foundation-heading">
              <TalosIcon name="origin" size={17} />
              <span>Origem</span>
            </div>
            <select value={char.origem} onChange={e => handleOrigemChange(e.target.value)}>
              <option value="">Selecione sua origem...</option>
              {ORIGENS.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>
            <div className="character-foundation-detail">
              <span>{origemData ? compactAbilityName(origemData.habilidade) : 'Bônus, limitações e herança'}</span>
              {origemData && <InfoTip align="end" title={origemData.name} label={`Detalhes da origem ${origemData.name}`}>{origemData.habilidade}</InfoTip>}
            </div>
          </div>

          <div className="character-foundation-panel main-class">
            <div className="character-foundation-heading">
              <TalosIcon name="abilities" size={17} />
              <span>Shikata ativa</span>
            </div>
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
            <div className="character-class-inline">
              <span>{shikataData?.modificador ? `Mod. ${shikataData.modificador}` : 'Modificador —'}</span>
              <span>{shikataData?.dadoVida ? `Vida ${shikataData.dadoVida}` : 'Dado de vida —'}</span>
            </div>
          </div>

          <div className="character-foundation-panel">
            <div className="character-foundation-heading">
              <TalosIcon name="progress" size={17} />
              <span>Subclasse</span>
            </div>
            <select
              value={derived.activeSubclass || ''}
              onChange={e => char.shikata && chooseSubclass?.(char.shikata, e.target.value)}
              disabled={!shikataData || shikataData.subclasses.length === 0 || activeShikataLevel < (shikataData?.subclasseNivel || 99)}
            >
              <option value="">{shikataData && activeShikataLevel >= (shikataData?.subclasseNivel || 99) ? 'Escolha subclasse...' : shikataData ? `Disponível no nível ${shikataData.subclasseNivel}` : 'Selecione Shikata'}</option>
              {shikataData?.subclasses.map(sc => <option key={sc} value={sc}>{sc}</option>)}
            </select>
            <button className="character-level-up" type="button" disabled={!char.shikata} onClick={handleLevelUp}>
              <TalosIcon name="upgrade" size={15} />
              Evoluir {shikataData?.name || 'Shikata'}
            </button>
          </div>
        </div>

        {levelUpMessage && <div className={`character-level-message ${levelUpMessage.includes('Selecione') ? 'error' : ''}`}>{levelUpMessage}</div>}
      </section>

      {profissaoData && (
        <section className="character-ledger-section profession-ledger">
          <header className="character-ledger-header">
            <TalosIcon name="skills" size={18} />
            <div><span>Profissão</span><strong>{char.profissao}</strong></div>
          </header>
          <div className="character-ledger-body">
            <p>{profissaoData.desc}</p>
            <div className="character-ledger-skill-line"><strong>Perícias:</strong> {profissaoData.texto}</div>
            <div className="character-ledger-badges">
              {(profissaoData.pericias || []).length > 0 ? profissaoData.pericias.map(pericia => <span key={pericia}>{pericia}</span>) : <span>Sem perícia fixa</span>}
            </div>
            {profissaoData.nota && <small>{profissaoData.nota}</small>}
          </div>
        </section>
      )}

      {professionChoice && (
        <section className="character-ledger-section profession-choice-ledger">
          <header className="character-ledger-header">
            <TalosIcon name="progress" size={18} />
            <div><span>Escolha da profissão</span><strong>{professionChoice.label}</strong></div>
          </header>
          <div className="character-ledger-body">
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
            {professionChoice.type === 'oficio-fixed' && <div className="profession-fixed-choice">{professionChoice.value}</div>}
            {professionChoice.type === 'amnestic' && <div className="profession-amnestic-note">Use as perícias manuais da página <strong>Atributos</strong> conforme o passado do personagem for revelado pelo Mestre.</div>}
            <small className="profession-choice-note">{professionChoice.note}</small>
          </div>
        </section>
      )}

      <section className="character-ledger-section origin-ledger">
        <header className="character-ledger-header">
          <TalosIcon name="origin" size={18} />
          <div><span>Herança</span><strong>{origemData?.name || 'Origem não escolhida'}</strong></div>
          {origemData && <InfoTip className="character-ledger-header-info" align="end" title={origemData.name} label={`Informações completas de ${origemData.name}`}>{origemData.habilidade}</InfoTip>}
        </header>
        <div className="character-ledger-body">
          {!origemData ? (
            <p className="character-ledger-muted">Escolha uma Origem na folha principal para revelar seus bônus e habilidade única.</p>
          ) : (
            <>
              <div className="character-origin-bonuses">
                {Object.entries(origemData.bonus).filter(([, value]) => value > 0).map(([key, value]) => <span className="positive" key={key}>+{value} {key}</span>)}
                {origemData.extra && <span className="positive">{origemData.extra}</span>}
                {Object.entries(origemData.malus || {}).filter(([, value]) => value < 0).map(([key, value]) => <span className="negative" key={key}>{value} {key}</span>)}
              </div>
              <div className="character-origin-facts">
                <span><TalosIcon name="movement" size={14} /> Deslocamento <strong className="semantic-value is-derived">{origemData.deslocamento == null ? 'não informado' : `${origemData.deslocamento}sqm`}</strong></span>
                <span><TalosIcon name="clock" size={14} /> Cansaço <strong className="semantic-value is-derived">{origemData.id === 'meio-orc' ? 'dinâmico' : origemData.limiteCansaco == null ? 'não informado' : origemData.limiteCansaco}</strong></span>
                {origemData.altura && <span><TalosIcon name="ruler" size={14} /> Altura <strong>{origemData.altura}</strong></span>}
                {origemData.carga && <span><TalosIcon name="inventory" size={14} /> Carga <strong>{origemData.carga}</strong></span>}
              </div>
              <div className="character-origin-ability-compact">
                <span>Habilidade única</span>
                <strong>{compactAbilityName(origemData.habilidade)}</strong>
                <InfoTip align="start" title={compactAbilityName(origemData.habilidade)} label={`Detalhes da habilidade ${compactAbilityName(origemData.habilidade)}`}>{origemData.habilidade}</InfoTip>
              </div>
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
            </>
          )}
        </div>
      </section>

      <section className="character-ledger-section shikata-ledger">
        <header className="character-ledger-header">
          <TalosIcon name="abilities" size={18} />
          <div><span>Shikatas & Multiclasse</span><strong>{learnedShikatas.length || 0} aprendida(s)</strong></div>
          {shikataData && (
            <InfoTip className="character-ledger-header-info" align="end" title={shikataData.name} label={`Descrição de ${shikataData.name}`}>
              {shikataData.desc}
            </InfoTip>
          )}
        </header>
        <div className="character-ledger-body">
          {learnedShikatas.length > 0 && (
            <div className="multiclass-learned-strip">
              {learnedShikatas.map(item => (
                <button key={item.id} type="button" className={`multiclass-learned-chip ${char.shikata === item.id ? 'active' : ''}`} onClick={() => setActiveShikata?.(item.id)}>
                  <strong>{item.name}</strong><span>Nv. {item.nivel}</span>{item.subclasse && <small>{item.subclasse}</small>}
                </button>
              ))}
            </div>
          )}

          <div className="character-shikata-controls compact">
            <div className="field">
              <div className="field-label-with-info">
                <label>Nível da Shikata ativa</label>
                <InfoTip align="start" title="Ajuste de nível" label="Regra do nível da Shikata">Ajuste manual não concede pontos distributivos e não cria rolagem de HP. Use Evoluir Shikata para a progressão normal.</InfoTip>
              </div>
              <input type="number" min="1" max="30" value={char.shikata ? activeShikataLevel : 1} disabled={!char.shikata} onChange={e => char.shikata && setShikataLevel?.(char.shikata, Number(e.target.value))} />
            </div>
            {shikataData && (
              <div className="character-shikata-summary">
                <span>Modificador <strong className="semantic-value is-derived">{shikataData.modificador}</strong></span>
                <span>Dado de vida <strong className="semantic-value is-positive">{shikataData.dadoVida}</strong></span>
                <span>Dificuldade <strong>{shikataData.dificuldade}</strong></span>
                <span>Poder <strong>{shikataData.poder}</strong></span>
              </div>
            )}
          </div>

          {learnedShikatas.length > 0 && unlearnedShikatas.length > 0 && (
            <details className="character-multiclass-details">
              <summary>
                <span className="character-multiclass-summary-main"><TalosIcon name="upgrade" size={15} /> Aprender outra Shikata</span>
                <InfoTip align="end" title="Multiclasse TALOS" label="Regras de multiclasse">
                  <span>O jogador confirma que o requisito narrativo foi cumprido ou validado pelo Mestre. A nova Shikata começa no Nv. 1 e a rolagem de vida ocorre apenas nos níveis seguintes.</span>
                  <span className="info-tip-paragraph">Acerto multiclasse: a página Dados oferece os modificadores das Shikatas aprendidas como alternativas; eles não são somados entre si.</span>
                </InfoTip>
              </summary>
              <div className="multiclass-panel character-multiclass-panel compact">
                <div className="field">
                  <label>Nova Shikata</label>
                  <select value={multiclassCandidate} onChange={e => { setMulticlassCandidate(e.target.value); setMulticlassConfirmed(false); setMulticlassMessage(''); }}>
                    <option value="">Selecione...</option>
                    {unlearnedShikatas.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                  </select>
                </div>
                {multiclassCandidate && (
                  <div className="multiclass-requirement">
                    <span>REQUISITO TALOS v6</span>
                    <strong>{requirementForShikata(multiclassCandidate)}</strong>
                  </div>
                )}
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
                    <TalosIcon name="upgrade" size={15} /> Aprender Shikata
                  </button>
                </div>
                {multiclassMessage && <div className="multiclass-message">{multiclassMessage}</div>}
              </div>
            </details>
          )}
        </div>
      </section>

      <section className="character-ledger-section character-story-ledger">
        <header className="character-ledger-header">
          <TalosIcon name="book" size={18} />
          <div><span>Registro pessoal</span><strong>Características do Personagem</strong></div>
        </header>
        <div className="character-ledger-body character-story-grid">
          <div className="field"><label>Traços de Personalidade</label><textarea value={char.tracos} onChange={e => update('tracos', e.target.value)} placeholder="Gostos, desgostos, feitos, influências e maneirismos..." rows={3} /></div>
          <div className="field"><label>Ideais</label><textarea value={char.ideais} onChange={e => update('ideais', e.target.value)} placeholder="Motivação, princípios éticos e morais..." rows={3} /></div>
          <div className="field"><label>Vínculos</label><textarea value={char.vinculos} onChange={e => update('vinculos', e.target.value)} placeholder="Conexões com pessoas, lugares e histórias..." rows={3} /></div>
          <div className="field"><label>Defeitos</label><textarea value={char.defeitos} onChange={e => update('defeitos', e.target.value)} placeholder="Fraquezas, medos, compulsões..." rows={3} /></div>
          <div className="field character-story-wide"><label>Vícios</label><textarea value={char.vicios} onChange={e => update('vicios', e.target.value)} placeholder="O que te atrai inconscientemente..." rows={2} /></div>
        </div>
      </section>
    </div>
  );
}
