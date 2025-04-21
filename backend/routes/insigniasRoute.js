import express from "express";
const router = express.Router();
import Insignia from "../models/insignias.js";

// Obtener todas las insignias
router.get("/", async (req, res) => {
    try {
        const insignias = await Insignia.find();
        res.status(200).send(insignias);
    } catch (error) {
        console.error("Error al obtener las insignias:", error);
        res.status(500).send({ message: "Error al obtener las insignias" });
    }
});

// Obtener una insignia por ID
router.get("/:id", async (req, res) => {
    try {
        const insignia = await Insignia.findById(req.params.id);
        if (!insignia) return res.status(404).send({ message: "Insignia no encontrada" });
        res.status(200).send(insignia);
    } catch (error) {
        console.error("Error al obtener la insignia:", error);
        res.status(500).send({ message: "Error al obtener la insignia" });
    }
});

export default router;