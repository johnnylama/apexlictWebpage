document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggle");
  const langSelector = document.getElementById("langSelector");
  const root = document.documentElement;

  /* ─────── Configurar tema desde localStorage ─────── */
  const savedTheme = localStorage.getItem("theme") || "light";
  root.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const nextTheme = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    updateThemeIcon(nextTheme);
  });

  function updateThemeIcon(theme) {
    if (!toggleBtn) return;
    toggleBtn.innerHTML =
      theme === "dark"
        ? '<i class="bi bi-sun-fill"></i>'
        : '<i class="bi bi-moon-fill"></i>';
  }

  /* ─────── Traducción dinámica ─────── */
  function applyTranslations(data) {
    document.querySelector("h1.display-4").innerHTML = data.hero_title;
    document.querySelector(".lead.mb-4").textContent = data.hero_subtitle;
    document.querySelector('a[href="#servicios"]').textContent = data.btn_services;
    document.querySelector('a[href="#contacto"]').textContent = data.btn_contact;
    document.querySelector("#servicios h2").textContent = data.services_title;
    document.querySelector("#servicios p.text-muted").textContent = data.services_subtitle;

    const serviceCards = document.querySelectorAll("#servicios .card");
    data.services.forEach((service, index) => {
      const card = serviceCards[index];
      if (card) {
        card.querySelector("h5").textContent = service.title;
        card.querySelector("p").textContent = service.text;
      }
    });
  }

  function loadLang(lang) {
    fetch(`lang/${lang}.json`)
      .then((res) => res.json())
      .then((data) => applyTranslations(data))
      .catch((err) => console.error("Error al cargar idioma:", err));
  }

  /* ─────── Cargar idioma inicial ─────── */
  const savedLang = localStorage.getItem("lang") || "es";
  if (langSelector) {
    langSelector.value = savedLang;
    loadLang(savedLang);

    langSelector.addEventListener("change", (e) => {
      const selectedLang = e.target.value;
      localStorage.setItem("lang", selectedLang);
      loadLang(selectedLang);
    });
  }
});
