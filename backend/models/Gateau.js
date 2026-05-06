import mongoose from "mongoose";

const gateauSchema = new mongoose.Schema({
  nbPortion: { type: Number, required: true },
  gateau: { type: String, required: true },
  saveur: { type: String, required: true },
  cremage: { type: String, required: true },
  inscription: { type: String },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "UserPersonnel" },
});

export default mongoose.model("Gateau", gateauSchema);
