# Auditoria — Lote 09: Profissões, Perícias, Inspiração e Estados

Fonte de referência: `TALOS_SISTEMA_v6_COMPLETO.docx`.

## Escopo auditado

- 41 Profissões cadastradas na ficha.
- 38 Perícias estruturadas por atributo.
- 3 Estados centrais definidos no bloco de regras: IMPARÁVEL, CONCENTRAÇÃO e CANSADO.
- Inspiração integrada ao rolador conforme a regra definida pela mesa neste projeto: +1 na rolagem consumindo 1 Inspiração.
- Checkbox de confirmação de Multiclasse corrigido visualmente.

## Profissões

A tabela do v6 fornece principalmente as Perícias de cada Profissão. A ficha mantém essas perícias como proficiências bloqueadas/automáticas e agora estrutura escolhas explícitas quando o próprio texto pede isso:

- Artesão: até 3 especialidades de Ofício.
- Diplomata: uma variação de Atuação.
- Seguidor, Herdeiro, Herói Camponês, Membro de Guilda e Mercador: escolha de Ofício (qualquer).
- Assistente de Laboratório, Taverneiro, Fazendeiro, Marujo e Minerador: especialidade de Ofício fixa conforme a tabela.
- Amnésico: permanece dependente do passado revelado/Mestre; a ficha não inventa lista nem quantidade.

O texto introdutório menciona equipamentos e sugestões de interpretação como parte das profissões, mas a tabela auditada não fornece um catálogo de equipamentos por profissão. Nenhum equipamento foi inventado neste lote.

## Perícias

Foi criado um Teste de Perícia em `D20 Dados`:

- usa `1d20 + modificador do atributo vinculado`;
- mostra a origem da proficiência: Profissão, Origem ou Manual;
- permite ajuste manual do Mestre;
- usa o mesmo D20 3D cinematográfico;
- Inspiração pode ser aplicada à rolagem;
- registra a rolagem no histórico.

Referências numéricas explicitamente automatizadas/exibidas:

- Acrobacia: DT 10 nas situações descritas.
- Prestidigitação: DT 16.
- Investigação: DT 18 para identificar origem dos rastros.
- Cura: DT 13 no tratamento de doenças.
- Fortitude: DT 16 contra doenças e venenos.
- Atuação: referências 8 / 16 / 20+.
- Luta: +2 em Iniciativa quando a personagem possui a perícia.

O v6 afirma que Luta e Enganação sem proficiência podem ser tentadas com desvantagem, mas não fornece nesse trecho uma fórmula numérica universal para “desvantagem”. A ficha avisa e deixa o ajuste ao Mestre em vez de inventar uma penalidade.

`Iniciativa`, `Percepção` e `Misticismo` continuam marcadas como perícias citadas nas Profissões sem descrição própria na seção PERÍCIAS do documento.

## Estados

### IMPARÁVEL

- Registro manual de ativação/desativação.
- Ao ativar, remove Atordoado, Enraizado e Congelado já marcados.
- Enquanto ativo, bloqueia a ativação desses três marcadores.
- “Debilitações similares” permanece narrativa/decisão da mesa; a ficha não amplia a imunidade automaticamente para estados não listados.

### CONCENTRAÇÃO

- Adiciona +10 Defesa diretamente ao atributo enquanto ativo.
- A interface mostra o bônus como `estado` na composição do atributo.
- Botão `Registrar 1º ataque recebido` remove CONCENTRAÇÃO, representando o desvio do primeiro ataque inimigo.

### CANSADO

- Continua automático pelo Limite de Cansaço.
- Mantém a perda do bônus de acerto da Shikata.
- Descanso curto continua recuperando o estado.

### MORRENDO

- Passa a ser derivado automaticamente por `HP <= 0`.
- Não é salvo como marcador manual.
- O alerta global informa que Vontade/estabilização ficam disponíveis.
- A ficha não inventa DT para Vontade, pois o trecho do v6 não traz uma DT universal para esse teste.

### Outros marcadores

Atordoado, Enraizado, Congelado, Sangrando e Envenenado ficam separados dos Estados centrais. São marcadores úteis para habilidades, mas não recebem dano/duração/perda de ação genéricos que o bloco central do v6 não define.

## Inspiração

O documento v6 usa a palavra “Vantagem”. Neste projeto, por decisão explícita da mesa durante o desenvolvimento, a implementação vigente é:

- acumula Inspiração;
- arma a próxima rolagem em D20 Dados;
- consome 1 Inspiração;
- soma +1 ao resultado final;
- o valor máximo natural continua identificado pelo dado 3D.

Essa regra de campanha foi preservada deliberadamente neste lote.

## Compatibilidade

- `talosRulesVersion` atualizado para 12.
- Saves antigos recebem `professionState` automaticamente.
- Marcador legado `morrendo` é removido na migração, pois agora é derivado do HP.
- Nenhuma dependência npm nova.

## Validação

- 41 Profissões.
- 38 Perícias.
- 3 Estados centrais.
- 30 arquivos JS/JSX analisados pelo parser TypeScript: 0 erros de sintaxe.
- 68 imports relativos verificados: 0 exports ausentes.
- `node --check` em módulos JS puros: OK.
- Smoke tests de especialidades, Luta/Iniciativa, CONCENTRAÇÃO e IMPARÁVEL: OK.
- `npm ci` foi tentado, mas excedeu o limite do ambiente antes de disponibilizar o Vite; o gate visual final permanece `npm install` + `npm run dev` localmente.
