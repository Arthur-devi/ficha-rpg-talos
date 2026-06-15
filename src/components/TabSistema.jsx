import { useMemo, useState } from 'react';
import reference from '../data/talos_reference.json';
import itemsRaw from '../data/items_raw.json';

const SECTIONS = [
  { id: 'mechanics', label: 'Mecânicas', icon: '📐' },
  { id: 'origins', label: 'Origens', icon: '🌍' },
  { id: 'evolution', label: 'Evolução', icon: '📈' },
  { id: 'shikatas', label: 'Shikatas', icon: '⚔️' },
  { id: 'sets', label: 'Conjuntos', icon: '🔗' },
];

function getLineClass(text) {
  if (/^SHIKATA DO /.test(text)) return 'reference-line-title';
  if (/^Subclasse:/.test(text)) return 'reference-line-subtitle';
  if (/^\d+-NÍVEL:/.test(text)) return 'reference-line-ability';
  if (/^[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ0-9 ,;:()—-]{4,}$/.test(text) && text.length <= 90) return 'reference-line-title';
  if (/^(Campo|Valor|Bônus|Malefícios|Habilidade|Habilidades|Deslocamento|Limite|Nível|Efeito|Nome|Tipo|Custo|Modificador|Dado de Vida|Dificuldade|Poder)$/.test(text)) return 'reference-line-key';
  return '';
}

function ReferenceLines({ lines, query }) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return lines;
    return lines.filter(line => line.toLowerCase().includes(q));
  }, [lines, query]);

  return (
    <div className="reference-list">
      {filtered.length === 0 ? (
        <div className="reference-empty">Nenhum trecho encontrado.</div>
      ) : filtered.map((line, index) => (
        <div key={`${line}-${index}`} className={`reference-line ${getLineClass(line)}`}>
          {line}
        </div>
      ))}
    </div>
  );
}

function SetList({ query }) {
  const q = query.trim().toLowerCase();
  const sets = itemsRaw.filter(item => item.category === 'Conjunto');
  const filtered = q
    ? sets.filter(item =>
      item.name.toLowerCase().includes(q) ||
      (item.stats || '').toLowerCase().includes(q) ||
      (item.desc || '').toLowerCase().includes(q)
    )
    : sets;

  return (
    <div className="reference-list">
      {filtered.map(item => (
        <div key={item.id} className="reference-set">
          <div className="reference-set-title">{item.name}</div>
          <div className="reference-set-parts">{item.stats}</div>
          <div className="reference-set-desc">{item.desc}</div>
        </div>
      ))}
    </div>
  );
}

export default function TabSistema() {
  const [activeSection, setActiveSection] = useState('mechanics');
  const [query, setQuery] = useState('');
  const [selectedShikata, setSelectedShikata] = useState(reference.shikatas[0]?.id || '');

  const activeShikata = reference.shikatas.find(s => s.id === selectedShikata) || reference.shikatas[0];
  const activeLines = activeSection === 'shikatas'
    ? activeShikata?.content || []
    : reference[activeSection] || [];

  return (
    <div className="stack">
      <div className="card">
        <div className="card-header">
          <span>📚</span>
          <h3>Sistema TALOS v6</h3>
        </div>
        <div className="card-body">
          <div className="reference-summary">
            <span>{reference.counts.normalItems} itens</span>
            <span>{reference.counts.itemSets} conjuntos</span>
            <span>{reference.counts.shikatas} shikatas</span>
            <span>{reference.origins.length} linhas de origens e tabelas auxiliares</span>
          </div>

          <div className="reference-toolbar">
            <div className="reference-tabs">
              {SECTIONS.map(section => (
                <button
                  key={section.id}
                  className={`btn ${activeSection === section.id ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.icon} {section.label}
                </button>
              ))}
            </div>

            <div className="search-input reference-search">
              <span className="search-icon">🔍</span>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar no sistema..."
              />
            </div>
          </div>

          {activeSection === 'shikatas' && (
            <div className="reference-shikata-picker">
              {reference.shikatas.map(shikata => (
                <button
                  key={shikata.id}
                  className={`btn ${selectedShikata === shikata.id ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                  onClick={() => setSelectedShikata(shikata.id)}
                >
                  {shikata.name}
                </button>
              ))}
            </div>
          )}

          {activeSection === 'sets' ? (
            <SetList query={query} />
          ) : (
            <ReferenceLines lines={activeLines} query={query} />
          )}
        </div>
      </div>
    </div>
  );
}
