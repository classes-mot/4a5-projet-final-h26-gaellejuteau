import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  adresse: { type: String },
  numTel: { type: String },
});

export default mongoose.model("UserPersonnel", userSchema);
