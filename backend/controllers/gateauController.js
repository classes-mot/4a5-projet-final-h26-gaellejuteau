import Gateau from "../models/Gateau.js";
import HttpError from "../util/http-error.js";

// GET /api/gateaux — lister tous les gâteaux du catalogue
const getGateaux = async (req, res, next) => {
  let gateaux;
  try {
    gateaux = await Gateau.find();
  } catch (err) {
    return next(new HttpError("Erreur serveur.", 500));
  }

  res.json({ gateaux });
};

// GET /api/gateaux/:gateauId — voir le détail d'un gâteau
const getGateauById = async (req, res, next) => {
  const gateauId = req.params.gateauId;

  let gateau;
  try {
    gateau = await Gateau.findById(gateauId);
  } catch (err) {
    return next(new HttpError("Erreur serveur.", 500));
  }

  if (!gateau) {
    return next(new HttpError("Gâteau non trouvé.", 404));
  }

  res.json({ gateau });
};

// POST /api/gateaux — créer un gâteau personnalisé
const createGateau = async (req, res, next) => {
  const { nbPortion, gateau, saveur, cremage, inscription, client } = req.body;

  const newGateau = new Gateau({
    nbPortion,
    gateau,
    saveur,
    cremage,
    inscription,
    client,
  });

  try {
    await newGateau.save();
  } catch (err) {
    return next(new HttpError("Erreur lors de la création.", 500));
  }

  res.status(201).json({ gateau: newGateau });
};

export default { getGateaux, getGateauById, createGateau };
