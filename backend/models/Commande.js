import mongoose from "mongoose";

const commandeSchema = new mongoose.Schema({
  gateau: { type: String, required: true },
  date: { type: Date, default: Date.now },
  prix: { type: Number, required: true },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserPersonnel",
    required: true,
  },
});

export default mongoose.model("Commande", commandeSchema);
