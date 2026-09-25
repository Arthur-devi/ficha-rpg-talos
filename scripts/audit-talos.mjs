#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SRC = path.join(ROOT, 'src');
const errors = [];
const warnings = [];
const checks = [];

function ok(label, detail = '') { checks.push({ ok: true, label, detail }); }
function fail(label, detail = '') { errors.push({ label, detail }); checks.push({ ok: false, label, detail }); }
function warn(label, detail = '') { warnings.push({ label, detail }); }
function assert(condition, label, detail = '') { condition ? ok(label, detail) : fail(label, detail); }

function walk(dir, predicate = () => true) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, predicate));
    else if (predicate(full)) out.push(full);
  }
  return out;
}

function resolveRelative(fromFile, specifier) {
  const base = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [
    base,
    `${base}.js`, `${base}.jsx`, `${base}.json`,
    path.join(base, 'index.js'), path.join(base, 'index.jsx'),
  ];
  return candidates.find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile()) || null;
}

const exportCache = new Map();
function exportsOf(file) {
  if (exportCache.has(file)) return exportCache.get(file);
  if (file.endsWith('.json')) {
    const value = { named: new Set(), hasDefault: true };
    exportCache.set(file, value);
    return value;
  }
  const source = fs.readFileSync(file, 'utf8');
  const named = new Set();
  let match;
  const declaration = /export\s+(?:async\s+)?(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/g;
  while ((match = declaration.exec(source))) named.add(match[1]);
  const list = /export\s*\{([^}]+)\}/g;
  while ((match = list.exec(source))) {
    for (const raw of match[1].split(',')) {
      const part = raw.trim();
      if (!part) continue;
      const alias = part.split(/\s+as\s+/i).map(v => v.trim());
      named.add(alias[1] || alias[0]);
    }
  }
  const value = { named, hasDefault: /export\s+default\b/.test(source) };
  exportCache.set(file, value);
  return value;
}

