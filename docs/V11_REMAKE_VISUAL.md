# V11 — Remake Visual TALOS

## Objetivo
Transformar a aplicação consolidada dos Lotes 1–10 em uma ficha digital com linguagem de papel antigo/grimório, preservando integralmente o motor de regras.

## V11.1 — Fundação
- Pergaminho central sobre fundo escuro.
- Paleta sépia / tinta / dourado antigo.
- Tipografia serifada clássica sem dependência de fonte externa.
- Componentes-base reformulados: cards, campos, botões, badges, modais, atributos e tabelas.

## Próximos passos
- V11.2: sidebar esquerda e estrutura de livro/páginas.
- V11.3: Dados dedicados + combate contextual + legibilidade do grimório.
- V11.4: página Personagem inspirada em ficha clássica — CONCLUÍDO.
- V11.5: Atributos & Perícias — CONCLUÍDO.
- V11.6: Habilidades & Poderes — refinamento temático — CONCLUÍDO.
- V11.7: Inventário — CONCLUÍDO.
- V11.8: animação de troca de página — CONCLUÍDO.
- V11.8.1: hotfix de fluidez / correção da virada — CONCLUÍDO.
- V11.9: polimento e responsividade final — CONCLUÍDO.

## Regra de implementação
O V11 deve priorizar mudança de apresentação, evitando alterar runtimes funcionais já homologados.

## V11.2 — Estrutura de Livro / Sidebar — CONCLUÍDO

- Navegação principal movida para a lateral esquerda e mantida fixa durante o scroll.
- Ícones SVG próprios substituem emojis de interface.
- Nomenclatura das páginas foi simplificada para linguagem de ficha.
- Medalhões de atributos passam a ser círculos reais.
- Próximo passo executado como V11.3: separar Dados/Combate e melhorar a leitura do grimório antes da reconstrução da Página Personagem.


## V11.3 — Dados, combate contextual e grimório — CONCLUÍDO

- A página antes chamada “Combate” passa a se chamar **Dados** e fica dedicada às rolagens.
- O botão de iniciar combate deixa Habilidades e passa a ser uma ação global na sidebar.
- Com combate ativo, o HUD fixo vira o painel operacional com Novo turno, ações e Encerrar combate.
- Dia, semana e mês permanecem globais na sidebar e podem ser avançados fora de combate.
- Habilidades deixa de exibir o antigo Motor de Habilidades.
- Técnicas desbloqueadas ganham moldura individual, hierarquia tipográfica, badges temáticos e maior contraste.
- Tabelas de evolução distinguem visualmente nível vigente, níveis já alcançados e níveis futuros.
- Próximo passo: V11.4 — Página Personagem em composição clássica de ficha física.


## V11.4 — Página Personagem / folha de rosto — CONCLUÍDO

- Identidade reconstruída como uma folha única, com nome e jogador em linhas de ficha e selo circular de nível acumulado.
- Novo retrato central: silhueta padrão impressa no pergaminho ou imagem escolhida pelo jogador; a imagem é reduzida no navegador antes de ser persistida no save.
- Vitais distribuídos ao redor do retrato em seis selos circulares: HP, CA, Defesa, Deslocamento, Cansaço e Inspiração.
- Origem, Shikata ativa e Subclasse compõem a base visual da folha principal.
- Profissão, Tendência, Divindade e XP passam a integrar a faixa de identificação em vez de cards independentes.
- Profissão, Herança/Origem, mecânicas raciais, Multiclasse e características pessoais foram reorganizadas como registros/ledgers impressos.
- O fluxo funcional de origem, evolução, subclasse e multiclasse permanece o mesmo; nenhuma regra foi alterada.
- Próximo passo executado como V11.5 — Atributos & Perícias em composição de ficha impressa.


## V11.5 — Atributos & Perícias + despoluição visual — CONCLUÍDO

- Pontos distributivos deixam de ocupar um card próprio e passam a aparecer como contador compacto no cabeçalho dos Atributos.
- Medalhões preservam o formato circular, agora com bônus de origem/item/classe/estado/evolução usando cor semântica discreta.
- Perícias foram reorganizadas como ledger em duas colunas balanceadas; cada perícia possui informação contextual sem sobrepor a coluna vizinha.
- Criado componente reutilizável `InfoTip` para manter regras completas acessíveis sem poluir a folha.
- Vitais escondem fórmulas e explicações extensas atrás de informação contextual; HP, CA, deslocamento, cansaço e inspiração continuam imediatamente jogáveis.
- Estados oficiais mantêm controles e efeitos ativos visíveis, enquanto descrições completas passam ao ícone de informação.
- Na página Personagem, os controles de retrato foram separados da imagem, a antiga seção duplicada “Origem — Mecânicas v6” foi incorporada à Herança como bloco recolhível e Multiclasse foi compactada.
- Em Dados, Acerto da Shikata prioriza modificador, ação e bônus; a regra completa fica no ícone de informação.
- Nenhum runtime TALOS foi alterado; o lote permanece restrito à apresentação/UX.
- Próximo passo executado como V11.6 — Habilidades & Poderes / refinamento temático.


