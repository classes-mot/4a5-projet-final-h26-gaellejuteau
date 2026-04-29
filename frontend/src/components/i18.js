import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // options
    lng: "fr", // langue par défaut
    fallbackLng: "en", // langue de secours
    debug: true,
    supportedLngs: ["fr", "en"],
    load: "languageOnly",
    interpolation: {
      escapeValue: false,
    },
  });
// suite de la page précédente
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng; // MAJ l'attribute lang de la balise HTML
});
export default i18n;
