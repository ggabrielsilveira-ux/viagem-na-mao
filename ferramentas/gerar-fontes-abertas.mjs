// Gera dados/fontes-abertas.js enriquecendo o catálogo editorial com fontes abertas:
// Wikipedia em português (página, resumo, coordenadas), Wikidata (site oficial)
// e Wikimedia Commons (foto com autor e licença).
//
// Uso: node ferramentas/gerar-fontes-abertas.mjs
// Requer Node 18+ e internet. Rode de novo quando o catálogo mudar.
//
// Regras: só aceita uma página se a coordenada estiver perto da cidade da atração;
// só aceita fotos com licença livre identificada (domínio público, CC0, CC BY, CC BY-SA).
// Nada de notas, preços ou horários: essas fontes não têm esses dados.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const USER_AGENT = "ViagemNaMao/0.1 (prototipo nao comercial; https://github.com/ggabrielsilveira-ux/viagem-na-mao)";
const MAX_DISTANCE_KM = 60;
const PAUSE_MS = 250;

// Título da página da cidade na Wikipedia pt, para obter as coordenadas do centro.
const CITY_PAGES = {
  "Rio de Janeiro": "Rio de Janeiro",
  "Paraty": "Paraty",
  "Gramado": "Gramado",
  "Canela": "Canela (Rio Grande do Sul)",
  "Florianópolis": "Florianópolis",
  "Curitiba": "Curitiba",
  "São Paulo": "São Paulo",
  "Foz do Iguaçu": "Foz do Iguaçu",
  "Salvador": "Salvador (Bahia)",
  "Recife": "Recife",
  "Olinda": "Olinda",
  "Fortaleza": "Fortaleza",
  "Brasília": "Brasília",
  "Belo Horizonte": "Belo Horizonte",
  "Bonito": "Bonito (Mato Grosso do Sul)",
  "Manaus": "Manaus",
  "Porto Alegre": "Porto Alegre",
  "João Pessoa": "João Pessoa",
  "Natal": "Natal (Rio Grande do Norte)",
  "Búzios": "Armação dos Búzios",
  "Aquiraz": "Aquiraz"
};

// Título da página quando o nome da atração no catálogo é diferente do da Wikipedia.
// Passa pelas mesmas verificações de distância; se não bater, a atração fica sem dados.
const TITLE_OVERRIDES = {
  "Jardim Botânico do Rio": "Jardim Botânico do Rio de Janeiro",
  "Pôr do sol no Arpoador": "Arpoador",
  "Sabores da Feira de São Cristóvão": "Feira de São Cristóvão",
  "Piscinas naturais de Trindade": "Trindade (Paraty)",
  "Caminhada pelo Centro Histórico": "Centro Histórico de Paraty",
  "Cataratas do Iguaçu — lado brasileiro": "Cataratas do Iguaçu",
  "Pelourinho e Centro Histórico": "Pelourinho",
  "Marco Zero e Recife Antigo": "Recife Antigo",
  "Alto da Sé": "Alto da Sé (Olinda)",
  "Conjunto Moderno da Pampulha": "Conjunto Arquitetônico da Pampulha",
  "Encontro das Águas": "Encontro das Águas",
  "MUSA — Museu da Amazônia": "Museu da Amazônia",
  "Parque das Dunas": "Parque Estadual Dunas de Natal",
  "Praia de Geribá": "Praia de Geribá",
  "Praia da Ferradura": "Praia da Ferradura",
  "Buraco das Araras": "Buraco das Araras"
};

const FREE_LICENSE = /^(public domain|domínio público|pd|cc0|cc[ -]by(-sa)?([ -]\d(\.\d)?)?)/i;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getJson(url, params) {
  const query = new URLSearchParams({ format: "json", formatversion: "2", ...params });
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetch(`${url}?${query}`, { headers: { "User-Agent": USER_AGENT } });
    if (response.status === 429 || response.status >= 500) {
      const wait = Number(response.headers.get("retry-after")) * 1000 || 2000 * (attempt + 1);
      await sleep(wait);
      continue;
    }
    if (!response.ok) throw new Error(`${response.status} em ${url}`);
    await sleep(PAUSE_MS);
    return response.json();
  }
  throw new Error(`Muitas tentativas em ${url}`);
}

const wikipedia = (params) => getJson("https://pt.wikipedia.org/w/api.php", { action: "query", ...params });
const commons = (params) => getJson("https://commons.wikimedia.org/w/api.php", { action: "query", ...params });
const wikidata = (params) => getJson("https://www.wikidata.org/w/api.php", params);

