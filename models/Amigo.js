const mongoose = require('mongoose')

const amigoSchema = new mongoose.Schema({
    usuario1: {type:String, required:true},
    usuario2: {type:String, required:true}
});

module.exports = mongoose.model('Amigo',amigoSchema)
