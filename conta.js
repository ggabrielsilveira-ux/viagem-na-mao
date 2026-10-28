// Contas e sincronização (Supabase). Carregado depois de script.js e usa as funções dele.
// Segurança: a chave abaixo é a "Publishable key", feita para ficar no navegador. Ela só permite
// pedir o código de acesso; os dados ficam protegidos pelas regras do banco (RLS): cada pessoa só
// lê e grava o que é dela, e só depois de entrar. A chave secreta fica apenas na Vercel.
const SUPABASE_CONFIG = {
  url: "https://nbabmcctrncfguoedhiz.supabase.co",
  publishableKey: "sb_publishable_Ron7Xu-5_ZB4sbclvACRKg_JeDVf0wx"
};
const SYNC_KEY = "viagem-na-mao-sync-v1";
const SYNC_DELAY_MS = 2500;

// Trava da sessão só dentro desta página. A trava padrão (navigator.locks) pode ficar presa no iPhone quando o app
// vai para segundo plano (abrir o e-mail para copiar o código), e aí todo pedido ao banco espera para sempre.
const authQueue = new Map();
function pageLock(name, _acquireTimeout, fn) {
  const run = (authQueue.get(name) || Promise.resolve()).catch(() => {}).then(fn);
  authQueue.set(name, run.catch(() => {}));
  return run;
}

// Nenhum pedido fica pendurado: sem resposta no prazo, vira erro e a tela mostra "tente de novo".
// Envio de fotos tem prazo maior.
function fetchWithTimeout(input, init = {}) {
  const url = String(input?.url || input);
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), /\/storage\//.test(url) ? 90000 : 20000);
  init.signal?.addEventListener("abort", () => controller.abort());
  return fetch(input, { ...init, signal: controller.signal }).finally(() => window.clearTimeout(timer));
}

const supabaseClient = SUPABASE_CONFIG.publishableKey && window.supabase
  ? window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.publishableKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false, lock: pageLock },
    global: { fetch: fetchWithTimeout }
  })
  : null;

const conta = { user: null, plano: null, perfil: null, status: "", syncing: false, timer: null, applyingRemote: false };

function readSync() {
  try { return JSON.parse(window.localStorage.getItem(SYNC_KEY) || "{}"); } catch { return {}; }
}

function writeSync(patch) {
  const next = { ...readSync(), ...patch };
  try { window.localStorage.setItem(SYNC_KEY, JSON.stringify(next)); } catch { /* sem espaço: segue sem guardar */ }
  return next;
}

// Junta dois estados: viagens que faltam entram; na mesma viagem vale a versão mais recente,
// e as memórias das duas versões são somadas (nada se perde ao usar dois aparelhos).
function mergeStates(local, remote) {
  // Viagens excluídas em qualquer aparelho não voltam.
  const deleted = new Map([...(remote.deletedTrips || []), ...(local.deletedTrips || [])].filter((item) => item && item.id).map((item) => [item.id, item]));
  const remoteTrips = (remote.trips || []).map(migrateTrip).filter((trip) => !deleted.has(trip.id));
  const byId = new Map(local.trips.filter((trip) => !deleted.has(trip.id)).map((trip) => [trip.id, trip]));
  for (const incoming of remoteTrips) {
    const mine = byId.get(incoming.id);
    if (!mine) { byId.set(incoming.id, incoming); continue; }
    const newer = (incoming.updatedAt || "") > (mine.updatedAt || "") ? incoming : mine;
    const other = newer === incoming ? mine : incoming;
    const known = new Set(newer.memories.map((memory) => memory.id));
    byId.set(incoming.id, { ...newer, memories: [...newer.memories, ...other.memories.filter((memory) => !known.has(memory.id))] });
  }
  const trips = [...byId.values()];
  const currentTripId = [local.currentTripId, remote.currentTripId].find((tripId) => tripId && trips.some((trip) => trip.id === tripId)) || trips[0]?.id || null;
  return { ...remote, ...local, trips, currentTripId, deletedTrips: [...deleted.values()].slice(-200) };
}

function applyRemoteState(data) {
  conta.applyingRemote = true;
  const keep = { currentTripId: state.currentTripId };
  Object.keys(state).forEach((key) => { delete state[key]; });
  Object.assign(state, data, { trips: (data.trips || []).map(migrateTrip) });
  if (state.trips.some((trip) => trip.id === keep.currentTripId)) state.currentTripId = keep.currentTripId;
  saveState();
  conta.applyingRemote = false;
  render({ scroll: false });
}

async function fetchRemote() {
  const { data, error } = await supabaseClient.from("estado_usuario").select("dados, atualizado_em").eq("user_id", conta.user.id).maybeSingle();
  if (error) throw error;
  return data;
}

// Fotos: sobe as que faltam na nuvem e baixa as que faltam no aparelho.
async function syncPhotos() {
  const uid = conta.user.id;
  const sync = readSync();
  const sent = new Set(sync.fotosEnviadas || []);
  const referenced = allMemoryPhotoIds();
  const local = new Set(await listPhotoIds().catch(() => []));
  for (const id of referenced) {
    if (local.has(id) && !sent.has(id)) {
      const blob = await getPhoto(id).catch(() => null);
      if (!blob) continue;
      const { error } = await supabaseClient.storage.from("fotos").upload(`${uid}/${id}.jpg`, blob, { contentType: blob.type || "image/jpeg", upsert: true });
      if (!error) sent.add(id);
    } else if (!local.has(id)) {
      const { data } = await supabaseClient.storage.from("fotos").download(`${uid}/${id}.jpg`);
      if (data) { await putPhotos([[id, data]]); sent.add(id); }
    }
  }
  // Fotos apagadas no app saem também da nuvem.
  const orphans = [...sent].filter((id) => !referenced.includes(id));
  if (orphans.length) {
    await supabaseClient.storage.from("fotos").remove(orphans.map((id) => `${uid}/${id}.jpg`));
    orphans.forEach((id) => sent.delete(id));
  }
  writeSync({ fotosEnviadas: [...sent] });
}

