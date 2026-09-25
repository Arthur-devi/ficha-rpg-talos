import { useDeferredValue, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import itemsRaw from '../data/items_raw.json';
import { ITEM_SLOTS, RARIDADE_CONFIG } from '../data/system';
import { ITEM_ATTRIBUTE_KEYS, ITEM_ATTRIBUTE_LABELS, summarizeItemEffects } from '../data/itemEffects';
import TalosIcon from './TalosIcon';
import InfoTip from './InfoTip';

const RARIDADE_ORDER = ['Lixo', 'Comum', 'Raro', 'Épico', 'Lendário', 'Pacto', 'Divino', 'Conjunto'];
const MANUAL_CATEGORIES = ['Arma', 'Armadura', 'Escudo', 'Acessório', 'Consumível', 'Ferramenta', 'Outro'];
const CATALOG_PAGE_SIZE = 60;

function RarityBadge({ rarity }) {
  const cfg = RARIDADE_CONFIG[rarity] || RARIDADE_CONFIG.Comum;
  return (
    <span
      className="inventory-rarity-badge"
      style={{ '--rarity-bg': cfg.bg, '--rarity-border': cfg.border, '--rarity-color': cfg.color }}
    >
      {rarity}
    </span>
  );
}

function ItemEffects({ effects, compact = false }) {
  if (!effects?.length) return null;
  const visible = compact ? effects.slice(0, 4) : effects;
  return (
    <div className={`inventory-effect-list ${compact ? 'compact' : ''}`}>
      {visible.map(effect => <span key={effect} className="inventory-effect-badge">{effect}</span>)}
      {compact && effects.length > visible.length && <span className="inventory-effect-more">+{effects.length - visible.length}</span>}
    </div>
  );
}

function ItemInfoTip({ item, effectSummary }) {
  const hasDetails = item.desc || item.stats || item.damage || item.cost || effectSummary.length || item.effects?.special?.length;
  if (!hasDetails) return null;
  return (
    <InfoTip title={item.name} align="end" label={`Detalhes de ${item.name}`}>
      <span className="inventory-info-copy">
        {item.category && <span><b>Categoria:</b> {item.category}</span>}
        {item.rarity && <span><b>Raridade:</b> {item.rarity}</span>}
        {item.damage && <span><b>Dano:</b> {item.damage}</span>}
        {item.stats && item.stats !== '—' && <span><b>Estatísticas:</b> {item.stats}</span>}
        {item.cost && item.cost !== '-' && <span><b>Custo:</b> {item.cost}</span>}
        {effectSummary.length > 0 && <span><b>Efeitos ao equipar:</b> {effectSummary.join(' · ')}</span>}
        {item.desc && <span>{item.desc}</span>}
        {(item.effects?.special || []).map((line, index) => <span key={`${line}-${index}`}>{line}</span>)}
      </span>
    </InfoTip>
  );
}

function CatalogItem({ item, onAdd, inInventory }) {
  const effectSummary = summarizeItemEffects(item);
  const statIcon = item.category === 'Conjunto'
    ? 'link'
    : item.category === 'Armadura' || item.category === 'Escudo'
      ? 'shield'
      : 'list';

  return (
    <article className="inventory-catalog-entry">
      <div className="inventory-catalog-main">
        <div className="inventory-entry-heading">
          <div>
            <strong>{item.name}</strong>
            <span>{item.category}</span>
          </div>
          <RarityBadge rarity={item.rarity} />
          <ItemInfoTip item={item} effectSummary={effectSummary} />
        </div>

        <div className="inventory-entry-facts">
          {item.damage && <span className="semantic-negative"><TalosIcon name="combat" size={13} /> {item.damage}</span>}
          {item.stats && item.stats !== '—' && <span><TalosIcon name={statIcon} size={13} /> {item.stats}</span>}
          {item.cost && item.cost !== '-' && <span className="semantic-accent"><TalosIcon name="money" size={13} /> {item.cost}</span>}
        </div>
        <ItemEffects effects={effectSummary} compact />
        {item.desc && <p className="inventory-entry-description">{item.desc}</p>}
      </div>
      <button type="button" className="btn btn-secondary btn-sm inventory-add-button" onClick={() => onAdd(item)}>
        {inInventory ? '+ Mais um' : '+ Mochila'}
      </button>
    </article>
  );
}

function SlotGrid({ char, itemById, onUnequip }) {
  return (
    <div className="equipment-slot-grid">
      {ITEM_SLOTS.map((slot, index) => {
        const equippedId = char.equippedSlots?.[slot.id];
        const equippedItem = equippedId !== undefined ? itemById.get(equippedId) : null;
        const effectSummary = equippedItem ? summarizeItemEffects(equippedItem) : [];
        return (
          <article key={slot.id} className={`equipment-slot-card ${equippedItem ? 'filled' : 'empty'}`}>
            <div className="equipment-slot-index">{String(index + 1).padStart(2, '0')}</div>
            <div className="equipment-slot-content">
              <span className="equipment-slot-label">{slot.label}</span>
              {equippedItem ? (
                <>
                  <div className="equipment-slot-item-line">
                    <strong>{equippedItem.name}</strong>
                    <ItemInfoTip item={equippedItem} effectSummary={effectSummary} />
                  </div>
                  <ItemEffects effects={effectSummary} compact />
                </>
              ) : (
                <span className="equipment-slot-empty">Vazio</span>
              )}
            </div>
            {equippedItem && (
              <button type="button" className="equipment-slot-remove" onClick={() => onUnequip(equippedItem.id)} aria-label={`Desequipar ${equippedItem.name}`} title="Desequipar">
                ×
              </button>
            )}
          </article>
        );
      })}
    </div>
  );
}

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
    ITEM_ATTRIBUTE_KEYS.map(key => [key, item?.effects?.attrs?.[key] || 0]),
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
    <div className="modal-overlay" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="modal inventory-manual-modal" role="dialog" aria-modal="true" aria-label={item ? 'Editar item manual' : 'Adicionar item manual'}>
        <div className="modal-header inventory-manual-header">
          <TalosIcon name="inventory" size={20} />
          <div>
            <small>Mochila TALOS</small>
            <h3>{item ? 'Editar item manual' : 'Registrar item manual'}</h3>
          </div>
          <button className="btn btn-secondary btn-icon" type="button" onClick={onClose} aria-label="Fechar">×</button>
        </div>
        <div className="modal-body inventory-manual-body">
          <div className="inventory-manual-grid">
            <div className="field inventory-manual-wide">
              <label>Nome *</label>
              <input value={name} onChange={event => setName(event.target.value)} placeholder="Ex: Medalhão do Vigia" autoFocus />
            </div>
            <div className="field">
              <label>Categoria</label>
              <select value={category} onChange={event => setCategory(event.target.value)}>
                {MANUAL_CATEGORIES.map(value => <option key={value} value={value}>{value}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Raridade</label>
              <select value={rarity} onChange={event => setRarity(event.target.value)}>
                {RARIDADE_ORDER.map(value => <option key={value} value={value}>{value}</option>)}
              </select>
            </div>
            <div className="field inventory-manual-wide">
              <label>Dano / rolagem opcional</label>
              <input value={damage} onChange={event => setDamage(event.target.value)} placeholder="Ex: 1d8+2" />
            </div>
          </div>

          <section className="inventory-manual-section">
            <div className="inventory-manual-section-title">
              <div>
                <span>Bônus mecânicos ao equipar</span>
                <small>Só entram nos totais enquanto o item estiver equipado.</small>
              </div>
              <InfoTip title="Bônus mecânicos" align="end" label="Sobre bônus de item">
                CA, HP máximo, Deslocamento e atributos são agregados automaticamente somente enquanto o item estiver equipado. Valores negativos também são aceitos.
              </InfoTip>
            </div>
            <div className="inventory-manual-core-bonuses">
              <div className="field"><label>CA</label><input type="number" value={ca} onChange={event => setCa(event.target.value)} /></div>
              <div className="field"><label>HP Máximo</label><input type="number" value={hpMax} onChange={event => setHpMax(event.target.value)} /></div>
              <div className="field"><label>Deslocamento</label><input type="number" value={deslocamento} onChange={event => setDeslocamento(event.target.value)} /></div>
            </div>
            <div className="inventory-manual-attributes">
              {ITEM_ATTRIBUTE_KEYS.map(key => (
                <div className="field" key={key}>
                  <label>{ITEM_ATTRIBUTE_LABELS[key]}</label>
                  <input type="number" value={attrs[key]} onChange={event => setAttrs(current => ({ ...current, [key]: event.target.value }))} />
                </div>
              ))}
            </div>
          </section>

          <div className="inventory-manual-text-grid">
            <div className="field">
              <label>Descrição</label>
              <textarea rows={4} value={desc} onChange={event => setDesc(event.target.value)} placeholder="Aparência, origem, propriedades narrativas..." />
            </div>
            <div className="field">
              <label>Efeitos / observações adicionais</label>
              <textarea rows={4} value={special} onChange={event => setSpecial(event.target.value)} placeholder={'Um efeito por linha.\nEx: Brilha perto de mortos-vivos.'} />
            </div>
          </div>
          {error && <div className="inventory-manual-error">{error}</div>}
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
  const [activeTab, setActiveTab] = useState('equipped');
  const [manualEditor, setManualEditor] = useState(null);
  const [catalogLimit, setCatalogLimit] = useState(CATALOG_PAGE_SIZE);
  const deferredSearch = useDeferredValue(search);

  const allItems = useMemo(() => [...itemsRaw, ...(char.customItems || [])], [char.customItems]);
  const itemById = useMemo(() => new Map(allItems.map(item => [item.id, item])), [allItems]);
  const inventoryItems = useMemo(
    () => char.inventario
      .map(entry => ({ ...entry, item: itemById.get(entry.itemId) }))
      .filter(entry => entry.item),
    [char.inventario, itemById],
  );

  const filteredCatalog = useMemo(() => {
    let list = itemsRaw;
    const query = deferredSearch.trim().toLocaleLowerCase('pt-BR');
    if (query) {
      list = list.filter(item =>
        item.name.toLocaleLowerCase('pt-BR').includes(query)
        || (item.desc || '').toLocaleLowerCase('pt-BR').includes(query)
        || (item.stats || '').toLocaleLowerCase('pt-BR').includes(query));
    }
    if (filterCat) list = list.filter(item => item.category === filterCat);
    if (filterRar) list = list.filter(item => item.rarity === filterRar);
    return list;
  }, [deferredSearch, filterCat, filterRar]);

  const visibleCatalog = useMemo(() => filteredCatalog.slice(0, catalogLimit), [filteredCatalog, catalogLimit]);
  const inInventorySet = useMemo(() => new Set(char.inventario.map(item => item.itemId)), [char.inventario]);
  const categories = useMemo(() => [...new Set(itemsRaw.map(item => item.category))], []);
  const raridades = useMemo(() => {
    const present = new Set(itemsRaw.map(item => item.rarity));
    return RARIDADE_ORDER.filter(rarity => present.has(rarity));
  }, []);

  const handleUnequip = itemId => equipItem(itemId, null);
  const resetCatalogWindow = () => setCatalogLimit(CATALOG_PAGE_SIZE);
  const handleSearchChange = event => {
    setSearch(event.target.value);
    resetCatalogWindow();
  };
  const handleCategoryChange = event => {
    setFilterCat(event.target.value);
    resetCatalogWindow();
  };
  const handleRarityChange = event => {
    setFilterRar(event.target.value);
    resetCatalogWindow();
  };
  const clearFilters = () => {
    setSearch('');
    setFilterCat('');
    setFilterRar('');
    resetCatalogWindow();
  };

  const learnedCount = Object.values(char.equippedSlots || {}).filter(value => value !== undefined && value !== null).length;
  const activeEffectCount = derived.itemEffects.summary.length;

  return (
    <div className="stack inventory-page-stack">
      <section className="inventory-page-heading">
        <div>
          <span>ARSENAL & BAGAGEM</span>
          <h2>Equipamentos</h2>
          <p>O que está equipado altera a ficha. O restante permanece guardado na mochila até ser usado.</p>
        </div>
        <div className="inventory-page-counters" aria-label="Resumo do inventário">
          <span><small>Equipados</small><strong>{learnedCount}</strong></span>
          <span><small>Mochila</small><strong>{inventoryItems.length}</strong></span>
          <span><small>Efeitos ativos</small><strong>{activeEffectCount}</strong></span>
        </div>
      </section>

      <nav className="inventory-book-tabs" aria-label="Seções de equipamentos">
        {[
          { id: 'equipped', label: 'Equipado', subtitle: 'Arsenal ativo', icon: 'shield', count: learnedCount },
          { id: 'bag', label: 'Mochila', subtitle: 'Itens carregados', icon: 'inventory', count: inventoryItems.length },
          { id: 'catalog', label: 'Catálogo', subtitle: 'Arquivo de itens', icon: 'book', count: itemsRaw.length },
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`inventory-book-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            <TalosIcon name={tab.icon} size={18} />
            <span><strong>{tab.label}</strong><small>{tab.subtitle}</small></span>
            <b>{tab.count}</b>
          </button>
        ))}
      </nav>

      {activeTab === 'equipped' && (
        <section className="card equipment-sheet-card">
          <div className="card-header equipment-sheet-header">
            <TalosIcon name="shield" size={18} />
            <div><h3>Arsenal Equipado</h3><small>Somente estes itens participam dos cálculos da ficha.</small></div>
            <InfoTip title="Equipamentos ativos" align="end" label="Sobre itens equipados">
              Os bônus mecânicos exibidos aqui são agregados automaticamente aos atributos derivados enquanto o item permanecer em um dos slots.
            </InfoTip>
          </div>
          <div className="card-body equipment-sheet-body">
            <div className="equipment-active-effects">
              <div className="equipment-active-effects-title">
                <span>Efeitos ativos</span>
                <strong>{activeEffectCount}</strong>
              </div>
              {activeEffectCount > 0 ? (
                <ItemEffects effects={derived.itemEffects.summary} />
              ) : (
                <span className="equipment-no-effects">Nenhum bônus de equipamento ativo.</span>
              )}
            </div>
            <SlotGrid char={char} itemById={itemById} onUnequip={handleUnequip} />
            <div className="equipment-sheet-footnote">
              <TalosIcon name="inventory" size={14} /> Para equipar algo novo, abra a Mochila e escolha o slot desejado.
            </div>
          </div>
        </section>
      )}

      {activeTab === 'bag' && (
        <section className="card inventory-bag-card">
          <div className="card-header inventory-bag-header">
            <TalosIcon name="inventory" size={18} />
            <div><h3>Mochila</h3><small>{inventoryItems.length} {inventoryItems.length === 1 ? 'item registrado' : 'itens registrados'}</small></div>
            <div className="inventory-header-actions">
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setManualEditor({ mode: 'new' })}>+ Item manual</button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setActiveTab('catalog')}>Abrir catálogo</button>
            </div>
          </div>
          <div className="card-body inventory-bag-body">
            {inventoryItems.length === 0 ? (
              <div className="inventory-empty-state">
                <TalosIcon name="inventory" size={36} />
                <strong>Mochila vazia</strong>
                <span>Registre um item próprio ou consulte o Catálogo TALOS.</span>
              </div>
            ) : (
              <div className="inventory-bag-ledger">
                {inventoryItems.map(({ itemId, qty, equipped, slot, item }) => {
                  const isEquipped = Boolean(equipped && slot);
                  const effectSummary = summarizeItemEffects(item);
                  return (
                    <article key={itemId} className={`inventory-bag-entry ${isEquipped ? 'equipped' : ''}`}>
                      <div className="inventory-bag-quantity">×{qty}</div>
                      <div className="inventory-bag-main">
                        <div className="inventory-entry-heading">
                          <div>
                            <strong>{item.name}</strong>
                            <span>{item.category}</span>
                          </div>
                          <RarityBadge rarity={item.rarity} />
                          {item.isCustom && <span className="inventory-manual-badge">MANUAL</span>}
                          {isEquipped && <span className="inventory-equipped-badge">EQUIPADO</span>}
                          <ItemInfoTip item={item} effectSummary={effectSummary} />
                        </div>
                        <div className="inventory-entry-facts">
                          {item.damage && <span className="semantic-negative"><TalosIcon name="combat" size={13} /> {item.damage}</span>}
                          {item.stats && item.stats !== '—' && <span><TalosIcon name="list" size={13} /> {item.stats}</span>}
                        </div>
                        <ItemEffects effects={effectSummary} compact />
                        {item.desc && <p className="inventory-entry-description">{item.desc}</p>}
                      </div>
                      <div className="inventory-bag-actions">
                        {!isEquipped ? (
                          <select value="" aria-label={`Equipar ${item.name}`} onChange={event => { if (event.target.value) equipItem(itemId, event.target.value); }}>
                            <option value="">Equipar em...</option>
                            {ITEM_SLOTS.map(slotOption => <option key={slotOption.id} value={slotOption.id}>{slotOption.label}</option>)}
                          </select>
                        ) : (
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => equipItem(itemId, null)}>Desequipar</button>
                        )}
                        {item.isCustom && <button type="button" className="btn btn-secondary btn-sm" onClick={() => setManualEditor({ mode: 'edit', item })}>Editar</button>}
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => removeInventoryItem(itemId)}>Remover</button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === 'catalog' && (
        <section className="card inventory-catalog-card">
          <div className="card-header inventory-catalog-header">
            <TalosIcon name="book" size={18} />
            <div><h3>Catálogo de Itens</h3><small>{filteredCatalog.length} encontrados · {itemsRaw.length} no arquivo canônico</small></div>
            <InfoTip title="Catálogo" align="end" label="Sobre o catálogo de itens">
              O Catálogo lista os itens da base TALOS. Adicionar envia o item para a Mochila; somente equipá-lo faz seus bônus participarem da ficha.
            </InfoTip>
          </div>
          <div className="card-body inventory-catalog-body">
            <div className="inventory-catalog-filters">
              <div className="inventory-search-field">
                <TalosIcon name="search" size={16} />
                <input placeholder="Buscar por nome, descrição ou efeito..." value={search} onChange={handleSearchChange} />
              </div>
              <select value={filterCat} onChange={handleCategoryChange}>
                <option value="">Todas as categorias</option>
                {categories.map(category => <option key={category} value={category}>{category}</option>)}
              </select>
              <select value={filterRar} onChange={handleRarityChange}>
                <option value="">Todas as raridades</option>
                {raridades.map(rarity => <option key={rarity} value={rarity}>{rarity}</option>)}
              </select>
              {(search || filterCat || filterRar) && <button type="button" className="btn btn-secondary btn-sm" onClick={clearFilters}>Limpar</button>}
            </div>

            {visibleCatalog.length === 0 ? (
              <div className="inventory-empty-state compact">
                <TalosIcon name="search" size={30} />
                <strong>Nenhum item encontrado</strong>
                <span>Ajuste os filtros ou limpe a busca atual.</span>
              </div>
            ) : (
              <>
                <div className="inventory-catalog-ledger">
                  {visibleCatalog.map(item => (
                    <CatalogItem key={item.id} item={item} onAdd={addInventoryItem} inInventory={inInventorySet.has(item.id)} />
                  ))}
                </div>
                <div className="inventory-catalog-footer">
                  <span>Exibindo {visibleCatalog.length} de {filteredCatalog.length}</span>
                  {visibleCatalog.length < filteredCatalog.length && (
                    <button type="button" className="btn btn-secondary" onClick={() => setCatalogLimit(limit => limit + CATALOG_PAGE_SIZE)}>
                      Carregar mais {Math.min(CATALOG_PAGE_SIZE, filteredCatalog.length - visibleCatalog.length)}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
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