## V11.6 — Habilidades & Poderes / refinamento temático — CONCLUÍDO

- Poderes manuais foram redesenhados no mesmo vocabulário visual das técnicas oficiais: moldura de grimório, faixa por tipo, metadados compactos e zona própria de controle de uso.
- Editor de Novo Poder passou a funcionar como ficha de registro, com ajuda contextual para usos, economia de ações e dano automatizado.
- Descrições longas de poderes e habilidades oficiais são resumidas visualmente, mantendo o texto integral disponível em `InfoTip`.
- Cabeçalho da Shikata foi compactado para quatro fatos de leitura rápida; descrição, fonte canônica e itens iniciais ficam sob consulta.
- Recursos especiais de Bardo, Hemomante e Bruxo foram reorganizados como contadores de grimório, preservando integralmente a lógica existente.
- Progressão mantém a linha de níveis e desloca a regra textual extensa para informação contextual.
- Descanso virou um ledger operacional com Curto/Longo e regra completa em consulta; Notas Arcanas ganhou aparência de página pautada.
- Emojis remanescentes da página Poderes foram removidos em favor dos ícones vetoriais `TalosIcon`.
- Nenhum runtime TALOS foi alterado; o lote permanece estritamente em apresentação/UX.
- Próximo passo: V11.7 — Inventário / Equipamentos.


## V11.7 — Inventário / Equipamentos — CONCLUÍDO

- Equipamentos passam a usar composição própria de arsenal, com resumo de efeitos ativos e 12 slots em grade de ficha.
- Mochila virou ledger compacto: quantidade, raridade, categoria, bônus, estado equipado e ações permanecem imediatamente acessíveis.
- Descrições e detalhes longos dos itens usam `InfoTip`, mantendo a folha limpa sem perder conteúdo.
- Editor de item manual recebeu a mesma linguagem da ficha e separa identificação, bônus mecânicos e observações narrativas.
- Catálogo mantém os 457 itens, mas deixa de montar todos de uma vez: usa janela progressiva de 60 entradas e busca adiada (`useDeferredValue`) para preservar responsividade.
- A página Habilidades recebeu otimização complementar sem alterar regras: listas por nível são memoizadas e Habilidades Futuras permanecem recolhidas até a consulta do jogador, evitando montar dezenas de técnicas bloqueadas no uso normal.
- Nenhum runtime TALOS, efeito de item, slot, cálculo, persistência ou regra de habilidade foi alterado.
- Próximo passo executado como V11.8 — animação de troca de página.


## V11.8 — Virada de Página / navegação de livro — CONCLUÍDO

- A navegação da sidebar passa a conhecer a ordem física das sete páginas e define a direção da virada: avançar ou voltar.
- A troca de página usa uma folha de pergaminho animada por `transform`, acompanhada de sombra direcional, sem duplicar o conteúdo funcional da página.
- O efeito foi desenhado para ser leve: somente a lâmina e a sombra são animadas, em vez de transformar toda a árvore de Habilidades/Inventário.
- A antiga animação em cascata de `tab-transition` + cards foi desativada; isso evita dezenas de animações simultâneas em Shikatas com muitas técnicas e melhora a sensação de resposta da guia Habilidades.
- Ao navegar para outra página, a ficha retorna ao topo antes da nova folha ser apresentada, evitando abrir uma página longa no mesmo deslocamento vertical da anterior.
- Adicionado folio discreto no rodapé da folha (`04 / 07 · Habilidades`, por exemplo), reforçando a leitura de livro sem ocupar espaço operacional.
- A virada respeita `prefers-reduced-motion`; usuários que desativam animações no sistema recebem troca imediata.
- Mobile usa duração menor e lâmina mais larga para que a transição continue legível em telas estreitas.
- Nenhuma regra TALOS, save, cálculo, runtime, habilidade, item ou estado foi alterado.
- Próximo passo executado como V11.9 — polimento, responsividade e fechamento do remake.

