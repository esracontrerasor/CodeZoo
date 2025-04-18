import * as mongoose from 'mongoose';

const foroSchema = new mongoose.Schema({
    titulo : { type: String, required: true },
    contenido : { type: String, required: true },
    autor : { type: String, required: true },
    fecha : { type: Date, required: true },
    estado : { type: String, required: true },
    comentarios : [{
        autor : { type: String, required: true },
        contenido : { type: String, required: true },
        fecha : { type: Date, required: true },
    }]
});

export default mongoose.model('Foro', foroSchema);