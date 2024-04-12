const { Router } = require('express');
const router = Router();
const Alumno = require('../models/Alumno'); // Importa el modelo de alumno definido en tu aplicación
const _ = require('underscore');
const mongoose = require('mongoose');
const alumnosControlador = require('../routes/alumnosControlador');

// Expresión regular para validar el formato de un correo electrónico
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//Ruta para obtener todos los alumnos
router.get('/', alumnosControlador.getAlumnos);

//Ruta para consultar Alumnos por filtro de ID
router.get('/:id', alumnosControlador.getAlumnosId);

//Ruta para Agregar Alumnos
router.post('/', alumnosControlador.postAlumnos);

//Ruta para eliminar Alumnos
router.delete('/:id', alumnosControlador.deleteAlumnos);

//Ruta para Modificar o Actualizar información de Alumnos
router.put('/:id', alumnosControlador.putAlumnos);

module.exports = router,emailRegex,mongoose;
