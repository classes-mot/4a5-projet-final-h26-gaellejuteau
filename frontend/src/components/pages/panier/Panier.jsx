import "./Panier.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHttpClient } from "../../hooks/http-hook.js";
import Modal from "../../context/Modal.jsx";

const LIVRAISON = 5.99;
const TAXE = 0.15;

export default function Panier({ cart, updateCart }) {
  const { t } = useTranslation();
  const { sendRequest } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const sousTotal = cart.reduce(
    (total, item) => total + item.price * item.amount,
    0,
  );
  const livraison = cart.length > 0 ? LIVRAISON : 0;
  const taxe = sousTotal * TAXE;
  const total = sousTotal + livraison + taxe;

  const handleAdd = (name) => {
    updateCart(
      cart.map((item) =>
        item.name === name ? { ...item, amount: item.amount + 1 } : item,
      ),
    );
  };

  const handleRemove = (name) => {
    updateCart(
      cart
        .map((item) =>
          item.name === name ? { ...item, amount: item.amount - 1 } : item,
        )
        .filter((item) => item.amount > 0),
    );
  };

  const handleDelete = (name) => {
    updateCart(cart.filter((item) => item.name !== name));
  };

  const handleConfirmCommande = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const nomCommande = cart
      .map((item) => `${item.name} x${item.amount}`)
      .join(", ");

    try {
      await sendRequest(
        "https://projet-final-nu0v.onrender.com/api/commandes",
        "POST",
        JSON.stringify({
          gateau: nomCommande,
          prix: total,
          client: userId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      );
      updateCart([]);
      setShowConfirmModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="panier-wrapper">
      <div className="panier-card">
        <h2>{t("panierTitre")}</h2>

        {cart.length === 0 ? (
          <p className="panier-empty">{t("panierVide")}</p>
        ) : (
          <>
            <ul className="panier-list">
              {cart.map(({ name, price, amount }, index) => (
                <li key={`${name}-${index}`} className="panier-item">
                  <span className="panier-item-name">{name}</span>
                  <div className="panier-item-controls">
                    <button
                      className="panier-qty-btn"
                      onClick={() => handleRemove(name)}
                    >
                      −
                    </button>
                    <span className="panier-qty">{amount}</span>
                    <button
                      className="panier-qty-btn"
                      onClick={() => handleAdd(name)}
                    >
                      +
                    </button>
                  </div>
                  <span className="panier-item-price">
                    {(price * amount).toFixed(2)}$
                  </span>
                  <button
                    className="panier-delete-btn"
                    onClick={() => handleDelete(name)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>

            <div className="panier-summary">
              <div className="panier-summary-row">
                <span>{t("sousTotal")}</span>
                <span>{sousTotal.toFixed(2)}$</span>
              </div>
              <div className="panier-summary-row">
                <span>{t("livraison")}</span>
                <span>{livraison.toFixed(2)}$</span>
              </div>
              <div className="panier-summary-row">
                <span>{t("taxes")}</span>
                <span>{taxe.toFixed(2)}$</span>
              </div>
              <div className="panier-summary-row panier-total">
                <span>{t("total")}</span>
                <span>{total.toFixed(2)}$</span>
              </div>
            </div>

            <div className="panier-btn-wrapper">
              <button
                className="panier-btn"
                onClick={() => setShowConfirmModal(true)}
              >
                {t("passerCommande")}
              </button>
            </div>
          </>
        )}
        <Modal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmCommande}
        />
      </div>
    </div>
  );
}
