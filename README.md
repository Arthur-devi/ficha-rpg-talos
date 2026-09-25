# Ficha RPG TALOS v6

Ficha React/Vite consolidada contra `TALOS_SISTEMA_v6_COMPLETO.docx`.

Estado atual: **V11.9.2 — Carteira com conversão bidirecional**, sobre a base funcional consolidada do Lote 10.

## Rodar localmente

```bash
npm install
npm run dev
```

## Auditoria do projeto

```bash
npm run audit:talos
```

Esse comando valida contagens estruturais, fonte canônica, regras da mesa, imports/exports e referências legadas.

## Sincronizar Shikatas a partir do DOCX

```bash
npm run sync:shikatas
```

Fluxo canônico:

`TALOS_SISTEMA_v6_COMPLETO.docx` → `scripts/extract_shikatas_v6.py` → `src/data/shikatas_v6.generated.js`

Não edite `shikatas_v6.generated.js` manualmente.

## Regras da mesa

As regras deliberadamente específicas desta mesa ficam em `src/data/tableRules.js` e documentadas em `docs/REGRAS_DA_MESA.md`.

Atualmente:
- Inspiração = +1 na próxima rolagem compatível;
- MORRENDO = 1d20 natural, 10+ sucesso, 3 sucessos → 1 HP, 3 falhas → MORTE.

## Documentação

- `docs/CRONOLOGIA_ATUALIZACOES.md`
- `docs/REGRAS_DA_MESA.md`
- `docs/AUDITORIA_FINAL_LOTE10.md`
- `docs/AUDITORIA_ORIGENS_LOTE06.md`
- `docs/AUDITORIA_SHIKATAS_LOTE07.md`
- `docs/AUDITORIA_MULTICLASSE_LOTE08.md`
- `docs/AUDITORIA_PERICIAS_LOTE09.md`


## V11 — Remake Visual

O V11 altera apenas a camada de apresentação. O motor de regras dos Lotes 1–10 permanece preservado.

- V11.1: fundação visual em pergaminho, tinta e metal envelhecido;
- V11.2: navegação lateral / estrutura de livro;
- V11.3: página Dados dedicada, combate movido para controles globais e leitura das habilidades reformulada;
- V11.4: página Personagem reconstruída como folha de rosto clássica, com retrato, vitais, Origem/Shikata/Subclasse e ledger de identidade;
- V11.5: Atributos & Perícias em composição de ficha impressa, tooltips contextuais, vitais compactos e despoluição de Personagem/Dados;
- V11.6: Habilidades & Poderes unificados visualmente como grimório, recursos de classe compactados, editor manual redesenhado e descansos/notas reorganizados;
- V11.7: Equipamentos reconstruídos como arsenal/mochila/catálogo em linguagem de ficha, com catálogo progressivo e otimização complementar da página Habilidades;
- V11.8: navegação principal recebeu virada de página direcional e folio de página;
- V11.8.1: hotfix de fluidez — virada confinada ao viewport e redução de pintura na página Habilidades;
- V11.9: efeito de pergaminho removido por preferência visual; navegação passa a ser imediata, Habilidades mantém as otimizações de pintura e o projeto recebe o passe final de responsividade, overflow, foco e ergonomia mobile.
- V11.9.1: removidos os respiros marrons acima/abaixo da folha e o overflow horizontal global; carteira recebe a primeira versão da conversão de saldo.
- V11.9.2: conversão automática global substituída por setas pequenas em cada denominação, permitindo conversão manual nos dois sentidos (`100 PC ⇄ 1 PP ⇄ 100 PP ⇄ 1 PO ⇄ 100 PO ⇄ 1 PD`) sem alterar outras regras.

A interface não depende mais de arquivos de fonte embarcados; usa uma pilha serifada clássica do sistema operacional.