async function pushState() {
  const { lastPulledAt } = readSync();
  const remote = await fetchRemote();
  // Outro aparelho gravou depois da última vez que puxamos: junta antes de enviar.
  if (remote && remote.atualizado_em > (lastPulledAt || "")) applyRemoteState(mergeStates(state, remote.dados));
  const atualizado_em = new Date().toISOString();
  const { error } = await supabaseClient.from("estado_usuario").upsert({ user_id: conta.user.id, dados: state, versao_app: "web", atualizado_em });
  if (error) throw error;
  writeSync({ lastPulledAt: atualizado_em, lastSyncAt: atualizado_em, dirty: false });
}

async function syncNow({ silent = true } = {}) {
  if (!supabaseClient || !conta.user || conta.syncing || !navigator.onLine) return;
  conta.syncing = true;
  conta.status = "Sincronizando…";
  paintAccount();
  try {
    await pushState();
    await syncPhotos();
    conta.status = "";
    if (!silent) toast("Tudo sincronizado");
  } catch (error) {
    console.error("Falha ao sincronizar.", error);
    conta.status = "Não consegui sincronizar agora. Tento de novo depois.";
  } finally {
    conta.syncing = false;
    paintAccount();
  }
}

// Ao abrir o app (ou voltar a ele), traz o que mudou em outro aparelho.
async function pullIfNewer() {
  if (!supabaseClient || !conta.user || conta.syncing || !navigator.onLine) return;
  try {
    const remote = await fetchRemote();
    const sync = readSync();
    if (!remote || remote.atualizado_em <= (sync.lastPulledAt || "")) return;
    applyRemoteState(sync.dirty ? mergeStates(state, remote.dados) : remote.dados);
    writeSync({ lastPulledAt: remote.atualizado_em });
    syncPhotos().catch(() => {});
  } catch (error) {
    console.error("Falha ao buscar dados da conta.", error);
  }
}

window.addEventListener("estado-salvo", () => {
  if (!conta.user || conta.applyingRemote) return;
  writeSync({ dirty: true });
  window.clearTimeout(conta.timer);
  conta.timer = window.setTimeout(() => syncNow(), SYNC_DELAY_MS);
});
document.addEventListener("visibilitychange", () => { if (!document.hidden) pullIfNewer(); });
window.addEventListener("online", () => { if (readSync().dirty) syncNow(); });

async function loadPlan() {
  const { data } = await supabaseClient.from("assinaturas").select("plano, status, valido_ate").eq("user_id", conta.user.id).maybeSingle();
  conta.plano = data || null;
}

// Pronto para a cobrança futura: hoje todos do teste fechado têm acesso.
function temAcesso() {
  if (!conta.plano) return true;
  if (conta.plano.status !== "ativa") return false;
  return !conta.plano.valido_ate || new Date(conta.plano.valido_ate) > new Date();
}

const PLAN_LABELS = { teste: "Teste gratuito", mensal: "Mensal", anual: "Anual" };

// ---------------------------------------------------------------------------
// Estatística de uso do teste (ferramentas/supabase-metricas.sql): no máximo uma vez por dia,
// só contagens. Nada de nomes, destinos, valores, textos ou fotos.
// ---------------------------------------------------------------------------

const USAGE_KEY = "viagem-na-mao-uso-v1";

function readUsage() {
  try { return JSON.parse(window.localStorage.getItem(USAGE_KEY) || "{}"); } catch { return {}; }
}

async function registrarUso({ force = false } = {}) {
  // Só o app oficial conta (testes no computador e prévias não entram no painel).
  if (!supabaseClient || !navigator.onLine || location.hostname !== "app.viagemnamao.com") return;
  const usage = readUsage();
  const today = new Date().toISOString().slice(0, 10);
  const cidades = new Set(state.trips.flatMap((trip) => trip.destinations.map((destination) => slugify(destination.name || ""))).filter(Boolean)).size;
  const counts = {
    viagens: state.trips.length,
    cidades,
    memorias: state.trips.reduce((total, trip) => total + (trip.memories || []).length, 0),
    gastos: state.trips.reduce((total, trip) => total + (trip.expenses || []).length, 0)
  };
  // No mesmo dia só manda de novo se os números mudaram (a viagem criada depois de abrir o app também conta).
  const sameCounts = JSON.stringify(usage.numeros || null) === JSON.stringify(counts);
  if (!force && usage.dia === today && usage.conta === (conta.user?.id || "") && sameCounts) return;
  const aparelho = usage.aparelho || (crypto.randomUUID ? crypto.randomUUID() : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => (c ^ (Math.random() * 16) >> (c / 4)).toString(16)));
  const { error } = await supabaseClient.rpc("registrar_uso", {
    p_aparelho: aparelho,
    p_viagens: counts.viagens,
    p_cidades: counts.cidades,
    p_memorias: counts.memorias,
    p_gastos: counts.gastos,
    p_instalado: window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true,
    p_versao: (document.querySelector('script[src^="script.js"]')?.getAttribute("src") || "").split("v=")[1] || ""
  });
  if (error) return;
  try { window.localStorage.setItem(USAGE_KEY, JSON.stringify({ aparelho, dia: today, conta: conta.user?.id || "", numeros: counts })); } catch { /* segue */ }
}

