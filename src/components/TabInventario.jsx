import { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import itemsRaw from '../data/items_raw.json';
import { ITEM_SLOTS, RARIDADE_CONFIG } from '../data/system';
import { ITEM_ATTRIBUTE_KEYS, ITEM_ATTRIBUTE_LABELS, summarizeItemEffects } from '../data/itemEffects';

const RARIDADE_ORDER = ['Lixo', 'Comum', 'Raro', 'Épico', 'Lendário', 'Pacto', 'Divino', 'Conjunto'];

function RarityBadge({ rarity }) {
  const cfg = RARIDADE_CONFIG[rarity] || RARIDADE_CONFIG['Comum'];
  return (
    <span style={{
      display: 'inline-block', fontSize: '0.6rem', fontFamily: 'var(--font-heading)',
      textTransform: 'uppercase', letterSpacing: '0.06em', padding: '1px 7px',
      background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color,
      borderRadius: 99,
    }}>{rarity}</span>
  );
}

function ItemDetail({ item, onAdd, inInventory }) {
  const hasStats = item.stats && item.stats !== '—';
  const statIcon = item.category === 'Conjunto' ? '🔗' : item.category === 'Armadura' || item.category === 'Escudo' ? '🛡️' : '📋';
  const effectSummary = summarizeItemEffects(item);
  return (
    <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--parch-300)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', color: 'var(--ink-dark)' }}>{item.name}</span>
          <RarityBadge rarity={item.rarity} />
          <span style={{ fontSize: '0.72rem', color: 'var(--ink-faded)', fontFamily: 'var(--font-heading)' }}>{item.category}</span>
        </div>
        {hasStats ? (
          <div style={{ fontSize: '0.78rem', color: item.category === 'Arma' ? 'var(--red-old)' : 'var(--ink-light)', marginBottom: 2, whiteSpace: 'pre-line' }}>
            {statIcon} {item.stats}
          </div>
        ) : item.damage && <div style={{ fontSize: '0.78rem', color: 'var(--red-old)', marginBottom: 2 }}>⚔️ {item.damage}</div>}
        {item.cost && item.cost !== '-' && <div style={{ fontSize: '0.78rem', color: 'var(--gold-dark)', marginBottom: 4 }}>💰 {item.cost}</div>}
        {effectSummary.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, margin: '6px 0' }}>
            {effectSummary.map(effect => (
              <span key={effect} className="badge" style={{ background: '#fff7ed', borderColor: '#d97706', color: '#92400e' }}>{effect}</span>
            ))}
          </div>
        )}
        <div style={{ fontSize: '0.78rem', color: 'var(--ink-mid)', fontStyle: 'italic', lineHeight: 1.45, whiteSpace: 'pre-line' }}>{item.desc}</div>
      </div>
      <button className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }} onClick={() => onAdd(item)}>
        {inInventory ? '+ Mais' : '+ Add'}
      </button>
    </div>
  );
}

