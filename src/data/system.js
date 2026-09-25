// SISTEMA TALOS - Dados do Sistema
import { SHIKATAS_V6, SHIKATAS_HABILIDADES_V6 } from './shikatas_v6.generated.js';

export const ATTRIBUTES = [
  { key: 'forca', label: 'Força', abbr: 'FOR', desc: 'Esforço físico. Dano adicional em algumas habilidades' },
  { key: 'magia', label: 'Magia', abbr: 'MAG', desc: 'Potencial mágico interior. Usado em testes de arcanismo' },
  { key: 'constituicao', label: 'Constituição', abbr: 'CON', desc: 'Resistência natural. Mais constituição = mais vida por nível' },
  { key: 'inteligencia', label: 'Inteligência', abbr: 'INT', desc: 'Raciocínio e sabedoria. Dano adicional em habilidades específicas' },
  { key: 'percepcao', label: 'Percepção', abbr: 'PER', desc: 'Campo de visão e atenção. Testes de rastreio e variantes' },
  { key: 'destreza', label: 'Destreza', abbr: 'DES', desc: 'Capacidade de movimentação. Corridas, acrobacias, furtividade' },
  { key: 'carisma', label: 'Carisma', abbr: 'CAR', desc: 'Atrair atenção e causar impressões. Persuasão, barganha, diplomacia' },
  { key: 'defesa', label: 'Defesa', abbr: 'DEF', desc: 'Modificador reduz em 1 todo dano recebido de fontes externas' },
  { key: 'sorte', label: 'Sorte', abbr: 'SOR', desc: 'Encontra itens raros e riquezas mais facilmente' },
];

export const TENDENCIAS = [
  'Leal e Bom (LB)', 'Neutro e Bom (NB)', 'Caótico e Bom (CB)',
  'Leal e Neutro (LN)', 'Neutro (N)', 'Caótico e Neutro (CN)',
  'Leal e Mau (LM)', 'Neutro e Mau (NM)', 'Caótico e Mau (CM)',
];

