const { getAlumnos, getAlumnosId, postAlumnos, deleteAlumnos, putAlumnos } = require('../routes/alumnosControlador');
const Alumno = require('../models/Alumno');

// Mock de mongoose y emailRegex
const mongoose = require('mongoose');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mock de la función Alumno.find para simular su comportamiento
jest.mock('../models/Alumno.js', () => ({
    find: jest.fn()
}));

// Mock de Alumno.create
Alumno.create = jest.fn();

// Mockear findById, findByIdAndDelete y findByIdAndUpdate de mongoose
mongoose.Types.ObjectId.isValid = jest.fn();
Alumno.findById = jest.fn();
Alumno.findByIdAndDelete = jest.fn();
Alumno.findByIdAndUpdate = jest.fn();

//Prueba Unitaria de Consulta Alumnos
describe('getAlumnos', () => {
    it('debería devolver una lista de alumnos', async () => {
        const alumnosMock = [{ nombre: '', Sexo: 'F' }, { nombre: '', Sexo: 'F', error: '' }];
        Alumno.find.mockResolvedValueOnce(alumnosMock);

        const req = {};
        const res = {
            json: jest.fn()
        };

        await getAlumnos(req, res);

        expect(res.json).toHaveBeenCalledWith(alumnosMock);
    });
});

//Prueba Unitaria de Consulta Alumnos con filtro de ID
describe('getAlumnosId', () => {
    it('debería devolver un alumno cuando se proporciona un ID válido', async () => {
        const alumnoMock = [{ id: '',nombre: '', Sexo: 'F' }, { nombre: '', Sexo: 'F', error: '' }];
        mongoose.Types.ObjectId.isValid.mockReturnValue(true);
        Alumno.findById.mockResolvedValue(alumnoMock);

        const req = { params: { id: '65fe4dc75ca8d721b75c7584' } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await getAlumnosId(req, res);

        expect(res.json).toHaveBeenCalledWith(alumnoMock);
    });
});

//Prueba Unitaria de Creación de Alumnos
/*describe('postAlumnos', () => {
    it('debería crear un nuevo alumno y devolverlo con el código de estado 201 si se proporcionan datos válidos', async () => {
        const nuevoAlumno = { id: '1', nombre: 'Nuevo Alumno', Grado: 10, Grupo: 'A', Sexo: 'F', Email: 'correo@example.com' };
        Alumno.create.mockResolvedValue(nuevoAlumno);

        const req = { body: { Alumno: 'Nuevo Alumno', Grado: 10, Grupo: 'A', Sexo: 'F', Email: 'correo@example.com' } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await postAlumnos(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(nuevoAlumno);
    });
}); */

//Prueba Unitaria de Eliminación de Alumno
describe('deleteAlumnos', () => {
    it('debería eliminar un alumno y devolver un mensaje con el código de estado 200 si se proporciona un ID válido', async () => {
        // ID de prueba para un alumno existente
        const idAlumno = '65fe4dc75ca8d721b75c7584';

        // Mockear la función findByIdAndDelete de Mongoose para simular la eliminación del alumno
        Alumno.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: idAlumno });

        // Simular una solicitud HTTP con el ID del alumno
        const req = { params: { id: idAlumno } };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Llamar a la función a probar
        await deleteAlumnos(req, res);

        // Verificar si la función de respuesta JSON fue llamada con el mensaje y el código de estado 200
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ mensaje: 'Alumno eliminado exitosamente' });
    });
});

//Prueba Unitaria de Modificación de Alumno
/*describe('putAlumnos', () => {
    it('debería actualizar un alumno y devolverlo con el código de estado 200 si se proporciona un ID válido y datos válidos', async () => {
        const idAlumno = '65fe4dc75ca8d721b75c7584';
        const datosActualizados = [{ Alumno: 'Nuevo Nombre', Grado: '11', Grupo: 'A', Sexo: 'M', Email: 'correo@ejemplo.com' }];
        const alumnoActualizado = { _id: idAlumno, ...datosActualizados };
        Alumno.findByIdAndUpdate.mockResolvedValue(alumnoActualizado);

        const req = { params: { id: idAlumno }, body: datosActualizados };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await putAlumnos(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(alumnoActualizado);
    });
});
*/