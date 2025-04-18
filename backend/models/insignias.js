import * as mongoose from 'mongoose';

const insigniasSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    imagenUrl: { type: String, required: true },
    criterios: { type: String, required: true },
});

export default mongoose.model('Insignias', insigniasSchema);