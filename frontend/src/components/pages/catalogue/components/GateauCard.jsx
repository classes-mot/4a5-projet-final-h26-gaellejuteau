import "./GateauCard.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/auth-context.jsx";
import { useNavigate } from "react-router-dom";
import PortionsModal from "../../../context/PortionsModal.jsx";
import { useTranslation } from "react-i18next";

export default function GateauCard({ gateau, addToCart }) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const handleAjouter = () => {
    if (!auth.isLoggedIn) {
      navigate("/login");
      return;
    }
    setShowModal(true);
  };

  const handleConfirm = (portions) => {
    const prix = portions * 3.49;
    addToCart(
      `${gateau.nom} pour ${portions} portions`,
      parseFloat(prix.toFixed(2)),
    );
    setShowModal(false);
  };

  return (
    <div className="gateau-card">
      <h3 className="gateau-card-nom">{gateau.nom}</h3>
      <div className="gateau-card-tags">
        <span className="gateau-tag">🎂 {gateau.gateau}</span>
        <span className="gateau-tag">🍦 {gateau.cremage}</span>
        <span className="gateau-tag">✨ {gateau.saveur}</span>
      </div>
      <div className="gateau-card-footer">
        <span className="gateau-card-prix">3.49$ / portion</span>
        <button className="gateau-card-btn" onClick={handleAjouter}>
          {t("ajouter")}
        </button>
      </div>

      <PortionsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        nomGateau={gateau.nom}
      />
    </div>
  );
}
