const boton_imagen = document.querySelector("#btn-cambiar-foto");
const imagen = document.querySelector("#foto-usuario");


let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: "softies",
    uploadPreset: "app_cenfo"
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log("Imagen registrada", result.info);
        imagen.src = result.info.secure_url;
        
        actualizarFotoUsuario(result.info.secure_url);
    }
});

boton_imagen.addEventListener("click", () => {
    widget_cloudinary.open();
}, false);

// Ajusta la URL base al puerto correcto del backend
const baseURL = 'http://localhost:3000'; // Cambia al puerto correcto si es diferente

function actualizarFotoUsuario(url) {
    console.log("URL de la imagen:", url);
    const userId = sessionStorage.getItem('id_mongo');

    fetch(`${baseURL}/api/usuarios/${userId}/foto`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ foto: url })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            console.log('Foto de perfil actualizada correctamente.');
            // Muestra alerta de éxito
            Swal.fire({
                title: "Éxito",
                text: "La foto de perfil se cambió exitosamente.",
                icon: "success",
                confirmButtonText: "Ok",
                confirmButtonColor: "green",
                customClass: {
                    icon: 'swal2-center',
                }
            });
        } else {
            console.error('Error al actualizar la foto de perfil:', data.message);
        }
    })
    .catch(error => {
        console.error('Error al comunicarse con el servidor:', error);
    });
}