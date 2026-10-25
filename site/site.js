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

// Menu no celular.
const menu = document.querySelector("#menu");
const menuButton = document.querySelector("#menu-botao");
menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  menu.classList.toggle("aberto", open);
});
menu?.addEventListener("click", (event) => {
  if (!event.target.closest("a")) return;
  menu.classList.remove("aberto");
  menuButton.setAttribute("aria-expanded", "false");
});

// Créditos das fotos (licenças) no rodapé e nos cantos das fotos grandes.
const fotos = window.FOTOS_SITE || {};
const creditText = (item) => `${item.autor} · ${item.licenca}`;
[["#credito-hero", "foto-hero"], ["#credito-descobrir", "foto-descobrir"]].forEach(([selector, id]) => {
  const link = document.querySelector(selector);
  if (!link || !fotos[id]) return;
  link.href = fotos[id].pagina;
  link.textContent = `Foto: ${creditText(fotos[id])}`;
});
const footer = document.querySelector("#creditos-fotos");
if (footer) footer.innerHTML = "Fotos de viagem: " + Object.values(fotos).map((item) => `<a href="${item.pagina}" target="_blank" rel="noopener">${creditText(item)}</a>`).join(", ") + ".";

// Entrada suave das seções ao rolar.
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visivel");
    observer.unobserve(entry.target);
  }), { rootMargin: "0px 0px -10% 0px" });
  document.querySelectorAll(".recurso, .mais-recursos, .passos li, .em-breve li, .polaroide, .anotacao").forEach((element) => {
    element.classList.add("revelar");
    observer.observe(element);
  });
}
