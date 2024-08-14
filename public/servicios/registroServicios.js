//funcion para agregar personas
const registrar_usuario = async (pnombre,papellido,ptipoCedula,pcorreo,pcedula,pbirthdate)=>{
    try {
       const res =  await axios({
            method:"post",
            url:"http://localhost:3000/cliente",
            responseType:"json",
            data:{ //req.body
                nombre:pnombre,
                apellido:papellido,
                correo:pcorreo,
                telefono:ptelefono,
                tipoCedula:ptipoCedula,
                cedula:pcedula,
                birthdate : pbirthdate
               
            }
        });
        //console.log(res);
        if(res.data.resultado==false){
            if(res.data.error.code==11000){
                Swal.fire({
                    title:"No se completo el registro",
                    text:"La persona ya esta registrada",
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
                window.location.href="landingPage.html"
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



// Función para obtener usuarios (GET)
const obtener_usuarios = async () => {
    let obtener_usuarios_DB = [];
    try {
        const res = await axios({
            method: 'get',
            url: 'http://localhost:3000/registro/usuarios',
            responseType: 'json'
        });

        obtener_usuarios_DB = res.data.listadoUsuarios;
    } catch (error) {
        console.log(error);
        Swal.fire({
            text: "No se pudo recuperar los usuarios de la base de datos",
            icon: "error"
        });
    }

    return obtener_usuarios_DB;
}

// Función para obtener un usuario por ID (GET)
const obtener_usuario_por_id = async (id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:3000/registro/usuario',
            params: { id: id },
            responseType: 'json'
        });
        if (response.status == 200) {
            return response.data.usuario;
        } else {
            Swal.fire({
                text: "No se encontró a la persona",
                icon: "error"
            });
            return null;
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            text: "No se pudo recuperar el usuario",
            icon: "error"
        });
    }
}

// Función para actualizar un usuario (PUT)
const actualizar_usuario = async (id, data) => {
    try {
        const response = await axios({
            method: "put",
            url: "http://localhost:3000/registro/usuario",
            params: { id: id }, // req.query
            data: data, // req.body
            responseType: "json"
        });

        if (response.status == 200) {
            Swal.fire({
                text: "Datos actualizados",
                icon: "success"
            });

            setTimeout(() => {
                window.location.href = "#";//Para llevar a la pagina que lista los usuarios
            }, 1000);
        } else {
            Swal.fire({
                text: "No se pudo actualizar el usuario, usuario no existe",
                icon: "error"
            });
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            text: "No se pudo actualizar el usuario",
            icon: "error"
        });
    }
}

// Función para eliminar un usuario (DELETE)
const eliminar_usuario = async (id) => {
    try {
        const res = await axios({
            method: 'delete',
            url: 'http://localhost:3000/registro/usuario',
            params: { id }, // req.query
            responseType: "json"
        });

        if (res.status == 200) {
            Swal.fire({
                title: "Usuario eliminado",
                text: "El usuario ha sido eliminado correctamente",
                icon: "success"
            });
        } else {
            Swal.fire({
                text: "No se pudo eliminar el usuario",
                icon: "error"
            });
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            text: "No se pudo eliminar el usuario",
            icon: "error"
        });
    }
}




