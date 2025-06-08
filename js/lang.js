document.addEventListener("DOMContentLoaded", async () => {
  const langToggleBtn = document.getElementById("langToggle");
  const supportedLangs = ["es", "en"];
  let currentLang = localStorage.getItem("lang") || "es";

  function updateLangToggle(lang) {
    if (!langToggleBtn) return;
    langToggleBtn.textContent = lang === "es" ? "🇪🇸" : "🇺🇸";
  }

  async function loadLang(lang) {
    try {
      const res = await fetch(`lang/${lang}.json`);
      const data = await res.json();

      // Traducción de textos con data-i18n
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (data[key]) {
          if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
            el.placeholder = data[key];
          } else {
            el.innerHTML = data[key]; // permite contenido HTML como <span>
          }
        }
      });

      // Traducción de servicios
      const serviceTitles = document.querySelectorAll(".service-title");
      const serviceTexts = document.querySelectorAll(".service-text");
      if (data.services) {
        data.services.forEach((item, i) => {
          if (serviceTitles[i]) serviceTitles[i].textContent = item.title;
          if (serviceTexts[i]) serviceTexts[i].textContent = item.text;
        });
      }

      // Palabras del typewriter
      if (data.typewriterWords) {
        localStorage.setItem("typewriterWords", JSON.stringify(data.typewriterWords));
        if (window.restartTypewriter) {
          window.restartTypewriter();
        }
      }

      localStorage.setItem("lang", lang);
    } catch (err) {
      console.error("Error al cargar traducción:", err);
    }
  }

  function setLanguage(lang) {
    currentLang = lang;
    updateLangToggle(lang);
    loadLang(lang);
  }

  langToggleBtn?.addEventListener("click", () => {
    const nextLang = currentLang === "es" ? "en" : "es";
    setLanguage(nextLang);
  });

  // Inicializar
  updateLangToggle(currentLang);
  loadLang(currentLang);
});
