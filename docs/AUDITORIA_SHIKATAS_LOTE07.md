# Auditoria de Shikatas — Lote 07

Fonte canônica: `TALOS_SISTEMA_v6_COMPLETO.docx`.

O Lote 07 substitui as listas manuais/legadas por dados gerados diretamente do DOCX v6. 
Nomes, níveis, subclasses, descrições e tabelas de evolução passam a compartilhar a mesma fonte.

| Shikata | Lote 06 manual | Lote 07 canônico | Δ | Subclasses | Evoluções estruturadas |
| --- | ---: | ---: | ---: | --- | ---: |
| Guerreiro | 33 | 33 | +0 | Guerreiro Empalador Sanguinário, Guerreiro Colossal | 30 |
| Ladino | 38 | 40 | +2 | Ladino Assassino, Ladino Arcanista Supremo | 28 |
| Inclemente | 20 | 27 | +7 | Inclemente, O Coração da Fornalha, Inclemente, O Lançador | 29 |
| Caçador | 30 | 29 | -1 | Caçador de Monstros, Caçador Espectral | 27 |
| Vanguarda | 24 | 24 | +0 | Vanguarda Exo-Combatente, Vanguarda Colossal | 25 |
| Monge | 39 | 40 | +1 | Monge das Águas, Monge Naturalista | 27 |
| Necromante | 46 | 43 | -3 | Necromante Lich, Necromante das Sombras | 2 |
| Mago | 45 | 46 | +1 | Mago Rúnico, Mago de Sangue | 18 |
| Feiticeiro | 41 | 41 | +0 | Feiticeiro Astral, Feiticeiro Temporal | 16 |
| Bardo | 18 | 18 | +0 | Artista, Poeta | 28 |
| Paladino | 32 | 30 | -2 | Paladino Justiceiro, Paladino Inquisidor da Morte | 35 |
| Espadachim | 26 | 26 | +0 | Espadachim das Sombras, Espadachim da Tempestade | 20 |
| Ceifeiro | 33 | 39 | +6 | Ceifeiro Ascendido, Ceifeiro Recipiente | 6 |
| Bruxo | 26 | 30 | +4 | Bruxo Encantador, Bruxo Combatente | 47 |
| Fulgor | 26 | 25 | -1 | Fulgor Combativo, Fulgor Restaurador | 38 |
| Sentinela | 20 | 43 | +23 | Sentinela — Inane, Sentinela Glacial | 6 |
| Spellstealer | 27 | 22 | -5 | Ditador, Regicida Supremo | 21 |
| Hemomante | 25 | 25 | +0 | Hemomante Empírico, Hemomante da Guerra | 35 |
| Lanceiro | 25 | 25 | +0 | Lanceiro Panteão Cósmico, Lanceiro Dracônico Elemental | 32 |
| Manipulador de Essência | 28 | 28 | +0 | Combustão, Titereiro | 14 |
| Invocador Funéreo | 24 | 34 | +10 | Sangue Puro, Maldição Intrépida | 39 |

**Total:** 21 Shikatas, 626 entradas na lista manual do Lote 06 → 668 entradas canônicas no Lote 07 (+42), com 523 linhas de evolução estruturadas.

## Decisões de fidelidade

- O nome de cada habilidade é derivado do título em negrito do DOCX, não de aliases antigos da ficha.
- Subclasses usam exatamente a nomenclatura do v6 (incluindo `Ditador`, do Spellstealer).
- Tabelas após “Evolução da Habilidade” são convertidas para progressões estruturadas.
- Os quatro Sinais do Bruxo (`IGNITE`, `ARXIS`, `BREN`, `ECRYPT`) são entradas próprias; suas tabelas textuais de nível 2–6 são progressão de **Mutação**, não níveis normais da Shikata.
- `SINAIS` permanece como cabeçalho/passiva de recurso; o limite compartilhado de Sinais por turno é aplicado às quatro ativações reais.
- O Invocador Funéreo permanece com dado de vida/dificuldade/poder como “Não informado no documento” quando o bloco v6 não fornece esses campos.
- Cabeçalhos estruturais como “Escolha entre ...” e “Magias diárias por nível” não viram habilidades.
- Classificação ativo/passiva/reação é conservadora: sem marcador de uso/ação ou verbo explícito de ativação, a entrada permanece passiva para não inventar consumo.
- Entradas repetidas com o mesmo nome/subclasse são consolidadas como progressão da mesma habilidade quando a fonte as reapresenta em níveis posteriores.

## Validações do gerador

- Exatamente 21 Shikatas.
- Exatamente 2 subclasses por Shikata no documento atual.
- Nenhuma entrada canônica sem descrição.
- Nenhuma chave duplicada por `Shikata + subclasse + nome` após a consolidação.
- Os quatro Sinais do Bruxo são obrigatórios e validados durante a geração.
