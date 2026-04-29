import { useContext } from "react";
import { AuthContext } from "../context/auth-context.js";
import { NavLink, useNavigate } from "react-router-dom";

const NavLinks = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  return (
    <ul className="nav-links">
      <li>
        <NavLink
          to="/accueil"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Accueil
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/catalogue"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Catalogue
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/personaliser"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Personnaliser
        </NavLink>
      </li>

      {auth.isLoggedIn ? (
        <>
          <li>
            <NavLink
              to="/accueil"
              onClick={handleLogout}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Déconnexion
            </NavLink>
          </li>
          {auth.user && (
            <li className="welcome-message">Bienvenue, {auth.user.name}!</li>
          )}
        </>
      ) : (
        <>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Connexion
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Inscription
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Contact
        </NavLink>
      </li>
    </ul>
  );
};
export default NavLinks;
