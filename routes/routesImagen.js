const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario'); // Asegúrate de ajustar la ruta del modelo según tu estructura

// Ruta para actualizar la foto de perfil del usuario
router.put('/api/usuarios/:id/foto', async (req, res) => {
    const userId = req.params.id;
    const { foto } = req.body;

    try {
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        usuario.foto = foto;
        await usuario.save();

        res.json({ success: true, message: 'Foto de perfil actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al actualizar la foto de perfil' });
    }
});

module.exports = router;
