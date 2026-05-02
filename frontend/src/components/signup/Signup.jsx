import "./Signup.css";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context.jsx";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [passwordAreNotEqual, setPasswordAreNotEqual] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    if (data.password !== data["confirm-password"]) {
      setPasswordAreNotEqual(true);
      return;
    }

    setPasswordAreNotEqual(false);

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.email === data.email)) {
      alert("Un compte avec cet email existe déjà.");
      return;
    }

    const newUser = {
      username: data.username,
      email: data.email,
      password: data.password,
      adresse: data.adresse,
      phone: data.phone,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    auth.login(newUser);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/accueil");
    console.log("Utilisateur créé:", newUser);
    event.target.reset();
  }

  return (
    <div className="page-wrapper">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Inscription</h2>

        <div className="form-grid">
          <div className="control">
            <label htmlFor="username">Nom d'utilisateur :</label>
            <input type="text" id="username" name="username" required />
          </div>

          <div className="control">
            <label htmlFor="adresse">Adresse :</label>
            <input type="text" id="adresse" name="adresse" />
          </div>

          <div className="control">
            <label htmlFor="password">Mot de passe :</label>
            <input type="password" id="password" name="password" required />
          </div>

          <div className="control">
            <label htmlFor="confirm-password">
              Confirmer le mot de passe :
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
            />
            {passwordAreNotEqual && (
              <div className="control-error">
                <p>Le mot de passe doit être identique.</p>
              </div>
            )}
          </div>

          <div className="control">
            <label htmlFor="phone">Num tél :</label>
            <input type="tel" id="phone" name="phone" />
          </div>

          <div className="control">
            <label htmlFor="email">Adresse couriel :</label>
            <input type="email" id="email" name="email" required />
          </div>
        </div>

        <div className="btn-wrapper">
          <button type="submit" className="btn-submit">
            Créer un compte
          </button>
        </div>
      </form>
    </div>
  );
}
