# Cronologia de atualizações — Ficha TALOS v6

Este arquivo acompanha os lotes de correção da ficha contra o documento oficial `TALOS_SISTEMA_v6_COMPLETO.docx`.

## Lote 1 — Hemomante v6 e fonte canônica

### Objetivo
Alinhar o Hemomante com o DOCX v6 atual sem alterar a arquitetura geral da ficha.

### Arquivos alterados
- `TALOS_SISTEMA_v6_COMPLETO.docx`
  - Substituído pela versão v6 atual usada como fonte da auditoria.
- `scripts/sync-docx-data.ps1`
  - O caminho padrão do sistema agora usa `TALOS_SISTEMA_v6_COMPLETO.docx`, removendo a referência ao nome legado com `(1)`.
- `src/data/system.js`
  - Modificador do Hemomante corrigido para Constituição.
  - Transfusão Mágica corrigida para Constituição e cura de metade do dano.
  - Custos, usos e descrições do Hemomante atualizados.
  - Herança Sanguínea removida por não constar na versão atual do DOCX.
  - Custo Empírico adicionado.
  - Custos de Forja Hematúrgica, Lascas de Sangue, Pódio, Legião de Sangue e Vórtex Hemático corrigidos.
- `src/data/evolucoes.js`
  - Tabelas de evolução do Hemomante atualizadas conforme o DOCX atual.
  - Progressões ausentes de Sangue Enfeitiçado, Dança Escarlate, Experiência e Renascimento adicionadas.
- `src/components/TabHabilidades.jsx`
  - Reserva ML passa a ajustar de 1 em 1.
  - Exibe o limite de aprimoramentos por turno da Reserva de Sangue conforme o nível.

### Observações do documento-fonte
- `Lança Sanguinária` possui divergência interna no próprio DOCX: o texto-base informa `10d4+magia`, enquanto a tabela de evolução informa `10d4+mod constituição`. A ficha preserva essa divergência explicitamente em vez de escolher uma regra sem autorização.
- A tabela logo abaixo de `Escoamento da Dor` contém colunas e valores que parecem pertencer a lanças (`ML para 2ª lança`). Ela não foi convertida em progressão funcional neste lote para não transformar uma possível inconsistência editorial em regra da ficha.
- `src/data/talos_reference.json` ainda é um artefato legado gerado a partir da fonte anterior e não é consumido pela aplicação. Sua regeneração/remoção será tratada em lote próprio.

### Checklist de teste
1. Selecionar Shikata `Hemomante`.
2. Confirmar no cabeçalho: `Mod. acerto: Constituição`.
3. No nível 1, conferir `Transfusão Mágica`: `2d6+mod constituição`, cura metade do dano e custo opcional de 2 ML.
4. Alterar o nível para 5, 9, 14, 17 e 20 e conferir as tabelas de evolução.
5. Conferir Reserva ML: máximo = `4 x nível`, Defesa = metade da reserva e limite de aprimoramentos/turno = 1/2/2/3/3/4.
6. Selecionar `Hemomante Empírico` no nível 8 e conferir `Empírico` com 2 usos por descanso curto.
7. No nível 14, conferir `Custo Empírico` e as evoluções de `Experiência`/`Renascimento Épico`.
8. Selecionar `Hemomante da Guerra` e conferir custos: Forja 15 HP, Lascas 10 HP, Pódio 25 HP, Legião 35 HP.
9. No nível 20, conferir Vórtex Hemático com custo de 35 HP.

### Validação executada neste lote
- `node --check` em `system.js` e `evolucoes.js`: OK.
- Smoke test dos dados do Hemomante (modificador, custos, remoção/adição de habilidades e linhas de evolução): OK.
- Build Vite não foi executado até o fim neste ambiente porque as dependências não puderam ser baixadas integralmente. O teste de interface/build deve ser feito no ambiente local do projeto após `npm install`/`npm ci`.

## Lote 2 — HP, descansos e fluxo de evolução de nível

### Objetivo
Corrigir o cálculo efetivo de vida máxima/descansos e transformar a evolução de nível em um fluxo jogável, seguindo as regras do TALOS v6.

### Regras do DOCX aplicadas
- Cada Shikata recebe `2 pontos de atributo distributivos por nível`.
- Ao evoluir, deve-se rolar o dado de vida pós-nível 1 da Shikata que evoluiu.
- HP inicial: `12 + mod constituição`.
- Descanso curto: recupera `20% da vida máxima`.
- Descanso longo: recupera `100% da vida`, limitado a 1 por dia pelo sistema.

### Arquivos alterados
- `src/hooks/useCharacter.js`
  - Versão interna das regras elevada para v3.
  - Vida máxima real agora é calculada por `HP base TALOS + ajuste manual + rolagens de nível`.
  - O HP base usa `12 + mod CON + bônus de origem + bônus de itens`.
  - Adicionado `hpManualBonus` para exceções sem substituir a fórmula TALOS.
  - Migração de saves antigos: o valor padrão antigo `hpMax = 12` deixa de bloquear o cálculo correto; valores manuais explícitos são preservados como ajuste.
  - Adicionados `pontosDistributivos`, `pontosDistribuidosNivel` e histórico de evolução.
  - Adicionada ação atômica `levelUp()`: +1 nível e +2 pontos distributivos.
  - Adicionadas ações para gastar e devolver pontos de evolução por atributo.
- `src/App.jsx`
  - Integra o novo fluxo de evolução.
  - Após `Subir de nível`, abre automaticamente a aba `Dados` para a rolagem de vida.
  - Passa o HP derivado correto para a aba de descansos.
- `src/components/TabIdentidade.jsx`
  - Adicionado botão `Subir de nível` ao lado do nível.
  - O campo numérico continua disponível para ajuste manual, mas não concede recompensas de evolução.
  - O botão exige uma Shikata selecionada.
- `src/components/TabDados.jsx`
  - Exibe evolução/rolagem de vida pendente.
  - Mostra pontos distributivos ainda disponíveis.
  - Botão contextual `Girar vida do nível X`.
  - Vida máxima agora exibe a composição `base TALOS + níveis + ajuste manual`.
  - As fórmulas de dado de vida foram validadas para as 20 Shikatas que possuem dado informado no documento; Invocador Funéreo permanece sem rolagem automática porque o próprio cadastro/documento usado pela ficha não informa o dado.
- `src/components/TabAtributos.jsx`
  - Vida máxima usa o cálculo TALOS real.
  - Edição do valor máximo passa a representar apenas um `ajuste manual` sobre a fórmula oficial.
  - Novo painel `Pontos Distributivos de Evolução`.
  - Cada atributo possui botões `+` e `-` para gastar/devolver pontos recebidos por evolução.
  - A ficha registra separadamente quantos pontos de evolução foram aplicados em cada atributo.
- `src/components/TabMagias.jsx`
  - Descanso curto agora recupera 20% do `hpMaxTotal` real.
  - Descanso longo agora restaura o `hpMaxTotal` real.
  - Texto esclarecido: nesta etapa, o reset de usos ainda se limita aos poderes manuais desta aba; o motor global de usos será tratado em lote próprio.

