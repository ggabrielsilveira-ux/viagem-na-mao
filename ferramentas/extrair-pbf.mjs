// Alternativa ao Overpass: monta o cache de ferramentas/.cache/osm/<cidade>.json a partir de extratos
// .osm.pbf do Geofabrik (https://download.geofabrik.de/), no mesmo formato que gerar-osm.mjs grava
// (array de elementos {type, id, lat/lon ou center, tags}). Depois rode: SO_CACHE=1 node ferramentas/gerar-osm.mjs
//
// Uso:
//   node ferramentas/extrair-pbf.mjs --plano          mostra qual extrato cobre cada cidade sem cache (não baixa nada)
//   node ferramentas/extrair-pbf.mjs                  baixa cada extrato necessário, extrai e apaga o .pbf
//   node ferramentas/extrair-pbf.mjs arquivo.osm.pbf Cidade [Cidade ...]
//                                                     usa um .pbf já baixado para as cidades indicadas
// Variáveis: CAMADA=aperto (pontos úteis da seção "Na Hora do Aperto": água, banheiro, recarga e saúde,
// gravados em ferramentas/.cache/aperto/; depois rode node ferramentas/gerar-aperto.mjs), PBF_DIR (pasta dos downloads; padrão ferramentas/.cache/pbf — a pasta do projeto fica no OneDrive,
// então para extratos grandes vale apontar para fora dele), MANTER_PBF=1 (não apaga o .pbf depois de extrair).
//
// Não usa dependências: lê o formato PBF direto (protobuf + zlib do Node), em streaming, bloco a bloco.
// Nunca sobrescreve um arquivo de cache que já exista (outro processo pode estar gravando nele).
// Dados © colaboradores do OpenStreetMap, licença ODbL.

