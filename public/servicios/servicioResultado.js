const registrar_resultado = async (pjugador1,pjugador2,ppokemon1,ppokemon2,pganador,pempate)=>{
    try {
       const res =  await axios({
            method:"post",
            url:"http://localhost:3000/resultado",
            responseType:"json",
            data:{ //req.body
                jugador1:pjugador1,
                jugador2:pjugador2,
                pokemon1:ppokemon1,
                pokemon2:ppokemon2,
                ganador:pganador,
                empate:pempate,
            }
        });
        //console.log(res);
        if(res.data.resultado==false){
            if(res.data.error.code==11000){
                Swal.fire({
                    title:"No se completó el registro",
                    text:"El resultado ya está registrado",
                    icon:"error",
                    confirmButtonText: 'Ok',
                    confirmButtonColor: "#FF4E4E",
                    
                })
        }
        
        }else{
            Swal.fire({
                title:"¡Éxito!",
                text:"Resultado guardado en el historial",
                icon:"success",
                confirmButtonText: 'Ok',
                confirmButtonColor: "#96C78C",
            })
            
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            title:"No se completó el registro",
            text:"Póngase en contacto con el admin del sistema",
            icon:"error",
            confirmButtonText: 'Ok',
            confirmButtonColor: "#FF4E4E",
        })
        
    }
}

const listar_resultados = async()=>{
    let lista_resultado_DB = []
    try {
        const res = await axios({
            method:'get',
            url:'http://localhost:3000/resultado',
            responseType:'json'
        })

        lista_resultado_DB = res.data.listadoResultados
    } catch (error) {
        console.log(error);
        Swal.fire({
            text:"No se pudo recuperar los resultados de la BD",
            icon:"error",
            confirmButtonText: 'Ok',
            confirmButtonColor: "#FF4E4E",
        })
    }

    return lista_resultado_DB

}