### Fluxo de teste recomendado
1. Criar/abrir um personagem no nível 1 e selecionar uma Shikata com dado de vida informado.
2. Ajustar Constituição e confirmar que a vida máxima muda automaticamente conforme `12 + mod CON` (mais origem/itens, quando houver).
3. Na aba Identidade, clicar `Subir de nível`.
4. Confirmar que o nível sobe em 1 e a ficha abre `Dados`.
5. Confirmar aviso de rolagem pendente e `2` pontos distributivos disponíveis.
6. Clicar `Girar vida do nível 2` e conferir que o resultado entra na vida máxima e no histórico.
7. Ir para `Atributos`, gastar os 2 pontos com os botões `+` e confirmar o contador chegando a 0.
8. Usar `-` em um atributo que recebeu ponto de evolução e confirmar a devolução do ponto.
9. Reduzir o HP atual, executar descanso curto e verificar cura de 20% da vida máxima real, limitada ao máximo.
10. Reduzir novamente e executar descanso longo, confirmando restauração até a vida máxima real.
11. Testar edição direta do nível e confirmar que ela NÃO concede pontos; apenas o botão `Subir de nível` simula a evolução completa.
12. Testar um save antigo para conferir a migração da vida sem perda dos demais dados.

### Validação executada neste lote
- `git diff --check`: OK.
- `node --check` em `useCharacter.js`, `system.js` e `evolucoes.js`: OK.
- Validação das fórmulas de dado de vida: 20 Shikatas com fórmula rolável passaram; Invocador Funéreo permanece sem dado configurado por ausência da informação na fonte cadastrada.
- A instalação integral das dependências no ambiente de execução não concluiu; por isso o build Vite completo deve ser confirmado no teste local com `npm install` e `npm run dev`.

## Lote 2.5 — Transições, D20 3D e ajuda contextual de perícias

### Objetivo
Melhorar a sensação de uso da ficha sem alterar regras de personagem: dar movimento às trocas de tela, tornar a rolagem de dados mais expressiva e deixar a consulta das perícias disponível dentro da própria aba Atributos.

### Arquivos alterados
- `src/App.jsx`
  - Conteúdo das abas agora é montado dentro de uma camada de transição keyed pela aba ativa.
  - Trocas de aba recebem entrada suave sem alterar o estado do personagem.
- `src/components/DiceStage3D.jsx`
  - Novo componente visual do D20.
  - Renderização em Canvas, sem dependências externas.
  - Geometria de icosaedro com 20 faces, projeção em perspectiva, rotação nos três eixos, sombreamento, numeração de faces, brilho e partículas.
  - Nova rolagem dispara aceleração/desaceleração do D20 e uma revelação visual do resultado.
  - O resultado mecânico continua vindo do rolador já existente; a animação é apenas representação visual.
- `src/components/TabDados.jsx`
  - Nova `Mesa de Dados TALOS` no topo da aba.
  - Qualquer rolagem desta tela (livre, atributo ou vida por nível) alimenta a animação do D20 e exibe a última rolagem.
- `src/data/system.js`
  - Adicionado `PERICIAS_INFO` com 38 resumos baseados na seção PERÍCIAS do TALOS v6.
  - Para `Iniciativa`, `Percepção` e `Misticismo`, o próprio cadastro informa que o documento cita a perícia mas não fornece uma descrição própria, evitando inventar regra.
- `src/components/TabAtributos.jsx`
  - Cada perícia agora possui um botão `?` de ajuda contextual.
  - Hover ou foco exibe o resumo da perícia.
  - Perícias fixas da profissão continuam bloqueadas normalmente.
- `src/styles/global.css`
  - Transições de entrada para abas, cards e modais.
  - Feedback visual de navegação ativa.
  - Estilos completos da mesa de D20, brilho, faíscas e impacto do resultado.
  - Popovers das perícias.
  - Respeito a `prefers-reduced-motion` para usuários que desativam animações no sistema operacional.

### Decisões técnicas
- Não foi adicionada `three.js`, `react-three-fiber` ou outra dependência. O D20 é desenhado diretamente em Canvas com matemática 3D, mantendo o `npm install` original do projeto.
- A animação não interfere na aleatoriedade nem altera os valores salvos: o rolador existente continua sendo a fonte do resultado.
- A experiência é inspirada em rolagens cinematográficas de RPGs digitais, sem reutilizar assets, interface ou código de jogos de terceiros.

### Checklist de teste
1. Alternar rapidamente entre Identidade, Atributos, Dados, Habilidades e Inventário; confirmar entradas suaves e ausência de travamentos.
2. Na aba Dados, clicar em `1d20`, `1d6`, `2d8`, `3d4 atributo` e uma fórmula manual; confirmar que o D20 anima a cada resultado.
3. Subir de nível e girar a vida; confirmar que a rolagem também movimenta o D20 e continua entrando no HP normalmente.
4. Confirmar que o valor mostrado após a animação é o mesmo do card Resultado e do Histórico.
5. Em Atributos > Perícias, passar o mouse sobre `?` em várias perícias e conferir os textos.
6. Testar uma perícia fixa da profissão: deve continuar marcada/bloqueada, mas o `?` deve permanecer consultável.
7. Em tela pequena, tocar/focar no `?` e confirmar que o popover continua legível.
8. Se o sistema operacional estiver configurado para reduzir animações, confirmar que a interface permanece funcional sem movimentos intensos.

### Validação executada neste lote
- `git diff --check`: OK (apenas aviso de normalização CRLF/LF do CSS).
- `node --check src/data/system.js`: OK.
- Importação dos dados do sistema: 38 descrições de perícia e 21 Shikatas carregadas com sucesso.
- O build Vite não pôde ser executado neste ambiente porque as dependências locais estão incompletas (`vite: not found`); o projeto não recebeu novas dependências, portanto o teste local continua sendo `npm install` seguido de `npm run dev`.

## Lote 2.6 — Dados cinematográficos poliedrais

### Objetivo
Transformar a rolagem de dados em uma cena mais cinematográfica, removendo o card grande da versão 2.5 e colocando o dado como elemento lateral permanente na aba Dados. Ao rolar, a ficha é coberta por uma cena escura e o(s) dado(s) entram no centro da tela, com o valor final exibido diretamente na face voltada para a câmera.

### Arquivos alterados
- `src/components/DiceStage3D.jsx`
  - Renderer refeito para suportar diferentes geometrias em Canvas 3D, sem dependências externas.
  - Geometrias próprias para `d1`, `d4`, `d6`, `d8`, `d10`, `d12`, `d20` e `d100`.
  - O `d100` usa uma malha própria de 100 faces.
  - O `d1` é representado como uma peça/medalhão de uma única possibilidade.
  - Fórmulas com vários dados agora colocam vários poliedros na cena (até 6 simultaneamente por segurança visual/performance).
  - O resultado individual de cada dado é desenhado diretamente sobre a face que termina voltada para a câmera.
  - O total da fórmula continua sendo exibido discretamente na parte inferior da cena.
  - Adicionado overlay cinematográfico com fundo escuro, vinheta, runas, partículas, desaceleração, impacto e revelação do resultado.
  - Após a revelação, a cena pode ser fechada com clique ou desaparece automaticamente.
  - A rolagem mecânica continua acontecendo antes da animação; a animação nunca altera o resultado salvo.
- `src/components/TabDados.jsx`
  - Removido o antigo card `Mesa de Dados TALOS` do lote 2.5.
  - A página passa a usar layout de duas colunas em desktop, com conteúdo à esquerda e o dado ativo à direita.
  - Adicionado `1d1` aos atalhos rápidos.
  - O parser de fórmulas agora aceita `d1` legitimamente (resultado sempre 1).
  - Rolagens múltiplas como `2d8`, `2d10` e `3d4 atributo` fornecem os resultados individuais para a cena 3D.
- `src/styles/global.css`
  - Novo `dice-dock` lateral/sticky para a prévia do dado ativo.
  - Novo overlay cinematográfico em tela inteira para a rolagem.
  - Fundo preto/vinheta, partículas, runas, piso/luz de impacto e transições de entrada/saída.
  - Responsividade: em telas pequenas o dock deixa de ocupar uma coluna lateral e vira uma prévia compacta acima da área de dados.
  - Mantido suporte a `prefers-reduced-motion`.

