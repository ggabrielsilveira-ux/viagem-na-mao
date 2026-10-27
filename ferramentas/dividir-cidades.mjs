// Divide o catálogo em um índice pequeno (dados/cidades.js, carregado sempre) e um pacote por cidade
// (dados/cidades/<cidade>.js), que o app só baixa quando a cidade entra numa viagem.
//
// Uso: node ferramentas/dividir-cidades.mjs
// Rode depois de gerar-atracoes-cidades.mjs e gerar-osm.mjs (lê os arquivos que eles geram).
//
// Cada pacote leva os lugares da cidade e os das cidades vizinhas que ficam perto dela (nearCities),
// para o Descobrir mostrar o mesmo que mostrava com o catálogo inteiro.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "dados", "cidades");

// Mesmos slugify e sameCity do script.js do app.
const slugify = (value) => value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const sameCity = (a, b) => slugify(a || "") === slugify(b || "");

function load(file, key) {
  const context = { window: {} };
  vm.runInNewContext(readFileSync(join(ROOT, "dados", file), "utf8"), context);
  return context.window[key];
}

const cityData = load("atracoes-cidades.js", "CITY_DATA");
const osmData = load("osm-lugares.js", "OSM_DATA");
// Capa de cada cidade (cartão-postal), gerada por gerar-capas.mjs.
let covers = {};
try { covers = JSON.parse(readFileSync(join(ROOT, "dados", "capas-cidades.json"), "utf8")); } catch {}
// Nomes alternativos (Tokyo, Firenze...) para a busca do cadastro, gerados por gerar-nomes-cidades.mjs.
let altNames = {};
try { altNames = JSON.parse(readFileSync(join(ROOT, "ferramentas", "nomes-cidades.json"), "utf8")); } catch {}
const indexCities = cityData.cities.map((city) => (altNames[city.name] ? { ...city, aliases: altNames[city.name] } : city));
const belongs = (place, city) => sameCity(place.city, city) || (place.nearCities || []).some(([name]) => sameCity(name, city));

writeFileSync(join(ROOT, "dados", "cidades.js"),
  `// Arquivo gerado por ferramentas/dividir-cidades.mjs. Não edite à mão.\n`
  + `// Índice das cidades do catálogo; os lugares de cada uma ficam em dados/cidades/<cidade>.js.\n`
  + `window.CITY_DATA = ${JSON.stringify({ generatedAt: cityData.generatedAt, radiusKm: cityData.radiusKm, cities: indexCities, places: [] })};\n`);

mkdirSync(OUT_DIR, { recursive: true });
const wanted = new Set();
let biggest = { size: 0 };
for (const city of cityData.cities) {
  const slug = slugify(city.name);
  const pack = {
    city: city.name,
    cover: covers[city.name] ? { lugar: covers[city.name].lugar, url: covers[city.name].url, autor: covers[city.name].autor, licenca: covers[city.name].licenca, pagina: covers[city.name].pagina, proporcao: covers[city.name].proporcao } : null,
    places: cityData.places.filter((place) => belongs(place, city.name)),
    osm: osmData.places.filter((place) => belongs(place, city.name))
  };
  const text = `// Arquivo gerado por ferramentas/dividir-cidades.mjs. Não edite à mão.\n`
    + `// Textos: Wikipedia (CC BY-SA 4.0); dados: Wikidata (CC0) e © colaboradores do OpenStreetMap (ODbL); fotos: Wikimedia Commons (licença em cada foto).\n`
    + `(window.CITY_PACKS = window.CITY_PACKS || {})[${JSON.stringify(slug)}] = ${JSON.stringify(pack)};\n`;
  writeFileSync(join(OUT_DIR, `${slug}.js`), text);
  wanted.add(`${slug}.js`);
  if (text.length > biggest.size) biggest = { size: text.length, name: city.name };
}
for (const file of readdirSync(OUT_DIR)) if (file.endsWith(".js") && !wanted.has(file)) unlinkSync(join(OUT_DIR, file));
console.log(`${wanted.size} pacotes em dados/cidades/ (maior: ${biggest.name}, ${(biggest.size / 1024).toFixed(0)} KB).`);
