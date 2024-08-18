const Usuario = require('../models/Usuario');

const { sendRegistrationEmail } = require('../config/mailer'); // Ajusta la ruta según la ubicación de tu módulo Nodemailer

const crypto = require('crypto');
// Función para generar una contraseña aleatoria
function generatePassword() {
    return crypto.randomBytes(8).toString('hex'); // Genera una contraseña aleatoria de 16 caracteres
}

        
// Grabar NUEVO usuario en BD
exports.nuevoUsuario = async (req, res) => {
    //console.log(req.body); // Verifica los datos recibidos
    
    const password = generatePassword();

    const nuevoUsuario = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        username: req.body.username,
        email: req.body.email,
        idType: req.body.idType,
        id: req.body.id,
        birthdate: req.body.birthdate,
        password: password
    });

    try {
        await nuevoUsuario.save();
        console.log('Usuario guardado exitosamente');

        res.status(200).json({
            usuario: true,
            mensaje: "Usuario añadido exitosamente",
            tipoAlerta: "success"
        });
    } catch (error) {
        console.error('Error al guardar usuario:', error); // Registra el error en el servidor
        res.status(500).json({
            usuario: false,
            mensajeError: "No se pudo añadir el usuario. Ocurrió el siguiente error:",
            error: error.message,
            tipoAlerta: "error"
        });
    }
};



// LISTAR TODOS LOS USUARIOS
exports.recuperarUsuarios = async (req, res) => {
    try {
        const usuariosRecuperados = await Usuario.find();
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
        const usuarioRecuperado = await Usuario.findById(id);

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
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, req.body, { new: true });

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
        const usuarioEliminado = await Usuario.findByIdAndDelete(id);

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



