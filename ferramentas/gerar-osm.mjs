// Gera dados/osm-lugares.js com lugares do OpenStreetMap perto de cada cidade do app:
// restaurantes, cafés, bares, mercados, praias, mirantes, cachoeiras, parques, museus e shoppings.
//
// Uso: node ferramentas/gerar-osm.mjs   (depois de gerar-atracoes-cidades.mjs, que define as cidades)
// Requer Node 18+ e internet. Leva bastante tempo (uma consulta por cidade ao Overpass público,
// com pausa entre elas); resultados por cidade ficam em ferramentas/.cache/osm para retomar.
//
// Dados © colaboradores do OpenStreetMap, licença ODbL: o app precisa exibir o crédito.
// Horário vem da tag opening_hours quando existe; o OSM não tem notas, preços nem descrições.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const USER_AGENT = "ViagemNaMao/0.1 (prototipo nao comercial; https://github.com/ggabrielsilveira-ux/viagem-na-mao)";
// Instância principal e espelho público; alterna entre elas a cada tentativa.
const OVERPASS = ["https://overpass-api.de/api/interpreter", "https://overpass.private.coffee/api/interpreter"];
const CACHE_DIR = join(ROOT, "ferramentas", ".cache", "osm");
const NEAR_KM = 50;
const PAUSE_MS = 5000;

// Grupo → quantos lugares guardar por cidade.
const LIMITS = { food: 12, nature: 10, culture: 8, fun: 4, shopping: 3 };

// Tipo OSM → [grupo, categoria, interesses, rótulo em português]
const KINDS = {
  "amenity=restaurant": ["food", "Gastronomia", ["gastronomia"], "Restaurante"],
  "amenity=cafe": ["food", "Gastronomia", ["gastronomia"], "Café"],
  "amenity=bar": ["food", "Gastronomia", ["gastronomia", "vida-noturna"], "Bar"],
  "amenity=ice_cream": ["food", "Gastronomia", ["gastronomia", "familia"], "Sorveteria"],
  "amenity=marketplace": ["food", "Gastronomia", ["gastronomia", "compras", "cultura"], "Mercado"],
  "tourism=viewpoint": ["nature", "Natureza", ["natureza"], "Mirante"],
  "natural=beach": ["nature", "Praia", ["praia", "natureza"], "Praia"],
  "natural=waterfall": ["nature", "Natureza", ["natureza", "aventura"], "Cachoeira"],
  "natural=peak": ["nature", "Natureza", ["natureza", "aventura"], "Pico"],
  "leisure=park": ["nature", "Natureza", ["natureza", "familia"], "Parque"],
  "leisure=nature_reserve": ["nature", "Natureza", ["natureza", "aventura"], "Reserva natural"],
  "tourism=museum": ["culture", "Cultura", ["cultura"], "Museu"],
  "tourism=gallery": ["culture", "Arte", ["arte", "cultura"], "Galeria de arte"],
  "tourism=attraction": ["culture", "Passeio", ["cultura", "familia"], "Atração turística"],
  "tourism=zoo": ["fun", "Diversão", ["familia", "natureza"], "Zoológico"],
  "tourism=theme_park": ["fun", "Diversão", ["familia", "aventura"], "Parque temático"],
  "tourism=aquarium": ["fun", "Diversão", ["familia"], "Aquário"],
  "shop=mall": ["shopping", "Compras", ["compras"], "Shopping"]
};

const CUISINES = {
  italian: "italiana", pizza: "pizza", japanese: "japonesa", sushi: "sushi", chinese: "chinesa", mexican: "mexicana",
  spanish: "espanhola", tapas: "tapas", portuguese: "portuguesa", brazilian: "brasileira", regional: "regional",
  seafood: "frutos do mar", fish: "peixes", burger: "hambúrguer", french: "francesa", indian: "indiana", thai: "tailandesa",
  vegetarian: "vegetariana", vegan: "vegana", steak_house: "carnes", mediterranean: "mediterrânea", arab: "árabe",
  lebanese: "libanesa", international: "internacional", local: "local", barbecue: "churrasco", korean: "coreana",
  greek: "grega", turkish: "turca", peruvian: "peruana", argentinian: "argentina", american: "americana",
  asian: "asiática", paella: "paella", kebab: "kebab", sandwich: "sanduíches", coffee_shop: "café", ice_cream: "sorvete",
  german: "alemã", vietnamese: "vietnamita", crepe: "crepes", chicken: "frango", noodle: "massas orientais", ramen: "lámen"
};

const DAYS = { Mo: "seg", Tu: "ter", We: "qua", Th: "qui", Fr: "sex", Sa: "sáb", Su: "dom", PH: "feriados" };

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function distanceKm([lat1, lon1], [lat2, lon2]) {
  const rad = (value) => (value * Math.PI) / 180;
  const a = Math.sin(rad(lat2 - lat1) / 2) ** 2
    + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lon2 - lon1) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}

