import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database.js';
dotenv.config();
const app = express();

import actividadRoute from './routes/actividadRoute.js';
import usuarioRoute from './routes/usuarioRoute.js';
import insigniasRoute from './routes/insigniasRoute.js';
import foroRoute from './routes/foroRoute.js';

app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api/actividades',actividadRoute);
app.use('/api/usuarios', usuarioRoute);
app.use('/api/insignias', insigniasRoute);
app.use('/api/foro', foroRoute);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});