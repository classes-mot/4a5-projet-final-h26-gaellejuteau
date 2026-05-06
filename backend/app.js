import express from "express";
import { connectDB } from "./util/bd.js";
import userRoutes from "./routes/users-routes.js";
import gateauRoutes from "./routes/gateau-routes.js";
import commandeRoutes from "./routes/commande-routes.js";
import HttpError from "./util/http-error.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/gateaux", gateauRoutes);
app.use("/api/commandes", commandeRoutes);

// Route inexistante
app.use((req, res, next) => {
  next(new HttpError("Route non trouvée", 404));
});

// Gestion des erreurs
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "Erreur inconnue" });
});

connectDB();
app.listen(5000, () => console.log("Serveur démarré sur le port 3000"));

export default app;