function checkImports() {
  const sourceFiles = walk(SRC, file => /\.(?:js|jsx)$/.test(file));
  let importCount = 0;
  for (const file of sourceFiles) {
    const source = fs.readFileSync(file, 'utf8');
    const imports = /import\s+(?!['"])([\s\S]*?)\s+from\s+['"]([^'"]+)['"]/g;
    let match;
    while ((match = imports.exec(source))) {
      const clause = match[1].trim();
      const specifier = match[2];
      if (!specifier.startsWith('.')) continue;
      importCount += 1;
      const target = resolveRelative(file, specifier);
      if (!target) {
        fail('Import relativo resolvível', `${path.relative(ROOT, file)} → ${specifier}`);
        continue;
      }
      const targetExports = exportsOf(target);
      const brace = clause.match(/\{([\s\S]*?)\}/);
      if (brace) {
        for (const raw of brace[1].split(',')) {
          const part = raw.trim();
          if (!part) continue;
          const imported = part.split(/\s+as\s+/i)[0].trim();
          if (imported && !targetExports.named.has(imported)) {
            fail('Import nomeado existente', `${path.relative(ROOT, file)} importa ${imported} de ${path.relative(ROOT, target)}`);
          }
        }
      }
      const defaultPart = clause.replace(/\{[\s\S]*?\}/, '').replace(/\*\s+as\s+\w+/, '').replace(/,/g, '').trim();
      if (defaultPart && !targetExports.hasDefault) {
        fail('Export default existente', `${path.relative(ROOT, file)} importa default de ${path.relative(ROOT, target)}`);
      }
    }
  }
  if (!errors.some(error => /Import/.test(error.label) || /Export/.test(error.label))) {
    ok('Imports relativos', `${importCount} imports verificados em ${sourceFiles.length} arquivos JS/JSX`);
  }
}

const system = await import(pathToFileURL(path.join(SRC, 'data/system.js')).href);
const generated = await import(pathToFileURL(path.join(SRC, 'data/shikatas_v6.generated.js')).href);
const states = await import(pathToFileURL(path.join(SRC, 'data/stateRuntime.js')).href);
const tableRules = await import(pathToFileURL(path.join(SRC, 'data/tableRules.js')).href);

let abilityCount = 0;
for (const abilities of Object.values(generated.SHIKATAS_HABILIDADES_V6)) abilityCount += abilities.length;
let evolutionCount = 0;
for (const abilityMap of Object.values(generated.SHIKATA_EVOLUCOES_V6)) {
  for (const evolutions of Object.values(abilityMap)) evolutionCount += evolutions.length;
}

assert(system.SHIKATAS.length === 21, '21 Shikatas canônicas', `encontradas ${system.SHIKATAS.length}`);
assert(new Set(system.SHIKATAS.map(item => item.id)).size === 21, 'IDs de Shikata únicos');
assert(system.ORIGENS.length === 38, '38 Origens', `encontradas ${system.ORIGENS.length}`);
assert(system.PROFISSOES.length === 41, '41 Profissões', `encontradas ${system.PROFISSOES.length}`);
assert(Object.keys(system.PERICIAS_INFO).length === 38, '38 Perícias', `encontradas ${Object.keys(system.PERICIAS_INFO).length}`);
assert(system.ATTRIBUTES.length === 9, '9 atributos centrais', `encontrados ${system.ATTRIBUTES.length}`);
assert(states.OFFICIAL_STATE_DEFS.length === 3, '3 Estados oficiais centrais', `encontrados ${states.OFFICIAL_STATE_DEFS.length}`);
assert(abilityCount === 668, '668 entradas canônicas de Shikata', `encontradas ${abilityCount}`);
assert(evolutionCount === 523, '523 linhas de evolução', `encontradas ${evolutionCount}`);
assert(generated.SHIKATA_SOURCE_V6 === 'TALOS_SISTEMA_v6_COMPLETO.docx', 'DOCX canônico referenciado pelo gerador', generated.SHIKATA_SOURCE_V6);
assert(fs.existsSync(path.join(ROOT, generated.SHIKATA_SOURCE_V6)), 'DOCX canônico presente no projeto');

const generatedIds = new Set(Object.keys(generated.SHIKATAS_HABILIDADES_V6));
const shikataIds = new Set(system.SHIKATAS.map(item => item.id));
assert([...shikataIds].every(id => generatedIds.has(id)), 'Todas as Shikatas possuem bloco de habilidades');
assert([...generatedIds].every(id => shikataIds.has(id)), 'Nenhum bloco órfão de habilidades');
assert(system.SHIKATAS.every(item => Array.isArray(item.subclasses) && item.subclasses.length === 2), 'Duas subclasses por Shikata');

assert(tableRules.TABLE_RULES_VERSION === 1, 'Regras da mesa versionadas');
assert(tableRules.INSPIRATION_TABLE_RULE.bonus === 1, 'Inspiração da mesa = +1');
assert(tableRules.DEATH_SAVE_TABLE_RULE.die === '1d20', 'Estabilização usa d20 natural');
assert(tableRules.DEATH_SAVE_TABLE_RULE.dc === 10, 'Estabilização usa DT 10');
assert(tableRules.DEATH_SAVE_TABLE_RULE.successesToRecover === 3 && tableRules.DEATH_SAVE_TABLE_RULE.failuresToDie === 3, 'Estabilização 3 sucessos / 3 falhas');
assert(tableRules.DEATH_SAVE_TABLE_RULE.recoveryHp === 1, '3 sucessos recuperam 1 HP');

const legacyReference = path.join(SRC, 'data/talos_reference.json');
assert(!fs.existsSync(legacyReference), 'talos_reference.json removido');

const canonicalEvolution = fs.readFileSync(path.join(SRC, 'data/evolucoes.js'), 'utf8');
assert(canonicalEvolution.includes("SHIKATA_EVOLUCOES_V6"), 'Evoluções apontam para a fonte canônica');
const systemSource = fs.readFileSync(path.join(SRC, 'data/system.js'), 'utf8');
assert(systemSource.includes("SHIKATAS_V6") && systemSource.includes("SHIKATAS_HABILIDADES_V6"), 'system.js aponta para a fonte canônica de Shikatas');

const useCharacterSource = fs.readFileSync(path.join(SRC, 'hooks/useCharacter.js'), 'utf8');
const rulesVersion = Number(useCharacterSource.match(/CURRENT_RULES_VERSION\s*=\s*(\d+)/)?.[1] || 0);
assert(rulesVersion === 13, 'Versão persistente das regras = 13', `encontrada ${rulesVersion}`);

const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
assert(packageJson.scripts?.['audit:talos'] === 'node scripts/audit-talos.mjs', 'Script npm audit:talos disponível');
assert(Boolean(packageJson.scripts?.['sync:shikatas']), 'Script npm sync:shikatas disponível');
assert(fs.existsSync(path.join(ROOT, 'docs/REGRAS_DA_MESA.md')), 'Regras da mesa documentadas');
assert(fs.existsSync(path.join(ROOT, 'docs/AUDITORIA_FINAL_LOTE10.md')), 'Auditoria final do Lote 10 presente');
const readmeSource = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
assert(readmeSource.includes('Lote 10'), 'README identifica a consolidação do Lote 10');

const scanRoots = [path.join(ROOT, 'src'), path.join(ROOT, 'scripts')];
const textFiles = scanRoots.flatMap(dir => walk(dir, file => /\.(?:js|jsx|mjs|py|ps1|json)$/.test(file)))
  .filter(file => path.basename(file) !== 'audit-talos.mjs');
const oldDocRefs = [];
const deadReferenceRefs = [];
for (const file of textFiles) {
  const source = fs.readFileSync(file, 'utf8');
  if (source.includes('TALOS_SISTEMA_v6_COMPLETO (1).docx')) oldDocRefs.push(path.relative(ROOT, file));
  if (source.includes('talos_reference.json')) deadReferenceRefs.push(path.relative(ROOT, file));
}
assert(oldDocRefs.length === 0, 'Nenhuma referência ao DOCX antigo “(1)”', oldDocRefs.join(', '));
assert(deadReferenceRefs.length === 0, 'Nenhuma referência ativa a talos_reference.json', deadReferenceRefs.join(', '));

checkImports();

console.log('\nTALOS v6 — auditoria do projeto\n');
for (const check of checks) {
  const mark = check.ok ? '✓' : '✗';
  console.log(`${mark} ${check.label}${check.detail ? ` — ${check.detail}` : ''}`);
}
if (warnings.length) {
  console.log('\nAvisos:');
  for (const item of warnings) console.log(`! ${item.label}${item.detail ? ` — ${item.detail}` : ''}`);
}
console.log(`\nResumo: ${checks.filter(item => item.ok).length} OK · ${errors.length} erro(s) · ${warnings.length} aviso(s)`);
if (errors.length) process.exitCode = 1;
