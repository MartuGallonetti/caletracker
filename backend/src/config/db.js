import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Verificación inicial de conexión
pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.error(
            "❌ Error al conectar a la base de datos PostgreSQL:",
            err.message,
        );
    } else {
        console.log(
            "✅ Conexión exitosa a PostgreSQL realizada en:",
            res.rows[0].now,
        );
    }
});

export default pool;
