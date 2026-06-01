import pool from "../config/db.js";

export const createNewEvent = async (
    userId,
    title,
    description,
    start_time,
    end_time,
) => {
    const result = await pool.query(
        "INSERT INTO events (user_id, title, description, start_time, end_time) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [userId, title, description, start_time, end_time],
    );
    return result.rows[0];
};

export const getUserEvents = async (userId) => {
    const result = await pool.query(
        "SELECT * FROM events WHERE user_id = $1 ORDER BY start_time ASC",
        [userId],
    );
    return result.rows;
};

export const removeEvent = async (id, userId) => {
    const result = await pool.query(
        "DELETE FROM events WHERE id = $1 AND user_id = $2 RETURNING *",
        [id, userId],
    );
    return result.rows.length > 0;
};

export const modifyEventStatus = async (id, status, reflection, userId) => {
    let query = "";
    let values = [];

    if (status === "pospuesto") {
        query = `
      UPDATE events 
      SET status = $1, 
          reflection = COALESCE($2, reflection),
          start_time = start_time + INTERVAL '1 day', 
          end_time = end_time + INTERVAL '1 day' 
      WHERE id = $3 AND user_id = $4 
      RETURNING *`;
        values = [status, reflection || null, id, userId];
    } else {
        query =
            "UPDATE events SET status = $1, reflection = COALESCE($2, reflection) WHERE id = $3 AND user_id = $4 RETURNING *";
        values = [status, reflection || null, id, userId];
    }

    const result = await pool.query(query, values);
    return result.rows[0] || null;
};
