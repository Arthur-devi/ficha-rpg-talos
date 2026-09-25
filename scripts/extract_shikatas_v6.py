#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import json
import re
import sys
import unicodedata

from docx import Document
from docx.table import Table
from docx.text.paragraph import Paragraph
from docx.oxml.table import CT_Tbl
from docx.oxml.text.paragraph import CT_P

ROOT = Path(__file__).resolve().parents[1]
DOCX = ROOT / 'TALOS_SISTEMA_v6_COMPLETO.docx'
OUT = ROOT / 'src' / 'data' / 'shikatas_v6.generated.js'
AUDIT = ROOT / 'docs' / 'AUDITORIA_SHIKATAS_LOTE07.md'

ID_MAP = {
    'GUERREIRO': 'guerreiro',
    'LADINO': 'ladino',
    'INCLEMENTE': 'inclemente',
    'CAÇADOR': 'cacador',
    'VANGUARDA': 'vanguarda',
    'MONGE': 'monge',
    'NECROMANTE': 'necromante',
    'MAGO': 'mago',
    'FEITICEIRO': 'feiticeiro',
    'BARDO': 'bardo',
    'PALADINO': 'paladino',
    'ESPADACHIM': 'espadachim',
    'CEIFEIRO': 'ceifeiro',
    'BRUXO': 'bruxo',
    'FULGOR': 'fulgor',
    'SENTINELA': 'sentinela',
    'SPELLSTEALER': 'spellstealer',
    'HEMOMANTE': 'hemomante',
    'LANCEIRO': 'lanceiro',
    'MANIPULADOR DE ESSÊNCIA': 'manipulador-essencia',
    'INVOCADOR FUNÉREO': 'invocador-funereo',
}

NAME_MAP = {
    'GUERREIRO': 'Guerreiro', 'LADINO': 'Ladino', 'INCLEMENTE': 'Inclemente',
    'CAÇADOR': 'Caçador', 'VANGUARDA': 'Vanguarda', 'MONGE': 'Monge',
    'NECROMANTE': 'Necromante', 'MAGO': 'Mago', 'FEITICEIRO': 'Feiticeiro',
    'BARDO': 'Bardo', 'PALADINO': 'Paladino', 'ESPADACHIM': 'Espadachim',
    'CEIFEIRO': 'Ceifeiro', 'BRUXO': 'Bruxo', 'FULGOR': 'Fulgor',
    'SENTINELA': 'Sentinela', 'SPELLSTEALER': 'Spellstealer', 'HEMOMANTE': 'Hemomante',
    'LANCEIRO': 'Lanceiro', 'MANIPULADOR DE ESSÊNCIA': 'Manipulador de Essência',
    'INVOCADOR FUNÉREO': 'Invocador Funéreo',
}

# Quantidade da lista manual existente no Lote 06. Serve apenas para a auditoria
# de migração; a fonte de verdade do Lote 07 é o DOCX v6.
LEGACY_COUNTS = {
    'guerreiro': 33, 'ladino': 38, 'inclemente': 20, 'cacador': 30,
    'vanguarda': 24, 'monge': 39, 'necromante': 46, 'mago': 45,
    'feiticeiro': 41, 'bardo': 18, 'paladino': 32, 'espadachim': 26,
    'ceifeiro': 33, 'bruxo': 26, 'fulgor': 26, 'sentinela': 20,
    'spellstealer': 27, 'hemomante': 25, 'lanceiro': 25,
    'manipulador-essencia': 28, 'invocador-funereo': 24,
}

GENERIC_EXCLUSIONS = {
    # Valores já normalizados (sem acentos/pontuação), pois são comparados
    # contra normalize_key(...).
    'INICIO', 'MEIO', 'FIM', 'NIVEL', 'NIVEIS', 'USOS', 'EXTRA', 'DANO',
    'EVOLUCAO', 'MAGIAS DIARIAS POR NIVEL', 'ESCOLHA DE SUBCLASSE',
}


def norm(text: str) -> str:
    return re.sub(r'\s+', ' ', text or '').strip()


