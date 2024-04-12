const mongoose = require('mongoose');

const alumnoSchema = new mongoose.Schema({
    // Definir la estructura del modelo de alumno aquí
    Alumno: String,
    Grado: Number,
    Grupo: String,
    Sexo: String,
    Email: String
});

module.exports = mongoose.model('Alumno', alumnoSchema);
