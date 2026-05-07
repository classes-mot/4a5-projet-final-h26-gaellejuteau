import "./Accueil.css";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context.jsx";
import { useHttpClient } from "../hooks/http-hook.js";
import { useTranslation } from "react-i18next";
import GateauCard from "./catalogue/components/GateauCard";

const Accueil = ({ addToCart }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { sendRequest } = useHttpClient();
  const [apercu, setApercu] = useState([]);
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    const fetchApercu = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/gateaux",
        );
        setApercu(responseData.gateaux.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };
    fetchApercu();
  }, [sendRequest]);

  useEffect(() => {
    const fetchCommandes = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || !token) return;

      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/commandes/${userId}`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` },
        );
        setCommandes(responseData.commandes);
      } catch (err) {
        console.error(err);
      }
    };

    if (auth.isLoggedIn) fetchCommandes();
  }, [sendRequest, auth.isLoggedIn]);

  return (
    <div className="accueil-wrapper">
      <section className="accueil-hero">
        <h1>{t("gateauxAmour")}</h1>
        <p>{t("soustitre")}</p>
        <div className="accueil-hero-btns">
          <button
            className="accueil-btn-primary"
            onClick={() => navigate("/catalogue")}
          >
            {t("voirCatalogue")}
          </button>
          {auth.isLoggedIn && (
            <button
              className="accueil-btn-secondary"
              onClick={() => navigate("/personnaliser")}
            >
              {t("personnaliser")}
            </button>
          )}
        </div>
      </section>

      <section className="accueil-section">
        <h2 className="accueil-section-titre">{t("catalogueTitre")}</h2>
        <div className="accueil-grid">
          {apercu.map((gateau) => (
            <GateauCard
              key={gateau._id}
              gateau={gateau}
              addToCart={addToCart}
            />
          ))}
        </div>
        <div className="accueil-plus-wrapper">
          <button
            className="accueil-btn-plus"
            onClick={() => navigate("/catalogue")}
          >
            {t("plus")}
          </button>
        </div>
      </section>

      {auth.isLoggedIn && (
        <section className="accueil-section">
          <h2 className="accueil-section-titre">{t("historiqueCommandes")}</h2>
          {commandes && commandes.length > 0 ? (
            <ul className="accueil-historique">
              {commandes.map((commande, index) => (
                <li key={index} className="accueil-historique-item">
                  <span className="historique-nom">{commande.gateau}</span>
                  <span className="historique-prix">
                    {commande.prix.toFixed(2)}$
                  </span>
                  <span className="historique-date">
                    {new Date(commande.date).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="accueil-empty">{t("pasDeCommandes")}</p>
          )}
        </section>
      )}
    </div>
  );
};

export default Accueil;
