import { useContext } from "react";
import { AuthContext } from "../context/auth-context.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NavLinks = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
          {t("accueil")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/catalogue"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {t("catalogue")}
        </NavLink>
      </li>

      {auth.isLoggedIn ? (
        <>
          <li>
            <NavLink
              to="/personnaliser"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {t("personnaliser")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/panier"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {t("panier")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accueil"
              onClick={handleLogout}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {t("déconnexion")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profil"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {t("profil")}
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {t("connexion")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {t("inscription")}
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};
export default NavLinks;