// A tela inicial convida a criar a conta de testador (script.js usa estas duas).
window.contaAtiva = () => Boolean(supabaseClient);
window.contaLogada = () => Boolean(conta.user);

// Primeiro login neste aparelho: decide o que fazer com as viagens daqui e as da nuvem.
// Cópia das viagens deste aparelho antes de juntá-las com a conta (uma por conta, nunca apagada pelo app).
function backupLocalState(userId) {
  const key = `viagem-na-mao-v1-antes-da-conta-${userId}`;
  try { if (!window.localStorage.getItem(key)) window.localStorage.setItem(key, JSON.stringify(state)); } catch { /* sem espaço: os dados seguem no estado principal */ }
}

async function firstSync() {
  const hasLocal = state.trips.length > 0;
  if (hasLocal) backupLocalState(conta.user.id);
  const remote = await fetchRemote();
  if (!remote) {
    // Marca como pendente antes: se falhar (sem internet), tenta de novo quando a conexão voltar.
    writeSync({ dirty: true });
    await syncNow();
    if (hasLocal) toast(readSync().dirty ? "Suas viagens estão salvas neste aparelho; envio para a conta assim que der." : "Suas viagens foram guardadas na conta");
    return;
  }
  if (!hasLocal) {
    applyRemoteState(remote.dados);
    writeSync({ lastPulledAt: remote.atualizado_em, dirty: false });
    await syncPhotos();
    toast("Viagens da sua conta carregadas");
    return;
  }
  openSheet(`${sheetTitle("Juntar viagens")}
    <p class="sheet-text">Este aparelho tem ${state.trips.length} ${state.trips.length === 1 ? "viagem" : "viagens"} e a sua conta tem ${(remote.dados.trips || []).length}. O que fazer?</p>
    <button class="btn btn-primary btn-block" type="button" id="sync-merge">${icon("check")} Juntar as duas</button>
    <p class="muted">Nada se perde: as viagens que faltam entram e as memórias se somam.</p>`, (root) => {
    sheetGuard = () => false;
    const finish = async (data) => {
      sheetGuard = null;
      closeSheet({ force: true });
      applyRemoteState(data);
      writeSync({ lastPulledAt: remote.atualizado_em, dirty: true });
      await syncNow({ silent: false });
    };
    root.querySelector("#sync-merge").addEventListener("click", () => finish(mergeStates(state, remote.dados)));
  });
}


// ---------------------------------------------------------------------------
// Cadastro do testador (tabela perfis, ferramentas/supabase-perfis.sql): nome completo e WhatsApp
// obrigatórios; aniversário (só dia e mês) e aceite de novidades opcionais.
// ---------------------------------------------------------------------------

const MONTHS_PT = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

async function loadPerfil() {
  const { data, error } = await supabaseClient.from("perfis").select("nome, whatsapp, aniversario, aceita_novidades").eq("user_id", conta.user.id).maybeSingle();
  if (error) throw error;
  conta.perfil = data || null;
  // Acabou de criar a conta: grava o cadastro preenchido antes do código (antes de decidir se pede a ficha).
  const pending = readPendingSignup();
  if (pending && pending.email === conta.user.email) {
    const { nome, whatsapp, aniversario, aceita_novidades } = pending;
    if (!(await savePerfil({ nome, whatsapp, aniversario, aceita_novidades }))) writePendingSignup(null);
  }
  // Só com a resposta do banco dá para saber que falta o cadastro (sem internet, não cobra).
  conta.perfilConferido = true;
  // O primeiro nome vira a saudação da tela inicial (a pessoa ainda pode trocar em Ajustes).
  if (conta.perfil?.nome && !(state.profile?.name || "").trim()) {
    state.profile = { ...(state.profile || {}), name: conta.perfil.nome.trim().split(/\s+/)[0] };
    saveState();
    window.renderHomeAccount?.();
    if (route.screen === "home") renderHome();
  }
}

// Provedores de e-mail mais usados no Brasil: um domínio parecido (até 2 letras de diferença) vira sugestão.
const EMAIL_DOMAINS = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "yahoo.com.br", "icloud.com", "live.com", "msn.com", "me.com",
  "hotmail.com.br", "outlook.com.br", "bol.com.br", "uol.com.br", "terra.com.br", "globo.com", "ig.com.br", "proton.me", "protonmail.com"];

function editDistance(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const current = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = current;
    }
  }
  return row[b.length];
}

function emailSuggestion(email) {
  const [user, domain] = email.split("@");
  if (!user || !domain || EMAIL_DOMAINS.includes(domain)) return "";
  let best = "";
  let bestDistance = 3;
  for (const known of EMAIL_DOMAINS) {
    const distance = editDistance(domain, known);
    if (distance < bestDistance) { best = known; bestDistance = distance; }
  }
  return best ? `${user}@${best}` : "";
}

// Código do país (DDI) do WhatsApp: Brasil por padrão; quem mora fora escolhe o país.
const PHONE_COUNTRIES = [
  ["55", "Brasil"], ["351", "Portugal"], ["1", "Estados Unidos e Canadá"], ["34", "Espanha"], ["39", "Itália"], ["33", "França"],
  ["49", "Alemanha"], ["44", "Reino Unido"], ["353", "Irlanda"], ["41", "Suíça"], ["31", "Países Baixos"], ["32", "Bélgica"],
  ["43", "Áustria"], ["54", "Argentina"], ["56", "Chile"], ["598", "Uruguai"], ["595", "Paraguai"], ["57", "Colômbia"],
  ["51", "Peru"], ["52", "México"], ["81", "Japão"], ["82", "Coreia do Sul"], ["61", "Austrália"], ["64", "Nova Zelândia"],
  ["971", "Emirados Árabes"], ["972", "Israel"], ["27", "África do Sul"], ["244", "Angola"], ["258", "Moçambique"]
];