const PROFISSOES_BASE = [
  { name: 'Artesão', pericias: ['Ofício'], texto: 'Escolha até 3 Ofícios (Administração, Alquimia, Alvenaria, Armas de Cerco, Carpintaria, Joalheria, Metalurgia, Arte, Profissão)', nota: 'Escolha as especialidades de Ofício com o mestre.' },
  { name: 'Artista', pericias: ['Atuação', 'Enganação'], texto: 'Atuação, Enganação' },
  { name: 'Assistente de Laboratório', pericias: ['Ofício', 'Misticismo'], texto: 'Ofício (alquimia), Misticismo' },
  { name: 'Batedor', pericias: ['Furtividade', 'Percepção', 'Sobrevivência'], texto: 'Furtividade, Percepção, Sobrevivência' },
  { name: 'Soldado', pericias: ['Atletismo', 'Luta', 'Pilotagem'], texto: 'Atletismo, Luta, Pilotagem' },
  { name: 'Acrobata', pericias: ['Acrobacia', 'Prestidigitação', 'Furtividade'], texto: 'Acrobacia, Prestidigitação, Furtividade' },
  { name: 'Cavalariço', pericias: ['Cavalgar', 'Reflexos'], texto: 'Cavalgar, Reflexos' },
  { name: 'Ladrão', pericias: ['Ladinagem', 'Investigação', 'Pontaria'], texto: 'Ladinagem, Investigação, Pontaria' },
  { name: 'Historiador', pericias: ['História', 'Geografia', 'Natureza', 'Religião'], texto: 'História, Geografia, Natureza, Religião' },
  { name: 'Médico', pericias: ['Vontade', 'Cura', 'Sobrevivência', 'Fortitude'], texto: 'Vontade, Cura, Sobrevivência, Fortitude' },
  { name: 'Diplomata', pericias: ['Intimidação', 'Atuação', 'Persuasão', 'Diplomacia'], texto: 'Intimidação, Atuação (escolha uma), Persuasão, Diplomacia', nota: 'Escolha uma variação de Atuação.' },
  { name: 'Caçador de Tesouros', pericias: ['Tesouros', 'Procurar', 'Jogatina'], texto: 'Tesouros, Procurar, Jogatina' },
  { name: 'Místico', pericias: ['Arcano', 'Guia', 'Mitologia Arcana'], texto: 'Arcano, Guia, Mitologia Arcana' },
  { name: 'Amigo dos Animais', pericias: ['Adestramento', 'Cavalgar'], texto: 'Adestramento, Cavalgar' },
  { name: 'Amnésico', pericias: [], texto: 'Escolha conforme passado revelado', nota: 'Sem perícia fixa até o passado ser revelado.' },
  { name: 'Acólito', pericias: ['Cura', 'Religião', 'Vontade'], texto: 'Cura, Religião, Vontade' },
  { name: 'Trabalhador', pericias: ['Atletismo', 'Fortitude'], texto: 'Atletismo, Fortitude' },
  { name: 'Taverneiro', pericias: ['Diplomacia', 'Jogatina', 'Ofício'], texto: 'Diplomacia, Jogatina, Ofício (culinária)', nota: 'Ofício representa culinária.' },
  { name: 'Selvagem', pericias: ['Percepção', 'Reflexos', 'Natureza', 'Sobrevivência'], texto: 'Percepção, Reflexos, Natureza, Sobrevivência' },
  { name: 'Seguidor', pericias: ['Adestramento', 'Ofício'], texto: 'Adestramento, Ofício (qualquer)', nota: 'Escolha a especialidade de Ofício.' },
  { name: 'Refugiado', pericias: ['Fortitude', 'Reflexos', 'Vontade'], texto: 'Fortitude, Reflexos, Vontade' },
  { name: 'Pivete', pericias: ['Furtividade', 'Iniciativa', 'Ladinagem'], texto: 'Furtividade, Iniciativa, Ladinagem' },
  { name: 'Charlatão', pericias: ['Enganação', 'Jogatina'], texto: 'Enganação, Jogatina' },
  { name: 'Circense', pericias: ['Acrobacia', 'Atuação', 'Procurar', 'Reflexos'], texto: 'Acrobacia, Atuação, Procurar, Reflexos' },
  { name: 'Criminoso', pericias: ['Enganação', 'Furtividade', 'Tesouros', 'Ladinagem'], texto: 'Enganação, Furtividade, Tesouros, Ladinagem' },
  { name: 'Curandeiro', pericias: ['Cura', 'Vontade'], texto: 'Cura, Vontade' },
  { name: 'Eremita', pericias: ['Misticismo', 'Religião', 'Sobrevivência'], texto: 'Misticismo, Religião, Sobrevivência' },
  { name: 'Escravo', pericias: ['Atletismo', 'Fortitude', 'Furtividade', 'Vontade'], texto: 'Atletismo, Fortitude, Furtividade, Vontade' },
  { name: 'Estudioso', pericias: ['História', 'Guerra', 'Arcano', 'Procurar'], texto: 'História, Guerra, Arcano, Procurar' },
  { name: 'Fazendeiro', pericias: ['Adestramento', 'Cavalgar', 'Ofício', 'Sobrevivência'], texto: 'Adestramento, Cavalgar, Ofício (fazendeiro), Sobrevivência', nota: 'Ofício representa fazendeiro.' },
  { name: 'Forasteiro', pericias: ['Cavalgar', 'Pilotagem', 'Sobrevivência'], texto: 'Cavalgar, Pilotagem, Sobrevivência' },
  { name: 'Gladiador', pericias: ['Atuação', 'Luta'], texto: 'Atuação, Luta' },
  { name: 'Guarda', pericias: ['Investigação', 'Luta', 'Percepção'], texto: 'Investigação, Luta, Percepção' },
  { name: 'Herdeiro', pericias: ['Misticismo', 'Nobreza', 'Ofício'], texto: 'Misticismo, Nobreza, Ofício (qualquer)', nota: 'Escolha a especialidade de Ofício.' },
  { name: 'Herói Camponês', pericias: ['Adestramento', 'Ofício'], texto: 'Adestramento, Ofício (qualquer)', nota: 'Escolha a especialidade de Ofício.' },
  { name: 'Marujo', pericias: ['Atletismo', 'Jogatina', 'Ofício', 'Pilotagem'], texto: 'Atletismo, Jogatina, Ofício (marinheiro), Pilotagem', nota: 'Ofício representa marinheiro.' },
  { name: 'Mateiro', pericias: ['Atletismo', 'Furtividade', 'Sobrevivência'], texto: 'Atletismo, Furtividade, Sobrevivência' },
  { name: 'Membro de Guilda', pericias: ['Diplomacia', 'Enganação', 'Misticismo', 'Ofício'], texto: 'Diplomacia, Enganação, Misticismo, Ofício (qualquer)', nota: 'Escolha a especialidade de Ofício.' },
  { name: 'Mercador', pericias: ['Diplomacia', 'Intuição', 'Ofício'], texto: 'Diplomacia, Intuição, Ofício (qualquer)', nota: 'Escolha a especialidade de Ofício.' },
  { name: 'Minerador', pericias: ['Atletismo', 'Fortitude', 'Ofício'], texto: 'Atletismo, Fortitude, Ofício (minerador)', nota: 'Ofício representa minerador.' },
  { name: 'Nômade', pericias: ['Cavalgar', 'Pilotagem', 'Sobrevivência'], texto: 'Cavalgar, Pilotagem, Sobrevivência' },
];

