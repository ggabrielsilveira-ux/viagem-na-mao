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

const supabaseClient = SUPABASE_CONFIG.publishableKey && window.supabase
  ? window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.publishableKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false } })
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
  if (!force && usage.dia === today && usage.conta === (conta.user?.id || "")) return;
  const aparelho = usage.aparelho || (crypto.randomUUID ? crypto.randomUUID() : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => (c ^ (Math.random() * 16) >> (c / 4)).toString(16)));
  const cidades = new Set(state.trips.flatMap((trip) => trip.destinations.map((destination) => slugify(destination.name || ""))).filter(Boolean)).size;
  const { error } = await supabaseClient.rpc("registrar_uso", {
    p_aparelho: aparelho,
    p_viagens: state.trips.length,
    p_cidades: cidades,
    p_memorias: state.trips.reduce((total, trip) => total + (trip.memories || []).length, 0),
    p_gastos: state.trips.reduce((total, trip) => total + (trip.expenses || []).length, 0),
    p_instalado: window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true,
    p_versao: (document.querySelector('script[src^="script.js"]')?.getAttribute("src") || "").split("v=")[1] || ""
  });
  if (error) return;
  try { window.localStorage.setItem(USAGE_KEY, JSON.stringify({ aparelho, dia: today, conta: conta.user?.id || "" })); } catch { /* segue */ }
}

// A tela inicial convida a criar a conta de testador (script.js usa estas duas).
window.contaAtiva = () => Boolean(supabaseClient);
window.contaLogada = () => Boolean(conta.user);

