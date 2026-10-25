// Service worker do Viagem na Mão: guarda o app e os dados das cidades da viagem para abrir sem internet.
//
// - Página (navegação): rede primeiro; sem internet, a última cópia guardada.
// - Arquivos do app com ?v= (script, estilos, dados das cidades): a cópia guardada vale até mudar o ?v=.
// - Demais arquivos do app (imagens, ícones, músicas): usa a cópia e atualiza em segundo plano.
// - Fotos da Wikimedia, fontes do Google e bibliotecas do jsDelivr: guardadas ao usar (fotos com limite).
// - Clima, rotas, endereços e conta (Open-Meteo, OSRM, Nominatim, Supabase): sempre pela rede, nunca guardados.
//
// Não é preciso mudar este arquivo a cada versão: os ?v= novos do index.html são guardados no primeiro uso
// e as cópias antigas do mesmo arquivo são apagadas.

const APP_CACHE = "vnm-app-v1";
const MEDIA_CACHE = "vnm-midia-v1";
const MAX_PHOTOS = 400;
const MEDIA_HOSTS = ["upload.wikimedia.org", "fonts.googleapis.com", "fonts.gstatic.com", "cdn.jsdelivr.net"];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(APP_CACHE);
    // Guarda a página e tudo o que ela carrega do próprio app.
    const response = await fetch("./", { cache: "no-store" });
    if (!response.ok) return;
    const html = await response.clone().text();
    await cache.put("./", response);
    const assets = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)]
      .map((match) => match[1])
      .filter((url) => !/^(https?:|mailto:|data:)/.test(url));
    await Promise.all([...new Set(assets)].map((url) => cache.add(url).catch(() => {})));
  })());
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keep = new Set([APP_CACHE, MEDIA_CACHE]);
    await Promise.all((await caches.keys()).filter((key) => key.startsWith("vnm-") && !keep.has(key)).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  // Pedidos parciais (áudio e vídeo tocando) passam direto: o cache não guarda respostas parciais.
  if (request.method !== "GET" || request.headers.has("range")) return;
  const url = new URL(request.url);
  if (url.origin === self.location.origin) {
    if (request.mode === "navigate") event.respondWith(networkFirst(request));
    else if (url.searchParams.has("v")) event.respondWith(versioned(request));
    else event.respondWith(staleWhileRevalidate(request));
    return;
  }
  if (MEDIA_HOSTS.includes(url.hostname)) event.respondWith(media(request));
});

async function networkFirst(request) {
  const cache = await caches.open(APP_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put("./", response.clone());
    return response;
  } catch {
    return (await cache.match("./")) || Response.error();
  }
}

async function versioned(request) {
  const cache = await caches.open(APP_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    await cache.put(request, response.clone());
    // Apaga as versões antigas do mesmo arquivo.
    const path = new URL(request.url).pathname;
    for (const key of await cache.keys()) {
      const old = new URL(key.url);
      if (old.pathname === path && old.search !== new URL(request.url).search) cache.delete(key);
    }
  }
  return response;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(APP_CACHE);
  const cached = await cache.match(request);
  const update = fetch(request).then((response) => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);
  return cached || (await update) || Response.error();
}

async function media(request) {
  const cache = await caches.open(MEDIA_CACHE);
  const cached = await cache.match(request.url);
  if (cached) return cached;
  const url = new URL(request.url);
  // Fotos da Wikimedia e fontes aceitam CORS: assim a cópia guardada não ocupa espaço extra (resposta opaca).
  const response = await fetch(request.url, { mode: "cors", credentials: "omit" }).catch(() => fetch(request));
  if (response.ok && response.type !== "opaque") {
    await cache.put(request.url, response.clone());
    if (url.hostname === "upload.wikimedia.org") trimPhotos(cache);
  }
  return response;
}

async function trimPhotos(cache) {
  const photos = (await cache.keys()).filter((key) => new URL(key.url).hostname === "upload.wikimedia.org");
  for (const key of photos.slice(0, Math.max(0, photos.length - MAX_PHOTOS))) await cache.delete(key);
}