export const PROFISSOES_DATA = PROFISSOES_BASE.map(profissao => ({
  ...profissao,
  desc: `Antes de se tornar aventureiro, o personagem viveu como ${profissao.name}. Essa profissão define sua vivência inicial e concede as perícias profissionais listadas no sistema TALOS.`,
}));

export const PROFISSOES = PROFISSOES_DATA.map(profissao => profissao.name);

export function getProfissaoData(name) {
  return PROFISSOES_DATA.find(profissao => profissao.name === name);
}

export const ORIGENS = [
  {
    id: 'humano', name: 'Humano',
    altura: '1,60 a 1,90m',
    bonus: { percepcao: 2 }, extra: '+4 pontos de proficiência',
    malus: {},
    deslocamento: 2, limiteCansaco: 4,
    habilidade: 'Seres Perceptivos: +2 em percepção permanentemente',
    carga: '25 + mod força kg',
  },
  {
    id: 'drac', name: 'Drac',
    altura: '1,65 a 2,00m',
    bonus: { forca: 2, destreza: 1, constituicao: 2 },
    malus: { carisma: -3, sorte: -2 },
    deslocamento: 2, limiteCansaco: 5,
    habilidade: 'Invencibilidade [1x desc. longo]: Invulnerável durante 1 turno',
  },
  {
    id: 'manchados', name: 'Manchados',
    bonus: { magia: 2, constituicao: 1 },
    malus: {},
    deslocamento: 2, limiteCansaco: 4,
    habilidade: 'Olhos Escarlates (evolui com nível)',
  },
  {
    id: 'anao', name: 'Anão',
    altura: '1,20 a 1,55m',
    bonus: { forca: 2, carisma: 1 }, extra: '+4 HP iniciais, +1 CA',
    malus: { inteligencia: -1, magia: -1 },
    deslocamento: 2, limiteCansaco: 4,
    habilidade: 'Forjadores: +5 em testes de forjar itens',
  },
  {
    id: 'anao-rocha', name: 'Anão da Rocha',
    altura: '1,30 a 1,60m',
    bonus: { forca: 1, constituicao: 1 }, extra: '+3 HP iniciais, +2 CA',
    malus: { destreza: -3 },
    deslocamento: 1, limiteCansaco: 4,
    habilidade: 'Mineradores: +5 em testes de força de mineração',
  },
  {
    id: 'crono', name: 'Crono',
    altura: '1,30 a 1,50m',
    bonus: { constituicao: 5, inteligencia: 2 },
    malus: { sorte: -2, carisma: -2 },
    deslocamento: 2, limiteCansaco: 4,
    habilidade: 'Quebra do Tempo [1x desc. longo]: Para o tempo por 10 segundos (1 turno em combate)',
  },
  {
    id: 'elfo', name: 'Elfo',
    altura: '1,70 a 2,00m',
    bonus: { destreza: 2, inteligencia: 2, sorte: 1 },
    malus: { forca: -2 },
    deslocamento: 3, limiteCansaco: 4,
    habilidade: 'Precisão [1x desc. longo]: Próximo ataque automaticamente certeiro',
  },
  {
    id: 'elfo-floresta', name: 'Elfo da Floresta',
    altura: '1,65 a 1,90m',
    bonus: { destreza: 2, forca: 2, percepcao: 1 },
    malus: { carisma: -1, magia: -1 },
    deslocamento: 2, limiteCansaco: 4,
    habilidade: 'Chamado da Floresta: Em ambientes naturais, cura 10 HP por hora. Ferimentos graves são cessados no processo',
  },
  {
    id: 'elfo-rubro', name: 'Elfo Rubro',
    altura: '1,70 a 2,00m',
    bonus: { magia: 2, constituicao: 2 },
    malus: { carisma: -3 },
    deslocamento: 2, limiteCansaco: 5,
    habilidade: 'Anulador: resistente à tentação do pacto e controle mental demoníaco. Sangue Azul: recebe apenas metade de todo dano mágico',
  },
  {
    id: 'elfo-maritimo', name: 'Elfo Marítimo',
    altura: '1,67 a 1,90m',
    bonus: {}, extra: '+2 pontos de proficiência, +2 HP iniciais',
    malus: {},
    deslocamento: 2, limiteCansaco: 5,
    habilidade: 'Submersos: +4 em todos os atributos, exceto Constituição, enquanto na água. Fora d’água perde os bônus e sobrevive apenas 12 horas em solo. 5 minutos na água fornece nutrientes para esse período em terra',
  },
  {
    id: 'elfo-negro', name: 'Elfo Negro',
    bonus: { destreza: 3, carisma: 1 },
    malus: { forca: -2, sorte: -1 },
    deslocamento: 2, limiteCansaco: 4,
    habilidade: 'Sombrio: Bônus de DES e CAR dobrados na escuridão total',
  },
  {
    id: 'orc', name: 'Orc',
    altura: '1,70 a 1,90m',
    bonus: { forca: 4, constituicao: 1 }, extra: '+6 HP iniciais',
    malus: { inteligencia: -2, magia: -2, carisma: -1 },
    deslocamento: 1, limiteCansaco: 6,
    habilidade: 'Fortificação: Pode empunhar arma de duas mãos em CADA mão',
  },
  {
    id: 'meio-orc', name: 'Meio Orc',
    altura: '1,50 a 1,70m',
    bonus: { forca: 2 }, extra: '+3 HP iniciais',
    malus: { carisma: -1, destreza: -1 },
    deslocamento: 2, limiteCansaco: null,
    habilidade: 'Fusão: Recebe metade dos bônus e metade dos malefícios da origem mesclada. Limite de cansaço = (Orc + origem mesclada) ÷ 2',
  },
  {
    id: 'gnomo', name: 'Gnomo',
    altura: '0,70 a 1,10m',
    bonus: { destreza: 3, sorte: 3 }, extra: '+5 HP iniciais',
    malus: { inteligencia: -2, forca: -1 },
    deslocamento: 4, limiteCansaco: 3,
    habilidade: 'Sortudo!: Modificador de sorte se transforma em vida extra',
  },
  {
    id: 'hobbit', name: 'Hobbit',
    altura: '1,00 a 1,30m',
    bonus: { destreza: 3, carisma: 1, sorte: 2 },
    malus: {}, extra: '-2 HP iniciais',
    deslocamento: 3, limiteCansaco: 3,
    habilidade: 'Pés Peludos: Pode pular até o dobro de sua altura',
  },
  {
    id: 'nordico', name: 'Nórdico',
    altura: '1,70 a 1,90m',
    bonus: { forca: 2, constituicao: 2 }, extra: '+5 HP iniciais',
    malus: { magia: -3, carisma: -2 },
    deslocamento: 2, limiteCansaco: 5,
    habilidade: 'Resistente ao frio absoluto. Não sente medo de nada',
  },
  {
    id: 'meio-dragao', name: 'Humano Meio Dragão',
    altura: '1,60 a 1,80m',
    bonus: { magia: 3 }, extra: '+4 HP iniciais, +2 CA, +2 Carisma vs. dragões',
    malus: { destreza: -2, carisma: -2 },
    deslocamento: 2, limiteCansaco: 4,
    habilidade: 'Dragão Ancestral [2x desc. longo]: Escolha um dragão ancestral. Cada um concede um sopro diferente cujo dano escala por nível',
  },
  {
    id: 'meio-demonio', name: 'Humano Meio Demônio',
    altura: '1,70 a 1,80m',
    bonus: { magia: 2, inteligencia: 2, forca: 2 }, extra: '+2 HP iniciais',
    malus: { carisma: -3, sorte: -1 },
    deslocamento: 2, limiteCansaco: 4,
    habilidade: 'Crescimento do Mal: Adiciona parte demoníaca ao corpo (efeito do mestre)',
  },
  {
    id: 'cursed', name: 'Cursed',
    altura: '1,30 a 2,00m',
    bonus: { forca: 1, magia: 1, constituicao: 1, inteligencia: 1, percepcao: 1, destreza: 1, carisma: 1, defesa: 1, sorte: 1 },
    malus: {}, extra: '-3 HP iniciais',
    deslocamento: 2, limiteCansaco: 4,
    habilidade: 'Imortal [1x por dia]: Ao zerar HP, volta com metade de sua vida completa',
  },
  {
    id: 'kvaldir', name: 'Kvaldir',
    altura: '1,86 a 2,20m',
    bonus: { forca: 2, constituicao: 2, magia: 1 }, extra: '+1 CA',
    malus: { carisma: -2, sorte: -2 },
    deslocamento: null, limiteCansaco: null,
    habilidade: 'Defesa Grotesca [1x por combate]: Ao consumir carne de outra origem até 1 semana atrás, faz os espinhos crescerem: bloqueia completamente ataques físicos e reflete metade do dano mágico',
  },
  {
    id: 'feral', name: 'Feral',
    altura: '1,10 a 2,00m',
    bonus: { constituicao: 2, sorte: 2 },
    malus: {},
    deslocamento: 3, limiteCansaco: 3,
    habilidade: 'Atributos Novos: Dependendo da parte fera escolhida, recebe 3 bônus e novas desvantagens',
  },
  {
    id: 'goblin', name: 'Goblin',
    altura: '0,70 a 1,10m',
    bonus: { destreza: 3 },
    malus: { carisma: -3 }, extra: '-1 HP inicial',
    deslocamento: 3, limiteCansaco: 3,
    habilidade: 'Furto: +2 em jogadas furtivas. Veneno Natural: imbui armas com excrementos venenosos. Alimentação: come qualquer coisa, mesmo podre',
  },
  {
    id: 'thungan', name: 'Thungan',
    altura: '1,10 a 1,30m',
    bonus: { sorte: 1 },
    malus: {},
    deslocamento: 3, limiteCansaco: 3,
    habilidade: 'Sorte Amaldiçoada: Sempre adquire um equipamento raro ao nascer. O item é amaldiçoado, não pode ser destruído ou descartado e sempre volta. Role 1d20 para determinar o item',
  },
  {
    id: 'tita', name: 'Titã',
    altura: '~1,70m',
    bonus: { inteligencia: 6 }, extra: 'Não pode evoluir Carisma de nenhuma forma, exceto por efeito de itens',
    malus: {},
    deslocamento: 1, limiteCansaco: 7,
    habilidade: 'Conhecimento da Vida [1x desc. longo]: Lê todas as memórias de uma criatura viva ou morta',
  },
  {
    id: 'guardiao', name: 'Guardião',
    bonus: {}, extra: '+5 CA',
    malus: { destreza: -3, magia: -3 },
    deslocamento: 1, limiteCansaco: 4,
    habilidade: 'Revestimento [1 ativação por desc. longo, 3 tentativas/turno]: +5 CA por 2 turnos. Role 1d20; acima de 10 ativa. Crítico dobra o efeito até o fim do combate',
  },
  {
    id: 'fada', name: 'Fada',
    altura: '0,30 a 0,70m',
    bonus: { constituicao: 1, sorte: 5 },
    malus: {}, extra: '-2 HP iniciais',
    deslocamento: 4, limiteCansaco: 3,
    habilidade: 'Rapidez: movimenta-se 2x mais rápido. Voar: voa até 2x seu peso por até 10 min. Adaptação [1x desc. longo]: forja armas/armaduras com sucata em cerca de 2h. Peso: carrega no máximo 2x seu peso. Encantamento [2x desc. longo]: imbui armas com 1d4 de dano mágico',
  },
  {
    id: 'elemental', name: 'Elemental',
    altura: '1,30 a 1,70m',
    bonus: { magia: 4 },
    malus: { forca: -2, carisma: -1 },
    deslocamento: 2, limiteCansaco: 5,
    habilidade: 'Elemento: escolha água, fogo, terra ou ar como elemento principal. Diversificar: habilidades ofensivas sem elemento, inclusive físicas, viram o elemento escolhido e causam mod magia como dano adicional',
  },
  {
    id: 'slime', name: 'Slime',
    altura: '0,30 a 0,45m',
    bonus: { carisma: 5 },
    malus: { percepcao: -5, constituicao: -5, forca: -5, magia: -5, inteligencia: -5, destreza: -5, sorte: -5 }, extra: '-5 HP iniciais',
    deslocamento: null, limiteCansaco: 4,
    habilidade: 'Fofura Amorfa: muda forma e cor; cada 1kg de comida = +0,10cm e cada dia = -0,10cm. Fofura Ácida: 1d6 ácido ao contato; pode explodir como ação bônus, tomando 1d3 e causando 2d6 ácido em 5×5. Devorar: ação completa para engolir inimigo vivo; falha em teste de CON fica atordoado e sofre ácido por turno. No nível 5 escolhe um Caminho permanente',
  },
  {
    id: 'undead', name: 'Undead',
    altura: '0,30 a 3,90m',
    bonus: { destreza: 5 },
    malus: {}, extra: '-3 HP iniciais',
    deslocamento: 2, limiteCansaco: 3,
    habilidade: 'Andar: em áreas íngremes, partes do corpo se desmembram. Necrótico: ataques corpo-a-corpo com fluidos corporais causam +2 dano. Membros Flexíveis: pode se desmembrar sem dano. Lança partes corporais: 2d4 físico (+1d a cada 2 níveis). Partes Novas: pode costurar membros de outras criaturas em cerca de 1 dia',
  },
  {
    id: 'troll-montanha', name: 'Troll da Montanha',
    altura: '3,00 a 4,00m',
    bonus: { forca: 3, constituicao: 3 }, extra: '+2 HP iniciais',
    malus: { destreza: -1, carisma: -1, inteligencia: -1 },
    deslocamento: 1, limiteCansaco: 6,
    habilidade: 'Mordida Feroz [1x desc. longo]: 2d6 físico + sangramento por 2 turnos (+1 dado a cada 2 níveis). Também é resistente a dano de concussão',
  },
  {
    id: 'troll-floresta', name: 'Troll da Floresta',
    altura: '1,95 a 2,40m',
    bonus: { magia: 2, forca: 2, constituicao: 1 },
    malus: { destreza: -2 },
    deslocamento: 2, limiteCansaco: 5,
    habilidade: 'Armadura Enferrujada [1x desc. longo]: Com um urro, corrói armaduras/vestes de todos os alvos, aplicando -1 CA até o fim do combate',
  },
  {
    id: 'gigante', name: 'Gigante',
    altura: '2,00 a 3,00m',
    bonus: { forca: 4, constituicao: 2 }, extra: '+30 HP iniciais',
    malus: { destreza: -2, carisma: -2, inteligencia: -2, magia: -2, sorte: -2 },
    deslocamento: 2, limiteCansaco: 4,
    habilidade: 'Lento, muito lento!: Sempre ataca por último',
  },
  {
    id: 'celestial', name: 'Celestial',
    bonus: { constituicao: 3, magia: 2, forca: 1 },
    malus: { sorte: -1, carisma: -1 },
    deslocamento: 2, limiteCansaco: 4,
    habilidade: 'Cura Celestial: Cura 2 HP a cada ataque bem-sucedido (+1 a cada 2 níveis)',
  },
  {
    id: 'velkro', name: 'Velkro',
    bonus: { constituicao: 3, sorte: 3, magia: 3 },
    malus: { carisma: -1, inteligencia: -1 }, extra: '-1 CA',
    deslocamento: 2, limiteCansaco: 4,
    habilidade: 'Fervor Sanguinário: Após receber ataque, recupera 1d4 de vida',
  },
  {
    id: 'metamorfo', name: 'Metamorfo',
    bonus: { constituicao: 1 }, extra: '+2 pontos à escolha',
    malus: {},
    deslocamento: 2, limiteCansaco: 4,
    habilidade: 'Transformação [2x desc. longo]: Escolhe 2 formas de criatura permanentes. Cada forma traz vantagens e desvantagens específicas, como velocidade, força e resistência',
  },
  {
    id: 'vampiro', name: 'Vampiro',
    altura: '1,65 a 1,80m',
    bonus: { constituicao: 4, defesa: 1 },
    malus: {},
    deslocamento: 2, limiteCansaco: 4,
    habilidade: 'Despertar da Maldição [1x desc. longo]: Sob luz do sol, não pode ativar. Pupilas dilatam e olhos mudam. Recebe +5 HP (+2 por nível) e rouba vitalidade com ataques, curando metade do dano causado. Dura 2 turnos (+1 turno a cada 5 níveis)',
  },
  {
    id: 'lobisomem', name: 'Lobisomem',
    altura: '1,60 a 1,90m',
    bonus: { constituicao: 2 },
    malus: {},
    deslocamento: 2, limiteCansaco: 5,
    habilidade: 'Lua: Em noites de lua, transforma-se: +2 em todos os atributos e CA, recupera vida completamente, garras/mordidas 1d6 (+1d6 a cada 2 níveis). Não pode usar habilidades de shikata. Prata causa dano dobrado; derrota por prata na forma de lobo causa morte definitiva',
  },
  {
    id: 'lorv', name: 'Lorv',
    bonus: { inteligencia: 2, sorte: 1 }, extra: '+ metade dos atributos positivos e negativos do hospedeiro',
    malus: {},
    deslocamento: null, limiteCansaco: null,
    habilidade: 'Vestígios do Passado: aprende com memórias da vítima. Estilhaços de Vida: força o corpo além dos limites em emergências, com risco ao recipiente. Semelhantes: reconhece Lorv ao vê-los e pressente membros da raça em 15m',
  },
];

