# Auditoria Final — Lote 10 / TALOS v6

Data da consolidação: 2026-09-25.

## Objetivo

Consolidar a ficha depois dos Lotes 1–9, reduzir fontes concorrentes, separar regras oficiais de regras da mesa e deixar verificações reproduzíveis para impedir regressões estruturais.

## Inventário estrutural validado

- 21 Shikatas canônicas.
- 2 subclasses por Shikata.
- 668 entradas canônicas de habilidades/passivas/recursos de Shikata.
- 523 linhas estruturadas de evolução.
- 38 Origens.
- 41 Profissões.
- 38 Perícias.
- 9 atributos centrais.
- 3 Estados centrais oficiais: IMPARÁVEL, CONCENTRAÇÃO e CANSADO.

## Fonte canônica

### Shikatas

Fluxo único:

`TALOS_SISTEMA_v6_COMPLETO.docx` → `scripts/extract_shikatas_v6.py` → `src/data/shikatas_v6.generated.js`

`system.js` e `evolucoes.js` consomem esse resultado. `shikatas_v6.generated.js` não deve ser editado manualmente.

### Itens

`scripts/sync-docx-data.ps1` fica restrito ao catálogo de itens/conjuntos. Ele não cria uma segunda cópia das Shikatas.

### Fonte removida

`src/data/talos_reference.json` foi removido. Era uma fotografia paralela não consumida pela aplicação e poderia divergir do DOCX sem aviso.

## Regras da mesa separadas

`src/data/tableRules.js` concentra regras específicas da mesa:

1. Inspiração = +1 na rolagem.
2. MORRENDO = d20 natural, DT 10, 3 sucessos/3 falhas, 1 HP ao estabilizar.

A distinção completa está em `docs/REGRAS_DA_MESA.md`.

## MORRENDO / MORTE

Novo runtime persistente em `src/data/deathSaveRuntime.js`:

- HP <= 0 e personagem não morto → MORRENDO.
- Teste usa 1d20 natural e a animação 3D já existente.
- 3 sucessos → 1 HP e encerra MORRENDO.
- 3 falhas → MORTE confirmada.
- Cura antes da morte, se levar HP acima de 0, limpa a trilha.
- MORTE não é apagada por cura manual acidental nem por descanso.
- Ressurreição precisa ser registrada explicitamente.
- Cada teste entra no histórico de dados.

## Auditoria automatizada

Comando:

```bash
npm run audit:talos
```

O auditor verifica, entre outros pontos:
- contagens estruturais esperadas;
- unicidade e cobertura das 21 Shikatas;
- duas subclasses por Shikata;
- presença do DOCX canônico;
- uso da fonte gerada por `system.js` e `evolucoes.js`;
- ausência de `talos_reference.json`;
- ausência do nome antigo `TALOS_SISTEMA_v6_COMPLETO (1).docx`;
- versão das regras persistentes;
- configuração das regras da mesa;
- resolução dos imports relativos;
- imports nomeados apontando para exports existentes.

Essa última checagem previne especificamente a regressão que causou a tela branca no Hotfix 7.0.1.

## Validação do gerador

O gerador canônico foi executado novamente e o SHA-256 do arquivo gerado permaneceu igual antes/depois, confirmando saída determinística para o DOCX atual.

## Limites intencionais / dependências do Mestre

A ficha não inventa números onde o v6 não fornece uma regra fechada. Permanecem explicitamente contextuais ou ajustáveis, conforme o caso:

- efeitos cujo valor é definido pelo Mestre, como partes de Feral/Meio-Demônio;
- campos não especificados no v6 para algumas Origens;
- habilidades cujo dano depende de arma, terreno, alvo, porcentagem ou outro estado externo não modelado na ficha;
- custos narrativos de tempo/Essência que exigem um subsistema de calendário/idade para serem debitados de forma automática;
- requisitos narrativos de Multiclasse são confirmados pelo jogador/Mestre;
- efeitos contra inimigos que exigiriam uma ficha/registro persistente do alvo continuam sendo apresentados e rastreados sem inventar atributos do inimigo.

Isso não remove a regra da ficha: o texto e os controles necessários continuam disponíveis; apenas cálculos que exigiriam informação inexistente não são fabricados.

## Resultado da consolidação

O projeto passa a ter:
- uma única fonte canônica para Shikatas/evoluções;
- regras da mesa declaradas separadamente;
- migração persistente versionada;
- auditoria local reproduzível;
- trilha de MORRENDO/MORTE integrada à UI, ao histórico e ao D20 3D;
- documentação cumulativa dos Lotes 1–10.
