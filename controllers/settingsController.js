const Setting = require('../models/Setting')


// //RECUPERAR CONTRASENNA POR SU ID --> para editarla
exports.recuperarContrasennaID = async(req,res)=>{
    const id = req.query.id
    
    try {
       const contrasennaRecuperada = await password.findById(id) 
       
       if(!contrasennaRecuperada){
        return res.status(404).json({
            mensaje:"Contrasenna no encontrada"
        })
       }

       res.status(200).json({
        resultado:contrasennaRecuperada,
        mensaje:"Contrasenna recuperada exitosamente"
       })
    } catch (error) {
        console.log(error);
    }
}

//ACTUALIZAR CONTRASENNA --> put
exports.actualizarContrasenna = async(req,res)=>{
    const id = req.query.id
    try {
        //primero tenemos que buscar el id de lo que queremos actualizar
       const contrasennaActualizada = await password.findByIdAndUpdate(id, req.body, {new:true})
       if(!contrasennaActualizada){
        return res.status(400).json({
            mensaje:"Password no existe"
        })
       }

       res.status(200).json({
        resultado:contrasennaActualizada,
        mensaje:"Contrasenna actualizada exitosamente"
       })

    } catch (error) {
        res.status(500).json({
            mensaje:"Error al actualizar contrasenna",
            error
        })
    }
}