export const PERICIAS_BY_ATTR = {
  forca: ['Atletismo', 'Luta', 'Pilotagem'],
  destreza: ['Acrobacia', 'Prestidigitação', 'Furtividade', 'Cavalgar', 'Reflexos', 'Iniciativa', 'Ladinagem', 'Investigação', 'Pontaria'],
  inteligencia: ['História', 'Geografia', 'Natureza', 'Religião', 'Guerra', 'Nobreza', 'Ofício'],
  constituicao: ['Vontade', 'Cura', 'Sobrevivência', 'Fortitude'],
  carisma: ['Intimidação', 'Atuação', 'Persuasão', 'Adestramento', 'Diplomacia', 'Enganação'],
  percepcao: ['Percepção', 'Intuição'],
  sorte: ['Tesouros', 'Procurar', 'Jogatina'],
  magia: ['Arcano', 'Misticismo', 'Guia', 'Mitologia Arcana'],
};


// Resumos da seção PERÍCIAS do TALOS v6. Quando o documento apenas cita a
// perícia nas profissões, sem fornecer uma descrição própria, isso é explicitado
// para não transformar uma lacuna editorial em regra inventada pela ficha.
export const PERICIAS_INFO = {
  Atletismo: 'Domínio do próprio corpo: corridas longas, natação e saltos. Corrida = 2x deslocamento; nado = velocidade de caminhada.',
  Luta: 'Domínio da arte do combate e decisões rápidas em confronto. Concede +2 em iniciativa.',
  Pilotagem: 'Conhece mecanismos de engenharia motora, a vapor ou mágica e sabe pilotar ou operar essas máquinas.',
  Acrobacia: 'Equilíbrio, quedas sem dano, escapar de amarras, atravessar espaço de inimigo e superfícies precárias. Dificuldade 10 nas situações descritas.',
  Prestidigitação: 'Guardar ou retirar itens dos bolsos alheios sem ser percebido. Dificuldade 16.',
  Furtividade: 'Mover-se sem ser notado usando sombras, silêncio, camuflagem ou multidões. Não funciona contra quem olha diretamente para você.',
  Cavalgar: 'Conduzir animais de montaria. Ações simples não exigem teste; combate ou perigo podem exigir.',
  Reflexos: 'Fora de combate, prevê movimentos de objetos lançados e pode tentar interceptá-los.',
  Iniciativa: 'O TALOS v6 cita Iniciativa em profissões, mas não traz uma descrição própria para esta perícia na seção PERÍCIAS.',
  Ladinagem: 'Abrir fechaduras, esconder itens e desabilitar, reativar ou sabotar mecanismos, armadilhas, veículos e armas de fogo. Não conserta.',
  Investigação: 'Analisa rastros em chão e paredes e deduz sua natureza. Pode descobrir a origem dos rastros com dificuldade 18.',
  Pontaria: 'Princípios avançados de arremesso. Facas, adagas, espadas e armas pesadas arremessadas recebem o bônus desta perícia.',
  História: 'Conhecimento histórico profundo do mundo e reconhecimento de situações históricas.',
  Geografia: 'Conhece terrenos e povos do mundo e consegue detectar chuvas observando o céu.',
  Natureza: 'Conhecimento de fauna, flora, venenos naturais, habitats, estações e ciclos.',
  Religião: 'Conhece deuses, feitos, dogmas e monastérios. Também concede imunidade a intimidações religiosas.',
  Guerra: 'Conhece táticas e armadilhas de guerra. Em terreno superior, concede vantagem baseada no modificador de Inteligência no 1º turno para acertos de habilidades.',
  Nobreza: 'Conhece linhagens, heráldica, cavalaria, personalidades e leis da maioria dos reinos conhecidos.',
  'Ofício': 'Prática de artesanato ou comércio. Inclui Administração, Alquimia, Alvenaria, Armas de Cerco, Carpintaria, Joalheria, Metalurgia, Arte e Profissão.',
  Vontade: 'Ao chegar a 0 PV ou menos, pode fazer teste de Constituição para permanecer consciente por mais 1d4 rodadas, continuando a sangrar e estabilizar normalmente.',
  Cura: 'Pode estabilizar personagem com 0 PV ou menos e tratar doenças acompanhando o paciente. O tratamento descrito usa dificuldade 13.',
  Sobrevivência: 'Guia grupos pelos ermos, caça e reconhece perigos naturais. Um teste bem-sucedido por dia garante a sobrevivência de um pequeno grupo.',
  Fortitude: 'Permite suportar dias sem dormir ou comer e resistir a doenças e venenos. Resistência descrita com dificuldade 16.',
  Intimidação: 'Força outros a obedecer por ameaça, coação ou presença. Um teste bem-sucedido pode alterar o comportamento do alvo.',
  Atuação: 'Impressiona uma plateia com música, canto, poesia ou arte. O sistema traz referências de resultado 8, 16 e 20+ e várias especialidades.',
  Persuasão: 'Induz alguém a aceitar uma ideia verdadeira. Diferencia-se de Enganação por não depender de mentira.',
  Adestramento: 'Conduz e treina animais, incluindo cavalos de carroça, cães de guarda e tarefas relacionadas.',
  Diplomacia: 'Negocia acordos, barganhas e atitudes de NPCs. Em barganha, testes opostos podem alterar preços em 10% ou 20%.',
  Enganação: 'Mentiras, falsificações e disfarces. Pode fazer um alvo reagir como desejado, acreditar numa mentira, forjar documentos ou mudar aparência.',
  Percepção: 'O TALOS v6 usa Percepção como perícia em profissões, mas não fornece uma descrição própria para ela na seção PERÍCIAS.',
  Intuição: 'Percepção apurada para detectar armadilhas, itens ocultos e nuances no ambiente.',
  Tesouros: 'Ajuda a encontrar melhores tesouros. O bônus da perícia melhora recompensa em ouro e itens ao abrir baús.',
  Procurar: 'Ajuda a localizar algo perdido; no texto do sistema, “quem procura, acha”.',
  Jogatina: 'Sorte excepcional em jogos, apostas e desafios.',
  Arcano: 'Conhece mistérios sobrenaturais, tradições mágicas, símbolos arcanos, Cinero parcialmente e ritos funéreos parcialmente.',
  Misticismo: 'O TALOS v6 cita Misticismo em profissões, mas não traz uma descrição própria para esta perícia na seção PERÍCIAS.',
  Guia: 'Em noite estrelada, consegue se localizar por meio dos astros.',
  'Mitologia Arcana': 'Conhece criaturas místicas formadas pela magia do mundo, incluindo dragões e elementais.',
};

