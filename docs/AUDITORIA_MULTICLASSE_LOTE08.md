# Auditoria — Lote 08: Multiclasse, Subclasses e bloqueios atômicos

## Base TALOS v6

O Lote 08 foi implementado a partir do bloco **Evolução e Multiclasse** do documento oficial:

- cada Shikata recebe 2 pontos de atributo distributivos por nível;
- ao evoluir, rola-se o dado de vida pós-nível 1 da Shikata que evoluiu;
- a partir da segunda Shikata, o personagem fica proficiente no novo atributo, mas os modificadores não são somados; o jogador escolhe qual usar nos dados de acerto;
- apenas um nível de Shikata é evoluído por vez;
- a aquisição de novas Shikatas depende dos requisitos narrativos listados no documento.

## Modelo de dados do Lote 08

A ficha passa a persistir `shikataProgress.entries`, uma entrada por Shikata aprendida:

```text
shikataId -> nível próprio + subclasse própria + ordem/data de aprendizado
```

Campos legados `shikata` e `subclasse` continuam existindo como espelho da Shikata ativa para compatibilidade com os módulos anteriores. `nivel` passa a ser um **nível acumulado de referência**, calculado pela soma dos níveis das Shikatas aprendidas; as regras de habilidade usam sempre o nível próprio da Shikata ativa.

### Convenção explícita da ficha

O TALOS v6 não descreve um ritual técnico de persistência para o primeiro nível de uma nova Shikata. Nesta implementação, ao confirmar que o requisito narrativo foi cumprido, a nova Shikata é registrada no **Nv.1**. Não é feita rolagem de vida nesse ato porque o documento define o dado de vida como **pós-nível 1**. Evoluções seguintes usam normalmente +2 pontos e a rolagem de HP da Shikata evoluída.

## Requisitos de Multiclasse

Foram cadastrados os 21 requisitos exatamente conforme a seção de Multiclasse. Entradas que o documento marca como `… (a definir)` permanecem exibidas como **requisito ainda a definir no TALOS v6**; a ficha não inventa condição.

A interface exige confirmação manual de que o requisito foi cumprido/validado pelo Mestre. Não há tentativa de inferir automaticamente feitos narrativos como “arrombar 15 fechaduras” ou “matar um rei”.

## Evolução independente

- cada Shikata mantém nível próprio;
- o botão `Evoluir <Shikata>` aumenta somente a Shikata ativa;
- concede +2 pontos distributivos;
- gera apenas a rolagem de HP pendente daquela Shikata;
- as rolagens de HP válidas de todas as Shikatas aprendidas somam no HP máximo;
- trocar a Shikata ativa não remove HP adquirido por outra classe;
- ajuste manual de nível continua disponível, mas não concede pontos nem cria rolagem de HP.

## Acerto em Multiclasse

A aba **D20 Dados** passa a oferecer os modificadores de acerto de todas as Shikatas aprendidas como alternativas. Eles não são somados entre si.

Exemplo:

```text
Guerreiro — Força
Mago — Inteligência
```

O estado CANSADO continua removendo o modificador escolhido do acerto.

## Passivas globais já conectadas

- `Maestria Tática` do Ladino Nv.5+ concede a ação bônus adicional mesmo quando outra Shikata está ativa.
- Reserva de Sangue do Hemomante usa o nível próprio do Hemomante e continua somando Defesa enquanto a classe estiver aprendida.
- limites de Sinais do Bruxo usam o nível próprio do Bruxo.
- recursos e habilidades exibidos na aba Habilidades usam o nível/subclasse da Shikata ativa.

## Tela de Evento de Subclasse

Ao atravessar por evolução normal o nível de desbloqueio da subclasse:

1. a tela escurece imediatamente, sem frame claro;
2. aparece `EVENTO DE EVOLUÇÃO`;
3. as duas subclasses são exibidas lado a lado;
4. cada opção mostra prévia das primeiras habilidades exclusivas encontradas na fonte canônica;
5. o jogador confirma uma escolha ou seleciona `Escolher depois`;
6. depois, a subclasse continua disponível no seletor normal em Identidade.

O nível de evento é lido da fonte canônica. No conjunto atual, 20 Shikatas especializam no Nv.5 e o Ceifeiro no Nv.8.

## Correção — Sinais bloqueados não geram Cansaço

O uso oficial foi tornado atômico por meio de uma referência sincronizada do personagem. A validação ocorre antes de qualquer mutação do estado.

Se um Sinal for bloqueado pelo limite compartilhado do turno:

- não aumenta Cansaço;
- não consome uso individual;
- não consome ação;
- não consome HP, ML ou Performance;
- não registra alvo;
- não dispara animação de uso/dano.

Isso também protege contra cliques rápidos consecutivos antes do próximo render do React.

## Validações executadas

- 21/21 Shikatas possuem requisito de Multiclasse cadastrado;
- todas as 21 Shikatas possuem exatamente 2 subclasses na fonte canônica atual;
- níveis de subclasse: 20 no Nv.5, Ceifeiro no Nv.8;
- módulos JS: `node --check` sem erros;
- todos os JSX de `src`: parser TypeScript em modo `jsx preserve`, sem diagnósticos de sintaxe;
- 63 imports relativos nomeados/default verificados sem export ausente;
- smoke test dos módulos puros: nível próprio do Bruxo, limite de Sinais, Ladino Nv.5 multiclasse e requisitos carregados corretamente;
- inspeção automatizada confirmou que o guard do limite compartilhado dos Sinais ocorre antes do cálculo de Cansaço e antes do commit do personagem.

`npm install` foi tentado no ambiente de geração, mas excedeu o limite de execução antes de disponibilizar o binário do Vite. Nenhuma dependência nova foi adicionada.
