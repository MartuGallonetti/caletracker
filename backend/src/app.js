import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/categories", categoryRoutes);

// Rutas principales de la API
app.use("/api", routes);

app.get("/", (req, res) => {
    res.status(200).json({
        mensaje: "API de CaleTracker funcionando correctamente",
    });
});

export default app;
