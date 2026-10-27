// Gera dados/atracoes-cidades.js com atrações de 250 cidades a partir de fontes abertas:
// Wikidata (lugares num raio de 50 km do centro, tipo, coordenadas, site oficial, foto),
// Wikipedia em português (resumo) e Wikimedia Commons (licença e autor da foto).
//
// Uso: node ferramentas/gerar-atracoes-cidades.mjs
// Requer Node 18+ e internet. Leva alguns minutos. Rode de novo para atualizar.
//
// Regras: só entram lugares com artigo na Wikipedia em português; fotos só com licença
// livre identificada; nada de notas, preços ou horários (essas fontes não têm).

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const USER_AGENT = "ViagemNaMao/0.1 (prototipo nao comercial; https://github.com/ggabrielsilveira-ux/viagem-na-mao)";
const RADIUS_KM = 50;
const PER_CITY = 25;
const PAUSE_MS = 300;

// [nome no app, título da página na Wikipedia pt (para o centro da cidade), país]
const CITIES = [
  ["Rio de Janeiro", "Rio de Janeiro", "Brasil"], ["Paraty", "Paraty", "Brasil"], ["Gramado", "Gramado", "Brasil"],
  ["Canela", "Canela (Rio Grande do Sul)", "Brasil"], ["Florianópolis", "Florianópolis", "Brasil"], ["Curitiba", "Curitiba", "Brasil"],
  ["São Paulo", "São Paulo", "Brasil"], ["Foz do Iguaçu", "Foz do Iguaçu", "Brasil"], ["Salvador", "Salvador (Bahia)", "Brasil"],
  ["Recife", "Recife", "Brasil"], ["Olinda", "Olinda", "Brasil"], ["Fortaleza", "Fortaleza", "Brasil"],
  ["Brasília", "Brasília", "Brasil"], ["Belo Horizonte", "Belo Horizonte", "Brasil"], ["Bonito", "Bonito (Mato Grosso do Sul)", "Brasil"],
  ["Manaus", "Manaus", "Brasil"], ["Porto Alegre", "Porto Alegre", "Brasil"], ["João Pessoa", "João Pessoa", "Brasil"],
  ["Natal", "Natal (Rio Grande do Norte)", "Brasil"], ["Búzios", "Armação dos Búzios", "Brasil"], ["Aquiraz", "Aquiraz", "Brasil"],
  ["Maceió", "Maceió", "Brasil"], ["Aracaju", "Aracaju", "Brasil"], ["São Luís", "São Luís (Maranhão)", "Brasil"],
  ["Belém", "Belém (Pará)", "Brasil"], ["Porto Seguro", "Porto Seguro", "Brasil"], ["Ilhéus", "Ilhéus", "Brasil"],
  ["Itacaré", "Itacaré", "Brasil"], ["Lençóis", "Lençóis", "Brasil"], ["Praia do Forte", "Praia do Forte (Mata de São João)", "Brasil"],
  ["Goiânia", "Goiânia", "Brasil"], ["Pirenópolis", "Pirenópolis", "Brasil"], ["Caldas Novas", "Caldas Novas", "Brasil"],
  ["Campo Grande", "Campo Grande (Mato Grosso do Sul)", "Brasil"], ["Cuiabá", "Cuiabá", "Brasil"], ["Chapada dos Guimarães", "Chapada dos Guimarães", "Brasil"],
  ["Ouro Preto", "Ouro Preto", "Brasil"], ["Tiradentes", "Tiradentes (Minas Gerais)", "Brasil"], ["Diamantina", "Diamantina", "Brasil"],
  ["Petrópolis", "Petrópolis", "Brasil"], ["Arraial do Cabo", "Arraial do Cabo", "Brasil"], ["Angra dos Reis", "Angra dos Reis", "Brasil"],
  ["Ilhabela", "Ilhabela", "Brasil"], ["Ubatuba", "Ubatuba", "Brasil"], ["Campos do Jordão", "Campos do Jordão", "Brasil"],
  ["Santos", "Santos (São Paulo)", "Brasil"], ["Campinas", "Campinas", "Brasil"], ["Balneário Camboriú", "Balneário Camboriú", "Brasil"],
  ["Blumenau", "Blumenau", "Brasil"], ["Bento Gonçalves", "Bento Gonçalves (Rio Grande do Sul)", "Brasil"], ["Vitória", "Vitória (Espírito Santo)", "Brasil"],
  ["Jericoacoara", "Jijoca de Jericoacoara", "Brasil"], ["Fernando de Noronha", "Fernando de Noronha", "Brasil"], ["Porto de Galinhas", "Porto de Galinhas", "Brasil"],
  ["Barreirinhas", "Barreirinhas", "Brasil"], ["Alter do Chão", "Alter do Chão (Santarém)", "Brasil"], ["Maragogi", "Maragogi", "Brasil"],
  ["Teresina", "Teresina", "Brasil"], ["Palmas", "Palmas (Tocantins)", "Brasil"], ["Joinville", "Joinville", "Brasil"],
  ["Lisboa", "Lisboa", "Portugal"], ["Porto", "Porto", "Portugal"], ["Buenos Aires", "Buenos Aires", "Argentina"],
  ["Santiago", "Santiago (Chile)", "Chile"], ["Bariloche", "San Carlos de Bariloche", "Argentina"], ["Montevidéu", "Montevidéu", "Uruguai"],
  ["Punta del Este", "Punta del Este", "Uruguai"], ["Lima", "Lima", "Peru"], ["Cusco", "Cusco", "Peru"],
  ["Cartagena", "Cartagena das Índias", "Colômbia"], ["Bogotá", "Bogotá", "Colômbia"], ["Cancún", "Cancún", "México"],
  ["Cidade do México", "Cidade do México", "México"], ["Orlando", "Orlando (Flórida)", "Estados Unidos"], ["Miami", "Miami", "Estados Unidos"],
  ["Nova York", "Nova Iorque", "Estados Unidos"], ["Las Vegas", "Las Vegas", "Estados Unidos"], ["Los Angeles", "Los Angeles", "Estados Unidos"],
  ["Paris", "Paris", "França"], ["Londres", "Londres", "Reino Unido"], ["Roma", "Roma", "Itália"],
  ["Florença", "Florença", "Itália"], ["Veneza", "Veneza", "Itália"], ["Milão", "Milão", "Itália"],
  ["Barcelona", "Barcelona", "Espanha"], ["Madri", "Madrid", "Espanha"],
  ["Valência", "Valência", "Espanha"], ["Alicante", "Alicante", "Espanha"], ["Elche", "Elche", "Espanha"], ["Amsterdã", "Amsterdã", "Países Baixos"],
  ["Praga", "Praga", "Tchéquia"], ["Viena", "Viena", "Áustria"], ["Berlim", "Berlim", "Alemanha"],
  ["Atenas", "Atenas", "Grécia"], ["Istambul", "Istambul", "Turquia"], ["Dubai", "Dubai", "Emirados Árabes Unidos"],
  ["Cairo", "Cairo", "Egito"], ["Marrakech", "Marraquexe", "Marrocos"], ["Bangkok", "Banguecoque", "Tailândia"],
  ["Tóquio", "Tóquio", "Japão"], ["Singapura", "Singapura", "Singapura"], ["Hong Kong", "Hong Kong", "China"],
  ["Sydney", "Sydney", "Austrália"],
  ["Rio Branco", "Rio Branco (Acre)", "Brasil", [-9.97806, -67.81167]], ["Macapá", "Macapá", "Brasil"], ["Porto Velho", "Porto Velho", "Brasil"],
  ["Boa Vista", "Boa Vista (Roraima)", "Brasil"], ["Bombinhas", "Bombinhas", "Brasil"], ["Porto Belo", "Porto Belo", "Brasil"],
  ["Itapema", "Itapema", "Brasil"], ["Itajaí", "Itajaí", "Brasil"], ["Penha", "Penha (Santa Catarina)", "Brasil"],
  ["Balneário Piçarras", "Balneário Piçarras", "Brasil"], ["Governador Celso Ramos", "Governador Celso Ramos", "Brasil"], ["Garopaba", "Garopaba", "Brasil"],
  ["Imbituba", "Imbituba", "Brasil"], ["Laguna", "Laguna (Santa Catarina)", "Brasil"], ["São Francisco do Sul", "São Francisco do Sul", "Brasil"],
  ["Pomerode", "Pomerode", "Brasil"], ["Urubici", "Urubici", "Brasil"], ["São Joaquim", "São Joaquim (Santa Catarina)", "Brasil"],
  ["Bom Jardim da Serra", "Bom Jardim da Serra", "Brasil"], ["Lages", "Lages", "Brasil"], ["Treze Tílias", "Treze Tílias", "Brasil"],
  ["Nova Petrópolis", "Nova Petrópolis", "Brasil"], ["Caxias do Sul", "Caxias do Sul", "Brasil"], ["Garibaldi", "Garibaldi (Rio Grande do Sul)", "Brasil"],
  ["Cambará do Sul", "Cambará do Sul", "Brasil"], ["São Francisco de Paula", "São Francisco de Paula (Rio Grande do Sul)", "Brasil"], ["Torres", "Torres (Rio Grande do Sul)", "Brasil"],
  ["Capão da Canoa", "Capão da Canoa", "Brasil"], ["Tramandaí", "Tramandaí", "Brasil"], ["Paranaguá", "Paranaguá", "Brasil"],
  ["Morretes", "Morretes", "Brasil"], ["Antonina", "Antonina", "Brasil"], ["Ilha do Mel", "Ilha do Mel (Paraná)", "Brasil"],
  ["Guaratuba", "Guaratuba", "Brasil"], ["Matinhos", "Matinhos", "Brasil"], ["Guarujá", "Guarujá", "Brasil"],
  ["São Sebastião", "São Sebastião (São Paulo)", "Brasil"], ["Caraguatatuba", "Caraguatatuba", "Brasil"], ["Bertioga", "Bertioga", "Brasil"],
  ["Praia Grande", "Praia Grande (São Paulo)", "Brasil"], ["Itanhaém", "Itanhaém", "Brasil"], ["Peruíbe", "Peruíbe", "Brasil"],
  ["Cananéia", "Cananéia", "Brasil"], ["Iguape", "Iguape", "Brasil"], ["Santo Antônio do Pinhal", "Santo Antônio do Pinhal", "Brasil"],
  ["São Bento do Sapucaí", "São Bento do Sapucaí", "Brasil"], ["Monte Verde", "Monte Verde", "Brasil"], ["Holambra", "Holambra", "Brasil"],
  ["Brotas", "Brotas (São Paulo)", "Brasil"], ["Águas de Lindóia", "Águas de Lindóia", "Brasil"], ["Serra Negra", "Serra Negra (São Paulo)", "Brasil"],
  ["Atibaia", "Atibaia", "Brasil"], ["São Roque", "São Roque (São Paulo)", "Brasil"], ["Olímpia", "Olímpia (São Paulo)", "Brasil"],
  ["Cabo Frio", "Cabo Frio", "Brasil"], ["Teresópolis", "Teresópolis", "Brasil"], ["Guarapari", "Guarapari", "Brasil"],
  ["Domingos Martins", "Domingos Martins", "Brasil"], ["Capitólio", "Capitólio (Minas Gerais)", "Brasil"], ["Brumadinho", "Brumadinho", "Brasil"],
  ["Mariana", "Mariana (Minas Gerais)", "Brasil"], ["São Thomé das Letras", "São Tomé das Letras", "Brasil"], ["Alto Paraíso de Goiás", "Alto Paraíso de Goiás", "Brasil"],
  ["Arraial d'Ajuda", "Arraial d'Ajuda", "Brasil"], ["Trancoso", "Trancoso (Porto Seguro)", "Brasil"], ["Morro de São Paulo", "Morro de São Paulo", "Brasil"],
  ["Pipa", "Praia da Pipa", "Brasil"], ["Canoa Quebrada", "Canoa Quebrada", "Brasil"], ["São Miguel dos Milagres", "São Miguel dos Milagres", "Brasil"],
  ["Parnaíba", "Parnaíba", "Brasil"], ["Sintra", "Sintra", "Portugal"], ["Lagos", "Lagos (Portugal)", "Portugal"],
  ["Faro", "Faro", "Portugal"], ["Funchal", "Funchal", "Portugal"], ["Coimbra", "Coimbra", "Portugal"],
  ["Ponta Delgada", "Ponta Delgada", "Portugal"], ["Sevilha", "Sevilha", "Espanha"], ["Granada", "Granada (Espanha)", "Espanha"],
  ["Málaga", "Málaga", "Espanha"], ["Palma de Maiorca", "Palma (Maiorca)", "Espanha"], ["San Sebastián", "San Sebastián", "Espanha"],
  ["Bilbau", "Bilbau", "Espanha"], ["Nice", "Nice", "França"], ["Lyon", "Lyon", "França"],
  ["Marselha", "Marselha", "França"], ["Edimburgo", "Edimburgo", "Reino Unido"], ["Dublin", "Dublin", "Irlanda"],
  ["Bruxelas", "Bruxelas", "Bélgica"], ["Bruges", "Bruges", "Bélgica"], ["Munique", "Munique", "Alemanha"],
  ["Zurique", "Zurique", "Suíça"], ["Lucerna", "Lucerna", "Suíça"], ["Salzburgo", "Salzburgo", "Áustria"],
  ["Budapeste", "Budapeste", "Hungria"], ["Cracóvia", "Cracóvia", "Polônia"], ["Copenhague", "Copenhague", "Dinamarca"],
  ["Estocolmo", "Estocolmo", "Suécia"], ["Helsinque", "Helsínquia", "Finlândia"], ["Rovaniemi", "Rovaniemi", "Finlândia"],
  ["Reykjavík", "Reykjavík", "Islândia"], ["Nápoles", "Nápoles", "Itália"], ["Positano", "Positano", "Itália"],
  ["Cortina d'Ampezzo", "Cortina d'Ampezzo", "Itália"], ["Santorini", "Santorini", "Grécia"], ["Dubrovnik", "Dubrovnik", "Croácia"],
  ["Split", "Split", "Croácia"], ["San Francisco", "São Francisco (Califórnia)", "Estados Unidos"], ["Washington", "Washington, D.C.", "Estados Unidos"],
  ["Chicago", "Chicago", "Estados Unidos"], ["Toronto", "Toronto", "Canadá"], ["Vancouver", "Vancouver", "Canadá"],
  ["Mendoza", "Mendoza", "Argentina"], ["Ushuaia", "Ushuaia", "Argentina"], ["El Calafate", "El Calafate", "Argentina"],
  ["San Pedro de Atacama", "San Pedro de Atacama", "Chile"], ["Medellín", "Medellín", "Colômbia"], ["San Andrés", "San Andrés (Colômbia)", "Colômbia"],
  ["Punta Cana", "Punta Cana", "República Dominicana"], ["Havana", "Havana", "Cuba"], ["Playa del Carmen", "Playa del Carmen", "México"],
  ["Tulum", "Tulum", "México"], ["Cidade do Panamá", "Cidade do Panamá", "Panamá"], ["Uyuni", "Uyuni", "Bolívia"],
  ["Cidade do Cabo", "Cidade do Cabo", "África do Sul"], ["Joanesburgo", "Joanesburgo", "África do Sul"], ["Zanzibar", "Zanzibar (cidade)", "Tanzânia"],
  ["Arusha", "Aruxa (cidade)", "Tanzânia"], ["Nairóbi", "Nairóbi", "Quênia"], ["Luxor", "Luxor", "Egito"],
  ["Livingstone", "Livingstone (Zâmbia)", "Zâmbia"], ["Abu Dhabi", "Abu Dhabi", "Emirados Árabes Unidos"], ["Jerusalém", "Jerusalém", "Israel"],
  ["Quioto", "Quioto", "Japão"], ["Osaka", "Osaka", "Japão"], ["Seul", "Seul", "Coreia do Sul"],
  ["Bali", "Ubud", "Indonésia"], ["Phuket", "Phuket (cidade)", "Tailândia"], ["Chiang Mai", "Chiang Mai", "Tailândia"],
  ["Kuala Lumpur", "Kuala Lumpur", "Malásia"], ["Hanói", "Hanói", "Vietnã"], ["Pequim", "Pequim", "China"],
  ["Xangai", "Xangai", "China"], ["Agra", "Agra", "Índia"], ["Malé", "Malé", "Maldivas"],
  ["Melbourne", "Melbourne", "Austrália"], ["Auckland", "Auckland", "Nova Zelândia"], ["Queenstown", "Queenstown", "Nova Zelândia"],
  ["Houston", "Houston", "Estados Unidos"], ["Dallas", "Dallas", "Estados Unidos"], ["Austin", "Austin", "Estados Unidos"],
  ["San Antonio", "San Antonio (Texas)", "Estados Unidos"], ["Fort Worth", "Fort Worth", "Estados Unidos"], ["Galveston", "Galveston (Texas)", "Estados Unidos"],
  ["El Paso", "El Paso (Texas)", "Estados Unidos"], ["San Diego", "San Diego", "Estados Unidos"], ["Santa Bárbara", "Santa Bárbara (Califórnia)", "Estados Unidos"],
  ["Napa", "Napa (Califórnia)", "Estados Unidos"], ["Sacramento", "Sacramento (Califórnia)", "Estados Unidos"], ["Palm Springs", "Palm Springs", "Estados Unidos"],
  ["Monterey", "Monterey (Califórnia)", "Estados Unidos"], ["Turim", "Turim", "Itália"], ["Bolonha", "Bolonha", "Itália"],
  ["Verona", "Verona", "Itália"], ["Pisa", "Pisa", "Itália"], ["Siena", "Siena", "Itália"],
  ["Gênova", "Génova", "Itália"], ["Como", "Como", "Itália"], ["La Spezia", "La Spezia", "Itália"],
  ["Palermo", "Palermo", "Itália"], ["Catânia", "Catânia", "Itália"], ["Taormina", "Taormina", "Itália"],
  ["Bari", "Bari", "Itália"], ["Matera", "Matera", "Itália"], ["Toledo", "Toledo (Espanha)", "Espanha"],
  ["Segóvia", "Segóvia", "Espanha"], ["Córdoba", "Córdova (Espanha)", "Espanha"], ["Cádis", "Cádis", "Espanha"],
  ["Salamanca", "Salamanca", "Espanha"], ["Santiago de Compostela", "Santiago de Compostela", "Espanha"], ["Saragoça", "Saragoça", "Espanha"],
  ["Ibiza", "Ibiza (cidade)", "Espanha"], ["Santa Cruz de Tenerife", "Santa Cruz de Tenerife", "Espanha"], ["Évora", "Évora", "Portugal"],
  ["Óbidos", "Óbidos (Portugal)", "Portugal"], ["Braga", "Braga", "Portugal"], ["Aveiro", "Aveiro", "Portugal"],
  ["Nazaré", "Nazaré (Portugal)", "Portugal"], ["Fátima", "Fátima (Portugal)", "Portugal"], ["Bordeaux", "Bordéus", "França"],
  ["Estrasburgo", "Estrasburgo", "França"], ["Toulouse", "Toulouse", "França"], ["Mont-Saint-Michel", "Monte Saint-Michel", "França"],
  ["Avignon", "Avinhão", "França"], ["Annecy", "Annecy", "França"], ["Chamonix", "Chamonix-Mont-Blanc", "França"],
  ["Reims", "Reims", "França"], ["Carcassonne", "Carcassona", "França"], ["Colmar", "Colmar", "França"],
  ["Valparaíso", "Valparaíso (Chile)", "Chile"], ["Pucón", "Pucón", "Chile"], ["Puerto Varas", "Puerto Varas", "Chile"],
  ["Puerto Natales", "Puerto Natales", "Chile"], ["La Serena", "La Serena", "Chile"], ["Salta", "Salta (Argentina)", "Argentina", [-24.7829, -65.4232]],
  ["Puerto Madryn", "Puerto Madryn", "Argentina"], ["El Chaltén", "El Chaltén", "Argentina"], ["Mar del Plata", "Mar del Plata", "Argentina"],
  ["Rosário", "Rosário (Argentina)", "Argentina"], ["Colônia do Sacramento", "Colonia del Sacramento", "Uruguai"], ["Punta del Diablo", "Punta del Diablo", "Uruguai"],
  ["Busan", "Busan", "Coreia do Sul"], ["Incheon", "Incheon", "Coreia do Sul"], ["Jeju", "Jeju (cidade)", "Coreia do Sul"], ["Seogwipo", "Seogwipo", "Coreia do Sul"],
  ["Gyeongju", "Gyeongju", "Coreia do Sul"], ["Daegu", "Daegu", "Coreia do Sul"], ["Jeonju", "Jeonju", "Coreia do Sul"], ["Suwon", "Suwon", "Coreia do Sul"],
  ["Gangneung", "Gangneung", "Coreia do Sul"], ["Andong", "Andong", "Coreia do Sul"], ["Yeosu", "Yeosu", "Coreia do Sul"], ["Daejeon", "Daejeon", "Coreia do Sul", [36.3504, 127.3845]], ["Gwangju", "Gwangju", "Coreia do Sul"],
  ["Lienz", "Lienz", "Áustria", [46.8297, 12.7695]],
  ["Perca", "Perca", "Itália"], ["Lago de Braies", "Braies", "Itália", [46.6944, 12.0853]], ["Brunico", "Bruneck", "Itália"]
];

