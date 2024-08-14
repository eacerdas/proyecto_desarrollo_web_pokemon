const express = require('express');
const router = express.Router();

const equipoController = require('../controllers/equipoController');
 //CRUD-: CREATE (POST)-READ(GET)-UPDATE(PUT)-DELETE(DELETE)


//POST
//http://localhost:3000/equipo
router.post('/equipo', equipoController.nuevoEquipo);

//GET TODOS LOS Equipos
router.get('/equipo',equipoController.recuperarEquipos);


//GET DE UN CLIENTE POR SU ID -->filtrar
router.get('/equipoID', equipoController.recuperarEquipoID)


//PUT - ACTUALIZAR UN CLIENTE
router.put('/equipo',equipoController.actualizarEquipo);


//DELETE - ELIMINAR UN CLIENTE

router.delete('/equipo',equipoController.eliminarEquipo);

module.exports = router;