def normalize_key(text: str) -> str:
    value = unicodedata.normalize('NFD', text or '')
    value = ''.join(c for c in value if unicodedata.category(c) != 'Mn')
    value = value.upper()
    value = re.sub(r'\[[^\]]*\]', ' ', value)
    value = re.sub(r'[^A-Z0-9]+', ' ', value)
    return norm(value)


def iter_blocks(doc: Document):
    for child in doc.element.body.iterchildren():
        if isinstance(child, CT_P):
            yield Paragraph(child, doc)
        elif isinstance(child, CT_Tbl):
            yield Table(child, doc)


def first_bold_prefix(paragraph: Paragraph) -> str:
    result = ''
    started = False
    for run in paragraph.runs:
        text = run.text or ''
        if not text:
            continue
        if not started and not text.strip():
            result += text
            continue
        started = True
        if run.bold:
            result += text
        else:
            break
    return norm(result)


def all_bold(paragraph: Paragraph) -> bool:
    runs = [r for r in paragraph.runs if (r.text or '').strip()]
    return bool(runs) and all(bool(r.bold) for r in runs)


def is_upper_heading(name: str) -> bool:
    letters = [c for c in name if c.isalpha()]
    if not letters:
        return False
    uppercase = sum(1 for c in letters if c == c.upper())
    return uppercase / len(letters) >= 0.9


def clean_ability_name(raw_title: str) -> str:
    title = norm(raw_title).strip(':')
    title = re.sub(r'^\[INVOCAÇÃO:\s*([^\]]+)\]$', r'\1', title, flags=re.I)
    title = re.sub(r'^\[INVOCAÇÃO\]\s*', '', title, flags=re.I)
    # Keep leading identity tags such as [CHI], [GHAST], [NIGHTMARE].
    title = re.sub(r'\s*\[[^\]]*(?:VEZ|DESCANSO|AÇÃO|REAC|CUSTA|TURNO|COMBATE|DIA|SEMANA|MÊS|MES|CERTEIR|HP|VIDA|PERFORMANCE|ESSÊNCIA|ESSENCIA|INVOCAÇ|ATIVAÇÃO|ATIVACAO)[^\]]*\]\s*$', '', title, flags=re.I)
    return norm(title).strip(':')


def extract_usage(raw_title: str) -> str:
    chunks = re.findall(r'\[([^\]]+)\]', raw_title or '')
    usage = []
    for chunk in chunks:
        normalized = norm(chunk)
        # Marcadores como [INVOCAÇÃO: GHAST] identificam uma entidade, não uma carga.
        if re.fullmatch(r'INVOCAÇÃO(?:\s*:\s*.+)?', normalized, re.I):
            continue
        if re.search(r'VEZ|DESCANSO|AÇÃO|REAC|CUSTA|TURNO|COMBATE|DIA|SEMANA|MÊS|MES|CERTEIR|HP|VIDA|PERFORMANCE|ESSÊNCIA|ESSENCIA|ATIVAÇÃO|ATIVACAO|SEM AÇÃO', normalized, re.I):
            usage.append(normalized)
    return ', '.join(usage)


def parse_metadata(text: str) -> dict:
    text = (text or '').replace('\r', '\n')
    fields = ['Modificador', 'Dado de Vida (pós nv.1)', 'Dificuldade', 'Poder', 'Itens iniciais']
    result = {}
    for idx, field in enumerate(fields):
        next_fields = fields[idx + 1:]
        lookahead = '|'.join(re.escape(f) + r'\s*:' for f in next_fields)
        pattern = re.escape(field) + r'\s*:\s*(.+?)' + (rf'(?=\s*(?:{lookahead})|$)' if lookahead else r'$')
        m = re.search(pattern, text, re.I | re.S)
        if m:
            result[field] = norm(m.group(1))
    return result


def table_rows(table: Table):
    rows = []
    for row in table.rows:
        rows.append([norm(cell.text.replace('\n', ' / ')) for cell in row.cells])
    return rows


