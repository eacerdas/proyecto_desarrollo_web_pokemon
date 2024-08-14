const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registroControler');

// Ruta para registrar un nuevo usuario (POST)
router.post('/register', registroController.nuevoUsuario);

// Ruta para obtener todos los usuarios (GET)
router.get('/usuarios', registroController.recuperarUsuarios);

// Ruta para obtener un usuario por ID (GET)
router.get('/usuario', registroController.recuperarUsuarioID);

// Ruta para actualizar un usuario (PUT)
router.put('/usuario', registroController.actualizarUsuario);

// Ruta para eliminar un usuario (DELETE)
router.delete('/usuario', registroController.eliminarUsuario);

module.exports = router;

