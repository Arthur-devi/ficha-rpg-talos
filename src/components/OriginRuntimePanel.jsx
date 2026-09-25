import { useMemo, useState } from 'react';
import { ATTRIBUTES, ORIGENS, PERICIAS_BY_ATTR } from '../data/system';
import { DRAGON_ANCESTORS, ELEMENTAL_ELEMENTS, SLIME_PATHS, SLIME_PATH_INFO, getOriginAbilityDefs, metamorphEffectKeys, normalizeOriginState, originProficiencyLimit, vampireHpBonus, vampireDuration, werewolfNaturalFormula } from '../data/originRuntime';
import DiceStage3D from './DiceStage3D';

const EFFECT_LABELS = {
  forca: 'Força', magia: 'Magia', constituicao: 'Constituição', inteligencia: 'Inteligência', percepcao: 'Percepção', destreza: 'Destreza', carisma: 'Carisma', defesa: 'Defesa', sorte: 'Sorte',
  ca: 'CA', hpMax: 'HP Máx.', deslocamento: 'Deslocamento',
};

function ChoiceBox({ label, children, note }) {
  return (
    <div className="origin-choice-box">
      <label>{label}</label>
      {children}
      {note && <small>{note}</small>}
    </div>
  );
}

function AbilityCard({ def, state, onUse, combatActive, formIndex }) {
  const record = state.originAbilityUsage?.[def.id] || {};
  const used = Number(record.used) || 0;
  const remaining = def.maxUses == null ? null : Math.max(0, def.maxUses - used);
  const disabled = def.maxUses != null && remaining <= 0;
  const resetLabel = def.resetType === 'long' ? 'descanso longo' : def.resetType === 'day' ? 'novo dia' : def.resetType === 'combat' ? 'novo combate' : null;
  return (
    <div className={`origin-ability-card ${disabled ? 'depleted' : ''}`}>
      <div className="origin-ability-head">
        <div>
          <strong>{def.name}</strong>
          <span>{def.summary}</span>
        </div>
        {remaining != null && <b>{remaining}/{def.maxUses}</b>}
      </div>
      <div className="origin-ability-meta">
        {def.damage?.formula && <span>🎲 {def.damage.formula} · {def.damage.type}</span>}
        {def.defaultAction === 'bonus' && <span>AÇÃO BÔNUS</span>}
        {def.defaultAction === 'free' && <span>SEM AÇÃO</span>}
        {!def.defaultAction || def.defaultAction === 'full' ? <span>{combatActive ? 'AÇÃO COMPLETA' : 'FORA DE COMBATE'}</span> : null}
        {resetLabel && <span>RECUPERA: {resetLabel.toUpperCase()}</span>}
      </div>
      {def.damage?.note && <small className="origin-ability-note">{def.damage.note}</small>}
      <button type="button" className="btn btn-primary btn-sm" disabled={disabled} onClick={() => onUse(def.id, formIndex != null ? { formIndex } : {})}>
        {def.damage?.formula ? '🎲 Usar + rolar' : '✦ Usar habilidade'}
      </button>
    </div>
  );
}

