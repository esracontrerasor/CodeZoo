import express from "express";
const router = express.Router();
import Foro from "../models/foro.js";
import jwt from 'jsonwebtoken';

const generarToken = (foro) => {
    const token = {
        titulo: foro.titulo,
        contenido: foro.contenido,
        autor: foro.autor,
        fecha: foro.fecha,
        estado: foro.estado,
        comentarios: foro.comentarios,
    };

    return jwt.sign(token, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Crear una nueva publicación
router.post('/pregunta', async (req, res) => {
    try {
        const { titulo, contenido, autor, fecha, estado, comentarios } = req.body;
        const nuevaPublicacion = new Foro({
            titulo,
            contenido,
            autor,
            fecha,
            estado,
            comentarios
        });
        await nuevaPublicacion.save();
        const token = generarToken(nuevaPublicacion);
        res.status(200).send({ message: "Publicación creada con exito", token });
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

// Obtener publicaciones del username
router.post('/autor', async (req, res) => {
    try {
        const { autor } = req.body;
        const publicaciones = await Foro.find({ autor });
        res.status(200).send(publicaciones);
    } catch (error) {
        console.error('Error al obtener las publicaciones por autor:', error);
        res.status(500).send({ message: "Error al obtener las publicaciones" });
    }
});

// Agregar comentario a una publicación
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

// Actualizar el estado de una publicación
router.patch('/:id', async (req, res) => {
    try {
        const { estado } = req.body;

        if (!estado) {
            return res.status(400).json({ message: "El campo 'estado' es obligatorio" });
        }

        const foroActualizado = await Foro.findByIdAndUpdate(
            req.params.id,
            { estado },
            { new: true }
        );

        if (!foroActualizado) {
            return res.status(404).json({ message: "No se encontró la publicación con ese ID" });
        }

        res.status(200).json({ message: "Estado actualizado correctamente", datos: foroActualizado });
    } catch (error) {
        console.error('Error al actualizar el estado:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Eliminar un comentario específico por ID
router.delete('/:id/comentarios/:comentarioId', async (req, res) => {
    const { id, comentarioId } = req.params;

    try {
        const foro = await Foro.findById(id);
        if (!foro) {
            return res.status(404).json({ error: "Foro no encontrado" });
        }

        const comentarioIndex = foro.comentarios.findIndex(c => c._id.toString() === comentarioId);
        if (comentarioIndex === -1) {
            return res.status(404).json({ error: "Comentario no encontrado" });
        }

        foro.comentarios.splice(comentarioIndex, 1);
        await foro.save();

        res.status(200).json({ message: "Comentario eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar comentario:", error);
        res.status(500).json({ error: "Hubo un error al eliminar el comentario" });
    }
});

export default router;
