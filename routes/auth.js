const Usuario = require('../models/Usuario') //modelo del usuario/registro
const express = require('express')
const router = express.Router()

router.post('/validacion-creds',async(req,res)=>{
    let correo = req.body.correo
    /*console.log(correo); */
    
    try {
        const usuario = await Usuario.findOne({email:correo})
        if(usuario){
            if(usuario.password == req.body.contrasenna){
                return res.status(200).json({
                    resultado:true,
                    usuario
                })
            } else {
                return res.status(401).json({
                    resultado:false,
                    mensaje:"La contraseña es incorrecta."
                })
            }
        }else{
            return res.status(400).json({
                resultado:false,
                mensaje:"El correo ingresado no pertenece a ninguna cuenta."
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            resultado:false,
            mensaje:"Error al iniciar sesión.",
            error:error.message
        })
      }
    })
    
    module.exports = router;