import ReactDOM from "react-dom";
import { useState } from "react";
import "./Modal.css";

const PortionsModal = ({ isOpen, onClose, onConfirm, nomGateau }) => {
  const [portions, setPortions] = useState(4);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (portions < 4 || portions > 50) {
      alert("Entre 4 et 50 portions.");
      return;
    }
    onConfirm(portions);
    setPortions(4);
  };

  return ReactDOM.createPortal(
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-confirm">
        <div className="modal-content">
          <h2>{nomGateau}</h2>
          <p>Combien de portions souhaitez-vous ?</p>
          <input
            type="number"
            min={4}
            max={50}
            value={portions}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val >= 4 && val <= 50) setPortions(val);
            }}
            className="portions-input"
          />
          <p className="portions-prix">
            Total : {(portions * 3.49).toFixed(2)}$
          </p>
          <div className="modal-buttons">
            <button className="btn-cancel" onClick={onClose}>
              Annuler
            </button>
            <button className="btn-confirm" onClick={handleConfirm}>
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal-root"),
  );
};

export default PortionsModal;
