import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

// GET /api/users — lister les utilisateurs
router.get("/", userController.getUsers);

// GET /api/users/profile/:userId — voir les infos d'un user
router.get("/profile/:userId", userController.getUserById);

// POST /api/users/register — inscription
router.post("/register", userController.register);

// POST /api/users/login — connexion
router.post("/login", userController.login);

// PUT /api/users/profile/:userId — modifier les infos du user
router.put("/profile/:userId", userController.updateUserById);

router.delete("/profile/:userId", userController.deleteUser);

export default router;
