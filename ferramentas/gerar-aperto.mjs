// Gera dados/aperto/<cidade>.js para a seção "Na Hora do Aperto" do Guia: água potável, banheiros,
// pontos de recarga de celular, farmácias e hospitais num raio de 10 km do centro de cada cidade.
//
// Uso: CAMADA=aperto node ferramentas/extrair-pbf.mjs   (monta ferramentas/.cache/aperto/)
//      node ferramentas/gerar-aperto.mjs
//
// Cada arquivo é carregado pelo app só quando a pessoa abre a seção daquela cidade.
// Só entra o que o OpenStreetMap informa: nada de inventar horário, gratuidade ou acessibilidade.
// Dados © colaboradores do OpenStreetMap, licença ODbL.

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE_DIR = join(ROOT, "ferramentas", ".cache", "aperto");
const OUT_DIR = join(ROOT, "dados", "aperto");

// Mesmo slugify do script.js do app.
const slugify = (value) => value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
// Mesmo nome de arquivo que extrair-pbf.mjs grava.
const cacheName = (name) => name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/ /g, "-");

function kindOf(tags) {
  if (tags.amenity === "toilets") return "banheiro";
  if (tags.amenity === "device_charging_station") return "recarga";
  if (tags.amenity === "pharmacy") return "farmacia";
  if (tags.amenity === "hospital") return "hospital";
  return "agua";
}

// Só os detalhes que o OSM informa, com valores conhecidos.
function details(tags) {
  const out = {};
  if (tags.opening_hours) out.h = tags.opening_hours.slice(0, 120);
  if (tags.fee === "yes" || tags.fee === "no") out.p = tags.fee;
  if (/^(yes|limited|no)$/.test(tags.wheelchair || "")) out.a = tags.wheelchair;
  if (tags.amenity === "hospital" && (tags.emergency === "yes" || tags.emergency === "no")) out.e = tags.emergency;
  if (tags.changing_table === "yes") out.t = "yes";
  return out;
}

const name = (tags) => (tags["name:pt"] || tags.name || "").trim().slice(0, 80);
const round = (value) => Number(value.toFixed(5));

const context = { window: {} };
vm.runInNewContext(readFileSync(join(ROOT, "dados", "atracoes-cidades.js"), "utf8"), context);
const cities = context.window.CITY_DATA.cities;

mkdirSync(OUT_DIR, { recursive: true });
const generatedAt = new Date().toISOString().slice(0, 10);
const wanted = new Set();
const summary = [];
for (const city of cities) {
  const file = join(CACHE_DIR, `${cacheName(city.name)}.json`);
  if (!existsSync(file)) { console.warn(`${city.name}: sem cache em ferramentas/.cache/aperto (rode CAMADA=aperto node ferramentas/extrair-pbf.mjs).`); continue; }
  const seen = new Set();
  const points = [];
  for (const element of JSON.parse(readFileSync(file, "utf8"))) {
    const lat = element.lat ?? element.center?.lat, lon = element.lon ?? element.center?.lon;
    if (lat == null || lon == null || !element.tags) continue;
    const kind = kindOf(element.tags);
    // Mesmo ponto mapeado duas vezes (nó e área, por exemplo): fica um só.
    const key = `${kind}|${round(lat).toFixed(4)}|${round(lon).toFixed(4)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const extra = details(element.tags);
    const row = [round(lat), round(lon), kind, name(element.tags)];
    if (Object.keys(extra).length) row.push(extra);
    points.push(row);
  }
  const slug = slugify(city.name);
  wanted.add(`${slug}.js`);
  const payload = { cidade: city.name, geradoEm: generatedAt, raioKm: 10, pontos: points };
  writeFileSync(join(OUT_DIR, `${slug}.js`),
    `// Na Hora do Aperto · ${city.name}. Dados © colaboradores do OpenStreetMap (ODbL), gerado por ferramentas/gerar-aperto.mjs.\n`
    + `(window.APERTO = window.APERTO || {})[${JSON.stringify(slug)}] = ${JSON.stringify(payload)};\n`);
  const counts = {};
  points.forEach(([, , kind]) => { counts[kind] = (counts[kind] || 0) + 1; });
  summary.push(`${city.name}: ${Object.entries(counts).map(([kind, count]) => `${kind} ${count}`).join(", ") || "nada"}`);
}
// Remove arquivos de cidades que saíram do catálogo.
for (const file of readdirSync(OUT_DIR)) if (file.endsWith(".js") && !wanted.has(file)) unlinkSync(join(OUT_DIR, file));
console.log(summary.join("\n"));
console.log(`\n${wanted.size} cidades em dados/aperto/.`);
