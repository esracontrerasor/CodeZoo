import express from "express";
import mongoose from "mongoose";
import Insignia from "../models/insignias.js";
import Usuario from "../models/usuario.js"; 

const router = express.Router();


router.get("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const insignias = await Insignia.find({ username });
    res.status(200).json(insignias);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener las insignias" });
  }
});


router.post("/:username", async (req, res) => {
  const { username } = req.params;
  const { nombre, descripcion, fecha, imagenUrl } = req.body;

  
  try {
    const existente = await Insignia.findOne({ username, nombre });
    if (existente) return res.status(200).json({ mensaje: "Ya tenía la insignia." });

    
    const nueva = new Insignia({ username, nombre, descripcion, fecha, imagenUrl });
    await nueva.save();
    //console.log("🛬 Recibido POST:", req.body);

    
    await Usuario.findOneAndUpdate(
      { username },
      {
        $addToSet: {
          insignias: {
            nombre,
            descripcion,
            fecha,
            imagenUrl
          }
        }
      }
    );

    return res.status(201).json({ mensaje: "Insignia guardada y asignada al usuario." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
