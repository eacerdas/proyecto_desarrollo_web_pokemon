const Equipo = require('../models/Equipo')

// AGREGAR NUEVO equipo --> post --> para guardar equipo de batalla
exports.nuevoEquipo = async (req, res) => {
    
    const nuevoEquipo = new Equipo(req.body)
    try {
        await nuevoEquipo.save()
        res.status(200).json({
            equipo:nuevoEquipo,
            mensaje:"Equipo añadido exitosamente",
            equipo:true
        })
    } catch (error) {
        res.status(500).json({
            equipo:false,
            mensajeError:"No se pudo añadir el equipo ocurrio el siguiente error:",
            error
        })
    }
}

//LISTAR TODAS LOS EQUIPOS --> get --> para historial
exports.recuperarEquipos = async(req,res)=>{
    try {
       const equiposRecuperados= await Equipo.find()
       res.status(200).json({
        listadoEquipos:equiposRecuperados,
        mensaje:"Equipos recuperados exitosamente"
       })
    } catch (error) {
        console.log(error);
    }
}

//RECUPERAR UN EQUIPO POR SU ID --> para editarlo
exports.recuperarEquipoID = async(req,res)=>{
    const id = req.query.id
    
    try {
       const equipoRecuperado = await Equipo.findById(id) 
       
       if(!equipoRecuperado){
        return res.status(404).json({
            mensaje:"Equipo no encontrado"
        })
       }

       res.status(200).json({
        equipo:equipoRecuperado,
        mensaje:"Equipo recuperado exitosamente"
       })
    } catch (error) {
        console.log(error);
    }
}

//ACTUALIZAR EQUIPOS --> put
exports.actualizarEquipo = async(req,res)=>{
    const id = req.query.id
    try {
        //primero tenemos que buscar el equipo que queremos actualizar
       const equipoActualizado = await Equipo.findByIdAndUpdate(id, req.body, {new:true})
       if(!equipoActualizado){
        return res.status(400).json({
            mensaje:"Equipo no existe"
        })
       }

       res.status(200).json({
        equipo:equipoActualizado,
        mensaje:"Equipo actualizado exitosamente"
       })

    } catch (error) {
        res.status(500).json({
            mensaje:"Error al actualizar el equipo",
            error
        })
    }
}

//ELIMINAR equipo --> delete
exports.eliminarEquipo = async(req,res)=>{
    const id = req.query.id
    try {
        //primero tenemos que buscar el equipo que queremos eliminar
       const equipoEliminado = await Equipo.findByIdAndDelete(id)
       if(!equipoEliminado){
        return res.status(400).json({
            mensaje:"Equipo no existe"
        })
       }

       res.status(200).json({
        equipo:equipoEliminado,
        mensaje:"Equipo eliminado exitosamente"
       })

    } catch (error) {
        res.status(500).json({
            mensaje:"Error al eliminar el equipo",
            error
        })
    }
}

