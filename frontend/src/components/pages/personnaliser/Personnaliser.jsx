import "./Personnaliser.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Personnaliser({ addToCart }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState({
    portions: "",
    gateau: "",
    cremage: "",
    saveur: "",
    inscription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "portions") {
      if (value === "" || parseInt(value) <= 50) {
        setFormValues((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValues.gateau || !formValues.cremage || !formValues.saveur) {
      alert(t("alerteChoix"));
      return;
    }
    if (parseInt(formValues.portions) > 50) {
      alert(t("alertePortions"));
      return;
    }
    const prix = formValues.portions * 3.99;
    const nom = `Gâteau ${formValues.gateau}/${formValues.cremage}/${formValues.saveur} pour ${formValues.portions} portions`;
    addToCart(nom, parseFloat(prix.toFixed(2)));
    navigate("/panier");
  };

  return (
    <div className="perso-wrapper">
      <form className="perso-form" onSubmit={handleSubmit}>
        <h2>{t("personalisation")}</h2>

        <div className="perso-control">
          <label htmlFor="portions">{t("nbPortions")} : </label>
          <input
            type="number"
            id="portions"
            name="portions"
            value={formValues.portions}
            onChange={handleChange}
            min={4}
            max={50}
            required
          />
        </div>

        <div className="perso-control">
          <label>{t("gateau")} : </label>
          <div className="perso-radio-group">
            <label className="perso-radio-label">
              <input
                type="radio"
                name="gateau"
                value="Vanille"
                onChange={handleChange}
              />
              {t("Vanille")}
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="gateau"
                value="Chocolat"
                onChange={handleChange}
              />
              {t("Chocolat")}
            </label>
          </div>
        </div>

        <div className="perso-control">
          <label>{t("cremage")} : </label>
          <div className="perso-radio-group perso-radio-grid">
            <label className="perso-radio-label">
              <input
                type="radio"
                name="cremage"
                value="Vanille"
                onChange={handleChange}
              />
              {t("Vanille")}
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="cremage"
                value="Chocolat"
                onChange={handleChange}
              />
              {t("Chocolat")}
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="cremage"
                value="Fraise"
                onChange={handleChange}
              />
              {t("Fraise")}
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="cremage"
                value="Caramel"
                onChange={handleChange}
              />
              {t("Caramel")}
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="cremage"
                value="Citron"
                onChange={handleChange}
              />
              {t("Citron")}
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="cremage"
                value="Oreo"
                onChange={handleChange}
              />
              {t("Oreo")}
            </label>
          </div>
        </div>

        <div className="perso-control">
          <label>{t("saveur")} : </label>
          <div className="perso-radio-group perso-radio-grid">
            <label className="perso-radio-label">
              <input
                type="radio"
                name="saveur"
                value="Vanille"
                onChange={handleChange}
              />
              {t("Vanille")}
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="saveur"
                value="Mangue"
                onChange={handleChange}
              />
              {t("Mangue")}
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="saveur"
                value="Chocolat"
                onChange={handleChange}
              />
              {t("Chocolat")}
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="saveur"
                value="Cerise"
                onChange={handleChange}
              />
              {t("Cerise")}
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="saveur"
                value="Fraise"
                onChange={handleChange}
              />
              {t("Fraise")}
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="saveur"
                value="Citron"
                onChange={handleChange}
              />
              {t("Citron")}
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="saveur"
                value="Framboise"
                onChange={handleChange}
              />
              {t("Framboise")}
            </label>
          </div>
        </div>

        <div className="perso-control">
          <label htmlFor="inscription">{t("inscription")} : </label>
          <input
            type="text"
            id="inscription"
            name="inscription"
            value={formValues.inscription}
            onChange={handleChange}
            placeholder={t("inscriptionPlaceholder")}
          />
        </div>

        <div className="perso-btn-wrapper">
          <button type="submit" className="perso-btn">
            {t("passerCommande")}
          </button>
        </div>
      </form>
    </div>
  );
}
