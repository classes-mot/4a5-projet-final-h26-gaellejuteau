import "./Catalogue.css";
import GateauCard from "./components/GateauCard";
import { gateaux } from "../../data/gateaux";
import { useState } from "react";

const GATEAUX = ["Tous", "Vanille", "Chocolat"];

export default function Catalogue({ addToCart }) {
  const [gateauActive, setGateauActive] = useState("Tous");

  const filtres =
    gateauActive === "Tous"
      ? gateaux
      : gateaux.filter((g) => g.gateau === gateauActive);

  return (
    <div className="catalogue-wrapper">
      <h2 className="catalogue-titre">Catalogue</h2>

      <div className="catalogue-filtres">
        {GATEAUX.map((g) => (
          <button
            key={g}
            className={`filtre-btn ${gateauActive === g ? "filtre-btn-active" : ""}`}
            onClick={() => setGateauActive(g)}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="catalogue-grid">
        {filtres.map((gateau) => (
          <GateauCard key={gateau.id} gateau={gateau} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
