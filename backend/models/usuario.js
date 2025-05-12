import * as mongoose from 'mongoose';


const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    insignias : [  {
      nombre: String,
      descripcion: String,
      fecha: String,
      imagenUrl: String
    }],
    progreso : {
        actividadesCompletadas: { type: Number, default: 0 },
        porcentaje : { type: Number, default: 0 },
    },
    rol: { type: String, required: true },
});

export default mongoose.model('Usuario', usuarioSchema);