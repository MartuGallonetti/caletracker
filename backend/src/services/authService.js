import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

export const register = async (email, password) => {
    const userExists = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email],
    );
    if (userExists.rows.length > 0) {
        throw new Error("El correo ya está registrado");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
        "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at",
        [email, passwordHash],
    );

    return newUser.rows[0];
};

export const login = async (email, password) => {
    const userResult = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email],
    );
    if (userResult.rows.length === 0) {
        throw new Error("Usuario o contraseña incorrectos");
    }

    const user = userResult.rows[0];

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
        throw new Error("Usuario o contraseña incorrectos");
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
    );

    return { token, user: { id: user.id, email: user.email } };
};
