const registrar_usuario = async (pnombre, papellido, pusername, pemail, pidType, pid, pbirthdate) => {
    try {
        const res = await axios({
            method: "post",
            url: "http://localhost:3000/usuario",
            responseType: "json",
            data: {
                nombre: pnombre,
                apellido: papellido,
                username: pusername,
                email: pemail,
                idType: pidType,
                id: pid,
                birthdate: pbirthdate,
            }
        });

        console.log('Respuesta del servidor:', res.data); // Imprime la respuesta del servidor

        if (res.data.usuario === false) {
            if (res.data.error && res.data.error.code === 11000) {
                Swal.fire({
                    title: "No se completó el registro",
                    text: "El usuario ya está registrado",
                    icon: "error"
                });
            } else {
                Swal.fire({
                    title: "Error en el registro",
                    text: res.data.mensajeError || "Ocurrió un error durante el registro.",
                    icon: "error"
                });
            }
        } else {
            Swal.fire({
                title: "Éxito",
                text: "Registro completo",
                icon: "success",
                confirmButtonText: 'OK',
                preConfirm: () => {
                    window.location.href = 'landingPage.html'; // Redirige a landingPage.html
                }
            });
        }
    } catch (error) {

        Swal.fire({
            title: "Error de conexión",
            text: "No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.",
            icon: "error"
        });
    }
}

const listar_usuarios = async()=>{
    let lista_usuario_DB = []
    try {
        const res = await axios({
            method:'get',
            url:'http://localhost:3000/usuario',
            responseType:'json'
        })

        lista_usuario_DB = res.data.listadoUsuarios
    } catch (error) {
        console.log(error);
        Swal.fire({
            text:"No se pudo recuperar los usuarios de la BD",
            icon:"error"
        })
    }

    return lista_usuario_DB

}

const eliminarUsuario = async (usuarioId) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `http://localhost:3000/usuario?id=${usuarioId}`,
            responseType: 'json'
        });

        if (res.data.usuario) {
            Swal.fire({
                title: "Éxito",
                text: "Usuario eliminado",
                icon: "success"
            });
        } else {
            Swal.fire({
                title: "Error",
                text: "No se pudo eliminar el usuario",
                icon: "error"
            });
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Error al eliminar el usuario",
            icon: "error"
        });
    }
};