const Amigo = require('../models/Amigo')

// AGREGAR NUEVO amigo --> post --> para guardar amigo de batalla
exports.nuevoAmigo = async (req, res) => {
    
    const nuevoAmigo = new Amigo(req.body)
    try {
        await nuevoAmigo.save()
        res.status(200).json({
            amigo:nuevoAmigo,
            mensaje:"Amigo añadido exitosamente",
            amigo:true
        })
    } catch (error) {
        res.status(500).json({
            amigo:false,
            mensajeError:"No se pudo añadir el amigo ocurrio el siguiente error:",
            error
        })
    }
}

//LISTAR TODAS LOS AMIGOS --> get --> para historial
exports.recuperarAmigos = async(req,res)=>{
    try {
       const amigosRecuperados= await Amigo.find()
       res.status(200).json({
        listadoAmigos:amigosRecuperados,
        mensaje:"Amigos recuperados exitosamente"
       })
    } catch (error) {
        console.log(error);
    }
}

//RECUPERAR UN AMIGO POR SU ID --> para editarlo
exports.recuperarAmigoID = async(req,res)=>{
    const id = req.query.id
    
    try {
       const amigoRecuperado = await Amigo.findById(id) 
       
       if(!amigoRecuperado){
        return res.status(404).json({
            mensaje:"Amigo no encontrado"
        })
       }

       res.status(200).json({
        amigo:amigoRecuperado,
        mensaje:"Amigo recuperado exitosamente"
       })
    } catch (error) {
        console.log(error);
    }
}

//ACTUALIZAR AMIGOS --> put
exports.actualizarAmigo = async(req,res)=>{
    const id = req.query.id
    try {
        //primero tenemos que buscar el amigo que queremos actualizar
       const amigoActualizado = await Amigo.findByIdAndUpdate(id, req.body, {new:true})
       if(!amigoActualizado){
        return res.status(400).json({
            mensaje:"Amigo no existe"
        })
       }

       res.status(200).json({
        amigo:amigoActualizado,
        mensaje:"Amigo actualizado exitosamente"
       })

    } catch (error) {
        res.status(500).json({
            mensaje:"Error al actualizar el amigo",
            error
        })
    }
}

//ELIMINAR amigo --> delete
exports.eliminarAmigo = async(req,res)=>{
    const id = req.query.id
    try {
        //primero tenemos que buscar el amigo que queremos eliminar
       const amigoEliminado = await Amigo.findByIdAndDelete(id)
       if(!amigoEliminado){
        return res.status(400).json({
            mensaje:"Amigo no existe"
        })
       }

       res.status(200).json({
        amigo:amigoEliminado,
        mensaje:"Amigo eliminado exitosamente"
       })

    } catch (error) {
        res.status(500).json({
            mensaje:"Error al eliminar el amigo",
            error
        })
    }
}

