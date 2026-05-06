import Commande from "../models/Commande.js";
import HttpError from "../util/http-error.js";

// GET /api/commandes/:userId — lister les commandes d'un utilisateur
const getCommandesByUser = async (req, res, next) => {
  const userId = req.params.userId;

  let commandes;
  try {
    commandes = await Commande.find({ client: userId });
  } catch (err) {
    return next(new HttpError("Erreur serveur.", 500));
  }

  res.json({ commandes });
};

// GET /api/commandes/commande/:commandeId — voir une commande
const getCommandeById = async (req, res, next) => {
  const commandeId = req.params.commandeId;

  let commande;
  try {
    commande = await Commande.findById(commandeId);
  } catch (err) {
    return next(new HttpError("Erreur serveur.", 500));
  }

  if (!commande) {
    return next(new HttpError("Commande non trouvée.", 404));
  }

  res.json({ commande });
};

// POST /api/commandes — créer une commande
const createCommande = async (req, res, next) => {
  const { gateau, prix, client } = req.body;

  const newCommande = new Commande({ gateau, prix, client });

  try {
    await newCommande.save();
  } catch (err) {
    return next(new HttpError("Erreur lors de la création.", 500));
  }

  res.status(201).json({ commande: newCommande });
};

// DELETE /api/commandes/:commandeId — supprimer une commande
const deleteCommande = async (req, res, next) => {
  const commandeId = req.params.commandeId;

  let commande;
  try {
    commande = await Commande.findByIdAndDelete(commandeId);
  } catch (err) {
    return next(new HttpError("Erreur serveur.", 500));
  }

  if (!commande) {
    return next(new HttpError("Commande non trouvée.", 404));
  }

  res.json({ message: "Commande supprimée." });
};

export default {
  getCommandesByUser,
  getCommandeById,
  createCommande,
  deleteCommande,
};
