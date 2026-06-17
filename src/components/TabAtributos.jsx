import { ATTRIBUTES, PERICIAS_BY_ATTR, ESTADOS } from '../data/system';

function signed(value) {
  return value > 0 ? `+${value}` : `${value || 0}`;
}

function AttrBox({ attr, value, mod, onChange, minValue = -10, originBonus = 0, itemBonus = 0 }) {
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
    </div>
  );
}

export default function TabAtributos({ char, update, updateAttr, derived, toggleEstado, togglePericia }) {
  const hpPct = Math.max(0, Math.min(100, (char.hpAtual / char.hpMax) * 100));
  const lockedDeslocamento = derived.originDeslocamentoBase + derived.deslocamentoBonus + derived.deslocamentoItemBonus;
  const lockedLimiteCansaco = derived.originLimiteCansacoBase + derived.limiteCansacoBonus;

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
                <input type="number" value={char.hpAtual} min={-999} max={char.hpMax}
                  onChange={e => update('hpAtual', Number(e.target.value))}
                  style={{ width: 70, textAlign: 'center', fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 600 }} />
                <span style={{ color: 'var(--ink-faded)' }}>/</span>
                <input type="number" value={char.hpMax} min={1}
                  onChange={e => update('hpMax', Number(e.target.value))}
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
                Base: 12 + mod CON + origem {signed(derived.hpOriginBonus)} + itens {signed(derived.hpItemBonus)} = {derived.hpBase}
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
                  Origem {derived.originDeslocamentoBase} + manual {derived.manualDeslocamento} + DES {derived.deslocamentoBonus} + itens {signed(derived.deslocamentoItemBonus)} = {derived.deslocamentoTotal}
                </div>
              </div>
              <div>
                <label>Limite de Cansaço</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="number" value={char.cansacoAtual} min={0} max={derived.limiteCansacoTotal}
                    onChange={e => update('cansacoAtual', Math.max(0, Math.min(derived.limiteCansacoTotal, Number(e.target.value))))}
                    style={{ width: 60, textAlign: 'center' }} />
                  <span style={{ color: 'var(--ink-faded)' }}>/</span>
                  <input type="number" value={derived.limiteCansacoTotal} min={Math.max(0, lockedLimiteCansaco)}
                    onChange={e => update('limiteCansaco', Math.max(0, Number(e.target.value) - lockedLimiteCansaco))}
                    style={{ width: 60, textAlign: 'center' }} />
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--ink-faded)', fontFamily: 'var(--font-heading)' }}>
                  Origem {derived.originLimiteCansacoBase} + manual {derived.manualLimiteCansaco} + CON {derived.limiteCansacoBonus} = {derived.limiteCansacoTotal}
                </div>
              </div>
              <div>
                <label>Inspiração</label>
                <input type="number" value={char.inspiracao} min={0}
                  onChange={e => update('inspiracao', Number(e.target.value))}
                  style={{ width: 80 }} />
              </div>
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
              const attributeLockedBonus = originBonus + itemBonus;
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
      <div className="card">
        <div className="card-header"><span>📚</span><h3>Perícias</h3></div>
        <div className="card-body">
          <div className="grid2">
            {Object.entries(PERICIAS_BY_ATTR).map(([attrKey, pericias]) => {
              const attr = ATTRIBUTES.find(a => a.key === attrKey);
              return (
                <div key={attrKey}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.68rem', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4, borderBottom: '1px solid var(--parch-300)', paddingBottom: 3 }}>
                    {attr?.label}
                  </div>
                  {pericias.map(p => (
                    <label key={p} className="pericia-item">
                      <input type="checkbox" checked={char.pericias.includes(p)} onChange={() => togglePericia(p)} />
                      <span style={{ fontSize: '0.85rem' }}>{p}</span>
                    </label>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Estados */}
      <div className="card">
        <div className="card-header"><span>⚡</span><h3>Estados Ativos</h3></div>
        <div className="card-body">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              { id: 'imparavel', name: 'IMPARÁVEL' },
              { id: 'concentracao', name: 'CONCENTRAÇÃO' },
              { id: 'cansado', name: 'CANSADO' },
              { id: 'envenenado', name: 'ENVENENADO' },
              { id: 'congelado', name: 'CONGELADO' },
              { id: 'sangrando', name: 'SANGRANDO' },
              { id: 'atordoado', name: 'ATORDOADO' },
              { id: 'morrendo', name: 'MORRENDO' },
            ].map(e => (
              <button key={e.id} className={`estado-tag ${char.estados.includes(e.id) ? 'active' : ''}`}
                onClick={() => toggleEstado(e.id)}>
                {e.name}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 10 }}>
            <label>Estado personalizado</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input placeholder="Ex: Amaldiçoado..." id="custom-estado"
                onKeyDown={e => { if (e.key === 'Enter' && e.target.value) { toggleEstado(e.target.value); e.target.value = ''; } }} />
              <button className="btn btn-secondary btn-sm" onClick={() => {
                const el = document.getElementById('custom-estado');
                if (el.value) { toggleEstado(el.value); el.value = ''; }
              }}>+ Adicionar</button>
            </div>
          </div>
          {char.estados.filter(e => !['imparavel','concentracao','cansado','envenenado','congelado','sangrando','atordoado','morrendo'].includes(e)).map(e => (
            <span key={e} className="estado-tag active" style={{ marginTop: 4 }} onClick={() => toggleEstado(e)}>{e}</span>
          ))}
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