// Só dígitos, com o DDI na frente. Número escrito com "+" (ou 00) já traz o DDI; senão usa o país escolhido.
function normalizeWhatsapp(value, country = "55") {
  const text = String(value || "").trim();
  const digits = text.replace(/\D/g, "");
  if (!digits) return "";
  if (text.startsWith("+") || text.startsWith("00")) return digits.replace(/^00/, "");
  if (country === "55" && digits.startsWith("55") && (digits.length === 12 || digits.length === 13)) return digits;
  return `${country}${digits.replace(/^0+/, "")}`;
}

// País do número guardado: o DDI mais longo que combina (351 antes de 35...).
function whatsappCountry(digits) {
  const d = String(digits || "");
  return [...PHONE_COUNTRIES].sort((a, b) => b[0].length - a[0].length).find(([code]) => d.startsWith(code))?.[0] || "55";
}

// Número sem o DDI, para o campo ao lado do país.
function whatsappLocal(digits) {
  const d = String(digits || "");
  const country = whatsappCountry(d);
  const local = d.startsWith(country) ? d.slice(country.length) : d;
  if (country === "55" && local.length === 11) return `(${local.slice(0, 2)}) ${local.slice(2, 7)}-${local.slice(7)}`;
  if (country === "55" && local.length === 10) return `(${local.slice(0, 2)}) ${local.slice(2, 6)}-${local.slice(6)}`;
  return local;
}

function formatWhatsapp(digits) {
  const d = String(digits || "");
  if (!d) return "";
  const country = whatsappCountry(d);
  return country === "55" ? whatsappLocal(d) : `+${country} ${whatsappLocal(d)}`;
}

// Campos do cadastro de testador: usados na criação da conta (com o e-mail) e na ficha depois do login.
function perfilFieldsHtml(perfil = {}, { email = null } = {}) {
  const [day, month] = (perfil.aniversario || "/").split("/");
  return `<label class="field">Nome completo<input id="perfil-nome" maxlength="120" autocomplete="name" value="${escapeHtml(perfil.nome || "")}" placeholder="Ex.: Maria da Silva"></label>
    ${email === null ? "" : `<label class="field">E-mail<input id="account-email" type="email" autocomplete="email" value="${escapeHtml(email)}" placeholder="voce@exemplo.com"></label>`}
    <div class="field"><span>WhatsApp</span>
      <div class="perfil-phone">
        <select id="perfil-ddi" aria-label="País do número">${PHONE_COUNTRIES.map(([code, name]) => `<option value="${code}"${code === whatsappCountry(perfil.whatsapp) ? " selected" : ""}>${escapeHtml(name)} +${code}</option>`).join("")}</select>
        <input id="perfil-whatsapp" type="tel" inputmode="tel" autocomplete="tel-national" maxlength="24" aria-label="Número do WhatsApp" value="${escapeHtml(whatsappLocal(perfil.whatsapp))}" placeholder="(48) 99999-9999">
      </div>
    </div>
    <div class="field"><span>Aniversário (dia e mês)</span>
      <div class="perfil-birthday">
        <select id="perfil-dia" aria-label="Dia do aniversário"><option value="">Dia</option>${Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0")).map((d) => `<option value="${d}"${d === day ? " selected" : ""}>${Number(d)}</option>`).join("")}</select>
        <select id="perfil-mes" aria-label="Mês do aniversário"><option value="">Mês</option>${MONTHS_PT.map((name, i) => { const m = String(i + 1).padStart(2, "0"); return `<option value="${m}"${m === month ? " selected" : ""}>${name}</option>`; }).join("")}</select>
      </div>
    </div>
    <label class="check-item perfil-optin"><input type="checkbox" id="perfil-novidades"${perfil.aceita_novidades ? " checked" : ""}><span><strong>Quero receber novidades e ofertas</strong><small>Pelo WhatsApp e por e-mail. Você pode desistir quando quiser.</small></span></label>`;
}

function wirePerfilFields(root) {
  const ddi = root.querySelector("#perfil-ddi");
  const phone = root.querySelector("#perfil-whatsapp");
  const paintPhone = () => { phone.placeholder = ddi.value === "55" ? "(48) 99999-9999" : "Número"; };
  paintPhone();
  ddi.addEventListener("change", paintPhone);
}

// Lê e confere os campos: { error } com a mensagem para a pessoa, ou { data } pronto para gravar.
function readPerfilFields(root) {
  const nome = root.querySelector("#perfil-nome").value.trim().replace(/\s+/g, " ");
  const ddi = root.querySelector("#perfil-ddi").value;
  const whatsapp = normalizeWhatsapp(root.querySelector("#perfil-whatsapp").value, ddi);
  const dia = root.querySelector("#perfil-dia").value;
  const mes = root.querySelector("#perfil-mes").value;
  if (nome.split(" ").length < 2) return { error: "Escreva o nome completo (nome e sobrenome)." };
  const localDigits = whatsapp.slice(whatsappCountry(whatsapp).length).length;
  if (whatsappCountry(whatsapp) === "55" ? localDigits < 10 || localDigits > 11 : whatsapp.length < 10 || whatsapp.length > 15) {
    return { error: ddi === "55" ? "Confira o WhatsApp: número com DDD." : "Confira o WhatsApp: número completo, com o código de área." };
  }
  if (!dia || !mes) return { error: "Escolha o dia e o mês do seu aniversário." };
  return { data: { nome, whatsapp, aniversario: `${dia}/${mes}`, aceita_novidades: root.querySelector("#perfil-novidades").checked } };
}

