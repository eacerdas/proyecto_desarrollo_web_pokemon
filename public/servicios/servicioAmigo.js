const registrar_amigo = async (pusuario1,pusuario2) => {
    try {
        const res = await axios({
            method: "post",
            url: "http://localhost:3000/amigo",
            responseType: "json",
            data: {
                usuario1: pusuario1,
                usuario2: pusuario2,
            }
        });

        if (res.data.amigo == false) {
            if (res.data.error.code == 11000) {
                Swal.fire({
                    title: "No se completó el registro",
                    text: "El amigo ya está registrado",
                    icon: "error",
                    confirmButtonColor: "#FF4E4E"
                });
            }
        } else {
            Swal.fire({
                title: "Éxito",
                text: "Registro completo",
                icon: "success",
                confirmButtonColor: "#96C78C"
            });
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            title: "No se completó el registro",
            text: "Póngase en contacto con el admin del sistema",
            icon: "error",
            confirmButtonColor: "#FF4E4E"
        });
    }
};

const listar_amigos = async()=>{
    let lista_amigo_DB = []
    try {
        const res = await axios({
            method:'get',
            url:'http://localhost:3000/amigo',
            responseType:'json'
        })

        lista_amigo_DB = res.data.listadoAmigos
    } catch (error) {
        console.log(error);
        Swal.fire({
            text:"No se pudo recuperar los amigos de la BD",
            icon:"error"
        })
    }

    return lista_amigo_DB

}

const eliminarAmigo = async (amigoId) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `http://localhost:3000/amigo?id=${amigoId}`,
            responseType: 'json'
        });

        if (res.data.amigo) {
            Swal.fire({
                title: "Éxito",
                text: "Amigo eliminado",
                icon: "success",
                confirmButtonText: 'Ok',
                confirmButtonColor: "#96C78C",
            });
        } else {
            Swal.fire({
                title: "Error",
                text: "No se pudo eliminar el amigo",
                icon: "error"
            });
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Error al eliminar el amigo",
            icon: "error"
        });
    }
};