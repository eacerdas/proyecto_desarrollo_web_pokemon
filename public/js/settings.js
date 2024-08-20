document.getElementById('btn-cambiar-foto').addEventListener('click', function() {
    // Simula el cambio exitoso de la foto
    // Normalmente, el código para cambiar la foto en tu aplicación iría aquí

    // Muestra alerta de éxito
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

document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let nuevaContrasenna = document.getElementById('newPassword');
    let confirmarContrasenna = document.getElementById('confirmPassword');

    // Validación de campos vacíos
    if (validarCamposVacios(nuevaContrasenna, confirmarContrasenna)) {
        Swal.fire({
            title: "Dejaste campos en blanco.",
            text: "Por favor rellena todos los espacios.",
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#FF4E4E",
            customClass: {
                icon: 'swal2-center',
            }
        });
        return;
    }

    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&()\-_=+{}[\]:;"',.<>?\\|]).{8,}$/;

    let passwordValida = regex.test(nuevaContrasenna.value);
    let contrasenasCoinciden = nuevaContrasenna.value === confirmarContrasenna.value;

    // Eliminar la clase de error previa
    nuevaContrasenna.classList.remove('error');
    confirmarContrasenna.classList.remove('error');

    if (!passwordValida) {
        nuevaContrasenna.classList.add('error');
        Swal.fire({
            title: "Error",
            text: "La contraseña no cumple con los requerimientos.",
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#FF4E4E",
            customClass: {
                icon: 'swal2-center',
            }
        });
    } else if (!contrasenasCoinciden) {
        confirmarContrasenna.classList.add('error');
        Swal.fire({
            title: "Error",
            text: "Las contraseñas no coinciden.",
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#FF4E4E",
            customClass: {
                icon: 'swal2-center',
            }
        });
    } else {
        Swal.fire({
            title: "Éxito",
            text: "La contraseña ha sido cambiada con éxito.",
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#FF4E4E",
            customClass: {
                icon: 'swal2-center',
            }
        });
    }
});

// Validación de campos vacíos
function validarCamposVacios(...campos) {
    let error = false;
    for (let i = 0; i < campos.length; i++) {
        if (campos[i].value === "") {
            campos[i].classList.add('error');
            error = true;
        } else {
            campos[i].classList.remove('error');
        }
    }
    return error;
}
