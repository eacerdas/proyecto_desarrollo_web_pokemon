const mongoose = require('mongoose')

const configuracionesSchema = new mongoose.Schema({
    foto:{type:String, required:false},
    contrasenna:{type:String, required:true}
})

module.exports = mongoose.model('Configuraciones',configuracionesSchema)

//me falta hacer la prueba del modelo en mongo para crear la categoría de foto (creo que debo estar en rc)
//bajar el server, eliminar la coleccion de Configuraciones, se realizan los cambios y se reinicia para que quede en BD

