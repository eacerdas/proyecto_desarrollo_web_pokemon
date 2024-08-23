
const express = require('express');
const router = express.Router();

const forgotPasswController = require('../controllers/forgotPasswController');


// recuperar usuario por correo (get)
router.get('/usuarioContrasenna', forgotPasswController.recuperarUsuarioCorreo)

// actualizar contrasenna (put)
router.put('/usuarioContrasenna',forgotPasswController.actualizarContrasennaCorreo);

module.exports = router;