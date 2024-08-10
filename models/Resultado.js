const mongoose = require('mongoose')

const resultadoSchema = new mongoose.Schema({
    jugador1:{type:String,required:true},
    jugador2:{type:String,required:true},
    pokemon1:{type:String,required:true},
    pokemon2:{type:String,required:true},
    ganador: {type:String,required:true},
    empate:  {type:Boolean,required:true}
})

module.exports = mongoose.model('Resultado',resultadoSchema)