// Tipo do Wikidata (P31) → categoria exibida e interesses do app.
const TYPES = {
  Q46169: ["Natureza", ["natureza", "aventura"]], Q22698: ["Natureza", ["natureza", "familia"]],
  Q179049: ["Natureza", ["natureza", "aventura"]], Q167346: ["Natureza", ["natureza", "familia"]],
  Q34038: ["Natureza", ["natureza", "aventura"]], Q8502: ["Natureza", ["natureza", "aventura"]],
  Q23397: ["Natureza", ["natureza"]], Q23442: ["Natureza", ["natureza", "praia"]],
  Q35509: ["Natureza", ["natureza", "aventura"]], Q473972: ["Natureza", ["natureza"]],
  Q6017969: ["Natureza", ["natureza"]], Q1440300: ["Natureza", ["natureza"]],
  Q54050: ["Natureza", ["natureza"]], Q187223: ["Natureza", ["natureza"]],
  Q1107656: ["Natureza", ["natureza", "familia"]], Q4421: ["Natureza", ["natureza"]],
  Q2143825: ["Aventura", ["aventura", "natureza"]],
  Q40080: ["Praia", ["praia", "natureza"]],
  Q43501: ["Diversão", ["familia", "natureza"]], Q2281788: ["Diversão", ["familia"]],
  Q194195: ["Diversão", ["familia", "aventura"]], Q2416723: ["Diversão", ["familia", "aventura"]],
  Q740326: ["Diversão", ["familia", "aventura"]],
  Q33506: ["Cultura", ["cultura"]], Q16735822: ["Cultura", ["cultura"]], Q10624527: ["Cultura", ["cultura"]],
  Q588140: ["Cultura", ["cultura", "familia"]], Q2087181: ["Cultura", ["cultura"]],
  Q207694: ["Arte", ["arte", "cultura"]], Q1007870: ["Arte", ["arte", "cultura"]],
  Q16970: ["Cultura", ["cultura"]], Q2977: ["Cultura", ["cultura", "arte"]], Q56242215: ["Cultura", ["cultura", "arte"]],
  Q163687: ["Cultura", ["cultura", "arte"]], Q120560: ["Cultura", ["cultura", "arte"]],
  Q44613: ["Cultura", ["cultura"]], Q108325: ["Cultura", ["cultura"]], Q24398318: ["Cultura", ["cultura"]],
  Q32815: ["Cultura", ["cultura", "arte"]], Q44539: ["Cultura", ["cultura"]], Q34627: ["Cultura", ["cultura"]],
  Q23413: ["Cultura", ["cultura", "familia"]], Q16560: ["Cultura", ["cultura", "arte"]],
  Q57821: ["Cultura", ["cultura"]], Q57831: ["Cultura", ["cultura"]],
  Q4989906: ["Cultura", ["cultura"]], Q5003624: ["Cultura", ["cultura"]], Q179700: ["Cultura", ["cultura", "arte"]],
  Q15243209: ["Cultura", ["cultura", "gastronomia"]], Q839954: ["Cultura", ["cultura", "aventura"]],
  Q24354: ["Arte", ["arte", "cultura", "vida-noturna"]], Q153562: ["Arte", ["arte", "cultura", "vida-noturna"]],
  Q1060829: ["Arte", ["arte", "vida-noturna"]], Q1329623: ["Cultura", ["cultura", "arte"]],
  Q7075: ["Cultura", ["cultura"]], Q174782: ["Passeio urbano", ["cultura", "gastronomia"]],
  Q12518: ["Cultura", ["cultura"]], Q39715: ["Cultura", ["cultura", "natureza"]], Q12280: ["Passeio urbano", ["cultura"]],
  Q483110: ["Cultura", ["cultura", "familia"]], Q570116: ["Passeio", ["cultura", "familia"]],
  Q330284: ["Gastronomia", ["gastronomia", "compras", "cultura"]], Q11315: ["Compras", ["compras"]]
};

