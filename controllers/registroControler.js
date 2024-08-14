const User = require('../models/registroModels');
const registroServicio = require('../public/servicios/registroServicios');
const crypto = require('crypto');
const { sendRegistrationEmail } = require('../config/mailer'); // Ajusta la ruta según la ubicación de tu módulo Nodemailer

// Función para generar una contraseña aleatoria
function generatePassword() {
    return crypto.randomBytes(8).toString('hex'); // Genera una contraseña aleatoria de 16 caracteres
}

// GRABAR UN USUARIO EN BD
exports.nuevoUsuario = async (req, res) => {
    const password = generatePassword(); // Genera una contraseña aleatoria
    const nuevoUsuario = new User({ ...req.body, password });
    try {
        await nuevoUsuario.save();

        // Envía la contraseña al usuario usando el módulo Nodemailer
        sendRegistrationEmail(nuevoUsuario.email, nuevoUsuario.nombre, password);

        res.status(200).json({
            usuario: nuevoUsuario,
            mensaje: "Usuario creado exitosamente, la contraseña ha sido enviada por correo electrónico.",
            resultado: true
        });
    } catch (error) {
        res.status(500).json({
            resultado: false,
            mensajeError: "No se pudo guardar el usuario. Ocurrió el siguiente error:",
            error
        });
    }
};


// LISTAR TODOS LOS USUARIOS
exports.recuperarUsuarios = async (req, res) => {
    try {
        const usuariosRecuperados = await User.find();
        res.status(200).json({
            listadoUsuarios: usuariosRecuperados,
            mensaje: "Usuarios recuperados exitosamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Error al recuperar los usuarios",
            error
        });
    }
};

// RECUPERAR UN USUARIO POR SU ID
exports.recuperarUsuarioID = async (req, res) => {
    const id = req.query.id;
    try {
        const usuarioRecuperado = await User.findById(id);

        if (!usuarioRecuperado) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            usuario: usuarioRecuperado,
            mensaje: "Usuario recuperado exitosamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Error al recuperar el usuario",
            error
        });
    }
};

// ACTUALIZAR USUARIO
exports.actualizarUsuario = async (req, res) => {
    const id = req.query.id;
    try {
        const usuarioActualizado = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!usuarioActualizado) {
            return res.status(400).json({
                mensaje: "Usuario no existe"
            });
        }

        res.status(200).json({
            usuario: usuarioActualizado,
            mensaje: "Usuario actualizado exitosamente"
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar el usuario",
            error
        });
    }
};

// ELIMINAR USUARIO
exports.eliminarUsuario = async (req, res) => {
    const id = req.query.id;
    try {
        const usuarioEliminado = await User.findByIdAndDelete(id);

        if (!usuarioEliminado) {
            return res.status(400).json({
                mensaje: "Usuario no existe"
            });
        }

        res.status(200).json({
            usuario: usuarioEliminado,
            mensaje: "Usuario eliminado exitosamente"
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar el usuario",
            error
        });
    }
};