// Primeiro login neste aparelho: decide o que fazer com as viagens daqui e as da nuvem.
async function firstSync() {
  const remote = await fetchRemote();
  const hasLocal = state.trips.length > 0;
  if (!remote) {
    await syncNow();
    if (hasLocal) toast("Suas viagens foram guardadas na conta");
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
    <button class="btn btn-primary btn-block" type="button" id="sync-merge">${icon("check")} Juntar as duas (recomendado)</button>
    <button class="btn btn-secondary btn-block" type="button" id="sync-remote">Usar só as da conta</button>
    <p class="muted">Juntar mantém tudo: as viagens que faltam entram e as memórias se somam.</p>`, (root) => {
    sheetGuard = () => false;
    const finish = async (data) => {
      sheetGuard = null;
      closeSheet({ force: true });
      applyRemoteState(data);
      writeSync({ lastPulledAt: remote.atualizado_em, dirty: true });
      await syncNow({ silent: false });
    };
    root.querySelector("#sync-merge").addEventListener("click", () => finish(mergeStates(state, remote.dados)));
    root.querySelector("#sync-remote").addEventListener("click", () => finish(remote.dados));
  });
}


// ---------------------------------------------------------------------------
// Cadastro do testador (tabela perfis, ferramentas/supabase-perfis.sql): nome completo e WhatsApp
// obrigatórios; aniversário (só dia e mês) e aceite de novidades opcionais.
// ---------------------------------------------------------------------------

const MONTHS_PT = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

async function loadPerfil() {
  const { data } = await supabaseClient.from("perfis").select("nome, whatsapp, aniversario, aceita_novidades").eq("user_id", conta.user.id).maybeSingle();
  conta.perfil = data || null;
  // O primeiro nome vira a saudação da tela inicial (a pessoa ainda pode trocar em Ajustes).
  if (conta.perfil?.nome && !(state.profile?.name || "").trim()) {
    state.profile = { ...(state.profile || {}), name: conta.perfil.nome.trim().split(/\s+/)[0] };
    saveState();
    window.renderHomeAccount?.();
    if (route.screen === "home") renderHome();
  }
}

// Só dígitos; número brasileiro sem DDI ganha o 55.
function normalizeWhatsapp(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 10 || digits.length === 11) return `55${digits}`;
  return digits;
}

function formatWhatsapp(digits) {
  const d = String(digits || "");
  const local = d.startsWith("55") && (d.length === 12 || d.length === 13) ? d.slice(2) : d;
  if (local.length === 11) return `(${local.slice(0, 2)}) ${local.slice(2, 7)}-${local.slice(7)}`;
  if (local.length === 10) return `(${local.slice(0, 2)}) ${local.slice(2, 6)}-${local.slice(6)}`;
  return d ? `+${d}` : "";
}

function openPerfilSheet({ first = false } = {}) {
  const perfil = conta.perfil || {};
  const [day, month] = (perfil.aniversario || "/").split("/");
  openSheet(`${sheetTitle(first ? "Complete seu cadastro" : "Seu cadastro")}
    <p class="muted">${first ? "Falta pouco: assim sabemos quem está testando e podemos falar com você sobre o app." : "Seus dados de testador. Só a equipe do Viagem na Mão vê."}</p>
    <label class="field">Nome completo<input id="perfil-nome" maxlength="120" autocomplete="name" value="${escapeHtml(perfil.nome || "")}" placeholder="Ex.: Maria da Silva"></label>
    <label class="field">WhatsApp com DDD<input id="perfil-whatsapp" type="tel" inputmode="tel" autocomplete="tel" maxlength="20" value="${escapeHtml(formatWhatsapp(perfil.whatsapp))}" placeholder="(48) 99999-9999"></label>
    <div class="field"><span>Aniversário (opcional, sem o ano)</span>
      <div class="perfil-birthday">
        <select id="perfil-dia" aria-label="Dia do aniversário"><option value="">Dia</option>${Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0")).map((d) => `<option value="${d}"${d === day ? " selected" : ""}>${Number(d)}</option>`).join("")}</select>
        <select id="perfil-mes" aria-label="Mês do aniversário"><option value="">Mês</option>${MONTHS_PT.map((name, i) => { const m = String(i + 1).padStart(2, "0"); return `<option value="${m}"${m === month ? " selected" : ""}>${name}</option>`; }).join("")}</select>
      </div>
    </div>
    <label class="check-item perfil-optin"><input type="checkbox" id="perfil-novidades"${perfil.aceita_novidades ? " checked" : ""}><span><strong>Quero receber novidades e ofertas</strong><small>Pelo WhatsApp e por e-mail. Você pode desistir quando quiser.</small></span></label>
    <p class="form-status" id="perfil-status" role="status" aria-live="polite"></p>
    <button class="btn btn-primary btn-block" type="button" id="perfil-salvar">${icon("check")} Salvar cadastro</button>
    <p class="account-terms">Usamos estes dados só para o teste do Viagem na Mão, como explica a <a href="https://viagemnamao.com/privacidade" target="_blank" rel="noopener noreferrer">Política de privacidade</a>.</p>`, (root) => {
    const status = root.querySelector("#perfil-status");
    root.querySelector("#perfil-salvar").addEventListener("click", async (event) => {
      const button = event.currentTarget;
      const nome = root.querySelector("#perfil-nome").value.trim().replace(/\s+/g, " ");
      const whatsapp = normalizeWhatsapp(root.querySelector("#perfil-whatsapp").value);
      const dia = root.querySelector("#perfil-dia").value;
      const mes = root.querySelector("#perfil-mes").value;
      const novidades = root.querySelector("#perfil-novidades").checked;
      if (nome.split(" ").length < 2) { status.textContent = "Escreva o nome completo (nome e sobrenome)."; return; }
      if (whatsapp.length < 12 || whatsapp.length > 15) { status.textContent = "Confira o WhatsApp: número com DDD."; return; }
      if (Boolean(dia) !== Boolean(mes)) { status.textContent = "Escolha o dia e o mês do aniversário, ou deixe os dois em branco."; return; }
      button.disabled = true;
      status.textContent = "Salvando…";
      const row = {
        user_id: conta.user.id, nome, whatsapp, aniversario: dia ? `${dia}/${mes}` : null,
        aceita_novidades: novidades, atualizado_em: new Date().toISOString(),
        ...(novidades && !conta.perfil?.aceita_novidades ? { aceite_novidades_em: new Date().toISOString() } : {})
      };
      const { error } = await supabaseClient.from("perfis").upsert(row);
      button.disabled = false;
      if (error) { status.textContent = "Não consegui salvar agora. Tente de novo em instantes."; return; }
      const firstName = nome.split(" ")[0];
      if (first || !(state.profile?.name || "").trim()) {
        state.profile = { ...(state.profile || {}), name: firstName };
        saveState();
      }
      conta.perfil = { nome, whatsapp, aniversario: row.aniversario, aceita_novidades: novidades };
      closeSheet({ force: true });
      if (route.screen === "home") renderHome();
      toast(first ? `Tudo pronto, ${firstName}! Boas viagens.` : "Cadastro atualizado");
    });
  });
}
window.openPerfilSheet = openPerfilSheet;

// ---------------------------------------------------------------------------
// Seção "Sua conta" nos Ajustes
// ---------------------------------------------------------------------------

let accountRoot = null;
let pendingEmail = "";

function paintAccount() {
  if (!accountRoot?.isConnected) return;
  if (!supabaseClient) {
    accountRoot.innerHTML = `<h3>${icon("user")} Sua conta</h3><p class="muted">As contas estão sendo preparadas. Por enquanto, tudo fica neste aparelho.</p>`;
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
  accountRoot.innerHTML = `<h3>${icon("user")} Sua conta</h3>
    <p class="muted">Crie sua conta de testador com o seu e-mail: suas viagens e memórias ficam guardadas na nuvem e você pode usar em outro celular. Não precisa de senha: chega um código no e-mail.</p>
    ${pendingEmail
      ? `<label class="field">Código enviado para ${escapeHtml(pendingEmail)}<input id="account-code" inputmode="numeric" autocomplete="one-time-code" maxlength="8" placeholder="Código de 6 dígitos"></label>
         <div class="row-actions"><button class="btn btn-secondary" type="button" id="account-back">Trocar e-mail</button><button class="btn btn-primary" type="button" id="account-verify">Entrar</button></div>`
      : `<label class="field">Seu e-mail<input id="account-email" type="email" autocomplete="email" placeholder="voce@exemplo.com"></label>
         <button class="btn btn-primary btn-block" type="button" id="account-send">Receber código por e-mail</button>
         <p class="account-terms">Ao continuar, você concorda com os <a href="https://viagemnamao.com/termos" target="_blank" rel="noopener noreferrer">Termos de uso</a> e a <a href="https://viagemnamao.com/privacidade" target="_blank" rel="noopener noreferrer">Política de privacidade</a>.</p>`}
    <p class="form-status" id="account-status" role="status" aria-live="polite"></p>`;
  const status = accountRoot.querySelector("#account-status");
  accountRoot.querySelector("#account-send")?.addEventListener("click", async (event) => {
    const email = accountRoot.querySelector("#account-email").value.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { status.textContent = "Confira o e-mail digitado."; return; }
    const button = event.currentTarget;
    button.disabled = true;
    status.textContent = "Enviando…";
    const { error } = await supabaseClient.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
    if (error) {
      button.disabled = false;
      status.textContent = /rate|seconds/i.test(error.message) ? "Espere um pouco antes de pedir outro código." : "Não consegui enviar agora. Tente de novo em instantes.";
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

window.contaUI = (root) => {
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
    if (!conta.user) { conta.plano = null; conta.perfil = null; paintAccount(); window.renderHomeAccount?.(); return; }
    if (before === conta.user.id) return;
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
      // Sem cadastro ainda: pede nome e WhatsApp (uma vez por abertura do app).
      if (!conta.perfil && !conta.perfilPedido && !document.querySelector("#sheet")?.open) {
        conta.perfilPedido = true;
        openPerfilSheet({ first: true });
      }
    }, 0);
  });
}

// Sem conta, o aparelho também conta no teste (só os números). Com conta, conta junto com o e-mail.
if (supabaseClient) window.setTimeout(() => registrarUso().catch(() => {}), 4000);
