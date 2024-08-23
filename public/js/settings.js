// falta hacer funcion para cambio de contraseña

const input_foto = document.getElementById('foto_usuario') //ref a la etiqueta img

document.getElementById('btn-cambiar-foto').addEventListener('click', function() {
    Swal.fire({
        title: "Éxito",
        text: "La foto de perfil se cambió exitosamente.",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#FF4E4E",
        customClass: {
            icon: 'swal2-center',
        }
    });
});


//function enviarDatos(event) {
    


btn_guardar_cambios.addEventListener('click', enviarDatos);