function normalize(value) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function loadWindowFile(file, key) {
  const path = join(ROOT, "dados", file);
  if (!existsSync(path)) return null;
  const context = { window: {} };
  vm.runInNewContext(readFileSync(path, "utf8"), context);
  return context.window[key];
}

function overpassQuery([lat, lon]) {
  const around = (km) => `around:${km * 1000},${lat},${lon}`;
  return `[out:json][timeout:180];
(
  nwr(${around(15)})["tourism"~"^(attraction|viewpoint|museum|gallery|zoo|theme_park|aquarium)$"]["name"];
  nwr(${around(25)})["natural"="beach"]["name"];
  nwr(${around(50)})["natural"="waterfall"]["name"];
  nwr(${around(50)})["natural"="peak"]["name"]["wikidata"];
  nwr(${around(50)})["tourism"="viewpoint"]["name"];
  nwr(${around(8)})["amenity"~"^(restaurant|cafe|bar|ice_cream|marketplace)$"]["name"]["opening_hours"];
  nwr(${around(15)})["shop"="mall"]["name"];
  nwr(${around(50)})["leisure"~"^(park|nature_reserve)$"]["name"]["wikidata"];
);
out center tags;`;
}

async function fetchCity(name, center) {
  const file = join(CACHE_DIR, `${normalize(name).replace(/ /g, "-")}.json`);
  if (existsSync(file)) return JSON.parse(readFileSync(file, "utf8"));
  for (let attempt = 0; attempt < 4; attempt++) {
    let response;
    try {
      response = await fetch(OVERPASS[attempt % OVERPASS.length], {
        method: "POST",
        body: new URLSearchParams({ data: overpassQuery(center) }),
        headers: { "User-Agent": USER_AGENT }
      });
    } catch (error) {
      // Queda de conexão (ECONNRESET, tempo esgotado): espera e tenta de novo.
      console.warn(`${name}: falha de rede (${error.cause?.code || error.message}); esperando para tentar de novo.`);
      await sleep(30000 * (attempt + 1));
      continue;
    }
    if (response.ok) {
      const data = await response.json();
      mkdirSync(CACHE_DIR, { recursive: true });
      writeFileSync(file, JSON.stringify(data.elements));
      await sleep(PAUSE_MS);
      return data.elements;
    }
    console.warn(`${name}: Overpass respondeu ${response.status}; esperando para tentar de novo.`);
    await sleep(30000 * (attempt + 1));
  }
  console.warn(`${name}: não consegui consultar o Overpass; pulando (rode de novo depois para completar).`);
  return null;
}

function kindOf(tags) {
  for (const key of ["amenity", "tourism", "natural", "leisure", "shop"]) {
    if (tags[key] && KINDS[`${key}=${tags[key]}`]) return `${key}=${tags[key]}`;
  }
  return null;
}

// Quanto mais informação útil cadastrada, mais acima o lugar aparece.
function score(tags) {
  return (tags.wikidata ? 3 : 0) + (tags.wikimedia_commons ? 2 : 0) + (tags.website || tags["contact:website"] ? 2 : 0)
    + (tags.opening_hours ? 1 : 0) + (tags.cuisine ? 1 : 0) + (tags.phone || tags["contact:phone"] ? 1 : 0)
    + (tags["name:pt"] ? 1 : 0);
}

function openingHours(value) {
  if (!value || value.length > 120) return null;
  return value.replace(/\b(Mo|Tu|We|Th|Fr|Sa|Su|PH)\b/g, (day) => DAYS[day]).replace(/\boff\b/g, "fechado")
    .replace(/;\s*/g, " · ").replace(/-/g, "–");
}

function cuisineText(value) {
  if (!value) return "";
  const names = value.split(/[;,]/).map((item) => CUISINES[item.trim()]).filter(Boolean);
  return names.length ? ` · cozinha ${[...new Set(names)].slice(0, 3).join(", ")}` : "";
}

function commonsFile(tags) {
  const value = tags.wikimedia_commons || "";
  return value.startsWith("File:") ? value.slice(5) : null;
}

async function getPhotos(files) {
  const FREE_LICENSE = /^(public domain|domínio público|pd|cc0|cc[ -]by(-sa)?([ -]\d(\.\d)?)?)/i;
  const strip = (value = "") => value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  const photos = {};
  for (let index = 0; index < files.length; index += 50) {
    const group = files.slice(index, index + 50);
    const params = new URLSearchParams({ action: "query", format: "json", formatversion: "2", titles: group.map((file) => `File:${file}`).join("|"), prop: "imageinfo", iiprop: "url|extmetadata", iiurlwidth: "800" });
    const data = await (await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, { headers: { "User-Agent": USER_AGENT } })).json();
    const normalized = new Map((data.query?.normalized || []).map((item) => [item.to, item.from]));
    for (const page of data.query?.pages || []) {
      const info = page.imageinfo?.[0];
      const meta = info?.extmetadata || {};
      const license = strip(meta.LicenseShortName?.value);
      if (!info || !FREE_LICENSE.test(license)) continue;
      const url = new URL(info.thumburl || info.url);
      url.search = "";
      const author = strip(meta.Artist?.value).replace(/^No machine-readable author provided\.\s*(.+?)\s+assumed.*$/i, "$1")
        .replace(/~\w+wiki/g, "").replace(/\s*\[\d+\]/g, "").slice(0, 80) || "Autor não identificado";
      photos[(normalized.get(page.title) || page.title).replace(/^File:/, "")] = { url: url.toString(), author, license, licenseUrl: meta.LicenseUrl?.value || "", file: page.title.replace(/^File:/, "") };
    }
    await sleep(300);
  }
  return photos;
}

