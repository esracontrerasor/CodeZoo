import mongoose from "mongoose";

const InsigniaSchema = new mongoose.Schema({
  username: { type: String, required: true },
  nombre: { type: String, required: true },
  descripcion: String,
  fecha: String,
  imagenUrl: String
});

const Insignia = mongoose.model("Insignia", InsigniaSchema);
export default Insignia;