// Lista de espera: o e-mail vai para a função da Vercel (/api/lista-espera),
// que grava no Supabase. Nenhuma chave fica no navegador.
const form = document.querySelector("#form-lista");
const statusText = document.querySelector("#form-status");

function setStatus(text, isError = false) {
  statusText.textContent = text;
  statusText.classList.toggle("erro", isError);
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const email = String(data.email || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    setStatus("Confira o e-mail digitado.", true);
    form.email.focus();
    return;
  }
  if (!form.consentimento.checked) {
    setStatus("Para entrar na lista, marque que aceita receber e-mails.", true);
    return;
  }
  const button = form.querySelector("button[type=submit]");
  button.disabled = true;
  setStatus("Enviando…");
  try {
    const response = await fetch("/api/lista-espera", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, nome: String(data.nome || "").trim(), consentimento: true, site: data.site || "", origem: new URLSearchParams(location.search).get("utm_source") || "site" })
    });
    if (!response.ok) throw new Error(String(response.status));
    form.reset();
    setStatus("Pronto! Você está na lista. Até breve 💚");
  } catch (error) {
    setStatus("Não consegui enviar agora. Tente de novo em instantes.", true);
  } finally {
    button.disabled = false;
  }
});