### Geometrias
- `d1`: peça/medalhão achatado.
- `d4`: tetraedro (4 faces).
- `d6`: cubo (6 faces).
- `d8`: octaedro (8 faces).
- `d10`: bipirâmide pentagonal estilizada (10 faces).
- `d12`: dodecaedro (12 faces), construído como dual do icosaedro.
- `d20`: icosaedro (20 faces).
- `d100`: poliedro facetado gerado com exatamente 100 faces.

### Comportamento de rolagens múltiplas
- `2d8`: dois d8 entram na cena e cada um mostra seu próprio valor.
- `3d4 atributo`: três d4 entram na cena; a regra TALOS continua somando apenas os dois menores no cálculo oficial.
- Fórmulas com modificadores, como `2d8+3`, mostram os dois dados na cena e o total final (já com `+3`) abaixo.
- Para fórmulas extremas com mais de 6 dados, a cena limita a renderização simultânea a 6 poliedros e informa quantos ficaram fora da cena; o cálculo completo continua normal.

### Checklist de teste
1. Abrir a aba Dados em desktop e confirmar que a prévia do dado fica na lateral direita, sem o card grande do lote 2.5.
2. Rolar `1d4`, `1d6`, `1d8`, `1d10`, `1d12`, `1d20` e `1d100`; confirmar que a forma geométrica muda.
3. Rolar `1d1`; confirmar que a peça própria aparece e o resultado é sempre `1`.
4. Confirmar que ao clicar em qualquer rolagem o fundo escurece e o dado vai para o centro da tela.
5. Esperar o dado parar e conferir que o resultado aparece na própria face do poliedro.
6. Rolar `2d8`; confirmar que aparecem dois d8 com valores individuais e que a soma bate com o card Resultado.
7. Rolar `3d4 atributo`; confirmar três d4 na cena e comparar o total com a regra dos dois menores.
8. Rolar uma vida por nível (ex.: Guerreiro `2d8+CON`) e confirmar que os dados animam sem alterar o HP calculado.
9. Clicar na cena após revelar o resultado e confirmar fechamento imediato.
10. Testar em tela estreita/celular e conferir que a prévia lateral se reorganiza sem cortar conteúdo.

### Validação executada neste lote
- `git diff --check`: OK.
- Teste isolado do renderer: geometrias geradas com `d4=4`, `d6=6`, `d8=8`, `d10=10`, `d12=12`, `d20=20` e `d100=100` faces.
- Teste de extração de rolagens múltiplas: `2d8` gera dois objetos 3D com seus resultados individuais.
- Teste do parser: `1d1` retorna sempre 1; `2d8+3` e `3d4 atributo` continuam calculando normalmente.
- O `npm ci` não concluiu no ambiente de execução e o pacote local do Vite está incompleto; portanto o build final continua dependendo do teste local com `npm install` e `npm run dev`.

## Lote 2.9 — d2/moeda, Inspiração e itens manuais

### Objetivo
Fechar a experiência cinematográfica dos dados antes dos próximos lotes de regras e ampliar a Mochila para aceitar equipamentos criados pelo jogador com efeitos mecânicos reais.

### Dados cinematográficos
- `src/components/DiceStage3D.jsx`
  - O antigo `d1` foi removido; a geometria inicial agora é `d2`.
  - `d2` é representado como moeda tridimensional com duas faces reais: uma face contém `1` e a outra contém `2`.
  - Ao terminar a rolagem da moeda, a face correspondente ao resultado é posicionada para a câmera.
  - A orientação do dado agora congela completamente após a revelação. Isso elimina o comportamento em que o resultado parecia saltar de uma face para outra depois de o dado já ter parado.
  - Resultados naturais iguais ao maior valor do dado recebem marca visual `MÁX` e indicação `Valor máximo natural` na cena.
  - A cena mostra quando uma rolagem utilizou Inspiração.
- `src/components/TabDados.jsx`
  - Atalho `1d1` substituído por `1d2`.
  - Adicionado controle `Usar Inspiração (+1)`.
  - Inspiração é preparada para uma única próxima rolagem livre, soma `+1` ao resultado, consome 1 ponto de Inspiração e desarma automaticamente.
  - O card de resultado e o histórico registram quando houve Inspiração.
  - Rolagens de vida por nível não consomem Inspiração automaticamente.

### Itens manuais na Mochila
- `src/components/TabInventario.jsx`
  - Novo botão `+ Item manual` na Mochila.
  - Novo editor de item manual com nome, categoria, raridade, dano, descrição e observações.
  - Campos mecânicos estruturados para `CA`, `HP Máximo`, `Deslocamento` e todos os nove atributos TALOS: Força, Magia, Constituição, Inteligência, Percepção, Destreza, Carisma, Defesa e Sorte.
  - Valores positivos e negativos são aceitos.
  - Itens manuais recebem identificação `MANUAL`, podem ser equipados nos slots existentes e podem ser editados posteriormente.
  - Seus bônus só entram nas somas da ficha enquanto o item estiver equipado, igual aos demais equipamentos.
- `src/data/itemEffects.js`
  - Adicionado suporte a efeitos estruturados de itens manuais.
  - Descrições narrativas de itens manuais nunca são interpretadas automaticamente como bônus, evitando somas duplicadas.
- `src/hooks/useCharacter.js`
  - Versão interna das regras elevada para v4.
  - Adicionado armazenamento persistente `customItems` nos saves.
  - Adicionadas ações de criação e edição de itens manuais.
  - Itens manuais equipados passam a integrar as fórmulas finais de atributos, CA, HP e deslocamento.
  - A fórmula de HP base e a migração de saves também reconhecem itens manuais equipados.
  - Remover um item agora também limpa corretamente o slot de equipamento correspondente; se for manual, remove sua definição customizada.
- `src/App.jsx`
  - Integra as novas ações de criação/edição de itens manuais à aba Inventário.

### Checklist de teste
1. Na aba Dados, rolar `1d2` várias vezes e confirmar que a moeda mostra `1` em uma face e `2` na outra.
2. Confirmar que, depois de cair, o número não troca mais de face durante o tempo de exibição.
3. Rolar o valor máximo de um dado e conferir a marca `MÁX`/`Valor máximo natural`.
4. Definir Inspiração maior que zero em Atributos, voltar a Dados, armar `Usar Inspiração (+1)` e fazer uma rolagem.
5. Confirmar que o total recebe +1, a Inspiração cai em 1 e o controle desarma automaticamente.
6. Confirmar que uma rolagem de HP por nível não consome Inspiração armada.
7. Em Inventário > Mochila, clicar `+ Item manual`.
8. Criar um item com, por exemplo: `+2 Força`, `+1 Constituição`, `+2 CA`, `+5 HP`, `+1 Deslocamento`.
9. Confirmar que, apenas por estar na Mochila, os totais ainda não mudam.
10. Equipar o item e conferir imediatamente as alterações em Atributos, CA, HP máximo e Deslocamento.
11. Editar o mesmo item enquanto equipado e confirmar atualização instantânea dos totais.
12. Desequipar e confirmar remoção de todos os bônus.
13. Remover o item e confirmar que não fica slot fantasma em `Itens Equipados`.
14. Exportar e importar o personagem e confirmar que o item manual permanece no save.

### Validação executada neste lote
- `git diff --check`: OK.
- Teste isolado de `parseItemEffects` para item manual: CA, HP, Deslocamento, Força e Defesa foram agregados corretamente.
- Teste de isolamento: texto narrativo de item manual contendo uma frase de bônus não gera bônus duplicado; somente os campos estruturados possuem efeito mecânico.
- O build Vite não pôde ser executado neste ambiente porque o `node_modules` local continua corrompido/incompleto (`vite: not found`). Uma tentativa de reconstrução das dependências também não concluiu no ambiente. O teste final de interface permanece `npm install` + `npm run dev` no ambiente local já funcional do projeto.

