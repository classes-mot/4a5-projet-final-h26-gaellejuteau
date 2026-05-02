import "./Personnaliser.css";
import { useState } from "react";

export default function Personnaliser() {
  const [formValues, setFormValues] = useState({
    portions: "",
    gateau: "",
    saveur: "",
    inscriptions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Commande passée avec les valeurs :", formValues);
  };

  return (
    <div className="perso-wrapper">
      <form className="perso-form" onSubmit={handleSubmit}>
        <h2>Personalisation</h2>

        <div className="perso-control">
          <label htmlFor="portions">Nombre de portions</label>
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
          <label>Gateau</label>
          <div className="perso-radio-group">
            <label className="perso-radio-label">
              <input
                type="radio"
                name="gateau"
                value="Vanille"
                onChange={handleChange}
              />
              Vanillle
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="gateau"
                value="Chocolat"
                onChange={handleChange}
              />
              Chocolat
            </label>
          </div>
        </div>

        <div className="perso-control">
          <label>Saveur :</label>
          <div className="perso-radio-group perso-radio-grid">
            <label className="perso-radio-label">
              <input
                type="radio"
                name="saveur"
                value="Vanille"
                onChange={handleChange}
              />
              Vanillle
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="saveur"
                value="Mangue"
                onChange={handleChange}
              />
              Mangue
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="saveur"
                value="Chocolat"
                onChange={handleChange}
              />
              Chocolat
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="saveur"
                value="Cerise"
                onChange={handleChange}
              />
              Cerise
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="saveur"
                value="Fraise"
                onChange={handleChange}
              />
              Fraise
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="saveur"
                value="Citron"
                onChange={handleChange}
              />
              Citron
            </label>
          </div>
        </div>

        <div className="perso-control">
          <label htmlFor="inscription">Inscription :</label>
          <input
            type="text"
            id="inscription"
            name="inscription"
            value={formValues.inscription}
            onChange={handleChange}
          />
        </div>

        <div className="perso-btn-wrapper">
          <button type="submit" className="perso-btn">
            Passer la commande
          </button>
        </div>
      </form>
    </div>
  );
}
