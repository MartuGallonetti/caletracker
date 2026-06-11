import {
    createNewEvent,
    getUserEvents,
    removeEvent,
    modifyEventStatus,
} from "../services/eventService.js";

export const createEvent = async (req, res) => {
    const {
        title,
        description,
        start_time,
        end_time,
        priority,
        category_id,
        all_day,
    } = req.body;

    const userId = req.user.id;

    try {
        const evento = await createNewEvent(
            userId,
            title,
            description,
            start_time,
            end_time,
            priority,
            category_id,
            all_day,
        );

        res.status(201).json({
            mensaje: "Evento creado exitosamente",
            evento,
        });
    } catch (error) {
        console.error("Error al crear evento:", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const getEvents = async (req, res) => {
    const userId = req.user.id;

    try {
        const eventos = await getUserEvents(userId);
        res.status(200).json(eventos);
    } catch (error) {
        console.error("Error al obtener eventos:", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const deleteEvent = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const existe = await removeEvent(id, userId);
        if (!existe) {
            return res
                .status(404)
                .json({ error: "Evento no encontrado o no autorizado" });
        }
        res.status(200).json({ mensaje: "Evento eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar evento:", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const updateEventStatus = async (req, res) => {
    const { id } = req.params;
    const { status, reflection } = req.body;
    const userId = req.user.id;

    try {
        const eventoActualizado = await modifyEventStatus(
            id,
            status,
            reflection,
            userId,
        );
        if (!eventoActualizado) {
            return res
                .status(404)
                .json({ error: "Evento no encontrado o no autorizado" });
        }
        res.status(200).json({
            mensaje: "Estado actualizado",
            evento: eventoActualizado,
        });
    } catch (error) {
        console.error("Error al actualizar estado:", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
