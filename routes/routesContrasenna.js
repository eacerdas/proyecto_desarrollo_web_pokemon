
const express = require('express');
const router = express.Router();

const forgotPasswController = require('../controllers/forgotPasswController');


// recuperar usuario por correo (get)
router.get('/usuarioteEmail', forgotPasswController.recuperarUsuarioCorreo)

// actualizar contrasenna (put)
router.put('/usuarioContrasenna',forgotPasswController.actualizarContrasenna);

module.exports = router;