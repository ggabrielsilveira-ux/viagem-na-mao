// Gera dados/inspiracao.js: o cartão "Sobre o lugar" de cada foto da Inspiração do dia (tela inicial).
// Resumo da Wikipedia em português (CC BY-SA 4.0) e dados do Wikidata (CC0): visitantes por ano
// (P1174, com o ano da medição), criação (P571), altura (P2048) e Patrimônio Mundial da UNESCO (P1435).
// Só entra o que as fontes têm; nada é estimado.
//
// Uso: node ferramentas/gerar-inspiracao.mjs

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const UA = { "User-Agent": "ViagemNaMao/0.1 (https://github.com/ggabrielsilveira-ux/viagem-na-mao)" };
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// [nome usado em HERO_DESTINATIONS no script.js, título da Wikipedia em português, cidade do catálogo para planejar]
const PLACES = [
  ["Cristo Redentor", "Cristo Redentor", "Rio de Janeiro"], ["Torre Eiffel", "Torre Eiffel", "Paris"],
  ["Cataratas do Iguaçu", "Cataratas do Iguaçu", "Foz do Iguaçu"], ["Museu do Louvre", "Museu do Louvre", "Paris"],
  ["Machu Picchu", "Machu Picchu", "Cusco"], ["Coliseu", "Coliseu", "Roma"],
  ["Lençóis Maranhenses", "Parque Nacional dos Lençóis Maranhenses", "Barreirinhas"], ["Grande Muralha da China", "Grande Muralha da China", "Pequim"],
  ["Santorini", "Santorini", "Santorini"], ["Taj Mahal", "Taj Mahal", "Agra"],
  ["Estátua da Liberdade", "Estátua da Liberdade", "Nova York"], ["Pirâmides de Gizé", "Necrópole de Gizé", "Cairo"],
  ["Basílica da Sagrada Família", "Templo Expiatório da Sagrada Família", "Barcelona"], ["Palácio de Versalhes", "Palácio de Versalhes", "Paris"],
  ["Ópera de Sydney", "Ópera de Sydney", "Sydney"], ["Portão de Brandemburgo", "Portão de Brandemburgo", "Berlim"],
  ["Alhambra", "Alhambra", "Granada"], ["Basílica de São Pedro", "Basílica de São Pedro", "Roma"],
  ["Vila do Papai Noel", "Rovaniemi", "Rovaniemi"], ["Aurora boreal", "Aurora polar", ""],
  ["Dolomitas", "Dolomitas", "Cortina d'Ampezzo"]
];

async function getJson(url) {
  for (let attempt = 0; attempt < 5; attempt++) {
    await sleep(800);
    const text = await (await fetch(url, { headers: UA })).text();
    try { return JSON.parse(text); } catch { await sleep(4000 * (attempt + 1)); }
  }
  throw new Error(`Sem resposta: ${url}`);
}

// A API devolve no máximo 20 resumos por consulta: busca em partes.
const alias = new Map();
const pages = new Map();
for (let i = 0; i < PLACES.length; i += 15) {
  const wiki = await getJson("https://pt.wikipedia.org/w/api.php?" + new URLSearchParams({
    action: "query", format: "json", formatversion: "2", redirects: "1", prop: "extracts|pageprops|info", inprop: "url",
    exintro: "1", explaintext: "1", exsentences: "3", exlimit: "max", ppprop: "wikibase_item", titles: PLACES.slice(i, i + 15).map(([, title]) => title).join("|")
  }));
  [...(wiki.query.normalized || []), ...(wiki.query.redirects || [])].forEach((item) => alias.set(item.from, item.to));
  wiki.query.pages.forEach((page) => pages.set(page.title, page));
}
const pageOf = (title) => { while (alias.has(title)) title = alias.get(title); return pages.get(title); };

const ids = PLACES.map(([, title]) => pageOf(title)?.pageprops?.wikibase_item).filter(Boolean);
const entities = (await getJson("https://www.wikidata.org/w/api.php?" + new URLSearchParams({ action: "wbgetentities", format: "json", props: "claims", ids: ids.join("|") }))).entities;

const number = (value, digits = 1) => value.toLocaleString("pt-BR", { maximumFractionDigits: digits });
function visitors(claims) {
  const list = (claims.P1174 || []).map((claim) => ({
    amount: Number(claim.mainsnak.datavalue?.value?.amount),
    year: Number((claim.qualifiers?.P585?.[0]?.datavalue?.value?.time || "").slice(1, 5)) || null
  })).filter((item) => item.amount > 0 && item.year);
  if (!list.length) return null;
  const latest = list.sort((a, b) => b.year - a.year)[0];
  const text = latest.amount >= 1e6 ? `${number(latest.amount / 1e6)} milhões de visitantes` : latest.amount >= 1e3 ? `${number(latest.amount / 1e3, 0)} mil visitantes` : `${latest.amount} visitantes`;
  return { texto: `${text} por ano`, ano: latest.year };
}
function inception(claims) {
  const value = claims.P571?.[0]?.mainsnak?.datavalue?.value;
  if (!value) return null;
  const year = Number(value.time.slice(0, value.time.indexOf("-", 1)));
  if (value.precision >= 9) return year < 0 ? `c. ${Math.abs(year)} a.C.` : year < 1000 ? `ano ${year}` : String(year);
  if (value.precision === 7) {
    const century = Math.ceil(Math.abs(year) / 100);
    const roman = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"][century];
    return roman ? `século ${roman}${year < 0 ? " a.C." : ""}` : null;
  }
  return null;
}
function height(claims) {
  const value = claims.P2048?.[0]?.mainsnak?.datavalue?.value;
  if (!value || !value.unit.endsWith("/Q11573")) return null;
  // Alturas pequenas (muralhas, por exemplo) confundem mais do que ajudam.
  return Number(value.amount) >= 10 ? `${number(Number(value.amount), 0)} m` : null;
}

const info = {};
for (const [name, title, city] of PLACES) {
  const page = pageOf(title);
  if (!page || page.missing) { console.warn(`${name}: página "${title}" não encontrada`); continue; }
  const claims = entities[page.pageprops?.wikibase_item]?.claims || {};
  info[name] = {
    resumo: (page.extract || "").replace(/\s*\([^()]*\)/g, "").replace(/\s+/g, " ").trim(),
    fonte: { titulo: page.title, url: page.fullurl },
    visitantes: visitors(claims),
    criacao: inception(claims),
    altura: height(claims),
    unesco: (claims.P1435 || []).some((claim) => claim.mainsnak.datavalue?.value?.id === "Q9259"),
    cidade: city
  };
  console.log(`${name}: ${[info[name].visitantes && `${info[name].visitantes.texto} (${info[name].visitantes.ano})`, info[name].criacao, info[name].altura, info[name].unesco && "UNESCO"].filter(Boolean).join(" · ") || "só resumo"}`);
}

writeFileSync(join(ROOT, "dados", "inspiracao.js"),
  `// Arquivo gerado por ferramentas/gerar-inspiracao.mjs. Não edite à mão.\n`
  + `// Resumos: Wikipedia em português (CC BY-SA 4.0). Dados: Wikidata (CC0).\n`
  + `window.INSPIRATION_INFO = ${JSON.stringify(info)};\n`);
console.log(`\n${Object.keys(info).length} lugares em dados/inspiracao.js.`);
