import { useContext, useState } from "react";
import { AuthContext } from "../context/auth-context.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useHttpClient } from "../hooks/http-hook.js";
import "./LoginForm.css";

export default function LoginForm() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  const handlerInputChange = (identifier, value) => {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/users/login`,
        "POST",
        JSON.stringify({
          email: enteredValues.email,
          motDePasse: enteredValues.password,
        }),
        {
          "Content-Type": "application/json",
        },
      );
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("userId", responseData.userId);
      auth.login({ id: responseData.userId, email: responseData.email });
      navigate("/accueil");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={authSubmitHandler}>
        <h2>{t("connexion")}</h2>

        {error && (
          <p className="control-error" onClick={clearError}>
            {error}
          </p>
        )}

        <div className="control-row">
          <div className="control no-margin">
            <label htmlFor="email">{t("courriel")} :</label>
            <input
              id="email"
              type="email"
              name="email"
              value={enteredValues.email}
              onChange={(e) => handlerInputChange("email", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="control-row">
          <div className="control no-margin">
            <label htmlFor="password">{t("motDePasse")} :</label>
            <input
              id="password"
              type="password"
              name="password"
              value={enteredValues.password}
              onChange={(e) => handlerInputChange("password", e.target.value)}
              required
            />
          </div>
        </div>

        <p className="form-actions">
          <Link to="/signup">
            <button className="button button-flat">{t("sinscrire")}</button>
          </Link>
          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? t("connexionEnCours") : t("connexionBtn")}
          </button>
        </p>
      </form>
    </div>
  );
}
