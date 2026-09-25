import { useState } from 'react';
import { ATTRIBUTES, PERICIAS_BY_ATTR, PERICIAS_INFO, getProfissaoData } from '../data/system';
import { CONDITION_MARKERS, OFFICIAL_STATE_DEFS } from '../data/stateRuntime';
import { INSPIRATION_TABLE_RULE } from '../data/tableRules';

function signed(value) {
  return value > 0 ? `+${value}` : `${value || 0}`;
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
  return (
    <div className="attr-box" style={isMagia ? { background: 'rgba(29,78,216,0.04)', borderColor: 'rgba(29,78,216,0.25)' } : {}}>
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
        title={attr.desc}
        style={isMagia ? { color: '#1d4ed8' } : {}}
      />
      <div className="attr-mod" style={isMagia ? { background: '#1d4ed8' } : {}}>{mod >= 0 ? '+' : ''}{mod}</div>
      <div style={{ fontSize: '0.6rem', color: isMagia ? '#1d4ed8' : 'var(--ink-faded)', marginTop: 4, textAlign: 'center', fontFamily: 'var(--font-heading)', letterSpacing: '0.04em', lineHeight: 1.2 }}>
        {attr.label}{isMagia ? ' *' : ''}
      </div>
      {originBonus !== 0 && (
        <div style={{ fontSize: '0.58rem', color: '#166534', marginTop: 3, fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>
          {originBonus > 0 ? '+' : ''}{originBonus} origem
        </div>
      )}
      {itemBonus !== 0 && (
        <div style={{ fontSize: '0.58rem', color: 'var(--gold-dark)', marginTop: 3, fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>
          {itemBonus > 0 ? '+' : ''}{itemBonus} item
        </div>
      )}
      {classBonus !== 0 && (
        <div style={{ fontSize: '0.58rem', color: '#7c2d12', marginTop: 3, fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>
          {classBonus > 0 ? '+' : ''}{classBonus} classe
        </div>
      )}
      {stateBonus !== 0 && (
        <div style={{ fontSize: '0.58rem', color: '#0f766e', marginTop: 3, fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>
          {stateBonus > 0 ? '+' : ''}{stateBonus} estado
        </div>
      )}
      {levelAllocation > 0 && (
        <div style={{ fontSize: '0.58rem', color: '#7c3aed', marginTop: 3, fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>
          +{levelAllocation} por evolução
        </div>
      )}
      <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 6 }}>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onRefundPoint}
          disabled={levelAllocation <= 0}
          title="Devolver 1 ponto distributivo aplicado por evolução"
          style={{ minWidth: 28, padding: '2px 7px' }}
        >
          −
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={onSpendPoint}
          disabled={!canSpendPoint}
          title="Gastar 1 ponto distributivo neste atributo"
          style={{ minWidth: 28, padding: '2px 7px' }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function TabAtributos({ char, update, updateAttr, derived, toggleEstado, consumeConcentration, togglePericia, spendAttributePoint, refundAttributePoint, setCansaco }) {
  const [stateMessage, setStateMessage] = useState('');
  const hpMaxTotal = derived.hpMaxTotal || char.hpMax;
  const hpPct = Math.max(0, Math.min(100, (char.hpAtual / hpMaxTotal) * 100));
  const lockedDeslocamento = derived.originDeslocamentoBase + derived.deslocamentoBonus + derived.deslocamentoItemBonus;
  const lockedLimiteCansaco = derived.originLimiteCansacoBase + derived.limiteCansacoBonus;
  const profissaoData = getProfissaoData(char.profissao);
  const periciasProfissao = new Set(profissaoData?.pericias || []);
  const periciasOrigem = new Set(derived.originProficiencies || []);

  return (
    <div className="stack">
      {/* HP & CA */}
      <div className="card">
        <div className="card-header"><span>❤️</span><h3>Vitais</h3></div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
            {/* HP */}
            <div>
              <label>Pontos de Vida (HP)</label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <input type="number" value={char.hpAtual} min={-999} max={hpMaxTotal}
                  onChange={e => update('hpAtual', Number(e.target.value))}
                  style={{ width: 70, textAlign: 'center', fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 600 }} />
                <span style={{ color: 'var(--ink-faded)' }}>/</span>
                <input type="number" value={hpMaxTotal} min={1}
                  onChange={e => update('hpManualBonus', Number(e.target.value) - derived.hpBase - derived.hpLevelRollBonus)}
                  style={{ width: 70, textAlign: 'center', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }} />
              </div>
              <div className="stat-bar-track">
                <div className="stat-bar-fill stat-bar-hp" style={{ width: `${hpPct}%` }} />
              </div>
              <div style={{ marginTop: 6 }}>
                <label>HP Temporário</label>
                <input type="number" value={char.hpTemp} min={0}
                  onChange={e => update('hpTemp', Number(e.target.value))}
                  style={{ width: 80 }} />
              </div>
              <div style={{ marginTop: 4, fontSize: '0.75rem', color: 'var(--ink-faded)', fontFamily: 'var(--font-heading)' }}>
                Base TALOS: 12 + mod CON + origem {signed(derived.hpOriginBonus)} + itens {signed(derived.hpItemBonus)} = {derived.hpBase} | níveis {signed(derived.hpLevelRollBonus)} | ajuste manual {signed(derived.hpManualBonus)}
              </div>
            </div>

            {/* CA */}
            <div>
              <label>Classe de Armadura (CA)</label>
              <div className="big-num" style={{ marginBottom: 4 }}>{derived.caTotal}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--ink-faded)', fontFamily: 'var(--font-heading)', lineHeight: 1.6 }}>
                8 + DES(lim.4) + CON(lim.4) + manual + origem {signed(derived.caOriginBonus)} + itens {signed(derived.caItemBonus)}
              </div>
              <div style={{ marginTop: 8 }}>
                <label>Bônus CA manual</label>
                <input type="number" value={char.caBonus} min={0}
                  onChange={e => update('caBonus', Number(e.target.value))}
                  style={{ width: 80 }} />
              </div>
            </div>

            {/* Outros */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <label>Deslocamento (sqm)</label>
                <input type="number" value={derived.deslocamentoTotal} min={Math.max(0, lockedDeslocamento)}
                  onChange={e => update('deslocamento', Math.max(0, Number(e.target.value) - lockedDeslocamento))}
                  style={{ width: 80 }} />
                <div style={{ fontSize: '0.72rem', color: 'var(--ink-faded)', fontFamily: 'var(--font-heading)' }}>
                  {derived.originMovementSpecified ? `Origem ${derived.originDeslocamentoBase}` : 'Origem: não informado no v6'} + manual {derived.manualDeslocamento} + DES {derived.deslocamentoBonus} + itens {signed(derived.deslocamentoItemBonus)} = {derived.deslocamentoTotal}
                </div>
              </div>
              <div>
                <label>Limite de Cansaço</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <input type="number" value={derived.cansacoAtual} min={0} max={derived.limiteCansacoTotal}
                    onChange={e => setCansaco?.(Number(e.target.value))}
                    style={{ width: 60, textAlign: 'center' }} />
                  <span style={{ color: 'var(--ink-faded)' }}>/</span>
                  <input type="number" value={derived.limiteCansacoTotal} min={Math.max(0, lockedLimiteCansaco)}
                    onChange={e => update('limiteCansaco', Math.max(0, Number(e.target.value) - lockedLimiteCansaco))}
                    style={{ width: 60, textAlign: 'center' }} />
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setCansaco?.(Math.max(0, derived.cansacoAtual - 1))}>−1</button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setCansaco?.(derived.cansacoAtual + 1)} disabled={derived.cansacoAtual >= derived.limiteCansacoTotal}>+1 uso</button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setCansaco?.(0)} disabled={derived.cansacoAtual <= 0}>Zerar</button>
                </div>
                <div className="fatigue-track" aria-label={`Cansaço ${derived.cansacoAtual} de ${derived.limiteCansacoTotal}`}>
                  <span style={{ width: `${derived.cansacoPercentual || 0}%` }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 5 }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--ink-faded)', fontFamily: 'var(--font-heading)' }}>
                    {derived.originFatigueSpecified ? `Origem ${derived.originLimiteCansacoBase}` : char.origem === 'meio-orc' ? 'Origem: escolha a Fusão' : 'Origem: não informado no v6'} + manual {derived.manualLimiteCansaco} + CON {derived.limiteCansacoBonus} = {derived.limiteCansacoTotal}
                  </div>
                  {derived.isCansado && <span className="badge fatigue-danger">CANSADO — bônus de acerto da Shikata desativado</span>}
                </div>
                <div style={{ marginTop: 4, fontSize: '0.7rem', color: 'var(--ink-faded)', lineHeight: 1.4 }}>
                  Cada uso de habilidade consome 1 ponto deste limite. Ao atingir o máximo, habilidades continuam disponíveis, mas o modificador de acerto da classe deixa de ser somado. Descanso curto recupera o estado.
                </div>
              </div>
              <div className="inspiration-control">
                <label>Inspiração</label>
                <div className="inspiration-counter">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => update('inspiracao', Math.max(0, (Number(char.inspiracao) || 0) - 1))} disabled={(Number(char.inspiracao) || 0) <= 0}>−</button>
                  <strong>{Math.max(0, Number(char.inspiracao) || 0)}</strong>
                  <button type="button" className="btn btn-primary btn-sm" onClick={() => update('inspiracao', Math.max(0, Number(char.inspiracao) || 0) + 1)}>+</button>
                </div>
                <small>Acumula normalmente. Nesta ficha, conforme a regra definida pela mesa, gastar 1 Inspiração concede <strong>+{INSPIRATION_TABLE_RULE.bonus} na rolagem</strong>.</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Level progression points */}
      <div className="card">
        <div className="card-header"><span>⬆</span><h3>Pontos Distributivos de Evolução</h3></div>
        <div className="card-body">
          <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.68rem', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Disponíveis
              </div>
              <div className="big-num" style={{ fontSize: '2.2rem', marginTop: 2 }}>{char.pontosDistributivos || 0}</div>
            </div>
            <div style={{ flex: 1, minWidth: 220, fontSize: '0.82rem', color: 'var(--ink-mid)', lineHeight: 1.55 }}>
              Cada uso de <strong>Subir de nível</strong> concede 2 pontos. Use os botões <strong>+</strong> e <strong>−</strong> em cada atributo para distribuir ou devolver somente os pontos ganhos por evolução. A edição numérica manual dos atributos continua livre para criação de personagem e ajustes do mestre.
            </div>
          </div>
        </div>
      </div>

      {/* Attributes */}
      <div className="card">
        <div className="card-header"><span>💪</span><h3>Atributos</h3></div>
        <div className="card-body">
          <div className="attrs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 10, justifyItems: 'center' }}>
            {ATTRIBUTES.map(attr => {
              const isMagia = attr.key === 'magia';
              const originBonus = derived.originAttrBonuses?.[attr.key] || 0;
              const itemBonus = derived.itemAttrBonuses?.[attr.key] || 0;
              const classBonus = derived.classAttrBonuses?.[attr.key] || 0;
              const stateBonus = derived.stateAttrBonuses?.[attr.key] || 0;
              const attributeLockedBonus = originBonus + itemBonus + classBonus + stateBonus;
              // Valor exibido = base + origem + itens. Magia ainda soma INT÷2.
              const displayValue = isMagia ? derived.magiaTotal : derived.attrsTotal[attr.key];
              const lockedBonus = isMagia ? derived.magiaFromInt + attributeLockedBonus : attributeLockedBonus;
              // Mapa explícito de abbr -> chave do derived (evita bug de geração dinâmica)
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

          <div style={{ marginTop: 16, padding: '10px 14px', background: 'rgba(253,246,227,0.5)', border: '1px solid var(--parch-300)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Conversões Automáticas</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: '0.82rem', color: 'var(--ink-mid)' }}>
              <span>INT ({derived.attrsTotal.inteligencia}) → +{derived.magiaFromInt} Magia (total: {derived.magiaTotal})</span>
              <span>DES ({derived.attrsTotal.destreza}) → +{derived.deslocamentoBonus} Deslocamento (total: {derived.deslocamentoTotal})</span>
              <span>CON ({derived.attrsTotal.constituicao}) → +{derived.limiteCansacoBonus} Limite Cansaço (total: {derived.limiteCansacoTotal})</span>
            </div>
            {derived.originEffects.summary.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                {derived.originEffects.summary.map(effect => (
                  <span key={effect} className="badge" style={{ background: '#ecfdf5', borderColor: '#16a34a', color: '#166534' }}>{effect}</span>
                ))}
              </div>
            )}
            {derived.itemEffects.summary.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                {derived.itemEffects.summary.map(effect => (
                  <span key={effect} className="badge" style={{ background: '#fff7ed', borderColor: '#d97706', color: '#92400e' }}>{effect}</span>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: 12, padding: '8px 12px', background: 'rgba(248,250,252,0.5)', border: '1px dashed var(--parch-400)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', color: 'var(--ink-faded)', fontFamily: 'var(--font-heading)', lineHeight: 1.8 }}>
            💡 Distribuição Fixa: 6, 5, 4, 4, 4, 3, 2, 2 — OU — role 3d4 e anote a soma dos 2 menores, 8 vezes | * Magia calculada automaticamente (base + INT÷2)
          </div>
        </div>
      </div>

      {/* Perícias */}
      <div className="card pericias-card">
        <div className="card-header"><span>📚</span><h3>Perícias</h3></div>
        <div className="card-body">
          <div className="pericia-hint">Passe o mouse ou foque no <strong>?</strong> para consultar o resumo oficial da perícia.</div>
          <div className="grid2">
            {Object.entries(PERICIAS_BY_ATTR).map(([attrKey, pericias]) => {
              const attr = ATTRIBUTES.find(a => a.key === attrKey);
              return (
                <div key={attrKey}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.68rem', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4, borderBottom: '1px solid var(--parch-300)', paddingBottom: 3 }}>
                    {attr?.label}
                  </div>
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
                        <label htmlFor={inputId} className="pericia-name" title={lockedByProfession ? `Perícia fixa da profissão: ${profissaoData.name}` : lockedByOrigin ? 'Proficiência escolhida pela Origem' : undefined}>
                          {p}
                        </label>
                        <span className="pericia-help" tabIndex={0} aria-label={`Resumo de ${p}`}>
                          ?
                          <span className="pericia-tooltip" role="tooltip">
                            <strong>{p}</strong>
                            <span>{PERICIAS_INFO[p] || 'Descrição não cadastrada no documento TALOS v6.'}</span>
                          </span>
                        </span>
                        {lockedByProfession && <span className="pericia-locked-tag">Profissão</span>}
                        {!lockedByProfession && lockedByOrigin && <span className="pericia-locked-tag">Origem</span>}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Estados */}
      <div className="card states-card">
        <div className="card-header"><span>⚡</span><h3>Estados & Condições</h3></div>
        <div className="card-body stack">
          <div>
            <div className="state-section-title">Estados oficiais TALOS v6</div>
            <div className="official-state-grid">
              {OFFICIAL_STATE_DEFS.map(state => {
                const active = state.id === 'cansado' ? derived.isCansado : (char.estados || []).includes(state.id);
                return (
                  <div key={state.id} className={`official-state-card ${active ? 'active' : ''} ${state.id === 'cansado' && active ? 'danger' : ''}`}>
                    <div className="official-state-head">
                      <strong>{state.name}</strong>
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
                    <p>{state.desc}</p>
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
            <div className="state-section-title">Marcadores de condição</div>
            <p className="state-section-note">O v6 usa estes termos em várias habilidades, mas não fornece um efeito central único para todos eles. A ficha os registra sem inventar dano, duração ou perda de ações. IMPARÁVEL bloqueia apenas as imunidades citadas explicitamente.</p>
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

          <div>
            <label>Estado / condição personalizada</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input placeholder="Ex: Amaldiçoado..." id="custom-estado"
                onKeyDown={e => {
                  if (e.key === 'Enter' && e.target.value) {
                    const result = toggleEstado?.(e.target.value);
                    if (result?.message) setStateMessage(result.message);
                    e.target.value = '';
                  }
                }} />
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
          {(char.estados || []).filter(state => !['imparavel','concentracao','cansado','envenenado','congelado','enraizado','sangrando','atordoado','morrendo'].includes(state)).map(state => (
            <span key={state} className="estado-tag active" style={{ marginTop: 4 }} onClick={() => toggleEstado?.(state)}>{state}</span>
          ))}
          {stateMessage && <div className="state-runtime-message">{stateMessage}</div>}
        </div>
      </div>

      {/* Moedas */}
      <div className="card">
        <div className="card-header"><span>💰</span><h3>Moedas</h3></div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[
              { key: 'pc', label: 'Peças de Cobre', color: '#b87333' },
              { key: 'pp', label: 'Peças de Prata', color: '#a8a9ad' },
              { key: 'po', label: 'Peças de Ouro', color: '#d4a017' },
              { key: 'pd', label: 'Peças de Diamante', color: '#b9f2ff' },
            ].map(m => (
              <div key={m.key} style={{ textAlign: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: m.color, margin: '0 auto 6px', border: '2px solid rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', color: m.key === 'pd' ? '#1a3a6b' : '#fff' }}>
                  {m.key.toUpperCase()}
                </div>
                <input type="number" min={0} value={char.moedas?.[m.key] || 0}
                  onChange={e => update(`moedas.${m.key}`, Number(e.target.value))}
                  style={{ textAlign: 'center' }} />
                <div style={{ fontSize: '0.6rem', color: 'var(--ink-faded)', marginTop: 2, fontFamily: 'var(--font-heading)' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
