// Tabelas de evolução por habilidade
// Formato: { [shikataId]: { [nomeHabilidade]: [ {nivel, desc}, ... ] } }

export const EVOLUCOES = {

  guerreiro: {
    'Defesa Imbatível (Passiva)': [
      { nivel: 1, desc: '+CA pelo nível do escudo (peq +1, méd +2, grd +3)' },
      { nivel: 11, desc: 'Escudos viram armas. Peq/méd/grd concedem +10/15/20 defesa' },
    ],
    'Duelo Intrépido (Passiva)': [
      { nivel: 1, desc: '+1d4 de dano (duas mãos: +3d4)' },
      { nivel: 11, desc: '+2d6 de dano (duas mãos: +5d6)' },
    ],
    'Cortes Crepusculares': [
      { nivel: 2, desc: '2 golpes em X. Crítico = 3º golpe vertical' },
      { nivel: 19, desc: '3 golpes. Crítico = 4º golpe vertical' },
    ],
    'Contra-Golpe Hábil': [
      { nivel: 2, desc: '1x desc. curto — até 5 níveis acima, não colossais, não furtivos' },
      { nivel: 6, desc: '2x desc. curto — qualquer nível, não colossais' },
      { nivel: 12, desc: '3x desc. curto — funciona contra colossais' },
      { nivel: 20, desc: '4x desc. curto — funciona contra furtivos' },
    ],
    'Impulso Explosivo': [
      { nivel: 2, desc: '1x desc. longo — ganha 1 ação completa extra' },
      { nivel: 10, desc: '2x desc. longo — +1d4 de dano nesse turno. Usar 2x no mesmo turno: 2d4 em si' },
    ],
    'Vigor Resiliente (Passiva)': [
      { nivel: 3, desc: 'Cura = mod CON' },
      { nivel: 5, desc: 'Cura = 2 + mod CON' },
      { nivel: 9, desc: 'Cura = 4 + mod CON' },
      { nivel: 13, desc: 'Cura = 6 + mod CON' },
      { nivel: 20, desc: 'Cura = 10 + mod CON. Excedente soma ao escudo da Firmeza Escrupulosa' },
    ],
    'Impulso Escrupuloso': [
      { nivel: 7, desc: '1d4 + mod CON de dano físico (ação bônus)' },
      { nivel: 12, desc: '2d4 + mod CON. Crítico atordoa alvo 1 turno' },
    ],
    'Turbilhão de Ataques': [
      { nivel: 7, desc: 'Área 2×2m — 4d10 + mod força — empurra 1m' },
      { nivel: 19, desc: 'Área 3×3m — 12d8 + mod força — atordoa 1 turno' },
    ],
    '[Empalador] Saraivada Devastadora': [
      { nivel: 5, desc: '2 ataques simultâneos' },
      { nivel: 8, desc: '3 ataques' },
      { nivel: 14, desc: '4 ataques' },
    ],
    '[Colossal] Força de Vitalidade (Passiva)': [
      { nivel: 5, desc: 'Cada cura recebida: +1d6 adicional' },
      { nivel: 8, desc: '+2d6 adicional' },
      { nivel: 14, desc: '+2d8 adicional' },
    ],
    '[Colossal] Explosão Heróica': [
      { nivel: 5, desc: 'Explosão 5×5m, dano = total do escudo' },
      { nivel: 8, desc: '+5 defesa por 3 turnos após explosão' },
      { nivel: 14, desc: '+10 defesa pelo resto do combate' },
    ],
  },

  ladino: {
    'Ataque Furtivo (Passiva)': [
      { nivel: 1, desc: '1d8 + mod destreza' },
      { nivel: 3, desc: '2d8 + mod destreza' },
      { nivel: 7, desc: '4d8 + mod destreza' },
      { nivel: 11, desc: '5d8 + mod destreza' },
      { nivel: 15, desc: '6d8 + mod destreza' },
      { nivel: 18, desc: '7d8 + mod destreza' },
      { nivel: 20, desc: '8d8 + mod destreza' },
    ],
    'Proeza (Passiva)': [
      { nivel: 1, desc: '+1 em testes de ladinagem' },
      { nivel: 6, desc: '+2 em testes de ladinagem' },
      { nivel: 12, desc: '+3 em testes de ladinagem' },
    ],
    'Assalto Relâmpago': [
      { nivel: 1, desc: '1x desc. curto — +25% dano (mín 2), alcance 3m' },
      { nivel: 5, desc: '1x desc. curto — +50% dano (mín 4), alcance 5m' },
      { nivel: 10, desc: '2x desc. curto — +75% dano (mín 8), invisível ao executar' },
      { nivel: 15, desc: '2x desc. curto — +100% dano (mín 15), alcance 10m' },
      { nivel: 20, desc: '2x desc. curto — +150% dano (mín 15), alcance infinito (40m fora)' },
    ],
    'Mobilidade da Escapada': [
      { nivel: 2, desc: '2x desc. curto — esquiva no solo' },
      { nivel: 11, desc: '3x desc. curto — pode avançar em alvo ou até 2× mobilidade' },
      { nivel: 17, desc: '4x desc. curto — até 3× mobilidade, funciona no ar' },
    ],
    'Crítico Aprimorado (Passiva)': [
      { nivel: 4, desc: '18, 19, 20 = crítico' },
      { nivel: 14, desc: '10, 18, 19, 20 = crítico' },
    ],
    'Golpe Penetrante (Passiva)': [
      { nivel: 9, desc: 'Ignora atributo Defesa' },
      { nivel: 12, desc: 'Anula cura do alvo até fim do combate. Feridas não curam por 24h' },
      { nivel: 16, desc: 'Penetra barreiras mágicas, escudos sobrepostos e proteções' },
      { nivel: 19, desc: 'Ignora metade da CA inimiga' },
    ],
    '[Assassino] Metamorfose Suprema': [
      { nivel: 5, desc: 'Desfaz se atacar ou for atacado' },
      { nivel: 14, desc: 'Desfaz apenas por toque direto, ataque próprio ou por vontade' },
    ],
  },

  inclemente: {
    'Despertar (Passiva)': [
      { nivel: 1, desc: 'Ao falhar em teste de acerto físico: entra em Fúria' },
      { nivel: 16, desc: 'Ao falhar em qualquer tipo de teste' },
    ],
    'Fúria': [
      { nivel: 1, desc: '2x desc. longo — 2 turnos — cura 3d6/turno' },
      { nivel: 5, desc: '2x desc. longo — 3 turnos — cura 4d6/turno' },
      { nivel: 8, desc: '2x desc. longo — 3 turnos — cura 5d6/turno' },
      { nivel: 14, desc: '2x desc. longo — 4 turnos — cura 6d6/turno' },
      { nivel: 18, desc: '2x desc. longo — 5 turnos — cura 6d8/turno — IMPARÁVEL enquanto em fúria' },
    ],
    'A Essência da Força (Passiva)': [
      { nivel: 1, desc: 'Destrói madeira, pedra e materiais frágeis com as mãos' },
      { nivel: 12, desc: 'Destrói até aço' },
      { nivel: 16, desc: 'Olhar aterroriza criaturas inferiores sem teste' },
    ],
    'Resiliência Inquebrável (Passiva)': [
      { nivel: 2, desc: 'Ao receber crítico: +10 defesa até fim do combate' },
      { nivel: 5, desc: '+15 defesa' },
      { nivel: 8, desc: '+20 defesa' },
      { nivel: 11, desc: '+30 defesa' },
    ],
    'Golpe Poderoso': [
      { nivel: 3, desc: '2x desc. curto — 2d6 + mod força — empurra 2m' },
      { nivel: 7, desc: '2x desc. curto — 4d6 + mod força — empurra 4m' },
      { nivel: 11, desc: '2x desc. curto — 6d8 + mod força — empurra 5m — atordoa 1 turno' },
    ],
    'Golpe Devastador': [
      { nivel: 6, desc: '1x desc. longo — área 5×5m — 6d10 + mod força' },
      { nivel: 10, desc: '1x desc. longo — área 6×6m — 8d10 + mod força' },
    ],
    'Demolição': [
      { nivel: 15, desc: '1x desc. curto — área 8×8m — 10d10 + mod força' },
      { nivel: 20, desc: '1x desc. longo — área 8×8m — 20d6 + mod força — atordoa 1 turno' },
    ],
    '[Fornalha] Escudo da Fornalha': [
      { nivel: 5, desc: '1x desc. curto — 3d4 + mod força, 2 turnos, explosão 2×2m' },
      { nivel: 8, desc: '1x desc. curto — 6d4 + mod força, IMPARÁVEL, +5 defesa, explosão voluntária (2× dano)' },
      { nivel: 14, desc: '2x desc. curto — 10d4 + mod força, 3 turnos, explosão 4×4m, +10 defesa' },
    ],
    '[Lançador] O Maníaco dos Arremessos': [
      { nivel: 5, desc: '1 alvo por turno' },
      { nivel: 8, desc: '2 alvos por turno' },
      { nivel: 14, desc: '3 alvos por turno' },
    ],
  },

  cacador: {
    'Espírito de Sobrevivência (Passiva)': [
      { nivel: 1, desc: '+3 de acerto em ambientes selvagens/inexplorados' },
      { nivel: 7, desc: '+4 de acerto em ambientes selvagens/inexplorados' },
      { nivel: 13, desc: '+4 de acerto — também em dungeons e cidades destruídas' },
    ],
    'Caçada (Passiva)': [
      { nivel: 1, desc: '+1d4 de dano contra feras irracionais' },
      { nivel: 4, desc: '+2d4 de dano contra feras' },
      { nivel: 9, desc: '+3d4 de dano contra feras' },
    ],
    'Corte Perfurante': [
      { nivel: 2, desc: '2x desc. curto — 2d6 + mod força — sangramento 2 turnos' },
      { nivel: 6, desc: '3x desc. curto — 4d6 + mod força — sangramento 3 turnos' },
      { nivel: 10, desc: '4x desc. curto — 6d6 + mod força — sangramento 4 turnos' },
      { nivel: 14, desc: '4x desc. curto — 8d6 + mod força — sangramento 5 turnos' },
      { nivel: 18, desc: '4x desc. curto — 10d6 + mod força — sangramento até fim do combate' },
    ],
    'Inimigo Favorito (Passiva)': [
      { nivel: 2, desc: '+3d4 dano e +2 acerto contra favorito' },
      { nivel: 11, desc: 'Eliminar favorito = +1 ponto de atributo permanente' },
      { nivel: 18, desc: 'Eliminar favorito aterroriza todos inimigos em 30m (nível inferior)' },
    ],
    'Ataque Sequenciado': [
      { nivel: 3, desc: '3x desc. curto' },
      { nivel: 9, desc: '4x desc. curto' },
      { nivel: 19, desc: '4x desc. curto — ataques sequenciados são CERTEIROS' },
    ],
    'Rastreamento (Passiva)': [
      { nivel: 5, desc: 'Raio de 50m' },
      { nivel: 9, desc: 'Raio de 100m' },
      { nivel: 16, desc: 'Raio de 200m' },
    ],
    'Marca do Caçador (Passiva)': [
      { nivel: 6, desc: '10 marcas = 10d4 e críticos certeiros na região' },
      { nivel: 15, desc: '10 marcas = 20d4 e críticos certeiros na região' },
    ],
    'Sentidos Sobrenaturais (Passiva)': [
      { nivel: 10, desc: 'Detecta ocultos/invisíveis em 8m' },
      { nivel: 15, desc: 'Raio de 15m' },
      { nivel: 20, desc: 'Raio de 15m — detecta seres sobrenaturais' },
    ],
    '[Monstros] Defesa Contra Seres das Profundezas (Passiva)': [
      { nivel: 5, desc: '+5 defesa e +2 CA contra monstros' },
      { nivel: 8, desc: '+10 defesa e +2 CA' },
      { nivel: 14, desc: '+15 defesa e +2 CA — se só monstros: dobra defesa e CA' },
    ],
  },

  vanguarda: {
    'Coragem de Ferro': [
      { nivel: 1, desc: '2x desc. curto — +1 CA — reduz 20% dano (mín 3) — 2 turnos' },
      { nivel: 3, desc: '2x desc. curto — +2 CA — 25% (mín 6) — 3 turnos' },
      { nivel: 7, desc: '2x desc. curto — +2 CA — 30% (mín 9) — 3 turnos' },
      { nivel: 10, desc: '3x desc. curto — +2 CA — 35% (mín 12) — 3 turnos' },
      { nivel: 13, desc: '3x desc. longo — +3 CA — 40% (mín 15) — 3 turnos' },
      { nivel: 20, desc: '3x desc. longo — +3 CA — 50% (mín 20) — 4 turnos' },
    ],
    'Vida Permanente (Passiva)': [
      { nivel: 1, desc: '+2 HP por nível evoluído' },
      { nivel: 8, desc: '+3 HP por nível evoluído' },
    ],
    'Dano Constante (Passiva)': [
      { nivel: 2, desc: '+1% do HP máx de dano (mín 2)' },
      { nivel: 5, desc: '+5% do HP máx (mín 4)' },
      { nivel: 10, desc: '+10% do HP máx (mín 5)' },
      { nivel: 15, desc: '+15% do HP máx (mín 6)' },
      { nivel: 20, desc: '+20% do HP máx' },
    ],
    'Espírito Colossal (Passiva)': [
      { nivel: 2, desc: 'Abaixo de 50% HP: +10 defesa' },
      { nivel: 8, desc: '+15 defesa' },
      { nivel: 13, desc: '+20 defesa' },
    ],
    'Energia Refletora (Passiva)': [
      { nivel: 8, desc: 'Máx 6 pontos — alcance 3m' },
      { nivel: 16, desc: 'Máx 3 pontos — alcance 10m' },
      { nivel: 19, desc: 'Sem limite — alcance 20m' },
    ],
  },

  monge: {
    'Ki (Passiva)': [
      { nivel: 1, desc: '1 ataque KI por turno' },
      { nivel: 6, desc: '2 ataques KI por turno' },
      { nivel: 20, desc: '3 ataques KI por turno' },
    ],
    'Artista Marcial (Passiva)': [
      { nivel: 1, desc: '+1d4 de dano em cada ataque físico' },
      { nivel: 4, desc: '+2d4' },
      { nivel: 8, desc: '+3d4' },
      { nivel: 12, desc: '+4d4' },
      { nivel: 16, desc: '+5d4' },
    ],
    '[CHI] Disparo de Ki': [
      { nivel: 3, desc: '2x desc. longo — 2d6 + mod dest — +2 dano por 1 turno' },
      { nivel: 6, desc: '2x desc. longo — 3d6 + mod dest — +4 dano' },
      { nivel: 10, desc: '3x desc. longo — 3d8 + mod dest — +5 dano por 2 turnos' },
      { nivel: 14, desc: '3x desc. longo — 2 disparos por ação' },
      { nivel: 20, desc: '3x desc. longo — 6d8 + mod dest' },
    ],
    '[CHI] Proteção de Ki': [
      { nivel: 4, desc: '1x desc. longo — +10 defesa — 2 turnos' },
      { nivel: 7, desc: '1x desc. longo — +12 defesa — 2 turnos' },
      { nivel: 11, desc: '2x desc. longo — +15 defesa — 2 turnos' },
      { nivel: 18, desc: '1x desc. curto — +20 defesa — resto do combate' },
    ],
    'Crítico Aprimorado (Passiva)': [
      { nivel: 5, desc: '19 = crítico' },
    ],
    '[CHI] Flip Kick': [
      { nivel: 6, desc: '4d6 + mod dest — arremessa 7m' },
      { nivel: 11, desc: '5d6 + mod dest — arremessa 7m — atinge 2 alvos' },
    ],
    '[CHI] Keyten Espiral': [
      { nivel: 8, desc: '1x desc. longo — raio 3m — 6d6 + mod magia — empurra 1m' },
      { nivel: 15, desc: '1x desc. longo — raio 6m — 10d6 + mod magia — empurra 2m' },
    ],
    '[CHI] Uppercut': [
      { nivel: 9, desc: '1x desc. longo — +4d8 — lança 10m — inconsciente 2 turnos' },
      { nivel: 16, desc: '1x desc. longo — +5d8 — lança 15m — inconsciente 3 turnos' },
    ],
    'Tormentor Strikes': [
      { nivel: 12, desc: '1x desc. curto — 2 socos' },
      { nivel: 18, desc: '1x desc. curto — 3 socos' },
    ],
    'Thunderclap': [
      { nivel: 13, desc: '2x desc. longo — raio 5m — atordoa + sangramento 2 turnos' },
      { nivel: 20, desc: '2x desc. longo — raio 15m — sangramento no ouvido' },
    ],
  },

  necromante: {
    'Canalização Suprema (Passiva)': [
      { nivel: 6, desc: '+1 magia por turno sem ação bônus — máx nível 5' },
      { nivel: 12, desc: 'Máx nível 8' },
      { nivel: 20, desc: 'Máx nível 16' },
    ],
    'Alma Perdida': [
      { nivel: 8, desc: 'Escravo = 1 alma (6h) | Ser Intelectual = 10 almas (3 dias)' },
      { nivel: 13, desc: 'Custos pela metade — Escravo gratuito — ritual em 30min' },
    ],
    'Bola de Fogo': [
      { nivel: 1, desc: '1d8 + int — alvo único' },
      { nivel: 5, desc: '4d8 + int — área 3×3m — empurra alvos' },
      { nivel: 10, desc: '2x desc. longo — 8 bolas de fogo (2d10 + magia + int cada)' },
    ],
  },

  mago: {
    'Bola de Fogo': [
      { nivel: 1, desc: 'Pequena Bola de Fogo — 1d8 + int — alvo único' },
      { nivel: 5, desc: 'Bola de Fogo — 4d8 + int — área 3×3m — empurra alvos' },
      { nivel: 10, desc: '2x desc. longo — Onda de Bolas de Fogo — 8 bolas (2d10 + magia + int cada)' },
    ],
    'Luz Etérea': [
      { nivel: 1, desc: 'Ação bônus — raio 3m — 1 turno' },
      { nivel: 7, desc: '1x desc. longo — raio 10m — 3 turnos' },
    ],
    'Ilusão': [
      { nivel: 2, desc: 'Objetos simples inanimados (copos, pratos, armas)' },
      { nivel: 6, desc: 'Objetos médios (porta, cadeira, barril)' },
      { nivel: 11, desc: 'Objetos grandes animados (humanos, animais)' },
      { nivel: 15, desc: 'Estruturas enormes (casas, cavernas), requer concentração' },
      { nivel: 19, desc: 'Ilusões complexas (castelos, cidades), concentração intensa' },
    ],
    'Canalização Suprema (Passiva)': [
      { nivel: 6, desc: '+1 magia por turno (sem ação bônus) — máx nível 5' },
      { nivel: 12, desc: 'Máx nível 8' },
      { nivel: 20, desc: 'Máx nível 16' },
    ],
    '[Rúnico] Prisão de Runa': [
      { nivel: 5, desc: '1x a cada 3 turnos — aprisiona 1 turno' },
      { nivel: 14, desc: 'Em alvo marcado: 2 turnos preso, dobro do dano' },
    ],
    '[Rúnico] Fluxo de Feitiço': [
      { nivel: 8, desc: '2x por turno — 3d6 + magia' },
      { nivel: 14, desc: '3x por turno — 3d8 + magia' },
    ],
    '[Rúnico] Marcações (Passiva)': [
      { nivel: 8, desc: 'Alvos marcados: +3d4 ao Sobrecarregar' },
      { nivel: 14, desc: '+4d4 + int. Prisão de Runa em marcado = 2 turnos + dobro dano' },
    ],
    '[Sangue] Controle Perfeito': [
      { nivel: 5, desc: 'Objetos pequenos e médios' },
      { nivel: 14, desc: 'Qualquer tamanho (+1 HP por 3kg adicionais)' },
    ],
  },

  feiticeiro: {
    'Raio Místico': [
      { nivel: 1, desc: 'Alcance 6m - 1d12 + magia' },
      { nivel: 3, desc: 'Alcance 7m - 1d12 + magia - arremessa 5m; pode realizar conjuração dupla' },
      { nivel: 5, desc: 'Alcance 8m - 2d12 + magia' },
      { nivel: 7, desc: 'Alcance 9m - 2d12 + magia - cura metade do dano causado' },
      { nivel: 9, desc: 'Alcance 12m - 3d12 + magia' },
      { nivel: 11, desc: 'Alcance 14m - 4d12 + magia - reduz armadura do alvo em 1 cumulativamente' },
      { nivel: 13, desc: 'Alcance 16m - 5d12 + magia' },
      { nivel: 15, desc: 'Alcance 16m - 5d12 + magia - teste de resistência mágica dif. 5+magia ou atordoa no arremesso' },
      { nivel: 17, desc: 'Alcance 30m - 6d12 + magia - atinge inimigos até 2m do impacto com o mesmo dano' },
    ],
    'Névoa Gelada': [
      { nivel: 1, desc: '1d4 + magia - 1 turno - congela uma parte pequena' },
      { nivel: 7, desc: '2d10 + magia - 2 turnos - congela uma parte inteira' },
      { nivel: 12, desc: '3d10 + magia - 3 turnos - congela o corpo inteiro' },
    ],
    'Repreensão Pactual': [
      { nivel: 2, desc: '2x descanso longo - 2d10 + magia' },
      { nivel: 6, desc: '3x descanso longo - 4d10 + magia' },
    ],
    'Teleporte': [
      { nivel: 3, desc: 'Ação bônus - até 6m' },
      { nivel: 9, desc: 'Pode ser reação - até 12m' },
    ],
    '[Temporal] Retroceder': [
      { nivel: 5, desc: '1 alvo aliado ou inimigo' },
      { nivel: 8, desc: 'Pode retroceder a si mesmo' },
      { nivel: 14, desc: '2 alvos, incluindo si; pode retroceder a morte, exceto a própria' },
    ],
  },

  bardo: {
    'Batida Estrondante': [
      { nivel: 2, desc: '1x desc. curto — 1d4 + mod car — alvo único' },
      { nivel: 7, desc: '1x desc. curto — 3d4 + mod car' },
      { nivel: 15, desc: '1x desc. curto — 5d6 + 2× mod car — área 2×2m' },
      { nivel: 19, desc: '1x desc. curto — 10d4 + 2× mod car — área 3×3m — qualquer objeto' },
    ],
    'Horizonte de Eventos': [
      { nivel: 3, desc: '1x desc. longo — efeito base 5 turnos' },
      { nivel: 13, desc: '1x desc. longo — ao fim dos 5 turnos: 2ª onda, +3 mobilidade a todos' },
    ],
    'Caminho das Cordas': [
      { nivel: 4, desc: '1x desc. longo — dura 5 turnos (15min)' },
      { nivel: 13, desc: '2x desc. longo — dura 10 turnos (20min)' },
    ],
    'Performance (Recurso)': [
      { nivel: 1, desc: 'Acúmulos normais' },
      { nivel: 12, desc: 'Acúmulos DOBRADOS' },
      { nivel: 17, desc: 'Acúmulos não se esvaecem mais' },
      { nivel: 19, desc: 'Acúmulos TRIPLICADOS' },
    ],
    '[Artista] Sinfonia Mortal': [
      { nivel: 8, desc: '30 Performance — 1x por turno — lâminas 5× mod car por alvo' },
      { nivel: 14, desc: '50 Performance — sem limite por turno (1 uso por Arma Sonora)' },
    ],
    '[Poeta] Coalescência': [
      { nivel: 8, desc: '1 aliado — divide apenas o dano do aliado' },
      { nivel: 14, desc: 'Divide dano de ambos — até 4 aliados' },
    ],
  },

  paladino: {
    'Efeito Colateral (Passiva)': [
      { nivel: 1, desc: 'Não acumula' },
      { nivel: 10, desc: 'Acumula infinitamente' },
    ],
    'Revitalizar': [
      { nivel: 1, desc: '1x desc. longo — 2d4 + magia + car' },
      { nivel: 4, desc: '1x desc. longo — 4d4 + magia + car' },
      { nivel: 7, desc: '2x desc. longo — 4d4 + magia + car' },
      { nivel: 10, desc: '2x desc. longo — 6d4 + magia + car' },
      { nivel: 13, desc: '3x desc. longo — 7d4 + magia + car — cura efeitos mentais' },
      { nivel: 16, desc: '3x desc. longo — 9d4 + magia + car — pode ser ação bônus' },
      { nivel: 19, desc: '4x desc. longo — 10d4 + magia + car' },
    ],
    'Marcação da Neutralidade (Passiva)': [
      { nivel: 2, desc: 'Efeito base' },
      { nivel: 6, desc: 'Quebrar marca aplica Efeito Colateral 1 turno' },
    ],
    'Corte Luar': [
      { nivel: 3, desc: '3x desc. longo — 2d6 + magia — área 2×2m' },
      { nivel: 6, desc: '3x desc. longo — 4d6 + magia — crítico = 2 usos por 1' },
      { nivel: 9, desc: '3x desc. longo — 6d6 + magia — área 4×4m' },
      { nivel: 12, desc: '4x desc. longo — 7d6 + magia — aplica efeito colateral antes' },
    ],
    'Retribuição da Divindade (Passiva)': [
      { nivel: 3, desc: '1x por inimigo/combate' },
      { nivel: 5, desc: 'Aplica efeito colateral 1 turno' },
      { nivel: 7, desc: 'Sem limite de uso' },
      { nivel: 9, desc: 'Efeito colateral 2 turnos' },
      { nivel: 12, desc: 'Efeito colateral até fim do combate' },
    ],
    'Vitalidade (Passiva)': [
      { nivel: 5, desc: 'Imune a veneno' },
      { nivel: 10, desc: 'Imune a toda doença' },
    ],
    'Purge': [
      { nivel: 7, desc: '2x desc. longo — 7d4 + mod magia + mod força — linha reta 20m' },
      { nivel: 13, desc: '2x desc. longo — 10d4 + mod magia + mod força — acerto = Neutralizar' },
      { nivel: 19, desc: '2x desc. longo — 10d8 + mod magia + mod força — +1 disparo por uso' },
    ],
    'Energia Pura': [
      { nivel: 9, desc: '2x desc. longo — intercepta magias' },
      { nivel: 14, desc: '3x desc. longo — também intercepta ataques físicos' },
    ],
    'Devastação do Zodíaco': [
      { nivel: 11, desc: '1x desc. longo — 3 testes — dif 10 — 2d8 + car por raio' },
      { nivel: 14, desc: '1x desc. longo — 4 testes — dif 12 — 3d8 + car' },
      { nivel: 18, desc: '2x desc. longo — 4 testes — dif 12 — 3d8 + car' },
    ],
    'Divine Smite': [
      { nivel: 12, desc: '1x desc. longo — área circular 15m — 10d8 + mod magia + mod força' },
      { nivel: 17, desc: '2x desc. longo — 20d8 + mod magia + mod força' },
    ],
    '[Inquisidor] Obra Divina': [
      { nivel: 5, desc: '2x desc. curto — 5d4 + mod magia — danos superficiais a construções' },
      { nivel: 8, desc: '3x desc. curto — 9d4 + mod magia — grandes danos a construções' },
      { nivel: 14, desc: '4x desc. curto — 14d4 + mod magia — tremores em 35m ao atingir solo' },
    ],
    '[Inquisidor] Inquisidor da Morte (Passiva)': [
      { nivel: 8, desc: 'Máx 3 dados adicionais por acúmulo' },
      { nivel: 14, desc: 'Máx 5 dados adicionais' },
    ],
  },

  espadachim: {
    'Perícia da Espada (Passiva)': [
      { nivel: 1, desc: '+2 mobilidade com espadas/katanas' },
      { nivel: 3, desc: '+2 mobilidade — +1 dado de dano base' },
      { nivel: 5, desc: '+2 mobilidade — +1 dado — pode atacar 2× numa ação' },
    ],
    'Perfuração da Lâmina': [
      { nivel: 1, desc: '2x desc. longo — 2d4 + mod dest — crítico +1d4' },
      { nivel: 4, desc: '3x desc. longo — 3d4 + mod dest — crítico +2d4 — pode ser ação bônus' },
      { nivel: 8, desc: '3x desc. longo — 5d4 + mod dest — crítico +2d4' },
      { nivel: 12, desc: '3x desc. longo — 7d4 + mod dest — crítico +3d4' },
      { nivel: 14, desc: '3x desc. longo — 8d4 + mod dest — crítico +5d4' },
      { nivel: 19, desc: '3x desc. longo — 10d4 + mod dest — crítico +7d4' },
    ],
    'Crítico Aprimorado (Passiva)': [
      { nivel: 3, desc: '19, 20 = crítico' },
      { nivel: 9, desc: '18, 19, 20 = crítico' },
      { nivel: 12, desc: '18-20 = crítico — crítico cura metade do dano causado' },
      { nivel: 18, desc: '17, 18, 19, 20 = crítico' },
    ],
    'Tempestade de Aço': [
      { nivel: 6, desc: '2x desc. longo — 2d4 de dano adicional — crítico = sangramento 2 turnos' },
      { nivel: 17, desc: '3x desc. longo — 10d4 de dano — desvia projéteis — sangramento até fim do combate' },
    ],
    'Corte Lateral': [
      { nivel: 7, desc: 'DES ≤10: 1d6 + mod dest, alcance 4m' },
      { nivel: 7, desc: 'DES 11-15: 4d6 + mod dest, alcance 9m' },
      { nivel: 7, desc: 'DES 16-20: 8d8 + mod dest, alcance 20m' },
      { nivel: 7, desc: 'DES 21+: 16d10 + mod dest (DANO REAL), alcance 50m' },
    ],
    'Arma Pesada (Passiva)': [
      { nivel: 8, desc: 'Críticos causam 3× dano' },
      { nivel: 20, desc: 'Críticos causam 4× dano' },
    ],
    '[Sombras] Criaturas das Sombras': [
      { nivel: 5, desc: '1x desc. curto — cria 1 criatura' },
      { nivel: 8, desc: '1x desc. curto — cria 2 criaturas' },
      { nivel: 14, desc: '1x desc. curto — cria 3 criaturas — pode trocar de lugar' },
    ],
    '[Tempestade] Clima Instável (Passiva)': [
      { nivel: 5, desc: 'Chuva: +2 atributos | Nublado: +3 CA | Trovoada: +1 ação extra' },
    ],
  },

  ceifeiro: {
    'Ataque Espectral': [
      { nivel: 1, desc: '2x desc. longo — distância: 4d4 + magia — corpo-a-corpo: 2d4 + magia' },
      { nivel: 7, desc: '2x desc. longo — distância: 6d6 + magia — corpo-a-corpo: 3d6 + magia' },
      { nivel: 14, desc: '3x desc. longo — distância: 6d8 + magia — corpo-a-corpo: 4d6 + magia — atinge 2 criaturas' },
      { nivel: 20, desc: '3x desc. longo — distância: 10d10 + magia — corpo-a-corpo: 6d10 + magia — atinge TODOS' },
    ],
    'Área Espectral': [
      { nivel: 9, desc: '2x desc. longo — 10d4 + magia em cortes instantâneos' },
    ],
  },

  bruxo: {
    'Sinais': [
      { nivel: 1, desc: '1 sinal por turno. IGNITE, ARXIS, BREN, ECRYPT' },
      { nivel: 5, desc: '2 sinais por turno + versões alternativas de cada sinal' },
      { nivel: 20, desc: 'INTENSIFICAÇÃO: combina 2 sinais em 1 (6 combinações possíveis)' },
    ],
    'Mutação (Passiva)': [
      { nivel: 1, desc: 'Barra de mutação ativa — cada nível evolui 1 sinal (máx 6 por sinal)' },
      { nivel: 7, desc: 'Cada nível de mutação = +1d10 de vida máxima' },
    ],
    'Evasão': [
      { nivel: 3, desc: '2x desc. curto — desvia corpo-a-corpo' },
      { nivel: 6, desc: '3x desc. curto' },
      { nivel: 14, desc: '3x desc. curto — também desvia flechas e magias' },
    ],
    'Crítico Aprimorado (Passiva)': [
      { nivel: 4, desc: '19, 20 = crítico' },
      { nivel: 12, desc: '18, 19, 20 = crítico' },
    ],
    'Lesão (Passiva)': [
      { nivel: 5, desc: 'Críticos: onda de choque — atordoa 2 turnos' },
      { nivel: 12, desc: 'Membro atingido debilitado 1 turno' },
    ],
    'Aplicação Letal': [
      { nivel: 6, desc: '1x desc. curto — 2d6 + mod força — 2 giros CERTEIROS' },
      { nivel: 11, desc: '2x desc. curto — 4d6 + mod força — giros adicionais com teste (dif 10+2/giro)' },
      { nivel: 18, desc: '2x desc. curto — 6d6 + mod força — 2º giro sem redução de dano' },
    ],
    'Visão': [
      { nivel: 2, desc: 'Raio de 6m' },
      { nivel: 8, desc: 'Raio de 10m' },
      { nivel: 17, desc: 'Raio de 30m' },
    ],
    'Ataque Devastação': [
      { nivel: 13, desc: '2x desc. longo — 6d6 + mod força — 2× efeitos ao contato' },
      { nivel: 19, desc: '2x desc. longo — 10d6 + mod força — crítico = 3× efeitos' },
    ],
    'Ataque Inesperado': [
      { nivel: 16, desc: 'Ao receber crítico: teste dif 16 — sucesso = 1 ação extra' },
      { nivel: 20, desc: 'Sempre ganha ação extra ao receber crítico' },
    ],
  },

  fulgor: {
    'Eletrocutar': [
      { nivel: 1, desc: '3x desc. curto — 1d6 + mod magia' },
      { nivel: 3, desc: '3x desc. curto — 2d6 + mod magia' },
      { nivel: 6, desc: '3x desc. curto — 3d6 + mod magia' },
      { nivel: 9, desc: '4x desc. curto — 4d6 + mod magia' },
      { nivel: 12, desc: '4x desc. curto — 5d8 + mod magia' },
      { nivel: 16, desc: '4x desc. curto — 6d8 + mod magia' },
      { nivel: 20, desc: '4x desc. curto — 8d8 + mod magia' },
    ],
    'Fulgor (Passiva)': [
      { nivel: 1, desc: 'Ricocheteia 1× para o inimigo mais próximo (metade do dano)' },
      { nivel: 8, desc: 'Ricocheteia com dano TOTAL' },
      { nivel: 13, desc: 'Ricocheteia para +1 inimigo' },
      { nivel: 20, desc: 'Ricocheteia para TODOS os inimigos no combate' },
    ],
    'Condutividade (Passiva)': [
      { nivel: 2, desc: 'Alvo atingido: +1d4 dano extra até fim do combate' },
      { nivel: 6, desc: '+2d4 dano extra' },
    ],
    'Crítico Aprimorado (Passiva)': [
      { nivel: 3, desc: 'Críticos atordoam 1 turno' },
      { nivel: 10, desc: '19-20 = crítico — críticos ricocheteiam completamente' },
      { nivel: 16, desc: 'Atordoa 2 turnos' },
    ],
    'Corrente da Eletricidade': [
      { nivel: 3, desc: '1x desc. curto — 1d4 esferas — 1d6 + mod magia cada' },
      { nivel: 7, desc: '1x desc. curto — 1d6 esferas — 2d6 + mod magia cada' },
      { nivel: 13, desc: '1x desc. curto — 1d10 esferas — 3d6 + mod magia cada' },
    ],
    'Eletricidade Condensada': [
      { nivel: 4, desc: '1x desc. longo — área 3×3m — 2d10 + mod magia' },
      { nivel: 9, desc: '1x desc. longo — área 3×3m — 4d10 + mod magia' },
      { nivel: 18, desc: '1x desc. longo — área 3×3m — 5d10 + mod magia' },
    ],
    'Verdadeira Condução (Passiva)': [
      { nivel: 6, desc: 'Paira 30cm do solo' },
      { nivel: 13, desc: 'Voa até 1m do solo' },
    ],
    'Relâmpago': [
      { nivel: 10, desc: '2x desc. longo — 5d8 + mod magia — continua +2 turnos' },
      { nivel: 14, desc: '2x desc. longo — 7d8 + mod magia' },
    ],
    'Super Velocidade': [
      { nivel: 11, desc: '2x desc. longo — 50m instantâneos' },
      { nivel: 14, desc: '2x desc. longo — habilidades durante = certeiras' },
    ],
    '[Combativo] Nagashi': [
      { nivel: 5, desc: '2x desc. longo — 3d6 + magia elétrico + 1d6 físico — crítico perfura +4m' },
      { nivel: 8, desc: '3x desc. longo — 4d6 + magia + 2d6 físico' },
      { nivel: 14, desc: '4x desc. longo — 5d6 + magia + 3d6 físico — SEMPRE perfura' },
    ],
    '[Restaurador] Raio da Morte': [
      { nivel: 5, desc: '3x desc. longo — 2d4 + magia por raio — cura 1d4 por raio' },
      { nivel: 8, desc: '4x desc. longo — 3d4 + magia — cura 2d4' },
      { nivel: 14, desc: '5x desc. longo — 5d4 + magia — cura 3d4 — crítico = 10 raios' },
    ],
  },

  spellstealer: {
    'Catarse Mágica': [
      { nivel: 1, desc: '2x desc. curto — +1d8 de dano mágico adicional' },
      { nivel: 4, desc: '3x desc. curto — +2d8' },
      { nivel: 8, desc: 'Usos ilimitados — +1d10' },
      { nivel: 12, desc: 'Usos ilimitados — +1d12' },
    ],
    'Fortificação Arcana': [
      { nivel: 2, desc: '2x desc. curto — escudo 20 + mod cons — 2 turnos — imune a magias de nível inferior' },
      { nivel: 7, desc: '2x desc. curto — escudo 35 + mod cons — 3 turnos — imune até 3 níveis acima' },
      { nivel: 17, desc: '2x desc. curto — escudo 45 + mod cons — até fim do combate — imune a toda magia' },
    ],
    'Toque do Regicida': [
      { nivel: 2, desc: '2x desc. longo — cura 1d10 + mod cons — dano 1d4 + mod magia' },
      { nivel: 6, desc: '2x desc. longo — cura 2d10 + mod cons — dano 2d4 + mod magia' },
      { nivel: 9, desc: '3x desc. longo — cura 3d10 — dano 3d4' },
      { nivel: 16, desc: '3x desc. longo — cura 4d10 — dano 4d4' },
      { nivel: 20, desc: '4x desc. longo — cura 5d10 — dano 6d4' },
    ],
    'Roubo de Atributos (Passiva)': [
      { nivel: 3, desc: 'Após crítico: rouba 1 ponto de atributo' },
      { nivel: 7, desc: 'Rouba 2 pontos de atributo' },
    ],
    'Usurpar': [
      { nivel: 3, desc: '1x desc. longo — alcance 5m — 2d8 contato — dura 2 turnos — 1 habilidade' },
      { nivel: 11, desc: '2x desc. longo — alcance 20m — 5d8 — dura 2h — 2 habilidades' },
      { nivel: 14, desc: '2x desc. longo — alcance 50m — 6d8 — até usar novo — 2 habilidades' },
      { nivel: 20, desc: '2x desc. longo — alcance 50m — 10d8 — ilimitado — ilimitadas (1/inimigo)' },
    ],
    'Explosão da Catarse Arcana': [
      { nivel: 6, desc: '2x desc. longo — 3d6 + mod magia — área pequena — silenciado 1 turno' },
      { nivel: 13, desc: '2x desc. longo — 8d6 + mod magia — área 10m — silenciado 2 turnos' },
    ],
    'Devorar Magia': [
      { nivel: 9, desc: '1x por dia — absorve magia → cura' },
      { nivel: 13, desc: '2x por dia — replica a magia contra o inimigo' },
      { nivel: 19, desc: '3x desc. longo — poderes consumidos são ROUBADOS' },
    ],
  },

  hemomante: {
    'Transfusão Mágica': [
      { nivel: 1, desc: '1x por turno — 2d6 + mod magia — cura o dobro se tem sangue' },
      { nivel: 5, desc: '2x por turno — 3d6 + mod magia' },
      { nivel: 9, desc: '2x por turno — 4d6 + mod magia' },
      { nivel: 14, desc: '2x por turno — 5d6 + mod magia' },
      { nivel: 20, desc: '3x por turno — 8d8 + mod magia' },
    ],
    'Cicatrização Sanguínea': [
      { nivel: 2, desc: '1 HP por ML gasto (ação bônus)' },
      { nivel: 6, desc: '2 HP por ML — regenera feridas leves, fecha feridas grandes' },
      { nivel: 20, desc: 'Regenera completamente membros perdidos' },
    ],
    'Sangue Enfeitiçado': [
      { nivel: 2, desc: 'Custa 2 HP/fragmento — 1d6 por fragmento' },
      { nivel: 5, desc: '2d6 por fragmento — maior bônus de acerto' },
    ],
    'Dança Escarlate': [
      { nivel: 4, desc: '2x desc. curto — 10 HP — área 10m — 2d4 + magia (2º impacto: +3d4)' },
      { nivel: 8, desc: '2x desc. curto — 18 HP — área 20m — 4d4 + magia (2º impacto: +6d4)' },
    ],
    'Manipulação Rubra': [
      { nivel: 9, desc: '1x desc. curto — 15 HP — interrompe (atordoa 1t) ou acelera (hemorragia 3t)' },
      { nivel: 13, desc: '1x desc. curto — 4d8 ou 4d10 + mod magia + cons' },
      { nivel: 17, desc: '2x desc. curto — 6d8 ou 6d12 + mod magia + cons — 2 alvos — sem exaustão' },
    ],
    'Lança Sanguinária': [
      { nivel: 11, desc: '2x desc. longo — 18 HP — 10d4 + magia — 24 ML = 2ª lança' },
      { nivel: 19, desc: '2x desc. longo — 10d6 + mod magia — 36 ML = 2 lanças extras' },
    ],
    '[Empírico] Experiência (Passiva)': [
      { nivel: 5, desc: 'Imunidade a efeitos negativos repetidos. +1 Ponto de Acúmulo por efeito' },
      { nivel: 8, desc: 'Mesma habilidade acertada 2x: apenas metade do dano' },
    ],
    '[Guerra] Forja Hematúrgica': [
      { nivel: 5, desc: '10 HP — cria arma de sangue puro. +2 dados a cada 5 níveis' },
    ],
    '[Guerra] Pódio': [
      { nivel: 8, desc: '1x desc. longo — 20 HP — área 16×16m — proíbe magias e itens mágicos por 3 turnos' },
    ],
    '[Guerra] Legião de Sangue': [
      { nivel: 14, desc: '1x desc. longo — 30 HP — +1 CA e +1 def por litro de sangue (máx 8 CA). >10L: +2 dados' },
    ],
  },

  lanceiro: {
    'Sinfonia da Lança': [
      { nivel: 1, desc: '2x desc. curto — 1d4 + mod força + mod dest por metro' },
      { nivel: 4, desc: '3x desc. curto — 2d4 por metro' },
      { nivel: 7, desc: '3x desc. curto — 2d4/m — corte lateral CERTEIRO: 2d4 + força' },
      { nivel: 8, desc: '4x desc. curto — 2d6 por metro' },
      { nivel: 11, desc: '4x desc. curto — corte lateral: 4d4 + força' },
      { nivel: 12, desc: '4x desc. curto — 2d8 por metro' },
      { nivel: 16, desc: '4x desc. curto — 3d8 por metro' },
      { nivel: 19, desc: '4x desc. curto — corte lateral: 5d4 + força' },
      { nivel: 20, desc: '5x desc. curto — 5d8 por metro' },
    ],
    'Fragmentar (Passiva)': [
      { nivel: 1, desc: '-1 defesa por golpe. Sem defesa: -1 CA (não acumula)' },
      { nivel: 6, desc: '-3 defesa por golpe. -2 CA' },
      { nivel: 12, desc: '-5 defesa por golpe. -3 CA' },
      { nivel: 18, desc: '-10 defesa por golpe. -4 CA' },
    ],
    'Lançamento': [
      { nivel: 2, desc: 'Arremessa qualquer arma como ação bônus' },
      { nivel: 4, desc: 'Dobro dos dados de dano no arremesso' },
      { nivel: 8, desc: 'Triplo dos dados + destrói superfície sólida em área' },
    ],
    'Tempestade Eufórica': [
      { nivel: 3, desc: '2x desc. longo — bloqueia projéteis e magias à distância (reação)' },
      { nivel: 5, desc: 'Pode girar para cima e voar por segundos (mod dest)' },
    ],
    'Avanço Jevelin': [
      { nivel: 5, desc: '3x desc. longo — avanço IMPARÁVEL' },
      { nivel: 14, desc: 'Alvo fica atordoado 1 turno' },
    ],
    'Onda': [
      { nivel: 6, desc: '1x desc. longo — 3 ataques simultâneos' },
      { nivel: 16, desc: '1x desc. longo — 4 ataques (4 chances, maior prevalece)' },
    ],
    'Chutes de Elevação': [
      { nivel: 9, desc: '1x desc. longo — 5 chutes — 2d6 + mod força cada' },
      { nivel: 17, desc: '1x desc. longo — 7 chutes — 3d6 + mod força cada' },
    ],
    'Respiração': [
      { nivel: 10, desc: '2x desc. longo — CONCENTRAÇÃO por 2 turnos + 1 ação extra' },
      { nivel: 20, desc: 'CONCENTRAÇÃO até fim do combate' },
    ],
    'No Ar (Passiva)': [
      { nivel: 13, desc: 'Pega arremessos direcionados (exceto críticos)' },
      { nivel: 17, desc: 'Ganha ação de arremesso após pegar' },
      { nivel: 20, desc: 'Pega arremessos críticos' },
    ],
    '[Panteão] Ímpeto do Buraco Negro': [
      { nivel: 5, desc: '1x desc. curto — alcance 20m — zona 4m — 1d8 por turno' },
      { nivel: 14, desc: '2x desc. curto — alcance 30m — zona 6m — 2d8 por turno' },
    ],
    '[Panteão] Avanço Estelar': [
      { nivel: 8, desc: '1x desc. longo — até 1km a 140km/h' },
      { nivel: 20, desc: '2x desc. longo — até 110km — funciona sem gravidade' },
    ],
    '[Dracônico] Inflamação Dracônica': [
      { nivel: 5, desc: '2x desc. curto — +3d4 no golpe — cone 4m: 5d4 mágico' },
      { nivel: 14, desc: '2x desc. curto — +6d4 no golpe — cone 8m: 10d4 mágico' },
    ],
  },

  'manipulador-essencia': {
    'La Muerte': [
      { nivel: 1, desc: '2x desc. curto — 4 dias — 1d6 + mod int' },
      { nivel: 5, desc: '2x desc. curto — 10 dias — 2d8 + mod int' },
      { nivel: 8, desc: '2x desc. curto — 15 dias — 3d8 + mod int' },
      { nivel: 12, desc: '2x desc. curto — 3 semanas — 5d8 + mod int' },
    ],
    'Evasão': [
      { nivel: 2, desc: '1x desc. curto — 2 dias — salto sobrenatural 5m (reação)' },
      { nivel: 6, desc: '2x desc. curto — 2 dias — 7m' },
    ],
    'Esferas Etéreas': [
      { nivel: 3, desc: '1x desc. longo — 6 dias — 1d8 + mod int por esfera — 2 por turno' },
      { nivel: 10, desc: '1x desc. longo — 9 dias — 3d8 + mod int — 3 por turno' },
    ],
    'Restauração': [
      { nivel: 4, desc: '1x desc. curto — 2 semanas — cura 3d6 + mod int' },
      { nivel: 10, desc: '2x desc. curto — 4d6 + mod int' },
    ],
    '[Combustão] Desenvoltura': [
      { nivel: 5, desc: '2x desc. curto — 3 dias — atacantes: 4d4 fogo — golpes: +2d6' },
      { nivel: 8, desc: '2x desc. curto — 3 dias — atacantes: 6d4 fogo — golpes: +2d6' },
    ],
    '[Titereiro] Marionete': [
      { nivel: 5, desc: '1x desc. longo — 1 mês — dura 4 dias — 1 alvo' },
      { nivel: 8, desc: '1x desc. longo — 3 meses — dura 9 dias — 2 alvos (nível igual ou inferior)' },
    ],
  },

  'invocador-funereo': {
    'Ghast': [
      { nivel: 1, desc: '12 HP | Ao morrer: 2d8 | Energia Funérea: 1d4 / ricocheteia —' },
      { nivel: 4, desc: '+3 HP, +1 CA | Ao morrer: 3d8 | Energia: 2d4 / 1d6' },
      { nivel: 6, desc: '+4 HP, +1 CA | Ao morrer: 4d8 | Energia: 3d4 / 1d8' },
      { nivel: 9, desc: '+3 HP, +1 CA | Ao morrer: 5d8 | Energia: 4d4 / 1d10' },
      { nivel: 12, desc: '+2 HP | Ao morrer: 6d8 | Energia: 5d4 / 1d12' },
      { nivel: 16, desc: 'Ao morrer: 10d8 | Energia: 6d4 / 2d12' },
    ],
    'Maldição dos Sinais (Passiva)': [
      { nivel: 2, desc: '+5 HP permanentes (sinais no braço)' },
      { nivel: 10, desc: '+20 HP permanentes (pernas e pés)' },
      { nivel: 15, desc: '+20 HP, +2 percepção (pescoço até olhos)' },
      { nivel: 20, desc: '+30 HP, +2 em todos atributos exceto percepção (corpo completo)' },
    ],
    'Avanço da Morte': [
      { nivel: 3, desc: '2x desc. longo — 1d8 + mod cons' },
      { nivel: 5, desc: '3x desc. longo — 2d8 + mod cons' },
      { nivel: 8, desc: '3x desc. longo — 3d8 + mod cons — transpassa +1 alvo' },
      { nivel: 11, desc: '4x desc. longo — 4d8 + mod cons — invocação fantasma: 4d8 mágico' },
      { nivel: 15, desc: '4x desc. longo — 5d8 + mod cons — invocações: 5d8 mágico' },
      { nivel: 18, desc: '4x desc. longo — 7d8 + mod cons — invocações: 7d8 mágico' },
    ],
    'Nightmare': [
      { nivel: 4, desc: '30 HP | Garras/dentes: 2d4 | Lâmina Sombria: 1x/combate, 3d6' },
      { nivel: 8, desc: '+10 HP, +1 CA | Garras: 3d4 | Lâmina: 2x/combate, 4d6' },
      { nivel: 14, desc: '+8 HP, +1 CA | Garras: 4d4 | Lâmina: 2x/combate, 6d6' },
      { nivel: 17, desc: 'Garras: 7d4 | Lâmina: 2x/combate, 8d6' },
    ],
    'Sobrepujar': [
      { nivel: 5, desc: '1x desc. longo — pá: 1d4 + mod cons — cura: 3d4 + mod cons' },
      { nivel: 9, desc: '1x desc. longo — pá: 2d4 — cura: 6d4' },
      { nivel: 12, desc: '1x desc. longo — pá: 3d4 — cura: 12d4' },
      { nivel: 17, desc: '1x desc. longo — pá: 4d4 — cura: 18d4 — atordoa 1 turno' },
      { nivel: 20, desc: '2x desc. longo — pá: 5d4 — cura: 24d4 — atordoa 1 turno' },
    ],
    '[S.Puro] Sangue Funéreo': [
      { nivel: 5, desc: '1x desc. curto — área 3×3m — 2 turnos — cura 1d4/alvo/turno' },
      { nivel: 8, desc: '2x desc. curto — área 6×6m — cura 1d6/alvo/turno' },
      { nivel: 14, desc: '2x desc. curto — área 12×12m — 3 turnos — cura 1d8/alvo/turno' },
    ],
    '[S.Puro] Pá dos Ritos Sanguinários (Passiva)': [
      { nivel: 8, desc: '+1d8 + mod cons de dano — cura 1d4 por acerto' },
      { nivel: 14, desc: '+3d8 + mod cons de dano — cura 3d4 por acerto' },
    ],
    '[Maldição] Vanguarda Funérea (Passiva)': [
      { nivel: 5, desc: '+5 defesa por habilidade funérea (máx 20)' },
      { nivel: 8, desc: 'Máx 30 defesa' },
      { nivel: 14, desc: 'Máx 40 defesa — ao atingir máximo: +20 HP' },
    ],
  },

};

// Retorna a tabela de evolução de uma habilidade específica
export function getEvolucao(shikataId, nomeHabilidade) {
  return EVOLUCOES[shikataId]?.[nomeHabilidade] || null;
}
