import { useContext } from "react";
import { AuthContext } from "../context/auth-context.jsx";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const auth = useContext(AuthContext);

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}
