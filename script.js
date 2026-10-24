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
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=85"
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
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1100&q=85"
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
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1100&q=85"
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
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1100&q=85"
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
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1100&q=85"
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
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1100&q=85"
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
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1100&q=85"
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
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=85"
  },
  ...makeCityActivities("Rio de Janeiro", [
    ["Cristo Redentor", "Cultura & natureza", ["cultura", "natureza", "familia"], "Monumento no alto do Corcovado, dentro do Parque Nacional da Tijuca; acesso e ingresso dependem do transporte e da visitação."],
    ["Pão de Açúcar e Bondinho", "Natureza", ["natureza", "aventura", "familia"], "Conjunto de morros com acesso por teleférico e vista para a Baía de Guanabara; consulte condições e ingressos."],
    ["Praia de Copacabana", "Praia", ["praia", "natureza", "familia"], "Praia e calçadão em um dos trechos mais conhecidos da orla carioca."],
    ["Parque Nacional da Tijuca", "Natureza", ["natureza", "aventura", "familia"], "Área de Mata Atlântica com trilhas, mirantes e cachoeiras; verifique acessos e condições antes da visita."],
    ["Escadaria Selarón", "Arte & cultura", ["arte", "cultura"], "Escadaria pública decorada pelo artista Jorge Selarón, entre os bairros da Lapa e Santa Teresa."]
  ], "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1100&q=85"),
  ...makeCityActivities("Gramado", [
    ["Rua Coberta", "Passeio urbano", ["cultura", "gastronomia"], "Galeria coberta no centro, com cafés, restaurantes e programação cultural em diferentes épocas do ano."],
    ["Lago Negro", "Natureza", ["natureza", "familia"], "Parque arborizado junto ao lago, conhecido pelas trilhas de caminhada e passeios de pedalinho."],
    ["Mini Mundo", "Atração", ["familia", "cultura"], "Parque ao ar livre com miniaturas de construções e cenas em escala reduzida."],
    ["Igreja Matriz São Pedro", "Cultura", ["cultura", "arte"], "Igreja de pedra basáltica em frente à praça central, um dos marcos arquitetônicos de Gramado."],
    ["Snowland", "Aventura", ["aventura", "familia"], "Parque temático de neve indoor; atrações, calendário e ingressos devem ser verificados com o operador."],
    ["Natal Luz de Gramado", "Evento sazonal", ["cultura", "familia"], "Programação temática de Natal com atrações e espetáculos; datas, horários e ingressos mudam a cada edição."]
  ], "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1100&q=85"),
  ...makeCityActivities("Canela", [
    ["Catedral de Pedra", "Cultura", ["cultura", "arte"], "Igreja de estilo gótico no centro de Canela, conhecida pela torre e pelo conjunto de vitrais."],
    ["Parque Estadual do Caracol", "Natureza", ["natureza", "aventura", "familia"], "Área natural protegida com trilhas e vista para a Cascata do Caracol; consulte regras e acessos antes da visita."],
    ["Bondinhos Aéreos Parques da Serra", "Aventura", ["natureza", "aventura", "familia"], "Teleférico com vista para o vale e para a Cascata do Caracol; operação sujeita a condições e ingresso."],
    ["Castelinho Caracol", "Cultura", ["cultura", "gastronomia"], "Casa histórica de madeira preservada, com visitação e opções de gastronomia local."]
  ], "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1100&q=85"),
  ...makeCityActivities("Florianópolis", [
    ["Ponte Hercílio Luz", "Passeio urbano", ["cultura", "arte"], "Cartão-postal de Florianópolis e ponte pênsil histórica que conecta a ilha ao continente."],
    ["Lagoa da Conceição", "Natureza", ["natureza", "gastronomia", "aventura"], "Região de lagoa com mirantes, esportes aquáticos, restaurantes e acesso a bairros e praias da ilha."],
    ["Praia da Joaquina", "Praia", ["praia", "natureza", "aventura"], "Praia oceânica conhecida pelas dunas próximas e pela prática de surfe, sujeita às condições do mar."],
    ["Mercado Público de Florianópolis", "Gastronomia", ["gastronomia", "cultura"], "Mercado tradicional no centro, com restaurantes, bares e comércio local."]
  ], "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=85"),
  ...makeCityActivities("Curitiba", [
    ["Jardim Botânico de Curitiba", "Natureza", ["natureza", "familia"], "Jardim público com estufa de estrutura metálica e jardins geométricos, um dos cartões-postais da cidade."],
    ["Museu Oscar Niemeyer", "Arte & cultura", ["arte", "cultura"], "Museu de arte e design conhecido pelo edifício apelidado de Olho; exposições e horários podem variar."],
    ["Ópera de Arame", "Arte & cultura", ["arte", "cultura", "familia"], "Teatro de estrutura tubular e cobertura transparente integrado a uma antiga pedreira."],
    ["Parque Tanguá", "Natureza", ["natureza", "familia"], "Parque municipal com jardins, mirantes e estruturas construídas em antiga área de pedreira."],
    ["Feira do Largo da Ordem", "Evento & gastronomia", ["gastronomia", "cultura", "arte"], "Feira tradicional de artesanato e gastronomia; confirme a data e o funcionamento no calendário local."]
  ], "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1100&q=85"),
  ...makeCityActivities("São Paulo", [
    ["Parque Ibirapuera", "Natureza", ["natureza", "familia", "aventura"], "Grande parque urbano com áreas verdes, espaços culturais e caminhos para caminhar e pedalar."],
    ["MASP — Museu de Arte de São Paulo", "Arte & cultura", ["arte", "cultura"], "Museu da Avenida Paulista conhecido por seu edifício suspenso e acervo de arte; consulte a programação."],
    ["Pinacoteca de São Paulo", "Arte & cultura", ["arte", "cultura"], "Museu de artes visuais no centro, com exposições em edifício histórico e espaços culturais próximos."],
    ["Mercado Municipal de São Paulo", "Gastronomia", ["gastronomia", "cultura"], "Mercado central conhecido pela variedade de produtos, bancas e opções de alimentação."],
    ["Bairro da Liberdade", "Passeio urbano", ["gastronomia", "cultura"], "Bairro central com forte presença da cultura japonesa, comércio, restaurantes e feiras em datas específicas."],
    ["Virada Cultural", "Evento", ["arte", "cultura", "vida-noturna"], "Festival de programação cultural pela cidade; consulte se há edição durante as datas da viagem."]
  ], "https://images.unsplash.com/photo-1543059080-f9b1272213d5?auto=format&fit=crop&w=1100&q=85"),
  ...makeCityActivities("Foz do Iguaçu", [
    ["Cataratas do Iguaçu — lado brasileiro", "Natureza", ["natureza", "aventura", "familia"], "Conjunto de quedas-d'água dentro do Parque Nacional do Iguaçu, Patrimônio Mundial; acesso sujeito a ingresso e regras do parque."],
    ["Parque das Aves", "Natureza", ["natureza", "familia"], "Parque de conservação próximo ao acesso das Cataratas, com viveiros e atividades de educação ambiental."],
    ["Usina de Itaipu", "Passeio", ["cultura", "aventura", "familia"], "Complexo hidrelétrico com diferentes modalidades de visitação, conforme agenda e disponibilidade."],
    ["Marco das Três Fronteiras", "Cultura", ["cultura", "familia"], "Espaço de visitação na fronteira entre Brasil, Argentina e Paraguai, com referências culturais da região."]
  ], "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1100&q=85"),
  ...makeCityActivities("Salvador", [
    ["Pelourinho e Centro Histórico", "Cultura", ["cultura", "arte", "gastronomia"], "Conjunto histórico com ruas, igrejas, museus e edifícios coloniais; visite com atenção às orientações locais."],
    ["Elevador Lacerda", "Passeio urbano", ["cultura"], "Elevador público que conecta a Cidade Alta à Cidade Baixa e oferece vista para a Baía de Todos-os-Santos."],
    ["Farol da Barra", "Cultura", ["cultura", "praia", "familia"], "Farol no Forte de Santo Antônio da Barra, junto à orla e ao Museu Náutico da Bahia."],
    ["Mercado Modelo", "Gastronomia", ["gastronomia", "cultura"], "Centro comercial de artesanato e produtos regionais na Cidade Baixa."],
    ["Carnaval de Salvador", "Evento sazonal", ["cultura", "vida-noturna", "gastronomia"], "Festa de rua com circuitos, blocos e apresentações; datas e programação mudam a cada ano."]
  ], "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1100&q=85"),
  ...makeCityActivities("Recife", [
    ["Marco Zero e Recife Antigo", "Passeio urbano", ["cultura", "arte", "gastronomia"], "Praça e bairro histórico à beira do porto, com museus, espaços culturais e programação que varia ao longo do ano."],
    ["Instituto Ricardo Brennand", "Arte & cultura", ["arte", "cultura", "familia"], "Complexo cultural com museu, pinacoteca e acervo histórico; consulte exposições e funcionamento."],
    ["Parque das Esculturas Francisco Brennand", "Arte & cultura", ["arte", "cultura"], "Conjunto de esculturas do artista Francisco Brennand na área portuária, com vista para o Marco Zero."],
    ["Praia de Boa Viagem", "Praia", ["praia", "natureza"], "Trecho urbano de praia; observe a sinalização e as orientações locais sobre banho de mar."]
  ], "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1100&q=85"),
  ...makeCityActivities("Olinda", [
    ["Centro Histórico de Olinda", "Cultura", ["cultura", "arte", "gastronomia"], "Conjunto urbano histórico reconhecido como Patrimônio Mundial, com ladeiras, igrejas e ateliês."],
    ["Alto da Sé", "Passeio urbano", ["cultura", "gastronomia", "familia"], "Mirante e área histórica junto à Catedral da Sé, com vista para Olinda e Recife."],
    ["Mosteiro de São Bento", "Cultura", ["cultura", "arte"], "Conjunto religioso histórico com igreja e decoração barroca; confirme as condições de visitação."],
    ["Carnaval de Olinda", "Evento sazonal", ["cultura", "vida-noturna", "familia"], "Festa popular de rua com blocos e bonecos gigantes; datas e programação mudam a cada ano."]
  ], "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1100&q=85"),
  ...makeCityActivities("Fortaleza", [
    ["Praia do Futuro", "Praia", ["praia", "gastronomia", "familia"], "Praia urbana com barracas e serviços à beira-mar; consulte condições do mar e funcionamento dos estabelecimentos."],
    ["Mercado Central de Fortaleza", "Gastronomia", ["gastronomia", "cultura"], "Mercado de artesanato e produtos regionais no centro da cidade."],
    ["Centro Dragão do Mar de Arte e Cultura", "Arte & cultura", ["arte", "cultura", "vida-noturna"], "Complexo cultural com museus, cinema, planetário e espaços de eventos; programação varia."],
    ["Avenida Beira-Mar e Feirinha", "Passeio urbano", ["gastronomia", "cultura", "familia"], "Trecho de orla com espaços de caminhada, restaurantes e feira de artesanato em horários definidos localmente."]
  ], "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1100&q=85"),
  ...makeCityActivities("Brasília", [
    ["Catedral Metropolitana de Brasília", "Arquitetura", ["cultura", "arte"], "Projeto de Oscar Niemeyer e marco da arquitetura moderna, situado no Eixo Monumental."],
    ["Congresso Nacional", "Arquitetura", ["cultura", "arte"], "Sede do Poder Legislativo Federal, com visitas institucionais sujeitas a agenda e regras de acesso."],
    ["Memorial JK", "Museu", ["cultura", "arte"], "Museu e memorial dedicado à trajetória de Juscelino Kubitschek, com exposição e acervo histórico."],
    ["Santuário Dom Bosco", "Arquitetura", ["cultura", "arte"], "Igreja conhecida pelos vitrais azuis, parte do conjunto de arquitetura moderna da capital."]
  ], "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1100&q=85"),
  ...makeCityActivities("Belo Horizonte", [
    ["Conjunto Moderno da Pampulha", "Arquitetura", ["cultura", "arte", "natureza"], "Conjunto de edifícios projetados por Oscar Niemeyer ao redor da lagoa, reconhecido como Patrimônio Mundial."],
    ["Mercado Central de Belo Horizonte", "Gastronomia", ["gastronomia", "cultura"], "Mercado tradicional com produtos mineiros, bares e restaurantes."],
    ["Praça da Liberdade", "Passeio urbano", ["cultura", "arte", "familia"], "Praça ajardinada cercada por edifícios históricos e espaços culturais do Circuito Liberdade."],
    ["Mirante do Mangabeiras", "Natureza", ["natureza", "familia"], "Área pública com vista panorâmica da cidade; acesso e horários dependem das regras locais."]
  ], "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1100&q=85"),
  ...makeCityActivities("Bonito", [
    ["Gruta do Lago Azul", "Natureza", ["natureza", "aventura"], "Caverna com lago de águas azuis e visita controlada; passeio requer reserva por agência credenciada."],
    ["Flutuação no Rio da Prata", "Natureza", ["natureza", "aventura"], "Atividade de flutuação em águas de nascente com observação de peixes; exige reserva e segue regras ambientais."],
    ["Buraco das Araras", "Natureza", ["natureza", "aventura", "familia"], "Dolina com trilha e observação de aves em área de conservação; consulte disponibilidade e condições de visita."],
    ["Aquário Natural", "Natureza", ["natureza", "aventura", "familia"], "Atividade de flutuação em nascente de águas transparentes, realizada com acompanhamento e reserva."]
  ], "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1100&q=85"),
  ...makeCityActivities("Manaus", [
    ["Teatro Amazonas", "Arte & cultura", ["arte", "cultura"], "Teatro histórico na região central, com visitas e apresentações sujeitas à programação."],
    ["Encontro das Águas", "Natureza", ["natureza", "aventura"], "Fenômeno natural da confluência dos rios Negro e Solimões, geralmente visitado em passeios de barco."],
    ["Mercado Municipal Adolpho Lisboa", "Gastronomia", ["gastronomia", "cultura"], "Mercado histórico com produtos regionais e arquitetura inspirada em mercados europeus."],
    ["MUSA — Museu da Amazônia", "Natureza", ["natureza", "cultura", "familia"], "Museu e área de visitação em floresta, com trilhas e atividades que requerem consulta de horários."]
  ], "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1100&q=85"),
  ...makeCityActivities("Porto Alegre", [
    ["Orla do Guaíba", "Natureza", ["natureza", "familia"], "Área pública de lazer junto ao lago Guaíba, com espaços de caminhada, bicicleta e contemplação."],
    ["Mercado Público de Porto Alegre", "Gastronomia", ["gastronomia", "cultura"], "Mercado histórico no centro com bancas, restaurantes e produtos regionais."],
    ["Fundação Iberê Camargo", "Arte & cultura", ["arte", "cultura"], "Museu dedicado ao artista Iberê Camargo, em edifício projetado por Álvaro Siza; consulte exposições."],
    ["Parque Farroupilha (Redenção)", "Natureza", ["natureza", "familia"], "Parque urbano tradicional com áreas verdes, feira em dias específicos e atividades ao ar livre."]
  ], "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1100&q=85"),
  ...makeCityActivities("João Pessoa", [
    ["Farol do Cabo Branco", "Passeio urbano", ["cultura", "natureza"], "Marco geográfico e mirante na região do Cabo Branco, no extremo oriental das Américas."],
    ["Praia de Tambaú", "Praia", ["praia", "gastronomia", "familia"], "Orla urbana com hotéis, quiosques e saídas de passeios de barco conforme condições locais."],
    ["Centro Histórico de João Pessoa", "Cultura", ["cultura", "arte"], "Conjunto histórico com igrejas, praças e edifícios de diferentes períodos."],
    ["Piscinas naturais do Seixas", "Natureza", ["praia", "natureza", "aventura"], "Piscinas naturais acessíveis por embarcação em condições específicas de maré e clima; consulte operadores locais."]
  ], "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=85"),
  ...makeCityActivities("Natal", [
    ["Parque das Dunas", "Natureza", ["natureza", "aventura", "familia"], "Parque urbano e área de Mata Atlântica com trilhas controladas e atividades mediante regras locais."],
    ["Praia de Ponta Negra", "Praia", ["praia", "gastronomia", "familia"], "Praia urbana com vista para o Morro do Careca; observe restrições de acesso à duna e sinalização."],
    ["Forte dos Reis Magos", "Cultura", ["cultura", "arte"], "Fortificação histórica na foz do rio Potengi; confirme abertura para visitação antes de ir."],
    ["Passeio pelas dunas de Genipabu", "Aventura", ["aventura", "natureza", "familia"], "Passeios em dunas e lagoas na região metropolitana, oferecidos por operadores locais e sujeitos a reserva."]
  ], "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1100&q=85"),
  ...makeCityActivities("Búzios", [
    ["Orla Bardot", "Passeio urbano", ["cultura", "gastronomia", "familia"], "Calçadão à beira-mar com esculturas, vista da baía e acesso ao centro de Armação dos Búzios."],
    ["Praia de Geribá", "Praia", ["praia", "aventura"], "Praia extensa procurada para banho e surfe; condições variam conforme o mar."],
    ["Praia da Ferradura", "Praia", ["praia", "natureza", "familia"], "Enseada de águas geralmente abrigadas, com opções de atividades aquáticas conforme condições locais."],
    ["Rua das Pedras", "Gastronomia", ["gastronomia", "vida-noturna", "cultura"], "Rua central com restaurantes, lojas e bares; horários e programação variam por estabelecimento."]
  ], "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=85"),
  ...makeCityActivities("Aquiraz", [
    ["Beach Park", "Aventura", ["aventura", "familia"], "Complexo de parque aquático e praia no litoral de Aquiraz; ingresso, calendário e atrações devem ser confirmados no site oficial."],
    ["Praia de Porto das Dunas", "Praia", ["praia", "natureza", "familia"], "Praia do município de Aquiraz, próxima a resorts e ao complexo Beach Park."],
    ["Centro Histórico de Aquiraz", "Cultura", ["cultura", "arte"], "Área histórica com construções religiosas e referências à formação do Ceará."]
  ], "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1100&q=85")
];

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
  checklist: {}
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
  return trip;
}

