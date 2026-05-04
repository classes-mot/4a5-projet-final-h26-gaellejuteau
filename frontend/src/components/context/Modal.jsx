import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-confirm">
        <div className="modal-content">
          <h2>Confirmer l'achat</h2>
          <p>Voulez vous vraiment procéder à l'achat ?</p>
          <p className="warning">Cette action est irréversible.</p>

          <div className="modal-buttons">
            <button className="btn-cancel" onClick={onClose}>
              Annuler
            </button>
            <button className="btn-confirm" onClick={onConfirm}>
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