async function savePerfil(data) {
  const now = new Date().toISOString();
  const row = {
    user_id: conta.user.id, ...data, atualizado_em: now,
    ...(data.aceita_novidades && !conta.perfil?.aceita_novidades ? { aceite_novidades_em: now } : {})
  };
  const { error } = await supabaseClient.from("perfis").upsert(row);
  if (error) return error;
  conta.perfil = { ...data };
  const firstName = data.nome.split(" ")[0];
  if (!(state.profile?.name || "").trim() || state.profile.name !== firstName) {
    state.profile = { ...(state.profile || {}), name: firstName };
    saveState();
  }
  return null;
}

// Cadastro feito na criação da conta: fica no aparelho até a pessoa digitar o código
// (o banco só aceita depois do login). Se a página recarregar no meio, o formulário volta preenchido.
const PENDING_SIGNUP_KEY = "viagem-na-mao-cadastro-pendente";
function readPendingSignup() {
  try {
    const value = JSON.parse(window.localStorage.getItem(PENDING_SIGNUP_KEY) || "null");
    return value && Date.now() - (value.em || 0) < 7 * 86400000 ? value : null;
  } catch { return null; }
}
function writePendingSignup(value) {
  try {
    if (value) window.localStorage.setItem(PENDING_SIGNUP_KEY, JSON.stringify({ ...value, em: Date.now() }));
    else window.localStorage.removeItem(PENDING_SIGNUP_KEY);
  } catch { /* sem espaço: a ficha pede de novo depois do login */ }
}

// required: cadastro obrigatório para usar o app (sem fechar; a saída é salvar ou sair da conta).
function openPerfilSheet({ first = false, required = false } = {}) {
  const pending = readPendingSignup();
  const perfil = conta.perfil || (pending?.email === conta.user?.email ? pending : {}) || {};
  openSheet(`${required ? `<div class="sheet-title"><h2>Complete seu cadastro</h2></div>` : sheetTitle(first ? "Complete seu cadastro" : "Seu cadastro")}
    <p class="muted">${required ? "Para usar o Viagem na Mão na fase de testes, precisamos do seu nome, WhatsApp e aniversário. Assim sabemos quem está testando e podemos falar com você sobre o app." : first ? "Falta pouco: assim sabemos quem está testando e podemos falar com você sobre o app." : "Seus dados de testador. Só a equipe do Viagem na Mão vê."}</p>
    ${perfilFieldsHtml(perfil)}
    <p class="form-status" id="perfil-status" role="status" aria-live="polite"></p>
    <button class="btn btn-primary btn-block" type="button" id="perfil-salvar">${icon("check")} Salvar cadastro</button>
    ${required ? `<button class="link-btn perfil-sair" type="button" id="perfil-sair">Agora não, sair da conta</button>` : ""}
    <p class="account-terms">Usamos estes dados só para o teste do Viagem na Mão, como explica a <a href="https://viagemnamao.com/privacidade" target="_blank" rel="noopener noreferrer">Política de privacidade</a>.</p>`, (root) => {
    const status = root.querySelector("#perfil-status");
    if (required) {
      // Não fecha tocando fora, arrastando nem com o voltar: só salvando ou saindo da conta.
      sheetGuard = () => false;
      root.querySelector("#perfil-sair").addEventListener("click", async () => {
        closeSheet({ force: true });
        await syncNow().catch(() => {});
        await supabaseClient.auth.signOut();
        toast("Você saiu da conta. As viagens continuam neste aparelho.");
      });
    }
    wirePerfilFields(root);
    root.querySelector("#perfil-salvar").addEventListener("click", async (event) => {
      const button = event.currentTarget;
      const { error: invalid, data } = readPerfilFields(root);
      if (invalid) { status.textContent = invalid; return; }
      button.disabled = true;
      status.textContent = "Salvando…";
      const error = await savePerfil(data);
      button.disabled = false;
      if (error) { status.textContent = "Não consegui salvar agora. Tente de novo em instantes."; return; }
      writePendingSignup(null);
      const firstName = data.nome.split(" ")[0];
      closeSheet({ force: true });
      if (route.screen === "home") renderHome();
      toast(first ? `Tudo pronto, ${firstName}! Boas viagens.` : "Cadastro atualizado");
    });
  });
}
window.openPerfilSheet = openPerfilSheet;

// Cadastro obrigatório: abre a ficha assim que não houver outra janela aberta, e de novo se ela sumir
// sem ter sido salva (outra janela pode ocupar o lugar dela).
function askPerfil() {
  if (!conta.user || conta.perfil || !conta.perfilConferido) return;
  const sheetEl = document.querySelector("#sheet");
  if (sheetEl?.open) return;
  openPerfilSheet({ first: true, required: true });
}
document.querySelector("#sheet")?.addEventListener("close", () => window.setTimeout(askPerfil, 350));


// ---------------------------------------------------------------------------
// Opinião dos testadores (tabela opinioes, ferramentas/supabase-opinioes.sql).
// Sem internet, a opinião fica guardada e vai quando a conexão voltar.
// ---------------------------------------------------------------------------

const FEEDBACK_QUEUE_KEY = "viagem-na-mao-opinioes-v1";
const FEEDBACK_TYPES = [["ideia", "sparkles", "Ideia"], ["problema", "info", "Problema"], ["elogio", "heart", "Elogio"], ["outro", "pencil", "Outro"]];

