import * as mongoose from 'mongoose';

const actividadSchema = new mongoose.Schema({
    titulo : { type: String, required: true },
    descripcion : { type: String, required: true },
    tipo: { type: String, required: true },
    fechaCreacion : { type: Date, required: true },
    fechaActualizacion : { type: Date, required: true },
});

export default mongoose.model('Actividad', actividadSchema);