export const ESTADOS = [
  { id: 'imparavel', name: 'IMPARÁVEL', desc: 'Imune a atordoamento, enraizamento, congelamento e debilitações similares. Nada te para.' },
  { id: 'concentracao', name: 'CONCENTRAÇÃO', desc: 'Desvia do primeiro ataque inimigo que receber no turno. Recebe +10 de defesa até o efeito acabar.' },
  { id: 'cansado', name: 'CANSADO', desc: 'Pode usar habilidades, mas perde o bônus de acerto da classe. Recupera com descanso curto.' },
];

export const ITEM_SLOTS = [
  { id: 'arma_principal', label: 'Arma Principal', icon: '⚔️' },
  { id: 'arma_secundaria', label: 'Arma / Escudo', icon: '🛡️' },
  { id: 'armadura', label: 'Armadura', icon: '🥋' },
  { id: 'capacete', label: 'Capacete / Elmo', icon: '⛑️' },
  { id: 'capa', label: 'Capa / Manto', icon: '🧥' },
  { id: 'anel1', label: 'Anel Esquerdo', icon: '💍' },
  { id: 'anel2', label: 'Anel Direito', icon: '💍' },
  { id: 'colar', label: 'Colar / Amuleto', icon: '📿' },
  { id: 'luvas', label: 'Luvas / Manopla', icon: '🧤' },
  { id: 'botas', label: 'Botas / Sapatos', icon: '👢' },
  { id: 'cinto', label: 'Cinto / Cinturão', icon: '🎗️' },
  { id: 'broche', label: 'Broche / Acessório', icon: '✨' },
];

