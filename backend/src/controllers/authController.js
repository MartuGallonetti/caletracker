import { register, login } from "../services/authService.js";

export const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await register(email, password);
        res.status(201).json({
            mensaje: "Usuario creado exitosamente",
            usuario,
        });
    } catch (error) {
        if (error.message === "El correo ya está registrado") {
            return res.status(400).json({ error: error.message });
        }
        console.error("Error en el registro:", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const datosLogin = await login(email, password);
        res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            token: datosLogin.token,
            usuario: datosLogin.user,
        });
    } catch (error) {
        if (error.message === "Usuario o contraseña incorrectos") {
            return res.status(400).json({ error: error.message });
        }
        console.error("Error en el login:", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