## Hotfix 2.9.1 — Modal de item manual

### Problema observado
- Em telas com pouca altura útil, o editor de item manual podia aparecer parcialmente atrás da barra superior.
- A causa não era somente o tamanho do formulário: a animação persistente da aba (`transform` mantido após a transição) fazia a seção virar um containing block para elementos `position: fixed`.

### Correções
- `src/components/TabInventario.jsx`
  - O editor de item manual agora é renderizado por `createPortal(..., document.body)`, ficando fora da árvore transformada da aba e sempre relativo à janela real do navegador.
- `src/styles/global.css`
  - A transição das abas/cards não mantém mais o `transform` depois que a animação termina.
  - Overlay dos modais elevado para `z-index: 5000`.
  - Modal limitado a `calc(100dvh - 32px)` (fallback para `100vh`).
  - Cabeçalho e rodapé permanecem visíveis; somente `.modal-body` possui rolagem vertical.
  - Melhorias para telas estreitas: padding reduzido e rodapé flexível.

### Checklist de teste
1. Abrir Inventário > Mochila > `+ Item manual`.
2. Confirmar que o cabeçalho `Criar item manual` aparece inteiro, sem ficar atrás da navegação superior.
3. Confirmar que os botões `Cancelar` e `Adicionar à Mochila` permanecem visíveis.
4. Rolar apenas o conteúdo central do formulário e verificar que cabeçalho/rodapé não saem da tela.
5. Reduzir a altura da janela e repetir o teste.
6. Entrar na aba Inventário e abrir o modal imediatamente durante a animação de entrada; ele deve continuar centralizado corretamente.

### Validação executada
- `git diff --check` para `TabInventario.jsx` e `global.css`: OK.
- Correção estrutural via React Portal elimina a dependência do modal em qualquer `transform` ancestral.

## Lote 3 — Cansaço funcional, acerto da Shikata e descanso cinematográfico

### Objetivo
Transformar o Limite de Cansaço de um marcador visual em regra funcional do TALOS v6 e integrar os descansos com recuperação real de Cansaço/estado CANSADO. Como melhoria visual do mesmo fluxo, os dois descansos agora possuem uma cena cinematográfica de recuperação de vida.

### Regras do DOCX aplicadas
- O Limite de Cansaço representa quantas habilidades podem ser usadas sem penalidade.
- O limite base é determinado pela origem e recebe `+1` a cada 2 pontos de Constituição.
- Ao esgotar o limite, o personagem pode continuar usando habilidades, mas deixa de somar o modificador de atributo da Shikata aos ataques.
- O estado `CANSADO` recupera com descanso curto.
- Ataque normal TALOS: `d20 + modificador do atributo principal da Shikata`.
- Descanso curto: 1 hora e cura de 20% da vida máxima.
- Descanso longo: 8 horas e cura de 100% da vida.

### Arquivos alterados
- `src/hooks/useCharacter.js`
  - Versão interna das regras elevada para v5.
  - Adicionados `cansacoAtual`, percentual, restante e `isCansado` como valores derivados coerentes com o limite real.
  - O estado `CANSADO` passa a ser controlado automaticamente pelo contador de Cansaço.
  - Adicionadas ações `setCansaco()` e `registerAbilityUse()`.
  - Ao atingir o limite, a ficha ativa `CANSADO`; usos posteriores continuam permitidos, mantendo o contador no teto.
  - Adicionada ação `performRest()` para aplicar cura e recuperação de Cansaço de forma atômica.
  - Descanso curto e longo zeram Cansaço e removem `CANSADO`.
  - Descanso longo continua resetando os usos dos poderes manuais cadastrados na aba Poderes.
  - Adicionada estrutura de modificadores de acerto por Shikata para a nova rolagem de ataque TALOS.
  - Classes com `X ou Y` expõem alternativas de modificador. O Lanceiro aparece no documento como `Força e Destreza`, mas o trecho não define se ambos são somados; por isso a ficha expõe os dois separadamente e exige escolha manual, evitando inventar uma regra.
  - Migração de saves antigos remove o antigo `CANSADO` manual e passa a derivá-lo do contador.
- `src/components/TabAtributos.jsx`
  - O bloco de Cansaço agora possui barra visual, botões `-1`, `+1 uso` e `Zerar`.
  - Ao chegar ao limite, exibe aviso `CANSADO — bônus de acerto da Shikata desativado`.
  - O botão de estado `CANSADO` virou somente leitura/automático para impedir conflito com o contador.
- `src/components/TabDados.jsx`
  - Adicionado card `Acerto da Shikata`.
  - Rola `1d20 + modificador da Shikata` usando os atributos finais do personagem.
  - Quando CANSADO, a rolagem continua disponível, porém o bônus da Shikata é automaticamente convertido para `+0`.
  - Shikatas com modificadores alternativos permitem selecionar qual será usado.
  - Inspiração armada também funciona na rolagem de ataque TALOS.
  - Resultado registra explicitamente quando o modificador foi removido por Cansaço.
- `src/components/TabMagias.jsx`
  - Usar um poder/habilidade manual ativo registra `+1` de Cansaço; passivas não consomem.
  - Descansos agora usam `performRest()` e mostram o estado atual de Cansaço.
  - Ambos acionam a nova animação cinematográfica de recuperação.
- `src/components/RestHealingOverlay.jsx`
  - Novo overlay em React Portal para ocupar a janela real sem ser afetado por transições das abas.
  - Fundo escuro/vinheta, partículas verdes e símbolo de descanso.
  - Mostra a equação visual de cura: `HP atual + HP recuperado = novo HP`.
  - O valor verde de recuperação começa em `+1` e progride até o total realmente recuperado.
  - Curas muito altas aceleram progressivamente para manter a animação curta.
  - Mostra HP final, cura total e Cansaço recuperado.
  - Pode ser pulado por botão ou tecla Esc e respeita `prefers-reduced-motion`.
- `src/styles/global.css`
  - Barra e estado visual de Cansaço.
  - Estilos completos da animação de descanso/cura.
- `src/data/system.js`
  - Descrição de `CANSADO` atualizada para incluir recuperação por descanso curto.
- `src/App.jsx`
  - Integra as novas ações de Cansaço e descanso às abas correspondentes.

### Checklist de teste
1. Escolher uma origem/Shikata e observar o Limite de Cansaço calculado.
2. Clicar `+1 uso` até atingir o limite; confirmar ativação automática de `CANSADO`.
3. Ir para Dados > `Acerto da Shikata` e confirmar que, antes de cansar, o modificador é somado ao d20.
4. Com `CANSADO`, repetir a rolagem e confirmar `bônus +0`, com aviso no resultado.
5. Usar Inspiração nessa rolagem e confirmar que o `+1` continua funcionando normalmente.
6. Em Poderes, cadastrar/usar uma habilidade ativa e confirmar incremento de Cansaço; uma passiva não deve incrementar.
7. Reduzir HP e acumular Cansaço. Executar descanso curto.
8. Confirmar tela escura, contador verde começando em `+1` e avançando até o total curado, com a equação de HP atualizada em tempo real.
9. Confirmar que descanso curto cura no máximo 20% da vida máxima, zera Cansaço e remove `CANSADO`.
10. Repetir com descanso longo e confirmar HP pleno, Cansaço zerado e reset dos poderes manuais.
11. Testar descanso com HP já cheio: a cena deve informar que a vida já estava completa sem gerar valor falso de cura.
12. Testar em tela pequena e pressionar Esc durante a animação para confirmar que o overlay fecha corretamente.

