import { useState } from 'react';
import { ATTRIBUTES, PERICIAS_BY_ATTR, PERICIAS_INFO, getProfissaoData } from '../data/system';
import { CONDITION_MARKERS, OFFICIAL_STATE_DEFS } from '../data/stateRuntime';
import { INSPIRATION_TABLE_RULE } from '../data/tableRules';
import InfoTip from './InfoTip';
import TalosIcon from './TalosIcon';

const SKILL_COLUMNS = [
  ['forca', 'inteligencia', 'carisma', 'sorte'],
  ['destreza', 'constituicao', 'percepcao', 'magia'],
];

function signed(value) {
  return value > 0 ? `+${value}` : `${value || 0}`;
}

function toneClass(value) {
  if (Number(value) > 0) return 'is-positive';
  if (Number(value) < 0) return 'is-negative';
  return 'is-neutral';
}

function LabelWithInfo({ children, title, info, align = 'start' }) {
  return (
    <div className="field-label-with-info">
      <label>{children}</label>
      <InfoTip title={title} label={`Informações sobre ${children}`} align={align}>{info}</InfoTip>
    </div>
  );
}

function AttrBox({
  attr,
  value,
  mod,
  onChange,
  minValue = -10,
  originBonus = 0,
  itemBonus = 0,
  classBonus = 0,
  stateBonus = 0,
  levelAllocation = 0,
  canSpendPoint = false,
  onSpendPoint,
  onRefundPoint,
}) {
  const isMagia = attr.key === 'magia';
  const bonusLines = [
    originBonus !== 0 && { value: originBonus, text: `${signed(originBonus)} origem` },
    itemBonus !== 0 && { value: itemBonus, text: `${signed(itemBonus)} item` },
    classBonus !== 0 && { value: classBonus, text: `${signed(classBonus)} classe` },
    stateBonus !== 0 && { value: stateBonus, text: `${signed(stateBonus)} estado` },
    levelAllocation > 0 && { value: levelAllocation, text: `+${levelAllocation} evolução` },
  ].filter(Boolean);

  return (
    <div className={`attr-box ${isMagia ? 'is-magic' : ''}`}>
      <div className="attr-medallion" title={attr.desc}>
        <div className="attr-abbr">{attr.abbr}</div>
        <input
          type="number"
          className="attr-input"
          value={value}
          min={minValue}
          max={30}
          onChange={e => {
            const v = Number(e.target.value) || 0;
            onChange(Math.max(minValue, v));
          }}
          aria-label={`${attr.label}: valor do atributo`}
        />
        <div className="attr-medallion-rule" aria-hidden="true" />
        <div className={`attr-mod ${toneClass(mod)}`}>{mod >= 0 ? '+' : ''}{mod}</div>
      </div>

      <div className="attr-name">{attr.label}{isMagia ? ' *' : ''}</div>

      <div className="attr-source-lines" aria-label="Bônus aplicados">
        {bonusLines.length > 0
          ? bonusLines.map(line => <span className={toneClass(line.value)} key={line.text}>{line.text}</span>)
          : <span className="muted">Sem bônus extras</span>}
      </div>

      <div className="attr-level-controls">
        <button
          type="button"
          className="attr-level-btn"
          onClick={onRefundPoint}
          disabled={levelAllocation <= 0}
          title="Devolver 1 ponto distributivo aplicado por evolução"
          aria-label={`Remover ponto de ${attr.label}`}
        >
          −
        </button>
        <button
          type="button"
          className="attr-level-btn primary"
          onClick={onSpendPoint}
          disabled={!canSpendPoint}
          title="Gastar 1 ponto distributivo neste atributo"
          aria-label={`Adicionar ponto em ${attr.label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function TabAtributos({ char, update, updateAttr, derived, toggleEstado, consumeConcentration, togglePericia, spendAttributePoint, refundAttributePoint, setCansaco }) {
  const [stateMessage, setStateMessage] = useState('');
  const [currencyMessage, setCurrencyMessage] = useState('');
  const hpMaxTotal = derived.hpMaxTotal || char.hpMax;
  const hpPct = Math.max(0, Math.min(100, (char.hpAtual / hpMaxTotal) * 100));
  const lockedDeslocamento = derived.originDeslocamentoBase + derived.deslocamentoBonus + derived.deslocamentoItemBonus;
  const lockedLimiteCansaco = derived.originLimiteCansacoBase + derived.limiteCansacoBonus;
  const profissaoData = getProfissaoData(char.profissao);
  const periciasProfissao = new Set(profissaoData?.pericias || []);
  const periciasOrigem = new Set(derived.originProficiencies || []);

  const currencyOrder = ['pc', 'pp', 'po', 'pd'];
  const currencyLabels = { pc: 'PC', pp: 'PP', po: 'PO', pd: 'PD' };

  const convertCurrencyStep = (key, direction) => {
    const index = currencyOrder.indexOf(key);
    const targetIndex = direction === 'up' ? index + 1 : index - 1;
    if (index < 0 || targetIndex < 0 || targetIndex >= currencyOrder.length) return;

    const targetKey = currencyOrder[targetIndex];
    const sourceAmount = Math.max(0, Number(char.moedas?.[key]) || 0);
    const targetAmount = Math.max(0, Number(char.moedas?.[targetKey]) || 0);

    if (direction === 'up') {
      if (sourceAmount < 100) {
        setCurrencyMessage(`São necessárias 100 ${currencyLabels[key]} para converter em 1 ${currencyLabels[targetKey]}.`);
        return;
      }
      update(`moedas.${key}`, sourceAmount - 100);
      update(`moedas.${targetKey}`, targetAmount + 1);
      setCurrencyMessage(`100 ${currencyLabels[key]} → 1 ${currencyLabels[targetKey]}.`);
      return;
    }

    if (sourceAmount < 1) {
      setCurrencyMessage(`É necessário 1 ${currencyLabels[key]} para converter em 100 ${currencyLabels[targetKey]}.`);
      return;
    }
    update(`moedas.${key}`, sourceAmount - 1);
    update(`moedas.${targetKey}`, targetAmount + 100);
    setCurrencyMessage(`1 ${currencyLabels[key]} → 100 ${currencyLabels[targetKey]}.`);
  };

  return (
    <div className="stack attributes-page-v115">
      {/* Vitais */}
      <div className="card vitals-sheet-card">
        <div className="card-header">
          <TalosIcon name="vitality" size={18} />
          <h3>Vitais</h3>
          <InfoTip className="card-header-info" align="end" title="Leitura rápida">
            A ficha deixa à vista os valores usados durante a sessão. Fórmulas e regras completas ficam nos ícones de informação para manter a folha limpa.
          </InfoTip>
        </div>
        <div className="card-body">
          <div className="vitals-sheet-grid">
            <section className="vital-panel vital-panel-hp">
              <LabelWithInfo
                title="Pontos de Vida"
                info={`Base TALOS: 12 + mod CON + origem ${signed(derived.hpOriginBonus)} + itens ${signed(derived.hpItemBonus)} = ${derived.hpBase}. Níveis ${signed(derived.hpLevelRollBonus)}. Ajuste manual ${signed(derived.hpManualBonus)}.`}
              >
                Pontos de Vida (HP)
              </LabelWithInfo>
              <div className="vital-number-row">
                <input
                  type="number"
                  value={char.hpAtual}
                  min={-999}
                  max={hpMaxTotal}
                  onChange={e => update('hpAtual', Number(e.target.value))}
                  className="vital-number-input hp-current"
                  aria-label="HP atual"
                />
                <span className="vital-divider">/</span>
                <input
                  type="number"
                  value={hpMaxTotal}
                  min={1}
                  onChange={e => update('hpManualBonus', Number(e.target.value) - derived.hpBase - derived.hpLevelRollBonus)}
                  className="vital-number-input hp-max"
                  aria-label="HP máximo"
                />
              </div>
              <div className="stat-bar-track">
                <div className="stat-bar-fill stat-bar-hp" style={{ width: `${hpPct}%` }} />
              </div>
              <div className="vital-subfield">
                <label>HP Temporário</label>
                <input type="number" value={char.hpTemp} min={0} onChange={e => update('hpTemp', Number(e.target.value))} className={`semantic-number ${toneClass(char.hpTemp)}`} />
              </div>
            </section>

            <section className="vital-panel">
              <LabelWithInfo
                title="Classe de Armadura"
                info={`CA = 8 + DES (limite 4) + CON (limite 4) + ajuste manual + origem ${signed(derived.caOriginBonus)} + itens ${signed(derived.caItemBonus)}.`}
              >
                Classe de Armadura (CA)
              </LabelWithInfo>
              <div className="big-num semantic-value is-derived">{derived.caTotal}</div>
              <div className="vital-subfield">
                <label>Bônus CA manual</label>
                <input type="number" value={char.caBonus} min={0} onChange={e => update('caBonus', Number(e.target.value))} className={`semantic-number ${toneClass(char.caBonus)}`} />
              </div>
            </section>

            <section className="vital-panel">
              <LabelWithInfo
                title="Deslocamento"
                info={`${derived.originMovementSpecified ? `Origem ${derived.originDeslocamentoBase}` : 'Origem não informada no v6'} + manual ${derived.manualDeslocamento} + DES ${derived.deslocamentoBonus} + itens ${signed(derived.deslocamentoItemBonus)} = ${derived.deslocamentoTotal}.`}
              >
                Deslocamento (sqm)
              </LabelWithInfo>
              <input
                type="number"
                value={derived.deslocamentoTotal}
                min={Math.max(0, lockedDeslocamento)}
                onChange={e => update('deslocamento', Math.max(0, Number(e.target.value) - lockedDeslocamento))}
                className="semantic-number is-derived vital-single-number"
              />
            </section>

            <section className="vital-panel vital-panel-fatigue">
              <LabelWithInfo
                title="Limite de Cansaço"
                info={(
                  <>
                    <span>{derived.originFatigueSpecified ? `Origem ${derived.originLimiteCansacoBase}` : char.origem === 'meio-orc' ? 'Origem: escolha a Fusão' : 'Origem não informada no v6'} + manual {derived.manualLimiteCansaco} + CON {derived.limiteCansacoBonus} = {derived.limiteCansacoTotal}.</span>
                    <span className="info-tip-paragraph">Cada uso de habilidade consome 1 ponto. Ao atingir o máximo, as habilidades continuam disponíveis, mas o modificador de acerto da Shikata deixa de ser somado. Descanso curto recupera o estado.</span>
                  </>
                )}
              >
                Limite de Cansaço
              </LabelWithInfo>
              <div className="vital-control-row">
                <input type="number" value={derived.cansacoAtual} min={0} max={derived.limiteCansacoTotal} onChange={e => setCansaco?.(Number(e.target.value))} className={`semantic-number ${derived.isCansado ? 'is-negative' : 'is-warning'}`} />
                <span className="vital-divider">/</span>
                <input type="number" value={derived.limiteCansacoTotal} min={Math.max(0, lockedLimiteCansaco)} onChange={e => update('limiteCansaco', Math.max(0, Number(e.target.value) - lockedLimiteCansaco))} className="semantic-number is-derived" />
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setCansaco?.(Math.max(0, derived.cansacoAtual - 1))}>−1</button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setCansaco?.(derived.cansacoAtual + 1)} disabled={derived.cansacoAtual >= derived.limiteCansacoTotal}>+1 uso</button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setCansaco?.(0)} disabled={derived.cansacoAtual <= 0}>Zerar</button>
              </div>
              <div className="fatigue-track" aria-label={`Cansaço ${derived.cansacoAtual} de ${derived.limiteCansacoTotal}`}>
                <span style={{ width: `${derived.cansacoPercentual || 0}%` }} />
              </div>
              {derived.isCansado && <span className="badge fatigue-danger vital-status-badge">CANSADO · bônus de acerto desativado</span>}
            </section>

            <section className="vital-panel inspiration-control">
              <LabelWithInfo
                title="Inspiração"
                info={`Acumula normalmente. Pela regra definida pela mesa, gastar 1 Inspiração concede +${INSPIRATION_TABLE_RULE.bonus} na próxima rolagem compatível.`}
              >
                Inspiração
              </LabelWithInfo>
              <div className="inspiration-counter">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => update('inspiracao', Math.max(0, (Number(char.inspiracao) || 0) - 1))} disabled={(Number(char.inspiracao) || 0) <= 0}>−</button>
                <strong>{Math.max(0, Number(char.inspiracao) || 0)}</strong>
                <button type="button" className="btn btn-primary btn-sm" onClick={() => update('inspiracao', Math.max(0, Number(char.inspiracao) || 0) + 1)}>+</button>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Atributos */}
      <div className="card attributes-sheet-card">
        <div className="card-header attributes-card-header">
          <TalosIcon name="attributes" size={18} />
          <h3>Atributos</h3>
          <div className="attribute-header-tools">
            <div className={`attribute-points-badge ${(char.pontosDistributivos || 0) > 0 ? 'has-points' : ''}`}>
              <span>Pontos</span>
              <strong>{char.pontosDistributivos || 0}</strong>
            </div>
            <InfoTip align="end" title="Pontos & regras de atributo" label="Regras dos atributos">
              <span>Cada uso de Subir de nível concede 2 pontos distributivos. Os botões + e − sob cada medalhão gastam ou devolvem apenas esses pontos.</span>
              <span className="info-tip-paragraph">Distribuição inicial fixa: 6, 5, 4, 4, 4, 3, 2, 2 — ou role 3d4, some os 2 menores e repita 8 vezes.</span>
              <span className="info-tip-paragraph">Conversões: INT {derived.attrsTotal.inteligencia} → +{derived.magiaFromInt} Magia; DES {derived.attrsTotal.destreza} → +{derived.deslocamentoBonus} Deslocamento; CON {derived.attrsTotal.constituicao} → +{derived.limiteCansacoBonus} Cansaço. Magia já inclui INT÷2.</span>
            </InfoTip>
          </div>
        </div>
        <div className="card-body attributes-sheet-body">
          <div className="attrs-grid">
            {ATTRIBUTES.map(attr => {
              const isMagia = attr.key === 'magia';
              const originBonus = derived.originAttrBonuses?.[attr.key] || 0;
              const itemBonus = derived.itemAttrBonuses?.[attr.key] || 0;
              const classBonus = derived.classAttrBonuses?.[attr.key] || 0;
              const stateBonus = derived.stateAttrBonuses?.[attr.key] || 0;
              const attributeLockedBonus = originBonus + itemBonus + classBonus + stateBonus;
              const displayValue = isMagia ? derived.magiaTotal : derived.attrsTotal[attr.key];
              const lockedBonus = isMagia ? derived.magiaFromInt + attributeLockedBonus : attributeLockedBonus;
              const modMap = {
                FOR: 'modForca', MAG: 'modMagia', CON: 'modCon',
                INT: 'modInt', PER: 'modPer', DES: 'modDes',
                CAR: 'modCar', DEF: 'modDef', SOR: 'modSor',
              };
              const mod = derived[modMap[attr.abbr]] ?? Math.floor(char.attrs[attr.key] / 2);
              return (
                <AttrBox
                  key={attr.key}
                  attr={attr}
                  value={displayValue}
                  mod={mod}
                  onChange={isMagia
                    ? v => updateAttr('magia', Math.max(0, v - lockedBonus))
                    : v => updateAttr(attr.key, v - lockedBonus)}
                  minValue={isMagia ? lockedBonus : -10 + lockedBonus}
                  originBonus={originBonus}
                  itemBonus={itemBonus}
                  classBonus={classBonus}
                  stateBonus={stateBonus}
                  levelAllocation={char.pontosDistribuidosNivel?.[attr.key] || 0}
                  canSpendPoint={(char.pontosDistributivos || 0) > 0 && !(char.origem === 'tita' && attr.key === 'carisma')}
                  onSpendPoint={() => spendAttributePoint?.(attr.key)}
                  onRefundPoint={() => refundAttributePoint?.(attr.key)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Perícias */}
      <div className="card pericias-card skills-sheet-card">
        <div className="card-header">
          <TalosIcon name="skills" size={18} />
          <h3>Perícias</h3>
          <InfoTip className="card-header-info" align="end" title="Como ler as perícias">
            O marcador indica de onde vem a proficiência. Perícias de Profissão e Origem ficam bloqueadas para evitar remoção acidental. Use o ícone de informação em cada linha para consultar o resumo oficial.
          </InfoTip>
        </div>
        <div className="card-body">
          <div className="skill-ledger-columns">
            {SKILL_COLUMNS.map((column, columnIndex) => (
              <div className="skill-ledger-column" key={column.join('-')}>
                {column.map(attrKey => {
                  const pericias = PERICIAS_BY_ATTR[attrKey] || [];
                  const attr = ATTRIBUTES.find(a => a.key === attrKey);
                  return (
                    <section className="skill-ledger-group" key={attrKey}>
                      <header className="skill-ledger-heading">
                        <span>{attr?.abbr}</span>
                        <strong>{attr?.label}</strong>
                      </header>
                      <div className="skill-ledger-list">
                        {pericias.map(p => {
                          const lockedByProfession = periciasProfissao.has(p);
                          const lockedByOrigin = periciasOrigem.has(p);
                          const locked = lockedByProfession || lockedByOrigin;
                          const checked = locked || char.pericias.includes(p);
                          const inputId = `pericia-${attrKey}-${p.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;
                          return (
                            <div key={p} className={`pericia-item ${locked ? 'locked' : ''}`}>
                              <input
                                id={inputId}
                                type="checkbox"
                                checked={checked}
                                disabled={locked}
                                onChange={() => {
                                  if (!locked) togglePericia(p);
                                }}
                              />
                              <label htmlFor={inputId} className="pericia-name" title={lockedByProfession ? `Perícia fixa da profissão: ${profissaoData?.name || char.profissao}` : lockedByOrigin ? 'Proficiência escolhida pela Origem' : undefined}>
                                {p}
                              </label>
                              {lockedByProfession && <span className="pericia-locked-tag profession">Prof.</span>}
                              {!lockedByProfession && lockedByOrigin && <span className="pericia-locked-tag origin">Orig.</span>}
                              <InfoTip
                                className="pericia-info-tip"
                                align={columnIndex === 0 ? 'start' : 'end'}
                                label={`Resumo de ${p}`}
                                title={p}
                              >
                                {PERICIAS_INFO[p] || 'Descrição não cadastrada no documento TALOS v6.'}
                              </InfoTip>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Estados */}
      <div className="card states-card compact-states-card">
        <div className="card-header">
          <TalosIcon name="states" size={18} />
          <h3>Estados & Condições</h3>
          <InfoTip className="card-header-info" align="end" title="Estados e condições">
            Estados oficiais aplicam as regras centrais já estruturadas pela ficha. Os demais termos são marcadores usados por habilidades; quando o v6 não fornece um efeito central único, a ficha não inventa dano, duração ou perda de ações.
          </InfoTip>
        </div>
        <div className="card-body stack">
          <div>
            <div className="state-section-title">Estados oficiais TALOS v6</div>
            <div className="official-state-grid compact">
              {OFFICIAL_STATE_DEFS.map(state => {
                const active = state.id === 'cansado' ? derived.isCansado : (char.estados || []).includes(state.id);
                return (
                  <div key={state.id} className={`official-state-card ${active ? 'active' : ''} ${state.id === 'cansado' && active ? 'danger' : ''}`}>
                    <div className="official-state-head">
                      <div className="official-state-name">
                        <strong>{state.name}</strong>
                        <InfoTip title={state.name} label={`Regra de ${state.name}`} align="start">{state.desc}</InfoTip>
                      </div>
                      {state.id === 'cansado' ? (
                        <span className={`state-status-pill ${active ? 'on' : ''}`}>{active ? 'AUTO · ATIVO' : 'AUTO'}</span>
                      ) : (
                        <button
                          type="button"
                          className={`btn btn-sm ${active ? 'btn-danger' : 'btn-secondary'}`}
                          onClick={() => {
                            const result = toggleEstado?.(state.id);
                            if (result?.message) setStateMessage(result.message);
                          }}
                        >
                          {active ? 'Desativar' : 'Ativar'}
                        </button>
                      )}
                    </div>
                    {state.id === 'concentracao' && active && (
                      <div className="state-effect-row">
                        <span className="badge state-positive">+10 DEFESA ATIVO</span>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            const result = consumeConcentration?.();
                            if (result?.message) setStateMessage(result.message);
                          }}
                        >
                          Registrar 1º ataque recebido
                        </button>
                      </div>
                    )}
                    {state.id === 'imparavel' && active && (
                      <div className="state-effect-row">
                        <span className="badge state-positive">IMUNE: ATORDOADO</span>
                        <span className="badge state-positive">IMUNE: ENRAIZADO</span>
                        <span className="badge state-positive">IMUNE: CONGELADO</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="state-section-title state-title-with-info">
              <span>Marcadores de condição</span>
              <InfoTip title="Marcadores" label="Sobre marcadores de condição" align="start">
                O v6 usa estes termos em várias habilidades, mas não fornece um efeito central único para todos. IMPARÁVEL bloqueia apenas as imunidades citadas explicitamente.
              </InfoTip>
            </div>
            <div className="condition-marker-row">
              {CONDITION_MARKERS.map(condition => {
                const active = (char.estados || []).includes(condition.id);
                const immune = derived.stateEffects?.imparavel && ['atordoado', 'enraizado', 'congelado'].includes(condition.id);
                return (
                  <button
                    key={condition.id}
                    type="button"
                    className={`estado-tag ${active ? 'active' : ''} ${immune ? 'immune' : ''}`}
                    onClick={() => {
                      const result = toggleEstado?.(condition.id);
                      if (result?.message) setStateMessage(result.message);
                    }}
                    title={immune ? 'Bloqueado por IMPARÁVEL.' : 'Marcador manual de condição.'}
                  >
                    {condition.name}{immune ? ' · IMUNE' : ''}
                  </button>
                );
              })}
              <span className={`estado-tag ${(derived.isMorrendo || derived.isDead) ? 'active dying' : ''}`} title="MORRENDO é automático em HP 0 ou menos. MORTE exige 3 falhas na regra da mesa.">
                {derived.isDead ? 'MORTO · 3 FALHAS' : `MORRENDO · AUTO ${derived.isMorrendo ? `✓ ${derived.deathSaveState?.successes || 0}/3 · × ${derived.deathSaveState?.failures || 0}/3` : ''}`}
              </span>
            </div>
          </div>

          <div className="custom-state-row">
            <label>Estado / condição personalizada</label>
            <div className="custom-state-controls">
              <input
                placeholder="Ex: Amaldiçoado..."
                id="custom-estado"
                onKeyDown={e => {
                  if (e.key === 'Enter' && e.target.value) {
                    const result = toggleEstado?.(e.target.value);
                    if (result?.message) setStateMessage(result.message);
                    e.target.value = '';
                  }
                }}
              />
              <button className="btn btn-secondary btn-sm" onClick={() => {
                const el = document.getElementById('custom-estado');
                if (el?.value) {
                  const result = toggleEstado?.(el.value);
                  if (result?.message) setStateMessage(result.message);
                  el.value = '';
                }
              }}>+ Adicionar</button>
            </div>
          </div>
          <div className="custom-state-tags">
            {(char.estados || []).filter(state => !['imparavel', 'concentracao', 'cansado', 'envenenado', 'congelado', 'enraizado', 'sangrando', 'atordoado', 'morrendo'].includes(state)).map(state => (
              <span key={state} className="estado-tag active" onClick={() => toggleEstado?.(state)}>{state}</span>
            ))}
          </div>
          {stateMessage && <div className="state-runtime-message">{stateMessage}</div>}
        </div>
      </div>

      {/* Moedas */}
      <div className="card currency-card">
        <div className="card-header">
          <TalosIcon name="coins" size={18} />
          <h3>Moedas</h3>
          <InfoTip className="card-header-info" align="end" title="Conversão de moedas">
            Use as setas de cada moeda para converter somente uma etapa por clique. Para a direita: 100 da moeda atual viram 1 da próxima. Para a esquerda: 1 da moeda atual volta como 100 da moeda anterior.
          </InfoTip>
        </div>
        <div className="card-body">
          <div className="currency-grid">
            {[
              { key: 'pc', label: 'Peças de Cobre', color: '#b87333' },
              { key: 'pp', label: 'Peças de Prata', color: '#a8a9ad' },
              { key: 'po', label: 'Peças de Ouro', color: '#d4a017' },
              { key: 'pd', label: 'Peças de Diamante', color: '#b9f2ff' },
            ].map((m, index, entries) => {
              const amount = Math.max(0, Number(char.moedas?.[m.key]) || 0);
              const previous = entries[index - 1];
              const next = entries[index + 1];
              return (
                <div key={m.key} className={`currency-denomination currency-${m.key}`}>
                  <div className="currency-coin" style={{ '--currency-color': m.color }}>
                    {m.key.toUpperCase()}
                  </div>
                  <input
                    type="number"
                    min={0}
                    value={char.moedas?.[m.key] || 0}
                    onChange={e => {
                      setCurrencyMessage('');
                      update(`moedas.${m.key}`, Math.max(0, Number(e.target.value) || 0));
                    }}
                    aria-label={m.label}
                  />
                  <div className="currency-step-controls" aria-label={`Conversões de ${m.label}`}>
                    {previous ? (
                      <button
                        type="button"
                        className="currency-step-btn"
                        onClick={() => convertCurrencyStep(m.key, 'down')}
                        disabled={amount < 1}
                        title={`1 ${m.key.toUpperCase()} → 100 ${previous.key.toUpperCase()}`}
                        aria-label={`Converter 1 ${m.key.toUpperCase()} em 100 ${previous.key.toUpperCase()}`}
                      >
                        <TalosIcon name="arrow-left" size={13} />
                      </button>
                    ) : <span className="currency-step-spacer" aria-hidden="true" />}
                    {next ? (
                      <button
                        type="button"
                        className="currency-step-btn"
                        onClick={() => convertCurrencyStep(m.key, 'up')}
                        disabled={amount < 100}
                        title={`100 ${m.key.toUpperCase()} → 1 ${next.key.toUpperCase()}`}
                        aria-label={`Converter 100 ${m.key.toUpperCase()} em 1 ${next.key.toUpperCase()}`}
                      >
                        <TalosIcon name="arrow-right" size={13} />
                      </button>
                    ) : <span className="currency-step-spacer" aria-hidden="true" />}
                  </div>
                  <div className="currency-label">{m.label}</div>
                </div>
              );
            })}
          </div>

          <div className="currency-rate-summary currency-rate-summary-centered" aria-label="Taxas de conversão">
            <span>100 PC ⇄ 1 PP</span>
            <span>100 PP ⇄ 1 PO</span>
            <span>100 PO ⇄ 1 PD</span>
          </div>
          {currencyMessage && <div className="currency-conversion-message" role="status">{currencyMessage}</div>}
        </div>
      </div>
    </div>
  );
}