import { readFileSync, writeFileSync, mkdirSync, existsSync, openSync, readSync, closeSync, statSync, unlinkSync, createWriteStream, renameSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import zlib from "node:zlib";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const APERTO = process.env.CAMADA === "aperto";
// OSM_CACHE_DIR permite gravar em outra pasta (útil para comparar com o cache vindo do Overpass).
const CACHE_DIR = resolve(process.env.OSM_CACHE_DIR || join(ROOT, "ferramentas", ".cache", APERTO ? "aperto" : "osm"));
const PBF_DIR = resolve(process.env.PBF_DIR || join(ROOT, "ferramentas", ".cache", "pbf"));
const USER_AGENT = "ViagemNaMao/0.1 (prototipo nao comercial; https://github.com/ggabrielsilveira-ux/viagem-na-mao)";

// Mesmas consultas de overpassQuery() em gerar-osm.mjs: [raio em km, teste das tags].
const CLAUSES_LUGARES = [
  [15, (t) => /^(attraction|viewpoint|museum|gallery|zoo|theme_park|aquarium)$/.test(t.tourism || "") && t.name],
  [25, (t) => t.natural === "beach" && t.name],
  [50, (t) => t.natural === "waterfall" && t.name],
  [50, (t) => t.natural === "peak" && t.name && t.wikidata],
  [50, (t) => t.tourism === "viewpoint" && t.name],
  [8, (t) => /^(restaurant|cafe|bar|ice_cream|marketplace)$/.test(t.amenity || "") && t.name && t.opening_hours],
  [15, (t) => t.shop === "mall" && t.name],
  [50, (t) => /^(park|nature_reserve)$/.test(t.leisure || "") && t.name && t.wikidata]
];
// "Na Hora do Aperto": pontos úteis perto do centro, com ou sem nome.
const APERTO_KM = 10;
const drinkable = (t) => t.drinking_water === "yes";
const publicAccess = (t) => !/^(private|no|customers|permissive_staff)$/.test(t.access || "");
const CLAUSES_APERTO = [
  [APERTO_KM, (t) => t.amenity === "drinking_water" && t.drinking_water !== "no"],
  [APERTO_KM, (t) => (t.amenity === "fountain" || t.amenity === "water_point" || t.man_made === "water_tap") && drinkable(t)],
  [APERTO_KM, (t) => t.amenity === "toilets" && publicAccess(t)],
  [APERTO_KM, (t) => t.amenity === "device_charging_station" && publicAccess(t)],
  [APERTO_KM, (t) => t.amenity === "pharmacy" || t.amenity === "hospital"]
];
const CLAUSES = APERTO ? CLAUSES_APERTO : CLAUSES_LUGARES;
const INTEREST_KEYS = new Set(APERTO ? ["amenity", "man_made"] : ["tourism", "natural", "amenity", "shop", "leisure"]);
const MAX_KM = APERTO ? APERTO_KM : 50;
// Em relações grandes (parques, reservas) guarda só 1 a cada N nós das vias membro: basta para centro e distância.
const RELATION_NODE_STEP = 5;

function matchRadius(tags) {
  let radius = 0;
  for (const [km, test] of CLAUSES) if (km > radius && test(tags)) radius = km;
  return radius;
}

function normalize(value) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
const cacheFile = (name) => join(CACHE_DIR, `${normalize(name).replace(/ /g, "-")}.json`);
// Um cache "[]" é resposta vazia do Overpass (tempo esgotado no servidor), não dado real: conta como faltando.
const hasCache = (file) => existsSync(file) && statSync(file).size > 2;

function distanceKm(lat1, lon1, lat2, lon2) {
  const rad = (value) => (value * Math.PI) / 180;
  const a = Math.sin(rad(lat2 - lat1) / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lon2 - lon1) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}

function loadCities() {
  const context = { window: {} };
  vm.runInNewContext(readFileSync(join(ROOT, "dados", "atracoes-cidades.js"), "utf8"), context);
  return context.window.CITY_DATA.cities;
}

// ---------- Leitura de protobuf (só o necessário para o formato PBF do OSM) ----------

class Proto {
  constructor(buf, start = 0, end = buf.length) { this.buf = buf; this.pos = start; this.end = end; }
  more() { return this.pos < this.end; }
  varint() {
    const buf = this.buf;
    let byte = buf[this.pos++];
    if (byte < 0x80) return byte;
    let value = byte & 0x7f, shift = 7;
    while (true) {
      byte = buf[this.pos++];
      if (shift < 28) value |= (byte & 0x7f) << shift; else value += (byte & 0x7f) * 2 ** shift;
      if (byte < 0x80) return value >= 0 ? value : value >>> 0;
      shift += 7;
    }
  }
  // Varint de 64 bits como Number (ids e coordenadas do OSM cabem com folga em 2^53).
  varint64() {
    const buf = this.buf;
    let value = 0, mult = 1, byte;
    do { byte = buf[this.pos++]; value += (byte & 0x7f) * mult; mult *= 128; } while (byte >= 0x80);
    return value;
  }
  svarint64() { const n = this.varint64(); return n % 2 === 1 ? -(n + 1) / 2 : n / 2; }
  tag() { const key = this.varint(); return [key >>> 3, key & 7]; }
  bytes() { const len = this.varint(); const start = this.pos; this.pos += len; return [start, this.pos]; }
  skip(wire) {
    if (wire === 0) this.varint64();
    else if (wire === 1) this.pos += 8;
    else if (wire === 2) { const len = this.varint(); this.pos += len; }
    else if (wire === 5) this.pos += 4;
    else throw new Error(`tipo de campo protobuf desconhecido: ${wire}`);
  }
}

function packedUints(buf, [start, end]) {
  const p = new Proto(buf, start, end), out = [];
  while (p.more()) out.push(p.varint());
  return out;
}
function packedDelta(buf, [start, end]) {
  const p = new Proto(buf, start, end), out = [];
  let last = 0;
  while (p.more()) { last += p.svarint64(); out.push(last); }
  return out;
}

// Percorre o arquivo bloco a bloco sem carregá-lo inteiro; entrega cada PrimitiveBlock já descompactado.
function* blocks(file) {
  const fd = openSync(file, "r");
  const size = statSync(file).size;
  let offset = 0;
  const lenBuf = Buffer.alloc(4);
  try {
    while (offset < size) {
      readSync(fd, lenBuf, 0, 4, offset); offset += 4;
      const headerLen = lenBuf.readUInt32BE(0);
      const header = Buffer.alloc(headerLen);
      readSync(fd, header, 0, headerLen, offset); offset += headerLen;
      let type = "", dataSize = 0;
      const hp = new Proto(header);
      while (hp.more()) {
        const [field, wire] = hp.tag();
        if (field === 1) { const [s, e] = hp.bytes(); type = header.toString("utf8", s, e); }
        else if (field === 3) dataSize = hp.varint();
        else hp.skip(wire);
      }
      const blob = Buffer.alloc(dataSize);
      readSync(fd, blob, 0, dataSize, offset); offset += dataSize;
      let data = null;
      const bp = new Proto(blob);
      while (bp.more()) {
        const [field, wire] = bp.tag();
        if (field === 1) { const [s, e] = bp.bytes(); data = blob.subarray(s, e); }
        else if (field === 3) { const [s, e] = bp.bytes(); data = zlib.inflateSync(blob.subarray(s, e)); }
        else if (field === 7) { const [s, e] = bp.bytes(); data = zlib.zstdDecompressSync(blob.subarray(s, e)); }
        else if (field === 4 || field === 5 || field === 6) throw new Error("compressão do .pbf não suportada (lzma/bzip2/lz4)");
        else bp.skip(wire);
      }
      yield { type, data, progress: offset / size };
    }
  } finally {
    closeSync(fd);
  }
}

// Decodifica um PrimitiveBlock e chama os tratadores pedidos (node/way/relation).
function readBlock(data, handlers) {
  const p = new Proto(data);
  let table = null, granularity = 100, latOffset = 0, lonOffset = 0;
  const groups = [];
  while (p.more()) {
    const [field, wire] = p.tag();
    if (field === 1) table = p.bytes();
    else if (field === 2) groups.push(p.bytes());
    else if (field === 17) granularity = p.varint();
    else if (field === 19) latOffset = p.varint64();
    else if (field === 20) lonOffset = p.varint64();
    else p.skip(wire);
  }
  // Tabela de textos: decodifica sob demanda.
  const offsets = [];
  if (table) {
    const tp = new Proto(data, table[0], table[1]);
    while (tp.more()) { const [, wire] = tp.tag(); if (wire === 2) offsets.push(tp.bytes()); else tp.skip(wire); }
  }
  const cache = new Array(offsets.length);
  const str = (i) => cache[i] ?? (cache[i] = data.toString("utf8", offsets[i][0], offsets[i][1]));
  const interesting = new Int8Array(offsets.length).fill(-1);
  const isInteresting = (i) => (interesting[i] === -1 ? (interesting[i] = INTEREST_KEYS.has(str(i)) ? 1 : 0) : interesting[i]) === 1;
  const tagsOf = (keys, vals) => {
    if (!keys.some(isInteresting)) return null;
    const tags = {};
    for (let i = 0; i < keys.length; i++) tags[str(keys[i])] = str(vals[i]);
    return tags;
  };
  const coord = (raw, offset) => (offset + granularity * raw) / 1e9;

  for (const [gs, ge] of groups) {
    const g = new Proto(data, gs, ge);
    while (g.more()) {
      const [field, wire] = g.tag();
      if (field === 2 && handlers.node) {
        const [ds, de] = g.bytes();
        const d = new Proto(data, ds, de);
        let ids = null, lats = null, lons = null, kv = null;
        while (d.more()) {
          const [f, w] = d.tag();
          if (f === 1) ids = d.bytes(); else if (f === 8) lats = d.bytes(); else if (f === 9) lons = d.bytes(); else if (f === 10) kv = d.bytes(); else d.skip(w);
        }
        const ip = new Proto(data, ...ids), la = new Proto(data, ...lats), lo = new Proto(data, ...lons);
        const kp = kv ? new Proto(data, ...kv) : null;
        let id = 0, lat = 0, lon = 0;
        while (ip.more()) {
          id += ip.svarint64(); lat += la.svarint64(); lon += lo.svarint64();
          let tags = null;
          if (kp) {
            let k = kp.varint();
            if (k !== 0) {
              const keys = [], vals = [];
              while (k !== 0) { keys.push(k); vals.push(kp.varint()); k = kp.varint(); }
              tags = tagsOf(keys, vals);
            }
          }
          handlers.node(id, coord(lat, latOffset), coord(lon, lonOffset), tags);
        }
      } else if (field === 1 && handlers.node) {
        const [ns, ne] = g.bytes();
        const n = new Proto(data, ns, ne);
        let id = 0, lat = 0, lon = 0, keys = [], vals = [];
        while (n.more()) {
          const [f, w] = n.tag();
          if (f === 1) id = n.svarint64(); else if (f === 8) lat = n.svarint64(); else if (f === 9) lon = n.svarint64();
          else if (f === 2) keys = packedUints(data, n.bytes()); else if (f === 3) vals = packedUints(data, n.bytes()); else n.skip(w);
        }
        handlers.node(id, coord(lat, latOffset), coord(lon, lonOffset), keys.length ? tagsOf(keys, vals) : null);
      } else if (field === 3 && handlers.way) {
        const [ws, we] = g.bytes();
        const w = new Proto(data, ws, we);
        let id = 0, keys = [], vals = [], refs = null;
        while (w.more()) {
          const [f, wt] = w.tag();
          if (f === 1) id = w.varint64(); else if (f === 2) keys = packedUints(data, w.bytes()); else if (f === 3) vals = packedUints(data, w.bytes());
          else if (f === 8) refs = w.bytes(); else w.skip(wt);
        }
        handlers.way(id, keys.length ? tagsOf(keys, vals) : null, () => (refs ? packedDelta(data, refs) : []));
      } else if (field === 4 && handlers.relation) {
        const [rs, re] = g.bytes();
        const r = new Proto(data, rs, re);
        let id = 0, keys = [], vals = [], memids = null, types = null;
        while (r.more()) {
          const [f, wt] = r.tag();
          if (f === 1) id = r.varint64(); else if (f === 2) keys = packedUints(data, r.bytes()); else if (f === 3) vals = packedUints(data, r.bytes());
          else if (f === 9) memids = r.bytes(); else if (f === 10) types = r.bytes(); else r.skip(wt);
        }
        const tags = keys.length ? tagsOf(keys, vals) : null;
        handlers.relation(id, tags, () => {
          const ids = memids ? packedDelta(data, memids) : [];
          const kinds = types ? packedUints(data, types) : [];
          return ids.map((memberId, i) => [kinds[i], memberId]);
        });
      } else {
        g.skip(wire);
      }
    }
  }
}

function scan(file, label, handlers) {
  const started = Date.now();
  let lastLog = 0;
  for (const { type, data, progress } of blocks(file)) {
    if (type !== "OSMData") continue;
    readBlock(data, handlers);
    if (Date.now() - lastLog > 15000) { lastLog = Date.now(); process.stdout.write(`  ${label}: ${(progress * 100).toFixed(0)}%\r`); }
  }
  console.log(`  ${label}: concluída em ${((Date.now() - started) / 1000).toFixed(0)} s`);
}

// ---------- Extração ----------

function extract(file, cities) {
  cities = cities.filter((city) => !hasCache(cacheFile(city.name)));
  if (!cities.length) { console.log("Nenhuma cidade sem cache para este extrato."); return; }
  console.log(`Extraindo de ${file} para: ${cities.map((city) => city.name).join(", ")}`);
  // Caixa em volta de cada cidade (raio máximo), para descartar cedo o que está longe.
  const boxes = cities.map((city) => {
    const [lat, lon] = city.coordinates;
    const dLat = MAX_KM / 110.5, dLon = MAX_KM / (111.3 * Math.max(0.05, Math.cos((lat * Math.PI) / 180)));
    return [lat - dLat, lat + dLat, lon - dLon, lon + dLon];
  });
  const nearAny = (lat, lon) => boxes.some(([a, b, c, d]) => lat >= a && lat <= b && lon >= c && lon <= d);

  const nodes = [];               // nós com tags de interesse, já perto de alguma cidade
  const ways = new Map();         // id → {tags, radius, refs}
  const relations = new Map();    // id → {tags, radius, members}
  const memberWays = new Map();   // id da via membro → refs (amostradas)

  // Passo 1: vias e relações com as tags procuradas.
  scan(file, "passo 1/3 (vias e relações)", {
    way(id, tags, refs) {
      if (!tags) return;
      const radius = matchRadius(tags);
      if (radius) ways.set(id, { tags, radius, refs: refs() });
    },
    relation(id, tags, members) {
      if (!tags) return;
      const radius = matchRadius(tags);
      if (radius) relations.set(id, { tags, radius, members: members() });
    }
  });
  for (const relation of relations.values()) {
    for (const [kind, memberId] of relation.members) if (kind === 1 && !ways.has(memberId)) memberWays.set(memberId, null);
  }

  // Passo 2: nós das vias que formam as relações (amostrados).
  if (memberWays.size) {
    scan(file, "passo 2/3 (vias das relações)", {
      way(id, tags, refs) {
        if (!memberWays.has(id)) return;
        const all = refs();
        memberWays.set(id, all.filter((_, i) => i % RELATION_NODE_STEP === 0 || i === all.length - 1));
      }
    });
  } else {
    console.log("  passo 2/3: não precisa");
  }
  const sampled = (refs) => refs.filter((_, i) => i % RELATION_NODE_STEP === 0 || i === refs.length - 1);
  const needed = new Map();
  for (const way of ways.values()) for (const ref of way.refs) needed.set(ref, null);
  for (const relation of relations.values()) {
    for (const [kind, memberId] of relation.members) {
      if (kind === 0) needed.set(memberId, null);
      if (kind === 1) for (const ref of memberWays.get(memberId) || sampled(ways.get(memberId)?.refs || [])) needed.set(ref, null);
    }
  }

  // Passo 3: nós (os que têm tags de interesse e as coordenadas dos nós das vias).
  scan(file, "passo 3/3 (nós)", {
    node(id, lat, lon, tags) {
      if (needed.has(id)) needed.set(id, [lat, lon]);
      if (!tags || !nearAny(lat, lon)) return;
      const radius = matchRadius(tags);
      if (radius) nodes.push({ id, lat, lon, tags, radius });
    }
  });

  const round = (value) => Number(value.toFixed(7));
  const shapes = [];
  const shapeOf = (refs) => refs.map((ref) => needed.get(ref)).filter(Boolean);
  for (const [id, way] of ways) shapes.push({ type: "way", id, tags: way.tags, radius: way.radius, points: shapeOf(way.refs) });
  for (const [id, relation] of relations) {
    const refs = [];
    for (const [kind, memberId] of relation.members) {
      if (kind === 0) refs.push(memberId);
      if (kind === 1) refs.push(...(memberWays.get(memberId) || sampled(ways.get(memberId)?.refs || [])));
    }
    shapes.push({ type: "relation", id, tags: relation.tags, radius: relation.radius, points: shapeOf(refs) });
  }
  for (const shape of shapes) {
    if (!shape.points.length) continue;
    let minLat = Infinity, maxLat = -Infinity, minLon = Infinity, maxLon = -Infinity;
    for (const [lat, lon] of shape.points) {
      if (lat < minLat) minLat = lat; if (lat > maxLat) maxLat = lat;
      if (lon < minLon) minLon = lon; if (lon > maxLon) maxLon = lon;
    }
    // Como o "out center" do Overpass: centro do retângulo que envolve o elemento.
    shape.center = { lat: round((minLat + maxLat) / 2), lon: round((minLon + maxLon) / 2) };
  }

  mkdirSync(CACHE_DIR, { recursive: true });
  for (const city of cities) {
    const [cLat, cLon] = city.coordinates;
    const elements = [];
    for (const node of nodes) {
      if (distanceKm(node.lat, node.lon, cLat, cLon) <= node.radius) elements.push({ type: "node", id: node.id, lat: round(node.lat), lon: round(node.lon), tags: node.tags });
    }
    for (const type of ["way", "relation"]) {
      for (const shape of shapes) {
        if (shape.type !== type || !shape.center) continue;
        // Como o "around" do Overpass: basta uma parte do elemento estar dentro do raio.
        if (shape.points.some(([lat, lon]) => distanceKm(lat, lon, cLat, cLon) <= shape.radius)) {
          elements.push({ type, id: shape.id, center: shape.center, tags: shape.tags });
        }
      }
    }
    const file = cacheFile(city.name);
    if (hasCache(file)) { console.log(`${city.name}: cache já existe (gravado por outro processo); mantido.`); continue; }
    writeFileSync(file, JSON.stringify(elements));
    console.log(`${city.name}: ${elements.length} elementos`);
  }
}

// ---------- Escolha e download dos extratos do Geofabrik ----------

function inRing([x, y], ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
const polygons = (geometry) => (geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates);
const inGeometry = (point, geometry) => polygons(geometry).some((poly) => inRing(point, poly[0]) && !poly.slice(1).some((hole) => inRing(point, hole)));
const area = (geometry) => polygons(geometry).reduce((sum, poly) => {
  const ring = poly[0];
  let a = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) a += ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
  return sum + Math.abs(a / 2);
}, 0);

async function geofabrikIndex() {
  const file = join(PBF_DIR, "index-v1.json");
  if (!existsSync(file)) {
    mkdirSync(PBF_DIR, { recursive: true });
    const response = await fetch("https://download.geofabrik.de/index-v1.json", { headers: { "User-Agent": USER_AGENT } });
    if (!response.ok) throw new Error(`Geofabrik respondeu ${response.status}`);
    writeFileSync(file, await response.text());
  }
  return JSON.parse(readFileSync(file, "utf8")).features.filter((f) => f.geometry && f.properties.urls?.pbf && f.properties.parent);
}

// Para cada cidade, o menor extrato (sem contar continentes) que contém o centro e um círculo de COVER_KM.
const COVER_KM = 8;
function plan(cities, regions) {
  const groups = new Map();
  for (const city of cities) {
    const [lat, lon] = city.coordinates;
    const points = [[lon, lat]];
    for (let k = 0; k < 8; k++) {
      const angle = (k * Math.PI) / 4;
      points.push([lon + (COVER_KM / (111.3 * Math.cos((lat * Math.PI) / 180))) * Math.cos(angle), lat + (COVER_KM / 110.5) * Math.sin(angle)]);
    }
    const candidates = regions.filter((region) => inGeometry(points[0], region.geometry))
      .map((region) => ({ region, full: points.every((point) => inGeometry(point, region.geometry)), size: area(region.geometry) }))
      .sort((a, b) => a.size - b.size);
    const best = candidates.find((candidate) => candidate.full) || candidates[0];
    if (!best) { console.warn(`${city.name}: nenhum extrato do Geofabrik cobre esta cidade.`); continue; }
    const id = best.region.properties.id;
    if (!groups.has(id)) groups.set(id, { url: best.region.properties.urls.pbf, cities: [] });
    groups.get(id).cities.push(city);
  }
  return groups;
}

async function download(url, file) {
  mkdirSync(PBF_DIR, { recursive: true });
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) throw new Error(`download falhou (${response.status}): ${url}`);
  const expected = Number(response.headers.get("content-length"));
  const partial = `${file}.parcial`;
  await pipeline(Readable.fromWeb(response.body), createWriteStream(partial));
  if (expected && statSync(partial).size !== expected) throw new Error(`download incompleto: ${url}`);
  renameSync(partial, file);
}

