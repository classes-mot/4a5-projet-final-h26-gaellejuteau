import { useContext } from "react";
import { AuthContext } from "../context/auth-context.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";

export default function LoginForm() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handlerInputChange = (identifier, value) => {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();

    const { email, password } = enteredValues;

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const foundUser = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (foundUser) {
      auth.login(foundUser);
      localStorage.setItem("isLoggedIn", "true");
      setError("");
      navigate("/");
    } else {
      setError("Identifiants invalides.");
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={authSubmitHandler}>
        <h2>Connexion</h2>

        {error && <p className="control-error">{error}</p>}

        <div className="control-row">
          <div className="control no-margin">
            <label htmlFor="email">Courriel :</label>
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
            <label htmlFor="password">Mot de passe :</label>
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
            <button className="button button-flat">S'inscrire</button>
          </Link>
          <button type="submit" className="button">
            Connexion
          </button>
        </p>
      </form>
    </div>
  );
}