### Validação executada neste lote
- `git diff --check`: OK.
- `node --check src/hooks/useCharacter.js`: OK.
- `node --check src/data/system.js`: OK.
- O build Vite completo não pôde ser executado neste ambiente porque a reconstrução de `node_modules` excedeu o limite do ambiente e o binário local do Vite não está disponível. O teste final de interface permanece `npm install` + `npm run dev` no ambiente local do projeto.

## Lote 4 — Motor oficial de habilidades, custos e recargas

### Objetivo
Transformar os limites escritos nas habilidades oficiais em controles funcionais da ficha, sem alterar o conteúdo narrativo das Shikatas. Este lote cria a infraestrutura comum para usos/recargas e deixa recursos específicos mais complexos para as auditorias próprias de cada classe.

### Regras do DOCX aplicadas
- Habilidades com usos por descanso curto e descanso longo passam a ter cargas controladas e resetadas pelo descanso correspondente.
- Limites por turno, combate, dia, semana e mês passam a ser controlados por períodos explícitos da ficha.
- Recargas do tipo `1x a cada N turnos/dias` bloqueiam apenas até o intervalo necessário e voltam a ficar disponíveis automaticamente quando o contador avança.
- Limites por alvo/inimigo/criatura são registrados pelo nome/identificação do alvo quando a própria habilidade exige esse controle.
- Custos explícitos em HP/vida, Performance e aprimoramentos em ML passam a ser cobrados no uso.
- Cada ativação de habilidade oficial ativa continua contando `+1 Cansaço`, preservando a regra funcional do Lote 3.

### Arquivos alterados
- `src/data/abilityRuntime.js` (novo)
  - Parser/normalizador das regras temporais existentes em `SHIKATAS_HABILIDADES` e nas tabelas de evolução.
  - Suporte a descanso curto/longo, turno, combate, dia, semana, mês e cooldown em turnos/dias.
  - Suporte a limite em vida e restrição por alvo/inimigo/criatura quando explicitamente indicada.
  - Interpretação de custos explícitos de HP (fixos ou por dado), Performance, ML opcional do Hemomante e custo textual de Essência do Manipulador.
  - `Custo Empírico` do Hemomante Empírico (nv.14+) reduz custos de vida pela metade.
  - `O Controle do Sangue` do Mago de Sangue (nv.17+) reduz custos de vida pela metade.
  - Cooldown é tratado como janela de recarga, não como uma carga permanente; após o intervalo a habilidade volta a ficar disponível.
- `src/hooks/useCharacter.js`
  - Versão interna das regras elevada para v6.
  - Adicionados `officialAbilityUsage` e `abilityTimeline` aos saves/migrações.
  - Nova ação `useOfficialAbility()` aplica disponibilidade, alvo, custo, recursos, Cansaço e registro de uso de forma atômica.
  - Nova ação `resetOfficialAbilityUse()` para correção manual de contadores quando necessário.
  - Nova ação `advanceAbilityPeriod()` para avançar turno, combate, dia, semana e mês e liberar os recursos correspondentes.
  - Descanso curto reseta habilidades oficiais de descanso curto.
  - Descanso longo reseta habilidades oficiais de descanso curto e longo.
  - Limites por alvo vinculados ao mesmo período também são limpos automaticamente.
  - Aprimoramentos de ML do Hemomante respeitam o limite por turno e são zerados ao avançar turno/combate.
- `src/components/TabHabilidades.jsx`
  - Novo painel `Motor de Habilidades` com contadores de Turno, Combate, Dia, Semana e Mês.
  - Cada habilidade oficial ativa desbloqueada recebe painel de runtime com usos restantes, custo, recarga, limite em vida e/ou alvo quando aplicável.
  - Botão `Usar habilidade` registra a ativação e bloqueia quando a regra explícita não permite novo uso.
  - Campo de alvo aparece somente quando a habilidade possui restrição por alvo/inimigo/criatura.
  - Aprimoramentos opcionais em ML podem ser ativados na própria habilidade e mostram o consumo/limite do turno.
  - Feedback imediato informa HP, ML ou Performance consumidos e erros de disponibilidade.
  - Custo de Essência é exibido, mas não reduz automaticamente longevidade neste lote; isso depende do subsistema específico do Manipulador.
- `src/components/RestHealingOverlay.jsx`
  - Pedido pós-Lote 3 aplicado: a conclusão da cura permanece aproximadamente 1 segundo a mais em tela.
  - A cena agora encerra com fade-out de 700ms em vez de desaparecer instantaneamente.
  - `Pular`/Esc também usam a saída suave quando animações não estão reduzidas no sistema.
- `src/App.jsx`
  - Liga as novas ações do motor à aba Habilidades.
- `src/styles/global.css`
  - Layout e estados do motor de habilidades, pills de usos/custos/recarga, alvo e feedback.
  - Fade-out e transição final da animação de descanso.

### Limites intencionais deste lote
- Custos de `Essência` do Manipulador são identificados e exibidos, mas não descontados automaticamente porque a ficha ainda não possui um modelo de idade/longevidade; isso será resolvido junto da Shikata específica.
- `Invocador Funéreo` possui habilidades com limites escritos como número de `invocações` em vez de uma periodicidade temporal. Essas cargas dependem do subsistema próprio de invocações e não foram reinterpretadas como descanso/turno sem suporte do documento.
- Custos de ações (`ação completa`, `ação bônus`, reação) ficam para o Lote 5, que implementará o motor de turnos/ações.
- Recursos globais específicos de classe (por exemplo, economias completas de magia/almas/invocações) serão conectados durante a auditoria integral das Shikatas; este lote fornece a infraestrutura de recarga/custo necessária para isso.

### Checklist de teste
1. Selecionar Guerreiro e usar uma habilidade com `2x desc. curto`; confirmar contador 2 → 1 → 0 e bloqueio da terceira ativação.
2. Executar descanso curto e confirmar retorno das cargas dessa habilidade.
3. Usar uma habilidade com `desc. longo`; confirmar que descanso curto NÃO a restaura e descanso longo restaura.
4. Usar uma habilidade limitada por turno, esgotar seus usos, clicar `Novo turno` e confirmar liberação.
5. Usar uma habilidade `1x por combate`, iniciar `Novo combate` e confirmar reset.
6. Testar uma habilidade semanal/mensal e usar `Nova semana`/`Novo mês` para liberar a carga.
7. Testar habilidade com `1x a cada N turnos`: usar, avançar os turnos e confirmar que ela só volta no intervalo correto.
8. Testar uma habilidade com restrição por alvo: usar em `Goblin A`, tentar novamente no mesmo alvo e depois em `Goblin B`.
9. Com Hemomante, testar aprimoramento em ML; confirmar consumo da Reserva e limite de aprimoramentos por turno.
10. Com Hemomante Empírico nv.14+, testar habilidade com custo de vida e confirmar redução pela metade quando aplicável.
11. Com Mago de Sangue nv.17+, testar habilidade sanguínea com custo de HP e confirmar `O Controle do Sangue` reduzindo o custo pela metade.
12. Com Bardo, testar habilidade com custo de Performance com recurso suficiente e insuficiente.
13. Confirmar que cada habilidade oficial ativa utilizada soma +1 Cansaço e que CANSADO continua funcionando como no Lote 3.
14. Reduzir HP, fazer descanso curto/longo e confirmar que a cena permanece cerca de 1 segundo a mais após concluir a contagem e desaparece gradualmente por fade-out.

