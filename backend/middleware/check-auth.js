import jwt from "jsonwebtoken";
import HttpError from "../util/http-error.js";

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw new Error();
    const decoded = jwt.verify(token, "cleSuperSecrete!");
    req.userData = { userId: decoded.userId };
    next();
  } catch (err) {
    return next(new HttpError("Authentification échouée.", 401));
  }
};

export default checkAuth;
