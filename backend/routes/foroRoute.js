import express from "express";
const router = express.Router();
import Foro from "../models/foro.js";

// Crear una nueva publicación
router.post('/', async (req, res) => {
    try {
        const nuevaPublicacion = new Foro(req.body);
        await nuevaPublicacion.save();
        res.status(200).send({ message: "Publicación creada con exito" });
    } catch (error) {
        console.error('Error al crear la publicación:', error);
        res.status(500).send({ message: "Error al crear la publicación" });
    }
});

// Obtener todas las publicaciones
router.get('/', async (req, res) => {
    try {
        const publicaciones = await Foro.find();
        res.status(200).send(publicaciones);
    } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
        res.status(500).send({ message: "Error al obtener las publicaciones" });
    }
});

// Agregar comentario a una publicacion
router.put('/:id', async (req, res) => {
    try {
        const publicacion = await Foro.findById(req.params.id);
        if (!publicacion) return res.status(404).send({ message: "Publicación no encontrada" });

        publicacion.comentarios.push(req.body);
        await publicacion.save();
        res.status(200).send({ message: "Comentario agregado con exito" });
    } catch (error) {
        console.error('Error al agregar el comentario:', error);
        res.status(500).send({ message: "Error al agregar el comentario" });
    }
});

// Rechazar publicación
router.delete('/:id', async (req, res) => {
    try {
        await Foro.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: "Publicación eliminada con exito" });
    } catch (error) {
        console.error('Error al eliminar la publicación:', error);
        res.status(500).send({ message: "Error al eliminar la publicación" });
    }
});

export default router;