def rows_to_evolutions(rows):
    if len(rows) < 2:
        return []
    headers = rows[0]
    if not headers or normalize_key(headers[0]) not in {'NIVEL', 'NIVEIS', 'LEVEL'}:
        return []
    result = []
    for row in rows[1:]:
        if not row:
            continue
        m = re.search(r'\d+', row[0] or '')
        if not m:
            continue
        level = int(m.group(0))
        parts = []
        for i in range(1, min(len(headers), len(row))):
            value = norm(row[i])
            if not value:
                continue
            header = norm(headers[i])
            parts.append(f'{header}: {value}' if header else value)
        result.append({'nivel': level, 'desc': ' | '.join(parts)})
    return result


def classify_type(raw_title: str, description: str, usage: str, evolutions: list[dict]) -> str:
    joined = norm(f'{raw_title} {description[:500]}')
    key = normalize_key(joined)
    if 'PASSIVA' in key:
        return 'passiva'
    # Famílias explicitamente reativas ou de ação bônus.
    if re.search(r'AÇÃO BÔNUS|ACAO BONUS', raw_title, re.I):
        return 'bonus'
    if re.search(r'\[.*REAÇ', raw_title, re.I) or re.search(r'^REAÇÃO\b|^REACAO\b', raw_title, re.I):
        return 'reacao'
    if usage:
        return 'ativo'
    evolution_text = ' | '.join(row.get('desc', '') for row in evolutions or [])
    if re.search(r'VEZ|DESC\.?\s*(?:CURTO|LONGO)|/TURNO|POR TURNO|POR COMBATE|POR DIA|POR SEMANA|POR M[EÊ]S|A CADA', evolution_text, re.I):
        return 'ativo'
    # Habilidades sem carga só entram no motor quando a própria fonte declara a ação/ativação.
    explicit_action = re.search(
        r'ação bônus|acao bonus|como reação|como reacao|pode ser ativad[ao]|ao ativar|\bativar\b|pode utilizar(?: esta| essa)? habilidade|pode usar(?: esta| essa)? habilidade',
        description[:800], re.I,
    )
    if explicit_action:
        if re.search(r'ação bônus|acao bonus', description[:800], re.I) and not re.search(r'ação completa|acao completa', description[:800], re.I):
            return 'bonus'
        return 'ativo'
    return 'passiva'


