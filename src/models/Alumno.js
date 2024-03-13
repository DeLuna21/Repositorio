const mongoose = require('mongoose');

const alumnoSchema = new mongoose.Schema({
    // Definir la estructura del modelo de alumno aquí
    nombre: String,
    edad: Number,
    email: String
});

module.exports = mongoose.model('Alumno', alumnoSchema);
