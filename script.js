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

// ---------------------------------------------------------------------------
// Estado salvo no navegador (chave viagem-na-mao-v1; nunca apagar, só migrar)
// ---------------------------------------------------------------------------

const blankTrip = () => ({
  id: `viagem-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  name: "",
  startDate: "",
  endDate: "",
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
  memories: []
});

function migrateTrip(value) {
  const trip = { ...blankTrip(), ...(value || {}) };
  trip.id ||= blankTrip().id;
  trip.destinations = Array.isArray(trip.destinations) ? trip.destinations : [];
  trip.saved = Array.isArray(trip.saved) ? trip.saved : [];
  trip.maybe = Array.isArray(trip.maybe) ? trip.maybe : [];
  trip.dismissed = Array.isArray(trip.dismissed) ? trip.dismissed : [];
  trip.itinerary = Array.isArray(trip.itinerary) ? trip.itinerary : [];
  trip.expenses = Array.isArray(trip.expenses) ? trip.expenses : [];
  trip.interests = Array.isArray(trip.interests) ? trip.interests : [];
  trip.checklist = trip.checklist && typeof trip.checklist === "object" ? trip.checklist : {};
  trip.memories = Array.isArray(trip.memories) ? trip.memories.filter((memory) => memory && memory.id) : [];
  return trip;
}

let storageNotice = "";

function readStoredState() {
  const initial = { trips: [], currentTripId: null, hideAmounts: false, displayCurrency: "BRL", displayCurrencyRate: 1, messageHistory: {}, flags: {}, lastBackupAt: null };
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
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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

function getCountdown(dateString, endDateString = dateString) {
  if (!parseLocalDate(dateString)) return "Defina as datas";
  const today = getBrasiliaDateKey();
  const days = daysBetween(today, dateString);
  if (days < 0) return (endDateString || "") >= today ? "Viagem em andamento" : "Viagem concluída";
  if (days === 0) return "É hoje! Boa viagem";
  return `Faltam ${days} ${days === 1 ? "dia" : "dias"}`;
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
  if (["trip", "deck"].includes(route.screen) && !trip) route = { screen: "home", tab: "about", depth: 0 };
  if (route.screen === "form" && !wizard) route = { screen: "home", tab: "about", depth: 0 };
  showScreen(route.screen);
  if (scroll) window.scrollTo(0, 0);
  if (route.screen === "home") renderHome();
  if (route.screen === "trip") {
    renderTripHeader();
    showTab(route.tab || "about");
  }
  if (route.screen === "deck") renderDeck();
  if (route.screen === "form") renderWizard();
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
  const item = reflections[inspirationIndex];
  const current = $(".hero-img.is-active");
  const next = current?.id === "hero-img-a" ? $("#hero-img-b") : $("#hero-img-a");
  next.src = item.image;
  next.alt = `Paisagem inspiradora: ${item.place}`;
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
  $("#reflection-message").textContent = `“${item.message}”`;
  $("#hero-location").textContent = item.place;
  $("#home-verse-text").textContent = `“${item.verse}”`;
  $("#home-verse-reference").textContent = item.reference;
  $("#hero-dots").innerHTML = reflections.map((_, index) => `<span class="${index === inspirationIndex ? "is-active" : ""}"></span>`).join("");
  const preload = new Image();
  preload.src = reflections[(inspirationIndex + 1) % reflections.length].image;
}

function changeInspiration(direction) {
  inspirationIndex = (inspirationIndex + direction + reflections.length) % reflections.length;
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

function renderHome() {
  setAmountToggle($("#toggle-home-amounts"));
  const container = $("#trip-cards");
  const trips = [...state.trips].sort((a, b) => (a.startDate || "").localeCompare(b.startDate || ""));
  if (!trips.length) {
    container.innerHTML = `<div class="home-empty">${icon("plane")}<h3>Sua próxima história começa aqui.</h3><p>Crie uma viagem para juntar destinos, roteiro e custos em um só lugar.</p></div>`;
    return;
  }
  const today = getBrasiliaDateKey();
  const next = trips.find((trip) => trip.endDate >= today) || null;
  container.innerHTML = trips.map((trip) => {
    const cities = tripCities(trip);
    const cover = coverFor(trip);
    const budget = getBudgetInBRL(trip);
    return `<article class="trip-card">
      <img src="${escapeHtml(cover.image)}" alt="" loading="lazy">
      <div class="trip-card-shade"></div>
      <div class="trip-card-top">
        <span class="chip chip-glass">${icon("calendar")} ${escapeHtml(getCountdown(trip.startDate, trip.endDate))}</span>
        ${next && trip.id === next.id ? `<span class="chip chip-accent">${icon("sparkles")} Próxima</span>` : ""}
      </div>
      ${cover.photo ? `<a class="photo-credit" style="top:56px" href="${escapeHtml(safeUrl(cover.photo.page))}" target="_blank" rel="noopener noreferrer">Foto: ${escapeHtml(cover.photo.author)} · ${escapeHtml(cover.photo.license)}</a>` : ""}
      <button class="trip-card-body" type="button" data-open-trip="${escapeHtml(trip.id)}">
        <span class="trip-card-cities">${escapeHtml(cities.join(" · ") || trip.country || "Destino a definir")}</span>
        <span class="trip-card-name">${escapeHtml(trip.name || "Minha viagem")}</span>
        <span class="trip-card-meta"><span>${escapeHtml(formatRange(trip.startDate, trip.endDate, false))}</span><span>${budget ? `Orçamento <strong>${escapeHtml(money(budget))}</strong>` : `Gastos <strong>${escapeHtml(money(getExpensesTotal(trip)))}</strong>`}</span></span>
      </button>
    </article>`;
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
  $("#trip-cover-countdown").innerHTML = `${icon("calendar")} ${escapeHtml(getCountdown(trip.startDate, trip.endDate))}`;
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
  const ideas = getDiscoverableActivities(trip, "all");
  $("#discover-cta-count").textContent = ideas.length
    ? `${ideas.length} ${ideas.length === 1 ? "lugar" : "lugares"} para curtir ou passar`
    : "Você já viu todas as ideias";
  $("#trip-destination-list").innerHTML = trip.destinations.length
    ? trip.destinations.map((destination, index) => {
      const nights = destination.startDate && destination.endDate ? daysBetween(destination.startDate, destination.endDate) : 0;
      const lodging = destination.lodgingName
        ? `${escapeHtml(destination.lodgingName)}${destination.lodgingAddress ? ` · ${escapeHtml(destination.lodgingAddress)}` : ""}`
        : "Adicionar hospedagem";
      return `<li><span class="timeline-dot">${index + 1}</span>
        <div><strong>${escapeHtml(destination.name)}</strong><small>${escapeHtml(formatRange(destination.startDate, destination.endDate, false))} · ${nightsLabel(nights)}</small>
        <button class="link-btn lodging" type="button" data-lodging="${index}">${icon("bed-double")} ${lodging}</button></div>
        <span></span></li>`;
    }).join("")
    : '<li><div class="muted">Ainda não há cidades cadastradas.</div></li>';
  const saved = getTripActivities(trip);
  $("#saved-strip-card").hidden = !saved.length;
  $("#saved-strip").innerHTML = saved.map(({ activity }) => `<button class="mini-place" type="button" data-place="${escapeHtml(activity.id)}"><img src="${escapeHtml(imageOf(activity))}" alt="" loading="lazy"><span>${escapeHtml(activity.name)}</span></button>`).join("");
  addImageFallbacks($("#saved-strip"));
  renderBudgetCard(trip);
  renderMemoriesCard(trip);
  renderTripMessage(trip);
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
  const budgetBRL = getBudgetInBRL(trip);
  const forecast = getTripForecastBRL(trip);
  $("#trip-budget-total").textContent = budgetBRL ? money(trip.budget, trip.currency) : "Sem orçamento definido";
  $("#trip-budget-spent").textContent = `Gastos: ${money(getExpensesTotal(trip))}`;
  $("#trip-budget-left").textContent = budgetBRL ? `Saldo: ${money(budgetBRL - forecast)}` : "";
  const bar = $("#trip-budget-progress");
  bar.style.width = budgetBRL ? `${Math.min(100, (forecast / budgetBRL) * 100)}%` : "0%";
  bar.classList.toggle("is-over", budgetBRL > 0 && forecast > budgetBRL);
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

function placeTile(activity, badge = "") {
  return `<button class="place-tile" type="button" data-place="${escapeHtml(activity.id)}"><img src="${escapeHtml(imageOf(activity))}" alt="" loading="lazy">${badge}<span><strong>${escapeHtml(activity.name)}</strong><small>${escapeHtml(activity.city)}</small></span></button>`;
}

function renderDiscoverTab() {
  const trip = getCurrentTrip();
  const ideas = getDiscoverableActivities(trip, "all");
  const cities = tripCities(trip);
  $("#discover-summary").textContent = ideas.length
    ? `${ideas.length} ${ideas.length === 1 ? "lugar" : "lugares"} em ${cities.join(", ")} esperando por você. Deslize para curtir, passar ou deixar para depois.`
    : "Você já passou por todas as ideias. Reveja o que ficou em “Talvez depois”.";
  const saved = getTripActivities(trip);
  const maybe = getTripActivities(trip, "maybe");
  $("#discovery-saved-count").textContent = String(saved.length);
  $("#maybe-count").textContent = String(maybe.length);
  $("#saved-preview-list").innerHTML = saved.length
    ? saved.map(({ activity }) => placeTile(activity)).join("")
    : '<p class="empty-note">Os lugares que você curtir aparecem aqui.</p>';
  $("#maybe-preview-list").innerHTML = maybe.length
    ? maybe.map(({ activity }) => placeTile(activity, `<span class="tile-badge" aria-hidden="true">${icon("bookmark")}</span>`)).join("")
    : '<p class="empty-note">Nada guardado para decidir depois.</p>';
  addImageFallbacks($("#tab-discover"));
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
      <p class="place-desc">${escapeHtml(activity.description)}</p>
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
  $("#discovery-position").textContent = ideas.length ? `${ideas.length} ${ideas.length === 1 ? "lugar" : "lugares"} para ver` : "Tudo visto";
  $("#deck-title").textContent = deckCity === "all" ? "Descobrir" : deckCity;
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
  if (!saveState()) return;
  toast(`${activity.name} foi para o roteiro`);
  announce(`${activity.name} adicionada ao roteiro.`);
  refreshAfterChoice();
}

function markMaybe(id) {
  const trip = getCurrentTrip();
  const activity = getActivity(id);
  if (!trip || !activity || trip.maybe.some((item) => item.id === id)) return;
  trip.maybe.push({ id });
  if (!saveState()) return;
  toast("Guardado para decidir depois");
  announce(`${activity.name} guardada em talvez depois.`);
  refreshAfterChoice();
}

function dismissActivity(id) {
  const trip = getCurrentTrip();
  if (!trip || !id || trip.dismissed.includes(id)) return;
  trip.dismissed.push(id);
  if (!saveState()) return;
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
  } else if (isMaybe) {
    actions = `<div class="row-actions"><button class="btn btn-secondary" type="button" data-sheet-action="remove">${icon("x")} Descartar</button><button class="btn btn-primary" type="button" data-sheet-action="like">${icon("heart")} Curti</button></div>`;
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

function daySchedule(trip, date) {
  const events = trip.itinerary.filter((event) => event.date === date).map((event) => ({ ...event, type: "manual" }));
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
  let previous = null;
  $("#itinerary-content").innerHTML = schedule.map((item) => {
    let leg = "";
    if (item.coordinates && previous) {
      const key = routeKey(previous, item.coordinates);
      const km = distanceKm(previous, item.coordinates);
      leg = `<li class="travel-leg"><i></i><span>${icon("car")}<b data-route="${escapeHtml(key)}" data-straight-km="${km}" style="font-weight:600">${escapeHtml(routeText(key, km))}</b></span></li>`;
    }
    if (item.coordinates) previous = item.coordinates;
    return `${leg}<li class="stop">
      <span class="stop-time">${escapeHtml(item.time || "09:00")}</span>
      <div class="stop-card">
        ${item.image ? `<img src="${escapeHtml(item.image)}" alt="">` : `<span class="stop-icon">${icon("calendar-days")}</span>`}
        <div class="stop-info"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.subtitle || item.category || "Compromisso")}</small></div>
        <button class="icon-btn icon-btn-sm" type="button" data-stop="${escapeHtml(item.id)}" data-stop-type="${item.type}" aria-label="Opções de ${escapeHtml(item.title)}">${icon("ellipsis")}</button>
      </div></li>`;
  }).join("");
  addImageFallbacks($("#itinerary-content"));
  requestRoutes($("#itinerary-content"));
}

function dayOptions(trip, selected) {
  return getTripDays(trip).map((date) => `<option value="${date}"${date === selected ? " selected" : ""}>${escapeHtml(formatDate(date, { weekday: "short", day: "numeric", month: "short" }))}</option>`).join("");
}

function openStopSheet(id, type) {
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
  const trip = getCurrentTrip();
  if (!getTripDays(trip).length) return;
  openSheet(`${sheetTitle("Novo compromisso")}
    <label class="field">O que vai acontecer?<input id="event-title" maxlength="100" placeholder="Ex.: Check-in no hotel"></label>
    <label class="field">Categoria<input id="event-category" maxlength="60" placeholder="Ex.: Transporte"></label>
    <div class="field-row"><label class="field">Dia<select id="event-day">${dayOptions(trip, selectedDay)}</select></label><label class="field">Horário<input id="event-time" type="time" value="09:00"></label></div>
    <button class="btn btn-primary btn-block" type="button" id="event-save">${icon("plus")} Adicionar ao roteiro</button>`, (root) => {
    root.querySelector("#event-title").focus();
    root.querySelector("#event-save").addEventListener("click", () => {
      const title = root.querySelector("#event-title").value.trim();
      if (!title) {
        toast("Dê um nome para o compromisso");
        return;
      }
      const date = root.querySelector("#event-day").value;
      trip.itinerary.push({ id: `evento-${Date.now()}`, title, category: root.querySelector("#event-category").value.trim(), date, time: root.querySelector("#event-time").value || "09:00", type: "manual" });
      saveState();
      selectedDay = date;
      closeSheet();
      renderItinerary();
      toast("Compromisso adicionado");
    });
  });
}

function generateItinerary() {
  const trip = getCurrentTrip();
  const days = getTripDays(trip);
  if (!days.length) return;
  if (!trip.saved.length) {
    toast("Curta alguns lugares em Descobrir primeiro");
    return;
  }
  trip.saved.forEach((item, index) => {
    if (!item.date || !days.includes(item.date)) {
      const activity = getActivity(item.id);
      const destination = trip.destinations.find((place) => activityMatchesCity(activity, place.name));
      item.date = destination?.startDate || days[Math.min(index, days.length - 1)];
    }
    item.time ||= ["09:00", "11:30", "14:30", "17:00"][index % 4];
  });
  if (!saveState()) return;
  renderItinerary();
  toast("Sugestão pronta. Revise horários e deslocamentos.");
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

function displayValue(amountBRL) {
  const rate = state.displayCurrency === "BRL" ? 1 : Number(state.displayCurrencyRate);
  if (!displayAmounts) return "••••";
  return rate > 0 ? formatCurrency(amountBRL / rate, state.displayCurrency) : "Informe a cotação";
}

function renderExpenses() {
  const trip = getCurrentTrip();
  setAmountToggle($("#toggle-expense-visibility"));
  const spent = getExpensesTotal(trip);
  const forecast = getTripForecastBRL(trip);
  const budget = getBudgetInBRL(trip);
  $("#finance-spent").textContent = displayValue(spent);
  $("#finance-budget").textContent = budget ? displayValue(budget) : "—";
  $("#finance-forecast").textContent = displayValue(forecast);
  $("#finance-left").textContent = budget ? displayValue(budget - forecast) : "—";
  $("#finance-progress").style.width = budget ? `${Math.min(100, (forecast / budget) * 100)}%` : "0%";
  $("#display-currency").value = state.displayCurrency || "BRL";
  $("#display-exchange-rate").value = state.displayCurrencyRate || 1;
  $("#display-currency-label").textContent = state.displayCurrency || "BRL";
  const tight = budget > 0 && forecast >= budget * 0.9;
  $("#budget-message").hidden = !tight;
  if (tight) $("#budget-message").textContent = messageFor("orcamentoApertado", trip.id);

  const totals = {};
  trip.expenses.forEach((expense) => { totals[expense.category] = (totals[expense.category] || 0) + (Number(expense.amountBRL) || 0); });
  const ranked = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  $("#category-card").hidden = !ranked.length;
  $("#category-bars").innerHTML = ranked.map(([category, total]) => {
    const [label, iconName] = EXPENSE_CATEGORIES[category] || [category, "receipt"];
    const share = spent ? Math.round((total / spent) * 100) : 0;
    return `<div class="category-bar"><span class="cat-icon">${icon(iconName)}</span><div><strong>${escapeHtml(label)}</strong><div class="progress"><span style="width:${share}%"></span></div></div><em>${escapeHtml(displayValue(total))}</em></div>`;
  }).join("");

  const byDate = {};
  [...trip.expenses].sort((a, b) => (b.date || "").localeCompare(a.date || "")).forEach((expense) => { (byDate[expense.date] ||= []).push(expense); });
  const dates = Object.keys(byDate).sort((a, b) => b.localeCompare(a));
  $("#expense-list").innerHTML = dates.length ? dates.map((date) => `<section class="expense-day"><h4>${escapeHtml(capitalize(formatDate(date, { weekday: "long", day: "numeric", month: "long" })) || "Sem data")}</h4><div class="expense-group">${byDate[date].map((expense) => {
    const [label, iconName] = EXPENSE_CATEGORIES[expense.category] || [expense.category, "receipt"];
    const original = expense.currency !== "BRL" ? `<small>${escapeHtml(money(expense.amount, expense.currency, 2))}</small>` : "";
    return `<div class="expense-row"><span class="cat-icon">${icon(iconName)}</span><div style="min-width:0"><strong>${escapeHtml(expense.description)}</strong><small>${escapeHtml(label)}</small></div><div class="expense-amount"><strong>${escapeHtml(money(expense.amountBRL, "BRL", 2))}</strong>${original}</div><button class="remove-btn" type="button" data-remove-expense="${escapeHtml(expense.id)}" aria-label="Remover despesa ${escapeHtml(expense.description)}">${icon("trash-2")}</button></div>`;
  }).join("")}</div></section>`).join("")
    : `<div class="day-empty">${icon("receipt")}<p style="margin-top:8px">Nenhuma despesa ainda. Toque no <strong>+</strong> para registrar transporte, hospedagem, comida e passeios.</p></div>`;
}

function openExpenseSheet() {
  const trip = getCurrentTrip();
  const today = getBrasiliaDateKey();
  const defaultDate = trip.startDate && today >= trip.startDate && today <= trip.endDate ? today : (trip.startDate && today < trip.startDate ? today : trip.startDate || today);
  let category = "alimentacao";
  let currency = "BRL";
  openSheet(`${sheetTitle("Nova despesa")}
    <div class="amount-input"><span id="expense-currency-symbol">R$</span><input id="expense-amount" type="number" inputmode="decimal" min="0.01" step="0.01" placeholder="0,00" aria-label="Valor"></div>
    <div class="segmented" id="expense-currency">${CURRENCIES.map((code) => `<button type="button" data-currency="${code}" class="${code === currency ? "is-selected" : ""}">${code}</button>`).join("")}</div>
    <label class="field" id="expense-rate-field" hidden>Cotação · 1 unidade em R$<input id="expense-rate" type="number" inputmode="decimal" min="0.000001" step="0.000001" placeholder="Ex.: 5,40"></label>
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
    });
    root.querySelector("#expense-categories").addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      category = button.dataset.category;
      root.querySelectorAll("[data-category]").forEach((item) => item.classList.toggle("is-selected", item === button));
    });
    root.querySelector("#expense-save").addEventListener("click", () => {
      const amount = Number(root.querySelector("#expense-amount").value);
      const exchangeRate = currency === "BRL" ? 1 : Number(root.querySelector("#expense-rate").value);
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
      const weatherSlots = group.destinations.map((destination, index) => getCityInfo(destination.name) && destination.startDate
        ? `<div class="card"><div class="card-head"><h2>${icon("cloud-sun")} Clima · ${escapeHtml(destination.name)}</h2></div><div data-weather="${escapeHtml(destination.name)}|${destination.startDate}|${destination.endDate}"><p class="muted">Carregando clima…</p></div></div>`
        : "").join("");
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
}

function checklistText(trip) {
  const groups = guideCountries(trip);
  const lines = [`Checklist — ${trip.name || "Minha viagem"}`, `${tripCities(trip).join(" · ")} · ${formatRange(trip.startDate, trip.endDate)}`, ""];
  buildChecklist(trip, groups).forEach((item) => lines.push(`${trip.checklist[item.id] ? "[x]" : "[ ]"} ${item.title} — ${item.detail}`));
  lines.push("", "Gerado pelo Viagem na Mão. Regras mudam: confirme com fontes oficiais.");
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Hospedagem (pelo Resumo)
// ---------------------------------------------------------------------------

function openLodgingSheet(index) {
  const trip = getCurrentTrip();
  const destination = trip.destinations[index];
  if (!destination) return;
  openSheet(`${sheetTitle(`Hospedagem em ${destination.name}`)}
    <label class="field">Nome<input id="lodging-name" maxlength="100" value="${escapeHtml(destination.lodgingName || "")}" placeholder="Ex.: Pousada do Centro"></label>
    <label class="field">Endereço<input id="lodging-address" maxlength="180" value="${escapeHtml(destination.lodgingAddress || "")}" placeholder="Rua, número, bairro"></label>
    <button class="btn btn-primary btn-block" type="button" id="lodging-save">${icon("check")} Salvar</button>`, (root) => {
    root.querySelector("#lodging-save").addEventListener("click", () => {
      destination.lodgingName = root.querySelector("#lodging-name").value.trim();
      destination.lodgingAddress = root.querySelector("#lodging-address").value.trim();
      saveState();
      closeSheet();
      renderAbout();
      toast("Hospedagem salva");
    });
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
    data: { cities: [], startDate: "", endDate: "", companions: "", children: false, seniors: false, transport: "", interests: ["natureza", "gastronomia", "cultura"], budget: "", currency: "BRL", rate: 1, name: "", nameEdited: false }
  };
  navigate({ screen: "form" });
}

function editTrip() {
  const trip = getCurrentTrip();
  if (!trip) return;
  wizard = {
    step: 0,
    editingId: trip.id,
    month: (trip.startDate || getBrasiliaDateKey()).slice(0, 7),
    focus: "start",
    query: "",
    data: {
      cities: trip.destinations.map((destination) => ({
        name: destination.name,
        country: getCityInfo(destination.name)?.country || trip.country || "",
        nights: destination.startDate && destination.endDate ? daysBetween(destination.startDate, destination.endDate) : 0,
        lodgingName: destination.lodgingName || "",
        lodgingAddress: destination.lodgingAddress || "",
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
      nameEdited: true
    }
  };
  navigate({ screen: "form" });
}

function wizardSteps() {
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
  if (step === "budget") return Boolean(data.name.trim()) && (data.currency === "BRL" || Number(data.rate) > 0);
  return true;
}

function renderWizard() {
  const steps = wizardSteps();
  wizard.step = Math.min(wizard.step, steps.length - 1);
  const step = steps[wizard.step];
  const titles = { cities: "Destinos", dates: "Datas", split: "Dias por cidade", people: "Quem vai", interests: "Interesses", budget: "Orçamento" };
  $("#wizard-title").textContent = wizard.editingId ? "Editar viagem" : "Nova viagem";
  $("#wizard-step-label").textContent = `Etapa ${wizard.step + 1} de ${steps.length} · ${titles[step]}`;
  $("#wizard-progress").style.width = `${((wizard.step + 1) / steps.length) * 100}%`;
  $("#form-status").textContent = wizard.step === 0 ? storageNotice : "";
  const body = $("#wizard-body");
  ({ cities: renderCitiesStep, dates: renderDatesStep, split: renderSplitStep, people: renderPeopleStep, interests: renderInterestsStep, budget: renderBudgetStep })[step](body);
  hydrateIcons(body);
  updateWizardNext();
}

function updateWizardNext() {
  const steps = wizardSteps();
  const step = steps[wizard.step];
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
    <p class="nights-note" id="nights-note"></p>`;
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
    <div class="amount-input"><span id="budget-symbol">${data.currency === "BRL" ? "R$" : escapeHtml(data.currency)}</span><input id="wizard-budget" type="number" inputmode="decimal" min="0" step="50" value="${escapeHtml(data.budget)}" placeholder="0" aria-label="Orçamento"></div>
    <div class="segmented" id="budget-currency">${CURRENCIES.map((code) => `<button type="button" data-currency="${code}" class="${code === data.currency ? "is-selected" : ""}">${code}</button>`).join("")}</div>
    <label class="field" id="budget-rate-field" style="margin-top:12px"${data.currency === "BRL" ? " hidden" : ""}>Cotação manual · 1 unidade em R$<input id="wizard-rate" type="number" inputmode="decimal" min="0.000001" step="0.000001" value="${data.currency === "BRL" ? 1 : escapeHtml(data.rate)}"></label>`;
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
    if (data.currency === "BRL") data.rate = 1;
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
      lodgingName: previous?.lodgingName || "",
      lodgingAddress: previous?.lodgingAddress || ""
    };
  });
  const trip = migrateTrip({
    ...(existing || blankTrip()),
    name: data.name.trim(),
    startDate: data.startDate,
    endDate: data.endDate,
    budget: Number(data.budget) || 0,
    currency: data.currency,
    budgetExchangeRate: data.currency === "BRL" ? 1 : Number(data.rate) || 1,
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
  wizard = null;
  selectedDay = null;
  toast(wasEditing ? "Viagem atualizada" : "Viagem criada!");
  navigate({ screen: "trip", tab: "about" }, { replace: true });
}

function exitWizard() {
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
  element.hidden = !text;
  element.textContent = text;
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
      <span><strong>Meu Baú</strong><small>${escapeHtml(subtitle)}</small></span>${icon("chevron-right")}
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
      <h2>Meu Baú</h2>
      <p>${escapeHtml(lead)}</p>
      <span class="private-pill">${icon("lock")} Privado · guardado só neste aparelho</span>
      <button class="btn btn-primary btn-block" type="button" data-new-memory>${icon("image-plus")} Guardar momento</button>
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
    <div class="row-actions" id="memory-actions"><button class="btn btn-danger" type="button" id="memory-delete">${icon("trash-2")} Excluir</button><button class="btn btn-primary" type="button" id="memory-edit">${icon("pencil")} Editar</button></div>
    <div class="confirm-box" id="memory-confirm" hidden>
      <p><strong>Excluir esta memória?</strong> As fotos e o texto saem do seu Baú e não dá para desfazer.</p>
      <div class="row-actions"><button class="btn btn-secondary" type="button" id="memory-cancel-delete">Cancelar</button><button class="btn btn-danger" type="button" id="memory-confirm-delete">${icon("trash-2")} Excluir</button></div>
    </div>`, (root) => {
    hydratePhotos(root);
    root.querySelector("#memory-edit").addEventListener("click", () => openMemoryEditor({ id }));
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
      showTab(route.tab);
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
      showTab(route.tab);
      toast(messageFor("memoriaGuardada", `${memory.id}|${now}`));
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
      <h3>${icon("smartphone")} Instalar na tela inicial</h3>
      <p class="muted">Abre como app, em tela cheia, e ajuda a proteger seus dados no aparelho.</p>
      ${install}
    </section>
    <section class="settings-section">
      <h3>${icon("download")} Backup dos seus dados</h3>
      <p class="muted">Viagens, roteiros, custos e memórias ficam só neste aparelho. Guarde uma cópia no Arquivos, no Drive ou no e-mail.</p>
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
  const tabButton = event.target.closest("[data-tab]");
  if (tabButton && route.screen === "trip") {
    navigate({ tab: tabButton.dataset.tab }, { replace: true });
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
  const lodging = event.target.closest("[data-lodging]");
  if (lodging) {
    openLodgingSheet(Number(lodging.dataset.lodging));
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
$("#edit-trip-button").addEventListener("click", editTrip);
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
$("#display-currency").addEventListener("change", (event) => {
  state.displayCurrency = event.target.value;
  if (event.target.value === "BRL") state.displayCurrencyRate = 1;
  saveState();
  renderExpenses();
});
$("#display-exchange-rate").addEventListener("change", (event) => {
  state.displayCurrencyRate = Number(event.target.value) || 0;
  saveState();
  renderExpenses();
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

hydrateIcons();
renderInspiration();
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.setInterval(() => { if (route.screen === "home" && !document.hidden) changeInspiration(1); }, INSPIRATION_INTERVAL_MS);
}
window.history.replaceState({ ...route }, "");
render();
if (state.trips.length) requestPersistentStorage();
