const express = require('express');
const router = express.Router();

const resultadoController = require('../controllers/resultadoController');
 //CRUD-: CREATE (POST)-READ(GET)-UPDATE(PUT)-DELETE(DELETE)


//POST
//http://localhost:3000/resultado
router.post('/resultado', resultadoController.nuevoResultado);

//GET TODOS LOS Resultados
router.get('/resultado',resultadoController.recuperarResultados);


//GET DE UN CLIENTE POR SU ID -->filtrar
router.get('/resultadoID', resultadoController.recuperarResultadoID)


//PUT - ACTUALIZAR UN CLIENTE
router.put('/resultado',resultadoController.actualizarResultado);


//DELETE - ELIMINAR UN CLIENTE

router.delete('/resultado',resultadoController.eliminarResultado);

module.exports = router;