const FREE_LICENSE = /^(public domain|domínio público|pd|cc0|cc[ -]by(-sa)?([ -]\d(\.\d)?)?)/i;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(url, params, accept = "application/json", serverErrorAttempts = 3) {
  const query = new URLSearchParams(params);
  let serverErrors = 0;
  for (let attempt = 0; attempt < 6; attempt++) {
    const response = await fetch(`${url}?${query}`, { headers: { "User-Agent": USER_AGENT, Accept: accept } });
    if (response.status >= 500 && ++serverErrors >= serverErrorAttempts) throw new Error(`${response.status} em ${url}`);
    if (response.status === 429 || response.status >= 500) {
      await sleep(Number(response.headers.get("retry-after")) * 1000 || 3000 * (attempt + 1));
      continue;
    }
    if (!response.ok) throw new Error(`${response.status} em ${url}`);
    await sleep(PAUSE_MS);
    return response.json();
  }
  throw new Error(`Muitas tentativas em ${url}`);
}

const api = (url, params) => request(url, { format: "json", formatversion: "2", ...params });
const wikipedia = (params) => api("https://pt.wikipedia.org/w/api.php", { action: "query", ...params });
const commons = (params) => api("https://commons.wikimedia.org/w/api.php", { action: "query", ...params });
// Erro 5xx no SPARQL costuma ser tempo esgotado: não repete, passa logo para um raio menor.
const sparql = (query) => request("https://query.wikidata.org/sparql", { query }, "application/sparql-results+json", 1);