function readFeedbackQueue() {
  try { return JSON.parse(window.localStorage.getItem(FEEDBACK_QUEUE_KEY) || "[]"); } catch { return []; }
}

function writeFeedbackQueue(items) {
  try { window.localStorage.setItem(FEEDBACK_QUEUE_KEY, JSON.stringify(items.slice(-20))); } catch { /* segue */ }
}

async function sendFeedback(item) {
  const { error } = await supabaseClient.from("opinioes").insert({ ...item, user_id: conta.user?.id || null, aparelho: readUsage().aparelho || null });
  return !error;
}

async function flushFeedbackQueue() {
  if (!supabaseClient || !navigator.onLine) return;
  const queue = readFeedbackQueue();
  if (!queue.length) return;
  const left = [];
  for (const item of queue) if (!(await sendFeedback(item))) left.push(item);
  writeFeedbackQueue(left);
}
window.addEventListener("online", () => flushFeedbackQueue().catch(() => {}));

function openFeedbackSheet() {
  let type = "ideia";
  const screen = route.screen === "trip" ? route.tab || "trip" : route.screen;
  openSheet(`${sheetTitle("Enviar opinião")}
    <p class="feedback-lead">Sua opinião ajuda no desenvolvimento do Viagem na Mão: conte o que travou, o que faltou ou o que você gostou.</p>
    <p class="feedback-prize">${icon("star")}<span>As 10 pessoas que mais contribuírem ganham <strong>acesso vitalício</strong> enquanto o app estiver no ar. <a href="https://viagemnamao.com/termos#vitalicio" target="_blank" rel="noopener noreferrer">Veja as regras</a>.</span></p>
    <div class="chips feedback-types" role="group" aria-label="Tipo de opinião">${FEEDBACK_TYPES.map(([id, iconName, label]) => `<button type="button" class="chip${id === type ? " is-active" : ""}" data-feedback-type="${id}" aria-pressed="${id === type}">${icon(iconName)} ${label}</button>`).join("")}</div>
    <label class="field">Sua opinião<textarea id="feedback-text" rows="5" maxlength="2000" placeholder="Ex.: senti falta de… / não consegui… / adorei…"></textarea></label>
    ${conta.user ? "" : `<p class="account-terms">${icon("info")} Você está sem conta: a opinião chega sem o seu nome e não conta para o acesso vitalício. Para contar, entre na sua conta em Ajustes.</p>`}
    <p class="form-status" id="feedback-status" role="status" aria-live="polite"></p>
    <button class="btn btn-primary btn-block" type="button" id="feedback-send">${icon("check")} Enviar opinião</button>`, (root) => {
    const status = root.querySelector("#feedback-status");
    root.querySelector(".feedback-types").addEventListener("click", (event) => {
      const chip = event.target.closest("[data-feedback-type]");
      if (!chip) return;
      type = chip.dataset.feedbackType;
      root.querySelectorAll("[data-feedback-type]").forEach((item) => {
        const active = item === chip;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
    });
    root.querySelector("#feedback-send").addEventListener("click", async (event) => {
      const button = event.currentTarget;
      const texto = root.querySelector("#feedback-text").value.trim();
      if (texto.length < 3) { status.textContent = "Escreva sua opinião antes de enviar."; return; }
      const item = { tipo: type, texto: texto.slice(0, 2000), tela: String(screen).slice(0, 40), versao: (document.querySelector('script[src^="script.js"]')?.getAttribute("src") || "").split("v=")[1] || "" };
      button.disabled = true;
      status.textContent = "Enviando…";
      const sent = navigator.onLine && (await sendFeedback(item).catch(() => false));
      if (!sent) writeFeedbackQueue([...readFeedbackQueue(), item]);
      closeSheet({ force: true });
      toast(sent ? "Obrigado! Sua opinião foi enviada." : "Sem conexão agora: sua opinião vai assim que a internet voltar.");
    });
  });
}
window.openFeedbackSheet = openFeedbackSheet;
window.contaFeedback = () => Boolean(supabaseClient);
window.renderHomeFeedback?.();

// ---------------------------------------------------------------------------
// Seção "Sua conta" nos Ajustes
// ---------------------------------------------------------------------------

let accountRoot = null;
let pendingEmail = "";
let authMode = ""; // "criar" ou "entrar" quando o login abre pela tela de boas-vindas

function paintAccount() {
  if (!accountRoot?.isConnected) return;
  if (!supabaseClient) {
    accountRoot.innerHTML = authMode
      ? `<p class="muted">Sem conexão com as contas agora. Confira a internet e tente de novo.</p>`
      : `<h3>${icon("user")} Sua conta</h3><p class="muted">As contas estão sendo preparadas. Por enquanto, tudo fica neste aparelho.</p>`;
    return;
  }
  const sync = readSync();
  if (conta.user) {
    const when = sync.lastSyncAt ? new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(sync.lastSyncAt)) : "ainda não";
    accountRoot.innerHTML = `<h3>${icon("user")} Sua conta</h3>
      <p class="settings-ok">${icon("circle-check")} ${escapeHtml(conta.perfil?.nome || conta.user.email)}</p>
      ${conta.perfil ? `<p class="settings-meta">${icon("user")} ${escapeHtml(conta.user.email)} · WhatsApp ${escapeHtml(formatWhatsapp(conta.perfil.whatsapp))}</p>` : `<p class="settings-meta">${icon("info")} Falta completar o seu cadastro.</p>`}
      <p class="settings-meta">${icon("shield-check")} Plano: ${escapeHtml(PLAN_LABELS[conta.plano?.plano] || "Teste gratuito")} · viagens e memórias guardadas na nuvem, só você vê.</p>
      <p class="settings-meta">${icon("clock")} Última sincronização: ${escapeHtml(when)}${conta.status ? ` · ${escapeHtml(conta.status)}` : ""}</p>
      <button class="btn btn-secondary btn-block" type="button" id="account-perfil">${icon("pencil")} ${conta.perfil ? "Editar cadastro" : "Completar cadastro"}</button>
      <div class="row-actions"><button class="btn btn-secondary" type="button" id="account-sync"${conta.syncing ? " disabled" : ""}>${icon("download")} Sincronizar</button><button class="btn btn-secondary" type="button" id="account-logout">Sair</button></div>`;
    accountRoot.querySelector("#account-sync").onclick = () => syncNow({ silent: false });
    accountRoot.querySelector("#account-perfil").onclick = () => openPerfilSheet({ first: !conta.perfil });
    accountRoot.querySelector("#account-logout").onclick = async () => {
      await syncNow();
      await supabaseClient.auth.signOut();
      toast("Você saiu da conta. As viagens continuam neste aparelho.");
    };
    return;
  }
  // Criar conta: o cadastro completo vem antes do código; o código só sai com tudo preenchido.
  const signup = authMode === "criar";
  const pending = signup ? readPendingSignup() : null;
  const intro = {
    criar: pendingEmail ? "" : "Preencha seus dados de testador. Depois enviamos um código de 6 dígitos para o seu e-mail: é só digitar para entrar, sem senha.",
    entrar: "Digite o e-mail da sua conta. Enviamos um código de 6 dígitos para você entrar."
  }[authMode];
  accountRoot.innerHTML = `${intro ? `<p class="muted">${intro}</p>` : authMode ? "" : `<h3>${icon("user")} Sua conta</h3>
    <p class="muted">Crie sua conta de testador com o seu e-mail: suas viagens e memórias ficam guardadas na nuvem e você pode usar em outro celular. Não precisa de senha: chega um código no e-mail.</p>`}
    ${pendingEmail
      ? `<p class="muted">Enviamos um código de 6 dígitos para <strong>${escapeHtml(pendingEmail)}</strong>. Se não chegar em 2 minutos, olhe também no spam.</p>
         <label class="field">Código do e-mail<input id="account-code" inputmode="numeric" autocomplete="one-time-code" maxlength="8" placeholder="Código de 6 dígitos"></label>
         <div class="row-actions"><button class="btn btn-secondary" type="button" id="account-back">${signup ? "Corrigir dados" : "Trocar e-mail"}</button><button class="btn btn-primary" type="button" id="account-verify">Entrar</button></div>`
      : `${signup ? perfilFieldsHtml(pending || {}, { email: pending?.email || "" }) : `<label class="field">Seu e-mail<input id="account-email" type="email" autocomplete="email" placeholder="voce@exemplo.com"></label>`}
         <button class="btn btn-primary btn-block" type="button" id="account-send">Receber código por e-mail</button>
         <p class="account-terms">Ao continuar, você concorda com os <a href="https://viagemnamao.com/termos" target="_blank" rel="noopener noreferrer">Termos de uso</a> e a <a href="https://viagemnamao.com/privacidade" target="_blank" rel="noopener noreferrer">Política de privacidade</a>.</p>`}
    <p class="form-status" id="account-status" role="status" aria-live="polite"></p>`;
  const status = accountRoot.querySelector("#account-status");
  if (signup && !pendingEmail) wirePerfilFields(accountRoot);
  // E-mail com cara de erro de digitação (gmail.comh, hotmial.com): pergunta antes de mandar o código.
  let typoChecked = "";
  status.addEventListener("click", (event) => {
    const use = event.target.closest("[data-email-fix]");
    if (use) {
      accountRoot.querySelector("#account-email").value = use.dataset.emailFix;
      typoChecked = use.dataset.emailFix;
      accountRoot.querySelector("#account-send").click();
    }
    if (event.target.closest("[data-email-keep]")) {
      typoChecked = accountRoot.querySelector("#account-email").value.trim().toLowerCase();
      accountRoot.querySelector("#account-send").click();
    }
  });
  accountRoot.querySelector("#account-send")?.addEventListener("click", async (event) => {
    const email = accountRoot.querySelector("#account-email").value.trim().toLowerCase();
    // Criar conta: confere nome, WhatsApp e aniversário antes do e-mail (o código só sai com tudo certo).
    const fields = signup ? readPerfilFields(accountRoot) : null;
    if (fields?.error) { status.textContent = fields.error; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { status.textContent = "Confira o e-mail digitado."; return; }
    const suggestion = emailSuggestion(email);
    if (suggestion && typoChecked !== email) {
      status.innerHTML = `Você quis dizer <strong>${escapeHtml(suggestion)}</strong>?<span class="email-fix"><button class="btn btn-primary" type="button" data-email-fix="${escapeHtml(suggestion)}">Sim, usar este</button><button class="btn btn-secondary" type="button" data-email-keep>Não, está certo</button></span>`;
      return;
    }
    const button = event.currentTarget;
    button.disabled = true;
    status.textContent = "Enviando…";
    if (fields) writePendingSignup({ email, ...fields.data });
    const { error } = await supabaseClient.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
    if (error) {
      button.disabled = false;
      status.textContent = /rate|seconds/i.test(error.message) ? "Espere um pouco antes de pedir outro código." : navigator.onLine ? "Não consegui enviar agora. Tente de novo em instantes." : "Sem internet. Conecte-se para receber o código.";
      return;
    }
    pendingEmail = email;
    paintAccount();
    accountRoot.querySelector("#account-code")?.focus();
  });
  accountRoot.querySelector("#account-back")?.addEventListener("click", () => { pendingEmail = ""; paintAccount(); });
  accountRoot.querySelector("#account-verify")?.addEventListener("click", async (event) => {
    const token = accountRoot.querySelector("#account-code").value.replace(/\D/g, "");
    if (token.length < 6) { status.textContent = "Digite o código que chegou no e-mail."; return; }
    const button = event.currentTarget;
    button.disabled = true;
    status.textContent = "Entrando…";
    const { error } = await supabaseClient.auth.verifyOtp({ email: pendingEmail, token, type: "email" });
    if (error) {
      button.disabled = false;
      status.textContent = "Código inválido ou vencido. Confira ou peça outro.";
      return;
    }
    pendingEmail = "";
  });
}

// ---------------------------------------------------------------------------
// Boas-vindas (#welcome no index.html): sem conta, o app abre nela e só segue depois do login.
// O index.html já marca <html class="sem-conta"> antes de desenhar, se não houver login guardado.
// Sem internet, quem já entrou continua entrando: só volta para cá se o login sumir do aparelho
// (saiu da conta ou a sessão foi encerrada no servidor). Os dados do aparelho nunca são apagados.
// ---------------------------------------------------------------------------

const AUTH_STORAGE_KEY = "sb-nbabmcctrncfguoedhiz-auth-token";

function hasStoredLogin() {
  try { return Boolean(window.localStorage.getItem(AUTH_STORAGE_KEY)); } catch { return false; }
}

function setWelcome(show) {
  document.documentElement.classList.toggle("sem-conta", show);
  if (show) window.scrollTo(0, 0);
}

function openAuthSheet(mode) {
  openSheet(`${sheetTitle(mode === "entrar" ? "Entrar na sua conta" : "Criar sua conta")}<section class="settings-section auth-section" id="account-section"></section>`, (root) => {
    authMode = mode;
    accountRoot = root.querySelector("#account-section");
    paintAccount();
    root.querySelector("#account-email")?.focus();
  });
}

document.querySelector("#welcome")?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-welcome]");
  if (button) openAuthSheet(button.dataset.welcome);
});

