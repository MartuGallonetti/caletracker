import pool from "../config/db.js";

export const createNewHabit = async (userId, title) => {
    const result = await pool.query(
        "INSERT INTO habits (user_id, title) VALUES ($1, $2) RETURNING *",
        [userId, title],
    );
    return result.rows[0];
};

export const getUserHabits = async (userId) => {
    const result = await pool.query(
        "SELECT * FROM habits WHERE user_id = $1 ORDER BY created_at ASC",
        [userId],
    );
    return result.rows;
};

export const logHabitDaily = async (userId, habitId, status) => {
    // 1. Guardar o actualizar el registro diario (si el usuario cambia de opinión en el mismo día)
    const logResult = await pool.query(
        `INSERT INTO habit_logs (habit_id, log_date, status) 
        VALUES ($1, CURRENT_DATE, $2)
        ON CONFLICT (habit_id, log_date) 
        DO UPDATE SET status = EXCLUDED.status 
         RETURNING *`,
        [habitId, status],
    );

    // 2. Si el hábito se marca como "completado", sumamos a la racha
    if (status === "completado") {
        await pool.query(
            `UPDATE habits 
            SET current_streak = current_streak + 1,
                longest_streak = GREATEST(longest_streak, current_streak + 1)
            WHERE id = $1 AND user_id = $2`,
            [habitId, userId],
        );
    }
    // 3. Si se marca como "no_cumplido", la racha vuelve a cero
    else if (status === "no_cumplido") {
        await pool.query(
            `UPDATE habits 
            SET current_streak = 0 
            WHERE id = $1 AND user_id = $2`,
            [habitId, userId],
        );
    }
    // Si es "pospuesto", la racha se mantiene intacta (no hacemos UPDATE a la tabla habits)

    return logResult.rows[0];
};

// Borrar un hábito de la base de datos
export const deleteUserHabit = async (userId, habitId) => {
    const result = await pool.query(
        "DELETE FROM habits WHERE id = $1 AND user_id = $2 RETURNING *",
        [habitId, userId],
    );
    return result.rows[0];
};