function stripHtml(value = "") {
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function cleanAuthor(value) {
  return stripHtml(value)
    .replace(/^No machine-readable author provided\.\s*(.+?)\s+assumed.*$/i, "$1")
    .replace(/~\w+wiki/g, "")
    .replace(/\s*\[\d+\]/g, "")
    .slice(0, 80) || "Autor não identificado";
}

function distanceKm([lat1, lon1], [lat2, lon2]) {
  const rad = (value) => (value * Math.PI) / 180;
  const a = Math.sin(rad(lat2 - lat1) / 2) ** 2
    + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lon2 - lon1) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}

function chunks(list, size) {
  const result = [];
  for (let index = 0; index < list.length; index += size) result.push(list.slice(index, index + size));
  return result;
}

// Itens do catálogo editorial já enriquecidos não são repetidos.
function editorialWikidataIds() {
  const file = join(ROOT, "dados", "fontes-abertas.js");
  if (!existsSync(file)) return new Set();
  const context = { window: {} };
  vm.runInNewContext(readFileSync(file, "utf8"), context);
  return new Set(Object.values(context.window.OPEN_DATA?.activities || {}).map((entry) => entry.wikidata).filter(Boolean));
}

async function getCityCenters() {
  const centers = {};
  const missing = [];
  const needWikidata = {};
  for (const group of chunks(CITIES, 40)) {
    const data = await wikipedia({ titles: group.map(([, title]) => title).join("|"), prop: "coordinates|pageprops", ppprop: "wikibase_item", colimit: "max", redirects: "1" });
    const normalized = new Map((data.query.normalized || []).map((item) => [item.from, item.to]));
    const redirects = new Map((data.query.redirects || []).map((item) => [item.from, item.to]));
    const byTitle = new Map(data.query.pages.map((page) => [page.title, page]));
    for (const [name, title] of group) {
      const step = normalized.get(title) || title;
      const page = byTitle.get(redirects.get(step) || step);
      const coordinates = page?.coordinates?.[0];
      if (coordinates) centers[name] = [coordinates.lat, coordinates.lon];
      else if (page?.pageprops?.wikibase_item) needWikidata[name] = page.pageprops.wikibase_item;
      else missing.push(`${name} (página "${title}")`);
    }
  }
  // Muitas páginas só têm coordenadas no Wikidata (P625).
  const ids = Object.values(needWikidata);
  for (const group of chunks(ids, 50)) {
    const data = await api("https://www.wikidata.org/w/api.php", { action: "wbgetentities", ids: group.join("|"), props: "claims" });
    for (const [name, id] of Object.entries(needWikidata)) {
      const value = data.entities?.[id]?.claims?.P625?.[0]?.mainsnak?.datavalue?.value;
      if (value) centers[name] = [value.latitude, value.longitude];
    }
  }
  // Coordenadas corrigidas à mão (4º item da lista) quando a página da Wikipedia está errada.
  for (const [name, , , fixed] of CITIES) if (fixed) centers[name] = fixed;
  for (const name of Object.keys(needWikidata)) if (!centers[name]) missing.push(`${name} (sem P625 no Wikidata)`);
  const stillMissing = missing.filter((item) => !centers[item.split(" (")[0]]);
  if (stillMissing.length) throw new Error(`Sem coordenadas para: ${stillMissing.join(", ")}`);
  return centers;
}

