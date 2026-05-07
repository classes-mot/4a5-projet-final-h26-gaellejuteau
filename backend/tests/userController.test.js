import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import userRoutes from "../routes/users-routes.js";

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);
app.use((error, req, res, next) => {
  res.status(error.code || 500).json({ message: error.message });
});

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

// ===== TESTS UNITAIRES =====

describe("POST /api/users/register", () => {
  it("devrait créer un utilisateur avec succès", async () => {
    const res = await request(app).post("/api/users/register").send({
      username: "testuser",
      email: "test@test.com",
      motDePasse: "password123",
      adresse: "123 rue test",
      numTel: "5141234567",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("userId");
  });

  it("devrait retourner une erreur si l'email est déjà utilisé", async () => {
    const res = await request(app).post("/api/users/register").send({
      username: "testuser2",
      email: "test@test.com",
      motDePasse: "password123",
    });
    expect(res.statusCode).toBe(422);
    expect(res.body.message).toBe("Cet email est déjà utilisé.");
  });

  it("devrait retourner une erreur avec un mauvais mot de passe", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "test@test.com",
      motDePasse: "mauvaismdp",
    });
    expect(res.statusCode).toBe(401);
  });
});

// ===== TESTS D'INTÉGRATION =====

describe("Flux inscription → connexion", () => {
  it("devrait pouvoir se connecter après inscription", async () => {
    await request(app).post("/api/users/register").send({
      username: "newuser",
      email: "new@test.com",
      motDePasse: "password123",
    });

    const res = await request(app).post("/api/users/login").send({
      email: "new@test.com",
      motDePasse: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

describe("GET /api/users/profile/:userId", () => {
  it("devrait retourner le profil avec un token valide", async () => {
    const register = await request(app).post("/api/users/register").send({
      username: "profiluser",
      email: "profil@test.com",
      motDePasse: "password123",
    });

    const { token, userId } = register.body;

    const res = await request(app)
      .get(`/api/users/profile/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("username", "profiluser");
  });
});
