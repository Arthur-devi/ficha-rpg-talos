# Regras da Mesa — TALOS Sheet

Este arquivo registra regras específicas desta mesa/projeto que **complementam ou alteram** o texto de `TALOS_SISTEMA_v6_COMPLETO.docx`.

Elas ficam separadas da fonte canônica para que futuras sincronizações do DOCX não as sobrescrevam nem façam parecer que vieram do livro.

## Inspiração

**Regra da mesa:** gastar 1 ponto de Inspiração concede **+1 ao valor final da próxima rolagem** compatível e consome 1 ponto.

Na ficha:
- a Inspiração pode ser armada antes da rolagem;
- o bônus é exibido na animação e no histórico;
- a regra está centralizada em `src/data/tableRules.js`.

**Diferença para o TALOS v6:** o documento descreve Inspiração como concessão de *Vantagem*. O projeto mantém `+1` porque esta foi a regra explicitamente adotada pela mesa durante o desenvolvimento da ficha.

## MORRENDO — Teste de Vontade / estabilização

O TALOS v6 informa que, com 0 PV ou menos, o personagem pode fazer um teste de Constituição por Vontade para permanecer consciente por 1d4 rodadas e continua fazendo testes para estabilizar, mas não especifica no trecho central a DT nem uma trilha de sucessos/falhas.

**Regra da mesa implementada:**
- dado: **1d20 natural**;
- sem modificador;
- sem Inspiração;
- `10–20` = 1 sucesso;
- `1–9` = 1 falha;
- 3 sucessos = o personagem recupera **1 HP** e sai de MORRENDO;
- 3 falhas = **MORTE**;
- 1 natural e 20 natural não possuem regra especial nesta implementação;
- qualquer cura que leve o personagem acima de 0 HP **antes da MORTE** encerra o episódio e limpa sucessos/falhas;
- depois de MORTE confirmada, cura comum e descanso não ressuscitam o personagem;
- uma ressurreição válida precisa ser registrada explicitamente na ficha.

A regra está centralizada em:
- `src/data/tableRules.js`;
- `src/data/deathSaveRuntime.js`.

## Princípio de manutenção

Se uma regra futura da mesa divergir do DOCX, registre-a aqui e em `tableRules.js` em vez de alterar silenciosamente dados canônicos gerados a partir do livro.
