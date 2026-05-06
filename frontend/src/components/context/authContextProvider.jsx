import { useState, useCallback } from "react";
import { AuthContext } from "./auth-context.jsx";

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState(
    localStorage.getItem("userId")
      ? { id: localStorage.getItem("userId") }
      : null,
  );

  const login = useCallback((userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem(
      "token",
      userData.token || localStorage.getItem("token"),
    );
    localStorage.setItem("userId", userData.id);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
