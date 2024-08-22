const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para registrar un nuevo usuario (POST)
router.post('/usuario', usuarioController.nuevoUsuario);

// Ruta para obtener todos los usuarios (GET)
router.get('/usuario', usuarioController.recuperarUsuarios);

// Ruta para obtener un usuario por ID (GET)
router.get('/usuarioID', usuarioController.recuperarUsuarioID);

// Ruta para actualizar un usuario (PUT)
router.put('/usuario', usuarioController.actualizarUsuario);

// Ruta para eliminar un usuario (DELETE)
router.delete('/usuario', usuarioController.eliminarUsuario);

module.exports = router;
