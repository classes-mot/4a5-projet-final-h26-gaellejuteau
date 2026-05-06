import "./Signup.css";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth-context.jsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useHttpClient } from "../hooks/http-hook.js";

export default function Signup() {
  const [passwordAreNotEqual, setPasswordAreNotEqual] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    if (data.password !== data["confirm-password"]) {
      setPasswordAreNotEqual(true);
      return;
    }

    setPasswordAreNotEqual(false);

    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/register",
        "POST",
        JSON.stringify({
          username: data.username,
          email: data.email,
          motDePasse: data.password,
          adresse: data.adresse,
          numTel: data.phone,
        }),
        { "Content-Type": "application/json" },
      );
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("userId", responseData.userId);
      auth.login({ id: responseData.userId, email: responseData.email });
      navigate("/accueil");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="page-wrapper">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>{t("inscription")}</h2>

        {error && (
          <p className="control-error" onClick={clearError}>
            {error}
          </p>
        )}

        <div className="form-grid">
          <div className="control">
            <label htmlFor="username">{t("nomUtilisateur")} :</label>
            <input type="text" id="username" name="username" required />
          </div>

          <div className="control">
            <label htmlFor="adresse">{t("adresse")} :</label>
            <input type="text" id="adresse" name="adresse" />
          </div>

          <div className="control">
            <label htmlFor="password">{t("motDePasse")} :</label>
            <input type="password" id="password" name="password" required />
          </div>

          <div className="control">
            <label htmlFor="confirm-password">
              {t("confirmerMotDePasse")} :
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
            />
            {passwordAreNotEqual && (
              <div className="control-error">
                <p>{t("motDePasseIdentique")}</p>
              </div>
            )}
          </div>

          <div className="control">
            <label htmlFor="phone">{t("numTel")} :</label>
            <input type="tel" id="phone" name="phone" />
          </div>

          <div className="control">
            <label htmlFor="email">{t("adresseCourriel")} :</label>
            <input type="email" id="email" name="email" required />
          </div>
        </div>

        <div className="btn-wrapper">
          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? t("creation") : t("creerCompte")}
          </button>
        </div>
      </form>
    </div>
  );
}
