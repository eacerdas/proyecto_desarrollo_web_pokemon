const Usuario = require("../models/Usuario");

exports.recuperarUsuarioCorreo = async(req, res) => {
    const email = req.query.email;

    try {
        const usuarioRecuperado = await Usuario.findOne({ email:email });

        if (!usuarioRecuperado) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado."
            });
        }

        res.status(200).json({
            usuario: usuarioRecuperado,
            mensaje: "Usuario recuperado exitosamente."
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Error al recuperar el usaurio.",
            error
        });
    }
};


    exports.actualizarContrasenna = async(req, res) => {
        const email = req.query.email;
        const nuevaContrasenna = req.body.password;
    
        try {
            const usuarioActualizado = await Usuario.findOneAndUpdate(
                { email: email },
                { password: nuevaContrasenna },
                { new: true }
            );
    
            if (!usuarioActualizado) {
                return res.status(400).json({
                    mensaje: "El usuario no existe."
                });
            }
    
            res.status(200).json({
                usuario: usuarioActualizado,
                mensaje: "Contraseña actualizada exitosamente."
            });
        } catch (error) {
            res.status(500).json({
                mensaje: "Error al actualizar la contraseña.",
                error
            });
        }
    };
    