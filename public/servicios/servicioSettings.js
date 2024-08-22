const registrar_settings = async (pfoto,pcontrasenna)=>{
    try {
       const res =  await axios({
            method:"post",
            url:"http://localhost:3000/configuraciones",
            responseType:"json",
            data:{ //req.body
                foto:pfoto,
                contrasenna:pcontrasenna,
                
            }
        });
        //console.log(res);
        if(res.data.resultado==false){
            if(res.data.error.code==11000){
                Swal.fire({
                    title:"No se completo el cambio",
                    text:"Consulte con la Base de Datos",
                    icon:"error"
                })
        }
        
        }else{
            Swal.fire({
                title:"Exito",
                text:"Cambios completos",
                icon:"success"
            })

            setTimeout(() => {
                window.location.href="settings.html"
            }, 1000);
            
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            title:"No se completo el cambio",
            text:"Pongase en contacto con el admin del sistema",
            icon:"error"
        })
        
    }
}