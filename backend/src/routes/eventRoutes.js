import express from "express";
import {
    createEvent,
    getEvents,
    deleteEvent,
    updateEventStatus,
} from "../controllers/eventController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);

// Rutas CRUD base
router.post("/", createEvent);
router.get("/", getEvents);
router.delete("/:id", deleteEvent);

// Ruta específica para la lógica de interacción de CaleTracker
router.patch("/:id/status", updateEventStatus);

export default router;
