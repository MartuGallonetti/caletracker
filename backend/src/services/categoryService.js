import pool from "../config/db.js";

// Obtener todos los mundos de un usuario
export const getUserCategories = async (userId) => {
    const result = await pool.query(
        "SELECT * FROM categories WHERE user_id = $1 ORDER BY id ASC",
        [userId],
    );
    return result.rows;
};

// Crear un nuevo mundo
export const createCategory = async (userId, name, color, keywords) => {
    const result = await pool.query(
        "INSERT INTO categories (user_id, name, color, keywords) VALUES ($1, $2, $3, $4) RETURNING *",
        [userId, name, color, keywords],
    );
    return result.rows[0];
};
