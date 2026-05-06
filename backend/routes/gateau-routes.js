import express from "express";
import gateauController from "../controllers/gateauController.js";

const router = express.Router();

// GET /api/gateaux — lister tous les gâteaux du catalogue
router.get("/", gateauController.getGateaux);

// GET /api/gateaux/:gateauId — voir le détail d'un gâteau
router.get("/:gateauId", gateauController.getGateauById);

// POST /api/gateaux — créer un gâteau personnalisé
router.post("/", gateauController.createGateau);

export default router;
