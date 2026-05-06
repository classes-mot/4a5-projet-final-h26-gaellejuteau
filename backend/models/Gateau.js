import mongoose from "mongoose";

const gateauSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  nbPortion: { type: Number },
  gateau: { type: String, required: true },
  saveur: { type: String, required: true },
  cremage: { type: String, required: true },
  inscription: { type: String },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "UserPersonnel" },
});

export default mongoose.model("Gateau", gateauSchema);
