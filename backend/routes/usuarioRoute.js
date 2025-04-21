import express from "express";
const router = express.Router();
import Usuario from "../models/usuario.js";

// Inicio de sesión
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const usuario = await Usuario.findOne({ username, password });
        if (!usuario) return res.status(404).send({ message: "Usuario no encontrado" });
        if (usuario.password !== password) return res.status(401).send({ message: "Contraseña incorrecta" });
        res.status(200).send({ message: "Inicio de sesión exitoso" });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).send({ message: "Error al iniciar sesión" });
    }
});



// Crear nuevo usuario (registro)
router.post("/registro", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ username });
        if (usuarioExistente) return res.status(400).send({ message: "El usuario ya existe" });

        const nuevoUsuario = new Usuario({ username, email, password });
        await nuevoUsuario.save();
        res.status(200).send({ message: "Usuario creado con éxito" });
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).send({ message: "Error al crear el usuario" });
    }
});

// Obtener todos los usuarios
router.get("/", async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).send(usuarios);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).send({ message: "Error al obtener los usuarios" });
    }
});

// Obtener un usuario por ID
router.get("/:id", async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) return res.status(404).send({ message: "Usuario no encontrado" });
        res.status(200).send(usuario);
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).send({ message: "Error al obtener el usuario" });
    }
});

// Asignar insignia a un usuario
router.post('/:id/insignias', async (req, res) => {
    try {
        const {insigniaID, fechaObtenido} = req.body;
        const usuario = await Usuario.findById(req.params.id);
        usuario.insignias.push({ insigniaID, fechaObtenido });
        await usuario.save();
        res.status(200).send({ message: "Insignia asignada con éxito" });
    } catch (error) {
        console.error('Error al asignar la insignia:', error);
        res.status(500).send({ message: "Error al asignar la insignia" });
    }
});

// Actualizar progreso de un usuario
router.post('/:id/progreso', async (req, res) => {
    try {
        const {actividadesCompletadas, porcentaje} = req.body;
        const usuario = await Usuario.findById(req.params.id);
        usuario.progreso.push({ actividadesCompletadas, porcentaje });
        await usuario.save();
        res.status(200).send({ message: "Progreso actualizado con éxito" });
    } catch (error) {
        console.error('Error al actualizar el progreso:', error);
        res.status(500).send({ message: "Error al actualizar el progreso" });
    }
});

// Editar datos del usuario
router.put('/:id', async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const usuario = await Usuario.findById(req.params.id, 
            {username, email, password}, 
            {new: true});
        if (!usuario) return res.status(404).send({ message: "Usuario no encontrado" });

        res.status(200).send({ message: "Usuario actualizado con éxito" });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).send({ message: "Error al actualizar el usuario" });
    }
});

export default router;