### Validação executada neste lote
- `node --check` em `src/data/abilityRuntime.js` e `src/hooks/useCharacter.js`: OK.
- Transpilação sintática com o parser TypeScript em todos os arquivos `src/**/*.js` e `src/**/*.jsx`: 17 arquivos verificados, 0 erros de sintaxe.
- Auditoria do runtime sobre 626 entradas de habilidades: 376 entradas ativas/reação/bônus rastreáveis; limites temporais, custos e restrições reconhecidos sem transformar custos narrativos em HP por engano.
- Testes pontuais de evolução/recarga: mudança de Coragem de Ferro para 3x descanso longo em nível alto, Transfusão Mágica por turno/ML, Maestria Arcana com cooldown, Toque Celeste com limite semanal + em vida, e custos reduzidos de Hemomante Empírico/Mago de Sangue.
- O build Vite completo não pôde ser executado neste ambiente porque a instalação de dependências excedeu o tempo disponível e o binário local `vite` não foi instalado. O teste final de interface permanece `npm install` + `npm run dev` no ambiente local que já validou os lotes anteriores.

## Lote 4.5 — Dano automático 3D, transições temporais e Poderes avançados

### Objetivo
Transformar a ativação das habilidades em uma ação mais completa de combate: quando o texto atual permite determinar com segurança os dados de dano, o próprio botão `Usar habilidade` resolve a fórmula, aplica os modificadores atuais e abre a mesma rolagem 3D cinematográfica da aba Dados. Também melhora a percepção visual dos avanços de turno/período e expande o cadastro de Poderes manuais.

### Habilidades oficiais
- `src/data/damageRuntime.js` (novo)
  - Extrai fórmulas de dano das habilidades oficiais e das evoluções vigentes no nível atual.
  - Dá prioridade à linha de evolução mais recente aplicável ao personagem, evitando rolar o dano de tiers antigos.
  - Reconhece modificadores de Força, Magia, Constituição, Inteligência, Percepção, Destreza, Carisma, Defesa e Sorte.
  - Resolve o valor atual do modificador apenas no instante da rolagem.
  - Reconhece tipos explícitos de dano como físico, mágico, real, fogo, gelo, raio/elétrico, necrótico, ácido/corrosivo, veneno, sangramento, concussão, cortante, perfurante, flamejante e explosivo.
  - Fórmulas condicionais não são misturadas silenciosamente: habilidades com modos distintos (por exemplo `Interromper`/`Acelerar` ou 1º/2º impacto) exibem uma seleção do dano a rolar.
  - Bônus de dano condicionados a ML são classificados separadamente e só entram na rolagem quando o aprimoramento correspondente é realmente ativado.
  - Dados ligados apenas a cura, duração, distância ou quantidade não são tratados como dano.
- `src/data/abilityRuntime.js`
  - Cada habilidade rastreável passa a expor também seu `damageSpec` quando o dano em dados pode ser determinado com segurança.
- `src/components/TabHabilidades.jsx`
  - Habilidades com dano automatizado exibem uma pill `🎲` com a fórmula detectada.
  - Ao clicar `Usar habilidade`, depois de validar usos/custos/alvo, a ficha rola automaticamente o dano e abre a cena 3D.
  - Habilidades com mais de um modo de dano mostram o seletor `Dano a rolar` antes da ativação.
  - A rolagem fica registrada também no histórico de dados do personagem.
  - Habilidades sem fórmula explícita continuam funcionando normalmente sem inventar dados de dano.
- `src/components/DiceStage3D.jsx`
  - Novo parâmetro `showDock`; Habilidades/Poderes usam somente a cena cinematográfica, sem criar um novo dock lateral fora da aba Dados.
- `src/data/diceRuntime.js` (novo)
  - Utilitário compartilhado para fórmulas de dados, histórico e entradas de rolagem usados pelo novo motor de dano.

### Motor temporal — transições
- `src/components/PeriodTransitionOverlay.jsx` (novo)
  - Overlay em Portal para `Novo turno`, `Novo combate`, `Novo dia`, `Nova semana` e `Novo mês`.
  - Exibe ícone, período anterior → novo período e mensagem curta sobre as recargas liberadas.
  - `Novo combate` informa que o turno também foi reiniciado.
  - Fade de entrada/saída e respeito a `prefers-reduced-motion`.
- `src/styles/global.css`
  - Estilos da transição temporal e novos componentes de dano.

### Habilidades e Poderes manuais
- `src/components/TabMagias.jsx`
  - O formulário agora inclui:
    - `Dados de dano` (ex.: `2d8+3`).
    - `Tipo de dano`.
    - `Escalonamento` por modificador de atributo.
  - Ao usar o poder, a ficha resolve o modificador atual, soma à fórmula e abre a rolagem 3D automaticamente.
  - O resultado entra no mesmo histórico de dados.
  - Poderes antigos continuam compatíveis mesmo sem os novos campos.
  - Adicionado botão `Editar` para corrigir fórmula, tipo, escalonamento, descrição ou usos depois do cadastro.
  - Passivas continuam sem consumir uso/Cansaço e não disparam rolagem de dano pelo botão.

### Comportamento proposital
- A ficha só automatiza dano oficial quando consegue identificar uma fórmula de dados de forma segura no conteúdo cadastrado/evolução atual.
- Habilidades cujo dano depende de arma equipada, porcentagem, quantidade variável de alvos, tamanho, litros, distância, decisão do mestre ou outra condição não resolvida continuam sem rolagem automática até o subsistema correspondente existir.
- Inspiração continua sendo um bônus de rolagem/teste e não é consumida automaticamente em rolagens de dano.

### Checklist de teste
1. Guerreiro: usar `Turbilhão de Ataques` em nível alto e confirmar cena 3D com a fórmula do tier atual, não a fórmula inicial.
2. Hemomante: usar `Transfusão Mágica` sem aprimoramento e confirmar somente o dano base; repetir com aprimoramento em ML e confirmar inclusão do dado bônus.
3. Hemomante: testar `Manipulação Rubra` e confirmar seletor entre os modos de dano antes de usar.
4. Usar uma habilidade sem dano explícito e confirmar que a ativação/custo ocorre normalmente sem rolagem inventada.
5. Clicar em `Novo turno`, `Novo combate`, `Novo dia`, `Nova semana` e `Novo mês` e conferir o overlay com contador anterior → novo.
6. Em Poderes, criar `Golpe Teste` com `2d8`, tipo `Físico` e escalonamento `Mod. Força`; usar e conferir a cena 3D com `2d8 + modificador atual de Força`.
7. Editar o Poder, trocar para `3d6`, `Mágico`, `Mod. Magia` e repetir o teste.
8. Criar um Poder sem fórmula de dano e confirmar que continua utilizável normalmente.
9. Abrir a aba Dados depois das rolagens e confirmar que danos oficiais/manuais foram incluídos no histórico.

### Validação executada neste lote
- Parser TypeScript aplicado a todos os `src/**/*.js` e `src/**/*.jsx`: 20 arquivos, 0 erros de sintaxe.
- `node --check` em `diceRuntime.js`, `damageRuntime.js`, `abilityRuntime.js` e `useCharacter.js`: OK.
- Smoke tests do parser de dano em fórmulas com evolução, múltiplos modos e aprimoramento por ML.
- Auditoria do conjunto atual: 169 das 376 habilidades oficiais ativas/reação/bônus possuem fórmula direta de dano em dados detectável com segurança no conteúdo estruturado atual. As demais permanecem manuais para evitar inventar regra.
- O build Vite completo continua indisponível neste ambiente porque as dependências npm não estão em cache e a instalação externa excede o limite do ambiente; o gate final permanece `npm install` + `npm run dev` no ambiente local já usado nos lotes anteriores.

## Lote 4.9 — Fechamento do Lote 4: animação de uso e estado CANSADO global

