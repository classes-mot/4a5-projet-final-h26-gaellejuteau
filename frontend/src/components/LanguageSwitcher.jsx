import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css"; // ← ajoute cet import

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="lang-switcher">
      <button
        className={i18n.language === "fr" ? "active" : ""}
        onClick={() => i18n.changeLanguage("fr")}
      >
        FR
      </button>
      <button
        className={i18n.language === "en" ? "active" : ""}
        onClick={() => i18n.changeLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}
