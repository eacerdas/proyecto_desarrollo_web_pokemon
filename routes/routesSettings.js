const express = require('express');
const router = express.Router();

const settingsController = require('../controllers/settingsController');
 //CRUD-: CREATE (POST)-READ(GET)-UPDATE(PUT)-DELETE(DELETE)


//POST
//http://localhost:3000/configuraciones
router.post('/setting', settingsController.nuevoCliente);


//GET DE USUARIO POR SU ID -->filtrar
//http://localhost:3000/usuario  
// Ruta para obtener un usuario por ID (GET)
router.get('/usuarioID', usuarioController.recuperarUsuarioID);


// Ruta para actualizar un usuario (PUT)
router.put('/usuario', usuarioController.actualizarUsuario);