import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;
  let uri =
    "mongodb+srv://gaelle_user:ProjetFinaleMdp@cluster0test.hz379kf.mongodb.net/bdProjetSynthese?appName=Cluster0test";
  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("Connexion MongoDB réussie");
  } catch (err) {
    console.error("Erreur de connexion MongoDB :", err.message);
    process.exit(1);
  }
};
