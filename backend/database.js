import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://organizationcodezoo:eljoya12345@codezoo-db.wkem8kc.mongodb.net/?retryWrites=true&w=majority&appName=codezoo-db');
        console.log('Conectado a la base de datos CodeZoo');
    } catch (error) {
        console.error('Error al conectar a la base de datos CodeZoo:', error);
    }
};

export default connectDB;