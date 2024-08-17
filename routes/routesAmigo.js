const express = require('express');
const router = express.Router();

const amigoController = require('../controllers/amigoController');
 //CRUD-: CREATE (POST)-READ(GET)-UPDATE(PUT)-DELETE(DELETE)


//POST
//http://localhost:3000/amigo
router.post('/amigo', amigoController.nuevoAmigo);

//GET TODOS LOS Amigos
router.get('/amigo',amigoController.recuperarAmigos);


//GET DE UN CLIENTE POR SU ID -->filtrar
router.get('/amigoID', amigoController.recuperarAmigoID)


//PUT - ACTUALIZAR UN CLIENTE
router.put('/amigo',amigoController.actualizarAmigo);


//DELETE - ELIMINAR UN CLIENTE

router.delete('/amigo',amigoController.eliminarAmigo);

module.exports = router;
