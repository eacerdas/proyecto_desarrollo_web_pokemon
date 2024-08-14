const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    idType: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    birthdate: { type: Date, required: true }, // Tipo Date para almacenar la fecha de nacimiento
    password: { type: String, required: true } // Esto será generado automáticamente
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);

