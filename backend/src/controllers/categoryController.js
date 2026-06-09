import * as categoryService from "../services/categoryService.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await categoryService.getUserCategories(req.user.id);
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las categorías" });
    }
};

export const addCategory = async (req, res) => {
    const { name, color, keywords } = req.body;
    if (!name || !color || !keywords) {
        return res
            .status(400)
            .json({ error: "Todos los campos son obligatorios" });
    }
    try {
        const newCategory = await categoryService.createCategory(
            req.user.id,
            name,
            color,
            keywords,
        );
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: "Error al crear la categoría" });
    }
};
