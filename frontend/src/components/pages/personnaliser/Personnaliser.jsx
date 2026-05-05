import "./Personnaliser.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Personnaliser({ addToCart }) {
  const navigate = useNavigate();
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
      alert("Veuillez choisir un type de gâteau, un crémage et une saveur.");
      return;
    }

    if (parseInt(formValues.portions) > 50) {
      alert("Le nombre de portions ne peut pas dépasser 50.");
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
        <h2>Personalisation</h2>

        <div className="perso-control">
          <label htmlFor="portions">Nombre de portions: </label>
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
          <label>Gateau: </label>
          <div className="perso-radio-group">
            <label className="perso-radio-label">
              <input
                type="radio"
                name="gateau"
                value="Vanille"
                onChange={handleChange}
              />
              Vanille
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
          <label>Crémage: </label>
          <div className="perso-radio-group perso-radio-grid">
            <label className="perso-radio-label">
              <input
                type="radio"
                name="cremage"
                value="Vanille"
                onChange={handleChange}
              />
              Vanille
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="cremage"
                value="Chocolat"
                onChange={handleChange}
              />
              Chocolat
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="cremage"
                value="Fraise"
                onChange={handleChange}
              />
              Fraise
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="cremage"
                value="Caramel"
                onChange={handleChange}
              />
              Caramel
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="cremage"
                value="Citron"
                onChange={handleChange}
              />
              Citron
            </label>
            <label className="perso-radio-label">
              <input
                type="radio"
                name="cremage"
                value="Oreo"
                onChange={handleChange}
              />
              Oréo
            </label>
          </div>
        </div>

        <div className="perso-control">
          <label>Saveur: </label>
          <div className="perso-radio-group perso-radio-grid">
            <label className="perso-radio-label">
              <input
                type="radio"
                name="saveur"
                value="Vanille"
                onChange={handleChange}
              />
              Vanille
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
            <label className="perso-radio-label">
              <input
                type="radio"
                name="saveur"
                value="Framboise"
                onChange={handleChange}
              />
              Framboise
            </label>
          </div>
        </div>

        <div className="perso-control">
          <label htmlFor="inscription">Inscription: </label>
          <input
            type="text"
            id="inscription"
            name="inscription"
            value={formValues.inscription}
            onChange={handleChange}
            placeholder="ex: Joyeux Anniversaire!"
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
