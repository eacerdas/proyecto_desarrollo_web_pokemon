const validarCredenciales = async(pcorreo,pcontrasenna)=>{
    try {
        const response = await axios.post("http://localhost:3000/validacion-creds", {
            correo: pcorreo,
            contrasenna: pcontrasenna
        }, {
            responseType: "json"
        })

        console.log("Response data:", response.data); // Para ver los datos de la respuesta

        if(response.status === 200 && response.data.resultado === true){
            sessionStorage.setItem("nombre",response.data.usuario.nombre)
            sessionStorage.setItem("apellido",response.data.usuario.apellido)
            sessionStorage.setItem("username",response.data.usuario.username)
            sessionStorage.setItem("correo",response.data.usuario.email)
            sessionStorage.setItem("tipoCedula",response.data.usuario.idType)
            sessionStorage.setItem("cedula",response.data.usuario.id)
            sessionStorage.setItem("fechaNac",response.data.usuario.birthdate)
            sessionStorage.setItem("contrasenna",response.data.usuario.password)
            sessionStorage.setItem("id_mongo",response.data.usuario._id)//id generado por mongo
            
            window.location.href = "mainpage.html"
        } 
        if(response.status === 401 && response.data.resultado === false){
            Swal.fire({
                text:"La contraseña no coincide.",
                icon:"error",
                confirmButtonText: "Ok",
                confirmButtonColor: "#FF4E4E"
            })
        }else {
            if(response.status === 400 && response.data.resultado === false){
                Swal.fire({
                    text: "El correo ingresado no pertenece a ninguna cuenta.",
                    icon: "error",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#FF4E4E"
                });
            } else {
                Swal.fire({
                    text: "Respuesta inesperada del servidor.",
                    icon: "error",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#FF4E4E"
                });
            }
        }
         
    } catch (error) {
        console.log("Error:", error);
        if (error.response) {
            // el servidor respondió con un código de estado que no está en el rango de 2xx
            Swal.fire({
                text: error.response.data.mensaje || "Hubo un error al validar las credenciales.",
                icon: "error",
                confirmButtonText: "Ok",
                confirmButtonColor: "#FF4E4E"
            });
        } else {
            // ocurrió un error al realizar la solicitud
            Swal.fire({
                text: "Hubo un error al intentar comunicarse con el servidor",
                icon: "error",
                confirmButtonText: "Ok",
                confirmButtonColor: "#FF4E4E"
            });
        }
    }
}