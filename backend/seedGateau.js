import mongoose from "mongoose";
import { connectDB } from "./util/bd.js";
import Gateau from "./models/Gateau.js";

const gateaux = [
  {
    nom: "Lait frappé à la fraise",
    gateau: "Vanille",
    cremage: "Lait frappé à la fraise",
    saveur: "Fraise",
  },
  {
    nom: "Citronnier",
    gateau: "Vanille",
    cremage: "Lait frappé au citron",
    saveur: "Citron",
  },
  {
    nom: "Choco intense",
    gateau: "Chocolat",
    cremage: "Chocolat",
    saveur: "Chocolat",
  },
  {
    nom: "Dulce de leche",
    gateau: "Vanille",
    cremage: "Caramel salée",
    saveur: "Dulce de leche",
  },
  {
    nom: "Truffé à la noisette",
    gateau: "Vanille",
    cremage: "Truffe à la noisette",
    saveur: "Noisette",
  },
  {
    nom: "Forêt noire",
    gateau: "Chocolat",
    cremage: "Vanille",
    saveur: "Cerise",
  },
  { nom: "Oréo", gateau: "Chocolat", cremage: "Crème oréo", saveur: "Oréo" },
  {
    nom: "Boston au chocolat",
    gateau: "Chocolat",
    cremage: "Chocolat",
    saveur: "Crème pâtissière",
  },
  {
    nom: "Boston à la vanille",
    gateau: "Vanille",
    cremage: "Vanille",
    saveur: "Crème pâtissière",
  },
  {
    nom: "Bonbonière",
    gateau: "Vanille",
    cremage: "Vanille",
    saveur: "Bonbon",
  },
  {
    nom: "Coloré",
    gateau: "Vanille et Chocolat",
    cremage: "Vanille",
    saveur: "Coloré",
  },
  {
    nom: "Cappuccino",
    gateau: "Vanille",
    cremage: "Vanille",
    saveur: "Sirop de café",
  },
  {
    nom: "Framboisier",
    gateau: "Chocolat",
    cremage: "Chocolat",
    saveur: "Framboise",
  },
];

const seed = async () => {
  await connectDB();
  await Gateau.deleteMany();
  await Gateau.insertMany(gateaux);
  console.log("Gâteaux insérés !");
  mongoose.connection.close();
};

seed();
