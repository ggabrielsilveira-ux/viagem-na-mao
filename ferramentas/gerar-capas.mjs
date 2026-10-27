// Gera dados/capas-cidades.json: a foto de capa de cada cidade, do seu cartão-postal
// (o ponto turístico mais conhecido, escolhido à mão em ferramentas/cartoes-postais.json).
//
// Para cada cartão-postal (e, se faltar, para a própria cidade), procura no Wikimedia Commons uma foto
// horizontal que mostre aquele lugar (propriedade "retrata", P180), preferindo fotos de destaque e de
// qualidade; se não houver, usa a imagem oficial (P18) do item no Wikidata, se for horizontal.
// Ficam de fora montagens, mapas, bandeiras e licenças NC/ND. Correções à mão: CAPA_FIXA abaixo.
//
// Uso: node ferramentas/gerar-capas.mjs [Cidade ...]   (só as cidades indicadas, mantendo as demais; depois: node ferramentas/dividir-cidades.mjs, que põe a capa em cada pacote)

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const UA = { "User-Agent": "ViagemNaMao/0.1 (https://github.com/ggabrielsilveira-ux/viagem-na-mao; contato@viagemnamao.com)" };
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const BAD_FILE = /montage|montagem|collage|colagem|mosaic|mosaico|collection|bandeira|\bflag\b|\bmapa?\b|\bmap\b|locator|localiza|bras[aã]o|coat.of.arms|\blogo\b|\bseal\b|\bselo\b|satellite|sat[ée]lite|landsat/i;
const POSTAIS = JSON.parse(readFileSync(join(ROOT, "ferramentas", "cartoes-postais.json"), "utf8"));
// Cidade → arquivo do Commons escolhido à mão (quando a busca automática não acerta).
const CAPA_FIXA = {
  "Santorini": "1000 Three domes of Oia in Santorini Photo by Giles Laurent.jpg",
  "San Diego": "San Diego skyline at dusk from Coronado 2015.jpg",
  "Rosário": "Rosario National Flag Memorial-20110510-RM-143010.jpg",
  "Ibiza": "Eivissa - Dalt Vila from Airplane.jpg",
  "Colônia do Sacramento": "Barrio Histórico, Col Del Sacramento, Colonia, Uruguay - panoramio (1).jpg",
  "Punta del Diablo": "Playa, Punta del Diablo, Rocha, Uruguay - panoramio.jpg",
  "Mar del Plata": "La Rambla Marplatense - panoramio.jpg",
  "Puerto Madryn": "Playa en Puerto Madryn, Argentina.jpg",
  "La Serena": "Faro Monumental de La Serena. 08.12.2022.jpg",
  "El Paso": "El Paso skyline.jpg",
  "Palm Springs": "Palm Springs Tramway Mountain Top View March 1996 01.jpg"
};
// Cidades em que a imagem oficial não serve de capa (detalhe, noturna, ângulo estranho): busca foto de destaque/qualidade.
const CAPA_BUSCA = new Set(["Toronto", "Vancouver", "Melbourne", "Ubatuba", "Daegu", "Daejeon"]);
// Detalhes e interiores não servem de capa.
const NOT_VIEW = /detail|detalhe|interior|inside|close-?up|floatplane|seaplane/i;

async function getJson(url) {
  for (let attempt = 0; attempt < 6; attempt++) {
    await sleep(700);
    try {
      const text = await (await fetch(url, { headers: UA })).text();
      return JSON.parse(text);
    } catch {
      await sleep(5000 * (attempt + 1));
    }
  }
  throw new Error(`Sem resposta: ${url}`);
}

const api = (host, params) => getJson(`https://${host}/w/api.php?` + new URLSearchParams({ format: "json", formatversion: "2", ...params }));

async function qidsByTitle(titles) {
  const result = new Map();
  for (let i = 0; i < titles.length; i += 40) {
    const group = titles.slice(i, i + 40);
    const data = await api("pt.wikipedia.org", { action: "query", redirects: "1", prop: "pageprops", ppprop: "wikibase_item|disambiguation", titles: group.join("|") });
    const alias = new Map([...(data.query.normalized || []), ...(data.query.redirects || [])].map((item) => [item.from, item.to]));
    const pages = new Map(data.query.pages.map((page) => [page.title, page]));
    for (const title of group) {
      let name = title;
      while (alias.has(name)) name = alias.get(name);
      const page = pages.get(name);
      if (page && !page.missing && page.pageprops?.disambiguation === undefined && page.pageprops?.wikibase_item) result.set(title, { qid: page.pageprops.wikibase_item, title: page.title });
    }
  }
  return result;
}

function goodInfo(page, { landscapeOnly = true } = {}) {
  const info = page.imageinfo?.[0];
  if (!info || BAD_FILE.test(page.title)) return null;
  const license = info.extmetadata?.LicenseShortName?.value || "";
  if (!/CC BY|CC0|Public domain|PD|Domínio público/i.test(license) || /NC|ND/.test(license)) return null;
  const ratio = info.width / info.height;
  // A imagem oficial pode ser em pé (o app mostra inteira sobre fundo desfocado); as da busca, só horizontais.
  if (landscapeOnly ? ratio < 1.25 || ratio > 2.4 || info.width < 1200 : ratio < 0.55 || ratio > 2.6 || Math.max(info.width, info.height) < 900) return null;
  const author = (info.extmetadata?.Artist?.value || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 80) || "Autor no Wikimedia Commons";
  return { arquivo: page.title.replace(/^File:/, ""), url: info.thumburl, autor: author, licenca: license, pagina: info.descriptionurl, proporcao: Number(ratio.toFixed(2)) };
}