function readStoredState() {
  const initial = { trips: [], currentTripId: null, hideAmounts: false, displayCurrency: "BRL", displayCurrencyRate: 1 };
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
      return initial;
    }
    if (value.trip) {
      const trip = migrateTrip({
        ...value.trip,
        interests: value.interests,
        saved: value.saved,
        dismissed: value.dismissed
      });
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

let storageNotice = "";
const state = readStoredState();
const elements = {
  views: [...document.querySelectorAll(".view")],
  tripNavigation: document.querySelector("#trip-navigation"),
  homeButton: document.querySelector("#home-button"),
  tripForm: document.querySelector("#trip-form"),
  tripName: document.querySelector("#trip-name"),
  tripStart: document.querySelector("#trip-start"),
  tripEnd: document.querySelector("#trip-end"),
  tripBudget: document.querySelector("#trip-budget"),
  destinationsList: document.querySelector("#destinations-list"),
  interestOptions: document.querySelector("#interest-options"),
  formStatus: document.querySelector("#form-status"),
  cityFilter: document.querySelector("#city-filter"),
  activityStage: document.querySelector("#activity-stage"),
  discoveryPosition: document.querySelector("#discovery-position"),
  swipeFeedback: document.querySelector("#swipe-feedback"),
  announcement: document.querySelector("#app-announcement")
};

let activeView = "home";
let activeTab = "about";
let currentActivityId = null;
let editingTripId = null;
let destinationSequence = 0;
let feedbackTimer = null;
let inspirationIndex = 0;
let clockTimer = null;
let displayAmounts = !state.hideAmounts;

const reflections = [
  { message: "Que a gratidão por chegar até aqui acompanhe cada passo do caminho.", place: "Dolomitas, Itália", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2000&q=90", verse: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.", reference: "1 Tessalonicenses 5:18" },
  { message: "Viajar é receber de presente o tempo, os encontros e a chance de olhar a vida de novo.", place: "Lago di Braies, Itália", image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2000&q=90", verse: "O Senhor é o meu pastor; nada me faltará.", reference: "Salmos 23:1" },
  { message: "Que cada paisagem lembre você: estar vivo, sonhar e partir também são bênçãos.", place: "Costa de Amalfi, Itália", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2000&q=90", verse: "Este é o dia que fez o Senhor; regozijemo-nos e alegremo-nos nele.", reference: "Salmos 118:24" },
  { message: "Agradeça pela oportunidade de ir, pela coragem de descobrir e por ter para onde voltar.", place: "Montanhas do mundo", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=90", verse: "Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.", reference: "Salmos 37:5" },
  { message: "Que a beleza de um lugar novo abra espaço para reconhecer as belezas que já existem em você.", place: "Lagoa, Islândia", image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=2000&q=90", verse: "O Senhor te guardará de todo o mal; guardará a tua alma.", reference: "Salmos 121:7" },
  { message: "Há beleza no caminho e também na pausa para contemplá-lo.", place: "Lago de montanha", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=90", verse: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.", reference: "Provérbios 3:5" },
  { message: "Que novos horizontes renovem a esperança e a alegria de seguir.", place: "Cinque Terre, Itália", image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2000&q=90", verse: "Regozijai-vos sempre no Senhor; outra vez digo, regozijai-vos.", reference: "Filipenses 4:4" },
  { message: "A vida floresce quando abrimos espaço para o que nos faz bem.", place: "Praia tropical", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=90", verse: "A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza.", reference: "2 Coríntios 12:9" },
  { message: "Em cada destino, que não faltem gentileza, presença e bons encontros.", place: "Vale verde", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=90", verse: "Agora, pois, permanecem a fé, a esperança e o amor, estes três; mas o maior destes é o amor.", reference: "1 Coríntios 13:13" },
  { message: "Que cada amanhecer traga motivos para agradecer e continuar sonhando.", place: "Mar aberto", image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2000&q=90", verse: "Não estejais inquietos por coisa alguma; antes, as vossas petições sejam em tudo conhecidas diante de Deus.", reference: "Filipenses 4:6" }
];

function getCurrentTrip() {
  return state.trips.find((trip) => trip.id === state.currentTripId) || null;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function formatCurrency(value, currency = "BRL", maximumFractionDigits = 0) {
  try {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency,
      maximumFractionDigits
    }).format(Number(value) || 0);
  } catch (error) {
    return `${Number(value) || 0} ${currency}`;
  }
}

function formatActivityPrice(activity) {
  if (activity.cost === null || activity.cost === undefined) return "Consulte valor";
  if (activity.cost === 0) return "Gratuito";
  return formatCurrency(activity.cost);
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

function getBrasiliaDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(date);
  const part = (type) => parts.find((item) => item.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function getCountdown(dateString) {
  const travelDate = parseLocalDate(dateString);
  const today = parseLocalDate(getBrasiliaDateKey());
  if (!travelDate || !today) return "Defina as datas";
  const days = Math.round((Date.UTC(travelDate.getUTCFullYear(), travelDate.getUTCMonth(), travelDate.getUTCDate())
    - Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())) / 86400000);
  if (days < 0) return "Viagem concluída";
  if (days === 0) return "É hoje! Boa viagem";
  return `Faltam ${days} ${days === 1 ? "dia" : "dias"}`;
}

function saveState() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.error("Não foi possível salvar os dados da viagem.", error);
    storageNotice = "Não foi possível salvar neste navegador. Verifique o espaço disponível ou as permissões.";
    elements.announcement.textContent = storageNotice;
    elements.formStatus.textContent = storageNotice;
    showFeedback(storageNotice);
    return false;
  }
}

function showFeedback(message) {
  elements.swipeFeedback.textContent = message;
  window.clearTimeout(feedbackTimer);
  if (message) feedbackTimer = window.setTimeout(() => { elements.swipeFeedback.textContent = ""; }, 3200);
}

function announce(message) {
  elements.announcement.textContent = "";
  window.requestAnimationFrame(() => { elements.announcement.textContent = message; });
}

function getActivity(id) {
  return activities.find((activity) => activity.id === id);
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

function addImageFallbacks(container) {
  container.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => { image.hidden = true; }, { once: true });
  });
}

function renderInspiration() {
  const item = reflections[inspirationIndex];
  const image = document.querySelector("#hero-image");
  image.src = item.image;
  image.alt = `Paisagem inspiradora: ${item.place}`;
  document.querySelector("#reflection-message").textContent = `“${item.message}”`;
  document.querySelector("#hero-location").textContent = item.place;
  document.querySelector("#home-verse-text").textContent = `“${item.verse}”`;
  document.querySelector("#home-verse-reference").textContent = item.reference;
  document.querySelector("#inspiration-position").textContent = `${String(inspirationIndex + 1).padStart(2, "0")} / ${String(reflections.length).padStart(2, "0")}`;
}

function changeInspiration(direction) {
  inspirationIndex = (inspirationIndex + direction + reflections.length) % reflections.length;
  renderInspiration();
}

function randomInspiration() {
  if (reflections.length < 2) return;
  const offset = 1 + Math.floor(Math.random() * (reflections.length - 1));
  inspirationIndex = (inspirationIndex + offset) % reflections.length;
  renderInspiration();
}

function renderHome() {
  const amountButton = document.querySelector("#toggle-home-amounts");
  amountButton.textContent = displayAmounts ? "◉" : "◎";
  amountButton.setAttribute("aria-label", displayAmounts ? "Ocultar valores" : "Mostrar valores");
  const container = document.querySelector("#trip-cards");
  const trips = [...state.trips].sort((a, b) => (a.startDate || "").localeCompare(b.startDate || ""));
  if (!trips.length) {
    container.innerHTML = `<div class="home-empty"><span>✦</span><h3>Sua próxima história começa aqui.</h3><p>Crie uma viagem para juntar destinos, lembranças e planos em um só lugar.</p><button class="primary-button" type="button" data-new-trip>Planejar minha primeira viagem →</button></div>`;
    return;
  }
  const next = trips.find((trip) => trip.endDate >= getBrasiliaDateKey()) || trips[0];
  container.innerHTML = trips.map((trip) => {
    const cities = trip.destinations.map((destination) => destination.name).filter(Boolean);
    const destination = cities.length ? cities.join(" · ") : trip.country || "Destino a definir";
    const forecast = getTripForecastBRL(trip);
    const budget = getBudgetInBRL(trip);
    const activeClass = trip.id === next.id ? " trip-card-next" : "";
    const hero = activities.find((activity) => cities.some((city) => activityMatchesCity(activity, city)))?.image
      || reflections[0].image;
    return `<article class="trip-card${activeClass}">
      <img src="${escapeHtml(hero)}" alt="" loading="lazy">
      <div class="trip-card-shade"></div>
      ${trip.id === next.id ? '<span class="next-trip-label">✦ PRÓXIMA VIAGEM</span>' : ""}
      <button class="trip-card-open" type="button" data-open-trip="${escapeHtml(trip.id)}" aria-label="Abrir viagem ${escapeHtml(trip.name || destination)}">
        <span class="trip-card-destination">${escapeHtml(destination)}</span>
        <strong>${escapeHtml(trip.name || "Minha viagem")}</strong>
        <span class="trip-card-date">${trip.startDate ? `${escapeHtml(formatDate(trip.startDate))} — ${escapeHtml(formatDate(trip.endDate, { day: "numeric", month: "short", year: "numeric" }))}` : "Datas a definir"}</span>
        <span class="trip-countdown">${escapeHtml(getCountdown(trip.startDate))}</span>
      </button>
      <div class="trip-card-finance"><span>PREVISÃO / LANÇADO</span><strong>${displayAmounts ? escapeHtml(formatCurrency(forecast, "BRL")) : "••••••"}</strong><small>Orçamento ${displayAmounts && budget ? escapeHtml(formatCurrency(budget, "BRL")) : displayAmounts ? "não definido" : "••••••"}</small></div>
    </article>`;
  }).join("");
  addImageFallbacks(container);
}

function goHome() {
  activeView = "home";
  elements.views.forEach((view) => {
    const active = view.id === "home-view";
    view.hidden = !active;
    view.classList.toggle("is-visible", active);
  });
  elements.tripNavigation.hidden = true;
  elements.homeButton.hidden = true;
  renderHome();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openTrip(id) {
  if (!state.trips.some((trip) => trip.id === id)) return;
  state.currentTripId = id;
  saveState();
  activeView = "trip";
  elements.views.forEach((view) => {
    const active = view.id === "trip-view";
    view.hidden = !active;
    view.classList.toggle("is-visible", active);
  });
  elements.tripNavigation.hidden = false;
  elements.homeButton.hidden = false;
  renderTripHeader();
  showTab("about");
}

function showTab(tabName) {
  activeTab = tabName;
  document.querySelectorAll(".trip-tab").forEach((section) => {
    const active = section.id === `tab-${tabName}`;
    section.hidden = !active;
  });
  document.querySelectorAll("[data-tab]").forEach((button) => {
    const active = button.dataset.tab === tabName;
    button.classList.toggle("is-active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  const renderers = {
    about: renderAbout,
    itinerary: renderItinerary,
    discover: renderDiscovery,
    expenses: renderExpenses,
    before: renderBefore
  };
  renderers[tabName]?.();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderTripHeader() {
  const trip = getCurrentTrip();
  if (!trip) return;
  const cities = trip.destinations.map((destination) => destination.name).filter(Boolean);
  const firstActivity = activities.find((activity) => cities.some((city) => activityMatchesCity(activity, city)));
  const coverImage = firstActivity?.image || reflections[0].image;
  const image = document.querySelector("#trip-cover-image");
  image.src = coverImage;
  image.alt = cities.length ? `Paisagem ilustrativa de ${cities[0]}` : "Paisagem inspiradora para viagem";
  document.querySelector("#trip-heading").textContent = trip.name || "Minha viagem";
  document.querySelector("#trip-cover-destination").textContent = cities.length ? cities.join(" · ") : trip.country || "DESTINO A DEFINIR";
  document.querySelector("#trip-cover-dates").textContent = trip.startDate
    ? `${formatDate(trip.startDate)} — ${formatDate(trip.endDate, { day: "numeric", month: "long", year: "numeric" })}`
    : "Datas a definir";
  document.querySelector("#trip-cover-countdown").textContent = getCountdown(trip.startDate);
  addImageFallbacks(document.querySelector("#trip-view"));
}

function formatTripMoney(value, trip, currency = trip.currency) {
  const amount = Number(value) || 0;
  return displayAmounts ? formatCurrency(amount, currency) : "••••••";
}

function renderBudgetCard() {
  const trip = getCurrentTrip();
  const budgetBRL = getBudgetInBRL(trip);
  const forecast = getTripForecastBRL(trip);
  const spent = getExpensesTotal(trip);
  document.querySelector("#trip-budget-total").textContent = formatTripMoney(trip.budget, trip);
  document.querySelector("#trip-budget-spent").textContent = `Gastos: ${formatTripMoney(spent, trip, "BRL")}`;
  document.querySelector("#trip-budget-left").textContent = budgetBRL
    ? `Saldo: ${formatTripMoney(budgetBRL - forecast, trip, "BRL")}`
    : "Defina um orçamento";
  document.querySelector("#trip-budget-progress").style.width = budgetBRL
    ? `${Math.min(100, (forecast / budgetBRL) * 100)}%`
    : "0%";
  document.querySelector("#toggle-budget-visibility").textContent = displayAmounts ? "◉" : "◎";
  document.querySelector("#toggle-budget-visibility").setAttribute("aria-label", displayAmounts ? "Ocultar valores" : "Mostrar valores");
}

function renderAbout() {
  const trip = getCurrentTrip();
  document.querySelector("#trip-overview-dates").textContent = trip.startDate
    ? `${formatDate(trip.startDate, { weekday: "long", day: "numeric", month: "long" })} — ${formatDate(trip.endDate, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`
    : "Datas ainda não definidas";
  document.querySelector("#trip-destination-list").innerHTML = trip.destinations.length
    ? trip.destinations.map((destination) => `<article class="destination-summary-card">
        <div class="destination-summary-date">${escapeHtml(formatDate(destination.startDate, { day: "numeric", month: "short" }))}<span>—</span>${escapeHtml(formatDate(destination.endDate, { day: "numeric", month: "short" }))}</div>
        <div><strong>${escapeHtml(destination.name)}</strong><p>${destination.lodgingName ? escapeHtml(destination.lodgingName) : "Hospedagem não informada"}${destination.lodgingAddress ? ` · ${escapeHtml(destination.lodgingAddress)}` : ""}</p></div>
      </article>`).join("")
    : '<p class="muted-copy">Ainda não há cidades cadastradas.</p>';
  const details = [
    trip.transport && `Transporte: ${trip.transport}`,
    trip.rentalCar && "Carro alugado",
    trip.companions && `Com: ${trip.companions}`,
    trip.children && "Crianças",
    trip.seniors && "Idosos"
  ].filter(Boolean);
  document.querySelector("#travel-details").innerHTML = details.length
    ? details.map((detail) => `<span class="detail-chip">${escapeHtml(detail)}</span>`).join("")
    : '<span class="muted-copy">Conte como você vai viajar ao editar a viagem.</span>';
  const selected = interests.filter((interest) => trip.interests.includes(interest.id));
  document.querySelector("#trip-interests").innerHTML = selected.length
    ? selected.map((interest) => `<span class="detail-chip">${escapeHtml(interest.label)}</span>`).join("")
    : '<span class="muted-copy">Nenhum interesse selecionado.</span>';
  renderBudgetCard();
}

function createDestinationCard(destination = {}) {
  const id = destination.id || `cidade-${++destinationSequence}`;
  const card = document.createElement("div");
  card.className = "destination-form-card";
  card.dataset.destinationId = id;
  card.innerHTML = `<div class="destination-form-heading"><span>⌖ Destino</span><button class="remove-destination" type="button">Remover</button></div>
    <div class="destination-fields">
      <label class="field field-wide">Cidade<input name="destinationName" list="destination-city-options" maxlength="80" value="${escapeHtml(destination.name || "")}" placeholder="Ex.: Salvador" required></label>
      <label class="field">Chegada<input name="destinationStart" type="date" value="${escapeHtml(destination.startDate || "")}" required></label>
      <label class="field">Saída<input name="destinationEnd" type="date" value="${escapeHtml(destination.endDate || "")}" required></label>
      <label class="field">Hospedagem<input name="lodgingName" maxlength="100" value="${escapeHtml(destination.lodgingName || "")}" placeholder="Ex.: Pousada do Centro"></label>
      <label class="field">Endereço<input name="lodgingAddress" maxlength="180" value="${escapeHtml(destination.lodgingAddress || "")}" placeholder="Rua, número, bairro"></label>
    </div>`;
  return card;
}

function renderTripForm() {
  const trip = editingTripId ? state.trips.find((item) => item.id === editingTripId) : null;
  const form = elements.tripForm;
  form.reset();
  elements.tripName.value = trip?.name || "";
  elements.tripStart.value = trip?.startDate || "";
  elements.tripEnd.value = trip?.endDate || "";
  elements.tripBudget.value = trip?.budget || "";
  document.querySelector("#trip-currency").value = trip?.currency || "BRL";
  document.querySelector("#budget-exchange-rate").value = trip?.budgetExchangeRate || 1;
  document.querySelector("#trip-country").value = trip?.country || "Brasil";
  document.querySelector("#trip-transport").value = trip?.transport || "";
  document.querySelector("#trip-rental-car").value = trip?.rentalCar ? "sim" : "nao";
  document.querySelector("#trip-companions").value = trip?.companions || "";
  document.querySelector("#trip-with-children").checked = Boolean(trip?.children);
  document.querySelector("#trip-with-seniors").checked = Boolean(trip?.seniors);
  document.querySelector("#trip-form-title").innerHTML = trip ? "Sua viagem,<br><span>do seu jeito.</span>" : "Vamos sonhar<br><span>essa viagem?</span>";
  document.querySelector("#destination-city-options").innerHTML = [...new Set(activities.map((activity) => activity.city))]
    .sort((a, b) => a.localeCompare(b, "pt-BR"))
    .map((city) => `<option value="${escapeHtml(city)}"></option>`).join("");
  elements.destinationsList.replaceChildren();
  (trip?.destinations?.length ? trip.destinations : [{}]).forEach((destination) => elements.destinationsList.append(createDestinationCard(destination)));
  elements.interestOptions.innerHTML = interests.map((interest) => `<label class="interest-option">
    <input type="checkbox" name="interest" value="${escapeHtml(interest.id)}" ${(trip?.interests || ["natureza", "gastronomia", "cultura"]).includes(interest.id) ? "checked" : ""}>
    <span>${escapeHtml(interest.label)}</span></label>`).join("");
  elements.formStatus.textContent = storageNotice;
  document.querySelector("#trip-form-view").hidden = false;
  document.querySelector("#trip-view").hidden = true;
  document.querySelector("#home-view").hidden = true;
  elements.tripNavigation.hidden = true;
  elements.homeButton.hidden = false;
  activeView = "trip-form";
  elements.views.forEach((view) => view.classList.toggle("is-visible", view.id === "trip-form-view"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function collectDestinations() {
  return [...elements.destinationsList.querySelectorAll(".destination-form-card")].map((card) => ({
    id: card.dataset.destinationId,
    name: card.querySelector('[name="destinationName"]').value.trim(),
    startDate: card.querySelector('[name="destinationStart"]').value,
    endDate: card.querySelector('[name="destinationEnd"]').value,
    lodgingName: card.querySelector('[name="lodgingName"]').value.trim(),
    lodgingAddress: card.querySelector('[name="lodgingAddress"]').value.trim()
  }));
}

function validateTrip(trip) {
  const start = parseLocalDate(trip.startDate);
  const end = parseLocalDate(trip.endDate);
  if (!trip.name) return "Dê um nome para esta viagem.";
  if (!start || !end || start > end) return "Confira as datas: a volta não pode ser antes do início.";
  if (!trip.destinations.length) return "Adicione pelo menos uma cidade ao seu roteiro.";
  for (const destination of trip.destinations) {
    const cityStart = parseLocalDate(destination.startDate);
    const cityEnd = parseLocalDate(destination.endDate);
    if (!destination.name || !cityStart || !cityEnd) return "Preencha a cidade e as datas de chegada e saída.";
    if (cityStart > cityEnd || cityStart < start || cityEnd > end) return `Confira as datas de ${destination.name}: elas devem ficar dentro da viagem.`;
  }
  return "";
}

function saveTrip(event) {
  event.preventDefault();
  const existing = editingTripId ? state.trips.find((trip) => trip.id === editingTripId) : null;
  const trip = migrateTrip({
    ...(existing || blankTrip()),
    name: elements.tripName.value.trim(),
    startDate: elements.tripStart.value,
    endDate: elements.tripEnd.value,
    budget: Number(elements.tripBudget.value) || 0,
    currency: document.querySelector("#trip-currency").value,
    country: document.querySelector("#trip-country").value.trim() || "Brasil",
    budgetExchangeRate: Number(document.querySelector("#budget-exchange-rate").value) || 1,
    destinations: collectDestinations(),
    transport: document.querySelector("#trip-transport").value,
    rentalCar: document.querySelector("#trip-rental-car").value === "sim",
    companions: document.querySelector("#trip-companions").value.trim(),
    children: document.querySelector("#trip-with-children").checked,
    seniors: document.querySelector("#trip-with-seniors").checked,
    interests: [...elements.interestOptions.querySelectorAll('input[name="interest"]:checked')].map((input) => input.value)
  });
  const message = validateTrip(trip);
  if (message) {
    elements.formStatus.textContent = message;
    announce(message);
    return;
  }
  const previous = existing ? { ...existing } : null;
  if (existing) Object.assign(existing, trip);
  else state.trips.push(trip);
  state.currentTripId = trip.id;
  if (!saveState()) {
    if (previous) Object.assign(existing, previous);
    else state.trips = state.trips.filter((item) => item.id !== trip.id);
    return;
  }
  editingTripId = null;
  announce("Viagem salva.");
  openTrip(trip.id);
}

function activityMatchesCity(activity, cityName) {
  return activity.city.localeCompare(cityName, "pt-BR", { sensitivity: "base" }) === 0;
}

function getDiscoverableActivities(trip) {
  const city = elements.cityFilter.value;
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

function renderCityFilter() {
  const trip = getCurrentTrip();
  const previous = elements.cityFilter.value || "all";
  const cities = [...new Set(trip.destinations.map((destination) => destination.name.trim()).filter(Boolean))];
  elements.cityFilter.innerHTML = '<option value="all">Todas as cidades</option>'
    + cities.map((city) => `<option value="${escapeHtml(city)}">${escapeHtml(city)}</option>`).join("");
  elements.cityFilter.value = cities.some((city) => activityMatchesCity({ city }, previous)) ? previous : "all";
}

function renderDiscovery() {
  const trip = getCurrentTrip();
  if (!trip || activeView !== "trip") return;
  renderCityFilter();
  const ideas = getDiscoverableActivities(trip);
  currentActivityId = ideas[0]?.id || null;
  document.querySelector("#skip-activity").disabled = !currentActivityId;
  document.querySelector("#maybe-activity").disabled = !currentActivityId;
  document.querySelector("#like-activity").disabled = !currentActivityId;
  elements.discoveryPosition.textContent = `${ideas.length} ${ideas.length === 1 ? "ideia" : "ideias"}`;
  document.querySelector("#discovery-saved-count").textContent = String(trip.saved.length);
  document.querySelector("#maybe-count").textContent = `(${trip.maybe.length})`;
  document.querySelector("#saved-preview-list").innerHTML = trip.saved.length
    ? getTripActivities(trip).map(({ activity }) => `<div class="preview-item"><img class="preview-thumb" src="${escapeHtml(activity.image)}" alt=""><span><strong>${escapeHtml(activity.name)}</strong><small>${escapeHtml(activity.city)}</small></span></div>`).join("")
    : '<p class="preview-empty">Os lugares que você curtir ficam por aqui.</p>';
  document.querySelector("#maybe-preview-list").innerHTML = trip.maybe.length
    ? getTripActivities(trip, "maybe").map(({ activity }) => `<button class="preview-item maybe-item" type="button" data-maybe-save="${escapeHtml(activity.id)}"><img class="preview-thumb" src="${escapeHtml(activity.image)}" alt=""><span><strong>${escapeHtml(activity.name)}</strong><small>${escapeHtml(activity.city)} · tocar para curtir</small></span></button>`).join("")
    : '<p class="preview-empty">Ainda não há ideias para rever.</p>';
  if (!ideas.length) {
    elements.activityStage.innerHTML = '<div class="empty-state"><span class="empty-illustration">✳</span><h3>Você explorou todas as ideias deste filtro.</h3><p>Troque de cidade ou revise as ideias em “Talvez depois”.</p></div>';
    return;
  }
  const activity = ideas[0];
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${activity.name}, ${activity.city}, Brasil`)}`;
  const tripadvisorUrl = `https://www.tripadvisor.com/Search?q=${encodeURIComponent(`${activity.name} ${activity.city}`)}`;
  elements.activityStage.innerHTML = `<article class="activity-card" data-activity-id="${escapeHtml(activity.id)}">
    <div class="activity-photo"><img src="${escapeHtml(activity.image)}" alt="Imagem ilustrativa de ${escapeHtml(activity.name)}" draggable="false"><span class="photo-tag">${escapeHtml(activity.category)}</span></div>
    <div class="activity-info"><p class="activity-location">⌖ ${escapeHtml(activity.city)}</p><h3>${escapeHtml(activity.name)}</h3><p class="activity-description">${escapeHtml(activity.description)}</p>
      <div class="activity-facts"><div class="activity-fact"><span class="fact-icon">◷</span><span>${escapeHtml(activity.schedule)}</span></div><div class="activity-fact"><span class="fact-icon">⌖</span><span>${escapeHtml(activity.city)} · Brasil</span></div></div>
      <div class="rating-line">Consulte avaliações atualizadas nos sites de viagem.</div><div class="activity-source-links"><a href="${mapsUrl}" target="_blank" rel="noopener noreferrer">Google Maps ↗</a><a href="${tripadvisorUrl}" target="_blank" rel="noopener noreferrer">Tripadvisor ↗</a></div>
      <div class="activity-bottom"><span class="activity-cost-label">VALOR<strong class="activity-cost">${escapeHtml(formatActivityPrice(activity))}</strong></span><button class="save-small" data-save-activity="${escapeHtml(activity.id)}" type="button">Quero conhecer →</button></div>
    </div></article>`;
  addImageFallbacks(elements.activityStage);
  attachSwipeHandlers(elements.activityStage.querySelector(".activity-card"));
}

function addActivityToPlan(id) {
  const trip = getCurrentTrip();
  const activity = getActivity(id);
  if (!trip || !activity || trip.saved.some((item) => item.id === id)) return;
  const destination = trip.destinations.find((item) => activityMatchesCity(activity, item.name));
  trip.saved.push({ id, date: destination?.startDate || trip.startDate, time: "09:00" });
  trip.maybe = trip.maybe.filter((item) => item.id !== id);
  if (!saveState()) return;
  showFeedback(`${activity.name} adicionada ao roteiro.`);
  announce(`${activity.name} adicionada ao roteiro.`);
  renderDiscovery();
}

function markMaybe(id) {
  const trip = getCurrentTrip();
  const activity = getActivity(id);
  if (!trip || !activity || trip.maybe.some((item) => item.id === id)) return;
  trip.maybe.push({ id });
  if (!saveState()) return;
  showFeedback(`${activity.name} guardada para pensar depois.`);
  announce(`${activity.name} guardada em talvez depois.`);
  renderDiscovery();
}

function dismissActivity(id) {
  const trip = getCurrentTrip();
  if (!trip || !id || trip.dismissed.includes(id)) return;
  trip.dismissed.push(id);
  if (!saveState()) return;
  showFeedback("Ideia descartada.");
  renderDiscovery();
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
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  card.insertAdjacentHTML("beforeend",
    '<span class="swipe-badge badge-like" aria-hidden="true">QUERO ♥</span>'
    + '<span class="swipe-badge badge-skip" aria-hidden="true">PASSAR ×</span>'
    + '<span class="swipe-badge badge-maybe" aria-hidden="true">TALVEZ ♡</span>');
  let startX = null;
  let startY = null;
  let dx = 0;
  let dy = 0;
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
    card.style.setProperty("--" + mode, 1);
    card.style.transform = exit;
    card.style.opacity = "0";
    window.setTimeout(() => {
      action(id);
      if (card.isConnected) reset();
    }, 220);
  };

  activeSwipe = { card, commit };

  card.addEventListener("pointerdown", (event) => {
    if (busy || event.target.closest("button, a")) return;
    startX = event.clientX;
    startY = event.clientY;
    card.classList.add("is-dragging");
    card.setPointerCapture(event.pointerId);
  });
  card.addEventListener("pointermove", (event) => {
    if (startX === null || busy) return;
    dx = event.clientX - startX;
    dy = event.clientY - startY;
    paint();
  });
  card.addEventListener("pointerup", () => {
    if (startX === null) return;
    startX = null;
    const { mode, progress } = paint();
    if (mode && progress >= 1) commit(mode);
    else reset();
  });
  card.addEventListener("pointercancel", () => {
    startX = null;
    if (!busy) reset();
  });
}

function getTripDays(trip) {
  if (!trip.startDate || !trip.endDate) return [];
  const days = [];
  const start = parseLocalDate(trip.startDate);
  const end = parseLocalDate(trip.endDate);
  for (let date = start; date <= end && days.length < 60; date.setUTCDate(date.getUTCDate() + 1)) {
    days.push(`${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`);
  }
  return days;
}

function renderItinerary() {
  const trip = getCurrentTrip();
  const container = document.querySelector("#itinerary-content");
  const days = getTripDays(trip);
  if (!days.length) {
    container.innerHTML = '<div class="planner-empty"><strong>Defina as datas da viagem para montar seu roteiro.</strong><span>Depois, adicione compromissos manualmente ou guarde atrações na aba Descobrir.</span></div>';
    return;
  }
  document.querySelector("#manual-event-date").innerHTML = days
    .map((date) => `<option value="${date}">${escapeHtml(formatDate(date, { weekday: "short", day: "numeric", month: "short" }))}</option>`)
    .join("");
  container.innerHTML = days.map((date) => {
    const destination = trip.destinations.find((item) => item.startDate <= date && item.endDate >= date);
    const events = trip.itinerary.filter((event) => event.date === date);
    const saved = getTripActivities(trip).filter((item) => item.date === date)
      .map(({ id, date: itemDate, time, activity }) => ({ id, date: itemDate, time: time || "09:00", title: activity.name, city: activity.city, image: activity.image, type: "activity", cost: activity.cost }));
    const schedule = [...events, ...saved].sort((a, b) => (a.time || "").localeCompare(b.time || ""));
    return `<section class="itinerary-day" data-drop-date="${date}">
      <header class="itinerary-day-heading"><span class="day-date"><strong>${parseLocalDate(date).getDate()}</strong><small>${escapeHtml(formatDate(date, { month: "short" }).replace(".", ""))}</small></span><div><h3>${escapeHtml(formatDate(date, { weekday: "long" }))}</h3><p>${escapeHtml(destination?.name || "Dia livre")} · ${schedule.length} ${schedule.length === 1 ? "parada" : "paradas"}</p></div><button type="button" class="add-day-item" data-add-day="${date}">+ incluir</button></header>
      <div class="itinerary-day-items">${schedule.length ? schedule.map((item) => `<article class="itinerary-item" draggable="true" data-item-id="${escapeHtml(item.id)}" data-item-type="${item.type}">
        <span class="drag-handle" aria-hidden="true">⠿</span>${item.image ? `<img src="${escapeHtml(item.image)}" alt="">` : '<span class="manual-event-icon">◷</span>'}
        <div class="planner-activity-info"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.city || item.category || "Compromisso manual")}</span></div>
        <label class="visually-hidden" for="time-${escapeHtml(item.id)}">Horário de ${escapeHtml(item.title)}</label><input id="time-${escapeHtml(item.id)}" type="time" value="${escapeHtml(item.time || "09:00")}" data-time-id="${escapeHtml(item.id)}" data-time-type="${item.type}">
        <button class="remove-activity" type="button" data-remove-itinerary="${escapeHtml(item.id)}" data-item-type="${item.type}" aria-label="Remover ${escapeHtml(item.title)}">×</button></article>`).join("") : '<p class="day-empty">Um espaço em branco também faz parte de uma boa viagem.</p>'}</div>
    </section>`;
  }).join("");
  addImageFallbacks(container);
  container.querySelectorAll(".itinerary-item").forEach((item) => {
    item.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", JSON.stringify({ id: item.dataset.itemId, type: item.dataset.itemType }));
      event.dataTransfer.effectAllowed = "move";
    });
  });
  container.querySelectorAll("[data-drop-date]").forEach((day) => {
    day.addEventListener("dragover", (event) => { event.preventDefault(); day.classList.add("is-drop-target"); });
    day.addEventListener("dragleave", () => day.classList.remove("is-drop-target"));
    day.addEventListener("drop", (event) => {
      event.preventDefault();
      day.classList.remove("is-drop-target");
      const data = JSON.parse(event.dataTransfer.getData("text/plain"));
      moveItineraryItem(data.id, data.type, day.dataset.dropDate);
    });
  });
}

function moveItineraryItem(id, type, date) {
  const trip = getCurrentTrip();
  const item = type === "activity" ? trip.saved.find((saved) => saved.id === id) : trip.itinerary.find((event) => event.id === id);
  if (!item) return;
  if (type === "activity") {
    const destination = trip.destinations.find((entry) => activityMatchesCity(getActivity(id), entry.name));
    if (destination && (date < destination.startDate || date > destination.endDate)) {
      showFeedback(`Esta atração é de ${destination.name}; escolha um dia durante essa parada.`);
      renderItinerary();
      return;
    }
  }
  item.date = date;
  if (type === "activity") item.time ||= "09:00";
  saveState();
  renderItinerary();
  announce("Compromisso movido para outro dia.");
}

function generateItinerary() {
  const trip = getCurrentTrip();
  const days = getTripDays(trip);
  if (!days.length) return;
  if (!trip.saved.length) {
    showFeedback("Curta algumas atrações na aba Descobrir antes de montar uma sugestão.");
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
  showFeedback("Sugestão distribuída por regras locais. Revise horários e deslocamentos antes de seguir.");
}

function renderExpenses() {
  const trip = getCurrentTrip();
  const expenses = [...trip.expenses].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const spent = getExpensesTotal(trip);
  const forecast = getTripForecastBRL(trip);
  document.querySelector("#finance-budget").textContent = formatTripMoney(trip.budget, trip);
  document.querySelector("#finance-spent").textContent = formatTripMoney(spent, trip, "BRL");
  document.querySelector("#finance-forecast").textContent = formatTripMoney(forecast, trip, "BRL");
  document.querySelector("#display-currency").value = state.displayCurrency || "BRL";
  document.querySelector("#display-exchange-rate").value = state.displayCurrencyRate || 1;
  const rate = state.displayCurrency === "BRL" ? 1 : Number(state.displayCurrencyRate);
  document.querySelectorAll("#finance-budget, #finance-spent, #finance-forecast").forEach((node) => {
    const baseAmount = node.id === "finance-budget" ? getBudgetInBRL(trip) : node.id === "finance-spent" ? spent : forecast;
    node.textContent = displayAmounts
      ? (rate > 0 ? formatCurrency(baseAmount / rate, state.displayCurrency) : "Informe a cotação")
      : "••••••";
  });
  document.querySelector("#toggle-expense-visibility").textContent = displayAmounts ? "Ocultar valores" : "Mostrar valores";
  const list = document.querySelector("#expense-list");
  list.innerHTML = expenses.length ? expenses.map((expense) => {
    const category = expense.category.charAt(0).toUpperCase() + expense.category.slice(1);
    return `<article class="expense-row"><span class="expense-category-icon">${categoryIcon(expense.category)}</span><div class="expense-description"><strong>${escapeHtml(expense.description)}</strong><small>${escapeHtml(category)} · ${escapeHtml(formatDate(expense.date, { day: "numeric", month: "short", year: "numeric" }))}</small></div><span class="expense-original">${displayAmounts ? escapeHtml(formatCurrency(expense.amount, expense.currency, 2)) : "••••"}</span><span class="expense-converted">${displayAmounts ? escapeHtml(formatCurrency(expense.amountBRL, "BRL", 2)) : "••••"}</span><button class="remove-activity" type="button" data-remove-expense="${escapeHtml(expense.id)}" aria-label="Remover despesa ${escapeHtml(expense.description)}">×</button></article>`;
  }).join("") : '<div class="planner-empty"><strong>Nenhuma despesa registrada.</strong><span>Adicione gastos de transporte, hospedagem, alimentação, atrações, compras e outras categorias.</span></div>';
}

function categoryIcon(category) {
  return ({ transporte: "↗", hospedagem: "⌂", alimentacao: "⌁", atracoes: "✳", compras: "◇", seguro: "♡", outros: "＋" })[category] || "＋";
}

function renderBefore() {
  const trip = getCurrentTrip();
  document.querySelectorAll("[data-checklist]").forEach((input) => {
    input.checked = Boolean(trip.checklist[input.dataset.checklist]);
  });
}

function startNewTrip() {
  editingTripId = null;
  renderTripForm();
}

function updateClock() {
  const clock = document.querySelector("#brazil-clock");
  if (clock) clock.textContent = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit", hour12: false
  }).format(new Date());
}

document.querySelectorAll("[data-home]").forEach((button) => button.addEventListener("click", goHome));
document.querySelector("#trip-cards").addEventListener("click", (event) => {
  const openButton = event.target.closest("[data-open-trip]");
  if (openButton) openTrip(openButton.dataset.openTrip);
  if (event.target.closest("[data-new-trip]")) startNewTrip();
});
elements.homeButton.addEventListener("click", goHome);
elements.tripNavigation.addEventListener("click", (event) => {
  const button = event.target.closest("[data-tab]");
  if (button) showTab(button.dataset.tab);
});
document.querySelector("#trip-view").addEventListener("click", (event) => {
  const button = event.target.closest("[data-tab]");
  if (button) showTab(button.dataset.tab);
});
document.querySelector("#edit-trip-button").addEventListener("click", () => {
  editingTripId = getCurrentTrip()?.id || null;
  renderTripForm();
});
document.querySelector("#previous-inspiration").addEventListener("click", () => changeInspiration(-1));
document.querySelector("#next-inspiration").addEventListener("click", () => changeInspiration(1));
document.querySelector("#toggle-budget-visibility").addEventListener("click", () => {
  displayAmounts = !displayAmounts;
  state.hideAmounts = !displayAmounts;
  saveState();
  renderAbout();
  renderHome();
});
document.querySelector("#toggle-home-amounts").addEventListener("click", () => {
  displayAmounts = !displayAmounts;
  state.hideAmounts = !displayAmounts;
  saveState();
  renderHome();
  if (activeTab === "about") renderAbout();
  if (activeTab === "expenses") renderExpenses();
});
document.querySelector("#toggle-expense-visibility").addEventListener("click", () => {
  displayAmounts = !displayAmounts;
  state.hideAmounts = !displayAmounts;
  saveState();
  renderExpenses();
});
document.querySelector("#city-filter").addEventListener("change", renderDiscovery);
document.querySelector("#skip-activity").addEventListener("click", () => triggerSwipe("skip"));
document.querySelector("#maybe-activity").addEventListener("click", () => triggerSwipe("maybe"));
document.querySelector("#like-activity").addEventListener("click", () => triggerSwipe("like"));
elements.activityStage.addEventListener("click", (event) => {
  const button = event.target.closest("[data-save-activity]");
  if (button) addActivityToPlan(button.dataset.saveActivity);
});
document.querySelector("#maybe-preview-list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-maybe-save]");
  if (button) addActivityToPlan(button.dataset.maybeSave);
});
document.querySelector("#add-destination").addEventListener("click", () => {
  elements.destinationsList.append(createDestinationCard({
    startDate: elements.tripStart.value,
    endDate: elements.tripEnd.value
  }));
});
elements.destinationsList.addEventListener("click", (event) => {
  const button = event.target.closest(".remove-destination");
  if (button && elements.destinationsList.children.length > 1) button.closest(".destination-form-card").remove();
  else if (button) elements.formStatus.textContent = "Adicione outra cidade antes de remover esta.";
});
elements.tripForm.addEventListener("submit", saveTrip);
document.querySelector("#add-itinerary-button").addEventListener("click", () => {
  renderItinerary();
  document.querySelector("#manual-event-form").hidden = false;
  document.querySelector("#manual-event-title").focus();
});
document.querySelector("#manual-event-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const trip = getCurrentTrip();
  const data = new FormData(event.currentTarget);
  trip.itinerary.push({
    id: `evento-${Date.now()}`,
    title: String(data.get("title")).trim(),
    category: String(data.get("category")),
    date: String(data.get("date")),
    time: String(data.get("time") || "09:00"),
    type: "manual"
  });
  saveState();
  event.currentTarget.reset();
  event.currentTarget.hidden = true;
  renderItinerary();
});
document.querySelector("#cancel-manual-event").addEventListener("click", () => {
  document.querySelector("#manual-event-form").hidden = true;
});
document.querySelector("#itinerary-content").addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add-day]");
  if (addButton) {
    const form = document.querySelector("#manual-event-form");
    form.elements.date.value = addButton.dataset.addDay;
    form.hidden = false;
    document.querySelector("#manual-event-title").focus();
  }
  const remove = event.target.closest("[data-remove-itinerary]");
  if (remove) {
    const trip = getCurrentTrip();
    if (remove.dataset.itemType === "activity") trip.saved = trip.saved.filter((item) => item.id !== remove.dataset.removeItinerary);
    else trip.itinerary = trip.itinerary.filter((item) => item.id !== remove.dataset.removeItinerary);
    saveState();
    renderItinerary();
  }
});
document.querySelector("#itinerary-content").addEventListener("change", (event) => {
  const input = event.target.closest("[data-time-id]");
  if (!input) return;
  const trip = getCurrentTrip();
  const collection = input.dataset.timeType === "activity" ? trip.saved : trip.itinerary;
  const item = collection.find((entry) => entry.id === input.dataset.timeId);
  if (item) item.time = input.value;
  saveState();
});
document.querySelector("#itinerary-content").addEventListener("dragend", () => {
  document.querySelectorAll(".is-drop-target").forEach((element) => element.classList.remove("is-drop-target"));
});
document.querySelector("#generate-itinerary").addEventListener("click", generateItinerary);
document.querySelector("#expense-form").elements.date.value = getBrasiliaDateKey();
document.querySelector("#expense-form").elements.currency.addEventListener("change", (event) => {
  document.querySelector("#expense-form").elements.exchangeRate.value = event.target.value === "BRL" ? "1" : "";
});
document.querySelector("#expense-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const trip = getCurrentTrip();
  const data = new FormData(event.currentTarget);
  const amount = Number(data.get("amount"));
  const exchangeRate = Number(data.get("exchangeRate"));
  if (!(amount > 0) || !(exchangeRate > 0)) {
    announce("Informe um valor e uma cotação maiores que zero.");
    return;
  }
  trip.expenses.push({
    id: `despesa-${Date.now()}`,
    description: String(data.get("description")).trim(),
    category: String(data.get("category")),
    amount,
    currency: String(data.get("currency")),
    exchangeRate,
    amountBRL: amount * exchangeRate,
    date: String(data.get("date"))
  });
  if (!saveState()) return;
  event.currentTarget.reset();
  event.currentTarget.elements.date.value = getBrasiliaDateKey();
  event.currentTarget.elements.exchangeRate.value = 1;
  renderExpenses();
  renderAbout();
  announce("Despesa registrada.");
});
document.querySelector("#expense-list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-expense]");
  if (!button) return;
  const trip = getCurrentTrip();
  trip.expenses = trip.expenses.filter((expense) => expense.id !== button.dataset.removeExpense);
  saveState();
  renderExpenses();
  renderAbout();
});
document.querySelector("#display-currency").addEventListener("change", (event) => {
  state.displayCurrency = event.target.value;
  const rateField = document.querySelector("#display-exchange-rate");
  rateField.value = event.target.value === "BRL" ? "1" : "";
  state.displayCurrencyRate = Number(rateField.value) || 0;
  saveState();
  renderExpenses();
});
document.querySelector("#display-exchange-rate").addEventListener("change", (event) => {
  state.displayCurrencyRate = Number(event.target.value) || 0;
  saveState();
  renderExpenses();
});
document.querySelectorAll("[data-checklist]").forEach((input) => input.addEventListener("change", () => {
  const trip = getCurrentTrip();
  trip.checklist[input.dataset.checklist] = input.checked;
  saveState();
}));
document.addEventListener("keydown", (event) => {
  if (activeView !== "trip" || activeTab !== "discover" || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.target.closest("input, select, textarea, button, a, [contenteditable='true']")) return;
  if (!currentActivityId) return;
  if (event.key === "ArrowLeft") triggerSwipe("skip");
  if (event.key === "ArrowRight") triggerSwipe("like");
  if (event.key === "ArrowDown") {
    event.preventDefault();
    triggerSwipe("maybe");
  }
});

document.querySelector("#new-trip-button").addEventListener("click", startNewTrip);
document.querySelector("#trip-form").addEventListener("input", () => {
  if (elements.formStatus.textContent === storageNotice) elements.formStatus.textContent = "";
});
renderInspiration();
renderHome();
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.setInterval(randomInspiration, 15000);
}
updateClock();
clockTimer = window.setInterval(updateClock, 30000);
