import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Ruta: POST /api/auth/register
router.post("/register", registerUser);

// Ruta: POST /api/auth/login
router.post("/login", loginUser);

export default router;