const IMAGE_PROPS = { prop: "imageinfo", iiprop: "url|size|extmetadata", iiurlwidth: "1200" };

// Fotos que retratam o item, das melhores para as comuns.
async function depicting(qid) {
  for (const extra of ["incategory:Featured_pictures_on_Wikimedia_Commons", "incategory:Quality_images"]) {
    const data = await api("commons.wikimedia.org", { action: "query", generator: "search", gsrnamespace: "6", gsrlimit: "20", gsrsearch: `haswbstatement:P180=${qid} filetype:bitmap ${extra}`.trim(), ...IMAGE_PROPS });
    const pages = (data.query?.pages || []).sort((a, b) => (a.index || 0) - (b.index || 0));
    for (const page of pages) {
      if (NOT_VIEW.test(page.title)) continue;
      const info = goodInfo(page);
      if (info) return info;
    }
  }
  return null;
}

async function officialImage(qid) {
  const entity = (await api("www.wikidata.org", { action: "wbgetentities", props: "claims", ids: qid })).entities?.[qid];
  const file = (entity?.claims?.P18 || []).map((claim) => claim.mainsnak.datavalue?.value).find(Boolean);
  if (!file) return null;
  const data = await api("commons.wikimedia.org", { action: "query", titles: `File:${file}`, ...IMAGE_PROPS });
  return goodInfo(data.query.pages[0], { landscapeOnly: false });
}

async function fixedImage(file) {
  const data = await api("commons.wikimedia.org", { action: "query", titles: `File:${file}`, ...IMAGE_PROPS });
  const page = data.query.pages[0];
  const info = page.imageinfo?.[0];
  if (!info) return null;
  return { arquivo: file, proporcao: Number((info.width / info.height).toFixed(2)), url: info.thumburl, autor: (info.extmetadata?.Artist?.value || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 80), licenca: info.extmetadata?.LicenseShortName?.value || "", pagina: info.descriptionurl };
}

const context = { window: {} };
vm.runInNewContext(readFileSync(join(ROOT, "dados", "atracoes-cidades.js"), "utf8"), context);
const cities = context.window.CITY_DATA.cities;
const src = readFileSync(join(ROOT, "ferramentas", "gerar-atracoes-cidades.mjs"), "utf8");
const start = src.indexOf("const CITIES = [") + 15;
const cityTitles = new Map(eval(src.slice(start, src.indexOf("];", start) + 1)).map(([name, title]) => [name, title]));

const titles = [...new Set(cities.flatMap((city) => [POSTAIS[city.name], cityTitles.get(city.name)].filter(Boolean)))];
const pages = await qidsByTitle(titles);

const only = process.argv.slice(2);
let covers = {};
if (only.length) covers = JSON.parse(readFileSync(join(ROOT, "dados", "capas-cidades.json"), "utf8"));
const report = { postal: 0, cidade: 0, nenhuma: [] };
for (const city of cities) {
  if (only.length && !only.includes(city.name)) continue;
  delete covers[city.name];
  if (CAPA_FIXA[city.name]) {
    const info = await fixedImage(CAPA_FIXA[city.name]);
    if (info) { covers[city.name] = { lugar: city.name, ...info }; report.postal += 1; continue; }
  }
  const postal = POSTAIS[city.name] && POSTAIS[city.name] !== cityTitles.get(city.name) ? pages.get(POSTAIS[city.name]) : null;
  const own = pages.get(cityTitles.get(city.name)) || (POSTAIS[city.name] ? pages.get(POSTAIS[city.name]) : null);
  let cover = null;
  if (postal) {
    const info = CAPA_BUSCA.has(city.name) ? await depicting(postal.qid) : (await officialImage(postal.qid)) || (await depicting(postal.qid));
    if (info) { cover = { lugar: postal.title, ...info }; report.postal += 1; }
  }
  if (!cover && own) {
    const info = CAPA_BUSCA.has(city.name) ? await depicting(own.qid) : (await officialImage(own.qid)) || (await depicting(own.qid));
    if (info) { cover = { lugar: city.name, ...info }; report.cidade += 1; }
  }
  if (cover) covers[city.name] = cover;
  else report.nenhuma.push(city.name);
  process.stdout.write(`${city.name}: ${cover ? `${cover.lugar} · ${cover.arquivo}` : "sem capa"}\n`);
}
writeFileSync(join(ROOT, "dados", "capas-cidades.json"), JSON.stringify(covers, null, 1) + "\n");
console.log(`\n${Object.keys(covers).length} capas (${report.postal} pelo cartão-postal, ${report.cidade} pela cidade); sem capa: ${report.nenhuma.join(", ") || "nenhuma"}.`);