// Cache por cidade para retomar de onde parou (ferramentas/.cache, fora do Git).
const CACHE_DIR = join(ROOT, "ferramentas", ".cache");

// Em cidades muito densas (Paris, Londres...) a consulta de 50 km estoura o tempo do Wikidata;
// nesses casos tenta raios menores, onde ficam as atrações mais conhecidas.
async function findPlacesCached(name, center) {
  const file = join(CACHE_DIR, `${name.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/gi, "-")}.json`);
  if (existsSync(file)) return JSON.parse(readFileSync(file, "utf8"));
  // [raio em km, mínimo de Wikipedias em que o lugar aparece]: filtrar cedo os pouco conhecidos alivia a consulta.
  const save = (radius, places) => {
    mkdirSync(CACHE_DIR, { recursive: true });
    writeFileSync(file, JSON.stringify({ radius, places }));
    return { radius, places };
  };
  for (const [radius, minLinks] of [[RADIUS_KM, 2], [RADIUS_KM, 15]]) {
    try {
      return save(radius, await findPlaces(center, radius, minLinks));
    } catch (error) {
      console.warn(`${name}: raio de ${radius} km (mín. ${minLinks}) falhou (${error.message}); tentando consulta mais leve.`);
    }
  }
  // Último recurso: busca por proximidade da Wikipedia (máximo de 10 km), cruzada com os tipos do Wikidata.
  return save(10, await findPlacesGeosearch(center));
}

