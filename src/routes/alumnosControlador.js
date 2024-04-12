const Alumno = require('../models/Alumno');
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const mongoose = require('mongoose');

// Función para obtener todos los alumnos
exports.getAlumnos = async (req, res) => {
    try {
        const alumnos = await Alumno.find();
        res.json(alumnos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 

//Función para consultar filtrando los ID de Alumnos
exports.getAlumnosId = async (req, res) => {
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
    }}; 

//Función para Agregar información de Alumnos
exports.postAlumnos = async (req, res) => {
    const datosAlumno = req.body[0]; // Obtener el primer (y único) elemento del arreglo
    const { Alumno, Grado, Grupo, Sexo, Email } = datosAlumno;
  
    if (
        typeof Alumno === 'string' &&
        typeof Grupo === 'string' &&
        Number.isInteger(Number(Grado)) &&
        typeof Sexo === 'string' &&
        Email &&
        (console.log(emailRegex.test(Email)), emailRegex.test(Email)) 
      ) {
      try {
        const nuevoAlumno = await Alumno.create(datosAlumno);
        res.status(201).json(nuevoAlumno);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(400).json({
        error:
          'Por favor, proporciona Alumno y Grupo como strings, Grado como un número entero, Sexo como string, y asegúrate de proporcionar todos los campos requeridos y un correo electrónico válido'
      });
    }
  };

//Funcion para borrar alumnos 
exports.deleteAlumnos = async (req, res) => {
    try {
        const alumnoEliminado = await Alumno.findByIdAndDelete(req.params.id);
        if (!alumnoEliminado) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }
        res.status(200).json({ mensaje: 'Alumno eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 

//Función para modificar o actualizar la información de los Alumnos
exports.putAlumnos = async (req, res) => {
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
            console.log(error.message)
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: "Por favor, proporciona Alumno y Grupo como strings, Grado como un número entero, Sexo como string, y asegúrate de proporcionar todos los campos requeridos y un correo electrónico válido" });
    }
};