### Objetivo
Fechar o motor de habilidades com feedback visual inequívoco durante a sessão: cada ativação passa a mostrar a redução das cargas antes da eventual rolagem de dano 3D, o último uso dispara um alerta vermelho de esgotamento e o estado CANSADO permanece visível em qualquer aba da ficha.

### Uso cinematográfico de habilidades
- `src/components/AbilityUseOverlay.jsx` (novo)
  - Overlay renderizado em Portal, independente da aba/transições da página.
  - Toda habilidade oficial ativa registrada exibe primeiro uma cena `HABILIDADE UTILIZADA`.
  - Para habilidades com cargas finitas, mostra explicitamente `usos antes → usos depois` (ex.: `2/2 → 1/2`).
  - Até 12 cargas são representadas também por marcadores visuais; a carga gasta na ativação apaga durante a animação.
  - Cooldowns exibem `RECARGA INICIADA` e o intervalo correspondente.
  - Habilidades sem pool finito exibem `USO REGISTRADO`.
  - Uso extra liberado por ML do Hemomante recebe mensagem própria.
  - Limites `em vida` aparecem paralelamente e também diminuem visualmente.
  - Ao consumir a última carga disponível, a cena assume tratamento vermelho e exibe `USOS ESGOTADOS` em destaque.
  - Quando o limite vitalício chega a zero, exibe `LIMITE EM VIDA ESGOTADO`.
  - Quando houver reset conhecido, a cena informa onde a carga retorna (`descanso curto`, `descanso longo`, turno, combate, dia etc.).
  - A cena mantém `+1 Cansaço registrado` como consequência mecânica da ativação.
  - Bloqueia scroll durante a cena e respeita `prefers-reduced-motion`.
- `src/components/TabHabilidades.jsx`
  - A sequência de ativação foi reorganizada para evitar sobreposição de cinematics:
    1. valida/cobra a habilidade;
    2. exibe a animação de consumo de uso;
    3. somente depois, quando existir dano automático, abre a rolagem 3D.
  - O cálculo de dano e o histórico continuam sendo resolvidos na mesma ativação; apenas a apresentação visual passa a ser sequencial.
  - O contador mostrado na animação é calculado a partir da disponibilidade imediatamente anterior ao uso, preservando a carga real que acabou de ser consumida.

### Estado CANSADO global
- `src/App.jsx`
  - Quando `derived.isCansado` estiver ativo, a ficha mostra permanentemente, abaixo da barra superior:
    - `CANSADO`
    - `BÔNUS DE ACERTO DA SHIKATA DESATIVADO`
    - contador atual de Cansaço (`atual/limite`).
  - A barra é global e permanece visível em Identidade, Atributos, Dados, Habilidades, Inventário, Poderes e Notas.
  - A própria barra de navegação também recebe uma pill `CANSADO` ao lado do HP para redundância visual.
- `src/styles/global.css`
  - Alerta CANSADO vermelho, sticky abaixo da navegação, em caixa alta e com pulso discreto.
  - Cena cinematográfica de uso de habilidade, contador de cargas, pips, cooldown e estados de esgotamento em vermelho.

### Fluxo final de uma habilidade com dano
Exemplo de `2x por descanso curto`:
1. Estado inicial: `2/2`.
2. Jogador clica `Usar habilidade`.
3. Custos/limites/alvo/Cansaço são aplicados pelo motor.
4. Cena cinematográfica mostra `2/2 → 1/2`.
5. Se houver fórmula automática de dano, após o fade dessa cena entra o dado 3D.
6. No segundo uso, a cena mostra `1/2 → 0/2` e muda para vermelho com `USOS ESGOTADOS`.
7. A terceira tentativa permanece bloqueada até o reset correspondente.

### Checklist de teste
1. Guerreiro com habilidade `2x por descanso curto`: usar uma vez e confirmar `2/2 → 1/2`; usar novamente e confirmar `1/2 → 0/2` + tela vermelha `USOS ESGOTADOS`.
2. Após esgotar, tentar terceiro uso e confirmar que continua bloqueado pelo motor já existente.
3. Fazer descanso curto e confirmar que as cargas voltam; repetir para habilidades de descanso longo e validar que o reset curto não interfere.
4. Usar habilidade com dano automático e confirmar ordem: animação de carga primeiro, dados 3D depois.
5. Usar habilidade com cooldown e confirmar `RECARGA INICIADA` na cena.
6. Testar habilidade com limite semanal + limite em vida e observar ambos os contadores, incluindo alerta vitalício quando chegar a zero.
7. Acumular Cansaço até o limite e confirmar a barra global `CANSADO — BÔNUS DE ACERTO DA SHIKATA DESATIVADO` em todas as abas.
8. Fazer descanso curto e confirmar que o alerta CANSADO desaparece junto da recuperação de Cansaço.

### Validação executada
- Transpilação sintática pelo parser TypeScript em todos os `src/**/*.js` e `src/**/*.jsx`: 21 arquivos, 0 erros de sintaxe.
- `node --check` em `abilityRuntime.js`, `damageRuntime.js`, `diceRuntime.js` e `useCharacter.js`: OK.
- `git diff --check` executado quando aplicável sem erros de whitespace.
- Nenhuma dependência npm nova foi adicionada.

## Lote 5 — Turnos e Ações

### Objetivo
Transformar a economia de turno do TALOS v6 em regra operacional da ficha. O sistema passa a controlar as 2 ações completas + 1 ação bônus de cada turno, integrar esse custo a ataques, habilidades oficiais e Poderes manuais, registrar reações sem inventar um limite global não definido pela fonte e permitir efeitos temporários/ajustes de ações quando uma habilidade altera a economia do turno.

### Regra-base implementada
- Cada turno inicia com `2 ações completas + 1 ação bônus`.
- Ações completas cobrem ataques, habilidades comuns e ações como correr/fugir.
- Ações bônus cobrem andar/falar e habilidades marcadas explicitamente como `AÇÃO BÔNUS`.
- Reações são identificadas e registradas, mas não possuem um limite global artificial de `1 por turno`, pois a regra-base do TALOS v6 não estabelece esse número.
- `Novo turno` restaura a economia-base, limpa ajustes manuais daquele turno e avança a duração de efeitos temporários.
- `Novo combate` também limpa efeitos/ajustes temporários de ações do combate anterior.

### HUD global de ações
- `src/components/TurnActionHud.jsx` (novo)
  - Exibido globalmente abaixo dos avisos da ficha.
  - Mostra ações completas restantes/total e ações bônus restantes/total por marcadores visuais.
  - Mostra reações usadas no turno como registro contextual, sem impor limite global.
  - Exibe ações extras temporárias e quantos turnos ainda permanecem.
  - Atalhos `Correr/Fugir` e `Andar/Falar` consomem respectivamente 1 ação completa e 1 ação bônus.
  - Painel `Ajustar turno` permite `+1/-1` ação completa ou bônus apenas no turno atual, cobrindo efeitos condicionais, perda/roubo de ação em alvos ou decisões do mestre sem inventar automatismos.
- `src/styles/global.css`
  - HUD, pips de ações, estados esgotados, efeitos temporários e layout responsivo.

### Motor de ações
- `src/data/turnRuntime.js` (novo)
  - Centraliza a economia de turno e a classificação de custo das habilidades.
  - Detecta `1 ação completa`, `2 ações completas`, `ação bônus`, `reação` e `sem ação` a partir do conteúdo estruturado vigente no nível atual.
  - Evita usar cláusulas de níveis futuros na classificação atual.
  - Passivas são `sem ação`.
  - Ataques `[CHI]` do Monge, a partir do nível em que a regra existe, são tratados como `sem ação` conforme o TALOS v6.
  - Bloqueia gastos quando não houver ações completas/bônus suficientes.
  - Registra reações sem consumir um contador global inventado.
  - Mantém efeitos temporários de ações e decrementa sua duração em `Novo turno`.
  - Efeitos automáticos de ganho de ação são limitados a casos explicitamente mapeados e inequívocos na fonte, evitando inferências por texto genérico.