async function findPlacesGeosearch(center) {
  const search = await wikipedia({ list: "geosearch", gscoord: `${center[0]}|${center[1]}`, gsradius: "10000", gslimit: "500" });
  const pages = search.query?.geosearch || [];
  const byQid = new Map();
  for (const group of chunks(pages, 50)) {
    const data = await wikipedia({ pageids: group.map((page) => page.pageid).join("|"), prop: "pageprops", ppprop: "wikibase_item" });
    for (const page of data.query?.pages || []) {
      const qid = page.pageprops?.wikibase_item;
      const geo = group.find((item) => item.pageid === page.pageid);
      if (qid && geo) byQid.set(qid, { title: page.title, coordinates: [geo.lat, geo.lon] });
    }
  }
  const places = [];
  for (const group of chunks([...byQid.keys()], 50)) {
    const data = await api("https://www.wikidata.org/w/api.php", { action: "wbgetentities", ids: group.join("|"), props: "claims|sitelinks|labels", languages: "pt" });
    for (const [qid, entity] of Object.entries(data.entities || {})) {
      const type = (entity.claims?.P31 || []).map((claim) => claim.mainsnak?.datavalue?.value?.id).find((id) => TYPES[id]);
      if (!type) continue;
      const value = (property) => entity.claims?.[property]?.[0]?.mainsnak?.datavalue?.value;
      const page = byQid.get(qid);
      places.push({
        wikidata: qid,
        name: entity.labels?.pt?.value || page.title,
        title: page.title,
        type,
        links: Object.keys(entity.sitelinks || {}).length,
        coordinates: page.coordinates,
        image: value("P18") || null,
        website: value("P856") || null
      });
    }
  }
  return places.sort((a, b) => b.links - a.links);
}

