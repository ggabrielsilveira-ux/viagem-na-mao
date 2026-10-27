// O formulário da lista de espera saiu do site: quem quer testar cria a conta no próprio app.
// Os inscritos continuam guardados no Supabase (tabela da lista de espera), e /api/lista-espera segue no ar.

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