function SlotGrid({ char, items, onUnequip }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 }}>
      {ITEM_SLOTS.map(slot => {
        const equippedId = char.equippedSlots?.[slot.id];
        const equippedItem = equippedId !== undefined ? items.find(i => i.id === equippedId) : null;
        const effectSummary = equippedItem ? summarizeItemEffects(equippedItem) : [];
        return (
          <div key={slot.id} style={{
            padding: '8px 10px', border: `1px solid ${equippedItem ? 'var(--gold-dark)' : 'var(--parch-300)'}`,
            borderRadius: 'var(--radius-md)', background: equippedItem ? 'rgba(212,160,23,0.06)' : 'rgba(253,246,227,0.4)',
            minHeight: 56,
          }}>
            <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-heading)', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>
              {slot.icon} {slot.label}
            </div>
            {equippedItem ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ flex: 1, fontSize: '0.78rem', fontFamily: 'var(--font-heading)', color: 'var(--ink-dark)', lineHeight: 1.3 }}>{equippedItem.name}</span>
                  <button className="btn btn-danger btn-icon" style={{ fontSize: '0.7rem', flexShrink: 0 }} onClick={() => onUnequip(equippedItem.id, slot.id)} title="Desequipar">×</button>
                </div>
                {effectSummary.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                    {effectSummary.slice(0, 4).map(effect => (
                      <span key={effect} className="badge" style={{ fontSize: '0.55rem', background: '#fff7ed', borderColor: '#d97706', color: '#92400e' }}>{effect}</span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ fontSize: '0.75rem', color: 'var(--ink-faded)', fontStyle: 'italic' }}>Vazio</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const MANUAL_CATEGORIES = ['Arma', 'Armadura', 'Escudo', 'Acessório', 'Consumível', 'Ferramenta', 'Outro'];

function numberOrZero(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function ManualItemModal({ item, onClose, onSave }) {
  const [name, setName] = useState(item?.name || '');
  const [category, setCategory] = useState(item?.category || 'Acessório');
  const [rarity, setRarity] = useState(item?.rarity || 'Comum');
  const [damage, setDamage] = useState(item?.damage || '');
  const [desc, setDesc] = useState(item?.desc || '');
  const [special, setSpecial] = useState(item?.effects?.special?.join('\n') || '');
  const [ca, setCa] = useState(item?.effects?.ca || 0);
  const [hpMax, setHpMax] = useState(item?.effects?.hpMax || 0);
  const [deslocamento, setDeslocamento] = useState(item?.effects?.deslocamento || 0);
  const [attrs, setAttrs] = useState(() => Object.fromEntries(
    ITEM_ATTRIBUTE_KEYS.map(key => [key, item?.effects?.attrs?.[key] || 0])
  ));
  const [error, setError] = useState('');

  const handleSave = () => {
    const cleanName = name.trim();
    if (!cleanName) {
      setError('Dê um nome ao item.');
      return;
    }

    onSave({
      name: cleanName,
      category,
      rarity,
      damage: damage.trim(),
      stats: '—',
      cost: '',
      desc: desc.trim(),
      effects: {
        ca: numberOrZero(ca),
        hpMax: numberOrZero(hpMax),
        deslocamento: numberOrZero(deslocamento),
        attrs: Object.fromEntries(ITEM_ATTRIBUTE_KEYS.map(key => [key, numberOrZero(attrs[key])])),
        special: special.split('\n').map(value => value.trim()).filter(Boolean),
      },
    });
  };

  return createPortal(
    <div className="modal-overlay" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={item ? 'Editar item manual' : 'Adicionar item manual'} style={{ maxWidth: 760 }}>
        <div className="modal-header">
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', color: 'var(--ink-faded)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Mochila TALOS</div>
            <h3 style={{ margin: '2px 0 0' }}>{item ? 'Editar item manual' : 'Criar item manual'}</h3>
          </div>
          <button className="btn btn-secondary btn-icon" type="button" onClick={onClose} aria-label="Fechar">×</button>
        </div>
        <div className="modal-body">
          <div className="grid2" style={{ marginBottom: 14 }}>
            <div className="field">
              <label>Nome *</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Medalhão do Vigia" autoFocus />
            </div>
            <div className="field">
              <label>Dano / rolagem opcional</label>
              <input value={damage} onChange={e => setDamage(e.target.value)} placeholder="Ex: 1d8+2" />
            </div>
            <div className="field">
              <label>Categoria</label>
              <select value={category} onChange={e => setCategory(e.target.value)}>
                {MANUAL_CATEGORIES.map(value => <option key={value} value={value}>{value}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Raridade</label>
              <select value={rarity} onChange={e => setRarity(e.target.value)}>
                {RARIDADE_ORDER.map(value => <option key={value} value={value}>{value}</option>)}
              </select>
            </div>
          </div>

          <div style={{ border: '1px solid var(--parch-300)', borderRadius: 'var(--radius-md)', padding: 12, background: 'rgba(253,246,227,0.5)', marginBottom: 14 }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Bônus mecânicos ao equipar</div>
            <div className="grid3" style={{ marginBottom: 12 }}>
              <div className="field"><label>CA</label><input type="number" value={ca} onChange={e => setCa(e.target.value)} /></div>
              <div className="field"><label>HP Máximo</label><input type="number" value={hpMax} onChange={e => setHpMax(e.target.value)} /></div>
              <div className="field"><label>Deslocamento</label><input type="number" value={deslocamento} onChange={e => setDeslocamento(e.target.value)} /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 9 }}>
              {ITEM_ATTRIBUTE_KEYS.map(key => (
                <div className="field" key={key}>
                  <label>{ITEM_ATTRIBUTE_LABELS[key]}</label>
                  <input type="number" value={attrs[key]} onChange={e => setAttrs(current => ({ ...current, [key]: e.target.value }))} />
                </div>
              ))}
            </div>
            <p style={{ margin: '10px 0 0', fontSize: '0.74rem', color: 'var(--ink-faded)', lineHeight: 1.45 }}>
              Os valores acima entram automaticamente em Atributos, CA, HP e Deslocamento <strong>somente enquanto o item estiver equipado</strong>. Valores negativos também são aceitos.
            </p>
          </div>

          <div className="field" style={{ marginBottom: 12 }}>
            <label>Descrição</label>
            <textarea rows={3} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Aparência, origem, propriedades narrativas..." />
          </div>
          <div className="field">
            <label>Efeitos / observações adicionais</label>
            <textarea rows={3} value={special} onChange={e => setSpecial(e.target.value)} placeholder={'Um efeito por linha.\nEx: Brilha perto de mortos-vivos.'} />
          </div>
          {error && <div style={{ marginTop: 10, color: '#b91c1c', fontSize: '0.8rem' }}>{error}</div>}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" type="button" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" type="button" onClick={handleSave}>{item ? 'Salvar alterações' : 'Adicionar à Mochila'}</button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function TabInventario({ char, derived, addInventoryItem, addCustomInventoryItem, updateCustomInventoryItem, removeInventoryItem, equipItem }) {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [filterRar, setFilterRar] = useState('');
  const [activeTab, setActiveTab] = useState('equipped'); // 'equipped' | 'bag' | 'catalog'
  const [manualEditor, setManualEditor] = useState(null);

  const allItems = useMemo(() => [...itemsRaw, ...(char.customItems || [])], [char.customItems]);
  const inventoryItems = useMemo(() =>
    char.inventario.map(inv => ({ ...inv, item: allItems.find(i => i.id === inv.itemId) })).filter(i => i.item),
    [char.inventario, allItems]
  );

  const filteredCatalog = useMemo(() => {
    let list = itemsRaw;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(i =>
        i.name.toLowerCase().includes(q) ||
        (i.desc || '').toLowerCase().includes(q) ||
        (i.stats || '').toLowerCase().includes(q)
      );
    }
    if (filterCat) list = list.filter(i => i.category === filterCat);
    if (filterRar) list = list.filter(i => i.rarity === filterRar);
    return list;
  }, [search, filterCat, filterRar]);

  const inInventorySet = useMemo(() => new Set(char.inventario.map(i => i.itemId)), [char.inventario]);

  const categories = useMemo(() => [...new Set(itemsRaw.map(i => i.category))], []);
  const raridades = useMemo(() => {
    const present = new Set(itemsRaw.map(i => i.rarity));
    return RARIDADE_ORDER.filter(r => present.has(r));
  }, []);

  const handleUnequip = (itemId) => {
    equipItem(itemId, null);
  };

  return (
    <div className="stack">
      {/* Sub-tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {[
          { id: 'equipped', label: '🛡️ Equipado', count: Object.keys(char.equippedSlots || {}).length },
          { id: 'bag', label: '🎒 Mochila', count: inventoryItems.length },
          { id: 'catalog', label: '📦 Catálogo', count: itemsRaw.length },
        ].map(t => (
          <button key={t.id} className={`btn ${activeTab === t.id ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab(t.id)}>
            {t.label} <span style={{ opacity: 0.7, fontSize: '0.65rem' }}>({t.count})</span>
          </button>
        ))}
      </div>

      {/* Equipped view */}
      {activeTab === 'equipped' && (
        <div className="card">
          <div className="card-header"><span>🛡️</span><h3>Itens Equipados</h3></div>
          <div className="card-body">
            {derived.itemEffects.summary.length > 0 && (
              <div style={{ border: '1px solid var(--parch-300)', background: 'rgba(253,246,227,0.55)', borderRadius: 'var(--radius-md)', padding: '10px 12px', marginBottom: 12 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.68rem', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                  Resumo efetivo equipado
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {derived.itemEffects.summary.map(effect => (
                    <span key={effect} className="badge" style={{ background: '#fff7ed', borderColor: '#d97706', color: '#92400e' }}>{effect}</span>
                  ))}
                </div>
              </div>
            )}
            <SlotGrid char={char} items={allItems} onUnequip={handleUnequip} />
            <p style={{ marginTop: 12, fontSize: '0.75rem', color: 'var(--ink-faded)', fontStyle: 'italic' }}>
              Para equipar um item, vá para <strong>Mochila</strong> e clique em "Equipar" no item desejado.
            </p>
          </div>
        </div>
      )}

      {/* Bag view */}
      {activeTab === 'bag' && (
        <div className="card">
          <div className="card-header">
            <span>🎒</span>
            <h3>Mochila ({inventoryItems.length} itens)</h3>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-sm" onClick={() => setManualEditor({ mode: 'new' })}>
                + Item manual
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('catalog')}>
                + Adicionar do Catálogo
              </button>
            </div>
          </div>
          <div className="card-body">
            {inventoryItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--ink-faded)' }}>
                <div style={{ fontSize: '2rem', marginBottom: 8 }}>🎒</div>
                <p style={{ fontSize: '0.88rem', fontStyle: 'italic' }}>Mochila vazia. Adicione um item manualmente ou use o Catálogo.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {inventoryItems.map(({ itemId, qty, equipped, slot, item }) => {
                  if (!item) return null;
                  const isEquipped = equipped && slot;
                  const effectSummary = summarizeItemEffects(item);
                  return (
                    <div key={itemId} className={`item-card ${isEquipped ? 'equipped' : ''}`}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 3 }}>
                          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem' }}>{item.name}</span>
                          <RarityBadge rarity={item.rarity} />
                          {item.isCustom && <span style={{ fontSize: '0.58rem', fontFamily: 'var(--font-heading)', color: '#0f766e', border: '1px solid #14b8a6', background: '#ecfdf5', borderRadius: 99, padding: '1px 6px' }}>MANUAL</span>}
                          {isEquipped && <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-heading)', color: 'var(--gold-dark)', background: 'rgba(212,160,23,0.1)', padding: '1px 6px', borderRadius: 3, border: '1px solid var(--gold-dark)' }}>EQUIPADO</span>}
                        </div>
                        {item.damage && <div style={{ fontSize: '0.75rem', color: 'var(--red-old)' }}>⚔️ {item.damage}</div>}
                        {item.stats && item.stats !== '—' && (
                          <div style={{ fontSize: '0.72rem', color: 'var(--ink-light)', lineHeight: 1.35, marginTop: 2 }}>{item.stats.substring(0, 120)}{item.stats.length > 120 ? '…' : ''}</div>
                        )}
                        {effectSummary.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 6 }}>
                            {effectSummary.map(effect => (
                              <span key={effect} className="badge" style={{ background: '#fff7ed', borderColor: '#d97706', color: '#92400e' }}>{effect}</span>
                            ))}
                          </div>
                        )}
                        <div style={{ fontSize: '0.75rem', color: 'var(--ink-faded)', fontStyle: 'italic', lineHeight: 1.4, marginTop: 2 }}>{(item.desc || '').substring(0, 120)}{(item.desc || '').length > 120 ? '…' : ''}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end', flexShrink: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--ink-faded)', fontFamily: 'var(--font-heading)' }}>×{qty}</span>
                        </div>
                        {!isEquipped ? (
                          <select style={{ width: 130, fontSize: '0.72rem', padding: '3px 6px' }}
                            onChange={e => { if (e.target.value) equipItem(itemId, e.target.value); }}>
                            <option value="">Equipar em...</option>
                            {ITEM_SLOTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                          </select>
                        ) : (
                          <button className="btn btn-secondary btn-sm" onClick={() => equipItem(itemId, null)}>Desequipar</button>
                        )}
                        {item.isCustom && <button className="btn btn-secondary btn-sm" onClick={() => setManualEditor({ mode: 'edit', item })}>Editar</button>}
                        <button className="btn btn-danger btn-sm" onClick={() => removeInventoryItem(itemId)}>Remover</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Catalog view */}
      {activeTab === 'catalog' && (
        <div className="card">
          <div className="card-header"><span>📦</span><h3>Catálogo de Itens ({filteredCatalog.length} / {itemsRaw.length})</h3></div>
          <div className="card-body">
            {/* Filters */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
              <div style={{ flex: '1 1 200px', position: 'relative' }}>
                <span className="search-icon">🔍</span>
                <input placeholder="Buscar por nome ou efeito..." value={search}
                  onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 34 }} />
              </div>
              <select value={filterCat} onChange={e => setFilterCat(e.target.value)} style={{ flex: '0 0 140px' }}>
                <option value="">Todas as categorias</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={filterRar} onChange={e => setFilterRar(e.target.value)} style={{ flex: '0 0 130px' }}>
                <option value="">Todas as raridades</option>
                {raridades.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              {(search || filterCat || filterRar) && (
                <button className="btn btn-secondary btn-sm" onClick={() => { setSearch(''); setFilterCat(''); setFilterRar(''); }}>Limpar</button>
              )}
            </div>

            {/* Items list */}
            <div style={{ maxHeight: '60vh', overflowY: 'auto', border: '1px solid var(--parch-300)', borderRadius: 'var(--radius-md)', background: 'var(--parch-100)' }}>
              {filteredCatalog.length === 0 ? (
                <div style={{ padding: '30px', textAlign: 'center', color: 'var(--ink-faded)', fontStyle: 'italic' }}>Nenhum item encontrado.</div>
              ) : (
                filteredCatalog.map(item => (
                  <ItemDetail key={item.id} item={item} onAdd={addInventoryItem} inInventory={inInventorySet.has(item.id)} />
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {manualEditor && (
        <ManualItemModal
          key={manualEditor.mode === 'edit' ? manualEditor.item.id : 'new-manual-item'}
          item={manualEditor.mode === 'edit' ? manualEditor.item : null}
          onClose={() => setManualEditor(null)}
          onSave={itemData => {
            if (manualEditor.mode === 'edit') {
              updateCustomInventoryItem(manualEditor.item.id, itemData);
            } else {
              addCustomInventoryItem(itemData);
            }
            setManualEditor(null);
          }}
        />
      )}
    </div>
  );
}
