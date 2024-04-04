const { Router } = require('express');
const router = Router();
const Alumno = require('../models/Alumno'); // Importa el modelo de alumno definido en tu aplicación
const _ = require('underscore');
const mongoose = require('mongoose');


// Expresión regular para validar el formato de un correo electrónico
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.get('/', async (req, res) => {
    try {
        const alumnos = await Alumno.find();
        res.json(alumnos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        // Validar si el ID proporcionado es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ mensaje: 'ID de alumno no válido' });
        }

        // Buscar el alumno por su ID
        const alumno = await Alumno.findById(req.params.id);

        // Verificar si el alumno no se encuentra en la base de datos
        if (!alumno) {
            return res.status(404).json({ mensaje: 'Alumno no encontrado' });
        }

        // Si se encuentra el alumno, devolverlo en formato JSON
        res.json(alumno);
    } catch (error) {
        // Manejar errores internos del servidor
        res.status(500).json({ error: error.message });
    }
});


router.post('/', async (req, res) => {
    const { Alumno, Grado, Grupo, Sexo, Email } = req.body;

    if (typeof Alumno === 'string' && typeof Grupo === 'string' && Number.isInteger(Number(Grado)) && typeof Sexo === 'string' && Email && emailRegex.test(Email)) {
        try {
            const nuevoAlumno = await Alumno.create(req.body);
            res.status(201).json(nuevoAlumno);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: "Por favor, proporciona Alumno y Grupo como strings, Grado como un número entero, Sexo como string, y asegúrate de proporcionar todos los campos requeridos y un correo electrónico válido" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const alumnoEliminado = await Alumno.findByIdAndDelete(req.params.id);
        if (!alumnoEliminado) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }
        res.status(200).json({ mensaje: 'Alumno eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { Alumno, Grado, Grupo, Sexo, Email } = req.body;

    if (typeof Alumno === 'string' && typeof Grupo === 'string' && Number.isInteger(Number(Grado)) && typeof Sexo === 'string' && Email && emailRegex.test(Email)) {
        try {
            const alumnoActualizado = await Alumno.findByIdAndUpdate(id, req.body, { new: true });
            if (!alumnoActualizado) {
                return res.status(404).json({ error: 'Alumno no encontrado' });
            }
            res.status(200).json(alumnoActualizado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: "Por favor, proporciona Alumno y Grupo como strings, Grado como un número entero, Sexo como string, y asegúrate de proporcionar todos los campos requeridos y un correo electrónico válido" });
    }
});

module.exports = router;
