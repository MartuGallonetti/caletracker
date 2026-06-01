import {
    createNewHabit,
    getUserHabits,
    logHabitDaily,
} from "../services/habitService.js";

export const createHabit = async (req, res) => {
    const { title } = req.body;
    const userId = req.user.id;

    try {
        const habito = await createNewHabit(userId, title);
        res.status(201).json({ mensaje: "Hábito creado exitosamente", habito });
    } catch (error) {
        console.error("Error al crear hábito:", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const getHabits = async (req, res) => {
    const userId = req.user.id;

    try {
        const habitos = await getUserHabits(userId);
        res.status(200).json(habitos);
    } catch (error) {
        console.error("Error al obtener hábitos:", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const logHabit = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    try {
        const log = await logHabitDaily(userId, id, status);
        res.status(200).json({ mensaje: "Estado registrado", log });
    } catch (error) {
        console.error("Error al registrar hábito:", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
