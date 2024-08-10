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
                    title:"No se completo el registro",
                    text:"El resultado ya esta registrado",
                    icon:"error"
                })
        }
        
        }else{
            Swal.fire({
                title:"Exito",
                text:"Registro completo",
                icon:"success"
            })

            setTimeout(() => {
                window.location.href="batalla.html"
            }, 1000);
            
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            title:"No se completo el registro",
            text:"Pongase en contacto con el admin del sistema",
            icon:"error"
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
            icon:"error"
        })
    }

    return lista_resultado_DB

}