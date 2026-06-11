import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res
            .status(401)
            .json({ error: "Acceso denegado. Se requiere un token." });
    }

    try {
        // 2. Limpiar el prefijo "Bearer " que suele enviarse por estándar
        const tokenLimpio = token.startsWith("Bearer ")
            ? token.slice(7, token.length)
            : token;

        // 3. Verificar el token con nuestra palabra secreta
        const verificado = jwt.verify(tokenLimpio, process.env.JWT_SECRET);

        // 4. Guardar los datos del usuario dentro de la petición para usarlos después
        req.user = verificado;

        // 5. Dar paso a la siguiente función (el controlador)
        next();
    } catch (error) {
        res.status(400).json({ error: "Token no válido o expirado." });
    }
};
