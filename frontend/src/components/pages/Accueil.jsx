import "./Accueil.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context.jsx";
import { gateaux } from "../data/gateaux";
import GateauCard from "./catalogue/components/GateauCard";

const Accueil = ({ addToCart, commandes }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const apercu = gateaux.slice(0, 3);

  return (
    <div className="accueil-wrapper">
      <section className="accueil-hero">
        <h1>Des gâteaux faits avec amour 🎂</h1>
        <p>Commandez ou personnalisez votre gâteau de rêve</p>
        <div className="accueil-hero-btns">
          <button
            className="accueil-btn-primary"
            onClick={() => navigate("/catalogue")}
          >
            Voir le catalogue
          </button>
          {auth.isLoggedIn && (
            <button
              className="accueil-btn-secondary"
              onClick={() => navigate("/personnaliser")}
            >
              Personnaliser
            </button>
          )}
        </div>
      </section>

      <section className="accueil-section">
        <h2 className="accueil-section-titre">Catalogue...</h2>
        <div className="accueil-grid">
          {apercu.map((gateau) => (
            <GateauCard key={gateau.id} gateau={gateau} addToCart={addToCart} />
          ))}
        </div>
        <div className="accueil-plus-wrapper">
          <button
            className="accueil-btn-plus"
            onClick={() => navigate("/catalogue")}
          >
            Plus
          </button>
        </div>
      </section>

      {auth.isLoggedIn && (
        <section className="accueil-section">
          <h2 className="accueil-section-titre">Historique des commandes</h2>
          {commandes && commandes.length > 0 ? (
            <ul className="accueil-historique">
              {commandes.map((commande, index) => (
                <li key={index} className="accueil-historique-item">
                  <span className="historique-nom">{commande.nom}</span>
                  <span className="historique-prix">
                    {commande.total.toFixed(2)}$
                  </span>
                  <span className="historique-date">{commande.date}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="accueil-empty">
              Vous n'avez pas encore de commandes 🎂
            </p>
          )}
        </section>
      )}
    </div>
  );
};

export default Accueil;
