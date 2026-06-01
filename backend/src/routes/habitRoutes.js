import express from "express";
import {
    createHabit,
    getHabits,
    logHabit,
} from "../controllers/habitController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", createHabit);
router.get("/", getHabits);
router.post("/:id/log", logHabit);

export default router;
