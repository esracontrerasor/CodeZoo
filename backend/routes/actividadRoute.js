import express from "express";
const router = express.Router();
import Actividad from "../models/actividad.js";

// Crear nueva actividad
router.post('/', async (req, res) => {
    try {
        const nuevaActividad = new Actividad({
            ...req.body,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
    });
        await nuevaActividad.save();
        res.status(200).send({ message: "Actividad creada con exito" });
    } catch (error) {
        console.error('Error al crear la actividad:', error);
        res.status(500).send({ message: "Error al crear la actividad" });
    }
});

// Obtener todas las actividades
router.get('/', async (req, res) => {
    try {
        const actividades = await Actividad.find();
        res.status(200).send(actividades);
    } catch (error) {
        console.error('Error al obtener las actividades:', error);
        res.status(500).send({ message: "Error al obtener las actividades" });
    }
});

// Obtener una actividad por ID
router.get('/:id', async (req, res) => {
    try {
        const actividad = await Actividad.findById(req.params.id);
        if (!actividad) return res.status(404).send({ message: "Actividad no encontrada" });
        res.status(200).send(actividad);
    } catch (error) {
        console.error('Error al obtener la actividad:', error);
        res.status(500).send({ message: "Error al obtener la actividad" });
    }
});

// Actualizar una actividad por ID
router.put('/:id', async (req, res) => {
    try {
        const {titulo, descripcion, tipo} = req.body;
        const actividad = await Actividad.findById(req.params.id,{
            titulo,
            descripcion,
            tipo,
            fechaActualizacion: new Date()
        }, {new: true}
    );
    if (!actividad) return res.status(404).send({ message: "Actividad no encontrada" });
    res.status(200).send({ message: "Actividad actualizada con exito" });
    
    } catch (error) {
        console.error('Error al actualizar la actividad:', error);
        res.status(500).send({ message: "Error al actualizar la actividad" });
    }
});

// Eliminar una actividad por ID
router.delete('/:id', async (req, res) => {
    try {
        await Actividad.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: "Actividad eliminada con exito" });
    } catch (error) {
        console.error('Error al eliminar la actividad:', error);
        res.status(500).send({ message: "Error al eliminar la actividad" });
    }
});


export default router;