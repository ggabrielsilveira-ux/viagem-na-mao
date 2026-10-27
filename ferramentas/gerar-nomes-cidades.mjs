// Nomes alternativos de cada cidade (Tokyo, Kyoto, Munich, Firenze...) para a busca do cadastro achar a
// cidade mesmo quando a pessoa digita o nome em inglês ou no idioma local.
// Fonte: rótulos e apelidos do Wikidata (CC0), a partir da página da Wikipedia em português de cada cidade.
//
// Uso: node ferramentas/gerar-nomes-cidades.mjs   (grava ferramentas/nomes-cidades.json)
// Depois rode node ferramentas/dividir-cidades.mjs, que leva os nomes para o índice dados/cidades.js.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "ferramentas", "nomes-cidades.json");
const USER_AGENT = "ViagemNaMao/0.1 (prototipo nao comercial; https://github.com/ggabrielsilveira-ux/viagem-na-mao)";
// Línguas de alfabeto latino que um brasileiro costuma digitar (sem as que põem "cidade de" no nome); apelidos só do inglês.
const LANGUAGES = ["en", "es", "it", "fr", "de", "nl", "ca", "pl", "cs", "hu", "sv", "ro", "tr"];
const ALIAS_LANGUAGES = ["en"];
const MAX_ALIASES = 8;
// Nomes que o Wikidata não traz (a entrada "Lago de Braies" usa a página do município de Braies;
// a de Bruxelas é a da região).
const EXTRA = {
  "Lago de Braies": ["Lago di Braies", "Pragser Wildsee", "Braies", "Prags"],
  "Nova York": ["NYC"],
  "Bruxelas": ["Brussels", "Bruxelles", "Brussel", "Bruselas"]
};
// Nomes administrativos (município, região...) só ocupam espaço: a busca já acha pelo nome da cidade.
const ADMINISTRATIVE = /municipal|r[eé]gi[oó]n?|regiunea|gewest|prefecture|metropolis|special administrative|citt[aà] di|city of|comune|gemeinde/i;

const normalize = (value) => value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const latin = (value) => /^[\p{Script=Latin}\d\s'’.\-]+$/u.test(value);

// Lista [nome no app, título na Wikipedia em português] lida do gerador do catálogo.
function loadCities() {
  const source = readFileSync(join(ROOT, "ferramentas", "gerar-atracoes-cidades.mjs"), "utf8");
  const block = source.slice(source.indexOf("const CITIES"), source.indexOf("];", source.indexOf("const CITIES")));
  return [...block.matchAll(/\["([^"]+)", "([^"]+)", "[^"]+"/g)].map(([, name, title]) => ({ name, title }));
}

async function getJson(url) {
  for (let attempt = 1; ; attempt++) {
    const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
    if (response.ok) return response.json();
    if (attempt >= 4) throw new Error(`${response.status} em ${url}`);
    await new Promise((resolve) => setTimeout(resolve, 3000 * attempt));
  }
}

async function main() {
  const cities = loadCities();
  const qids = new Map();
  for (let i = 0; i < cities.length; i += 50) {
    const batch = cities.slice(i, i + 50);
    const url = `https://pt.wikipedia.org/w/api.php?action=query&format=json&redirects=1&prop=pageprops&ppprop=wikibase_item&titles=${encodeURIComponent(batch.map((city) => city.title).join("|"))}`;
    const data = await getJson(url);
    const resolved = new Map(batch.map((city) => [city.title, city.title]));
    for (const step of [...(data.query.normalized || []), ...(data.query.redirects || [])]) {
      for (const [title, current] of resolved) if (current === step.from) resolved.set(title, step.to);
    }
    const byTitle = new Map(Object.values(data.query.pages).map((page) => [page.title, page.pageprops?.wikibase_item]));
    for (const city of batch) {
      const qid = byTitle.get(resolved.get(city.title));
      if (qid) qids.set(city.name, qid);
      else console.log(`${city.name}: sem item no Wikidata`);
    }
  }
  const entities = {};
  const ids = [...new Set(qids.values())];
  for (let i = 0; i < ids.length; i += 50) {
    const url = `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=labels|aliases&languages=${[...new Set([...LANGUAGES, ...ALIAS_LANGUAGES])].join("|")}&ids=${ids.slice(i, i + 50).join("|")}`;
    Object.assign(entities, (await getJson(url)).entities);
  }
  const result = {};
  for (const { name } of cities) {
    const entity = entities[qids.get(name)];
    const candidates = [...(EXTRA[name] || [])];
    if (entity) {
      for (const language of LANGUAGES) if (entity.labels?.[language]) candidates.push(entity.labels[language].value);
      for (const language of ALIAS_LANGUAGES) for (const alias of entity.aliases?.[language] || []) candidates.push(alias.value);
    }
    const seen = new Set([normalize(name)]);
    const aliases = [];
    for (const candidate of candidates) {
      const key = normalize(candidate);
      if (!key || key.length < 3 || candidate.length > 40 || !latin(candidate) || ADMINISTRATIVE.test(candidate) || seen.has(key)) continue;
      seen.add(key);
      aliases.push(candidate);
      if (aliases.length >= MAX_ALIASES) break;
    }
    if (aliases.length) result[name] = aliases;
  }
  writeFileSync(OUT, `${JSON.stringify(result, null, 1)}\n`);
  console.log(`${Object.keys(result).length} de ${cities.length} cidades com nomes alternativos em ferramentas/nomes-cidades.json.`);
}

main().catch((error) => { console.error(error); process.exit(1); });