function stripHtml(value = "") {
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function distanceKm([lat1, lon1], [lat2, lon2]) {
  const rad = (value) => (value * Math.PI) / 180;
  const a = Math.sin(rad(lat2 - lat1) / 2) ** 2
    + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lon2 - lon1) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}

// Lê o catálogo direto do script.js (trecho puro até "const blankTrip"), sem duplicar dados.
function loadCatalog() {
  const source = readFileSync(join(ROOT, "script.js"), "utf8");
  const end = source.indexOf("const blankTrip");
  if (end < 0) throw new Error("Não encontrei o fim do catálogo em script.js.");
  const context = {};
  vm.runInNewContext(`${source.slice(0, end)}\nthis.activities = activities;`, context);
  return context.activities;
}

async function getCityCoordinates() {
  const titles = Object.values(CITY_PAGES);
  const data = await wikipedia({ titles: titles.join("|"), prop: "coordinates", colimit: "max", redirects: "1" });
  const byTitle = new Map(data.query.pages.map((page) => [page.title, page.coordinates?.[0]]));
  const redirects = new Map((data.query.redirects || []).map((item) => [item.from, item.to]));
  const normalized = new Map((data.query.normalized || []).map((item) => [item.from, item.to]));
  const result = {};
  for (const [city, title] of Object.entries(CITY_PAGES)) {
    const finalTitle = redirects.get(normalized.get(title) || title) || normalized.get(title) || title;
    const coordinates = byTitle.get(finalTitle);
    if (!coordinates) throw new Error(`Sem coordenadas para a cidade ${city} (${title}).`);
    result[city] = [coordinates.lat, coordinates.lon];
  }
  return result;
}

const PAGE_PROPS = {
  prop: "coordinates|pageprops|pageimages|extracts|info",
  colimit: "max",
  exlimit: "max",
  ppprop: "wikibase_item|disambiguation",
  piprop: "original",
  exintro: "1",
  explaintext: "1",
  exsentences: "2",
  inprop: "url",
  redirects: "1"
};

const STOPWORDS = new Set(["de", "da", "do", "das", "dos", "e", "a", "o", "no", "na", "pela", "pelo", "pelas", "pelos", "em", "the"]);

function words(value) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/\(.*?\)/g, " ").split(/[^a-z0-9]+/)
    .filter((word) => word.length > 2 && !STOPWORDS.has(word));
}

// Parte das palavras do nome da atração que aparecem no título da página.
function titleOverlap(name, title) {
  const nameWords = words(name);
  const titleWords = new Set(words(title));
  if (!nameWords.length || !titleWords.size) return 0;
  const shared = nameWords.filter((word) => titleWords.has(word)).length;
  return Math.min(shared / nameWords.length, shared / titleWords.size);
}

function pagePoint(page) {
  const coordinates = page.coordinates?.[0];
  return coordinates ? [coordinates.lat, coordinates.lon] : null;
}

function isNear(point, cityCenter) {
  return !point || distanceKm(point, cityCenter) <= MAX_DISTANCE_KM;
}

function isUsable(page, activity) {
  return !page.missing && !page.invalid && page.pageprops?.disambiguation === undefined
    && !page.title.startsWith("Lista de")
    && page.title !== CITY_PAGES[activity.city]; // a página da própria cidade não serve
}

async function findPage(activity, cityCenter) {
  // 1. Página com o título indicado, exato ou "Nome (Cidade)", seguindo redirecionamentos.
  const titles = [TITLE_OVERRIDES[activity.name], activity.name, `${activity.name} (${activity.city})`].filter(Boolean);
  const exact = await wikipedia({ titles: titles.join("|"), ...PAGE_PROPS });
  const resolve = (title) => {
    const normalized = exact.query?.normalized?.find((item) => item.from === title)?.to || title;
    return exact.query?.redirects?.find((item) => item.from === normalized)?.to || normalized;
  };
  const order = titles.map(resolve);
  const exactPages = (exact.query?.pages || []).sort((a, b) => order.indexOf(a.title) - order.indexOf(b.title));
  for (const page of exactPages) {
    const point = pagePoint(page);
    if (!isUsable(page, activity) || !isNear(point, cityCenter)) continue;
    // Sem coordenada, só aceita se o texto da página citar a cidade.
    const mentionsCity = words(`${page.title} ${page.extract || ""}`).join(" ").includes(words(activity.city).join(" "));
    if (point || mentionsCity) return { page, point };
  }
  // 2. Busca, aceitando só títulos parecidos com o nome e com coordenada perto da cidade.
  const search = await wikipedia({ generator: "search", gsrsearch: `${activity.name} ${activity.city}`, gsrlimit: "8", ...PAGE_PROPS });
  const pages = (search.query?.pages || []).sort((a, b) => a.index - b.index);
  for (const page of pages) {
    const point = pagePoint(page);
    if (!point || !isUsable(page, activity) || !isNear(point, cityCenter)) continue;
    if (titleOverlap(activity.name, page.title) >= 0.6) return { page, point };
  }
  return null;
}