## V11.8.1 — Hotfix de Fluidez / correção da virada — CONCLUÍDO

- A virada deixa de criar uma camada do tamanho total da folha e passa a existir apenas no viewport visível; em páginas longas isso reduz drasticamente a área de rasterização.
- Removidos `clip-path` e `filter: blur()` da animação, mantendo apenas `transform` e `opacity` em duas faixas pequenas.
- A lâmina de pergaminho foi estreitada e passou a sugerir a dobra da página a partir da borda, em vez de atravessar a tela como uma cortina.
- Cada navegação recebe um identificador próprio e desmonta o efeito ao terminar, garantindo que duas trocas consecutivas na mesma direção reiniciem corretamente.
- O scroll retorna ao topo antes da troca de conteúdo, evitando um primeiro paint da nova página na posição vertical da página anterior.
- Habilidades recebeu um perfil de pintura mais leve: fundo da folha e sombras simplificados apenas nessa página, cards com sombras menores e blocos de evolução/runtime fora do viewport usando `content-visibility: auto`.
- A aparência, regras, contadores, progressões, custos e runtimes permanecem inalterados.
- Próximo passo executado como V11.9 — polimento, responsividade e fechamento do remake.

## V11.9 — Polimento e responsividade final — CONCLUÍDO

- A lâmina de pergaminho da troca de páginas foi removida integralmente por preferência visual e por previsibilidade de desempenho.
- Navegação da sidebar passa a trocar de folha imediatamente, preservando apenas o retorno ao topo e o folio discreto da página atual.
- Removidos efeitos de composição desnecessários no fechamento do remake: `backdrop-filter` de modais, textura procedural da sidebar e `drop-shadow` do bloco sticky global.
- Habilidades mantém `content-visibility` nos blocos de evolução/runtime e recebe fundo/sombras mais baratos de pintar, sem perda de nenhuma técnica ou progressão.
- Hover de cards e controles deixa de deslocar elementos, reduzindo repaints e mantendo a ficha visualmente estável.
- Foco por teclado foi padronizado para botões, campos, selects, textareas e summaries.
- Adicionadas proteções globais de overflow para nomes, cabeçalhos e controles extensos.
- Folio foi refinado e simplificado em telas menores.
- Mobile recebeu ajustes finais de largura da lombada, paddings, alvos de toque, tooltips, modais e grids de resumo.
- Nenhuma regra TALOS, save, cálculo, habilidade, item, estado, runtime ou conteúdo canônico foi alterado.
- O V11 fica encerrado com foco exclusivo em apresentação/UX sobre a base funcional já homologada.


## V11.9.1 — Ajustes finais de viewport e carteira — CONCLUÍDO

- A folha principal deixa de usar margens verticais de “mesa”, eliminando as faixas marrons sem função acima e abaixo do papel.
- O documento passa a recortar overflow horizontal global; tabelas e blocos que realmente precisam rolar continuam com scroller próprio, evitando a barra horizontal no rodapé da aplicação.
- A área de Moedas recebe um comando único **Converter saldo**, que promove automaticamente o máximo possível para denominações superiores.
- Conversão implementada conforme a regra solicitada: `100 PC = 1 PP`, `100 PP = 1 PO` e `100 PO = 1 PD`; sobras inferiores a 100 permanecem na denominação atual.
- A conversão é encadeada no mesmo clique: cobre convertido pode completar prata, prata pode completar ouro e ouro pode completar diamante.
- O layout da carteira ganhou grid responsivo, resumo das taxas e retorno visual do que foi convertido.
- Nenhum cálculo de personagem, Shikata, item, estado, habilidade ou runtime TALOS foi alterado.

## V11.9.2 — Carteira bidirecional — CONCLUÍDO

- Removido o comando global **Converter saldo**, que promovia automaticamente todas as denominações e tirava controle do jogador.
- Cada moeda passa a ter controles pequenos de seta, coerentes com a direção visual da carteira.
- Seta para a direita converte exatamente uma etapa: `100 PC -> 1 PP`, `100 PP -> 1 PO` ou `100 PO -> 1 PD`.
- Seta para a esquerda desfaz exatamente uma etapa: `1 PP -> 100 PC`, `1 PO -> 100 PP` ou `1 PD -> 100 PO`.
- Controles ficam desabilitados quando o saldo da moeda de origem não permite aquela conversão.
- Conversões são unitárias por clique e nunca encadeiam automaticamente, preservando a decisão do jogador.
- Nenhuma regra TALOS, cálculo, item, Shikata, habilidade ou runtime foi alterado.
