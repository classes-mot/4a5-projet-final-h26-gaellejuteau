import MainNavigation from "../navigation/MainNavigation";
import { Link } from "react-router-dom";
import "./ErreurPage.css";

const ErreurPage = () => {
  return (
    <>
      <MainNavigation />
      <div className="erreur-wrapper">
        <div className="erreur-card">
          <p className="erreur-code">404</p>
          <h1>Page introuvable</h1>
          <p>La page que vous recherchez n'est pas disponible.</p>
          <Link to="/" className="erreur-btn">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </>
  );
};
export default ErreurPage;
