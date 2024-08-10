const Resultado = require('../models/Resultado')

// AGREGAR NUEVO resultado --> post --> para guardar resultado de batalla
exports.nuevoResultado = async (req, res) => {
    
    const nuevoResultado = new Resultado(req.body)
    try {
        await nuevoResultado.save()
        res.status(200).json({
            resultado:nuevoResultado,
            mensaje:"Resultado creado exitosamente",
            resultado:true
        })
    } catch (error) {
        res.status(500).json({
            resultado:false,
            mensajeError:"No se pudo guardar el resultado ocurrio el siguiente error:",
            error
        })
    }
}

//LISTAR TODAS LOS RESULTADOS --> get --> para historial
exports.recuperarResultados = async(req,res)=>{
    try {
       const resultadosRecuperados= await Resultado.find()
       res.status(200).json({
        listadoResultados:resultadosRecuperados,
        mensaje:"Resultados recuperados exitosamente"
       })
    } catch (error) {
        console.log(error);
    }
}


// ------------------------------------------------------------------------------


// Estos de aquí para abajo en teoría no los necesitamos, los dejo por si acaso


//RECUPERAR UN RESULTADO POR SU ID --> para editarlo
exports.recuperarResultadoID = async(req,res)=>{
    const id = req.query.id
    
    try {
       const resultadoRecuperado = await Resultado.findById(id) 
       
       if(!resultadoRecuperado){
        return res.status(404).json({
            mensaje:"Resultado no encontrado"
        })
       }

       res.status(200).json({
        resultado:resultadoRecuperado,
        mensaje:"Resultado recuperado exitosamente"
       })
    } catch (error) {
        console.log(error);
    }
}

//ACTUALIZAR RESULTADOS --> put
exports.actualizarResultado = async(req,res)=>{
    const id = req.query.id
    try {
        //primero tenemos que buscar el resultado que queremos actualizar
       const resultadoActualizado = await Resultado.findByIdAndUpdate(id, req.body, {new:true})
       if(!resultadoActualizado){
        return res.status(400).json({
            mensaje:"Resultado no existe"
        })
       }

       res.status(200).json({
        resultado:resultadoActualizado,
        mensaje:"Resultado actualizado exitosamente"
       })

    } catch (error) {
        res.status(500).json({
            mensaje:"Error al actualizar el resultado",
            error
        })
    }
}

//ELIMINAR resultado --> delete
exports.eliminarResultado = async(req,res)=>{
    const id = req.query.id
    try {
        //primero tenemos que buscar el resultado que queremos eliminar
       const resultadoEliminado = await Resultado.findByIdAndDelete(id)
       if(!resultadoEliminado){
        return res.status(400).json({
            mensaje:"Resultado no existe"
        })
       }

       res.status(200).json({
        resultado:resultadoEliminado,
        mensaje:"Resultado eliminado exitosamente"
       })

    } catch (error) {
        res.status(500).json({
            mensaje:"Error al eliminar el resultado",
            error
        })
    }
}