window.contaUI = (root) => {
  authMode = "";
  // "Ajude no desenvolvimento": opinião para a equipe (logo depois da conta).
  if (supabaseClient) {
    window.setTimeout(() => {
      root.querySelector("#account-section")?.insertAdjacentHTML("afterend", `<section class="settings-section"><h3>${icon("sparkles")} Ajude no desenvolvimento</h3><p class="muted">Conte o que travou, o que faltou ou o que você gostou. As 10 pessoas que mais contribuírem ganham acesso vitalício enquanto o app estiver no ar.</p><button class="btn btn-secondary btn-block" type="button" data-feedback-open>${icon("pencil")} Enviar opinião</button></section>`);
    }, 0);
  }
  // Logo abaixo do título "Ajustes".
  const title = root.querySelector(".sheet-title");
  if (title) title.insertAdjacentHTML("afterend", '<section class="settings-section" id="account-section"></section>');
  else root.insertAdjacentHTML("afterbegin", '<section class="settings-section" id="account-section"></section>');
  accountRoot = root.querySelector("#account-section");
  paintAccount();
};

if (supabaseClient) {
  supabaseClient.auth.onAuthStateChange((event, session) => {
    const before = conta.user?.id;
    conta.user = session?.user || null;
    if (!conta.user) {
      conta.plano = null; conta.perfil = null; paintAccount(); window.renderHomeAccount?.();
      if (!hasStoredLogin()) setWelcome(true);
      return;
    }
    if (document.documentElement.classList.contains("sem-conta")) {
      setWelcome(false);
      if (authMode && accountRoot?.closest("#sheet")) closeSheet({ force: true });
      authMode = "";
      render({ scroll: false });
    }
    if (before === conta.user.id) return;
    // Conta nova neste aparelho: guarda a cópia das viagens locais antes de qualquer sincronização.
    if (event === "SIGNED_IN" && readSync().userId !== conta.user.id && state.trips.length) backupLocalState(conta.user.id);
    // Deixa o evento terminar antes de chamar o banco (recomendação do Supabase).
    window.setTimeout(async () => {
      await loadPlan().catch(() => {});
      await loadPerfil().catch(() => {});
      paintAccount();
      if (event === "SIGNED_IN" && readSync().userId !== conta.user.id) {
        writeSync({ userId: conta.user.id, lastPulledAt: "", fotosEnviadas: [] });
        await firstSync().catch((error) => console.error("Falha no primeiro login.", error));
      } else await pullIfNewer();
      paintAccount();
      window.renderHomeAccount?.();
      registrarUso().catch(() => {});
      // Sem cadastro: pede nome e WhatsApp, obrigatório. Se outra janela estiver aberta, espera ela fechar.
      if (conta.perfilConferido && !conta.perfil) askPerfil();
    }, 0);
  });
}

// Sem conta, o aparelho também conta no teste (só os números). Com conta, conta junto com o e-mail.
if (supabaseClient) window.setTimeout(() => { registrarUso().catch(() => {}); flushFeedbackQueue().catch(() => {}); }, 4000);
// Criou viagem, memória ou gasto: atualiza os números um minuto depois (junta várias mudanças num envio só).
let usageTimer = null;
window.addEventListener("estado-salvo", () => {
  if (!supabaseClient) return;
  window.clearTimeout(usageTimer);
  usageTimer = window.setTimeout(() => registrarUso().catch(() => {}), 60000);
});
