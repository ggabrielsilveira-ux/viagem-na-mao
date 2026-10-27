// Baixa as músicas livres do vídeo da retrospectiva e guarda só os primeiros 36 segundos de cada uma,
// cortando o MP3 quadro a quadro. A lista (título, clima, autor, licença, crédito) fica em dados/musicas.js.
// Fontes: Jason Shaw/Audionautix (CC BY 4.0), Scott Buckley (CC BY 4.0) e Musopen/Robin Alciatore
// (domínio público), conferidas nas páginas oficiais em 27/10/2026.
// Uso: node ferramentas/baixar-musicas.mjs
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const UA = "ViagemNaMao/0.1 (https://github.com/ggabrielsilveira-ux/viagem-na-mao)";
const SECONDS = 36;

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

const AUDIONAUTIX = "https://audionautix.com/Music/";
// [id, título, clima, arquivo de origem]
const TRACKS = [
  ["acoustic-guitar-1", "Acoustic Guitar #1", "Calmo", AUDIONAUTIX + "AcousticGuitar1.mp3"],
  ["acoustic-shuffle", "Acoustic Shuffle", "Gingado leve", AUDIONAUTIX + "AcousticShuffle.mp3"],
  ["autumn-sunset", "Autumn Sunset", "Pôr do sol", AUDIONAUTIX + "AutumnSunset.mp3"],
  ["cold-morning", "Cold Morning", "Manhã fria", AUDIONAUTIX + "ColdMorning.mp3"],
  ["cool-steel-breeze", "Cool Steel Breeze", "Brisa", AUDIONAUTIX + "CoolSteelBreeze.mp3"],
  ["folk-bed", "Folk Bed", "Folk animado", AUDIONAUTIX + "Folk%20Bed.mp3"],
  ["green-leaves", "Green Leaves", "Natureza", AUDIONAUTIX + "GreenLeaves.mp3"],
  ["happy-strummin", "Happy Strummin'", "Alegre", AUDIONAUTIX + "HappyStrummin.mp3"],
  ["landras-dream", "Landra's Dream", "Sonhador", AUDIONAUTIX + "LandrasDream.mp3"],
  ["one-fine-day", "One Fine Day", "Dia bonito", AUDIONAUTIX + "OneFineDay.mp3"],
  ["open-road", "Open Road", "Estrada", AUDIONAUTIX + "OpenRoad.mp3"],
  ["paper-wings", "Paper Wings", "Delicado", AUDIONAUTIX + "PaperWings.mp3"],
  ["pennywhistle", "Pennywhistle", "Divertido", AUDIONAUTIX + "PennyWhistle.mp3"],
  ["redwood-trail", "Redwood Trail", "Trilha", AUDIONAUTIX + "RedwoodTrail.mp3"],
  ["river-meditation", "River Meditation", "Leve e animado", AUDIONAUTIX + "RiverMeditation.mp3"],
  ["running-waters", "Running Waters", "Águas correndo", AUDIONAUTIX + "RunningWatersFull.mp3"],
  ["second-nature", "Second Nature", "Tranquilo", AUDIONAUTIX + "SecondNature.mp3"],
  ["serenity", "Serenity", "Sereno", AUDIONAUTIX + "Serenity.mp3"],
  ["solo-acoustic-3", "Solo Acoustic #3", "Violão calmo", AUDIONAUTIX + "SoloAcoustic3.mp3"],
  ["solo-acoustic-5", "Solo Acoustic #5", "Violão pensativo", AUDIONAUTIX + "SoloAcoustic5.mp3"],
  ["travel-light", "Travel Light", "Viagem leve", AUDIONAUTIX + "TravelLight.mp3"],
  ["walk-in-the-park", "Walk In The Park", "Passeio", AUDIONAUTIX + "WalkInThePark.mp3"],
  ["walk-in-the-park-full", "Walk In The Park (versão completa)", "Passeio animado", AUDIONAUTIX + "WalkInTheParkFull.mp3"],
  ["words", "Words", "Inspirador", AUDIONAUTIX + "Words.mp3"],
  ["with-these-hands", "With These Hands", "Nostálgico", "https://www.scottbuckley.com.au/library/wp-content/uploads/2026/06/WithTheseHands.mp3"],
  ["gymnopedie-1", "Gymnopédie nº 1 (Satie)", "Piano nostálgico", "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/90/Erik_Satie_-_gymnopedies_-_la_1_ere._lent_et_douloureux.ogg/Erik_Satie_-_gymnopedies_-_la_1_ere._lent_et_douloureux.ogg.mp3"]
];

mkdirSync(join(ROOT, "musicas"), { recursive: true });
for (const [id, title, , url] of TRACKS) {
  const file = join(ROOT, "musicas", `${id}.mp3`);
  if (existsSync(file) && !process.argv.includes("--refazer")) { console.log(`${id}: já existe`); continue; }
  const { data, seconds } = cutMp3(await fetchRetry(url), SECONDS);
  writeFileSync(file, data);
  console.log(`${id}: ${title} · ${seconds.toFixed(1)} s · ${Math.round(data.length / 1024)} KB`);
  await sleep(3000);
}
