const mongoose = require('mongoose');
const Alumno = require('../models/Alumno');

const alumnoSchema = new mongoose.Schema({
        Alumno: { type: String, required: true },
        Grado: { type: Number, required: true },
        Grupo: { type: String, required: true },
        Sexo: { type: String, required: true },
        Email: { type: String, required: true, unique: true }
      });

module.exports = mongoose.model('Alumno', alumnoSchema);
