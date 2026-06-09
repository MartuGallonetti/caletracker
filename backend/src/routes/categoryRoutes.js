import { Router } from "express"; // Corregido: express en lugar de react
import {
    getCategories,
    addCategory,
} from "../controllers/categoryController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verifyToken, getCategories);
router.post("/", verifyToken, addCategory);

export default router;
