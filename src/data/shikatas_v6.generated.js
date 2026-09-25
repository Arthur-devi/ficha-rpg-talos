// ARQUIVO GERADO A PARTIR DE TALOS_SISTEMA_v6_COMPLETO.docx.
// Não editar manualmente: execute scripts/extract_shikatas_v6.py para regenerar.

export const SHIKATAS_V6 = [
  {
    "id": "guerreiro",
    "name": "Guerreiro",
    "desc": "Os Guerreiros são mestres do combate físico, encontrados em exércitos e fronteiras por todo o mundo. Embora sejam comuns, poucos alcançam níveis elevados — a maioria perece em batalhas. Os raros que sobrevivem e ascendem tornam-se lendas vivas, capazes de feitos extraordinários que inspiram gerações de combatentes.",
    "modificador": "Força",
    "dadoVida": "2d8+mod cons ou 9+mod cons",
    "dificuldade": "3/10",
    "poder": "INÍCIO [Forte] | MEIO [Forte] | FIM [Forte]",
    "itensIniciais": "Espada curta (1d6) + escudo de madeira (+1 CA) OU espada grande de duas mãos (1d8). Corselete de couro (+1 CA).",
    "subclasses": [
      "Guerreiro Empalador Sanguinário",
      "Guerreiro Colossal"
    ],
    "subclasseNivel": 5
  },
  {
    "id": "ladino",
    "name": "Ladino",
    "desc": "As Sombras da Sociedade — mercenários, ladrões e espiões que prosperam na escuridão. São frequentemente alvo de hostilidade pela população devido à sua destreza como assassinos e gatunos. Usam furtividade, velocidade e precisão como suas armas mais mortais.",
    "modificador": "Destreza",
    "dadoVida": "2d6+mod cons ou 7+mod cons",
    "dificuldade": "7/10",
    "poder": "INÍCIO [Forte] | MEIO [Forte] | FIM [Forte]",
    "itensIniciais": "3 adagas (1d4) ou espada curta (1d6). Roupas de ladino. 1 frasco pequeno de veneno.",
    "subclasses": [
      "Ladino Assassino",
      "Ladino Arcanista Supremo"
    ],
    "subclasseNivel": 5
  },
  {
    "id": "inclemente",
    "name": "Inclemente",
    "desc": "O Inclemente é a personificação da fúria em combate. Lutadores brutais que não conhecem recuo, movidos pela raiva pura que os torna mais fortes, mais resistentes e mais perigosos conforme a batalha se intensifica. A força bruta é sua resposta para tudo.",
    "modificador": "Força",
    "dadoVida": "2d10+mod cons ou 11+mod cons",
    "dificuldade": "2/10",
    "poder": "INÍCIO [Forte] | MEIO [Forte] | FIM [Extremamente Forte]",
    "itensIniciais": "Mãos nuas ou 1 arma grande (1d8). Armadura de ferro (+3 CA).",
    "subclasses": [
      "Inclemente, O Coração da Fornalha",
      "Inclemente, O Lançador"
    ],
    "subclasseNivel": 5
  },
  {
    "id": "cacador",
    "name": "Caçador",
    "desc": "Os Caçadores são os Protetores da Ordem — especialistas em rastrear e capturar animais, lidar com criaturas monstruosas ou perseguir indivíduos procurados. São respeitados pelas civilizações por seu papel vital na manutenção da ordem e proteção das comunidades. Alguns caçam animais para alimento, outros enfrentam monstros, e há os Caçadores de Recompensas que perseguem fugitivos.",
    "modificador": "Força",
    "dadoVida": "2d8+mod cons ou 9+mod cons",
    "dificuldade": "7/10",
    "poder": "INÍCIO [Médio] | MEIO [Forte] | FIM [Forte]",
    "itensIniciais": "Espada curta (1d6) e arco curto (1d4) OU lâmina serrada (1d6+2). Aljava com 12 flechas (se arco). Adaga (1d4). Corselete de couro (+1 CA).",
    "subclasses": [
      "Caçador de Monstros",
      "Caçador Espectral"
    ],
    "subclasseNivel": 5
  },
  {
    "id": "vanguarda",
    "name": "Vanguarda",
    "desc": "Os Vanguardas são os Protetores Incansáveis — guerreiros dedicados a defender quem não pode se defender. São a linha de frente contra as ameaças do mundo, treinados em campos militares e muralhas de cidades. Sua devoção à defesa dos outros é absoluta.",
    "modificador": "Constituição",
    "dadoVida": "2d12+constituição ou 13+constituição",
    "dificuldade": "3/10",
    "poder": "INÍCIO [Extremamente Forte] | MEIO [Médio] | FIM [Forte]",
    "itensIniciais": "Mangual (1d6) de duas mãos OU porrete (1d4) + escudo de ferro (+2 CA). Armadura de cobre (+3 CA).",
    "subclasses": [
      "Vanguarda Exo-Combatente",
      "Vanguarda Colossal"
    ],
    "subclasseNivel": 5
  },
  {
    "id": "monge",
    "name": "Monge",
    "desc": "Os Monges da Serenidade são praticantes da paz interior e harmonia espiritual. Vivem afastados da agitação social, buscando uma existência tranquila nos retiros espirituais e mosteiros sagrados. Canalizam o Chi interior para combinar combate desarmado com energia espiritual.",
    "modificador": "Destreza",
    "dadoVida": "2d8+mod cons ou 11+mod cons",
    "dificuldade": "6/10",
    "poder": "INÍCIO [Médio] | MEIO [Extremamente Forte] | FIM [Forte]",
    "itensIniciais": "Luvas (+1 dano) ou luvas enfaixadas (+4 HP). Túnica de monge (+3 destreza) ou cota de malha (+1 CA, -1 dano recebido).",
    "subclasses": [
      "Monge das Águas",
      "Monge Naturalista"
    ],
    "subclasseNivel": 5
  },
  {
    "id": "necromante",
    "name": "Necromante",
    "desc": "Os Necromantes são os Portadores das Sombras — estudiosos da necromancia que lidam com a morte e a manipulação de almas. São considerados a escória da sociedade e uma ameaça de nível máximo, perseguidos por inquisidores, magos e feiticeiros. Vivem nas sombras, escondidos e em constante alerta.",
    "modificador": "Inteligência",
    "dadoVida": "2d6+mod cons ou 7+mod cons",
    "dificuldade": "8/10",
    "poder": "INÍCIO [Fraco] | MEIO [Forte] | FIM [Extremamente Forte]",
    "itensIniciais": "Adaga (1d4), manto negro, canalizador.",
    "subclasses": [
      "Necromante Lich",
      "Necromante das Sombras"
    ],
    "subclasseNivel": 5
  },
  {
    "id": "mago",
    "name": "Mago",
    "desc": "Os Magos são Guardiões do Arcano — estudantes das artes mágicas formados em locais de ensino onde a sabedoria arcana é preservada. Usam elementos e conhecimento para realizar milagres e aliviar sofrimento. São adorados pelo povo comum como símbolos de esperança — Até serem caçados.",
    "modificador": "Inteligência",
    "dadoVida": "2d6+mod cons ou 7+mod cons",
    "dificuldade": "9/10",
    "poder": "INÍCIO [Médio] | MEIO [Forte] | FIM [Extremamente Forte]",
    "itensIniciais": "Livro/pergaminho (canalizador). Roupão azul mágico (+2 HP). Chapéu de mago (+1 dano em habilidades). Poção pequena de magia (cura 3 usos diários).",
    "subclasses": [
      "Mago Rúnico",
      "Mago de Sangue"
    ],
    "subclasseNivel": 5
  },
  {
    "id": "feiticeiro",
    "name": "Feiticeiro",
    "desc": "Os Feiticeiros, conhecidos como Filhos do Mistério, nasceram com o dom da feitiçaria e estabeleceram pactos sombrios com entidades poderosas. São caçados e considerados impuros por muitos que temem seus poderes. Em algumas famílias, a linhagem de feiticeiros é transmitida de geração em geração, assim junto de seus pactos hereditários.",
    "modificador": "Magia",
    "dadoVida": "2d8+mod cons ou 9+mod cons",
    "dificuldade": "7/10",
    "poder": "INÍCIO [Forte] | MEIO [Forte] | FIM [Forte]",
    "itensIniciais": "Anel da potencialização (cause +2 de dano). Roupão antigo (+2 HP). Poção de vida.",
    "subclasses": [
      "Feiticeiro Astral",
      "Feiticeiro Temporal"
    ],
    "subclasseNivel": 5
  },
  {
    "id": "bardo",
    "name": "Bardo",
    "desc": "Os Bardos são contadores de histórias, músicos e artistas que preservam cultura e história. Sua jornada começa em palcos de teatros, tavernas movimentadas e bibliotecas antigas, onde aprendem a arte da narrativa e da performance musical como arma.",
    "modificador": "Carisma",
    "dadoVida": "2d6+mod cons ou 7+mod cons",
    "dificuldade": "10/10",
    "poder": "INÍCIO [Fraco] | MEIO [Médio] | FIM [Extremamente Forte]",
    "itensIniciais": "Instrumento musical, adaga (1d4).",
    "subclasses": [
      "Artista",
      "Poeta"
    ],
    "subclasseNivel": 5
  },
  {
    "id": "paladino",
    "name": "Paladino",
    "desc": "Os Paladinos são devotos dos seres celestiais conhecidos como deuses. Sua fé é testada por suas divindades, e aqueles que triunfam recebem poderes divinos como recompensa. São guerreiros sagrados que combinam combate com bênçãos da divindade.",
    "modificador": "Carisma, Magia ou Força",
    "dadoVida": "2d10+mod cons ou 11+mod cons",
    "dificuldade": "9/10",
    "poder": "INÍCIO [Médio] | MEIO [Forte] | FIM [Extremamente Forte]",
    "itensIniciais": "Espada longa (1d8) de 2 mãos OU espada curta (1d6) + escudo de madeira (+1 CA). Armadura de ferro (+2 CA) ou cota de malha (+1 CA, -1 dano). Terço (+1 carisma).",
    "subclasses": [
      "Paladino Justiceiro",
      "Paladino Inquisidor da Morte"
    ],
    "subclasseNivel": 5
  },
  {
    "id": "espadachim",
    "name": "Espadachim",
    "desc": "Os Espadachins são mestres da arte da espada, guerreiros cuja jornada começa nas academias de combate e linhas de frente de batalhas épicas. Buscam a maestria absoluta no manejo da lâmina e na disciplina do combate.",
    "modificador": "Destreza",
    "dadoVida": "2d8+mod cons ou 9+mod cons",
    "dificuldade": "5/10",
    "poder": "INÍCIO [Forte] | MEIO [Extremamente Forte] | FIM [Forte]",
    "itensIniciais": "Katana de duas mãos com bainha (1d8) ou espada curta. Kimono (+2 destreza) ou cota de malha (+1 CA, -1 dano). Garrafa de Saquê. Poção de vida pequena (1d6).",
    "subclasses": [
      "Espadachim das Sombras",
      "Espadachim da Tempestade"
    ],
    "subclasseNivel": 5
  },
  {
    "id": "ceifeiro",
    "name": "Ceifeiro",
    "desc": "Os Ceifeiros são servos da morte — indivíduos que aceitaram a inevitabilidade do fim e abraçaram seu papel como agentes da transição entre vida e morte. Carregam um amuleto misterioso e lidam com almas coletadas que podem consumir (CORRUPÇÃO) ou libertar (LIBERTAÇÃO).",
    "modificador": "Força ou Magia",
    "dadoVida": "2d8+mod cons ou 9+mod cons",
    "dificuldade": "8/10",
    "poder": "INÍCIO [Fraco] | MEIO [Extremamente Forte] | FIM [Extremamente Forte]",
    "itensIniciais": "Foice de pedra de 2 mãos (1d6). Sobretudo preto (+1 força). Pulseira de ossos (-3 dano recebido) ou pulseira de metal (+4 HP). Amuleto misterioso.",
    "subclasses": [
      "Ceifeiro Ascendido",
      "Ceifeiro Recipiente"
    ],
    "subclasseNivel": 8
  },
  {
    "id": "bruxo",
    "name": "Bruxo",
    "desc": "Os Bruxos nasceram de mutações realizadas em estruturas antigas onde foram descobertos os Sinais — feitiços simples mas eficazes quando usados corretamente. São considerados atrocidades humanas pelo método de treinamento exótico. Uma vez que se passa dos 6 anos de idade, é suicídio tentar a transformação. Dominam os Sinais e a arte do combate híbrido entre espada e magia.",
    "modificador": "Força ou Magia",
    "dadoVida": "2d10+mod cons ou 11+mod cons",
    "dificuldade": "3/10",
    "poder": "INÍCIO [Extremamente Forte] | MEIO [Extremamente Forte] | FIM [Extremamente Forte]",
    "itensIniciais": "Espada curta. Adaga. Cota de malha. Poção de vida pequena.",
    "subclasses": [
      "Bruxo Encantador",
      "Bruxo Combatente"
    ],
    "subclasseNivel": 5
  },
  {
    "id": "fulgor",
    "name": "Fulgor",
    "desc": "Os Fulgores são herdeiros de uma magia ancestral que se manifesta em seus corpos. Descendem de um povo que cultuava luminosidade e eletricidade como divindades. Aqueles que nascem com o dom de controlar esses elementos são vistos como escolhidos. O despertar geralmente ocorre ao ser atingido por um raio.",
    "modificador": "Magia",
    "dadoVida": "2d8+mod cons ou 9+mod cons",
    "dificuldade": "10/10",
    "poder": "INÍCIO [Forte] | MEIO [Extremamente Forte] | FIM [Extremamente Forte]",
    "itensIniciais": "Adaga. Poção de vida pequena.",
    "subclasses": [
      "Fulgor Combativo",
      "Fulgor Restaurador"
    ],
    "subclasseNivel": 5
  },
  {
    "id": "sentinela",
    "name": "Sentinela",
    "desc": "Os Sentinelas são sombras silenciosas — os olhos que tudo veem. Mestres do ataque a longa distância, são temidos pela letalidade misteriosa e a capacidade de eliminar alvos de forma praticamente indetectável. Em combate corpo a corpo, porém, são frágeis como papel. Utilizam CINERO, uma língua rúnica antiga, para certas habilidades.",
    "modificador": "Magia",
    "dadoVida": "2d6+mod cons ou 7+mod cons",
    "dificuldade": "Não informado no documento",
    "poder": "Não informado no documento",
    "itensIniciais": "Arco Longo (alcance 300m, +3d4 de 250-300m) OU Arco Recurvo (alcance 100m, +1d6 de 80-100m). Aljava de Cedro com 12 flechas de ferro (1d6, +1 CA). Adaga (1d4). Dedeira e braçadeira.",
    "subclasses": [
      "Sentinela — Inane",
      "Sentinela Glacial"
    ],
    "subclasseNivel": 5
  },
  {
    "id": "spellstealer",
    "name": "Spellstealer",
    "desc": "Os Spellstealers são ladrões da magia — indivíduos que descobriram a existência das linhas de mana, teias invisíveis que envolvem toda manifestação arcana. Após um evento marcante (um encontro com um ser mágico ou exposição intensa à energia arcana), eles se aprofundam na arte de roubar magias e controlar essas linhas. Prosperam nas sombras e ruas escuras, combinando sigilo com combate mágico.",
    "modificador": "Magia ou Constituição",
    "dadoVida": "2d10+mod cons ou 11+mod cons",
    "dificuldade": "6/10",
    "poder": "INÍCIO [Fraco] | MEIO [Forte] | FIM [Extremamente Forte]",
    "itensIniciais": "1 adaga (1d4). Corselete de couro.",
    "subclasses": [
      "Ditador",
      "Regicida Supremo"
    ],
    "subclasseNivel": 5
  },
  {
    "id": "hemomante",
    "name": "Hemomante",
    "desc": "Os Hemomantes são sacerdotes de uma tradição antiga que dominaram a arte de controlar e manipular o sangue — tanto o próprio quanto o dos outros. Sua história começa em templos ocultos, onde o conhecimento sobre o sangue é guardado com zelo. São iniciados em ordens secretas dedicadas ao estudo das propriedades mágicas do sangue.",
    "modificador": "Constituição",
    "dadoVida": "2d10+mod cons ou 11+mod cons",
    "dificuldade": "9/10",
    "poder": "INÍCIO [Forte] | MEIO [Forte] | FIM [Forte]",
    "itensIniciais": "2 poções de vida pequenas (1d6). Colar da vida (+5 HP) ou colar de sangue (1 cura por ataque). Corselete de couro. Adaga (1d4).",
    "subclasses": [
      "Hemomante Empírico",
      "Hemomante da Guerra"
    ],
    "subclasseNivel": 5
  },
  {
    "id": "lanceiro",
    "name": "Lanceiro",
    "desc": "Os Lanceiros são mestres na arte ancestral da lança, uma arma que é tanto instrumento de guerra quanto manifestação de honra e tradição. Sua jornada começa em comunidades guerreiras e clãs dedicados ao domínio da lança. São especialistas em alcance, precisão e técnicas que transcendem os limites físicos.",
    "modificador": "Força e Destreza",
    "dadoVida": "2d10+mod cons ou 11+mod cons",
    "dificuldade": "4/10",
    "poder": "INÍCIO [Extremamente Forte] | MEIO [Extremamente Forte] | FIM [Extremamente Forte]",
    "itensIniciais": "Lança de ferro. Cota de malha. Poção de vida pequena.",
    "subclasses": [
      "Lanceiro Panteão Cósmico",
      "Lanceiro Dracônico Elemental"
    ],
    "subclasseNivel": 5
  },
  {
    "id": "manipulador-essencia",
    "name": "Manipulador de Essência",
    "desc": "Os Manipuladores de Essência são raros indivíduos que possuem o dom de canalizar sua própria energia vital — seu tempo de vida — para realizar feitos extraordinários. Cada habilidade custa DIAS, SEMANAS, MESES ou até ANOS de vida. Esse treinamento é árduo e perigoso, pois exige compreender a interconexão entre vida e poder.",
    "modificador": "Inteligência",
    "dadoVida": "2d8+mod cons ou 9+mod cons",
    "dificuldade": "9/10",
    "poder": "INÍCIO [Médio] | MEIO [Extremamente Forte] | FIM [Extremamente Forte]",
    "itensIniciais": "Adaga (1d4). Corselete de couro (+1 CA) ou Luvas (+1 dano). Poção de vida pequena (1d6). Capa simples.",
    "subclasses": [
      "Combustão",
      "Titereiro"
    ],
    "subclasseNivel": 5
  },
  {
    "id": "invocador-funereo",
    "name": "Invocador Funéreo",
    "desc": "Os Invocadores Funéreos ousaram fazer um pacto com os mistérios da escuridão e da morte. Em um momento de desespero ou ambição insaciável, realizaram um ritual macabro, invocando entidades sombrias de reinos desconhecidos. Sinais funéreos brilham em seus corpos, cada um representando uma invocação diferente. Controlam criaturas sombrias em sua totalidade.",
    "modificador": "Constituição",
    "dadoVida": "Não informado no documento",
    "dificuldade": "Não informado no documento",
    "poder": "Não informado no documento",
    "itensIniciais": "Trapos velhos. Cajado de madeira (1d4).",
    "subclasses": [
      "Sangue Puro",
      "Maldição Intrépida"
    ],
    "subclasseNivel": 5
  }
];

export const SHIKATAS_HABILIDADES_V6 = {
  "guerreiro": [
    {
      "nivel": 1,
      "nome": "PRIORI",
      "tipo": "passiva",
      "sourceTitle": "PRIORI",
      "desc": "Não tenha limites de carga de peso."
    },
    {
      "nivel": 1,
      "nome": "ESTILO COMBATENTE",
      "tipo": "passiva",
      "sourceTitle": "ESTILO COMBATENTE",
      "desc": "O guerreiro ganha 2 passivas:"
    },
    {
      "nivel": 1,
      "nome": "DEFESA",
      "tipo": "passiva",
      "sourceTitle": "DEFESA",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "+CA por nível do escudo (1/2/3)"
        },
        {
          "nivel": 11,
          "desc": "Escudos contam como armas. Peq/méd/grd dão +10/15/20 defesa"
        }
      ],
      "desc": "Quando empunha um escudo (de porte pequeno, médio ou grande), ganha CA adicional correspondente ao nível do escudo. Pequeno concede +1, médio +2 e grande +3."
    },
    {
      "nivel": 1,
      "nome": "DUELO DE PERTO",
      "tipo": "passiva",
      "sourceTitle": "DUELO DE PERTO",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "+1d4 (2 mãos: +3d4)"
        },
        {
          "nivel": 11,
          "desc": "+2d6 (2 mãos: +5d6)"
        }
      ],
      "desc": "Quando usa armas corpo-a-corpo, o guerreiro causa 1d4 de dano adicional em seus ataques. Para armas de duas mãos, aumenta para 3d4."
    },
    {
      "nivel": 2,
      "nome": "ATAQUE CREPÚSCULO",
      "tipo": "ativo",
      "sourceTitle": "ATAQUE CREPÚSCULO [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Golpes: 2 golpes em X | Efeito de crítico: Crítico = um novo golpe vertical"
        },
        {
          "nivel": 19,
          "desc": "Golpes: 4 golpes, duplo X | Efeito de crítico: Crítico = um novo golpe vertical"
        }
      ],
      "desc": "O guerreiro desfere dois golpes contra seu inimigo, formando um ‘X’. Caso algum dos golpes seja crítico, realiza mais um golpe no inimigo, de forma vertical. O dano de cada golpe corresponde ao da arma equipada."
    },
    {
      "nivel": 2,
      "nome": "BRANDIR",
      "tipo": "ativo",
      "sourceTitle": "BRANDIR [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Usos: 1x desc. curto | Restrições: Até 5 níveis acima, não colossais, não furtivos"
        },
        {
          "nivel": 6,
          "desc": "Usos: 2x desc. curto | Restrições: Qualquer nível, mas não colossais e furtivos"
        },
        {
          "nivel": 12,
          "desc": "Usos: 3x desc. curto | Restrições: Funciona contra colossais mas não furtivos"
        },
        {
          "nivel": 20,
          "desc": "Usos: 4x desc. curto | Restrições: Funciona contra furtivos."
        }
      ],
      "desc": "O guerreiro pode contra-atacar qualquer golpe físico armado. Não funciona inicialmente contra criaturas com 5+ níveis, criaturas colossais ou ataques furtivos."
    },
    {
      "nivel": 2,
      "nome": "ADRENALINA",
      "tipo": "ativo",
      "sourceTitle": "ADRENALINA [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Usos: 1x desc. longo | Extra: Ganha 1 ação completa extra. Toma 2d4 de dano"
        },
        {
          "nivel": 10,
          "desc": "Usos: 2x desc. longo | Extra: Ganha 1 ação completa extra. Toma 3d4 de dano /"
        }
      ],
      "desc": "O guerreiro canaliza um surto de energia, ganhando uma ação completa extra nesse turno. Após esse turno, toma 2d4 de dano, devido a exaustão."
    },
    {
      "nivel": 3,
      "nome": "RESPIRAÇÃO DO COMBATE",
      "tipo": "passiva",
      "sourceTitle": "RESPIRAÇÃO DO COMBATE",
      "evolucoes": [
        {
          "nivel": 3,
          "desc": "Valor da cura: Mod constituição"
        },
        {
          "nivel": 5,
          "desc": "Valor da cura: 2 + mod cons"
        },
        {
          "nivel": 9,
          "desc": "Valor da cura: 3 + mod cons"
        },
        {
          "nivel": 13,
          "desc": "Valor da cura: 4 + mod cons"
        },
        {
          "nivel": 20,
          "desc": "Valor da cura: 6+ mod cons."
        }
      ],
      "desc": "Após receber danos, se cure no valor de seu modificador de constituição. A cura só é ativada uma única vez por habilidades de dano (mesmo que sejam de várias instâncias)."
    },
    {
      "nivel": 3,
      "nome": "CORAÇÃO DO ESCUDEIRO",
      "tipo": "passiva",
      "sourceTitle": "CORAÇÃO DO ESCUDEIRO",
      "desc": "No início de cada combate, o guerreiro recebe automaticamente um escudo sobreposto à vida no valor de seu modificador de constituição. O valor é dobrado caso possua um escudo equipado."
    },
    {
      "nivel": 3,
      "nome": "ATAQUE DE OPORTUNIDADE",
      "tipo": "ativo",
      "sourceTitle": "ATAQUE DE OPORTUNIDADE[1 VEZ POR INIMIGO POR TURNO]",
      "usos": "1 VEZ POR INIMIGO POR TURNO",
      "desc": "Caso um inimigo dentro do alcance do guerreiro tente se deslocar, poderá realizar um ataque certeiro com sua arma principal."
    },
    {
      "nivel": 4,
      "nome": "DEFESA DE ESCUDO",
      "tipo": "ativo",
      "sourceTitle": "DEFESA DE ESCUDO [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "desc": "O guerreiro pode erguer seu escudo como reação para defender-se contra ataques à distância, bloqueando projéteis e magias que venham em sua direção."
    },
    {
      "nivel": 5,
      "nome": "CRÍTICO APRIMORADO",
      "tipo": "passiva",
      "sourceTitle": "CRÍTICO APRIMORADO",
      "desc": "Ao tirar 19 no dado, será contado como acerto crítico. Ataques críticos sempre causarão DANO REAL."
    },
    {
      "nivel": 7,
      "nome": "ESPÍRITO DO ESCUDEIRO",
      "tipo": "bonus",
      "sourceTitle": "ESPÍRITO DO ESCUDEIRO",
      "evolucoes": [
        {
          "nivel": 7,
          "desc": "Dano: 1d4 + mod cons | Extra: —"
        },
        {
          "nivel": 12,
          "desc": "Dano: 2d4 + mod cons | Extra: Atordoa alvo 1 turno caso crítico"
        }
      ],
      "desc": "O guerreiro agora pode utilizar seu escudo como uma segunda arma em combate. Todos os escudos causam 1d4+mod cons de dano físico. Podem ser realizados com ação bônus, desde que o escudo esteja na mão não-hábil."
    },
    {
      "nivel": 7,
      "nome": "ATAQUE GIRATÓRIO",
      "tipo": "ativo",
      "sourceTitle": "ATAQUE GIRATÓRIO [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 7,
          "desc": "Área: 2x2m | Dano: 4d10 + mod força | Extra: Empurra 1m"
        },
        {
          "nivel": 19,
          "desc": "Área: 3x3m | Dano: 12d8 + mod força | Extra: Empurra e atordoa inimigos por 1 turno"
        }
      ],
      "desc": "O guerreiro executa um ataque giratório num raio de 2m em sua volta, empurrando os alvos e causando 4d10 de dano físico."
    },
    {
      "nivel": 8,
      "nome": "ESPADA FIEL",
      "tipo": "passiva",
      "sourceTitle": "ESPADA FIEL",
      "desc": "Espadas causam dois dados de dano adicional."
    },
    {
      "nivel": 9,
      "nome": "SOLDADO ABSOLUTO",
      "tipo": "passiva",
      "sourceTitle": "SOLDADO ABSOLUTO",
      "desc": "O guerreiro dificilmente sofre de fome e sede, e pode ficar acordado durante dias que não irá se sentir cansado."
    },
    {
      "nivel": 10,
      "nome": "GOLPE INTRÉPIDO",
      "tipo": "ativo",
      "sourceTitle": "GOLPE INTRÉPIDO [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "desc": "O guerreiro investe contra seu alvo canalizando toda a sua força num único golpe. Causa 3d10 + modificador de força de dano adicional. O impacto deixa o alvo atordoado por 1 turno."
    },
    {
      "nivel": 14,
      "nome": "EMPUNHAR ESPADAS",
      "tipo": "passiva",
      "sourceTitle": "EMPUNHAR ESPADAS",
      "desc": "Agora o guerreiro consegue empunhar uma espada grande em uma só mão."
    },
    {
      "nivel": 15,
      "nome": "TERREMOTO",
      "tipo": "ativo",
      "sourceTitle": "TERREMOTO [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "desc": "O guerreiro golpeia o solo com sua força bruta, criando uma onda de choque que se propaga em todas as direções num raio de 6 metros. O impacto causa 8d6 + modificador de força de dano físico. Alvos atingidos ficam desnorteados, sofrendo -4 nas rolagens de acerto pelo próximo turno."
    },
    {
      "nivel": 17,
      "nome": "ACERTO VINGATIVO",
      "tipo": "ativo",
      "sourceTitle": "ACERTO VINGATIVO [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "desc": "Após sofrer um golpe inimigo, ele imediatamente contra-ataca o inimigo mais próximo."
    },
    {
      "nivel": 18,
      "nome": "CREPÚSCULO VORAZ",
      "tipo": "ativo",
      "sourceTitle": "CREPÚSCULO VORAZ [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "desc": "O guerreiro concentra a sua energia num próximo ataque, que causa 35 de DANO REAL adicional. Em caso de acerto crítico, o dano adicional muda para 80 de DANO REAL adicional."
    },
    {
      "nivel": 20,
      "nome": "RESISTÊNCIA",
      "tipo": "passiva",
      "sourceTitle": "RESISTÊNCIA",
      "desc": "O guerreiro agora desenvolve resistência a golpes críticos. Ele receberá o dano normal."
    },
    {
      "nivel": 5,
      "nome": "ATAQUES CONSECUTIVOS",
      "tipo": "ativo",
      "sourceTitle": "ATAQUES CONSECUTIVOS [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "subclasse": "Guerreiro Empalador Sanguinário",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Ataques: 2"
        },
        {
          "nivel": 8,
          "desc": "Ataques: 3"
        },
        {
          "nivel": 14,
          "desc": "Ataques: 4"
        }
      ],
      "desc": "O guerreiro desfere múltiplos ataques num único movimento contra um único inimigo. Precisa rolar apenas um dado de acerto para todos os golpes simultaneamente, mas esses ataques não podem ser críticos."
    },
    {
      "nivel": 5,
      "nome": "PERFURAR",
      "tipo": "passiva",
      "sourceTitle": "PERFURAR",
      "subclasse": "Guerreiro Empalador Sanguinário",
      "desc": "O primeiro ataque do guerreiro contra cada inimigo num combate, fará com que alvos atingidos fiquem sangrando até o fim do combate (não acumula)."
    },
    {
      "nivel": 5,
      "nome": "SEDE DE SANGUE",
      "tipo": "passiva",
      "sourceTitle": "SEDE DE SANGUE",
      "subclasse": "Guerreiro Empalador Sanguinário",
      "desc": "Ao atacar um alvo que esteja sangrando, recebe 1d4 de cura."
    },
    {
      "nivel": 8,
      "nome": "ATAQUE PERFURADOR",
      "tipo": "ativo",
      "sourceTitle": "ATAQUE PERFURADOR [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "subclasse": "Guerreiro Empalador Sanguinário",
      "desc": "O próximo ataque ou habilidade do guerreiro causa um perfuramento profundo no inimigo, causando 2d8 de dano físico adicional e aplicando sangramento no alvo até o fim do combate. Se o alvo já estiver sangrando, sofre 1d8 de dano extra. Além disso, remove a DEFESA do inimigo pelo resto do combate."
    },
    {
      "nivel": 14,
      "nome": "SANGRAMENTO INSACIÁVEL",
      "tipo": "passiva",
      "sourceTitle": "SANGRAMENTO INSACIÁVEL",
      "subclasse": "Guerreiro Empalador Sanguinário",
      "desc": "Ao infligir sangramento, ataque, num limite de até 2 ataques adicionais por criatura."
    },
    {
      "nivel": 5,
      "nome": "SUBLIMAÇÃO",
      "tipo": "passiva",
      "sourceTitle": "SUBLIMAÇÃO",
      "subclasse": "Guerreiro Colossal",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Cura adicional: +1d6"
        },
        {
          "nivel": 8,
          "desc": "Cura adicional: +2d6"
        },
        {
          "nivel": 14,
          "desc": "Cura adicional: +2d8"
        }
      ],
      "desc": "O guerreiro ganha mais 1d6 de cura para cada cura recebida."
    },
    {
      "nivel": 5,
      "nome": "FORMA INVENCÍVEL",
      "tipo": "passiva",
      "sourceTitle": "FORMA INVENCÍVEL",
      "subclasse": "Guerreiro Colossal",
      "desc": "Sua pele fica rígida. Recebe 25 pontos de vida máxima PERMANENTEMENTE."
    },
    {
      "nivel": 5,
      "nome": "CORAÇÃO VALENTE",
      "tipo": "ativo",
      "sourceTitle": "CORAÇÃO VALENTE [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "subclasse": "Guerreiro Colossal",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Extra: Explosão 5x5, dano = total do escudo"
        },
        {
          "nivel": 8,
          "desc": "Extra: +5 defesa por 3 turnos após explosão"
        },
        {
          "nivel": 14,
          "desc": "Extra: +10 defesa pelo resto do combate"
        }
      ],
      "desc": "O guerreiro explode o escudo do CORAÇÃO DO ESCUDEIRO, causando a resistência do escudo como dano mágico em um raio de 5m a partir do guerreiro. É possível utilizar em uma ação bônus."
    },
    {
      "nivel": 8,
      "nome": "ESPÍRITO DO COLOSSO",
      "tipo": "passiva",
      "sourceTitle": "ESPÍRITO DO COLOSSO",
      "subclasse": "Guerreiro Colossal",
      "desc": "Após o término de qualquer efeito negativo, seja atordoamento, enraizamento ou qualquer debilitação, o guerreiro se torna IMUNE a esse mesmo tipo de efeito pelo resto do combate."
    },
    {
      "nivel": 14,
      "nome": "DEFESA ÉPICA",
      "tipo": "passiva",
      "sourceTitle": "DEFESA ÉPICA",
      "subclasse": "Guerreiro Colossal",
      "desc": "Cada ponto em seu modificador de defesa agora bloqueia 2 pontos de dano."
    },
    {
      "nivel": 14,
      "nome": "INSENSATEZ DO COLOSSO",
      "tipo": "passiva",
      "sourceTitle": "INSENSATEZ DO COLOSSO",
      "subclasse": "Guerreiro Colossal",
      "desc": "O guerreiro sempre bloqueia metade do primeiro dano de qualquer ataque que o infringirem por turno."
    }
  ],
  "ladino": [
    {
      "nivel": 1,
      "nome": "ATAQUE FURTIVO",
      "tipo": "passiva",
      "sourceTitle": "ATAQUE FURTIVO",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Dano adicional: 1d8 + mod destreza"
        },
        {
          "nivel": 3,
          "desc": "Dano adicional: 2d8 + mod destreza"
        },
        {
          "nivel": 7,
          "desc": "Dano adicional: 4d8 + mod destreza"
        },
        {
          "nivel": 11,
          "desc": "Dano adicional: 5d8 + mod destreza"
        },
        {
          "nivel": 15,
          "desc": "Dano adicional: 6d8 + mod destreza"
        },
        {
          "nivel": 18,
          "desc": "Dano adicional: 7d8 + mod destreza"
        },
        {
          "nivel": 20,
          "desc": "Dano adicional: 8d8 + mod destreza"
        }
      ],
      "desc": "Ao realizar um ataque furtivo, o ladino causará 1d8+mod destreza de dano adicional. Ataques furtivos não podem ser desviados, repelidos, bloqueados ou evitados de forma alguma."
    },
    {
      "nivel": 1,
      "nome": "PROEZA",
      "tipo": "passiva",
      "sourceTitle": "PROEZA",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Bônus: +1"
        },
        {
          "nivel": 6,
          "desc": "Bônus: +2"
        },
        {
          "nivel": 12,
          "desc": "Bônus: +3"
        }
      ],
      "desc": "O jogador recebe um bônus igual a +1 em qualquer teste de ladinagem fora de combate. Testes como furtos, lábia, persuasão e furtividade são contabilizados como ladinagem."
    },
    {
      "nivel": 1,
      "nome": "AVANÇO IMEDIATO",
      "tipo": "ativo",
      "sourceTitle": "AVANÇO IMEDIATO [1 VEZ POR DESCANSO CURTO, APENAS NO 1º TURNO DO COMBATE]",
      "usos": "1 VEZ POR DESCANSO CURTO, APENAS NO 1º TURNO DO COMBATE",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Usos: 1x desc. curto | Dano adicional (mínimo): +25% (mín 2) | Distância: 3m"
        },
        {
          "nivel": 5,
          "desc": "Usos: 1x desc. curto | Dano adicional (mínimo): +50% (mín 4) | Distância: 5m"
        },
        {
          "nivel": 10,
          "desc": "Usos: 2x desc. curto | Dano adicional (mínimo): +75% (mín 8) | Distância: —"
        },
        {
          "nivel": 15,
          "desc": "Usos: 2x desc. curto | Dano adicional (mínimo): +100% (mín 15) | Distância: 10m"
        },
        {
          "nivel": 20,
          "desc": "Usos: 2x desc. curto | Dano adicional (mínimo): +150% (mín 15) | Distância: Infinito (40m fora)"
        }
      ],
      "desc": "O ladino avança contra um inimigo à vista e desferindo um golpe carregado com dano adicional. Requer uma distância máxima para ser usado."
    },
    {
      "nivel": 2,
      "nome": "MANOBRA VELOZ",
      "tipo": "bonus",
      "sourceTitle": "MANOBRA VELOZ",
      "desc": "Num combate, em específico na ação bônus, o ladino pode desengajar-se ou esconder-se."
    },
    {
      "nivel": 2,
      "nome": "CRÍTICO UNILATERAL",
      "tipo": "passiva",
      "sourceTitle": "CRÍTICO UNILATERAL",
      "desc": "Acertos críticos do ladino causam 20% de dano adicional (somados após o valor do dano crítico). A cada 5 pontos no atributo DESTREZA, esse valor aumenta para mais 20%."
    },
    {
      "nivel": 2,
      "nome": "MOBILIDADE DA ESCAPADA",
      "tipo": "ativo",
      "sourceTitle": "MOBILIDADE DA ESCAPADA [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Usos: 2x desc. curto | Mudanças: Esquiva no solo"
        },
        {
          "nivel": 11,
          "desc": "Usos: 3x desc. curto | Mudanças: Pode avançar em alvo ou até 2x mobilidade"
        },
        {
          "nivel": 17,
          "desc": "Usos: 4x desc. curto | Mudanças: Até 3x mobilidade. Funciona no ar"
        }
      ],
      "desc": "Quando um inimigo visível direciona um ataque contra o ladino, ele pode ativar esta habilidade como reação, transformando-se momentaneamente numa sombra esquiva que escapa do golpe. A esquiva é feita no solo, sem possibilidade de ir longe ou alto."
    },
    {
      "nivel": 3,
      "nome": "LINGUAGEM RAPIDA",
      "tipo": "passiva",
      "sourceTitle": "LINGUAGEM RAPIDA",
      "desc": "O ladino tem vantagem ao perceber se uma pessoa está mentindo, tendo medo ou surpresa de alguma forma."
    },
    {
      "nivel": 3,
      "nome": "DIALETO DE LADRÃO",
      "tipo": "passiva",
      "sourceTitle": "DIALETO DE LADRÃO",
      "desc": "O ladino consegue se comunicar por códigos, que apenas ladinos/ladrões conseguem entender."
    },
    {
      "nivel": 4,
      "nome": "ACERTO NA CABEÇA",
      "tipo": "passiva",
      "sourceTitle": "ACERTO NA CABEÇA",
      "desc": "O ladino sempre realiza ataques críticos em ataques na cabeça. No entanto, ataques nesta região sempre terão o acerto dificultado naturalmente (-3)."
    },
    {
      "nivel": 4,
      "nome": "CRÍTICO APRIMORADO",
      "tipo": "passiva",
      "sourceTitle": "CRÍTICO APRIMORADO",
      "evolucoes": [
        {
          "nivel": 4,
          "desc": "Valores de crítico: 18, 19, 20"
        },
        {
          "nivel": 14,
          "desc": "Valores de crítico: 17, 18, 19, 20"
        }
      ],
      "desc": "18 e 19 no dado de acerto agora são considerados acertos críticos."
    },
    {
      "nivel": 5,
      "nome": "INTELIGÊNCIA DO INVISÍVEL",
      "tipo": "passiva",
      "sourceTitle": "INTELIGÊNCIA DO INVISÍVEL",
      "desc": "O Ladino dobra o modificador de sua inteligência. Caso ela seja negativa, ela se tornará imediatamente positiva (mínimo 1)."
    },
    {
      "nivel": 5,
      "nome": "MAESTRIA TÁTICA",
      "tipo": "bonus",
      "sourceTitle": "MAESTRIA TÁTICA",
      "desc": "O ladino ganha permanentemente uma ação bônus adicional. Neste nível, escolha entre Ladino Assassino ou Ladino Arcanista Supremo."
    },
    {
      "nivel": 6,
      "nome": "ENTRE AS SOMBRAS",
      "tipo": "passiva",
      "sourceTitle": "ENTRE AS SOMBRAS",
      "desc": "Enquanto o ladino se manter furtivo desde o começo do combate, seu próximo ataque será um crítico. Porém, o ataque não é certeiro e pode errar (se falhar, perde o efeito)."
    },
    {
      "nivel": 6,
      "nome": "RISCO ALTO",
      "tipo": "ativo",
      "sourceTitle": "RISCO ALTO [3 VEZES POR DESCANSO LONGO, NÃO ACUMULATIVO]",
      "usos": "3 VEZES POR DESCANSO LONGO, NÃO ACUMULATIVO",
      "evolucoes": [
        {
          "nivel": 6,
          "desc": "Dados: 3 dados | Base: 1d8 | Condição: Soma ≥ crítico = crítico"
        },
        {
          "nivel": 15,
          "desc": "Dados: 4 dados | Base: 1d10 | Condição: Resultado ≥ 5 = sucesso"
        }
      ],
      "desc": "O ladino dispõe de alguns dados. Ele pode jogar esses dados e somar qualquer teste ou dano. No uso para acerto de ataques, se a soma atingir o valor crítico, é considerado acerto crítico. Porém, qualquer dado que resulte em 3 ou menos causa desvantagem igual ao valor na ação."
    },
    {
      "nivel": 7,
      "nome": "MANIPULAÇÃO LEVE",
      "tipo": "passiva",
      "sourceTitle": "MANIPULAÇÃO LEVE",
      "desc": "Todas as armas leves que o ladino empunhar passam a causar permanentemente um dado adicional de dano."
    },
    {
      "nivel": 8,
      "nome": "DUPLA EMPUNHADURA",
      "tipo": "passiva",
      "sourceTitle": "DUPLA EMPUNHADURA",
      "desc": "Enquanto o ladino estiver com mais de uma arma equipada, poderá atacar tão rapidamente que não sairá da furtividade até o realizar de seu segundo ataque."
    },
    {
      "nivel": 9,
      "nome": "SAÍDA DAS SOMBRAS",
      "tipo": "ativo",
      "sourceTitle": "SAÍDA DAS SOMBRAS [1 VEZ POR COMBATE]",
      "usos": "1 VEZ POR COMBATE",
      "desc": "Quando o ladino sai da furtividade, recebe +2 de acerto por dois turnos (ou dois minutos fora de combate). Só pode ser ativado uma vez por combate."
    },
    {
      "nivel": 9,
      "nome": "GOLPE PENETRANTE",
      "tipo": "passiva",
      "sourceTitle": "GOLPE PENETRANTE",
      "evolucoes": [
        {
          "nivel": 9,
          "desc": "Efeito: Ignora atributo Defesa"
        },
        {
          "nivel": 12,
          "desc": "Efeito: Anula a cura do alvo até o fim do combate. Feridas não saram por 24h"
        },
        {
          "nivel": 16,
          "desc": "Efeito: Penetra barreiras mágicas, escudos sobrepostos e proteções similares"
        },
        {
          "nivel": 19,
          "desc": "Efeito: Ignora metade da Classe de Armadura (CA) inimiga"
        }
      ],
      "desc": "O ladino agora ignora o atributo defesa de qualquer criatura. Seus ataques causam o dano completo."
    },
    {
      "nivel": 10,
      "nome": "VISÃO NOTURNA",
      "tipo": "passiva",
      "sourceTitle": "VISÃO NOTURNA",
      "desc": "O ladino agora enxerga no escuro. Caso sua origem já conceda visão noturna, recebe um efeito diferente: imunidade total a flashes e cegueiras luminosas."
    },
    {
      "nivel": 10,
      "nome": "BLEFE",
      "tipo": "ativo",
      "sourceTitle": "BLEFE [1 VEZ POR CRIATURA]",
      "usos": "1 VEZ POR CRIATURA",
      "desc": "Tenha acerto em qualquer blefe num diálogo."
    },
    {
      "nivel": 13,
      "nome": "SENTIDO CEGO",
      "tipo": "passiva",
      "sourceTitle": "SENTIDO CEGO",
      "desc": "Se o ladino for capaz de ouvir, fica ciente da localização de qualquer criatura escondida ou invisível até num raio de 10 metros."
    },
    {
      "nivel": 14,
      "nome": "ARREMESSO INEXPLICÁVEL",
      "tipo": "ativo",
      "sourceTitle": "ARREMESSO INEXPLICÁVEL[1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "Agora o jogador pode realizar o arremesso de até 3 objetos numa única ação (ou ação bônus)."
    },
    {
      "nivel": 16,
      "nome": "CAÇADOR SAGUINÁRIO",
      "tipo": "ativo",
      "sourceTitle": "CAÇADOR SAGUINÁRIO[1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "Ao acertar uma criatura com um ataque, ela recebe 3d10 de dano adicional se estiver com sua vida máxima. Só pode causar este dano uma vez por criatura."
    },
    {
      "nivel": 18,
      "nome": "ROUBO INEVITÁVEL",
      "tipo": "ativo",
      "sourceTitle": "ROUBO INEVITÁVEL [2 VEZES POR DESCANSO CURTO, 1 VEZ POR ALIADO/INIMIGO]",
      "usos": "2 VEZES POR DESCANSO CURTO, 1 VEZ POR ALIADO/INIMIGO",
      "desc": "Roube a vez de jogar de um aliado ou inimigo, trocando permanentemente no combate a ordem de atacantes."
    },
    {
      "nivel": 19,
      "nome": "MANEJO INCOMPARÁVEL",
      "tipo": "passiva",
      "sourceTitle": "MANEJO INCOMPARÁVEL",
      "desc": "Todas as armas que o ladino carregar causarão um dado de dano base adicional permanentemente. Novamente para as armas leves."
    },
    {
      "nivel": 20,
      "nome": "REI FALSO",
      "tipo": "ativo",
      "sourceTitle": "REI FALSO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "Uma cobertura de sombras rodeia o ladino. Por um curto período de tempo ele tem total controle sobre os seus atributos físicos e mentais. O ladino consegue somar todos os modificadores de atributo que recebeu até agora (por nível e por itens) em apenas uma proficiência específica, ou em outras caso desejar. Toda essa soma de pontos dura exatamente 1 dia inteiro (ou menos, caso deseje). É possível utilizar em uma ação bônus."
    },
    {
      "nivel": 5,
      "nome": "METAMORFOSE",
      "tipo": "passiva",
      "sourceTitle": "METAMORFOSE",
      "subclasse": "Ladino Assassino",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Condição de quebra: Desfaz se atacar ou for atacado"
        },
        {
          "nivel": 14,
          "desc": "Condição de quebra: Só desfaz por toque direto, ataque próprio ou por vontade"
        }
      ],
      "desc": "O ladino agora pode se disfarçar perfeitamente em qualquer criatura que já foi avistado em algum momento por ele, mas demora no mínimo 1 dia para completar totalmente este disfarce. Se o ladino acabar sendo atacado enquanto estiver disfarçado, a maquiagem começará a se desfazer."
    },
    {
      "nivel": 5,
      "nome": "ATAQUE SOMBRIO",
      "tipo": "passiva",
      "sourceTitle": "ATAQUE SOMBRIO",
      "subclasse": "Ladino Assassino",
      "desc": "Caso o ladino ataque as sombras de uma pessoa, ela será atingida com o ataque, na região exata onde o ataque foi na sombra. Mas ela sofrerá apenas metade do dano."
    },
    {
      "nivel": 8,
      "nome": "FURTIVIDADE SUPREMA",
      "tipo": "ativo",
      "sourceTitle": "FURTIVIDADE SUPREMA [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "subclasse": "Ladino Assassino",
      "desc": "O ladino se envolve numa capa que concede invisibilidade total por 3 turnos ou 10 minutos. Qualquer interação física, rastreamento ou o menor indício de presença dissipa a invisibilidade instantaneamente."
    },
    {
      "nivel": 8,
      "nome": "ASSASSINATO",
      "tipo": "passiva",
      "sourceTitle": "ASSASSINATO",
      "subclasse": "Ladino Assassino",
      "desc": "Após o ladino abater um alvo, o próximo ataque é um ATAQUE CERTEIRO."
    },
    {
      "nivel": 14,
      "nome": "TRUCIDAR",
      "tipo": "passiva",
      "sourceTitle": "TRUCIDAR",
      "subclasse": "Ladino Assassino",
      "desc": "O ladino pode atacar dois alvos próximos ao mesmo tempo, utilizando apenas uma ação."
    },
    {
      "nivel": 5,
      "nome": "MAGIA DAS SOMBRAS",
      "tipo": "ativo",
      "sourceTitle": "MAGIA DAS SOMBRAS [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "subclasse": "Ladino Arcanista Supremo",
      "desc": "O ladino agora pode controlar as sombras de seus inimigos, podendo fazer com que ela ataque ou controle seu receptor. O controle concedido ao ladino dura 2 turnos."
    },
    {
      "nivel": 5,
      "nome": "ILUSÃO",
      "tipo": "ativo",
      "sourceTitle": "ILUSÃO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Ladino Arcanista Supremo",
      "desc": "O ladino conjura uma ilusão que pode tomar diversas formas, até o tamanho de um humano médio. Dura 2 turnos em combate. Se estiver furtivo em combate, a conjuração não custa ação alguma."
    },
    {
      "nivel": 5,
      "nome": "DOMÍNIO ARCANO",
      "tipo": "passiva",
      "sourceTitle": "DOMÍNIO ARCANO",
      "subclasse": "Ladino Arcanista Supremo",
      "desc": "O ladino desvendou segredos da magia. Escolha permanentemente uma magia de cada nível das shikatas de feiticeiro, necromante ou mago. Só pode lançar essas magias quando seu nível de jogador for duas vezes superior ao nível da magia. Limitado a 3 usos por descanso longo, sem repetir a mesma magia."
    },
    {
      "nivel": 8,
      "nome": "CHUVA DE LÂMINAS MÁGICAS",
      "tipo": "ativo",
      "sourceTitle": "CHUVA DE LÂMINAS MÁGICAS [3 VEZES POR DESCANSO LONGO]",
      "usos": "3 VEZES POR DESCANSO LONGO",
      "subclasse": "Ladino Arcanista Supremo",
      "desc": "Rapidamente o ladino arremessa uma chuva de lâminas espectrais em todas as direções. Cada uma causa 3d6 + modificador de inteligência de dano a todos os inimigos num raio de 5 metros. Cada alvo é atingido por até duas lâminas."
    },
    {
      "nivel": 8,
      "nome": "ATAQUE ARCANO",
      "tipo": "bonus",
      "sourceTitle": "ATAQUE ARCANO",
      "subclasse": "Ladino Arcanista Supremo",
      "desc": "Quando o ladino acerta um golpe furtivo, pode imediatamente lançar uma magia como ação bônus. Válido para magias desta subclasse e do DOMÍNIO ARCANO."
    },
    {
      "nivel": 8,
      "nome": "BOLA DE FOGO PORTÁTIL",
      "tipo": "ativo",
      "sourceTitle": "BOLA DE FOGO PORTÁTIL [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "subclasse": "Ladino Arcanista Supremo",
      "desc": "O ladino molda uma esfera incandescente que irradia na ponta de um de seus dedos e a lança no alvo. O alvo que for atingido receberá 4d6 + inteligência de dano de fogo."
    },
    {
      "nivel": 8,
      "nome": "FEIXE SILENCIOSO",
      "tipo": "ativo",
      "sourceTitle": "FEIXE SILENCIOSO [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "subclasse": "Ladino Arcanista Supremo",
      "desc": "O ladino libera silenciosamente um feixe de luz vermelha dos dedos. O feixe inflige 3d10 de dano. É um ataque certeiro e não causa nenhum barulho."
    },
    {
      "nivel": 14,
      "nome": "TRAPACEIRO ARMADO",
      "tipo": "passiva",
      "sourceTitle": "TRAPACEIRO ARMADO",
      "subclasse": "Ladino Arcanista Supremo",
      "desc": "O ladino pode ignorar um efeito negativo de um item que esteja usando e transferir esse mesmo efeito para outro item, mesmo que não esteja empunhando-o."
    },
    {
      "nivel": 14,
      "nome": "CARGA DE HABILIDADES",
      "tipo": "passiva",
      "sourceTitle": "CARGA DE HABILIDADES",
      "subclasse": "Ladino Arcanista Supremo",
      "desc": "O ladino ganha +1 uso em todas as habilidades mágicas exclusivas desta subclasse e +1 uso nas habilidades do Domínio Arcano."
    }
  ],
  "inclemente": [
    {
      "nivel": 1,
      "nome": "ATAQUES PESADOS",
      "tipo": "passiva",
      "sourceTitle": "ATAQUES PESADOS",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Efeito: Dobra o dano base de suas armas"
        },
        {
          "nivel": 6,
          "desc": "Efeito: Causa dois dados de dano adicional"
        }
      ],
      "desc": "O inclemente reduz suas duas ações em combate para apenas uma. No entanto, ele dobra os dados de dano BASE de suas armas(incluindo seus efeitos) e punhos. Modificadores não são dobrados."
    },
    {
      "nivel": 1,
      "nome": "DESPERTAR",
      "tipo": "passiva",
      "sourceTitle": "DESPERTAR",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Gatilho: Falhar em teste de acerto físico"
        },
        {
          "nivel": 10,
          "desc": "Gatilho: Falhar em qualquer tipo de teste"
        }
      ],
      "desc": "Quando o inclemente falha num teste de acerto físico, a frustração o consome e ele entra em Fúria automaticamente."
    },
    {
      "nivel": 1,
      "nome": "FÚRIA",
      "tipo": "ativo",
      "sourceTitle": "FÚRIA [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Usos: 2x dsc longo | Duração: 2 turnos | Cura/turno: 3d6 | Extra: —"
        },
        {
          "nivel": 5,
          "desc": "Usos: 2x dsc longo | Duração: 3 turnos | Cura/turno: 4d6 | Extra: —"
        },
        {
          "nivel": 8,
          "desc": "Usos: 3x dsc longo | Duração: 3 turnos | Cura/turno: 5d6 | Extra: —"
        },
        {
          "nivel": 14,
          "desc": "Usos: 4x dsc longo | Duração: 4 turnos | Cura/turno: 6d6 | Extra: —"
        },
        {
          "nivel": 18,
          "desc": "Usos: Ilimitado | Duração: 5 turnos | Cura/turno: 6d8 | Extra: IMPARÁVEL enquanto em fúria"
        }
      ],
      "desc": "O inclemente entra num estado de fúria incontrolável: seu modificador de força é dobrado e ele se cura a cada turno ativo. Nada mais importa além de destruir tudo que está à frente."
    },
    {
      "nivel": 2,
      "nome": "RESILIÊNCIA INQUEBRÁVEL",
      "tipo": "passiva",
      "sourceTitle": "RESILIÊNCIA INQUEBRÁVEL",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Defesa: 5"
        },
        {
          "nivel": 5,
          "desc": "Defesa: 10"
        },
        {
          "nivel": 8,
          "desc": "Defesa: 15"
        },
        {
          "nivel": 11,
          "desc": "Defesa: 20"
        }
      ],
      "desc": "Ao falhar em um acerto de ataque, o inclemente causa um dado de dano adicional no seu próximo sucesso (de forma cumulativa). Ao ter uma falha crítica, também recebe 5 de defesa por 2 turnos."
    },
    {
      "nivel": 2,
      "nome": "VARREDURA DA FORÇA",
      "tipo": "ativo",
      "sourceTitle": "VARREDURA DA FORÇA [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Dano adicional: 2d6 + mod força | Empurrão: 2m | Extra: —"
        },
        {
          "nivel": 7,
          "desc": "Dano adicional: 4d6 + mod força | Empurrão: 4m | Extra: —"
        },
        {
          "nivel": 11,
          "desc": "Dano adicional: 6d8 + mod força | Empurrão: 5m | Extra: Atordoa 1 turno"
        }
      ],
      "desc": "O inclemente utiliza sua força, realizando um ataque horizontal com sua arma. Alvos atingidos diretamente pelo ataque recebem 2d6+mod força de dano. Contudo, devido a força do inclemente, todos que não forem atingidos diretamente e que estiverem numa área de até 6m de distância à frente dele, são empurrados e derrubados ao chão por 1 turno."
    },
    {
      "nivel": 3,
      "nome": "A ESSÊNCIA DO INCLEMENTE",
      "tipo": "passiva",
      "sourceTitle": "A ESSÊNCIA DO INCLEMENTE",
      "desc": "O intimidar ou causar tragédia à aqueles mais fracos do que você, insira um medo VERDADEIRO nos corações dos mesmos."
    },
    {
      "nivel": 3,
      "nome": "A ESSÊNCIA DA FORÇA",
      "tipo": "passiva",
      "sourceTitle": "A ESSÊNCIA DA FORÇA",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Efeito: Destrói madeira, pedra e frágeis"
        },
        {
          "nivel": 10,
          "desc": "Efeito: Destrói até aço"
        },
        {
          "nivel": 16,
          "desc": "Efeito: Olhar aterroriza criaturas inferiores sem teste"
        }
      ],
      "desc": "O inclemente não sente dor. Seu corpo é uma arma, consegue destruir madeira, pedra e materiais frágeis com as próprias mãos."
    },
    {
      "nivel": 4,
      "nome": "PERSEVERANÇA",
      "tipo": "ativo",
      "sourceTitle": "PERSEVERANÇA [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "O inclemente se recusa a cair. Ao chegar a 0 HP, retorna com 20% de sua vida máxima e entra em Fúria automaticamente. A morte terá que esperar."
    },
    {
      "nivel": 4,
      "nome": "CRÍTICO APRIMORADO?",
      "tipo": "passiva",
      "sourceTitle": "CRÍTICO APRIMORADO?",
      "desc": "Agora ao tirar 19 ou 20 nos dados é considerado um acerto crítico e ao tirar 1 ou 2 nos dados é considerado falha crítica."
    },
    {
      "nivel": 5,
      "nome": "FERVOR DE SANGUE",
      "tipo": "passiva",
      "sourceTitle": "FERVOR DE SANGUE",
      "desc": "O sangue do inclemente ferve durante as batalhas, fazendo com que o mesmo não sinta dores de ataques inimigos. Mesmo que um membro seja perdido, ele não sofrerá dos efeitos da dor."
    },
    {
      "nivel": 7,
      "nome": "VÁCUO DA FORÇA",
      "tipo": "passiva",
      "sourceTitle": "VÁCUO DA FORÇA",
      "desc": "Até os ataques básicos mais fracos do inclemente criam um vácuo no ar, chegando a uma distância de até (mod força) metros. O vácuo causa dano equivalente a metade do dano total de seus ataques básicos."
    },
    {
      "nivel": 8,
      "nome": "BRUTALIZAR",
      "tipo": "ativo",
      "sourceTitle": "BRUTALIZAR [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "desc": "O inclemente segura seu oponente pelos cabelos e força a cabeça do mesma contra uma parede de pedra ou qualquer superfície dura, causando (4d4 para cada nível de resistência da superfície). Caso o alvo morra no processo, decapite-o e amendontre todos os inimigos em volta por 2 turnos. Alvos amedrontados são imprevisíveis, podendo fugir do combate, ficarem nervosos ou etc."
    },
    {
      "nivel": 9,
      "nome": "INSTINTO PREDADOR",
      "tipo": "passiva",
      "sourceTitle": "INSTINTO PREDADOR",
      "desc": "O inclemente soma seu modificador de força como iniciativa."
    },
    {
      "nivel": 9,
      "nome": "DUPLO IMPACTO",
      "tipo": "ativo",
      "sourceTitle": "DUPLO IMPACTO[3 VEZES POR DESCANSO CURTO]",
      "usos": "3 VEZES POR DESCANSO CURTO",
      "desc": "O inclemente realiza um golpe no alvo, causando 2d4 de dano adicional. No próximo turno, o alvo sente o duplo impacto do ataque, recebendo 10d4+mod força de dano e ficando atordoado por 1 turno."
    },
    {
      "nivel": 10,
      "nome": "IMPIEDOSO",
      "tipo": "ativo",
      "sourceTitle": "IMPIEDOSO [ATÉ 1 VEZ POR ALVO]",
      "usos": "ATÉ 1 VEZ POR ALVO",
      "desc": "Ao quebrar ossos de alguma criatura com algum de seus ataques, arranque o membro em questão da região em que infringe dano e realize um ataque certeiro no alvo infrator, causando 6d8+mod de força de dano físico."
    },
    {
      "nivel": 13,
      "nome": "ATAQUE COMPRESSOR",
      "tipo": "ativo",
      "sourceTitle": "ATAQUE COMPRESSOR [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "desc": "O inclemente atinge a mandíbula do alvo com um ataque de baixo para cima com ambos os punhos unidos, o arremessando no ar 5 metros diretamente acima da região onde está, causando 10d8+mod de força como dano físico."
    },
    {
      "nivel": 15,
      "nome": "DEMOLIÇÃO",
      "tipo": "ativo",
      "sourceTitle": "DEMOLIÇÃO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 15,
          "desc": "Área: Cone, até 8m | Dano: 4d20 + mod força | Extra: —"
        },
        {
          "nivel": 20,
          "desc": "Área: Cone, até 8m | Dano: 6d20 + mod força | Extra: Atordoa 1 turno"
        }
      ],
      "desc": "O inclemente segura sua arma em cima de sua cabeça com suas duas mãos. Esta ação dura 1 turno completo e não pode ser interrompida por nada. Após voltar ao turno do jogador, o inclemente usa toda a sua força e realiza um ataque vertical, atingindo sua arma contra o solo. Após o impacto da arma, a região de até 10x10 metros à frente será completamente destruída e todos que estão ali presentes sofrerão 4d20+mod força de dano físico."
    },
    {
      "nivel": 17,
      "nome": "VIBRAÇÃO DA MORTE",
      "tipo": "ativo",
      "sourceTitle": "VIBRAÇÃO DA MORTE [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "desc": "O inclemente desfere um soco no peito do oponente, retirando todo o ar de seus pulmões: 3d10 + mod força de dano físico. Em seguida, direciona as palmas abertas contra a cabeça do alvo, gerando um som agudo ensurdecedor: 6d10 + mod força de dano físico. O alvo fica atordoado por 2 turnos pela falta de ar e perda de audição."
    },
    {
      "nivel": 19,
      "nome": "INCLEMÊNCIA",
      "tipo": "passiva",
      "sourceTitle": "INCLEMÊNCIA",
      "desc": "As feridas do inclemente cicatrizam rapidamente. O sangue fervente que corre em suas veias faz com que feridas extremamente mortais não o matem, nem venenos ou efeitos similares."
    },
    {
      "nivel": 20,
      "nome": "PRIMEIRO IMPACTO",
      "tipo": "ativo",
      "sourceTitle": "PRIMEIRO IMPACTO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "Com toda a sua força, atinja uma superfície sólida ou uma criatura usando sua arma ou um de seus punhos. No impacto, destrua completamente aquela zona numa área de até 35m em volta do jogador, causando quatro vezes o seu modificador de força nesta área. Caso esta habilidade seja atingida numa criatura, quebre completamente suas costelas, jogando-a para até 100m de distância e causando 12d12+mod força de dano adicional."
    },
    {
      "nivel": 5,
      "nome": "TROCA NATURAL",
      "tipo": "passiva",
      "sourceTitle": "TROCA NATURAL",
      "subclasse": "Inclemente, O Coração da Fornalha",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Efeito: Cada ponto em Força = 2 HP"
        },
        {
          "nivel": 8,
          "desc": "Efeito: Destreza e Constituição também somam 2 de HP"
        }
      ],
      "desc": "Para cada ponto no atributo força, receba 2 pontos em vida."
    },
    {
      "nivel": 5,
      "nome": "ESCUDO DA FORNALHA",
      "tipo": "ativo",
      "sourceTitle": "ESCUDO DA FORNALHA [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "subclasse": "Inclemente, O Coração da Fornalha",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Valor: 3d4 + mod força | Duração: 2 turnos | Área explosão: 2x2m | Extra: —"
        },
        {
          "nivel": 8,
          "desc": "Valor: 6d4 + mod força | Duração: 2 turnos | Área explosão: 2x2m | Extra: IMPARÁVEL, +5 defesa, explosão voluntária (2x dano)"
        },
        {
          "nivel": 14,
          "desc": "Valor: 10d4 + mod força | Duração: 3 turnos | Área explosão: 4x4m | Extra: +10 defesa"
        }
      ],
      "desc": "O inclemente se envolve em um escudo carmesim de tamanho calor que chega a queimar criaturas que estiverem próximas. Este escudo pode bloquear até 3d4+mod força de qualquer dano. O escudo dura 2 turnos, e quando é quebrado ou esgotado, ele explode numa área 2x2, causando dano equivalente ao valor total do escudo. Pode utilizar em uma ação bônus."
    },
    {
      "nivel": 14,
      "nome": "DESTRUIÇÃO GLOBAL",
      "tipo": "ativo",
      "sourceTitle": "DESTRUIÇÃO GLOBAL [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Inclemente, O Coração da Fornalha",
      "desc": "O inclemente corre em linha reta, começando numa velocidade normal e aumentando ela constantemente (a duração da corrida é igual a 1d12 minuto(s)). Após 1 minuto de corrida, a velocidade do jogador sairá de controle, e a velocidade do mesmo aumentará em 20 metros adicionais por segundo para cada minuto percorrido. Ao ter impacto com um objeto grande e sólido ou numa criatura, a corrida parará e o alvo/construção atingida receberá danos iguais a (1d10 para cada minuto percorrido durante a corrida), e o jogador receberá metade desse dano. Não é possível mudar o percurso ou parar antes do tempo quando for utilizada, a não ser que atinja algo no processo como dito anteriormente. É possível utilizar a habilidade ESCUDO DA FORNALHA antes, no meio e no fim da DESTRUIÇÃO GLOBAL. Enquanto envolvido pelo ESCUDO DA FORNALHA, não pare mesmo que atinja objetos sólidos ou criaturas (apesar de causar e receber o dano). O escudo consegue durar até o fim da corrida caso não seja destruído pelos danos recebidos."
    },
    {
      "nivel": 5,
      "nome": "O MANÍACO DOS ARREMESSOS",
      "tipo": "ativo",
      "sourceTitle": "O MANÍACO DOS ARREMESSOS [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "subclasse": "Inclemente, O Lançador",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Alvos por turno: 1"
        },
        {
          "nivel": 8,
          "desc": "Alvos por turno: até 2"
        },
        {
          "nivel": 14,
          "desc": "Alvos por turno: até 3"
        }
      ],
      "desc": "O inclemente urra em direção aos céus, para logo em seguida agarrar um inimigo ao alcance de suas mãos. Ele não deixa brechas e aperta a região que segura, sejam braços ou pernas, antes de o arremessar para cima, a uma distância de 7 metros. O impacto do corpo inimigo contra o solo causa 1d4 de dano físico."
    },
    {
      "nivel": 5,
      "nome": "SALTO SUICIDA",
      "tipo": "ativo",
      "sourceTitle": "SALTO SUICIDA [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "subclasse": "Inclemente, O Lançador",
      "desc": "O Inclemente reteza os músculos das pernas, antes de saltar em direção ao inimigo que cruza os céus. Enquanto estiver sobre o corpo de seu oponente, em plena queda, o Inclemente recebe uma ação a mais, dado que terá pleno controle da situação. Neste estado ele gritará com seus pulmões, deixando todos que observarem a cena confusos. O impacto do corpo do oponente contra o solo, somado à força exercida pelo Inclemente em cima de si, causará 2d6+mod de força."
    },
    {
      "nivel": 8,
      "nome": "O PILAR",
      "tipo": "ativo",
      "sourceTitle": "O PILAR [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "subclasse": "Inclemente, O Lançador",
      "desc": "Utilizando a gravidade a seu favor, se posicione no local da queda de alguém que foi arremessado ao ar e desfira um ataque, com seus punhos ou sua arma, contra o mesmo. Causando duas vezes o dano contra o alvo."
    },
    {
      "nivel": 14,
      "nome": "O SIGNIFICADO DE ARTE",
      "tipo": "ativo",
      "sourceTitle": "O SIGNIFICADO DE ARTE [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Inclemente, O Lançador",
      "desc": "O Inclemente, utilizando o corpo de alguém como trampolim, pula em até 20m do solo, para logo em seguida saltar de um corpo que estiver no ar, para outro em rápida sucessão em até 3 pessoas próximas. Causando o mesmo dano a todos, como se seu peso houvesse ficado impresso em seus corpos, causando 6d8+mod de força, e os deixando desabilitados por 2 turnos após isso."
    }
  ],
  "cacador": [
    {
      "nivel": 1,
      "nome": "ESPÍRITO DE SOBREVIVÊNCIA",
      "tipo": "passiva",
      "sourceTitle": "ESPÍRITO DE SOBREVIVÊNCIA",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Bônus: +3 | Ambientes: Ambientes selvagens/inexplorados"
        },
        {
          "nivel": 7,
          "desc": "Bônus: +4 | Ambientes: Ambientes selvagens/inexplorados"
        },
        {
          "nivel": 13,
          "desc": "Bônus: +4 | Ambientes: Também regiões exploradas (cidades destruídas, minerações, dungeons)"
        }
      ],
      "desc": "O caçador consegue se adaptar a situações de perigo nos recantos inexplorados do mundo. Em ambientes selvagens como florestas densas ou cavernas desconhecidas, recebe +3 de acerto em todas as ações."
    },
    {
      "nivel": 1,
      "nome": "CAÇADA",
      "tipo": "passiva",
      "sourceTitle": "CAÇADA",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Dano adicional vs. feras: 1d4"
        },
        {
          "nivel": 4,
          "desc": "Dano adicional vs. feras: 2d4"
        },
        {
          "nivel": 9,
          "desc": "Dano adicional vs. feras: 3d4"
        }
      ],
      "desc": "O caçador é uma força incansável na perseguição de feras selvagens e irracionais. Seu instinto aguçado lhe permite causar dano adicional a essas criaturas."
    },
    {
      "nivel": 1,
      "nome": "VISÃO DO CAÇADOR",
      "tipo": "passiva",
      "sourceTitle": "VISÃO DO CAÇADOR",
      "desc": "Inimigos que fugirem do caçador deixarão um rastro místico que só o caçador poderá enxergar. Esse rastro ficará exposto durante 20 minutos."
    },
    {
      "nivel": 2,
      "nome": "CORTE PERFURANTE",
      "tipo": "ativo",
      "sourceTitle": "CORTE PERFURANTE [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Usos: 2x desc. curto | Dano: 2d6 + mod força | Sangramento: 2 turnos"
        },
        {
          "nivel": 6,
          "desc": "Usos: 3x desc. curto | Dano: 4d6 + mod força | Sangramento: 3 turnos"
        },
        {
          "nivel": 10,
          "desc": "Usos: 4x desc. curto | Dano: 6d6 + mod força | Sangramento: 4 turnos"
        },
        {
          "nivel": 14,
          "desc": "Usos: 5x desc. curto | Dano: 8d6 + mod força | Sangramento: 5 turnos"
        },
        {
          "nivel": 18,
          "desc": "Usos: 5x desc. curto | Dano: 10d6 + mod força | Sangramento: Até fim do combate"
        }
      ],
      "desc": "O caçador golpeia um ponto vital do inimigo com sua arma, abrindo uma ferida profunda e causando sangramento. Pode ser realizado à distância. O sangramento se acumula."
    },
    {
      "nivel": 2,
      "nome": "INIMIGO FAVORITO",
      "tipo": "passiva",
      "sourceTitle": "INIMIGO FAVORITO",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Extra: +2d4 de dano, +2 acerto vs. favorito"
        },
        {
          "nivel": 11,
          "desc": "Extra: +5d4 de dano, Eliminar favorito = +1 ponto de atributo permanente à escolha"
        },
        {
          "nivel": 18,
          "desc": "Extra: +5d8 de dano, Eliminar favorito também aterroriza todos os inimigos em 30m (só funciona em nível inferior)"
        }
      ],
      "desc": "O caçador pode escolher um monstro que já avistou para ser seu inimigo favorito, sejam humanos, goblins, dragões, etc. Inimigos favoritos recebem 2d4 de dano adicional, são rastreados mais facilmente e o caçador possui mais 2 de acerto contra os mesmos."
    },
    {
      "nivel": 3,
      "nome": "ATAQUE SEQUENCIADO",
      "tipo": "ativo",
      "sourceTitle": "ATAQUE SEQUENCIADO [3 VEZES POR DESCANSO CURTO]",
      "usos": "3 VEZES POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 3,
          "desc": "Usos: 3x desc. curto | Extra: —"
        },
        {
          "nivel": 9,
          "desc": "Usos: 4x desc. curto | Extra: Ataques sequenciais causam dano REAL"
        },
        {
          "nivel": 14,
          "desc": "Usos: 5x desc. curto | Extra: Ataques sequenciais são CERTEIROS"
        }
      ],
      "desc": "Ao obter êxito na rolagem de acerto de seu ataque, o caçador pode jogar um segundo dado de acerto para tentar atacar novamente."
    },
    {
      "nivel": 3,
      "nome": "ARMADILHA DE CAÇA",
      "tipo": "passiva",
      "sourceTitle": "ARMADILHA DE CAÇA",
      "desc": "O caçador consegue manipular recursos naturais e transformá-los em armadilhas mortais contra inimigos. Qualquer armadilha será possível de ser criada, desde que esteja com os recursos disponíveis."
    },
    {
      "nivel": 4,
      "nome": "CRÍTICO APRIMORADO",
      "tipo": "passiva",
      "sourceTitle": "CRÍTICO APRIMORADO",
      "desc": "19 no dado de acerto é considerado acerto crítico."
    },
    {
      "nivel": 4,
      "nome": "SOBREVIVÊNCIA",
      "tipo": "passiva",
      "sourceTitle": "SOBREVIVÊNCIA",
      "desc": "O caçador consegue encontrar suprimentos facilmente enquanto estiver em um ambiente hostil."
    },
    {
      "nivel": 5,
      "nome": "IDENTIFICAR PERIGO",
      "tipo": "ativo",
      "sourceTitle": "IDENTIFICAR PERIGO [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "desc": "O caçador consegue identificar TODAS as criaturas hostis num raio de até 50m."
    },
    {
      "nivel": 5,
      "nome": "ATENÇÃO DA CAÇADA",
      "tipo": "passiva",
      "sourceTitle": "ATENÇÃO DA CAÇADA",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Extra: 1 ataque"
        },
        {
          "nivel": 8,
          "desc": "Extra: 2 ataques em inimigos que não agiram"
        }
      ],
      "desc": "O instinto aguçado do caçador permite realizar um ataque contra um inimigo que ainda não agiu neste turno, sem gastar ação. Funciona em alvos a até 5 metros. Neste nível, escolha entre Caçador de Monstros ou Caçador Espectral."
    },
    {
      "nivel": 6,
      "nome": "MARCA DO CAÇADOR",
      "tipo": "ativo",
      "sourceTitle": "MARCA DO CAÇADOR [1 ATIVAÇÃO DE LIMIAR POR ALVO]",
      "usos": "1 ATIVAÇÃO DE LIMIAR POR ALVO",
      "evolucoes": [
        {
          "nivel": 6,
          "desc": "Dano por marca: 1d4 | Limiar: 6 | Dano ao atingir limiar: 2d20"
        },
        {
          "nivel": 15,
          "desc": "Dano por marca: 2d4 | Limiar: 4 | Dano ao atingir limiar: 5d20"
        }
      ],
      "desc": "A cada golpe realizado com sucesso pelo caçador, fará com que o inimigo seja marcado com uma tatuagem de lâmina do local atingido. Inimigos com uma marca recebem 1d4 de dano adicional dos próximos ataques do caçador. Se um inimigo que já esteja marcado seja atacado novamente, sua marca ficará mais forte, portanto, causará 1d4 adicional. Ao atingir a décima marca, todas as tatuagens se juntam numa única região, determinada pelo local atingido pela última vez, agora além de causar 10d4 de dano adicional no alvo, seus ataques serão críticos nesta região. Não é possível acumular após chegar no valor de 10 marcas."
    },
    {
      "nivel": 7,
      "nome": "NAVALHA SANGRENTA",
      "tipo": "passiva",
      "sourceTitle": "NAVALHA SANGRENTA",
      "desc": "Cause 2 de dano de sangramento em qualquer um de seus ataques."
    },
    {
      "nivel": 8,
      "nome": "ATAQUE SEMI-CRÍTICO",
      "tipo": "passiva",
      "sourceTitle": "ATAQUE SEMI-CRÍTICO",
      "desc": "Agora, quando o caçador tirar 15 até 18 num movimento de ataque, será considerado um acerto semi-crítico. Um ataque semi-crítico causará 1 dado de dano adicional correspondente a arma."
    },
    {
      "nivel": 10,
      "nome": "SENTIDOS SOBRENATURAIS",
      "tipo": "passiva",
      "sourceTitle": "SENTIDOS SOBRENATURAIS",
      "evolucoes": [
        {
          "nivel": 10,
          "desc": "Raio: 8m | Extra: Detecta ocultos/invisíveis"
        },
        {
          "nivel": 15,
          "desc": "Raio: 15m | Extra: —"
        },
        {
          "nivel": 20,
          "desc": "Raio: 30m | Extra: Detecta também seres sobrenaturais"
        }
      ],
      "desc": "O caçador é dotado de percepção excepcional, capaz de detectar qualquer criatura oculta, mesmo invisíveis, num raio ao seu redor."
    },
    {
      "nivel": 12,
      "nome": "SABOR DO VENTO",
      "tipo": "ativo",
      "sourceTitle": "SABOR DO VENTO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "Ao erguer um dedo ao céu enquanto o vento sopra, o caçador percebe a presença de seres até 1 quilômetro de distância. Não revela identidade, apenas a origem do alvo."
    },
    {
      "nivel": 14,
      "nome": "AJUDA CRÍTICA",
      "tipo": "passiva",
      "sourceTitle": "AJUDA CRÍTICA",
      "desc": "Quando inflige um golpe semi-crítico ou crítico, o caçador ganha uma ação adicional completa neste turno."
    },
    {
      "nivel": 17,
      "nome": "CORTE PARALISANTE",
      "tipo": "ativo",
      "sourceTitle": "CORTE PARALISANTE [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "desc": "O caçador realiza um ataque que deixará o alvo atordoado até receber um ataque, ou até 4 turnos."
    },
    {
      "nivel": 20,
      "nome": "AGULHA NO PALHEIRO",
      "tipo": "passiva",
      "sourceTitle": "AGULHA NO PALHEIRO",
      "desc": "Após executar um ataque, uma lâmina etérea chamada “Lâmina da Destinação” se materializa instantaneamente no peito de todos os inimigos no campo de batalha (exceto o alvo original). Cada lâmina atinge o coração de cada alvo, infligindo o mesmo dano causado no original (CERTEIRO e dano REAL)."
    },
    {
      "nivel": 5,
      "nome": "MORFINA",
      "tipo": "passiva",
      "sourceTitle": "MORFINA",
      "subclasse": "Caçador de Monstros",
      "desc": "Cada um dos ataques do caçador deixa os membros de monstros dormentes. Ao atacar duas vezes num único local, fará com que a criatura perca temporariamente os movimentos daquela região."
    },
    {
      "nivel": 5,
      "nome": "DEFESA CONTRA SERES DAS PROFUNDEZAS",
      "tipo": "passiva",
      "sourceTitle": "DEFESA CONTRA SERES DAS PROFUNDEZAS",
      "subclasse": "Caçador de Monstros",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Defesa: +5 | CA: +2 | Extra: —"
        },
        {
          "nivel": 8,
          "desc": "Defesa: +10 | CA: +2 | Extra: —"
        },
        {
          "nivel": 14,
          "desc": "Defesa: +15 | CA: +2 | Extra: Se no combate só tiver monstros: dobra defesa e CA"
        }
      ],
      "desc": "Quando confrontado por pelo menos um MONSTRO, o caçador ganha defesa e CA adicionais que permanecem até o fim do combate."
    },
    {
      "nivel": 8,
      "nome": "MONSTRUOSIDADES",
      "tipo": "passiva",
      "sourceTitle": "MONSTRUOSIDADES",
      "subclasse": "Caçador de Monstros",
      "desc": "Monstros que são muito maiores que o caçador recebem o dobro de dano."
    },
    {
      "nivel": 14,
      "nome": "SABEDORIA",
      "tipo": "passiva",
      "sourceTitle": "SABEDORIA",
      "subclasse": "Caçador de Monstros",
      "desc": "Agora o jogador consegue decifrar a força de cada criatura considerada MONSTRO. Cada detalhe, cada minuciosidade, ponto fraco ou até mesmo poderes."
    },
    {
      "nivel": 14,
      "nome": "LÁBIA",
      "tipo": "ativo",
      "sourceTitle": "LÁBIA [1 VEZ POR MONSTRO]",
      "usos": "1 VEZ POR MONSTRO",
      "subclasse": "Caçador de Monstros",
      "desc": "Testes de persuasão contra monstros são certeiros."
    },
    {
      "nivel": 5,
      "nome": "AURA DO ESPECTRO",
      "tipo": "passiva",
      "sourceTitle": "AURA DO ESPECTRO",
      "subclasse": "Caçador Espectral",
      "desc": "As armas do caçador são envolvidas por uma aura verde, criando um elo com o portador. Todas as armas causam um dado extra de dano permanentemente."
    },
    {
      "nivel": 5,
      "nome": "CORRENTES DO ALÉM",
      "tipo": "passiva",
      "sourceTitle": "CORRENTES DO ALÉM",
      "subclasse": "Caçador Espectral",
      "desc": "Uma corrente espectral se manifesta nas extremidades das armas vinculadas. O caçador pode atrair seres a até 20 metros, puxando-os em sua direção. Inimigos puxados sofrem dano das armas ao se aproximarem."
    },
    {
      "nivel": 8,
      "nome": "OLHOS AFIADOS",
      "tipo": "passiva",
      "sourceTitle": "OLHOS AFIADOS",
      "subclasse": "Caçador Espectral",
      "desc": "A visão do caçador se aprimora, agora ele discerne instantaneamente se um inimigo sofre ferimentos graves ou leves."
    },
    {
      "nivel": 8,
      "nome": "PRISÃO ESPECTRAL",
      "tipo": "ativo",
      "sourceTitle": "PRISÃO ESPECTRAL [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "subclasse": "Caçador Espectral",
      "desc": "O caçador lança suas correntes para um alvo escolhido, elas o prendem por 3 turnos. Pode ser feita em qualquer distância e, se preferir, em mais de um alvo, caso tenha os usos necessários. No entanto, o alvo pode fazer um teste de resistência por turno (com dificuldade igual a 10+mod força do caçador)."
    },
    {
      "nivel": 14,
      "nome": "ESPECTRO DO ANOITECER",
      "tipo": "ativo",
      "sourceTitle": "ESPECTRO DO ANOITECER [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "subclasse": "Caçador Espectral",
      "desc": "O caçador conjura uma aura esverdeada e teleporta-se sobre o inimigo escolhido (sem restrição de distância). O golpe causa 8d6 + modificador de força de dano. Criaturas com ferimentos graves morrem instantaneamente. Se o alvo perecer, o caçador pode usar a habilidade novamente em outro inimigo sem gastar ação, causando o mesmo dano. Este efeito perdura enquanto eliminar alvos."
    }
  ],
  "vanguarda": [
    {
      "nivel": 1,
      "nome": "SINTONIA",
      "tipo": "passiva",
      "sourceTitle": "SINTONIA",
      "desc": "A utilização de armas nunca foi o ponto forte do vanguada, e devido a isto qualquer arma corpo-a-corpo que o utilizar, não causará mais que 1d12 de dano base (os efeitos das armas não são anulados)."
    },
    {
      "nivel": 1,
      "nome": "CORAGEM DE FERRO",
      "tipo": "ativo",
      "sourceTitle": "CORAGEM DE FERRO [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Usos: 2x desc. curto | +CA: +1 | Redução (mín): 20% (mín 2) | Duração: 2 turnos"
        },
        {
          "nivel": 3,
          "desc": "Usos: 2x desc. curto | +CA: +2 | Redução (mín): 25% (mín 3) | Duração: 2 turnos"
        },
        {
          "nivel": 7,
          "desc": "Usos: 2x desc. curto | +CA: +2 | Redução (mín): 30% (mín 5) | Duração: 3 turnos"
        },
        {
          "nivel": 10,
          "desc": "Usos: 2x desc. curto | +CA: +2 | Redução (mín): 35% (mín 6) | Duração: 3 turnos"
        },
        {
          "nivel": 13,
          "desc": "Usos: 3x desc. longo | +CA: +3 | Redução (mín): 40% (mín 7) | Duração: 3 turnos"
        },
        {
          "nivel": 20,
          "desc": "Usos: 3x desc. longo | +CA: +3 | Redução (mín): 50% (mín 10) | Duração: 4 turnos"
        }
      ],
      "desc": "Os sentidos do vanguarda se aguçam, aprimorando sua defesa de forma temporária. O vanguarda ganha 1 de armadura e recebe menos 20% de QUALQUER dano subsequente durante 2 turnos."
    },
    {
      "nivel": 1,
      "nome": "VIDA PERMANENTE",
      "tipo": "passiva",
      "sourceTitle": "VIDA PERMANENTE",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "HP/nível: A partir deste nível, +2"
        },
        {
          "nivel": 8,
          "desc": "HP/nível: A partir deste nível, apenas +3"
        }
      ],
      "desc": "O vanguarda ganha pontos de vida extra quando evoluir nos próximos níveis."
    },
    {
      "nivel": 2,
      "nome": "DANO CONSTANTE",
      "tipo": "passiva",
      "sourceTitle": "DANO CONSTANTE",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Dano adicional (mín): 5% HP máx (mín 2)"
        },
        {
          "nivel": 5,
          "desc": "Dano adicional (mín): 10% HP máx (mín 4)"
        },
        {
          "nivel": 10,
          "desc": "Dano adicional (mín): 15% HP máx (mín 5)"
        },
        {
          "nivel": 15,
          "desc": "Dano adicional (mín): 25% HP máx (mín 6)"
        },
        {
          "nivel": 20,
          "desc": "Dano adicional (mín): 25% HP máx (mín 8)"
        }
      ],
      "desc": "A força do vanguarda baseia-se em sua vida, causando dano adicional em todos os seus ataques armados ou marciais. O valor do dano adicional é igual a 5% de sua vida máxima, aumentando conforme seu nível."
    },
    {
      "nivel": 2,
      "nome": "ESPÍRITO COLOSSAL",
      "tipo": "passiva",
      "sourceTitle": "ESPÍRITO COLOSSAL",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Defesa: +5"
        },
        {
          "nivel": 8,
          "desc": "Defesa: +10"
        },
        {
          "nivel": 13,
          "desc": "Defesa: +15"
        }
      ],
      "desc": "Quando o vanguarda ficar com menos da metade de sua vida, ele receberá defesa até se recuperar."
    },
    {
      "nivel": 4,
      "nome": "ENCANTAMENTO DA VITALIDADE",
      "tipo": "ativo",
      "sourceTitle": "ENCANTAMENTO DA VITALIDADE [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "desc": "O vanguarda imbui sua arma ou mãos com energia vital. Seu próximo ataque ou magia converte o dano causado em cura para si mesmo. Não custa ação para ativar o encantamento."
    },
    {
      "nivel": 6,
      "nome": "ENCANTAMENTO DA INSPIRAÇÃO",
      "tipo": "ativo",
      "sourceTitle": "ENCANTAMENTO DA INSPIRAÇÃO[1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "O vanguarda fecha seus dois punhos e canaliza o encantamento da proteção. Sua energia se expande num raio de 5 metros por 3 turnos. Inimigos na área causam -5 de dano em qualquer ataque. Aliados na área se curam no valor de 5d4 por turno e recebem +2 de acerto para qualquer ação."
    },
    {
      "nivel": 7,
      "nome": "ENCANTAMENTO DA PROPAGAÇÃO",
      "tipo": "ativo",
      "sourceTitle": "ENCANTAMENTO DA PROPAGAÇÃO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "O vanguarda pisa seu pé no chão, invocando o encantamento da propagação. Aliados num raio de até 8m recebem os efeitos ativos da “CORAGEM DE FERRO” e futuramente da “ARMADURA LISA” por 3 turnos. Os valores dos efeitos são baseados exclusivamente nos atributos/nível do vanguarda."
    },
    {
      "nivel": 8,
      "nome": "ENCANTAMENTO REFLETOR",
      "tipo": "passiva",
      "sourceTitle": "ENCANTAMENTO REFLETOR",
      "evolucoes": [
        {
          "nivel": 8,
          "desc": "Pontos Necessários: 5 | Alcance: Até 3m em linha reta"
        },
        {
          "nivel": 16,
          "desc": "Pontos Necessários: Mínimo 4, máximo 8 | Alcance: Até 10m em linha reta"
        },
        {
          "nivel": 19,
          "desc": "Pontos Necessários: Sem limite | Alcance: Até 20m em linha reta"
        }
      ],
      "desc": "A cada ataque recebido, o vanguarda absorve 1 ponto VITAL. Ao atingir 5 pontos, carrega os punhos com toda a energia acumulada e libera no próximo ataque. O ataque é propagado em linha reta, numa distância de até 3m . O dano é igual ao total que absorveu."
    },
    {
      "nivel": 9,
      "nome": "ENCANTAMENTO DA PROTEÇÃO",
      "tipo": "ativo",
      "sourceTitle": "ENCANTAMENTO DA PROTEÇÃO [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 9,
          "desc": "Escudo: 10% da vida máxima | Extra: -"
        },
        {
          "nivel": 16,
          "desc": "Escudo: 15% da vida máxima | Extra: -"
        },
        {
          "nivel": 20,
          "desc": "Escudo: 20% da vida máxima | Extra: Aliados que encostarem no vanguarda também ficam protegidos pelo mesmo escudo."
        }
      ],
      "desc": "O Vanguarda bate no próprio peito e ativa o encantamento da proteção. Sua armadura é reforçada com uma fina camada mágica, capaz de absorver danos. A camada é um escudo sobreposto a vida, no valor de 10% de sua vida máxima."
    },
    {
      "nivel": 11,
      "nome": "ENCANTAMENTO DO SACRIFÍCIO",
      "tipo": "bonus",
      "sourceTitle": "ENCANTAMENTO DO SACRIFÍCIO [AÇÃO BÔNUS]",
      "usos": "AÇÃO BÔNUS",
      "desc": "Ao fazer um pequeno corte em sua mão, o vanguarda ativa o encantamento do sacrifício. Uma fina camada mágica sai de suas mãos e envolve um aliado à escolha. O mesmo aliado é curado, feridas grandes são fechadas e leves são cicatrizadas. O valor de cura é o mesmo valor de vida sacrificado pelo vanguarda, sendo de no mínimo 20 e máximo 100."
    },
    {
      "nivel": 12,
      "nome": "ENCANTAMENTO DA INVENCIBILIDADE",
      "tipo": "ativo",
      "sourceTitle": "ENCANTAMENTO DA INVENCIBILIDADE [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "Ao apontar seu dedo indicador para cima, o vanguarda sacrifica metade de sua vida atual e canaliza num escudo protetor, com o custo de sua vida atual. Enquanto o escudo durar, é imune a ataques furtivos e críticos. O escudo persiste por 2 turnos."
    },
    {
      "nivel": 14,
      "nome": "PROTEÇÃO DOS FRACOS",
      "tipo": "ativo",
      "sourceTitle": "PROTEÇÃO DOS FRACOS [3 VEZES POR DESCANSO CURTO]",
      "usos": "3 VEZES POR DESCANSO CURTO",
      "desc": "Quando um aliado num raio de 3 metros está prestes a ser atacado fisicamente, o vanguarda intervém como reação, protegendo-o completamente. Porém, absorve o DOBRO do dano em seu lugar."
    },
    {
      "nivel": 15,
      "nome": "ENCANTAMENTO DA DESTRUIÇÃO",
      "tipo": "ativo",
      "sourceTitle": "ENCANTAMENTO DA DESTRUIÇÃO [1 VEZ POR SEMANA]",
      "usos": "1 VEZ POR SEMANA",
      "desc": "Ao preparar seu punho, uma onda de energia começa a envolver o vanguarda, ativando o encantamento da destruição. Essa energia pode ser disparada com um movimento de soco, disparando numa cunha de luz que se estende por até 200 metros. O Espaço do ataque percorre 3x3. Ao atingir um alvo, causa 2d10 + 20% da vida total do vanguarda como dano mágico."
    },
    {
      "nivel": 16,
      "nome": "ENCANTAMENTO DA PROVOCAÇÃO",
      "tipo": "ativo",
      "sourceTitle": "ENCANTAMENTO DA PROVOCAÇÃO [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "desc": "O vanguarda provoca seus inimigos com palavras afiadas e venenosas. Alvos provocados são obrigados a focar exclusivamente no vanguarda por 2 turnos."
    },
    {
      "nivel": 17,
      "nome": "RECUPERAÇÃO",
      "tipo": "passiva",
      "sourceTitle": "RECUPERAÇÃO",
      "desc": "Após cada batalha, o vanguarda precisa de apenas 2 horas de descanso para restaurar sua vida por completo. Ferimentos graves podem não curar totalmente, mas deixarão de doer."
    },
    {
      "nivel": 18,
      "nome": "ARMADURA LISA",
      "tipo": "passiva",
      "sourceTitle": "ARMADURA LISA",
      "desc": "Quando um inimigo acerta um golpe crítico físico no vanguarda, é surpreendido: o atacante tropeça em algo e fica atordoado por 1 turno."
    },
    {
      "nivel": 20,
      "nome": "TRANSMUTAÇÃO DO COLOSSO",
      "tipo": "ativo",
      "sourceTitle": "TRANSMUTAÇÃO DO COLOSSO [1 VEZ POR SEMANA]",
      "usos": "1 VEZ POR SEMANA",
      "desc": "O princípio de evolução é comumente a mesma para todas as criaturas, menos para o vanguarda. Ele consegue avançar meses, senão anos, de sua vida para aumentar ainda mais suas características vitais, de forma temporária. Ao carregar por aproximadamente 1 ação completa, seu corpo, assim como sua mente, evoluem bruscamente. Devido a isto, ele dobra todos seus atributos e recebe 200 de vida bônus. Nitidamente seu corpo, cabelos e pensamentos também vão evoluir e avançar, mesmo que temporariamente. O vanguarda consegue se manter nessa forma por 5 turnos, porém, com muito treinamento, este poder pode ser utilizado por muito mais tempo. Contudo, ao acabar a transformação, além dos atributos e vidas perdidas, sua classe de armadura será reduzida a 0 até o fim do combate, devido à exposição de um poder destrutivo gigantesco."
    },
    {
      "nivel": 5,
      "nome": "BLINDAGEM INICIAL",
      "tipo": "ativo",
      "sourceTitle": "BLINDAGEM INICIAL [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "subclasse": "Vanguarda Exo-Combatente",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Usos: 1x desc. curto | CA: +2 | Dano adicional: +1d4 | Extra: —"
        },
        {
          "nivel": 8,
          "desc": "Usos: 2x desc. curto | CA: +3 | Dano adicional: +2d4 | Extra: Reduz mobilidade do vanguarda pela metade"
        },
        {
          "nivel": 14,
          "desc": "Usos: 3x desc. curto | CA: +5 | Dano adicional: +4d4 | Extra: Mobilidade reduzida a 2"
        }
      ],
      "desc": "Um exoesqueleto mágico e compacto envolve o corpo do vanguarda, concedendo +2 de CA e +1d4 de dano físico adicional em seus golpes físicos. Permanece ativo até que o vanguarda sofra atordoamento ou até o fim do combate. Ele pode escolher que nível de blindagem usar (desbloqueadas por nível)."
    },
    {
      "nivel": 8,
      "nome": "IMÓVEL",
      "tipo": "passiva",
      "sourceTitle": "IMÓVEL",
      "subclasse": "Vanguarda Exo-Combatente",
      "desc": "Para cada ponto de mobilidade sacrificado pela blindagem, o vanguarda regenera 1d4 de vida por turno. Quanto menos se move, maior sua cura."
    },
    {
      "nivel": 5,
      "nome": "VIDA DEFENSIVA",
      "tipo": "passiva",
      "sourceTitle": "VIDA DEFENSIVA",
      "subclasse": "Vanguarda Colossal",
      "desc": "O atributo defesa do vanguarda cresce, ganhando um adicional igual ao seu modificador de constituição."
    },
    {
      "nivel": 5,
      "nome": "USOS ILIMITADOS",
      "tipo": "passiva",
      "sourceTitle": "USOS ILIMITADOS",
      "subclasse": "Vanguarda Colossal",
      "desc": "Todas as habilidades básicas atuais e posteriores do vanguarda recebem permanentemente +1 uso adicional."
    },
    {
      "nivel": 8,
      "nome": "DEFESA PRÓPRIA",
      "tipo": "passiva",
      "sourceTitle": "DEFESA PRÓPRIA",
      "subclasse": "Vanguarda Colossal",
      "desc": "O vanguarda pode anular efeitos de itens mágicos baseado em seu nível de defesa:"
    },
    {
      "nivel": 14,
      "nome": "TESTE DE VITALIDADE",
      "tipo": "passiva",
      "sourceTitle": "TESTE DE VITALIDADE",
      "subclasse": "Vanguarda Colossal",
      "desc": "O vanguarda aplica seu modificador de constituição como bônus em qualquer teste que envolva força, carisma, magia, inteligência ou sorte."
    }
  ],
  "monge": [
    {
      "nivel": 1,
      "nome": "BASE",
      "tipo": "passiva",
      "sourceTitle": "BASE",
      "desc": "O monge pode adotar uma base de combate própria, que pode proporcionar equilíbrio, firmeza e a força necessária tanto para aplicar golpes quanto para bloqueio e esquiva. O requisito para dominar seu estilo próprio é a meditação, a lista abaixo demonstra a progressão. INÍCIO: De início, o monge deverá adotar uma posição de combate permanentemente, após isso, ele deverá utilizar esta mesma posição durante todo combate que enfrentar, para conseguir dominar suas vantagens. VANTAGENS: Inicialmente, sua base dará equilíbrio em qualquer superfície de combate, impossibilitando deslizes, rasteiras e derivados. O monge também poderá se esquivar de certos ataques físicos de inimigos. A esquiva funciona da seguinte forma: Para desviar, o jogador terá que ter recebido um ataque do inimigo, para o monge conseguir ler seus movimentos. Após ter recebido o golpe, ele poderá desviar do próximo ataque deste inimigo. Contudo, para desviar uma segunda vez de um ataque deste inimigo, o jogador terá que girar 1d20, tendo um resultado maior que o dado de acerto deste alvo, para ter sucesso. Não é possível desviar mais de duas vezes de um único inimigo, ao menos neste momento. O usuário não pode se esquivar de ataques críticos e eles deverão ser unicamente físicos. Ao longo de sua evolução, todos os \"Mas, Poréns, No entanto\" das esquivas serão anulados. EVOLUÇÃO: O jogador deverá determinar seus verdadeiros objetivos com esta base, sendo força, defesa e agilidade. Após determinar isso, o jogador deverá falar com o mestre sobre o que gostaria que sua base dasse de vantagem, considerando as 3 opções. O jogador não chegará no que deseja inicialmente, será de acordo com sua evolução de nível."
    },
    {
      "nivel": 1,
      "nome": "ARTISTA MARCIAL",
      "tipo": "passiva",
      "sourceTitle": "ARTISTA MARCIAL",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Dano adicional: +1d4"
        },
        {
          "nivel": 4,
          "desc": "Dano adicional: +2d4"
        },
        {
          "nivel": 8,
          "desc": "Dano adicional: +3d4"
        },
        {
          "nivel": 12,
          "desc": "Dano adicional: +3d6"
        },
        {
          "nivel": 16,
          "desc": "Dano adicional: +4d6"
        }
      ],
      "desc": "O monge é um especialista em combates físicos com seu corpo, e por conta disso, o monge ganha uma vantagem em golpes marciais. O monge ganha 1d4 de dano adicional em qualquer um de seus ataques físicos."
    },
    {
      "nivel": 1,
      "nome": "ESSÊNCIA",
      "tipo": "bonus",
      "sourceTitle": "ESSÊNCIA",
      "desc": "O monge pode realizar uma ação marcial (socos ou chutes, ou habilidades marciais) como ação bônus."
    },
    {
      "nivel": 2,
      "nome": "CHI",
      "tipo": "ativo",
      "sourceTitle": "CHI",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Ataques de KI por turno: 1"
        },
        {
          "nivel": 7,
          "desc": "Ataques de KI por turno: 2"
        },
        {
          "nivel": 20,
          "desc": "Ataques de KI por turno: 3"
        }
      ],
      "desc": "O monge possui um poder espiritual interno muito forte, chamado de CHI. Ataques de CHI só podem ser utilizados uma vez por turno e não consomem ações."
    },
    {
      "nivel": 2,
      "nome": "[CHI] CONCENTRAÇÃO PROFANA",
      "tipo": "ativo",
      "sourceTitle": "[CHI] CONCENTRAÇÃO PROFANA [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "desc": "O monge junta suas duas mãos e fica mais concentrado. Qualquer ação que for realizada nos próximos 2 turnos terá mais 2 de acerto."
    },
    {
      "nivel": 2,
      "nome": "RAPIDEZ",
      "tipo": "passiva",
      "sourceTitle": "RAPIDEZ",
      "desc": "O monge soma seu modificador de destreza como dano bônus em qualquer ataque físico."
    },
    {
      "nivel": 3,
      "nome": "[CHI] DISPARO DE KI",
      "tipo": "ativo",
      "sourceTitle": "[CHI] DISPARO DE KI",
      "evolucoes": [
        {
          "nivel": 3,
          "desc": "Usos: 2x desc. longo | Dano: 2d6 + mod destreza | Extra: O alvo recebe mais 2 de dano em todos os próximos ataques por 2 turnos."
        },
        {
          "nivel": 6,
          "desc": "Usos: 2x desc. longo | Dano: 3d6 + mod destreza | Extra: +4 dano"
        },
        {
          "nivel": 10,
          "desc": "Usos: 3x desc. longo | Dano: 4d6 + mod destreza | Extra: +5 dano por 3 turnos"
        },
        {
          "nivel": 14,
          "desc": "Usos: 3x desc. longo | Dano: 4d8 + mod destreza | Extra: 2 disparos por uso"
        },
        {
          "nivel": 20,
          "desc": "Usos: 3x desc. longo | Dano: 6d8 + mod destreza | Extra: —"
        }
      ],
      "desc": "O monge pode soltar um poder de aura branca provinda de suas duas mãos, vindo diretamente de sua energia interior. Esse poder pode ser atingido em apenas um alvo, e causa o equivalente a 2d6+mod destreza de dano mágico. O alvo atingido tem seu interior ferido, ficando mais frágil, recebendo mais 2 de dano em qualquer ataque pelo próximo turno."
    },
    {
      "nivel": 3,
      "nome": "SOCO BAIXO",
      "tipo": "ativo",
      "sourceTitle": "SOCO BAIXO [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "desc": "O monge soca seu inimigo numa região inferior, próxima ao abdômen, causando 1d4 de dano adicional. O alvo fica nauseado por 1 turno, não podendo se movimentar muito."
    },
    {
      "nivel": 4,
      "nome": "[CHI] PROTEÇÃO DE CHI",
      "tipo": "ativo",
      "sourceTitle": "[CHI] PROTEÇÃO DE CHI",
      "evolucoes": [
        {
          "nivel": 4,
          "desc": "Usos: 1x desc. longo | CA: +3 | Duração: 2 turnos"
        },
        {
          "nivel": 7,
          "desc": "Usos: 1x desc. longo | CA: +3 | Duração: 3 turnos"
        },
        {
          "nivel": 11,
          "desc": "Usos: 2x desc. longo | CA: +4 | Duração: 3 turnos"
        },
        {
          "nivel": 18,
          "desc": "Usos: 1x desc. curto | CA: +5 | Duração: Resto do combate"
        }
      ],
      "desc": "O monge envolve seu corpo com uma camada protetora de Ki, aumentando significativamente sua CA temporariamente."
    },
    {
      "nivel": 4,
      "nome": "SOCO ALTO",
      "tipo": "ativo",
      "sourceTitle": "SOCO ALTO [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "desc": "O monge golpeia uma região próxima a cabeça do adversário, infringindo 1d8 de dano adicional. O inimigo realiza um teste de resistência, e caso falhe ficará atordoado por 1 turno."
    },
    {
      "nivel": 5,
      "nome": "CRÍTICO APRIMORADO",
      "tipo": "passiva",
      "sourceTitle": "CRÍTICO APRIMORADO",
      "desc": "Agora o monge consegue acertar um golpe crítico tirando apenas 19 no dado de acerto."
    },
    {
      "nivel": 5,
      "nome": "CHUTE ALTO",
      "tipo": "ativo",
      "sourceTitle": "CHUTE ALTO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "O monge chuta na região da cabeça do adversário, causando 2d6 de dano adicional e infringindo atordoamento por 1 turno neste alvo. No entanto, o acerto desta habilidade é reduzido em 1."
    },
    {
      "nivel": 5,
      "nome": "CHUTE BAIXO",
      "tipo": "ativo",
      "sourceTitle": "CHUTE BAIXO [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "desc": "O chute baixo atinge a região das costelas adversárias, causando 1d4+2 de dano adicional. Esta habilidade pode quebrar algumas costelas do inimigo caso seja crítico."
    },
    {
      "nivel": 6,
      "nome": "[CHI] FLIP KICK",
      "tipo": "ativo",
      "sourceTitle": "[CHI] FLIP KICK [1 VEZES POR DESCANSO CURTO]",
      "usos": "1 VEZES POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 6,
          "desc": "Dano: 4d6 + mod destreza | Arremesso: 7m | Extra: —"
        },
        {
          "nivel": 11,
          "desc": "Dano: 5d6 + mod destreza | Arremesso: 7m | Extra: Consegue atingir até 2 alvos próximos de uma vez"
        }
      ],
      "desc": "O monge impulsiona suas pernas, fazendo um movimento acrobático anormal, causando um dano intenso no alvo atingido. Esta habilidade causa 4d6+mod destreza e arremessa o alvo para 7 metros de distância, causando mais dano dependendo da região onde cair."
    },
    {
      "nivel": 6,
      "nome": "RASTEIRA",
      "tipo": "ativo",
      "sourceTitle": "RASTEIRA [2 VEZES POR DESCANSO CURTO, 1 VEZ POR INIMIGO]",
      "usos": "2 VEZES POR DESCANSO CURTO, 1 VEZ POR INIMIGO",
      "desc": "Quando um inimigo tentar lhe infligir um golpe alto, o monge poderá usar uma rasteira, interceptando o ataque e derrubando o inimigo."
    },
    {
      "nivel": 8,
      "nome": "[CHI] KEITEN ESPIRAL",
      "tipo": "ativo",
      "sourceTitle": "[CHI] KEITEN ESPIRAL [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 8,
          "desc": "Raio: 1m | Dano: 6d8 + mod magia | Empurrão: 1m"
        },
        {
          "nivel": 15,
          "desc": "Raio: 2m | Dano: 10d8 + mod magia | Empurrão: 2m"
        }
      ],
      "desc": "O monge concentra seu chi, e num movimento giratório ele o dispersa, causando dano em todos os alvos em sua volta. O dano causado é igual a 6d6+mod magia. Inimigos atingidos são empurrados 1m de distância."
    },
    {
      "nivel": 8,
      "nome": "IMPRESSÃO DE ATRIBUTOS",
      "tipo": "passiva",
      "sourceTitle": "IMPRESSÃO DE ATRIBUTOS",
      "desc": "Ao ser atacado, o monge identifica instantaneamente o nível do atacante."
    },
    {
      "nivel": 9,
      "nome": "[CHI] UPPERCUT",
      "tipo": "ativo",
      "sourceTitle": "[CHI] UPPERCUT [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 9,
          "desc": "Dano adicional: 4d8 | Altura: 10m | Inconsciente: 2 turnos"
        },
        {
          "nivel": 16,
          "desc": "Dano adicional: 5d8 | Altura: 15m | Inconsciente: 3 turnos"
        }
      ],
      "desc": "O monge concentra o chi nos seus punhos e rapidamente realiza um ataque no queixo do inimigo, fazendo-o voar até 10 metros de altura. O inimigo recebe 4d8 de dano adicional. O alvo fica inconsciente durante 2 turnos após a queda."
    },
    {
      "nivel": 10,
      "nome": "[CHI] VITALIDADE",
      "tipo": "ativo",
      "sourceTitle": "[CHI] VITALIDADE [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "O monge canaliza seu Chi interior, impulsionando sua corrente sanguínea, fazendo com que ele se cure no valor de 2d10 pelos próximos 3 turnos."
    },
    {
      "nivel": 12,
      "nome": "TORMENTOR STRIKES",
      "tipo": "ativo",
      "sourceTitle": "TORMENTOR STRIKES [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 12,
          "desc": "Socos: 2"
        },
        {
          "nivel": 18,
          "desc": "Socos: 3"
        }
      ],
      "desc": "O monge infringe uma onda de 2 socos normais em um alvo. Conta como um único ataque."
    },
    {
      "nivel": 13,
      "nome": "[CHI] BARREIRA DE CHI",
      "tipo": "ativo",
      "sourceTitle": "[CHI] BARREIRA DE CHI [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "desc": "O monge envolve o corpo de um aliado próximo com uma barreira condensada de chi, podendo interceptar qualquer ataque inimigo. Pode ser utilizada em uma reação."
    },
    {
      "nivel": 13,
      "nome": "THUNDERCLAP",
      "tipo": "ativo",
      "sourceTitle": "THUNDERCLAP [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 13,
          "desc": "Raio: 5m | Extra: Atordoa + sangramento 2 turnos"
        },
        {
          "nivel": 20,
          "desc": "Raio: 15m | Extra: -"
        }
      ],
      "desc": "O monge utiliza grande parte de sua força normal para realizar uma palmada, capaz de ensurdecer alvos próximos por 2 turnos numa área de 5m. Pode infringir sangramento interno nos ouvidos dos adversários atingidos."
    },
    {
      "nivel": 15,
      "nome": "[CHI] LIBERAÇÃO DO CHI",
      "tipo": "ativo",
      "sourceTitle": "[CHI] LIBERAÇÃO DO CHI [1 VEZ POR SEMANA]",
      "usos": "1 VEZ POR SEMANA",
      "desc": "O monge exala totalmente o poder de seu chi, fazendo com que uma pequena aura branca fique em sua volta. Quando este poder estiver ativado, o monge vai dobrar todos os seus modificadores de atributo. Dura 4 turnos."
    },
    {
      "nivel": 17,
      "nome": "BROKEN SKULL",
      "tipo": "passiva",
      "sourceTitle": "BROKEN SKULL",
      "desc": "Ataques desferidos na cabeça de inimigos causam 3d4 de dano adicional."
    },
    {
      "nivel": 17,
      "nome": "EXHAUSTER",
      "tipo": "passiva",
      "sourceTitle": "EXHAUSTER",
      "desc": "Ataques críticos deixam inimigos sem ar durante 1 turno, não podendo realizar nenhuma ação."
    },
    {
      "nivel": 19,
      "nome": "WINDFLOW [PASSIVA]",
      "tipo": "passiva",
      "sourceTitle": "WINDFLOW [PASSIVA]",
      "desc": "Passivamente o Chi do monge envolve seu corpo, criando uma espécie de escudo natural. A cada descanso curto, recebe um escudo sobreposto à vida do monge, de valor 30, que pode bloquear qualquer tipo de dano."
    },
    {
      "nivel": 19,
      "nome": "[CHI] CROSSPUNCH",
      "tipo": "ativo",
      "sourceTitle": "[CHI] CROSSPUNCH [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "O monge encanta seus braços com seu chi interior, disparando uma onda de ar comprimido em linha reta, causando 5d10 de dano em todos os alvos atingidos."
    },
    {
      "nivel": 20,
      "nome": "[CHI] AIR PRESSURE [PASSIVA]",
      "tipo": "passiva",
      "sourceTitle": "[CHI] AIR PRESSURE [PASSIVA]",
      "desc": "Agora os ataques do monge movimentam o ar, causando uma pressão intensa em cada um de seus ataques. A pressão no ar causa metade do dano de seus socos e pode atingir múltiplos alvos alinhados, de até 15 metros de distância."
    },
    {
      "nivel": 5,
      "nome": "LEVEZA DA CORRENTEZA",
      "tipo": "passiva",
      "sourceTitle": "LEVEZA DA CORRENTEZA",
      "subclasse": "Monge das Águas",
      "desc": "Os ataques do monge diminuem a locomoção dos alvos em 1 de forma acumulativa, até chegar a 1 de deslocamento. Após atingir o limite, estes alvos perdem 1 ação permanentemente no combate."
    },
    {
      "nivel": 5,
      "nome": "APRENDIZ DA ÁGUA",
      "tipo": "passiva",
      "sourceTitle": "APRENDIZ DA ÁGUA",
      "subclasse": "Monge das Águas",
      "desc": "O monge se acostumou com o fluxo da água e agora consegue suportar até 4 horas submerso. A água também não atrapalha a sua mobilidade."
    },
    {
      "nivel": 8,
      "nome": "O OCEANO",
      "tipo": "bonus",
      "sourceTitle": "O OCEANO [1 VEZ POR DESCANSO LONGO, AÇÃO BÔNUS]",
      "usos": "1 VEZ POR DESCANSO LONGO, AÇÃO BÔNUS",
      "subclasse": "Monge das Águas",
      "desc": "O monge junta seu conhecimento sobre o fluxo da água (utilizando uma ação bônus). Após isso, dobre seu deslocamento e ganhe uma ação completa adicional por 2 turnos."
    },
    {
      "nivel": 8,
      "nome": "FLUXO INFERIOR [PASSIVA]",
      "tipo": "passiva",
      "sourceTitle": "FLUXO INFERIOR [PASSIVA]",
      "subclasse": "Monge das Águas",
      "desc": "O monge agora consegue correr enquanto está em cima da água, utilizando uma fina camada de CHI em seus pés."
    },
    {
      "nivel": 8,
      "nome": "[CHI] DISPARO DE KI [APRIMORAMENTO PASSIVO]",
      "tipo": "passiva",
      "sourceTitle": "[CHI] DISPARO DE KI [APRIMORAMENTO PASSIVO]",
      "subclasse": "Monge das Águas",
      "desc": "O peso deste poder aumentou por conta do fluxo de água que percorre pelo CHI interior do monge. Ao atingir um inimigo com esta habilidade, atordoe-o por 1 turno. Alvos já atordoados são jogados a 1d20 metros de distância, recebendo 2d4 de dano adicional de concussão caso atinjam alguma superfície."
    },
    {
      "nivel": 14,
      "nome": "HIDROSFERA",
      "tipo": "passiva",
      "sourceTitle": "HIDROSFERA",
      "subclasse": "Monge das Águas",
      "desc": "O primeiro ataque do monge no combate é encantado pelo fluxo de água, privando o alvo atingido de todos os seus atributos por 2d4 turnos. CA e defesa permanecem inalterados."
    },
    {
      "nivel": 5,
      "nome": "SENSO DE PRESERVAÇÃO [PASSIVA]",
      "tipo": "passiva",
      "sourceTitle": "SENSO DE PRESERVAÇÃO [PASSIVA]",
      "subclasse": "Monge Naturalista",
      "desc": "O monge, após profunda meditação, alcançou um estado em que compreende a natureza como sua própria vida, percebendo a menor das anormalidades na mesma. Enquanto estiver em planícies, florestas ou em qualquer área natural torna-se capaz de perceber qualquer ataque ou movimento furtivo à sua volta em um raio de 10 metros."
    },
    {
      "nivel": 5,
      "nome": "DEDUÇÃO",
      "tipo": "ativo",
      "sourceTitle": "DEDUÇÃO [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "subclasse": "Monge Naturalista",
      "desc": "Respirando calmamente e atendo-se aos sons do vento, dos pequenos animais e das plantas o monge entra em um estado de concentração profunda e suave ao mesmo tempo. Prevê o próximo ataque de seu oponente, podendo utilizar uma ação extra para desviar ou interceptar, também é possível atacá-lo, porém o uso do dado de acerto será necessário."
    },
    {
      "nivel": 8,
      "nome": "DESBRAVADOR DE CAMINHOS [PASSIVA]",
      "tipo": "passiva",
      "sourceTitle": "DESBRAVADOR DE CAMINHOS [PASSIVA]",
      "subclasse": "Monge Naturalista",
      "desc": "Não importa o ambiente em que o monge esteja, mesmo que seja desconhecido, o monge é capaz de utilizá-lo a seu favor da melhor forma possível. Receba mais um dado de acerto para qualquer ação de ataque que se interaja com o terreno."
    },
    {
      "nivel": 8,
      "nome": "MATE OU SEJA MORTO",
      "tipo": "ativo",
      "sourceTitle": "MATE OU SEJA MORTO [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "subclasse": "Monge Naturalista",
      "desc": "Como um predador observando uma presa, o monge torna-se capaz de ler as mais pequenas mudanças no comportamento do inimigo seja um desvio de olhar, uma veia saltando, músculos retendo ou qualquer outra coisa. Caso acerte seu alvo neste estado ataque novamente, máximo de 3 ataques. Um erro neste estado será considerado erro crítico."
    },
    {
      "nivel": 14,
      "nome": "PREDADOR",
      "tipo": "ativo",
      "sourceTitle": "PREDADOR [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "subclasse": "Monge Naturalista",
      "desc": "O caçador pode virar a presa caso o mesmo esteja confiante em sua força ou a \"presa\" seja mais esperta. O monge entende este conceito e não perde a calma em frente a seus inimigos, podendo redirecionar a direção de um ataque adversário com um leve toque nos pulsos do mesmo, podendo quebrá-los a depender da intensidade do golpe."
    },
    {
      "nivel": 14,
      "nome": "[CHI] CRIAÇÃO",
      "tipo": "passiva",
      "sourceTitle": "[CHI] CRIAÇÃO",
      "subclasse": "Monge Naturalista",
      "desc": "O monge Infunde seu chi no solo o propagando em uma área de até 20 metros, criando grama ou pequenas árvores neste local."
    }
  ],
  "necromante": [
    {
      "nivel": 1,
      "nome": "CANALISADOR",
      "tipo": "passiva",
      "sourceTitle": "CANALISADOR",
      "desc": "O necromante depende de um item canalizador (livro, cajado, tomo, pergaminho) para moldar suas magias com precisão. Sem canalizador, ele ainda pode lançar necromancia, porém de maneira desordenada e imprevisível — deve consultar a tabela NECRO (1d100) para determinar os resultados. Além disso, ele pode utilizar apenas algumas magias diárias. Além desse limite também ocasionará na magia descontrolada. Magias diárias por nível:"
    },
    {
      "nivel": 1,
      "nome": "NECROMANCIA VITAL",
      "tipo": "passiva",
      "sourceTitle": "NECROMANCIA VITAL",
      "desc": "O necromante não precisa se alimentar nem ingerir qualquer tipo de líquido para viver. Poções de vida convencionais causam DANO ao necromante, equivalente à cura que proporcionariam. Por outro lado, poções corrompidas e venenos o CURAM."
    },
    {
      "nivel": 1,
      "nome": "CORROMPER",
      "tipo": "ativo",
      "sourceTitle": "CORROMPER [1 AÇÃO COMPLETA OU 3 MINUTOS]",
      "usos": "1 AÇÃO COMPLETA OU 3 MINUTOS",
      "desc": "O necromante pode lançar sua influência sombria sobre poções, corrompendo seu conteúdo e invertendo seus efeitos."
    },
    {
      "nivel": 1,
      "nome": "REANIMAR PARTES",
      "tipo": "bonus",
      "sourceTitle": "REANIMAR PARTES [AÇÃO BÔNUS]",
      "usos": "AÇÃO BÔNUS",
      "desc": "O necromante consegue preencher um pequeno pedaço de carne, ou uma parte pútrida de corpo, com magia negra, reanimando-o. Consegue reanimar mãos, pés, cabeças ou qualquer outra parte decepada de um corpo."
    },
    {
      "nivel": 1,
      "nome": "FOGO NEGRO",
      "tipo": "passiva",
      "sourceTitle": "FOGO NEGRO",
      "desc": "O necromante consegue profanar o fogo com sua influência direta do submundo, tornando-o negro. O fogo negro causa 1d10+magia de dano necrótico."
    },
    {
      "nivel": 1,
      "nome": "VINGANÇA DO FOGO",
      "tipo": "reacao",
      "sourceTitle": "VINGANÇA DO FOGO [REAÇÃO]",
      "usos": "REAÇÃO",
      "desc": "Quando atacado por qualquer fonte, o necromante pode apontar o dedo indicador para o agressor. O inimigo é consumido por uma combustão de fogo escuro, sofrendo 1d12 de dano mágico."
    },
    {
      "nivel": 2,
      "nome": "ARMADURA DE OSSOS",
      "tipo": "bonus",
      "sourceTitle": "ARMADURA DE OSSOS [AÇÃO BÔNUS]",
      "usos": "AÇÃO BÔNUS",
      "desc": "O necromante cria em si ou em um de seus aliados uma armadura feita de ossos unidos por energia negativa, que protege no valor de 1d12+magia."
    },
    {
      "nivel": 2,
      "nome": "ENFRAQUECIMENTO CORPORAL",
      "tipo": "ativo",
      "sourceTitle": "ENFRAQUECIMENTO CORPORAL [1 VEZ POR INIMIGO NO COMBATE]",
      "usos": "1 VEZ POR INIMIGO NO COMBATE",
      "desc": "O necromante utiliza de seus conhecimentos da vida para amaldiçoar seres, enfraquecendo sua intrincada rede de carne e ossos. Consegue reduzir a força de um único alvo por 3 turnos, amolecendo seus músculos, fazendo-o perder 3 de armadura e receber 1d8+magia de dano."
    },
    {
      "nivel": 2,
      "nome": "SUFOCAMENTO RÁPIDO",
      "tipo": "passiva",
      "sourceTitle": "SUFOCAMENTO RÁPIDO",
      "desc": "O necromante estende a mão e conjura duas mãos negras que iniciam um estrangulamento num inimigo por 2 turnos. Durante esse período, o alvo sofre 1d6 + magia de dano necrótico por turno e fica incapaz de se mover. Alcance: 8m. Não funciona em gigantes ou colossais."
    },
    {
      "nivel": 3,
      "nome": "REVIVER SER INANIMADO",
      "tipo": "passiva",
      "sourceTitle": "REVIVER SER INANIMADO",
      "desc": "O necromante pode trazer um morto de volta à vida como servo leal por 6 horas. O processo leva 30 minutos (instantâneo com água abundante, como um rio). Os valores de atributos para “Ser inanimado” se encontra na tabela de monstros."
    },
    {
      "nivel": 3,
      "nome": "PROFANAÇÃO SUPREMA",
      "tipo": "passiva",
      "sourceTitle": "PROFANAÇÃO SUPREMA",
      "desc": "O necromante evoca uma chama verde infernal, que causa 6d4 + magia de dano necrótico. Se o alvo falhar no teste de resistência (dificuldade 12), fica sob controle do necromante por 3 turnos, sofrendo 1d4 de veneno por turno. Inimigos controlados não podem atacar a si mesmos e só podem usar ações básicas."
    },
    {
      "nivel": 3,
      "nome": "ÁCIDO PÚTRIDO",
      "tipo": "ativo",
      "sourceTitle": "ÁCIDO PÚTRIDO [ATAQUE CERTEIRO, NÃO CONTA COMO MAGIA]",
      "usos": "ATAQUE CERTEIRO, NÃO CONTA COMO MAGIA",
      "desc": "O necromante lança substância corrosiva no inimigo, causando 2 + inteligência de dano contínuo pelo combate, de forma cumulativa."
    },
    {
      "nivel": 4,
      "nome": "COMUNICAÇÃO NECRÓTICA",
      "tipo": "passiva",
      "sourceTitle": "COMUNICAÇÃO NECRÓTICA",
      "desc": "O necromante já consegue se comunicar com aqueles que não pertencem ao mundo dos vivos. Ele pode pedir informações e orientações com almas próximas, conversar com demônios e criaturas do submundo."
    },
    {
      "nivel": 4,
      "nome": "MEDO",
      "tipo": "passiva",
      "sourceTitle": "MEDO",
      "desc": "O necromante, com um simples olhar, consegue causar calafrios na espinha dos seres. Consegue: Amedrontar pequenos seres, afastar médios seres e arrepiar grandes seres."
    },
    {
      "nivel": 4,
      "nome": "EXPLOSÃO DE VENENO",
      "tipo": "ativo",
      "sourceTitle": "EXPLOSÃO DE VENENO [ATAQUE CERTEIRO, 1 VEZ POR COMBATE]",
      "usos": "ATAQUE CERTEIRO, 1 VEZ POR COMBATE",
      "desc": "O necromante lança uma esfera de energia necromântica que explode ao impacto, causando 3d6 + magia de dano mágico num raio de 4x4. A região permanece envenenada por 2 turnos, infligindo dano fixo equivalente ao anterior."
    },
    {
      "nivel": 5,
      "nome": "ALMA CINTILANTE",
      "tipo": "passiva",
      "sourceTitle": "ALMA CINTILANTE",
      "desc": "O necromante pode preservar a alma de um recém-morto em um frasco, pronta para ser usada em rituais e magias futuras."
    },
    {
      "nivel": 6,
      "nome": "REVOADA DAS SOMBRAS",
      "tipo": "ativo",
      "sourceTitle": "REVOADA DAS SOMBRAS [1 VEZ POR DIA]",
      "usos": "1 VEZ POR DIA",
      "desc": "O necromante convoca 10 criaturas aladas sombrias que atacam os inimigos designados, causando 1d6 de dano cada. Após o ataque, as criaturas se dissipam."
    },
    {
      "nivel": 6,
      "nome": "LACAIO FUNESTO",
      "tipo": "passiva",
      "sourceTitle": "LACAIO FUNESTO",
      "desc": "O necromante cria um esqueleto servo permanente (15 HP, 8 CA). Pode ser equipado com armas e armaduras. Morre apenas se reduzido a cinzas, podendo ser revivido com o ritual de “reviver ser inanimado”, juntamente com uma alma de um ser qualquer."
    },
    {
      "nivel": 7,
      "nome": "MÃOS PÚTRIDAS",
      "tipo": "ativo",
      "sourceTitle": "MÃOS PÚTRIDAS [ATAQUE CERTEIRO]",
      "usos": "ATAQUE CERTEIRO",
      "desc": "O necromante faz várias mãos mortas-vivas surgirem do solo, agarrando as pernas do alvo e imobilizando-o por 4 turnos. A cada turno, o alvo tenta resistir (dificuldade 4+mod inteligência). Caso falhe, recebe 5d4 de dano e mantém a imobilização."
    },
    {
      "nivel": 7,
      "nome": "BOLA DE FOGO NEGRO",
      "tipo": "ativo",
      "sourceTitle": "BOLA DE FOGO NEGRO [4 VEZES POR DIA]",
      "usos": "4 VEZES POR DIA",
      "desc": "O necromante evoca uma gigantesca bola de fogo negra que causa temor em todos os presentes pela conjuração. O impacto causa 4d12 + magia de dano necromântico no alvo escolhido."
    },
    {
      "nivel": 8,
      "nome": "DRENAR VIDA",
      "tipo": "bonus",
      "sourceTitle": "DRENAR VIDA [AÇÃO BÔNUS]",
      "usos": "AÇÃO BÔNUS",
      "desc": "O necromante drena energia vital de um alvo saudável: cura 3d10 + magia de HP enquanto o alvo sofre dano equivalente."
    },
    {
      "nivel": 8,
      "nome": "ALMA PERDIDA",
      "tipo": "passiva",
      "sourceTitle": "ALMA PERDIDA",
      "evolucoes": [
        {
          "nivel": 8,
          "desc": "Mudança: Custos normais"
        },
        {
          "nivel": 13,
          "desc": "Mudança: Custos descritos pela metade /"
        }
      ],
      "desc": "Usando almas coletadas, o necromante pode trazer corpos de volta: Escravo (custa 2 almas, ele volta com a metade do HP original da criatura, sem atributos, com 0 de CA e com a duração de apenas 6 horas) ou Ser Intelectual (10 almas, atributos completos do alvo, vivo por 3 dias). Ao usar mais 10 almas no corpo, ele ficará vivo por +3 dias."
    },
    {
      "nivel": 9,
      "nome": "APARÊNCIA MORTAL",
      "tipo": "passiva",
      "sourceTitle": "APARÊNCIA MORTAL",
      "desc": "Consegue se disfarçar em qualquer ser humano que já viu ou que quer ser. Para fazer este disfarce custará materiais orgânicos, como resto de alimentos ou criaturas mortas. Ele será permanente, mas caso o necromante queira retornar a sua forma original ou ainda se transformar em outra, ele poderá, realizando o mesmo processo."
    },
    {
      "nivel": 9,
      "nome": "DEDO DA MORTE",
      "tipo": "ativo",
      "sourceTitle": "DEDO DA MORTE [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "desc": "O necromante lança uma energia negativa que atinge uma criatura que ele possa ver, causando à criatura uma dor lancinante. Seres atingidos recebem 7d8+20+magia de dano necrótico. Um humanoide morto por esta magia ergue-se no começo do próximo turno do necromante como um zumbi, que fica permanentemente sob o comando do necromante, seguindo as ordens verbais do mesmo, não utilizando armas, apenas os seus punhos. Ele durará 1d4 horas."
    },
    {
      "nivel": 10,
      "nome": "ONDA INFERNAL",
      "tipo": "ativo",
      "sourceTitle": "ONDA INFERNAL [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "desc": "Uma onda flamejante-escura surge em volta do necromante e o envolve em uma área circular de até 3 metros de distância, causando dano necrótico em todos os seres em volta dele. O dano causado é equivalente a 4d10+magia. Essa onda flamejante dura 3 turnos."
    },
    {
      "nivel": 11,
      "nome": "SABOR DE SANGUE [PASSIVA]",
      "tipo": "passiva",
      "sourceTitle": "SABOR DE SANGUE [PASSIVA]",
      "desc": "Todos os seres envolta do necromante em uma área de até 2 metros (inclusive aliados) não poderão receber curas de nenhuma fonte (magias, poções e etc). Esses seres presentes nessa área ficarão com uma desagradável dor de cabeça."
    },
    {
      "nivel": 12,
      "nome": "NECROPOTÊNCIA",
      "tipo": "passiva",
      "sourceTitle": "NECROPOTÊNCIA",
      "desc": "O necromante soma seu modificador de inteligência ao dano de todas as suas magias de necromancia."
    },
    {
      "nivel": 12,
      "nome": "METEORO NEGATIVO",
      "tipo": "ativo",
      "sourceTitle": "METEORO NEGATIVO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "Uma gigantesca orbe negra com uma aura roxa cai dos céus em uma localidade à vista do necromante. Cada criatura em um raio de 8 metros de esfera, precisa fazer um teste de Destreza (dificuldade 8+mod magia). As criaturas recebem 6d12+magia de dano de fogo negro e 6d12+magia de dano de concussão. Caso as criaturas obtenham uma falha no teste, o dano recebido é dobrado."
    },
    {
      "nivel": 15,
      "nome": "DRAGÃO PÚTRIDO",
      "tipo": "ativo",
      "sourceTitle": "DRAGÃO PÚTRIDO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "O necromante evoca um dragão de ossos de médio porte, que dura 4 turnos. Consulte no livro de monstros os status da criatura. Ele pode lançar 4 magias do necromante enquanto durar (de até nível 10)."
    },
    {
      "nivel": 17,
      "nome": "NECROMANCIA RÁPIDA",
      "tipo": "ativo",
      "sourceTitle": "NECROMANCIA RÁPIDA [CUSTA 2 MAGIAS DIÁRIAS]",
      "usos": "CUSTA 2 MAGIAS DIÁRIAS",
      "desc": "Ao ativar, o necromante ganha +2 ações completas neste mesmo turno."
    },
    {
      "nivel": 19,
      "nome": "RESSURREIÇÃO VERDADEIRA",
      "tipo": "ativo",
      "sourceTitle": "RESSURREIÇÃO VERDADEIRA [1 VEZ POR SEMANA]",
      "usos": "1 VEZ POR SEMANA",
      "desc": "O necromante toca uma criatura que tenha morrido não mais do que 20 anos e que tenha morrido por qualquer motivo que não seja velhice. Se o espírito da criatura estiver livre e for voluntária, a criatura é restaurada à vida com todos os seus pontos de vida. Esta magia fecha todos os ferimentos, neutraliza qualquer veneno, cura todas as doenças, e cura qualquer maldição que afetasse a criatura quando ela morreu. Esta magia regenera órgãos e membros danificados ou decepados. A magia pode até mesmo prover um novo corpo a criatura caso o original não mais exista, neste caso o necromante precisa dizer o nome da criatura para trazê-la de volta. A criatura então aparece em um espaço desocupado à escolha do necromante a até 3 metros dele."
    },
    {
      "nivel": 20,
      "nome": "IMORTAL",
      "tipo": "passiva",
      "sourceTitle": "IMORTAL",
      "desc": "O necromante consegue fragmentar sua alma, armazenando esse pequeno pedaço em um objeto diverso. Enquanto esse objeto permanecer intacto, o necromante nunca morrerá de verdade. Se o corpo do necromante atual morrer , o fragmento de alma se transformara em um corpo espectral sem forma física que tem a necessidade de consumir um novo corpo.Enquanto estiver na forma de espectro , o necromante não poderá usar habilidades de reviver ou de invocar e terá apenas 50% de sua vida total enquanto for um espectro [ classe de armadura também é diminuída]. Para tentar se apoderar de um corpo , o alvo terá que realizar um teste de resistência , e se falhar , o necromante ganhará um corpo novo , mas se obtiver sucesso , o necromante não vai se apoderar do corpo e nem poderia tentar dominá-lo novamente."
    },
    {
      "nivel": 20,
      "nome": "EXPLOSÃO NECRÓTICA",
      "tipo": "ativo",
      "sourceTitle": "EXPLOSÃO NECRÓTICA [1 VEZ POR MÊS]",
      "usos": "1 VEZ POR MÊS",
      "desc": "Invoca um poder de explosão instantâneo bizarro e mortal, vindo diretamente do submundo. O chão se irrompe, soltando um raio que percorre o solo até os céus. Dentro de um raio de 45x45 metros: destrói construções, absorve as almas dos mortos, aniquila a região. Sobreviventes sofrem 20d10 de dano necrótico."
    },
    {
      "nivel": 5,
      "nome": "TOQUE DA MORTE",
      "tipo": "passiva",
      "sourceTitle": "TOQUE DA MORTE",
      "subclasse": "Necromante Lich",
      "desc": "Ao encostar em um ser de pequeno porte e certamente mais fraco que o necromante, a ALMA dessa criatura será roubada."
    },
    {
      "nivel": 5,
      "nome": "CONSUMO DA VIDA ETÉREA",
      "tipo": "passiva",
      "sourceTitle": "CONSUMO DA VIDA ETÉREA",
      "subclasse": "Necromante Lich",
      "desc": "O necromante pode consumir almas que possuir à vontade, ganhando +0,2 de inteligência por alma absorvida."
    },
    {
      "nivel": 5,
      "nome": "ESVAIR VIDAS",
      "tipo": "passiva",
      "sourceTitle": "ESVAIR VIDAS",
      "subclasse": "Necromante Lich",
      "desc": "Cada habilidade ofensiva que acertar um inimigo cura o necromante em 1d4 de HP."
    },
    {
      "nivel": 8,
      "nome": "FOME E MISÉRIA",
      "tipo": "ativo",
      "sourceTitle": "FOME E MISÉRIA [1 VEZ POR INIMIGO, POR DESCANSO CURTO]",
      "usos": "1 VEZ POR INIMIGO, POR DESCANSO CURTO",
      "subclasse": "Necromante Lich",
      "desc": "O necromante transfere uma fome insaciável a um inimigo. O alvo fica debilitado, incapaz de atacar por 2 turnos. Após recuperar a compostura, o alvo causará -10 de dano e terá -4 de CA pelo resto do combate."
    },
    {
      "nivel": 14,
      "nome": "ASCENSÃO DO LICH",
      "tipo": "ativo",
      "sourceTitle": "ASCENSÃO DO LICH [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Necromante Lich",
      "desc": "O necromante se transforma em Lich por 3 turnos, recebendo +20 HP, atributo Magia DOBRADO e ficando intangível (ataques físicos passam através dele). Pode usar ENVOLTÓRIO SOBRE AS ALMAS PERDIDAS: consome todas as almas coletadas e invoca espectros de acordo com a quantidade consumida (1 espectro por alma), atributos descritos no livro dos monstros. Ao fim da transformação, absorve toda a vida restante dos espectros vivos, curando-se. Caso Lich pereça neste estado, a transformação cessa e os espectros são consumidos, curando-o."
    },
    {
      "nivel": 5,
      "nome": "CONTROLE",
      "tipo": "passiva",
      "sourceTitle": "CONTROLE",
      "subclasse": "Necromante das Sombras",
      "desc": "O necromante manipula sombras de alvos em até 10 metros: mover objetos, criar fenômenos assustadores. Não ataca diretamente com sombras. Pode remover permanentemente a sombra de um alvo, mas essa ação só pode ser usada 1x ao dia, sendo apenas 1 sombra por vez."
    },
    {
      "nivel": 5,
      "nome": "SOMBRAS DO CAOS",
      "tipo": "passiva",
      "sourceTitle": "SOMBRAS DO CAOS",
      "subclasse": "Necromante das Sombras",
      "desc": "Cada sombra removida se torna um aliado permanente, oculto na sombra do necromante e surgindo apenas em combate. Mantêm habilidades e atributos do portador original. Pode invocar todas as sombras adquiridas de uma vez por combate. O atributo da sombra está descrito no livro dos monstros."
    },
    {
      "nivel": 8,
      "nome": "ESCURIDÃO",
      "tipo": "ativo",
      "sourceTitle": "ESCURIDÃO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Necromante das Sombras",
      "desc": "A sombra do necromante se estende criando uma esfera de escuridão total em 15 metros de raio. Apenas o necromante enxerga. Dura 1d4 turnos."
    },
    {
      "nivel": 8,
      "nome": "ATAQUE DAS SOMBRAS",
      "tipo": "ativo",
      "sourceTitle": "ATAQUE DAS SOMBRAS [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "subclasse": "Necromante das Sombras",
      "desc": "Todas as sombras coletadas convergem em um único alvo num ataque coordenado. Cada sombra causa 1d4 + magia de dano."
    },
    {
      "nivel": 14,
      "nome": "ASCENSÃO DO CAOS",
      "tipo": "ativo",
      "sourceTitle": "ASCENSÃO DO CAOS [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Necromante das Sombras",
      "desc": "O necromante consome temporariamente todas as sombras acumuladas, absorvendo seus atributos, HP e CA. Os valores são determinados no momento da ativação. Dura 4 turnos. Após se dissipar, as sombras voltam ao controle do necromante, mas o mesmo não poderá utilizar mais nenhuma ação provinda das sombras por 1 dia."
    }
  ],
  "mago": [
    {
      "nivel": 1,
      "nome": "SABEDORIA ARCANA",
      "tipo": "passiva",
      "sourceTitle": "SABEDORIA ARCANA",
      "desc": "O mago é um mestre na arte de decifrar segredos da magia e desvendar mistérios de artefatos mágicos. Seu conhecimento e pesquisa constante permitem acesso a magias de poder e sabedoria arcana."
    },
    {
      "nivel": 1,
      "nome": "CANALISADOR",
      "tipo": "passiva",
      "sourceTitle": "CANALISADOR",
      "desc": "O mago precisa de um item canalizador (livro, cajado, tomo, pergaminho) para controlar suas magias. Sem ele, o controle é instável — efeitos imprevisíveis e perigosos (1d100 da tabela de sorte). Magias diárias por nível:"
    },
    {
      "nivel": 1,
      "nome": "BARREIRA MÁGICA",
      "tipo": "reacao",
      "sourceTitle": "BARREIRA MÁGICA [2 VEZES POR DESCANSO LONGO, REAÇÃO]",
      "usos": "2 VEZES POR DESCANSO LONGO, REAÇÃO",
      "desc": "O mago manifesta uma barreira impenetrável que anula TODO o dano de um único ataque, seja mágico, à distância ou corpo-a-corpo. A barreira é pequena e só bloqueia danos que forem atingir o próprio mago."
    },
    {
      "nivel": 1,
      "nome": "PEQUENA BOLA DE FOGO",
      "tipo": "ativo",
      "sourceTitle": "PEQUENA BOLA DE FOGO",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Nome: Pequena Bola de Fogo | Dano: 1d8 + int | Área: Alvo único | Extra: —"
        },
        {
          "nivel": 5,
          "desc": "Nome: Bola de Fogo | Dano: 4d8 + int | Área: raio de 3x3m | Extra: Empurra alvos"
        },
        {
          "nivel": 10,
          "desc": "Nome: Onda de Bolas de Fogo (2x desc. longo) | Dano: 2d10 + int cada | Área: 8 bolas | Extra: —"
        }
      ],
      "desc": "O mago conjura uma bola de fogo que causa um pequeno dano de de fogo (1d8 + int)."
    },
    {
      "nivel": 1,
      "nome": "FOGOS DE ARTIFÍCIO",
      "tipo": "passiva",
      "sourceTitle": "FOGOS DE ARTIFÍCIO",
      "desc": "O mago conjura cinco explosões aleatórias que criam uma cortina de fumaça densa, impedindo inimigos de enxergar por 2 turnos (20 segundos)."
    },
    {
      "nivel": 1,
      "nome": "LUZ ETÉREA",
      "tipo": "bonus",
      "sourceTitle": "LUZ ETÉREA [AÇÃO BÔNUS]",
      "usos": "AÇÃO BÔNUS",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Raio: 3m | Duração: 1 turno (10s)"
        },
        {
          "nivel": 7,
          "desc": "Raio: 10m | Duração: 3 turnos (1 min) /"
        }
      ],
      "desc": "Ao erguer seu canalizador, uma luz intensa irrompe, cegando todos no raio de 3m ao seu redor."
    },
    {
      "nivel": 2,
      "nome": "ESFERA ENERGÉTICA",
      "tipo": "ativo",
      "sourceTitle": "ESFERA ENERGÉTICA [NÃO CUSTA USOS DE MAGIA]",
      "usos": "NÃO CUSTA USOS DE MAGIA",
      "desc": "O mago dispara uma pequena bola de energia certeira, que causa 1d4 + magia de dano mágico. Uma alternativa prática que não consome recursos."
    },
    {
      "nivel": 2,
      "nome": "ILUSÃO",
      "tipo": "passiva",
      "sourceTitle": "ILUSÃO",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Tipo de ilusão: Objetos simples inanimados (copos, pratos, armas)"
        },
        {
          "nivel": 6,
          "desc": "Tipo de ilusão: Objetos médios (porta, cadeira, barril)"
        },
        {
          "nivel": 11,
          "desc": "Tipo de ilusão: Objetos grandes animados (humanos, animais)"
        },
        {
          "nivel": 15,
          "desc": "Tipo de ilusão: Ilusões enormes (casas, cavernas), requer concentração"
        },
        {
          "nivel": 19,
          "desc": "Tipo de ilusão: Ilusões complexas (castelos, florestas, cidades), concentração imensa"
        }
      ],
      "desc": "O mago manipula a magia para criar ilusões de complexidade crescente conforme evolui."
    },
    {
      "nivel": 2,
      "nome": "PROFANAR CURA",
      "tipo": "passiva",
      "sourceTitle": "PROFANAR CURA",
      "desc": "O mago desencadeia magia de cura que restaura 1d4 + inteligência de HP em si mesmo ou aliado."
    },
    {
      "nivel": 3,
      "nome": "ESTILHAÇOS DE ÁGUA",
      "tipo": "ativo",
      "sourceTitle": "ESTILHAÇOS DE ÁGUA [3 VEZES POR DESCANSO CURTO]",
      "usos": "3 VEZES POR DESCANSO CURTO",
      "desc": "O mago dispara três balas perfurantes de água, que causam 1d8 + inteligência de dano cada. As trajetórias são escolhidas pelo mago."
    },
    {
      "nivel": 3,
      "nome": "ESCUDO ELEMENTAL",
      "tipo": "ativo",
      "sourceTitle": "ESCUDO ELEMENTAL [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "desc": "O mago invoca um escudo de um elemento à sua escolha:"
    },
    {
      "nivel": 4,
      "nome": "BLIZZARD",
      "tipo": "ativo",
      "sourceTitle": "BLIZZARD [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "desc": "O mago conjura um raio congelante gigantesco de 5 metros à frente, congelando a área completamente por 1 turno. Inimigos atingidos sofrem 4d8 + magia de dano."
    },
    {
      "nivel": 5,
      "nome": "CONSTRUÇÃO DE OBJETOS",
      "tipo": "passiva",
      "sourceTitle": "CONSTRUÇÃO DE OBJETOS",
      "desc": "Com materiais e conhecimento, o mago pode trazer objetos à existência em questão de instantes."
    },
    {
      "nivel": 6,
      "nome": "CONFUNDIR",
      "tipo": "passiva",
      "sourceTitle": "CONFUNDIR",
      "desc": "O mago utilizando sua magia consegue deixar uma criatura completamente confusa durante 2 turnos ou 2 minutos. Inimigos confusos ficam completamente perdidos, podendo atacar inimigos, aliados ou objetos. Criaturas atingidas por esta magia não sofrem efeito caso o mago utilize o feitiço nela novamente."
    },
    {
      "nivel": 7,
      "nome": "ESFERA DE NEVE",
      "tipo": "passiva",
      "sourceTitle": "ESFERA DE NEVE",
      "desc": "O mago forja uma esfera de neve que explode em contato: 8d6 + magia de dano. A congelação se espalha por 2 metros, congelando alvos atingidos por 2 turnos."
    },
    {
      "nivel": 8,
      "nome": "CLONE DE FESTIM",
      "tipo": "passiva",
      "sourceTitle": "CLONE DE FESTIM",
      "desc": "Demora 1 hora para ser feito. O mago cria um clone, que pode fazer TODAS as ações SIMPLES que ele mesmo poderia fazer. Ao ser atacado ele explode em uma linda festança de festim."
    },
    {
      "nivel": 9,
      "nome": "OLHOS TREINADOS",
      "tipo": "passiva",
      "sourceTitle": "OLHOS TREINADOS",
      "desc": "O mago adquire a capacidade de discernir a quantidade precisa de vida de todos os inimigos à vista."
    },
    {
      "nivel": 9,
      "nome": "PROTEÇÃO MÁGICA",
      "tipo": "reacao",
      "sourceTitle": "PROTEÇÃO MÁGICA [3 VEZES POR DESCANSO CURTO, APENAS ALIADOS, REAÇÃO]",
      "usos": "3 VEZES POR DESCANSO CURTO, APENAS ALIADOS, REAÇÃO",
      "desc": "Quando um aliado está prestes a sofrer dano devastador, o mago lança um feitiço protetor que absorve 3d12 + inteligência de dano."
    },
    {
      "nivel": 9,
      "nome": "FOGO FÁTUO",
      "tipo": "ativo",
      "sourceTitle": "FOGO FÁTUO [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "desc": "O mago conjura um poderoso cone de fogo com 4 metros de alcance: 7d6 + 10 + magia de dano de fogo. O fogo persiste nos alvos, causando metade do dano por mais 2 turnos."
    },
    {
      "nivel": 10,
      "nome": "OLHOS MÁGICOS",
      "tipo": "ativo",
      "sourceTitle": "OLHOS MÁGICOS [3 VEZES POR DESCANSO LONGO]",
      "usos": "3 VEZES POR DESCANSO LONGO",
      "desc": "O mago enxerga através de objetos sólidos, revelando segredos ocultos atrás de barreiras físicas. Dura 25 segundos."
    },
    {
      "nivel": 10,
      "nome": "PESO PENA",
      "tipo": "ativo",
      "sourceTitle": "PESO PENA[2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "desc": "O mago encanta suas pernas ou de um de seus aliados com o poder do voo. Temporariamente, por 10 minutos o usuário poderá voar desenfreadamente."
    },
    {
      "nivel": 11,
      "nome": "ANULAR",
      "tipo": "ativo",
      "sourceTitle": "ANULAR [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "desc": "Um feixe de luz atinge o alvo, privando-o de usar magia por 3 turnos. Caso o alvo seja naturalmente um mago, necromante, feiticeiro ou qualquer shikata mágica, a magia será certeira, atraída diretamente para o inimigo (como se fosse magnética)."
    },
    {
      "nivel": 14,
      "nome": "TSUNAMI",
      "tipo": "ativo",
      "sourceTitle": "TSUNAMI [1 VEZ POR DESCANSO LONGO, ATAQUE CERTEIRO]",
      "usos": "1 VEZ POR DESCANSO LONGO, ATAQUE CERTEIRO",
      "desc": "O mago invoca uma onda colossal de 10 metros de largura e 10 metros de altura que varre tudo em 200 metros de alcance, causando 5d20 + inteligência de dano nos alvos atingidos."
    },
    {
      "nivel": 15,
      "nome": "SILÊNCIO ABSOLUTO",
      "tipo": "ativo",
      "sourceTitle": "SILÊNCIO ABSOLUTO [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "desc": "O mago emana uma aura de silêncio absoluto num raio de 15 metros. Todos dentro ficam paralisados e incapazes de agir por 2 turnos."
    },
    {
      "nivel": 18,
      "nome": "TERREMOTO",
      "tipo": "ativo",
      "sourceTitle": "TERREMOTO [1 VEZ A CADA 3 DIAS]",
      "usos": "1 VEZ A CADA 3 DIAS",
      "desc": "O mago provoca fissuras titânicas no solo de até 67 metros de largura. Criaturas engolidas devem usar agilidade e força para evitar a queda (teste de resistência)."
    },
    {
      "nivel": 20,
      "nome": "CHUVA DE METEOROS",
      "tipo": "ativo",
      "sourceTitle": "CHUVA DE METEOROS [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "4 Orbes flamejantes despencam ao chão em quatro diferentes pontos que o jogador possa ver dentro do alcance . A esfera se propaga em cantos e quinas. Uma criatura recebe 6d20+magia+inteligência de dano de fogo se for atingida por uma orbe . Uma criatura na área de mais do que uma zona de meteoros, apenas é afetada por uma área. A magia danifica objetos que estiverem na área, e também ateia fogo a objetos inflamáveis, que não estejam sendo vestidos ou carregados."
    },
    {
      "nivel": 5,
      "nome": "LEITURA",
      "tipo": "passiva",
      "sourceTitle": "LEITURA",
      "subclasse": "Mago Rúnico",
      "desc": "O mago alcança entendimento pleno das runas, tornando-se mestre na decifração desses símbolos ancestrais."
    },
    {
      "nivel": 5,
      "nome": "COMBO ARCANO",
      "tipo": "passiva",
      "sourceTitle": "COMBO ARCANO",
      "subclasse": "Mago Rúnico",
      "desc": "O mago pode usar 1 magia desta subclasse sem gastar nenhuma ação."
    },
    {
      "nivel": 5,
      "nome": "SOBRECARREGAR",
      "tipo": "passiva",
      "sourceTitle": "SOBRECARREGAR",
      "subclasse": "Mago Rúnico",
      "desc": "O mago lança uma esfera de energia azul-elétrica: 1d10 de dano mágico. A armadura do alvo enfraquece, perdendo 1 ponto de CA por turno, de forma cumulativa durante 4 turnos."
    },
    {
      "nivel": 5,
      "nome": "PRISÃO DE RUNA",
      "tipo": "ativo",
      "sourceTitle": "PRISÃO DE RUNA [1 VEZ A CADA 3 TURNOS, CERTEIRA]",
      "usos": "1 VEZ A CADA 3 TURNOS, CERTEIRA",
      "subclasse": "Mago Rúnico",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Extra: Prende 1 turno"
        },
        {
          "nivel": 14,
          "desc": "Extra: Em alvo marcado: 2 turnos preso, dobro do dano"
        }
      ],
      "desc": "O mago invoca uma prisão rúnica azul que envolve e aprisiona o alvo por 1 turno, causando 1d6 + inteligência de dano rúnico. Após lançar, pode usar Sobrecarregar sem ação adicional."
    },
    {
      "nivel": 8,
      "nome": "PORTAL DOS REINOS",
      "tipo": "ativo",
      "sourceTitle": "PORTAL DOS REINOS [1 VEZ A CADA 4 DIAS]",
      "usos": "1 VEZ A CADA 4 DIAS",
      "subclasse": "Mago Rúnico",
      "desc": "O mago conjura um portal rúnico que transporta ele e aliados por até 25 + inteligência metros. Permanece aberto por 10 segundos."
    },
    {
      "nivel": 8,
      "nome": "FLUXO DE FEITIÇO",
      "tipo": "ativo",
      "sourceTitle": "FLUXO DE FEITIÇO [2 VEZES POR TURNO]",
      "usos": "2 VEZES POR TURNO",
      "subclasse": "Mago Rúnico",
      "evolucoes": [
        {
          "nivel": 8,
          "desc": "Usos/turno: 2x | Dano: 3d6 + magia"
        },
        {
          "nivel": 14,
          "desc": "Usos/turno: 3x | Dano: 3d8 + magia"
        }
      ],
      "desc": "O mago lança um orbe mágico azul: 3d6 + magia de dano. Marca o alvo e todos os inimigos próximos (3m) com uma runa. Após conjurar, pode usar Sobrecarregar sem ação."
    },
    {
      "nivel": 8,
      "nome": "MARCAÇÕES",
      "tipo": "passiva",
      "sourceTitle": "MARCAÇÕES",
      "subclasse": "Mago Rúnico",
      "evolucoes": [
        {
          "nivel": 8,
          "desc": "Dano extra: +3d4"
        },
        {
          "nivel": 14,
          "desc": "Dano extra: +4d4"
        }
      ],
      "desc": "Alvos marcados recebem dano adicional no próximo Sobrecarregar (marca quebra após). Se Sobrecarregar atingir um marcado, todos os marcados próximos também recebem o dano tanto da marca quanto do sobrecarregar."
    },
    {
      "nivel": 14,
      "nome": "PODER DO DESESPERO",
      "tipo": "ativo",
      "sourceTitle": "PODER DO DESESPERO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Mago Rúnico",
      "desc": "O mago entra no estado RÚNICO por 3 turnos: cura 1d4 + mod inteligência por ataque acertado, e pode conjurar 1 magia adicional por ação."
    },
    {
      "nivel": 14,
      "nome": "MAESTRIA ARCANA",
      "tipo": "ativo",
      "sourceTitle": "MAESTRIA ARCANA [1 VEZ A CADA 4 TURNOS]",
      "usos": "1 VEZ A CADA 4 TURNOS",
      "subclasse": "Mago Rúnico",
      "desc": "Quando o mago utiliza 3 habilidades em 1 turno, desencadeia um escudo mágico de 15 + inteligência de HP por 2 turnos."
    },
    {
      "nivel": 5,
      "nome": "CONJURAÇÃO FORTE",
      "tipo": "ativo",
      "sourceTitle": "CONJURAÇÃO FORTE [CUSTA 1d6 DE VIDA]",
      "usos": "CUSTA 1d6 DE VIDA",
      "subclasse": "Mago de Sangue",
      "desc": "O mago intensifica uma magia escolhida até o fim do combate: *que cause dano +1d6+int *que aprisione +1d2 turnos *que cure +1d4+car. Pode acumular."
    },
    {
      "nivel": 5,
      "nome": "ARMAS DE SANGUE",
      "tipo": "ativo",
      "sourceTitle": "ARMAS DE SANGUE [CUSTA 1d6 DE VIDA]",
      "usos": "CUSTA 1d6 DE VIDA",
      "subclasse": "Mago de Sangue",
      "desc": "O mago cria réplicas perfeitas de qualquer arma que já tenha tocado, incluindo itens mágicos. Duram 4 turnos. As armas causam sua inteligência como dano adicional. Ação bônus."
    },
    {
      "nivel": 5,
      "nome": "CONTROLE PERFEITO",
      "tipo": "ativo",
      "sourceTitle": "CONTROLE PERFEITO [CUSTA 2 DE VIDA]",
      "usos": "CUSTA 2 DE VIDA",
      "subclasse": "Mago de Sangue",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Extra: Objetos pequenos e médios"
        },
        {
          "nivel": 14,
          "desc": "Extra: Qualquer tamanho (+1 HP por 3kg adicionais)"
        }
      ],
      "desc": "O mago cria objetos úteis com seu próprio sangue (cordas, velas, caixas, etc.)."
    },
    {
      "nivel": 5,
      "nome": "CONTROLE TOTAL",
      "tipo": "passiva",
      "sourceTitle": "CONTROLE TOTAL",
      "subclasse": "Mago de Sangue",
      "desc": "Pode usar o sangue exposto do inimigo como componente para suas habilidades, causando dano diretamente."
    },
    {
      "nivel": 8,
      "nome": "FERVOR SANGUINÁRIO",
      "tipo": "ativo",
      "sourceTitle": "FERVOR SANGUINÁRIO [CUSTA 1d10 DE VIDA, 2 VEZES POR DESCANSO LONGO]",
      "usos": "CUSTA 1d10 DE VIDA, 2 VEZES POR DESCANSO LONGO",
      "subclasse": "Mago de Sangue",
      "desc": "O sangue dos alvos hostis num raio de 10 metros ferve dentro de suas veias: 3d6 + magia de dano. Os afetados causam -1 dado de ataque cumulativo (máximo 2x). Criaturas sem sangue são imunes ao dano e efeito."
    },
    {
      "nivel": 8,
      "nome": "MARÉS DE SANGUE",
      "tipo": "ativo",
      "sourceTitle": "MARÉS DE SANGUE [CUSTA 10 DE VIDA, 1 VEZ POR DESCANSO LONGO]",
      "usos": "CUSTA 10 DE VIDA, 1 VEZ POR DESCANSO LONGO",
      "subclasse": "Mago de Sangue",
      "desc": "O mago concentra-se por 1 turno, atraindo sangue dos inimigos em 4m para formar uma esfera: 2d12 de dano aos drenados. Depois, explode a esfera, causando 4d4 de dano vezes o número de inimigos drenados num raio de 10m do mago."
    },
    {
      "nivel": 8,
      "nome": "EVASÃO SANGUINÁRIA",
      "tipo": "ativo",
      "sourceTitle": "EVASÃO SANGUINÁRIA [CUSTA 10 DE VIDA]",
      "usos": "CUSTA 10 DE VIDA",
      "subclasse": "Mago de Sangue",
      "desc": "O mago se transforma em forma fluida de sangue: invulnerável a ataques físicos e mágicos por 1 turno. Caso algum alvo tente o atingir com um ataque marcial, o inimigo passará pela forma e perderá 10 de vida, que serão regeneradas para o mago."
    },
    {
      "nivel": 14,
      "nome": "REGENERAÇÃO CELULAR",
      "tipo": "passiva",
      "sourceTitle": "REGENERAÇÃO CELULAR",
      "subclasse": "Mago de Sangue",
      "desc": "Membros amputados do mago regeneram-se ao longo de dias."
    },
    {
      "nivel": 14,
      "nome": "ILUSÃO",
      "tipo": "ativo",
      "sourceTitle": "ILUSÃO [CUSTA 2d10 DE VIDA]",
      "usos": "CUSTA 2d10 DE VIDA",
      "subclasse": "Mago de Sangue",
      "desc": "O mago derrama sangue no solo e o evapora, criando ilusões que afetam quem tem contato visual ou inala a fumaça."
    },
    {
      "nivel": 14,
      "nome": "PARAR",
      "tipo": "bonus",
      "sourceTitle": "PARAR [CUSTA 1d12 DE VIDA, AÇÃO BÔNUS]",
      "usos": "CUSTA 1d12 DE VIDA, AÇÃO BÔNUS",
      "subclasse": "Mago de Sangue",
      "desc": "O mago solidifica o sangue do inimigo instantaneamente, paralisando-o por 2 turnos (20 segundos). Requer sangue exposto."
    },
    {
      "nivel": 17,
      "nome": "O CONTROLE DO SANGUE",
      "tipo": "passiva",
      "sourceTitle": "O CONTROLE DO SANGUE",
      "subclasse": "Mago de Sangue",
      "desc": "O mago domina o sangue tão profundamente que suas habilidades passam a custar apenas metade da vida estimada."
    }
  ],
  "feiticeiro": [
    {
      "nivel": 1,
      "nome": "PACTO",
      "tipo": "passiva",
      "sourceTitle": "PACTO",
      "desc": "O feiticeiro forja um pacto inquebrável com uma deidade ou entidade mundana de poder incomensurável. Esse pacto pode ser hereditário ou selado ao longo de sua jornada. Ao selar esse acordo, ele se compromete a seguir rigorosamente as ordens estipuladas no pacto, pois qualquer ruptura será punida severamente pela deidade. Devido a isso, seus poderes não possuem limites de uso, como magos ou necromantes, mas caso o pacto se rompa, todas as habilidades da subclasse e da classe, serão seladas até segunda ordem."
    },
    {
      "nivel": 1,
      "nome": "DOM NATURAL",
      "tipo": "passiva",
      "sourceTitle": "DOM NATURAL",
      "desc": "O feiticeiro detecta a presença de seres mágicos que se aproximam, num raio de até 30m."
    },
    {
      "nivel": 1,
      "nome": "RAIO MÍSTICO",
      "tipo": "passiva",
      "sourceTitle": "RAIO MÍSTICO",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Alcance: 6m | Dano: 1d12+magia | Efeito Extra: -"
        },
        {
          "nivel": 3,
          "desc": "Alcance: 7m | Dano: 1d12+magia | Efeito Extra: Arremessa alvos atingidos para 5m. O feiticeiro pode realizar uma conjuração dupla."
        },
        {
          "nivel": 5,
          "desc": "Alcance: 8m | Dano: 2d12+magia | Efeito Extra: -"
        },
        {
          "nivel": 7,
          "desc": "Alcance: 9m | Dano: 2d12+magia | Efeito Extra: Agora cura o feiticeiro em metade do dano causado."
        },
        {
          "nivel": 9,
          "desc": "Alcance: 12m | Dano: 3d12+magia | Efeito Extra: -"
        },
        {
          "nivel": 11,
          "desc": "Alcance: 14m | Dano: 4d12+magia | Efeito Extra: Agora reduz a armadura de alvos atingidos em 1, de forma cumulativa."
        },
        {
          "nivel": 13,
          "desc": "Alcance: 16m | Dano: 5d12+magia | Efeito Extra: -"
        },
        {
          "nivel": 15,
          "desc": "Alcance: 16m | Dano: 5d12+magia | Efeito Extra: Inimigos rodam teste de resistência mágica (dificuldade 5+magia), caso falhem serão atordoados no impacto do arremesso."
        },
        {
          "nivel": 17,
          "desc": "Alcance: 30m | Dano: 6d12+magia | Efeito Extra: O raio místico atinge seu apogeu, também atinge inimigos próximos do impacto num raio até 2m do alvo inicial, causando o mesmo dano."
        }
      ],
      "desc": "O feiticeiro concentra sua vontade e, com um gesto majestoso, dispara um raio místico verde da ponta de seus dedos. Este raio atravessa o espaço e o tempo, distorcendo a própria realidade enquanto avança. O impacto causa 1d12 + magia de dano mágico. Possui alcance de 6 metros."
    },
    {
      "nivel": 1,
      "nome": "NÉVOA GELADA",
      "tipo": "bonus",
      "sourceTitle": "NÉVOA GELADA [AÇÃO BÔNUS]",
      "usos": "AÇÃO BÔNUS",
      "desc": "O feiticeiro cria uma brisa nevada de sua mão, que quando acertada num inimigo, congela uma parte do corpo do alvo durante 1 turno e causa 1d4+magia de dano gélido. Dependendo da parte congelada, o inimigo reage de formas diferentes. Pode ser usada como uma ação bônus."
    },
    {
      "nivel": 1,
      "nome": "CONTROLE DE TERRENO",
      "tipo": "passiva",
      "sourceTitle": "CONTROLE DE TERRENO",
      "desc": "O feiticeiro prende um alvo a escolha num local feito de rochas sólidas durante 2 turnos. As rochas impedem que o alvo se mova, mas caso o inimigo a quebre, poderá se mover normalmente. Ela possui 15 pontos de vida. Quando atingir o domínio do elemento terra, poderá se expandir para 3 turnos, com 30 pontos de vida."
    },
    {
      "nivel": 2,
      "nome": "SENTIR O CALOR",
      "tipo": "passiva",
      "sourceTitle": "SENTIR O CALOR",
      "desc": "O feiticeiro se concentra, e consegue sentir numa área de 30 metros TODOS os seres vivos que emitem calor nessas áreas."
    },
    {
      "nivel": 2,
      "nome": "REPREENSÃO PACTUAL",
      "tipo": "ativo",
      "sourceTitle": "REPREENSÃO PACTUAL[2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Dano: 2d10+magia | Usos: 2x Descanso longo"
        },
        {
          "nivel": 6,
          "desc": "Dano: 4d10+magia | Usos: 3x Descanso longo"
        }
      ],
      "desc": "Qualquer adversário que o ataque, seja em combate corpo a corpo ou à distância, fará com que o feiticeiro possa dar uma resposta pactual. Com um apontar de seu dedo indicador em direção ao agressor, um fogo místico e avassalador se acende, envolvendo o inimigo em uma combustão. O inimigo sofre 2d10+magia de dano mágico como consequência."
    },
    {
      "nivel": 2,
      "nome": "VISUALIZAÇÃO DO ALÉM",
      "tipo": "passiva",
      "sourceTitle": "VISUALIZAÇÃO DO ALÉM",
      "desc": "O feiticeiro alcançou uma compreensão que transcende as fronteiras mundanas. Seus olhos foram abertos para enxergar o que está além do comum. Agora, ele possui a habilidade de visualizar seres que também foram consumidos pela marca do pacto, revelando aqueles que compartilham do mesmo destino e poder, permitindo-lhe identificar aliados e inimigos entre os Pactuados."
    },
    {
      "nivel": 3,
      "nome": "FIRMAR NOVO ACORDO",
      "tipo": "ativo",
      "sourceTitle": "FIRMAR NOVO ACORDO [1 VEZ POR DIA]",
      "usos": "1 VEZ POR DIA",
      "desc": "O feiticeiro, fiel a uma única deidade, tem a capacidade de Firmar Novo Acordo com sua divindade patrona sempre que necessário. Esta habilidade única lhe permite renovar e fortalecer sua ligação com sua deidade, obtendo novos poderes e vantagens. No entanto, cada novo acordo exige um tributo pessoal ou a execução de tarefas devidamente ordenadas. Ao usar a habilidade, o espectro feiticeiro é jogado ao domínio de sua deidade, onde terá a oportunidade de discutir sobre o assunto (o tempo em sua volta fica parado)."
    },
    {
      "nivel": 3,
      "nome": "TELEPORTE",
      "tipo": "bonus",
      "sourceTitle": "TELEPORTE [AÇÃO BÔNUS]",
      "usos": "AÇÃO BÔNUS",
      "evolucoes": [
        {
          "nivel": 3,
          "desc": "Mana: 3 | Distância: 6m | Extra: Ação bônus"
        },
        {
          "nivel": 9,
          "desc": "Mana: 5 | Distância: 12m | Extra: Pode ser reação"
        }
      ],
      "desc": "O feiticeiro desaparece e reaparece a até 6 metros."
    },
    {
      "nivel": 3,
      "nome": "PODER ELETROMAGNÉTICO",
      "tipo": "ativo",
      "sourceTitle": "PODER ELETROMAGNÉTICO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "O feiticeiro joga uma magia eletromagnética roxa em um alvo a escolha, e esse alvo recebe 5 pontos de dano mágico. Agora ele ficará mais frágil contra as magias do próprio feiticeiro. Seus próximos 2 ataques contra este alvo serão certeiros."
    },
    {
      "nivel": 4,
      "nome": "PROTEÇÃO DOS ELEMENTOS",
      "tipo": "ativo",
      "sourceTitle": "PROTEÇÃO DOS ELEMENTOS [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "desc": "Um campo cintilante surge e envolve totalmente a área ao redor do feiticeiro (3m), garantindo um bônus de +3 na CLASSE DE ARMADURA para todos os seres em volta enquanto a magia durar. Dura 3 turnos."
    },
    {
      "nivel": 5,
      "nome": "ELEMENTO FOGO",
      "tipo": "bonus",
      "sourceTitle": "ELEMENTO FOGO",
      "desc": "O feiticeiro agora controla perfeitamente o poder das chamas, podendo invocar ou controlar qualquer tipo de chamas que for exposta em sua frente (ataques inimigos inclusos, nesses casos é necessário um teste de controle com dificuldade 15 – que deve ser feito apenas para inimigos mais fortes, já os mais fracos sempre terão as chamas controladas). Ataques feitos com o poder elemental de chamas são realizados apenas com uma ação bônus, e todas causam um dano fixo de 3d8+magia. Para controlar este elemento, é necessário que ele esteja vendo-o e esteja a no máximo 20 metros de distância dele."
    },
    {
      "nivel": 5,
      "nome": "ELEMENTO ÁGUA",
      "tipo": "bonus",
      "sourceTitle": "ELEMENTO ÁGUA",
      "desc": "Agora o feiticeiro também controla perfeitamente o elemento da água, também podendo controlar ataques inimigos provindos deste elemento (nesses casos é necessário um teste de controle com dificuldade 15 – que deve ser feito apenas para inimigos mais fortes, já os mais fracos sempre terão as águas controladas). Ataques realizados pelo elemento d'água são realizados apenas com uma ação bônus, e todos causam 3d6+magia de dano. A quantidade máxima que o feiticeiro consegue controlar é de 300 litros de água no turno. Para controlar este elemento, é necessário que ele esteja vendo-o e esteja a no máximo 20 metros de distância dele."
    },
    {
      "nivel": 6,
      "nome": "NEVOEIRO DE GELO",
      "tipo": "ativo",
      "sourceTitle": "NEVOEIRO DE GELO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "O feiticeiro cria uma área circular em seu campo de visão para começar a cair gelo do céu durante 5 turnos, causando 3d6+magia de dano gélido por turno em TODOS os alvos presentes nesse local (raio de 5m). O feiticeiro escolhe o local onde este ataque ficará, e não poderá ser realocado depois de ativado. Inimigos atingidos 1 vez por esta habilidade ficará preso nessa área até o poder cessar."
    },
    {
      "nivel": 7,
      "nome": "COLUNA DE CHAMAS",
      "tipo": "ativo",
      "sourceTitle": "COLUNA DE CHAMAS [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "desc": "Uma coluna vertical de fogo divino troveja dos céus em um alvo escolhido pelo feiticeiro. A coluna cai instantaneamente no alvo, e a criatura recebe 8d6+magia de dano de fogo."
    },
    {
      "nivel": 9,
      "nome": "ELEMENTO TERRA",
      "tipo": "passiva",
      "sourceTitle": "ELEMENTO TERRA",
      "desc": "Agora o feiticeiro domina a maior parte do terreno em sua volta, sendo capaz de realizar diversas emboscadas ou construções feitas de pedras, rochas ou qualquer material à vista do feiticeiro que esteja relacionado com a terra. Para controlar este elemento, é necessário que ele esteja vendo-o e esteja a no máximo 20 metros de distância dele."
    },
    {
      "nivel": 10,
      "nome": "CENTELHA ELEMENTAL",
      "tipo": "ativo",
      "sourceTitle": "CENTELHA ELEMENTAL [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "O feiticeiro cria ao seu redor um turbilhão gigantesco de um elemento dos que já domina, que pode percorrer 100m de distância para frente. Inimigos atingidos por este turbilhão receberão 8d10+mod magia de dano."
    },
    {
      "nivel": 10,
      "nome": "VISÃO DO IMPÉRIO",
      "tipo": "ativo",
      "sourceTitle": "VISÃO DO IMPÉRIO [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "desc": "Pode revelar uma área de até 15m de uma longa distância [1000 metros], e soltar um golpe nesse mesmo local."
    },
    {
      "nivel": 11,
      "nome": "ELEMENTO GELO",
      "tipo": "passiva",
      "sourceTitle": "ELEMENTO GELO",
      "desc": "O feiticeiro agora ganhou a capacidade de congelar a área ao seu redor, ou seus inimigos. Inimigos atingidos pelo poder de gelo serão congelados durante 2 turnos (não acumula) e receberão 7d6 de dano gélido. Caso recebam ataques congelados, tomarão 2d4 de dano adicional e o gelo se quebrará, saindo do atordoamento. A quantidade de gelo que o feiticeiro consegue criar é limitada a no máximo 20m no turno usado."
    },
    {
      "nivel": 12,
      "nome": "DANO COLATERAL",
      "tipo": "ativo",
      "sourceTitle": "DANO COLATERAL [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "desc": "Pode ser utilizado em uma ação de reação em combate. Entretanto, ao fazê-lo, ele não apenas evita o golpe iminente, mas também responde com uma habilidade de sua escolha."
    },
    {
      "nivel": 13,
      "nome": "AO CHÃO",
      "tipo": "ativo",
      "sourceTitle": "AO CHÃO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "Com um gesto imperioso, a entidade concede ao feiticeiro o domínio sobre os seres à sua volta. Num instante, todos se ajoelham perante sua vontade inquestionável, dobrando-se diante de seu poder por um turno inteiro, sem a menor resistência."
    },
    {
      "nivel": 13,
      "nome": "ELEMENTO AR",
      "tipo": "passiva",
      "sourceTitle": "ELEMENTO AR",
      "desc": "O feiticeiro agora tem a capacidade de levitar alguns objetos (com pesos relativos ao nível de sua magia 1kg|1magia), criar ventanias, empurrar seres, puxá-los, criar pequenas brisas e etc. O limite de empurrar uma criatura é igual a 6 metros, e ele pode puxar uma com uma distância de até 8 metros. Só poderá puxar inimigos leves."
    },
    {
      "nivel": 14,
      "nome": "DESINTEGRAR",
      "tipo": "ativo",
      "sourceTitle": "DESINTEGRAR [1 VEZ POR CRIATURA | 1 VEZ POR DIA]",
      "usos": "1 VEZ POR CRIATURA | 1 VEZ POR DIA",
      "desc": "Um pequeno raio roxo sai da ponta do dedo indicador do feiticeiro até um alvo que ele possa ver dentro do alcance. O alvo pode ser uma criatura, um objeto, ou uma criação de força mágica. O alvo recebe 20d10+magia de dano elemental. Se o dano reduzir seus pontos de vida para 0, o alvo é desintegrado. Uma criatura desintegrada e tudo que ela estiver carregando, exceto itens mágicos, são reduzidos a uma fina poeira cinza."
    },
    {
      "nivel": 14,
      "nome": "DEIDADE PROTETORA",
      "tipo": "ativo",
      "sourceTitle": "DEIDADE PROTETORA [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "Um grande escudo mágico protetor, conjurado com o poder de seu pacto o envolve, no valor de seu 25+modificador de magia. Ao perder completamente seus pontos de vida, o escudo ainda poderá defender qualquer outro ataque (independentemente do dano). Após quebrar, o jogador é lançado para longe de seus inimigos, até 10m de distância."
    },
    {
      "nivel": 15,
      "nome": "CONJURAÇÃO MAGNÉTICA",
      "tipo": "passiva",
      "sourceTitle": "CONJURAÇÃO MAGNÉTICA",
      "desc": "O feiticeiro agora pode atrair e repelir objetos metálicos com pesos razoáveis, equivalentes ao seu atributo magia (1kg | 1 magia)."
    },
    {
      "nivel": 15,
      "nome": "TEMPESTADE DA VINGANÇA",
      "tipo": "ativo",
      "sourceTitle": "TEMPESTADE DA VINGANÇA [1 VEZ SEMANAL]",
      "usos": "1 VEZ SEMANAL",
      "desc": "Uma tempestade carregada de nuvens se forma, centrada em um ponto em que o feiticeiro possa ver, propagando-se em um raio de 100 metros. Relampejando na área, ao som de trovões e ventos fortes. As criaturas que estão na tempestade recebem 5d6 de dano trovejante e ficam surdos por 3 turnos. Cada rodada que o jogador mantiver a concentração nesta magia, a tempestade produz efeitos adicionais por turno, incluindo o do turno passado. Atordoamentos ou ataques que zerem a vida do feiticeiro o tiram da concentração. Rodada 2. Chuva ácida cai da nuvem. Cada criatura e objeto sob a nuvem recebe 6d6+magia de dano ácido. Rodada 3. O feiticeiro evoca seis relâmpagos da nuvem para golpear seis criaturas ou objetos sob a nuvem à escolha do jogador. Uma criatura ou objeto escolhido não pode ser golpeado por mais de um relâmpago. A criatura recebe 7d6+magia de dano elétrico. Rodada 4. Chuva de granizo cai da nuvem. Cada criatura sob a nuvem recebe 8d6+magia de dano de concussão. Rodada 5. Rajadas e chuva congelante caem sobre a área sob a nuvem. A área se torna terreno acidentado e possui ocultamento total. Cada criatura na área recebe 7d6 de dano de gelo. Armas de ataque à distância são impossíveis de funcionar nesta área. O vento e a chuva contam como uma severa distração para os propósitos de manter a concentração sobre a magia. Finalmente, rajadas de vento forte automaticamente dispersam névoa, brumas, e fenômenos similares na área, sejam mundanos ou mágicos. Rodadas posteriores: Todos os efeitos continuam infinitamente, até que o feiticeiro pare de se concentrar nesta magia."
    },
    {
      "nivel": 16,
      "nome": "DOM DA MORTE",
      "tipo": "passiva",
      "sourceTitle": "DOM DA MORTE",
      "desc": "Ao matar um inimigo, o feiticeiro recupera 15 pontos de vida. A recuperação também afeta suas feridas, curando-as e as fechando."
    },
    {
      "nivel": 19,
      "nome": "DESAFIO",
      "tipo": "passiva",
      "sourceTitle": "DESAFIO",
      "desc": "Um desafio supremo se revela, conforme a própria deidade propõe uma prova de fidelidade e poder. Se o feiticeiro triunfar neste teste, suas habilidades e dons transcenderão a efemeridade do contrato, tornando-se parte indelével de sua essência para toda a eternidade. No entanto, se falhar, o pacto será fortalecido de maneira irrevogável, vinculando-o ainda mais às vontades e caprichos do ente superior. O desafio só é ativado caso o feiticeiro aceite, poderá fazê-lo posteriormente."
    },
    {
      "nivel": 20,
      "nome": "RAIO MÍSTICO SUPREMO",
      "tipo": "ativo",
      "sourceTitle": "RAIO MÍSTICO SUPREMO[1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "Em meio às sombras do oculto e às profundezas do desconhecido, o Raio Místico Supremo se ergue das mãos do feiticeiro. Esse poder pode percorrer 100 metros de distância, causando 9d12+ magia de dano mágico no caminho (pode atingir múltiplos alvos). No entanto, o caminho do ataque cria fissuras no tecido do mundo (3x3m), tornando o chão instável, que, em seguida, mãos diabólicas e angelicais emergem das aberturas, segurando os alvos. Os alvos são mantidos em estado de atordoamento profundo até sofrerem qualquer outro dano."
    },
    {
      "nivel": 5,
      "nome": "ESTRELA ASTRAL",
      "tipo": "ativo",
      "sourceTitle": "ESTRELA ASTRAL [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Feiticeiro Astral",
      "desc": "O feiticeiro cria uma magia no formato de uma estrela, altamente condensada. Quando esta estrela entrar em contato com o solo ou com algum inimigo, causará uma gigantesca explosão de cerca de 100m ondular. Criaturas pegas na onda da explosão ficarão atordoadas durante algumas horas e sofrerão 10d4+magia de dano estelar."
    },
    {
      "nivel": 5,
      "nome": "ESFERAS DA CRIAÇÃO",
      "tipo": "ativo",
      "sourceTitle": "ESFERAS DA CRIAÇÃO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Feiticeiro Astral",
      "desc": "O feiticeiro consegue criar esferas de luz altamente poderosas, que deixam inimigos atingidos cegos por algumas horas. O número de esferas que o feiticeiro pode criar de uma vez é equivalente ao nível dele. O dano de cada esfera é de 1d10."
    },
    {
      "nivel": 8,
      "nome": "CORRENTE ASTRAL",
      "tipo": "ativo",
      "sourceTitle": "CORRENTE ASTRAL [1 VEZ POR DESCANSO LONGO, 2 TURNOS]",
      "usos": "1 VEZ POR DESCANSO LONGO, 2 TURNOS",
      "subclasse": "Feiticeiro Astral",
      "desc": "Correntes saem da alma do adversário e as fixam ao chão, tornando seu corpo uma casca vazia. Causa 2d10 por turno na alma por estar longe de seu corpo. O adversário também perderá toda a armadura que tiver nesse período."
    },
    {
      "nivel": 14,
      "nome": "SUPERNOVA CORROMPIDA",
      "tipo": "ativo",
      "sourceTitle": "SUPERNOVA CORROMPIDA [1 VEZ A CADA 2 DIAS, 3 TURNOS]",
      "usos": "1 VEZ A CADA 2 DIAS, 3 TURNOS",
      "subclasse": "Feiticeiro Astral",
      "desc": "O feiticeiro cria em sua mão uma esfera de energia roxa e a engole. Uma explosão massiva de energia emana de seu corpo em uma área de 100m, obliterando TODOS os inimigos em sua volta que tenham menos de 25% de vida. Após isso a forma do feiticeiro mudará, ele emanará um brilho arroxeado e ganha +2d8 em todas as suas próximas habilidades."
    },
    {
      "nivel": 14,
      "nome": "BURACO NEGRO",
      "tipo": "ativo",
      "sourceTitle": "BURACO NEGRO [1 VEZ POR DESCANSO LONGO, 3 TURNOS]",
      "usos": "1 VEZ POR DESCANSO LONGO, 3 TURNOS",
      "subclasse": "Feiticeiro Astral",
      "desc": "Da ponta dos dedos do usuário saí uma pequena esfera escura que, ao se distanciar alguns metros (até 12m), suga todas as coisas próximas para seu interior (criaturas próximas a 2m, menos o usuário). Os adversários deverão realizar um teste de resistência no começo de cada turno para ver se conseguem resistir a pressão do buraco negro (dificuldade 5+magia). Caso os adversários tenham uma parte do corpo absorvida pelo interior do buraco negro o membro será perdido para sempre."
    },
    {
      "nivel": 5,
      "nome": "LEITOR MENTAL",
      "tipo": "passiva",
      "sourceTitle": "LEITOR MENTAL",
      "subclasse": "Feiticeiro Temporal",
      "desc": "O feiticeiro consegue se lembrar de tudo o que aconteceu ao utilizar suas habilidades temporais, mesmo retrocedendo o tempo de si mesmo."
    },
    {
      "nivel": 5,
      "nome": "RETROCEDER",
      "tipo": "ativo",
      "sourceTitle": "RETROCEDER [5 VEZES POR DESCANSO CURTO]",
      "usos": "5 VEZES POR DESCANSO CURTO",
      "subclasse": "Feiticeiro Temporal",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Alvos: 1 (aliado ou inimigo) | Extra: —"
        },
        {
          "nivel": 8,
          "desc": "Alvos: 1 | Extra: Pode retroceder a si mesmo"
        },
        {
          "nivel": 14,
          "desc": "Alvos: 2 (incluindo si) | Extra: Pode retroceder a morte (menos de si)"
        }
      ],
      "desc": "O feiticeiro consegue fazer com que um de seus aliados ou um inimigo retroceda 1 turno, deixando de fazer tudo o que ele tinha feito no turno passado, incluindo danos causados e recebidos. Ele não pode retroceder a morte ou a si mesmo no primeiro nível."
    },
    {
      "nivel": 5,
      "nome": "TEMPO VAZIO",
      "tipo": "ativo",
      "sourceTitle": "TEMPO VAZIO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Feiticeiro Temporal",
      "desc": "Consegue parar o tempo de TODOS AO SEU REDOR durante 3 turnos ou 20 segundos [qualquer habilidade de dano utilizada faz com que o TEMPO VAZIO cesse]. Após utilizar esta habilidade, o feiticeiro ficará cansado. Os filhos do tempo são imunes a esta habilidade."
    },
    {
      "nivel": 5,
      "nome": "DELETAR LEMBRANÇAS",
      "tipo": "passiva",
      "sourceTitle": "DELETAR LEMBRANÇAS",
      "subclasse": "Feiticeiro Temporal",
      "desc": "O feiticeiro consegue apagar ou adicionar uma memória a um ser a sua escolha, mas por um curto período de tempo, que seria 2 horas ou 4 turnos. Só pode ser utilizada na mesma criatura uma vez POR DESCANSO LONGO. Caso o feiticeiro queira remover uma memória de uma criatura, ele terá que saber exatamente qual memória é essa."
    },
    {
      "nivel": 8,
      "nome": "GIRATEMPO",
      "tipo": "ativo",
      "sourceTitle": "GIRATEMPO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Feiticeiro Temporal",
      "desc": "Tocando a testa do alvo, o feiticeiro visualiza o passado dessa pessoa — até 10 dias atrás."
    },
    {
      "nivel": 14,
      "nome": "SALTO TEMPORAL",
      "tipo": "ativo",
      "sourceTitle": "SALTO TEMPORAL [1 VEZ POR SEMANA]",
      "usos": "1 VEZ POR SEMANA",
      "subclasse": "Feiticeiro Temporal",
      "desc": "O feiticeiro utiliza toda a sua energia para voltar 1 DIA inteiro no tempo durante 1 hora, canalizando esta habilidade. Ao voltar no tempo, ele voltará ao mesmo local em que esteve 1 dia atrás. Quando o tempo limite acabar, o feiticeiro é levado ao presente, e as ações feitas por ele no salto temporal poderão influenciar no presente ou não. O feiticeiro pode obter itens quando voltar ao tempo."
    }
  ],
  "bardo": [
    {
      "nivel": 1,
      "nome": "SOM ENCANTADO",
      "tipo": "passiva",
      "sourceTitle": "SOM ENCANTADO",
      "desc": "O Bardo pode canalizar sua magia diretamente em sua voz, liberando melodias encantadoras e feitiços sem a necessidade de auxílio de instrumentos. Seu canto se torna a própria essência da magia, envolvendo todos com o poder de sua voz e a beleza de suas palavras."
    },
    {
      "nivel": 1,
      "nome": "CONCERTO",
      "tipo": "bonus",
      "sourceTitle": "CONCERTO [UMA VEZ POR TURNO, PODE SER USADO EM UMA AÇÃO BÔNUS]",
      "usos": "UMA VEZ POR TURNO, PODE SER USADO EM UMA AÇÃO BÔNUS",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Melhoria: Efeitos padrões."
        },
        {
          "nivel": 4,
          "desc": "Melhoria: Reduzido dificuldade em 1. Aumente os efeitos de 1d2 para 1d6. Aumente os efeitos de 1d4 para 1d8. Aumente a CA recebida em +1."
        },
        {
          "nivel": 7,
          "desc": "Melhoria: Reduzido dificuldade em 1. Aumente os efeitos de 1d6 para 2d8. Aumente os efeitos de 1d8 para 2d8. Diminua a CA de inimigos em -1."
        },
        {
          "nivel": 9,
          "desc": "Melhoria: Reduzido dificuldade em 3."
        },
        {
          "nivel": 12,
          "desc": "Melhoria: Sempre que o bardo conseguir realizar um conserto ele não poderá mais errar outro concerto idêntico ou mais fácil durante o combate. Aumente os efeitos de 2d8 para 2d12."
        },
        {
          "nivel": 14,
          "desc": "Melhoria: Dificuldade inicial diminuída em 3."
        },
        {
          "nivel": 16,
          "desc": "Melhoria: A escala de dificuldade diminui em 1 adicional. Aumente os efeitos de 2d12 para 3d12."
        },
        {
          "nivel": 18,
          "desc": "Melhoria: Após 3 concertos com sucesso: 1 concerto sem dificuldade."
        }
      ],
      "desc": "A vida se desdobra como uma grandiosa apresentação, e uma apresentação verdadeiramente excepcional requer uma qualidade sonora tão mágica quanto a própria peça. O Bardo canaliza sua essência mágica em seu instrumento, infundindo suas notas com magia. Essa singularidade transforma suas músicas em rosas repletas de espinhos, cativantes, mas também letais. Em meio a um combate, o Bardo pode iniciar uma melodia, escolhendo seus acordes e misturando-os de acordo com sua vontade, seja tocando todos em harmonia ou repetindo um deles com fervor. Entretanto, caso escolha tocar mais de um acorde, ele enfrentará um desafio (rolagem de d20, com dificuldade inicial de 12), e a cada acorde adicional após o segundo, a dificuldade aumenta em 3 pontos. Vale ressaltar que os acordes perdem seu efeito após um único turno, deixando um rastro efêmero de música e magia no campo de batalha. Neste épico palco de guerra, sua música é a própria lâmina da alma."
    },
    {
      "nivel": 1,
      "nome": "PERFORMANCE",
      "tipo": "passiva",
      "sourceTitle": "PERFORMANCE",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Mudança: Padrão, o bardo pode acumular até 10+mod carisma de performance"
        },
        {
          "nivel": 5,
          "desc": "Mudança: Agora o bardo pode acumular até 20+mod carisma de performance"
        },
        {
          "nivel": 8,
          "desc": "Mudança: Pode acumular até 30+mod carisma de performance"
        },
        {
          "nivel": 12,
          "desc": "Mudança: Acúmulos recebidos são DOBRADOS"
        },
        {
          "nivel": 17,
          "desc": "Mudança: Acúmulos não se esvaem mais. Pode acumular até 40+mod carisma."
        },
        {
          "nivel": 19,
          "desc": "Mudança: Acúmulos TRIPLICADOS"
        }
      ],
      "desc": "Na vida, tudo se desdobra como uma majestosa obra de arte, inclusive o campo de batalha ensanguentado. O Bardo sempre assume o papel do maestro, conduzindo uma sinfonia épica com sua música e seu inato senso artístico. A cada passo que ele dá enquanto entoa um CONCERTO em meio a um combate, é desafiado por testes de destreza (rolagem de d20, com a dificuldade baseada na intensidade de sua performance, acrescida de 5). A cada teste superado, o Bardo acumula pontos de PERFORMANCE igual à dificuldade do teste, esses pontos podem se acumular até um total de 10 mais seu modificador de carisma, mas desvanecendo-se com o fim do dia."
    },
    {
      "nivel": 2,
      "nome": "BATIDA ESTRONDANTE",
      "tipo": "ativo",
      "sourceTitle": "BATIDA ESTRONDANTE [3 PERFORMANCE]",
      "usos": "3 PERFORMANCE",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Dano: 2d6 + mod carisma | Área: Alvo único | Extra: —"
        },
        {
          "nivel": 5,
          "desc": "Dano: 3d6+ mod carisma | Área: Alvo único | Extra: —"
        },
        {
          "nivel": 7,
          "desc": "Dano: 4d6 + mod carisma | Área: Alvo único | Extra: —"
        },
        {
          "nivel": 15,
          "desc": "Dano: 5d6 + 2x mod carisma | Área: 2x2m | Extra: —"
        },
        {
          "nivel": 19,
          "desc": "Dano: 7d6 + 2x mod carisma | Área: 3x3m | Extra: Qualquer objeto/arma"
        }
      ],
      "desc": "O Bardo reúne uma tempestade de poder em torno de seu instrumento, transformando-o em uma arma mágica. Com uma investida, ele desfere um golpe que ecoa no alvo, infligindo 2d6+modificador de Carisma de dano mágico."
    },
    {
      "nivel": 3,
      "nome": "HORIZONTE DE EVENTOS",
      "tipo": "ativo",
      "sourceTitle": "HORIZONTE DE EVENTOS [15 PERFORMANCE]",
      "usos": "15 PERFORMANCE",
      "evolucoes": [
        {
          "nivel": 3,
          "desc": "Extra: Efeito base"
        },
        {
          "nivel": 7,
          "desc": "Extra: Aumenta a cura para 3d8+mod carisma e o dano para 2d8+ mod carisma"
        },
        {
          "nivel": 13,
          "desc": "Extra: Ao fim dos 5 turnos, é realizado uma 2ª onda de luz, concedendo +3 deslocamento a todos os afetados"
        }
      ],
      "desc": "O bardo desencadeia uma onda dourada que se propaga num raio de 5x5 metros. Aliados são curados em 1d8 + mod carisma. Inimigos sofrem 1d8 + carisma de dano e -1 de deslocamento. O efeito se repete por 5 turnos."
    },
    {
      "nivel": 4,
      "nome": "CAMINHO DAS CORDAS",
      "tipo": "ativo",
      "sourceTitle": "CAMINHO DAS CORDAS [1 VEZ POR DESCANSO LONGO, 10 PERFORMANCE]",
      "usos": "1 VEZ POR DESCANSO LONGO, 10 PERFORMANCE",
      "evolucoes": [
        {
          "nivel": 4,
          "desc": "Usos: 1x desc. longo | Duração: 5 turnos (15 min)"
        },
        {
          "nivel": 13,
          "desc": "Usos: 2x desc. longo | Duração: 10 turnos (20 min) /"
        }
      ],
      "desc": "Bardo, com destreza sem igual, dedilha as cordas de seu instrumento em direção a uma parede ou estrutura, seja ela natural ou feita pelo homem. Diante de sua melodia mágica, um caminho serpenteante se materializa na parede, atravessando-a por completo. Este caminho perdura por até cinco turnos, aproximadamente 15 minutos, abrindo portas secretas e revelando passagens ocultas como testemunho do poder de sua música."
    },
    {
      "nivel": 7,
      "nome": "O DIPLOMATA",
      "tipo": "ativo",
      "sourceTitle": "O DIPLOMATA [1 VEZ POR DESCANSO CURTO, 5 PERFORMANCE]",
      "usos": "1 VEZ POR DESCANSO CURTO, 5 PERFORMANCE",
      "desc": "O Bardo com um manejo de mãos, um jogo de pés, uma postura confiante, uma voz cativante e enigmática, se torna capaz de arrebatar todos os olhares em uma discussão ou concílio. O Bardo recebe uma vantagem de 1d10 em qualquer teste de carisma nos próximos turnos ou 1 hora."
    },
    {
      "nivel": 10,
      "nome": "ENCANTO",
      "tipo": "ativo",
      "sourceTitle": "ENCANTO [5 DE PERFORMANCE PARA FUNCIONAR]",
      "usos": "5 DE PERFORMANCE PARA FUNCIONAR",
      "desc": "Sempre que alguém, inclusive criaturas, fixar seus olhos no reflexo do Bardo, será submetido a um desafio de força de vontade (rolagem de d20) com uma dificuldade igual ao modificador de Carisma do Bardo. Se falharem nesse teste, ficarão encantados pelo reflexo hipnotizante por um período de três turnos, equivalente a uma hora. Esta é a magia do espelho que captura corações e almas, refletindo a beleza e o mistério que residem dentro do próprio Bardo."
    },
    {
      "nivel": 11,
      "nome": "DOBRAR CARISMA",
      "tipo": "passiva",
      "sourceTitle": "DOBRAR CARISMA",
      "desc": "O modificador de carisma do bardo é permanentemente dobrado."
    },
    {
      "nivel": 16,
      "nome": "MOMENTUM PERPETUUM",
      "tipo": "ativo",
      "sourceTitle": "MOMENTUM PERPETUUM [CONSOME 2 AÇÕES COMPLETAS, CUSTA 20 DE PERFORMANCE]",
      "usos": "CONSOME 2 AÇÕES COMPLETAS, CUSTA 20 DE PERFORMANCE",
      "desc": "O bardo infunde uma quantidade massiva de magia em algumas notas musicais que abalam tudo num raio de 4 metros. Dentro da área, qualquer magia é instantaneamente dissipada e magias em andamento se desfazem. Essa zona de anulação mágica dura o combate inteiro. Apenas uma zona pode existir por combate — criar nova desfaz a anterior."
    },
    {
      "nivel": 20,
      "nome": "MAESTRO",
      "tipo": "ativo",
      "sourceTitle": "MAESTRO [5 DE PERFORMANCE POR USO]",
      "usos": "5 DE PERFORMANCE POR USO",
      "desc": "Com maestria incomparável, conquistada após infindáveis esforços, o Bardo ascendeu ao nível de controlador supremo das ondas sonoras em uma área de 3x3 metros ao seu redor. Nesse domínio acústico, ele pode moldar o som como um artista com seu pincel, seja silenciando completamente qualquer ruído, criando melodias que apenas seus aliados podem ouvir, ou desencadeando uma cacofonia mortal direcionada a seus inimigos. Essa é a harmonia da supremacia, onde o Bardo se torna o maestro da própria realidade sonora."
    },
    {
      "nivel": 5,
      "nome": "SOM ENCANTADO — UPGRADE",
      "tipo": "passiva",
      "sourceTitle": "SOM ENCANTADO — UPGRADE",
      "subclasse": "Artista",
      "desc": "O bardo pode transformar seu som em ARMAS SONORAS físicas. A cada 10 de Performance gastos, cria 1 Arma Sonora que pode ser arremessada (alcance 10x10m, dano = mod carisma)."
    },
    {
      "nivel": 8,
      "nome": "SINFONIA MORTAL",
      "tipo": "ativo",
      "sourceTitle": "SINFONIA MORTAL [30 PERFORMANCE, SEM AÇÃO, 1 VEZ POR TURNO]",
      "usos": "30 PERFORMANCE, SEM AÇÃO, 1 VEZ POR TURNO",
      "subclasse": "Artista",
      "evolucoes": [
        {
          "nivel": 8,
          "desc": "Custo: 20 Performance | Limite por turno: 1x/turno"
        },
        {
          "nivel": 14,
          "desc": "Custo: 40 Performance | Limite por turno: Sem limite (1 uso por Arma Sonora criada)"
        }
      ],
      "desc": "O bardo molda ondas sonoras em lâminas mortais numa área de 3x3 metros: cada lâmina causa 5x modificador de carisma de dano. Quando um inimigo morre pela sinfonia, irrompe em uma lótus de sangue que gera uma nova ARMA SONORA. Requer ao menos 1 Arma Sonora para ser usado."
    },
    {
      "nivel": 5,
      "nome": "SOM ENCANTADO — UPGRADE",
      "tipo": "passiva",
      "sourceTitle": "SOM ENCANTADO — UPGRADE",
      "subclasse": "Poeta",
      "desc": "As habilidades do bardo agora afetam equipamentos e estruturas, não apenas seres vivos. A música dá voz à história dos objetos. Curas recebidas são dobradas"
    },
    {
      "nivel": 8,
      "nome": "JUVENTUDE",
      "tipo": "passiva",
      "sourceTitle": "JUVENTUDE",
      "subclasse": "Poeta",
      "desc": "O bardo recebe a bênção da eterna juventude. O peso dos anos não mais o afligirá — permanecerá imutável. Além disso, o bardo converte qualquer sobrecura em escudo no mesmo valor, de forma infinita (tanto para ele, quanto para aliados)."
    },
    {
      "nivel": 8,
      "nome": "LULLABY",
      "tipo": "ativo",
      "sourceTitle": "LULLABY [10 DE PERFORMANCE]",
      "usos": "10 DE PERFORMANCE",
      "subclasse": "Poeta",
      "desc": "O bardo dedilha encantamentos ancestrais. Uma onda de choque sonora empurra inimigos em 5x5 metros de distância, enquanto aliados são puxados em sua direção, recebendo cura de 5d6 + mod carisma."
    },
    {
      "nivel": 8,
      "nome": "COALESCÊNCIA",
      "tipo": "passiva",
      "sourceTitle": "COALESCÊNCIA",
      "subclasse": "Poeta",
      "evolucoes": [
        {
          "nivel": 8,
          "desc": "Extra: 1 aliado, só dano do aliado escolhido."
        },
        {
          "nivel": 14,
          "desc": "Extra: Divide o dano de até 4 aliados, se desejar"
        }
      ],
      "desc": "O bardo estabelece um vínculo místico com um aliado. Qualquer dano sofrido pelo aliado é compartilhado igualmente com o bardo."
    },
    {
      "nivel": 14,
      "nome": "ACORDE DA ALMA [2 AÇÕES COMPLETAS]",
      "tipo": "passiva",
      "sourceTitle": "ACORDE DA ALMA [2 AÇÕES COMPLETAS]",
      "subclasse": "Poeta",
      "desc": "O bardo entoa um canto ancestral que concede vida a todos os objetos inanimados num raio de 5x5 metros e saem para auxiliá-lo contra os inimigos. Cada objeto ganha HP baseado em sua raridade e pode usar seus atributos normais/efeitos. Ao fim do combate, retornam ao estado inanimado."
    }
  ],
  "paladino": [
    {
      "nivel": 1,
      "nome": "FÉ",
      "tipo": "passiva",
      "sourceTitle": "FÉ",
      "desc": "Desde o início dos tempos as criaturas sempre prestaram louvores aos seres acima deles, os chamados deuses. Esses Supremos, possuidores de poderes sem igual, eram admirados e invejados, muitos mortais os adoravam apenas por benefício próprio, porém aqueles que realmente os amavam de todo seu coração eram raros e para serem distinguidos da multidão eles deveriam provar sua fé. A chamada “provação”, varia para cada ser divino, no entanto, aqueles que conseguirem superá-la serão dignos de usar certas habilidades que mortais não deveriam possuir. Mesmo que seja ínfima, eles receberão brasas da chama primordial, a fim de servir seu deus da melhor forma possível, não apenas orações e preces, mas com ações."
    },
    {
      "nivel": 1,
      "nome": "PODER DA CRENÇA",
      "tipo": "ativo",
      "sourceTitle": "PODER DA CRENÇA [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "desc": "A aura do paladino envolve uma de suas armas, ao ponto de iluminar o local em sua volta (3m). Qualquer ataque desferido por esta arma enquanto estiver envolvida pela aura(2 turnos), causará um dado de dano adicional + seu modificador de magia."
    },
    {
      "nivel": 1,
      "nome": "EFEITO COLATERAL",
      "tipo": "passiva",
      "sourceTitle": "EFEITO COLATERAL",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Mudança: Não acumula"
        },
        {
          "nivel": 10,
          "desc": "Mudança: Acumula infinitamente"
        }
      ],
      "desc": "A sua crença lhe concede um efeito contra inimigos, por meio de suas habilidades. Entretanto, ela não acumula."
    },
    {
      "nivel": 1,
      "nome": "COLABORAÇÃO",
      "tipo": "passiva",
      "sourceTitle": "COLABORAÇÃO",
      "desc": "Quando o Paladino acerta um golpe crítico em inimigos, eles recebem o EFEITO COLATERAL por 1 turno. Quando atingido por um golpe crítico, o Paladino responde com um contra-ataque certeiro e aplicando o EFEITO COLATERAL também por 1 turno."
    },
    {
      "nivel": 1,
      "nome": "REVITALIZAR",
      "tipo": "ativo",
      "sourceTitle": "REVITALIZAR [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Usos: 1x desc. longo | Cura: 2d4 + magia + carisma | Extra: —"
        },
        {
          "nivel": 4,
          "desc": "Usos: 1x desc. longo | Cura: 4d4 + magia + carisma | Extra: —"
        },
        {
          "nivel": 7,
          "desc": "Usos: 2x desc. longo | Cura: 4d4 + magia + carisma | Extra: —"
        },
        {
          "nivel": 10,
          "desc": "Usos: 2x desc. longo | Cura: 6d4 + magia + carisma | Extra: —"
        },
        {
          "nivel": 13,
          "desc": "Usos: 3x desc. longo | Cura: 7d4 + magia + carisma | Extra: Cura efeitos mentais"
        },
        {
          "nivel": 16,
          "desc": "Usos: 3x desc. longo | Cura: 9d4 + magia + carisma | Extra: Pode ser ação bônus"
        },
        {
          "nivel": 19,
          "desc": "Usos: 4x desc. longo | Cura: 10d4 + magia + carisma | Extra: —"
        }
      ],
      "desc": "O paladino conjura a energia de cura em suas mãos, curando a si mesmo ou um aliado no valor de 2d4+magia+carisma."
    },
    {
      "nivel": 2,
      "nome": "EXTRA-SENSORIAL",
      "tipo": "passiva",
      "sourceTitle": "EXTRA-SENSORIAL",
      "desc": "O Paladino detecta a presença de quem se opõe à sua crença num raio de 12 metros."
    },
    {
      "nivel": 2,
      "nome": "MARCAÇÃO DA NEUTRALIDADE",
      "tipo": "passiva",
      "sourceTitle": "MARCAÇÃO DA NEUTRALIDADE",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Extra: Efeito base"
        },
        {
          "nivel": 6,
          "desc": "Extra: Quebrar marca aplica EFEITO COLATERAL por 1 turno"
        }
      ],
      "desc": "Ataques e habilidades do Paladino marcam os alvos por 2 turnos. Alvos marcados são detectáveis em qualquer lugar e não podem fazer ataques surpresa contra o Paladino. Ao atacar alguém marcado: a marca quebra, causa 1d6 de dano adicional e concede ao jogador 1 ação extra (máx 2 extras por turno)."
    },
    {
      "nivel": 3,
      "nome": "CORTE LUAR",
      "tipo": "ativo",
      "sourceTitle": "CORTE LUAR [3 VEZES POR DESCANSO LONGO]",
      "usos": "3 VEZES POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 3,
          "desc": "Usos: 3x | Dano: 2d6 + magia | Área: 2x2 | Extra: —"
        },
        {
          "nivel": 6,
          "desc": "Usos: 3x | Dano: 4d6 + magia | Área: 2x2 | Extra: Crítico = 2 usos por 1"
        },
        {
          "nivel": 9,
          "desc": "Usos: 3x | Dano: 6d6 + magia | Área: 4x4 | Extra: —"
        },
        {
          "nivel": 12,
          "desc": "Usos: 4x | Dano: 7d6 + magia | Área: 4x4 | Extra: Aplica efeito colateral antes da explosão"
        }
      ],
      "desc": "O Paladino libera uma energia em forma de meia-lua imbuída com a aura de sua divindade, lançando-a em linha reta. Ao tocar qualquer superfície, desencadeia uma explosão com EFEITO COLATERAL nos atingidos."
    },
    {
      "nivel": 4,
      "nome": "DEFESA ABSOLUTA",
      "tipo": "passiva",
      "sourceTitle": "DEFESA ABSOLUTA",
      "desc": "O carisma do Paladino concede defesa permanente igual ao seu modificador de carisma."
    },
    {
      "nivel": 4,
      "nome": "NEUTRALIZAR",
      "tipo": "ativo",
      "sourceTitle": "NEUTRALIZAR [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "desc": "Um feixe luminoso com a cor da aura divina atinge todos os alvos no campo de batalha: 3d6+ mod carisma de dano mágico."
    },
    {
      "nivel": 5,
      "nome": "FRESCOR DA ALIANÇA",
      "tipo": "ativo",
      "sourceTitle": "FRESCOR DA ALIANÇA [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "desc": "O Paladino cura todos os aliados num raio de 6 metros com o valor da metade dos dados de Revitalizar + mod carisma."
    },
    {
      "nivel": 5,
      "nome": "VITALIDADE",
      "tipo": "passiva",
      "sourceTitle": "VITALIDADE",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Extra: Imune a veneno"
        },
        {
          "nivel": 10,
          "desc": "Extra: Imune a toda doença"
        }
      ],
      "desc": "Venenos curam o Paladino ao invés de causar dano."
    },
    {
      "nivel": 7,
      "nome": "PURGE",
      "tipo": "ativo",
      "sourceTitle": "PURGE [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 7,
          "desc": "Dano: 7d4 + mod magia + mod força | Extra: —"
        },
        {
          "nivel": 13,
          "desc": "Dano: 10d4 + mod magia + mod força | Extra: Acerto = efeito de Neutralizar"
        },
        {
          "nivel": 19,
          "desc": "Dano: 10d8 + mod magia + mod força | Extra: +1 disparo extra por uso"
        }
      ],
      "desc": "Uma das armas que o paladino empunha é rodeada pela aura de sua divindade, causando intimidação a todos os inimigos próximos momentâneamente. Essa luz pode ser disparada da arma do paladino apenas com um movimento do objeto, podendo atingir alvos que estão alinhados (chega até a 20m linha reta). Inimigos atingidos por essa luz receberão 7d4+mod magia+mod força de dano de fogo."
    },
    {
      "nivel": 8,
      "nome": "CONJURAÇÃO LEGIONÁRIA",
      "tipo": "passiva",
      "sourceTitle": "CONJURAÇÃO LEGIONÁRIA",
      "desc": "O Paladino pode realizar 2 ataques ou habilidades numa única ação."
    },
    {
      "nivel": 8,
      "nome": "PROTEÇÃO MORTAL",
      "tipo": "ativo",
      "sourceTitle": "PROTEÇÃO MORTAL [2 VEZES POR DESCANSO LONGO, 1 VEZ POR PESSOA/DIA]",
      "usos": "2 VEZES POR DESCANSO LONGO, 1 VEZ POR PESSOA/DIA",
      "desc": "O paladino conjura uma proteção que resiste a qualquer tipo de ataque dos seres do plano terreno, bloqueando tudo enquanto estiver presente nesta barreira absoluta. Caso algum inimigo o ataque neste estado, se cure no valor de (mod carisma). Pode utilizar em aliados, porém não receberão a cura desta barreira. Dura 2 turnos."
    },
    {
      "nivel": 9,
      "nome": "ENERGIA PURA",
      "tipo": "ativo",
      "sourceTitle": "ENERGIA PURA [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 9,
          "desc": "Usos: 2x desc. longo | Extra: Intercepta magias"
        },
        {
          "nivel": 14,
          "desc": "Usos: 3x desc. longo | Extra: Também intercepta ataques a distância (flechas e derivados)"
        }
      ],
      "desc": "O Paladino conjura uma esfera de energia pura. Ao colidir com outra habilidade mágica, ambas se neutralizam. Se atingir diretamente um inimigo, o atordoara por 1 turno. Pode ser usada como reação ou ação bônus."
    },
    {
      "nivel": 11,
      "nome": "EQUILÍBRIO DA NEUTRALIDADE",
      "tipo": "passiva",
      "sourceTitle": "EQUILÍBRIO DA NEUTRALIDADE",
      "desc": "Todos os modificadores de atributos negativos do Paladino se tornam iguais a 1."
    },
    {
      "nivel": 11,
      "nome": "DEVASTAÇÃO DO ZODÍACO",
      "tipo": "ativo",
      "sourceTitle": "DEVASTAÇÃO DO ZODÍACO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 11,
          "desc": "Usos: 1x | Testes: 3 | Dificuldade: 10 | Dano/raio: 2d8 + carisma"
        },
        {
          "nivel": 14,
          "desc": "Usos: 1x | Testes: 4 | Dificuldade: 12 | Dano/raio: 3d8 + carisma"
        },
        {
          "nivel": 18,
          "desc": "Usos: 2x | Testes: 4 | Dificuldade: 14 | Dano/raio: 3d8 + carisma"
        }
      ],
      "desc": "O paladino conjura uma rajada de trovões vindo diretamente dos céus aos seus inimigos. Cada inimigo no combate roda três dados de resistência contra três raios (dificuldade 10), os inimigos serão atingidos pelo mesmo número de falhas. Cada raio causa 2d8+carisma de dano. Cada um dos raios aplica a marca da habilidade MARCAÇÃO DA NEUTRALIDADE, tal como quebrar elas."
    },
    {
      "nivel": 12,
      "nome": "DIVINE SMITE",
      "tipo": "ativo",
      "sourceTitle": "DIVINE SMITE [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 12,
          "desc": "Usos: 1x | Dano: 10d8 + mod magia + mod força"
        },
        {
          "nivel": 17,
          "desc": "Usos: 2x | Dano: 20d8 + mod magia + mod força"
        }
      ],
      "desc": "O paladino invoca dos céus um feixe celestial condensado, que percorre até o chão, numa área circular de 15 metros. Todos os alvos atingidos pelo feixe sofrem 10d8+mod magia+mod força e aplica o EFEITO COLATERAL."
    },
    {
      "nivel": 15,
      "nome": "PURIFICAR",
      "tipo": "ativo",
      "sourceTitle": "PURIFICAR [3 VEZES POR DESCANSO CURTO]",
      "usos": "3 VEZES POR DESCANSO CURTO",
      "desc": "Quando o Paladino estiver sob controle (paralisado, cansado, atordoado), uma onda de luz irradia de seu peito, libertando-o. Tocar aliados com a esfera liberta-os também. É usado automaticamente como uma reação após receber qualquer controle."
    },
    {
      "nivel": 16,
      "nome": "CLAREZA",
      "tipo": "ativo",
      "sourceTitle": "CLAREZA [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "desc": "O Paladino se concentra e sua aura se estende por 150 metros, revelando objetos mágicos e criaturas ocultas."
    },
    {
      "nivel": 18,
      "nome": "ABENÇOADO",
      "tipo": "passiva",
      "sourceTitle": "ABENÇOADO",
      "desc": "O Paladino sempre age primeiro em qualquer combate, inclusive em situações de ataque surpresa."
    },
    {
      "nivel": 20,
      "nome": "ABOVE ALL",
      "tipo": "ativo",
      "sourceTitle": "ABOVE ALL [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "A bênção da divindade é enviada diretamente para o paladino, infringindo o EFEITO COLATERAL para todos os inimigos presentes no combate. O paladino fica envolto de uma aura, recebendo pequenas características físicas de sua divindade (cabelos e olhos). Neste estado, todos seus ataques serão certeiros e não terá limites de deslocamento. Além disso, receberá apenas metade do dano de qualquer fonte e caso for receber um dano capaz de zerar a vida, ficará com 1 ponto até o fim da benção. A benção dura 5 turnos."
    },
    {
      "nivel": 20,
      "nome": "GLOBAL DIVE",
      "tipo": "ativo",
      "sourceTitle": "GLOBAL DIVE [CUSTA 4d8 DE VIDA]",
      "usos": "CUSTA 4d8 DE VIDA",
      "desc": "Em troca de sua vida, o paladino empresta o poder de sua divindade para realizar o avanço mais poderoso. Caso já tenha entrado em contato com uma criatura específica, o jogador poderá surgir, diante deste avanço pelos céus, na direção do alvo, independentemente de sua distância ou plano terreno. Após entrar em contato com o inimigo, cause o dano de sua arma."
    },
    {
      "nivel": 5,
      "nome": "ONDA DA JUSTIÇA",
      "tipo": "bonus",
      "sourceTitle": "ONDA DA JUSTIÇA",
      "subclasse": "Paladino Justiceiro",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Alcance: 8m | Dano da aura: Dano arma + 2d4 mágico | Extra: Consome aura"
        },
        {
          "nivel": 8,
          "desc": "Alcance: Ilimitado no combate | Dano da aura: Dano arma + 3d4 | Extra: Consome aura"
        },
        {
          "nivel": 14,
          "desc": "Alcance: Ilimitado | Dano da aura: Dano arma + 5d4 | Extra: NÃO consome. Efeito colateral ACUMULA"
        }
      ],
      "desc": "Os ataques corpo-a-corpo do Paladino agora carregam sua aura divina. Além disso, pode disparar a aura como ataque à distância, atingindo alvos na trajetória e aplicando EFEITO COLATERAL. Após a aura ser consumida, o paladino precisará de uma ação bônus para imbuir sua aura novamente."
    },
    {
      "nivel": 8,
      "nome": "A VERDADEIRA JUSTIÇA",
      "tipo": "passiva",
      "sourceTitle": "A VERDADEIRA JUSTIÇA",
      "subclasse": "Paladino Justiceiro",
      "desc": "Ao final de cada turno, o Paladino se cura no valor proporcional ao dano de seu 1º ataque neste turno (caso não tenha efetuado nenhum dano, se cure em 5)."
    },
    {
      "nivel": 14,
      "nome": "BENÇÃO",
      "tipo": "passiva",
      "sourceTitle": "BENÇÃO",
      "subclasse": "Paladino Justiceiro",
      "desc": "Uma dádiva divina envolve permanentemente o Paladino — asas, auréola, capa ou outro atributo de sua divindade. Efeito passivo ilimitado, em harmonia com a vontade do jogador."
    },
    {
      "nivel": 5,
      "nome": "INQUISIÇÃO",
      "tipo": "passiva",
      "sourceTitle": "INQUISIÇÃO",
      "subclasse": "Paladino Inquisidor da Morte",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Extra: Registro sagrado"
        },
        {
          "nivel": 14,
          "desc": "Extra: Finca arma no solo e invoca os cadáveres cujos nomes recorda. Mantêm força e habilidades de vida"
        }
      ],
      "desc": "O Paladino grava na memória os nomes de todos que matou em nome da divindade."
    },
    {
      "nivel": 5,
      "nome": "OBRA DIVINA",
      "tipo": "ativo",
      "sourceTitle": "OBRA DIVINA [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "subclasse": "Paladino Inquisidor da Morte",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Usos: 2x desc. curto | Dano: 5d4 + mod magia | Extra: Danos superficiais a construções"
        },
        {
          "nivel": 8,
          "desc": "Usos: 3x desc. curto | Dano: 9d4 + mod magia | Extra: Grandes danos a construções"
        },
        {
          "nivel": 14,
          "desc": "Usos: 4x desc. curto | Dano: 14d4 + mod magia | Extra: Tremores em 35m ao atingir solo"
        }
      ],
      "desc": "Com um gesto do indicador, o Paladino traça um desenho sagrado que desencadeia ondas de raios energéticos sem limite de alcance, com a cor da divindade."
    },
    {
      "nivel": 8,
      "nome": "INQUISIDOR DA MORTE",
      "tipo": "passiva",
      "sourceTitle": "INQUISIDOR DA MORTE",
      "subclasse": "Paladino Inquisidor da Morte",
      "desc": "O jogador espeta a ponta de sua arma no chão e invoca vários cadáveres que foram mortos pelas suas mãos, para lutar em seu nome por um período de tempo. O jogador só invocará os seres dos quais lembrar o nome. Cada um dos cadáveres apresenta sua força e habilidades originais de quando ainda estavam vivos. Eles duram apenas 1d4+carisma turnos. TABELA DE EFEITOS COLATERAIS POR DIVINDADE"
    }
  ],
  "espadachim": [
    {
      "nivel": 1,
      "nome": "PERÍCIA DA ESPADA",
      "tipo": "passiva",
      "sourceTitle": "PERÍCIA DA ESPADA",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Extra: +2 de iniciativa com espadas/katanas"
        },
        {
          "nivel": 3,
          "desc": "Extra: Aumenta dado de dano base dessas armas em 1"
        },
        {
          "nivel": 5,
          "desc": "Extra: Pode atacar 2x numa ação com essas armas"
        }
      ],
      "desc": "Quando empunha espada, katana ou armas similares, o espadachim ganha +2 de iniciativa."
    },
    {
      "nivel": 1,
      "nome": "PERFURAÇÃO DA LÂMINA",
      "tipo": "ativo",
      "sourceTitle": "PERFURAÇÃO DA LÂMINA [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Usos: 2x desc. longo | Dano adicional: 2d4 + mod dest | Crítico extra: +1d4 | Extra: —"
        },
        {
          "nivel": 4,
          "desc": "Usos: 3x desc. longo | Dano adicional: 3d4 + mod dest | Crítico extra: +2d4 | Extra: Pode ser ação bônus"
        },
        {
          "nivel": 8,
          "desc": "Usos: 3x desc. longo | Dano adicional: 5d4 + mod dest | Crítico extra: +2d4 | Extra: —"
        },
        {
          "nivel": 12,
          "desc": "Usos: 3x desc. longo | Dano adicional: 7d4 + mod dest | Crítico extra: +3d4 | Extra: —"
        },
        {
          "nivel": 14,
          "desc": "Usos: 3x desc. longo | Dano adicional: 8d4 + mod dest | Crítico extra: +5d4 | Extra: —"
        },
        {
          "nivel": 19,
          "desc": "Usos: 3x desc. longo | Dano adicional: 10d4 + mod dest | Crítico extra: +7d4 | Extra: —"
        }
      ],
      "desc": "O espadachim dispara em direção ao alvo (a no máximo 5m de distância) atravessando-o com sua arma, causando 2d4+mod destreza de dano adicional. Ataques críticos causam 1d4 de dano adicional."
    },
    {
      "nivel": 2,
      "nome": "POSTURAS DE COMBATE",
      "tipo": "passiva",
      "sourceTitle": "POSTURAS DE COMBATE",
      "desc": "O espadachim adota permanentemente uma de quatro posturas. A escolha é definitiva e não pode ser alterada."
    },
    {
      "nivel": 3,
      "nome": "CRÍTICO APRIMORADO",
      "tipo": "passiva",
      "sourceTitle": "CRÍTICO APRIMORADO",
      "evolucoes": [
        {
          "nivel": 3,
          "desc": "Crítico em: 19"
        },
        {
          "nivel": 9,
          "desc": "Crítico em: 18 e 19"
        },
        {
          "nivel": 12,
          "desc": "Crítico em: Crítico também cura igual ao dano causado"
        },
        {
          "nivel": 18,
          "desc": "Crítico em: 17, 18 e 19"
        }
      ],
      "desc": "19 no dado de acerto também é um acerto crítico."
    },
    {
      "nivel": 3,
      "nome": "O ZÉFIRO",
      "tipo": "ativo",
      "sourceTitle": "O ZÉFIRO [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "desc": "O espadachim corta o ar com sua arma, criando uma barreira invisível de velocidade capaz de interceptar projéteis. Pode ser usado como reação."
    },
    {
      "nivel": 4,
      "nome": "LÂMINA DA VINGANÇA",
      "tipo": "ativo",
      "sourceTitle": "LÂMINA DA VINGANÇA [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "O espadachim convoca o espírito da vingança: pode refletir um golpe físico recebido para o alvo mais próximo. Não se aplica a danos mágicos."
    },
    {
      "nivel": 6,
      "nome": "TEMPESTADE DE AÇO",
      "tipo": "ativo",
      "sourceTitle": "TEMPESTADE DE AÇO [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 6,
          "desc": "Usos: 2x desc. longo | Dano adicional: 2d4 | Extra: Crítico = sangramento 2 turnos"
        },
        {
          "nivel": 17,
          "desc": "Usos: 3x desc. longo | Dano adicional: 10d4 | Extra: Desvia de projéteis. Sangramento até fim do combate"
        }
      ],
      "desc": "Desapareça durante uma brisa, e num piscar de olhos atinja todos os inimigos do combate com sua arma, causando 2d4 de dano adicional. Utilizando como uma reação é possível desviar de golpes físicos. Acertos críticos deixam alvos sangrando por 2 turnos."
    },
    {
      "nivel": 7,
      "nome": "CORTE LATERAL",
      "tipo": "ativo",
      "sourceTitle": "CORTE LATERAL [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "Realize um corte lateral com sua arma, de forma concentrada e bela. A força e a área do CORTE LATERAL baseia-se no nível de destreza do jogador, causa efeitos de contato e é um ataque certeiro, porém não causa acertos críticos. Caso o espadachim possua 10 pontos ou menos em destreza, cause 1d6+mod destreza de dano físico adicional, numa área de até 4m. Caso tenha de 11 à 15 de destreza, causa 4d6+mod destreza de dano físico adicional, numa área de até 9m. Caso tenha de 16 à 20 de destreza, cause 8d8+mod destreza de dano físico adicional, numa área de até 20m. Caso tenha mais de 20 de destreza, cause 16d10+mod destreza de dano REAL adicional, numa área de até 50m."
    },
    {
      "nivel": 8,
      "nome": "ARMA PESADA",
      "tipo": "passiva",
      "sourceTitle": "ARMA PESADA",
      "evolucoes": [
        {
          "nivel": 8,
          "desc": "Multiplicador: 3x"
        },
        {
          "nivel": 20,
          "desc": "Multiplicador: 4x"
        }
      ],
      "desc": "A fúria do espadachim transforma seus críticos: ao invés de 2x dano, causam 3x dano normal."
    },
    {
      "nivel": 9,
      "nome": "EVANESCÊNCIA",
      "tipo": "ativo",
      "sourceTitle": "EVANESCÊNCIA [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "desc": "Quando o espadachim entrar em um estado crítico de sua vida, receberá uma defesa provinda de seus sentidos. Receba um escudo sobreposto a vida quando chegar a metade de sua vida, com valor equivalente ao dobro de seu modificador de destreza. Quando o escudo for destruído, realize uma ação."
    },
    {
      "nivel": 11,
      "nome": "ÚLTIMO SUSPIRO",
      "tipo": "ativo",
      "sourceTitle": "ÚLTIMO SUSPIRO [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "desc": "Por meio de seu ataque, crie uma corrente de vento que é percorrida vários metros de distância, causando 8d6+mod de destreza de dano mágico no primeiro alvo até a 20m de distância. Alvos atingidos são atordoados por 1 turno."
    },
    {
      "nivel": 13,
      "nome": "IMPACTO DA LÂMINA",
      "tipo": "ativo",
      "sourceTitle": "IMPACTO DA LÂMINA [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "Uma série avassaladora de 3 ataques consecutivos num único alvo. Cada golpe causa o dobro de dados da arma + 3d6 de dano total adicional. Se o espadachim acertou um crítico antes, pode usar essa habilidade sem gastar ação."
    },
    {
      "nivel": 15,
      "nome": "ETÉREO",
      "tipo": "ativo",
      "sourceTitle": "ETÉREO [1 VEZ POR TURNO]",
      "usos": "1 VEZ POR TURNO",
      "desc": "Ataques contra alvos ATORDOADOS se tornam automaticamente críticos."
    },
    {
      "nivel": 20,
      "nome": "O HORIZONTE",
      "tipo": "ativo",
      "sourceTitle": "O HORIZONTE [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "desc": "Realize um golpe horizontal, cortando tudo em seu campo de visão numa área de até 100m (consegue cortar até construções pesadas), causando 8d10 de dano adicional em todos os alvos atingidos. Ao ficar com menos da metade de sua vida, utilize essa habilidade automaticamente, sem o uso de ações."
    },
    {
      "nivel": 5,
      "nome": "MANIPULAÇÃO DAS SOMBRAS",
      "tipo": "passiva",
      "sourceTitle": "MANIPULAÇÃO DAS SOMBRAS",
      "subclasse": "Espadachim das Sombras",
      "desc": "O espadachim ganhou a capacidade de poder manipular as sombras da forma que quiser, podendo alterar as sombras de coisas já existentes ou até mesmo criar novas sombras com formatos diversos, até mesmo palpáveis. Pode: Alterar o aspecto físico das sombras e etc; Pode criar objetos de tamanho médio feito de sombras que são palpáveis, mas obviamente são reconhecidos visualmente como um objeto de sombras; Pode criar seres que atuam da forma que o espadachim quer."
    },
    {
      "nivel": 5,
      "nome": "CRIATURAS DAS SOMBRAS",
      "tipo": "ativo",
      "sourceTitle": "CRIATURAS DAS SOMBRAS [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "subclasse": "Espadachim das Sombras",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Criaturas: 1 | Extra: —"
        },
        {
          "nivel": 8,
          "desc": "Criaturas: 2 | Extra: —"
        },
        {
          "nivel": 14,
          "desc": "Criaturas: 3 | Extra: Pode trocar de lugar com uma criatura"
        }
      ],
      "desc": "Com a manipulação das sombras, o espadachim tem poder para criar estas criaturas, que obedecerão totalmente ao espadachim, podendo atacar inimigos caso ele deseje. Pode ser utilizado apenas uma criatura das sombras por vez. Seres sombrios não podem possuir manejo de armas, e são dissipados após 1 ataque. Como seres dessa forma não podem usar armas, eles podem apenas utilizar de seu corpo para infligir danos ao inimigo, podendo mudar o formato de suas partes corporais, tudo de acordo com o desejo do espadachim. O dano causado por este tipo de ser é igual a metade do dano da arma atual do espadachim (não infligindo qualquer efeito mágico da arma)."
    },
    {
      "nivel": 8,
      "nome": "UM COM AS SOMBRAS",
      "tipo": "ativo",
      "sourceTitle": "UM COM AS SOMBRAS [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "subclasse": "Espadachim das Sombras",
      "desc": "O corpo do espadachim é envolvido por completo por uma aura negra, eliminando sua presença totalmente mesmo se movimentando. Enquanto o espadachim estiver neste estado, seu deslocamento é dobrado. Quando o espadachim receber um dano, a aura envolvida nele irá se dissipar. Caso o espadachim não receba ou realize qualquer ataque, esta habilidade vai durar apenas por 3 turnos ou 5 minutos."
    },
    {
      "nivel": 8,
      "nome": "CORTE SOMBRIO",
      "tipo": "passiva",
      "sourceTitle": "CORTE SOMBRIO",
      "subclasse": "Espadachim das Sombras",
      "desc": "O espadachim envolve sua lâmina com o poder das sombras. Agora todos os ataques do espadachim causarão um dado adicional equivalente ao dado da arma."
    },
    {
      "nivel": 14,
      "nome": "EU SOU AS SOMBRAS",
      "tipo": "ativo",
      "sourceTitle": "EU SOU AS SOMBRAS [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "subclasse": "Espadachim das Sombras",
      "desc": "Ao atacar um inimigo enquanto estiver envolvido por sombras, o espadachim poderá desferir outro ataque."
    },
    {
      "nivel": 14,
      "nome": "ESCURIDÃO",
      "tipo": "ativo",
      "sourceTitle": "ESCURIDÃO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Espadachim das Sombras",
      "desc": "O espadachim se funde completamente com as sombras por 1 turno: intangível, pode alterar forma do corpo e equipamentos, estender alcance e afiar lâminas."
    },
    {
      "nivel": 5,
      "nome": "CLIMA INSTÁVEL",
      "tipo": "passiva",
      "sourceTitle": "CLIMA INSTÁVEL",
      "subclasse": "Espadachim da Tempestade",
      "desc": "O espadachim é afetado pelo clima, recebendo bônus situacionais:"
    },
    {
      "nivel": 5,
      "nome": "GOLPE TROVÃO",
      "tipo": "ativo",
      "sourceTitle": "GOLPE TROVÃO [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "subclasse": "Espadachim da Tempestade",
      "desc": "A lâmina é envolvida por trovões. O próximo golpe gera corrente de raios azuis que atinge TODOS os inimigos no campo: 4d4 de dano mágico."
    },
    {
      "nivel": 8,
      "nome": "RESISTÊNCIA ENERGÉTICA",
      "tipo": "passiva",
      "sourceTitle": "RESISTÊNCIA ENERGÉTICA",
      "subclasse": "Espadachim da Tempestade",
      "desc": "O espadachim se torna imune a paralisia e atordoamento."
    },
    {
      "nivel": 8,
      "nome": "CORAÇÃO DA TEMPESTADE",
      "tipo": "passiva",
      "sourceTitle": "CORAÇÃO DA TEMPESTADE",
      "subclasse": "Espadachim da Tempestade",
      "desc": "Todos os ataques e habilidades do espadachim ganham +1d10 de dano adicional permanente, acompanhado por pequenos raios que o envolvem constantemente."
    },
    {
      "nivel": 14,
      "nome": "SOPRO CLIMÁTICO",
      "tipo": "ativo",
      "sourceTitle": "SOPRO CLIMÁTICO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Espadachim da Tempestade",
      "desc": "O espadachim lança um sopro aos céus que desencadeia chuva torrencial e tempestade numa área de 100m². Dura o combate inteiro (ou 15 min fora). Ativa todos os bônus de CLIMA INSTÁVEL simultaneamente."
    },
    {
      "nivel": 14,
      "nome": "ALEGAÇÃO DA TEMPESTADE",
      "tipo": "passiva",
      "sourceTitle": "ALEGAÇÃO DA TEMPESTADE",
      "subclasse": "Espadachim da Tempestade",
      "desc": "Quando um inimigo ataca o espadachim corpo-a-corpo, é violentamente empurrado 3 metros e sofre dano do Coração da Tempestade."
    }
  ],
  "ceifeiro": [
    {
      "nivel": 1,
      "nome": "PRIMEIRO CORTE",
      "tipo": "passiva",
      "sourceTitle": "PRIMEIRO CORTE",
      "desc": "O primeiro ataque do Ceifeiro contra qualquer alvo carrega energia adicional, causando +1d8 de dano adicional. O dano total causado se converte numa barreira mística sobreposta à vida que dura o combate inteiro."
    },
    {
      "nivel": 1,
      "nome": "AMULETO",
      "tipo": "passiva",
      "sourceTitle": "AMULETO",
      "desc": "O amuleto misterioso (e inquebrável) concede ao Ceifeiro uma ressurreição única. Caso morra em batalha, volta à vida completamente restaurado. Após isso, a coloração esverdeada do amuleto se desfaz e o efeito nunca mais será ativado."
    },
    {
      "nivel": 1,
      "nome": "ATAQUE ESPECTRAL",
      "tipo": "ativo",
      "sourceTitle": "ATAQUE ESPECTRAL [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Usos: 2x desc. longo | Dano à distância: 4d4 + mod magia | Dano corpo-a-corpo: 2d4 + mod magia | Extra: —"
        },
        {
          "nivel": 7,
          "desc": "Usos: 2x desc. longo | Dano à distância: 6d6 + mod magia | Dano corpo-a-corpo: 3d6 + mod magia | Extra: —"
        },
        {
          "nivel": 14,
          "desc": "Usos: 3x desc. longo | Dano à distância: 6d8 + mod magia | Dano corpo-a-corpo: 4d6 + mod magia | Extra: Atinge um raio de 2m"
        },
        {
          "nivel": 20,
          "desc": "Usos: 3x desc. longo | Dano à distância: 10d10 + mod magia | Dano corpo-a-corpo: 6d10 + mod magia | Extra: Atinge um raio de 3m"
        }
      ],
      "desc": "O Ceifeiro invoca chamas verdes espectrais e as canaliza em sua arma. Pode arremessar as chamas (4d4 + mod magia) ou imbuir a arma, causando dano adicional em seu próximo ataque (2d4 + mod magia)."
    },
    {
      "nivel": 2,
      "nome": "FOCO",
      "tipo": "ativo",
      "sourceTitle": "FOCO [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "desc": "O Ceifeiro mira num ponto frágil do alvo, causando o modificador de força como dano adicional. O alvo fica assustado, perdendo 1 dado de dano até o fim do combate. 1x por inimigo. Se o alvo já tiver apenas 1 dado: causa metade do dano desse dado."
    },
    {
      "nivel": 2,
      "nome": "TOQUE DA TRAIÇÃO",
      "tipo": "ativo",
      "sourceTitle": "TOQUE DA TRAIÇÃO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "Com um toque na testa do inimigo, o Ceifeiro drena 20% da vida total do alvo, convertendo em escudo sobreposto à vida pelo combate. Concede +1 de corrupção. Não funciona em alvos 3+ níveis acima."
    },
    {
      "nivel": 3,
      "nome": "INVASÃO SUPERFICIAL",
      "tipo": "ativo",
      "sourceTitle": "INVASÃO SUPERFICIAL [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "O ceifeiro invade a mente de um alvo com seu poder sobrenatural, causando medo extremo no inimigo que não resiste. O alvo terá que realizar um teste de resistência de constituição (dificuldade 1d10+magia). Inimigos burros e impensantes não sofrerão com tal habilidade. Alvos afetados recebem 3d10+magia de dano mágico."
    },
    {
      "nivel": 3,
      "nome": "ENERGIA VITAL",
      "tipo": "passiva",
      "sourceTitle": "ENERGIA VITAL",
      "desc": "O Ceifeiro pode manipular energia de criaturas recém-mortas de duas formas: - CONSUMIR: +1 CORRUPÇÃO. Role 1d20: 1-7 = +1 Força, 8-14 = +1 Magia, 15-20 = +1 Inteligência (permanente). - LIBERTAR: +1 LIBERTAÇÃO. Role 1d20: 1-7 = +5 HP, 8-14 = +1 Sorte, 15-20 = +1 Carisma (permanente)."
    },
    {
      "nivel": 4,
      "nome": "PRÓXIMAS INSTÂNCIAS",
      "tipo": "passiva",
      "sourceTitle": "PRÓXIMAS INSTÂNCIAS",
      "desc": "Após atacar um alvo pela primeira vez, o Ceifeiro causa um dado de dano adicional naquele mesmo inimigo nos próximos turnos, até o fim do combate."
    },
    {
      "nivel": 4,
      "nome": "INTO ASHES",
      "tipo": "ativo",
      "sourceTitle": "INTO ASHES [3 VEZES POR DESCANSO LONGO]",
      "usos": "3 VEZES POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 4,
          "desc": "Extra: Intangível (reação)"
        },
        {
          "nivel": 12,
          "desc": "Extra: Pode surgir atrás de um inimigo e realizar movimento básico"
        }
      ],
      "desc": "O Ceifeiro se converte em chamas verdes espectrais, tornando-se intangível. Pode ser usada como reação para escapar de perigo."
    },
    {
      "nivel": 4,
      "nome": "SENSO PRIMORDIAL",
      "tipo": "passiva",
      "sourceTitle": "SENSO PRIMORDIAL",
      "desc": "O Ceifeiro identifica a condição dos inimigos: ferimentos leves, médios ou graves, e se estão dominados pelo medo."
    },
    {
      "nivel": 4,
      "nome": "PERCEPÇÃO SUPERNATURAL",
      "tipo": "passiva",
      "sourceTitle": "PERCEPÇÃO SUPERNATURAL",
      "desc": "O Ceifeiro enxerga espíritos errantes, espectros e almas perdidas. Não pode se comunicar com eles (ainda), mas os reconhece."
    },
    {
      "nivel": 5,
      "nome": "ANJO CAÍDO / O ASCENDENTE",
      "tipo": "passiva",
      "sourceTitle": "ANJO CAÍDO / O ASCENDENTE",
      "desc": "De noite: Discerne impurezas, pensamentos negativos, temores e segredos de todas as criaturas ao redor. De dia: Contempla pensamentos positivos, desejos, aspirações e conquistas de todas as criaturas."
    },
    {
      "nivel": 5,
      "nome": "RETRIBUIÇÃO",
      "tipo": "passiva",
      "sourceTitle": "RETRIBUIÇÃO",
      "desc": "O amuleto resplandece com cores que refletem as quantidades de CORRUPÇÃO e LIBERTAÇÃO acumuladas."
    },
    {
      "nivel": 6,
      "nome": "CORTE CIRCULAR",
      "tipo": "ativo",
      "sourceTitle": "CORTE CIRCULAR [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "desc": "O ceifeiro realiza um ataque giratório com a sua arma, acertando a todos num raio de 2m. O ataque circular causa 4d6+mod de força de dano."
    },
    {
      "nivel": 7,
      "nome": "SANGUE TRANSCENDENTAL",
      "tipo": "passiva",
      "sourceTitle": "SANGUE TRANSCENDENTAL",
      "desc": "O Ceifeiro é imune a sangramentos e doenças relacionadas ao sangue, tal como envenenamentos ou doenças mortais da vida."
    },
    {
      "nivel": 8,
      "nome": "CONHECIMENTO",
      "tipo": "passiva",
      "sourceTitle": "CONHECIMENTO",
      "desc": "O Ceifeiro contempla sua essência e seu destino é revelado. Seja o caminho do Ascendido(LIBERTAÇÃO) ou do Recipiente(CORRUPÇÃO)."
    },
    {
      "nivel": 8,
      "nome": "COMUNICAÇÃO ENTRE MUNDOS",
      "tipo": "passiva",
      "sourceTitle": "COMUNICAÇÃO ENTRE MUNDOS",
      "desc": "Agora pode se comunicar com criaturas vislumbradas pela PERCEPÇÃO SUPERNATURAL."
    },
    {
      "nivel": 9,
      "nome": "ÁREA ESPECTRAL",
      "tipo": "ativo",
      "sourceTitle": "ÁREA ESPECTRAL [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "desc": "O ceifeiro baixa a sua arma e cria uma área espectral de 5m à sua frente. Alvos presentes nesta área recebem \"cortes espectrais\" que levam apenas alguns instantes e causam 4d10+magia de dano."
    },
    {
      "nivel": 10,
      "nome": "O PAVOR DO EQUINÓCIO",
      "tipo": "ativo",
      "sourceTitle": "O PAVOR DO EQUINÓCIO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "O ceifeiro se concentra e faz com que a sua alma saia de corpo. Ele a controla agora, podendo atravessar paredes e observar coisas escondidas. A alma do ceifeiro não pode receber nenhum dano e nem ser avistada por criaturas (apenas por seres sobrenaturais), mas se o corpo normal do ceifeiro for atacado a alma imediatamente voltará ao corpo. O ceifeiro pode voltar a alma em seu corpo quando quiser, podendo ficar no máximo 1 hora fora. Depois desse tempo, ele será puxado de volta."
    },
    {
      "nivel": 11,
      "nome": "ESPECTRO VINGATIVO",
      "tipo": "ativo",
      "sourceTitle": "ESPECTRO VINGATIVO[2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "desc": "Chamas verdes se envolvem ao redor do Ceifeiro por um turno. Qualquer inimigo corpo-a-corpo que o atacar durante este tempo, receberá 5d4 de dano espectral. Pode ser utilizado como uma ação bônus."
    },
    {
      "nivel": 13,
      "nome": "ALVO PRÓXIMO",
      "tipo": "ativo",
      "sourceTitle": "ALVO PRÓXIMO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "O Ceifeiro assume forma espectral e realiza uma investida contra a alma de um alvo próximo a até 5m, causando 12d8 + magia de dano à essência dele. Se o alvo morrer, o ceifeiro pode usar novamente em outro inimigo próximo (como uma reação), causando o mesmo dano fixo com 1d8 de dano adicional. Após a investida se concluir, a sua forma volta ao normal."
    },
    {
      "nivel": 15,
      "nome": "COLAR TRANSFORMADO",
      "tipo": "passiva",
      "sourceTitle": "COLAR TRANSFORMADO",
      "desc": "O ceifeiro utiliza-se de todas as almas CONSUMIDAS ou LIBERTADAS, ganhando transformações permanentes em seu corpo dependendo de quanto consumiu/libertou: CONSUMIDAS: 1-7: A pupila de seus olhos ficam avermelhadas e causam um pequeno temor a alguns seres. CONSUMIDAS: 8-15: Os seus cabelos ficam com um pequeno tom avermelhado. CONSUMIDAS: 16-25: O vácuo do movimento do ataque do ceifeiro adquire um aspecto vermelho. CONSUMIDAS: 26-38: O ceifador recebe 5 de dano em todos os seus ataques. CONSUMIDAS: 39-55: De acordo com o temperamento raivoso do ceifador, ele irá emanar uma pequena aura vermelha. CONSUMIDAS: 56-70: A cor de pele do ceifeiro começa a receber um tom extremamente branco, e suas unhas aumentam de tamanho e enrigessem LIBERTAS: 1-7: A pupila de seus olhos se tornam azuis e causam um pequeno conforto a alguns seres. LIBERTAS: 8-15: Os seus cabelos ficam com um pequeno tom esbranquiçado. LIBERTAS: 16-25: O vácuo do movimento do ataque do ceifeiro adquire um aspecto azul. LIBERTAS: 26-38: O ceifador recebe 5 de dano em todos os seus ataques. LIBERTAS: 39-55: Enquanto estiver fora de combate e sem danos corporais, o ceifeiro irá emanar uma aura azulada. LIBERTAS: 56-70: A partir deste momento, o ceifeiro é capaz de sentir o tipo de aura de um ser próximo a ele (auras negativas não significam que os seres sentidos são malignos, apenas as escolhas, ações e pensamentos influenciam na energia emanada do ser)."
    },
    {
      "nivel": 17,
      "nome": "RESISTÊNCIA DO ALÉM",
      "tipo": "passiva",
      "sourceTitle": "RESISTÊNCIA DO ALÉM",
      "desc": "O Ceifeiro não sofre mais com o frio ou calor. Ataques do elemento gelo, água ou desses elementos possuem o dano reduzido pela metade. Também se aplica a ataques do elemento fogo, lava ou semelhantes."
    },
    {
      "nivel": 20,
      "nome": "PASSAGEM SOBRE MUNDOS",
      "tipo": "ativo",
      "sourceTitle": "PASSAGEM SOBRE MUNDOS [3 VEZES AO DIA]",
      "usos": "3 VEZES AO DIA",
      "desc": "O Ceifeiro se transforma durante os próximos 10 minutos. Nesse estado ele é capaz de atravessar fisicamente paredes, objetos e até mesmo as barreiras entre o mundo e o submundo."
    },
    {
      "nivel": 8,
      "nome": "CEIFA ESPECTRAL",
      "tipo": "passiva",
      "sourceTitle": "CEIFA ESPECTRAL",
      "subclasse": "Ceifeiro Ascendido",
      "desc": "Agora o Ceifeiro controla a sua arma com poderes espectrais, não precisando mexer um único dedo para movê-la (pode mover numa área de até 6m)."
    },
    {
      "nivel": 8,
      "nome": "CORTE CIRCULAR - UPGRADE",
      "tipo": "passiva",
      "sourceTitle": "CORTE CIRCULAR - UPGRADE",
      "subclasse": "Ceifeiro Ascendido",
      "desc": "O ceifeiro pode conjurar uma habilidade à escolha como ação extra depois de utilizar o CORTE CIRCULAR."
    },
    {
      "nivel": 8,
      "nome": "LUZ DA ASCENSÃO",
      "tipo": "ativo",
      "sourceTitle": "LUZ DA ASCENSÃO [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "subclasse": "Ceifeiro Ascendido",
      "desc": "O Ceifeiro dispara um feixe de luz que corrói pensamentos negativos e todo o mal que existe numa criatura caso ela falhe no teste de resistência (dificuldade igual a 2+Libertação). Causa 5d12+libertação em qualquer alvo atingido."
    },
    {
      "nivel": 15,
      "nome": "ÁREA ESPECTRAL — UPGRADE",
      "tipo": "bonus",
      "sourceTitle": "ÁREA ESPECTRAL — UPGRADE",
      "subclasse": "Ceifeiro Ascendido",
      "desc": "Agora causa 8d6+magia+LIBERTAÇÃO de dano e a área espectral alcança +3m. Pode ser utilizada em uma ação bônus."
    },
    {
      "nivel": 20,
      "nome": "TOQUE CELESTE",
      "tipo": "ativo",
      "sourceTitle": "TOQUE CELESTE [3 VEZES EM VIDA, 1 VEZ POR SEMANA]",
      "usos": "3 VEZES EM VIDA, 1 VEZ POR SEMANA",
      "subclasse": "Ceifeiro Ascendido",
      "desc": "O ceifeiro, detém o dom da ressurreição. Três vezes em sua vida e uma vez a cada semana, ele pode trazer de volta à vida aqueles que pereceram com um toque. ALVO PRÓXIMO [UPGRADE] Agora causa 15d8+magia+LIBERTACAO no primeiro alvo."
    },
    {
      "nivel": 20,
      "nome": "DECISÃO PRECISA",
      "tipo": "passiva",
      "sourceTitle": "DECISÃO PRECISA",
      "subclasse": "Ceifeiro Ascendido",
      "desc": "Escolha entre: Poder ganhar habilidade exclusiva nível 25 OU Receber mais 5 cargas de TOQUE CELESTE."
    },
    {
      "nivel": 25,
      "nome": "EXISTÊNCIA",
      "tipo": "ativo",
      "sourceTitle": "EXISTÊNCIA [1 VEZ POR SEMANA, ATIVADA AUTOMATICAMENTE]",
      "usos": "1 VEZ POR SEMANA, ATIVADA AUTOMATICAMENTE",
      "subclasse": "Ceifeiro Ascendido",
      "desc": "Caso o Ceifeiro esteja em combate e acabar vendo um aliado/conhecido morrer, envolve-se na benção de KAYLOW. Fique intangível e imortal por 8 turnos."
    },
    {
      "nivel": 8,
      "nome": "EMISSÁRIO DA MORTE",
      "tipo": "passiva",
      "sourceTitle": "EMISSÁRIO DA MORTE",
      "subclasse": "Ceifeiro Recipiente",
      "desc": "A cada ser morto pelo ceifador recipiente irá fazer com que o mesmo aumente a sua vida máxima em 1 permanentemente."
    },
    {
      "nivel": 8,
      "nome": "CORTE CIRCULAR - UPGRADE",
      "tipo": "passiva",
      "sourceTitle": "CORTE CIRCULAR - UPGRADE",
      "subclasse": "Ceifeiro Recipiente",
      "desc": "Agora causa 5d8+força de dano. O ceifeiro se cura com metade do dano causado dessa habilidade."
    },
    {
      "nivel": 8,
      "nome": "DEVANEIO DA ESCURIDÃO",
      "tipo": "ativo",
      "sourceTitle": "DEVANEIO DA ESCURIDÃO [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "subclasse": "Ceifeiro Recipiente",
      "desc": "Dispare um feixe das sombras que destrói a esperança de qualquer criatura que for atingida (área de 5x5 até 10m). Causa 5d12+corrupção em qualquer alvo atingido"
    },
    {
      "nivel": 15,
      "nome": "ÁREA ESPECTRAL — UPGRADE",
      "tipo": "passiva",
      "sourceTitle": "ÁREA ESPECTRAL — UPGRADE",
      "subclasse": "Ceifeiro Recipiente",
      "desc": "Esta habilidade causa agora 8d6+magia+CORRUPÇÃO de dano, e o ceifeiro causa um tremor muito grande no chão por conta de seu enorme poder, arremessando todos os inimigos atingidos para cima, deixando eles atordoados por uma ação."
    },
    {
      "nivel": 20,
      "nome": "ALVO PRÓXIMO [UPGRADE]",
      "tipo": "passiva",
      "sourceTitle": "ALVO PRÓXIMO [UPGRADE]",
      "subclasse": "Ceifeiro Recipiente",
      "desc": "Agora causa 15d8+magia+CORRUPCAO no primeiro alvo."
    },
    {
      "nivel": 20,
      "nome": "MÃOS CORROMPIDAS",
      "tipo": "passiva",
      "sourceTitle": "MÃOS CORROMPIDAS",
      "subclasse": "Ceifeiro Recipiente",
      "desc": "Agora o ceifeiro se cura com metade do dano causado, não contando com as habilidades que já o curam. Ataques em área só curam por um alvo atingido."
    },
    {
      "nivel": 20,
      "nome": "DECISAO OBLITERADORA",
      "tipo": "passiva",
      "sourceTitle": "DECISAO OBLITERADORA",
      "subclasse": "Ceifeiro Recipiente",
      "desc": "Escolha entre: Poder ganhar uma habilidade exclusiva nivel 25 OU Ganhar o dobro de corrupcao por almas consumidas."
    },
    {
      "nivel": 25,
      "nome": "ALMA IMORTAL",
      "tipo": "ativo",
      "sourceTitle": "ALMA IMORTAL [1 VEZ POR SEMANA, ATIVADA AUTOMATICAMENTE]",
      "usos": "1 VEZ POR SEMANA, ATIVADA AUTOMATICAMENTE",
      "subclasse": "Ceifeiro Recipiente",
      "desc": "Quando o ceifeiro zerar todos os seus pontos de vida e estiver com esta habilidade disponível, pequenas chamas o rodearão, incendiando o seu corpo completamente durante 2 turnos (quando o ceifeiro estiver neste estado, não poderá receber quaisquer danos). Após as chamas se dissiparem, o ceifeiro retornará com seus pontos de vida máximos, sem ferimentos."
    }
  ],
  "bruxo": [
    {
      "nivel": 1,
      "nome": "FERVOR DO COMBATE",
      "tipo": "passiva",
      "sourceTitle": "FERVOR DO COMBATE",
      "desc": "Ter êxito em atacar duas vezes no turno, fará com que o Bruxo receba uma ação de ataque adicional."
    },
    {
      "nivel": 1,
      "nome": "SINAIS",
      "tipo": "passiva",
      "sourceTitle": "SINAIS [1 VEZ POR TURNO]",
      "usos": "1 VEZ POR TURNO",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Extra: 2 Sinais/turno + versões alternativas de cada Sinal"
        },
        {
          "nivel": 20,
          "desc": "Extra: INTENSIFICAÇÃO: combina 2 Sinais em 1 (6 combinações possíveis)"
        }
      ],
      "desc": "Embora foram criados para lutarem contra os magos que empregam magias poderosas, bruxos podem lançar feitiços mágicos simples, que podem se revelar eficazes, quando utilizados corretamente. Os bruxos chamam de \"Sinais\" e eles também possuem aplicações cotidianas. Só é possível utilizar um sinal por vez: Cada Sinal possui 6 níveis de evolução obtidos pela MUTAÇÃO (experiência de matar monstros). As tabelas de evolução de cada Sinal escalam em área, dano, efeitos e usos."
    },
    {
      "nivel": 1,
      "nome": "IGNITE",
      "tipo": "ativo",
      "progressao": "mutacao",
      "sourceTitle": "IGNITE[2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "O sinal está mais forte. Aumente a área do fogo para mais 1m de distância (totalizando 4m). Agora causa 3d6+mod magia de dano mágico e deixa alvos atingidos em chamas por 2 turnos (não acumula)."
        },
        {
          "nivel": 3,
          "desc": "O sinal está mais forte. Aumente a área do fogo para mais 2m de distância (totalizando 6m). Agora causa 3d8+mod magia de dano mágico. Alvos atingidos perdem 1 de CA até o fim do combate."
        },
        {
          "nivel": 4,
          "desc": "O sinal está mais forte. Agora é possível utilizar 3 vezes POR DESCANSO CURTO. Aumente a área do fogo para mais 2m de distância (totalizando 8m). Agora causa 4d8+mod magia de dano mágico e deixa alvos atingidos em chamas por 3 turnos. No momento do impacto das chamas, impossibilite qualquer movimentação dos alvos atingidos, momentaneamente."
        },
        {
          "nivel": 5,
          "desc": "O sinal está muito mais forte. Agora é possível utilizar 4 vezes POR DESCANSO CURTO. Aumente a área do fogo para mais 2m de distância (totalizando 10m). Agora causa 6d8+mod magia de dano mágico e deixa alvos atingidos em chamas por 4 turnos. Alvos atingidos perdem 2 de CA até o fim do combate."
        },
        {
          "nivel": 6,
          "desc": "O sinal chegou no seu pico de poder. A área do fogo agora é igual a 15m e a habilidade causa 8d8+mod magia de dano mágico, deixando alvos atingidos em chamas por 4 turnos e as chamas acumulam. Além de tirar 2 de CA de forma acumulativa, alvos em chamas possuem a defesa anulada."
        }
      ],
      "desc": "O bruxo consegue criar uma leve corrente de fogo em sua frente, no formato de cone (chegando até 3m de distância), causando 2d6+mod magia de dano mágico nos alvos atingidos. O bruxo também controla qualquer tipo de chamas que for exposta em sua frente (ataques inimigos inclusos), com um limite de distância igual ao da corrente de fogo."
    },
    {
      "nivel": 1,
      "nome": "ARXIS",
      "tipo": "ativo",
      "progressao": "mutacao",
      "sourceTitle": "ARXIS[1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "O sinal está mais forte. Aumente a área do sinal em 2m de distância (totalizando 6m). Alvos empurrados para longe são atordoados por 1 ação com o poder do sinal."
        },
        {
          "nivel": 3,
          "desc": "O sinal está mais forte. Aumente a área do sinal em 3m de distância (totalizando 9m). Agora pode empurrar objetos de peso médio e destruir estruturas básicas. Alvos empurrados são atordoados por 1 turno."
        },
        {
          "nivel": 4,
          "desc": "O sinal está mais forte. Agora é possível utilizar 2 vezes POR DESCANSO CURTO. Aumente a área do sinal em 4m de distância (totalizando 13m). Alvos atingidos pelo sinal agora podem recebem um dano adicional, caso sejam jogados para uma região onde possua um terreno, sendo igual a 5d4+mod força de dano de concussão."
        },
        {
          "nivel": 5,
          "desc": "O sinal está muito mais forte. Agora é possível utilizar 3 vezes POR DESCANSO CURTO. Aumente a área do sinal em 3m de distância (totalizando 16m). Alvos atordoados pelo impacto do ataque não são podem sair desse estado de nenhuma forma. Todo e qualquer buff, bônus, escudo ou cura que estiver sendo utilizado em alvos assim, são completamente anulados. Impacto contra terreno faz com que o alvo receba 7d4+mod força de dano de concussão."
        },
        {
          "nivel": 6,
          "desc": "O sinal chegou no seu pico de poder. A área do sinal é igual a 20m. Alvos atingidos são atordoados por 2 turnos. Ao atingir esta habilidade em alvos com bônus, como dito anteriormente, possuem estes bônus anulados completamente. Agora o sinal pode empurrar objetos pesados e destruir estruturas até de pedra. Impacto contra terreno faz com que o alvo receba 10d4+mod força de dano de concussão."
        }
      ],
      "desc": "Crie uma corrente de ar em sua frente, empurrando e desnorteando inimigos numa área de até 4m num formato de cone. O sinal AARD também pode apagar chamas, empurrar objetos leves e quebrar coisas frágeis."
    },
    {
      "nivel": 1,
      "nome": "BREN",
      "tipo": "ativo",
      "progressao": "mutacao",
      "sourceTitle": "BREN[1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "O sinal está mais forte. Agora o escudo é igual a 20% da vida máxima do jogador (mínimo 4). Ao se quebrar, a área de explosão agora é de 2x2m. Alvos na zona do impacto são empurrados para 2m de distância e recebem 2d4 de dano."
        },
        {
          "nivel": 3,
          "desc": "O sinal está mais forte. Agora o escudo é igual a 30% da vida máxima do jogador (mínimo 6). Ao se quebrar, a área de explosão agora é de 3x3m. Alvos na zona do impacto agora recebem 3d4 de dano. O jogador não é mais empurrado 1m de distância ao quebrar o escudo."
        },
        {
          "nivel": 4,
          "desc": "O sinal está mais forte. O jogador agora consegue utilizar 2 vezes POR DESCANSO CURTO, porém escudos não se acumulam. Agora o escudo é igual a 40% da vida máxima do jogador (mínimo 8). Ao se quebrar, a área de explosão agora é de 4x4m. Alvos na zona do impacto são empurrados para 3m de distância e recebem 4d4 de dano."
        },
        {
          "nivel": 5,
          "desc": "O sinal está muito mais forte. Ao se quebrar, a área de explosão agora é de 6x6. Alvos na zona do impacto são empurrados para 4m de distância e recebem 6d4 de dano. Após a explosão, o jogador pode realizar um ataque de oportunidade."
        },
        {
          "nivel": 6,
          "desc": "O sinal chegou no seu pico de poder. Agora o escudo é igual a 50% da vida máxima do jogador (mínimo 10). Ao se quebrar, a área de explosão agora é de 5x5m. Alvos na zona do impacto são empurrados para 5m de distância e recebem 7d4 de dano. Alvos que atingirem o jogador envolvido nesta barreia, dará chance ao bruxo de realizar um ataque de oportunidade."
        }
      ],
      "desc": "Uma barreira mística envolve o bruxo, essa barreira possui uma vida equivalente a 10% da vida máxima do jogador (mínimo 2). Quando receber um golpe que não quebre a barreira, o jogador não sentirá o impacto do ataque e o escudo se manterá com o resto da vida. Porém, caso o inimigo cause um dano igual ou maior a barreira, ela se quebrará numa área de 1x1, causando 1d4 de dano e empurrando tanto o alvo na área quanto o jogador para 1m de distância (o dano não sobrepassa a vida do escudo)."
    },
    {
      "nivel": 1,
      "nome": "ECRYPT",
      "tipo": "ativo",
      "progressao": "mutacao",
      "sourceTitle": "ECRYPT[1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "O sinal está mais forte. Agora ao utilizar o poder, cria-se 4 sinais ECRYPT no chão. Seres dentro desta área perdem 2 de movimentação e seus acertos ficam com mais desvantagem (-3). Habilidades de projéteis ou flechas agora podem ser desviadas caso passem pela zona do sinal (dificuldade 18)."
        },
        {
          "nivel": 3,
          "desc": "O sinal está mais forte. Agora ao utilizar o poder, cria-se 6 sinais ECRYPT no chão. Seres dentro desta área perdem 3 de movimentação e seus acertos ficam com mais desvantagem (-4). Habilidade de projéteis ou flechas agora podem ser desviadas caso passem pela zona do sinal (dificuldade 16). Agora dura 2 turnos."
        },
        {
          "nivel": 4,
          "desc": "O sinal está mais forte. Agora pode utilizar 2 vezes POR DESCANSO CURTO, porém não é possível utilizar mais de um por vez. Agora cria-se 8 sinais ECRYPT no chão. Seres dentro da área não conseguem se movimentar e seus acertos ficam com mais desvantagem (-5). Habilidade de projéteis ou flechas agora podem ser desviadas caso passem pela zona do sinal (dificuldade 14)."
        },
        {
          "nivel": 5,
          "desc": "O sinal está muito mais forte. Agora cria-se 10 sinais ECRYPT no chão. Seres dentro da área não conseguem se movimentar e nem acertar golpes. Habilidade de projéteis ou flechas agora podem ser desviadas caso passem pela zona do sinal (dificuldade 12)."
        },
        {
          "nivel": 6,
          "desc": "O sinal chegou no seu pico de poder. Agora cria-se 12 sinais ECRYPT no chão. Seres dentro da área não conseguem se movimentar e nem acertar golpes. Habilidade de projéteis ou flechas são paradas e ficam flutuando na região dos sinais durante a duração do poder. Agora dura 3 turnos."
        }
      ],
      "desc": "Apontando uma de suas mãos para o chão, o bruxo cria um círculo composto por 2 sinais ECRYPT em volta. Essa área possui o tamanho de (metade do total de sinais desenhados, ou seja, inicialmente 1)m. Seres que não sejam o bruxo dentro desta área perdem 1 de movimentação e seus ataques ficam com extrema desvantagem (-2 de acerto). Dura 1 turno. Após o alvo sair da área, ele ficará com o efeito por apenas mais 1 turno."
    },
    {
      "nivel": 1,
      "nome": "MUTAÇÃO",
      "tipo": "passiva",
      "sourceTitle": "MUTAÇÃO",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Extra: Barra de mutação ativa"
        },
        {
          "nivel": 7,
          "desc": "Extra: Cada nível de mutação = +1d10 de vida máxima"
        }
      ],
      "desc": "O bruxo, assim como o nível do próprio jogador, possui uma evolução própria de mutações, que só é evoluída ao matar monstros ou seres mágicos (possui todos os aspectos da barra de experiência normal, só que recebe apenas XP de monstros, valores do xp inalterados). Ao evoluir um nível em mutações, o jogador poderá evoluir um dos sinais à escolha. Cada sinal pode evoluir até 6 níveis, ficando cada vez mais poderoso em cada evolução. Não possui limite de nível das mutações."
    },
    {
      "nivel": 2,
      "nome": "VISÃO",
      "tipo": "passiva",
      "sourceTitle": "VISÃO",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Raio: 6m"
        },
        {
          "nivel": 8,
          "desc": "Raio: 10m"
        },
        {
          "nivel": 17,
          "desc": "Raio: 30m"
        }
      ],
      "desc": "O bruxo consegue verificar até a menor mudança do ambiente em que se encontra, caso se concentre por alguns segundos. Além disso, ao se concentrar, ele consegue ver pegadas, rastros de magia, marcas de sangue, cheiros ou irregularidades no cenário com uma grande facilidade. Porém, essa \"visão\", só percorre 6m de distância."
    },
    {
      "nivel": 3,
      "nome": "POÇÕES",
      "tipo": "passiva",
      "sourceTitle": "POÇÕES",
      "desc": "Por conta das mutações realizadas em seu corpo, o bruxo adquiriu uma certa facilidade em ingerir poções que antes eram extremamente perigosas, com facilidade além de não sofrer completamente dos malefícios devido ao seu metabolismo avançado. Poções venenosas, ou que contraem algum malefício consigo, possuem esse efeito anulado. Porém, o jogador só consegue ingerir até 4 poções como essas diariamente. Caso ultrapasse este limite, receba os efeitos negativos da mesma."
    },
    {
      "nivel": 3,
      "nome": "EVASÃO",
      "tipo": "ativo",
      "sourceTitle": "EVASÃO [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 3,
          "desc": "Usos: 2x desc. curto | Extra: —"
        },
        {
          "nivel": 6,
          "desc": "Usos: 3x desc. curto | Extra: —"
        },
        {
          "nivel": 14,
          "desc": "Usos: 3x desc. curto | Extra: Desvia flechas e magias"
        }
      ],
      "desc": "Desvie de um ataque corpo-a-corpo. Não é possível desviar contra acertos críticos ou ataques a distância. Desvantagens desta habilidade não se aplicam a monstros."
    },
    {
      "nivel": 4,
      "nome": "ANULADOR",
      "tipo": "passiva",
      "sourceTitle": "ANULADOR",
      "desc": "O corpo dos bruxos foi desenvolvido por meio de mutações, essas que fizeram com que os mesmos pudessem resistir à magia. Agora receba apenas metade do dano de qualquer magia."
    },
    {
      "nivel": 4,
      "nome": "CRÍTICO APRIMORADO",
      "tipo": "passiva",
      "sourceTitle": "CRÍTICO APRIMORADO",
      "evolucoes": [
        {
          "nivel": 4,
          "desc": "Crítico em: 19, 20"
        },
        {
          "nivel": 12,
          "desc": "Crítico em: 18, 19, 20"
        }
      ],
      "desc": "19 = crítico."
    },
    {
      "nivel": 5,
      "nome": "LESÃO",
      "tipo": "passiva",
      "sourceTitle": "LESÃO",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Extra: Atordoa 2 turnos"
        },
        {
          "nivel": 12,
          "desc": "Extra: Membro atingido fica debilitado 1 turno"
        }
      ],
      "desc": "Golpes críticos do Bruxo causam uma onda de choque mágica: alvo atordoado por 2 turnos."
    },
    {
      "nivel": 6,
      "nome": "APLICAÇÃO LETAL",
      "tipo": "ativo",
      "sourceTitle": "APLICAÇÃO LETAL [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 6,
          "desc": "Usos: 1x desc. curto | Dano: 2d6 + mod força | Extra: 2 giros"
        },
        {
          "nivel": 11,
          "desc": "Usos: 2x desc. curto | Dano: 4d6 + mod força | Extra: Giros adicionais com teste (d20, dif 10+2 por giro)"
        },
        {
          "nivel": 18,
          "desc": "Usos: 2x desc. curto | Dano: 6d6 + mod força | Extra: 2º giro sem redução de dano"
        }
      ],
      "desc": "Ao acertar um ataque físico, o Bruxo poderá utilizar esta habilidade sem o uso de nenhuma ação. Após os critérios de ativação serem atingidos, gire a espada e realize um golpe no alvo, causando 2d6+mod força de dano adicional. Após o primeiro ataque giratório, gire novamente a lâmina para acertar outro ataque. O primeiro ataque giratório causa metade do dano do primeiro golpe (o necessário para ativação da habilidade), e o segundo ataque giratório causa metade do dano do primeiro golpe giratório. Ambos os ataques são ataques certeiros."
    },
    {
      "nivel": 8,
      "nome": "ESTOCADA",
      "tipo": "ativo",
      "sourceTitle": "ESTOCADA [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 8,
          "desc": "Dano: 5d4 + mod força"
        },
        {
          "nivel": 15,
          "desc": "Dano: 6d4 + mod força"
        }
      ],
      "desc": "Realize um ataque em linha reta, que percorre até (tamanho da lâmina)+3 metros de distância. Essa estocada causa 5d4+mod força de dano adicional. É possível utilizar esta habilidade instantâneamente sem uso de ação após o uso da habilidade \"EVASÃO\"."
    },
    {
      "nivel": 9,
      "nome": "VELOZ",
      "tipo": "passiva",
      "sourceTitle": "VELOZ",
      "desc": "O Bruxo recebe +2 de vantagem em iniciativa antes de iniciar um combate."
    },
    {
      "nivel": 10,
      "nome": "IMBUIÇÃO",
      "tipo": "ativo",
      "sourceTitle": "IMBUIÇÃO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 10,
          "desc": "Usos: 1x desc. longo"
        },
        {
          "nivel": 14,
          "desc": "Usos: 2x desc. longo"
        }
      ],
      "desc": "Imbua sua arma atual com um de seus sinais. O efeito é causado após o impacto da lâmina. Acertar alvos com a arma neste estado fará com que ele receba o dano de sua arma+dano do sinal, caso tenha. Sinais como BREN aplica-se no próprio jogador e ECRYPT no chão. Não custa nenhuma ação efetuar o encantamento na arma."
    },
    {
      "nivel": 12,
      "nome": "MOVIMENTAÇÃO",
      "tipo": "bonus",
      "sourceTitle": "MOVIMENTAÇÃO",
      "desc": "Realizar movimentos simples de até 4m de distância não consome sua ação bônus num combate."
    },
    {
      "nivel": 13,
      "nome": "ATAQUE DEVASTAÇÃO",
      "tipo": "ativo",
      "sourceTitle": "ATAQUE DEVASTAÇÃO [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 13,
          "desc": "Dano: 6d6 + mod força | Extra: 2x efeitos ao contato"
        },
        {
          "nivel": 19,
          "desc": "Dano: 10d6 + mod força | Extra: Crítico = 3x efeitos"
        }
      ],
      "desc": "Ataque todos os alvos em seu horizonte, numa distância de até (largura dar arma)+6m de distância, com sua arma. Alvos atingidos por este ataque recebem 6d6+mod força de dano e os derrubam. Este ataque aplica o dobro de efeitos ao contato."
    },
    {
      "nivel": 16,
      "nome": "ATAQUE INESPERADO",
      "tipo": "passiva",
      "sourceTitle": "ATAQUE INESPERADO",
      "evolucoes": [
        {
          "nivel": 16,
          "desc": "Extra: Teste dif 16"
        },
        {
          "nivel": 20,
          "desc": "Extra: Sempre ganha ação extra ao receber crítico"
        }
      ],
      "desc": "Ao receber um golpe crítico, gire um teste de resistência com dificuldade 16. Ao ser bem-sucedido, após o alvo o atacar, ganhe uma ação para utilizar neste momento."
    },
    {
      "nivel": 17,
      "nome": "SEM LIMITAÇÃO",
      "tipo": "passiva",
      "sourceTitle": "SEM LIMITAÇÃO",
      "desc": "Pode realizar 2 ataques físicos por ação."
    },
    {
      "nivel": 20,
      "nome": "INTENSIFICAÇÃO DO SINAL",
      "tipo": "ativo",
      "sourceTitle": "INTENSIFICAÇÃO DO SINAL[1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "Combine o efeito de dois sinais para utilizar de uma só vez em seus inimigos. Funciona com a habilidade da IMBUIÇÃO. Tabela dos novos efeitos de sinais combinados após a evolução de cada sinal. IGNITE + ARXIS = Crie um vórtice de chamas que percorre a mesma distância do sinal ARXIS, porém, empurra os alvos para longe e causa os mesmos efeitos do sinal IGNITE. Causa a mesma quantia de dano que o sinal IGNITE+4d6. IGNITE + BREN = Envolva-se num escudo de chamas, que possui um escudo no valor do dano do sinal IGNITE e causa dano a alvos que o atingir de forma corporal. O dano é igual a 25% dos dados do sinal IGNITE. O escudo se comporta da mesma forma que o sinal BREN, porém dura apenas 3 turnos. IGNITE + ECRYPT = Crie uma zona paralisante que é envolvida completamente por fogo dentro de sí. Seres dentro da área recebem os mesmos efeitos do sinal ECRPYT e ainda sofrem metade dos danos do sinal IGNITE. ARXIS + BREN = Envolva-se num escudo de vento, capaz de fazê-lo flutuar por até 10m do chão. Alvos que tentarem o atingir, são jogados para longe, numa distância e efeitos iguais ao do sinal ARXIS. O escudo se comporta da mesma formaq que o sinal BREN, junto de sua duração. O valor do escudo é correspondente ao dano causado no sinal ARXIS. ARXIS + ECRYPT = Cause o mesmo efeito do sinal ARXIS, assim como o alcance e danos. No entanto, o caminho percorrido pela corrente de ventos criará diversos sinais ECRPYT espalhados ao chão, causando seus efeitos no alvos que estão ali. A duração dos sinais ao chão equivalem ao sinal ECRYPT. BREN + ECRYPT = Envolva-se num escudo rúnico, capaz de suportar qualquer golpe mágico, sem sofrer danos. O escudo tem valor e duração equivalente ao sinal BREN. Ao quebrar, espalhe os sinais em volta numa área de até 3m circular."
    },
    {
      "nivel": 5,
      "nome": "SINAIS — UPGRADE",
      "tipo": "passiva",
      "sourceTitle": "SINAIS — UPGRADE",
      "subclasse": "Bruxo Encantador",
      "desc": "Pode usar 2 Sinais simultaneamente no mesmo turno."
    },
    {
      "nivel": 8,
      "nome": "SEM LIMITES",
      "tipo": "passiva",
      "sourceTitle": "SEM LIMITES",
      "subclasse": "Bruxo Encantador",
      "desc": "+1 uso permanente de cada Sinal."
    },
    {
      "nivel": 8,
      "nome": "FUSÃO",
      "tipo": "passiva",
      "sourceTitle": "FUSÃO",
      "subclasse": "Bruxo Encantador",
      "desc": "Após 2 Sinais no mesmo turno: pode usar 3º Sinal sem custo de ação ou uso."
    },
    {
      "nivel": 14,
      "nome": "AVANÇO DESTRUTIVO",
      "tipo": "passiva",
      "sourceTitle": "AVANÇO DESTRUTIVO",
      "subclasse": "Bruxo Encantador",
      "desc": "+1 dado de dano permanente em TODAS as habilidades."
    },
    {
      "nivel": 14,
      "nome": "SINAL DO VAZIO",
      "tipo": "ativo",
      "sourceTitle": "SINAL DO VAZIO [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "subclasse": "Bruxo Encantador",
      "desc": "Após um inimigo soltar uma habilidade mágica em direção do bruxo ou em qualquer área do combate, o bruxo poderá utilizar o SINAL DO VAZIO. Ao apontar as mãos na direção do poder mágico ou próximo dele, uma energia roxa sugará tal poder para si. A próxima vez que utilizar o SINAL DO VAZIO, irá utilizar a habilidade suprimida."
    },
    {
      "nivel": 5,
      "nome": "CREPÚSCULO NASCENTE",
      "tipo": "ativo",
      "sourceTitle": "CREPÚSCULO NASCENTE [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "subclasse": "Bruxo Combatente",
      "desc": "Realize um golpe normal no alvo, e caso seja bem-sucedido, realize mais dois seguidos, de forma certeira. Cada um dos três ataques causam um dado de dano adicional."
    },
    {
      "nivel": 8,
      "nome": "FÚRIA DO CONQUISTADOR",
      "tipo": "passiva",
      "sourceTitle": "FÚRIA DO CONQUISTADOR",
      "subclasse": "Bruxo Combatente",
      "evolucoes": [
        {
          "nivel": 8,
          "desc": "Acúmulos necessários: 10"
        },
        {
          "nivel": 14,
          "desc": "Acúmulos necessários: 6"
        }
      ],
      "desc": "Para cada ataque físico bem-sucedido e dano recebido, receba 1 acúmulo de FÚRIA DO CONQUISTADOR. Ao atingir 10 acúmulos, utilize uma habilidade sem custo de ação ou de usos. Habilidades que não possuem mais usos, não poderão ser utilizadas."
    },
    {
      "nivel": 14,
      "nome": "DÉBITO",
      "tipo": "ativo",
      "sourceTitle": "DÉBITO [1 VEZ POR DESCANSO LONGO, 2 AÇÕES COMPLETAS]",
      "usos": "1 VEZ POR DESCANSO LONGO, 2 AÇÕES COMPLETAS",
      "subclasse": "Bruxo Combatente",
      "desc": "Segure sua arma com suas duas mãos e, utilizando toda a sua força, desfere um ataque vertical que consegue destruir armaduras pesadas ou de placas como manteiga. Inimigos que forem atingidos recebem 12d10+mod força de dano. No entanto, custa duas ações completas para ser utilizado. É possível utilizar quando um alvo for atingir o Bruxo com um ataque físico, no entanto, perderá suas 2 ações em seu próximo turno."
    }
  ],
  "fulgor": [
    {
      "nivel": 1,
      "nome": "LUMINOSIDADE",
      "tipo": "passiva",
      "sourceTitle": "LUMINOSIDADE",
      "desc": "Uma magia desconhecida faz parte do próprio corpo do fulgor, a qual providencia os seus poderes. Devido a isso, os fulgores podem controlar a luminosidade de seu corpo (habilidades também), assim como de objetos que conduzam eletricidade."
    },
    {
      "nivel": 1,
      "nome": "ELETROCUTAR",
      "tipo": "ativo",
      "sourceTitle": "ELETROCUTAR [3 VEZES POR DESCANSO CURTO]",
      "usos": "3 VEZES POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Usos: 3x desc. curto | Dano: 1d6 + mod magia"
        },
        {
          "nivel": 3,
          "desc": "Usos: 3x | Dano: 2d6 + mod magia"
        },
        {
          "nivel": 6,
          "desc": "Usos: 3x | Dano: 3d6 + mod magia"
        },
        {
          "nivel": 9,
          "desc": "Usos: 4x | Dano: 4d6 + mod magia"
        },
        {
          "nivel": 12,
          "desc": "Usos: 4x | Dano: 5d8 + mod magia"
        },
        {
          "nivel": 16,
          "desc": "Usos: 4x | Dano: 6d8 + mod magia"
        },
        {
          "nivel": 20,
          "desc": "Usos: 4x | Dano: 8d8 + mod magia"
        }
      ],
      "desc": "Conjure e dispare uma corrente de raios azuis provindos diretamente de suas mãos, atingindo o alvo escolhido e causando 1d6+mod magia de dano elétrico. Contudo, só pode ser disparado numa distância de até 3m."
    },
    {
      "nivel": 1,
      "nome": "FULGOR",
      "tipo": "passiva",
      "sourceTitle": "FULGOR",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Extra: Ricocheteia 1x (metade do dano)"
        },
        {
          "nivel": 8,
          "desc": "Extra: Ricocheteia dano TOTAL"
        },
        {
          "nivel": 13,
          "desc": "Extra: Ricocheteia para +1 inimigo"
        },
        {
          "nivel": 20,
          "desc": "Extra: Ricocheteia para TODOS os inimigos no combate"
        }
      ],
      "desc": "Após atingir uma habilidade em qualquer alvo, ricocheteia uma vez a mesma habilidade no inimigo mais próximo, causando metade do dano anterior. Caso não haja outro inimigo no combate, redirecione este poder para o mesmo inimigo atingido anteriormente. O limite de distância de um alvo a outro é igual a 3m. Ataques críticos são ricocheteados como ataques normais e não espalham efeitos de crítico."
    },
    {
      "nivel": 2,
      "nome": "RELAMPEJO",
      "tipo": "ativo",
      "sourceTitle": "RELAMPEJO [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "desc": "Uma onda de raios azuis o envolve. Caso seja atingido fisicamente por alguma arma que conduza eletricidade, o ataque irá se repelir completamente, jogando a arma do adversário a vários metros de distância. Após ser atingido uma vez, a habilidade cessará. Pode ser utilizado como uma reação."
    },
    {
      "nivel": 2,
      "nome": "CONDUTIVIDADE",
      "tipo": "passiva",
      "sourceTitle": "CONDUTIVIDADE",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Dano adicional: 1d4"
        },
        {
          "nivel": 6,
          "desc": "Dano adicional: 2d4"
        }
      ],
      "desc": "Inimigos que forem atingidos por alguma habilidade ou ataque do Fulgor, ficarão mais condutivos a eletricidade. Cause 1d4 de dano adicional nos mesmos até o fim do combate (não acumula)."
    },
    {
      "nivel": 3,
      "nome": "CRÍTICO APRIMORADO",
      "tipo": "passiva",
      "sourceTitle": "CRÍTICO APRIMORADO",
      "evolucoes": [
        {
          "nivel": 3,
          "desc": "Extra: Atordoa 1 turno"
        },
        {
          "nivel": 10,
          "desc": "Extra: 19-20 = crítico. Críticos ricocheteiam completamente"
        },
        {
          "nivel": 16,
          "desc": "Extra: Atordoa 2 turnos"
        }
      ],
      "desc": "Críticos do Fulgor atordoam alvos por 1 turno."
    },
    {
      "nivel": 3,
      "nome": "CORRENTE DA ELETRICIDADE",
      "tipo": "ativo",
      "sourceTitle": "CORRENTE DA ELETRICIDADE [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 3,
          "desc": "Esferas (dado): 1d4 | Dano/esfera: 1d6 + mod magia"
        },
        {
          "nivel": 7,
          "desc": "Esferas (dado): 1d6 | Dano/esfera: 2d6 + mod magia"
        },
        {
          "nivel": 13,
          "desc": "Esferas (dado): 1d10 | Dano/esfera: 3d6 + mod magia"
        }
      ],
      "desc": "Gire 1d4, o resultado será equivalente ao número de esferas elétricas que o Fulgor conseguirá criar. Cada esfera o rodeia, protegendo-o de ataques a distância (uma esfera se quebra após bloquear um ataque). Também é possível enviar cada esfera para se explodir em inimigos, causando 1d6+mod magia de dano elétrico."
    },
    {
      "nivel": 4,
      "nome": "ELETRICIDADE CONDENSADA",
      "tipo": "ativo",
      "sourceTitle": "ELETRICIDADE CONDENSADA [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 4,
          "desc": "Área: 3x3m | Dano: 2d10 + mod magia"
        },
        {
          "nivel": 9,
          "desc": "Área: 3x3m | Dano: 4d10 + mod magia"
        },
        {
          "nivel": 18,
          "desc": "Área: 3x3m | Dano: 5d10 + mod magia"
        }
      ],
      "desc": "Disperse uma grande quantidade de eletricidade em sua volta, causando 2d10+mod magia de dano elétrico em todos os alvos próximos num raio de 3m. A habilidade FULGOR também ricocheteia a área do ataque."
    },
    {
      "nivel": 5,
      "nome": "POLARIDADE",
      "tipo": "ativo",
      "sourceTitle": "POLARIDADE [1 VEZ POR TURNO]",
      "usos": "1 VEZ POR TURNO",
      "desc": "Agora o Fulgor consegue alterar os polos de energia das criaturas e objetos por meio do acerto das suas habilidades, porém, só é possível alterar os polos de duas criaturas por vez. O jogador decide o tipo de energia que o alvo atingido terá (polo positivo ou negativo). Quando duas criaturas ou objetos no combate estiverem com polos opostos, elas vão se atrair, causando 2d6 de dano físico devido ao impacto. Após o impacto, os polos são removidos. Quando duas criaturas ou objetos no combate estiverem com polos iguais, elas vão se repelir, sendo jogadas até a 15m de distância uma da outra (caso estejam próximas, com duração igual a 1 turnos ou 10 segundos) em alta velocidade, podendo sofrer danos no processo."
    },
    {
      "nivel": 5,
      "nome": "ENERGIA ESTÁTICA",
      "tipo": "ativo",
      "sourceTitle": "ENERGIA ESTÁTICA [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "desc": "Aumente muitas vezes a energia estática de um alvo ou de um objeto. Caso seja num inimigo, se o mesmo entrar em contato com qualquer tipo de condutor, ele vai receber 4d4+mod magia de dano elétrico. Caso seja num objeto, qualquer criatura que encostar nele, também receberá danos, equivalentes a 3d4+mod magia de dano elétrico."
    },
    {
      "nivel": 6,
      "nome": "VERDADEIRA CONDUÇÃO",
      "tipo": "passiva",
      "sourceTitle": "VERDADEIRA CONDUÇÃO",
      "evolucoes": [
        {
          "nivel": 6,
          "desc": "Extra: 30cm do solo"
        },
        {
          "nivel": 13,
          "desc": "Extra: Voa até 1m"
        }
      ],
      "desc": "O Fulgor pode pairar no ar a 30cm do solo."
    },
    {
      "nivel": 7,
      "nome": "FEIXE DE ESTÁTICA",
      "tipo": "ativo",
      "sourceTitle": "FEIXE DE ESTÁTICA [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "desc": "Um feixe luminoso azul sai da ponta de seu dedo indicador, atingindo um alvo que esteja a até 4m de distância e causando 1d4 de dano no mesmo. Após atingir com sucesso o alvo, ricocheteia a habilidade para todos os inimigos no combate. O processo de ricochetear em todos os alvos se repete pelos próximos 2 turnos."
    },
    {
      "nivel": 8,
      "nome": "SOB A NATUREZA",
      "tipo": "passiva",
      "sourceTitle": "SOB A NATUREZA",
      "desc": "O Fulgor consegue espalhar eletricidade na água encostando nela. Contudo, ele não sofrerá danos causados pela eletricidade. Entretanto, os outros que encostarem na água, ficarão 1 turno (ou 10 segundos) paralisados."
    },
    {
      "nivel": 8,
      "nome": "PASSOS FALSOS",
      "tipo": "passiva",
      "sourceTitle": "PASSOS FALSOS",
      "desc": "Pode caminhar sobre qualquer superfície condutora (paredes, tetos)."
    },
    {
      "nivel": 10,
      "nome": "RELÂMPAGO",
      "tipo": "ativo",
      "sourceTitle": "RELÂMPAGO [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 10,
          "desc": "Dano: 5d8 + mod magia"
        },
        {
          "nivel": 14,
          "desc": "Dano: 7d8 + mod magia"
        }
      ],
      "desc": "Dispare um poderoso relâmpago azul de suas mãos, que ao acertar no inimigo, causa 5d8+mod magia de dano elétrico e deixa o alvo atingido recebendo o mesmo dano que foi recebido pelos próximos 2 turnos."
    },
    {
      "nivel": 11,
      "nome": "SUPER VELOCIDADE",
      "tipo": "ativo",
      "sourceTitle": "SUPER VELOCIDADE [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 11,
          "desc": "Extra: —"
        },
        {
          "nivel": 14,
          "desc": "Extra: Habilidades durante super velocidade viram certeiras"
        }
      ],
      "desc": "Percorre até 100 metros instantaneamente. Pode ser usado como reação. Após usar: precisa descansar 1 turno."
    },
    {
      "nivel": 12,
      "nome": "ZONA ELÉTRICA",
      "tipo": "passiva",
      "sourceTitle": "ZONA ELÉTRICA",
      "desc": "Agora o fulgor é envolvido permanentemente numa aura elétrica. Qualquer criatura que atingir fisicamente com as mãos sem nenhum tipo de proteção, ou que esteja usando uma arma condutora de eletricidade, atordoe-a por 1 turno após a realização do ataque. Só é possível realizar este atordoamento 1 vez por criatura durante o combate."
    },
    {
      "nivel": 15,
      "nome": "ELETRICIDADE SÔNICA",
      "tipo": "ativo",
      "sourceTitle": "ELETRICIDADE SÔNICA [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "desc": "Com um estalar de dedos: troca de lugar instantaneamente com um aliado ou criatura numa área de até 25m."
    },
    {
      "nivel": 17,
      "nome": "DRAGON DIVE",
      "tipo": "ativo",
      "sourceTitle": "DRAGON DIVE [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "Conjure uma corrente de relâmpagos que se juntam e formam um gigantesco dragão. O jogador pode controlar ele e seu percurso. Após entrar em contato com qualquer criatura ou bater diretamente contra uma superfície, ela vai explodir num raio de até 10x10, causando 10d6+mod magia de dano elétrico. Não é possível replicar e ricochetear este poder. Esta habilidade sempre vai ser um acerto crítico e atingirá o jogador e até aliados que estiverem na zona do impacto."
    },
    {
      "nivel": 19,
      "nome": "DESTINO",
      "tipo": "bonus",
      "sourceTitle": "DESTINO",
      "evolucoes": [
        {
          "nivel": 19,
          "desc": "Extra: Atrai objetos condutores (40m)"
        },
        {
          "nivel": 20,
          "desc": "Extra: Também controla SERES condutores (1 alvo, 10s/min)"
        }
      ],
      "desc": "Atraia qualquer objeto que seja condutor, de qualquer criatura ou de qualquer lugar numa área de até 40m, para sí. Este determinado objeto ficará em suas mãos. Não é possível ser usado como uma reação ou ação bônus."
    },
    {
      "nivel": 5,
      "nome": "CORRUPÇÃO",
      "tipo": "passiva",
      "sourceTitle": "CORRUPÇÃO",
      "subclasse": "Fulgor Combativo",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Extra: Visual sombrio"
        },
        {
          "nivel": 14,
          "desc": "Extra: Faíscas envolvem o Fulgor. Seu 1º ataque atordoa por 1 turno"
        }
      ],
      "desc": "A eletricidade assume coloração sombria em todas as habilidades."
    },
    {
      "nivel": 5,
      "nome": "NAGASHI",
      "tipo": "ativo",
      "sourceTitle": "NAGASHI [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "subclasse": "Fulgor Combativo",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Usos: 2x | Dano elétrico: 3d6 + mod magia | Dano físico: 1d6 | Extra: Crítico perfura"
        },
        {
          "nivel": 8,
          "desc": "Usos: 3x | Dano elétrico: 4d6 + mod magia | Dano físico: 2d6 | Extra: —"
        },
        {
          "nivel": 14,
          "desc": "Usos: 4x | Dano elétrico: 5d6 + mod magia | Dano físico: 3d6 | Extra: Sempre perfura"
        }
      ],
      "desc": "Carregue a eletricidade em uma de suas mãos e dispara em direção de um inimigo a escolha (de até no máximo 10m), atingindo-o com sua mão energizada. O alvo recebe 3d6+mod magia de dano elétrico e 1d6 de dano físico. Caso seja um acerto crítico, perfure a região atingida e percorra mais 4m de distância em linha reta, podendo atingir mais um alvo. A habilidade FULGOR faz com que o jogador dispare na direção do alvo que a habilidade será ricocheteada."
    },
    {
      "nivel": 8,
      "nome": "KIRIN",
      "tipo": "ativo",
      "sourceTitle": "KIRIN [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Fulgor Combativo",
      "desc": "Um trovão ressoa e uma torrente de raios caem dos céus em um alvo a escolha, causando 2d12+mod magia de dano elétrico. Seres que estão a 1m de distância do alvo atingido diretamente pela habilidade recebem 2d6+mod magia de dano elétrico. É um ataque certeiro."
    },
    {
      "nivel": 5,
      "nome": "RAIO DA MORTE",
      "tipo": "ativo",
      "sourceTitle": "RAIO DA MORTE [3 VEZES POR DESCANSO LONGO]",
      "usos": "3 VEZES POR DESCANSO LONGO",
      "subclasse": "Fulgor Restaurador",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Usos: 3x | Dano/raio: 2d4 + mod magia | Cura/raio: 1d4 | Extra: —"
        },
        {
          "nivel": 8,
          "desc": "Usos: 4x | Dano/raio: 3d4 + mod magia | Cura/raio: 2d4 | Extra: —"
        },
        {
          "nivel": 14,
          "desc": "Usos: 5x | Dano/raio: 5d4 + mod magia | Cura/raio: 3d4 | Extra: Crítico = 10 raios"
        }
      ],
      "desc": "Agora o jogador consegue criar um feixe de eletricidade em cada um dos dedos de uma de suas mãos. Ao utilizar, cada raio é direcionado para uma direção, formando um cone numa área de até 5m (não são perfurantes), sendo que cada um deles causa 1d4+mod magia de dano elétrico. Para cada raio atingido se cure no valor de 1d4. No entanto, se um alvo estiver a 1m de distância do jogador, todos os raios irão atingir esta criatura de uma só vez. A habilidade FULGOR ricocheteia a quantidade de raios atingidos no alvo para atrás dele."
    },
    {
      "nivel": 8,
      "nome": "ENERGIA SOB A MORTE",
      "tipo": "passiva",
      "sourceTitle": "ENERGIA SOB A MORTE",
      "subclasse": "Fulgor Restaurador",
      "desc": "Para cada RAIO DA MORTE utilizado, aumente a cura e o dano do mesmo em um dado. Valor de cura e do dano adicional se esvai após o fim do combate."
    }
  ],
  "sentinela": [
    {
      "nivel": 1,
      "nome": "MIRA",
      "tipo": "passiva",
      "sourceTitle": "MIRA",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Distância p/ Certeiro: 4m | Extra: -"
        },
        {
          "nivel": 4,
          "desc": "Distância p/ Certeiro: 6m | Extra: -"
        },
        {
          "nivel": 6,
          "desc": "Distância p/ Certeiro: 8m | Extra: -"
        },
        {
          "nivel": 9,
          "desc": "Distância p/ Certeiro: 8m | Extra: Caso em altura elevada, observe qualquer coisa facilmente a 2km"
        }
      ],
      "desc": "Dotados de olhos abençoados e sentidos aguçados, os sentinelas são capazes de observar e apreciar os menores detalhes de tudo que estiver dentro de sua linha de visão, em um raio de 500 metros. Os sentinelas não se permitem errar; tiros em inimigos em até 4 metros de distância são certeiros."
    },
    {
      "nivel": 1,
      "nome": "GRAVURAS NA CARNE",
      "tipo": "passiva",
      "sourceTitle": "GRAVURAS NA CARNE",
      "desc": "O sentinela tatua em seu braço esquerdo palavras de um idioma antigo em rúnico, conhecido por poucos, o Cinero. Essas letras o permitem usar uma magia não convencional, imbuindo energia em suas flechas e corpos e dando a eles novas habilidades. Contudo, os Sentinelas possuem apenas um conhecimento superficial sobre essas palavras, podendo trazer resultados perigosos e inesperados no futuro."
    },
    {
      "nivel": 1,
      "nome": "DESCARGA ELÉTRICA",
      "tipo": "ativo",
      "sourceTitle": "DESCARGA ELÉTRICA [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "desc": "Longas faíscas azuladas percorrem seus braços em direção aos seus dedos, envolvendo as setas que seguram em raios. Dispare sucessivamente três flechas para o céu, em um único segundo. Ao se fincarem no chão, formando um triângulo, elas descarregam sua eletricidade no solo, paralisando todos que estiverem dentro da área (4m) entre elas por 2 turnos, causando 1d6+mod magia como dano elétrico."
    },
    {
      "nivel": 2,
      "nome": "ESTRONDO SÚBITO",
      "tipo": "ativo",
      "sourceTitle": "ESTRONDO SÚBITO [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "desc": "Pequenas linhas de fogo alinham-se à flecha que segurar, até começar a derreter sua ponta. Quando atingir um alvo a seta explode, empurrando quem for atingido por 6 metros, causando 2d6+mod magia de dano de impacto. Caso atinja um membro, sem qualquer tipo de proteção, o mesmo se torna inutilizável por 1 dia."
    },
    {
      "nivel": 2,
      "nome": "SINERGIA",
      "tipo": "ativo",
      "sourceTitle": "SINERGIA [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "desc": "Uma flecha disparada em alta velocidade se crava na carne do alvo, tornando o mesmo inalvejável pelos próximos 2 turnos."
    },
    {
      "nivel": 2,
      "nome": "TERRENO CONHECIDO",
      "tipo": "passiva",
      "sourceTitle": "TERRENO CONHECIDO",
      "desc": "Os sentinelas sabem exatamente onde se encontram pelas pequenas nuances no solo e nas estrelas, nunca se perdendo caso estejam em locais abertos ou ruas populares de grandes cidades."
    },
    {
      "nivel": 3,
      "nome": "VISÃO SUPERIOR",
      "tipo": "passiva",
      "sourceTitle": "VISÃO SUPERIOR",
      "desc": "O Sentinela, dotado de um grande senso de equilíbrio, consegue escalar superfícies íngremes mais facilmente do que a maioria; não caindo em qualquer tipo de escalada. Alguns dizem que gostam de observar as pessoas de maneira debochada, de cima para baixo."
    },
    {
      "nivel": 3,
      "nome": "CRÍTICO APRIMORADO",
      "tipo": "passiva",
      "sourceTitle": "CRÍTICO APRIMORADO",
      "desc": "Ao causar um acerto crítico, o poder do Cinero torna-se volátil demais para o Sentinela controlá-lo com seu parco conhecimento sobre o mesmo. Quando isso ocorre ele dispara uma FLECHA VOLÁTIL contendo o poder de três runas infundidas em uma; ao mesmo tempo seu braço esquerdo não suporta mais o poder contido nele e explode, arremessando o jogador para 5 metros de distância, o deixando atordoado por 1 turno, e causando 1d4 de dano em si mesmo e a todos que estejam muito próximos de si.",
      "evolucoes": [
        {
          "nivel": 7,
          "desc": "Quanto mais poder adquire, mais difícil torna-se controlá-lo, diariamente o Sentinela sente ondas repentinas de magia percorrendo seu corpo por conta do Cinero. Isso acontece com cada vez mais frequência; agora tirar 19 no dado irá gerar uma FLECHA VOLÁTIL."
        },
        {
          "nivel": 18,
          "desc": "Talvez seja devido ao poder latente dentro de si, ou a imensa complexidade do Cinero e sua dificuldade para dominá-lo. Contudo, agora o Sentinela tem algumas alucinações a luz do dia e vislumbres do passado em seus sonhos; acordando suado e assustado, mal se lembrando de pequenos fragmentos. Assim, torna-se ainda mais frequente o descontrole em suas habilidades, agora tirar 17 no dado irá gerar uma FLECHA VOLÁTIL."
        }
      ]
    },
    {
      "nivel": 3,
      "nome": "FLECHA VOLÁTIL",
      "tipo": "passiva",
      "sourceTitle": "FLECHA VOLÁTIL",
      "desc": "Uma única flecha é arremessada com velocidade avassaladora e seu cabo reluziu com cores ardentes durante todo o percurso. Ao atingir um alvo a energia mágica de três runas entrará em ação, dobrando o dano causado, a área e os efeitos originais das respectivas habilidades. Não é possível desviar ou impedir o caminho deste projétil."
    },
    {
      "nivel": 4,
      "nome": "VANTAGEM DE TERRENO",
      "tipo": "passiva",
      "sourceTitle": "VANTAGEM DE TERRENO",
      "desc": "Sempre que estiver em uma altura superior que seus alvos causa 1d4 de dano adicional em qualquer ataque ou habilidade."
    },
    {
      "nivel": 4,
      "nome": "INSTÂNCIA DA CONCENTRAÇÃO",
      "tipo": "ativo",
      "sourceTitle": "INSTÂNCIA DA CONCENTRAÇÃO [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "desc": "O próprio sentinela fica muito mais pesado, perdendo -2 de destreza enquanto estiver neste estado. Seu próximo disparo terá um alcance máximo de 30 metros, pois a flecha pesará o dobro da massa do usuário. Porém, ela é atirada em tamanha velocidade que é capaz de quebrar paredes de pedra e partir armaduras. Ao atingir seu alvo, a seta se fincará na carne e se tornará muito difícil ficar de pé e manter o equilíbrio. Causa 6d4+mod de magia como dano de concussão."
    },
    {
      "nivel": 4,
      "nome": "PROFUSÃO ERRANTE",
      "tipo": "ativo",
      "sourceTitle": "PROFUSÃO ERRANTE [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "desc": "O Sentinela tensiona a corda de seu arco até o limite, seu braço esquerdo estremece por um momento antes de atirar. A flecha percorrerá uma linha reta, perfurando os corpos de seus inimigos, e tudo que obstrua seu caminho, sem perder qualquer impulso, causando 4d6+mod de magia de dano perfurante. Ela cessará sua trajetória apenas quando o Sentinela disparar outra seta qualquer."
    },
    {
      "nivel": 5,
      "nome": "REPERCUSSÃO POR CONTATO",
      "tipo": "ativo",
      "sourceTitle": "REPERCUSSÃO POR CONTATO [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "desc": "Finos raios percorrem os dedos do Sentinela, unindo-se ao projétil que segura em seu arco. Ao penetrar na carne de um inimigo a flecha causará uma pequena onda de choque, inflingindo 5d4+mod de magia de dano, para logo depois libertar-se e repetir a explosão em até dois alvos próximos(5m)."
    },
    {
      "nivel": 5,
      "nome": "TALENTO NATO",
      "tipo": "passiva",
      "sourceTitle": "TALENTO NATO",
      "desc": "Agora o Sentinela é capaz de atirar duas flechas em uma única ação."
    },
    {
      "nivel": 6,
      "nome": "TEMPESTADE DE CHAMAS",
      "tipo": "ativo",
      "sourceTitle": "TEMPESTADE DE CHAMAS [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "Respirando profundamente o ar à volta do Sentinela começa a ficar abafado, com sua temperatura aumentando abruptamente. A flecha que segurar será engolida por extensas chamas vermelhas, com a ponta em brasas. Ao atirar, a seta deixará um rastro de chamas cair por onde passar, causando 6d4+mod de magia em quem tocá-la por 2 turnos, causando queimaduras de 3° grau. Ao acertar seu alvo a flecha causará uma explosão localizada na região atingida, causando 5d8+mod de magia e carbonizando a carne sob a pele."
    },
    {
      "nivel": 6,
      "nome": "ARTÍFICE",
      "tipo": "ativo",
      "sourceTitle": "ARTÍFICE [12 FLECHAS POR DESCANSO CURTO]",
      "usos": "12 FLECHAS POR DESCANSO CURTO",
      "desc": "O Sentinela agora aprendeu a criar suas próprias flechas; tendo como base qualquer material, desde madeira a ossos daqueles que matou. Porém, são flechas rudimentares, assemelhando-se a flechas de ferro comuns."
    },
    {
      "nivel": 7,
      "nome": "EXPLOSÃO DE SENTIDOS",
      "tipo": "ativo",
      "sourceTitle": "EXPLOSÃO DE SENTIDOS [2 VEZ POR DESCANSO LONGO]",
      "usos": "2 VEZ POR DESCANSO LONGO",
      "desc": "Uma flecha translúcida sobrevoa os céus acima da batalha, o Sentinela dispara outra em sequência visando a que está no ar. Ao se chocarem uma explosão ocorre e dela seis feixes de energia branca caem no solo, visando de modo aleatório aqueles que se encontram logo abaixo dela. Cada feixe causa 4d6+mod de magia como dano de luz, deixando quem for atingido com os sentidos desnorteados e cegos por 1 turno."
    },
    {
      "nivel": 8,
      "nome": "FRUGAL",
      "tipo": "ativo",
      "sourceTitle": "FRUGAL [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "desc": "O Sentinela assume a posição de disparo antes de soltar a corda de seu arco, deixando que no último segundo o Cinero corroa a estrutura de sua flecha. Ao acertar um inimigo um abalo se espalhará por seu corpo, deixando seus ossos frágeis e flácidos, sendo mais suscetíveis a danos de impacto de qualquer fonte e dobrando o dano sofrido por 2 turnos."
    },
    {
      "nivel": 8,
      "nome": "DESVIO DESESPERADO",
      "tipo": "ativo",
      "sourceTitle": "DESVIO DESESPERADO [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "desc": "O Sentinela atira em uma flecha enquanto realiza um mortal em pleno ar, caindo 4 metros de distância de sua posição inicial. Pode ser usado como uma reação."
    },
    {
      "nivel": 9,
      "nome": "FESTINS",
      "tipo": "ativo",
      "sourceTitle": "FESTINS [3 VEZES POR DESCANSO CURTO]",
      "usos": "3 VEZES POR DESCANSO CURTO",
      "desc": "O Sentinela dispara uma flecha em direção aos céus, criando uma explosão luminosa por 1 turno, não causando qualquer tipo de dano."
    },
    {
      "nivel": 10,
      "nome": "PACIÊNCIA",
      "tipo": "passiva",
      "sourceTitle": "PACIÊNCIA",
      "desc": "Os Sentinelas são capazes de esperar por dias pela passagem de seus alvos. Devido ao Cinero eles podem manter uma postura agachada junto ao relevo ou encostas de montanhas por dois dias, não movendo um músculo. Eles não sofrem qualquer tipo de lesão ou malefício que normalmente acompanharia quem tentasse realizar esta ação."
    },
    {
      "nivel": 10,
      "nome": "SABOR DA MORTE",
      "tipo": "passiva",
      "sourceTitle": "SABOR DA MORTE",
      "desc": "Ao finalizar um alvo as runas em seus braços reluzem avidamente, como se saboreasse a atitude e a morte de uma vida. O fluxo sanguíneo do Sentinela aumenta brevemente e seus sentidos tornam-se mais aguçados, recebendo uma ação adicional neste turno."
    },
    {
      "nivel": 11,
      "nome": "FLUXO DE SANGUE",
      "tipo": "ativo",
      "sourceTitle": "FLUXO DE SANGUE [2 VEZ POR DESCANSO LONGO]",
      "usos": "2 VEZ POR DESCANSO LONGO",
      "desc": "A haste da flecha que segurar em mãos treme levemente enquanto seu interior vira pó. Ao adentrar o corpo de seu alvo sua ponta derreterá deixando que o sangue da vítima flua livremente por dentro do cabo para o ambiente externo, caindo como uma cascata no chão. Causa 5d4+mod de magia como dano de hemorragia, perdendo 100ml de sangue por turno, caso haja a perda de 1L poderá haver falência dos órgãos internos e o coração não será mais capaz de bombear sangue pelo corpo, levando assim a morte."
    },
    {
      "nivel": 14,
      "nome": "FRAQUEZA DE AQUILES",
      "tipo": "ativo",
      "sourceTitle": "FRAQUEZA DE AQUILES [2 VEZ POR DESCANSO CURTO]",
      "usos": "2 VEZ POR DESCANSO CURTO",
      "desc": "O Sentinela tensiona a corda de seu arco, mirando nas pernas de seu adversário. Um lapso de energia mágica prende-se a haste da flecha antes do disparo e, ao atingir a carne do alvo, uma pequena rajada de energia se alastrará por seus tornozelos, atingindo o tendão de aquiles do alvo, causando 5d8+mod de magia como dano mágico e impossibilitando qualquer tipo de movimento nas pernas por 3 turnos."
    },
    {
      "nivel": 15,
      "nome": "SENTENCIADORA DE BARREIRAS",
      "tipo": "ativo",
      "sourceTitle": "SENTENCIADORA DE BARREIRAS [2 VEZ POR DESCANSO LONGO]",
      "usos": "2 VEZ POR DESCANSO LONGO",
      "desc": "O braço esquerdo do Sentinela lança sobre as duas setas, presas em seu arco, uma pequena aura branca. Respirando profundamente, ambas são disparadas simultaneamente enquanto realizam uma espiral em pleno ar, girando em torno de si mesmas. Ao atingir uma barreira mágica um estrondo abalará a terra, lançando luzes ofuscantes em todas as direções por conta do impacto entre as duas energias, causando 6d6+mod de magia como dano mágico na barreira defensiva. Estas flechas têm o potencial de romper barreiras e, caso assim o façam, o dano causado na mesma será transferido para o seu criador."
    },
    {
      "nivel": 16,
      "nome": "NEGAÇÃO DE CURA",
      "tipo": "ativo",
      "sourceTitle": "NEGAÇÃO DE CURA [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "desc": "O Sentinela dá um salto no ar, ficando parado acima do solo por alguns milésimos de segundos, enquanto tensiona a corda de seu arco. Neste momento, uma flecha é disparada e, ao banhar-se no sangue do alvo, uma onda de choque se alastrará pelo corpo da vítima, inscrevendo uma pequena runa em sua carne. Todas as curas direcionadas ao alvo serão negadas e convertidas na mesma proporção como dano mágico por 3 turnos. É possível quebrar este efeito, cortando fora o membro que possuir tatuado a runa temporária em sua carne."
    },
    {
      "nivel": 17,
      "nome": "ABSORÇÃO EFERVESCENTE",
      "tipo": "ativo",
      "sourceTitle": "ABSORÇÃO EFERVESCENTE [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "O Sentinela levanta seu braço esquerdo acima da cabeça; neste momento o Cinero em sua pele começa a brilhar com cores intensas. O usuário torna-se capaz de absorver a magia de artefatos, armas e corpos inertes pois, mais do que qualquer outra coisa; o Cinero é uma língua mágica e primordial considerada por alguns como a origem da magia. O poder mágico percorre suas veias para então conceder propriedades únicas às três setas que dispararem. Ao acertar um alvo o sangue do mesmo ferverá dentro do próprio corpo, causando 6d10+mod de magia como dano mágico pelos próximos 4 turnos. Mesmo que o alvo consiga se mover após sofrer este ataque, ao fim do combate o mesmo tombará permanecendo imóvel por 1d4 semanas."
    },
    {
      "nivel": 19,
      "nome": "AVANÇO ARDENTE",
      "tipo": "ativo",
      "sourceTitle": "AVANÇO ARDENTE [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "O braço esquerdo do Sentinela irrompe em brasas, o chão sob seus pés começa a passar do estado sólido para líquido e o próprio ar torna-se irremediavelmente quente. Longas línguas de fogo ardente escorrem por seu corpo em direção ao arco e a flecha que segurar em mãos, no instante em que for disparada a seta consumirá qualquer coisa que tocar como combustível para si mesma. Ela irá transpassar tudo à sua frente e no momento que tocar o alvo original um pilar de chamas se alastrará em direção aos céus, queimando a região à volta em até 30 metros. Causa 20d12+mod de magia como dano de fogo, somando um dado de adicional para cada nível de material de raridade raro ou acima que tornar-se seu combustível. Objetos consumidos tornam-se parte das chamas, não podendo retornar a forma original."
    },
    {
      "nivel": 20,
      "nome": "USURPAÇÃO",
      "tipo": "ativo",
      "sourceTitle": "USURPAÇÃO [1 VEZES POR DESCANSO CURTO]",
      "usos": "1 VEZES POR DESCANSO CURTO",
      "desc": "Murmurando palavras esquecidas pela maioria, as pupilas do Sentinela dilatam e sua roupa torna-se úmida por conta do suor. Com movimentos ágeis, uma flecha é retirada de sua aljava para então ser partida ao meio em suas mãos. Uma forte luz esverdeada deixa a seta e permeia o corpo do Sentinela, o qual dispara sua próxima flecha. Todos esses eventos acontecem no intervalo de uma respiração. Ao atingir um alvo o mesmo sentirá uma dor aguda percorrer todo seu corpo, sentindo-se em seguida muito cansado. O inimigo perde uma ação pelo resto do combate, ao passo que o Sentinela sente-se renovado e com mais energia, recebendo uma ação completa pelo mesmo tempo. Essa habilidade não causa quaisquer danos."
    },
    {
      "nivel": 5,
      "nome": "VÁCUO",
      "tipo": "passiva",
      "sourceTitle": "VÁCUO",
      "subclasse": "Sentinela — Inane",
      "desc": "Entre os sentinelas existem muitas discussões à respeito do que seria o vácuo, uma outra dimensão? A morada dos deuses? O início de tudo? Mas, não importa o que seja, uma coisa é clara; os usuários desta shikata descobriram como utilizar esse \"conceito\" a seu favor. O empregando em suas habilidades."
    },
    {
      "nivel": 5,
      "nome": "DOIS EXTREMOS",
      "tipo": "ativo",
      "sourceTitle": "DOIS EXTREMOS [6 VEZES POR DESCANSO CURTO]",
      "usos": "6 VEZES POR DESCANSO CURTO",
      "subclasse": "Sentinela — Inane",
      "desc": "O Inane agora é capaz de criar duas massas de energia negras, do tamanho de um punho fechado, em qualquer local dentro do limite de sua visão. Nenhum tipo de luz consegue entrar ou sair desses extremos. Porém, suas flechas e habilidades são capazes de atravessá-los e atingirem um local ou alvo diferente do original. Os portais se desvanecem alguns segundos logo após serem invocados."
    },
    {
      "nivel": 5,
      "nome": "OLHOS QUE VEEM",
      "tipo": "ativo",
      "sourceTitle": "OLHOS QUE VEEM [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "subclasse": "Sentinela — Inane",
      "desc": "O Inane, após se concentrar durante algum tempo, pode criar um portal dentro de um local fechado. Assim, podendo \"observar\" e ter uma visão geral do que se passa dentro do lugar em questão por 5 segundos. Se for rápido o bastante poderá atravessá-lo com uma flecha antes que ele se feche, ou poderá atirar às cegas, apesar de ser provável que não acerte ninguém."
    },
    {
      "nivel": 8,
      "nome": "CONFINS DA ESCURIDÃO",
      "tipo": "ativo",
      "sourceTitle": "CONFINS DA ESCURIDÃO [2 FLECHAS POR DESCANSO LONGO]",
      "usos": "2 FLECHAS POR DESCANSO LONGO",
      "subclasse": "Sentinela — Inane",
      "desc": "Suas flechas e habilidades agora podem percorrer os confins do vácuo por tempo indeterminado, sem perder sua velocidade e impulso. Pelo contrário, elas parecem agora absorver parte da energia do local, aumentando sua potência de dano. O Inane é capaz de colocar quantas setas ele quiser neste \"lugar\", no entanto, se passar de 12 flechas ele não conseguirá mais ter noção de suas localizações. Caso isso aconteça, nunca mais poderá trazer as mesmas perante o céu novamente. Flechas que percorrem o vácuo causam três dados de dano adicional."
    },
    {
      "nivel": 8,
      "nome": "GILGAMESH",
      "tipo": "ativo",
      "sourceTitle": "GILGAMESH [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "subclasse": "Sentinela — Inane",
      "desc": "O Inane pode abrir até uma dúzia dessas massas de energia negra em qualquer lugar dentro de seu raio de visão, podendo puxar de dentro delas qualquer uma das setas que vem armazenando nos Confins da Escuridão. O Inane pode atingir qualquer alvo a sua escolha com suas habilidades armazenadas, seja com uma ou múltiplas setas de uma única vez."
    },
    {
      "nivel": 14,
      "nome": "LEITO PROFUNDO",
      "tipo": "ativo",
      "sourceTitle": "LEITO PROFUNDO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Sentinela — Inane",
      "desc": "Com grande esforço o Inane conseguiu expandir o tamanho do portal para algo grande o suficiente para a maioria das Origens passarem por ele. Contudo, ele só consegue manter uma pessoa dentro deste espaço. A noção comum de tempo dentro deste local difere da do mundo externo, dias? Anos? Décadas? No entanto, a pessoa em questão que entrar neste lugar será assolada por lembranças de Eras distantes, flashs do passado. Enquanto ela estiver neste estado, se curará em 4d6+const antes de voltar ao mundo."
    },
    {
      "nivel": 14,
      "nome": "MORTE EM AGONIA",
      "tipo": "ativo",
      "sourceTitle": "MORTE EM AGONIA [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "subclasse": "Sentinela — Inane",
      "desc": "O Inane agora aprendeu como abrir portais dentro de objetos ou corpos por alguns milésimos de segundos. Ao atingir um órgão uma pequena fenda se abrirá por um instante para levar a flecha para qualquer região a escolha do usuário dentro de seu campo de visão, a qual tem atravessada a região vital de sua vítima."
    },
    {
      "nivel": 14,
      "nome": "FRUSTRAÇÃO",
      "tipo": "passiva",
      "sourceTitle": "FRUSTRAÇÃO",
      "subclasse": "Sentinela — Inane",
      "desc": "O Inane sabe que não consegue utilizar o pleno potencial de suas habilidades, e isso o frusta. O pensamento de que está deixando algo escapar não deixa sua mente por dias a fio, talvez ele nunca descubra o que falta e desta forma acabe morrendo; sem conseguir saber a verdade."
    },
    {
      "nivel": 5,
      "nome": "AVANÇO TARDIO",
      "tipo": "passiva",
      "sourceTitle": "AVANÇO TARDIO",
      "subclasse": "Sentinela Glacial",
      "desc": "Todos os disparos do Glacial fazem com que uma fina camada de gelo espalhe-se a partir do local onde sua flecha caiu, avançando 10 metros em poucos minutos antes de cessar. O frio impregna-se em quem estiver tocando ou pisando na área de ação do gelo, estes torna-se mais lentos e a temperatura temporal dos mesmos diminui."
    },
    {
      "nivel": 5,
      "nome": "PASSAGEM DE ESTADO",
      "tipo": "ativo",
      "sourceTitle": "PASSAGEM DE ESTADO [3 VEZES POR DESCANSO CURTO]",
      "usos": "3 VEZES POR DESCANSO CURTO",
      "subclasse": "Sentinela Glacial",
      "desc": "Uma onda de frio percorre o corpo do Glacial, antes de deixá-lo para impregnar-se nas setas que segurar com os dedos. Respirando pausadamente o Sentinela dispara duas flechas em rápida sucessão, ao atravessarem os corpos de seus alvos, o ar gelado que carregam toma forma sólida e afiada dentro das vítimas, causando 2d4+mod de magia de dano de gelo. Movimentos bruscos e repentinos por parte dos alvos faz com que seus interiores sejam cortados, até mesmo rasgados; causando 3d6+mod de magia de dano de gelo por 3 turnos."
    },
    {
      "nivel": 8,
      "nome": "DISPARO GÉLIDO",
      "tipo": "ativo",
      "sourceTitle": "DISPARO GÉLIDO [3 VEZES POR DESCANSO LONGO]",
      "usos": "3 VEZES POR DESCANSO LONGO",
      "subclasse": "Sentinela Glacial",
      "desc": "A temperatura do ar ao redor do Glacial baixa consideravelmente, seu próximo disparo irá criar uma explosão fria ao chocar-se contra qualquer superfície sólida. A explosão visa o calor, cobrindo em alta velocidade qualquer coisa mais quente do que si mesma em uma área de 7 metros. Caso alguém seja afetado, poderá ter seu corpo inteiramente coberto por gelo por 2 turnos, causando 2d8+mod de magia de dano de gelo."
    },
    {
      "nivel": 8,
      "nome": "PILARES INVERNAIS",
      "tipo": "ativo",
      "sourceTitle": "PILARES INVERNAIS [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "subclasse": "Sentinela Glacial",
      "desc": "O Glacial dispara uma sequência ininterrupta de 5 flechas em direção aos céus, ao fincaram-se no solo ou em qualquer coisa impregnada pelo AVANÇO TARDIO uma longa coluna de rocha gélida, com 1 metro de diâmetro e 3 de altura, ergue-se do chão diretamente abaixo de cada flecha, perfurando quem estiver acima, causando 3d6+mod de magia como dano de gelo. A camada de gelo que cobre o chão se quebra devido ao impacto, tornando-se mais afiada do que navalhas, caso alguém caia sobre o mesmo receberá 3d4+mod de magia de dano de gelo."
    },
    {
      "nivel": 8,
      "nome": "TEMPERATURA INTERNA",
      "tipo": "ativo",
      "sourceTitle": "TEMPERATURA INTERNA [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "subclasse": "Sentinela Glacial",
      "desc": "Caso o Glacial sofra um ferimento médio, ele pode baixar ainda mais a temperatura do próprio corpo. Desta forma, interrompendo a coagulação de sangue na região ferida, parando por 3 turnos os danos subsequentes que o afligiam."
    },
    {
      "nivel": 14,
      "nome": "ZERO ABSOLUTO",
      "tipo": "ativo",
      "sourceTitle": "ZERO ABSOLUTO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Sentinela Glacial",
      "desc": "Subitamente a íris dos olhos do Sentinela torna-se opacas e seu corpo treme levemente enquanto cria, a partir da umidade do ar a sua volta, uma flecha de um branco profundo e intenso. Com um suspiro os tremores de esvaem, instantes antes de seus dedos soltarem a corda. A flecha percorre uma linha curva em direção aos céus, refletindo toda a claridade dos espectros de Liz visível a sua volta, antes de se esvair em névoa, composta por milhares de flocos de gelo, a poucos milímetros de distância da pele de seu alvo. A névoa adere ao formato do corpo a sua frente, não sendo afetada pelo vento e nunca chegando a encostar na carne do alvo, permanecendo sempre distante, mas presente. Não causa qualquer tipo de dano e também, ao contrário da crença popular, não congela o oponente ou causa qualquer frio. No entanto, se por um acaso o adversário encostar uma ínfima parte de seu corpo nos flocos de gelo que permeiam seu corpo, então o mesmo deixaria de existir, sem dor e sem desespero, apenas vivendo na memória dos vivos."
    }
  ],
  "spellstealer": [
    {
      "nivel": 1,
      "nome": "FLUXO DE MANA",
      "tipo": "passiva",
      "sourceTitle": "FLUXO DE MANA",
      "desc": "Linhas de mana invisíveis envolvem os braços do Spellstealer, imperceptível para os seres comuns. Qualquer ataque físico com punhos e armas causa dano mágico adicional igual a 2x o modificador de magia.Essa teia arcana é permanente."
    },
    {
      "nivel": 1,
      "nome": "CATARSE MÁGICA",
      "tipo": "ativo",
      "sourceTitle": "CATARSE MÁGICA [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Usos: 2x desc. curto | Dano adicional: 1d8"
        },
        {
          "nivel": 4,
          "desc": "Usos: 3x desc. curto | Dano adicional: 2d8"
        },
        {
          "nivel": 8,
          "desc": "Usos: Ilimitado | Dano adicional: 1d10"
        },
        {
          "nivel": 12,
          "desc": "Usos: Ilimitado | Dano adicional: 1d12"
        }
      ],
      "desc": "As linhas de mana se tornam visíveis e se entrelaçam com os punhos ou armas do Spellstealer, carregando o próximo ataque físico com poder arcano. Pode ser ativada como ação bônus."
    },
    {
      "nivel": 1,
      "nome": "VISUALIZAÇÃO",
      "tipo": "passiva",
      "sourceTitle": "VISUALIZAÇÃO",
      "desc": "O Spellstealer possui visão arcana natural, permitindo distinguir instantaneamente entre seres mágicos e não-mágicos com uma simples olhada."
    },
    {
      "nivel": 2,
      "nome": "FORTIFICAÇÃO DE MANA",
      "tipo": "ativo",
      "sourceTitle": "FORTIFICAÇÃO DE MANA [2 VEZES POR DESCANSO CURTO, 1 ATIVAÇÃO POR VEZ]",
      "usos": "2 VEZES POR DESCANSO CURTO, 1 ATIVAÇÃO POR VEZ",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Valor do escudo: 20 + mod cons | Duração: 2 turnos | Imunidade: Magias de nível inferior"
        },
        {
          "nivel": 7,
          "desc": "Valor do escudo: 35 + mod cons | Duração: 3 turnos | Imunidade: Magias até 3 níveis acima"
        },
        {
          "nivel": 17,
          "desc": "Valor do escudo: 45 + mod cons | Duração: Até fim do combate | Imunidade: Toda magia enquanto ativo"
        }
      ],
      "desc": "As linhas de mana fortificam o corpo do Spellstealer com uma camada protetora, criando um escudo sobreposto à vida. Enquanto o escudo estiver ativo, o Spellstealer é imune a dano de habilidades mágicas de nível inferior ao seu."
    },
    {
      "nivel": 2,
      "nome": "TOQUE DO REGICIDA",
      "tipo": "ativo",
      "sourceTitle": "TOQUE DO REGICIDA [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Usos: 2x desc. longo | Cura: 1d10 + mod cons | Dano mágico: 1d4 + mod magia"
        },
        {
          "nivel": 6,
          "desc": "Usos: 2x desc. longo | Cura: 2d10 + mod cons | Dano mágico: 2d4 + mod magia"
        },
        {
          "nivel": 9,
          "desc": "Usos: 3x desc. longo | Cura: 3d10 + mod cons | Dano mágico: 3d4 + mod magia"
        },
        {
          "nivel": 16,
          "desc": "Usos: 3x desc. longo | Cura: 4d10 + mod cons | Dano mágico: 4d4 + mod magia"
        },
        {
          "nivel": 20,
          "desc": "Usos: 4x desc. longo | Cura: 5d10 + mod cons | Dano mágico: 6d4 + mod magia"
        }
      ],
      "desc": "O Spellstealer sobrecarrega uma de suas mãos e a lança contra o inimigo. O impacto rouba vitalidade, curando o Spellstealer e causando dano mágico simultaneamente. Contra seres mágicos, a cura é DOBRADA."
    },
    {
      "nivel": 3,
      "nome": "ROUBO DE ATRIBUTOS",
      "tipo": "passiva",
      "sourceTitle": "ROUBO DE ATRIBUTOS",
      "evolucoes": [
        {
          "nivel": 3,
          "desc": "Valor roubado: 1 ponto de atributo"
        },
        {
          "nivel": 7,
          "desc": "Valor roubado: 2 pontos de atributo"
        }
      ],
      "desc": "Após acertar um golpe crítico, o Spellstealer rouba permanentemente parte dos atributos do inimigo. O atributo afetado é determinado por 1d6 (força, inteligência, magia, destreza, percepção ou constituição). A soma total de todos os atributos roubados também é convertida em defesa."
    },
    {
      "nivel": 3,
      "nome": "USURPAR",
      "tipo": "ativo",
      "sourceTitle": "USURPAR [1 VEZ POR DESCANSO LONGO, 1 VEZ POR CRIATURA]",
      "usos": "1 VEZ POR DESCANSO LONGO, 1 VEZ POR CRIATURA",
      "evolucoes": [
        {
          "nivel": 3,
          "desc": "Usos: 1x desc. longo | Alcance: 5m | Dano de contato: 2d8 | Duração: 2 turnos/5 min | Armazenamento: 1 habilidade | Nível máx roubado: Nível do Spellstealer"
        },
        {
          "nivel": 11,
          "desc": "Usos: 2x desc. longo | Alcance: 20m | Dano de contato: 5d8 | Duração: 2h/4 turnos | Armazenamento: 2 habilidades | Nível máx roubado: Até 2 níveis acima"
        },
        {
          "nivel": 14,
          "desc": "Usos: 2x desc. longo | Alcance: 50m | Dano de contato: 6d8 | Duração: Até usar de novo | Armazenamento: 2 habilidades | Nível máx roubado: Até 2 níveis acima"
        },
        {
          "nivel": 20,
          "desc": "Usos: 2x desc. longo | Alcance: 50m | Dano de contato: 10d8 | Duração: Ilimitado | Armazenamento: Ilimitado (1/inimigo) | Nível máx roubado: Até 5 níveis acima"
        }
      ],
      "desc": "O Spellstealer lança suas linhas de mana no alvo e as puxa de volta com força, causando dano mágico e roubando a habilidade mais forte da criatura. Enquanto usurpada, o inimigo fica impedido de usá-la. A habilidade roubada é ajustada ao nível do Spellstealer."
    },
    {
      "nivel": 4,
      "nome": "DISTORÇÃO ARCANA",
      "tipo": "ativo",
      "sourceTitle": "DISTORÇÃO ARCANA [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "desc": "O Spellstealer envolve um punho com linhas de mana e dispara um feixe luminoso em linha reta: 2d10 + mod magia de dano mágico. O alvo é lançado para longe. Além disso, o Spellstealer usurpa uma ação completa do alvo até o fim do combate."
    },
    {
      "nivel": 5,
      "nome": "LAÇOS DO DESTINO",
      "tipo": "ativo",
      "sourceTitle": "LAÇOS DO DESTINO [3 VEZES POR DESCANSO LONGO]",
      "usos": "3 VEZES POR DESCANSO LONGO",
      "desc": "O Spellstealer utiliza suas linhas de mana para se aproximar de um alvo de até 5m de distância, agarrando-se nele e causando 5d4+mod cons de dano mágico."
    },
    {
      "nivel": 9,
      "nome": "DEVORAR MAGIA",
      "tipo": "ativo",
      "sourceTitle": "DEVORAR MAGIA [1 VEZ POR DIA]",
      "usos": "1 VEZ POR DIA",
      "evolucoes": [
        {
          "nivel": 9,
          "desc": "Usos: 1x/dia | Extra: Absorve magia → cura"
        },
        {
          "nivel": 13,
          "desc": "Usos: 2x/dia | Extra: Replica a magia e usa como reação contra o inimigo"
        },
        {
          "nivel": 19,
          "desc": "Usos: 3x desc. longo | Extra: Poderes consumidos são ROUBADOS (lógica do Usurpar)"
        }
      ],
      "desc": "Quando o Spellstealer é alvo de uma habilidade mágica, suas linhas de mana absorvem o poder automaticamente, convertendo o dano que receberia em CURA para si mesmo."
    },
    {
      "nivel": 10,
      "nome": "CRÍTICO APRIMORADO",
      "tipo": "passiva",
      "sourceTitle": "CRÍTICO APRIMORADO",
      "desc": "18 e 19 no dado de acerto são considerados acerto crítico."
    },
    {
      "nivel": 12,
      "nome": "FUSÃO",
      "tipo": "ativo",
      "sourceTitle": "FUSÃO[1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "As linhas de mana permeiam um membro escolhido de um inimigo, imobilizando-o completamente até o fim do combate. O Spellstealer absorve a força desse membro e a incorpora ao seu próprio corpo na mesma parte correspondente."
    },
    {
      "nivel": 18,
      "nome": "RULESTEALER",
      "tipo": "passiva",
      "sourceTitle": "RULESTEALER",
      "desc": "O Spellstealer transcende as regras convencionais do sistema. Seus modificadores de atributos passam a ser calculados com base nos valores TOTAIS de seus atributos."
    },
    {
      "nivel": 20,
      "nome": "ABSOLVIÇÃO DO DESTINO",
      "tipo": "ativo",
      "sourceTitle": "ABSOLVIÇÃO DO DESTINO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "Com concentração, drena temporariamente TODOS os pontos de atributo de todos os envolvidos na batalha. Alvos eliminados no combate concedem permanentemente seus atributos ao Spellstealer."
    },
    {
      "nivel": 5,
      "nome": "DITAR",
      "tipo": "ativo",
      "sourceTitle": "DITAR [1 VEZ POR CRIATURA]",
      "usos": "1 VEZ POR CRIATURA",
      "subclasse": "Ditador",
      "desc": "As correntes de mana envolvem os olhos do Spellstealer. Alvos que encarem seus olhos são submetidos à sua vontade por um breve momento. Após ser usada uma vez, a criatura se torna permanentemente imune."
    },
    {
      "nivel": 8,
      "nome": "CONSUMIR OS FRACOS",
      "tipo": "ativo",
      "sourceTitle": "CONSUMIR OS FRACOS [3 VEZES POR DIA]",
      "usos": "3 VEZES POR DIA",
      "subclasse": "Ditador",
      "desc": "Ao ativar, sempre que o Spellstealer girar dados, causa o dano máximo de seus ataques, pela ação."
    },
    {
      "nivel": 14,
      "nome": "DEFESA DO DITADOR",
      "tipo": "passiva",
      "sourceTitle": "DEFESA DO DITADOR",
      "subclasse": "Ditador",
      "desc": "Agora a habilidade Ditar pode ser usada até duas vezes num único alvo, até ele ficar imune (ganha mais um uso contra criaturas que já usou anteriormente)."
    },
    {
      "nivel": 5,
      "nome": "CAÇA AOS SUPERIORES",
      "tipo": "passiva",
      "sourceTitle": "CAÇA AOS SUPERIORES",
      "subclasse": "Regicida Supremo",
      "desc": "O poder do Spellstealer varia conforme a hierarquia social da vítima:"
    },
    {
      "nivel": 8,
      "nome": "TENDÊNCIAS",
      "tipo": "passiva",
      "sourceTitle": "TENDÊNCIAS",
      "subclasse": "Regicida Supremo",
      "desc": "O Spellstealer pode usurpar títulos de inimigos derrotados. Cada título (Duque, Marquês, Conde, Visconde, Barão, Rei, Príncipe, Infante, Cavaleiro, Imperador, Escudeiro) concede um efeito permanente à escolha do mestre."
    },
    {
      "nivel": 8,
      "nome": "SUBJULGAR",
      "tipo": "passiva",
      "sourceTitle": "SUBJULGAR",
      "subclasse": "Regicida Supremo",
      "desc": "No início de cada combate, as linhas de mana emitem uma onda que atordoa todos os alvos de nível ou posição social inferior ao Spellstealer por 1 turno."
    },
    {
      "nivel": 14,
      "nome": "OPERADOR DO MUNDO",
      "tipo": "passiva",
      "sourceTitle": "OPERADOR DO MUNDO",
      "subclasse": "Regicida Supremo",
      "desc": "Se o Spellstealer NÃO possuir títulos de Rei, Nobreza ou Clero, recebe passivas permanentes: itens feitos por plebeus/operários que estejam sendo usados por classes superiores (num raio de 15m) definham 20% por turno até se desfazerem. Não afeta itens lendários ou divinos."
    },
    {
      "nivel": 14,
      "nome": "SOB O TRONO",
      "tipo": "passiva",
      "sourceTitle": "SOB O TRONO",
      "subclasse": "Regicida Supremo",
      "desc": "Como regicida, o Spellstealer detecta riquezas de cada criatura num raio de um reino inteiro. Dobra o alcance de TODAS as suas habilidades e ataques. Conhece todos os segredos e podres das criaturas presentes no reino."
    }
  ],
  "hemomante": [
    {
      "nivel": 1,
      "nome": "RESERVA DE SANGUE",
      "tipo": "ativo",
      "sourceTitle": "RESERVA DE SANGUE",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Usos/turno: 1x"
        },
        {
          "nivel": 5,
          "desc": "Usos/turno: 2x"
        },
        {
          "nivel": 9,
          "desc": "Usos/turno: 2x"
        },
        {
          "nivel": 14,
          "desc": "Usos/turno: 3x"
        },
        {
          "nivel": 17,
          "desc": "Usos/turno: 3x"
        },
        {
          "nivel": 20,
          "desc": "Usos/turno: 4x"
        }
      ],
      "desc": "Quando o hemomante mantém o máximo de vida, toda cura recebida além desse limite alimenta uma reserva de sangue (ML). A capacidade máxima é de 4 ml por nível. Metade da reserva soma como defesa durante combates. Ao fim da batalha, toda a reserva é sacrificada e cura o Hemomante (valor de pontos de vida convertido de 1ml para 1hp). Diversas habilidades do hemomante gastam ML da reserva para aumentar seus efeitos (os aprimoramentos podem ser usados até 1 vez por turno)."
    },
    {
      "nivel": 1,
      "nome": "TRANSFUSÃO MÁGICA",
      "tipo": "ativo",
      "sourceTitle": "TRANSFUSÃO MÁGICA [1 VEZ POR TURNO]",
      "usos": "1 VEZ POR TURNO",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Usos/turno: 1x | Dano: 2d6 + mod constituição | Bônus por ML (custo): +1d6 (2 ml)"
        },
        {
          "nivel": 5,
          "desc": "Usos/turno: 2x | Dano: 3d6 + mod constituição | Bônus por ML (custo): +2d6 (4 ml)"
        },
        {
          "nivel": 9,
          "desc": "Usos/turno: 2x | Dano: 4d6 + mod constituição | Bônus por ML (custo): +3d6 (6 ml)"
        },
        {
          "nivel": 14,
          "desc": "Usos/turno: 2x | Dano: 5d6 + mod constituição | Bônus por ML (custo): +4d8 (8 ml)"
        },
        {
          "nivel": 17,
          "desc": "Usos/turno: 3x | Dano: — | Bônus por ML (custo): —"
        },
        {
          "nivel": 20,
          "desc": "Usos/turno: 3x | Dano: 8d8 + mod constituição | Bônus por ML (custo): +5d8 (10 ml)"
        }
      ],
      "desc": "O Hemomante absorve a energia vital do alvo, de uma distância de até 5m. O alvo recebe 2d6+mod constituição de dano mágico e o Hemomante se cura com metade do valor causado. Caso o alvo não possua sangue correndo em suas veias, não haverá cura. Utilizar 2ml de sua reserva faz com que essa habilidade cause 1d6 de dano adicional."
    },
    {
      "nivel": 2,
      "nome": "CICATRIZAÇÃO SANGUÍNEA",
      "tipo": "bonus",
      "sourceTitle": "CICATRIZAÇÃO SANGUÍNEA",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Extra: 1 HP por ml"
        },
        {
          "nivel": 6,
          "desc": "Extra: 2 HP por ml. Regenera feridas leves, fecha feridas grandes"
        },
        {
          "nivel": 20,
          "desc": "Extra: Regenera completamente membros perdidos"
        }
      ],
      "desc": "O hemomante pode extrair sangue de sua reserva para curar-se: cada ml consumido restaura 1 ponto de vida. Pode ser ativado como ação bônus. Essa cura não é amplificada por outras fontes."
    },
    {
      "nivel": 2,
      "nome": "SANGUE ENFEITIÇADO",
      "tipo": "ativo",
      "sourceTitle": "SANGUE ENFEITIÇADO [CUSTA 2 DE VIDA POR FRAGMENTO]",
      "usos": "CUSTA 2 DE VIDA POR FRAGMENTO",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Dano: 1d6 | Por ação: 2 | Bônus por ML: +2 acerto (máx 6) | Dano acumulativo: +2 (máx 4)"
        },
        {
          "nivel": 5,
          "desc": "Dano: 2d6 | Por ação: 3 | Bônus por ML: +3 acerto (máx 6) | Dano acumulativo: +3 (máx 6)"
        },
        {
          "nivel": 9,
          "desc": "Dano: 3d10 | Por ação: 3 | Bônus por ML: +4 acerto (máx 8) | Dano acumulativo: +4 (máx 8)"
        },
        {
          "nivel": 15,
          "desc": "Dano: 4d10 | Por ação: 4 | Bônus por ML: +4 acerto (sem limites) | Dano acumulativo: +4 (sem limites)"
        }
      ],
      "desc": "O hemomante molda fragmentos sólidos de seu próprio sangue e os joga como projéteis. Pode usar até 2 fragmentos por ação. Usar 1 ml da reserva adiciona 2 de acerto a cada fragmento. Acertos consecutivos no turno aumentam o dano dos próximos fragmentos."
    },
    {
      "nivel": 3,
      "nome": "NÉVOA HEMATOGÊNICA",
      "tipo": "ativo",
      "sourceTitle": "NÉVOA HEMATOGÊNICA [1 VEZ POR DESCANSO LONGO, 7 DE VIDA]",
      "usos": "1 VEZ POR DESCANSO LONGO, 7 DE VIDA",
      "desc": "O hemomante gera uma névoa densa de sangue que se espalha em um raio de 15 metros. Todos os seres envolvidos (exceto o hemomante) perdem 3 pontos de acerto em suas ações. A névoa persiste por 3 turnos."
    },
    {
      "nivel": 3,
      "nome": "ENGANO SANGUINÁRIO",
      "tipo": "ativo",
      "sourceTitle": "ENGANO SANGUINÁRIO [2 VEZES POR DESCANSO LONGO, 6 DE VIDA]",
      "usos": "2 VEZES POR DESCANSO LONGO, 6 DE VIDA",
      "desc": "O hemomante cria uma réplica de si mesmo feita de sangue. A réplica intercepta o próximo ataque direcionado ao hemomante, ocultando-o nas sombras até ser atingida."
    },
    {
      "nivel": 4,
      "nome": "DANÇA ESCARLATE",
      "tipo": "ativo",
      "sourceTitle": "DANÇA ESCARLATE [2 VEZES POR DESCANSO CURTO, 10 DE VIDA]",
      "usos": "2 VEZES POR DESCANSO CURTO, 10 DE VIDA",
      "evolucoes": [
        {
          "nivel": 4,
          "desc": "Custo: 10 HP | Área: 10m | 1º impacto: 2d4 + mod constituição | 2º impacto (marca): +3d4"
        },
        {
          "nivel": 8,
          "desc": "Custo: 18 HP | Área: 20m | 1º impacto: 4d4 + mod constituição | 2º impacto (marca): +6d4"
        },
        {
          "nivel": 12,
          "desc": "Custo: 25 HP | Área: 30m | 1º impacto: 4d6+ mod constituição | 2º impacto (marca): +5d6"
        }
      ],
      "desc": "O hemomante lança seu próprio sangue numa onda que envolve todas as criaturas num raio de 10 metros, causando 2d4 + mod constituição de dano a todas elas, marcando-os. Cada uso desta habilidade no combate aumenta a cura de TODAS as fontes em (mod constituição). A segunda conjuração no mesmo combate causa 3d4 de dano adicional aos já marcados. Gastar 20 ml da reserva permite o uso extra."
    },
    {
      "nivel": 6,
      "nome": "RISCO SANGRENTO",
      "tipo": "ativo",
      "sourceTitle": "RISCO SANGRENTO [1 VEZ POR DESCANSO LONGO, 8 DE VIDA]",
      "usos": "1 VEZ POR DESCANSO LONGO, 8 DE VIDA",
      "desc": "O hemomante sacrifica todos os modificadores de atributo exceto Magia e Constituição. Em troca, sua capacidade de cura aumenta pela soma dos modificadores sacrificados. Valores negativos reduzem a cura. Dura o combate inteiro."
    },
    {
      "nivel": 7,
      "nome": "CATÁSTROFE EFLUVIANTE",
      "tipo": "passiva",
      "sourceTitle": "CATÁSTROFE EFLUVIANTE",
      "desc": "Quando um alvo morre por hemomancia, seu corpo explode em torrentes de sangue num raio de 5 metros. Só acontece se o alvo ainda possuir sangue."
    },
    {
      "nivel": 7,
      "nome": "VISÃO VERMELHA",
      "tipo": "passiva",
      "sourceTitle": "VISÃO VERMELHA",
      "desc": "O hemomante discerne a fragilidade de inimigos pela observação de sangue exposto (até 5m). Ao identificar uma vulnerabilidade, ataque imediatamente como uma reação. Pode atacar 1x por ferida."
    },
    {
      "nivel": 9,
      "nome": "MANIPULAÇÃO RUBRA",
      "tipo": "ativo",
      "sourceTitle": "MANIPULAÇÃO RUBRA [1 VEZ POR DESCANSO CURTO, 15 DE VIDA]",
      "usos": "1 VEZ POR DESCANSO CURTO, 15 DE VIDA",
      "evolucoes": [
        {
          "nivel": 9,
          "desc": "Usos: 1x desc. curto | Dano (interromper/acelerar): 4d8+mod constituição/ 3d10+mod magia | Extra: Exaustão mental"
        },
        {
          "nivel": 13,
          "desc": "Usos: 1x desc. curto | Dano (interromper/acelerar): 5d8+mod constituição / 4d10+mod constituição | Extra: —"
        },
        {
          "nivel": 17,
          "desc": "Usos: 2x desc. curto | Dano (interromper/acelerar): 6d8+mod constituição / 6d12+mod constituição | Extra: Controla 2 alvos. Sem exaustão"
        }
      ],
      "desc": "O hemomante controla o fluxo sanguíneo de um alvo. Pode interromper a circulação (atordoa 1 turno) ou acelerá-la (causa hemorragia interna por 3 turnos). Deixa o hemomante mentalmente exausto. Gastar 30 ml DOBRA danos e efeitos (mod inalterado)."
    },
    {
      "nivel": 10,
      "nome": "CAMINHO RUBRO",
      "tipo": "passiva",
      "sourceTitle": "CAMINHO RUBRO",
      "desc": "O hemomante detecta criaturas marcadas pela DANÇA ESCARLATE num raio de 1200 metros, sabendo sua localização exata. Gastar 20 ml amplia o raio em +1000 metros."
    },
    {
      "nivel": 11,
      "nome": "LANÇA SANGUINÁRIA",
      "tipo": "ativo",
      "sourceTitle": "LANÇA SANGUINÁRIA [2 VEZES POR DESCANSO LONGO, 15 DE VIDA]",
      "usos": "2 VEZES POR DESCANSO LONGO, 15 DE VIDA",
      "evolucoes": [
        {
          "nivel": 11,
          "desc": "Dano: 10d4 + mod constituição | ML para 2ª lança: 24 ml"
        },
        {
          "nivel": 19,
          "desc": "Dano: 10d6 + mod constituição | ML para 2ª lança: 36 ml (cria 2 lanças extras)"
        }
      ],
      "desc": "Caso o hemomante veja sangue exposto (em chão, ou em feridas), poderá criar uma grande estaca de sangue apontando para a direção que desejar (até 3m, a estaca não pode ser arremessada, ela ficará estática), causando 10d4+magia de dano e perfurando os alvos no caminho, aplicando hemorragia por 2 turnos (acumula). Usar 24ml fará com que o jogador consiga criar mais uma estaca, mas podendo ser em uma direção diferente."
    },
    {
      "nivel": 12,
      "nome": "ESCOAMENTO DA DOR",
      "tipo": "ativo",
      "sourceTitle": "ESCOAMENTO DA DOR [1 VEZ POR DESCANSO LONGO, 25 DE VIDA]",
      "usos": "1 VEZ POR DESCANSO LONGO, 25 DE VIDA",
      "evolucoes": [
        {
          "nivel": 11,
          "desc": "Dano: 10d4 + mod constituição | ML para 2ª lança: 24 ml"
        },
        {
          "nivel": 16,
          "desc": "Dano: 10d6 + mod constituição | ML para 2ª lança: 30 ml (cria 2 lanças extras)"
        },
        {
          "nivel": 19,
          "desc": "Dano: 10d8 + mod constituição | ML para 2ª lança: 36 ml (cria 3 lanças extras)"
        }
      ],
      "desc": "O hemomante ergue a mão e drena energia vital de todos os inimigos marcados pela DANÇA ESCARLATE. Uma esfera de sangue se materializa em sua palma, causando 5d8 + mod constituição de dano mágico. Após o ato, reduz permanentemente a vida máxima dos alvos pela metade do dano causado anteriormente. Cura o hemomante em 3d4 por alvo atingido. Gastar 20 ml faz a esfera explodir em um raio de 8x8, causando +5d6 + mod constituição de dano mágico."
    },
    {
      "nivel": 20,
      "nome": "VÓRTEX HEMÁTICO",
      "tipo": "ativo",
      "sourceTitle": "VÓRTEX HEMÁTICO [35 DE VIDA, 1 VEZ POR DESCANSO LONGO]",
      "usos": "35 DE VIDA, 1 VEZ POR DESCANSO LONGO",
      "desc": "O hemomante se ajoelha e pressiona as mãos no chão, soltando um grito que ecoa pelos céus. O sangue de todos os seres ao redor — aliados e inimigos — se ergue em direção às nuvens. Pedras de granizo compostas de sangue chovem do céu: 8d12 de dano por granizo. O hemomante NÃO controla o alvo — a destruição é indiscriminada. Enquanto houver sangue derramado na área, o granizo continua caindo."
    },
    {
      "nivel": 5,
      "nome": "EXPERIÊNCIA",
      "tipo": "passiva",
      "sourceTitle": "EXPERIÊNCIA",
      "subclasse": "Hemomante Empírico",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Extra: Imunidade a efeitos negativos repetidos"
        },
        {
          "nivel": 8,
          "desc": "Extra: Habilidades iguais acertadas contra você: apenas METADE do dano"
        },
        {
          "nivel": 14,
          "desc": "Extra: A imunidade é permanente em vida"
        }
      ],
      "desc": "O hemomante nunca sucumbe duas vezes ao mesmo infortúnio. Cada efeito negativo sofrido pela primeira vez (atordoamento, veneno, doença, sangramento, etc.) concede imunidade permanente a esse efeito até o fim do combate."
    },
    {
      "nivel": 5,
      "nome": "RENASCIMENTO ÉPICO",
      "tipo": "ativo",
      "sourceTitle": "RENASCIMENTO ÉPICO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Hemomante Empírico",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Extra: Volta com 25% da vida."
        },
        {
          "nivel": 14,
          "desc": "Extra: Volta com a vida completa."
        }
      ],
      "desc": "Quando a vida chega a zero, a determinação sobrenatural do hemomante o ressuscita com 25% da vida máxima. No momento do renascimento, desencadeia uma ação completa imediata."
    },
    {
      "nivel": 8,
      "nome": "EMPÍRICO",
      "tipo": "ativo",
      "sourceTitle": "EMPÍRICO [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "subclasse": "Hemomante Empírico",
      "desc": "O hemomante pode copiar exatamente uma habilidade que foi usada contra ele, transformando-a numa versão sanguinolenta. Dano e efeitos refletem o nível do hemomante. Esta habilidade cura o hemomante de acordo com o dano causado."
    },
    {
      "nivel": 14,
      "nome": "MÍSTICA EMPÍRICA",
      "tipo": "passiva",
      "sourceTitle": "MÍSTICA EMPÍRICA",
      "subclasse": "Hemomante Empírico",
      "desc": "A cada ataque desferido ou dano recebido, orbes vermelhas surgem ao redor do hemomante (quantidade = dano causado). No final de cada turno, as orbes atacam um único inimigo automaticamente. Cada orbe causa dano físico igual a 1d4. Após o ataque, as orbes se dissipam."
    },
    {
      "nivel": 14,
      "nome": "CUSTO EMPÍRICO",
      "tipo": "passiva",
      "sourceTitle": "CUSTO EMPÍRICO",
      "subclasse": "Hemomante Empírico",
      "desc": "O hemomante consegue reduzir o custo de vida de suas habilidades pela metade."
    },
    {
      "nivel": 5,
      "nome": "FORJA HEMATÚRGICA",
      "tipo": "ativo",
      "sourceTitle": "FORJA HEMATÚRGICA [15 DE VIDA]",
      "usos": "15 DE VIDA",
      "subclasse": "Hemomante da Guerra",
      "desc": "O hemomante pode moldar armas feitas puramente de seu próprio sangue: espadas (2d8), arcos e 10 flechas (1d6), machados (2d8), adagas (2x, 2d4), foice (2d8), katana (2d8), cajado, entre outras. Golpes com armas de sangue curam o hemomante em metade do dano causado e adicionam mod constituição como dano mágico. A cada 2 níveis, as armas ganham +1 dado de dano."
    },
    {
      "nivel": 5,
      "nome": "LASCAS DE SANGUE",
      "tipo": "ativo",
      "sourceTitle": "LASCAS DE SANGUE [10 DE VIDA]",
      "usos": "10 DE VIDA",
      "subclasse": "Hemomante da Guerra",
      "desc": "O hemomante envolve qualquer arma (que não seja de origem mágica) em seu próprio sangue, conferindo dano mágico adicional igual ao mod constituição. O envolvimento pode ser realizado em sua ação bônus."
    },
    {
      "nivel": 5,
      "nome": "HEMOTESE",
      "tipo": "passiva",
      "sourceTitle": "HEMOTESE",
      "subclasse": "Hemomante da Guerra",
      "desc": "A TRANSFUSÃO MÁGICA pode ser usada em ataques físicos a partir de agora."
    },
    {
      "nivel": 8,
      "nome": "PÓDIO",
      "tipo": "ativo",
      "sourceTitle": "PÓDIO [25 DE VIDA, 1 VEZ POR DESCANSO LONGO]",
      "usos": "25 DE VIDA, 1 VEZ POR DESCANSO LONGO",
      "subclasse": "Hemomante da Guerra",
      "desc": "O hemomante fecha as palmas das mãos e uma aura vermelha irrompe num raio de 30x30. Dentro dessa área, TODAS as criaturas (exceto o hemomante) são proibidas de usar qualquer habilidade mágica, incluindo efeitos de itens mágicos (armas de sangue são exceção). Os seres ficam presos no selo por 3 turnos."
    },
    {
      "nivel": 14,
      "nome": "LEGIÃO DE SANGUE",
      "tipo": "ativo",
      "sourceTitle": "LEGIÃO DE SANGUE [1 VEZ POR DESCANSO LONGO, 35 DE VIDA]",
      "usos": "1 VEZ POR DESCANSO LONGO, 35 DE VIDA",
      "subclasse": "Hemomante da Guerra",
      "desc": "O hemomante consome todo sangue presente na área de combate. Envolve-se numa armadura carmesim cuja força é proporcional ao sangue absorvido: +1 de CA e +1 de defesa por litro consumido (máx 12 de CA). Caso receba acima de 10 litros: além dos atributos anteriores, o hemomante vai causar +1 dado de dano em todas as habilidades por litro. Todos os valores permanecem no combate inteiro."
    }
  ],
  "lanceiro": [
    {
      "nivel": 1,
      "nome": "SINFONIA DA LANÇA",
      "tipo": "ativo",
      "sourceTitle": "SINFONIA DA LANÇA [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Usos: 2x desc. curto | Dano/metro: 1d4 + mod força + mod dest | Extra: —"
        },
        {
          "nivel": 4,
          "desc": "Usos: 3x desc. curto | Dano/metro: 2d4/metro | Extra: —"
        },
        {
          "nivel": 7,
          "desc": "Usos: 3x desc. curto | Dano/metro: 2d4/metro | Extra: Também faça um corte lateral CERTEIRO no alvo atingido: 2d4+mod força"
        },
        {
          "nivel": 8,
          "desc": "Usos: 4x desc. curto | Dano/metro: 2d6/metro | Extra: —"
        },
        {
          "nivel": 11,
          "desc": "Usos: 4x desc. curto | Dano/metro: 2d6/metro | Extra: Corte lateral: 4d4+mod força"
        },
        {
          "nivel": 12,
          "desc": "Usos: 4x desc. curto | Dano/metro: 2d8/metro | Extra: —"
        },
        {
          "nivel": 16,
          "desc": "Usos: 4x desc. curto | Dano/metro: 3d8/metro | Extra: —"
        },
        {
          "nivel": 19,
          "desc": "Usos: 4x desc. curto | Dano/metro: 3d8/metro | Extra: Corte lateral: 5d4+mod força"
        },
        {
          "nivel": 20,
          "desc": "Usos: 5x desc. curto | Dano/metro: 5d8/metro | Extra: —"
        }
      ],
      "desc": "O Lanceiro realiza uma estocada com sua arma, numa distância de até (tamanho da arma)+4m em linha reta, causando 1d4 de dano adicional baseando-se na distância do jogador contra o alvo (mínimo 1d4 de dano adicional a 1 metro de distância, aumentando para 4d4 de dano adicional numa distância de 4m). Pode atingir alvos alinhados."
    },
    {
      "nivel": 1,
      "nome": "FRAGMENTAR",
      "tipo": "passiva",
      "sourceTitle": "FRAGMENTAR",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Defesa removida por golpe: 1 | CA removida (sem defesa): 1 (não acumula)"
        },
        {
          "nivel": 6,
          "desc": "Defesa removida por golpe: 3 | CA removida (sem defesa): 2 (não acumula)"
        },
        {
          "nivel": 12,
          "desc": "Defesa removida por golpe: 5 | CA removida (sem defesa): 3 (não acumula)"
        },
        {
          "nivel": 18,
          "desc": "Defesa removida por golpe: 10 | CA removida (sem defesa): 4 (não acumula)"
        }
      ],
      "desc": "Cada golpe físico do lanceiro fragmenta a defesa do inimigo de forma cumulativa. Quando a defesa chega a zero, começa a retirar CA."
    },
    {
      "nivel": 2,
      "nome": "CONTRA DISTÂNCIA",
      "tipo": "ativo",
      "sourceTitle": "CONTRA DISTÂNCIA [3 VEZES POR DESCANSO CURTO]",
      "usos": "3 VEZES POR DESCANSO CURTO",
      "desc": "Quando um adversário se aproxima com arma de alcance inferior, o lanceiro pode contra-atacar instantaneamente (teste de reflexo, dificuldade 16. Ao nível 7 a dificuldade para refletir diminui para 10)."
    },
    {
      "nivel": 2,
      "nome": "LANÇAMENTO",
      "tipo": "bonus",
      "sourceTitle": "LANÇAMENTO",
      "desc": "Lançamentos de qualquer tipo de armas custam apenas uma ação bônus e causam dano adicional baseado em seu modificador de destreza."
    },
    {
      "nivel": 3,
      "nome": "TEMPESTADE EUFÓRICA",
      "tipo": "ativo",
      "sourceTitle": "TEMPESTADE EUFÓRICA [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 3,
          "desc": "Extra: Bloqueia projéteis e magias à distância"
        },
        {
          "nivel": 5,
          "desc": "Extra: Pode girar para cima e voar por segundos (duração = mod destreza)"
        }
      ],
      "desc": "Faça um movimento giratório em sua frente com sua lança, repetindo este movimento muitas vezes, criando uma zona impenetrável. Qualquer habilidade/golpe a distância que atingir a zona giratória terá o ataque repelido completamente. Pode utilizar em uma reação."
    },
    {
      "nivel": 5,
      "nome": "AVANÇO JEVELIN",
      "tipo": "ativo",
      "sourceTitle": "AVANÇO JEVELIN [3 VEZES POR DESCANSO LONGO, 1 POR INIMIGO]",
      "usos": "3 VEZES POR DESCANSO LONGO, 1 POR INIMIGO",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Extra: Avanço imparável"
        },
        {
          "nivel": 14,
          "desc": "Extra: Alvo fica atordoado 1 turno"
        }
      ],
      "desc": "O Lanceiro faz um avanço IMPARÁVEL numa distância de até 4+(alcance da arma) metros, atingindo o inimigo com a ponta de sua arma. Pode utilizar enquanto estiver no ar."
    },
    {
      "nivel": 6,
      "nome": "ONDA",
      "tipo": "ativo",
      "sourceTitle": "ONDA [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 6,
          "desc": "Ataques: 3"
        },
        {
          "nivel": 16,
          "desc": "Ataques: 4 (4 chances, maior prevalece)"
        }
      ],
      "desc": "Dispare uma onda de 3 ataques de uma vez num único alvo. Cada um dos ataques causa metade de seu dano. O jogador terá três chances de acertar os três ataques (maior valor prevalece). Caso esta habilidade seja um crítico, cause dano normal em todos os três ataques."
    },
    {
      "nivel": 9,
      "nome": "EQUILÍBRIO",
      "tipo": "passiva",
      "sourceTitle": "EQUILÍBRIO",
      "desc": "Equilíbrio perfeito em qualquer situação, incluindo se equilibrar na ponta de sua própria lança."
    },
    {
      "nivel": 9,
      "nome": "CHUTES DE ELEVAÇÃO",
      "tipo": "ativo",
      "sourceTitle": "CHUTES DE ELEVAÇÃO [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 9,
          "desc": "Chutes: 5 | Dano/chute: 2d6 + mod força"
        },
        {
          "nivel": 17,
          "desc": "Chutes: 7 | Dano/chute: 3d6 + mod força"
        }
      ],
      "desc": "O lanceiro corre em uma direção por alguns metros, antes de fincar com todas as forças sua arma no chão. Forçando seus músculos ele impulsiona seu corpo para cima, ficando em uma posição estável no topo de sua lança. Assim seu corpo começa a girar no cabo de metal para logo em seguida soltar 5 chutes contra os inimigos em até 4 metros de distância. Cada um de seus chutes causa 2d6+mod de força de dano físico."
    },
    {
      "nivel": 10,
      "nome": "RESPIRAÇÃO",
      "tipo": "ativo",
      "sourceTitle": "RESPIRAÇÃO [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 10,
          "desc": "Extra: 2 turnos"
        },
        {
          "nivel": 20,
          "desc": "Extra: Até o fim do combate"
        }
      ],
      "desc": "Concentrando-se por alguns segundos, o Lanceiro reforça suas defesas, aumentando drasticamente seus reflexos. Entre em estado de CONCENTRAÇÃO por 2 turnos."
    },
    {
      "nivel": 13,
      "nome": "NO AR",
      "tipo": "passiva",
      "sourceTitle": "NO AR",
      "evolucoes": [
        {
          "nivel": 13,
          "desc": "Extra: Pega arremessos (não críticos)"
        },
        {
          "nivel": 17,
          "desc": "Extra: Ganha ação de arremesso após pegar"
        },
        {
          "nivel": 20,
          "desc": "Extra: Pega arremessos críticos"
        }
      ],
      "desc": "O lanceiro agora consegue pegar qualquer arma em pleno ar que for arremessada em sua direção, a não ser que seja um acerto crítico."
    },
    {
      "nivel": 13,
      "nome": "DUELO FRAGMENTADO",
      "tipo": "passiva",
      "sourceTitle": "DUELO FRAGMENTADO",
      "desc": "Contra oponentes sem defesa: +3 dados de dano adicionais em todos os golpes."
    },
    {
      "nivel": 14,
      "nome": "GIRO DA LANÇA",
      "tipo": "ativo",
      "sourceTitle": "GIRO DA LANÇA [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "desc": "O lanceiro gira sua lança em cima de sua cabeça três vezes, acertando todos os alvos próximos num raio de 3+(tamanho da arma)m, causando 6d4+mod força de dano físico por cada um dos giros. Todos os giros são ataques certeiros, mas não podem ser acertos críticos."
    },
    {
      "nivel": 15,
      "nome": "O ESCALÃO",
      "tipo": "ativo",
      "sourceTitle": "O ESCALÃO [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "desc": "Fortalecendo seu ataque com suas duas mãos, o lanceiro realiza um golpe lateral com a ponta de sua arma no inimigo num alcance de até 4m, causando 3d6+mod força de dano físico adicional. Após o alvo receber o ataque, ficará extremamente debilitado, perdendo toda a defesa até o fim do combate."
    },
    {
      "nivel": 5,
      "nome": "ÍMPETO DO BURACO NEGRO",
      "tipo": "ativo",
      "sourceTitle": "ÍMPETO DO BURACO NEGRO [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "subclasse": "Lanceiro Panteão Cósmico",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Usos: 1x desc. curto | Alcance: 20m | Raio: 4m | Dano/turno: 1d8"
        },
        {
          "nivel": 14,
          "desc": "Usos: 2x desc. curto | Alcance: 30m | Raio: 6m | Dano/turno: 2d8"
        }
      ],
      "desc": "Uma sombra de uma lança é criada a frente da sua, ela possui as mesmas características da arma, e é lançada em linha reta logo em seguida (percorre até 20m de distância). No impacto contra uma alvo ou superfície sólida, cause o dano físico de sua arma e crie uma zona gravitacional que começa a puxar inimigos próximos numa área de até 4m para o centro durante 3 turnos. Os alvos giram testes de resistência todos os turnos (dificuldade 10), caso falhem, eles são jogados diretamente para o centro. Inimigos no centro recebem 1d8 de dano mágico por turno."
    },
    {
      "nivel": 5,
      "nome": "SALTO ESTELAR",
      "tipo": "ativo",
      "sourceTitle": "SALTO ESTELAR [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "subclasse": "Lanceiro Panteão Cósmico",
      "desc": "O lanceiro realiza um salto que o eleva a 50 metros + mod força de altura. Uma trilha de constelações se forma em seu caminho. Só funciona sob a gravidade do mundo."
    },
    {
      "nivel": 8,
      "nome": "AVANÇO ESTELAR",
      "tipo": "ativo",
      "sourceTitle": "AVANÇO ESTELAR [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Lanceiro Panteão Cósmico",
      "evolucoes": [
        {
          "nivel": 8,
          "desc": "Usos: 1x desc. longo | Distância: 1 km | Extra: —"
        },
        {
          "nivel": 20,
          "desc": "Usos: 2x desc. longo | Distância: 110 km | Extra: Velocidade não afetada pela ausência de gravidade"
        }
      ],
      "desc": "O lanceiro realiza um avanço rápido para onde sua lança está apontando, causando danos no primeiro alvo que atingir. O jogador percorre até 1km de distância e só consegue parar após atingir alguma coisa com a lança ou chegar no limite de 1km. A velocidade é igual a 140 km/h. O dano é igual a (metade da quantidade de metros percorridos) de dano físico. É possível utilizar enquanto estiver no ar."
    },
    {
      "nivel": 14,
      "nome": "O PANTEÃO",
      "tipo": "passiva",
      "sourceTitle": "O PANTEÃO",
      "subclasse": "Lanceiro Panteão Cósmico",
      "desc": "O lanceiro agora resiste a OBLITERAÇÕES. O jogador não pode ser executado com apenas um golpe. Quando receber um ataque capaz de zerar sua vida, fique invencível por 2 turnos."
    },
    {
      "nivel": 20,
      "nome": "SOB OS COSMOS",
      "tipo": "passiva",
      "sourceTitle": "SOB OS COSMOS",
      "subclasse": "Lanceiro Panteão Cósmico",
      "desc": "O lanceiro agora não precisa respirar caso esteja fora da atmosfera, nem será afetado pelo frio do espaço."
    },
    {
      "nivel": 5,
      "nome": "SOB OS ELEMENTOS",
      "tipo": "passiva",
      "sourceTitle": "SOB OS ELEMENTOS",
      "subclasse": "Lanceiro Dracônico Elemental",
      "desc": "O lanceiro caminha sobre águas, atravessa lava e fogo sem dano, e se equilibra sobre gelo pontiagudo sem ferimentos."
    },
    {
      "nivel": 5,
      "nome": "INFLAMAÇÃO DRACÔNICA",
      "tipo": "ativo",
      "sourceTitle": "INFLAMAÇÃO DRACÔNICA [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "subclasse": "Lanceiro Dracônico Elemental",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Dano do golpe: 3d4 adicional | Cone: 4m | Dano do cone: 3d6 mágico"
        },
        {
          "nivel": 14,
          "desc": "Dano do golpe: 6d4 adicional | Cone: 8m | Dano do cone: 7d6 mágico"
        }
      ],
      "desc": "A ponta da lança entra em combustão e o lanceiro realiza um golpe frontal com a arma, atingindo um inimigo no alcance da arma, causando 3d4 de dano mágico adicional. No impacto da arma, uma aura do dragão de fogo vermelho dispara uma torrente de fogo a até 4m de distância numa área de cone, causando 5d4 de dano mágico para os alvos na região. O fogo se dissipa ao iniciar do próximo turno."
    },
    {
      "nivel": 8,
      "nome": "OS DRAGÕES DAS ÁGUAS",
      "tipo": "ativo",
      "sourceTitle": "OS DRAGÕES DAS ÁGUAS [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Lanceiro Dracônico Elemental",
      "desc": "Três dragões surgem do resquício da água mais próximo do combate, se expandindo até ficarem em seus tamanhos originais. Após serem totalmente reconstruídos, os três dragões começarão a rodear o lanceiro num formato de círculo, a 55 m de distância. Dentro da área, todas as criaturas receberão um dado de dano adicional do lanceiro por dragão vivo. Ataques a distância não podem adentrar a área e são parados pelo fluxo constante de água dos dragões. Cada dragão é destruído por 4 ataques físicos ou mágicos de qualquer fonte e duram até o fim do combate caso não sejam destruídos. Danos constantes nos dragões só afetam 1 vez."
    },
    {
      "nivel": 14,
      "nome": "DRACÔNICO",
      "tipo": "ativo",
      "sourceTitle": "DRACÔNICO [1 VEZ AO DIA]",
      "usos": "1 VEZ AO DIA",
      "subclasse": "Lanceiro Dracônico Elemental",
      "desc": "O lanceiro evoca asas elementais (fogo, água ou gelo) que dobram sua destreza, permitem desviar de qualquer crítico, e fazem planar ao ar. As asas são frágeis: 1 golpe as destrói. Enquanto não é quebrada, durará para eternidade."
    },
    {
      "nivel": 20,
      "nome": "IMERSÃO ETHÉRICA",
      "tipo": "ativo",
      "sourceTitle": "IMERSÃO ETHÉRICA [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Lanceiro Dracônico Elemental",
      "desc": "Ritual ancestral que envolve armadura e armas com éter primordial, fazendo o lanceiro receber +50 de defesa. Quando ativado, sua mobilidade é reduzida a 1, mas alcance dobrado. Dura até o fim da batalha."
    },
    {
      "nivel": 20,
      "nome": "DRAGÃO DO ÉTER",
      "tipo": "ativo",
      "sourceTitle": "DRAGÃO DO ÉTER [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Lanceiro Dracônico Elemental",
      "desc": "Invoca o lendário Dragão do Éter, que ataca com um sopro de energia etérea, causando 15d8 de dano mágico em um raio de 15x15 metros. Após o ataque, o dragão se dissipa."
    }
  ],
  "manipulador-essencia": [
    {
      "nivel": 1,
      "nome": "TEMPO LIMITE [PASSIVA]",
      "tipo": "passiva",
      "sourceTitle": "TEMPO LIMITE [PASSIVA]",
      "desc": "O usuário tem noção de quanto tempo de vida lhe resta, sejam séculos ou dias. Ele também utiliza de seu tempo enquanto vive para utilizar as habilidades."
    },
    {
      "nivel": 1,
      "nome": "DANO VAZIO",
      "tipo": "passiva",
      "sourceTitle": "DANO VAZIO",
      "desc": "Suas habilidades que infligem danos em inimigos, não possuem um elemento específico como dano físico, mágico ou elemental, ele é nulo, portanto, nenhuma vantagem ou desvantagem."
    },
    {
      "nivel": 1,
      "nome": "LA MUERTE",
      "tipo": "ativo",
      "sourceTitle": "LA MUERTE [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Essência: 4 dias | Dano: 1d6 + mod int"
        },
        {
          "nivel": 5,
          "desc": "Essência: 10 dias | Dano: 2d8 + mod int"
        },
        {
          "nivel": 8,
          "desc": "Essência: 15 dias | Dano: 3d8 + mod int"
        },
        {
          "nivel": 12,
          "desc": "Essência: 3 semanas | Dano: 5d8 + mod int"
        }
      ],
      "desc": "O usuário canaliza na palma de sua mão uma névoa esbranquiçada, ao tocar seu adversário ela penetrará na carne de seu oponente, percorrendo por dentro de suas veias, causando 1d6+mod de inteligência de dano. Caso seja um ataque crítico, a névoa também é percorrida para o alvo mais próximo do inimigo que o jogador tocou. Esta habilidade ignora completamente a defesa de seus inimigos."
    },
    {
      "nivel": 2,
      "nome": "VISÃO EMBOTADA",
      "tipo": "ativo",
      "sourceTitle": "VISÃO EMBOTADA [3 VEZES POR DESCANSO CURTO, 2 TURNOS, ESSÊNCIA: 2 DIAS]",
      "usos": "3 VEZES POR DESCANSO CURTO, 2 TURNOS, ESSÊNCIA: 2 DIAS",
      "desc": "Caso utilize armas de alcance curto e/ou médio em uma de suas mãos, sua essência a englobará. Quando esta tocar a carne de seu oponente, sua essência, em forma de névoa, envolverá os olhos deste, reduzindo seu raio de visão para nada mais do que 5 cm a partir de si. Também causa um 2d4 de dano adicional que também ignora a defesa do inimigo."
    },
    {
      "nivel": 2,
      "nome": "EVASÃO",
      "tipo": "ativo",
      "sourceTitle": "EVASÃO [1 VEZ POR DESCANSO CURTO, ESSÊNCIA: 2 DIAS]",
      "usos": "1 VEZ POR DESCANSO CURTO, ESSÊNCIA: 2 DIAS",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "Usos: 1x desc. curto | Distância: 5m"
        },
        {
          "nivel": 6,
          "desc": "Usos: 2x desc. curto | Distância: 7m"
        }
      ],
      "desc": "Sua essência agora cobre suas pernas, podendo pular para uma distância de até 5 metros para qualquer direção (Pode ser usada como uma reação)."
    },
    {
      "nivel": 3,
      "nome": "ESFERAS ETÉREAS",
      "tipo": "ativo",
      "sourceTitle": "ESFERAS ETÉREAS [1 VEZ POR DESCANSO LONGO, ESSÊNCIA: 6 DIAS]",
      "usos": "1 VEZ POR DESCANSO LONGO, ESSÊNCIA: 6 DIAS",
      "evolucoes": [
        {
          "nivel": 3,
          "desc": "Essência: 6 dias | Dano/esfera: 1d8 + mod int | Esferas/turno: 2"
        },
        {
          "nivel": 10,
          "desc": "Essência: 9 dias | Dano/esfera: 3d8 + mod int | Esferas/turno: 3"
        }
      ],
      "desc": "Sua força vital começa a oscilar ao redor de seu corpo, como se estivesse o deixando, para criar a sua volta seis esferas prateadas do tamanho de um punho fechado. Cada uma delas causa 1d8+mod de inteligência de dano e caso entrem em contato direto com o corpo de seu inimigo o mesmo sofrerá fraturas sérias no local atingido. Cada esfera só pode acertar um único alvo e este tem que estar a uma distância de até 20 metros do usuário. Pode utilizar até duas esferas no mesmo turno."
    },
    {
      "nivel": 3,
      "nome": "DEGRADAÇÃO",
      "tipo": "ativo",
      "sourceTitle": "DEGRADAÇÃO [2 VEZES POR DESCANSO LONGO, ESSÊNCIA: 6 DIAS]",
      "usos": "2 VEZES POR DESCANSO LONGO, ESSÊNCIA: 6 DIAS",
      "desc": "O usuário toca uma superfície com a ponta de seus dedos, uma fina névoa a engloba corroendo sua estrutura, a degradando até se esfarelar. Seja metal comum, pedra ou terra. O raio de alcance é de 5 metros."
    },
    {
      "nivel": 4,
      "nome": "RESTAURAÇÃO",
      "tipo": "ativo",
      "sourceTitle": "RESTAURAÇÃO [1 VEZ POR DESCANSO CURTO, ESSÊNCIA: 2 SEMANAS]",
      "usos": "1 VEZ POR DESCANSO CURTO, ESSÊNCIA: 2 SEMANAS",
      "evolucoes": [
        {
          "nivel": 4,
          "desc": "Usos: 1x desc. curto | Cura: 3d6 + mod int"
        },
        {
          "nivel": 10,
          "desc": "Usos: 2x desc. curto | Cura: 4d6 + mod int"
        }
      ],
      "desc": "O manipulador gasta uma parcela de sua força vital para acelerar os processos naturais de cura de seu corpo. A cura recebida é de 3d6+mod de inteligência. Caso esteja em contato com outra pessoa, adicione uma 1 semana para curá-la na metade do valor total."
    },
    {
      "nivel": 4,
      "nome": "CRÍTICO APRIMORADO",
      "tipo": "passiva",
      "sourceTitle": "CRÍTICO APRIMORADO",
      "desc": "19 no dado = acerto crítico."
    },
    {
      "nivel": 6,
      "nome": "PALMAS LEVES",
      "tipo": "ativo",
      "sourceTitle": "PALMAS LEVES [1 VEZ POR DESCANSO CURTO, ESSÊNCIA: 1 MÊS]",
      "usos": "1 VEZ POR DESCANSO CURTO, ESSÊNCIA: 1 MÊS",
      "desc": "O manipulador inspira profundamente, deixando sua essência cobrir suas mãos e estas assumindo um tom azulado. Neste momento ele desfere quatro ataques consecutivos num único alvo, causando mais dano a cada golpe. Quando atingir o inimigo pela quarta vez o mesmo será empurrado para uma distância de 5 metros do jogador e perderá a consciência por 1 turno. Os ataques do manipulador causam 1d4+mod inteligência, 1d6+mod inteligência, 1d8+mod inteligência e 1d12+mod inteligência de dano respectivamente."
    },
    {
      "nivel": 7,
      "nome": "FURTO E RESTRIÇÃO",
      "tipo": "ativo",
      "sourceTitle": "FURTO E RESTRIÇÃO [1 VEZ POR SEMANA, ESSÊNCIA: 9 DIAS]",
      "usos": "1 VEZ POR SEMANA, ESSÊNCIA: 9 DIAS",
      "desc": "O manipulador dispara uma massa de essência com 4 metros de comprimento à sua frente. Ela atravessará os corpos de suas vítimas, sem deixar danos aparentes. Contudo, a mesma terá roubado uma parcela da força vital dos atingidos (o equivalente a 3 meses). A perda abrupta os deixará sem equilíbrio e sem conseguir reunir qualquer energia mágica por 2 turnos. (A distância percorrida é de 8 metros)."
    },
    {
      "nivel": 8,
      "nome": "EXPLORAÇÃO DO TIRANO",
      "tipo": "ativo",
      "sourceTitle": "EXPLORAÇÃO DO TIRANO [2 VEZES POR DESCANSO CURTO, ESSÊNCIA: 4 DIAS]",
      "usos": "2 VEZES POR DESCANSO CURTO, ESSÊNCIA: 4 DIAS",
      "desc": "Realize ataques certeiros naqueles que tiveram suas forças vitais roubadas e cause 2d6 de dano adicional em qualquer habilidade. Os ataques certeiros só poderão ser utilizados em suas ações."
    },
    {
      "nivel": 9,
      "nome": "DETECÇÃO",
      "tipo": "ativo",
      "sourceTitle": "DETECÇÃO [1 VEZ POR DESCANSO LONGO, ESSÊNCIA: 5 DIAS, 2 TURNOS]",
      "usos": "1 VEZ POR DESCANSO LONGO, ESSÊNCIA: 5 DIAS, 2 TURNOS",
      "desc": "A partir de seus pés uma névoa esbranquiçada se espalha pelo solo em uma circunferência de 12 metros. O manipulador tem plena consciência de qualquer forma de vida que esteja nesta área ou que venha a entrar."
    },
    {
      "nivel": 9,
      "nome": "ESSENCE REAVER",
      "tipo": "ativo",
      "sourceTitle": "ESSENCE REAVER [1 VEZ POR DESCANSO LONGO, 3 TURNOS]",
      "usos": "1 VEZ POR DESCANSO LONGO, 3 TURNOS",
      "desc": "O manipulador consegue imitar a forma de até 3 corpos de tamanho humano com sua essência, em formato de névoa cinza. Entretanto, apenas a forma, ela se dissipa com apenas um golpe."
    },
    {
      "nivel": 11,
      "nome": "PERFURAÇÃO SEQUENCIAL",
      "tipo": "ativo",
      "sourceTitle": "PERFURAÇÃO SEQUENCIAL [2 VEZES POR DESCANSO CURTO, ESSÊNCIA: 10 DIAS]",
      "usos": "2 VEZES POR DESCANSO CURTO, ESSÊNCIA: 10 DIAS",
      "desc": "Concentrando sua essência em seus punhos ou em sua arma, o manipulador dispara uma rajada concentrada de sua essência em linha reta, atravessando aqueles que estiverem no caminho. Cause 7d6+mod de inteligência de dano no primeiro alvo atingido e depois reduza um dado para cada pessoa que for acertada na sequência. A distância percorrida é de 12 metros. Caso seja um ataque crítico, não cause dano adicional que um crítico normalmente daria, mas ignore a defesa do alvo."
    },
    {
      "nivel": 13,
      "nome": "INVERSÃO",
      "tipo": "ativo",
      "sourceTitle": "INVERSÃO [1 VEZ POR DESCANSO CURTO, ESSÊNCIA: 2 DIAS]",
      "usos": "1 VEZ POR DESCANSO CURTO, ESSÊNCIA: 2 DIAS",
      "desc": "Ao atingir um inimigo com qualquer ataque, uma pequena linha feita de névoa conectará ambos. Quando o manipulador fechar seus punhos com força cada um será puxado para a direção do outro, trocando assim de lugares."
    },
    {
      "nivel": 14,
      "nome": "IMOBILIZAÇÃO DO SOLO",
      "tipo": "ativo",
      "sourceTitle": "IMOBILIZAÇÃO DO SOLO [1 VEZ POR DESCANSO CURTO, ESSÊNCIA: 7 DIAS]",
      "usos": "1 VEZ POR DESCANSO CURTO, ESSÊNCIA: 7 DIAS",
      "desc": "O manipulador propaga sua essência por debaixo do solo, em um raio de 10 metros. Ao tocar o chão com uma das mãos, ou uma de suas armas, sua essência se condensa, tornando-se mais resistente que o aço e assumindo a forma de correntes. Prendendo assim os tornozelos de todos os inimigos nessa área e causando 3d6+mod de inteligência por turno devido a pressão do aperto. A cada turno, os alvos atingidos giram um dado para tentar se soltar (dificuldade 15)."
    },
    {
      "nivel": 17,
      "nome": "PROTEÇÃO IMPERFEITA",
      "tipo": "ativo",
      "sourceTitle": "PROTEÇÃO IMPERFEITA [1 VEZ POR SEMANA, ESSÊNCIA: 6 MESES]",
      "usos": "1 VEZ POR SEMANA, ESSÊNCIA: 6 MESES",
      "desc": "Tendo o manipulador como centro, uma barreira composta por sua essência em formato oval, é envolvida a até 1m de distância dele. Qualquer arma que a atravessar, que seja de raridade épica ou inferior, se reduzirá a pó, se alguma região do corpo de seu inimigo entrar em contato direto com ela seu oponente será arremessado para 10m de distância, recebendo 10d6+mod de inteligência de dano. Contudo, essa barreira absorverá apenas metade do dano destinado ao manipulador, o dispersando no solo ou no ar. A barreira dura 4 turnos."
    },
    {
      "nivel": 19,
      "nome": "GANÂNCIA DA VIDA",
      "tipo": "ativo",
      "sourceTitle": "GANÂNCIA DA VIDA [2 VEZES POR SEMANA, ESSÊNCIA: 2 MESES]",
      "usos": "2 VEZES POR SEMANA, ESSÊNCIA: 2 MESES",
      "desc": "Disperse até 2 meses de sua vida para cada alvo em sua volta (área igual a 5m). Estes alvos ficarão marcados pela sua essência até o fim do combate. Apesar de ter disperso sua essência nos seus inimigos, ela ainda é sua, portanto, o jogador poderá \"pegar\" ela de volta. O jogador consegue puxar os alvos marcados para sua frente, independentemente de sua distância, causando 5d12+mod inteligência de dano pelo puxão. Pode puxar até 1 alvo por vez e após puxar o mesmo alvo duas vezes, a marcação irá se desfazer."
    },
    {
      "nivel": 20,
      "nome": "RÉPLICA",
      "tipo": "ativo",
      "sourceTitle": "RÉPLICA [1 VEZ POR MÊS, ESSÊNCIA: 3 ANOS]",
      "usos": "1 VEZ POR MÊS, ESSÊNCIA: 3 ANOS",
      "desc": "O manipulador gritará de dor quando uma grande quantidade de força vital deixar seu corpo, ela se espalhará pelo chão a sua volta e poderá tomar a forma de uma pessoa com quem tenha sido muito próximo, a ponto de entender como pensa, ou virará o próprio manipulador. Esta cópia terá consciência própria e pode imitar outras pessoas, apenas o tanto que o usuário conhecia a mente do outro, e será um ser de nível 10. Essa nova forma durará 1 semana antes de se desvanecer no solo e ar."
    },
    {
      "nivel": 5,
      "nome": "DESENVOLTURA",
      "tipo": "ativo",
      "sourceTitle": "DESENVOLTURA [2 VEZES POR DESCANSO CURTO, ESSÊNCIA: 3 DIAS, 2 TURNOS]",
      "usos": "2 VEZES POR DESCANSO CURTO, ESSÊNCIA: 3 DIAS, 2 TURNOS",
      "subclasse": "Combustão",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Dano ao atacante: 4d4 fogo (2 turnos) | Dano nos golpes: +2d6 incendiário"
        },
        {
          "nivel": 8,
          "desc": "Dano ao atacante: 6d4 fogo (2 turnos) | Dano nos golpes: +2d6 incendiário"
        }
      ],
      "desc": "Utilizando de sua força vital o manipulador de essência se reveste de uma fina camada de névoa. Para qualquer pessoa que o observar neste momento ele parecerá um pouco mais jovem, forte e ágil, sua pele resplandecerá sob a incidência de qualquer luz. Contudo, ele estará queimando. Caso alguém o ataque neste estado, a pessoa em questão se incendiará, recebendo 4d4 de dano de fogo por 2 turnos, e qualquer ataque desferido pelo manipulador causará 2d6 adicional como dano de fogo na região atingida."
    },
    {
      "nivel": 5,
      "nome": "MARCAS DA COMBUSTÃO",
      "tipo": "ativo",
      "sourceTitle": "MARCAS DA COMBUSTÃO [1 VEZ POR DESCANSO CURTO, ESSÊNCIA: 8 DIAS]",
      "usos": "1 VEZ POR DESCANSO CURTO, ESSÊNCIA: 8 DIAS",
      "subclasse": "Combustão",
      "desc": "Quando seu punho é imbuído pela névoa esbranquiçada seus golpes geralmente deixam marcas de redemoinho onde tocam, mas não são muito visíveis, por isso a maioria das pessoas não as nota, não que elas saibam alguma coisa a respeito disso para começar. Contudo, colocando ainda mais energia que o normal as marcas ficam claramente visíveis, não importa a superfície, e caso seja orgânica com o tempo ela virará um cicatriz não muito agradável. Quem for marcado receberá 2d6 de dano adicional por qualquer ataque desferido pelo manipulador de essência."
    },
    {
      "nivel": 8,
      "nome": "RELES MORTAIS",
      "tipo": "ativo",
      "sourceTitle": "RELES MORTAIS [1 VEZ POR DESCANSO LONGO, ESSÊNCIA: 2 SEMANAS]",
      "usos": "1 VEZ POR DESCANSO LONGO, ESSÊNCIA: 2 SEMANAS",
      "subclasse": "Combustão",
      "desc": "O manipulador fecha seu punho e uma pessoa a sua escolha que possuir a marca é tomada por chamas alaranjadas com tons de branco, causando 4d6+mod de inteligência de dano por 2 turnos. Caso o alvo não morra no processo seu corpo sofre queimaduras de 2° grau."
    },
    {
      "nivel": 14,
      "nome": "ATO FINAL",
      "tipo": "ativo",
      "sourceTitle": "ATO FINAL [ESSÊNCIA: TUDO]",
      "usos": "ESSÊNCIA: TUDO",
      "subclasse": "Combustão",
      "desc": "Milésimos de segundos antes de morrer o manipulador de essência perderá todo e qualquer controle sobre suas habilidades. Tendo a si mesmo como epicentro, uma forte explosão irrompe dele, englobando tudo em uma área de 100 metros, causando 4d10+mod de inteligência de dano em todos os que estiverem dentro do raio da explosão. E explodindo, assim como ele, qualquer que ele tenha marcado em vida, os levando junto para a morte."
    },
    {
      "nivel": 5,
      "nome": "FIOS SOLTOS",
      "tipo": "ativo",
      "sourceTitle": "FIOS SOLTOS [2 VEZES POR DESCANSO CURTO, ESSÊNCIA: 8 DIAS]",
      "usos": "2 VEZES POR DESCANSO CURTO, ESSÊNCIA: 8 DIAS",
      "subclasse": "Titereiro",
      "desc": "O manipulador de essência consegue agora criar pequenos fios da espessura de uma agulha compostos por sua névoa. Caso um deles toque alguma criatura viva a mesma não poderá realizar nenhuma ação hostil contra o usuário por 3 turnos. Os fios contam como um ataque, mas não causam danos."
    },
    {
      "nivel": 5,
      "nome": "MARIONETE",
      "tipo": "ativo",
      "sourceTitle": "MARIONETE [1 VEZ POR DESCANSO LONGO, ESSÊNCIA: 1 MÊS]",
      "usos": "1 VEZ POR DESCANSO LONGO, ESSÊNCIA: 1 MÊS",
      "subclasse": "Titereiro",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Essência: 1 mês | Duração: 4 dias | Alvos: 1"
        },
        {
          "nivel": 8,
          "desc": "Essência: 3 meses | Duração: 9 dias | Alvos: 2 (se nível igual ou inferior)"
        }
      ],
      "desc": "Caso alguém tenha sido pego em um de seus fios o manipulador poderá controlá-lo por 4 dias, usando-o da forma que mais achar apropriado. Porém, caso a vítima for de nível maior que o seu, adicione -1 em qualquer teste que você realizar para cada nível a mais que ela tiver sobre você. A ligação poderá ser quebrada caso o manipulador morra ou perca a consciência, ou a outra parte tire um crítico natural em um teste de resistência."
    },
    {
      "nivel": 8,
      "nome": "DESESPERO",
      "tipo": "passiva",
      "sourceTitle": "DESESPERO",
      "subclasse": "Titereiro",
      "desc": "Caso uma de suas marionetes falhe em romper a conexão, uma grande quantidade de terror será imbuída na vítima, por ela ir contra as ordens de seu mestre. Adicione +1 de acerto em qualquer ação que você realize sobre ela após isso por 2 turnos."
    },
    {
      "nivel": 14,
      "nome": "PERDA VITAL",
      "tipo": "ativo",
      "sourceTitle": "PERDA VITAL [ESSÊNCIA: 1 ANO]",
      "usos": "ESSÊNCIA: 1 ANO",
      "subclasse": "Titereiro",
      "desc": "Caso o manipulador de essência não quebre a conexão com as vítimas por livre e espontânea vontade, ou elas não se libertem naturalmente, as consciências delas se tornarão nada mais do que retalhos do que um dia já foram, se tornando seres que obedecem apenas a ordens básicas ou médias (caso o nível delas seja maior que 12). Porém, quando isso ocorre uma grande quantidade vital delas se desvanece e elas perdem automaticamente 10 níveis, não tendo mais o poder que tinham no passado. É impossível subir de nível depois disso, mesmo após a morte do manipulador de essência. Ele gasta 10 dias de sua força vital para controlar cada uma de suas \"novas marionetes\" separadamente."
    }
  ],
  "invocador-funereo": [
    {
      "nivel": 1,
      "nome": "ESPECTROS DA NOITE",
      "tipo": "ativo",
      "sourceTitle": "ESPECTROS DA NOITE [1 INVOCAÇÃO POR DESCANSO LONGO]",
      "usos": "1 INVOCAÇÃO POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "Invocações: 1 por Descanso longo"
        },
        {
          "nivel": 5,
          "desc": "Invocações: 2 por Descanso longo"
        },
        {
          "nivel": 15,
          "desc": "Invocações: 3 por Descanso longo"
        },
        {
          "nivel": 20,
          "desc": "Invocações: 4 por Descanso longo"
        }
      ],
      "desc": "Os braços do Invocador são compostos por diversos sinais sombrios, que em sua totalidade compõem parte da sinfonia funérea. A sinfonia permite que o invocador consiga invocar criaturas de um mundo desconhecido, e todas se assemelham com uma sombra ambulante e palpável. Cada sombra é controlada TOTALMENTE pelo jogador e possui sua própria peculiaridade, assim como habilidades próprias. Cada espectro da noite é uma criatura individual, portanto, não é possível invocar mais de uma criatura do mesmo tipo (2 ghasts, por exemplo). Todas as criaturas duram até 4 horas ou até o invocador desfazê-las."
    },
    {
      "nivel": 1,
      "nome": "GHAST",
      "tipo": "passiva",
      "sourceTitle": "[INVOCAÇÃO: GHAST]",
      "evolucoes": [
        {
          "nivel": 1,
          "desc": "HP: 12 | CA: — | Ao morrer (dano no alvo): 2d8 | Energia Funérea (dano/ricochete): 1d4 / —"
        },
        {
          "nivel": 4,
          "desc": "HP: 15 HP | CA: 11 CA | Ao morrer (dano no alvo): 3d8 | Energia Funérea (dano/ricochete): 2d4 / 1d6"
        },
        {
          "nivel": 6,
          "desc": "HP: 19 HP | CA: 12 CA | Ao morrer (dano no alvo): 4d8 | Energia Funérea (dano/ricochete): 3d4 / 1d8"
        },
        {
          "nivel": 9,
          "desc": "HP: 22 HP | CA: 13 CA | Ao morrer (dano no alvo): 5d8 | Energia Funérea (dano/ricochete): 4d4 / 1d10"
        },
        {
          "nivel": 12,
          "desc": "HP: 24 HP | CA: — | Ao morrer (dano no alvo): 6d8 | Energia Funérea (dano/ricochete): 5d4 / 1d12"
        },
        {
          "nivel": 16,
          "desc": "HP: 30 HP | CA: — | Ao morrer (dano no alvo): 10d8 | Energia Funérea (dano/ricochete): 6d4 / 2d12"
        }
      ],
      "desc": "Ao juntar suas duas mãos, todos os sinais brilharão em roxo, e em seguida uma aura sombria surge ao seu lado, formando lentamente uma criatura no formato de um corvo. Ele possui força o suficiente para segurar o invocador no ar e fazer planar por aproximadamente 10 segundos. Tal criatura possui exatos 12 pontos de vida, 10 de CA, uma ação completa e nenhum atributo em especial. Apesar de ser uma invocação, ela consegue se comunicar. Seus ataques normais contra seus alvos são \"bicadas\" e causarão 2 de dano mágico. Ao morrer, o corvo irá se explodir em diversos fragmentos elétricos que vão em direção do inimigo que o derrotou, causando 2d8 de dano mágico. Além disso, ele possui uma habilidade única, chamada de ENERGIA FUNÉREA."
    },
    {
      "nivel": 1,
      "nome": "[GHAST] ENERGIA FUNÉREA",
      "tipo": "ativo",
      "sourceTitle": "[GHAST] ENERGIA FUNÉREA [1 VEZ POR TURNO]",
      "usos": "1 VEZ POR TURNO",
      "desc": "O Ghast dispara uma esfera negra em um alvo, que ricocheteia para o alvo mais próximo (ou volta ao mesmo alvo se não houver outro). Evolui conforme a tabela acima."
    },
    {
      "nivel": 2,
      "nome": "MALDIÇÃO DOS SINAIS",
      "tipo": "passiva",
      "sourceTitle": "MALDIÇÃO DOS SINAIS",
      "evolucoes": [
        {
          "nivel": 2,
          "desc": "HP permanente: +8 | Sinais: Braço"
        },
        {
          "nivel": 10,
          "desc": "HP permanente: +10 | Sinais: Pernas e pés"
        },
        {
          "nivel": 15,
          "desc": "HP permanente: +12 | Sinais: Pescoço até olhos"
        },
        {
          "nivel": 20,
          "desc": "HP permanente: +20, +3 em todos os atributos | Sinais: Corpo completo"
        }
      ],
      "desc": "Devido ao poder excessivo dos sinais, o invocador possui menos tempo de vida que os demais. No entanto, enquanto estiver vivo, sua resistência consegue se superar da maioria das criaturas. Receba 8 de vida permanente."
    },
    {
      "nivel": 2,
      "nome": "USO DE SINAIS",
      "tipo": "passiva",
      "sourceTitle": "USO DE SINAIS",
      "desc": "O brilho dos sinais está mais forte. Agora, quando utilizar uma habilidade funérea, cure-se no valor de 1d4+mod constituição. Habilidades de invocação e das invocações contam."
    },
    {
      "nivel": 3,
      "nome": "AVANÇO DA MORTE",
      "tipo": "ativo",
      "sourceTitle": "AVANÇO DA MORTE [2 VEZES POR DESCANSO LONGO]",
      "usos": "2 VEZES POR DESCANSO LONGO",
      "evolucoes": [
        {
          "nivel": 3,
          "desc": "Usos: 2x desc. longo | Dano adicional: 1d8 + mod cons | Extra: —"
        },
        {
          "nivel": 5,
          "desc": "Usos: 3x desc. longo | Dano adicional: 2d8 + mod cons | Extra: —"
        },
        {
          "nivel": 8,
          "desc": "Usos: 3x desc. longo | Dano adicional: 3d8 + mod cons | Extra: Transpassa +1 alvo. Invocação espectral ataca o alvo"
        },
        {
          "nivel": 11,
          "desc": "Usos: 4x desc. longo | Dano adicional: 4d8 + mod cons | Extra: Invocação fantasma: 4d8 mágico por acerto"
        },
        {
          "nivel": 15,
          "desc": "Usos: 4x desc. longo | Dano adicional: 5d8 + mod cons | Extra: Invocações: 5d8 mágico"
        },
        {
          "nivel": 18,
          "desc": "Usos: 4x desc. longo | Dano adicional: 7d8 + mod cons | Extra: Invocações: 7d8 mágico"
        }
      ],
      "desc": "Os sinais presentes no corpo do invocador se carregam de energia, e em seguida o mesmo realiza um avanço transpassando espectralmente o alvo escolhido, causando 1d8+mod constituição de dano físico adicional. Inimigos atingidos por este avanço ficarão SEM ESPERANÇA (usado futuramente)."
    },
    {
      "nivel": 4,
      "nome": "NIGHTMARE",
      "tipo": "passiva",
      "sourceTitle": "[INVOCAÇÃO] NIGHTMARE",
      "evolucoes": [
        {
          "nivel": 4,
          "desc": "HP: 30 | CA extra: — | Dano garras/dentes: 2d4 | Lâmina Sombria (usos/dano): 1x/combate, 3d6"
        },
        {
          "nivel": 8,
          "desc": "HP: 40 | CA extra: 9 | Dano garras/dentes: 3d4 | Lâmina Sombria (usos/dano): 2x/combate, 4d6"
        },
        {
          "nivel": 14,
          "desc": "HP: 48 | CA extra: 10 | Dano garras/dentes: 4d4 | Lâmina Sombria (usos/dano): 2x/combate, 6d6"
        },
        {
          "nivel": 17,
          "desc": "HP: 52 | CA extra: 11 | Dano garras/dentes: 7d4 | Lâmina Sombria (usos/dano): 2x/combate, 8d6"
        }
      ],
      "desc": "Agora, ao abrir suas mãos para cima de sua cabeça, fará com que seus braços exalem o poder funéreo, corrompendo o chão ao seu lado pela energia negativa do outro mundo. No solo corrompido, será gerado lentamente uma pantera sombria de olhos roxos, nomeada de NIGHTMARE. A mesma é capaz de compreender as suas ordens, mas não de se comunicar. A forma física deste ser é diferente, ela é capaz de alterar partes de seu corpo para formatos adaptáveis ao cenário. Uma vez invocada num combate, fará com que a ordem de atacantes mude, devido a sua grande mobilidade natural. Agora a pantera sempre será a primeira a atacar por turno. Esta criatura possui exatos 30 pontos de vida e 8 de classe de armadura, e seus ataques físicos consistem entre mordidas e ataques com suas garras afiadas, sendo que ambas causam 2d4 de dano físico. Enquanto estiver viva, ela será capaz de utilizar sua habilidade LÂMINA SOMBRIA."
    },
    {
      "nivel": 4,
      "nome": "[NIGHTMARE] LÂMINA SOMBRIA",
      "tipo": "ativo",
      "sourceTitle": "[NIGHTMARE] LÂMINA SOMBRIA [1 VEZ POR COMBATE]",
      "usos": "1 VEZ POR COMBATE",
      "desc": "Sua cauda transmuta-se numa lâmina gigantesca, atacando o alvo mais próximo lateralmente, causando 3d6 de dano físico e deixando o alvo sangrando por 3 turnos. Evolução de dano na tabela acima."
    },
    {
      "nivel": 4,
      "nome": "[NIGHTMARE] DESVIO SOMBRIO",
      "tipo": "ativo",
      "sourceTitle": "[NIGHTMARE] DESVIO SOMBRIO [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "desc": "Seus sinais brilham intensamente, e em seguida a alma e corpo da pantera juntam-se aos seus sinais, fazendo com que seu corpo se dissipe da localização atual para poucos passos a uma direção escolhida, desviando de um ataque inimigo iminente. Depois do desvio, o corpo e alma da sombra são reconstruídos, mas com vida máxima."
    },
    {
      "nivel": 5,
      "nome": "SOBREPUJAR",
      "tipo": "ativo",
      "sourceTitle": "SOBREPUJAR [2 VEZES POR DESCANSO LONGO, SOMENTE APÓS UM ACERTO FÍSICO]",
      "usos": "2 VEZES POR DESCANSO LONGO, SOMENTE APÓS UM ACERTO FÍSICO",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Dano da pá: 1d4 + mod cons | Cura: 3d4 + mod cons | Extra: —"
        },
        {
          "nivel": 9,
          "desc": "Dano da pá: 2d4 + mod cons | Cura: 6d4 + mod cons | Extra: —"
        },
        {
          "nivel": 12,
          "desc": "Dano da pá: 3d4 + mod cons | Cura: 12d4 + mod cons | Extra: —"
        },
        {
          "nivel": 17,
          "desc": "Dano da pá: 4d4 + mod cons | Cura: 18d4 + mod cons | Extra: Atordoa 1 turno"
        },
        {
          "nivel": 20,
          "desc": "Dano da pá: 5d4 + mod cons | Cura: 24d4 + mod cons | Extra: 3x desc. longo. Atordoa"
        }
      ],
      "desc": "Após um certo de ataque, seus sinais queimam sua pele, e em seguida é invocado em sua outra mão uma pá dos ritos funéreos. Após a invocação, é realizada uma investida no inimigo com a ponta da ferramenta invocada. No impacto, causará 1d4+mod constituição de dano físico e o alvo sentirá sua alma saindo levemente de seu corpo, com uma leve náusea no processo. Cure-se em 3d4+mod constituição após este ataque. Não consome uma ação ao usar."
    },
    {
      "nivel": 7,
      "nome": "AJUDA PROGRESSIVA",
      "tipo": "ativo",
      "sourceTitle": "AJUDA PROGRESSIVA [2 VEZES POR DESCANSO CURTO]",
      "usos": "2 VEZES POR DESCANSO CURTO",
      "desc": "O Invocador pode aproveitar a ação de suas invocações para realizar ataques que normalmente falhariam, trocando precisão entre mestre e criatura."
    },
    {
      "nivel": 7,
      "nome": "DUALITY",
      "tipo": "passiva",
      "sourceTitle": "[INVOCAÇÃO] DUALITY",
      "desc": "Os sinais de seu torso queimam em vermelho, e em seguida dois seres humanoides surgem de uma fumaça vermelha provinda dos sinais. Estas criaturas possuem aproximadamente um metro de altura, pele vermelha e carregam consigo lanças grandes e afiadas, que causam 1d8 de dano físico. As duas invocações possuem 20 pontos de vida e a habilidade é conjurada pelo preço de 1 invocação. Os seres DUALITY não possuem classe de armadura, tampouco habilidades significativas."
    },
    {
      "nivel": 8,
      "nome": "ARMADURA DAS TREVAS",
      "tipo": "passiva",
      "sourceTitle": "ARMADURA DAS TREVAS",
      "desc": "O invocador aumenta a classe de armadura de acordo com o número de criaturas invocadas atualmente."
    },
    {
      "nivel": 9,
      "nome": "ENTERRADA FINALIZADORA",
      "tipo": "passiva",
      "sourceTitle": "ENTERRADA FINALIZADORA",
      "desc": "Sempre que um aliado ou invocação estiver prestes a eliminar um inimigo, o Invocador se teleporta sobre o alvo e finaliza com a pá funérea. No nível 13: cada finalização concede 1 FRAGMENTO DA VIDA (recurso para habilidades especiais, dissipado ao fim do combate)."
    },
    {
      "nivel": 10,
      "nome": "MALDIÇÃO DOS DESESPERADOS",
      "tipo": "passiva",
      "sourceTitle": "MALDIÇÃO DOS DESESPERADOS",
      "desc": "Quando o jogador olhar de relance uma criatura com o efeito de \"Sem esperança\", seus sinais ficarão intensificados e uma zona de energia roxa emergirá do chão, explodindo a área que o alvo se encontra, causando 2d12 de dano mágico. Não possui limites para detecção de seres sem esperança ou limite para o alcance da explosão. Somente uma ativação por criatura/combate."
    },
    {
      "nivel": 13,
      "nome": "ABOVE ALL",
      "tipo": "ativo",
      "sourceTitle": "[INVOCAÇÃO] ABOVE ALL [CUSTA 2 INVOCAÇÕES JÁ ATIVAS]",
      "usos": "CUSTA 2 INVOCAÇÕES JÁ ATIVAS",
      "evolucoes": [
        {
          "nivel": 13,
          "desc": "HP: 100 | CA: 15 | Dano Soco: 4d10 | Dano Heaven on a Landside: 10d20"
        },
        {
          "nivel": 18,
          "desc": "HP: 140 | CA: 17 | Dano Soco: 6d10 | Dano Heaven on a Landside: 15d20"
        }
      ],
      "desc": "Ao estalar seus dedos, um meteoro sombrio cairá dos céus ao chão (num raio 10x10), causando 15 de dano a todos os alvos no impacto. Aos poucos, uma criatura surgirá dos destroços no epicentro da queda do meteoro. É uma criatura denominada ABOVE ALL, possui 3 metros de altura e é um golem ciclope da escuridão. Tal criatura possui exatamente 100 pontos de vida, 15 de classe de armadura e uma vez morto, fará com que o invocador enfraqueça. Devido a fraqueza, o invocador receberá o dobro de dano de todas as fontes até o fim do dia. As habilidades que o ABOVE ALL possui são: SOCO e HEAVEN ON A LANDSLIDE."
    },
    {
      "nivel": 13,
      "nome": "[ABOVE ALL] SOCO",
      "tipo": "passiva",
      "sourceTitle": "[ABOVE ALL] SOCO",
      "desc": "ABOVE ALL pula em direção a um alvo e realiza um super-soco, causando 4d10 de dano físico."
    },
    {
      "nivel": 13,
      "nome": "[ABOVE ALL] HEAVEN ON A LANDSLIDE",
      "tipo": "ativo",
      "sourceTitle": "[ABOVE ALL] HEAVEN ON A LANDSLIDE [1 VEZ POR COMBATE]",
      "usos": "1 VEZ POR COMBATE",
      "desc": "ABOVE ALL solta de seu único olho um raio energético em linha reta, atingindo todos os inimigos que encostarem neste poder. Esta habilidade causa 10d20 de dano mágico."
    },
    {
      "nivel": 19,
      "nome": "DAMA DA MORTE",
      "tipo": "ativo",
      "sourceTitle": "[INVOCAÇÃO] DAMA DA MORTE [CUSTA 3 INVOCAÇÕES ATIVAS]",
      "usos": "CUSTA 3 INVOCAÇÕES ATIVAS",
      "desc": "Os olhos do Invocador choram lágrimas negras enquanto a enigmática Dama da Morte surge em suas costas, com longos cabelos brancos, vestido majestoso, chapéu imponente. Ela se abraça ao pescoço do Invocador. Não possui vida ou CA própria, essa invocação dura até inconsciência do Invocador ou 4 horas. É autônoma, com mente própria. Enquanto viva, possui as habilidades: ABRAÇO DA MORTE e BEIJO DA MORTE."
    },
    {
      "nivel": 19,
      "nome": "[DAMA DA MORTE] ABRAÇO DA MORTE [PASSIVA]",
      "tipo": "passiva",
      "sourceTitle": "[DAMA DA MORTE] ABRAÇO DA MORTE [PASSIVA]",
      "desc": "Enquanto envolvido pelo quente abraço da dama, o invocador causa 1d6 de dano adicional cumulativo por turno em qualquer habilidade ou ataque físico."
    },
    {
      "nivel": 19,
      "nome": "[DAMA DA MORTE] BEIJO DA MORTE",
      "tipo": "ativo",
      "sourceTitle": "[DAMA DA MORTE] BEIJO DA MORTE [1 VEZ POR TURNO]",
      "usos": "1 VEZ POR TURNO",
      "desc": "Enquanto a dama estiver no combate, a mesma sugará a vitalidade de todos aqueles que não estão sendo abraçados, causando 1d8 de dano para todos os inimigos, de forma certeira, e curando seu invocador no valor de 1d4 por alvo acertado."
    },
    {
      "nivel": 20,
      "nome": "HELL ON A LANDSLIDE",
      "tipo": "ativo",
      "sourceTitle": "HELL ON A LANDSLIDE [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "desc": "O jogador consome o poder de todas as criaturas invocadas por ele no combate, sendo envolvido totalmente por sombras, e absorvendo suas características enquanto a transformação durar (dura até o fim do dia). Enquanto estiver no estado de transformação, poderá realizar os ataques de suas criaturas absorvidas, caso deseje. Além disso, por criatura absorvida, o jogador ganha uma ação completa por turno."
    },
    {
      "nivel": 20,
      "nome": "CARACTERÍSTICAS NIGHTMARE",
      "tipo": "passiva",
      "sourceTitle": "CARACTERÍSTICAS NIGHTMARE",
      "desc": "Seja o primeiro a atacar no combate. Além disso, 1 vez por turno, torne-se uma sombra e desvie de uma habilidade inimiga, caso desejar."
    },
    {
      "nivel": 20,
      "nome": "CARACTERÍSTICAS GHAST",
      "tipo": "passiva",
      "sourceTitle": "CARACTERÍSTICAS GHAST",
      "desc": "Ao ficar com metade de sua vida, crie uma zona de energia roxa em sua volta (5x5), causando 6d6 de dano mágico nos seres ao redor. Caso fique com a metade da metade de sua vida, faça o mesmo procedimento, assim sucessivamente."
    },
    {
      "nivel": 20,
      "nome": "CARACTERÍSTICAS DUALITY",
      "tipo": "passiva",
      "sourceTitle": "CARACTERÍSTICAS DUALITY",
      "desc": "Surge uma invocação de seu personagem, possuindo os mesmos atributos e itens (base), porém os usos das habilidades são compartilhadas, assim como dos itens."
    },
    {
      "nivel": 20,
      "nome": "CARACTERÍSTICAS ABOVE ALL",
      "tipo": "passiva",
      "sourceTitle": "CARACTERÍSTICAS ABOVE ALL",
      "desc": "Receba 120 pontos de vida adicionais e 2 de classe de armadura."
    },
    {
      "nivel": 20,
      "nome": "CARACTERÍSTICAS DAMA DA MORTE",
      "tipo": "passiva",
      "sourceTitle": "CARACTERÍSTICAS DAMA DA MORTE",
      "desc": "A dama da noite não é absorvida, mas sim ganha forças e se liberta do abraço com o usuário e vira uma atacante, possuindo 250 pontos de vida, 14 de classe de armadura, além de possuir todas as habilidades convencionais de uma feiticeira nível 20."
    },
    {
      "nivel": 5,
      "nome": "SANGUE FUNÉREO",
      "tipo": "ativo",
      "sourceTitle": "SANGUE FUNÉREO [1 VEZ POR DESCANSO CURTO]",
      "usos": "1 VEZ POR DESCANSO CURTO",
      "subclasse": "Sangue Puro",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Usos: 1x desc. curto | Área: 3x3 | Duração: 2 turnos | Cura/alvo/turno: 1d4"
        },
        {
          "nivel": 8,
          "desc": "Usos: 2x desc. curto | Área: 6x6 | Duração: 2 turnos | Cura/alvo/turno: 1d6"
        },
        {
          "nivel": 14,
          "desc": "Usos: 2x desc. curto | Área: 12x12 | Duração: 3 turnos | Cura/alvo/turno: 1d8"
        }
      ],
      "desc": "Ao mirar em uma área do chão com o apontar de suas mãos, uma zona sanguinolenta sairá do solo, criando mãos escarlates que agarram os pés daqueles que estiverem na área (3x3, alcance igual ao seu campo de visão). Dura 2 turnos. Alvos agarrados não podem mover seus pés até o fim da conjuração. O jogador e suas invocações se curam no valor de 1d4 por turno para cada alvo pego na zona, até o fim da duração."
    },
    {
      "nivel": 8,
      "nome": "PÁ DOS RITOS SANGUINÁRIOS",
      "tipo": "passiva",
      "sourceTitle": "PÁ DOS RITOS SANGUINÁRIOS",
      "subclasse": "Sangue Puro",
      "evolucoes": [
        {
          "nivel": 8,
          "desc": "Dano adicional: 1d8 + mod cons | Cura por acerto: 1d4"
        },
        {
          "nivel": 14,
          "desc": "Dano adicional: 3d8 + mod cons | Cura por acerto: 3d4"
        }
      ],
      "desc": "O Invocador invoca uma pá espectral que paira sobre sua arma até o fim do combate. Causa dano físico adicional e drena sangue para cura."
    },
    {
      "nivel": 14,
      "nome": "REGENERAÇÃO FUNÉREA",
      "tipo": "ativo",
      "sourceTitle": "REGENERAÇÃO FUNÉREA [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Sangue Puro",
      "desc": "O Invocador pode regenerar qualquer membro decepado que possua sinais funéreos gravados. Funciona instantaneamente, inclusive com membros perdidos há anos. Também cura cegueira e problemas ósseos permanentes."
    },
    {
      "nivel": 5,
      "nome": "VANGUARDA FUNÉREA",
      "tipo": "passiva",
      "sourceTitle": "VANGUARDA FUNÉREA",
      "subclasse": "Maldição Intrépida",
      "evolucoes": [
        {
          "nivel": 5,
          "desc": "Defesa por uso: +2 | Limite: 20"
        },
        {
          "nivel": 8,
          "desc": "Defesa por uso: +3 | Limite: 30"
        },
        {
          "nivel": 14,
          "desc": "Defesa por uso: +4 | Limite: 40"
        }
      ],
      "desc": "A sinfonia funérea se enrijece, aumentando sua defesa significativamente. O Invocador e suas criaturas recebem 3 de defesa para cada uso de uma uma habilidade funérea (classe principal), até o limite de 20."
    },
    {
      "nivel": 5,
      "nome": "EXPANSÃO DA FORÇA",
      "tipo": "passiva",
      "sourceTitle": "EXPANSÃO DA FORÇA",
      "subclasse": "Maldição Intrépida",
      "desc": "Para cada ponto em defesa ATUAL, o invocador aumenta sua vida e dano (em qualquer ataque/habilidade) em um. Não conta para as invocações."
    },
    {
      "nivel": 8,
      "nome": "LIMITES ANCESTRAIS",
      "tipo": "ativo",
      "sourceTitle": "LIMITES ANCESTRAIS [1 VEZ POR DESCANSO LONGO]",
      "usos": "1 VEZ POR DESCANSO LONGO",
      "subclasse": "Maldição Intrépida",
      "desc": "A sinfonia bloqueia completamente um ataque crítico (ou um ataque normal, se desejar), sem um pingo de dificuldade. Cause temor no alvo que teve o ataque bloqueado."
    },
    {
      "nivel": 14,
      "nome": "SINFONIA DA AUTORIDADE",
      "tipo": "passiva",
      "sourceTitle": "SINFONIA DA AUTORIDADE",
      "subclasse": "Maldição Intrépida",
      "desc": "Agora seus sinais são como espinhos para seus inimigos. Seus sinais brilham para cada golpe recebido (físico, mágico ou a distância), e lança um raio roxo no alvo que causou o ataque. O mesmo recebe (valor de defesa) de dano físico."
    }
  ]
};

export const SHIKATA_EVOLUCOES_V6 = {
  "guerreiro": {
    "DEFESA": [
      {
        "nivel": 1,
        "desc": "+CA por nível do escudo (1/2/3)"
      },
      {
        "nivel": 11,
        "desc": "Escudos contam como armas. Peq/méd/grd dão +10/15/20 defesa"
      }
    ],
    "DUELO DE PERTO": [
      {
        "nivel": 1,
        "desc": "+1d4 (2 mãos: +3d4)"
      },
      {
        "nivel": 11,
        "desc": "+2d6 (2 mãos: +5d6)"
      }
    ],
    "ATAQUE CREPÚSCULO": [
      {
        "nivel": 2,
        "desc": "Golpes: 2 golpes em X | Efeito de crítico: Crítico = um novo golpe vertical"
      },
      {
        "nivel": 19,
        "desc": "Golpes: 4 golpes, duplo X | Efeito de crítico: Crítico = um novo golpe vertical"
      }
    ],
    "BRANDIR": [
      {
        "nivel": 2,
        "desc": "Usos: 1x desc. curto | Restrições: Até 5 níveis acima, não colossais, não furtivos"
      },
      {
        "nivel": 6,
        "desc": "Usos: 2x desc. curto | Restrições: Qualquer nível, mas não colossais e furtivos"
      },
      {
        "nivel": 12,
        "desc": "Usos: 3x desc. curto | Restrições: Funciona contra colossais mas não furtivos"
      },
      {
        "nivel": 20,
        "desc": "Usos: 4x desc. curto | Restrições: Funciona contra furtivos."
      }
    ],
    "ADRENALINA": [
      {
        "nivel": 2,
        "desc": "Usos: 1x desc. longo | Extra: Ganha 1 ação completa extra. Toma 2d4 de dano"
      },
      {
        "nivel": 10,
        "desc": "Usos: 2x desc. longo | Extra: Ganha 1 ação completa extra. Toma 3d4 de dano /"
      }
    ],
    "RESPIRAÇÃO DO COMBATE": [
      {
        "nivel": 3,
        "desc": "Valor da cura: Mod constituição"
      },
      {
        "nivel": 5,
        "desc": "Valor da cura: 2 + mod cons"
      },
      {
        "nivel": 9,
        "desc": "Valor da cura: 3 + mod cons"
      },
      {
        "nivel": 13,
        "desc": "Valor da cura: 4 + mod cons"
      },
      {
        "nivel": 20,
        "desc": "Valor da cura: 6+ mod cons."
      }
    ],
    "ESPÍRITO DO ESCUDEIRO": [
      {
        "nivel": 7,
        "desc": "Dano: 1d4 + mod cons | Extra: —"
      },
      {
        "nivel": 12,
        "desc": "Dano: 2d4 + mod cons | Extra: Atordoa alvo 1 turno caso crítico"
      }
    ],
    "ATAQUE GIRATÓRIO": [
      {
        "nivel": 7,
        "desc": "Área: 2x2m | Dano: 4d10 + mod força | Extra: Empurra 1m"
      },
      {
        "nivel": 19,
        "desc": "Área: 3x3m | Dano: 12d8 + mod força | Extra: Empurra e atordoa inimigos por 1 turno"
      }
    ],
    "ATAQUES CONSECUTIVOS": [
      {
        "nivel": 5,
        "desc": "Ataques: 2"
      },
      {
        "nivel": 8,
        "desc": "Ataques: 3"
      },
      {
        "nivel": 14,
        "desc": "Ataques: 4"
      }
    ],
    "SUBLIMAÇÃO": [
      {
        "nivel": 5,
        "desc": "Cura adicional: +1d6"
      },
      {
        "nivel": 8,
        "desc": "Cura adicional: +2d6"
      },
      {
        "nivel": 14,
        "desc": "Cura adicional: +2d8"
      }
    ],
    "CORAÇÃO VALENTE": [
      {
        "nivel": 5,
        "desc": "Extra: Explosão 5x5, dano = total do escudo"
      },
      {
        "nivel": 8,
        "desc": "Extra: +5 defesa por 3 turnos após explosão"
      },
      {
        "nivel": 14,
        "desc": "Extra: +10 defesa pelo resto do combate"
      }
    ]
  },
  "ladino": {
    "ATAQUE FURTIVO": [
      {
        "nivel": 1,
        "desc": "Dano adicional: 1d8 + mod destreza"
      },
      {
        "nivel": 3,
        "desc": "Dano adicional: 2d8 + mod destreza"
      },
      {
        "nivel": 7,
        "desc": "Dano adicional: 4d8 + mod destreza"
      },
      {
        "nivel": 11,
        "desc": "Dano adicional: 5d8 + mod destreza"
      },
      {
        "nivel": 15,
        "desc": "Dano adicional: 6d8 + mod destreza"
      },
      {
        "nivel": 18,
        "desc": "Dano adicional: 7d8 + mod destreza"
      },
      {
        "nivel": 20,
        "desc": "Dano adicional: 8d8 + mod destreza"
      }
    ],
    "PROEZA": [
      {
        "nivel": 1,
        "desc": "Bônus: +1"
      },
      {
        "nivel": 6,
        "desc": "Bônus: +2"
      },
      {
        "nivel": 12,
        "desc": "Bônus: +3"
      }
    ],
    "AVANÇO IMEDIATO": [
      {
        "nivel": 1,
        "desc": "Usos: 1x desc. curto | Dano adicional (mínimo): +25% (mín 2) | Distância: 3m"
      },
      {
        "nivel": 5,
        "desc": "Usos: 1x desc. curto | Dano adicional (mínimo): +50% (mín 4) | Distância: 5m"
      },
      {
        "nivel": 10,
        "desc": "Usos: 2x desc. curto | Dano adicional (mínimo): +75% (mín 8) | Distância: —"
      },
      {
        "nivel": 15,
        "desc": "Usos: 2x desc. curto | Dano adicional (mínimo): +100% (mín 15) | Distância: 10m"
      },
      {
        "nivel": 20,
        "desc": "Usos: 2x desc. curto | Dano adicional (mínimo): +150% (mín 15) | Distância: Infinito (40m fora)"
      }
    ],
    "MOBILIDADE DA ESCAPADA": [
      {
        "nivel": 2,
        "desc": "Usos: 2x desc. curto | Mudanças: Esquiva no solo"
      },
      {
        "nivel": 11,
        "desc": "Usos: 3x desc. curto | Mudanças: Pode avançar em alvo ou até 2x mobilidade"
      },
      {
        "nivel": 17,
        "desc": "Usos: 4x desc. curto | Mudanças: Até 3x mobilidade. Funciona no ar"
      }
    ],
    "CRÍTICO APRIMORADO": [
      {
        "nivel": 4,
        "desc": "Valores de crítico: 18, 19, 20"
      },
      {
        "nivel": 14,
        "desc": "Valores de crítico: 17, 18, 19, 20"
      }
    ],
    "RISCO ALTO": [
      {
        "nivel": 6,
        "desc": "Dados: 3 dados | Base: 1d8 | Condição: Soma ≥ crítico = crítico"
      },
      {
        "nivel": 15,
        "desc": "Dados: 4 dados | Base: 1d10 | Condição: Resultado ≥ 5 = sucesso"
      }
    ],
    "GOLPE PENETRANTE": [
      {
        "nivel": 9,
        "desc": "Efeito: Ignora atributo Defesa"
      },
      {
        "nivel": 12,
        "desc": "Efeito: Anula a cura do alvo até o fim do combate. Feridas não saram por 24h"
      },
      {
        "nivel": 16,
        "desc": "Efeito: Penetra barreiras mágicas, escudos sobrepostos e proteções similares"
      },
      {
        "nivel": 19,
        "desc": "Efeito: Ignora metade da Classe de Armadura (CA) inimiga"
      }
    ],
    "METAMORFOSE": [
      {
        "nivel": 5,
        "desc": "Condição de quebra: Desfaz se atacar ou for atacado"
      },
      {
        "nivel": 14,
        "desc": "Condição de quebra: Só desfaz por toque direto, ataque próprio ou por vontade"
      }
    ]
  },
  "inclemente": {
    "ATAQUES PESADOS": [
      {
        "nivel": 1,
        "desc": "Efeito: Dobra o dano base de suas armas"
      },
      {
        "nivel": 6,
        "desc": "Efeito: Causa dois dados de dano adicional"
      }
    ],
    "DESPERTAR": [
      {
        "nivel": 1,
        "desc": "Gatilho: Falhar em teste de acerto físico"
      },
      {
        "nivel": 10,
        "desc": "Gatilho: Falhar em qualquer tipo de teste"
      }
    ],
    "FÚRIA": [
      {
        "nivel": 1,
        "desc": "Usos: 2x dsc longo | Duração: 2 turnos | Cura/turno: 3d6 | Extra: —"
      },
      {
        "nivel": 5,
        "desc": "Usos: 2x dsc longo | Duração: 3 turnos | Cura/turno: 4d6 | Extra: —"
      },
      {
        "nivel": 8,
        "desc": "Usos: 3x dsc longo | Duração: 3 turnos | Cura/turno: 5d6 | Extra: —"
      },
      {
        "nivel": 14,
        "desc": "Usos: 4x dsc longo | Duração: 4 turnos | Cura/turno: 6d6 | Extra: —"
      },
      {
        "nivel": 18,
        "desc": "Usos: Ilimitado | Duração: 5 turnos | Cura/turno: 6d8 | Extra: IMPARÁVEL enquanto em fúria"
      }
    ],
    "RESILIÊNCIA INQUEBRÁVEL": [
      {
        "nivel": 2,
        "desc": "Defesa: 5"
      },
      {
        "nivel": 5,
        "desc": "Defesa: 10"
      },
      {
        "nivel": 8,
        "desc": "Defesa: 15"
      },
      {
        "nivel": 11,
        "desc": "Defesa: 20"
      }
    ],
    "VARREDURA DA FORÇA": [
      {
        "nivel": 2,
        "desc": "Dano adicional: 2d6 + mod força | Empurrão: 2m | Extra: —"
      },
      {
        "nivel": 7,
        "desc": "Dano adicional: 4d6 + mod força | Empurrão: 4m | Extra: —"
      },
      {
        "nivel": 11,
        "desc": "Dano adicional: 6d8 + mod força | Empurrão: 5m | Extra: Atordoa 1 turno"
      }
    ],
    "A ESSÊNCIA DA FORÇA": [
      {
        "nivel": 1,
        "desc": "Efeito: Destrói madeira, pedra e frágeis"
      },
      {
        "nivel": 10,
        "desc": "Efeito: Destrói até aço"
      },
      {
        "nivel": 16,
        "desc": "Efeito: Olhar aterroriza criaturas inferiores sem teste"
      }
    ],
    "DEMOLIÇÃO": [
      {
        "nivel": 15,
        "desc": "Área: Cone, até 8m | Dano: 4d20 + mod força | Extra: —"
      },
      {
        "nivel": 20,
        "desc": "Área: Cone, até 8m | Dano: 6d20 + mod força | Extra: Atordoa 1 turno"
      }
    ],
    "TROCA NATURAL": [
      {
        "nivel": 5,
        "desc": "Efeito: Cada ponto em Força = 2 HP"
      },
      {
        "nivel": 8,
        "desc": "Efeito: Destreza e Constituição também somam 2 de HP"
      }
    ],
    "ESCUDO DA FORNALHA": [
      {
        "nivel": 5,
        "desc": "Valor: 3d4 + mod força | Duração: 2 turnos | Área explosão: 2x2m | Extra: —"
      },
      {
        "nivel": 8,
        "desc": "Valor: 6d4 + mod força | Duração: 2 turnos | Área explosão: 2x2m | Extra: IMPARÁVEL, +5 defesa, explosão voluntária (2x dano)"
      },
      {
        "nivel": 14,
        "desc": "Valor: 10d4 + mod força | Duração: 3 turnos | Área explosão: 4x4m | Extra: +10 defesa"
      }
    ],
    "O MANÍACO DOS ARREMESSOS": [
      {
        "nivel": 5,
        "desc": "Alvos por turno: 1"
      },
      {
        "nivel": 8,
        "desc": "Alvos por turno: até 2"
      },
      {
        "nivel": 14,
        "desc": "Alvos por turno: até 3"
      }
    ]
  },
  "cacador": {
    "ESPÍRITO DE SOBREVIVÊNCIA": [
      {
        "nivel": 1,
        "desc": "Bônus: +3 | Ambientes: Ambientes selvagens/inexplorados"
      },
      {
        "nivel": 7,
        "desc": "Bônus: +4 | Ambientes: Ambientes selvagens/inexplorados"
      },
      {
        "nivel": 13,
        "desc": "Bônus: +4 | Ambientes: Também regiões exploradas (cidades destruídas, minerações, dungeons)"
      }
    ],
    "CAÇADA": [
      {
        "nivel": 1,
        "desc": "Dano adicional vs. feras: 1d4"
      },
      {
        "nivel": 4,
        "desc": "Dano adicional vs. feras: 2d4"
      },
      {
        "nivel": 9,
        "desc": "Dano adicional vs. feras: 3d4"
      }
    ],
    "CORTE PERFURANTE": [
      {
        "nivel": 2,
        "desc": "Usos: 2x desc. curto | Dano: 2d6 + mod força | Sangramento: 2 turnos"
      },
      {
        "nivel": 6,
        "desc": "Usos: 3x desc. curto | Dano: 4d6 + mod força | Sangramento: 3 turnos"
      },
      {
        "nivel": 10,
        "desc": "Usos: 4x desc. curto | Dano: 6d6 + mod força | Sangramento: 4 turnos"
      },
      {
        "nivel": 14,
        "desc": "Usos: 5x desc. curto | Dano: 8d6 + mod força | Sangramento: 5 turnos"
      },
      {
        "nivel": 18,
        "desc": "Usos: 5x desc. curto | Dano: 10d6 + mod força | Sangramento: Até fim do combate"
      }
    ],
    "INIMIGO FAVORITO": [
      {
        "nivel": 2,
        "desc": "Extra: +2d4 de dano, +2 acerto vs. favorito"
      },
      {
        "nivel": 11,
        "desc": "Extra: +5d4 de dano, Eliminar favorito = +1 ponto de atributo permanente à escolha"
      },
      {
        "nivel": 18,
        "desc": "Extra: +5d8 de dano, Eliminar favorito também aterroriza todos os inimigos em 30m (só funciona em nível inferior)"
      }
    ],
    "ATAQUE SEQUENCIADO": [
      {
        "nivel": 3,
        "desc": "Usos: 3x desc. curto | Extra: —"
      },
      {
        "nivel": 9,
        "desc": "Usos: 4x desc. curto | Extra: Ataques sequenciais causam dano REAL"
      },
      {
        "nivel": 14,
        "desc": "Usos: 5x desc. curto | Extra: Ataques sequenciais são CERTEIROS"
      }
    ],
    "ATENÇÃO DA CAÇADA": [
      {
        "nivel": 5,
        "desc": "Extra: 1 ataque"
      },
      {
        "nivel": 8,
        "desc": "Extra: 2 ataques em inimigos que não agiram"
      }
    ],
    "MARCA DO CAÇADOR": [
      {
        "nivel": 6,
        "desc": "Dano por marca: 1d4 | Limiar: 6 | Dano ao atingir limiar: 2d20"
      },
      {
        "nivel": 15,
        "desc": "Dano por marca: 2d4 | Limiar: 4 | Dano ao atingir limiar: 5d20"
      }
    ],
    "SENTIDOS SOBRENATURAIS": [
      {
        "nivel": 10,
        "desc": "Raio: 8m | Extra: Detecta ocultos/invisíveis"
      },
      {
        "nivel": 15,
        "desc": "Raio: 15m | Extra: —"
      },
      {
        "nivel": 20,
        "desc": "Raio: 30m | Extra: Detecta também seres sobrenaturais"
      }
    ],
    "DEFESA CONTRA SERES DAS PROFUNDEZAS": [
      {
        "nivel": 5,
        "desc": "Defesa: +5 | CA: +2 | Extra: —"
      },
      {
        "nivel": 8,
        "desc": "Defesa: +10 | CA: +2 | Extra: —"
      },
      {
        "nivel": 14,
        "desc": "Defesa: +15 | CA: +2 | Extra: Se no combate só tiver monstros: dobra defesa e CA"
      }
    ]
  },
  "vanguarda": {
    "CORAGEM DE FERRO": [
      {
        "nivel": 1,
        "desc": "Usos: 2x desc. curto | +CA: +1 | Redução (mín): 20% (mín 2) | Duração: 2 turnos"
      },
      {
        "nivel": 3,
        "desc": "Usos: 2x desc. curto | +CA: +2 | Redução (mín): 25% (mín 3) | Duração: 2 turnos"
      },
      {
        "nivel": 7,
        "desc": "Usos: 2x desc. curto | +CA: +2 | Redução (mín): 30% (mín 5) | Duração: 3 turnos"
      },
      {
        "nivel": 10,
        "desc": "Usos: 2x desc. curto | +CA: +2 | Redução (mín): 35% (mín 6) | Duração: 3 turnos"
      },
      {
        "nivel": 13,
        "desc": "Usos: 3x desc. longo | +CA: +3 | Redução (mín): 40% (mín 7) | Duração: 3 turnos"
      },
      {
        "nivel": 20,
        "desc": "Usos: 3x desc. longo | +CA: +3 | Redução (mín): 50% (mín 10) | Duração: 4 turnos"
      }
    ],
    "VIDA PERMANENTE": [
      {
        "nivel": 1,
        "desc": "HP/nível: A partir deste nível, +2"
      },
      {
        "nivel": 8,
        "desc": "HP/nível: A partir deste nível, apenas +3"
      }
    ],
    "DANO CONSTANTE": [
      {
        "nivel": 2,
        "desc": "Dano adicional (mín): 5% HP máx (mín 2)"
      },
      {
        "nivel": 5,
        "desc": "Dano adicional (mín): 10% HP máx (mín 4)"
      },
      {
        "nivel": 10,
        "desc": "Dano adicional (mín): 15% HP máx (mín 5)"
      },
      {
        "nivel": 15,
        "desc": "Dano adicional (mín): 25% HP máx (mín 6)"
      },
      {
        "nivel": 20,
        "desc": "Dano adicional (mín): 25% HP máx (mín 8)"
      }
    ],
    "ESPÍRITO COLOSSAL": [
      {
        "nivel": 2,
        "desc": "Defesa: +5"
      },
      {
        "nivel": 8,
        "desc": "Defesa: +10"
      },
      {
        "nivel": 13,
        "desc": "Defesa: +15"
      }
    ],
    "ENCANTAMENTO REFLETOR": [
      {
        "nivel": 8,
        "desc": "Pontos Necessários: 5 | Alcance: Até 3m em linha reta"
      },
      {
        "nivel": 16,
        "desc": "Pontos Necessários: Mínimo 4, máximo 8 | Alcance: Até 10m em linha reta"
      },
      {
        "nivel": 19,
        "desc": "Pontos Necessários: Sem limite | Alcance: Até 20m em linha reta"
      }
    ],
    "ENCANTAMENTO DA PROTEÇÃO": [
      {
        "nivel": 9,
        "desc": "Escudo: 10% da vida máxima | Extra: -"
      },
      {
        "nivel": 16,
        "desc": "Escudo: 15% da vida máxima | Extra: -"
      },
      {
        "nivel": 20,
        "desc": "Escudo: 20% da vida máxima | Extra: Aliados que encostarem no vanguarda também ficam protegidos pelo mesmo escudo."
      }
    ],
    "BLINDAGEM INICIAL": [
      {
        "nivel": 5,
        "desc": "Usos: 1x desc. curto | CA: +2 | Dano adicional: +1d4 | Extra: —"
      },
      {
        "nivel": 8,
        "desc": "Usos: 2x desc. curto | CA: +3 | Dano adicional: +2d4 | Extra: Reduz mobilidade do vanguarda pela metade"
      },
      {
        "nivel": 14,
        "desc": "Usos: 3x desc. curto | CA: +5 | Dano adicional: +4d4 | Extra: Mobilidade reduzida a 2"
      }
    ]
  },
  "monge": {
    "ARTISTA MARCIAL": [
      {
        "nivel": 1,
        "desc": "Dano adicional: +1d4"
      },
      {
        "nivel": 4,
        "desc": "Dano adicional: +2d4"
      },
      {
        "nivel": 8,
        "desc": "Dano adicional: +3d4"
      },
      {
        "nivel": 12,
        "desc": "Dano adicional: +3d6"
      },
      {
        "nivel": 16,
        "desc": "Dano adicional: +4d6"
      }
    ],
    "CHI": [
      {
        "nivel": 2,
        "desc": "Ataques de KI por turno: 1"
      },
      {
        "nivel": 7,
        "desc": "Ataques de KI por turno: 2"
      },
      {
        "nivel": 20,
        "desc": "Ataques de KI por turno: 3"
      }
    ],
    "[CHI] DISPARO DE KI": [
      {
        "nivel": 3,
        "desc": "Usos: 2x desc. longo | Dano: 2d6 + mod destreza | Extra: O alvo recebe mais 2 de dano em todos os próximos ataques por 2 turnos."
      },
      {
        "nivel": 6,
        "desc": "Usos: 2x desc. longo | Dano: 3d6 + mod destreza | Extra: +4 dano"
      },
      {
        "nivel": 10,
        "desc": "Usos: 3x desc. longo | Dano: 4d6 + mod destreza | Extra: +5 dano por 3 turnos"
      },
      {
        "nivel": 14,
        "desc": "Usos: 3x desc. longo | Dano: 4d8 + mod destreza | Extra: 2 disparos por uso"
      },
      {
        "nivel": 20,
        "desc": "Usos: 3x desc. longo | Dano: 6d8 + mod destreza | Extra: —"
      }
    ],
    "[CHI] PROTEÇÃO DE CHI": [
      {
        "nivel": 4,
        "desc": "Usos: 1x desc. longo | CA: +3 | Duração: 2 turnos"
      },
      {
        "nivel": 7,
        "desc": "Usos: 1x desc. longo | CA: +3 | Duração: 3 turnos"
      },
      {
        "nivel": 11,
        "desc": "Usos: 2x desc. longo | CA: +4 | Duração: 3 turnos"
      },
      {
        "nivel": 18,
        "desc": "Usos: 1x desc. curto | CA: +5 | Duração: Resto do combate"
      }
    ],
    "[CHI] FLIP KICK": [
      {
        "nivel": 6,
        "desc": "Dano: 4d6 + mod destreza | Arremesso: 7m | Extra: —"
      },
      {
        "nivel": 11,
        "desc": "Dano: 5d6 + mod destreza | Arremesso: 7m | Extra: Consegue atingir até 2 alvos próximos de uma vez"
      }
    ],
    "[CHI] KEITEN ESPIRAL": [
      {
        "nivel": 8,
        "desc": "Raio: 1m | Dano: 6d8 + mod magia | Empurrão: 1m"
      },
      {
        "nivel": 15,
        "desc": "Raio: 2m | Dano: 10d8 + mod magia | Empurrão: 2m"
      }
    ],
    "[CHI] UPPERCUT": [
      {
        "nivel": 9,
        "desc": "Dano adicional: 4d8 | Altura: 10m | Inconsciente: 2 turnos"
      },
      {
        "nivel": 16,
        "desc": "Dano adicional: 5d8 | Altura: 15m | Inconsciente: 3 turnos"
      }
    ],
    "TORMENTOR STRIKES": [
      {
        "nivel": 12,
        "desc": "Socos: 2"
      },
      {
        "nivel": 18,
        "desc": "Socos: 3"
      }
    ],
    "THUNDERCLAP": [
      {
        "nivel": 13,
        "desc": "Raio: 5m | Extra: Atordoa + sangramento 2 turnos"
      },
      {
        "nivel": 20,
        "desc": "Raio: 15m | Extra: -"
      }
    ]
  },
  "necromante": {
    "ALMA PERDIDA": [
      {
        "nivel": 8,
        "desc": "Mudança: Custos normais"
      },
      {
        "nivel": 13,
        "desc": "Mudança: Custos descritos pela metade /"
      }
    ]
  },
  "mago": {
    "PEQUENA BOLA DE FOGO": [
      {
        "nivel": 1,
        "desc": "Nome: Pequena Bola de Fogo | Dano: 1d8 + int | Área: Alvo único | Extra: —"
      },
      {
        "nivel": 5,
        "desc": "Nome: Bola de Fogo | Dano: 4d8 + int | Área: raio de 3x3m | Extra: Empurra alvos"
      },
      {
        "nivel": 10,
        "desc": "Nome: Onda de Bolas de Fogo (2x desc. longo) | Dano: 2d10 + int cada | Área: 8 bolas | Extra: —"
      }
    ],
    "LUZ ETÉREA": [
      {
        "nivel": 1,
        "desc": "Raio: 3m | Duração: 1 turno (10s)"
      },
      {
        "nivel": 7,
        "desc": "Raio: 10m | Duração: 3 turnos (1 min) /"
      }
    ],
    "ILUSÃO": [
      {
        "nivel": 2,
        "desc": "Tipo de ilusão: Objetos simples inanimados (copos, pratos, armas)"
      },
      {
        "nivel": 6,
        "desc": "Tipo de ilusão: Objetos médios (porta, cadeira, barril)"
      },
      {
        "nivel": 11,
        "desc": "Tipo de ilusão: Objetos grandes animados (humanos, animais)"
      },
      {
        "nivel": 15,
        "desc": "Tipo de ilusão: Ilusões enormes (casas, cavernas), requer concentração"
      },
      {
        "nivel": 19,
        "desc": "Tipo de ilusão: Ilusões complexas (castelos, florestas, cidades), concentração imensa"
      }
    ],
    "PRISÃO DE RUNA": [
      {
        "nivel": 5,
        "desc": "Extra: Prende 1 turno"
      },
      {
        "nivel": 14,
        "desc": "Extra: Em alvo marcado: 2 turnos preso, dobro do dano"
      }
    ],
    "FLUXO DE FEITIÇO": [
      {
        "nivel": 8,
        "desc": "Usos/turno: 2x | Dano: 3d6 + magia"
      },
      {
        "nivel": 14,
        "desc": "Usos/turno: 3x | Dano: 3d8 + magia"
      }
    ],
    "MARCAÇÕES": [
      {
        "nivel": 8,
        "desc": "Dano extra: +3d4"
      },
      {
        "nivel": 14,
        "desc": "Dano extra: +4d4"
      }
    ],
    "CONTROLE PERFEITO": [
      {
        "nivel": 5,
        "desc": "Extra: Objetos pequenos e médios"
      },
      {
        "nivel": 14,
        "desc": "Extra: Qualquer tamanho (+1 HP por 3kg adicionais)"
      }
    ]
  },
  "feiticeiro": {
    "RAIO MÍSTICO": [
      {
        "nivel": 1,
        "desc": "Alcance: 6m | Dano: 1d12+magia | Efeito Extra: -"
      },
      {
        "nivel": 3,
        "desc": "Alcance: 7m | Dano: 1d12+magia | Efeito Extra: Arremessa alvos atingidos para 5m. O feiticeiro pode realizar uma conjuração dupla."
      },
      {
        "nivel": 5,
        "desc": "Alcance: 8m | Dano: 2d12+magia | Efeito Extra: -"
      },
      {
        "nivel": 7,
        "desc": "Alcance: 9m | Dano: 2d12+magia | Efeito Extra: Agora cura o feiticeiro em metade do dano causado."
      },
      {
        "nivel": 9,
        "desc": "Alcance: 12m | Dano: 3d12+magia | Efeito Extra: -"
      },
      {
        "nivel": 11,
        "desc": "Alcance: 14m | Dano: 4d12+magia | Efeito Extra: Agora reduz a armadura de alvos atingidos em 1, de forma cumulativa."
      },
      {
        "nivel": 13,
        "desc": "Alcance: 16m | Dano: 5d12+magia | Efeito Extra: -"
      },
      {
        "nivel": 15,
        "desc": "Alcance: 16m | Dano: 5d12+magia | Efeito Extra: Inimigos rodam teste de resistência mágica (dificuldade 5+magia), caso falhem serão atordoados no impacto do arremesso."
      },
      {
        "nivel": 17,
        "desc": "Alcance: 30m | Dano: 6d12+magia | Efeito Extra: O raio místico atinge seu apogeu, também atinge inimigos próximos do impacto num raio até 2m do alvo inicial, causando o mesmo dano."
      }
    ],
    "REPREENSÃO PACTUAL": [
      {
        "nivel": 2,
        "desc": "Dano: 2d10+magia | Usos: 2x Descanso longo"
      },
      {
        "nivel": 6,
        "desc": "Dano: 4d10+magia | Usos: 3x Descanso longo"
      }
    ],
    "TELEPORTE": [
      {
        "nivel": 3,
        "desc": "Mana: 3 | Distância: 6m | Extra: Ação bônus"
      },
      {
        "nivel": 9,
        "desc": "Mana: 5 | Distância: 12m | Extra: Pode ser reação"
      }
    ],
    "RETROCEDER": [
      {
        "nivel": 5,
        "desc": "Alvos: 1 (aliado ou inimigo) | Extra: —"
      },
      {
        "nivel": 8,
        "desc": "Alvos: 1 | Extra: Pode retroceder a si mesmo"
      },
      {
        "nivel": 14,
        "desc": "Alvos: 2 (incluindo si) | Extra: Pode retroceder a morte (menos de si)"
      }
    ]
  },
  "bardo": {
    "CONCERTO": [
      {
        "nivel": 1,
        "desc": "Melhoria: Efeitos padrões."
      },
      {
        "nivel": 4,
        "desc": "Melhoria: Reduzido dificuldade em 1. Aumente os efeitos de 1d2 para 1d6. Aumente os efeitos de 1d4 para 1d8. Aumente a CA recebida em +1."
      },
      {
        "nivel": 7,
        "desc": "Melhoria: Reduzido dificuldade em 1. Aumente os efeitos de 1d6 para 2d8. Aumente os efeitos de 1d8 para 2d8. Diminua a CA de inimigos em -1."
      },
      {
        "nivel": 9,
        "desc": "Melhoria: Reduzido dificuldade em 3."
      },
      {
        "nivel": 12,
        "desc": "Melhoria: Sempre que o bardo conseguir realizar um conserto ele não poderá mais errar outro concerto idêntico ou mais fácil durante o combate. Aumente os efeitos de 2d8 para 2d12."
      },
      {
        "nivel": 14,
        "desc": "Melhoria: Dificuldade inicial diminuída em 3."
      },
      {
        "nivel": 16,
        "desc": "Melhoria: A escala de dificuldade diminui em 1 adicional. Aumente os efeitos de 2d12 para 3d12."
      },
      {
        "nivel": 18,
        "desc": "Melhoria: Após 3 concertos com sucesso: 1 concerto sem dificuldade."
      }
    ],
    "PERFORMANCE": [
      {
        "nivel": 1,
        "desc": "Mudança: Padrão, o bardo pode acumular até 10+mod carisma de performance"
      },
      {
        "nivel": 5,
        "desc": "Mudança: Agora o bardo pode acumular até 20+mod carisma de performance"
      },
      {
        "nivel": 8,
        "desc": "Mudança: Pode acumular até 30+mod carisma de performance"
      },
      {
        "nivel": 12,
        "desc": "Mudança: Acúmulos recebidos são DOBRADOS"
      },
      {
        "nivel": 17,
        "desc": "Mudança: Acúmulos não se esvaem mais. Pode acumular até 40+mod carisma."
      },
      {
        "nivel": 19,
        "desc": "Mudança: Acúmulos TRIPLICADOS"
      }
    ],
    "BATIDA ESTRONDANTE": [
      {
        "nivel": 2,
        "desc": "Dano: 2d6 + mod carisma | Área: Alvo único | Extra: —"
      },
      {
        "nivel": 5,
        "desc": "Dano: 3d6+ mod carisma | Área: Alvo único | Extra: —"
      },
      {
        "nivel": 7,
        "desc": "Dano: 4d6 + mod carisma | Área: Alvo único | Extra: —"
      },
      {
        "nivel": 15,
        "desc": "Dano: 5d6 + 2x mod carisma | Área: 2x2m | Extra: —"
      },
      {
        "nivel": 19,
        "desc": "Dano: 7d6 + 2x mod carisma | Área: 3x3m | Extra: Qualquer objeto/arma"
      }
    ],
    "HORIZONTE DE EVENTOS": [
      {
        "nivel": 3,
        "desc": "Extra: Efeito base"
      },
      {
        "nivel": 7,
        "desc": "Extra: Aumenta a cura para 3d8+mod carisma e o dano para 2d8+ mod carisma"
      },
      {
        "nivel": 13,
        "desc": "Extra: Ao fim dos 5 turnos, é realizado uma 2ª onda de luz, concedendo +3 deslocamento a todos os afetados"
      }
    ],
    "CAMINHO DAS CORDAS": [
      {
        "nivel": 4,
        "desc": "Usos: 1x desc. longo | Duração: 5 turnos (15 min)"
      },
      {
        "nivel": 13,
        "desc": "Usos: 2x desc. longo | Duração: 10 turnos (20 min) /"
      }
    ],
    "SINFONIA MORTAL": [
      {
        "nivel": 8,
        "desc": "Custo: 20 Performance | Limite por turno: 1x/turno"
      },
      {
        "nivel": 14,
        "desc": "Custo: 40 Performance | Limite por turno: Sem limite (1 uso por Arma Sonora criada)"
      }
    ],
    "COALESCÊNCIA": [
      {
        "nivel": 8,
        "desc": "Extra: 1 aliado, só dano do aliado escolhido."
      },
      {
        "nivel": 14,
        "desc": "Extra: Divide o dano de até 4 aliados, se desejar"
      }
    ]
  },
  "paladino": {
    "EFEITO COLATERAL": [
      {
        "nivel": 1,
        "desc": "Mudança: Não acumula"
      },
      {
        "nivel": 10,
        "desc": "Mudança: Acumula infinitamente"
      }
    ],
    "REVITALIZAR": [
      {
        "nivel": 1,
        "desc": "Usos: 1x desc. longo | Cura: 2d4 + magia + carisma | Extra: —"
      },
      {
        "nivel": 4,
        "desc": "Usos: 1x desc. longo | Cura: 4d4 + magia + carisma | Extra: —"
      },
      {
        "nivel": 7,
        "desc": "Usos: 2x desc. longo | Cura: 4d4 + magia + carisma | Extra: —"
      },
      {
        "nivel": 10,
        "desc": "Usos: 2x desc. longo | Cura: 6d4 + magia + carisma | Extra: —"
      },
      {
        "nivel": 13,
        "desc": "Usos: 3x desc. longo | Cura: 7d4 + magia + carisma | Extra: Cura efeitos mentais"
      },
      {
        "nivel": 16,
        "desc": "Usos: 3x desc. longo | Cura: 9d4 + magia + carisma | Extra: Pode ser ação bônus"
      },
      {
        "nivel": 19,
        "desc": "Usos: 4x desc. longo | Cura: 10d4 + magia + carisma | Extra: —"
      }
    ],
    "MARCAÇÃO DA NEUTRALIDADE": [
      {
        "nivel": 2,
        "desc": "Extra: Efeito base"
      },
      {
        "nivel": 6,
        "desc": "Extra: Quebrar marca aplica EFEITO COLATERAL por 1 turno"
      }
    ],
    "CORTE LUAR": [
      {
        "nivel": 3,
        "desc": "Usos: 3x | Dano: 2d6 + magia | Área: 2x2 | Extra: —"
      },
      {
        "nivel": 6,
        "desc": "Usos: 3x | Dano: 4d6 + magia | Área: 2x2 | Extra: Crítico = 2 usos por 1"
      },
      {
        "nivel": 9,
        "desc": "Usos: 3x | Dano: 6d6 + magia | Área: 4x4 | Extra: —"
      },
      {
        "nivel": 12,
        "desc": "Usos: 4x | Dano: 7d6 + magia | Área: 4x4 | Extra: Aplica efeito colateral antes da explosão"
      }
    ],
    "VITALIDADE": [
      {
        "nivel": 5,
        "desc": "Extra: Imune a veneno"
      },
      {
        "nivel": 10,
        "desc": "Extra: Imune a toda doença"
      }
    ],
    "PURGE": [
      {
        "nivel": 7,
        "desc": "Dano: 7d4 + mod magia + mod força | Extra: —"
      },
      {
        "nivel": 13,
        "desc": "Dano: 10d4 + mod magia + mod força | Extra: Acerto = efeito de Neutralizar"
      },
      {
        "nivel": 19,
        "desc": "Dano: 10d8 + mod magia + mod força | Extra: +1 disparo extra por uso"
      }
    ],
    "ENERGIA PURA": [
      {
        "nivel": 9,
        "desc": "Usos: 2x desc. longo | Extra: Intercepta magias"
      },
      {
        "nivel": 14,
        "desc": "Usos: 3x desc. longo | Extra: Também intercepta ataques a distância (flechas e derivados)"
      }
    ],
    "DEVASTAÇÃO DO ZODÍACO": [
      {
        "nivel": 11,
        "desc": "Usos: 1x | Testes: 3 | Dificuldade: 10 | Dano/raio: 2d8 + carisma"
      },
      {
        "nivel": 14,
        "desc": "Usos: 1x | Testes: 4 | Dificuldade: 12 | Dano/raio: 3d8 + carisma"
      },
      {
        "nivel": 18,
        "desc": "Usos: 2x | Testes: 4 | Dificuldade: 14 | Dano/raio: 3d8 + carisma"
      }
    ],
    "DIVINE SMITE": [
      {
        "nivel": 12,
        "desc": "Usos: 1x | Dano: 10d8 + mod magia + mod força"
      },
      {
        "nivel": 17,
        "desc": "Usos: 2x | Dano: 20d8 + mod magia + mod força"
      }
    ],
    "ONDA DA JUSTIÇA": [
      {
        "nivel": 5,
        "desc": "Alcance: 8m | Dano da aura: Dano arma + 2d4 mágico | Extra: Consome aura"
      },
      {
        "nivel": 8,
        "desc": "Alcance: Ilimitado no combate | Dano da aura: Dano arma + 3d4 | Extra: Consome aura"
      },
      {
        "nivel": 14,
        "desc": "Alcance: Ilimitado | Dano da aura: Dano arma + 5d4 | Extra: NÃO consome. Efeito colateral ACUMULA"
      }
    ],
    "INQUISIÇÃO": [
      {
        "nivel": 5,
        "desc": "Extra: Registro sagrado"
      },
      {
        "nivel": 14,
        "desc": "Extra: Finca arma no solo e invoca os cadáveres cujos nomes recorda. Mantêm força e habilidades de vida"
      }
    ],
    "OBRA DIVINA": [
      {
        "nivel": 5,
        "desc": "Usos: 2x desc. curto | Dano: 5d4 + mod magia | Extra: Danos superficiais a construções"
      },
      {
        "nivel": 8,
        "desc": "Usos: 3x desc. curto | Dano: 9d4 + mod magia | Extra: Grandes danos a construções"
      },
      {
        "nivel": 14,
        "desc": "Usos: 4x desc. curto | Dano: 14d4 + mod magia | Extra: Tremores em 35m ao atingir solo"
      }
    ]
  },
  "espadachim": {
    "PERÍCIA DA ESPADA": [
      {
        "nivel": 1,
        "desc": "Extra: +2 de iniciativa com espadas/katanas"
      },
      {
        "nivel": 3,
        "desc": "Extra: Aumenta dado de dano base dessas armas em 1"
      },
      {
        "nivel": 5,
        "desc": "Extra: Pode atacar 2x numa ação com essas armas"
      }
    ],
    "PERFURAÇÃO DA LÂMINA": [
      {
        "nivel": 1,
        "desc": "Usos: 2x desc. longo | Dano adicional: 2d4 + mod dest | Crítico extra: +1d4 | Extra: —"
      },
      {
        "nivel": 4,
        "desc": "Usos: 3x desc. longo | Dano adicional: 3d4 + mod dest | Crítico extra: +2d4 | Extra: Pode ser ação bônus"
      },
      {
        "nivel": 8,
        "desc": "Usos: 3x desc. longo | Dano adicional: 5d4 + mod dest | Crítico extra: +2d4 | Extra: —"
      },
      {
        "nivel": 12,
        "desc": "Usos: 3x desc. longo | Dano adicional: 7d4 + mod dest | Crítico extra: +3d4 | Extra: —"
      },
      {
        "nivel": 14,
        "desc": "Usos: 3x desc. longo | Dano adicional: 8d4 + mod dest | Crítico extra: +5d4 | Extra: —"
      },
      {
        "nivel": 19,
        "desc": "Usos: 3x desc. longo | Dano adicional: 10d4 + mod dest | Crítico extra: +7d4 | Extra: —"
      }
    ],
    "CRÍTICO APRIMORADO": [
      {
        "nivel": 3,
        "desc": "Crítico em: 19"
      },
      {
        "nivel": 9,
        "desc": "Crítico em: 18 e 19"
      },
      {
        "nivel": 12,
        "desc": "Crítico em: Crítico também cura igual ao dano causado"
      },
      {
        "nivel": 18,
        "desc": "Crítico em: 17, 18 e 19"
      }
    ],
    "TEMPESTADE DE AÇO": [
      {
        "nivel": 6,
        "desc": "Usos: 2x desc. longo | Dano adicional: 2d4 | Extra: Crítico = sangramento 2 turnos"
      },
      {
        "nivel": 17,
        "desc": "Usos: 3x desc. longo | Dano adicional: 10d4 | Extra: Desvia de projéteis. Sangramento até fim do combate"
      }
    ],
    "ARMA PESADA": [
      {
        "nivel": 8,
        "desc": "Multiplicador: 3x"
      },
      {
        "nivel": 20,
        "desc": "Multiplicador: 4x"
      }
    ],
    "CRIATURAS DAS SOMBRAS": [
      {
        "nivel": 5,
        "desc": "Criaturas: 1 | Extra: —"
      },
      {
        "nivel": 8,
        "desc": "Criaturas: 2 | Extra: —"
      },
      {
        "nivel": 14,
        "desc": "Criaturas: 3 | Extra: Pode trocar de lugar com uma criatura"
      }
    ]
  },
  "ceifeiro": {
    "ATAQUE ESPECTRAL": [
      {
        "nivel": 1,
        "desc": "Usos: 2x desc. longo | Dano à distância: 4d4 + mod magia | Dano corpo-a-corpo: 2d4 + mod magia | Extra: —"
      },
      {
        "nivel": 7,
        "desc": "Usos: 2x desc. longo | Dano à distância: 6d6 + mod magia | Dano corpo-a-corpo: 3d6 + mod magia | Extra: —"
      },
      {
        "nivel": 14,
        "desc": "Usos: 3x desc. longo | Dano à distância: 6d8 + mod magia | Dano corpo-a-corpo: 4d6 + mod magia | Extra: Atinge um raio de 2m"
      },
      {
        "nivel": 20,
        "desc": "Usos: 3x desc. longo | Dano à distância: 10d10 + mod magia | Dano corpo-a-corpo: 6d10 + mod magia | Extra: Atinge um raio de 3m"
      }
    ],
    "INTO ASHES": [
      {
        "nivel": 4,
        "desc": "Extra: Intangível (reação)"
      },
      {
        "nivel": 12,
        "desc": "Extra: Pode surgir atrás de um inimigo e realizar movimento básico"
      }
    ]
  },
  "bruxo": {
    "SINAIS": [
      {
        "nivel": 5,
        "desc": "Extra: 2 Sinais/turno + versões alternativas de cada Sinal"
      },
      {
        "nivel": 20,
        "desc": "Extra: INTENSIFICAÇÃO: combina 2 Sinais em 1 (6 combinações possíveis)"
      }
    ],
    "IGNITE": [
      {
        "nivel": 2,
        "desc": "O sinal está mais forte. Aumente a área do fogo para mais 1m de distância (totalizando 4m). Agora causa 3d6+mod magia de dano mágico e deixa alvos atingidos em chamas por 2 turnos (não acumula)."
      },
      {
        "nivel": 3,
        "desc": "O sinal está mais forte. Aumente a área do fogo para mais 2m de distância (totalizando 6m). Agora causa 3d8+mod magia de dano mágico. Alvos atingidos perdem 1 de CA até o fim do combate."
      },
      {
        "nivel": 4,
        "desc": "O sinal está mais forte. Agora é possível utilizar 3 vezes POR DESCANSO CURTO. Aumente a área do fogo para mais 2m de distância (totalizando 8m). Agora causa 4d8+mod magia de dano mágico e deixa alvos atingidos em chamas por 3 turnos. No momento do impacto das chamas, impossibilite qualquer movimentação dos alvos atingidos, momentaneamente."
      },
      {
        "nivel": 5,
        "desc": "O sinal está muito mais forte. Agora é possível utilizar 4 vezes POR DESCANSO CURTO. Aumente a área do fogo para mais 2m de distância (totalizando 10m). Agora causa 6d8+mod magia de dano mágico e deixa alvos atingidos em chamas por 4 turnos. Alvos atingidos perdem 2 de CA até o fim do combate."
      },
      {
        "nivel": 6,
        "desc": "O sinal chegou no seu pico de poder. A área do fogo agora é igual a 15m e a habilidade causa 8d8+mod magia de dano mágico, deixando alvos atingidos em chamas por 4 turnos e as chamas acumulam. Além de tirar 2 de CA de forma acumulativa, alvos em chamas possuem a defesa anulada."
      }
    ],
    "ARXIS": [
      {
        "nivel": 2,
        "desc": "O sinal está mais forte. Aumente a área do sinal em 2m de distância (totalizando 6m). Alvos empurrados para longe são atordoados por 1 ação com o poder do sinal."
      },
      {
        "nivel": 3,
        "desc": "O sinal está mais forte. Aumente a área do sinal em 3m de distância (totalizando 9m). Agora pode empurrar objetos de peso médio e destruir estruturas básicas. Alvos empurrados são atordoados por 1 turno."
      },
      {
        "nivel": 4,
        "desc": "O sinal está mais forte. Agora é possível utilizar 2 vezes POR DESCANSO CURTO. Aumente a área do sinal em 4m de distância (totalizando 13m). Alvos atingidos pelo sinal agora podem recebem um dano adicional, caso sejam jogados para uma região onde possua um terreno, sendo igual a 5d4+mod força de dano de concussão."
      },
      {
        "nivel": 5,
        "desc": "O sinal está muito mais forte. Agora é possível utilizar 3 vezes POR DESCANSO CURTO. Aumente a área do sinal em 3m de distância (totalizando 16m). Alvos atordoados pelo impacto do ataque não são podem sair desse estado de nenhuma forma. Todo e qualquer buff, bônus, escudo ou cura que estiver sendo utilizado em alvos assim, são completamente anulados. Impacto contra terreno faz com que o alvo receba 7d4+mod força de dano de concussão."
      },
      {
        "nivel": 6,
        "desc": "O sinal chegou no seu pico de poder. A área do sinal é igual a 20m. Alvos atingidos são atordoados por 2 turnos. Ao atingir esta habilidade em alvos com bônus, como dito anteriormente, possuem estes bônus anulados completamente. Agora o sinal pode empurrar objetos pesados e destruir estruturas até de pedra. Impacto contra terreno faz com que o alvo receba 10d4+mod força de dano de concussão."
      }
    ],
    "BREN": [
      {
        "nivel": 2,
        "desc": "O sinal está mais forte. Agora o escudo é igual a 20% da vida máxima do jogador (mínimo 4). Ao se quebrar, a área de explosão agora é de 2x2m. Alvos na zona do impacto são empurrados para 2m de distância e recebem 2d4 de dano."
      },
      {
        "nivel": 3,
        "desc": "O sinal está mais forte. Agora o escudo é igual a 30% da vida máxima do jogador (mínimo 6). Ao se quebrar, a área de explosão agora é de 3x3m. Alvos na zona do impacto agora recebem 3d4 de dano. O jogador não é mais empurrado 1m de distância ao quebrar o escudo."
      },
      {
        "nivel": 4,
        "desc": "O sinal está mais forte. O jogador agora consegue utilizar 2 vezes POR DESCANSO CURTO, porém escudos não se acumulam. Agora o escudo é igual a 40% da vida máxima do jogador (mínimo 8). Ao se quebrar, a área de explosão agora é de 4x4m. Alvos na zona do impacto são empurrados para 3m de distância e recebem 4d4 de dano."
      },
      {
        "nivel": 5,
        "desc": "O sinal está muito mais forte. Ao se quebrar, a área de explosão agora é de 6x6. Alvos na zona do impacto são empurrados para 4m de distância e recebem 6d4 de dano. Após a explosão, o jogador pode realizar um ataque de oportunidade."
      },
      {
        "nivel": 6,
        "desc": "O sinal chegou no seu pico de poder. Agora o escudo é igual a 50% da vida máxima do jogador (mínimo 10). Ao se quebrar, a área de explosão agora é de 5x5m. Alvos na zona do impacto são empurrados para 5m de distância e recebem 7d4 de dano. Alvos que atingirem o jogador envolvido nesta barreia, dará chance ao bruxo de realizar um ataque de oportunidade."
      }
    ],
    "ECRYPT": [
      {
        "nivel": 2,
        "desc": "O sinal está mais forte. Agora ao utilizar o poder, cria-se 4 sinais ECRYPT no chão. Seres dentro desta área perdem 2 de movimentação e seus acertos ficam com mais desvantagem (-3). Habilidades de projéteis ou flechas agora podem ser desviadas caso passem pela zona do sinal (dificuldade 18)."
      },
      {
        "nivel": 3,
        "desc": "O sinal está mais forte. Agora ao utilizar o poder, cria-se 6 sinais ECRYPT no chão. Seres dentro desta área perdem 3 de movimentação e seus acertos ficam com mais desvantagem (-4). Habilidade de projéteis ou flechas agora podem ser desviadas caso passem pela zona do sinal (dificuldade 16). Agora dura 2 turnos."
      },
      {
        "nivel": 4,
        "desc": "O sinal está mais forte. Agora pode utilizar 2 vezes POR DESCANSO CURTO, porém não é possível utilizar mais de um por vez. Agora cria-se 8 sinais ECRYPT no chão. Seres dentro da área não conseguem se movimentar e seus acertos ficam com mais desvantagem (-5). Habilidade de projéteis ou flechas agora podem ser desviadas caso passem pela zona do sinal (dificuldade 14)."
      },
      {
        "nivel": 5,
        "desc": "O sinal está muito mais forte. Agora cria-se 10 sinais ECRYPT no chão. Seres dentro da área não conseguem se movimentar e nem acertar golpes. Habilidade de projéteis ou flechas agora podem ser desviadas caso passem pela zona do sinal (dificuldade 12)."
      },
      {
        "nivel": 6,
        "desc": "O sinal chegou no seu pico de poder. Agora cria-se 12 sinais ECRYPT no chão. Seres dentro da área não conseguem se movimentar e nem acertar golpes. Habilidade de projéteis ou flechas são paradas e ficam flutuando na região dos sinais durante a duração do poder. Agora dura 3 turnos."
      }
    ],
    "MUTAÇÃO": [
      {
        "nivel": 1,
        "desc": "Extra: Barra de mutação ativa"
      },
      {
        "nivel": 7,
        "desc": "Extra: Cada nível de mutação = +1d10 de vida máxima"
      }
    ],
    "VISÃO": [
      {
        "nivel": 2,
        "desc": "Raio: 6m"
      },
      {
        "nivel": 8,
        "desc": "Raio: 10m"
      },
      {
        "nivel": 17,
        "desc": "Raio: 30m"
      }
    ],
    "EVASÃO": [
      {
        "nivel": 3,
        "desc": "Usos: 2x desc. curto | Extra: —"
      },
      {
        "nivel": 6,
        "desc": "Usos: 3x desc. curto | Extra: —"
      },
      {
        "nivel": 14,
        "desc": "Usos: 3x desc. curto | Extra: Desvia flechas e magias"
      }
    ],
    "CRÍTICO APRIMORADO": [
      {
        "nivel": 4,
        "desc": "Crítico em: 19, 20"
      },
      {
        "nivel": 12,
        "desc": "Crítico em: 18, 19, 20"
      }
    ],
    "LESÃO": [
      {
        "nivel": 5,
        "desc": "Extra: Atordoa 2 turnos"
      },
      {
        "nivel": 12,
        "desc": "Extra: Membro atingido fica debilitado 1 turno"
      }
    ],
    "APLICAÇÃO LETAL": [
      {
        "nivel": 6,
        "desc": "Usos: 1x desc. curto | Dano: 2d6 + mod força | Extra: 2 giros"
      },
      {
        "nivel": 11,
        "desc": "Usos: 2x desc. curto | Dano: 4d6 + mod força | Extra: Giros adicionais com teste (d20, dif 10+2 por giro)"
      },
      {
        "nivel": 18,
        "desc": "Usos: 2x desc. curto | Dano: 6d6 + mod força | Extra: 2º giro sem redução de dano"
      }
    ],
    "ESTOCADA": [
      {
        "nivel": 8,
        "desc": "Dano: 5d4 + mod força"
      },
      {
        "nivel": 15,
        "desc": "Dano: 6d4 + mod força"
      }
    ],
    "IMBUIÇÃO": [
      {
        "nivel": 10,
        "desc": "Usos: 1x desc. longo"
      },
      {
        "nivel": 14,
        "desc": "Usos: 2x desc. longo"
      }
    ],
    "ATAQUE DEVASTAÇÃO": [
      {
        "nivel": 13,
        "desc": "Dano: 6d6 + mod força | Extra: 2x efeitos ao contato"
      },
      {
        "nivel": 19,
        "desc": "Dano: 10d6 + mod força | Extra: Crítico = 3x efeitos"
      }
    ],
    "ATAQUE INESPERADO": [
      {
        "nivel": 16,
        "desc": "Extra: Teste dif 16"
      },
      {
        "nivel": 20,
        "desc": "Extra: Sempre ganha ação extra ao receber crítico"
      }
    ],
    "FÚRIA DO CONQUISTADOR": [
      {
        "nivel": 8,
        "desc": "Acúmulos necessários: 10"
      },
      {
        "nivel": 14,
        "desc": "Acúmulos necessários: 6"
      }
    ]
  },
  "fulgor": {
    "ELETROCUTAR": [
      {
        "nivel": 1,
        "desc": "Usos: 3x desc. curto | Dano: 1d6 + mod magia"
      },
      {
        "nivel": 3,
        "desc": "Usos: 3x | Dano: 2d6 + mod magia"
      },
      {
        "nivel": 6,
        "desc": "Usos: 3x | Dano: 3d6 + mod magia"
      },
      {
        "nivel": 9,
        "desc": "Usos: 4x | Dano: 4d6 + mod magia"
      },
      {
        "nivel": 12,
        "desc": "Usos: 4x | Dano: 5d8 + mod magia"
      },
      {
        "nivel": 16,
        "desc": "Usos: 4x | Dano: 6d8 + mod magia"
      },
      {
        "nivel": 20,
        "desc": "Usos: 4x | Dano: 8d8 + mod magia"
      }
    ],
    "FULGOR": [
      {
        "nivel": 1,
        "desc": "Extra: Ricocheteia 1x (metade do dano)"
      },
      {
        "nivel": 8,
        "desc": "Extra: Ricocheteia dano TOTAL"
      },
      {
        "nivel": 13,
        "desc": "Extra: Ricocheteia para +1 inimigo"
      },
      {
        "nivel": 20,
        "desc": "Extra: Ricocheteia para TODOS os inimigos no combate"
      }
    ],
    "CONDUTIVIDADE": [
      {
        "nivel": 2,
        "desc": "Dano adicional: 1d4"
      },
      {
        "nivel": 6,
        "desc": "Dano adicional: 2d4"
      }
    ],
    "CRÍTICO APRIMORADO": [
      {
        "nivel": 3,
        "desc": "Extra: Atordoa 1 turno"
      },
      {
        "nivel": 10,
        "desc": "Extra: 19-20 = crítico. Críticos ricocheteiam completamente"
      },
      {
        "nivel": 16,
        "desc": "Extra: Atordoa 2 turnos"
      }
    ],
    "CORRENTE DA ELETRICIDADE": [
      {
        "nivel": 3,
        "desc": "Esferas (dado): 1d4 | Dano/esfera: 1d6 + mod magia"
      },
      {
        "nivel": 7,
        "desc": "Esferas (dado): 1d6 | Dano/esfera: 2d6 + mod magia"
      },
      {
        "nivel": 13,
        "desc": "Esferas (dado): 1d10 | Dano/esfera: 3d6 + mod magia"
      }
    ],
    "ELETRICIDADE CONDENSADA": [
      {
        "nivel": 4,
        "desc": "Área: 3x3m | Dano: 2d10 + mod magia"
      },
      {
        "nivel": 9,
        "desc": "Área: 3x3m | Dano: 4d10 + mod magia"
      },
      {
        "nivel": 18,
        "desc": "Área: 3x3m | Dano: 5d10 + mod magia"
      }
    ],
    "VERDADEIRA CONDUÇÃO": [
      {
        "nivel": 6,
        "desc": "Extra: 30cm do solo"
      },
      {
        "nivel": 13,
        "desc": "Extra: Voa até 1m"
      }
    ],
    "RELÂMPAGO": [
      {
        "nivel": 10,
        "desc": "Dano: 5d8 + mod magia"
      },
      {
        "nivel": 14,
        "desc": "Dano: 7d8 + mod magia"
      }
    ],
    "SUPER VELOCIDADE": [
      {
        "nivel": 11,
        "desc": "Extra: —"
      },
      {
        "nivel": 14,
        "desc": "Extra: Habilidades durante super velocidade viram certeiras"
      }
    ],
    "DESTINO": [
      {
        "nivel": 19,
        "desc": "Extra: Atrai objetos condutores (40m)"
      },
      {
        "nivel": 20,
        "desc": "Extra: Também controla SERES condutores (1 alvo, 10s/min)"
      }
    ],
    "CORRUPÇÃO": [
      {
        "nivel": 5,
        "desc": "Extra: Visual sombrio"
      },
      {
        "nivel": 14,
        "desc": "Extra: Faíscas envolvem o Fulgor. Seu 1º ataque atordoa por 1 turno"
      }
    ],
    "NAGASHI": [
      {
        "nivel": 5,
        "desc": "Usos: 2x | Dano elétrico: 3d6 + mod magia | Dano físico: 1d6 | Extra: Crítico perfura"
      },
      {
        "nivel": 8,
        "desc": "Usos: 3x | Dano elétrico: 4d6 + mod magia | Dano físico: 2d6 | Extra: —"
      },
      {
        "nivel": 14,
        "desc": "Usos: 4x | Dano elétrico: 5d6 + mod magia | Dano físico: 3d6 | Extra: Sempre perfura"
      }
    ],
    "RAIO DA MORTE": [
      {
        "nivel": 5,
        "desc": "Usos: 3x | Dano/raio: 2d4 + mod magia | Cura/raio: 1d4 | Extra: —"
      },
      {
        "nivel": 8,
        "desc": "Usos: 4x | Dano/raio: 3d4 + mod magia | Cura/raio: 2d4 | Extra: —"
      },
      {
        "nivel": 14,
        "desc": "Usos: 5x | Dano/raio: 5d4 + mod magia | Cura/raio: 3d4 | Extra: Crítico = 10 raios"
      }
    ]
  },
  "sentinela": {
    "MIRA": [
      {
        "nivel": 1,
        "desc": "Distância p/ Certeiro: 4m | Extra: -"
      },
      {
        "nivel": 4,
        "desc": "Distância p/ Certeiro: 6m | Extra: -"
      },
      {
        "nivel": 6,
        "desc": "Distância p/ Certeiro: 8m | Extra: -"
      },
      {
        "nivel": 9,
        "desc": "Distância p/ Certeiro: 8m | Extra: Caso em altura elevada, observe qualquer coisa facilmente a 2km"
      }
    ],
    "CRÍTICO APRIMORADO": [
      {
        "nivel": 7,
        "desc": "Quanto mais poder adquire, mais difícil torna-se controlá-lo, diariamente o Sentinela sente ondas repentinas de magia percorrendo seu corpo por conta do Cinero. Isso acontece com cada vez mais frequência; agora tirar 19 no dado irá gerar uma FLECHA VOLÁTIL."
      },
      {
        "nivel": 18,
        "desc": "Talvez seja devido ao poder latente dentro de si, ou a imensa complexidade do Cinero e sua dificuldade para dominá-lo. Contudo, agora o Sentinela tem algumas alucinações a luz do dia e vislumbres do passado em seus sonhos; acordando suado e assustado, mal se lembrando de pequenos fragmentos. Assim, torna-se ainda mais frequente o descontrole em suas habilidades, agora tirar 17 no dado irá gerar uma FLECHA VOLÁTIL."
      }
    ]
  },
  "spellstealer": {
    "CATARSE MÁGICA": [
      {
        "nivel": 1,
        "desc": "Usos: 2x desc. curto | Dano adicional: 1d8"
      },
      {
        "nivel": 4,
        "desc": "Usos: 3x desc. curto | Dano adicional: 2d8"
      },
      {
        "nivel": 8,
        "desc": "Usos: Ilimitado | Dano adicional: 1d10"
      },
      {
        "nivel": 12,
        "desc": "Usos: Ilimitado | Dano adicional: 1d12"
      }
    ],
    "FORTIFICAÇÃO DE MANA": [
      {
        "nivel": 2,
        "desc": "Valor do escudo: 20 + mod cons | Duração: 2 turnos | Imunidade: Magias de nível inferior"
      },
      {
        "nivel": 7,
        "desc": "Valor do escudo: 35 + mod cons | Duração: 3 turnos | Imunidade: Magias até 3 níveis acima"
      },
      {
        "nivel": 17,
        "desc": "Valor do escudo: 45 + mod cons | Duração: Até fim do combate | Imunidade: Toda magia enquanto ativo"
      }
    ],
    "TOQUE DO REGICIDA": [
      {
        "nivel": 2,
        "desc": "Usos: 2x desc. longo | Cura: 1d10 + mod cons | Dano mágico: 1d4 + mod magia"
      },
      {
        "nivel": 6,
        "desc": "Usos: 2x desc. longo | Cura: 2d10 + mod cons | Dano mágico: 2d4 + mod magia"
      },
      {
        "nivel": 9,
        "desc": "Usos: 3x desc. longo | Cura: 3d10 + mod cons | Dano mágico: 3d4 + mod magia"
      },
      {
        "nivel": 16,
        "desc": "Usos: 3x desc. longo | Cura: 4d10 + mod cons | Dano mágico: 4d4 + mod magia"
      },
      {
        "nivel": 20,
        "desc": "Usos: 4x desc. longo | Cura: 5d10 + mod cons | Dano mágico: 6d4 + mod magia"
      }
    ],
    "ROUBO DE ATRIBUTOS": [
      {
        "nivel": 3,
        "desc": "Valor roubado: 1 ponto de atributo"
      },
      {
        "nivel": 7,
        "desc": "Valor roubado: 2 pontos de atributo"
      }
    ],
    "USURPAR": [
      {
        "nivel": 3,
        "desc": "Usos: 1x desc. longo | Alcance: 5m | Dano de contato: 2d8 | Duração: 2 turnos/5 min | Armazenamento: 1 habilidade | Nível máx roubado: Nível do Spellstealer"
      },
      {
        "nivel": 11,
        "desc": "Usos: 2x desc. longo | Alcance: 20m | Dano de contato: 5d8 | Duração: 2h/4 turnos | Armazenamento: 2 habilidades | Nível máx roubado: Até 2 níveis acima"
      },
      {
        "nivel": 14,
        "desc": "Usos: 2x desc. longo | Alcance: 50m | Dano de contato: 6d8 | Duração: Até usar de novo | Armazenamento: 2 habilidades | Nível máx roubado: Até 2 níveis acima"
      },
      {
        "nivel": 20,
        "desc": "Usos: 2x desc. longo | Alcance: 50m | Dano de contato: 10d8 | Duração: Ilimitado | Armazenamento: Ilimitado (1/inimigo) | Nível máx roubado: Até 5 níveis acima"
      }
    ],
    "DEVORAR MAGIA": [
      {
        "nivel": 9,
        "desc": "Usos: 1x/dia | Extra: Absorve magia → cura"
      },
      {
        "nivel": 13,
        "desc": "Usos: 2x/dia | Extra: Replica a magia e usa como reação contra o inimigo"
      },
      {
        "nivel": 19,
        "desc": "Usos: 3x desc. longo | Extra: Poderes consumidos são ROUBADOS (lógica do Usurpar)"
      }
    ]
  },
  "hemomante": {
    "RESERVA DE SANGUE": [
      {
        "nivel": 1,
        "desc": "Usos/turno: 1x"
      },
      {
        "nivel": 5,
        "desc": "Usos/turno: 2x"
      },
      {
        "nivel": 9,
        "desc": "Usos/turno: 2x"
      },
      {
        "nivel": 14,
        "desc": "Usos/turno: 3x"
      },
      {
        "nivel": 17,
        "desc": "Usos/turno: 3x"
      },
      {
        "nivel": 20,
        "desc": "Usos/turno: 4x"
      }
    ],
    "TRANSFUSÃO MÁGICA": [
      {
        "nivel": 1,
        "desc": "Usos/turno: 1x | Dano: 2d6 + mod constituição | Bônus por ML (custo): +1d6 (2 ml)"
      },
      {
        "nivel": 5,
        "desc": "Usos/turno: 2x | Dano: 3d6 + mod constituição | Bônus por ML (custo): +2d6 (4 ml)"
      },
      {
        "nivel": 9,
        "desc": "Usos/turno: 2x | Dano: 4d6 + mod constituição | Bônus por ML (custo): +3d6 (6 ml)"
      },
      {
        "nivel": 14,
        "desc": "Usos/turno: 2x | Dano: 5d6 + mod constituição | Bônus por ML (custo): +4d8 (8 ml)"
      },
      {
        "nivel": 17,
        "desc": "Usos/turno: 3x | Dano: — | Bônus por ML (custo): —"
      },
      {
        "nivel": 20,
        "desc": "Usos/turno: 3x | Dano: 8d8 + mod constituição | Bônus por ML (custo): +5d8 (10 ml)"
      }
    ],
    "CICATRIZAÇÃO SANGUÍNEA": [
      {
        "nivel": 2,
        "desc": "Extra: 1 HP por ml"
      },
      {
        "nivel": 6,
        "desc": "Extra: 2 HP por ml. Regenera feridas leves, fecha feridas grandes"
      },
      {
        "nivel": 20,
        "desc": "Extra: Regenera completamente membros perdidos"
      }
    ],
    "SANGUE ENFEITIÇADO": [
      {
        "nivel": 2,
        "desc": "Dano: 1d6 | Por ação: 2 | Bônus por ML: +2 acerto (máx 6) | Dano acumulativo: +2 (máx 4)"
      },
      {
        "nivel": 5,
        "desc": "Dano: 2d6 | Por ação: 3 | Bônus por ML: +3 acerto (máx 6) | Dano acumulativo: +3 (máx 6)"
      },
      {
        "nivel": 9,
        "desc": "Dano: 3d10 | Por ação: 3 | Bônus por ML: +4 acerto (máx 8) | Dano acumulativo: +4 (máx 8)"
      },
      {
        "nivel": 15,
        "desc": "Dano: 4d10 | Por ação: 4 | Bônus por ML: +4 acerto (sem limites) | Dano acumulativo: +4 (sem limites)"
      }
    ],
    "DANÇA ESCARLATE": [
      {
        "nivel": 4,
        "desc": "Custo: 10 HP | Área: 10m | 1º impacto: 2d4 + mod constituição | 2º impacto (marca): +3d4"
      },
      {
        "nivel": 8,
        "desc": "Custo: 18 HP | Área: 20m | 1º impacto: 4d4 + mod constituição | 2º impacto (marca): +6d4"
      },
      {
        "nivel": 12,
        "desc": "Custo: 25 HP | Área: 30m | 1º impacto: 4d6+ mod constituição | 2º impacto (marca): +5d6"
      }
    ],
    "MANIPULAÇÃO RUBRA": [
      {
        "nivel": 9,
        "desc": "Usos: 1x desc. curto | Dano (interromper/acelerar): 4d8+mod constituição/ 3d10+mod magia | Extra: Exaustão mental"
      },
      {
        "nivel": 13,
        "desc": "Usos: 1x desc. curto | Dano (interromper/acelerar): 5d8+mod constituição / 4d10+mod constituição | Extra: —"
      },
      {
        "nivel": 17,
        "desc": "Usos: 2x desc. curto | Dano (interromper/acelerar): 6d8+mod constituição / 6d12+mod constituição | Extra: Controla 2 alvos. Sem exaustão"
      }
    ],
    "LANÇA SANGUINÁRIA": [
      {
        "nivel": 11,
        "desc": "Dano: 10d4 + mod constituição | ML para 2ª lança: 24 ml"
      },
      {
        "nivel": 19,
        "desc": "Dano: 10d6 + mod constituição | ML para 2ª lança: 36 ml (cria 2 lanças extras)"
      }
    ],
    "ESCOAMENTO DA DOR": [
      {
        "nivel": 11,
        "desc": "Dano: 10d4 + mod constituição | ML para 2ª lança: 24 ml"
      },
      {
        "nivel": 16,
        "desc": "Dano: 10d6 + mod constituição | ML para 2ª lança: 30 ml (cria 2 lanças extras)"
      },
      {
        "nivel": 19,
        "desc": "Dano: 10d8 + mod constituição | ML para 2ª lança: 36 ml (cria 3 lanças extras)"
      }
    ],
    "EXPERIÊNCIA": [
      {
        "nivel": 5,
        "desc": "Extra: Imunidade a efeitos negativos repetidos"
      },
      {
        "nivel": 8,
        "desc": "Extra: Habilidades iguais acertadas contra você: apenas METADE do dano"
      },
      {
        "nivel": 14,
        "desc": "Extra: A imunidade é permanente em vida"
      }
    ],
    "RENASCIMENTO ÉPICO": [
      {
        "nivel": 5,
        "desc": "Extra: Volta com 25% da vida."
      },
      {
        "nivel": 14,
        "desc": "Extra: Volta com a vida completa."
      }
    ]
  },
  "lanceiro": {
    "SINFONIA DA LANÇA": [
      {
        "nivel": 1,
        "desc": "Usos: 2x desc. curto | Dano/metro: 1d4 + mod força + mod dest | Extra: —"
      },
      {
        "nivel": 4,
        "desc": "Usos: 3x desc. curto | Dano/metro: 2d4/metro | Extra: —"
      },
      {
        "nivel": 7,
        "desc": "Usos: 3x desc. curto | Dano/metro: 2d4/metro | Extra: Também faça um corte lateral CERTEIRO no alvo atingido: 2d4+mod força"
      },
      {
        "nivel": 8,
        "desc": "Usos: 4x desc. curto | Dano/metro: 2d6/metro | Extra: —"
      },
      {
        "nivel": 11,
        "desc": "Usos: 4x desc. curto | Dano/metro: 2d6/metro | Extra: Corte lateral: 4d4+mod força"
      },
      {
        "nivel": 12,
        "desc": "Usos: 4x desc. curto | Dano/metro: 2d8/metro | Extra: —"
      },
      {
        "nivel": 16,
        "desc": "Usos: 4x desc. curto | Dano/metro: 3d8/metro | Extra: —"
      },
      {
        "nivel": 19,
        "desc": "Usos: 4x desc. curto | Dano/metro: 3d8/metro | Extra: Corte lateral: 5d4+mod força"
      },
      {
        "nivel": 20,
        "desc": "Usos: 5x desc. curto | Dano/metro: 5d8/metro | Extra: —"
      }
    ],
    "FRAGMENTAR": [
      {
        "nivel": 1,
        "desc": "Defesa removida por golpe: 1 | CA removida (sem defesa): 1 (não acumula)"
      },
      {
        "nivel": 6,
        "desc": "Defesa removida por golpe: 3 | CA removida (sem defesa): 2 (não acumula)"
      },
      {
        "nivel": 12,
        "desc": "Defesa removida por golpe: 5 | CA removida (sem defesa): 3 (não acumula)"
      },
      {
        "nivel": 18,
        "desc": "Defesa removida por golpe: 10 | CA removida (sem defesa): 4 (não acumula)"
      }
    ],
    "TEMPESTADE EUFÓRICA": [
      {
        "nivel": 3,
        "desc": "Extra: Bloqueia projéteis e magias à distância"
      },
      {
        "nivel": 5,
        "desc": "Extra: Pode girar para cima e voar por segundos (duração = mod destreza)"
      }
    ],
    "AVANÇO JEVELIN": [
      {
        "nivel": 5,
        "desc": "Extra: Avanço imparável"
      },
      {
        "nivel": 14,
        "desc": "Extra: Alvo fica atordoado 1 turno"
      }
    ],
    "ONDA": [
      {
        "nivel": 6,
        "desc": "Ataques: 3"
      },
      {
        "nivel": 16,
        "desc": "Ataques: 4 (4 chances, maior prevalece)"
      }
    ],
    "CHUTES DE ELEVAÇÃO": [
      {
        "nivel": 9,
        "desc": "Chutes: 5 | Dano/chute: 2d6 + mod força"
      },
      {
        "nivel": 17,
        "desc": "Chutes: 7 | Dano/chute: 3d6 + mod força"
      }
    ],
    "RESPIRAÇÃO": [
      {
        "nivel": 10,
        "desc": "Extra: 2 turnos"
      },
      {
        "nivel": 20,
        "desc": "Extra: Até o fim do combate"
      }
    ],
    "NO AR": [
      {
        "nivel": 13,
        "desc": "Extra: Pega arremessos (não críticos)"
      },
      {
        "nivel": 17,
        "desc": "Extra: Ganha ação de arremesso após pegar"
      },
      {
        "nivel": 20,
        "desc": "Extra: Pega arremessos críticos"
      }
    ],
    "ÍMPETO DO BURACO NEGRO": [
      {
        "nivel": 5,
        "desc": "Usos: 1x desc. curto | Alcance: 20m | Raio: 4m | Dano/turno: 1d8"
      },
      {
        "nivel": 14,
        "desc": "Usos: 2x desc. curto | Alcance: 30m | Raio: 6m | Dano/turno: 2d8"
      }
    ],
    "AVANÇO ESTELAR": [
      {
        "nivel": 8,
        "desc": "Usos: 1x desc. longo | Distância: 1 km | Extra: —"
      },
      {
        "nivel": 20,
        "desc": "Usos: 2x desc. longo | Distância: 110 km | Extra: Velocidade não afetada pela ausência de gravidade"
      }
    ],
    "INFLAMAÇÃO DRACÔNICA": [
      {
        "nivel": 5,
        "desc": "Dano do golpe: 3d4 adicional | Cone: 4m | Dano do cone: 3d6 mágico"
      },
      {
        "nivel": 14,
        "desc": "Dano do golpe: 6d4 adicional | Cone: 8m | Dano do cone: 7d6 mágico"
      }
    ]
  },
  "manipulador-essencia": {
    "LA MUERTE": [
      {
        "nivel": 1,
        "desc": "Essência: 4 dias | Dano: 1d6 + mod int"
      },
      {
        "nivel": 5,
        "desc": "Essência: 10 dias | Dano: 2d8 + mod int"
      },
      {
        "nivel": 8,
        "desc": "Essência: 15 dias | Dano: 3d8 + mod int"
      },
      {
        "nivel": 12,
        "desc": "Essência: 3 semanas | Dano: 5d8 + mod int"
      }
    ],
    "EVASÃO": [
      {
        "nivel": 2,
        "desc": "Usos: 1x desc. curto | Distância: 5m"
      },
      {
        "nivel": 6,
        "desc": "Usos: 2x desc. curto | Distância: 7m"
      }
    ],
    "ESFERAS ETÉREAS": [
      {
        "nivel": 3,
        "desc": "Essência: 6 dias | Dano/esfera: 1d8 + mod int | Esferas/turno: 2"
      },
      {
        "nivel": 10,
        "desc": "Essência: 9 dias | Dano/esfera: 3d8 + mod int | Esferas/turno: 3"
      }
    ],
    "RESTAURAÇÃO": [
      {
        "nivel": 4,
        "desc": "Usos: 1x desc. curto | Cura: 3d6 + mod int"
      },
      {
        "nivel": 10,
        "desc": "Usos: 2x desc. curto | Cura: 4d6 + mod int"
      }
    ],
    "DESENVOLTURA": [
      {
        "nivel": 5,
        "desc": "Dano ao atacante: 4d4 fogo (2 turnos) | Dano nos golpes: +2d6 incendiário"
      },
      {
        "nivel": 8,
        "desc": "Dano ao atacante: 6d4 fogo (2 turnos) | Dano nos golpes: +2d6 incendiário"
      }
    ],
    "MARIONETE": [
      {
        "nivel": 5,
        "desc": "Essência: 1 mês | Duração: 4 dias | Alvos: 1"
      },
      {
        "nivel": 8,
        "desc": "Essência: 3 meses | Duração: 9 dias | Alvos: 2 (se nível igual ou inferior)"
      }
    ]
  },
  "invocador-funereo": {
    "ESPECTROS DA NOITE": [
      {
        "nivel": 1,
        "desc": "Invocações: 1 por Descanso longo"
      },
      {
        "nivel": 5,
        "desc": "Invocações: 2 por Descanso longo"
      },
      {
        "nivel": 15,
        "desc": "Invocações: 3 por Descanso longo"
      },
      {
        "nivel": 20,
        "desc": "Invocações: 4 por Descanso longo"
      }
    ],
    "GHAST": [
      {
        "nivel": 1,
        "desc": "HP: 12 | CA: — | Ao morrer (dano no alvo): 2d8 | Energia Funérea (dano/ricochete): 1d4 / —"
      },
      {
        "nivel": 4,
        "desc": "HP: 15 HP | CA: 11 CA | Ao morrer (dano no alvo): 3d8 | Energia Funérea (dano/ricochete): 2d4 / 1d6"
      },
      {
        "nivel": 6,
        "desc": "HP: 19 HP | CA: 12 CA | Ao morrer (dano no alvo): 4d8 | Energia Funérea (dano/ricochete): 3d4 / 1d8"
      },
      {
        "nivel": 9,
        "desc": "HP: 22 HP | CA: 13 CA | Ao morrer (dano no alvo): 5d8 | Energia Funérea (dano/ricochete): 4d4 / 1d10"
      },
      {
        "nivel": 12,
        "desc": "HP: 24 HP | CA: — | Ao morrer (dano no alvo): 6d8 | Energia Funérea (dano/ricochete): 5d4 / 1d12"
      },
      {
        "nivel": 16,
        "desc": "HP: 30 HP | CA: — | Ao morrer (dano no alvo): 10d8 | Energia Funérea (dano/ricochete): 6d4 / 2d12"
      }
    ],
    "MALDIÇÃO DOS SINAIS": [
      {
        "nivel": 2,
        "desc": "HP permanente: +8 | Sinais: Braço"
      },
      {
        "nivel": 10,
        "desc": "HP permanente: +10 | Sinais: Pernas e pés"
      },
      {
        "nivel": 15,
        "desc": "HP permanente: +12 | Sinais: Pescoço até olhos"
      },
      {
        "nivel": 20,
        "desc": "HP permanente: +20, +3 em todos os atributos | Sinais: Corpo completo"
      }
    ],
    "AVANÇO DA MORTE": [
      {
        "nivel": 3,
        "desc": "Usos: 2x desc. longo | Dano adicional: 1d8 + mod cons | Extra: —"
      },
      {
        "nivel": 5,
        "desc": "Usos: 3x desc. longo | Dano adicional: 2d8 + mod cons | Extra: —"
      },
      {
        "nivel": 8,
        "desc": "Usos: 3x desc. longo | Dano adicional: 3d8 + mod cons | Extra: Transpassa +1 alvo. Invocação espectral ataca o alvo"
      },
      {
        "nivel": 11,
        "desc": "Usos: 4x desc. longo | Dano adicional: 4d8 + mod cons | Extra: Invocação fantasma: 4d8 mágico por acerto"
      },
      {
        "nivel": 15,
        "desc": "Usos: 4x desc. longo | Dano adicional: 5d8 + mod cons | Extra: Invocações: 5d8 mágico"
      },
      {
        "nivel": 18,
        "desc": "Usos: 4x desc. longo | Dano adicional: 7d8 + mod cons | Extra: Invocações: 7d8 mágico"
      }
    ],
    "NIGHTMARE": [
      {
        "nivel": 4,
        "desc": "HP: 30 | CA extra: — | Dano garras/dentes: 2d4 | Lâmina Sombria (usos/dano): 1x/combate, 3d6"
      },
      {
        "nivel": 8,
        "desc": "HP: 40 | CA extra: 9 | Dano garras/dentes: 3d4 | Lâmina Sombria (usos/dano): 2x/combate, 4d6"
      },
      {
        "nivel": 14,
        "desc": "HP: 48 | CA extra: 10 | Dano garras/dentes: 4d4 | Lâmina Sombria (usos/dano): 2x/combate, 6d6"
      },
      {
        "nivel": 17,
        "desc": "HP: 52 | CA extra: 11 | Dano garras/dentes: 7d4 | Lâmina Sombria (usos/dano): 2x/combate, 8d6"
      }
    ],
    "SOBREPUJAR": [
      {
        "nivel": 5,
        "desc": "Dano da pá: 1d4 + mod cons | Cura: 3d4 + mod cons | Extra: —"
      },
      {
        "nivel": 9,
        "desc": "Dano da pá: 2d4 + mod cons | Cura: 6d4 + mod cons | Extra: —"
      },
      {
        "nivel": 12,
        "desc": "Dano da pá: 3d4 + mod cons | Cura: 12d4 + mod cons | Extra: —"
      },
      {
        "nivel": 17,
        "desc": "Dano da pá: 4d4 + mod cons | Cura: 18d4 + mod cons | Extra: Atordoa 1 turno"
      },
      {
        "nivel": 20,
        "desc": "Dano da pá: 5d4 + mod cons | Cura: 24d4 + mod cons | Extra: 3x desc. longo. Atordoa"
      }
    ],
    "ABOVE ALL": [
      {
        "nivel": 13,
        "desc": "HP: 100 | CA: 15 | Dano Soco: 4d10 | Dano Heaven on a Landside: 10d20"
      },
      {
        "nivel": 18,
        "desc": "HP: 140 | CA: 17 | Dano Soco: 6d10 | Dano Heaven on a Landside: 15d20"
      }
    ],
    "SANGUE FUNÉREO": [
      {
        "nivel": 5,
        "desc": "Usos: 1x desc. curto | Área: 3x3 | Duração: 2 turnos | Cura/alvo/turno: 1d4"
      },
      {
        "nivel": 8,
        "desc": "Usos: 2x desc. curto | Área: 6x6 | Duração: 2 turnos | Cura/alvo/turno: 1d6"
      },
      {
        "nivel": 14,
        "desc": "Usos: 2x desc. curto | Área: 12x12 | Duração: 3 turnos | Cura/alvo/turno: 1d8"
      }
    ],
    "PÁ DOS RITOS SANGUINÁRIOS": [
      {
        "nivel": 8,
        "desc": "Dano adicional: 1d8 + mod cons | Cura por acerto: 1d4"
      },
      {
        "nivel": 14,
        "desc": "Dano adicional: 3d8 + mod cons | Cura por acerto: 3d4"
      }
    ],
    "VANGUARDA FUNÉREA": [
      {
        "nivel": 5,
        "desc": "Defesa por uso: +2 | Limite: 20"
      },
      {
        "nivel": 8,
        "desc": "Defesa por uso: +3 | Limite: 30"
      },
      {
        "nivel": 14,
        "desc": "Defesa por uso: +4 | Limite: 40"
      }
    ]
  }
};

export const SHIKATA_SOURCE_V6 = "TALOS_SISTEMA_v6_COMPLETO.docx";