export default function OriginRuntimePanel({
  char,
  derived,
  update,
  useOriginAbility,
  attemptGuardianRevestimento,
  rollThunganItem,
  setWerewolfForm,
  clearMetamorphForm,
  applyVampireLifesteal,
}) {
  const origin = ORIGENS.find(item => item.id === char.origem);
  const state = normalizeOriginState(char.originState);
  const [feedback, setFeedback] = useState(null);
  const [diceRoll, setDiceRoll] = useState(null);
  const [lifestealDamage, setLifestealDamage] = useState('');
  const allSkills = useMemo(() => [...new Set(Object.values(PERICIAS_BY_ATTR).flat())].sort((a, b) => a.localeCompare(b, 'pt-BR')), []);
  if (!origin) return null;

  const proficiencyLimit = originProficiencyLimit(origin.id, state);
  const defs = getOriginAbilityDefs(origin.id, char);
  const updateState = (key, value) => update(`originState.${key}`, value);
  const setResult = result => {
    if (!result) return;
    setFeedback({ ok: !!result.ok, message: result.message || '' });
    if (result.roll) setDiceRoll(result.roll);
  };
  const handleUse = (id, options) => setResult(useOriginAbility?.(id, options));

  const toggleProficiency = skill => {
    const current = state.proficiencies || [];
    if (current.includes(skill)) updateState('proficiencies', current.filter(item => item !== skill));
    else if (current.length < proficiencyLimit) updateState('proficiencies', [...current, skill]);
  };

  const updateForm = (index, patch) => {
    const forms = [...state.metamorphForms];
    forms[index] = { ...forms[index], ...patch };
    updateState('metamorphForms', forms);
  };
  const updateFormEffect = (index, key, value) => {
    const forms = [...state.metamorphForms];
    forms[index] = { ...forms[index], effects: { ...(forms[index]?.effects || {}), [key]: Number(value) || 0 } };
    updateState('metamorphForms', forms);
  };
  const updateMasterMechanicalEffect = (stateKey, key, value) => {
    updateState(stateKey, { ...(state[stateKey] || {}), [key]: Number(value) || 0 });
  };

  const selectedSlimeLimit = state.slimePath === 'Inveja' ? 6 : state.slimePath === 'Avareza' ? 5 : 0;
  const toggleSlimeAttr = key => {
    const current = state.slimeChosenAttrs || [];
    if (current.includes(key)) updateState('slimeChosenAttrs', current.filter(item => item !== key));
    else if (current.length < selectedSlimeLimit) updateState('slimeChosenAttrs', [...current, key]);
  };

  const secondaryOptions = ORIGENS.filter(item => !['meio-orc', 'orc'].includes(item.id));
  const combatActive = Boolean(char.abilityTimeline?.combatActive);

  return (
    <>
      <div className="card origin-runtime-card">
        <div className="card-header"><span>🧬</span><h3>Origem — Mecânicas v6</h3></div>
        <div className="card-body">
          <div className="origin-runtime-summary">
            <div><strong>{origin.name}</strong><span>{origin.habilidade}</span></div>
            <div className="origin-runtime-badges">
              <span>Deslocamento: {derived?.originEffects?.deslocamentoBase == null ? 'NÃO ESPECIFICADO' : `${derived.originEffects.deslocamentoBase}sqm`}</span>
              <span>Cansaço: {derived?.originEffects?.limiteCansacoBase == null ? (origin.id === 'meio-orc' ? 'ESCOLHA A FUSÃO' : 'NÃO ESPECIFICADO') : `${derived.originEffects.limiteCansacoBase}${origin.id === 'meio-orc' ? ' · FUSÃO' : ''}`}</span>
              {derived?.gnomeLuckHpBonus > 0 && <span>Sortudo!: +{derived.gnomeLuckHpBonus} HP</span>}
            </div>
          </div>

          {derived?.originEffects?.missing?.length > 0 && (
            <div className="origin-source-warning"><strong>Fonte v6:</strong> {derived.originEffects.missing.join(' · ')}. Use o ajuste manual da ficha quando necessário; nenhum valor foi inventado.</div>
          )}

          {proficiencyLimit > 0 && (
            <ChoiceBox label={`Pontos de proficiência da origem — ${state.proficiencies.length}/${proficiencyLimit}`} note="O v6 diz ‘pontos de proficiência à escolha’ sem detalhar outro destino nesta seção. A ficha operacionaliza cada ponto como uma perícia; a profissão continua concedendo as próprias proficiências.">
              <div className="origin-skill-grid">
                {allSkills.map(skill => (
                  <button key={skill} type="button" className={state.proficiencies.includes(skill) ? 'selected' : ''} onClick={() => toggleProficiency(skill)} disabled={!state.proficiencies.includes(skill) && state.proficiencies.length >= proficiencyLimit}>{skill}</button>
                ))}
              </div>
            </ChoiceBox>
          )}

          {origin.id === 'meio-orc' && (
            <ChoiceBox label="Origem mesclada — Fusão" note="A ficha aplica metade dos bônus/malefícios numéricos (atributos, HP e CA) da origem escolhida. O Limite de Cansaço usa Orc (6) + origem mesclada, dividido por 2. Bônus contextuais ou não escalares permanecem descritos para decisão do mestre.">
              <select value={state.secondaryOriginId} onChange={e => { updateState('secondaryOriginId', e.target.value); updateState('proficiencies', []); }}>
                <option value="">Selecione a segunda origem...</option>
                {secondaryOptions.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </ChoiceBox>
          )}

          {origin.id === 'elfo-maritimo' && (
            <div className="origin-choice-grid">
              <ChoiceBox label="Ambiente — Submersos">
                <label className="origin-toggle"><input type="checkbox" checked={state.inWater} onChange={e => { updateState('inWater', e.target.checked); if (e.target.checked) updateState('hoursOutOfWater', 0); }} /><span>Estou na água (+4 em todos os atributos, exceto CON)</span></label>
              </ChoiceBox>
              <ChoiceBox label="Tempo fora d'água" note="O v6 limita a sobrevivência em solo a 12 horas.">
                <div className="origin-counter-row"><button type="button" onClick={() => updateState('hoursOutOfWater', Math.max(0, state.hoursOutOfWater - 1))}>-1h</button><strong className={state.hoursOutOfWater >= 12 ? 'danger-text' : ''}>{state.hoursOutOfWater}/12h</strong><button type="button" onClick={() => updateState('hoursOutOfWater', state.hoursOutOfWater + 1)}>+1h</button></div>
              </ChoiceBox>
            </div>
          )}

          {origin.id === 'elfo-negro' && <ChoiceBox label="Sombrio"><label className="origin-toggle"><input type="checkbox" checked={state.totalDarkness} onChange={e => updateState('totalDarkness', e.target.checked)} /><span>Escuridão total — dobrar os bônus raciais de DES e CAR</span></label></ChoiceBox>}
          {origin.id === 'elfo-floresta' && <ChoiceBox label="Chamado da Floresta"><label className="origin-toggle"><input type="checkbox" checked={state.naturalEnvironment} onChange={e => updateState('naturalEnvironment', e.target.checked)} /><span>Estou em ambiente natural</span></label></ChoiceBox>}

          {origin.id === 'meio-dragao' && <ChoiceBox label="Dragão Ancestral"><select value={state.dragonAncestor} onChange={e => updateState('dragonAncestor', e.target.value)}><option value="">Selecione...</option>{DRAGON_ANCESTORS.map(value => <option key={value}>{value}</option>)}</select></ChoiceBox>}
          {origin.id === 'elemental' && <ChoiceBox label="Elemento principal"><select value={state.elementalElement} onChange={e => updateState('elementalElement', e.target.value)}><option value="">Selecione...</option>{ELEMENTAL_ELEMENTS.map(value => <option key={value}>{value}</option>)}</select><small>Habilidades ofensivas sem elemento passam para o elemento escolhido e recebem mod. Magia como dano adicional.</small></ChoiceBox>}

          {origin.id === 'meio-demonio' && (
            <div className="origin-choice-grid">
              <ChoiceBox label="Parte demoníaca"><input value={state.demonPart} onChange={e => updateState('demonPart', e.target.value)} placeholder="Ex.: chifres, cauda, braço..." /></ChoiceBox>
              <ChoiceBox label="Efeito definido pelo mestre" note="O v6 deixa o efeito ao mestre. Informe abaixo somente os ajustes numéricos que realmente foram definidos na mesa; eles entram nas somas finais.">
                <textarea rows={2} value={state.demonEffect} onChange={e => updateState('demonEffect', e.target.value)} placeholder="Descrição do efeito definido pelo mestre." />
                <details><summary>Ajustes mecânicos definidos pelo mestre</summary><div className="origin-form-effects">{metamorphEffectKeys().map(key => <label key={key}><span>{EFFECT_LABELS[key] || key}</span><input type="number" value={state.demonMechanicalEffects?.[key] || 0} onChange={e => updateMasterMechanicalEffect('demonMechanicalEffects', key, e.target.value)} /></label>)}</div></details>
              </ChoiceBox>
            </div>
          )}
          {origin.id === 'feral' && (
            <div className="origin-choice-grid">
              <ChoiceBox label="Parte fera escolhida"><input value={state.feralPart} onChange={e => updateState('feralPart', e.target.value)} placeholder="Parte animal escolhida" /></ChoiceBox>
              <ChoiceBox label="3 bônus + desvantagens" note="O v6 não fornece valores universais. Informe apenas os números definidos pelo mestre para esta parte fera; a ficha os aplica automaticamente.">
                <textarea rows={2} value={state.feralEffect} onChange={e => updateState('feralEffect', e.target.value)} placeholder="Descrição dos 3 bônus e das desvantagens." />
                <details><summary>Ajustes mecânicos definidos pelo mestre</summary><div className="origin-form-effects">{metamorphEffectKeys().map(key => <label key={key}><span>{EFFECT_LABELS[key] || key}</span><input type="number" value={state.feralMechanicalEffects?.[key] || 0} onChange={e => updateMasterMechanicalEffect('feralMechanicalEffects', key, e.target.value)} /></label>)}</div></details>
              </ChoiceBox>
            </div>
          )}

          {origin.id === 'thungan' && (
            <ChoiceBox label="Sorte Amaldiçoada">
              <div className="origin-inline-actions"><button className="btn btn-primary btn-sm" type="button" disabled={state.thunganRoll != null} onClick={() => setResult(rollThunganItem?.())}>🎲 Rolar 1d20 do item</button>{state.thunganRoll != null && <strong>Resultado: {state.thunganRoll}</strong>}</div>
              <input value={state.thunganItem} onChange={e => updateState('thunganItem', e.target.value)} placeholder="Equipamento raro amaldiçoado definido pelo mestre" />
              <small>O trecho de Origem do v6 manda rolar 1d20, mas não fornece ali a tabela de conversão do resultado; a ficha não inventa o item.</small>
            </ChoiceBox>
          )}

          {origin.id === 'slime' && Number(char.nivel) >= 5 && (
            <ChoiceBox label="Caminho do Slime — escolha permanente">
              <select value={state.slimePath} onChange={e => { updateState('slimePath', e.target.value); updateState('slimeChosenAttrs', []); }}><option value="">Selecione o caminho...</option>{SLIME_PATHS.map(value => <option key={value}>{value}</option>)}</select>
              {state.slimePath && <div className="origin-passive-note">{SLIME_PATH_INFO[state.slimePath]}</div>}
              {selectedSlimeLimit > 0 && <div className="origin-attr-choice"><small>{state.slimePath}: escolha {selectedSlimeLimit} atributos para receber o bônus descrito no v6.</small>{ATTRIBUTES.map(attr => <button type="button" key={attr.key} className={state.slimeChosenAttrs.includes(attr.key) ? 'selected' : ''} onClick={() => toggleSlimeAttr(attr.key)} disabled={!state.slimeChosenAttrs.includes(attr.key) && state.slimeChosenAttrs.length >= selectedSlimeLimit}>{attr.abbr}</button>)}</div>}
            </ChoiceBox>
          )}

          {origin.id === 'metamorfo' && (
            <>
            <ChoiceBox label="Bônus da Origem — 2 pontos à escolha" note="Como o v6 coloca estes pontos no campo Bônus do Metamorfo, a ficha os aplica aos atributos. Eles são separados dos pontos de evolução da Shikata.">
              <div className="origin-attr-point-grid">
                {ATTRIBUTES.map(attr => {
                  const spent = Object.values(state.metamorphAttributePoints || {}).reduce((sum, value) => sum + Math.max(0, Number(value) || 0), 0);
                  const value = Math.max(0, Number(state.metamorphAttributePoints?.[attr.key]) || 0);
                  return <div key={attr.key}><span>{attr.abbr}</span><button type="button" disabled={value <= 0} onClick={() => updateState('metamorphAttributePoints', { ...(state.metamorphAttributePoints || {}), [attr.key]: Math.max(0, value - 1) })}>−</button><strong>{value}</strong><button type="button" disabled={spent >= 2} onClick={() => updateState('metamorphAttributePoints', { ...(state.metamorphAttributePoints || {}), [attr.key]: value + 1 })}>+</button></div>;
                })}
              </div>
            </ChoiceBox>
            <div className="origin-metamorph-grid">
              {state.metamorphForms.map((form, index) => (
                <div className={`origin-form-card ${Number(state.activeMetamorphForm) === index ? 'active' : ''}`} key={index}>
                  <strong>Forma {index + 1}</strong>
                  <input value={form.name} onChange={e => updateForm(index, { name: e.target.value })} placeholder="Nome da criatura" />
                  <textarea rows={2} value={form.notes} onChange={e => updateForm(index, { notes: e.target.value })} placeholder="Vantagens/desvantagens definidas pelo mestre" />
                  <details><summary>Ajustes mecânicos da forma</summary><div className="origin-form-effects">{metamorphEffectKeys().map(key => <label key={key}><span>{EFFECT_LABELS[key] || key}</span><input type="number" value={form.effects?.[key] || 0} onChange={e => updateFormEffect(index, key, e.target.value)} /></label>)}</div></details>
                  <button type="button" className="btn btn-primary btn-sm" disabled={!form.name} onClick={() => handleUse('transformacao', { formIndex: index })}>Transformar</button>
                </div>
              ))}
              {Number(state.activeMetamorphForm) >= 0 && <button type="button" className="btn btn-secondary btn-sm" onClick={() => { clearMetamorphForm?.(); setFeedback({ ok: true, message: 'Forma base restaurada.' }); }}>Voltar à forma base</button>}
            </div>
            </>
          )}

          {origin.id === 'vampiro' && (
            <div className="origin-choice-grid">
              <ChoiceBox label="Luz do sol"><label className="origin-toggle"><input type="checkbox" checked={state.sunlight} onChange={e => updateState('sunlight', e.target.checked)} /><span>Estou sob luz do sol</span></label>{state.vampireActive && <small>Forma ativa: +{vampireHpBonus(char.nivel)} HP · {state.vampireTurnsRemaining}/{vampireDuration(char.nivel)} turno(s)</small>}</ChoiceBox>
              {state.vampireActive && <ChoiceBox label="Roubo de vitalidade"><div className="origin-inline-actions"><input type="number" min="0" value={lifestealDamage} onChange={e => setLifestealDamage(e.target.value)} placeholder="Dano causado" /><button className="btn btn-secondary btn-sm" type="button" onClick={() => setResult(applyVampireLifesteal?.(lifestealDamage))}>Curar metade</button></div></ChoiceBox>}
            </div>
          )}

          {origin.id === 'lobisomem' && (
            <ChoiceBox label="Lua / Transformação">
              <label className="origin-toggle"><input type="checkbox" checked={state.fullMoon} onChange={e => updateState('fullMoon', e.target.checked)} /><span>É noite de lua</span></label>
              <div className="origin-inline-actions"><button type="button" className="btn btn-primary btn-sm" disabled={!state.fullMoon || state.werewolfActive} onClick={() => setResult(setWerewolfForm?.(true))}>Ativar forma de Lobisomem</button><button type="button" className="btn btn-secondary btn-sm" disabled={!state.werewolfActive} onClick={() => setResult(setWerewolfForm?.(false))}>Voltar à forma humana</button></div>
              {state.werewolfActive && <small>Garras/mordidas: {werewolfNaturalFormula(char.nivel)} · habilidades de Shikata bloqueadas · prata causa dano dobrado.</small>}
            </ChoiceBox>
          )}

          {origin.id === 'lorv' && (
            <ChoiceBox label="Atributos do hospedeiro" note="Informe os bônus/penalidades próprios do hospedeiro; a ficha aplica metade de cada valor ao Lorv.">
              <div className="origin-form-effects">{ATTRIBUTES.map(attr => <label key={attr.key}><span>{attr.abbr}</span><input type="number" value={state.lorvHostAttrs?.[attr.key] || 0} onChange={e => updateState('lorvHostAttrs', { ...(state.lorvHostAttrs || {}), [attr.key]: Number(e.target.value) || 0 })} /></label>)}</div>
            </ChoiceBox>
          )}

          {origin.id === 'guardiao' && (
            <div className="origin-ability-card">
              <div className="origin-ability-head"><div><strong>Revestimento</strong><span>1 ativação por descanso longo · até 3 tentativas/turno · d20 &gt; 10 ativa.</span></div><b>{state.guardianAttemptsTurn}/3 tent.</b></div>
              {state.guardianCaBonus > 0 && <div className="origin-active-effect">+{state.guardianCaBonus} CA {state.guardianCriticalCombat ? 'ATÉ O FIM DO COMBATE' : `· ${state.guardianTurnsRemaining} turno(s)`}</div>}
              <button type="button" className="btn btn-primary btn-sm" disabled={!combatActive || state.guardianAttemptsTurn >= 3 || (state.originAbilityUsage?.revestimento?.used || 0) >= 1} onClick={() => setResult(attemptGuardianRevestimento?.())}>🎲 Tentar Revestimento</button>
            </div>
          )}

          {defs.filter(def => def.custom !== 'guardian' && !(origin.id === 'metamorfo' && def.id === 'transformacao')).length > 0 && (
            <div className="origin-abilities-grid">
              {defs.filter(def => def.custom !== 'guardian' && !(origin.id === 'metamorfo' && def.id === 'transformacao')).map(def => <AbilityCard key={def.id} def={def} state={state} onUse={handleUse} combatActive={combatActive} />)}
            </div>
          )}

          {origin.id === 'drac' && state.dracInvulnerableTurns > 0 && <div className="origin-active-effect origin-active-critical"><strong>INVENCIBILIDADE ATIVA</strong> — invulnerável durante o turno atual.</div>}
          {origin.id === 'crono' && state.cronoTimeStoppedTurns > 0 && <div className="origin-active-effect origin-active-critical"><strong>QUEBRA DO TEMPO ATIVA</strong> — tempo parado durante o turno atual.</div>}
          {origin.id === 'kvaldir' && state.kvaldirDefenseActive && <div className="origin-active-effect origin-active-critical"><strong>DEFESA GROTESCA ATIVA</strong> — bloqueia ataques físicos e reflete metade do dano mágico até o fim deste combate.</div>}

          {origin.id === 'tita' && <div className="origin-source-warning"><strong>TITÃ:</strong> pontos de evolução de nível não podem ser gastos em Carisma. Bônus de item continuam válidos, conforme o v6.</div>}
          {origin.id === 'goblin' && <div className="origin-passive-note">Furto: <strong>+2 em jogadas de Furtividade</strong>. O bônus está registrado na Origem e ficará disponível para o motor de perícias do Lote 9.</div>}
          {origin.id === 'elemental' && !state.elementalElement && <div className="origin-source-warning">Escolha o elemento principal para o Diversificar poder ser aplicado aos danos automáticos.</div>}
          {origin.id === 'gigante' && <div className="origin-danger-note">LENTO, MUITO LENTO!: <strong>SEMPRE ATACA POR ÚLTIMO EM COMBATE.</strong></div>}
          {origin.id === 'elfo-rubro' && <div className="origin-passive-note">Sangue Azul: recebe apenas metade de todo dano mágico. A ficha registra a regra, mas não reduz dano automaticamente porque ainda não existe um motor global de dano recebido.</div>}
          {origin.id === 'orc' && <div className="origin-passive-note">Fortificação: pode empunhar uma arma de duas mãos em <strong>CADA MÃO</strong>.</div>}
          {origin.id === 'nordico' && <div className="origin-passive-note">Resistente ao frio absoluto e não sente medo.</div>}
          {origin.id === 'humano' && <div className="origin-passive-note">Seres Perceptivos: <strong>+2 Percepção</strong> já está somado. Carga: <strong>25 + mod. Força kg</strong>.</div>}
          {origin.id === 'anao' && <div className="origin-passive-note">Forjadores: <strong>+5 em testes de forjar itens</strong>. O valor fica preservado como regra contextual até o motor geral de perícias/testes.</div>}
          {origin.id === 'anao-rocha' && <div className="origin-passive-note">Mineradores: <strong>+5 em testes de Força de mineração</strong>.</div>}
          {origin.id === 'hobbit' && <div className="origin-passive-note">Pés Peludos: pode pular até <strong>2× sua altura</strong>.</div>}
          {origin.id === 'fada' && <div className="origin-passive-note">Rapidez/Voar/Peso: deslocamento racial já é 4sqm; pode voar até 2× seu peso por no máximo 10 minutos e carrega no máximo 2× o próprio peso.</div>}
          {origin.id === 'undead' && <div className="origin-passive-note">Necrótico: ataques corpo-a-corpo com fluidos corporais causam <strong>+2 dano</strong>. Membros Flexíveis/Partes Novas permanecem regras contextuais.</div>}
          {origin.id === 'troll-montanha' && <div className="origin-passive-note">Também é <strong>resistente a dano de concussão</strong>.</div>}
          {origin.id === 'meio-demonio' && <div className="origin-source-warning">Crescimento do Mal: o próprio v6 manda o <strong>mestre decidir o efeito</strong> da parte demoníaca; por isso a ficha registra a escolha sem inventar bônus.</div>}
          {origin.id === 'feral' && <div className="origin-source-warning">Atributos Novos: o v6 informa <strong>3 bônus + novas desvantagens</strong>, mas não fornece valores universais; registre acima o que foi definido para a parte fera.</div>}
          {origin.id === 'lorv' && <div className="origin-source-warning">Lorv: o bloco do v6 não informa Deslocamento nem Limite de Cansaço. Vestígios do Passado, Estilhaços de Vida e Semelhantes são preservados como efeitos contextuais.</div>}

          {feedback && <div className={`origin-feedback ${feedback.ok ? 'success' : 'error'}`}><strong>{feedback.ok ? '✓' : '!'}</strong><span>{feedback.message}</span><button type="button" onClick={() => setFeedback(null)}>×</button></div>}
        </div>
      </div>
      <DiceStage3D result={diceRoll} showDock={false} onClose={() => setDiceRoll(null)} />
    </>
  );
}
