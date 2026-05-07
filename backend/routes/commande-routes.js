import express from "express";
import commandeController from "../controllers/commandeController.js";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.use(checkAuth); // toutes les routes commandes nécessitent un token

router.get("/:userId", commandeController.getCommandesByUser);
router.get("/commande/:commandeId", commandeController.getCommandeById);
router.post("/", commandeController.createCommande);
router.delete("/:commandeId", commandeController.deleteCommande);

export default router;