async function findPlaces(center, radius = RADIUS_KM, minLinks = 2) {
  const query = `SELECT ?item ?label ?coord ?type ?links ?title ?image ?site WHERE {
    {
      SELECT ?item (SAMPLE(?coordinate) AS ?coord) (SAMPLE(?placeType) AS ?type) (MAX(?count) AS ?links) WHERE {
        SERVICE wikibase:around {
          ?item wdt:P625 ?coordinate.
          bd:serviceParam wikibase:center "Point(${center[1]} ${center[0]})"^^geo:wktLiteral.
          bd:serviceParam wikibase:radius "${radius}".
        }
        ?item wikibase:sitelinks ?count. FILTER(?count >= ${minLinks})
        VALUES ?placeType { ${Object.keys(TYPES).map((id) => `wd:${id}`).join(" ")} }
        ?item wdt:P31 ?placeType.
      } GROUP BY ?item ORDER BY DESC(?links) LIMIT 150
    }
    ?article schema:about ?item; schema:isPartOf <https://pt.wikipedia.org/>; schema:name ?title.
    OPTIONAL { ?item rdfs:label ?label. FILTER(LANG(?label) = "pt") }
    OPTIONAL { ?item wdt:P18 ?image. }
    OPTIONAL { ?item wdt:P856 ?site. }
  } ORDER BY DESC(?links) LIMIT 300`;
  const data = await sparql(query);
  const places = new Map();
  for (const row of data.results.bindings) {
    const id = row.item.value.split("/").pop();
    if (places.has(id)) continue;
    const [lon, lat] = row.coord.value.replace(/^Point\(|\)$/g, "").split(" ").map(Number);
    places.set(id, {
      wikidata: id,
      name: row.label?.value || row.title.value,
      title: row.title.value,
      type: row.type.value.split("/").pop(),
      links: Number(row.links.value),
      coordinates: [lat, lon],
      image: row.image ? decodeURIComponent(row.image.value.split("/").pop()) : null,
      website: row.site?.value || null
    });
  }
  return [...places.values()];
}

