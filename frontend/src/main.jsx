import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import App from "./components/App.jsx";
import "./components/i18.js";
import AuthContextProvider from "./components/context/authContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>,
);
