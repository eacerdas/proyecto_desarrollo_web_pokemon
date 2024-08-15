const registrar_equipo = async (pnombreEquipo,pusuario1,pusuario2) => {
    try {
        const res = await axios({
            method: "post",
            url: "http://localhost:3000/equipo",
            responseType: "json",
            data: {
                nombreEquipo:pnombreEquipo,
                usuario1: pusuario1,
                usuario2: pusuario2,
            }
        });

        if (res.data.equipo == false) {
            if (res.data.error.code == 11000) {
                Swal.fire({
                    title: "No se completó el registro",
                    text: "El equipo ya está registrado",
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

            setTimeout(() => {
                window.location.href = "equipos.html";
            }, 1000);
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

const listar_equipos = async()=>{
    let lista_equipo_DB = []
    try {
        const res = await axios({
            method:'get',
            url:'http://localhost:3000/equipo',
            responseType:'json'
        })

        lista_equipo_DB = res.data.listadoEquipos
    } catch (error) {
        console.log(error);
        Swal.fire({
            text:"No se pudo recuperar los equipos de la BD",
            icon:"error"
        })
    }

    return lista_equipo_DB

}

const eliminarEquipo = async (equipoId) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `http://localhost:3000/equipo?id=${equipoId}`,
            responseType: 'json'
        });

        if (res.data.equipo) {
            Swal.fire({
                title: "Éxito",
                text: "Equipo eliminado",
                icon: "success"
            });
        } else {
            Swal.fire({
                title: "Error",
                text: "No se pudo eliminar el equipo",
                icon: "error"
            });
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Error al eliminar el equipo",
            icon: "error"
        });
    }
};