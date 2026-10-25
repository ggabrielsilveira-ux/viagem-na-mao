// Baixa as músicas livres do vídeo (Kevin MacLeod, CC BY 3.0, via Wikimedia Commons)
// e guarda só os primeiros 36 segundos de cada uma, cortando o MP3 quadro a quadro.
// Uso: node ferramentas/baixar-musicas.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const UA = "ViagemNaMao/0.1 (https://github.com/ggabrielsilveira-ux/viagem-na-mao)";
const SECONDS = 36;
const TRACKS = {
  carefree: "Kevin_MacLeod_-_Carefree.ogg",
  parisian: "Kevin_MacLeod_-_Parisian.ogg",
  "early-riser": "Kevin_MacLeod_-_Early_Riser.ogg",
  "clean-soul": "Kevin_MacLeod_-_Clean_Soul.ogg",
  "call-to-adventure": "Kevin_MacLeod_-_Call_to_Adventure.ogg"
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Tabelas do cabeçalho MP3 (MPEG-1 e MPEG-2/2.5, camada III).
const BITRATES = { 1: [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320], 2: [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160] };
const RATES = { 3: [44100, 48000, 32000], 2: [22050, 24000, 16000], 0: [11025, 12000, 8000] };

function cutMp3(buffer, seconds) {
  let offset = 0;
  if (buffer.slice(0, 3).toString() === "ID3") offset = 10 + ((buffer[6] << 21) | (buffer[7] << 14) | (buffer[8] << 7) | buffer[9]);
  let elapsed = 0;
  while (offset < buffer.length - 4 && elapsed < seconds) {
    if (buffer[offset] !== 0xff || (buffer[offset + 1] & 0xe0) !== 0xe0) { offset += 1; continue; }
    const version = (buffer[offset + 1] >> 3) & 3;
    const bitrate = BITRATES[version === 3 ? 1 : 2][(buffer[offset + 2] >> 4) & 15] * 1000;
    const rate = RATES[version]?.[(buffer[offset + 2] >> 2) & 3];
    if (!bitrate || !rate) { offset += 1; continue; }
    const padding = (buffer[offset + 2] >> 1) & 1;
    const samples = version === 3 ? 1152 : 576;
    offset += Math.floor((samples / 8) * bitrate / rate) + padding;
    elapsed += samples / rate;
  }
  return { data: buffer.slice(0, Math.min(offset, buffer.length)), seconds: elapsed };
}

async function fetchRetry(url) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const response = await fetch(url, { headers: { "User-Agent": UA } });
    if (response.ok) return Buffer.from(await response.arrayBuffer());
    if (response.status !== 429 && response.status < 500) throw new Error(`${url}: ${response.status}`);
    await sleep(15000 * (attempt + 1));
  }
  throw new Error(`Não consegui baixar ${url}`);
}

mkdirSync(join(ROOT, "musicas"), { recursive: true });
for (const [id, file] of Object.entries(TRACKS)) {
  const params = new URLSearchParams({ action: "query", format: "json", formatversion: "2", titles: `File:${file}`, prop: "videoinfo", viprop: "derivatives|extmetadata", viextmetadatafilter: "LicenseShortName" });
  const info = await (await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, { headers: { "User-Agent": UA } })).json();
  const video = info.query.pages[0].videoinfo[0];
  const mp3 = video.derivatives.find((item) => item.type.includes("mpeg"));
  const { data, seconds } = cutMp3(await fetchRetry(mp3.src), SECONDS);
  writeFileSync(join(ROOT, "musicas", `${id}.mp3`), data);
  console.log(`${id}: ${seconds.toFixed(1)} s · ${Math.round(data.length / 1024)} KB · ${video.extmetadata.LicenseShortName.value}`);
  await sleep(6000);
}