export const RARIDADE_CONFIG = {
  Lixo: { color: '#6b7280', bg: '#f3f4f6', border: '#9ca3af' },
  Comum: { color: '#374151', bg: '#f9fafb', border: '#6b7280' },
  Raro: { color: '#1d4ed8', bg: '#eff6ff', border: '#3b82f6' },
  Épico: { color: '#7c3aed', bg: '#f5f3ff', border: '#8b5cf6' },
  Lendário: { color: '#b45309', bg: '#fffbeb', border: '#f59e0b' },
  Pacto: { color: '#9f1239', bg: '#fff1f2', border: '#f43f5e' },
  Divino: { color: '#92400e', bg: '#fef3c7', border: '#fbbf24' },
  Conjunto: { color: '#0f766e', bg: '#ecfdf5', border: '#14b8a6' },
};

export const SHIKATAS_HABILIDADES = SHIKATAS_HABILIDADES_V6;

// A prévia das Shikatas também nasce da fonte canônica do DOCX v6.
const SHIKATA_PREVIEW_LIMIT = 4;
export const SHIKATAS = SHIKATAS_V6.map(shikata => ({
  ...shikata,
  habilidades: (SHIKATAS_HABILIDADES_V6[shikata.id] || [])
    .filter(habilidade => !habilidade.subclasse)
    .slice(0, SHIKATA_PREVIEW_LIMIT)
    .map(({ nivel, nome, desc, tipo, usos }) => ({ nivel, nome, desc, tipo, usos })),
}));

// Função auxiliar para obter habilidades de uma shikata por nível
export function getHabilidadesPorNivel(shikataId, nivel, subclasse = '') {
  const todas = SHIKATAS_HABILIDADES[shikataId] || [];
  return todas.filter(h => {
    const nivelOk = h.nivel <= nivel;
    const subclasseOk = !h.subclasse || h.subclasse === subclasse;
    return nivelOk && subclasseOk;
  });
}

export function getHabilidadesFuturas(shikataId, nivel, subclasse = '') {
  const todas = SHIKATAS_HABILIDADES[shikataId] || [];
  return todas.filter(h => {
    const nivelFuturo = h.nivel > nivel;
    const subclasseOk = !h.subclasse || h.subclasse === subclasse;
    return nivelFuturo && subclasseOk;
  });
}
