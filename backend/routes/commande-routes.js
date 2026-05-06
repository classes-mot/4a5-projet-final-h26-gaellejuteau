import express from "express";
import commandeController from "../controllers/commandeController.js";

const router = express.Router();

// GET /api/commandes/:userId — lister les commandes d'un utilisateur
router.get("/:userId", commandeController.getCommandesByUser);

// GET /api/commandes/commande/:commandeId — voir une commande
router.get("/commande/:commandeId", commandeController.getCommandeById);

// POST /api/commandes — créer une commande
router.post("/", commandeController.createCommande);

// DELETE /api/commandes/:commandeId — supprimer une commande
router.delete("/:commandeId", commandeController.deleteCommande);

export default router;