def main():
    if not DOCX.exists():
        raise SystemExit(f'Arquivo não encontrado: {DOCX}')

    doc = Document(DOCX)
    shikatas = []
    current = None
    current_level = None
    current_subclass = None
    current_ability = None
    awaiting_evolution = False
    text_evolution_target = None
    seen_first_class = False

    def finish_current():
        nonlocal current
        if not current:
            return
        # Prune obvious structural pseudo-headings.
        cleaned = []
        for ability in current['habilidades']:
            name_key = normalize_key(ability['nome'])
            if name_key in GENERIC_EXCLUSIONS:
                continue
            if name_key.startswith('ESCOLHA ENTRE '):
                continue
            if name_key.startswith('ESCOLHA ' ) and ' SUBCLASSE' in name_key:
                continue
            ability['desc'] = norm(' '.join(ability.pop('_desc_parts', [])))
            ability['tipo'] = classify_type(ability['sourceTitle'], ability['desc'], ability.get('usos', ''), ability.get('evolucoes', []))
            # SINAIS é o recurso/cabeçalho compartilhado do Bruxo. As quatro
            # ativações reais (IGNITE/ARXIS/BREN/ECRYPT) são entradas próprias;
            # manter o cabeçalho passivo evita um botão de uso duplicado.
            if current['id'] == 'bruxo' and normalize_key(ability['nome']) == 'SINAIS':
                ability['tipo'] = 'passiva'
            if not ability.get('usos'):
                ability.pop('usos', None)
            if not ability.get('subclasse'):
                ability.pop('subclasse', None)
            if not ability.get('evolucoes'):
                ability.pop('evolucoes', None)
            cleaned.append(ability)
        # O v6 às vezes reapresenta o mesmo nome como melhoria em níveis posteriores
        # (caso do CRÍTICO APRIMORADO do Sentinela). Para o runtime, isso é uma única
        # habilidade com progressão, evitando chaves de uso duplicadas.
        merged = []
        by_identity = {}
        for ability in cleaned:
            identity = (ability.get('subclasse') or '', normalize_key(ability['nome']))
            previous = by_identity.get(identity)
            if previous is not None:
                if ability.get('desc'):
                    previous.setdefault('evolucoes', []).append({
                        'nivel': ability['nivel'],
                        'desc': ability['desc'],
                    })
                previous.setdefault('evolucoes', []).extend(ability.get('evolucoes', []))
                continue
            by_identity[identity] = ability
            merged.append(ability)
        cleaned = merged
        current['habilidades'] = cleaned
        subclass_levels = [a['nivel'] for a in cleaned if a.get('subclasse')]
        current['subclasseNivel'] = min(subclass_levels) if subclass_levels else None
        shikatas.append(current)
        current = None

    for block in iter_blocks(doc):
        if isinstance(block, Paragraph):
            text = norm(block.text)
            if not text:
                continue

            class_match = re.match(r'^SHIKATA D[OA] (.+)$', text, re.I)
            if class_match:
                raw_name = class_match.group(1).strip().upper()
                if raw_name not in ID_MAP:
                    if seen_first_class:
                        finish_current()
                        break
                    continue
                seen_first_class = True
                finish_current()
                current = {
                    'id': ID_MAP[raw_name],
                    'name': NAME_MAP[raw_name],
                    'desc': '',
                    'modificador': '',
                    'dadoVida': 'Não informado no documento',
                    'dificuldade': 'Não informado no documento',
                    'poder': 'Não informado no documento',
                    'itensIniciais': '',
                    'subclasses': [],
                    'subclasseNivel': None,
                    'habilidades': [],
                }
                current_level = None
                current_subclass = None
                current_ability = None
                awaiting_evolution = False
                text_evolution_target = None
                continue

            if not current:
                continue

            # Hard stop after the final Shikata section.
            if current['id'] == 'invocador-funereo' and text == 'TABELA NECRO (1d100)':
                finish_current()
                break

            if not current['desc'] and current_level is None and not text.startswith('Modificador:'):
                current['desc'] = text
                continue

            if current_level is None and any(
                marker in text
                for marker in ('Modificador:', 'Dado de Vida (pós nv.1):', 'Dificuldade:', 'Poder:', 'Itens iniciais:')
            ):
                meta = parse_metadata(text)
                current['modificador'] = meta.get('Modificador', current['modificador'])
                current['dadoVida'] = meta.get('Dado de Vida (pós nv.1)', current['dadoVida'])
                current['dificuldade'] = meta.get('Dificuldade', current['dificuldade'])
                current['poder'] = meta.get('Poder', current['poder'])
                current['itensIniciais'] = meta.get('Itens iniciais', current['itensIniciais'])
                continue

            subclass_match = re.match(r'^Subclasse:\s*(.+)$', text, re.I)
            if subclass_match:
                current_subclass = norm(subclass_match.group(1))
                if current_subclass not in current['subclasses']:
                    current['subclasses'].append(current_subclass)
                current_ability = None
                awaiting_evolution = False
                text_evolution_target = None
                continue

            # O bloco de SINAIS do Bruxo contém quatro habilidades internas em texto
            # corrido. Elas precisam existir como entradas próprias para que usos,
            # dano e progressão sejam rastreáveis pela ficha.
            if current['id'] == 'bruxo':
                signal_match = re.match(
                    r'^-?\s*(IGNITE|ARXIS|BREN|ECRYPT)\s*\[([^\]]+)\]\s*:\s*(.+)$',
                    text,
                    re.I,
                )
                if signal_match:
                    signal_name = signal_match.group(1).upper()
                    usage_text = norm(signal_match.group(2))
                    desc_text = norm(signal_match.group(3))
                    current_ability = {
                        'nivel': 1,
                        'nome': signal_name,
                        'tipo': 'ativo',
                        'progressao': 'mutacao',
                        'sourceTitle': f'{signal_name}[{usage_text}]',
                        'usos': usage_text,
                        'subclasse': None,
                        '_desc_parts': [desc_text],
                        'evolucoes': [],
                    }
                    current['habilidades'].append(current_ability)
                    awaiting_evolution = False
                    text_evolution_target = None
                    continue

                if re.match(r'^Evolução dos Sinais\s*:', text, re.I):
                    current_ability = next(
                        (ability for ability in reversed(current['habilidades']) if normalize_key(ability['nome']) == 'SINAIS'),
                        current_ability,
                    )
                    awaiting_evolution = True
                    text_evolution_target = None
                    continue

                text_table = re.match(r'^TABELA DE EVOLUÇÃO\s+(.+)$', text, re.I)
                if text_table:
                    target_key = normalize_key(text_table.group(1))
                    target = next(
                        (ability for ability in reversed(current['habilidades']) if normalize_key(ability['nome']) == target_key),
                        None,
                    )
                    current_ability = target
                    text_evolution_target = target
                    awaiting_evolution = False
                    continue

            if re.match(r'^Evolução (?:da Habilidade|da habilidade|do |de )', text, re.I):
                awaiting_evolution = True
                text_evolution_target = None
                continue

            level_match = re.match(r'^(\d+)-NÍVEL:\s*(.+)$', text, re.I)

            # Algumas progressões do DOCX (os Sinais do Bruxo) são listas de
            # parágrafos, não tabelas Word. Enquanto houver um alvo explícito de
            # "TABELA DE EVOLUÇÃO X", um cabeçalho N-NÍVEL é uma linha de evolução,
            # não uma nova habilidade da Shikata.
            if level_match and text_evolution_target is not None:
                text_evolution_target.setdefault('evolucoes', []).append({
                    'nivel': int(level_match.group(1)),
                    'desc': norm(level_match.group(2)),
                })
                continue

            raw_title = None
            inline_desc = ''
            if level_match:
                current_level = int(level_match.group(1))
                rest = norm(level_match.group(2))
                if rest.upper().startswith('ESCOLHA ENTRE ') or re.search(r'\bpode evoluir para a subclasse\b', rest, re.I):
                    current_ability = None
                    awaiting_evolution = False
                    text_evolution_target = None
                    continue
                # Inline descriptions such as "PRIORI: Não tenha...".
                if ':' in rest and '[' not in rest.split(':', 1)[0]:
                    raw_title, inline_desc = [norm(x) for x in rest.split(':', 1)]
                else:
                    raw_title = rest
            else:
                prefix = first_bold_prefix(block)
                if prefix and current_level is not None:
                    prefix_name = prefix.rstrip(':').strip()
                    if (
                        not normalize_key(prefix_name).startswith('EVOLUCAO')
                        and not normalize_key(prefix_name).startswith('SUBCLASSE')
                        and not normalize_key(prefix_name).startswith('ESCOLHA ENTRE')
                        and (all_bold(block) or prefix.endswith(':') or '[' in prefix)
                        and is_upper_heading(prefix_name)
                    ):
                        raw_title = prefix_name
                        pos = text.upper().find(prefix_name.upper())
                        if pos >= 0:
                            inline_desc = text[pos + len(prefix_name):].lstrip(' :–—-').strip()

            if raw_title:
                name = clean_ability_name(raw_title)
                if not name or normalize_key(name) in GENERIC_EXCLUSIONS or normalize_key(name).startswith('ESCOLHA ENTRE'):
                    current_ability = None
                    awaiting_evolution = False
                    continue
                current_ability = {
                    'nivel': current_level or 1,
                    'nome': name,
                    'tipo': 'passiva',
                    'sourceTitle': norm(raw_title),
                    'usos': extract_usage(raw_title),
                    'subclasse': current_subclass,
                    '_desc_parts': [inline_desc] if inline_desc else [],
                    'evolucoes': [],
                }
                current['habilidades'].append(current_ability)
                awaiting_evolution = False
                continue

            if current_ability:
                # Structural chooser sentences are not part of the preceding ability.
                if re.match(r'^Escolha entre ', text, re.I):
                    continue
                current_ability['_desc_parts'].append(text)

        elif isinstance(block, Table) and current and current_ability:
            rows = table_rows(block)
            if not awaiting_evolution:
                continue
            evolutions = rows_to_evolutions(rows)
            if not evolutions:
                awaiting_evolution = False
                continue

            # A few source tables evolve multiple named passives side-by-side.
            headers = rows[0]
            distributed = False
            if len(headers) > 2:
                recent = current['habilidades'][-6:]
                by_key = {normalize_key(a['nome']): a for a in recent}
                matched_cols = []
                for col in range(1, len(headers)):
                    key = normalize_key(headers[col])
                    if key in by_key:
                        matched_cols.append((col, by_key[key]))
                if len(matched_cols) >= 2:
                    for col, target in matched_cols:
                        for row in rows[1:]:
                            if col >= len(row):
                                continue
                            m = re.search(r'\d+', row[0] or '')
                            value = norm(row[col])
                            if not m or not value:
                                continue
                            target['evolucoes'].append({'nivel': int(m.group(0)), 'desc': value})
                    distributed = True

            if not distributed:
                current_ability['evolucoes'].extend(evolutions)
            awaiting_evolution = False

    if current:
        finish_current()

    if len(shikatas) != 21:
        raise SystemExit(f'Esperadas 21 Shikatas, encontradas {len(shikatas)}')

    # Canonical map and evolution map.
    abilities_map = {s['id']: s.pop('habilidades') for s in shikatas}

    # Invariantes para impedir que uma mudança de formatação do DOCX gere uma
    # lista silenciosamente corrompida.
    for s in shikatas:
        abilities = abilities_map[s['id']]
        if len(s.get('subclasses', [])) != 2:
            raise SystemExit(f"{s['name']}: esperadas 2 subclasses, encontradas {len(s.get('subclasses', []))}")
        seen = set()
        for ability in abilities:
            identity = (ability.get('subclasse') or '', normalize_key(ability['nome']))
            if identity in seen:
                raise SystemExit(f"{s['name']}: habilidade duplicada após limpeza: {identity}")
            seen.add(identity)
            if not ability.get('desc'):
                raise SystemExit(f"{s['name']}: habilidade sem descrição: {ability['nome']}")

    bruxo_signals = {
        ability['nome'] for ability in abilities_map['bruxo']
        if ability.get('progressao') == 'mutacao'
    }
    if bruxo_signals != {'IGNITE', 'ARXIS', 'BREN', 'ECRYPT'}:
        raise SystemExit(f'Sinais do Bruxo incompletos: {sorted(bruxo_signals)}')

    evolution_map = {}
    for sid, abilities in abilities_map.items():
        evolution_map[sid] = {}
        for ability in abilities:
            if ability.get('evolucoes'):
                evolution_map[sid][ability['nome']] = ability['evolucoes']

    source = {
        'generatedFrom': DOCX.name,
        'shikatas': shikatas,
        'abilities': abilities_map,
        'evolutions': evolution_map,
    }

    js = '// ARQUIVO GERADO A PARTIR DE TALOS_SISTEMA_v6_COMPLETO.docx.\n'
    js += '// Não editar manualmente: execute scripts/extract_shikatas_v6.py para regenerar.\n\n'
    js += 'export const SHIKATAS_V6 = ' + json.dumps(source['shikatas'], ensure_ascii=False, indent=2) + ';\n\n'
    js += 'export const SHIKATAS_HABILIDADES_V6 = ' + json.dumps(source['abilities'], ensure_ascii=False, indent=2) + ';\n\n'
    js += 'export const SHIKATA_EVOLUCOES_V6 = ' + json.dumps(source['evolutions'], ensure_ascii=False, indent=2) + ';\n\n'
    js += f"export const SHIKATA_SOURCE_V6 = {json.dumps(DOCX.name, ensure_ascii=False)};\n"
    OUT.write_text(js, encoding='utf-8')

    lines = [
        '# Auditoria de Shikatas — Lote 07', '',
        f'Fonte canônica: `{DOCX.name}`.', '',
        'O Lote 07 substitui as listas manuais/legadas por dados gerados diretamente do DOCX v6. ',
        'Nomes, níveis, subclasses, descrições e tabelas de evolução passam a compartilhar a mesma fonte.', '',
        '| Shikata | Lote 06 manual | Lote 07 canônico | Δ | Subclasses | Evoluções estruturadas |',
        '| --- | ---: | ---: | ---: | --- | ---: |',
    ]
    total_abilities = 0
    total_evolutions = 0
    for s in shikatas:
        abilities = abilities_map[s['id']]
        ecount = sum(len(a.get('evolucoes', [])) for a in abilities)
        total_abilities += len(abilities)
        total_evolutions += ecount
        legacy = LEGACY_COUNTS.get(s['id'], 0)
        delta = len(abilities) - legacy
        lines.append(f"| {s['name']} | {legacy} | {len(abilities)} | {delta:+d} | {', '.join(s['subclasses']) or '—'} | {ecount} |")
    legacy_total = sum(LEGACY_COUNTS.values())
    lines += ['', f'**Total:** {len(shikatas)} Shikatas, {legacy_total} entradas na lista manual do Lote 06 → {total_abilities} entradas canônicas no Lote 07 ({total_abilities - legacy_total:+d}), com {total_evolutions} linhas de evolução estruturadas.', '',
              '## Decisões de fidelidade', '',
              '- O nome de cada habilidade é derivado do título em negrito do DOCX, não de aliases antigos da ficha.',
              '- Subclasses usam exatamente a nomenclatura do v6 (incluindo `Ditador`, do Spellstealer).',
              '- Tabelas após “Evolução da Habilidade” são convertidas para progressões estruturadas.',
              '- Os quatro Sinais do Bruxo (`IGNITE`, `ARXIS`, `BREN`, `ECRYPT`) são entradas próprias; suas tabelas textuais de nível 2–6 são progressão de **Mutação**, não níveis normais da Shikata.',
              '- `SINAIS` permanece como cabeçalho/passiva de recurso; o limite compartilhado de Sinais por turno é aplicado às quatro ativações reais.',
              '- O Invocador Funéreo permanece com dado de vida/dificuldade/poder como “Não informado no documento” quando o bloco v6 não fornece esses campos.',
              '- Cabeçalhos estruturais como “Escolha entre ...” e “Magias diárias por nível” não viram habilidades.',
              '- Classificação ativo/passiva/reação é conservadora: sem marcador de uso/ação ou verbo explícito de ativação, a entrada permanece passiva para não inventar consumo.',
              '- Entradas repetidas com o mesmo nome/subclasse são consolidadas como progressão da mesma habilidade quando a fonte as reapresenta em níveis posteriores.',
              '',
              '## Validações do gerador', '',
              '- Exatamente 21 Shikatas.',
              '- Exatamente 2 subclasses por Shikata no documento atual.',
              '- Nenhuma entrada canônica sem descrição.',
              '- Nenhuma chave duplicada por `Shikata + subclasse + nome` após a consolidação.',
              '- Os quatro Sinais do Bruxo são obrigatórios e validados durante a geração.',
              '']
    AUDIT.write_text('\n'.join(lines), encoding='utf-8')

    print(f'Gerado: {OUT.relative_to(ROOT)}')
    print(f'Auditoria: {AUDIT.relative_to(ROOT)}')
    print(f'Shikatas: {len(shikatas)} | habilidades: {total_abilities} | evoluções: {total_evolutions}')
    for s in shikatas:
        print(f"{s['id']}: {len(abilities_map[s['id']])} habilidades | subclasses={s['subclasses']}")


if __name__ == '__main__':
    main()
