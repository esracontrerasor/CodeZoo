import * as mongoose from 'mongoose';

const comentarioSchema = new mongoose.Schema({
    autor: { type: String, required: true },
    contenido: { type: String, required: true },
    fecha: { type: Date, required: true },
}, { _id: true }); // Esto permite que cada comentario tenga su propio _id

const foroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
    autor: { type: String, required: true },
    fecha: { type: Date, required: true },
    estado: { type: String, required: true },
    comentarios: [comentarioSchema] // Usa el subesquema
});

export default mongoose.model('Foro', foroSchema);