async function main() {
  const cityData = loadWindowFile("atracoes-cidades.js", "CITY_DATA");
  if (!cityData) throw new Error("Rode antes: node ferramentas/gerar-atracoes-cidades.mjs");
  const known = new Set([
    ...Object.values(loadWindowFile("fontes-abertas.js", "OPEN_DATA")?.activities || {}).map((entry) => entry.wikidata),
    ...cityData.places.map((place) => place.wikidata)
  ].filter(Boolean));
  const knownNames = new Set(cityData.places.map((place) => `${normalize(place.city)}|${normalize(place.name)}`));

  const places = new Map();
  const skipped = [];
  for (const city of cityData.cities) {
    const elements = await fetchCity(city.name, city.coordinates);
    if (!elements) { skipped.push(city.name); continue; }
    const seenNames = new Set();
    const groups = {};
    const candidates = elements
      .map((element) => ({ element, kind: kindOf(element.tags || {}) }))
      .filter(({ element, kind }) => kind && !known.has(element.tags.wikidata))
      .sort((a, b) => score(b.element.tags) - score(a.element.tags));
    for (const { element, kind } of candidates) {
      const tags = element.tags;
      const name = tags["name:pt"] || tags.name;
      const key = normalize(name);
      if (seenNames.has(key) || knownNames.has(`${normalize(city.name)}|${key}`)) continue;
      const [group] = KINDS[kind];
      if ((groups[group] || 0) >= LIMITS[group]) continue;
      const lat = element.lat ?? element.center?.lat;
      const lon = element.lon ?? element.center?.lon;
      if (lat === undefined || lon === undefined) continue;
      seenNames.add(key);
      groups[group] = (groups[group] || 0) + 1;
      const id = `osm-${element.type[0]}${element.id}`;
      if (!places.has(id)) places.set(id, { element, kind, name, coordinates: [lat, lon] });
    }
    console.log(`${city.name}: ${Object.entries(groups).map(([group, count]) => `${group} ${count}`).join(", ") || "nada"}`);
  }

  const all = [...places.entries()];
  const photos = await getPhotos([...new Set(all.map(([, place]) => commonsFile(place.element.tags)).filter(Boolean))]);
  const output = all.map(([id, place]) => {
    const tags = place.element.tags;
    const [, category, interests, label] = KINDS[place.kind];
    const nearCities = cityData.cities
      .map((city) => [city.name, Math.round(distanceKm(place.coordinates, city.coordinates))])
      .filter(([, km]) => km <= NEAR_KM)
      .sort((a, b) => a[1] - b[1]);
    const result = {
      id,
      name: place.name,
      city: nearCities[0][0],
      country: cityData.cities.find((city) => city.name === nearCities[0][0]).country,
      category,
      interests,
      kind: label,
      details: cuisineText(tags.cuisine).replace(/^ · /, ""),
      coordinates: place.coordinates.map((value) => Number(value.toFixed(5))),
      nearCities,
      osm: `${place.element.type}/${place.element.id}`
    };
    const hours = openingHours(tags.opening_hours);
    if (hours) result.openingHours = hours;
    const website = tags.website || tags["contact:website"];
    if (website && /^https?:\/\//i.test(website)) result.website = website;
    const file = commonsFile(tags);
    if (file && photos[file]) result.photo = photos[file];
    return result;
  });

  writeFileSync(join(ROOT, "dados", "osm-lugares.js"),
    "// Arquivo gerado por ferramentas/gerar-osm.mjs. Não edite à mão.\n"
    + "// Dados © colaboradores do OpenStreetMap (https://www.openstreetmap.org/copyright), licença ODbL.\n"
    + `window.OSM_DATA = ${JSON.stringify({ generatedAt: new Date().toISOString().slice(0, 10), places: output })};\n`);
  console.log(`\n${output.length} lugares do OpenStreetMap (${output.filter((place) => place.openingHours).length} com horário, ${output.filter((place) => place.photo).length} com foto).`);
  if (skipped.length) console.log(`Cidades sem dados do OSM nesta rodada (${skipped.length}): ${skipped.join(", ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
