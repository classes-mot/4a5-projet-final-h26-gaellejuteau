import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  currentUSer: null,
  login: () => {},
  logout: () => {},
});
