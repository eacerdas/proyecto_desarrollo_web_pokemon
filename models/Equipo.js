const mongoose = require('mongoose')

const equipoSchema = new mongoose.Schema({
    nombreEquipo: {type:String, required:true},
    usuario1: {type:String, required:true},
    usuario2: {type:String, required:true}
});

module.exports = mongoose.model('Equipo',equipoSchema)
