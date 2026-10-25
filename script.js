const STORAGE_KEY = "viagem-na-mao-v1";

const interests = [
  { id: "natureza", label: "🌿 Natureza" },
  { id: "gastronomia", label: "🍽️ Gastronomia" },
  { id: "cultura", label: "🎭 Cultura" },
  { id: "praia", label: "🌊 Praia" },
  { id: "aventura", label: "⛰️ Aventura" },
  { id: "vida-noturna", label: "🌙 Vida noturna" },
  { id: "arte", label: "🎨 Arte & design" },
  { id: "familia", label: "☀️ Para a família" },
  { id: "compras", label: "🛍️ Compras" }
];

function slugify(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function makeCityActivities(city, entries, image) {
  return entries.map(([name, category, activityInterests, description]) => ({
    id: `${slugify(city)}-${slugify(name)}`,
    name,
    city,
    category,
    interests: activityInterests,
    description,
    schedule: "Horários e disponibilidade variam; confirme antes de ir.",
    cost: null,
    rating: null,
    reviews: null,
    image
  }));
}

const activities = [
  {
    id: "jardim-botanico",
    name: "Jardim Botânico do Rio",
    city: "Rio de Janeiro",
    category: "Natureza",
    interests: ["natureza", "familia"],
    description: "Uma pausa verde entre palmeiras imperiais, orquidário e caminhos tranquilos aos pés do Cristo.",
    schedule: "Consulte horário e disponibilidade.",
    cost: null,
    rating: null,
    reviews: null,
    image: "imagens/1441974231531-c6227db76b6e.jpg"
  },
  {
    id: "museu-amanha",
    name: "Museu do Amanhã",
    city: "Rio de Janeiro",
    category: "Cultura",
    interests: ["cultura", "arte", "familia"],
    description: "Ideias, ciência e futuro em um dos edifícios mais marcantes da renovada Praça Mauá.",
    schedule: "Consulte horário e disponibilidade.",
    cost: null,
    rating: null,
    reviews: null,
    image: "imagens/1531058020387-3be344556be6.jpg"
  },
  {
    id: "arpoador",
    name: "Pôr do sol no Arpoador",
    city: "Rio de Janeiro",
    category: "Ao ar livre",
    interests: ["praia", "natureza"],
    description: "Um clássico carioca sem ingresso: leve uma canga, encontre um lugar na pedra e aproveite o fim do dia.",
    schedule: "Consulte condições locais antes da visita.",
    cost: null,
    rating: null,
    reviews: null,
    image: "imagens/1483729558449-99ef09a8c325.jpg"
  },
  {
    id: "feira-sao-cristovao",
    name: "Sabores da Feira de São Cristóvão",
    city: "Rio de Janeiro",
    category: "Gastronomia",
    interests: ["gastronomia", "cultura", "vida-noturna"],
    description: "Comida nordestina, música e artesanato em um passeio cheio de sabor e sotaques.",
    schedule: "Consulte horário e disponibilidade.",
    cost: null,
    rating: null,
    reviews: null,
    image: "imagens/1555939594-58d7cb561ad1.jpg"
  },
  {
    id: "trindade",
    name: "Piscinas naturais de Trindade",
    city: "Paraty",
    category: "Praia & natureza",
    interests: ["praia", "natureza", "aventura"],
    description: "Trilha curta pela Mata Atlântica até uma piscina natural de águas claras entre as pedras.",
    schedule: "Consulte condições locais antes da visita.",
    cost: null,
    rating: null,
    reviews: null,
    image: "imagens/1500375592092-40eb2168fd21.jpg"
  },
  {
    id: "centro-historico-paraty",
    name: "Caminhada pelo Centro Histórico",
    city: "Paraty",
    category: "Cultura",
    interests: ["cultura", "arte", "gastronomia"],
    description: "Ruas de pedra, casarões coloniais e ateliês: descubra o centro no ritmo tranquilo da cidade.",
    schedule: "Consulte horário e disponibilidade.",
    cost: null,
    rating: null,
    reviews: null,
    image: "imagens/1516483638261-f4dbaf036963.jpg"
  },
  {
    id: "cachaçaria-paraty",
    name: "Sabores da cachaça de Paraty",
    city: "Paraty",
    category: "Gastronomia",
    interests: ["gastronomia", "cultura"],
    description: "Conheça a tradição dos alambiques locais e prove sabores que fazem parte da história da região.",
    schedule: "Consulte a disponibilidade antes de ir",
    cost: null,
    rating: null,
    reviews: null,
    image: "imagens/1514362545857-3bc16c4c7d1b.jpg"
  },
  {
    id: "barco-paraty",
    name: "Passeio de barco pela baía",
    city: "Paraty",
    category: "Aventura",
    interests: ["praia", "aventura", "natureza", "familia"],
    description: "Um dia navegando por ilhas e praias da baía, com paradas para banho e paisagens da Costa Verde.",
    schedule: "Saídas pela manhã; confirme com o operador",
    cost: null,
    rating: null,
    reviews: null,
    image: "imagens/1500530855697-b586d89ba3ee.jpg"
  },
  ...makeCityActivities("Rio de Janeiro", [
    ["Cristo Redentor", "Cultura & natureza", ["cultura", "natureza", "familia"], "Monumento no alto do Corcovado, dentro do Parque Nacional da Tijuca; acesso e ingresso dependem do transporte e da visitação."],
    ["Pão de Açúcar e Bondinho", "Natureza", ["natureza", "aventura", "familia"], "Conjunto de morros com acesso por teleférico e vista para a Baía de Guanabara; consulte condições e ingressos."],
    ["Praia de Copacabana", "Praia", ["praia", "natureza", "familia"], "Praia e calçadão em um dos trechos mais conhecidos da orla carioca."],
    ["Parque Nacional da Tijuca", "Natureza", ["natureza", "aventura", "familia"], "Área de Mata Atlântica com trilhas, mirantes e cachoeiras; verifique acessos e condições antes da visita."],
    ["Escadaria Selarón", "Arte & cultura", ["arte", "cultura"], "Escadaria pública decorada pelo artista Jorge Selarón, entre os bairros da Lapa e Santa Teresa."]
  ], "imagens/1483729558449-99ef09a8c325.jpg"),
  ...makeCityActivities("Gramado", [
    ["Rua Coberta", "Passeio urbano", ["cultura", "gastronomia"], "Galeria coberta no centro, com cafés, restaurantes e programação cultural em diferentes épocas do ano."],
    ["Lago Negro", "Natureza", ["natureza", "familia"], "Parque arborizado junto ao lago, conhecido pelas trilhas de caminhada e passeios de pedalinho."],
    ["Mini Mundo", "Atração", ["familia", "cultura"], "Parque ao ar livre com miniaturas de construções e cenas em escala reduzida."],
    ["Igreja Matriz São Pedro", "Cultura", ["cultura", "arte"], "Igreja de pedra basáltica em frente à praça central, um dos marcos arquitetônicos de Gramado."],
    ["Snowland", "Aventura", ["aventura", "familia"], "Parque temático de neve indoor; atrações, calendário e ingressos devem ser verificados com o operador."],
    ["Natal Luz de Gramado", "Evento sazonal", ["cultura", "familia"], "Programação temática de Natal com atrações e espetáculos; datas, horários e ingressos mudam a cada edição."]
  ], "imagens/1470770841072-f978cf4d019e.jpg"),
  ...makeCityActivities("Canela", [
    ["Catedral de Pedra", "Cultura", ["cultura", "arte"], "Igreja de estilo gótico no centro de Canela, conhecida pela torre e pelo conjunto de vitrais."],
    ["Parque Estadual do Caracol", "Natureza", ["natureza", "aventura", "familia"], "Área natural protegida com trilhas e vista para a Cascata do Caracol; consulte regras e acessos antes da visita."],
    ["Bondinhos Aéreos Parques da Serra", "Aventura", ["natureza", "aventura", "familia"], "Teleférico com vista para o vale e para a Cascata do Caracol; operação sujeita a condições e ingresso."],
    ["Castelinho Caracol", "Cultura", ["cultura", "gastronomia"], "Casa histórica de madeira preservada, com visitação e opções de gastronomia local."]
  ], "imagens/1448375240586-882707db888b.jpg"),
  ...makeCityActivities("Florianópolis", [
    ["Ponte Hercílio Luz", "Passeio urbano", ["cultura", "arte"], "Cartão-postal de Florianópolis e ponte pênsil histórica que conecta a ilha ao continente."],
    ["Lagoa da Conceição", "Natureza", ["natureza", "gastronomia", "aventura"], "Região de lagoa com mirantes, esportes aquáticos, restaurantes e acesso a bairros e praias da ilha."],
    ["Praia da Joaquina", "Praia", ["praia", "natureza", "aventura"], "Praia oceânica conhecida pelas dunas próximas e pela prática de surfe, sujeita às condições do mar."],
    ["Mercado Público de Florianópolis", "Gastronomia", ["gastronomia", "cultura"], "Mercado tradicional no centro, com restaurantes, bares e comércio local."]
  ], "imagens/1507525428034-b723cf961d3e.jpg"),
  ...makeCityActivities("Curitiba", [
    ["Jardim Botânico de Curitiba", "Natureza", ["natureza", "familia"], "Jardim público com estufa de estrutura metálica e jardins geométricos, um dos cartões-postais da cidade."],
    ["Museu Oscar Niemeyer", "Arte & cultura", ["arte", "cultura"], "Museu de arte e design conhecido pelo edifício apelidado de Olho; exposições e horários podem variar."],
    ["Ópera de Arame", "Arte & cultura", ["arte", "cultura", "familia"], "Teatro de estrutura tubular e cobertura transparente integrado a uma antiga pedreira."],
    ["Parque Tanguá", "Natureza", ["natureza", "familia"], "Parque municipal com jardins, mirantes e estruturas construídas em antiga área de pedreira."],
    ["Feira do Largo da Ordem", "Evento & gastronomia", ["gastronomia", "cultura", "arte"], "Feira tradicional de artesanato e gastronomia; confirme a data e o funcionamento no calendário local."]
  ], "imagens/1511497584788-876760111969.jpg"),
  ...makeCityActivities("São Paulo", [
    ["Parque Ibirapuera", "Natureza", ["natureza", "familia", "aventura"], "Grande parque urbano com áreas verdes, espaços culturais e caminhos para caminhar e pedalar."],
    ["MASP — Museu de Arte de São Paulo", "Arte & cultura", ["arte", "cultura"], "Museu da Avenida Paulista conhecido por seu edifício suspenso e acervo de arte; consulte a programação."],
    ["Pinacoteca de São Paulo", "Arte & cultura", ["arte", "cultura"], "Museu de artes visuais no centro, com exposições em edifício histórico e espaços culturais próximos."],
    ["Mercado Municipal de São Paulo", "Gastronomia", ["gastronomia", "cultura"], "Mercado central conhecido pela variedade de produtos, bancas e opções de alimentação."],
    ["Bairro da Liberdade", "Passeio urbano", ["gastronomia", "cultura"], "Bairro central com forte presença da cultura japonesa, comércio, restaurantes e feiras em datas específicas."],
    ["Virada Cultural", "Evento", ["arte", "cultura", "vida-noturna"], "Festival de programação cultural pela cidade; consulte se há edição durante as datas da viagem."]
  ], "imagens/1543059080-f9b1272213d5.jpg"),
  ...makeCityActivities("Foz do Iguaçu", [
    ["Cataratas do Iguaçu — lado brasileiro", "Natureza", ["natureza", "aventura", "familia"], "Conjunto de quedas-d'água dentro do Parque Nacional do Iguaçu, Patrimônio Mundial; acesso sujeito a ingresso e regras do parque."],
    ["Parque das Aves", "Natureza", ["natureza", "familia"], "Parque de conservação próximo ao acesso das Cataratas, com viveiros e atividades de educação ambiental."],
    ["Usina de Itaipu", "Passeio", ["cultura", "aventura", "familia"], "Complexo hidrelétrico com diferentes modalidades de visitação, conforme agenda e disponibilidade."],
    ["Marco das Três Fronteiras", "Cultura", ["cultura", "familia"], "Espaço de visitação na fronteira entre Brasil, Argentina e Paraguai, com referências culturais da região."]
  ], "imagens/1433086966358-54859d0ed716.jpg"),
  ...makeCityActivities("Salvador", [
    ["Pelourinho e Centro Histórico", "Cultura", ["cultura", "arte", "gastronomia"], "Conjunto histórico com ruas, igrejas, museus e edifícios coloniais; visite com atenção às orientações locais."],
    ["Elevador Lacerda", "Passeio urbano", ["cultura"], "Elevador público que conecta a Cidade Alta à Cidade Baixa e oferece vista para a Baía de Todos-os-Santos."],
    ["Farol da Barra", "Cultura", ["cultura", "praia", "familia"], "Farol no Forte de Santo Antônio da Barra, junto à orla e ao Museu Náutico da Bahia."],
    ["Mercado Modelo", "Gastronomia", ["gastronomia", "cultura"], "Centro comercial de artesanato e produtos regionais na Cidade Baixa."],
    ["Carnaval de Salvador", "Evento sazonal", ["cultura", "vida-noturna", "gastronomia"], "Festa de rua com circuitos, blocos e apresentações; datas e programação mudam a cada ano."]
  ], "imagens/1518509562904-e7ef99cdcc86.jpg"),
  ...makeCityActivities("Recife", [
    ["Marco Zero e Recife Antigo", "Passeio urbano", ["cultura", "arte", "gastronomia"], "Praça e bairro histórico à beira do porto, com museus, espaços culturais e programação que varia ao longo do ano."],
    ["Instituto Ricardo Brennand", "Arte & cultura", ["arte", "cultura", "familia"], "Complexo cultural com museu, pinacoteca e acervo histórico; consulte exposições e funcionamento."],
    ["Parque das Esculturas Francisco Brennand", "Arte & cultura", ["arte", "cultura"], "Conjunto de esculturas do artista Francisco Brennand na área portuária, com vista para o Marco Zero."],
    ["Praia de Boa Viagem", "Praia", ["praia", "natureza"], "Trecho urbano de praia; observe a sinalização e as orientações locais sobre banho de mar."]
  ], "imagens/1519046904884-53103b34b206.jpg"),
  ...makeCityActivities("Olinda", [
    ["Centro Histórico de Olinda", "Cultura", ["cultura", "arte", "gastronomia"], "Conjunto urbano histórico reconhecido como Patrimônio Mundial, com ladeiras, igrejas e ateliês."],
    ["Alto da Sé", "Passeio urbano", ["cultura", "gastronomia", "familia"], "Mirante e área histórica junto à Catedral da Sé, com vista para Olinda e Recife."],
    ["Mosteiro de São Bento", "Cultura", ["cultura", "arte"], "Conjunto religioso histórico com igreja e decoração barroca; confirme as condições de visitação."],
    ["Carnaval de Olinda", "Evento sazonal", ["cultura", "vida-noturna", "familia"], "Festa popular de rua com blocos e bonecos gigantes; datas e programação mudam a cada ano."]
  ], "imagens/1516483638261-f4dbaf036963.jpg"),
  ...makeCityActivities("Fortaleza", [
    ["Praia do Futuro", "Praia", ["praia", "gastronomia", "familia"], "Praia urbana com barracas e serviços à beira-mar; consulte condições do mar e funcionamento dos estabelecimentos."],
    ["Mercado Central de Fortaleza", "Gastronomia", ["gastronomia", "cultura"], "Mercado de artesanato e produtos regionais no centro da cidade."],
    ["Centro Dragão do Mar de Arte e Cultura", "Arte & cultura", ["arte", "cultura", "vida-noturna"], "Complexo cultural com museus, cinema, planetário e espaços de eventos; programação varia."],
    ["Avenida Beira-Mar e Feirinha", "Passeio urbano", ["gastronomia", "cultura", "familia"], "Trecho de orla com espaços de caminhada, restaurantes e feira de artesanato em horários definidos localmente."]
  ], "imagens/1500375592092-40eb2168fd21.jpg"),
  ...makeCityActivities("Brasília", [
    ["Catedral Metropolitana de Brasília", "Arquitetura", ["cultura", "arte"], "Projeto de Oscar Niemeyer e marco da arquitetura moderna, situado no Eixo Monumental."],
    ["Congresso Nacional", "Arquitetura", ["cultura", "arte"], "Sede do Poder Legislativo Federal, com visitas institucionais sujeitas a agenda e regras de acesso."],
    ["Memorial JK", "Museu", ["cultura", "arte"], "Museu e memorial dedicado à trajetória de Juscelino Kubitschek, com exposição e acervo histórico."],
    ["Santuário Dom Bosco", "Arquitetura", ["cultura", "arte"], "Igreja conhecida pelos vitrais azuis, parte do conjunto de arquitetura moderna da capital."]
  ], "imagens/1519608487953-e999c86e7455.jpg"),
  ...makeCityActivities("Belo Horizonte", [
    ["Conjunto Moderno da Pampulha", "Arquitetura", ["cultura", "arte", "natureza"], "Conjunto de edifícios projetados por Oscar Niemeyer ao redor da lagoa, reconhecido como Patrimônio Mundial."],
    ["Mercado Central de Belo Horizonte", "Gastronomia", ["gastronomia", "cultura"], "Mercado tradicional com produtos mineiros, bares e restaurantes."],
    ["Praça da Liberdade", "Passeio urbano", ["cultura", "arte", "familia"], "Praça ajardinada cercada por edifícios históricos e espaços culturais do Circuito Liberdade."],
    ["Mirante do Mangabeiras", "Natureza", ["natureza", "familia"], "Área pública com vista panorâmica da cidade; acesso e horários dependem das regras locais."]
  ], "imagens/1511497584788-876760111969.jpg"),
  ...makeCityActivities("Bonito", [
    ["Gruta do Lago Azul", "Natureza", ["natureza", "aventura"], "Caverna com lago de águas azuis e visita controlada; passeio requer reserva por agência credenciada."],
    ["Flutuação no Rio da Prata", "Natureza", ["natureza", "aventura"], "Atividade de flutuação em águas de nascente com observação de peixes; exige reserva e segue regras ambientais."],
    ["Buraco das Araras", "Natureza", ["natureza", "aventura", "familia"], "Dolina com trilha e observação de aves em área de conservação; consulte disponibilidade e condições de visita."],
    ["Aquário Natural", "Natureza", ["natureza", "aventura", "familia"], "Atividade de flutuação em nascente de águas transparentes, realizada com acompanhamento e reserva."]
  ], "imagens/1433086966358-54859d0ed716.jpg"),
  ...makeCityActivities("Manaus", [
    ["Teatro Amazonas", "Arte & cultura", ["arte", "cultura"], "Teatro histórico na região central, com visitas e apresentações sujeitas à programação."],
    ["Encontro das Águas", "Natureza", ["natureza", "aventura"], "Fenômeno natural da confluência dos rios Negro e Solimões, geralmente visitado em passeios de barco."],
    ["Mercado Municipal Adolpho Lisboa", "Gastronomia", ["gastronomia", "cultura"], "Mercado histórico com produtos regionais e arquitetura inspirada em mercados europeus."],
    ["MUSA — Museu da Amazônia", "Natureza", ["natureza", "cultura", "familia"], "Museu e área de visitação em floresta, com trilhas e atividades que requerem consulta de horários."]
  ], "imagens/1516026672322-bc52d61a55d5.jpg"),
  ...makeCityActivities("Porto Alegre", [
    ["Orla do Guaíba", "Natureza", ["natureza", "familia"], "Área pública de lazer junto ao lago Guaíba, com espaços de caminhada, bicicleta e contemplação."],
    ["Mercado Público de Porto Alegre", "Gastronomia", ["gastronomia", "cultura"], "Mercado histórico no centro com bancas, restaurantes e produtos regionais."],
    ["Fundação Iberê Camargo", "Arte & cultura", ["arte", "cultura"], "Museu dedicado ao artista Iberê Camargo, em edifício projetado por Álvaro Siza; consulte exposições."],
    ["Parque Farroupilha (Redenção)", "Natureza", ["natureza", "familia"], "Parque urbano tradicional com áreas verdes, feira em dias específicos e atividades ao ar livre."]
  ], "imagens/1470770841072-f978cf4d019e.jpg"),
  ...makeCityActivities("João Pessoa", [
    ["Farol do Cabo Branco", "Passeio urbano", ["cultura", "natureza"], "Marco geográfico e mirante na região do Cabo Branco, no extremo oriental das Américas."],
    ["Praia de Tambaú", "Praia", ["praia", "gastronomia", "familia"], "Orla urbana com hotéis, quiosques e saídas de passeios de barco conforme condições locais."],
    ["Centro Histórico de João Pessoa", "Cultura", ["cultura", "arte"], "Conjunto histórico com igrejas, praças e edifícios de diferentes períodos."],
    ["Piscinas naturais do Seixas", "Natureza", ["praia", "natureza", "aventura"], "Piscinas naturais acessíveis por embarcação em condições específicas de maré e clima; consulte operadores locais."]
  ], "imagens/1507525428034-b723cf961d3e.jpg"),
  ...makeCityActivities("Natal", [
    ["Parque das Dunas", "Natureza", ["natureza", "aventura", "familia"], "Parque urbano e área de Mata Atlântica com trilhas controladas e atividades mediante regras locais."],
    ["Praia de Ponta Negra", "Praia", ["praia", "gastronomia", "familia"], "Praia urbana com vista para o Morro do Careca; observe restrições de acesso à duna e sinalização."],
    ["Forte dos Reis Magos", "Cultura", ["cultura", "arte"], "Fortificação histórica na foz do rio Potengi; confirme abertura para visitação antes de ir."],
    ["Passeio pelas dunas de Genipabu", "Aventura", ["aventura", "natureza", "familia"], "Passeios em dunas e lagoas na região metropolitana, oferecidos por operadores locais e sujeitos a reserva."]
  ], "imagens/1500375592092-40eb2168fd21.jpg"),
  ...makeCityActivities("Búzios", [
    ["Orla Bardot", "Passeio urbano", ["cultura", "gastronomia", "familia"], "Calçadão à beira-mar com esculturas, vista da baía e acesso ao centro de Armação dos Búzios."],
    ["Praia de Geribá", "Praia", ["praia", "aventura"], "Praia extensa procurada para banho e surfe; condições variam conforme o mar."],
    ["Praia da Ferradura", "Praia", ["praia", "natureza", "familia"], "Enseada de águas geralmente abrigadas, com opções de atividades aquáticas conforme condições locais."],
    ["Rua das Pedras", "Gastronomia", ["gastronomia", "vida-noturna", "cultura"], "Rua central com restaurantes, lojas e bares; horários e programação variam por estabelecimento."]
  ], "imagens/1507525428034-b723cf961d3e.jpg"),
  ...makeCityActivities("Aquiraz", [
    ["Beach Park", "Aventura", ["aventura", "familia"], "Complexo de parque aquático e praia no litoral de Aquiraz; ingresso, calendário e atrações devem ser confirmados no site oficial."],
    ["Praia de Porto das Dunas", "Praia", ["praia", "natureza", "familia"], "Praia do município de Aquiraz, próxima a resorts e ao complexo Beach Park."],
    ["Centro Histórico de Aquiraz", "Cultura", ["cultura", "arte"], "Área histórica com construções religiosas e referências à formação do Ceará."]
  ], "imagens/1500375592092-40eb2168fd21.jpg")
];

const reflections = [
  { message: "Que a gratidão por chegar até aqui acompanhe cada passo do caminho.", place: "Dolomitas, Itália", image: "imagens/1519681393784-d120267933ba.jpg", verse: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.", reference: "1 Tessalonicenses 5:18" },
  { message: "Viajar é receber de presente o tempo, os encontros e a chance de olhar a vida de novo.", place: "Lago di Braies, Itália", image: "imagens/1470770841072-f978cf4d019e.jpg", verse: "O Senhor é o meu pastor; nada me faltará.", reference: "Salmos 23:1" },
  { message: "Que cada paisagem lembre você: estar vivo, sonhar e partir também são bênçãos.", place: "Costa de Amalfi, Itália", image: "imagens/1533105079780-92b9be482077.jpg", verse: "Este é o dia que fez o Senhor; regozijemo-nos e alegremo-nos nele.", reference: "Salmos 118:24" },
  { message: "Agradeça pela oportunidade de ir, pela coragem de descobrir e por ter para onde voltar.", place: "Montanhas do mundo", image: "imagens/1464822759023-fed622ff2c3b.jpg", verse: "Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.", reference: "Salmos 37:5" },
  { message: "Que a beleza de um lugar novo abra espaço para reconhecer as belezas que já existem em você.", place: "Lagoa, Islândia", image: "imagens/1472396961693-142e6e269027.jpg", verse: "O Senhor te guardará de todo o mal; guardará a tua alma.", reference: "Salmos 121:7" },
  { message: "Há beleza no caminho e também na pausa para contemplá-lo.", place: "Lago de montanha", image: "imagens/1501785888041-af3ef285b470.jpg", verse: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.", reference: "Provérbios 3:5" },
  { message: "Que novos horizontes renovem a esperança e a alegria de seguir.", place: "Cinque Terre, Itália", image: "imagens/1516483638261-f4dbaf036963.jpg", verse: "Regozijai-vos sempre no Senhor; outra vez digo, regozijai-vos.", reference: "Filipenses 4:4" },
  { message: "A vida floresce quando abrimos espaço para o que nos faz bem.", place: "Praia tropical", image: "imagens/1507525428034-b723cf961d3e.jpg", verse: "A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza.", reference: "2 Coríntios 12:9" },
  { message: "Em cada destino, que não faltem gentileza, presença e bons encontros.", place: "Vale verde", image: "imagens/1469474968028-56623f02e42e.jpg", verse: "Agora, pois, permanecem a fé, a esperança e o amor, estes três; mas o maior destes é o amor.", reference: "1 Coríntios 13:13" },
  { message: "Que cada amanhecer traga motivos para agradecer e continuar sonhando.", place: "Mar aberto", image: "imagens/1518837695005-2083093ee35b.jpg", verse: "Não estejais inquietos por coisa alguma; antes, as vossas petições sejam em tudo conhecidas diante de Deus.", reference: "Filipenses 4:6" }
];

// Fotos da tela inicial: destinos famosos, do Wikimedia Commons, com crédito (imagens/destinos/).
// As frases de reflexão acima giram junto, em sequência própria.
const HERO_DESTINATIONS = [
  { name: "Torre Eiffel", place: "Paris, França", image: "imagens/destinos/eiffel.jpg", author: "Tristan Nitot", license: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:Tour_eiffel_at_sunrise_from_the_trocadero.jpg" },
  { name: "Museu do Louvre", place: "Paris, França", image: "imagens/destinos/louvre.jpg", author: "Benh LIEU SONG (Flickr)", license: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:Louvre_Museum_Wikimedia_Commons.jpg" },
  { name: "Grande Muralha da China", place: "Pequim (arredores), China", image: "imagens/destinos/muralha.jpg", author: "Luka Peternel", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Jinshanling-facing-east-2019-Luka-Peternel.jpg" },
  { name: "Coliseu", place: "Roma, Itália", image: "imagens/destinos/coliseu.jpg", author: "Anil Öztas", license: "CC BY 4.0", page: "https://commons.wikimedia.org/wiki/File:Rom_(IT),_Kolosseum_--_2024_--_0971.jpg" },
  { name: "Taj Mahal", place: "Agra, Índia", image: "imagens/destinos/taj.jpg", author: "Diego Delso", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:El_Taj_Mahal-Agra_India0023.JPG" },
  { name: "Estátua da Liberdade", place: "Nova York, Estados Unidos", image: "imagens/destinos/liberdade.jpg", author: "銀河市長", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Statue_of_liberty_front.jpg" },
  { name: "Pirâmides de Gizé", place: "Gizé, Egito", image: "imagens/destinos/gize.jpg", author: "Ricardo Liberato", license: "CC BY-SA 2.0", page: "https://commons.wikimedia.org/wiki/File:All_Gizah_Pyramids.jpg" },
  { name: "Cristo Redentor", place: "Rio de Janeiro, Brasil", image: "imagens/destinos/cristo.jpg", author: "Nico Kaiser", license: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:Cristo_Redentor_-_Rio_de_Janeiro,_Brasil.jpg" },
  { name: "Basílica da Sagrada Família", place: "Barcelona, Espanha", image: "imagens/destinos/sagrada.jpg", author: "Bernard Gagnon", license: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:Sagrada_Familia_03.jpg" },
  { name: "Palácio de Versalhes", place: "Versalhes, França", image: "imagens/destinos/versalhes.jpg", author: "Myrabella", license: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:Chateau_Versailles_Galerie_des_Glaces.jpg" },
  { name: "Ópera de Sydney", place: "Sydney, Austrália", image: "imagens/destinos/sydney.jpg", focus: "44% 50%", author: "Dietmar Rabich", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Sydney_(AU),_Opera_House_--_2019_--_2152.jpg" },
  { name: "Muro de Berlim", place: "Berlim, Alemanha", image: "imagens/destinos/berlim.jpg", focus: "25% 50%", author: "Pudelek (Marcin Szala)", license: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:Berlin_Wall_near_East_Side_Gallery.JPG" },
  { name: "Alhambra", place: "Granada, Espanha", image: "imagens/destinos/alhambra.jpg", author: "Jebulon", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Dawn_Charles_V_Palace_Alhambra_Granada_Andalusia_Spain.jpg" },
  { name: "Basílica de São Pedro", place: "Cidade do Vaticano", image: "imagens/destinos/saopedro.jpg", author: "Alvesgaspar", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Basilica_di_San_Pietro_in_Vaticano_September_2015-1a.jpg" },
  { name: "Times Square", place: "Nova York, Estados Unidos", image: "imagens/destinos/times.jpg", author: "Anthony Quintano", license: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:The_Night_Before_New_Year%27s_Eve_High_Above_Times_Square.jpg" },
  { name: "Vila do Papai Noel", place: "Rovaniemi, Finlândia", image: "imagens/destinos/rovaniemi.jpg", author: "flightlog", license: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:Santa_Claus_Village_in_Rovaniemi_20120209_01.jpg" },
  { name: "Aurora boreal (vila de Ersfjordbotn)", place: "Tromsø (arredores), Noruega", image: "imagens/destinos/ersfjordbotn.jpg", author: "Rainer Sparenberg/IAU OAE", license: "CC BY 4.0", page: "https://commons.wikimedia.org/wiki/File:Aurorae_(still_images),_Second_Place_(ann21047b).jpg" },
  { name: "Dolomitas", place: "Itália", image: "imagens/destinos/dolomitas.jpg", author: "Wolfgang Moroder", license: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:Frea_pass_Sella_group_Dolomites.jpg" }
];

// ---------------------------------------------------------------------------
// Estado salvo no navegador (chave viagem-na-mao-v1; nunca apagar, só migrar)
// ---------------------------------------------------------------------------

const blankTrip = () => ({
  id: `viagem-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  name: "",
  startDate: "",
  endDate: "",
  departureTime: "",
  budget: 0,
  currency: "BRL",
  country: "Brasil",
  destinations: [],
  transport: "",
  rentalCar: false,
  companions: "",
  children: false,
  seniors: false,
  interests: ["natureza", "gastronomia", "cultura", "praia"],
  saved: [],
  maybe: [],
  dismissed: [],
  itinerary: [],
  expenses: [],
  checklist: {},
  memories: [],
  retro: { title: "", coverPhotoId: "", hidden: [], order: [] },
  closureDismissed: false
});

function migrateDestination(value) {
  const destination = { ...value };
  let lodgings = Array.isArray(destination.lodgings) ? destination.lodgings.filter((item) => item && typeof item === "object") : [];
  if (!lodgings.length && (destination.lodgingName || destination.lodgingAddress)) {
    lodgings = [{ id: `hosp-${destination.id || "cidade"}-1`, name: destination.lodgingName || "", address: destination.lodgingAddress || "", checkIn: destination.startDate || "", checkOut: destination.endDate || "" }];
  }
  destination.lodgings = lodgings.map((item, index) => ({
    id: item.id || `hosp-${destination.id || "cidade"}-${index + 1}`,
    name: String(item.name || ""),
    address: String(item.address || ""),
    checkIn: item.checkIn || "",
    checkOut: item.checkOut || "",
    coordinates: Array.isArray(item.coordinates) && item.coordinates.length === 2 ? item.coordinates.map(Number) : null,
    label: String(item.label || "")
  }));
  delete destination.lodgingName;
  delete destination.lodgingAddress;
  return destination;
}

function migrateTrip(value) {
  const trip = { ...blankTrip(), ...(value || {}) };
  trip.id ||= blankTrip().id;
  trip.destinations = Array.isArray(trip.destinations) ? trip.destinations.filter(Boolean).map(migrateDestination) : [];
  trip.saved = Array.isArray(trip.saved) ? trip.saved : [];
  trip.maybe = Array.isArray(trip.maybe) ? trip.maybe : [];
  trip.dismissed = Array.isArray(trip.dismissed) ? trip.dismissed : [];
  trip.itinerary = Array.isArray(trip.itinerary) ? trip.itinerary : [];
  trip.expenses = Array.isArray(trip.expenses) ? trip.expenses : [];
  trip.interests = Array.isArray(trip.interests) ? trip.interests : [];
  trip.checklist = trip.checklist && typeof trip.checklist === "object" ? trip.checklist : {};
  trip.memories = Array.isArray(trip.memories) ? trip.memories.filter((memory) => memory && memory.id) : [];
  const retro = trip.retro && typeof trip.retro === "object" ? trip.retro : {};
  trip.retro = { title: String(retro.title || ""), coverPhotoId: String(retro.coverPhotoId || ""), hidden: Array.isArray(retro.hidden) ? retro.hidden : [], order: Array.isArray(retro.order) ? retro.order : [] };
  trip.closureDismissed = Boolean(trip.closureDismissed);
  return trip;
}

let storageNotice = "";

function readStoredState() {
  const initial = { trips: [], currentTripId: null, hideAmounts: false, displayCurrency: "BRL", displayCurrencyRate: 1, messageHistory: {}, flags: {}, lastBackupAt: null, reminders: "app", invites: {}, profile: { name: "" } };
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return initial;
    const value = JSON.parse(stored);
    if (Array.isArray(value.trips)) {
      initial.trips = value.trips.map(migrateTrip);
      initial.currentTripId = value.currentTripId || initial.trips[0]?.id || null;
      initial.hideAmounts = Boolean(value.hideAmounts);
      initial.displayCurrency = value.displayCurrency || "BRL";
      initial.displayCurrencyRate = Number(value.displayCurrencyRate) || 1;
      initial.messageHistory = value.messageHistory && typeof value.messageHistory === "object" ? value.messageHistory : {};
      initial.flags = value.flags && typeof value.flags === "object" ? value.flags : {};
      initial.lastBackupAt = value.lastBackupAt || null;
      initial.reminders = value.reminders === "off" ? "off" : "app";
      initial.profile = { name: String(value.profile?.name || "") };
      initial.invites = value.invites && typeof value.invites === "object" ? value.invites : {};
      return initial;
    }
    if (value.trip) {
      const trip = migrateTrip({ ...value.trip, interests: value.interests, saved: value.saved, dismissed: value.dismissed });
      initial.trips.push(trip);
      initial.currentTripId = trip.id;
      return initial;
    }
    throw new Error("Formato de dados de viagem inválido.");
  } catch (error) {
    console.error("Não foi possível carregar as viagens salvas.", error);
    storageNotice = "Não foi possível ler os dados salvos. Suas alterações podem não ficar guardadas.";
    return initial;
  }
}

const state = readStoredState();
let displayAmounts = !state.hideAmounts;

function saveState() {
  try {
    // Marca a viagem aberta como alterada agora (usado para juntar dados entre aparelhos).
    const current = state.trips.find((trip) => trip.id === state.currentTripId);
    if (current) current.updatedAt = new Date().toISOString();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event("estado-salvo"));
    return true;
  } catch (error) {
    console.error("Não foi possível salvar os dados da viagem.", error);
    storageNotice = "Não foi possível salvar neste navegador. Verifique o espaço disponível ou as permissões.";
    toast(storageNotice);
    return false;
  }
}

function getCurrentTrip() {
  return state.trips.find((trip) => trip.id === state.currentTripId) || null;
}

// ---------------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------------

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function icon(name, className = "") {
  return `<svg class="icon ${className}" viewBox="0 0 24 24" aria-hidden="true">${window.ICONS?.[name] || ""}</svg>`;
}

function hydrateIcons(root = document) {
  root.querySelectorAll("svg[data-icon]").forEach((svg) => {
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = window.ICONS?.[svg.dataset.icon] || "";
    svg.removeAttribute("data-icon");
  });
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function safeUrl(value) {
  return /^https?:\/\//i.test(value || "") ? value : "";
}

function capitalize(value) {
  return value ? value.charAt(0).toLocaleUpperCase("pt-BR") + value.slice(1) : value;
}

function formatCurrency(value, currency = "BRL", maximumFractionDigits = 0) {
  try {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency, maximumFractionDigits }).format(Number(value) || 0);
  } catch (error) {
    return `${Number(value) || 0} ${currency}`;
  }
}

// Número com vírgula para mostrar em campos (6.2 → "6,2").
function decimalText(value) {
  return String(value ?? "").replace(".", ",");
}

function rateText(rate) {
  return Number(rate) > 0 ? Number(rate).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 6, useGrouping: false }) : "";
}

function money(value, currency = "BRL", digits = 0) {
  return displayAmounts ? formatCurrency(value, currency, digits) : "••••";
}

function parseLocalDate(dateString) {
  if (!dateString) return null;
  const date = new Date(`${dateString}T12:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(dateString, options = { day: "numeric", month: "short" }) {
  const date = parseLocalDate(dateString);
  return date ? new Intl.DateTimeFormat("pt-BR", { ...options, timeZone: "UTC" }).format(date) : "";
}

function toDateKey(date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

function addDays(dateString, days) {
  const date = parseLocalDate(dateString);
  date.setUTCDate(date.getUTCDate() + days);
  return toDateKey(date);
}

function daysBetween(from, to) {
  return Math.round((parseLocalDate(to) - parseLocalDate(from)) / 86400000);
}

function getBrasiliaDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(date);
  const part = (type) => parts.find((item) => item.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

// Contagem até a saída (horário opcional) e, durante a viagem, em que dia ela está.
// Usa o horário de Brasília (UTC−3, sem horário de verão desde 2019).
const BRASILIA_OFFSET_MS = 3 * 3600000;

function countdownNow() {
  return Date.now();
}

function tripStartMs(trip) {
  const [year, month, day] = trip.startDate.split("-").map(Number);
  const [hours, minutes] = (trip.departureTime || "00:00").split(":").map(Number);
  return Date.UTC(year, month - 1, day, hours, minutes) + BRASILIA_OFFSET_MS;
}

function tripEndMs(trip) {
  const [year, month, day] = trip.endDate.split("-").map(Number);
  return Date.UTC(year, month - 1, day + 1) + BRASILIA_OFFSET_MS;
}

// Diferença em meses, dias, horas e minutos, contando pelo calendário.
function splitDuration(fromMs, toMs) {
  const from = new Date(fromMs - BRASILIA_OFFSET_MS);
  const to = new Date(toMs - BRASILIA_OFFSET_MS);
  const addMonths = (date, count) => {
    const result = new Date(date);
    const day = result.getUTCDate();
    result.setUTCDate(1);
    result.setUTCMonth(result.getUTCMonth() + count);
    result.setUTCDate(Math.min(day, new Date(Date.UTC(result.getUTCFullYear(), result.getUTCMonth() + 1, 0)).getUTCDate()));
    return result;
  };
  let months = (to.getUTCFullYear() - from.getUTCFullYear()) * 12 + to.getUTCMonth() - from.getUTCMonth();
  if (addMonths(from, months) > to) months -= 1;
  let rest = to - addMonths(from, months);
  const days = Math.floor(rest / 86400000);
  rest -= days * 86400000;
  const hours = Math.floor(rest / 3600000);
  rest -= hours * 3600000;
  return { months, days, hours, minutes: Math.floor(rest / 60000) };
}

const plural = (count, one, many) => `${count} ${count === 1 ? one : many}`;

function tripClock(trip) {
  if (!parseLocalDate(trip.startDate) || !parseLocalDate(trip.endDate)) return { phase: "sem-data" };
  const now = countdownNow();
  const start = tripStartMs(trip);
  if (now < start) return { phase: "antes", ...splitDuration(now, start), isToday: getBrasiliaDateKey(new Date(now)) === trip.startDate };
  if (now < tripEndMs(trip)) {
    const today = getBrasiliaDateKey(new Date(now));
    return { phase: "durante", day: daysBetween(trip.startDate, today) + 1, totalDays: daysBetween(trip.startDate, trip.endDate) + 1, elapsed: splitDuration(start, now), daysLeft: daysBetween(today, trip.endDate) };
  }
  return { phase: "depois" };
}

function tripCountdownText(trip) {
  const clock = tripClock(trip);
  if (clock.phase === "sem-data") return "Defina as datas";
  if (clock.phase === "depois") return "Viagem concluída";
  if (clock.phase === "durante") return `Dia ${clock.day} de ${clock.totalDays}`;
  const parts = clock.months ? [plural(clock.months, "mês", "meses"), clock.days && plural(clock.days, "dia", "dias")]
    : clock.days ? [plural(clock.days, "dia", "dias"), clock.hours && `${clock.hours} h`]
    : [clock.hours && `${clock.hours} h`, `${clock.minutes} min`];
  const text = parts.filter(Boolean).join(" e ");
  return clock.isToday ? `É hoje! Faltam ${text}` : `Faltam ${text}`;
}

function renderTripCountdown(trip) {
  const panel = $("#trip-countdown");
  const clock = tripClock(trip);
  panel.hidden = !["antes", "durante"].includes(clock.phase);
  if (panel.hidden) return;
  if (clock.phase === "antes") {
    const units = [
      clock.months && [clock.months, clock.months === 1 ? "mês" : "meses"],
      [clock.days, clock.days === 1 ? "dia" : "dias"],
      [clock.hours, clock.hours === 1 ? "hora" : "horas"],
      [clock.minutes, "min"]
    ].filter(Boolean);
    const when = formatDate(trip.startDate, { weekday: "short", day: "numeric", month: "short" });
    panel.className = "countdown-card";
    panel.innerHTML = `<p class="countdown-label">${clock.isToday ? "É hoje! Falta pouco para a saída" : "Contagem regressiva"}</p>
      <div class="countdown-units">${units.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join("")}</div>
      <p class="countdown-note">${trip.departureTime
        ? `Saída ${escapeHtml(when)} às ${escapeHtml(trip.departureTime)}.`
        : `Até o início do dia ${escapeHtml(when)}.`} <button class="link-btn" type="button" data-edit-departure>${trip.departureTime ? "Mudar horário" : "Adicionar horário de saída"}</button></p>`;
    return;
  }
  const elapsed = clock.elapsed.days ? `${plural(clock.elapsed.days, "dia", "dias")} e ${plural(clock.elapsed.hours, "hora", "horas")}` : plural(clock.elapsed.hours, "hora", "horas");
  panel.className = "countdown-card is-live";
  panel.innerHTML = `<p class="countdown-label">Viagem em andamento</p>
    <div class="countdown-day"><strong>Dia ${clock.day}</strong> <span>de ${clock.totalDays}</span></div>
    <div class="progress"><span style="width:${Math.round((clock.day / clock.totalDays) * 100)}%"></span></div>
    <p class="countdown-note">Viajando há ${elapsed}${clock.daysLeft > 0 ? ` · faltam ${plural(clock.daysLeft, "dia", "dias")}` : " · último dia"}</p>`;
}

// Atualiza contagens visíveis sem redesenhar a tela inteira.
function updateCountdowns() {
  if (document.hidden) return;
  if (route.screen === "home") $$("[data-countdown]").forEach((chip) => {
    const trip = state.trips.find((item) => item.id === chip.dataset.countdown);
    if (trip) chip.innerHTML = `${icon("calendar")} ${escapeHtml(tripCountdownText(trip))}`;
  });
  if (route.screen === "trip" && route.tab === "about") {
    const trip = getCurrentTrip();
    $("#trip-cover-countdown").innerHTML = `${icon("calendar")} ${escapeHtml(tripCountdownText(trip))}`;
    renderTripCountdown(trip);
  }
}

function openDepartureSheet() {
  const trip = getCurrentTrip();
  openSheet(`${sheetTitle("Horário de saída")}
    <p class="muted">A contagem regressiva vai até esse horário no dia da ida (${escapeHtml(formatDate(trip.startDate, { day: "numeric", month: "long" }))}). Horário de Brasília.</p>
    <label class="field">Saída<input id="departure-time" type="time" value="${escapeHtml(trip.departureTime || "")}"></label>
    <div class="row-actions"><button class="btn btn-secondary" type="button" id="departure-clear">Sem horário</button><button class="btn btn-primary" type="button" id="departure-save">${icon("check")} Salvar</button></div>`, (root) => {
    const save = (value) => {
      trip.departureTime = value;
      saveState();
      closeSheet();
      renderTripHeader();
      renderAbout();
      toast(value ? `Saída às ${value}` : "Horário de saída removido");
    };
    root.querySelector("#departure-save").addEventListener("click", () => save(root.querySelector("#departure-time").value || ""));
    root.querySelector("#departure-clear").addEventListener("click", () => save(""));
  });
}

// Editar viagem: nome direto aqui e atalhos para cada parte do cadastro.
function openEditSheet() {
  const trip = getCurrentTrip();
  if (!trip) return;
  const options = [["cities", "map-pin", "Cidades"], ["dates", "calendar", "Datas e horário de saída"], ["people", "users", "Quem vai e como"], ["interests", "heart", "Interesses"], ["budget", "wallet", "Orçamento"]];
  openSheet(`${sheetTitle("Editar viagem")}
    <label class="field">Nome da viagem<input id="edit-trip-name" maxlength="60" value="${escapeHtml(trip.name)}" placeholder="Ex.: Férias de verão"></label>
    <button class="btn btn-primary btn-block" type="button" id="edit-trip-name-save">${icon("check")} Salvar nome</button>
    <div class="edit-options">${options.map(([step, iconName, label]) => `<button type="button" data-edit-step="${step}"><span>${icon(iconName)}</span>${escapeHtml(label)}${icon("chevron-right")}</button>`).join("")}</div>
    <p class="footnote">A hospedagem de cada cidade se edita no Resumo, em “Por onde você vai passar”.</p>`, (root) => {
    const input = root.querySelector("#edit-trip-name");
    const save = () => {
      const name = input.value.trim();
      if (!name) {
        toast("Dê um nome para a viagem");
        input.focus();
        return;
      }
      const previous = trip.name;
      trip.name = name;
      if (!saveState()) {
        trip.name = previous;
        return;
      }
      closeSheet();
      renderTripHeader();
      toast("Nome atualizado");
    };
    root.querySelector("#edit-trip-name-save").addEventListener("click", save);
    input.addEventListener("keydown", (event) => { if (event.key === "Enter") save(); });
    root.querySelector(".edit-options").addEventListener("click", (event) => {
      const button = event.target.closest("[data-edit-step]");
      if (!button) return;
      closeSheet();
      editTrip(button.dataset.editStep);
    });
  });
}

function formatRange(start, end, withYear = true) {
  if (!start) return "Datas a definir";
  return `${formatDate(start)} – ${formatDate(end, withYear ? { day: "numeric", month: "short", year: "numeric" } : undefined)}`;
}

function nightsLabel(nights) {
  return `${nights} ${nights === 1 ? "noite" : "noites"}`;
}

function distanceKm([lat1, lon1], [lat2, lon2]) {
  const rad = (value) => (value * Math.PI) / 180;
  const a = Math.sin(rad(lat2 - lat1) / 2) ** 2
    + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lon2 - lon1) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}

function normalizeText(value) {
  return String(value || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

function sameCity(a, b) {
  return String(a || "").localeCompare(String(b || ""), "pt-BR", { sensitivity: "base" }) === 0;
}

function addImageFallbacks(container) {
  container.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => { image.style.visibility = "hidden"; }, { once: true });
  });
}

const announcer = document.querySelector("#app-announcement");
function announce(message) {
  announcer.textContent = "";
  window.requestAnimationFrame(() => { announcer.textContent = message; });
}

const toastElement = document.createElement("p");
toastElement.className = "toast";
toastElement.setAttribute("role", "status");
document.querySelector("#app").append(toastElement);
let toastTimer = null;
function toast(message) {
  toastElement.textContent = message;
  toastElement.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastElement.classList.remove("is-visible"), 2600);
}

// ---------------------------------------------------------------------------
// Catálogo ampliado: fontes abertas, 100+ cidades e OpenStreetMap
// ---------------------------------------------------------------------------

const openData = window.OPEN_DATA?.activities || {};
const cityData = window.CITY_DATA || { cities: [], places: [] };
const osmData = window.OSM_DATA || { places: [] };
const categoryImages = {};
activities.forEach((activity) => { categoryImages[activity.category] ||= activity.image; });
const editorialNames = new Set(activities.map((activity) => `${slugify(activity.city)}|${slugify(activity.name)}`));
const commonsPage = (file) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, "_"))}`;

cityData.places.forEach((place) => {
  if (editorialNames.has(`${slugify(place.city)}|${slugify(place.name)}`)) return;
  activities.push({
    id: place.id,
    name: place.name,
    city: place.city,
    country: place.country,
    category: place.category,
    interests: place.interests,
    description: place.extract,
    descriptionSource: "wikipedia",
    schedule: "Horários e disponibilidade variam; confirme antes de ir.",
    cost: null,
    image: place.photo?.url || categoryImages[place.category] || categoryImages.Cultura,
    nearCities: place.nearCities
  });
  openData[place.id] = {
    coordinates: place.coordinates,
    wikipedia: { title: place.title, url: `https://pt.wikipedia.org/wiki/${encodeURIComponent(place.title.replace(/ /g, "_"))}`, extract: "" },
    wikidata: place.wikidata,
    website: place.website,
    photo: place.photo && { ...place.photo, page: commonsPage(place.photo.file) }
  };
});

osmData.places.forEach((place) => {
  if (editorialNames.has(`${slugify(place.city)}|${slugify(place.name)}`)) return;
  activities.push({
    id: place.id,
    name: place.name,
    city: place.city,
    country: place.country,
    category: place.category,
    interests: place.interests,
    description: `${place.kind}${place.details ? ` · ${place.details}` : ""}. Informações cadastradas no OpenStreetMap; confirme antes de ir.`,
    descriptionSource: "osm",
    schedule: place.openingHours ? `Horário no OpenStreetMap: ${place.openingHours}` : "Horários variam; confirme antes de ir.",
    openingHours: place.openingHours || "",
    cost: null,
    image: place.photo?.url || categoryImages[place.category] || categoryImages.Cultura,
    nearCities: place.nearCities
  });
  openData[place.id] = {
    coordinates: place.coordinates,
    website: place.website,
    osm: place.osm,
    photo: place.photo && { ...place.photo, page: commonsPage(place.photo.file) }
  };
});

function getOpenData(id) {
  return openData[id] || null;
}

function getActivity(id) {
  return activities.find((activity) => activity.id === id);
}

function activityMatchesCity(activity, cityName) {
  return sameCity(activity.city, cityName) || (activity.nearCities || []).some(([name]) => sameCity(name, cityName));
}

function getCityInfo(name) {
  return cityData.cities.find((city) => sameCity(city.name, name)) || null;
}

function getTripActivities(trip, key = "saved") {
  return (trip?.[key] || []).map((item) => ({ ...item, activity: getActivity(item.id) })).filter((item) => item.activity);
}

function getExpensesTotal(trip) {
  return (trip?.expenses || []).reduce((total, expense) => total + (Number(expense.amountBRL) || 0), 0);
}

function getTripForecastBRL(trip) {
  return getExpensesTotal(trip) + getTripActivities(trip).reduce((total, item) => total + (item.activity.cost || 0), 0);
}

function getBudgetInBRL(trip) {
  return (Number(trip?.budget) || 0) * (Number(trip?.budgetExchangeRate) || 1);
}

// Moeda da viagem: a do orçamento. Cotação = quanto vale 1 unidade em reais.
const tripCurrency = (trip) => trip?.currency || "BRL";
const tripRate = (trip) => (tripCurrency(trip) === "BRL" ? 1 : Number(trip?.budgetExchangeRate) || 0);

// Despesa na moeda da viagem: usa o valor original quando a moeda é a mesma.
function expenseInTrip(trip, expense) {
  if ((expense.currency || "BRL") === tripCurrency(trip)) return Number(expense.amount) || 0;
  const rate = tripRate(trip);
  return rate > 0 ? (Number(expense.amountBRL) || 0) / rate : 0;
}

function spentInTrip(trip) {
  return (trip?.expenses || []).reduce((total, expense) => total + expenseInTrip(trip, expense), 0);
}

function forecastInTrip(trip) {
  const rate = tripRate(trip) || 1;
  return spentInTrip(trip) + getTripActivities(trip).reduce((total, item) => total + (item.activity.cost || 0), 0) / rate;
}

// Mostra na moeda da viagem ou, se a pessoa preferir, em reais pela cotação informada.
function tripMoney(trip, value, digits = 0) {
  if (trip.showInBRL && tripCurrency(trip) !== "BRL") return money(value * tripRate(trip), "BRL", digits);
  return money(value, tripCurrency(trip), digits);
}

function photoOf(activity) {
  const photo = getOpenData(activity.id)?.photo;
  return photo && safeUrl(photo.url) ? photo : null;
}

function imageOf(activity) {
  return photoOf(activity)?.url || activity.image;
}

function tripCities(trip) {
  return trip.destinations.map((destination) => destination.name).filter(Boolean);
}

// Imagem de capa: de preferência uma foto real (com crédito) de um lugar da viagem.
function coverFor(trip) {
  const cities = tripCities(trip);
  const matches = activities.filter((activity) => cities.some((city) => activityMatchesCity(activity, city)));
  const withPhoto = matches.find((activity) => photoOf(activity));
  const activity = withPhoto || matches[0];
  return { activity, image: activity ? imageOf(activity) : reflections[0].image, photo: withPhoto ? photoOf(withPhoto) : null };
}

// ---------------------------------------------------------------------------
// Tempo de carro e a pé (OSRM público da FOSSGIS; uso não comercial, 1 req/s)
// ---------------------------------------------------------------------------

const ROUTE_CACHE_KEY = "viagem-na-mao-rotas-v1";
const ROUTE_INTERVAL_MS = 1100;
const routeCache = (() => {
  try {
    return JSON.parse(window.localStorage.getItem(ROUTE_CACHE_KEY)) || {};
  } catch (error) {
    return {};
  }
})();
const routeQueue = [];
const routeFailed = new Set();
let routeRunning = false;
const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

function routeKey(from, to) {
  return `${from[0]},${from[1]};${to[0]},${to[1]}`;
}

async function fetchRoute(profile, from, to) {
  const url = `https://routing.openstreetmap.de/routed-${profile}/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=false`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`OSRM respondeu ${response.status}`);
  const data = await response.json();
  if (data.code !== "Ok" || !data.routes?.length) throw new Error(`OSRM: ${data.code}`);
  return data.routes[0];
}

function formatDuration(seconds) {
  const minutes = Math.max(1, Math.round(seconds / 60));
  if (minutes < 60) return `${minutes} min`;
  const rest = minutes % 60;
  return `${Math.floor(minutes / 60)} h${rest ? ` ${rest} min` : ""}`;
}

function routeText(key, straightKm) {
  const straight = `≈ ${straightKm.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} km em linha reta`;
  const route = routeCache[key];
  if (route) return `${formatDuration(route.car)} de carro · ${formatDuration(route.foot)} a pé (sem trânsito)`;
  if (routeFailed.has(key)) return `${straight} · tempo indisponível`;
  return `${straight} · calculando tempo…`;
}

function paintRoutes(key) {
  document.querySelectorAll(`[data-route="${key}"]`).forEach((element) => {
    element.textContent = routeText(key, Number(element.dataset.straightKm));
  });
}

async function runRouteQueue() {
  if (routeRunning) return;
  routeRunning = true;
  while (routeQueue.length) {
    const key = routeQueue.shift();
    const [from, to] = key.split(";").map((point) => point.split(",").map(Number));
    try {
      const car = await fetchRoute("car", from, to);
      await wait(ROUTE_INTERVAL_MS);
      const foot = await fetchRoute("foot", from, to);
      routeCache[key] = { car: Math.round(car.duration), foot: Math.round(foot.duration) };
      try {
        window.localStorage.setItem(ROUTE_CACHE_KEY, JSON.stringify(routeCache));
      } catch (error) {
        console.warn("Não foi possível guardar o tempo de deslocamento.", error);
      }
    } catch (error) {
      console.warn("Não foi possível calcular o tempo de deslocamento.", error);
      routeFailed.add(key);
    }
    paintRoutes(key);
    await wait(ROUTE_INTERVAL_MS);
  }
  routeRunning = false;
}

function requestRoutes(container) {
  container.querySelectorAll("[data-route]").forEach((element) => {
    const key = element.dataset.route;
    if (routeCache[key] || routeFailed.has(key) || routeQueue.includes(key)) return;
    routeQueue.push(key);
  });
  runRouteQueue();
}

// ---------------------------------------------------------------------------
// Navegação entre telas (o botão voltar do celular também funciona)
// ---------------------------------------------------------------------------

let route = { screen: "home", tab: "about", depth: 0 };

function showScreen(name) {
  $$(".screen").forEach((screen) => { screen.hidden = screen.dataset.screen !== name; });
}

function navigate(next, { replace = false } = {}) {
  const previousScreen = route.screen;
  route = { ...route, ...next, depth: replace ? route.depth : route.depth + 1 };
  window.history[replace ? "replaceState" : "pushState"]({ ...route }, "");
  render({ scroll: previousScreen !== route.screen || !replace });
}

function goBack() {
  if (sheet.open && !closeSheet()) return;
  if ((window.history.state?.depth || 0) > 0) window.history.back();
  else navigate({ screen: "home" }, { replace: true });
}

window.addEventListener("popstate", (event) => {
  if (sheet.open && !closeSheet()) {
    // A pessoa ainda está decidindo se descarta a memória: desfaz o voltar.
    window.history.pushState({ ...route }, "");
    return;
  }
  route = event.state || { screen: "home", tab: "about", depth: 0 };
  render({ scroll: true });
});

function render({ scroll = true } = {}) {
  const trip = getCurrentTrip();
  if (["trip", "deck", "retro"].includes(route.screen) && !trip) route = { screen: "home", tab: "about", depth: 0 };
  if (route.screen !== "retro") retroEditing = false;
  if (route.screen === "form" && !wizard) route = { screen: "home", tab: "about", depth: 0 };
  showScreen(route.screen);
  if (scroll) window.scrollTo(0, 0);
  if (route.screen === "home") renderHome();
  if (route.screen === "trip") {
    renderTripHeader();
    showTab(route.tab || "about");
  }
  if (route.screen === "deck") renderDeck();
  if (route.screen === "retro") renderRetro();
  if (route.screen === "form") renderWizard();
  if (route.screen === "trip" && reopenEditSheet) {
    reopenEditSheet = false;
    openEditSheet();
  }
}

function openTrip(id) {
  if (!state.trips.some((trip) => trip.id === id)) return;
  state.currentTripId = id;
  saveState();
  selectedDay = null;
  navigate({ screen: "trip", tab: "about" });
}

function showTab(tabName) {
  route.tab = tabName;
  $$("[data-tab-panel]").forEach((panel) => { panel.hidden = panel.dataset.tabPanel !== tabName; });
  $$("#trip-navigation [data-tab]").forEach((button) => {
    const active = button.dataset.tab === tabName;
    button.classList.toggle("is-active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  $("#expense-fab").hidden = tabName !== "expenses";
  ({ about: renderAbout, itinerary: renderItinerary, discover: renderDiscoverTab, expenses: renderExpenses, before: renderGuide, memories: renderMemories })[tabName]?.();
}

// ---------------------------------------------------------------------------
// Início
// ---------------------------------------------------------------------------

let inspirationIndex = 0;
const INSPIRATION_INTERVAL_MS = 30000;

function renderInspiration() {
  const destination = HERO_DESTINATIONS[inspirationIndex];
  const item = { ...reflections[inspirationIndex % reflections.length], image: destination.image };
  const current = $(".hero-img.is-active");
  const next = current?.id === "hero-img-a" ? $("#hero-img-b") : $("#hero-img-a");
  next.src = item.image;
  next.style.objectPosition = destination.focus || "50% 50%";
  next.alt = `${destination.name}, ${destination.place}`;
  const swap = () => {
    next.classList.add("is-active");
    next.removeAttribute("aria-hidden");
    if (current && current !== next) {
      current.classList.remove("is-active");
      current.setAttribute("aria-hidden", "true");
    }
  };
  if (next.complete) swap();
  else next.addEventListener("load", swap, { once: true });
  $("#hero-location").textContent = `${destination.name} — ${destination.place}`;
  const credit = $("#hero-credit");
  credit.href = destination.page;
  credit.textContent = `Foto: ${destination.author} · ${destination.license} · Wikimedia Commons`;
  $("#home-verse-text").textContent = `“${item.verse}”`;
  $("#home-verse-reference").textContent = item.reference;
  $("#hero-dots").innerHTML = HERO_DESTINATIONS.map((_, index) => `<span class="${index === inspirationIndex ? "is-active" : ""}"></span>`).join("");
  const preload = new Image();
  preload.src = HERO_DESTINATIONS[(inspirationIndex + 1) % HERO_DESTINATIONS.length].image;
}

function changeInspiration(direction) {
  inspirationIndex = (inspirationIndex + direction + HERO_DESTINATIONS.length) % HERO_DESTINATIONS.length;
  renderInspiration();
}

function setAmountToggle(button) {
  button.innerHTML = icon(displayAmounts ? "eye" : "eye-off");
  button.setAttribute("aria-label", displayAmounts ? "Ocultar valores" : "Mostrar valores");
}

function toggleAmounts() {
  displayAmounts = !displayAmounts;
  state.hideAmounts = !displayAmounts;
  saveState();
  render({ scroll: false });
}

// Viagem em foco na tela inicial: a em andamento ou a próxima; sem nenhuma, a mais recente.
function focusTrip() {
  const today = getBrasiliaDateKey();
  const sorted = [...state.trips].sort((a, b) => (a.startDate || "").localeCompare(b.startDate || ""));
  return sorted.find((trip) => trip.endDate >= today) || [...sorted].sort((a, b) => (b.endDate || "").localeCompare(a.endDate || ""))[0] || null;
}

function greetingText() {
  const hour = new Date().getHours();
  const period = hour < 5 ? "Boa noite" : hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";
  const name = (state.profile?.name || "").trim().split(/\s+/)[0];
  return name ? `${period}, ${name}!` : `${period}!`;
}

// Cartão de reflexão: destacado, opcional e dispensável (some pelo resto do dia).
function reflectionDismissed(key) {
  return state.flags.reflections?.[key] === getBrasiliaDateKey();
}

function reflectionSpotlight(key, kicker, text) {
  if (!text || reflectionDismissed(key)) return "";
  return `<section class="spotlight" aria-label="Reflexão">
      <span class="spotlight-sun" aria-hidden="true">${icon("sun")}</span>
      <div class="spotlight-copy">
        <p class="spotlight-kicker">${escapeHtml(kicker)}</p>
        <p class="spotlight-text">${escapeHtml(text)}</p>
      </div>
      <svg class="spotlight-art" viewBox="0 0 320 90" aria-hidden="true" preserveAspectRatio="none"><path d="M0 70 C60 40 110 62 170 50 C230 38 270 58 320 44 L320 90 L0 90 Z" fill="#56D7AE" opacity=".35"/><path d="M0 82 C80 62 150 80 220 70 C260 64 290 72 320 66 L320 90 L0 90 Z" fill="#56D7AE" opacity=".5"/></svg>
      <button class="spotlight-close" type="button" data-dismiss-reflection="${escapeHtml(key)}" aria-label="Dispensar reflexão">${icon("x")}</button>
    </section>`;
}

function renderHomeReflection() {
  const today = getBrasiliaDateKey();
  const kickers = ["Um momento pra agradecer", "Pausa pra refletir"];
  const kicker = kickers[Number(today.slice(-2)) % kickers.length];
  $("#home-reflection").innerHTML = reflectionSpotlight("home", kicker, messageFor("reflexoes", `home|${today}`));
  hydrateIcons($("#home-reflection"));
}

// Período curto: "25 a 31 de out." no mesmo mês; "28 de out. a 2 de nov." entre meses.
function shortRange(start, end) {
  if (!parseLocalDate(start) || !parseLocalDate(end)) return "Datas a definir";
  const day = (date) => parseLocalDate(date).getUTCDate();
  const month = (date) => formatDate(date, { month: "short" });
  return start.slice(0, 7) === end.slice(0, 7) ? `${day(start)} a ${day(end)} de ${month(end)}` : `${day(start)} de ${month(start)} a ${day(end)} de ${month(end)}`;
}

function focusCardHtml(trip) {
  const cover = coverFor(trip);
  const clock = tripClock(trip);
  const action = clock.phase === "durante" ? "Continuar viagem" : clock.phase === "depois" ? "Rever viagem" : "Abrir viagem";
  return `<article class="focus-card">
      <div class="focus-photo">
        <img src="${escapeHtml(cover.image)}" alt="">
        <span class="chip chip-glass focus-chip" data-countdown="${escapeHtml(trip.id)}">${icon("calendar")} ${escapeHtml(tripCountdownText(trip))}</span>
        ${cover.photo ? `<a class="photo-credit" href="${escapeHtml(safeUrl(cover.photo.page))}" target="_blank" rel="noopener noreferrer">Foto: ${escapeHtml(cover.photo.author)} · ${escapeHtml(cover.photo.license)}</a>` : ""}
      </div>
      <div class="focus-body">
        <h2>${escapeHtml(trip.name || "Minha viagem")}</h2>
        <p class="focus-cities">${escapeHtml(tripCities(trip).join(" · ") || trip.country || "Destino a definir")}</p>
        <div class="focus-row">
          <span class="focus-dates">${icon("calendar")} ${escapeHtml(shortRange(trip.startDate, trip.endDate))}</span>
          <button class="btn btn-primary focus-cta" type="button" data-open-trip="${escapeHtml(trip.id)}">${action} ${icon("arrow-right")}</button>
        </div>
      </div>
    </article>`;
}

function renderHome() {
  setAmountToggle($("#toggle-home-amounts"));
  const name = (state.profile?.name || "").trim();
  $("#home-greeting").textContent = greetingText();
  $("#avatar-initial").innerHTML = name ? escapeHtml(name[0].toUpperCase()) : icon("user");
  renderHomeReflection();
  renderHomeInvite();
  const focus = focusTrip();
  const focusContainer = $("#home-focus");
  $(".quick-access").dataset.trip = focus?.id || "";
  if (!focus) {
    $("#home-subtitle").textContent = "Sua próxima história começa aqui.";
    focusContainer.innerHTML = `<div class="home-empty">${icon("plane")}<h3>Que tal planejar a primeira viagem?</h3><p>Junte destinos, roteiro, custos e memórias em um só lugar.</p><button class="btn btn-primary" type="button" data-new-trip>${icon("plus")} Planejar viagem</button></div>`;
  } else {
    const phase = tripClock(focus).phase;
    $("#home-subtitle").textContent = phase === "durante" ? "Bom passeio! Sua viagem está acontecendo." : phase === "depois" ? "Que tal reviver sua última viagem?" : "Sua próxima história começa aqui.";
    focusContainer.innerHTML = focusCardHtml(focus);
  }
  hydrateIcons(focusContainer);
  addImageFallbacks(focusContainer);

  const container = $("#trip-cards");
  const trips = [...state.trips].sort((a, b) => (a.startDate || "").localeCompare(b.startDate || ""));
  $("#all-trips").hidden = !trips.length;
  container.innerHTML = trips.map((trip) => {
    const cover = coverFor(trip);
    const budget = Number(trip.budget) || 0;
    return `<button class="trip-card" type="button" data-open-trip="${escapeHtml(trip.id)}">
      <img src="${escapeHtml(cover.image)}" alt="" loading="lazy">
      <span class="trip-card-info">
        <strong class="trip-card-name">${escapeHtml(trip.name || "Minha viagem")}</strong>
        <span class="trip-card-cities">${escapeHtml(tripCities(trip).join(" · ") || trip.country || "Destino a definir")}</span>
        <span class="trip-card-meta"><span data-countdown="${escapeHtml(trip.id)}">${icon("calendar")} ${escapeHtml(tripCountdownText(trip))}</span><span>${budget ? escapeHtml(money(budget, tripCurrency(trip))) : escapeHtml(money(spentInTrip(trip), tripCurrency(trip)))}</span></span>
      </span>
      ${icon("chevron-right")}
    </button>`;
  }).join("");
  addImageFallbacks(container);
}

// ---------------------------------------------------------------------------
// Viagem: cabeçalho e Resumo
// ---------------------------------------------------------------------------

const TRANSPORT_ICONS = { "Avião": "plane", "Carro próprio": "car", "Carro alugado": "car", "Ônibus": "bus", "Trem": "train-front", "Navio / cruzeiro": "ship", "Outro": "route" };
const INTEREST_ICONS = { natureza: "trees", gastronomia: "utensils", cultura: "landmark", praia: "waves", aventura: "mountain", "vida-noturna": "moon", arte: "palette", familia: "baby", compras: "shopping-bag" };
const INTEREST_LABELS = { natureza: "Natureza", gastronomia: "Gastronomia", cultura: "Cultura", praia: "Praia", aventura: "Aventura", "vida-noturna": "Vida noturna", arte: "Arte & design", familia: "Para a família", compras: "Compras" };

function renderTripHeader() {
  const trip = getCurrentTrip();
  if (!trip) return;
  $("#trip-heading").textContent = trip.name || "Minha viagem";
  $("#trip-bar-dates").textContent = formatRange(trip.startDate, trip.endDate);
  const cover = coverFor(trip);
  const image = $("#trip-cover-image");
  image.src = cover.image;
  image.style.visibility = "";
  image.alt = cover.photo ? `Foto de ${cover.activity.name}` : "Paisagem ilustrativa";
  $("#trip-cover-destination").textContent = tripCities(trip).join(" · ") || trip.country || "Destino a definir";
  $("#trip-cover-dates").textContent = formatRange(trip.startDate, trip.endDate);
  $("#trip-cover-countdown").innerHTML = `${icon("calendar")} ${escapeHtml(tripCountdownText(trip))}`;
  const credit = $("#trip-cover-credit");
  credit.hidden = !cover.photo;
  if (cover.photo) {
    credit.href = safeUrl(cover.photo.page);
    credit.textContent = `${cover.activity.name} · Foto: ${cover.photo.author} · ${cover.photo.license}`;
  }
  addImageFallbacks($("#screen-trip .cover"));
}

function renderAbout() {
  const trip = getCurrentTrip();
  renderApertoQuick(trip);
  const ideas = getDiscoverableActivities(trip, "all");
  $("#discover-cta-count").textContent = ideas.length
    ? `${ideas.length} ${ideas.length === 1 ? "lugar" : "lugares"} para curtir ou passar`
    : "Você já viu todas as ideias";
  $("#trip-destination-list").innerHTML = trip.destinations.length
    ? trip.destinations.map((destination, index) => {
      const nights = destination.startDate && destination.endDate ? daysBetween(destination.startDate, destination.endDate) : 0;
      const lodgings = sortedLodgings(destination);
      const gaps = lodgings.length ? uncoveredNights(destination) : [];
      return `<li><span class="timeline-dot">${index + 1}</span>
        <div><strong>${escapeHtml(destination.name)}</strong><small>${escapeHtml(formatRange(destination.startDate, destination.endDate, false))} · ${nightsLabel(nights)}</small>
        ${lodgings.map((lodging) => `<button class="lodging-item" type="button" data-lodging-edit="${index}|${escapeHtml(lodging.id)}">${icon("bed-double")}<span><strong>${escapeHtml(lodging.name || lodging.address || "Hospedagem")}</strong><small>${escapeHtml(lodgingRange(lodging))}${lodging.coordinates ? "" : " · sem localização"}</small></span></button>`).join("")}
        ${gaps.length ? `<small class="lodging-gap">${icon("info")} Sem hospedagem: ${gaps.map((date) => escapeHtml(formatDate(date, { day: "numeric", month: "short" }))).join(", ")}</small>` : ""}
        <button class="link-btn lodging" type="button" data-lodging-add="${index}">${icon("plus")} Adicionar hospedagem</button></div>
        <span></span></li>`;
    }).join("")
    : '<li><div class="muted">Ainda não há cidades cadastradas.</div></li>';
  const saved = getTripActivities(trip);
  $("#saved-strip-card").hidden = !saved.length;
  $("#saved-strip").innerHTML = saved.map(({ activity }) => `<button class="mini-place" type="button" data-place="${escapeHtml(activity.id)}"><img src="${escapeHtml(imageOf(activity))}" alt="" loading="lazy"><span>${escapeHtml(activity.name)}</span></button>`).join("");
  addImageFallbacks($("#saved-strip"));
  renderBudgetCard(trip);
  renderMemoriesCard(trip);
  renderTripCountdown(trip);
  renderTripMessage(trip);
  renderTripInvite(trip);
  const details = [
    trip.transport && `${icon(TRANSPORT_ICONS[trip.transport] || "route")} ${escapeHtml(trip.transport)}`,
    trip.companions && `${icon("users")} ${escapeHtml(trip.companions)}`,
    trip.children && `${icon("baby")} Crianças`,
    trip.seniors && `${icon("heart")} Idosos`
  ].filter(Boolean);
  $("#travel-details").innerHTML = details.length
    ? details.map((detail) => `<span class="chip">${detail}</span>`).join("")
    : '<span class="muted">Conte como você vai viajar ao editar a viagem.</span>';
  $("#trip-interests").innerHTML = trip.interests.map((id) => `<span class="chip">${icon(INTEREST_ICONS[id] || "star")} ${escapeHtml(INTEREST_LABELS[id] || id)}</span>`).join("");
}

function renderBudgetCard(trip) {
  setAmountToggle($("#toggle-budget-visibility"));
  const currency = tripCurrency(trip);
  const budget = Number(trip.budget) || 0;
  const forecast = forecastInTrip(trip);
  $("#trip-budget-total").textContent = budget ? money(budget, currency) : "Sem orçamento definido";
  $("#trip-budget-spent").textContent = `Gastos: ${money(spentInTrip(trip), currency)}`;
  $("#trip-budget-left").textContent = budget ? `Saldo: ${money(budget - forecast, currency)}` : "";
  const hint = $("#trip-budget-hint");
  hint.hidden = currency === "BRL" || !budget || !displayAmounts;
  if (!hint.hidden) hint.textContent = `≈ ${formatCurrency(budget * tripRate(trip), "BRL")} · cotação 1 ${currency} = ${formatCurrency(tripRate(trip), "BRL", 2)}`;
  const bar = $("#trip-budget-progress");
  bar.style.width = budget ? `${Math.min(100, (forecast / budget) * 100)}%` : "0%";
  bar.classList.toggle("is-over", budget > 0 && forecast > budget);
}

// ---------------------------------------------------------------------------
// Descobrir: aba (curtidas e talvez) e tela exclusiva do swipe
// ---------------------------------------------------------------------------

let deckCity = "all";
let currentActivityId = null;

function getDiscoverableActivities(trip, city = deckCity) {
  return activities.filter((activity) => {
    const inTrip = trip.destinations.some((destination) => activityMatchesCity(activity, destination.name));
    const matchesCity = city === "all" || activityMatchesCity(activity, city);
    const matchesInterest = trip.interests.length === 0 || activity.interests.some((interest) => trip.interests.includes(interest));
    const handled = trip.saved.some((item) => item.id === activity.id)
      || trip.maybe.some((item) => item.id === activity.id)
      || trip.dismissed.includes(activity.id);
    return inTrip && matchesCity && matchesInterest && !handled;
  });
}

function discoveryStats(trip, city = deckCity) {
  const pool = activities.filter((activity) => trip.destinations.some((destination) => activityMatchesCity(activity, destination.name))
    && (city === "all" || activityMatchesCity(activity, city))
    && (trip.interests.length === 0 || activity.interests.some((interest) => trip.interests.includes(interest))));
  const remaining = getDiscoverableActivities(trip, city);
  return { total: pool.length, remaining: remaining.length, evaluated: pool.length - remaining.length, next: remaining[0] || null, pool };
}

// Resumo curto para o cartão: primeira frase (ou corte em palavra), sem perder o texto completo em Detalhes.
function shortDescription(text, max = 130) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const sentence = clean.match(/^.{40,}?[.!?](\s|$)/);
  if (sentence && sentence[0].length <= max) return sentence[0].trim();
  return `${clean.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

function placeTile(activity, badge = "") {
  return `<button class="place-tile" type="button" data-place="${escapeHtml(activity.id)}"><img src="${escapeHtml(imageOf(activity))}" alt="" loading="lazy">${badge}<span><strong>${escapeHtml(activity.name)}</strong><small>${escapeHtml(activity.city)}</small></span></button>`;
}

function renderDiscoverTab() {
  const trip = getCurrentTrip();
  const cities = [...new Set(tripCities(trip))];
  if (deckCity !== "all" && !cities.some((city) => sameCity(city, deckCity))) deckCity = "all";
  const stats = discoveryStats(trip);
  const spot = stats.next || stats.pool[0] || null;
  const place = deckCity === "all" ? (cities.length > 1 ? "Toda a viagem" : cities[0] || "Sua viagem") : deckCity;
  const action = stats.remaining === 0 ? "" : stats.evaluated ? "Continuar descobrindo" : "Começar a descobrir";
  const photo = spot ? photoOf(spot) : null;
  $("#discover-spot").innerHTML = `
    <div class="spot-photo">
      <img src="${escapeHtml(spot ? imageOf(spot) : coverFor(trip).image)}" alt="">
      <span class="chip chip-glass spot-chip">${icon("map-pin")} ${stats.remaining ? `${stats.remaining} ${stats.remaining === 1 ? "lugar esperando" : "lugares esperando"} por você` : "Tudo avaliado por aqui"}</span>
      ${photo ? `<a class="photo-credit" href="${escapeHtml(safeUrl(photo.page))}" target="_blank" rel="noopener noreferrer">${escapeHtml(spot.name)} · Foto: ${escapeHtml(photo.author)} · ${escapeHtml(photo.license)}</a>` : ""}
    </div>
    <div class="spot-body">
      <h3>${escapeHtml(place)}</h3>
      <p>${stats.remaining ? `Próximo: ${escapeHtml(stats.next.name)}` : stats.total ? "Você já avaliou todos os lugares deste filtro. Reveja o que ficou em Talvez ou troque de cidade." : "Ainda não há lugares para os seus interesses aqui. Ajuste os interesses ao editar a viagem."}</p>
      ${action ? `<button class="btn btn-primary btn-block" type="button" data-open-deck>${escapeHtml(action)} ${icon("arrow-right")}</button>` : `<button class="btn btn-secondary btn-block" type="button" data-open-list="maybe-preview-list">${icon("bookmark")} Ver Talvez</button>`}
    </div>`;
  $("#discover-progress").innerHTML = stats.total
    ? `<p><strong>${stats.evaluated} de ${stats.total}</strong> lugares avaliados${deckCity === "all" ? "" : ` em ${escapeHtml(deckCity)}`}</p><div class="progress"><span style="width:${Math.round((stats.evaluated / stats.total) * 100)}%"></span></div>`
    : "";
  $("#city-choices").innerHTML = cities.length > 1 ? `<h3 class="home-section-title">Descobrir por cidade</h3>
    <div class="city-chips">
      <button type="button" class="city-chip${deckCity === "all" ? " is-selected" : ""}" data-discover-city="all"><span class="city-thumb is-all">${icon("globe")}</span>Todas</button>
      ${cities.map((city) => {
        const sample = activities.find((activity) => activityMatchesCity(activity, city) && photoOf(activity));
        const left = getDiscoverableActivities(trip, city).length;
        return `<button type="button" class="city-chip${sameCity(deckCity, city) ? " is-selected" : ""}" data-discover-city="${escapeHtml(city)}"><span class="city-thumb">${sample ? `<img src="${escapeHtml(imageOf(sample))}" alt="" loading="lazy">` : icon("map-pin")}</span><span>${escapeHtml(city)}<small>${left ? `${left} para ver` : "tudo visto"}</small></span></button>`;
      }).join("")}
    </div>` : "";
  hydrateIcons($("#tab-discover"));
  addImageFallbacks($("#tab-discover"));
  const saved = getTripActivities(trip);
  const maybe = getTripActivities(trip, "maybe");
  const dismissed = trip.dismissed.map(getActivity).filter(Boolean);
  $("#choice-like").textContent = String(saved.length);
  $("#choice-maybe").textContent = String(maybe.length);
  $("#choice-skip").textContent = String(dismissed.length);
  $("#discovery-saved-count").textContent = String(saved.length);
  $("#maybe-count").textContent = String(maybe.length);
  $("#dismissed-count").textContent = String(dismissed.length);
  // A grade só é montada quando a seção está aberta, para não carregar fotos à toa.
  const lists = {
    "saved-preview-list": () => saved.length ? saved.map(({ activity }) => placeTile(activity)).join("") : '<p class="empty-note">Os lugares que você curtir aparecem aqui.</p>',
    "maybe-preview-list": () => maybe.length ? maybe.map(({ activity }) => placeTile(activity, `<span class="tile-badge" aria-hidden="true">${icon("bookmark")}</span>`)).join("") : '<p class="empty-note">Nada guardado para decidir depois.</p>',
    "dismissed-preview-list": () => dismissed.length ? dismissed.map((activity) => placeTile(activity, `<span class="tile-badge" aria-hidden="true">${icon("x")}</span>`)).join("") : '<p class="empty-note">Os lugares que você passar ficam aqui, caso mude de ideia.</p>'
  };
  Object.entries(lists).forEach(([id, build]) => {
    const grid = $(`#${id}`);
    const paint = () => {
      grid.innerHTML = build();
      addImageFallbacks(grid);
    };
    const details = grid.closest("details");
    if (details.open) paint();
    else grid.innerHTML = "";
    details.ontoggle = () => { if (details.open) paint(); };
  });
}

function renderCityFilter(trip) {
  const select = $("#city-filter");
  const cities = [...new Set(tripCities(trip))];
  select.innerHTML = '<option value="all">Todas</option>' + cities.map((city) => `<option value="${escapeHtml(city)}">${escapeHtml(city)}</option>`).join("");
  if (!cities.some((city) => sameCity(city, deckCity))) deckCity = "all";
  select.value = deckCity;
}

function nearestTripCity(activity, trip) {
  return (activity.nearCities || []).find(([name]) => trip.destinations.some((destination) => sameCity(destination.name, name)));
}

function placeCardHtml(activity, trip, extraClass = "") {
  const photo = photoOf(activity);
  const near = nearestTripCity(activity, trip);
  const country = activity.country || "Brasil";
  return `<article class="place-card ${extraClass}" data-activity-id="${escapeHtml(activity.id)}">
    <div class="place-photo">
      <img src="${escapeHtml(imageOf(activity))}" alt="${photo ? "Foto de" : "Imagem ilustrativa de"} ${escapeHtml(activity.name)}" draggable="false">
      <div class="place-tags"><span class="chip chip-glass">${icon(categoryIcon(activity.category))} ${escapeHtml(activity.category)}</span>${photo ? "" : '<span class="chip chip-glass">Imagem ilustrativa</span>'}</div>
      ${photo ? `<a class="photo-credit" href="${escapeHtml(safeUrl(photo.page))}" target="_blank" rel="noopener noreferrer">Foto: ${escapeHtml(photo.author)} · ${escapeHtml(photo.license)}</a>` : ""}
      <div class="place-overlay"><h2>${escapeHtml(activity.name)}</h2><p>${icon("map-pin")} ${escapeHtml(activity.city)} · ${escapeHtml(country)}</p></div>
    </div>
    <div class="place-info">
      <p class="place-desc">${escapeHtml(shortDescription(activity.description))}</p>
      <div class="place-meta">
        ${near && near[1] >= 3 ? `<span class="chip">${icon("navigation")} ${escapeHtml(near[1])} km de ${escapeHtml(near[0])}</span>` : ""}
        ${activity.openingHours ? `<span class="chip">${icon("clock")} Horário informado</span>` : ""}
        <button class="btn btn-secondary btn-sm details-btn" type="button" data-place="${escapeHtml(activity.id)}">${icon("info")} Detalhes</button>
      </div>
    </div>
  </article>`;
}

function renderDeck() {
  const trip = getCurrentTrip();
  renderCityFilter(trip);
  const ideas = getDiscoverableActivities(trip);
  currentActivityId = ideas[0]?.id || null;
  ["#skip-activity", "#maybe-activity", "#like-activity"].forEach((selector) => { $(selector).disabled = !currentActivityId; });
  const stats = discoveryStats(trip);
  $("#discovery-position").innerHTML = stats.total
    ? `${ideas.length ? `${ideas.length} ${ideas.length === 1 ? "lugar restante" : "lugares restantes"}` : "Tudo visto"} <b>${stats.evaluated} / ${stats.total}</b>`
    : "Nenhum lugar neste filtro";
  $("#deck-progress-bar").style.width = stats.total ? `${Math.round((stats.evaluated / stats.total) * 100)}%` : "0%";
  $("#deck-title").textContent = deckCity === "all" ? "Descobrir lugares" : deckCity;
  const stage = $("#activity-stage");
  if (!ideas.length) {
    stage.innerHTML = `<div class="deck-empty">${icon("compass")}<h2>Você viu todas as ideias${deckCity === "all" ? "" : ` de ${escapeHtml(deckCity)}`}.</h2><p>Troque de cidade ou reveja o que ficou em “Talvez depois”.</p><button class="btn btn-secondary" type="button" data-back>Ver minhas ideias</button></div>`;
    return;
  }
  stage.innerHTML = (ideas[1] ? placeCardHtml(ideas[1], trip, "is-back") : "") + placeCardHtml(ideas[0], trip);
  addImageFallbacks(stage);
  attachSwipeHandlers(stage.querySelector(".place-card:not(.is-back)"));
}

function refreshAfterChoice() {
  if (route.screen === "deck") renderDeck();
  else if (route.screen === "trip") showTab(route.tab);
}

function addActivityToPlan(id) {
  const trip = getCurrentTrip();
  const activity = getActivity(id);
  if (!trip || !activity || trip.saved.some((item) => item.id === id)) return;
  const destination = trip.destinations.find((item) => activityMatchesCity(activity, item.name));
  trip.saved.push({ id, date: destination?.startDate || trip.startDate, time: "09:00" });
  trip.maybe = trip.maybe.filter((item) => item.id !== id);
  trip.dismissed = trip.dismissed.filter((item) => item !== id);
  if (!saveState()) return;
  if (route.screen === "deck") showDeckFeedback("like");
  else toast(`${activity.name} foi para o roteiro`);
  announce(`${activity.name} adicionada ao roteiro.`);
  refreshAfterChoice();
}

function markMaybe(id) {
  const trip = getCurrentTrip();
  const activity = getActivity(id);
  if (!trip || !activity || trip.maybe.some((item) => item.id === id)) return;
  trip.maybe.push({ id });
  trip.dismissed = trip.dismissed.filter((item) => item !== id);
  if (!saveState()) return;
  if (route.screen === "deck") showDeckFeedback("maybe");
  else toast("Guardado para decidir depois");
  announce(`${activity.name} guardada em talvez depois.`);
  refreshAfterChoice();
}

function dismissActivity(id) {
  const trip = getCurrentTrip();
  if (!trip || !id || trip.dismissed.includes(id)) return;
  trip.dismissed.push(id);
  if (!saveState()) return;
  if (route.screen === "deck") showDeckFeedback("skip");
  refreshAfterChoice();
}

function removeFromLists(id) {
  const trip = getCurrentTrip();
  trip.saved = trip.saved.filter((item) => item.id !== id);
  trip.maybe = trip.maybe.filter((item) => item.id !== id);
  saveState();
  refreshAfterChoice();
}

let activeSwipe = null;

let deckChoices = 0;
let feedbackTimer = null;

function showDeckFeedback(mode) {
  deckChoices += 1;
  if (deckChoices !== 1 && deckChoices % 4 !== 0) return;
  const element = $("#swipe-feedback");
  element.textContent = messageFor({ like: "escolhaCurti", maybe: "escolhaTalvez", skip: "escolhaPassar" }[mode], `deck|${deckChoices}`);
  element.className = `deck-feedback is-${mode} is-visible`;
  window.clearTimeout(feedbackTimer);
  feedbackTimer = window.setTimeout(() => element.classList.remove("is-visible"), 1400);
}

function triggerSwipe(mode) {
  if (activeSwipe?.card.isConnected) {
    activeSwipe.commit(mode);
    return;
  }
  if (mode === "like") addActivityToPlan(currentActivityId);
  else if (mode === "skip") dismissActivity(currentActivityId);
  else markMaybe(currentActivityId);
}

function attachSwipeHandlers(card) {
  if (!card) return;
  const THRESHOLD = 90;
  const FLICK_DISTANCE = 40;
  const FLICK_SPEED = 0.3; // px por ms
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  card.insertAdjacentHTML("beforeend",
    '<span class="swipe-badge badge-like" aria-hidden="true">CURTI</span>'
    + '<span class="swipe-badge badge-skip" aria-hidden="true">PASSO</span>'
    + '<span class="swipe-badge badge-maybe" aria-hidden="true">TALVEZ</span>');
  let pointerId = null;
  let startX = null;
  let startY = null;
  let dx = 0;
  let dy = 0;
  let samples = [];
  let busy = false;

  const intentFor = (x, y) => {
    if (y > 0 && y > Math.abs(x)) return "maybe";
    if (x > 0) return "like";
    if (x < 0) return "skip";
    return null;
  };

  const paint = () => {
    const mode = intentFor(dx, dy);
    const distance = mode === "maybe" ? dy : Math.abs(dx);
    const progress = mode ? Math.min(1, distance / THRESHOLD) : 0;
    const ty = mode === "maybe" ? dy : Math.max(-20, dy * 0.25);
    card.style.transform = `translate(${dx}px, ${ty}px) rotate(${dx * 0.04}deg)`;
    card.style.setProperty("--like", mode === "like" ? progress : 0);
    card.style.setProperty("--skip", mode === "skip" ? progress : 0);
    card.style.setProperty("--maybe", mode === "maybe" ? progress : 0);
    return { mode, progress };
  };

  const reset = () => {
    dx = 0;
    dy = 0;
    busy = false;
    card.classList.remove("is-dragging", "is-flying");
    card.style.transform = "";
    card.style.opacity = "";
    ["--like", "--skip", "--maybe"].forEach((name) => card.style.removeProperty(name));
  };

  const commit = (mode) => {
    if (busy || !mode) return;
    busy = true;
    const id = card.dataset.activityId;
    const action = { like: addActivityToPlan, skip: dismissActivity, maybe: markMaybe }[mode];
    const exit = {
      like: "translate(130%, -4%) rotate(14deg)",
      skip: "translate(-130%, -4%) rotate(-14deg)",
      maybe: "translate(0, 120%)"
    }[mode];
    card.classList.remove("is-dragging");
    if (reduceMotion) {
      action(id);
      if (card.isConnected) reset();
      return;
    }
    card.classList.add("is-flying");
    card.style.setProperty(`--${mode}`, 1);
    card.style.transform = exit;
    card.style.opacity = "0";
    window.setTimeout(() => {
      action(id);
      if (card.isConnected) reset();
    }, 240);
  };

  activeSwipe = { card, commit };

  // Velocidade do fim do gesto, para aceitar um "peteleco" rápido mesmo sem arrastar até o limite.
  const releaseSpeed = (mode) => {
    const recent = samples.filter((sample) => samples[samples.length - 1].t - sample.t <= 100);
    if (recent.length < 2) return 0;
    const first = recent[0];
    const last = recent[recent.length - 1];
    const elapsed = Math.max(1, last.t - first.t);
    if (mode === "maybe") return (last.y - first.y) / elapsed;
    return Math.abs(last.x - first.x) / elapsed;
  };

  card.addEventListener("pointerdown", (event) => {
    if (busy || pointerId !== null || event.target.closest("button, a")) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.preventDefault();
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    samples = [{ x: startX, y: startY, t: event.timeStamp }];
    card.classList.add("is-dragging");
    card.setPointerCapture(event.pointerId);
  });
  card.addEventListener("pointermove", (event) => {
    if (event.pointerId !== pointerId || busy) return;
    dx = event.clientX - startX;
    dy = event.clientY - startY;
    samples.push({ x: event.clientX, y: event.clientY, t: event.timeStamp });
    if (samples.length > 12) samples.shift();
    paint();
  });
  card.addEventListener("pointerup", (event) => {
    if (event.pointerId !== pointerId) return;
    pointerId = null;
    const { mode, progress } = paint();
    const distance = mode === "maybe" ? dy : Math.abs(dx);
    const flick = distance >= FLICK_DISTANCE && releaseSpeed(mode) >= FLICK_SPEED;
    if (mode && (progress >= 1 || flick)) commit(mode);
    else reset();
  });
  card.addEventListener("pointercancel", (event) => {
    if (event.pointerId !== pointerId) return;
    pointerId = null;
    if (!busy) reset();
  });
}

// ---------------------------------------------------------------------------
// Janela de baixo (sheet) e detalhes de um lugar
// ---------------------------------------------------------------------------

const sheet = $("#sheet");
const sheetContent = $("#sheet-content");

// Quando definida, decide se a janela pode fechar (ex.: memória com alterações não salvas).
let sheetGuard = null;

function openSheet(html, onReady) {
  sheetGuard = null;
  sheet.style.transform = "";
  document.documentElement.classList.add("sheet-open");
  sheetContent.innerHTML = html;
  hydrateIcons(sheetContent);
  addImageFallbacks(sheetContent);
  if (!sheet.open) sheet.showModal();
  sheetContent.scrollTop = 0;
  onReady?.(sheetContent);
}

function closeSheet({ force = false } = {}) {
  if (!sheet.open) return true;
  if (!force && sheetGuard && !sheetGuard()) return false;
  sheetGuard = null;
  sheet.close();
  return true;
}

sheet.addEventListener("close", () => {
  document.documentElement.classList.remove("sheet-open");
  sheet.style.transform = "";
});

// Arrastar para baixo fecha: pela barrinha ou pelo conteúdo quando ele está no topo.
(() => {
  let drag = null;
  const ignore = (target) => target.closest("input, textarea, select, .h-scroll, .photo-picker, .album-preview, .memory-gallery, .share-photos, .retro-edit-photos");
  sheet.addEventListener("touchstart", (event) => {
    if (event.touches.length !== 1 || event.target === sheet || ignore(event.target)) return;
    const fromHandle = Boolean(event.target.closest(".sheet-handle"));
    drag = { startY: event.touches[0].clientY, startTime: Date.now(), dy: 0, active: fromHandle, fromHandle };
  }, { passive: true });
  sheet.addEventListener("touchmove", (event) => {
    if (!drag) return;
    const dy = event.touches[0].clientY - drag.startY;
    if (!drag.active) {
      // No conteúdo, só começa a arrastar se ele já estiver no topo e o gesto for para baixo.
      if (dy > 8 && sheetContent.scrollTop <= 0) drag.active = true;
      else if (dy < -4 || sheetContent.scrollTop > 0) { drag = null; return; }
      else return;
    }
    event.preventDefault();
    drag.dy = Math.max(0, dy);
    sheet.style.transition = "none";
    sheet.style.transform = `translateY(${drag.dy}px)`;
  }, { passive: false });
  const finish = () => {
    if (!drag) return;
    const { dy, startTime, active } = drag;
    drag = null;
    if (!active) return;
    sheet.style.transition = "transform 200ms ease";
    const fast = dy > 40 && dy / Math.max(1, Date.now() - startTime) > 0.5;
    if ((dy > Math.min(140, sheet.offsetHeight * 0.3) || fast) && closeSheet()) return;
    sheet.style.transform = "";
  };
  sheet.addEventListener("touchend", finish);
  sheet.addEventListener("touchcancel", finish);
  // Toques no fundo escuro não rolam a tela de trás.
  sheet.addEventListener("touchmove", (event) => { if (event.target === sheet) event.preventDefault(); }, { passive: false });
})();

sheet.addEventListener("cancel", (event) => {
  if (!sheetGuard) return;
  event.preventDefault();
  closeSheet();
});

sheet.addEventListener("click", (event) => {
  if (event.target === sheet) closeSheet();
  if (event.target.closest("[data-close-sheet]")) closeSheet();
});

function sheetTitle(title) {
  return `<div class="sheet-title"><h2>${escapeHtml(title)}</h2><button class="icon-btn icon-btn-sm" type="button" data-close-sheet aria-label="Fechar">${icon("x")}</button></div>`;
}

function openPlaceSheet(id) {
  const trip = getCurrentTrip();
  const activity = getActivity(id);
  if (!activity || !trip) return;
  const open = getOpenData(id) || {};
  const photo = photoOf(activity);
  const country = activity.country || "Brasil";
  const near = nearestTripCity(activity, trip);
  const isSaved = trip.saved.some((item) => item.id === id);
  const isMaybe = trip.maybe.some((item) => item.id === id);
  const isDismissed = trip.dismissed.includes(id);
  const wikipediaUrl = safeUrl(open.wikipedia?.url);
  const links = [
    safeUrl(open.website) && `<a class="chip" href="${escapeHtml(open.website)}" target="_blank" rel="noopener noreferrer">${icon("globe")} Site oficial</a>`,
    wikipediaUrl && `<a class="chip" href="${escapeHtml(wikipediaUrl)}" target="_blank" rel="noopener noreferrer">${icon("info")} Wikipedia</a>`,
    open.osm && `<a class="chip" href="https://www.openstreetmap.org/${escapeHtml(open.osm)}" target="_blank" rel="noopener noreferrer">${icon("map")} OpenStreetMap</a>`,
    `<a class="chip" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${activity.name}, ${activity.city}, ${country}`)}" target="_blank" rel="noopener noreferrer">${icon("map-pin")} Google Maps</a>`,
    `<a class="chip" href="https://www.tripadvisor.com/Search?q=${encodeURIComponent(`${activity.name} ${activity.city}`)}" target="_blank" rel="noopener noreferrer">${icon("star")} Tripadvisor</a>`
  ].filter(Boolean).join("");
  const credit = activity.descriptionSource === "wikipedia"
    ? `<p class="text-credit">Texto: <a href="${escapeHtml(wikipediaUrl)}" target="_blank" rel="noopener noreferrer">Wikipedia</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.pt-br" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a></p>`
    : activity.descriptionSource === "osm"
      ? '<p class="text-credit">Dados: © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">colaboradores do OpenStreetMap</a> (ODbL)</p>'
      : "";
  const extract = open.wikipedia?.extract ? `<p class="sheet-text">${escapeHtml(open.wikipedia.extract)}</p><p class="text-credit">Resumo: Wikipedia · CC BY-SA 4.0</p>` : "";
  let actions;
  if (route.screen === "deck" && id === currentActivityId) {
    actions = `<div class="row-actions"><button class="btn btn-secondary" type="button" data-sheet-action="maybe">${icon("bookmark")} Talvez</button><button class="btn btn-primary" type="button" data-sheet-action="like">${icon("heart")} Curti</button></div>`;
  } else if (isSaved) {
    actions = `<button class="btn btn-danger btn-block" type="button" data-sheet-action="remove">${icon("trash-2")} Tirar do roteiro</button>`;
  } else if (isDismissed) {
    actions = `<p class="muted">Você passou este lugar. Mudou de ideia?</p><div class="row-actions"><button class="btn btn-secondary" type="button" data-sheet-action="maybe">${icon("bookmark")} Talvez</button><button class="btn btn-primary" type="button" data-sheet-action="like">${icon("heart")} Curti</button></div>`;
  } else if (isMaybe) {
    actions = `<div class="row-actions"><button class="btn btn-secondary" type="button" data-sheet-action="dismiss">${icon("x")} Não curti</button><button class="btn btn-primary" type="button" data-sheet-action="like">${icon("heart")} Curti</button></div>`;
  } else {
    actions = `<button class="btn btn-primary btn-block" type="button" data-sheet-action="like">${icon("heart")} Quero conhecer</button>`;
  }
  openSheet(`
    <div class="sheet-photo"><img src="${escapeHtml(imageOf(activity))}" alt="${photo ? "Foto de" : "Imagem ilustrativa de"} ${escapeHtml(activity.name)}">
      ${photo ? `<a class="photo-credit" href="${escapeHtml(safeUrl(photo.page))}" target="_blank" rel="noopener noreferrer">Foto: ${escapeHtml(photo.author)} · ${escapeHtml(photo.license)} · Wikimedia Commons</a>` : '<span class="photo-credit">Imagem ilustrativa</span>'}
    </div>
    ${sheetTitle(activity.name)}
    <div class="chips"><span class="chip">${icon(categoryIcon(activity.category))} ${escapeHtml(activity.category)}</span><span class="chip">${icon("map-pin")} ${escapeHtml(activity.city)} · ${escapeHtml(country)}</span>${near && near[1] >= 3 ? `<span class="chip">${icon("navigation")} ${escapeHtml(near[1])} km de ${escapeHtml(near[0])}</span>` : ""}</div>
    <p class="sheet-text">${escapeHtml(activity.description)}</p>${credit}${extract}
    <div class="info-item"><span class="info-icon">${icon("clock")}</span><div><strong>Horário</strong><p>${escapeHtml(activity.schedule)}</p></div></div>
    <div class="info-item"><span class="info-icon">${icon("banknote")}</span><div><strong>Valor</strong><p>Consulte no local ou no site oficial. O app não mostra preços nem notas que não possam ser confirmados.</p></div></div>
    <div class="link-list">${links}</div>
    ${actions}`, (root) => {
    root.querySelectorAll("[data-sheet-action]").forEach((button) => button.addEventListener("click", () => {
      const action = button.dataset.sheetAction;
      closeSheet();
      if (route.screen === "deck" && id === currentActivityId && action !== "remove") triggerSwipe(action);
      else if (action === "like") addActivityToPlan(id);
      else if (action === "maybe") markMaybe(id);
      else if (action === "remove") removeFromLists(id);
      else if (action === "dismiss") {
        trip.maybe = trip.maybe.filter((item) => item.id !== id);
        dismissActivity(id);
      }
    }));
  });
}

// ---------------------------------------------------------------------------
// Roteiro
// ---------------------------------------------------------------------------

let selectedDay = null;

function getTripDays(trip) {
  if (!trip.startDate || !trip.endDate) return [];
  const days = [];
  for (let date = trip.startDate; date <= trip.endDate && days.length < 90; date = addDays(date, 1)) days.push(date);
  return days;
}

function eventCategory(event) {
  return EXPENSE_CATEGORIES[event.category] || [event.category || "Compromisso", "calendar-days"];
}

function daySchedule(trip, date) {
  const events = trip.itinerary.filter((event) => event.date === date).map((event) => ({ ...event, type: "manual", subtitle: [eventCategory(event)[0], event.address].filter(Boolean).join(" · ") }));
  const saved = getTripActivities(trip).filter((item) => item.date === date)
    .map(({ id, time, activity }) => ({ id, date, time: time || "09:00", title: activity.name, subtitle: activity.category, image: imageOf(activity), type: "activity", coordinates: getOpenData(id)?.coordinates }));
  return [...events, ...saved].sort((a, b) => (a.time || "").localeCompare(b.time || ""));
}

function renderItinerary() {
  const trip = getCurrentTrip();
  const days = getTripDays(trip);
  const strip = $("#day-strip");
  if (!days.length) {
    strip.innerHTML = "";
    $("#day-header").innerHTML = "";
    $("#itinerary-content").innerHTML = '<li class="day-empty">Defina as datas da viagem para montar o roteiro.</li>';
    return;
  }
  const today = getBrasiliaDateKey();
  if (!days.includes(selectedDay)) selectedDay = days.includes(today) ? today : days[0];
  strip.innerHTML = days.map((date) => {
    const count = daySchedule(trip, date).length;
    return `<button class="day-chip${date === selectedDay ? " is-active" : ""}${count ? " has-items" : ""}" type="button" role="tab" aria-selected="${date === selectedDay}" data-day="${date}">
      <small>${escapeHtml(formatDate(date, { weekday: "short" }).replace(".", ""))}</small><strong>${parseLocalDate(date).getUTCDate()}</strong><i></i></button>`;
  }).join("");
  strip.querySelector(".is-active")?.scrollIntoView({ inline: "center", block: "nearest" });
  const destination = trip.destinations.find((item) => item.startDate <= selectedDay && item.endDate >= selectedDay);
  const schedule = daySchedule(trip, selectedDay);
  $("#day-header").innerHTML = `<h2>${escapeHtml(capitalize(formatDate(selectedDay, { weekday: "long", day: "numeric", month: "long" })))}</h2>
    <p>${icon("map-pin")} ${escapeHtml(destination?.name || "Dia livre")} · ${schedule.length} ${schedule.length === 1 ? "parada" : "paradas"}</p>`;
  if (!schedule.length) {
    $("#itinerary-content").innerHTML = '<li class="day-empty">Um espaço em branco também faz parte de uma boa viagem. Curta lugares em Descobrir ou adicione um compromisso.</li>';
    return;
  }
  const base = lodgingForDate(trip, selectedDay);
  const home = base?.coordinates ? base : null;
  const homeRow = (label) => `<li class="stop stop-home"><span class="stop-time">${icon("house")}</span><div class="stop-card home-card"><span class="stop-icon">${icon("bed-double")}</span><div class="stop-info"><strong>${escapeHtml(home.name || home.address || "Hospedagem")}</strong><small>${label}</small></div></div></li>`;
  const legRow = (from, to) => {
    const key = routeKey(from, to);
    const km = distanceKm(from, to);
    return `<li class="travel-leg"><i></i><span>${icon("car")}<b data-route="${escapeHtml(key)}" data-straight-km="${km}" style="font-weight:600">${escapeHtml(routeText(key, km))}</b></span></li>`;
  };
  const destinationIndex = destinationIndexForDate(trip, selectedDay);
  const notice = home ? "" : `<li class="day-notice-card">${icon("info")}<div><strong>De onde você sai neste dia?</strong><p>${base ? "Localize o endereço da hospedagem no mapa" : "Cadastre a hospedagem desta noite"} para o roteiro calcular os deslocamentos a partir dela. Por enquanto, os tempos são só entre as paradas.</p>${destinationIndex >= 0 ? `<button class="link-btn" type="button" ${base ? `data-lodging-edit="${base.destinationIndex}|${escapeHtml(base.id)}"` : `data-lodging-add="${destinationIndex}"`}>${base ? "Localizar hospedagem" : "Adicionar hospedagem"}</button>` : ""}</div></li>`;
  let previous = home?.coordinates || null;
  $("#itinerary-content").innerHTML = (home ? homeRow("Saída da hospedagem") : notice) + schedule.map((item) => {
    const leg = item.coordinates && previous ? legRow(previous, item.coordinates) : "";
    if (item.coordinates) previous = item.coordinates;
    return `${leg}<li class="stop" data-drag-id="${escapeHtml(item.id)}">
      <span class="stop-time">${escapeHtml(item.time || "09:00")}</span>
      <div class="stop-card">
        <span class="drag-handle" aria-hidden="true">${icon("grip-vertical")}</span>
        ${item.image ? `<img src="${escapeHtml(item.image)}" alt="">` : `<span class="stop-icon">${icon(item.type === "manual" ? eventCategory(item)[1] : "calendar-days")}</span>`}
        <div class="stop-info"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.subtitle || item.category || "Compromisso")}</small></div>
        <button class="icon-btn icon-btn-sm" type="button" data-stop="${escapeHtml(item.id)}" data-stop-type="${item.type}" aria-label="Opções de ${escapeHtml(item.title)}">${icon("ellipsis")}</button>
      </div></li>`;
  }).join("") + (home && previous && previous !== home.coordinates ? legRow(previous, home.coordinates) + homeRow("Volta para a hospedagem") : "");
  addImageFallbacks($("#itinerary-content"));
  requestRoutes($("#itinerary-content"));
  if (schedule.length > 1) attachStopDrag($("#itinerary-content"), trip, selectedDay);
}

function dayOptions(trip, selected) {
  return getTripDays(trip).map((date) => `<option value="${date}"${date === selected ? " selected" : ""}>${escapeHtml(formatDate(date, { weekday: "short", day: "numeric", month: "short" }))}</option>`).join("");
}

function openStopSheet(id, type) {
  if (type === "manual") {
    openEventForm(id);
    return;
  }
  const trip = getCurrentTrip();
  const collection = type === "activity" ? trip.saved : trip.itinerary;
  const item = collection.find((entry) => entry.id === id);
  if (!item) return;
  const title = type === "activity" ? getActivity(id)?.name : item.title;
  openSheet(`${sheetTitle(title || "Parada")}
    <div class="field-row">
      <label class="field">Dia<select id="stop-day">${dayOptions(trip, item.date)}</select></label>
      <label class="field">Horário<input id="stop-time" type="time" value="${escapeHtml(item.time || "09:00")}"></label>
    </div>
    ${type === "activity" ? `<button class="btn btn-secondary btn-block" type="button" id="stop-details">${icon("info")} Ver detalhes do lugar</button>` : ""}
    <button class="btn btn-secondary btn-block" type="button" id="stop-memory">${icon("book-heart")} Guardar momento no Baú</button>
    <div class="row-actions"><button class="btn btn-danger" type="button" id="stop-remove">${icon("trash-2")} Remover</button><button class="btn btn-primary" type="button" id="stop-save">${icon("check")} Salvar</button></div>`, (root) => {
    root.querySelector("#stop-save").addEventListener("click", () => {
      const date = root.querySelector("#stop-day").value;
      if (type === "activity") {
        const stays = trip.destinations.filter((entry) => activityMatchesCity(getActivity(id), entry.name));
        if (stays.length && !stays.some((stay) => date >= stay.startDate && date <= stay.endDate)) {
          toast(`Escolha um dia em que você estará em ${stays[0].name}`);
          return;
        }
      }
      item.date = date;
      item.time = root.querySelector("#stop-time").value || "09:00";
      saveState();
      selectedDay = date;
      closeSheet();
      renderItinerary();
      announce("Parada atualizada.");
    });
    root.querySelector("#stop-remove").addEventListener("click", () => {
      if (type === "activity") trip.saved = trip.saved.filter((entry) => entry.id !== id);
      else trip.itinerary = trip.itinerary.filter((entry) => entry.id !== id);
      saveState();
      closeSheet();
      renderItinerary();
      toast("Parada removida");
    });
    root.querySelector("#stop-details")?.addEventListener("click", () => openPlaceSheet(id));
    root.querySelector("#stop-memory").addEventListener("click", () => openMemoryEditor({ date: item.date, place: title || "", origin: "depoisPasseio" }));
  });
}

function openManualEventSheet() {
  openEventForm();
}

// Horário sugerido: duas horas depois da última parada do dia (ou 09:00).
function nextFreeTime(trip, date) {
  const last = daySchedule(trip, date).map((item) => item.time || "09:00").sort().pop();
  if (!last) return "09:00";
  const [hours, minutes] = last.split(":").map(Number);
  return `${String(Math.min(hours + 2, 22)).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function openEventForm(eventId = null) {
  const trip = getCurrentTrip();
  if (!getTripDays(trip).length) return;
  const existing = eventId ? trip.itinerary.find((item) => item.id === eventId) : null;
  const day = existing?.date || selectedDay || getTripDays(trip)[0];
  const draft = existing ? { ...existing } : { id: `evento-${Date.now()}`, title: "", category: "atracoes", address: "", coordinates: null, label: "", date: day, time: nextFreeTime(trip, day) };
  if (!EXPENSE_CATEGORIES[draft.category]) draft.category = "outros";
  let locatedFor = draft.coordinates ? draft.address : null;
  openSheet(`${sheetTitle(existing ? "Editar compromisso" : "Novo compromisso")}
    <label class="field">Lugar ou compromisso<input id="event-title" maxlength="100" value="${escapeHtml(draft.title)}" placeholder="Ex.: Jantar no Cervejaria Ramiro"></label>
    <div class="cat-chips" id="event-categories">${Object.entries(EXPENSE_CATEGORIES).map(([key, [label, iconName]]) => `<button type="button" class="cat-chip${key === draft.category ? " is-selected" : ""}" data-category="${key}">${icon(iconName)}${escapeHtml(label)}</button>`).join("")}</div>
    <label class="field">Endereço<input id="event-address" maxlength="180" value="${escapeHtml(draft.address || "")}" placeholder="Rua, número ou nome do lugar"></label>
    <button class="btn btn-secondary btn-block" type="button" id="event-locate">${icon("map-pin")} Localizar no mapa</button>
    <div class="geo-results" id="event-geo-results"></div>
    <p class="geo-status" id="event-geo-status"></p>
    <div class="field-row"><label class="field">Dia<select id="event-day">${dayOptions(trip, draft.date)}</select></label><label class="field">Horário<input id="event-time" type="time" value="${escapeHtml(draft.time || "09:00")}"></label></div>
    <p class="form-status" id="event-status" role="status" aria-live="polite"></p>
    ${existing ? `<button class="btn btn-secondary btn-block" type="button" id="stop-memory">${icon("book-heart")} Guardar momento no Baú</button>` : ""}
    <div class="${existing ? "row-actions" : ""}">${existing ? `<button class="btn btn-danger" type="button" id="event-remove">${icon("trash-2")} Remover</button>` : ""}<button class="btn btn-primary${existing ? "" : " btn-block"}" type="button" id="event-save">${icon(existing ? "check" : "plus")} ${existing ? "Salvar" : "Adicionar ao roteiro"}</button></div>`, (root) => {
    const address = root.querySelector("#event-address");
    const geoStatus = root.querySelector("#event-geo-status");
    const results = root.querySelector("#event-geo-results");
    const status = root.querySelector("#event-status");
    const paintGeo = () => {
      geoStatus.className = `geo-status${draft.coordinates ? " is-ok" : ""}`;
      geoStatus.innerHTML = draft.coordinates
        ? `${icon("circle-check")} Localizado: ${escapeHtml(draft.label.split(",").slice(0, 4).join(","))}`
        : `${icon("info")} Localize o endereço para o roteiro calcular o tempo até aqui.`;
    };
    paintGeo();
    if (!existing) root.querySelector("#event-title").focus();
    root.querySelector("#event-categories").addEventListener("click", (event) => {
      const chip = event.target.closest("[data-category]");
      if (!chip) return;
      draft.category = chip.dataset.category;
      root.querySelectorAll("[data-category]").forEach((item) => item.classList.toggle("is-selected", item === chip));
    });
    address.addEventListener("input", () => {
      if (locatedFor !== null && address.value.trim() !== locatedFor) {
        draft.coordinates = null;
        draft.label = "";
        locatedFor = null;
        paintGeo();
      }
    });
    root.querySelector("#event-locate").addEventListener("click", async (event) => {
      const button = event.currentTarget;
      const text = address.value.trim() || root.querySelector("#event-title").value.trim();
      if (text.length < 3) {
        geoStatus.textContent = "Digite o endereço ou o nome do lugar para localizar.";
        return;
      }
      const date = root.querySelector("#event-day").value;
      const destination = trip.destinations[Math.max(0, destinationIndexForDate(trip, date))] || { name: "" };
      button.disabled = true;
      geoStatus.textContent = "Procurando…";
      try {
        const found = await geocodeAddress(text, destination);
        const choose = (item) => {
          draft.coordinates = item.coordinates;
          draft.label = item.label;
          if (!address.value.trim()) address.value = item.label.split(",").slice(0, 3).join(",");
          locatedFor = address.value.trim();
          results.innerHTML = "";
          paintGeo();
        };
        if (!found.length) geoStatus.textContent = "Não encontrei. Confira o endereço ou tente o nome do lugar.";
        else if (found.length === 1) choose(found[0]);
        else {
          geoStatus.textContent = "Qual destes é o lugar certo?";
          results.innerHTML = found.map((item, position) => `<button type="button" class="geo-option" data-geo="${position}">${icon("map-pin")}<span>${escapeHtml(item.label)}</span></button>`).join("");
          results.onclick = (clickEvent) => {
            const option = clickEvent.target.closest("[data-geo]");
            if (option) choose(found[Number(option.dataset.geo)]);
          };
        }
      } catch (error) {
        console.error("Falha ao localizar.", error);
        geoStatus.textContent = "Não consegui consultar o mapa agora. Tente de novo em instantes.";
      } finally {
        button.disabled = false;
      }
    });
    root.querySelector("#stop-memory")?.addEventListener("click", () => openMemoryEditor({ date: draft.date, place: draft.title, origin: "depoisPasseio" }));
    root.querySelector("#event-save").addEventListener("click", () => {
      draft.title = root.querySelector("#event-title").value.trim();
      draft.address = address.value.trim();
      draft.date = root.querySelector("#event-day").value;
      draft.time = root.querySelector("#event-time").value || "09:00";
      if (!draft.title) {
        status.textContent = "Dê um nome para o compromisso.";
        return;
      }
      const record = { id: draft.id, title: draft.title, category: draft.category, address: draft.address, coordinates: draft.coordinates, label: draft.label, date: draft.date, time: draft.time, type: "manual" };
      const previous = trip.itinerary;
      trip.itinerary = existing ? trip.itinerary.map((item) => (item.id === record.id ? record : item)) : [...trip.itinerary, record];
      if (!saveState()) {
        trip.itinerary = previous;
        return;
      }
      selectedDay = record.date;
      closeSheet();
      renderItinerary();
      toast(existing ? "Compromisso atualizado" : "Compromisso adicionado");
    });
    root.querySelector("#event-remove")?.addEventListener("click", () => {
      trip.itinerary = trip.itinerary.filter((item) => item.id !== draft.id);
      saveState();
      closeSheet();
      renderItinerary();
      toast("Compromisso removido");
    });
  });
}

// Nova ordem do dia: os horários existentes ficam no lugar e as paradas são
// redistribuídas neles; horários repetidos ganham 15 minutos para manter a ordem.
function reorderDay(trip, date, orderedIds) {
  const schedule = daySchedule(trip, date);
  const toMinutes = (time) => { const [hours, minutes] = time.split(":").map(Number); return hours * 60 + minutes; };
  const toTime = (total) => `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
  const slots = schedule.map((item) => toMinutes(item.time || "09:00")).sort((a, b) => a - b);
  for (let index = 1; index < slots.length; index++) if (slots[index] <= slots[index - 1]) slots[index] = Math.min(slots[index - 1] + 15, 23 * 60 + 59);
  orderedIds.forEach((id, index) => {
    const item = schedule.find((entry) => entry.id === id);
    const record = item && (item.type === "activity" ? trip.saved : trip.itinerary).find((entry) => entry.id === id);
    if (record) record.time = toTime(slots[index]);
  });
  saveState();
  renderItinerary();
}

// Arrastar paradas: no toque, segurar meio segundo; no mouse, clicar e arrastar.
function attachStopDrag(list, trip, date) {
  list.dragContext = { trip, date };
  if (list.dragReady) return;
  list.dragReady = true;
  let pending = null;
  let drag = null;
  let suppressClick = false;
  const stops = () => [...list.querySelectorAll("li.stop[data-drag-id]")];
  const begin = (li, pointerId, clientY) => {
    // Esconder os trechos de deslocamento sobe a parada; a diferença mantém ela sob o dedo.
    const topBefore = li.getBoundingClientRect().top;
    list.classList.add("is-reordering");
    const items = stops();
    drag = { li, pointerId, startY: clientY, offset: topBefore - li.getBoundingClientRect().top, from: items.indexOf(li), to: items.indexOf(li), items, step: li.getBoundingClientRect().height + 12 };
    drag.mids = items.map((item) => { const rect = item.getBoundingClientRect(); return rect.top + rect.height / 2; });
    li.classList.add("is-dragging");
    try { li.setPointerCapture(pointerId); } catch { /* ponteiro já liberado */ }
    navigator.vibrate?.(15);
  };
  const move = (clientY) => {
    const dy = clientY - drag.startY;
    drag.li.style.transform = `translateY(${dy + drag.offset}px)`;
    // Nova posição: quantas outras paradas ficam acima do centro da que está sendo arrastada.
    const center = drag.mids[drag.from] + dy + drag.offset;
    const to = drag.mids.filter((mid, index) => index !== drag.from && mid < center).length;
    drag.to = to;
    drag.items.forEach((item, index) => {
      if (item === drag.li) return;
      let shift = 0;
      if (drag.from < to && index > drag.from && index <= to) shift = -drag.step;
      if (drag.from > to && index >= to && index < drag.from) shift = drag.step;
      item.style.transform = shift ? `translateY(${shift}px)` : "";
    });
  };
  const finish = () => {
    const { items, from, to, li } = drag;
    drag = null;
    list.classList.remove("is-reordering");
    li.classList.remove("is-dragging");
    items.forEach((item) => { item.style.transform = ""; });
    suppressClick = true;
    window.setTimeout(() => { suppressClick = false; }, 350);
    if (from === to) return;
    const ids = items.map((item) => item.dataset.dragId);
    const [moved] = ids.splice(from, 1);
    ids.splice(to, 0, moved);
    reorderDay(list.dragContext.trip, list.dragContext.date, ids);
    toast("Ordem atualizada");
  };
  list.addEventListener("pointerdown", (event) => {
    const li = event.target.closest("li.stop[data-drag-id]");
    if (!li || drag || (event.pointerType === "mouse" && event.button !== 0)) return;
    const onHandle = Boolean(event.target.closest(".drag-handle"));
    if (event.target.closest("button") && !onHandle) return;
    pending = { li, pointerId: event.pointerId, x: event.clientX, y: event.clientY, timer: null, mouse: event.pointerType === "mouse" || onHandle };
    if (!pending.mouse) pending.timer = window.setTimeout(() => { if (pending) { begin(pending.li, pending.pointerId, pending.y); pending = null; } }, 450);
  });
  list.addEventListener("pointermove", (event) => {
    if (drag && event.pointerId === drag.pointerId) {
      move(event.clientY);
      return;
    }
    if (!pending || event.pointerId !== pending.pointerId) return;
    const distance = Math.hypot(event.clientX - pending.x, event.clientY - pending.y);
    if (pending.mouse && distance > 4) {
      begin(pending.li, pending.pointerId, pending.y);
      pending = null;
      move(event.clientY);
    } else if (!pending.mouse && distance > 10) {
      window.clearTimeout(pending.timer);
      pending = null;
    }
  });
  const release = (event) => {
    if (pending && event.pointerId === pending.pointerId) {
      window.clearTimeout(pending.timer);
      pending = null;
    }
    if (drag && event.pointerId === drag.pointerId) finish();
  };
  list.addEventListener("pointerup", release);
  list.addEventListener("pointercancel", release);
  // Enquanto arrasta, a tela não rola.
  list.addEventListener("touchmove", (event) => { if (drag) event.preventDefault(); }, { passive: false });
  list.addEventListener("click", (event) => {
    if (!suppressClick) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);
  list.addEventListener("contextmenu", (event) => { if (drag || pending) event.preventDefault(); });
}

function generateItinerary() {
  const trip = getCurrentTrip();
  const days = getTripDays(trip);
  if (!days.length) return;
  if (!trip.saved.length) {
    toast("Curta alguns lugares em Descobrir primeiro");
    return;
  }
  const located = trip.destinations.some((destination) => destination.lodgings.some((lodging) => lodging.coordinates));
  openSheet(`${sheetTitle("Sugerir roteiro")}
    <p class="sheet-text">Vou distribuir os ${trip.saved.length} lugares curtidos pelos dias de cada cidade, começando pelos mais perto ${located ? "da hospedagem do dia" : "do centro da cidade"}. Os compromissos que você criou não mudam.</p>
    ${located ? "" : `<p class="muted">Dica: cadastre e localize as hospedagens no Resumo para a sugestão partir de onde você vai estar.</p>`}
    <p class="muted">É uma sugestão por regras simples e distância em linha reta, sem IA. Revise horários e deslocamentos depois.</p>
    <div class="row-actions"><button class="btn btn-secondary" type="button" data-close-sheet>Cancelar</button><button class="btn btn-primary" type="button" id="plan-confirm">${icon("sparkles")} Reorganizar</button></div>`, (root) => {
    root.querySelector("#plan-confirm").addEventListener("click", () => {
      const before = JSON.stringify(trip.saved);
      suggestTripPlan(trip);
      if (!saveState()) {
        trip.saved = JSON.parse(before);
        return;
      }
      closeSheet();
      selectedDay = null;
      renderItinerary();
      toast("Roteiro reorganizado. Revise horários e deslocamentos.");
    });
  });
}

// Depois de mudar datas ou cidades, traz para dentro da viagem os itens que ficariam invisíveis no roteiro.
function realignItineraryDates(trip) {
  if (!trip.startDate || !trip.endDate) return;
  trip.saved.forEach((item) => {
    const activity = getActivity(item.id);
    const stays = activity ? trip.destinations.filter((place) => activityMatchesCity(activity, place.name)) : [];
    const ranges = stays.length ? stays : [{ startDate: trip.startDate, endDate: trip.endDate }];
    if (!ranges.some((range) => item.date && item.date >= range.startDate && item.date <= range.endDate)) item.date = ranges[0].startDate;
  });
  trip.itinerary.forEach((event) => {
    if (!event.date || event.date < trip.startDate || event.date > trip.endDate) event.date = trip.startDate;
  });
}

state.trips.forEach(realignItineraryDates);

// ---------------------------------------------------------------------------
// Custos
// ---------------------------------------------------------------------------

const EXPENSE_CATEGORIES = {
  transporte: ["Transporte", "plane"],
  hospedagem: ["Hospedagem", "bed-double"],
  alimentacao: ["Alimentação", "utensils"],
  atracoes: ["Atrações", "ticket"],
  compras: ["Compras", "shopping-bag"],
  seguro: ["Seguro", "shield-check"],
  outros: ["Outros", "receipt"]
};
const CURRENCIES = ["BRL", "USD", "EUR", "GBP", "ARS"];

function categoryIcon(category) {
  return ({ Natureza: "trees", Praia: "waves", Cultura: "landmark", Arte: "palette", "Diversão": "sparkles", Compras: "shopping-bag", Gastronomia: "utensils", Passeio: "camera", "Passeio urbano": "footprints", Aventura: "mountain" })[category] || "map-pin";
}


function renderExpenses() {
  const trip = getCurrentTrip();
  setAmountToggle($("#toggle-expense-visibility"));
  const currency = tripCurrency(trip);
  const spent = spentInTrip(trip);
  const forecast = forecastInTrip(trip);
  const budget = Number(trip.budget) || 0;
  $("#finance-spent").textContent = tripMoney(trip, spent, 2);
  $("#finance-budget").textContent = budget ? tripMoney(trip, budget) : "—";
  $("#finance-forecast").textContent = tripMoney(trip, forecast);
  $("#finance-left").textContent = budget ? tripMoney(trip, budget - forecast) : "—";
  $("#finance-progress").style.width = budget ? `${Math.min(100, (forecast / budget) * 100)}%` : "0%";
  const foreign = currency !== "BRL";
  $("#trip-currency-label").textContent = foreign ? `${currency} · 1 ${currency} = ${formatCurrency(tripRate(trip), "BRL", 2)}` : "Real (BRL)";
  $("#currency-options").hidden = !foreign;
  $("#currency-brl-note").hidden = foreign;
  if (foreign) {
    $("#view-currency").innerHTML = [[false, currency], [true, "R$"]].map(([inBRL, label]) => `<button type="button" data-view-brl="${inBRL}" class="${Boolean(trip.showInBRL) === inBRL ? "is-selected" : ""}">${label}</button>`).join("");
    $("#rate-code").textContent = currency;
    if (document.activeElement !== $("#trip-rate")) $("#trip-rate").value = rateText(tripRate(trip));
  }
  const tight = budget > 0 && forecast >= budget * 0.9;
  $("#budget-message").hidden = !tight;
  if (tight) $("#budget-message").textContent = messageFor("orcamentoApertado", trip.id);

  const totals = {};
  trip.expenses.forEach((expense) => { totals[expense.category] = (totals[expense.category] || 0) + expenseInTrip(trip, expense); });
  const ranked = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  $("#category-card").hidden = !ranked.length;
  $("#category-bars").innerHTML = ranked.map(([category, total]) => {
    const [label, iconName] = EXPENSE_CATEGORIES[category] || [category, "receipt"];
    const share = spent ? Math.round((total / spent) * 100) : 0;
    return `<div class="category-bar"><span class="cat-icon">${icon(iconName)}</span><div><strong>${escapeHtml(label)}</strong><div class="progress"><span style="width:${share}%"></span></div></div><em>${escapeHtml(tripMoney(trip, total))}</em></div>`;
  }).join("");

  const byDate = {};
  [...trip.expenses].sort((a, b) => (b.date || "").localeCompare(a.date || "")).forEach((expense) => { (byDate[expense.date] ||= []).push(expense); });
  const dates = Object.keys(byDate).sort((a, b) => b.localeCompare(a));
  $("#expense-list").innerHTML = dates.length ? dates.map((date) => `<section class="expense-day"><h4>${escapeHtml(capitalize(formatDate(date, { weekday: "long", day: "numeric", month: "long" })) || "Sem data")}</h4><div class="expense-group">${byDate[date].map((expense) => {
    const [label, iconName] = EXPENSE_CATEGORIES[expense.category] || [expense.category, "receipt"];
    const original = (expense.currency || "BRL") !== (trip.showInBRL ? "BRL" : currency) ? `<small>${escapeHtml(money(expense.amount, expense.currency || "BRL", 2))}</small>` : "";
    return `<div class="expense-row"><span class="cat-icon">${icon(iconName)}</span><div style="min-width:0"><strong>${escapeHtml(expense.description)}</strong><small>${escapeHtml(label)}</small></div><div class="expense-amount"><strong>${escapeHtml(tripMoney(trip, expenseInTrip(trip, expense), 2))}</strong>${original}</div><button class="remove-btn" type="button" data-remove-expense="${escapeHtml(expense.id)}" aria-label="Remover despesa ${escapeHtml(expense.description)}">${icon("trash-2")}</button></div>`;
  }).join("")}</div></section>`).join("")
    : `<div class="day-empty">${icon("receipt")}<p style="margin-top:8px">Nenhuma despesa ainda. Toque no <strong>+</strong> para registrar transporte, hospedagem, comida e passeios.</p></div>`;
}

function openExpenseSheet() {
  const trip = getCurrentTrip();
  const today = getBrasiliaDateKey();
  const defaultDate = trip.startDate && today >= trip.startDate && today <= trip.endDate ? today : (trip.startDate && today < trip.startDate ? today : trip.startDate || today);
  let category = "alimentacao";
  let currency = tripCurrency(trip);
  const defaultRate = (code) => (code === tripCurrency(trip) ? rateText(tripRate(trip)) : "");
  openSheet(`${sheetTitle("Nova despesa")}
    <label class="btn btn-secondary btn-block receipt-btn">${icon("camera")} Ler recibo pela foto<input class="visually-hidden" type="file" accept="image/*" id="receipt-file"></label>
    <div class="receipt-box" id="receipt-box" hidden></div>
    <div class="amount-input"><span id="expense-currency-symbol">${currency === "BRL" ? "R$" : currency}</span><input id="expense-amount" type="text" inputmode="decimal" autocomplete="off" placeholder="0,00" aria-label="Valor"></div>
    <div class="segmented" id="expense-currency">${CURRENCIES.map((code) => `<button type="button" data-currency="${code}" class="${code === currency ? "is-selected" : ""}">${code}</button>`).join("")}</div>
    <label class="field" id="expense-rate-field"${currency === "BRL" ? " hidden" : ""}><span>Cotação · 1 <span id="expense-rate-code">${currency}</span> em R$</span><input id="expense-rate" type="text" inputmode="decimal" autocomplete="off" placeholder="Ex.: 6,20" value="${defaultRate(currency)}"></label>
    <div class="cat-chips" id="expense-categories">${Object.entries(EXPENSE_CATEGORIES).map(([key, [label, iconName]]) => `<button type="button" class="cat-chip${key === category ? " is-selected" : ""}" data-category="${key}">${icon(iconName)}${escapeHtml(label)}</button>`).join("")}</div>
    <label class="field">Descrição<input id="expense-description" maxlength="100" placeholder="Ex.: Almoço no centro"></label>
    <label class="field">Data<input id="expense-date" type="date" value="${escapeHtml(defaultDate)}"></label>
    <p class="footnote" style="margin:0">A cotação é manual; não há câmbio em tempo real.</p>
    <button class="btn btn-primary btn-block" type="button" id="expense-save">${icon("check")} Salvar despesa</button>`, (root) => {
    root.querySelector("#expense-currency").addEventListener("click", (event) => {
      const button = event.target.closest("[data-currency]");
      if (!button) return;
      currency = button.dataset.currency;
      root.querySelectorAll("[data-currency]").forEach((item) => item.classList.toggle("is-selected", item === button));
      root.querySelector("#expense-rate-field").hidden = currency === "BRL";
      root.querySelector("#expense-currency-symbol").textContent = currency === "BRL" ? "R$" : currency;
      root.querySelector("#expense-rate-code").textContent = currency;
      root.querySelector("#expense-rate").value = defaultRate(currency);
    });
    root.querySelector("#receipt-file").addEventListener("change", async (event) => {
      const file = event.target.files[0];
      event.target.value = "";
      if (!file) return;
      const box = root.querySelector("#receipt-box");
      box.hidden = false;
      box.className = "receipt-box";
      box.innerHTML = `<p>${icon("sparkles")} Lendo o recibo… <span id="receipt-progress"></span></p><small>Na primeira vez o app baixa o leitor (uns 5 MB). A foto não sai do aparelho.</small>`;
      try {
        const text = await readReceiptText(file, (fraction) => {
          const progress = box.querySelector("#receipt-progress");
          if (progress) progress.textContent = `${Math.round(fraction * 100)}%`;
        });
        const found = parseReceipt(text, trip);
        if (found.amount) root.querySelector("#expense-amount").value = decimalText(found.amount.toFixed(2));
        if (found.currency && found.currency !== currency && CURRENCIES.includes(found.currency)) root.querySelector(`#expense-currency [data-currency="${found.currency}"]`).click();
        if (found.category) root.querySelector(`#expense-categories [data-category="${found.category}"]`).click();
        if (found.description) root.querySelector("#expense-description").value = found.description;
        if (found.date) root.querySelector("#expense-date").value = found.date;
        const items = [
          found.amount ? `valor ${formatCurrency(found.amount, found.currency, 2)}` : "",
          found.date ? `data ${formatDate(found.date, found.date.slice(0, 4) === getBrasiliaDateKey().slice(0, 4) ? { day: "numeric", month: "short" } : { day: "numeric", month: "short", year: "numeric" })}` : "",
          found.description ? `“${found.description}”` : "",
          found.category ? EXPENSE_CATEGORIES[found.category][0].toLowerCase() : ""
        ].filter(Boolean);
        box.className = `receipt-box ${items.length ? "is-ok" : "is-warn"}`;
        box.innerHTML = items.length
          ? `<p>${icon("circle-check")} Encontrei: ${escapeHtml(items.join(" · "))}</p><small>${found.date && trip.startDate && (found.date < trip.startDate || found.date > trip.endDate) ? "A data do recibo fica fora das datas da viagem. " : ""}Confira os campos abaixo e ajuste o que precisar antes de salvar.</small>`
          : `<p>${icon("info")} Não consegui ler os dados deste recibo.</p><small>Tente uma foto mais de perto, reta e com boa luz, ou preencha à mão.</small>`;
      } catch (error) {
        console.error("Falha ao ler o recibo.", error);
        box.className = "receipt-box is-warn";
        box.innerHTML = `<p>${icon("info")} ${escapeHtml(error.message || "Não consegui ler o recibo.")}</p><small>Você pode preencher os campos à mão.</small>`;
      }
    });
    root.querySelector("#expense-categories").addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      category = button.dataset.category;
      root.querySelectorAll("[data-category]").forEach((item) => item.classList.toggle("is-selected", item === button));
    });
    root.querySelector("#expense-save").addEventListener("click", () => {
      const amount = parseDecimal(root.querySelector("#expense-amount").value);
      const exchangeRate = currency === "BRL" ? 1 : parseDecimal(root.querySelector("#expense-rate").value);
      const description = root.querySelector("#expense-description").value.trim() || EXPENSE_CATEGORIES[category][0];
      if (!(amount > 0)) {
        toast("Informe um valor maior que zero");
        return;
      }
      if (!(exchangeRate > 0)) {
        toast("Informe a cotação da moeda em reais");
        return;
      }
      trip.expenses.push({ id: `despesa-${Date.now()}`, description, category, amount, currency, exchangeRate, amountBRL: amount * exchangeRate, date: root.querySelector("#expense-date").value || today });
      if (!saveState()) return;
      closeSheet();
      renderExpenses();
      toast("Despesa registrada");
      announce("Despesa registrada.");
    });
    window.setTimeout(() => root.querySelector("#expense-amount").focus(), 80);
  });
}

// ---------------------------------------------------------------------------
// Ler recibo: o texto da foto é lido no próprio aparelho (Tesseract.js, código
// aberto, Apache 2.0) e regras simples sugerem valor, data, descrição e
// categoria. A foto não sai do aparelho; a pessoa confere antes de salvar.
// ---------------------------------------------------------------------------

const OCR = {
  script: "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js",
  workerPath: "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/worker.min.js",
  corePath: "https://cdn.jsdelivr.net/npm/tesseract.js-core@5.1.1",
  langPath: "https://cdn.jsdelivr.net/npm/@tesseract.js-data/por@1.0.0/4.0.0_best_int"
};
let ocrLoader = null;

function loadOcr() {
  ocrLoader ||= new Promise((resolve, reject) => {
    if (window.Tesseract) return resolve(window.Tesseract);
    const script = document.createElement("script");
    script.src = OCR.script;
    script.onload = () => resolve(window.Tesseract);
    script.onerror = () => { ocrLoader = null; reject(new Error("Não consegui baixar o leitor de recibos. Confira a internet.")); };
    document.head.appendChild(script);
  });
  return ocrLoader;
}

// Reduz e realça a foto para a leitura ficar mais rápida e certeira.
async function prepareReceiptImage(file) {
  const source = URL.createObjectURL(file);
  try {
    const image = await loadImage(source);
    const scale = Math.min(1, 1800 / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(image.naturalWidth * scale);
    canvas.height = Math.round(image.naturalHeight * scale);
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    // Cinza com mais contraste, pixel a pixel (o filtro de canvas não existe em todo Safari).
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = pixels.data;
    for (let index = 0; index < data.length; index += 4) {
      const gray = 0.299 * data[index] + 0.587 * data[index + 1] + 0.114 * data[index + 2];
      const value = Math.max(0, Math.min(255, (gray - 128) * 1.4 + 128));
      data[index] = data[index + 1] = data[index + 2] = value;
    }
    context.putImageData(pixels, 0, 0);
    return canvas;
  } finally {
    URL.revokeObjectURL(source);
  }
}

async function readReceiptText(file, onProgress) {
  const Tesseract = await loadOcr();
  const canvas = await prepareReceiptImage(file);
  const worker = await Tesseract.createWorker("por", 1, {
    workerPath: OCR.workerPath,
    corePath: OCR.corePath,
    langPath: OCR.langPath,
    logger: (message) => { if (message.status === "recognizing text") onProgress?.(message.progress); }
  });
  try {
    const { data } = await worker.recognize(canvas);
    return data.text || "";
  } finally {
    await worker.terminate();
  }
}

const RECEIPT_CATEGORIES = [
  ["transporte", /\b(uber|bolt|cabify|t[aá]xi|taxi|metr[oô]|comboio|trem|[oô]nibus|autocarro|bus|bilhete de transporte|gasolina|combust[ií]vel|posto|parking|estacionamento|ped[aá]gio|portagem|aeroporto|ryanair|tap|latam|gol|azul)\b/i],
  ["hospedagem", /\b(hotel|hostel|pousada|airbnb|booking|apartamento|alojamento|resort|inn)\b/i],
  ["alimentacao", /\b(restaurante|rest\.|bar|caf[eé]|pastelaria|padaria|pizz\w*|lanchonete|snack|bistr[oô]|cervejaria|taberna|tasca|churrascaria|sushi|gelado|sorvete|almo[cç]o|jantar|couvert|gorjeta|servi[cç]o de mesa|food|burger|mcdonald|starbucks)\b/i],
  ["atracoes", /\b(museu|museo|ingresso|entrada|ticket|bilheteira|tour|passeio|parque|castelo|pal[aá]cio|igreja|monumento|show|teatro|cinema)\b/i],
  ["compras", /\b(loja|shop|store|supermercado|mercado|farm[aá]cia|continente|pingo doce|lidl|carrefour|auchan|el corte ingl[eé]s|zara|souvenir|lembran[cç]a)\b/i],
  ["seguro", /\b(seguro|insurance|ap[oó]lice)\b/i]
];

// Interpreta números escritos como 1.234,56 · 1,234.56 · 12,50 · 12.50 · 1.500.
function parseDecimal(value) {
  let text = String(value ?? "").trim().replace(/[^\d.,-]/g, "");
  if (!text) return NaN;
  const lastComma = text.lastIndexOf(",");
  const lastDot = text.lastIndexOf(".");
  if (lastComma >= 0 && lastDot >= 0) {
    // Os dois aparecem: o último é o separador decimal.
    const decimal = lastComma > lastDot ? "," : ".";
    text = text.split(decimal === "," ? "." : ",").join("").replace(decimal, ".");
  } else if (lastComma >= 0) {
    text = (text.match(/,/g) || []).length > 1 ? text.replace(/,/g, "") : text.replace(",", ".");
  } else if (lastDot >= 0) {
    const parts = text.split(".");
    // Vários pontos, ou "1.500" (três dígitos depois do ponto), é separador de milhar.
    if (parts.length > 2 || (parts[1].length === 3 && parts[0] !== "0" && parts[0] !== "")) text = parts.join("");
  }
  return Number(text);
}

function parseReceipt(text, trip) {
  // Corrige erros comuns do leitor em números: "98, 85" → "98,85" e a letra O no lugar do zero.
  const lines = text.split(/\n+/)
    .map((line) => line.replace(/\s+/g, " ").trim()
      .replace(/(\d)\s*([.,])\s+(\d{2})(?!\d)/g, "$1$2$3")
      .replace(/(?<=\d)[oO]|[oO](?=[\d.,]\d)/g, "0"))
    .filter(Boolean);
  const moneyPattern = /(\d{1,3}(?:[.\s]\d{3})*[.,]\d{2}|\d+[.,]\d{2})(?!\d)/g;
  // Ignora quantidades ("0,27Un", "1,2 kg") e preços unitários ("X 59,90").
  const amountsIn = (line) => [...line.matchAll(moneyPattern)]
    .filter((match) => {
      const before = line.slice(Math.max(0, match.index - 3), match.index);
      const after = line.slice(match.index + match[0].length, match.index + match[0].length + 4);
      return !/[xX*]\s*$/.test(before) && !/^\s*(un|kg|g\b|l\b|x\b|ml)/i.test(after);
    })
    .map((match) => parseDecimal(match[1].replace(/\s/g, "")))
    .filter((value) => value > 0 && value < 100000);
  let amount = null;
  const isTotal = (line) => /\b(total|a pagar|importe|totale|amount|summe|valor pago|pagar)\b/i.test(line)
    && !/\b(sub\s?-?total|iva|imposto|desconto|troco|change|tributos|taxa)\b/i.test(line);
  for (let index = lines.length - 1; index >= 0 && amount === null; index--) {
    if (!isTotal(lines[index])) continue;
    const values = amountsIn(lines[index]);
    // O valor do total às vezes cai na linha de baixo.
    const below = index + 1 < lines.length && !/[a-z]{3,}/i.test(lines[index + 1]) ? amountsIn(lines[index + 1]) : [];
    if (values.length) amount = values[values.length - 1];
    else if (below.length) amount = below[0];
  }
  if (amount === null) {
    const all = lines.flatMap(amountsIn);
    if (all.length) amount = Math.max(...all);
  }

  const upper = text.toUpperCase();
  const currency = /€|\bEUR\b/.test(upper) ? "EUR" : /R\$|\bBRL\b/.test(upper) ? "BRL" : /£|\bGBP\b/.test(upper) ? "GBP" : /US\$|\bUSD\b/.test(upper) ? "USD" : /\bARS\b/.test(upper) ? "ARS" : (trip.currency || "BRL");

  let date = "";
  const today = getBrasiliaDateKey();
  for (const match of text.matchAll(/\b(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})\b|\b(20\d{2})-(\d{2})-(\d{2})\b/g)) {
    const [rawDay, month, rawYear] = match[4] ? [match[6], match[5], match[4]] : [match[1], match[2], match[3]];
    const year = rawYear.length === 2 ? `20${rawYear}` : rawYear;
    // O leitor às vezes troca o 2 por 5, 3 ou 8 no dia ("53/09"): tenta 2x e 1x.
    const days = Number(rawDay) > 31 && rawDay.length === 2 ? [`2${rawDay[1]}`, `1${rawDay[1]}`] : [rawDay];
    const key = days.map((day) => `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`)
      .find((candidate) => parseLocalDate(candidate) && Number(month) <= 12 && Number(candidate.slice(8)) <= 31 && candidate <= addDays(today, 1) && candidate >= addDays(today, -3650));
    if (key) { date = key; break; }
  }

  const description = lines.find((line) => /[a-zà-ú]{3,}/i.test(line)
    && !/\b(nif|nipc|cnpj|cpf|contribuinte|rua|av\.|avenida|tel|telefone|fatura|factura|recibo|cupom|data|hora|www|http|@)\b/i.test(line)
    && (line.match(/\d/g) || []).length < line.length / 3) || "";
  // Tira a razão social do fim do nome: Ltda, ME, EPP, EIRELI, S/A, Lda, Unipessoal, GmbH, Inc.
  const tidy = description.replace(/[^\p{L}\p{N}&' ./-]/gu, "").replace(/\s+/g, " ")
    .replace(/(\s*[-–]?\s*\b(?:ltda|me|epp|eireli|s\/a|s\.a\.?|sa|lda|unipessoal|gmbh|inc|llc|ltd)\b\.?)+\s*$/i, "")
    .replace(/[\s/-]+$/, "").trim().slice(0, 60);
  const category = RECEIPT_CATEGORIES.find(([, pattern]) => pattern.test(text))?.[0] || "";
  return {
    amount,
    currency,
    date,
    description: tidy ? tidy.toLowerCase().replace(/(^|\s)\p{L}/gu, (letter) => letter.toUpperCase()) : "",
    category
  };
}

// ---------------------------------------------------------------------------
// Guia do destino: clima (Open-Meteo), entrada, saúde, dinheiro e checklist
// ---------------------------------------------------------------------------

const WEATHER_CACHE_KEY = "viagem-na-mao-clima-v1";
const weatherCache = (() => {
  try {
    return JSON.parse(window.localStorage.getItem(WEATHER_CACHE_KEY)) || {};
  } catch (error) {
    return {};
  }
})();

function average(values) {
  const valid = values.filter((value) => typeof value === "number");
  return valid.length ? valid.reduce((sum, value) => sum + value, 0) / valid.length : null;
}

// Previsão quando a viagem está a até 14 dias; senão, o que fez nas mesmas datas do ano passado.
async function loadWeather(city, start, end) {
  const key = `${city.name}|${start}|${end}`;
  const cached = weatherCache[key];
  const today = getBrasiliaDateKey();
  if (cached && cached.savedOn === today) return cached;
  const [lat, lon] = city.coordinates;
  let result;
  if (daysBetween(today, start) <= 14 && end >= today) {
    const from = start > today ? start : today;
    const limit = addDays(today, 15);
    const to = end < limit ? end : limit;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&start_date=${from}&end_date=${to}`;
    const data = await (await fetch(url)).json();
    const daily = data.daily || {};
    result = { mode: "forecast", max: average(daily.temperature_2m_max || []), min: average(daily.temperature_2m_min || []), rainy: (daily.precipitation_probability_max || []).filter((value) => value >= 50).length, days: (daily.time || []).length };
  } else {
    const shift = (date) => `${Number(date.slice(0, 4)) - 1}${date.slice(4)}`;
    const span = Math.min(daysBetween(start, end), 30);
    const from = shift(start);
    const to = addDays(from, span);
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&start_date=${from}&end_date=${to}`;
    const data = await (await fetch(url)).json();
    const daily = data.daily || {};
    result = { mode: "history", max: average(daily.temperature_2m_max || []), min: average(daily.temperature_2m_min || []), rainy: (daily.precipitation_sum || []).filter((value) => value >= 1).length, days: (daily.time || []).length };
  }
  if (result.max === null) throw new Error("Sem dados de clima");
  result.savedOn = today;
  weatherCache[key] = result;
  try {
    window.localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(weatherCache));
  } catch (error) {
    console.warn("Não foi possível guardar o clima.", error);
  }
  return result;
}

function weatherTips(weather) {
  const tips = [];
  if (weather.min < 8) tips.push("Casaco pesado, cachecol e luvas: as noites devem ser frias.");
  else if (weather.min < 15) tips.push("Leve um casaco ou blusa para a noite.");
  if (weather.max >= 28) tips.push("Roupas leves, protetor solar, chapéu e garrafa de água.");
  else if (weather.max < 18) tips.push("Prefira roupas em camadas para os dias mais frescos.");
  if (weather.days && weather.rainy / weather.days >= 0.3) tips.push("Guarda-chuva ou capa de chuva compacta.");
  tips.push("Sapato confortável para caminhar bastante.");
  return tips;
}

function renderWeather(slot, city, start, end) {
  loadWeather(city, start, end).then((weather) => {
    const round = (value) => Math.round(value);
    const label = weather.mode === "forecast" ? "Previsão para os dias da viagem" : "Nas mesmas datas do ano passado";
    slot.innerHTML = `<p class="muted" style="font-size:13px;margin-bottom:8px">${escapeHtml(label)} em ${escapeHtml(city.name)}</p>
      <div class="weather"><div><span>Máxima média</span><strong>${round(weather.max)}°</strong></div><div><span>Mínima média</span><strong>${round(weather.min)}°</strong></div><div><span>Dias de chuva</span><strong>${weather.rainy}/${weather.days}</strong></div></div>
      <ul class="tips">${weatherTips(weather).map((tip) => `<li>${icon("check")} ${escapeHtml(tip)}</li>`).join("")}</ul>
      <p class="text-credit" style="margin-top:8px">Dados: <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo.com</a> (CC BY 4.0). Clima passado não garante o tempo da viagem.</p>`;
  }).catch(() => {
    slot.innerHTML = '<p class="muted">Não foi possível carregar o clima agora. Verifique a conexão e tente de novo.</p>';
  });
}

function guideCountries(trip) {
  const groups = [];
  trip.destinations.forEach((destination) => {
    const country = getCityInfo(destination.name)?.country || trip.country || "Brasil";
    let group = groups.find((item) => item.country === country);
    if (!group) groups.push(group = { country, destinations: [] });
    group.destinations.push(destination);
  });
  return groups;
}

function infoItem(iconName, title, text, warn = false) {
  if (!text) return "";
  return `<div class="info-item"><span class="info-icon${warn ? " warn" : ""}">${icon(iconName)}</span><div><strong>${escapeHtml(title)}</strong><p>${escapeHtml(text)}</p></div></div>`;
}

function buildChecklist(trip, groups) {
  const guide = window.COUNTRY_GUIDE || {};
  const foreign = groups.filter((group) => group.country !== "Brasil");
  const items = [];
  if (foreign.length) {
    const validity = foreign.map((group) => guide[group.country]?.validadePassaporte).filter(Boolean)[0];
    items.push({ id: "passaporte", title: "Passaporte válido", detail: validity || "Confira a validade exigida por cada país." });
  } else {
    items.push({ id: "documento-foto", title: "Documento oficial com foto", detail: "RG, CNH ou passaporte para embarque em voos nacionais." });
  }
  foreign.forEach(({ country }) => {
    const info = guide[country];
    const slug = slugify(country);
    if (info?.visto?.exigido) items.push({ id: `visto-${slug}`, title: `Visto para ${country}`, detail: info.visto.resumo });
    if (info?.preEmbarque) items.push({ id: `autorizacao-${slug}`, title: info.preEmbarque.titulo, detail: `${info.preEmbarque.obrigatorio ? "Obrigatório. " : "Recomendado. "}${info.autorizacaoEletronica || ""}` });
    if (info?.tomadas) items.push({ id: `adaptador-${slug}`, title: `Adaptador de tomada · ${country}`, detail: info.tomadas });
    if (info?.moeda?.codigo && info.moeda.codigo !== "BRL") items.push({ id: `moeda-${info.moeda.codigo}`, title: `Dinheiro ou cartão em ${info.moeda.nome}`, detail: `Moeda local: ${info.moeda.nome} (${info.moeda.codigo}).` });
  });
  const mandatoryInsurance = foreign.filter(({ country }) => guide[country]?.seguro?.obrigatorio).map(({ country }) => country);
  if (foreign.length) items.push({ id: "seguro", title: "Seguro viagem", detail: mandatoryInsurance.length ? `Obrigatório em: ${mandatoryInsurance.join(", ")}.` : "Recomendado: despesas médicas no exterior podem ser muito caras." });
  const yellowFeverRequired = groups.filter(({ country }) => guide[country]?.febreAmarela === "exigida").map(({ country }) => country);
  const yellowFeverAdvised = groups.filter(({ country }) => guide[country]?.febreAmarela === "recomendada").map(({ country }) => country);
  if (yellowFeverRequired.length) items.push({ id: "vacina-febre-amarela", title: "Certificado de febre amarela (CIVP)", detail: `Exigido em: ${yellowFeverRequired.join(", ")}. Tome a vacina pelo menos 10 dias antes e emita o certificado no gov.br.` });
  else if (yellowFeverAdvised.length) items.push({ id: "vacina-febre-amarela", title: "Vacina de febre amarela", detail: `Recomendada para algumas regiões de: ${yellowFeverAdvised.join(", ")}. Veja o guia do país.` });
  if (trip.rentalCar && foreign.length) items.push({ id: "cnh-internacional", title: "Permissão Internacional para Dirigir (PID)", detail: "Emitida pelo Detran do seu estado; confirme se o país exige." });
  if (trip.children) items.push({ id: "autorizacao-menores", title: "Autorização de viagem para menores", detail: "Necessária quando a criança viaja sem um dos pais. Veja as regras do CNJ e da Polícia Federal." });
  if (trip.seniors) items.push({ id: "medicamentos", title: "Medicamentos de uso contínuo e receitas", detail: "Leve na bagagem de mão, com receita, de preferência em inglês para o exterior." });
  items.push({ id: "internet", title: "Internet: chip, eSIM ou roaming", detail: "Confira cobertura e se o seu celular aceita eSIM." });
  items.push({ id: "cartao", title: "Cartão para usar na viagem", detail: foreign.length ? "Compare tarifas e câmbio. Link parceiro do projeto: Nomad · cupom #viagemnamao (benefício não verificado pelo app)." : "Confira limites e avise o banco sobre a viagem." });
  items.push({ id: "copias-documentos", title: "Cópias digitais dos documentos", detail: "Guarde fotos do passaporte, reservas e seguro na nuvem." });
  items.push({ id: "enderecos", title: "Endereços e reservas salvos offline", detail: "Hospedagens, contatos e mapas offline das cidades." });
  items.push({ id: "ritmo", title: "Revisar o ritmo do roteiro", detail: "Pausas, deslocamentos e atividades que pedem reserva." });
  const seen = new Set();
  return items.filter((item) => !seen.has(item.id) && seen.add(item.id));
}

function renderGuide() {
  const trip = getCurrentTrip();
  const guide = window.COUNTRY_GUIDE || {};
  const groups = guideCountries(trip);
  const checklist = buildChecklist(trip, groups);
  const done = checklist.filter((item) => trip.checklist[item.id]).length;
  const verified = Object.values(guide)[0]?.verificadoEm;
  const container = $("#guide-content");
  container.innerHTML = `
    <div class="guide-hero"><h2>Guia da viagem</h2><p>O essencial para brasileiros em cada destino${verified ? `, pesquisado em fontes oficiais em ${escapeHtml(formatDate(verified, { day: "numeric", month: "long", year: "numeric" }))}` : ""}. Regras mudam: confirme antes de comprar passagens.</p></div>
    ${groups.map((group) => {
      const info = guide[group.country];
      const cities = group.destinations.map((destination) => destination.name).join(" · ");
      const weatherSlots = group.destinations.map((destination, index) => (getCityInfo(destination.name) && destination.startDate
        ? `<div class="card"><div class="card-head"><h2>${icon("cloud-sun")} Clima · ${escapeHtml(destination.name)}</h2></div><div data-weather="${escapeHtml(destination.name)}|${destination.startDate}|${destination.endDate}"><p class="muted">Carregando clima…</p></div></div>`
        : "") + apertoSlot(destination)).join("");
      if (!info) {
        return `<section class="guide-country"><h3 class="guide-country-title">${escapeHtml(group.country)} <small>${escapeHtml(cities)}</small></h3>${weatherSlots}
          <div class="card">${infoItem("info", "Guia ainda não disponível", "Ainda não reunimos as regras de entrada deste país. Consulte o Portal Consular do Itamaraty e o consulado do país no Brasil.", true)}<div class="sources"><a href="https://www.gov.br/mre/pt-br/assuntos/portal-consular" target="_blank" rel="noopener noreferrer">Portal Consular ↗</a></div></div></section>`;
      }
      const visa = info.visto ? `${info.visto.exigido ? "Precisa de visto. " : ""}${info.visto.resumo || ""}` : null;
      const insurance = info.seguro?.resumo ? `${info.seguro.obrigatorio ? "Obrigatório. " : info.seguro.obrigatorio === false ? "Não obrigatório, mas recomendado. " : ""}${info.seguro.resumo}` : null;
      return `<section class="guide-country">
        <h3 class="guide-country-title">${escapeHtml(group.country)} <small>${escapeHtml(cities)}</small></h3>
        ${weatherSlots}
        <div class="card"><div class="card-head"><h2>${icon("id-card")} Entrada e documentos</h2></div><div class="info-list">
          ${infoItem("id-card", "Documentos", info.documentos)}
          ${infoItem("calendar", "Validade do passaporte", info.validadePassaporte)}
          ${infoItem("flag", "Visto", visa, Boolean(info.visto?.exigido))}
          ${infoItem("shield-check", "Autorização eletrônica e formulários", info.autorizacaoEletronica, Boolean(info.preEmbarque?.obrigatorio))}
          ${infoItem("list-checks", "Pode ser pedido na imigração", info.comprovantes)}
        </div></div>
        <div class="card"><div class="card-head"><h2>${icon("syringe")} Saúde e seguro</h2></div><div class="info-list">
          ${infoItem("umbrella", "Seguro viagem", insurance, Boolean(info.seguro?.obrigatorio))}
          ${infoItem("syringe", "Vacinas e saúde", info.saude)}
        </div></div>
        <div class="card"><div class="card-head"><h2>${icon("globe")} No dia a dia</h2></div><div class="info-list">
          ${infoItem("banknote", "Moeda", info.moeda ? `${info.moeda.nome} (${info.moeda.codigo})` : null)}
          ${infoItem("plug", "Tomadas", info.tomadas)}
          ${infoItem("languages", "Idioma", info.idioma)}
          ${infoItem("phone", "Emergência", info.emergencia)}
          ${infoItem("car", "Trânsito", info.direcao ? `Dirige-se pela ${info.direcao}.` : null)}
          ${infoItem("coffee", "Gorjeta", info.gorjeta)}
        </div>
        ${info.fontes?.length ? `<div class="sources">${info.fontes.slice(0, 6).map((source) => `<a href="${escapeHtml(safeUrl(source.url))}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.titulo)} ↗</a>`).join("")}</div>` : ""}
        </div>
        ${info.naoConfirmado?.length ? `<details class="card disclosure"><summary>${icon("info")} Pontos ainda não confirmados <span>${info.naoConfirmado.length}</span>${icon("chevron-down", "chevron")}</summary>
          <ul class="unconfirmed">${info.naoConfirmado.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul></details>` : ""}
      </section>`;
    }).join("")}
    <div class="card" id="checklist-card">
      <div class="card-head"><h2>${icon("list-checks")} Checklist da viagem</h2></div>
      <div class="check-progress"><span>${done} de ${checklist.length} prontos</span><span>${Math.round((done / checklist.length) * 100)}%</span></div>
      <div class="progress"><span style="width:${(done / checklist.length) * 100}%"></span></div>
      <div class="checklist">${checklist.map((item) => `<label class="check-item"><input type="checkbox" data-checklist="${escapeHtml(item.id)}"${trip.checklist[item.id] ? " checked" : ""}><span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.detail)}</small></span></label>`).join("")}</div>
      <div class="guide-actions"><button class="btn btn-secondary btn-sm" type="button" id="download-checklist">${icon("download")} Baixar</button><button class="btn btn-secondary btn-sm" type="button" id="share-checklist">${icon("share-2")} Compartilhar</button></div>
    </div>
    <p class="footnote">Conteúdo informativo, não é orientação legal, médica ou consular. Confirme sempre com o consulado do país, a companhia aérea e fontes oficiais.</p>`;
  container.querySelectorAll("[data-weather]").forEach((slot) => {
    const [name, start, end] = slot.dataset.weather.split("|");
    renderWeather(slot, getCityInfo(name), start, end);
  });
  container.querySelectorAll("[data-aperto]").forEach(setupAperto);
}

// ---------------------------------------------------------------------------
// Na Hora do Aperto: água, banheiro, recarga e saúde perto do centro, da hospedagem ou de onde a pessoa está.
// Dados do OpenStreetMap em dados/aperto/<cidade>.js (ferramentas/gerar-aperto.mjs), carregados sob demanda.
// ---------------------------------------------------------------------------

const APERTO_KINDS = [
  { id: "agua", label: "Água", icon: "droplet", generic: "Água potável" },
  { id: "banheiro", label: "Banheiro", icon: "toilet", generic: "Banheiro público" },
  { id: "recarga", label: "Recarga", icon: "battery-charging", generic: "Ponto de recarga de celular" },
  { id: "farmacia", label: "Farmácia", icon: "pill", generic: "Farmácia" },
  { id: "hospital", label: "Hospital", icon: "hospital", generic: "Hospital" }
];
const apertoView = new Map();

// Cidade do atalho no Resumo: a de hoje durante a viagem; antes dela, a primeira do roteiro.
function apertoFocusCity(trip) {
  const known = trip.destinations.filter((destination) => getCityInfo(destination.name));
  if (tripClock(trip).phase === "durante") {
    const today = getBrasiliaDateKey(new Date(countdownNow()));
    const current = known.find((destination) => destination.startDate && destination.endDate && destination.startDate <= today && today <= destination.endDate);
    if (current) return current.name;
  }
  return known[0]?.name || null;
}

function renderApertoQuick(trip) {
  const panel = $("#trip-aperto");
  const city = apertoFocusCity(trip);
  panel.hidden = !city;
  if (!city) return;
  panel.innerHTML = `<div class="card-head"><h2>${icon("map-pin")} Na Hora do Aperto</h2><span class="aperto-quick-city">${escapeHtml(city)}</span></div>
    <p class="aperto-quick-text">O que tem mais perto, quando a necessidade aperta.</p>
    <div class="aperto-quick-grid">${APERTO_KINDS.map((kind) => `<button type="button" data-aperto-go="${kind.id}" data-city="${escapeHtml(city)}"><span>${icon(kind.icon)}</span>${kind.label}</button>`).join("")}</div>`;
}

function openAperto(cityName, kind) {
  const view = apertoView.get(cityName) || { kind, ref: "centro", here: null, limit: 5, note: "" };
  view.kind = kind;
  view.limit = 5;
  apertoView.set(cityName, view);
  navigate({ tab: "before" }, { replace: true });
  const card = $$("[data-aperto]").find((item) => item.dataset.aperto === cityName);
  if (!card) return;
  let last = null;
  const scroll = () => {
    // Para de reposicionar se a pessoa já rolou a tela por conta própria.
    if (!card.isConnected || (last !== null && Math.abs(window.scrollY - last) > 2)) return false;
    window.scrollTo({ top: card.getBoundingClientRect().top + window.scrollY - 76 });
    last = window.scrollY;
    return true;
  };
  scroll();
  // Clima e pontos chegam depois e mudam a altura do que vem antes: reposiciona por alguns instantes.
  const observer = new ResizeObserver(() => { if (!scroll()) observer.disconnect(); });
  observer.observe($("#guide-content"));
  setTimeout(() => observer.disconnect(), 4000);
}

function apertoSlot(destination) {
  if (!getCityInfo(destination.name)) return "";
  return `<div class="card aperto" data-aperto="${escapeHtml(destination.name)}"><div class="card-head"><h2>${icon("map-pin")} Na Hora do Aperto · ${escapeHtml(destination.name)}</h2></div><div class="aperto-body"><p class="muted">Carregando pontos úteis…</p></div></div>`;
}

function loadAperto(slug) {
  if (window.APERTO?.[slug]) return Promise.resolve(window.APERTO[slug]);
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `dados/aperto/${slug}.js?v=1`;
    script.onload = () => (window.APERTO?.[slug] ? resolve(window.APERTO[slug]) : reject(new Error("sem dados")));
    script.onerror = () => { script.remove(); reject(new Error("sem dados")); };
    document.head.append(script);
  });
}

function formatMeters(km) {
  return km < 1 ? `${Math.max(10, Math.round((km * 1000) / 10) * 10)} m` : `${km.toLocaleString("pt-BR", { maximumFractionDigits: km < 10 ? 1 : 0 })} km`;
}

function apertoReferences(trip, cityName) {
  const city = getCityInfo(cityName);
  const destination = trip.destinations.find((item) => sameCity(item.name, cityName));
  const refs = [{ id: "centro", label: "Centro da cidade", coordinates: city.coordinates }];
  (destination?.lodgings || []).filter((lodging) => lodging.coordinates).forEach((lodging) => {
    refs.push({ id: lodging.id, label: `Hospedagem: ${lodging.name || lodging.address || "sem nome"}`, coordinates: lodging.coordinates });
  });
  refs.push({ id: "aqui", label: "Onde estou agora" });
  return refs;
}

async function setupAperto(card) {
  const cityName = card.dataset.aperto;
  const body = $(".aperto-body", card);
  let data;
  try {
    data = await loadAperto(slugify(getCityInfo(cityName).name));
  } catch {
    body.innerHTML = '<p class="muted">Ainda não temos pontos úteis mapeados para esta cidade.</p>';
    return;
  }
  const view = apertoView.get(cityName) || { kind: "agua", ref: "centro", here: null, limit: 5, note: "" };
  apertoView.set(cityName, view);
  const draw = () => renderAperto(card, cityName, data, view);
  card.addEventListener("click", (event) => {
    const kind = event.target.closest("[data-aperto-kind]");
    if (kind) { view.kind = kind.dataset.apertoKind; view.limit = 5; draw(); }
    if (event.target.closest("[data-aperto-more]")) { view.limit += 10; draw(); }
  });
  card.addEventListener("change", (event) => {
    if (!event.target.matches("[data-aperto-ref]")) return;
    view.ref = event.target.value;
    view.limit = 5;
    view.note = "";
    if (view.ref !== "aqui") { draw(); return; }
    if (!navigator.geolocation) { view.ref = "centro"; view.note = "Este aparelho não informa a localização. Mostrando a partir do centro."; draw(); return; }
    view.note = "Buscando sua localização…";
    draw();
    navigator.geolocation.getCurrentPosition((position) => {
      view.here = [position.coords.latitude, position.coords.longitude];
      view.note = "";
      draw();
    }, () => {
      view.ref = "centro";
      view.note = "Não foi possível usar sua localização (permissão negada ou sinal fraco). Mostrando a partir do centro.";
      draw();
    }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 });
  });
  draw();
}

function renderAperto(card, cityName, data, view) {
  const trip = getCurrentTrip();
  const city = getCityInfo(cityName);
  const refs = apertoReferences(trip, cityName);
  if (!refs.some((ref) => ref.id === view.ref)) view.ref = "centro";
  let origin = refs.find((ref) => ref.id === view.ref)?.coordinates || null;
  let note = view.note;
  if (view.ref === "aqui" && view.here) {
    origin = view.here;
    if (distanceKm(view.here, city.coordinates) > 25) {
      origin = city.coordinates;
      note = `Você está a ${formatMeters(distanceKm(view.here, city.coordinates))} desta cidade. Mostrando a partir do centro.`;
    }
  }
  const counts = Object.fromEntries(APERTO_KINDS.map((kind) => [kind.id, 0]));
  data.pontos.forEach(([, , kind]) => { counts[kind] = (counts[kind] || 0) + 1; });
  const kind = APERTO_KINDS.find((item) => item.id === view.kind) || APERTO_KINDS[0];
  const nearest = origin
    ? data.pontos.filter((point) => point[2] === kind.id).map((point) => ({ point, km: distanceKm(origin, [point[0], point[1]]) })).sort((a, b) => a.km - b.km)
    : [];
  const shown = nearest.slice(0, view.limit);
  const isBrazil = (city.country || "Brasil") === "Brasil";
  const item = ({ point: [lat, lon, , name, extra = {}], km }) => {
    const tags = [];
    if (extra.p === "no") tags.push("Gratuito"); else if (extra.p === "yes") tags.push("Pago");
    if (extra.a === "yes") tags.push("Acessível para cadeira de rodas"); else if (extra.a === "limited") tags.push("Acessibilidade limitada");
    if (extra.e === "yes") tags.push("Pronto-socorro");
    if (extra.t === "yes") tags.push("Fraldário");
    const directions = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=walking`;
    return `<li class="aperto-item"><span class="aperto-icon">${icon(kind.icon)}</span><div><strong>${escapeHtml(name || kind.generic)}</strong>
      <small>a ${formatMeters(km)} em linha reta${tags.length ? ` · ${escapeHtml(tags.join(" · "))}` : ""}</small>
      ${extra.h ? `<small>Horário informado no mapa: ${escapeHtml(extra.h)}</small>` : ""}</div>
      <a class="btn btn-secondary btn-sm" href="${directions}" target="_blank" rel="noopener noreferrer" aria-label="Como chegar a ${escapeHtml(name || kind.generic)}">${icon("navigation")} Ir</a></li>`;
  };
  let list = "";
  if (origin && shown.length) {
    list = `<ul class="aperto-list">${shown.map(item).join("")}</ul>`
      + (nearest[0].km > 3 ? '<p class="aperto-note">O mais próximo fica a mais de 3 km. O mapa colaborativo pode estar incompleto nesta região.</p>' : "")
      + (nearest.length > shown.length ? `<button type="button" class="btn btn-secondary btn-sm aperto-more" data-aperto-more>Mostrar mais (${nearest.length - shown.length})</button>` : "");
  } else if (origin) {
    list = `<p class="muted">Nenhum ponto de ${escapeHtml(kind.label.toLowerCase())} mapeado num raio de ${data.raioKm} km do centro da cidade.</p>`;
  }
  $(".aperto-body", card).innerHTML = `
    <p class="aperto-intro">Água, banheiro, recarga e saúde mais perto, para quando a necessidade aperta.</p>
    <div class="chips aperto-kinds" role="group" aria-label="Tipo de ponto">${APERTO_KINDS.map((item) => `<button type="button" class="chip${item.id === kind.id ? " is-active" : ""}${counts[item.id] ? "" : " is-empty"}" data-aperto-kind="${item.id}" aria-pressed="${item.id === kind.id}">${icon(item.icon)} ${item.label} <span class="aperto-count">${counts[item.id] || 0}</span></button>`).join("")}</div>
    <label class="field aperto-ref">Perto de
      <select data-aperto-ref>${refs.map((ref) => `<option value="${escapeHtml(ref.id)}"${ref.id === view.ref ? " selected" : ""}>${escapeHtml(ref.label)}</option>`).join("")}</select>
    </label>
    ${note ? `<p class="aperto-note">${escapeHtml(note)}</p>` : ""}
    ${list}
    ${kind.id === "hospital" ? `<p class="aperto-note warn">${icon("phone")} Em emergência, ligue para o serviço de emergência local${isBrazil ? ": SAMU 192, Bombeiros 193, Polícia 190" : " (veja “Emergência” no guia do país)"}.</p>` : ""}
    <p class="text-credit">Dados colaborativos do <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap</a> (ODbL), extraídos em ${escapeHtml(formatDate(data.geradoEm, { month: "long", year: "numeric" }))}. Podem estar incompletos ou desatualizados: confirme no local.</p>`;
}

function checklistText(trip) {
  const groups = guideCountries(trip);
  const lines = [`Checklist — ${trip.name || "Minha viagem"}`, `${tripCities(trip).join(" · ")} · ${formatRange(trip.startDate, trip.endDate)}`, ""];
  buildChecklist(trip, groups).forEach((item) => lines.push(`${trip.checklist[item.id] ? "[x]" : "[ ]"} ${item.title} — ${item.detail}`));
  lines.push("", "Gerado pelo Viagem na Mão. Regras mudam: confirme com fontes oficiais.");
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Hospedagens (pelo Resumo): várias por cidade, cada uma com as suas noites.
// O endereço vira coordenada pelo Nominatim (OpenStreetMap), só quando a pessoa toca em "Localizar".
// ---------------------------------------------------------------------------

const GEOCODE_CACHE_KEY = "viagem-na-mao-enderecos-v1";
const geocodeCache = (() => {
  try { return JSON.parse(window.localStorage.getItem(GEOCODE_CACHE_KEY) || "{}"); } catch { return {}; }
})();
let lastGeocodeAt = 0;

// Noites de uma cidade: do dia de chegada até a véspera da saída.
function stayNights(destination) {
  const nights = [];
  if (!destination.startDate || !destination.endDate) return nights;
  for (let date = destination.startDate; date < destination.endDate && nights.length < 90; date = addDays(date, 1)) nights.push(date);
  return nights;
}

function lodgingNights(lodging) {
  const nights = [];
  if (!lodging.checkIn || !lodging.checkOut) return nights;
  for (let date = lodging.checkIn; date < lodging.checkOut && nights.length < 90; date = addDays(date, 1)) nights.push(date);
  return nights;
}

function sortedLodgings(destination) {
  return [...destination.lodgings].sort((a, b) => (a.checkIn || "").localeCompare(b.checkIn || ""));
}

function uncoveredNights(destination) {
  const covered = new Set(destination.lodgings.flatMap(lodgingNights));
  return stayNights(destination).filter((date) => !covered.has(date));
}

function lodgingRange(lodging) {
  const nights = lodgingNights(lodging).length;
  if (!nights) return "Datas a definir";
  return `${formatDate(lodging.checkIn, { day: "numeric", month: "short" })} → ${formatDate(lodging.checkOut, { day: "numeric", month: "short" })} · ${nightsLabel(nights)}`;
}

// Onde a pessoa está naquele dia: a hospedagem em que dorme naquela noite;
// no último dia da viagem, a de onde sai pela manhã.
function lodgingForDate(trip, date) {
  const all = trip.destinations.flatMap((destination, index) => destination.lodgings.map((lodging) => ({ ...lodging, city: destination.name, destinationIndex: index })));
  return all.find((lodging) => lodging.checkIn <= date && date < lodging.checkOut) || all.find((lodging) => lodging.checkOut === date) || null;
}

function destinationIndexForDate(trip, date) {
  const index = trip.destinations.findIndex((destination) => destination.startDate <= date && date < destination.endDate);
  return index >= 0 ? index : trip.destinations.findIndex((destination) => destination.endDate === date);
}

async function geocodeAddress(address, destination) {
  const city = getCityInfo(destination.name);
  const query = normalizeText(address).includes(normalizeText(destination.name)) ? address : `${address}, ${destination.name}${city?.country ? `, ${city.country}` : ""}`;
  const key = normalizeText(query);
  if (geocodeCache[key]) return geocodeCache[key];
  const pause = 1100 - (Date.now() - lastGeocodeAt);
  if (pause > 0) await wait(pause);
  lastGeocodeAt = Date.now();
  const params = new URLSearchParams({ format: "jsonv2", limit: "5", "accept-language": "pt-BR", q: query });
  if (city?.coordinates) {
    const [lat, lon] = city.coordinates;
    params.set("viewbox", `${lon - 0.6},${lat + 0.6},${lon + 0.6},${lat - 0.6}`);
  }
  const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`);
  if (!response.ok) throw new Error(`Nominatim respondeu ${response.status}`);
  const results = (await response.json()).map((item) => ({ coordinates: [Number(item.lat), Number(item.lon)], label: item.display_name }));
  geocodeCache[key] = results;
  try {
    const keys = Object.keys(geocodeCache);
    if (keys.length > 300) delete geocodeCache[keys[0]];
    window.localStorage.setItem(GEOCODE_CACHE_KEY, JSON.stringify(geocodeCache));
  } catch {
    // Sem espaço para o cache: segue sem guardar.
  }
  return results;
}

function openLodgingSheet(index, lodgingId = null) {
  const trip = getCurrentTrip();
  const destination = trip.destinations[index];
  if (!destination) return;
  const nights = stayNights(destination);
  if (!nights.length) {
    toast(`Defina pelo menos uma noite em ${destination.name} para cadastrar hospedagem`);
    return;
  }
  const existing = lodgingId ? destination.lodgings.find((item) => item.id === lodgingId) : null;
  const free = uncoveredNights(destination);
  let defaultOut = free.length ? addDays(free[0], 1) : addDays(nights[0], 1);
  while (free.includes(defaultOut)) defaultOut = addDays(defaultOut, 1);
  const draft = existing ? { ...existing } : { id: `hosp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, name: "", address: "", checkIn: free[0] || nights[0], checkOut: defaultOut, coordinates: null, label: "" };
  let locatedFor = existing?.coordinates ? existing.address : null;
  const city = getCityInfo(destination.name);
  const option = (date, selected) => `<option value="${date}"${date === selected ? " selected" : ""}>${escapeHtml(formatDate(date, { weekday: "short", day: "numeric", month: "short" }))}</option>`;
  openSheet(`${sheetTitle(existing ? "Editar hospedagem" : "Nova hospedagem")}
    <p class="muted">${escapeHtml(destination.name)} · ${escapeHtml(formatRange(destination.startDate, destination.endDate, false))} · ${nightsLabel(nights.length)}</p>
    <label class="field">Nome (opcional)<input id="lodging-name" maxlength="100" value="${escapeHtml(draft.name)}" placeholder="Ex.: Pousada do Centro"></label>
    <label class="field">Endereço<input id="lodging-address" maxlength="180" value="${escapeHtml(draft.address)}" placeholder="Rua, número, bairro"></label>
    <button class="btn btn-secondary btn-block" type="button" id="lodging-locate">${icon("map-pin")} Localizar no mapa</button>
    <div class="geo-results" id="geo-results"></div>
    <p class="geo-status" id="geo-status"></p>
    <div class="field-row">
      <label class="field">Entrada<select id="lodging-in">${nights.map((date) => option(date, draft.checkIn)).join("")}</select></label>
      <label class="field">Saída<select id="lodging-out">${nights.map((date) => option(addDays(date, 1), draft.checkOut)).join("")}</select></label>
    </div>
    <p class="form-status" id="lodging-status" role="status" aria-live="polite"></p>
    <div class="${existing ? "row-actions" : ""}">${existing ? `<button class="btn btn-danger" type="button" id="lodging-remove">${icon("trash-2")} Remover</button>` : ""}<button class="btn btn-primary${existing ? "" : " btn-block"}" type="button" id="lodging-save">${icon("check")} Salvar</button></div>
    <p class="footnote">Endereços localizados com o <a href="https://nominatim.org/" target="_blank" rel="noopener noreferrer">Nominatim</a>, dados © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">colaboradores do OpenStreetMap</a>.</p>`, (root) => {
    const address = root.querySelector("#lodging-address");
    const results = root.querySelector("#geo-results");
    const geoStatus = root.querySelector("#geo-status");
    const status = root.querySelector("#lodging-status");
    const paintGeo = () => {
      geoStatus.className = `geo-status${draft.coordinates ? " is-ok" : ""}`;
      geoStatus.innerHTML = draft.coordinates
        ? `${icon("circle-check")} Localizado: ${escapeHtml(draft.label.split(",").slice(0, 4).join(","))}`
        : `${icon("info")} Ainda não localizado. Sem isso, o roteiro não calcula os deslocamentos a partir daqui.`;
    };
    paintGeo();
    address.addEventListener("input", () => {
      if (locatedFor !== null && address.value.trim() !== locatedFor) {
        draft.coordinates = null;
        draft.label = "";
        locatedFor = null;
        results.innerHTML = "";
        paintGeo();
      }
    });
    const choose = (item) => {
      draft.coordinates = item.coordinates;
      draft.label = item.label;
      locatedFor = address.value.trim();
      results.innerHTML = "";
      paintGeo();
    };
    root.querySelector("#lodging-locate").addEventListener("click", async (event) => {
      const button = event.currentTarget;
      const text = address.value.trim();
      if (text.length < 4) {
        geoStatus.textContent = "Digite o endereço (rua e número) para localizar.";
        return;
      }
      button.disabled = true;
      geoStatus.textContent = "Procurando o endereço…";
      try {
        const found = await geocodeAddress(text, destination);
        if (!found.length) {
          results.innerHTML = "";
          geoStatus.textContent = "Não encontrei esse endereço. Confira a rua e o número, ou tente só o nome do hotel.";
        } else if (found.length === 1) choose(found[0]);
        else {
          geoStatus.textContent = "Qual destes é o endereço certo?";
          results.innerHTML = found.map((item, position) => {
            const km = city?.coordinates ? distanceKm(city.coordinates, item.coordinates) : null;
            return `<button type="button" class="geo-option" data-geo="${position}">${icon("map-pin")}<span>${escapeHtml(item.label)}${km !== null ? `<small>${km < 1 ? "no centro" : `a ${Math.round(km)} km do centro`} de ${escapeHtml(destination.name)}</small>` : ""}</span></button>`;
          }).join("");
          results.onclick = (clickEvent) => {
            const option = clickEvent.target.closest("[data-geo]");
            if (option) choose(found[Number(option.dataset.geo)]);
          };
        }
      } catch (error) {
        console.error("Falha ao localizar endereço.", error);
        geoStatus.textContent = "Não consegui consultar o mapa agora. Tente de novo em instantes.";
      } finally {
        button.disabled = false;
      }
    });
    root.querySelector("#lodging-save").addEventListener("click", () => {
      draft.name = root.querySelector("#lodging-name").value.trim();
      draft.address = address.value.trim();
      draft.checkIn = root.querySelector("#lodging-in").value;
      draft.checkOut = root.querySelector("#lodging-out").value;
      if (!draft.name && !draft.address) {
        status.textContent = "Informe o nome ou o endereço da hospedagem.";
        return;
      }
      if (draft.checkOut <= draft.checkIn) {
        status.textContent = "A saída precisa ser depois da entrada.";
        return;
      }
      const mine = new Set(lodgingNights(draft));
      const clash = destination.lodgings.filter((item) => item.id !== draft.id).flatMap(lodgingNights).filter((date) => mine.has(date));
      if (clash.length) {
        status.textContent = `Já há hospedagem na noite de ${clash.map((date) => formatDate(date, { day: "numeric", month: "short" })).join(", ")}.`;
        return;
      }
      const previous = destination.lodgings;
      destination.lodgings = existing ? destination.lodgings.map((item) => (item.id === draft.id ? draft : item)) : [...destination.lodgings, draft];
      if (!saveState()) {
        destination.lodgings = previous;
        return;
      }
      closeSheet();
      showTab(route.tab);
      toast(draft.coordinates ? "Hospedagem salva" : "Hospedagem salva sem localização no mapa");
    });
    root.querySelector("#lodging-remove")?.addEventListener("click", (event) => {
      const button = event.currentTarget;
      if (!button.dataset.confirm) {
        button.dataset.confirm = "1";
        button.innerHTML = `${icon("trash-2")} Confirmar`;
        return;
      }
      destination.lodgings = destination.lodgings.filter((item) => item.id !== draft.id);
      saveState();
      closeSheet();
      showTab(route.tab);
      toast("Hospedagem removida");
    });
  });
}

// Sugestão de roteiro: distribui os lugares curtidos pelos dias de cada cidade,
// começando pelo que fica mais perto da hospedagem do dia (distância em linha reta).
function suggestTripPlan(trip) {
  const days = getTripDays(trip);
  const slots = ["09:00", "11:00", "14:00", "16:00", "18:00", "20:00"];
  const coordsOf = (item) => getOpenData(item.id)?.coordinates || getActivity(item.id)?.coordinates || null;
  const groups = trip.destinations.map(() => []);
  const loose = [];
  trip.saved.forEach((item) => {
    const activity = getActivity(item.id);
    const index = activity ? trip.destinations.findIndex((destination) => activityMatchesCity(activity, destination.name)) : -1;
    (index >= 0 ? groups[index] : loose).push(item);
  });
  groups.forEach((items, index) => {
    const destination = trip.destinations[index];
    const last = index === trip.destinations.length - 1;
    let cityDays = stayNights(destination);
    if (last || !cityDays.length) cityDays = [...cityDays, destination.endDate].filter((date) => days.includes(date));
    if (!cityDays.length) cityDays = [days[0]];
    let remaining = [...items];
    cityDays.forEach((date, dayIndex) => {
      const count = Math.ceil(remaining.length / (cityDays.length - dayIndex));
      const home = lodgingForDate(trip, date)?.coordinates || getCityInfo(destination.name)?.coordinates || null;
      let point = home;
      for (let slot = 0; slot < count && remaining.length; slot++) {
        let pick = 0;
        if (point) {
          let best = Infinity;
          remaining.forEach((item, position) => {
            const coords = coordsOf(item);
            const km = coords ? distanceKm(point, coords) : Infinity;
            if (km < best) { best = km; pick = position; }
          });
        }
        const [item] = remaining.splice(pick, 1);
        item.date = date;
        item.time = slots[Math.min(slot, slots.length - 1)];
        point = coordsOf(item) || point;
      }
    });
  });
  loose.forEach((item, position) => {
    item.date = days[Math.min(position, days.length - 1)];
    item.time = slots[0];
  });
}


// ---------------------------------------------------------------------------
// Cadastro da viagem em etapas
// ---------------------------------------------------------------------------

let wizard = null;

const COMPANION_OPTIONS = [["Sozinho(a)", "user"], ["Casal", "heart"], ["Família", "users"], ["Amigos", "users"]];
const TRANSPORT_OPTIONS = [["Avião", "plane"], ["Carro próprio", "car"], ["Carro alugado", "car"], ["Ônibus", "bus"], ["Trem", "train-front"], ["Navio / cruzeiro", "ship"]];

function startNewTrip() {
  const today = getBrasiliaDateKey();
  wizard = {
    step: 0,
    editingId: null,
    month: today.slice(0, 7),
    focus: "start",
    query: "",
    data: { cities: [], startDate: "", endDate: "", companions: "", children: false, seniors: false, transport: "", interests: ["natureza", "gastronomia", "cultura"], budget: "", currency: "BRL", rate: 1, name: "", nameEdited: false, departureTime: "" }
  };
  navigate({ screen: "form" });
}

// Com `only`, edita só uma parte (e a divisão de noites, quando ela precisar ser refeita).
// Depois de editar só uma parte, o menu "Editar viagem" reabre para editar outra.
let reopenEditSheet = false;

function editTrip(only = null) {
  const trip = getCurrentTrip();
  if (!trip) return;
  wizard = {
    step: 0,
    only,
    originalNights: trip.startDate && trip.endDate ? daysBetween(trip.startDate, trip.endDate) : 0,
    editingId: trip.id,
    month: (trip.startDate || getBrasiliaDateKey()).slice(0, 7),
    focus: "start",
    query: "",
    data: {
      cities: trip.destinations.map((destination) => ({
        name: destination.name,
        country: getCityInfo(destination.name)?.country || trip.country || "",
        nights: destination.startDate && destination.endDate ? daysBetween(destination.startDate, destination.endDate) : 0,
        lodgings: destination.lodgings || [],
        id: destination.id
      })),
      startDate: trip.startDate,
      endDate: trip.endDate,
      companions: trip.companions,
      children: trip.children,
      seniors: trip.seniors,
      transport: trip.transport,
      interests: [...trip.interests],
      budget: trip.budget || "",
      currency: trip.currency || "BRL",
      rate: trip.budgetExchangeRate || 1,
      name: trip.name,
      nameEdited: true,
      departureTime: trip.departureTime || ""
    }
  };
  navigate({ screen: "form" });
}

function wizardSteps() {
  if (wizard.only) {
    // Nas datas, a divisão de noites só aparece se o total de noites mudou.
    const multi = wizard.data.cities.length > 1;
    const needsSplit = multi && (wizard.only === "cities" || (wizard.only === "dates" && totalNights() !== wizard.originalNights));
    return needsSplit ? [wizard.only, "split"] : [wizard.only];
  }
  const steps = ["cities", "dates"];
  if (wizard.data.cities.length > 1) steps.push("split");
  steps.push("people", "interests", "budget");
  return steps;
}

function totalNights() {
  const { startDate, endDate } = wizard.data;
  return startDate && endDate ? daysBetween(startDate, endDate) : 0;
}

function distributeNights() {
  const cities = wizard.data.cities;
  if (!cities.length) return;
  const total = totalNights();
  const base = Math.floor(total / cities.length);
  let remainder = total - base * cities.length;
  cities.forEach((city) => {
    city.nights = base + (remainder > 0 ? 1 : 0);
    remainder -= 1;
  });
}

function suggestedName() {
  const names = wizard.data.cities.map((city) => city.name);
  if (!names.length) return "";
  const base = names.length > 2 ? `${names.slice(0, 2).join(", ")} e mais ${names.length - 2}` : names.join(" e ");
  return wizard.data.startDate ? `${base} · ${formatDate(wizard.data.startDate, { month: "short", year: "numeric" }).replace(" de ", " ")}` : base;
}

function stepIsValid(step) {
  const data = wizard.data;
  if (step === "cities") return data.cities.length > 0;
  if (step === "dates") return Boolean(data.startDate && data.endDate && data.endDate >= data.startDate);
  if (step === "split") return data.cities.reduce((sum, city) => sum + city.nights, 0) === totalNights();
  if (step === "budget") return Boolean(data.name.trim()) && (data.currency === "BRL" || parseDecimal(data.rate) > 0);
  return true;
}

function renderWizard() {
  const steps = wizardSteps();
  wizard.step = Math.min(wizard.step, steps.length - 1);
  const step = steps[wizard.step];
  $("#wizard-title").textContent = wizard.editingId ? "Editar viagem" : "Nova viagem";
  $("#form-status").textContent = wizard.step === 0 ? storageNotice : "";
  const body = $("#wizard-body");
  ({ cities: renderCitiesStep, dates: renderDatesStep, split: renderSplitStep, people: renderPeopleStep, interests: renderInterestsStep, budget: renderBudgetStep })[step](body);
  hydrateIcons(body);
  updateWizardNext();
}

function updateWizardNext() {
  const steps = wizardSteps();
  const step = steps[wizard.step];
  // O número de etapas pode mudar (ex.: datas que exigem refazer a divisão de noites).
  const titles = { cities: "Destinos", dates: "Datas", split: "Dias por cidade", people: "Quem vai", interests: "Interesses", budget: "Orçamento" };
  $("#wizard-step-label").textContent = `Etapa ${wizard.step + 1} de ${steps.length} · ${titles[step]}`;
  $("#wizard-progress").style.width = `${((wizard.step + 1) / steps.length) * 100}%`;
  const last = wizard.step === steps.length - 1;
  const button = $("#wizard-next");
  button.disabled = !stepIsValid(step);
  button.innerHTML = last ? `${icon("check")} ${wizard.editingId ? "Salvar alterações" : "Criar viagem"}` : `Continuar ${icon("arrow-right")}`;
}

function cityOptionHtml(city, selected) {
  return `<button class="city-option${selected ? " is-selected" : ""}" type="button" data-city="${escapeHtml(city.name)}" data-country="${escapeHtml(city.country)}">
    <span class="city-icon">${icon(city.country === "Brasil" ? "map-pin" : "globe")}</span>
    <span><strong>${escapeHtml(city.name)}</strong><small>${escapeHtml(city.country)}</small></span>
    <span class="check">${icon("check")}</span></button>`;
}

function renderCitiesStep(body) {
  const data = wizard.data;
  body.innerHTML = `<div class="wizard-intro"><h2>Para onde você vai?</h2><p>Escolha uma ou mais cidades, na ordem da viagem.</p></div>
    <div class="search-box">${icon("search")}<input id="city-search" type="search" placeholder="Buscar cidade" value="${escapeHtml(wizard.query)}" autocomplete="off" aria-label="Buscar cidade"></div>
    <div class="selected-cities" id="selected-cities"></div>
    <div class="city-list" id="city-list"></div>`;
  const paint = () => {
    $("#selected-cities").innerHTML = data.cities.map((city, index) => `<span class="chip">${index + 1}. ${escapeHtml(city.name)}<button type="button" data-remove-city="${index}" aria-label="Remover ${escapeHtml(city.name)}">${icon("x")}</button></span>`).join("");
    const query = normalizeText(wizard.query);
    const all = [...cityData.cities].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    const filtered = all.filter((city) => !query || normalizeText(city.name).includes(query) || normalizeText(city.country).includes(query));
    const isSelected = (name) => data.cities.some((city) => sameCity(city.name, name));
    const brazil = filtered.filter((city) => city.country === "Brasil");
    const abroad = filtered.filter((city) => city.country !== "Brasil");
    const exact = all.some((city) => normalizeText(city.name) === query);
    $("#city-list").innerHTML = (query && !exact ? `<button class="city-option" type="button" data-city="${escapeHtml(wizard.query.trim())}" data-country=""><span class="city-icon">${icon("plus")}</span><span><strong>Usar “${escapeHtml(wizard.query.trim())}”</strong><small>Cidade fora da lista: sem sugestões nem guia automático por enquanto</small></span><span class="check">${icon("check")}</span></button>` : "")
      + (brazil.length ? `<p class="city-group-title">Brasil</p>${brazil.map((city) => cityOptionHtml(city, isSelected(city.name))).join("")}` : "")
      + (abroad.length ? `<p class="city-group-title">Exterior</p>${abroad.map((city) => cityOptionHtml(city, isSelected(city.name))).join("")}` : "");
    updateWizardNext();
  };
  paint();
  $("#city-search").addEventListener("input", (event) => {
    wizard.query = event.target.value;
    paint();
  });
  body.addEventListener("click", (event) => {
    const remove = event.target.closest("[data-remove-city]");
    if (remove) {
      data.cities.splice(Number(remove.dataset.removeCity), 1);
      distributeNights();
      paint();
      return;
    }
    const option = event.target.closest("[data-city]");
    if (!option) return;
    const name = option.dataset.city;
    const index = data.cities.findIndex((city) => sameCity(city.name, name));
    if (index >= 0) data.cities.splice(index, 1);
    else {
      data.cities.push({ name, country: option.dataset.country, nights: 0 });
      if (!getCityInfo(name)) {
        wizard.query = "";
        $("#city-search").value = "";
      }
    }
    distributeNights();
    paint();
  });
}

function renderDatesStep(body) {
  const data = wizard.data;
  const today = getBrasiliaDateKey();
  body.innerHTML = `<div class="wizard-intro"><h2>Quando?</h2><p>Toque no dia da ida e depois no dia da volta.</p></div>
    <div class="range-summary"><div id="range-start"></div><div id="range-end"></div></div>
    <div class="calendar" id="calendar"></div>
    <p class="nights-note" id="nights-note"></p>
    <label class="field departure-field">Horário de saída (opcional)<input id="wizard-departure" type="time" value="${escapeHtml(data.departureTime || "")}"><small>Usado na contagem regressiva. Horário de Brasília.</small></label>`;
  body.querySelector("#wizard-departure").addEventListener("input", (event) => { data.departureTime = event.target.value; });
  const paint = () => {
    $("#range-start").className = wizard.focus === "start" ? "is-focus" : "";
    $("#range-end").className = wizard.focus === "end" ? "is-focus" : "";
    $("#range-start").innerHTML = `<span>Ida</span><strong>${data.startDate ? escapeHtml(formatDate(data.startDate, { weekday: "short", day: "numeric", month: "short" })) : "Escolha"}</strong>`;
    $("#range-end").innerHTML = `<span>Volta</span><strong>${data.endDate ? escapeHtml(formatDate(data.endDate, { weekday: "short", day: "numeric", month: "short" })) : "Escolha"}</strong>`;
    const [year, month] = wizard.month.split("-").map(Number);
    const first = new Date(Date.UTC(year, month - 1, 1, 12));
    const daysInMonth = new Date(Date.UTC(year, month, 0, 12)).getUTCDate();
    const offset = first.getUTCDay();
    const monthLabel = capitalize(new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric", timeZone: "UTC" }).format(first));
    let cells = ["D", "S", "T", "Q", "Q", "S", "S"].map((day) => `<span class="dow">${day}</span>`).join("");
    for (let index = 0; index < offset; index++) cells += "<span></span>";
    for (let day = 1; day <= daysInMonth; day++) {
      const key = `${wizard.month}-${String(day).padStart(2, "0")}`;
      const disabled = !wizard.editingId && key < today;
      const classes = ["calendar-day"];
      if (key === today) classes.push("is-today");
      if (data.startDate && key === data.startDate) classes.push("is-start");
      if (data.endDate && key === data.endDate) classes.push("is-end");
      if (data.startDate && data.endDate && key >= data.startDate && key <= data.endDate) classes.push("in-range");
      cells += `<button class="${classes.join(" ")}" type="button" data-date="${key}"${disabled ? " disabled" : ""} aria-label="${escapeHtml(formatDate(key, { day: "numeric", month: "long" }))}"><span>${day}</span></button>`;
    }
    $("#calendar").innerHTML = `<div class="calendar-head"><button class="icon-btn icon-btn-sm" type="button" data-month="-1" aria-label="Mês anterior">${icon("chevron-left")}</button><strong>${escapeHtml(monthLabel)}</strong><button class="icon-btn icon-btn-sm" type="button" data-month="1" aria-label="Próximo mês">${icon("chevron-right")}</button></div><div class="calendar-grid">${cells}</div>`;
    $("#nights-note").textContent = data.startDate && data.endDate ? `${nightsLabel(totalNights())} · ${totalNights() + 1} dias` : "";
    updateWizardNext();
  };
  paint();
  $("#calendar").addEventListener("click", (event) => {
    const monthButton = event.target.closest("[data-month]");
    if (monthButton) {
      const [year, month] = wizard.month.split("-").map(Number);
      const date = new Date(Date.UTC(year, month - 1 + Number(monthButton.dataset.month), 1));
      wizard.month = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
      paint();
      return;
    }
    const dayButton = event.target.closest("[data-date]");
    if (!dayButton) return;
    const key = dayButton.dataset.date;
    if (wizard.focus === "start" || !data.startDate || key < data.startDate) {
      data.startDate = key;
      data.endDate = "";
      wizard.focus = "end";
    } else {
      data.endDate = key;
      wizard.focus = "start";
      distributeNights();
    }
    paint();
  });
}

function renderSplitStep(body) {
  const data = wizard.data;
  if (data.cities.reduce((sum, city) => sum + city.nights, 0) !== totalNights()) distributeNights();
  body.innerHTML = `<div class="wizard-intro"><h2>Quantas noites em cada cidade?</h2><p>Dividimos igualmente; ajuste como preferir.</p></div><div class="stepper-list" id="split-list"></div><p class="nights-note" id="split-note"></p>`;
  const paint = () => {
    let cursor = data.startDate;
    $("#split-list").innerHTML = data.cities.map((city, index) => {
      const arrival = cursor;
      const departure = index === data.cities.length - 1 ? data.endDate : addDays(cursor, city.nights);
      cursor = departure;
      return `<div class="stepper-row"><div><strong>${escapeHtml(city.name)}</strong><small>${escapeHtml(formatRange(arrival, departure, false))}</small></div>
        <div class="stepper"><button class="icon-btn icon-btn-sm" type="button" data-nights="${index}" data-delta="-1" aria-label="Menos uma noite em ${escapeHtml(city.name)}"${city.nights <= 0 ? " disabled" : ""}>${icon("minus")}</button><output>${nightsLabel(city.nights)}</output><button class="icon-btn icon-btn-sm" type="button" data-nights="${index}" data-delta="1" aria-label="Mais uma noite em ${escapeHtml(city.name)}">${icon("plus")}</button></div></div>`;
    }).join("");
    const diff = totalNights() - data.cities.reduce((sum, city) => sum + city.nights, 0);
    $("#split-note").textContent = diff === 0 ? `Tudo certo: ${nightsLabel(totalNights())} no total.` : diff > 0 ? `Faltam ${nightsLabel(diff)} para completar a viagem.` : `Passou ${nightsLabel(-diff)} do total da viagem.`;
    $("#split-note").style.color = diff === 0 ? "" : "var(--danger)";
    updateWizardNext();
  };
  paint();
  $("#split-list").addEventListener("click", (event) => {
    const button = event.target.closest("[data-nights]");
    if (!button) return;
    const city = data.cities[Number(button.dataset.nights)];
    city.nights = Math.max(0, city.nights + Number(button.dataset.delta));
    paint();
  });
}

function renderPeopleStep(body) {
  const data = wizard.data;
  body.innerHTML = `<div class="wizard-intro"><h2>Quem vai com você?</h2><p>Ajuda a sugerir lugares e o checklist certo.</p></div>
    <div class="option-grid" id="companion-options">${COMPANION_OPTIONS.map(([label, iconName]) => `<button class="option-tile${data.companions === label ? " is-selected" : ""}" type="button" data-companion="${escapeHtml(label)}">${icon(iconName)}${escapeHtml(label)}</button>`).join("")}</div>
    <div style="margin-top:12px"><label class="toggle-row">Crianças na viagem<span class="switch"><input type="checkbox" id="wizard-children"${data.children ? " checked" : ""}><span></span></span></label>
    <label class="toggle-row">Idosos na viagem<span class="switch"><input type="checkbox" id="wizard-seniors"${data.seniors ? " checked" : ""}><span></span></span></label></div>
    <h3 class="option-group-title">Como você vai?</h3>
    <div class="option-grid" id="transport-options">${TRANSPORT_OPTIONS.map(([label, iconName]) => `<button class="option-tile${data.transport === label ? " is-selected" : ""}" type="button" data-transport="${escapeHtml(label)}">${icon(iconName)}${escapeHtml(label)}</button>`).join("")}</div>`;
  body.querySelector("#companion-options").addEventListener("click", (event) => {
    const button = event.target.closest("[data-companion]");
    if (!button) return;
    data.companions = data.companions === button.dataset.companion ? "" : button.dataset.companion;
    body.querySelectorAll("[data-companion]").forEach((item) => item.classList.toggle("is-selected", item.dataset.companion === data.companions));
  });
  body.querySelector("#transport-options").addEventListener("click", (event) => {
    const button = event.target.closest("[data-transport]");
    if (!button) return;
    data.transport = data.transport === button.dataset.transport ? "" : button.dataset.transport;
    body.querySelectorAll("[data-transport]").forEach((item) => item.classList.toggle("is-selected", item.dataset.transport === data.transport));
  });
  body.querySelector("#wizard-children").addEventListener("change", (event) => { data.children = event.target.checked; });
  body.querySelector("#wizard-seniors").addEventListener("change", (event) => { data.seniors = event.target.checked; });
}

function renderInterestsStep(body) {
  const data = wizard.data;
  body.innerHTML = `<div class="wizard-intro"><h2>O que você curte?</h2><p>Usamos isso para escolher os lugares que aparecem em Descobrir.</p></div>
    <div class="option-grid" id="interest-options">${interests.map(({ id }) => `<button class="option-tile${data.interests.includes(id) ? " is-selected" : ""}" type="button" data-interest="${id}" aria-pressed="${data.interests.includes(id)}">${icon(INTEREST_ICONS[id] || "star")}${escapeHtml(INTEREST_LABELS[id] || id)}</button>`).join("")}</div>`;
  body.querySelector("#interest-options").addEventListener("click", (event) => {
    const button = event.target.closest("[data-interest]");
    if (!button) return;
    const id = button.dataset.interest;
    data.interests = data.interests.includes(id) ? data.interests.filter((item) => item !== id) : [...data.interests, id];
    button.classList.toggle("is-selected", data.interests.includes(id));
    button.setAttribute("aria-pressed", String(data.interests.includes(id)));
  });
}

function renderBudgetStep(body) {
  const data = wizard.data;
  if (!data.nameEdited) data.name = suggestedName();
  body.innerHTML = `<div class="wizard-intro"><h2>Quase lá!</h2><p>Dê um nome para a viagem e, se quiser, um orçamento.</p></div>
    <label class="field">Nome da viagem<input id="wizard-name" maxlength="60" value="${escapeHtml(data.name)}" placeholder="Ex.: Férias de verão"></label>
    <h3 class="option-group-title">Orçamento total <span class="muted" style="font-weight:600;font-size:13px">(opcional)</span></h3>
    <div class="amount-input"><span id="budget-symbol">${data.currency === "BRL" ? "R$" : escapeHtml(data.currency)}</span><input id="wizard-budget" type="text" inputmode="decimal" autocomplete="off" value="${escapeHtml(decimalText(data.budget))}" placeholder="0" aria-label="Orçamento"></div>
    <div class="segmented" id="budget-currency">${CURRENCIES.map((code) => `<button type="button" data-currency="${code}" class="${code === data.currency ? "is-selected" : ""}">${code}</button>`).join("")}</div>
    <label class="field" id="budget-rate-field" style="margin-top:12px"${data.currency === "BRL" ? " hidden" : ""}><span>Cotação manual · 1 <span id="budget-rate-code">${escapeHtml(data.currency)}</span> em R$</span><input id="wizard-rate" type="text" inputmode="decimal" autocomplete="off" placeholder="Ex.: 6,20" value="${data.currency === "BRL" ? "" : escapeHtml(Number(data.rate) > 0 ? rateText(data.rate) : decimalText(data.rate))}"></label>`;
  body.querySelector("#wizard-name").addEventListener("input", (event) => {
    data.name = event.target.value;
    data.nameEdited = true;
    updateWizardNext();
  });
  body.querySelector("#wizard-budget").addEventListener("input", (event) => { data.budget = event.target.value; });
  body.querySelector("#wizard-rate").addEventListener("input", (event) => {
    data.rate = event.target.value;
    updateWizardNext();
  });
  body.querySelector("#budget-currency").addEventListener("click", (event) => {
    const button = event.target.closest("[data-currency]");
    if (!button) return;
    data.currency = button.dataset.currency;
    body.querySelectorAll("[data-currency]").forEach((item) => item.classList.toggle("is-selected", item === button));
    body.querySelector("#budget-rate-field").hidden = data.currency === "BRL";
    body.querySelector("#budget-symbol").textContent = data.currency === "BRL" ? "R$" : data.currency;
    body.querySelector("#budget-rate-code").textContent = data.currency;
    if (data.currency === "BRL") data.rate = 1;
    else if (Number(data.rate) === 1) {
      // Vindo do real, a cotação 1 não faz sentido: pede a cotação da moeda nova.
      data.rate = "";
      body.querySelector("#wizard-rate").value = "";
    }
    updateWizardNext();
  });
}

function validateTrip(trip) {
  const start = parseLocalDate(trip.startDate);
  const end = parseLocalDate(trip.endDate);
  if (!trip.name) return "Dê um nome para esta viagem.";
  if (!start || !end || start > end) return "Confira as datas: a volta não pode ser antes da ida.";
  if (!trip.destinations.length) return "Adicione pelo menos uma cidade.";
  for (const destination of trip.destinations) {
    const cityStart = parseLocalDate(destination.startDate);
    const cityEnd = parseLocalDate(destination.endDate);
    if (!destination.name || !cityStart || !cityEnd) return "Preencha a cidade e as datas de cada parada.";
    if (cityStart > cityEnd || cityStart < start || cityEnd > end) return `Confira as datas de ${destination.name}: elas devem ficar dentro da viagem.`;
  }
  return "";
}

function saveWizard() {
  const data = wizard.data;
  const existing = wizard.editingId ? state.trips.find((trip) => trip.id === wizard.editingId) : null;
  if (data.cities.length === 1) data.cities[0].nights = totalNights();
  let cursor = data.startDate;
  const destinations = data.cities.map((city, index) => {
    const startDate = cursor;
    const endDate = index === data.cities.length - 1 ? data.endDate : addDays(cursor, city.nights);
    cursor = endDate;
    const previous = existing?.destinations.find((destination) => destination.id === city.id) || existing?.destinations.find((destination) => sameCity(destination.name, city.name));
    return {
      id: previous?.id || `cidade-${Date.now()}-${index}`,
      name: city.name,
      startDate,
      endDate,
      lodgings: previous?.lodgings || []
    };
  });
  const trip = migrateTrip({
    ...(existing || blankTrip()),
    name: data.name.trim(),
    departureTime: data.departureTime || "",
    startDate: data.startDate,
    endDate: data.endDate,
    budget: parseDecimal(data.budget) || 0,
    currency: data.currency,
    budgetExchangeRate: data.currency === "BRL" ? 1 : parseDecimal(data.rate) || 1,
    country: data.cities[0]?.country || getCityInfo(data.cities[0]?.name)?.country || "Brasil",
    destinations,
    transport: data.transport,
    rentalCar: data.transport === "Carro alugado",
    companions: data.companions,
    children: data.children,
    seniors: data.seniors,
    interests: data.interests
  });
  const message = validateTrip(trip);
  if (message) {
    $("#form-status").textContent = message;
    announce(message);
    return;
  }
  realignItineraryDates(trip);
  const previous = existing ? { ...existing } : null;
  if (existing) Object.assign(existing, trip);
  else state.trips.push(trip);
  state.currentTripId = trip.id;
  if (!saveState()) {
    if (previous) Object.assign(existing, previous);
    else state.trips = state.trips.filter((item) => item.id !== trip.id);
    return;
  }
  const wasEditing = Boolean(wizard.editingId);
  reopenEditSheet = Boolean(wizard.only);
  wizard = null;
  selectedDay = null;
  toast(wasEditing ? "Viagem atualizada" : "Viagem criada!");
  // Editando, volta para a tela da viagem que já está no histórico (sem duplicá-la).
  if (wasEditing && (window.history.state?.depth || 0) > 0) {
    route.tab = "about";
    window.history.back();
  } else navigate({ screen: "trip", tab: "about" }, { replace: true });
}

function exitWizard() {
  reopenEditSheet = Boolean(wizard?.only);
  wizard = null;
  goBack();
}

// ---------------------------------------------------------------------------
// Mensagens contextuais (frases em dados/mensagens.js)
// ---------------------------------------------------------------------------

const MESSAGE_LIBRARY = window.MESSAGES || {};
const sessionMessages = new Map();

// Escolhe uma frase do contexto sem repetir as últimas usadas. Dentro da mesma sessão,
// o mesmo contexto e escopo mantêm a frase, para o texto não mudar a cada toque.
function messageFor(context, scope = "") {
  const key = `${context}|${scope}`;
  if (sessionMessages.has(key)) return sessionMessages.get(key);
  const list = MESSAGE_LIBRARY[context] || [];
  if (!list.length) return "";
  const recent = Array.isArray(state.messageHistory[context]) ? state.messageHistory[context] : [];
  const avoid = recent.slice(-Math.min(2, list.length - 1));
  const options = list.map((_, index) => index).filter((index) => !avoid.includes(index));
  const index = options[Math.floor(Math.random() * options.length)];
  state.messageHistory[context] = [...recent, index].slice(-3);
  saveState();
  sessionMessages.set(key, list[index]);
  return list[index];
}

function tripPhase(trip) {
  if (!trip.startDate || !trip.endDate) return "sem-data";
  const today = getBrasiliaDateKey();
  if (today < trip.startDate) return "antes";
  if (today > trip.endDate) return "depois";
  return "durante";
}

function renderTripMessage(trip) {
  const element = $("#trip-message");
  const text = tripPhase(trip) === "durante" ? messageFor("diaDeViagem", `${trip.id}|${getBrasiliaDateKey()}`) : "";
  element.innerHTML = reflectionSpotlight(`viagem-${trip.id}`, "Pausa pra agradecer", text);
  element.hidden = !element.innerHTML;
}

// ---------------------------------------------------------------------------
// Fotos do Baú: ficam só neste aparelho (IndexedDB), reduzidas para caber bem
// ---------------------------------------------------------------------------

const PHOTO_DB_NAME = "viagem-na-mao-fotos";
const PHOTO_STORE = "fotos";
const PHOTO_MAX_SIDE = 1600;
const MEMORY_MAX_PHOTOS = 6;
let photoDbPromise = null;
const photoUrls = new Map();

function openPhotoDb() {
  if (!photoDbPromise) {
    photoDbPromise = new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error("Este navegador não permite guardar fotos."));
        return;
      }
      const request = window.indexedDB.open(PHOTO_DB_NAME, 1);
      request.onupgradeneeded = () => request.result.createObjectStore(PHOTO_STORE);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    photoDbPromise.catch(() => { photoDbPromise = null; });
  }
  return photoDbPromise;
}

async function photoTransaction(mode, run) {
  const db = await openPhotoDb();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(PHOTO_STORE, mode);
    run(transaction.objectStore(PHOTO_STORE));
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error || new Error("Gravação cancelada."));
  });
}

const putPhotos = (entries) => photoTransaction("readwrite", (store) => entries.forEach(([id, blob]) => store.put(blob, id)));
const deletePhotos = (ids) => (ids.length ? photoTransaction("readwrite", (store) => ids.forEach((id) => store.delete(id))) : Promise.resolve());

async function getPhoto(id) {
  let request;
  await photoTransaction("readonly", (store) => { request = store.get(id); });
  return request.result || null;
}

async function listPhotoIds() {
  let request;
  await photoTransaction("readonly", (store) => { request = store.getAllKeys(); });
  return request.result || [];
}

async function photoUrl(id) {
  if (!photoUrls.has(id)) {
    const blob = await getPhoto(id);
    photoUrls.set(id, blob ? URL.createObjectURL(blob) : "");
  }
  return photoUrls.get(id);
}

function forgetPhotoUrl(id) {
  if (photoUrls.get(id)) URL.revokeObjectURL(photoUrls.get(id));
  photoUrls.delete(id);
}

// Imagens com data-photo-id recebem a foto guardada assim que ela é lida.
function hydratePhotos(root) {
  root.querySelectorAll("img[data-photo-id]").forEach(async (img) => {
    try {
      const url = await photoUrl(img.dataset.photoId);
      if (url) img.src = url;
      else img.classList.add("is-missing");
    } catch {
      img.classList.add("is-missing");
    }
  });
}

async function compressPhoto(file) {
  const source = URL.createObjectURL(file);
  try {
    const image = await new Promise((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("Formato de imagem não suportado."));
      element.src = source;
    });
    const scale = Math.min(1, PHOTO_MAX_SIDE / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(image.naturalWidth * scale);
    canvas.height = Math.round(image.naturalHeight * scale);
    canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
    return await new Promise((resolve, reject) => canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Não foi possível preparar a foto."))), "image/jpeg", 0.82));
  } finally {
    URL.revokeObjectURL(source);
  }
}

async function requestPersistentStorage() {
  try {
    if (navigator.storage?.persist && !(await navigator.storage.persisted())) await navigator.storage.persist();
  } catch {
    // Sem suporte: o backup continua sendo a proteção.
  }
}

// ---------------------------------------------------------------------------
// Meu Baú de Memórias
// ---------------------------------------------------------------------------

let bauFirstVisitMessage = "";

function sortedMemories(trip) {
  return [...trip.memories].sort((a, b) => (a.date || "").localeCompare(b.date || "") || (a.createdAt || "").localeCompare(b.createdAt || ""));
}

function memoryDayLabel(trip, date) {
  if (!date) return "Sem data";
  const label = capitalize(formatDate(date, { weekday: "long", day: "numeric", month: "long" }));
  const index = getTripDays(trip).indexOf(date);
  return index >= 0 ? `${label} · Dia ${index + 1}` : label;
}

function defaultMemoryDate(trip) {
  const today = getBrasiliaDateKey();
  return trip.endDate && today > trip.endDate ? trip.endDate : today;
}

function memoryPhotosHtml(ids, max = 3) {
  const shown = ids.slice(0, max);
  return `<div class="memory-photos count-${shown.length}">${shown.map((id) => `<img data-photo-id="${escapeHtml(id)}" alt="">`).join("")}${ids.length > max ? `<span class="memory-more">+${ids.length - max}</span>` : ""}</div>`;
}

function renderMemoriesCard(trip) {
  const memories = sortedMemories(trip);
  const photos = memories.flatMap((memory) => memory.photos || []).slice(-4);
  const subtitle = memories.length
    ? `${memories.length} ${memories.length === 1 ? "memória guardada" : "memórias guardadas"} · só você vê`
    : tripPhase(trip) === "depois" ? messageFor("viagemEncerrada", trip.id) : "A viagem passa. As histórias ficam.";
  const card = $("#memories-card");
  card.innerHTML = `<button class="memories-card-main" type="button" data-tab="memories">
      <span class="memories-card-icon">${icon("book-heart")}</span>
      <span><strong>Meu Baú de Memórias</strong><small>${escapeHtml(subtitle)}</small></span>${icon("chevron-right")}
    </button>
    ${photos.length ? `<div class="memories-thumbs">${photos.map((id) => `<img data-photo-id="${escapeHtml(id)}" alt="">`).join("")}</div>` : ""}
    <button class="btn btn-secondary btn-block" type="button" data-new-memory>${icon("image-plus")} Guardar momento</button>`;
  hydratePhotos(card);
}

function renderMemories() {
  const trip = getCurrentTrip();
  const memories = sortedMemories(trip);
  if (!state.flags.bauOpened) {
    state.flags.bauOpened = true;
    saveState();
    bauFirstVisitMessage = MESSAGE_LIBRARY.bauPrimeiraAbertura?.[0] || "";
  }
  const lead = bauFirstVisitMessage || (memories.length ? messageFor("reverMemorias", trip.id) : messageFor("bauVazio", trip.id));
  const byDate = {};
  memories.forEach((memory) => { (byDate[memory.date || ""] ||= []).push(memory); });
  const backupOld = !state.lastBackupAt || daysBetween(state.lastBackupAt.slice(0, 10), getBrasiliaDateKey()) > 14;
  const container = $("#memories-content");
  container.innerHTML = `
    <div class="memories-hero">
      <span class="memories-hero-icon">${icon("book-heart")}</span>
      <h2>Meu Baú de Memórias</h2>
      <p>${escapeHtml(lead)}</p>
      <span class="private-pill">${icon("lock")} Privado · guardado só neste aparelho</span>
      <button class="btn btn-primary btn-block" type="button" data-new-memory>${icon("image-plus")} Guardar momento</button>
      ${memories.length ? `<button class="btn btn-ghost-light btn-block" type="button" data-open-retro>${icon("images")} Ver retrospectiva</button>` : ""}
    </div>
    ${memories.length ? Object.keys(byDate).sort().map((date) => `
      <section class="memory-day">
        <h3>${escapeHtml(memoryDayLabel(trip, date))}</h3>
        ${byDate[date].map((memory) => `<button class="memory-card" type="button" data-memory="${escapeHtml(memory.id)}">
          ${memory.photos?.length ? memoryPhotosHtml(memory.photos) : ""}
          <span class="memory-body">
            ${memory.title ? `<strong>${escapeHtml(memory.title)}</strong>` : ""}
            ${memory.text ? `<span class="memory-snippet">${escapeHtml(memory.text)}</span>` : ""}
            <small>${memory.place ? `${icon("map-pin")} ${escapeHtml(memory.place)} · ` : ""}${icon("lock")} Privado</small>
          </span>
        </button>`).join("")}
      </section>`).join("") : `<div class="memories-empty">${icon("images")}<p>Fotos e textos que você guardar aparecem aqui, organizados por dia. Dá para registrar depois também: escolha a data em que aconteceu.</p></div>`}
    ${memories.length && backupOld ? `<div class="backup-tip">${icon("download")}<p>Suas memórias ficam só neste aparelho. Faça um backup de vez em quando para não perdê-las.</p><button class="link-btn" type="button" data-open-settings>Fazer backup</button></div>` : ""}`;
  hydratePhotos(container);
}

function openMemoryDetail(id) {
  const trip = getCurrentTrip();
  const memory = trip.memories.find((item) => item.id === id);
  if (!memory) return;
  const created = memory.createdAt ? new Date(memory.createdAt) : null;
  const edited = memory.updatedAt && memory.updatedAt !== memory.createdAt ? new Date(memory.updatedAt) : null;
  const stamp = (date) => new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short", year: "numeric" }).format(date);
  openSheet(`
    ${memory.photos?.length ? `<div class="memory-gallery">${memory.photos.map((photoId, index) => `<img data-photo-id="${escapeHtml(photoId)}" alt="Foto ${index + 1} da memória">`).join("")}</div>` : ""}
    ${sheetTitle(memory.title || "Memória")}
    <div class="chips"><span class="chip">${icon("calendar")} ${escapeHtml(memoryDayLabel(trip, memory.date))}</span>${memory.place ? `<span class="chip">${icon("map-pin")} ${escapeHtml(memory.place)}</span>` : ""}<span class="chip">${icon("lock")} Privado</span></div>
    ${memory.text ? `<p class="sheet-text memory-text">${escapeHtml(memory.text)}</p>` : ""}
    ${created ? `<p class="footnote">Guardada em ${escapeHtml(stamp(created))}${edited ? ` · editada em ${escapeHtml(stamp(edited))}` : ""}.</p>` : ""}
    <button class="btn btn-primary btn-block" type="button" id="memory-share">${icon("share-2")} Compartilhar esta memória</button>
    <div class="row-actions" id="memory-actions"><button class="btn btn-danger" type="button" id="memory-delete">${icon("trash-2")} Excluir</button><button class="btn btn-secondary" type="button" id="memory-edit">${icon("pencil")} Editar</button></div>
    <div class="confirm-box" id="memory-confirm" hidden>
      <p><strong>Excluir esta memória?</strong> As fotos e o texto saem do seu Baú e não dá para desfazer.</p>
      <div class="row-actions"><button class="btn btn-secondary" type="button" id="memory-cancel-delete">Cancelar</button><button class="btn btn-danger" type="button" id="memory-confirm-delete">${icon("trash-2")} Excluir</button></div>
    </div>`, (root) => {
    hydratePhotos(root);
    root.querySelector("#memory-edit").addEventListener("click", () => openMemoryEditor({ id }));
    root.querySelector("#memory-share").addEventListener("click", () => openShareMemorySheet(id));
    root.querySelector("#memory-delete").addEventListener("click", () => {
      root.querySelector("#memory-actions").hidden = true;
      root.querySelector("#memory-confirm").hidden = false;
    });
    root.querySelector("#memory-cancel-delete").addEventListener("click", () => {
      root.querySelector("#memory-actions").hidden = false;
      root.querySelector("#memory-confirm").hidden = true;
    });
    root.querySelector("#memory-confirm-delete").addEventListener("click", () => {
      const previous = trip.memories;
      trip.memories = trip.memories.filter((item) => item.id !== id);
      if (!saveState()) {
        trip.memories = previous;
        return;
      }
      deletePhotos(memory.photos || []).catch(() => {});
      (memory.photos || []).forEach(forgetPhotoUrl);
      closeSheet({ force: true });
      refreshAfterMemoryChange();
      toast("Memória excluída");
    });
  });
}

function openMemoryEditor({ id = null, date = "", place = "", origin = "" } = {}) {
  const trip = getCurrentTrip();
  const existing = id ? trip.memories.find((item) => item.id === id) : null;
  if (id && !existing) return;
  const today = getBrasiliaDateKey();
  const draft = {
    photos: (existing?.photos || []).map((photoId) => ({ id: photoId })),
    date: existing?.date || date || defaultMemoryDate(trip),
    title: existing?.title || "",
    place: existing?.place || place,
    text: existing?.text || ""
  };
  if (draft.date > today) draft.date = today;
  const snapshot = () => JSON.stringify({ photos: draft.photos.map((photo) => photo.id || photo.url), date: draft.date, title: draft.title.trim(), place: draft.place.trim(), text: draft.text.trim() });
  const initial = snapshot();
  const scope = `${trip.id}|${id || Date.now()}`;
  const groupTrip = /amigos|família/i.test(trip.companions || "");
  const questionContext = groupTrip ? "amigosFamilia" : "perguntas";
  let question = messageFor(questionContext, scope);
  const phase = tripPhase(trip);
  const lead = existing ? ""
    : origin ? messageFor(origin, scope)
    : draft.date < today ? messageFor("retroativo", scope)
    : phase === "durante" && new Date().getHours() >= 18 ? messageFor("finalDoDia", `${trip.id}|${today}`)
    : "";
  const places = [...new Set([...tripCities(trip), ...getTripActivities(trip).map(({ activity }) => activity.name)])];
  let saving = false;

  openSheet(`${sheetTitle(existing ? "Editar memória" : "Guardar momento")}
    ${lead ? `<p class="memory-lead">${escapeHtml(lead)}</p>` : ""}
    <div class="photo-picker" id="memory-photos"></div>
    <p class="field-hint" id="memory-photo-hint"></p>
    <label class="field">O que você quer lembrar?<textarea id="memory-text" rows="5" maxlength="4000" placeholder="${escapeHtml(question)}">${escapeHtml(draft.text)}</textarea></label>
    <button class="link-btn inspiration-btn" type="button" id="memory-question">${icon("sparkles")} Outra pergunta para inspirar</button>
    <div class="field-row">
      <label class="field">Quando aconteceu?<input id="memory-date" type="date" value="${escapeHtml(draft.date)}" max="${today}"></label>
      <label class="field">Lugar (opcional)<input id="memory-place" maxlength="80" list="memory-places" value="${escapeHtml(draft.place)}" placeholder="Ex.: Lisboa"></label>
    </div>
    <datalist id="memory-places">${places.map((name) => `<option value="${escapeHtml(name)}"></option>`).join("")}</datalist>
    <label class="field">Título (opcional)<input id="memory-title" maxlength="80" value="${escapeHtml(draft.title)}" placeholder="Ex.: Pôr do sol no mirante"></label>
    <p class="privacy-note">${icon("lock")} Só você vê. Fica guardado neste aparelho e nada é publicado.</p>
    <div class="confirm-box" id="memory-discard" hidden>
      <p><strong>Sair sem guardar?</strong> O que você escreveu ou escolheu nesta memória vai se perder.</p>
      <div class="row-actions"><button class="btn btn-secondary" type="button" id="memory-keep">Continuar editando</button><button class="btn btn-danger" type="button" id="memory-drop">Descartar</button></div>
    </div>
    <p class="form-status" id="memory-status" role="status" aria-live="polite"></p>
    <button class="btn btn-primary btn-block" type="button" id="memory-save">${icon("book-heart")} Guardar no meu Baú</button>`, (root) => {
    const picker = root.querySelector("#memory-photos");
    const status = root.querySelector("#memory-status");
    const save = root.querySelector("#memory-save");
    const fields = { text: root.querySelector("#memory-text"), date: root.querySelector("#memory-date"), place: root.querySelector("#memory-place"), title: root.querySelector("#memory-title") };
    const readFields = () => Object.entries(fields).forEach(([key, input]) => { draft[key] = input.value; });
    const hasContent = () => draft.photos.length > 0 || draft.text.trim().length > 0;
    const update = () => {
      readFields();
      save.disabled = saving || !hasContent() || !draft.date;
    };
    const releaseNewPhotos = () => draft.photos.forEach((photo) => { if (photo.blob) URL.revokeObjectURL(photo.url); });
    const renderPicker = () => {
      picker.innerHTML = draft.photos.map((photo, index) => `<div class="picker-thumb"><img ${photo.url ? `src="${photo.url}"` : `data-photo-id="${escapeHtml(photo.id)}"`} alt="Foto ${index + 1}"><button class="picker-remove" type="button" data-remove-photo="${index}" aria-label="Tirar foto ${index + 1}">${icon("x")}</button></div>`).join("")
        + (draft.photos.length < MEMORY_MAX_PHOTOS ? `<label class="picker-add">${icon("image-plus")}<span>${draft.photos.length ? "Mais fotos" : "Adicionar fotos"}</span><input class="visually-hidden" type="file" accept="image/*" multiple id="memory-file"></label>` : "");
      hydratePhotos(picker);
      root.querySelector("#memory-photo-hint").textContent = draft.photos.length ? messageFor("aoRegistrarFoto", scope) : messageFor("semFoto", scope);
      update();
    };
    renderPicker();

    picker.addEventListener("change", async (event) => {
      const input = event.target.closest("#memory-file");
      if (!input) return;
      const chosen = [...input.files];
      const files = chosen.slice(0, MEMORY_MAX_PHOTOS - draft.photos.length);
      status.textContent = "Preparando fotos…";
      let failed = 0;
      for (const file of files) {
        try {
          const blob = await compressPhoto(file);
          draft.photos.push({ blob, url: URL.createObjectURL(blob) });
        } catch {
          failed += 1;
        }
      }
      status.textContent = [
        failed ? `Não consegui abrir ${failed === 1 ? "uma foto" : `${failed} fotos`}. Tente uma imagem JPG ou PNG.` : "",
        chosen.length > files.length ? `Cada memória guarda até ${MEMORY_MAX_PHOTOS} fotos.` : ""
      ].filter(Boolean).join(" ");
      renderPicker();
    });
    picker.addEventListener("click", (event) => {
      const remove = event.target.closest("[data-remove-photo]");
      if (!remove) return;
      const [photo] = draft.photos.splice(Number(remove.dataset.removePhoto), 1);
      if (photo?.blob) URL.revokeObjectURL(photo.url);
      renderPicker();
    });
    Object.values(fields).forEach((input) => input.addEventListener("input", update));
    root.querySelector("#memory-question").addEventListener("click", () => {
      const list = MESSAGE_LIBRARY[questionContext] || [];
      question = list[(list.indexOf(question) + 1) % list.length] || question;
      fields.text.placeholder = question;
      fields.text.focus();
    });

    sheetGuard = () => {
      if (saving) return false;
      readFields();
      if (snapshot() === initial) {
        releaseNewPhotos();
        return true;
      }
      root.querySelector("#memory-discard").hidden = false;
      root.querySelector("#memory-discard").scrollIntoView({ block: "center", behavior: "smooth" });
      return false;
    };
    root.querySelector("#memory-keep").addEventListener("click", () => { root.querySelector("#memory-discard").hidden = true; });
    root.querySelector("#memory-drop").addEventListener("click", () => {
      releaseNewPhotos();
      closeSheet({ force: true });
    });

    save.addEventListener("click", async () => {
      readFields();
      if (!hasContent()) {
        status.textContent = "Adicione uma foto ou escreva algo para guardar.";
        return;
      }
      saving = true;
      save.disabled = true;
      status.textContent = "Guardando…";
      const newPhotos = draft.photos.filter((photo) => photo.blob).map((photo) => ({ photo, id: `foto-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }));
      try {
        if (newPhotos.length) await putPhotos(newPhotos.map(({ photo, id: photoId }) => [photoId, photo.blob]));
      } catch (error) {
        console.error("Não foi possível guardar as fotos.", error);
        saving = false;
        update();
        status.textContent = "Não consegui guardar as fotos neste aparelho (espaço cheio ou navegação privada). Nada foi salvo.";
        return;
      }
      const photoIds = draft.photos.map((photo) => newPhotos.find((entry) => entry.photo === photo)?.id || photo.id);
      const now = new Date().toISOString();
      const memory = {
        id: existing?.id || `memoria-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        date: draft.date,
        title: draft.title.trim(),
        place: draft.place.trim(),
        text: draft.text.trim(),
        photos: photoIds,
        visibility: "private",
        createdAt: existing?.createdAt || now,
        updatedAt: now
      };
      const previous = trip.memories;
      trip.memories = existing ? trip.memories.map((item) => (item.id === memory.id ? memory : item)) : [...trip.memories, memory];
      if (!saveState()) {
        trip.memories = previous;
        deletePhotos(newPhotos.map((entry) => entry.id)).catch(() => {});
        saving = false;
        update();
        status.textContent = "Não consegui salvar neste aparelho. Nada foi guardado; tente de novo.";
        return;
      }
      newPhotos.forEach(({ photo, id: photoId }) => photoUrls.set(photoId, photo.url));
      const removed = (existing?.photos || []).filter((photoId) => !photoIds.includes(photoId));
      deletePhotos(removed).catch(() => {});
      removed.forEach(forgetPhotoUrl);
      requestPersistentStorage();
      saving = false;
      closeSheet({ force: true });
      refreshAfterMemoryChange();
      toast(messageFor("memoriaGuardada", `${memory.id}|${now}`));
    });
  });
}

// ---------------------------------------------------------------------------
// Compartilhar uma memória como imagem: só a memória escolhida, com prévia,
// opção de esconder texto, data e lugar, e o crédito discreto da marca.
// ---------------------------------------------------------------------------

const SHARE_FORMATS = { post: [1080, 1350, "Post"], story: [1080, 1920, "Stories"] };
let brandIconImage = null;

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Imagem indisponível."));
    image.src = src;
  });
}

async function brandIcon() {
  brandIconImage ||= loadImage("marca/viagem-na-mao-icon.svg").catch(() => null);
  return brandIconImage;
}

// Quebra o texto em linhas que cabem na largura; corta com reticências se passar do limite.
function wrapLines(context, text, maxWidth, maxLines) {
  const lines = [];
  for (const paragraph of text.split(/\n+/)) {
    let line = "";
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      const attempt = line ? `${line} ${word}` : word;
      if (context.measureText(attempt).width <= maxWidth) line = attempt;
      else {
        if (line) lines.push(line);
        line = word;
      }
    }
    if (line) lines.push(line);
  }
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    let last = kept[maxLines - 1];
    while (last && context.measureText(`${last}…`).width > maxWidth) last = last.slice(0, -1);
    kept[maxLines - 1] = `${last.trimEnd()}…`;
    return kept;
  }
  return lines;
}

function drawCover(context, image, x, y, width, height) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const sw = width / scale;
  const sh = height / scale;
  context.drawImage(image, (image.naturalWidth - sw) / 2, (image.naturalHeight - sh) / 2, sw, sh, x, y, width, height);
}

async function buildShareImage(memory, trip, { format = "post", photoId = "", showText = true, showDate = true, showPlace = false } = {}) {
  await document.fonts?.ready;
  const [width, height] = SHARE_FORMATS[format] || SHARE_FORMATS.post;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  const pad = 80;
  const url = photoId ? await photoUrl(photoId) : "";
  const photo = url ? await loadImage(url).catch(() => null) : null;
  const meta = [showDate && memory.date ? formatDate(memory.date, { day: "numeric", month: "long", year: "numeric" }) : "", showPlace ? memory.place : ""].filter(Boolean).join("  ·  ");
  const title = memory.title || "";
  const text = showText ? memory.text || "" : "";
  const dark = !photo;

  if (photo) {
    context.fillStyle = "#FFFDF5";
    context.fillRect(0, 0, width, height);
    const photoHeight = Math.round(height * (title || text ? 0.62 : 0.8));
    drawCover(context, photo, 0, 0, width, photoHeight);
    let y = photoHeight + 84;
    context.textBaseline = "alphabetic";
    if (title) {
      context.fillStyle = "#15563F";
      context.font = '800 58px Manrope, "DM Sans", sans-serif';
      wrapLines(context, title, width - pad * 2, 2).forEach((line) => { context.fillText(line, pad, y); y += 68; });
      y += 6;
    }
    if (text) {
      context.fillStyle = "#3c4842";
      context.font = '40px Georgia, serif';
      const room = Math.max(1, Math.floor((height - 190 - y) / 56));
      wrapLines(context, text, width - pad * 2, Math.min(room, format === "story" ? 9 : 5)).forEach((line) => { context.fillText(line, pad, y); y += 56; });
    }
    if (meta) {
      context.fillStyle = "#727b75";
      context.font = '600 30px "DM Sans", sans-serif';
      context.fillText(meta, pad, Math.min(y + 14, height - 150));
    }
  } else {
    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#15563F");
    gradient.addColorStop(1, "#104431");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    // Mede antes para centralizar o bloco de texto na altura da imagem.
    context.font = '800 64px Manrope, "DM Sans", sans-serif';
    const titleLines = title ? wrapLines(context, title, width - pad * 2, 2) : [];
    context.font = '48px Georgia, serif';
    const textLines = text ? wrapLines(context, text, width - pad * 2, format === "story" ? 16 : 10) : [];
    const blockHeight = 140 + titleLines.length * 76 + (titleLines.length && textLines.length ? 20 : 0) + textLines.length * 68 + (meta ? 76 : 0);
    let y = Math.max(300, Math.round((height - 140 - blockHeight) / 2) + 140);
    context.fillStyle = "#56D7AE";
    context.font = '700 200px Georgia, serif';
    context.fillText("“", pad - 10, y - 60);
    context.fillStyle = "#FFFDF5";
    context.font = '800 64px Manrope, "DM Sans", sans-serif';
    titleLines.forEach((line) => { context.fillText(line, pad, y); y += 76; });
    if (titleLines.length && textLines.length) y += 20;
    context.fillStyle = "rgba(255, 253, 245, 0.92)";
    context.font = '48px Georgia, serif';
    textLines.forEach((line) => { context.fillText(line, pad, y); y += 68; });
    if (meta) {
      context.fillStyle = "rgba(255, 253, 245, 0.75)";
      context.font = '600 32px "DM Sans", sans-serif';
      context.fillText(meta, pad, y + 30);
    }
  }

  // Crédito discreto da marca no rodapé.
  const iconImage = await brandIcon();
  const footerY = height - 96;
  if (iconImage) context.drawImage(iconImage, pad, footerY - 30, 52, 52);
  context.fillStyle = dark ? "rgba(255, 253, 245, 0.8)" : "#727b75";
  context.font = '700 28px Manrope, "DM Sans", sans-serif';
  context.fillText("Feito com Viagem na Mão", pad + (iconImage ? 68 : 0), footerY + 6);

  return new Promise((resolve, reject) => canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Não foi possível gerar a imagem."))), "image/jpeg", 0.9));
}

function openShareMemorySheet(id) {
  const trip = getCurrentTrip();
  const memory = trip.memories.find((item) => item.id === id);
  if (!memory) return;
  const options = { format: "post", photoId: memory.photos?.[0] || "", showText: Boolean(memory.text || memory.title), showDate: true, showPlace: false };
  let currentBlob = null;
  let previewUrl = "";
  let version = 0;
  openSheet(`${sheetTitle("Compartilhar memória")}
    <div class="share-preview"><img id="share-preview" alt="Prévia da imagem que será compartilhada"></div>
    <div class="segmented" id="share-format">${Object.entries(SHARE_FORMATS).map(([key, [, , label]]) => `<button type="button" data-share-format="${key}" class="${key === options.format ? "is-selected" : ""}">${label}</button>`).join("")}</div>
    ${memory.photos?.length > 1 ? `<div class="share-photos">${memory.photos.map((photoId) => `<button type="button" class="retro-cover-pick${photoId === options.photoId ? " is-cover" : ""}" data-share-photo="${escapeHtml(photoId)}" aria-label="Usar esta foto"><img data-photo-id="${escapeHtml(photoId)}" alt=""></button>`).join("")}</div>` : ""}
    <div class="share-toggles">
      ${memory.text ? `<label class="toggle-row">Mostrar o texto<span class="switch"><input type="checkbox" data-share-option="showText"${options.showText ? " checked" : ""}><span></span></span></label>` : ""}
      <label class="toggle-row">Mostrar a data<span class="switch"><input type="checkbox" data-share-option="showDate" checked><span></span></span></label>
      ${memory.place ? `<label class="toggle-row">Mostrar o lugar<span class="switch"><input type="checkbox" data-share-option="showPlace"><span></span></span></label>` : ""}
    </div>
    <p class="privacy-note">${icon("lock")} Só esta memória vai na imagem. Depois de enviada, a cópia sai do app e não dá para recolher.</p>
    <p class="form-status" id="share-status" role="status" aria-live="polite"></p>
    <div class="row-actions"><button class="btn btn-secondary" type="button" id="share-download">${icon("download")} Baixar</button><button class="btn btn-primary" type="button" id="share-send">${icon("share-2")} Compartilhar</button></div>`, (root) => {
    hydratePhotos(root);
    const status = root.querySelector("#share-status");
    const preview = root.querySelector("#share-preview");
    const refresh = async () => {
      const mine = ++version;
      status.textContent = "Preparando a imagem…";
      try {
        const blob = await buildShareImage(memory, trip, options);
        if (mine !== version) return;
        currentBlob = blob;
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        previewUrl = URL.createObjectURL(blob);
        preview.src = previewUrl;
        root.querySelector(".share-preview").dataset.format = options.format;
        status.textContent = "";
      } catch (error) {
        console.error("Falha ao gerar a imagem.", error);
        status.textContent = "Não consegui gerar a imagem. Tente de novo.";
      }
    };
    refresh();
    root.querySelector("#share-format").addEventListener("click", (event) => {
      const button = event.target.closest("[data-share-format]");
      if (!button) return;
      options.format = button.dataset.shareFormat;
      root.querySelectorAll("[data-share-format]").forEach((item) => item.classList.toggle("is-selected", item === button));
      refresh();
    });
    root.querySelector(".share-photos")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-share-photo]");
      if (!button) return;
      options.photoId = button.dataset.sharePhoto;
      root.querySelectorAll("[data-share-photo]").forEach((item) => item.classList.toggle("is-cover", item === button));
      refresh();
    });
    root.querySelector(".share-toggles").addEventListener("change", (event) => {
      const input = event.target.closest("[data-share-option]");
      if (!input) return;
      options[input.dataset.shareOption] = input.checked;
      refresh();
    });
    const fileName = () => `memoria-${slugify(memory.title || trip.name || "viagem")}.jpg`;
    root.querySelector("#share-download").addEventListener("click", () => {
      if (!currentBlob) return;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(currentBlob);
      link.download = fileName();
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(link.href), 4000);
    });
    root.querySelector("#share-send").addEventListener("click", async () => {
      if (!currentBlob) return;
      const file = new File([currentBlob], fileName(), { type: "image/jpeg" });
      try {
        if (navigator.canShare?.({ files: [file] })) await navigator.share({ files: [file], title: memory.title || "Memória de viagem" });
        else {
          root.querySelector("#share-download").click();
          status.textContent = "Este navegador não compartilha direto: a imagem foi baixada para você enviar.";
        }
      } catch (error) {
        if (error?.name !== "AbortError") status.textContent = "Não consegui compartilhar. Use Baixar e envie a imagem.";
      }
    });
  });
}

// ---------------------------------------------------------------------------
// Convites leves para guardar memórias: só dentro do app, no máximo um por dia,
// e nenhum se a pessoa já guardou algo hoje. Sem sequência nem cobrança.
// ---------------------------------------------------------------------------

function nowInBrasilia() {
  const time = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
  return { date: getBrasiliaDateKey(), time };
}

function memoryInvite(trip) {
  if (!trip || state.reminders === "off") return null;
  const { date, time } = nowInBrasilia();
  if (!trip.startDate || date < trip.startDate || date > trip.endDate) return null;
  if (state.invites[trip.id]?.dismissed === date) return null;
  // Já existe memória sobre hoje: não pergunta de novo. Memórias de outros dias não contam.
  if (trip.memories.some((memory) => memory.date === date)) return null;
  let context = null;
  if (time >= "18:00") context = "finalDoDia";
  else if (daySchedule(trip, date).some((stop) => (stop.time || "09:00") < time)) context = "depoisPasseio";
  if (!context) return null;
  return { context, date, text: messageFor(context, `${trip.id}|${date}|convite`) };
}

function inviteHtml(trip, invite) {
  return `<div class="invite-card">
      <span class="invite-icon">${icon("book-heart")}</span>
      <p>${escapeHtml(invite.text)}</p>
      <div class="invite-actions">
        <button class="btn btn-primary" type="button" data-invite-save="${escapeHtml(trip.id)}" data-invite-context="${invite.context}">${icon("image-plus")} Guardar momento</button>
        <button class="link-btn" type="button" data-invite-dismiss="${escapeHtml(trip.id)}">Agora não</button>
      </div>
    </div>`;
}

// Encerramento: celebração discreta depois da data de volta, que nunca bloqueia nada.
function closureHtml(trip) {
  if (tripPhase(trip) !== "depois" || trip.closureDismissed) return "";
  const hasMemories = trip.memories.length > 0;
  return `<div class="closure-card">
      <span class="closure-icon">${icon("sparkles")}</span>
      <h3>Viagem concluída</h3>
      <p>Foram dias de descobertas, encontros e histórias. Que tal guardar tudo isso num lugar especial?</p>
      ${hasMemories
        ? `<button class="btn btn-primary btn-block" type="button" data-open-retro>${icon("images")} Rever minha viagem</button>`
        : `<button class="btn btn-primary btn-block" type="button" data-new-memory>${icon("image-plus")} Guardar minha primeira lembrança</button>`}
      <button class="link-btn" type="button" data-closure-dismiss>Agora não</button>
    </div>`;
}

function renderTripInvite(trip) {
  const invite = memoryInvite(trip);
  const container = $("#trip-invite");
  container.innerHTML = invite ? inviteHtml(trip, invite) : closureHtml(trip);
  container.hidden = !container.innerHTML;
  // Com convite ou encerramento na tela, a frase do dia fica de fora para não poluir.
  if (!container.hidden) $("#trip-message").hidden = true;
}

function renderHomeInvite() {
  const container = $("#home-invite");
  const entry = state.trips.map((trip) => [trip, memoryInvite(trip)]).find(([, invite]) => invite);
  container.innerHTML = entry ? inviteHtml(entry[0], entry[1]) : "";
  container.hidden = !entry;
}

// ---------------------------------------------------------------------------
// Retrospectiva: a viagem em memórias, por dia, com capa, título e escolha do que aparece
// ---------------------------------------------------------------------------

let retroEditing = false;

function refreshAfterMemoryChange() {
  if (route.screen === "retro") renderRetro();
  else if (route.screen === "trip") showTab(route.tab);
}

// Ordem: por dia; dentro do dia, a ordem escolhida pela pessoa (ou a de criação).
function retroOrdered(trip) {
  const position = new Map(trip.retro.order.map((id, index) => [id, index]));
  return [...trip.memories].sort((a, b) => (a.date || "").localeCompare(b.date || "")
    || (position.get(a.id) ?? Infinity) - (position.get(b.id) ?? Infinity)
    || (a.createdAt || "").localeCompare(b.createdAt || ""));
}

function retroCover(trip, visible) {
  const photos = visible.flatMap((memory) => memory.photos || []);
  return photos.includes(trip.retro.coverPhotoId) ? trip.retro.coverPhotoId : photos[0] || "";
}

function moveRetroMemory(id, direction) {
  const trip = getCurrentTrip();
  const ordered = retroOrdered(trip);
  const index = ordered.findIndex((memory) => memory.id === id);
  const target = index + direction;
  if (index < 0 || !ordered[target] || ordered[target].date !== ordered[index].date) return;
  [ordered[index], ordered[target]] = [ordered[target], ordered[index]];
  trip.retro.order = ordered.map((memory) => memory.id);
  saveState();
  renderRetro();
}

function renderRetro() {
  const trip = getCurrentTrip();
  const ordered = retroOrdered(trip);
  const hidden = new Set(trip.retro.hidden);
  const visible = ordered.filter((memory) => !hidden.has(memory.id));
  const title = trip.retro.title || trip.name || "Minha viagem";
  $("#retro-title").textContent = title;
  const editButton = $("#retro-edit-button");
  editButton.innerHTML = icon(retroEditing ? "check" : "pencil");
  editButton.setAttribute("aria-label", retroEditing ? "Concluir edição" : "Editar retrospectiva");
  editButton.hidden = !ordered.length;
  const container = $("#retro-content");

  if (!ordered.length) {
    container.innerHTML = `<div class="memories-empty">${icon("images")}<p>A retrospectiva nasce das memórias do seu Baú. Guarde a primeira quando quiser.</p><button class="btn btn-primary" type="button" data-new-memory>${icon("image-plus")} Guardar momento</button></div>`;
    return;
  }

  if (retroEditing) {
    const cover = retroCover(trip, visible);
    container.innerHTML = `
      <label class="field">Título da retrospectiva<input id="retro-title-input" maxlength="80" value="${escapeHtml(trip.retro.title)}" placeholder="${escapeHtml(trip.name || "Minha viagem")}"></label>
      <p class="muted retro-help">Escolha o que aparece, mude a ordem dentro de cada dia e toque numa foto para usá-la como capa.</p>
      ${ordered.map((memory) => {
        const sameDay = ordered.filter((item) => item.date === memory.date);
        const position = sameDay.indexOf(memory);
        return `<div class="retro-edit-row${hidden.has(memory.id) ? " is-hidden" : ""}">
          <div class="retro-edit-top">
            <div class="retro-edit-info"><small>${escapeHtml(memoryDayLabel(trip, memory.date))}</small><strong>${escapeHtml(memory.title || memory.text.slice(0, 60) || "Memória com foto")}</strong></div>
            <label class="switch" aria-label="Mostrar na retrospectiva"><input type="checkbox" data-retro-toggle="${escapeHtml(memory.id)}"${hidden.has(memory.id) ? "" : " checked"}><span></span></label>
          </div>
          ${memory.photos?.length ? `<div class="retro-edit-photos">${memory.photos.map((photoId) => `<button type="button" class="retro-cover-pick${photoId === cover ? " is-cover" : ""}" data-retro-cover="${escapeHtml(photoId)}" aria-label="Usar como capa"><img data-photo-id="${escapeHtml(photoId)}" alt="">${photoId === cover ? `<span>Capa</span>` : ""}</button>`).join("")}</div>` : ""}
          ${sameDay.length > 1 ? `<div class="retro-edit-order"><button class="icon-btn icon-btn-sm" type="button" data-retro-move="${escapeHtml(memory.id)}" data-direction="-1" aria-label="Subir"${position === 0 ? " disabled" : ""}>${icon("arrow-up")}</button><button class="icon-btn icon-btn-sm" type="button" data-retro-move="${escapeHtml(memory.id)}" data-direction="1" aria-label="Descer"${position === sameDay.length - 1 ? " disabled" : ""}>${icon("arrow-down")}</button></div>` : ""}
        </div>`;
      }).join("")}
      <button class="btn btn-primary btn-block" type="button" id="retro-done">${icon("check")} Pronto</button>`;
    hydratePhotos(container);
    container.querySelector("#retro-title-input").addEventListener("input", (event) => {
      trip.retro.title = event.target.value.trim();
      saveState();
      $("#retro-title").textContent = trip.retro.title || trip.name || "Minha viagem";
    });
    return;
  }

  const cover = retroCover(trip, visible);
  const byDate = {};
  visible.forEach((memory) => { (byDate[memory.date || ""] ||= []).push(memory); });
  const days = getTripDays(trip);
  const ending = tripPhase(trip) === "depois" ? messageFor("viagemEncerrada", trip.id) : "A viagem ainda está acontecendo. Novas memórias entram aqui sozinhas.";
  container.innerHTML = `
    <div class="retro-cover">
      ${cover ? `<img data-photo-id="${escapeHtml(cover)}" alt="Capa da retrospectiva">` : ""}
      <div class="retro-cover-shade"></div>
      <div class="retro-cover-copy">
        <p>${escapeHtml(formatRange(trip.startDate, trip.endDate))}</p>
        <h2>${escapeHtml(title)}</h2>
        <p>${escapeHtml(tripCities(trip).join(" · "))} · ${visible.length} ${visible.length === 1 ? "memória" : "memórias"}</p>
      </div>
    </div>
    <p class="retro-lead">${escapeHtml(messageFor("reverMemorias", `${trip.id}|retro`))}</p>
    ${visible.length ? `<div class="row-actions"><button class="btn btn-secondary" type="button" id="album-open">${icon("images")} Álbum e carrossel</button><button class="btn btn-secondary" type="button" id="video-open">${icon("music")} Vídeo</button></div>` : ""}
    ${visible.length ? Object.keys(byDate).sort().map((date) => {
      const index = days.indexOf(date);
      const stay = trip.destinations.find((item) => item.startDate <= date && item.endDate >= date);
      return `<section class="retro-day">
        <div class="retro-day-head">${index >= 0 ? `<span class="retro-day-num">Dia ${index + 1}</span>` : ""}<h3>${escapeHtml(capitalize(formatDate(date, { weekday: "long", day: "numeric", month: "long" })))}</h3>${stay ? `<small>${icon("map-pin")} ${escapeHtml(stay.name)}</small>` : ""}</div>
        ${byDate[date].map((memory) => `<article class="retro-memory">
          ${(memory.photos || []).map((photoId) => `<img data-photo-id="${escapeHtml(photoId)}" alt="">`).join("")}
          <div class="retro-memory-text">
            ${memory.title ? `<h4>${escapeHtml(memory.title)}</h4>` : ""}
            ${memory.text ? `<p>${escapeHtml(memory.text)}</p>` : ""}
            ${memory.place ? `<small>${icon("map-pin")} ${escapeHtml(memory.place)}</small>` : ""}
          </div>
        </article>`).join("")}
      </section>`;
    }).join("") : `<div class="memories-empty">${icon("eye-off")}<p>Todas as memórias estão escondidas. Toque no lápis para escolher o que aparece.</p></div>`}
    <p class="retro-end">${escapeHtml(ending)}</p>
    <p class="privacy-note retro-privacy">${icon("lock")} Só você vê esta retrospectiva. Ela fica neste aparelho.</p>`;
  hydratePhotos(container);
}

// ---------------------------------------------------------------------------
// Álbum da retrospectiva: páginas com layouts variados (capa em tela cheia,
// foto sangrada, polaroide, dupla, colagem e citação), geradas no aparelho.
// Saem como PDF A5 ou como carrossel de imagens 4:5 para redes sociais.
// ---------------------------------------------------------------------------

const ALBUM_FORMATS = {
  pdf: { width: 1240, height: 1754, label: "Álbum (PDF)" },
  carousel: { width: 1080, height: 1350, label: "Carrossel (Instagram)" }
};
const PDF_PAGE = { width: 420, height: 595 };
const BRAND = { green: "#15563F", deep: "#104431", mint: "#56D7AE", coral: "#FF8068", cream: "#FFFDF5", ink: "#3c4842", muted: "#727b75" };

async function albumPhoto(id) {
  const url = id ? await photoUrl(id).catch(() => "") : "";
  return url ? loadImage(url).catch(() => null) : null;
}

function albumCanvas(format, background = BRAND.cream) {
  const { width, height } = ALBUM_FORMATS[format];
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);
  return { canvas, context, width, height, u: width / 1240 };
}

function drawLines(context, lines, x, y, lineHeight, align = "left") {
  context.textAlign = align;
  lines.forEach((line, index) => context.fillText(line, x, y + index * lineHeight));
  context.textAlign = "left";
  return y + lines.length * lineHeight;
}

function darkFade(context, width, height, from) {
  const gradient = context.createLinearGradient(0, from, 0, height);
  gradient.addColorStop(0, "rgba(10, 18, 14, 0)");
  gradient.addColorStop(0.45, "rgba(10, 18, 14, 0.55)");
  gradient.addColorStop(1, "rgba(10, 18, 14, 0.88)");
  context.fillStyle = gradient;
  context.fillRect(0, from, width, height - from);
}

// Selo coral com o número do dia.
function dayBadge(context, x, y, u, day) {
  if (!day) return;
  context.fillStyle = BRAND.coral;
  context.beginPath();
  context.arc(x, y, 74 * u, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = BRAND.deep;
  context.textAlign = "center";
  context.font = `800 ${22 * u}px "DM Sans", sans-serif`;
  context.fillText("DIA", x, y - 16 * u);
  context.font = `800 ${62 * u}px Manrope, "DM Sans", sans-serif`;
  context.fillText(String(day), x, y + 44 * u);
  context.textAlign = "left";
}

function drawPolaroid(context, photo, cx, cy, width, height, angle, caption, u) {
  context.save();
  context.translate(cx, cy);
  context.rotate(angle);
  const frame = 24 * u;
  const bottom = caption ? 120 * u : frame;
  context.shadowColor = "rgba(21, 32, 27, 0.28)";
  context.shadowBlur = 44 * u;
  context.shadowOffsetY = 18 * u;
  context.fillStyle = "#ffffff";
  context.fillRect(-width / 2, -height / 2, width, height);
  context.shadowColor = "transparent";
  drawCover(context, photo, -width / 2 + frame, -height / 2 + frame, width - frame * 2, height - frame - bottom);
  if (caption) {
    context.fillStyle = BRAND.ink;
    context.font = `italic ${42 * u}px Georgia, serif`;
    const [line] = wrapLines(context, caption, width - frame * 2 - 20 * u, 1);
    context.textAlign = "center";
    context.fillText(line, 0, height / 2 - bottom / 2 + 16 * u);
    context.textAlign = "left";
  }
  context.restore();
}

function pageNumber(context, width, height, u, page, light = false) {
  context.fillStyle = light ? "rgba(255, 253, 245, 0.75)" : "#9aa29c";
  context.font = `600 ${22 * u}px "DM Sans", sans-serif`;
  context.textAlign = "center";
  context.fillText(`${page}  ·  Viagem na Mão`, width / 2, height - 46 * u);
  context.textAlign = "left";
}

function memoryMeta(trip, memory, options) {
  const dayIndex = getTripDays(trip).indexOf(memory.date);
  return {
    day: options.showDates && dayIndex >= 0 ? dayIndex + 1 : null,
    date: options.showDates && memory.date ? capitalize(formatDate(memory.date, { weekday: "long", day: "numeric", month: "long" })) : "",
    place: options.showPlaces ? memory.place || "" : "",
    title: memory.title || "",
    text: options.showTexts ? memory.text || "" : ""
  };
}

async function albumCover(trip, visible, format) {
  const { canvas, context, width, height, u } = albumCanvas(format, BRAND.green);
  const photo = await albumPhoto(retroCover(trip, visible));
  const pad = 96 * u;
  if (photo) {
    drawCover(context, photo, 0, 0, width, height);
    darkFade(context, width, height, height * 0.35);
    const top = context.createLinearGradient(0, 0, 0, 260 * u);
    top.addColorStop(0, "rgba(10, 18, 14, 0.45)");
    top.addColorStop(1, "rgba(10, 18, 14, 0)");
    context.fillStyle = top;
    context.fillRect(0, 0, width, 260 * u);
  } else {
    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, BRAND.green);
    gradient.addColorStop(1, BRAND.deep);
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  }
  context.fillStyle = BRAND.mint;
  context.font = `800 ${28 * u}px "DM Sans", sans-serif`;
  context.fillText("R E T R O S P E C T I V A", pad, 130 * u);
  // Monta de baixo para cima: crédito, cidades, título e período.
  context.font = `800 ${118 * u}px Manrope, "DM Sans", sans-serif`;
  const titleLines = wrapLines(context, trip.retro.title || trip.name || "Minha viagem", width - pad * 2, 3);
  const citiesY = height - 200 * u;
  const titleTop = citiesY - 90 * u - (titleLines.length - 1) * 128 * u;
  context.fillStyle = BRAND.mint;
  context.font = `800 ${32 * u}px "DM Sans", sans-serif`;
  context.fillText(formatRange(trip.startDate, trip.endDate).toUpperCase(), pad, titleTop - 120 * u);
  context.fillStyle = BRAND.cream;
  context.font = `800 ${118 * u}px Manrope, "DM Sans", sans-serif`;
  drawLines(context, titleLines, pad, titleTop, 128 * u);
  context.fillStyle = "rgba(255, 253, 245, 0.85)";
  context.font = `${38 * u}px Georgia, serif`;
  context.fillText(`${tripCities(trip).join(" · ")} · ${visible.length} ${visible.length === 1 ? "memória" : "memórias"}`, pad, citiesY);
  const iconImage = await brandIcon();
  if (iconImage) context.drawImage(iconImage, pad, height - 132 * u, 56 * u, 56 * u);
  context.fillStyle = "rgba(255, 253, 245, 0.8)";
  context.font = `700 ${26 * u}px Manrope, "DM Sans", sans-serif`;
  context.fillText("Memórias organizadas com Viagem na Mão", pad + (iconImage ? 74 * u : 0), height - 94 * u);
  return canvas;
}

// Foto sangrada: a imagem ocupa a página e o texto fica por cima, num degradê.
async function pageFullBleed(meta, photo, page, format) {
  const { canvas, context, width, height, u } = albumCanvas(format, "#111");
  const pad = 90 * u;
  drawCover(context, photo, 0, 0, width, height);
  darkFade(context, width, height, height * 0.42);
  dayBadge(context, width - 130 * u, 140 * u, u, meta.day);
  context.font = `${40 * u}px Georgia, serif`;
  const textLines = meta.text ? wrapLines(context, meta.text, width - pad * 2, 4) : [];
  context.font = `800 ${72 * u}px Manrope, "DM Sans", sans-serif`;
  const titleLines = meta.title ? wrapLines(context, meta.title, width - pad * 2, 2) : [];
  const info = [meta.date, meta.place].filter(Boolean).join("  ·  ");
  let y = height - 130 * u - textLines.length * 58 * u - titleLines.length * 82 * u - (info ? 60 * u : 0);
  if (info) {
    context.fillStyle = BRAND.mint;
    context.font = `800 ${26 * u}px "DM Sans", sans-serif`;
    context.fillText(info.toUpperCase(), pad, y);
    y += 70 * u;
  }
  context.fillStyle = BRAND.cream;
  context.font = `800 ${72 * u}px Manrope, "DM Sans", sans-serif`;
  y = drawLines(context, titleLines, pad, y, 82 * u);
  context.fillStyle = "rgba(255, 253, 245, 0.9)";
  context.font = `${40 * u}px Georgia, serif`;
  drawLines(context, textLines, pad, y + (titleLines.length ? 6 * u : 0), 58 * u);
  pageNumber(context, width, height, u, page, true);
  return canvas;
}

// Polaroide inclinada sobre fundo creme com um círculo menta decorativo.
async function pagePolaroid(meta, photo, page, format, index) {
  const { canvas, context, width, height, u } = albumCanvas(format);
  const pad = 96 * u;
  context.fillStyle = "rgba(86, 215, 174, 0.22)";
  context.beginPath();
  context.arc(index % 2 ? width * 0.15 : width * 0.85, height * 0.2, width * 0.42, 0, Math.PI * 2);
  context.fill();
  const frameWidth = width * 0.76;
  const frameHeight = Math.min(height * 0.56, frameWidth * 1.08);
  drawPolaroid(context, photo, width / 2, 110 * u + frameHeight / 2 + 40 * u, frameWidth, frameHeight, index % 2 ? 0.045 : -0.04, meta.title, u);
  dayBadge(context, width - 140 * u, 130 * u, u, meta.day);
  let y = 110 * u + frameHeight + 170 * u;
  const info = [meta.date, meta.place].filter(Boolean).join("  ·  ");
  if (info) {
    context.fillStyle = "#1f6b50";
    context.font = `800 ${26 * u}px "DM Sans", sans-serif`;
    context.fillText(info.toUpperCase(), pad, y);
    y += 66 * u;
  }
  if (meta.text) {
    context.fillStyle = BRAND.ink;
    context.font = `${40 * u}px Georgia, serif`;
    const room = Math.max(1, Math.floor((height - 140 * u - y) / (60 * u)));
    drawLines(context, wrapLines(context, meta.text, width - pad * 2, room), pad, y, 60 * u);
  }
  pageNumber(context, width, height, u, page);
  return canvas;
}

// Duas polaroides sobrepostas.
async function pageDuo(meta, photos, page, format) {
  const { canvas, context, width, height, u } = albumCanvas(format, "#f4efe6");
  const pad = 96 * u;
  const size = width * 0.56;
  drawPolaroid(context, photos[0], width * 0.36, height * 0.26, size, size * 1.05, -0.08, "", u);
  drawPolaroid(context, photos[1], width * 0.64, height * 0.42, size, size * 1.05, 0.06, "", u);
  dayBadge(context, width - 130 * u, 130 * u, u, meta.day);
  let y = height * 0.42 + size * 0.525 + 150 * u;
  const info = [meta.date, meta.place].filter(Boolean).join("  ·  ");
  if (info) {
    context.fillStyle = "#1f6b50";
    context.font = `800 ${26 * u}px "DM Sans", sans-serif`;
    context.fillText(info.toUpperCase(), pad, y);
    y += 70 * u;
  }
  if (meta.title) {
    context.fillStyle = BRAND.green;
    context.font = `800 ${62 * u}px Manrope, "DM Sans", sans-serif`;
    y = drawLines(context, wrapLines(context, meta.title, width - pad * 2, 2), pad, y, 72 * u) + 10 * u;
  }
  if (meta.text) {
    context.fillStyle = BRAND.ink;
    context.font = `${38 * u}px Georgia, serif`;
    const room = Math.max(1, Math.floor((height - 130 * u - y) / (56 * u)));
    drawLines(context, wrapLines(context, meta.text, width - pad * 2, room), pad, y, 56 * u);
  }
  pageNumber(context, width, height, u, page);
  return canvas;
}

// Colagem: foto grande e menores com borda branca, texto numa faixa menta.
async function pageCollage(meta, photos, extra, page, format) {
  const { canvas, context, width, height, u } = albumCanvas(format, BRAND.cream);
  const gap = 14 * u;
  const bandHeight = (meta.title || meta.text) ? height * 0.3 : height * 0.12;
  const areaHeight = height - bandHeight;
  const cells = photos.length === 3
    ? [[0, 0, width * 0.62, areaHeight], [width * 0.62 + gap, 0, width * 0.38 - gap, areaHeight / 2 - gap / 2], [width * 0.62 + gap, areaHeight / 2 + gap / 2, width * 0.38 - gap, areaHeight / 2 - gap / 2]]
    : [[0, 0, width * 0.6, areaHeight * 0.58], [width * 0.6 + gap, 0, width * 0.4 - gap, areaHeight * 0.58], [0, areaHeight * 0.58 + gap, width * 0.4, areaHeight * 0.42 - gap], [width * 0.4 + gap, areaHeight * 0.58 + gap, width * 0.6 - gap, areaHeight * 0.42 - gap]];
  photos.forEach((photo, index) => {
    const [x, y, w, h] = cells[index];
    drawCover(context, photo, x, y, w, h);
  });
  if (extra > 0) {
    const [x, y, w, h] = cells[photos.length - 1];
    context.fillStyle = "rgba(10, 18, 14, 0.45)";
    context.fillRect(x, y, w, h);
    context.fillStyle = "#fff";
    context.textAlign = "center";
    context.font = `800 ${70 * u}px Manrope, "DM Sans", sans-serif`;
    context.fillText(`+${extra}`, x + w / 2, y + h / 2 + 24 * u);
    context.textAlign = "left";
  }
  context.fillStyle = BRAND.mint;
  context.fillRect(0, areaHeight, width, bandHeight);
  dayBadge(context, width - 120 * u, areaHeight, u, meta.day);
  const pad = 80 * u;
  let y = areaHeight + 100 * u;
  const info = [meta.date, meta.place].filter(Boolean).join("  ·  ");
  if (info) {
    context.fillStyle = BRAND.deep;
    context.font = `800 ${24 * u}px "DM Sans", sans-serif`;
    context.fillText(info.toUpperCase(), pad, y);
    y += 64 * u;
  }
  if (meta.title) {
    context.fillStyle = BRAND.deep;
    context.font = `800 ${58 * u}px Manrope, "DM Sans", sans-serif`;
    y = drawLines(context, wrapLines(context, meta.title, width - pad * 2 - 120 * u, 1), pad, y, 66 * u) + 4 * u;
  }
  if (meta.text) {
    context.fillStyle = BRAND.deep;
    context.font = `${36 * u}px Georgia, serif`;
    const room = Math.max(1, Math.floor((height - 90 * u - y) / (52 * u)));
    drawLines(context, wrapLines(context, meta.text, width - pad * 2, room), pad, y, 52 * u);
  }
  return canvas;
}

// Citação: memórias sem foto, em verde ou coral alternados.
async function pageQuote(meta, page, format, index) {
  const coral = index % 2 === 1;
  const { canvas, context, width, height, u } = albumCanvas(format, coral ? "#ffe7e1" : BRAND.green);
  const pad = 110 * u;
  const ink = coral ? BRAND.deep : BRAND.cream;
  context.font = `${54 * u}px Georgia, serif`;
  const textLines = meta.text ? wrapLines(context, meta.text, width - pad * 2, 14) : [];
  context.font = `800 ${60 * u}px Manrope, "DM Sans", sans-serif`;
  const titleLines = meta.title ? wrapLines(context, meta.title, width - pad * 2, 2) : [];
  const info = [meta.date, meta.place].filter(Boolean).join("  ·  ");
  const block = 220 * u + titleLines.length * 72 * u + textLines.length * 80 * u + (info ? 90 * u : 0);
  let y = Math.max(260 * u, (height - block) / 2 + 200 * u);
  context.fillStyle = coral ? BRAND.coral : BRAND.mint;
  context.font = `700 ${260 * u}px Georgia, serif`;
  context.fillText("“", pad - 16 * u, y - 20 * u);
  y += 60 * u;
  context.fillStyle = ink;
  context.font = `800 ${60 * u}px Manrope, "DM Sans", sans-serif`;
  y = drawLines(context, titleLines, pad, y, 72 * u) + (titleLines.length ? 20 * u : 0);
  context.font = `${54 * u}px Georgia, serif`;
  y = drawLines(context, textLines, pad, y, 80 * u);
  if (info) {
    context.fillStyle = coral ? "#1f6b50" : BRAND.mint;
    context.font = `800 ${26 * u}px "DM Sans", sans-serif`;
    context.fillText(info.toUpperCase(), pad, y + 50 * u);
  }
  dayBadge(context, width - 130 * u, 130 * u, u, meta.day);
  pageNumber(context, width, height, u, page, !coral);
  return canvas;
}

async function albumMemoryPage(trip, memory, page, options, format, index) {
  const meta = memoryMeta(trip, memory, options);
  const photos = (await Promise.all((memory.photos || []).slice(0, 4).map(albumPhoto))).filter(Boolean);
  if (!photos.length) return pageQuote(meta, page, format, index);
  if (photos.length === 1) return index % 2 === 0 ? pageFullBleed(meta, photos[0], page, format) : pagePolaroid(meta, photos[0], page, format, index);
  if (photos.length === 2) return pageDuo(meta, photos, page, format);
  return pageCollage(meta, photos, (memory.photos || []).length - photos.length, page, format);
}

async function albumClosing(trip, format) {
  const { canvas, context, width, height, u } = albumCanvas(format, BRAND.green);
  context.fillStyle = "rgba(86, 215, 174, 0.14)";
  context.beginPath();
  context.arc(width / 2, height / 2 - 120 * u, width * 0.42, 0, Math.PI * 2);
  context.fill();
  const iconImage = await brandIcon();
  if (iconImage) context.drawImage(iconImage, width / 2 - 90 * u, height / 2 - 380 * u, 180 * u, 180 * u);
  context.fillStyle = BRAND.cream;
  context.font = `${52 * u}px Georgia, serif`;
  const ending = tripPhase(trip) === "depois" ? messageFor("viagemEncerrada", trip.id) : "A viagem passa. As histórias ficam.";
  const y = drawLines(context, wrapLines(context, ending, width - 240 * u, 4), width / 2, height / 2 - 60 * u, 76 * u, "center");
  context.fillStyle = BRAND.mint;
  context.font = `800 ${34 * u}px Manrope, "DM Sans", sans-serif`;
  drawLines(context, ["Memórias organizadas com Viagem na Mão"], width / 2, y + 70 * u, 40 * u, "center");
  context.fillStyle = "rgba(255, 253, 245, 0.6)";
  context.font = `600 ${24 * u}px "DM Sans", sans-serif`;
  drawLines(context, [`Criado em ${formatDate(getBrasiliaDateKey(), { day: "numeric", month: "long", year: "numeric" })}`], width / 2, height - 100 * u, 30 * u, "center");
  return canvas;
}

function canvasToJpeg(canvas, quality = 0.86) {
  return new Promise((resolve, reject) => canvas.toBlob(async (blob) => {
    if (!blob) return reject(new Error("Não foi possível gerar a página."));
    resolve({ blob, bytes: new Uint8Array(await blob.arrayBuffer()), width: canvas.width, height: canvas.height });
  }, "image/jpeg", quality));
}

async function buildAlbumPages(trip, options, format = "pdf") {
  await document.fonts?.ready;
  const visible = retroOrdered(trip).filter((memory) => !trip.retro.hidden.includes(memory.id));
  const pages = [await canvasToJpeg(await albumCover(trip, visible, format))];
  for (const [index, memory] of visible.entries()) pages.push(await canvasToJpeg(await albumMemoryPage(trip, memory, index + 2, options, format, index)));
  pages.push(await canvasToJpeg(await albumClosing(trip, format)));
  return pages;
}

// PDF mínimo: uma imagem JPEG por página, sem bibliotecas.
function buildPdf(pages) {
  const encoder = new TextEncoder();
  const chunks = [];
  const offsets = [];
  let offset = 0;
  const push = (data) => {
    const bytes = typeof data === "string" ? encoder.encode(data) : data;
    chunks.push(bytes);
    offset += bytes.length;
  };
  const object = (number, write) => {
    offsets[number] = offset;
    push(`${number} 0 obj\n`);
    write();
    push("\nendobj\n");
  };
  const { width, height } = PDF_PAGE;
  push("%PDF-1.4\n%âãÏÓ\n");
  object(1, () => push("<< /Type /Catalog /Pages 2 0 R >>"));
  object(2, () => push(`<< /Type /Pages /Count ${pages.length} /Kids [${pages.map((_, index) => `${3 + index * 3} 0 R`).join(" ")}] >>`));
  pages.forEach((page, index) => {
    const number = 3 + index * 3;
    const content = `q ${width} 0 0 ${height} 0 0 cm /Im${index} Do Q`;
    object(number, () => push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /XObject << /Im${index} ${number + 2} 0 R >> >> /Contents ${number + 1} 0 R >>`));
    object(number + 1, () => push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`));
    object(number + 2, () => {
      push(`<< /Type /XObject /Subtype /Image /Width ${page.width} /Height ${page.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page.bytes.length} >>\nstream\n`);
      push(page.bytes);
      push("\nendstream");
    });
  });
  const size = 3 + pages.length * 3;
  const xref = offset;
  push(`xref\n0 ${size}\n0000000000 65535 f \n${offsets.slice(1).map((value) => `${String(value).padStart(10, "0")} 00000 n \n`).join("")}trailer\n<< /Size ${size} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
  return new Blob(chunks, { type: "application/pdf" });
}

function openAlbumSheet() {
  const trip = getCurrentTrip();
  const options = { showDates: true, showPlaces: true, showTexts: true };
  let format = "pdf";
  let pages = [];
  let thumbs = [];
  let version = 0;
  const baseName = () => `album-${slugify(trip.retro.title || trip.name || "viagem")}`;
  openSheet(`${sheetTitle("Álbum da viagem")}
    <p class="muted">Feito com as memórias e a capa da sua retrospectiva. Para mudar o que entra, use o lápis da retrospectiva.</p>
    <div class="segmented" id="album-format">${Object.entries(ALBUM_FORMATS).map(([key, value]) => `<button type="button" data-album-format="${key}" class="${key === format ? "is-selected" : ""}">${value.label}</button>`).join("")}</div>
    <div class="album-preview" id="album-preview"><p class="muted">Montando as páginas…</p></div>
    <div class="share-toggles" id="album-options">
      <label class="toggle-row">Mostrar as datas<span class="switch"><input type="checkbox" data-album-option="showDates" checked><span></span></span></label>
      <label class="toggle-row">Mostrar os lugares<span class="switch"><input type="checkbox" data-album-option="showPlaces" checked><span></span></span></label>
      <label class="toggle-row">Mostrar os textos<span class="switch"><input type="checkbox" data-album-option="showTexts" checked><span></span></span></label>
    </div>
    <p class="privacy-note">${icon("lock")} Gerado no aparelho, só com as memórias escolhidas. Gastos e outros dados da viagem não entram. Depois de enviada, a cópia não pode ser recolhida.</p>
    <p class="form-status" id="album-status" role="status" aria-live="polite"></p>
    <div class="row-actions"><button class="btn btn-secondary" type="button" id="album-download" disabled>${icon("download")} Baixar</button><button class="btn btn-primary" type="button" id="album-share" disabled>${icon("share-2")} Compartilhar</button></div>`, (root) => {
    const preview = root.querySelector("#album-preview");
    const status = root.querySelector("#album-status");
    const buttons = [root.querySelector("#album-download"), root.querySelector("#album-share")];
    const refresh = async () => {
      const mine = ++version;
      buttons.forEach((button) => { button.disabled = true; });
      status.classList.remove("is-info");
      status.textContent = "Montando as páginas…";
      try {
        const built = await buildAlbumPages(trip, options, format);
        if (mine !== version) return;
        thumbs.forEach((url) => URL.revokeObjectURL(url));
        pages = built;
        thumbs = pages.map((page) => URL.createObjectURL(page.blob));
        preview.dataset.format = format;
        preview.innerHTML = thumbs.map((url, index) => `<figure><img src="${url}" alt="Página ${index + 1}"><figcaption>${index + 1}</figcaption></figure>`).join("");
        status.classList.add("is-info");
        status.textContent = format === "pdf"
          ? `${pages.length} páginas · PDF A5`
          : `${pages.length} imagens 4:5${pages.length > 20 ? " · o Instagram aceita até 20 por post" : ""}`;
        buttons.forEach((button) => { button.disabled = false; });
      } catch (error) {
        console.error("Falha ao montar o álbum.", error);
        status.textContent = "Não consegui montar o álbum. Tente de novo.";
      }
    };
    refresh();
    root.querySelector("#album-format").addEventListener("click", (event) => {
      const button = event.target.closest("[data-album-format]");
      if (!button || button.dataset.albumFormat === format) return;
      format = button.dataset.albumFormat;
      root.querySelectorAll("[data-album-format]").forEach((item) => item.classList.toggle("is-selected", item === button));
      refresh();
    });
    root.querySelector("#album-options").addEventListener("change", (event) => {
      const input = event.target.closest("[data-album-option]");
      if (!input) return;
      options[input.dataset.albumOption] = input.checked;
      refresh();
    });
    const files = () => (format === "pdf"
      ? [new File([buildPdf(pages)], `${baseName()}.pdf`, { type: "application/pdf" })]
      : pages.map((page, index) => new File([page.blob], `${baseName()}-${String(index + 1).padStart(2, "0")}.jpg`, { type: "image/jpeg" })));
    const download = (list) => list.forEach((file, index) => window.setTimeout(() => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = file.name;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(link.href), 4000);
    }, index * 350));
    buttons[0].addEventListener("click", () => download(files()));
    buttons[1].addEventListener("click", async () => {
      const list = files();
      try {
        if (navigator.canShare?.({ files: list })) await navigator.share({ files: list, title: trip.retro.title || trip.name || "Álbum da viagem" });
        else {
          download(list);
          status.textContent = "Este navegador não compartilha direto: os arquivos foram baixados.";
        }
      } catch (error) {
        if (error?.name !== "AbortError") status.textContent = "Não consegui compartilhar. Use Baixar.";
      }
    });
  });
}

// ---------------------------------------------------------------------------
// Vídeo da retrospectiva (experimental): vertical, 15 a 30 segundos, gravado no
// aparelho a partir de um canvas animado, com música livre (Kevin MacLeod, CC BY)
// ou sem música para escolher uma faixa licenciada no Instagram ou TikTok.
// ---------------------------------------------------------------------------

const VIDEO_SIZE = { width: 720, height: 1280, fps: 30 };
const VIDEO_FADE = 0.45;
const VIDEO_TRACKS = [
  { id: "carefree", title: "Carefree", mood: "Alegre", page: "https://commons.wikimedia.org/wiki/File:Kevin_MacLeod_-_Carefree.ogg" },
  { id: "parisian", title: "Parisian", mood: "Charme europeu", page: "https://commons.wikimedia.org/wiki/File:Kevin_MacLeod_-_Parisian.ogg" },
  { id: "early-riser", title: "Early Riser", mood: "Leve, de manhã", page: "https://commons.wikimedia.org/wiki/File:Kevin_MacLeod_-_Early_Riser.ogg" },
  { id: "clean-soul", title: "Clean Soul", mood: "Calma", page: "https://commons.wikimedia.org/wiki/File:Kevin_MacLeod_-_Clean_Soul.ogg" },
  { id: "call-to-adventure", title: "Call to Adventure", mood: "Aventura", page: "https://commons.wikimedia.org/wiki/File:Kevin_MacLeod_-_Call_to_Adventure.ogg" }
];

const trackCredit = (track) => `Música: “${track.title}”, Kevin MacLeod (incompetech.com) · CC BY 3.0`;

function videoMimeType() {
  if (!window.MediaRecorder) return "";
  return ["video/mp4;codecs=avc1.42E01E,mp4a.40.2", "video/mp4", "video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"].find((type) => MediaRecorder.isTypeSupported(type)) || "";
}

const easeOut = (value) => 1 - Math.pow(1 - Math.min(1, Math.max(0, value)), 3);

// Zoom lento com leve deslocamento (efeito Ken Burns).
function drawKenBurns(context, image, progress, variant, width, height) {
  const zoom = 1.04 + 0.1 * progress;
  const base = Math.max(width / image.naturalWidth, height / image.naturalHeight) * zoom;
  const drawWidth = image.naturalWidth * base;
  const drawHeight = image.naturalHeight * base;
  const shift = (variant % 2 ? -1 : 1) * width * 0.04 * (progress - 0.5);
  context.drawImage(image, (width - drawWidth) / 2 + shift, (height - drawHeight) / 2, drawWidth, drawHeight);
}

function videoGradient(context, width, height, from) {
  const gradient = context.createLinearGradient(0, height * from, 0, height);
  gradient.addColorStop(0, "rgba(10, 18, 14, 0)");
  gradient.addColorStop(0.5, "rgba(10, 18, 14, 0.55)");
  gradient.addColorStop(1, "rgba(10, 18, 14, 0.9)");
  context.fillStyle = gradient;
  context.fillRect(0, height * from, width, height * (1 - from));
}

async function buildVideoSlides(trip, options) {
  const visible = retroOrdered(trip).filter((memory) => !trip.retro.hidden.includes(memory.id));
  const items = [];
  visible.forEach((memory) => {
    const meta = memoryMeta(trip, memory, options);
    const label = [meta.day ? `DIA ${meta.day}` : "", meta.place].filter(Boolean).join("  ·  ");
    const photos = (memory.photos || []).slice(0, 2);
    if (photos.length) photos.forEach((id, index) => items.push({ kind: "photo", id, label, title: index === 0 ? meta.title : "", text: index === 0 ? meta.text : "" }));
    else items.push({ kind: "quote", label, title: meta.title, text: meta.text });
  });
  const intro = 2.6;
  const outro = 2.8;
  const body = options.duration - intro - outro;
  const max = Math.max(1, Math.floor(body / 1.7));
  const chosen = items.length > max ? Array.from({ length: max }, (_, index) => items[Math.round(index * (items.length - 1) / Math.max(1, max - 1))]) : items;
  for (const item of chosen) if (item.kind === "photo") item.image = await albumPhoto(item.id);
  const usable = chosen.filter((item) => item.kind === "quote" || item.image);
  const each = usable.length ? body / usable.length : 0;
  const cover = await albumPhoto(retroCover(trip, visible));
  const slides = [{ kind: "intro", start: 0, duration: intro, image: cover }];
  usable.forEach((item, index) => slides.push({ ...item, start: intro + index * each, duration: each, variant: index }));
  slides.push({ kind: "outro", start: options.duration - outro, duration: outro });
  if (!usable.length) slides[slides.length - 1].start = intro;
  return { slides, icon: await brandIcon() };
}

function drawVideoSlide(context, slide, local, trip, assets, options) {
  const { width, height } = VIDEO_SIZE;
  const progress = Math.min(1, Math.max(0, local / slide.duration));
  const appear = easeOut((local - 0.15) / 0.6);
  if (slide.kind === "intro") {
    if (slide.image) drawKenBurns(context, slide.image, progress, 0, width, height);
    else {
      context.fillStyle = BRAND.green;
      context.fillRect(0, 0, width, height);
    }
    videoGradient(context, width, height, 0.3);
    context.globalAlpha *= appear;
    context.fillStyle = BRAND.mint;
    context.font = '800 20px "DM Sans", sans-serif';
    context.fillText("R E T R O S P E C T I V A", 56, height - 400 + (1 - appear) * 30);
    context.fillStyle = BRAND.cream;
    context.font = '800 76px Manrope, "DM Sans", sans-serif';
    const lines = wrapLines(context, trip.retro.title || trip.name || "Minha viagem", width - 112, 3);
    drawLines(context, lines, 56, height - 310 + (1 - appear) * 30, 84);
    context.fillStyle = "rgba(255, 253, 245, 0.85)";
    context.font = '600 26px "DM Sans", sans-serif';
    context.fillText(formatRange(trip.startDate, trip.endDate), 56, height - 300 + lines.length * 84 + 10);
    return;
  }
  if (slide.kind === "outro") {
    context.fillStyle = BRAND.green;
    context.fillRect(0, 0, width, height);
    const scale = 0.85 + 0.15 * easeOut(local / 0.8);
    if (assets.icon) {
      const size = 150 * scale;
      context.drawImage(assets.icon, (width - size) / 2, height / 2 - 260 - size / 2 + 75, size, size);
    }
    context.globalAlpha *= appear;
    context.fillStyle = BRAND.cream;
    context.font = '800 44px Manrope, "DM Sans", sans-serif';
    drawLines(context, ["Feito com", "Viagem na Mão"], width / 2, height / 2 + 10, 54, "center");
    context.fillStyle = BRAND.mint;
    context.font = '30px Georgia, serif';
    drawLines(context, ["A viagem passa. As histórias ficam."], width / 2, height / 2 + 150, 40, "center");
    if (options.track) {
      context.fillStyle = "rgba(255, 253, 245, 0.7)";
      context.font = '600 19px "DM Sans", sans-serif';
      drawLines(context, wrapLines(context, trackCredit(options.track), width - 120, 2), width / 2, height - 110, 26, "center");
    }
    return;
  }
  if (slide.kind === "quote") {
    context.fillStyle = slide.variant % 2 ? "#ffe7e1" : BRAND.green;
    context.fillRect(0, 0, width, height);
    const ink = slide.variant % 2 ? BRAND.deep : BRAND.cream;
    context.globalAlpha *= appear;
    context.fillStyle = slide.variant % 2 ? BRAND.coral : BRAND.mint;
    context.font = '700 180px Georgia, serif';
    context.fillText("“", 50, 470);
    context.fillStyle = ink;
    let y = 540;
    if (slide.title) {
      context.font = '800 46px Manrope, "DM Sans", sans-serif';
      y = drawLines(context, wrapLines(context, slide.title, width - 112, 2), 56, y, 56) + 14;
    }
    context.font = '40px Georgia, serif';
    y = drawLines(context, wrapLines(context, slide.text || "", width - 112, 9), 56, y, 58);
    if (slide.label) {
      context.fillStyle = slide.variant % 2 ? "#1f6b50" : BRAND.mint;
      context.font = '800 20px "DM Sans", sans-serif';
      context.fillText(slide.label.toUpperCase(), 56, y + 40);
    }
    return;
  }
  drawKenBurns(context, slide.image, progress, slide.variant, width, height);
  const hasCaption = slide.label || slide.title || slide.text;
  if (!hasCaption) return;
  videoGradient(context, width, height, 0.48);
  context.globalAlpha *= appear;
  const rise = (1 - appear) * 24;
  context.font = '30px Georgia, serif';
  const textLines = slide.text ? wrapLines(context, slide.text, width - 112, 3) : [];
  context.font = '800 50px Manrope, "DM Sans", sans-serif';
  const titleLines = slide.title ? wrapLines(context, slide.title, width - 112, 2) : [];
  let y = height - 120 - textLines.length * 42 - titleLines.length * 58 + rise;
  if (slide.label) {
    context.fillStyle = BRAND.mint;
    context.font = '800 20px "DM Sans", sans-serif';
    context.fillText(slide.label.toUpperCase(), 56, y - 22);
    y += 34;
  }
  context.fillStyle = BRAND.cream;
  context.font = '800 50px Manrope, "DM Sans", sans-serif';
  y = drawLines(context, titleLines, 56, y, 58);
  context.fillStyle = "rgba(255, 253, 245, 0.9)";
  context.font = '30px Georgia, serif';
  drawLines(context, textLines, 56, y + (titleLines.length ? 4 : 0), 42);
}

function drawVideoFrame(context, time, plan, trip, options) {
  const { width, height } = VIDEO_SIZE;
  const { slides } = plan;
  let index = slides.findIndex((slide) => time < slide.start + slide.duration);
  if (index < 0) index = slides.length - 1;
  const slide = slides[index];
  context.globalAlpha = 1;
  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);
  context.save();
  drawVideoSlide(context, slide, time - slide.start, trip, plan, options);
  context.restore();
  const next = slides[index + 1];
  const fadeStart = slide.start + slide.duration - VIDEO_FADE;
  if (next && time > fadeStart) {
    context.save();
    context.globalAlpha = Math.min(1, (time - fadeStart) / VIDEO_FADE);
    drawVideoSlide(context, next, 0, trip, plan, options);
    context.restore();
  }
  context.textAlign = "left";
}

// Grava em tempo real: o vídeo de 20 s leva 20 s para ficar pronto.
async function recordTripVideo(trip, options, onProgress) {
  const mimeType = videoMimeType();
  if (!mimeType || !HTMLCanvasElement.prototype.captureStream) throw new Error("Este navegador não grava vídeo. Tente pelo Safari ou Chrome atualizados.");
  await document.fonts?.ready;
  const plan = await buildVideoSlides(trip, options);
  const canvas = document.createElement("canvas");
  canvas.width = VIDEO_SIZE.width;
  canvas.height = VIDEO_SIZE.height;
  const context = canvas.getContext("2d");
  drawVideoFrame(context, 0, plan, trip, options);
  const stream = canvas.captureStream(VIDEO_SIZE.fps);
  let audio = null;
  if (options.track) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioCtx();
    if (audioContext.state === "suspended") await audioContext.resume().catch(() => {});
    const data = await (await fetch(`musicas/${options.track.id}.mp3`)).arrayBuffer();
    const buffer = await audioContext.decodeAudioData(data);
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    const gain = audioContext.createGain();
    const destination = audioContext.createMediaStreamDestination();
    source.connect(gain).connect(destination);
    destination.stream.getAudioTracks().forEach((track) => stream.addTrack(track));
    audio = { audioContext, source, gain };
  }
  const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 5_000_000 });
  const chunks = [];
  recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
  const stopped = new Promise((resolve) => { recorder.onstop = resolve; });
  recorder.start(250);
  const startedAt = performance.now();
  if (audio) {
    const now = audio.audioContext.currentTime;
    audio.gain.gain.setValueAtTime(0.0001, now);
    audio.gain.gain.exponentialRampToValueAtTime(1, now + 0.6);
    audio.gain.gain.setValueAtTime(1, now + options.duration - 1.8);
    audio.gain.gain.linearRampToValueAtTime(0, now + options.duration);
    audio.source.start(now);
  }
  await new Promise((resolve) => {
    const tick = () => {
      const time = (performance.now() - startedAt) / 1000;
      drawVideoFrame(context, Math.min(time, options.duration), plan, trip, options);
      onProgress?.(Math.min(1, time / options.duration));
      if (time >= options.duration) resolve();
      else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  recorder.stop();
  await stopped;
  stream.getTracks().forEach((track) => track.stop());
  if (audio) {
    try { audio.source.stop(); } catch { /* já terminou */ }
    audio.audioContext.close();
  }
  return new Blob(chunks, { type: mimeType.split(";")[0] });
}

function openVideoSheet() {
  const trip = getCurrentTrip();
  const options = { duration: 20, track: VIDEO_TRACKS[0], showDates: true, showPlaces: true, showTexts: true };
  let videoBlob = null;
  let videoUrl = "";
  let preview = null;
  const supported = Boolean(videoMimeType()) && Boolean(HTMLCanvasElement.prototype.captureStream);
  openSheet(`${sheetTitle("Vídeo da viagem")}
    <p class="muted">Vídeo vertical para Stories, Reels e TikTok, feito com as memórias e a capa da retrospectiva. Experimental: fica pronto em tempo real, então mantenha esta tela aberta enquanto grava.</p>
    ${supported ? "" : `<p class="form-status">Este navegador não grava vídeo. Tente pelo Safari (iPhone) ou Chrome atualizados.</p>`}
    <div class="video-stage" id="video-stage"><p class="muted">A prévia aparece aqui depois de gerar.</p></div>
    <h3 class="video-label">Duração</h3>
    <div class="segmented" id="video-duration">${[15, 20, 30].map((seconds) => `<button type="button" data-duration="${seconds}" class="${seconds === options.duration ? "is-selected" : ""}">${seconds} s</button>`).join("")}</div>
    <h3 class="video-label">Música</h3>
    <div class="track-list" id="track-list">
      ${VIDEO_TRACKS.map((track) => `<div class="track${track === options.track ? " is-selected" : ""}" data-track="${track.id}"><button type="button" class="track-play" data-play="${track.id}" aria-label="Ouvir ${escapeHtml(track.title)}">${icon("music")}</button><button type="button" class="track-pick" data-pick="${track.id}"><strong>${escapeHtml(track.title)}</strong><small>${escapeHtml(track.mood)} · Kevin MacLeod</small></button></div>`).join("")}
      <div class="track" data-track=""><span class="track-play">${icon("x")}</span><button type="button" class="track-pick" data-pick=""><strong>Sem música</strong><small>Para escolher uma música em alta no Instagram ou TikTok</small></button></div>
    </div>
    <p class="footnote" id="track-credit"></p>
    <div class="share-toggles" id="video-options">
      <label class="toggle-row">Mostrar as datas<span class="switch"><input type="checkbox" data-video-option="showDates" checked><span></span></span></label>
      <label class="toggle-row">Mostrar os lugares<span class="switch"><input type="checkbox" data-video-option="showPlaces" checked><span></span></span></label>
      <label class="toggle-row">Mostrar os textos<span class="switch"><input type="checkbox" data-video-option="showTexts" checked><span></span></span></label>
    </div>
    <p class="privacy-note">${icon("lock")} Gerado no aparelho, só com as memórias escolhidas. Depois de enviado, o vídeo não pode ser recolhido.</p>
    <p class="form-status" id="video-status" role="status" aria-live="polite"></p>
    <button class="btn btn-primary btn-block" type="button" id="video-make"${supported ? "" : " disabled"}>${icon("sparkles")} Gerar vídeo</button>
    <div class="row-actions" id="video-actions" hidden><button class="btn btn-secondary" type="button" id="video-download">${icon("download")} Baixar</button><button class="btn btn-primary" type="button" id="video-share">${icon("share-2")} Compartilhar</button></div>`, (root) => {
    const status = root.querySelector("#video-status");
    const credit = root.querySelector("#track-credit");
    const paintCredit = () => {
      credit.innerHTML = options.track
        ? `${escapeHtml(trackCredit(options.track))}. O crédito aparece no fim do vídeo; ao postar, inclua também na legenda. <a href="${escapeHtml(options.track.page)}" target="_blank" rel="noopener noreferrer">Fonte</a>`
        : "Sem música: no Instagram ou TikTok, toque em adicionar música antes de publicar; lá as músicas em alta já são licenciadas.";
    };
    paintCredit();
    const stopPreview = () => {
      if (preview) preview.pause();
      preview = null;
    };
    sheetGuard = () => {
      stopPreview();
      return !root.querySelector("#video-make").dataset.recording;
    };
    root.querySelector("#video-duration").addEventListener("click", (event) => {
      const button = event.target.closest("[data-duration]");
      if (!button) return;
      options.duration = Number(button.dataset.duration);
      root.querySelectorAll("[data-duration]").forEach((item) => item.classList.toggle("is-selected", item === button));
    });
    root.querySelector("#track-list").addEventListener("click", (event) => {
      const play = event.target.closest("[data-play]");
      if (play) {
        const playing = preview && preview.dataset.track === play.dataset.play;
        stopPreview();
        if (!playing) {
          preview = new Audio(`musicas/${play.dataset.play}.mp3`);
          preview.dataset.track = play.dataset.play;
          preview.play().catch(() => {});
        }
        return;
      }
      const pick = event.target.closest("[data-pick]");
      if (!pick) return;
      options.track = VIDEO_TRACKS.find((track) => track.id === pick.dataset.pick) || null;
      root.querySelectorAll(".track").forEach((item) => item.classList.toggle("is-selected", item.dataset.track === pick.dataset.pick));
      paintCredit();
    });
    root.querySelector("#video-options").addEventListener("change", (event) => {
      const input = event.target.closest("[data-video-option]");
      if (input) options[input.dataset.videoOption] = input.checked;
    });
    const fileName = () => `video-${slugify(trip.retro.title || trip.name || "viagem")}.${videoBlob?.type.includes("mp4") ? "mp4" : "webm"}`;
    root.querySelector("#video-make").addEventListener("click", async (event) => {
      const button = event.currentTarget;
      stopPreview();
      button.disabled = true;
      button.dataset.recording = "1";
      root.querySelector("#video-actions").hidden = true;
      status.classList.add("is-info");
      status.textContent = "Preparando…";
      try {
        videoBlob = await recordTripVideo(trip, options, (fraction) => {
          status.textContent = `Gravando o vídeo… ${Math.round(fraction * options.duration)} de ${options.duration} s. Mantenha a tela aberta.`;
        });
        if (videoUrl) URL.revokeObjectURL(videoUrl);
        videoUrl = URL.createObjectURL(videoBlob);
        root.querySelector("#video-stage").innerHTML = `<video src="${videoUrl}" controls playsinline loop></video>`;
        root.querySelector("#video-actions").hidden = false;
        status.textContent = `Pronto: ${options.duration} s · ${(videoBlob.size / 1048576).toFixed(1)} MB · ${videoBlob.type.includes("mp4") ? "MP4" : "WebM"}`;
      } catch (error) {
        console.error("Falha ao gravar o vídeo.", error);
        status.classList.remove("is-info");
        status.textContent = error.message || "Não consegui gerar o vídeo. Tente de novo.";
      } finally {
        delete button.dataset.recording;
        button.disabled = false;
        button.innerHTML = `${icon("sparkles")} Gerar de novo`;
      }
    });
    root.querySelector("#video-download").addEventListener("click", () => {
      if (!videoBlob) return;
      const link = document.createElement("a");
      link.href = videoUrl;
      link.download = fileName();
      link.click();
    });
    root.querySelector("#video-share").addEventListener("click", async () => {
      if (!videoBlob) return;
      const file = new File([videoBlob], fileName(), { type: videoBlob.type });
      try {
        if (navigator.canShare?.({ files: [file] })) await navigator.share({ files: [file], title: trip.retro.title || trip.name || "Vídeo da viagem", text: options.track ? trackCredit(options.track) : "" });
        else {
          root.querySelector("#video-download").click();
          status.textContent = "Este navegador não compartilha direto: o vídeo foi baixado.";
        }
      } catch (error) {
        if (error?.name !== "AbortError") status.textContent = "Não consegui compartilhar. Use Baixar.";
      }
    });
  });
}

// ---------------------------------------------------------------------------
// Ajustes: instalar na tela inicial e backup dos dados
// ---------------------------------------------------------------------------

let installPrompt = null;
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
});

const isStandalone = () => window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
const isAppleMobile = () => /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function allMemoryPhotoIds(trips = state.trips) {
  return [...new Set(trips.flatMap((trip) => trip.memories.flatMap((memory) => memory.photos || [])))];
}

async function buildBackup() {
  const photos = [];
  let missing = 0;
  for (const id of allMemoryPhotoIds()) {
    const blob = await getPhoto(id).catch(() => null);
    if (blob) photos.push({ id, data: await blobToDataUrl(blob) });
    else missing += 1;
  }
  const { lastBackupAt, ...data } = state;
  return { app: "viagem-na-mao", formato: 1, exportadoEm: new Date().toISOString(), dados: data, fotos: photos, fotosFaltando: missing };
}

async function readBackupFile(file) {
  const value = JSON.parse(await file.text());
  if (value?.app !== "viagem-na-mao" || !Array.isArray(value?.dados?.trips)) throw new Error("Este arquivo não é um backup do Viagem na Mão.");
  return value;
}

async function applyBackup(backup, mode) {
  const incoming = backup.dados.trips.map(migrateTrip);
  const entries = [];
  for (const photo of backup.fotos || []) {
    if (typeof photo?.id === "string" && /^data:image\//.test(photo.data || "")) entries.push([photo.id, await (await fetch(photo.data)).blob()]);
  }
  if (entries.length) await putPhotos(entries);
  const previousTrips = state.trips;
  const previousCurrent = state.currentTripId;
  if (mode === "replace") {
    state.trips = incoming;
    state.currentTripId = incoming.some((trip) => trip.id === backup.dados.currentTripId) ? backup.dados.currentTripId : incoming[0]?.id || null;
  } else {
    // Juntar: entram as viagens que faltam e, nas que já existem, as memórias que faltam.
    state.trips = previousTrips.map((trip) => {
      const twin = incoming.find((item) => item.id === trip.id);
      if (!twin) return trip;
      const known = new Set(trip.memories.map((memory) => memory.id));
      return { ...trip, memories: [...trip.memories, ...twin.memories.filter((memory) => !known.has(memory.id))] };
    });
    const known = new Set(previousTrips.map((trip) => trip.id));
    state.trips.push(...incoming.filter((trip) => !known.has(trip.id)));
    state.currentTripId ||= state.trips[0]?.id || null;
  }
  if (!saveState()) {
    state.trips = previousTrips;
    state.currentTripId = previousCurrent;
    throw new Error("Não consegui salvar os dados restaurados neste aparelho.");
  }
  if (mode === "replace") {
    const keep = new Set(allMemoryPhotoIds());
    const stored = await listPhotoIds().catch(() => []);
    const orphans = stored.filter((id) => !keep.has(id));
    deletePhotos(orphans).catch(() => {});
    orphans.forEach(forgetPhotoUrl);
  }
}

async function openSettingsSheet() {
  let persisted = null;
  try { persisted = await navigator.storage?.persisted?.(); } catch { persisted = null; }
  const memoryCount = state.trips.reduce((sum, trip) => sum + trip.memories.length, 0);
  const lastBackup = state.lastBackupAt ? new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(state.lastBackupAt)) : "";
  let install;
  if (isStandalone()) install = `<p class="settings-ok">${icon("circle-check")} O app já está instalado neste aparelho.</p>`;
  else if (installPrompt) install = `<button class="btn btn-primary btn-block" type="button" id="install-app">${icon("smartphone")} Instalar o app</button>`;
  else if (isAppleMobile()) install = `<ol class="settings-steps"><li>Abra este link no <strong>Safari</strong>.</li><li>Toque em <strong>Compartilhar</strong> ${icon("share-2")} na barra do navegador.</li><li>Escolha <strong>Adicionar à Tela de Início</strong>.</li></ol>`;
  else install = `<p class="muted">No menu do navegador, escolha <strong>Instalar app</strong> ou <strong>Adicionar à tela inicial</strong>.</p>`;

  openSheet(`${sheetTitle("Ajustes")}
    <section class="settings-section">
      <h3>${icon("user")} Perfil</h3>
      <label class="field">Como quer ser chamado? (opcional)<input id="profile-name" maxlength="40" autocomplete="given-name" value="${escapeHtml(state.profile?.name || "")}" placeholder="Ex.: Gabriel"></label>
      <p class="muted">Usado só na saudação da tela inicial. Fica neste aparelho.</p>
    </section>
    <section class="settings-section">
      <h3>${icon("smartphone")} Instalar na tela inicial</h3>
      <p class="muted">Abre como app, em tela cheia, e ajuda a proteger seus dados no aparelho.</p>
      ${install}
    </section>
    <section class="settings-section">
      <h3>${icon("book-heart")} Convites para guardar memórias</h3>
      <p class="muted">Durante a viagem, no máximo um convite por dia, só dentro do app, e nenhum se você já guardou algo no dia. Sem cobrança por dias sem registro.</p>
      <div class="segmented" id="reminder-options">
        <button type="button" data-reminders="app" class="${state.reminders !== "off" ? "is-selected" : ""}" aria-pressed="${state.reminders !== "off"}">Dentro do app</button>
        <button type="button" data-reminders="off" class="${state.reminders === "off" ? "is-selected" : ""}" aria-pressed="${state.reminders === "off"}">Desligado</button>
      </div>
    </section>
    <section class="settings-section">
      <h3>${icon("download")} Backup dos seus dados</h3>
      <p class="muted">Viagens, roteiros, custos e memórias ficam neste aparelho (e na nuvem, se você entrar na conta). Guarde uma cópia no Arquivos, no Drive ou no e-mail.</p>
      <p class="settings-meta">${state.trips.length} ${state.trips.length === 1 ? "viagem" : "viagens"} · ${memoryCount} ${memoryCount === 1 ? "memória" : "memórias"} · ${lastBackup ? `último backup em ${escapeHtml(lastBackup)}` : "nenhum backup ainda"}</p>
      <p class="settings-meta">${persisted ? `${icon("shield-check")} Armazenamento protegido: o navegador não apaga seus dados sozinho.` : `${icon("info")} O navegador pode apagar dados de sites pouco usados (no iPhone, depois de cerca de 7 dias sem abrir pelo Safari). Instalar na tela inicial e fazer backup evita isso.`}</p>
      <div class="row-actions">
        <button class="btn btn-primary" type="button" id="backup-download">${icon("download")} Baixar backup</button>
        <label class="btn btn-secondary">${icon("upload")} Restaurar<input class="visually-hidden" type="file" accept=".json,application/json" id="backup-file"></label>
      </div>
      <div class="confirm-box" id="restore-box" hidden></div>
      <p class="form-status" id="backup-status" role="status" aria-live="polite"></p>
    </section>`, (root) => {
    const status = root.querySelector("#backup-status");
    window.contaUI?.(root);
    root.querySelector("#profile-name").addEventListener("change", (event) => {
      state.profile = { ...(state.profile || {}), name: event.target.value.trim() };
      saveState();
      if (route.screen === "home") renderHome();
    });
    root.querySelector("#reminder-options").addEventListener("click", (event) => {
      const button = event.target.closest("[data-reminders]");
      if (!button) return;
      state.reminders = button.dataset.reminders;
      saveState();
      root.querySelectorAll("[data-reminders]").forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      render({ scroll: false });
    });
    root.querySelector("#install-app")?.addEventListener("click", async () => {
      const prompt = installPrompt;
      installPrompt = null;
      await prompt.prompt();
      closeSheet();
    });
    root.querySelector("#backup-download").addEventListener("click", async (event) => {
      const button = event.currentTarget;
      button.disabled = true;
      status.textContent = "Preparando backup…";
      try {
        const backup = await buildBackup();
        const name = `viagem-na-mao-backup-${getBrasiliaDateKey()}.json`;
        const file = new File([JSON.stringify(backup)], name, { type: "application/json" });
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && navigator.canShare?.({ files: [file] })) {
          await navigator.share({ files: [file], title: "Backup do Viagem na Mão" });
        } else {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(file);
          link.download = name;
          link.click();
          window.setTimeout(() => URL.revokeObjectURL(link.href), 4000);
        }
        state.lastBackupAt = new Date().toISOString();
        saveState();
        status.textContent = `Backup pronto${backup.fotosFaltando ? ` (${backup.fotosFaltando} foto(s) não encontradas neste aparelho)` : ""}. Guarde o arquivo num lugar seguro.`;
      } catch (error) {
        status.textContent = error?.name === "AbortError" ? "Backup cancelado." : "Não consegui gerar o backup. Tente de novo.";
      } finally {
        button.disabled = false;
      }
    });
    root.querySelector("#backup-file").addEventListener("change", async (event) => {
      const file = event.target.files[0];
      event.target.value = "";
      if (!file) return;
      const box = root.querySelector("#restore-box");
      let backup;
      try {
        backup = await readBackupFile(file);
      } catch (error) {
        box.hidden = true;
        status.textContent = error instanceof SyntaxError ? "Não consegui ler este arquivo." : error.message;
        return;
      }
      const memories = backup.dados.trips.reduce((sum, trip) => sum + (Array.isArray(trip.memories) ? trip.memories.length : 0), 0);
      const when = backup.exportadoEm ? new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(backup.exportadoEm)) : "data desconhecida";
      status.textContent = "";
      box.hidden = false;
      box.innerHTML = `<p><strong>Backup de ${escapeHtml(when)}</strong>: ${backup.dados.trips.length} ${backup.dados.trips.length === 1 ? "viagem" : "viagens"}, ${memories} ${memories === 1 ? "memória" : "memórias"}, ${(backup.fotos || []).length} fotos.</p>
        <p class="muted"><strong>Juntar</strong> acrescenta o que falta e mantém tudo o que já está aqui. <strong>Substituir</strong> troca os dados deste aparelho pelos do backup.</p>
        <div class="row-actions"><button class="btn btn-secondary" type="button" data-restore="replace">Substituir</button><button class="btn btn-primary" type="button" data-restore="merge">Juntar</button></div>`;
      box.onclick = async (clickEvent) => {
        const button = clickEvent.target.closest("[data-restore]");
        if (!button) return;
        if (button.dataset.restore === "replace" && !button.dataset.confirmed) {
          button.dataset.confirmed = "1";
          button.className = "btn btn-danger";
          button.textContent = "Confirmar troca";
          status.textContent = "Substituir apaga as viagens e memórias atuais deste aparelho. Toque em Confirmar troca para seguir.";
          return;
        }
        box.querySelectorAll("button").forEach((item) => { item.disabled = true; });
        status.textContent = "Restaurando…";
        try {
          await applyBackup(backup, button.dataset.restore);
          closeSheet({ force: true });
          render({ scroll: false });
          toast("Backup restaurado");
        } catch (error) {
          console.error("Falha ao restaurar backup.", error);
          box.querySelectorAll("button").forEach((item) => { item.disabled = false; });
          status.textContent = error.message || "Não consegui restaurar o backup.";
        }
      };
    });
  });
}

// ---------------------------------------------------------------------------
// Eventos
// ---------------------------------------------------------------------------

document.addEventListener("click", (event) => {
  const back = event.target.closest("[data-back]");
  if (back) {
    goBack();
    return;
  }
  const openTripButton = event.target.closest("[data-open-trip]");
  if (openTripButton) {
    openTrip(openTripButton.dataset.openTrip);
    return;
  }
  const apertoGo = event.target.closest("[data-aperto-go]");
  if (apertoGo) {
    openAperto(apertoGo.dataset.city, apertoGo.dataset.apertoGo);
    return;
  }
  const tabButton = event.target.closest("[data-tab]");
  if (tabButton && route.screen === "trip") {
    navigate({ tab: tabButton.dataset.tab }, { replace: true });
    return;
  }
  const openList = event.target.closest("[data-open-list]");
  if (openList) {
    const details = $(`#${openList.dataset.openList}`).closest("details");
    $$(".discover-group").forEach((group) => { if (group !== details) group.open = false; });
    details.open = true;
    details.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const discoverCity = event.target.closest("[data-discover-city]");
  if (discoverCity) {
    deckCity = discoverCity.dataset.discoverCity;
    renderDiscoverTab();
    return;
  }
  if (event.target.closest("[data-open-deck]")) {
    navigate({ screen: "deck" });
    return;
  }
  const placeButton = event.target.closest("[data-place]");
  if (placeButton && !sheet.contains(placeButton)) {
    openPlaceSheet(placeButton.dataset.place);
    return;
  }
  const lodgingAdd = event.target.closest("[data-lodging-add]");
  if (lodgingAdd) {
    openLodgingSheet(Number(lodgingAdd.dataset.lodgingAdd));
    return;
  }
  const lodgingEdit = event.target.closest("[data-lodging-edit]");
  if (lodgingEdit) {
    const [destinationIndex, lodgingId] = lodgingEdit.dataset.lodgingEdit.split("|");
    openLodgingSheet(Number(destinationIndex), lodgingId);
    return;
  }
  const dayButton = event.target.closest("[data-day]");
  if (dayButton) {
    selectedDay = dayButton.dataset.day;
    renderItinerary();
    return;
  }
  const stopButton = event.target.closest("[data-stop]");
  if (stopButton) {
    openStopSheet(stopButton.dataset.stop, stopButton.dataset.stopType);
    return;
  }
  if (event.target.closest("[data-new-memory]")) {
    openMemoryEditor();
    return;
  }
  const memoryButton = event.target.closest("[data-memory]");
  if (memoryButton) {
    openMemoryDetail(memoryButton.dataset.memory);
    return;
  }
  const inviteSave = event.target.closest("[data-invite-save]");
  if (inviteSave) {
    const origin = inviteSave.dataset.inviteContext;
    if (route.screen !== "trip" || state.currentTripId !== inviteSave.dataset.inviteSave) openTrip(inviteSave.dataset.inviteSave);
    openMemoryEditor({ origin });
    return;
  }
  const inviteDismiss = event.target.closest("[data-invite-dismiss]");
  if (inviteDismiss) {
    state.invites[inviteDismiss.dataset.inviteDismiss] = { dismissed: nowInBrasilia().date };
    saveState();
    render({ scroll: false });
    return;
  }
  if (event.target.closest("[data-closure-dismiss]")) {
    getCurrentTrip().closureDismissed = true;
    saveState();
    render({ scroll: false });
    return;
  }
  if (event.target.closest("[data-open-retro]")) {
    retroEditing = false;
    navigate({ screen: "retro" });
    return;
  }
  const retroMove = event.target.closest("[data-retro-move]");
  if (retroMove) {
    moveRetroMemory(retroMove.dataset.retroMove, Number(retroMove.dataset.direction));
    return;
  }
  const retroCoverButton = event.target.closest("[data-retro-cover]");
  if (retroCoverButton) {
    getCurrentTrip().retro.coverPhotoId = retroCoverButton.dataset.retroCover;
    saveState();
    renderRetro();
    return;
  }
  if (event.target.closest("#video-open")) {
    openVideoSheet();
    return;
  }
  if (event.target.closest("#album-open")) {
    openAlbumSheet();
    return;
  }
  if (event.target.closest("#retro-done, #retro-edit-button")) {
    retroEditing = !retroEditing;
    renderRetro();
    window.scrollTo(0, 0);
    return;
  }
  if (event.target.closest("[data-edit-departure]")) {
    openDepartureSheet();
    return;
  }
  const dismiss = event.target.closest("[data-dismiss-reflection]");
  if (dismiss) {
    state.flags.reflections = { ...(state.flags.reflections || {}), [dismiss.dataset.dismissReflection]: getBrasiliaDateKey() };
    saveState();
    dismiss.closest(".spotlight").remove();
    if (!$("#trip-message").innerHTML.trim()) $("#trip-message").hidden = true;
    announce("Reflexão dispensada por hoje.");
    return;
  }
  const quick = event.target.closest("[data-quick]");
  if (quick) {
    const tripId = $(".quick-access").dataset.trip;
    if (!tripId) {
      toast("Crie uma viagem para usar os atalhos");
      startNewTrip();
      return;
    }
    openTrip(tripId);
    if (quick.dataset.quick !== "about") navigate({ tab: quick.dataset.quick }, { replace: true });
    return;
  }
  const homeNav = event.target.closest("[data-home-nav]");
  if (homeNav) {
    const target = { top: "#home-top", trips: "#all-trips", inspiration: ".inspiration" }[homeNav.dataset.homeNav];
    if (homeNav.dataset.homeNav === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else $(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    $$("[data-home-nav]").forEach((item) => {
      const active = item === homeNav;
      item.classList.toggle("is-active", active);
      if (active) item.setAttribute("aria-current", "page");
      else item.removeAttribute("aria-current");
    });
    return;
  }
  if (event.target.closest("[data-new-trip]")) {
    startNewTrip();
    return;
  }
  if (event.target.closest("[data-open-settings]")) {
    openSettingsSheet();
    return;
  }
  const removeExpense = event.target.closest("[data-remove-expense]");
  if (removeExpense) {
    const trip = getCurrentTrip();
    trip.expenses = trip.expenses.filter((expense) => expense.id !== removeExpense.dataset.removeExpense);
    saveState();
    renderExpenses();
    toast("Despesa removida");
  }
});

$("#previous-inspiration").addEventListener("click", () => changeInspiration(-1));
$("#next-inspiration").addEventListener("click", () => changeInspiration(1));
$("#toggle-home-amounts").addEventListener("click", toggleAmounts);
$("#toggle-budget-visibility").addEventListener("click", toggleAmounts);
$("#toggle-expense-visibility").addEventListener("click", toggleAmounts);
$("#new-trip-button").addEventListener("click", startNewTrip);
$("#settings-button").addEventListener("click", openSettingsSheet);
$("#edit-trip-button").addEventListener("click", openEditSheet);
$("#city-filter").addEventListener("change", (event) => {
  deckCity = event.target.value;
  renderDeck();
});
$("#skip-activity").addEventListener("click", () => triggerSwipe("skip"));
$("#maybe-activity").addEventListener("click", () => triggerSwipe("maybe"));
$("#like-activity").addEventListener("click", () => triggerSwipe("like"));
$("#add-itinerary-button").addEventListener("click", openManualEventSheet);
$("#generate-itinerary").addEventListener("click", generateItinerary);
$("#expense-fab").addEventListener("click", openExpenseSheet);
$("#view-currency").addEventListener("click", (event) => {
  const button = event.target.closest("[data-view-brl]");
  if (!button) return;
  getCurrentTrip().showInBRL = button.dataset.viewBrl === "true";
  saveState();
  renderExpenses();
});
$("#trip-rate").addEventListener("change", (event) => {
  const rate = parseDecimal(event.target.value);
  if (!(rate > 0)) {
    toast("Informe a cotação com número, por exemplo 6,20");
    renderExpenses();
    return;
  }
  getCurrentTrip().budgetExchangeRate = rate;
  saveState();
  renderExpenses();
  toast("Cotação atualizada");
});
$("#retro-content").addEventListener("change", (event) => {
  const toggle = event.target.closest("[data-retro-toggle]");
  if (!toggle) return;
  const trip = getCurrentTrip();
  const id = toggle.dataset.retroToggle;
  trip.retro.hidden = toggle.checked ? trip.retro.hidden.filter((item) => item !== id) : [...new Set([...trip.retro.hidden, id])];
  saveState();
  renderRetro();
});
$("#guide-content").addEventListener("change", (event) => {
  const input = event.target.closest("[data-checklist]");
  if (!input) return;
  const trip = getCurrentTrip();
  trip.checklist[input.dataset.checklist] = input.checked;
  saveState();
  renderGuide();
});
$("#guide-content").addEventListener("click", async (event) => {
  const trip = getCurrentTrip();
  if (event.target.closest("#download-checklist")) {
    const blob = new Blob([checklistText(trip)], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `checklist-${slugify(trip.name || "viagem")}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  }
  if (event.target.closest("#share-checklist")) {
    const text = checklistText(trip);
    try {
      if (navigator.share) await navigator.share({ title: `Checklist — ${trip.name}`, text });
      else {
        await navigator.clipboard.writeText(text);
        toast("Checklist copiado");
      }
    } catch (error) {
      if (error?.name !== "AbortError") toast("Não foi possível compartilhar");
    }
  }
});
$("#wizard-back").addEventListener("click", () => {
  if (wizard && wizard.step > 0) {
    wizard.step -= 1;
    renderWizard();
    window.scrollTo(0, 0);
  } else exitWizard();
});
$("#wizard-close").addEventListener("click", exitWizard);
$("#wizard-next").addEventListener("click", () => {
  const steps = wizardSteps();
  if (!stepIsValid(steps[wizard.step])) return;
  if (wizard.step === steps.length - 1) saveWizard();
  else {
    wizard.step += 1;
    renderWizard();
    window.scrollTo(0, 0);
  }
});

document.addEventListener("keydown", (event) => {
  if (route.screen !== "deck" || sheet.open || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.target.closest("input, select, textarea, [contenteditable='true']")) return;
  if (!currentActivityId) return;
  if (event.key === "ArrowLeft") triggerSwipe("skip");
  if (event.key === "ArrowRight") triggerSwipe("like");
  if (event.key === "ArrowDown") {
    event.preventDefault();
    triggerSwipe("maybe");
  }
});

// ---------------------------------------------------------------------------
// Início do app
// ---------------------------------------------------------------------------

// As frases de reflexão da tela inicial entram na biblioteca para girar sem repetir.
MESSAGE_LIBRARY.reflexoes ||= reflections.map((item) => item.message);
hydrateIcons();
renderInspiration();
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let touchedAt = 0;
  $("#hero").addEventListener("pointerdown", () => { touchedAt = Date.now(); });
  window.setInterval(() => {
    if (route.screen === "home" && !document.hidden && Date.now() - touchedAt > 60000) changeInspiration(1);
  }, INSPIRATION_INTERVAL_MS);
}
window.history.replaceState({ ...route }, "");
render();
window.setInterval(updateCountdowns, 30000);
if (state.trips.length) requestPersistentStorage();
