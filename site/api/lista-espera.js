// Função da Vercel: recebe o e-mail da lista de espera e grava no Supabase.
// Variáveis de ambiente (configuradas no painel da Vercel, nunca no código):
//   SUPABASE_URL                ex.: https://xxxx.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY   chave secreta do projeto (Secret key "sb_secret_..." ou a antiga service_role)
export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ erro: "Use POST." });
  }
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return response.status(500).json({ erro: "Lista de espera ainda não configurada." });

  const body = typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
  // Campo escondido: robôs preenchem, pessoas não.
  if (body.site) return response.status(200).json({ ok: true });
  const email = String(body.email || "").trim().toLowerCase();
  const nome = String(body.nome || "").trim().slice(0, 80);
  const origem = String(body.origem || "site").trim().slice(0, 40);
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return response.status(400).json({ erro: "E-mail inválido." });
  if (body.consentimento !== true) return response.status(400).json({ erro: "É preciso aceitar receber e-mails." });

  // Aceita a URL com ou sem "/rest/v1/" no final.
  const baseUrl = SUPABASE_URL.trim().replace(/\/+$/, "").replace(/\/rest\/v1$/, "");
  const result = await fetch(`${baseUrl}/rest/v1/lista_espera?on_conflict=email`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      // Chaves novas (sb_secret_...) vão só no apikey; a antiga service_role (JWT) também no Authorization.
      ...(SUPABASE_SERVICE_ROLE_KEY.startsWith("sb_") ? {} : { Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}` }),
      "Content-Type": "application/json",
      // E-mail repetido não dá erro: a pessoa já está na lista.
      Prefer: "resolution=ignore-duplicates,return=minimal"
    },
    body: JSON.stringify({ email, nome: nome || null, origem })
  });
  if (!result.ok) {
    console.error("Supabase respondeu", result.status, await result.text());
    return response.status(502).json({ erro: "Não foi possível salvar agora." });
  }
  return response.status(200).json({ ok: true });
}
