import * as mongoose from 'mongoose';


const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    insignias : [{ 
        insigniaID: { type: String, required: true },
        fechaObtenido: { type: Date, required: true },
    }],
    progreso : [{
        actividadesCompletadas: { type: Number, required: true },
        porcentaje : { type: Number, required: true },
    }],
    rol: { type: String, required: true },
});

export default mongoose.model('Usuario', usuarioSchema);