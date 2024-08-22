const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/settingsController');
 //CRUD-: CREATE (POST)-READ(GET)-UPDATE(PUT)-DELETE(DELETE)


//POST
//http://localhost:3000/configuraciones
router.post('/setting', settingsController.nuevoCliente);


//GET DE UN CLIENTE POR SU ID -->filtrar
router.get('/settingID', settingsController.recuperarClienteID)


//PUT - ACTUALIZAR UN SETTING
router.put('/setting',settingsController.actualizarCliente);