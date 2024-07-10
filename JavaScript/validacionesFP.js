const inputCorreo = document.getElementById("email"); 
const btnLink = document.getElementById("btnLink");

function validarCampos() {
    let error = false;
    let textoUsuario = inputCorreo.value.trim(); 

    if (textoUsuario === "") {
        mostrarAlerta("Por favor rellena todos los campos.");
        error = true;
    } else {
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regex.test(textoUsuario) === false) {
            mostrarAlerta("Ingresa un email válido.");
            error = true;
        }
    }

    return !error;
}

function mostrarAlerta(mensaje) {
    Swal.fire({
        title: "Error",
        text: mensaje,
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "red"
    });
}

function enviarDatos(event) {
    event.preventDefault(); 

    if (validarCampos()) {
        Swal.fire({
            title: "¡Éxito!",
            text: "Hemos enviado un enlace a tu correo para restablecer tu contraseña.",
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "green"
        });
        // lógica para enviar el enlace por correo, por ejemplo.
    }
}

btnLink.addEventListener('click', enviarDatos);