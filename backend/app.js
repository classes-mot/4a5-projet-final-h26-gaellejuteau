import express from "express";
import { connectDB } from "./util/bd.js";
import userRoutes from "./routes/userRoutes.js";
import gateauRoutes from "./routes/gateauRoutes.js";
import commandeRoutes from "./routes/commandeRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/gateaux", gateauRoutes);
app.use("/api/commandes", commandeRoutes);

connectDB();
app.listen(3000, () => console.log("Serveur démarré sur le port 3000"));
