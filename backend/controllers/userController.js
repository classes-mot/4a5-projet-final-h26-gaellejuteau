import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import UserPersonnel from "../models/UserPersonnel.js";
import HttpError from "../util/http-error.js";

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await UserPersonnel.find({}, "-motDePasse");
  } catch (err) {
    return next(new HttpError("Erreur serveur.", 500));
  }
  res.json({ users });
};

const getUserById = async (req, res, next) => {
  const userId = req.params.userId;
  let user;
  try {
    user = await UserPersonnel.findById(userId, "-motDePasse");
  } catch (err) {
    return next(new HttpError("Erreur serveur.", 500));
  }
  if (!user) {
    return next(new HttpError("Utilisateur non trouvé.", 404));
  }
  res.json({ user });
};

const register = async (req, res, next) => {
  const { username, email, motDePasse, adresse, numTel } = req.body;

  let existingUser;
  try {
    existingUser = await UserPersonnel.findOne({ email });
  } catch (err) {
    return next(new HttpError("Erreur serveur.", 500));
  }

  if (existingUser) {
    return next(new HttpError("Cet email est déjà utilisé.", 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcryptjs.hash(motDePasse, 12);
  } catch (err) {
    return next(new HttpError("Erreur lors du chiffrement.", 500));
  }

  const newUser = new UserPersonnel({
    username,
    email,
    motDePasse: hashedPassword,
    adresse,
    numTel,
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new HttpError("Erreur lors de la création.", 500));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      "cleSuperSecrete!",
      { expiresIn: "1h" },
    );
  } catch (err) {
    return next(new HttpError("Erreur lors de la création du token.", 500));
  }

  res.status(201).json({ userId: newUser.id, email: newUser.email, token });
};

const login = async (req, res, next) => {
  const { email, motDePasse } = req.body;

  let existingUser;
  try {
    existingUser = await UserPersonnel.findOne({ email });
  } catch (err) {
    return next(new HttpError("Erreur serveur.", 500));
  }

  if (!existingUser) {
    return next(
      new HttpError("Identification échouée, vérifiez vos identifiants.", 401),
    );
  }

  let isValidPassword;
  try {
    isValidPassword = await bcryptjs.compare(
      motDePasse,
      existingUser.motDePasse,
    );
  } catch (err) {
    return next(new HttpError("Erreur serveur.", 500));
  }

  if (!isValidPassword) {
    return next(
      new HttpError("Identification échouée, vérifiez vos identifiants.", 401),
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "cleSuperSecrete!",
      { expiresIn: "1h" },
    );
  } catch (err) {
    return next(new HttpError("Erreur lors de la création du token.", 500));
  }

  res.json({ userId: existingUser.id, email: existingUser.email, token });
};

const updateUserById = async (req, res, next) => {
  const userId = req.params.userId;
  const { username, adresse, numTel } = req.body;

  let user;
  try {
    user = await UserPersonnel.findByIdAndUpdate(
      userId,
      { username, adresse, numTel },
      { new: true },
    );
  } catch (err) {
    return next(new HttpError("Erreur serveur.", 500));
  }

  if (!user) {
    return next(new HttpError("Utilisateur non trouvé.", 404));
  }

  res.status(200).json({ user });
};

export default { getUsers, getUserById, register, login, updateUserById };
