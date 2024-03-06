const { Router } = require('express');
const router = Router();
const alumnos = require('../sample.json');
const _ = require('underscore');

// Expresión regular para validar el formato de un correo electrónico
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.get('/', (req, res) => {
    res.json(alumnos)
});

router.get('/:id', (req, res) => {
    const alumnoId = parseInt(req.params.id);
    const alumno = alumnos.find(alumno => alumno.id === alumnoId);

    if (!alumno) {
        return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }

    res.json(alumno);
});

router.post('/', (req, res) => {
    const { Alumno, Grado, Grupo, Sexo, Email } = req.body;

    if (typeof Alumno === 'string' && typeof Grupo === 'string' && Number.isInteger(Number(Grado)) && typeof Sexo === 'string' && Email && emailRegex.test(Email)) {
        const id = alumnos.length + 1;
        const newAlum = { id, Alumno, Grado, Grupo, Sexo, Email };
        alumnos.push(newAlum);
        res.status(201).json({ send: "Enviado" });
    } else {
        res.status(400).json({ error: "Por favor, proporciona Alumno y Grupo como strings, Grado como un número entero, Sexo como string, y asegúrate de proporcionar todos los campos requeridos y un correo electrónico válido" });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let alumnoEncontrado = false;

    _.each(alumnos, (alumno, i) => {
        if (alumno.id == id) {
            alumnos.splice(i, 1);
            alumnoEncontrado = true;
        }
    });

    if (alumnoEncontrado) {
        res.status(200).json({ send: "Removed" });
    } else {
        res.status(404).json({ error: "Alumno no encontrado" });
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    let alumnoEncontrado = false;
    const { Alumno, Grado, Grupo, Sexo, Email } = req.body;

    if (typeof Alumno === 'string' && typeof Grupo === 'string' && Number.isInteger(Number(Grado)) && typeof Sexo === 'string' && Email && emailRegex.test(Email)) {
        _.each(alumnos, (alumno, i) => {
            if (alumno.id == id) {
                alumno.Alumno = Alumno;
                alumno.Grado = Grado;
                alumno.Grupo = Grupo;
                alumno.Sexo = Sexo;
                alumno.Email = Email;
                alumnoEncontrado = true;
            }
        });

        if (alumnoEncontrado) {
            res.status(200).json({ send: "Update" });
        } else {
            res.status(404).json({ error: "Error updating" });
        }
    } else {
        res.status(400).json({ error: "Por favor, proporciona Alumno y Grupo como strings, Grado como un número entero, Sexo como string, y asegúrate de proporcionar todos los campos requeridos y un correo electrónico válido" });
    }
});

module.exports = router;
