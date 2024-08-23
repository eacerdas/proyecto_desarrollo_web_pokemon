const recuperarUsuarioCorreo = async(email)=>{
    try {
        const response = await axios({
            method: "get",
            url: "http://localhost:3000/usuarioContrasenna",
            params: { email: email },
            responseType: "json"
        });
        if(response.status == 200){
            return response.data.usuario
        }else{
            Swal.fire({
                text:"No se encontró al usuario.",
                icon:"error"
            });
            return null
        }
    } catch (error) {
        console.log(error);
        
    }
}

const actualizarContrasennaCorreo = async(email,password)=>{
    try {
        const response = await axios({
            method:"put",
            url:"http://localhost:3000/usuarioContrasenna",
            params:{email:email},
            data:{password:password},
            responseType:"json"          

        });

        if(response.status == 200){
            Swal.fire({
                text:"Contraseña actualizada",
                icon:"success",
                confirmButtonText: "Ok",
                confirmButtonColor: "#96C78C"
            });

        }else{
            Swal.fire({
                text:"No se pudo actualizar la contraseña, el correo no está vinculado a ninguna cuenta.",
                icon:"error"
            })
        }

    } catch (error) {
        console.log(error);
    }
}