async function main() {
  const args = process.argv.slice(2);
  const allCities = loadCities();
  const missing = allCities.filter((city) => !hasCache(cacheFile(city.name)));

  if (args.length && args[0] !== "--plano") {
    const file = resolve(args[0]);
    // Os nomes são obrigatórios: o retângulo de um extrato pega cidades vizinhas que ele não cobre
    // por inteiro (ex.: o do Uruguai inclui Buenos Aires), e isso gravaria um cache incompleto.
    if (args.length < 2) throw new Error("Passe os nomes das cidades depois do arquivo .pbf (veja --plano).");
    const wanted = new Set(args.slice(1).map(normalize));
    const cities = allCities.filter((city) => wanted.has(normalize(city.name)));
    const unknown = [...wanted].filter((name) => !cities.some((city) => normalize(city.name) === name));
    if (unknown.length) console.warn(`Cidades não encontradas em atracoes-cidades.js: ${unknown.join(", ")}`);
    extract(file, cities);
    return;
  }

  const groups = plan(missing, await geofabrikIndex());
  let total = 0;
  for (const [id, group] of groups) {
    const head = await fetch(group.url, { method: "HEAD", headers: { "User-Agent": USER_AGENT } });
    group.bytes = Number(head.headers.get("content-length")) || 0;
    total += group.bytes;
    console.log(`${id.padEnd(26)} ${(group.bytes / 1e6).toFixed(0).padStart(6)} MB  ${group.cities.map((city) => city.name).join(", ")}`);
  }
  console.log(`${groups.size} extratos, ${(total / 1e9).toFixed(1)} GB no total, para ${missing.length} cidades sem cache.`);
  if (args[0] === "--plano") return;

  for (const [id, group] of groups) {
    const file = join(PBF_DIR, `${id.replace(/\//g, "-")}.osm.pbf`);
    try {
      if (!existsSync(file)) {
        console.log(`\nBaixando ${id} (${(group.bytes / 1e6).toFixed(0)} MB)...`);
        await download(group.url, file);
      }
      extract(file, group.cities);
      if (process.env.MANTER_PBF !== "1") unlinkSync(file);
    } catch (error) {
      console.warn(`${id}: ${error.message}; seguindo com os demais.`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
