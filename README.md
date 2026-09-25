# Ficha RPG TALOS v6

Ficha React/Vite consolidada contra `TALOS_SISTEMA_v6_COMPLETO.docx`.

Estado atual: **Lote 10 — consolidação final / homologação TALOS v6**.

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
