import "./Profil.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useHttpClient } from "../../hooks/http-hook.js";
import { AuthContext } from "../../context/auth-context.jsx";

export default function Profil() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  const [formValues, setFormValues] = useState({
    username: "",
    adresse: "",
    numTel: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/users/profile/${userId}`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` },
        );
        setFormValues({
          username: responseData.user.username || "",
          adresse: responseData.user.adresse || "",
          numTel: responseData.user.numTel || "",
        });
      } catch (err) {
        console.error(err);
      }
    };
    if (userId) fetchProfil();
  }, [sendRequest, userId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/users/profile/${userId}`,
        "PUT",
        JSON.stringify(formValues),
        { Authorization: `Bearer ${token}` },
      );
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/users/profile/${userId}`,
        "DELETE",
        null,
        { Authorization: `Bearer ${token}` },
      );
      auth.logout();
      navigate("/accueil");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profil-wrapper">
      <div className="profil-card">
        <h2>{t("profil")}</h2>

        {error && (
          <p className="profil-error" onClick={clearError}>
            {error}
          </p>
        )}

        <form className="profil-form" onSubmit={handleUpdate}>
          <div className="profil-control">
            <label htmlFor="username">{t("nomUtilisateur")} :</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formValues.username}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="profil-control">
            <label htmlFor="adresse">{t("adresse")} :</label>
            <input
              type="text"
              id="adresse"
              name="adresse"
              value={formValues.adresse}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="profil-control">
            <label htmlFor="numTel">{t("numTel")} :</label>
            <input
              type="tel"
              id="numTel"
              name="numTel"
              value={formValues.numTel}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="profil-actions">
            {!isEditing ? (
              <button
                type="button"
                className="profil-btn profil-btn-edit"
                onClick={() => setIsEditing(true)}
              >
                {t("modifier")}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="profil-btn profil-btn-cancel"
                  onClick={() => setIsEditing(false)}
                >
                  {t("annuler")}
                </button>
                <button
                  type="submit"
                  className="profil-btn profil-btn-save"
                  disabled={isLoading}
                >
                  {isLoading ? t("sauvegarde") : t("sauvegarder")}
                </button>
              </>
            )}
          </div>
        </form>

        <div className="profil-danger">
          <button
            className="profil-btn profil-btn-delete"
            onClick={() => setShowDeleteModal(true)}
          >
            {t("supprimerCompte")}
          </button>
        </div>

        {showDeleteModal && (
          <>
            <div
              className="modal-backdrop"
              onClick={() => setShowDeleteModal(false)}
            />
            <div className="modal-confirm">
              <div className="modal-content">
                <h2>{t("confirmerSuppression")}</h2>
                <p>{t("suppressionMessage")}</p>
                <p className="warning">{t("actionIrreversible")}</p>
                <div className="modal-buttons">
                  <button
                    className="btn-cancel"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    {t("annuler")}
                  </button>
                  <button className="btn-confirm" onClick={handleDelete}>
                    {t("supprimer")}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