function withoutQuery(url) {
  const parsed = new URL(url);
  parsed.search = "";
  return parsed.toString();
}

async function getPhoto(fileName) {
  if (!fileName) return null;
  const data = await commons({
    titles: `File:${fileName}`,
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "1100"
  });
  const info = data.query?.pages?.[0]?.imageinfo?.[0];
  const meta = info?.extmetadata || {};
  const license = stripHtml(meta.LicenseShortName?.value);
  if (!info || !FREE_LICENSE.test(license)) return null;
  return {
    url: withoutQuery(info.thumburl || info.url),
    author: stripHtml(meta.Artist?.value)
      .replace(/^No machine-readable author provided\.\s*(.+?)\s+assumed.*$/i, "$1")
      .replace(/~\w+wiki/g, "")
      .replace(/\s*\[\d+\]/g, "")
      .slice(0, 80) || "Autor não identificado",
    license,
    licenseUrl: meta.LicenseUrl?.value || "",
    page: info.descriptionurl
  };
}

// Do Wikidata: site oficial (P856), coordenadas (P625) e foto principal (P18).
async function getWikidataFacts(ids) {
  const facts = {};
  const value = (entity, property) => entity.claims?.[property]?.[0]?.mainsnak?.datavalue?.value;
  for (let index = 0; index < ids.length; index += 50) {
    const data = await wikidata({ action: "wbgetentities", ids: ids.slice(index, index + 50).join("|"), props: "claims" });
    for (const [id, entity] of Object.entries(data.entities || {})) {
      const coordinates = value(entity, "P625");
      facts[id] = {
        website: value(entity, "P856") || null,
        coordinates: coordinates ? [coordinates.latitude, coordinates.longitude] : null,
        image: value(entity, "P18") || null
      };
    }
  }
  return facts;
}

function commonsFileName(url) {
  if (!url || !url.includes("/commons/")) return null;
  return decodeURIComponent(new URL(url).pathname.split("/").pop());
}

async function main() {
  const activities = loadCatalog();
  const cityCenters = await getCityCoordinates();
  const found = [];
  const missing = [];
  for (const activity of activities) {
    const match = await findPage(activity, cityCenters[activity.city]);
    if (match) found.push({ activity, ...match });
    else missing.push(`${activity.name} (${activity.city})`);
  }
  const ids = [...new Set(found.map(({ page }) => page.pageprops?.wikibase_item).filter(Boolean))];
  const facts = await getWikidataFacts(ids);

  const result = {};
  for (const { activity, page, point } of found) {
    const wikidataId = page.pageprops?.wikibase_item || null;
    const fact = facts[wikidataId] || {};
    const coordinates = point || fact.coordinates;
    if (coordinates && !isNear(coordinates, cityCenters[activity.city])) {
      missing.push(`${activity.name} (${activity.city}) — coordenada do Wikidata longe da cidade`);
      continue;
    }
    const entry = {
      coordinates: coordinates ? coordinates.map((value) => Number(value.toFixed(5))) : null,
      wikipedia: { title: page.title, url: withoutQuery(page.fullurl), extract: page.extract || "" },
      wikidata: wikidataId
    };
    if (fact.website) entry.website = fact.website;
    const photo = await getPhoto(fact.image || commonsFileName(page.original?.source));
    if (photo) entry.photo = photo;
    result[activity.id] = entry;
    console.log(`✓ ${activity.name} → ${page.title}${photo ? " (foto)" : ""}${entry.coordinates ? "" : " (sem coordenada)"}`);
  }

  const output = {
    generatedAt: new Date().toISOString().slice(0, 10),
    sources: "Wikipedia em português (texto CC BY-SA 4.0), Wikidata (CC0) e Wikimedia Commons (licença indicada em cada foto).",
    activities: result
  };
  mkdirSync(join(ROOT, "dados"), { recursive: true });
  writeFileSync(join(ROOT, "dados", "fontes-abertas.js"),
    "// Arquivo gerado por ferramentas/gerar-fontes-abertas.mjs. Não edite à mão.\n"
    + `window.OPEN_DATA = ${JSON.stringify(output, null, 2)};\n`);
  console.log(`\n${Object.keys(result).length} de ${activities.length} atrações enriquecidas.`);
  if (missing.length) console.log(`Sem correspondência confiável (${missing.length}):\n- ${missing.join("\n- ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