- `src/data/abilityRuntime.js`
  - Cada habilidade oficial passa a expor também seu `actionSpec` ao motor de uso.

### Integração com personagem e saves
- `src/hooks/useCharacter.js`
  - Regras internas atualizadas para versão 7.
  - Novo estado persistido `turnEconomy`, com ações gastas, ajustes manuais, efeitos temporários e registro de reações.
  - Saves antigos migram com o turno limpo, sem alterar HP, inventário, habilidades ou demais dados.
  - `useOfficialAbility` valida ação disponível antes de cobrar uso, HP, ML, Performance, Cansaço ou demais recursos.
  - Se faltar ação, a ativação é interrompida sem consumir a habilidade.
  - Novo método para gastar ações em ataques/ações rápidas/Poderes manuais.
  - Novo método para ajustes manuais `+/-` do turno.

### Habilidades oficiais
- `src/components/TabHabilidades.jsx`
  - Cada habilidade ativa mostra seu custo de ação.
  - Quando uma habilidade admite mais de uma forma válida (por exemplo ação bônus ou reação), o jogador escolhe o modo antes de ativar.
  - O botão `Usar habilidade` fica bloqueado quando não há ações completas/bônus suficientes.
  - A cena cinematográfica de uso também mostra a economia do turno (`2 → 1`, `1 → 0`, `REAÇÃO REGISTRADA` ou `SEM CONSUMO DE AÇÃO`).
- `src/components/AbilityUseOverlay.jsx`
  - Nova seção `ECONOMIA DO TURNO` dentro da animação de uso.
  - Efeitos que concedem ações exibem o ganho depois do consumo da habilidade.

### Ataques na aba Dados
- `src/components/TabDados.jsx`
  - `Acerto da Shikata` passa a consumir 1 ação completa antes de rolar o d20.
  - Se não houver ação completa, o ataque é bloqueado antes da rolagem.
  - Monge pode selecionar `Ação completa` ou `Ação bônus (ação marcial)` no ataque genérico, pois o botão não consegue inferir sozinho se aquele ataque específico é soco/chute/habilidade marcial ou outra arma.
  - Rolagens livres de dados, criação de atributo e vida por evolução continuam sem consumir ações de combate.

### Poderes manuais
- `src/components/TabMagias.jsx`
  - Novo campo `Custo no turno` no cadastro/edição de Poderes:
    - 1 ação completa;
    - 2 ações completas;
    - 1 ação bônus;
    - Reação;
    - Sem ação.
  - Poderes antigos sem esse campo migram conceitualmente para 1 ação completa quando ativos; passivas permanecem sem ação.
  - O custo é validado e consumido antes de uso, Cansaço e rolagem 3D de dano.

### Regras especiais automatizadas com segurança
- Ladino nível 5+: `MAESTRIA TÁTICA` concede permanentemente +1 ação bônus, resultando em 2 ações bônus por turno.
- Guerreiro `ADRENALINA`: ao ativar, recebe +1 ação completa no turno atual.
- Necromante `NECROMANCIA RÁPIDA`: ao ativar, recebe +2 ações completas no turno atual.
- Monge `O OCEANO`: usa ação bônus e concede +1 ação completa por 2 turnos.
- Hemomante `RENASCIMENTO ÉPICO`: ganho de ação completo é aplicado quando a habilidade é ativada pelo jogador.
- Efeitos condicionais que alteram ações de outros alvos ou dependem de escolhas/reação do mestre permanecem ajustáveis pelo HUD em vez de receber automação especulativa.

### Comportamento proposital / limites deste lote
- Reação não possui contador global de 1 por turno porque essa regra não está definida na seção-base de turnos do TALOS v6.
- Habilidades com uso alternativo condicionado a um evento específico podem requerer que o jogador selecione o modo válido ou use o ajuste manual quando a ficha não tem contexto suficiente do alvo/ataque inimigo.
- Roubo/perda de ação aplicado a outros personagens não pode modificar automaticamente a ficha de outro jogador; o HUD fornece ajuste manual para representar o efeito localmente.
- O controle de iniciativa/ordem completa de múltiplas criaturas não é criado neste lote; o objetivo é a economia do turno do personagem da ficha.

### Checklist de teste
1. Personagem comum: confirmar `2 ações completas + 1 ação bônus` no início do turno.
2. Usar `Acerto da Shikata` duas vezes e confirmar `2 → 1 → 0`; terceira tentativa deve ser bloqueada.
3. Clicar `Novo turno` e confirmar restauração para `2/2` completas e `1/1` bônus.
4. Testar `Correr/Fugir` e `Andar/Falar` pelo HUD e conferir o consumo correspondente.
5. Ladino nível 5+: confirmar `2 ações bônus` por turno pela Maestria Tática.
6. Bardo com `MOMENTUM PERPETUUM`: confirmar custo de 2 ações completas e bloqueio se só existir 1 disponível.
7. Habilidade marcada `AÇÃO BÔNUS`: confirmar consumo apenas da ação bônus.
8. Habilidade marcada `REAÇÃO`: confirmar registro da reação sem reduzir ações completas/bônus.
9. Habilidade `SEM AÇÃO`: confirmar ativação sem alterar os contadores.
10. Necromante com `NECROMANCIA RÁPIDA`: consumir sua ação de ativação e confirmar +2 ações completas concedidas no mesmo turno.
11. Guerreiro com `ADRENALINA`: confirmar +1 ação completa temporária após a ativação.
12. Monge com `O OCEANO`: confirmar custo de 1 ação bônus e +1 ação completa durante 2 turnos, decaindo ao avançar turnos.
13. Em Poderes, criar um Poder com custo `2 ações completas`, usar e confirmar bloqueio/consumo; editar para `Reação` e testar novamente.
14. Usar `Ajustar turno` para -1/+1 ação e confirmar que o ajuste some no próximo turno.
15. Confirmar que a animação de uso de habilidade mostra também `ECONOMIA DO TURNO` antes da eventual rolagem de dano 3D.

### Validação executada
- `node --check` em `turnRuntime.js`, `abilityRuntime.js` e `useCharacter.js`: OK.
- Parser TypeScript aplicado novamente a todos os `src/**/*.js` e `src/**/*.jsx` após as alterações: nenhum diagnóstico de sintaxe JSX/JS.
- Smoke tests confirmaram:
  - Momentum Perpetuum = 2 ações completas;
  - Sinfonia Mortal = sem ação;
  - habilidades bônus e reação classificadas corretamente;
  - Ladino nível 5 = 2 completas + 2 bônus;
  - gasto de 2 ações bloqueia gasto adicional no mesmo turno;
  - Necromancia Rápida adiciona +2 ações completas;
  - Novo turno zera ações gastas/ajustes e reduz duração de efeitos temporários.
- Auditoria da estrutura atual de habilidades: 376 habilidades ativas/reação/bônus analisadas, sem erro do classificador; a maioria permanece ação completa e as exceções de bônus/reação/sem ação são tratadas pelo novo motor.
- Nenhuma dependência npm nova foi adicionada.
- O build Vite completo continua indisponível neste ambiente porque as dependências npm não estão integralmente disponíveis e a instalação externa excede o limite; o gate visual final permanece `npm install` + `npm run dev` no ambiente local já validado nos lotes anteriores.