// Exclui obras de um acervo (P195, ex.: Vênus de Milo dentro do Louvre) e lugares que deixaram
// de existir (P576, ex.: Bastilha).
async function getExcludedIds(ids) {
  const excluded = new Set();
  for (const group of chunks(ids, 50)) {
    const data = await api("https://www.wikidata.org/w/api.php", { action: "wbgetentities", ids: group.join("|"), props: "claims" });
    for (const [id, entity] of Object.entries(data.entities || {})) {
      if (entity.claims?.P195 || entity.claims?.P576) excluded.add(id);
    }
  }
  return excluded;
}

async function getExtracts(titles) {
  const extracts = {};
  for (const group of chunks(titles, 20)) {
    const data = await wikipedia({ titles: group.join("|"), prop: "extracts", exintro: "1", explaintext: "1", exsentences: "2", exlimit: "max" });
    for (const page of data.query?.pages || []) if (page.extract) extracts[page.title] = page.extract.trim();
  }
  return extracts;
}

async function getPhotos(files) {
  const photos = {};
  for (const group of chunks(files, 50)) {
    const data = await commons({ titles: group.map((file) => `File:${file}`).join("|"), prop: "imageinfo", iiprop: "url|extmetadata", iiurlwidth: "800" });
    const normalized = new Map((data.query?.normalized || []).map((item) => [item.to, item.from]));
    for (const page of data.query?.pages || []) {
      const info = page.imageinfo?.[0];
      const meta = info?.extmetadata || {};
      const license = stripHtml(meta.LicenseShortName?.value);
      if (!info || !FREE_LICENSE.test(license)) continue;
      const requested = (normalized.get(page.title) || page.title).replace(/^File:/, "");
      const url = new URL(info.thumburl || info.url);
      url.search = "";
      photos[requested] = { url: url.toString(), author: cleanAuthor(meta.Artist?.value), license, licenseUrl: meta.LicenseUrl?.value || "", file: page.title.replace(/^File:/, "") };
    }
  }
  return photos;
}

async function main() {
  const skip = editorialWikidataIds();
  const centers = await getCityCenters();
  const cityTitles = new Set(CITIES.map(([, title]) => title));
  const places = new Map();

  for (const [name] of CITIES) {
    const { radius, places: nearby } = await findPlacesCached(name, centers[name]);
    const found = nearby
      .filter((place) => !skip.has(place.wikidata) && !cityTitles.has(place.title))
      .slice(0, PER_CITY);
    for (const place of found) {
      const km = Math.round(distanceKm(place.coordinates, centers[name]));
      const entry = places.get(place.wikidata) || { ...place, nearCities: [] };
      entry.nearCities.push([name, km]);
      places.set(place.wikidata, entry);
    }
    console.log(`${name}: ${found.length} atrações (raio ${radius} km)`);
  }

  const excluded = await getExcludedIds([...places.keys()]);
  console.log(`${excluded.size} itens descartados (obra de acervo ou lugar extinto).`);
  const all = [...places.values()].filter((place) => !excluded.has(place.wikidata));
  const extracts = await getExtracts([...new Set(all.map((place) => place.title))]);
  const photos = await getPhotos([...new Set(all.map((place) => place.image).filter(Boolean))]);
  const country = Object.fromEntries(CITIES.map(([name, , countryName]) => [name, countryName]));

  const output = all
    .filter((place) => extracts[place.title])
    .map((place) => {
      const nearCities = place.nearCities.sort((a, b) => a[1] - b[1]);
      const [category, interests] = TYPES[place.type];
      const result = {
        id: `wd-${place.wikidata.toLowerCase()}`,
        // Sem rótulo em pt, o nome vem do título da página: tira o "(Cidade)" de desambiguação.
        name: place.name.replace(/\s*\([^)]*\)\s*$/, "").replace(/\s+/g, " ").trim(),
        city: nearCities[0][0],
        country: country[nearCities[0][0]],
        category,
        interests,
        coordinates: place.coordinates.map((value) => Number(value.toFixed(5))),
        nearCities,
        wikidata: place.wikidata,
        title: place.title,
        extract: extracts[place.title]
      };
      if (place.website) result.website = place.website;
      if (place.image && photos[place.image]) result.photo = photos[place.image];
      return result;
    });

  const cities = CITIES.map(([name, , countryName]) => ({ name, country: countryName, coordinates: centers[name].map((value) => Number(value.toFixed(5))) }));
  mkdirSync(join(ROOT, "dados"), { recursive: true });
  writeFileSync(join(ROOT, "dados", "atracoes-cidades.js"),
    "// Arquivo gerado por ferramentas/gerar-atracoes-cidades.mjs. Não edite à mão.\n"
    + `window.CITY_DATA = ${JSON.stringify({ generatedAt: new Date().toISOString().slice(0, 10), radiusKm: RADIUS_KM, cities, places: output })};\n`);
  const withPhoto = output.filter((place) => place.photo).length;
  console.log(`\n${output.length} atrações em ${cities.length} cidades (${withPhoto} com foto livre).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
