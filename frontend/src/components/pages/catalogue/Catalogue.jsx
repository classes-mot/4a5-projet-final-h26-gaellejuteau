import "./Catalogue.css";
import GateauCard from "./components/GateauCard";
import { useState } from "react";
import { useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook.js";
import { useTranslation } from "react-i18next";

const GATEAUX = ["Tous", "Vanille", "Chocolat"];

export default function Catalogue({ addToCart }) {
  const [gateauActive, setGateauActive] = useState("Tous");
  const [gateaux, setGateaux] = useState([]);
  const { sendRequest } = useHttpClient();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchGateaux = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/gateaux",
        );
        setGateaux(responseData.gateaux);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGateaux();
  }, [sendRequest]);
  const filtres =
    gateauActive === "Tous"
      ? gateaux
      : gateaux.filter((g) => g.gateau === gateauActive);

  return (
    <div className="catalogue-wrapper">
      <h2 className="catalogue-titre">{t("catalogueTitre")}</h2>

      <div className="catalogue-filtres">
        {GATEAUX.map((g) => (
          <button
            key={g}
            className={`filtre-btn ${gateauActive === g ? "filtre-btn-active" : ""}`}
            onClick={() => setGateauActive(g)}
          >
            {t(g)}
          </button>
        ))}
      </div>

      <div className="catalogue-grid">
        {filtres.map((gateau) => (
          <GateauCard key={gateau._id} gateau={gateau} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
