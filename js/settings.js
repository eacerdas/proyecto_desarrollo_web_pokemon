document.getElementById('btn-cambiar-foto').addEventListener('click', function() {
    // Aquí simulo el cambio exitoso de la foto
    // Normalmente aquí iría el código para cambiar la foto en tu aplicación

    // Muestro la alerta de éxito
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
});

document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let error = false;
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&()\-_=+{}[\]:;"',.<>?\\|]).{8,}$/;

    let contrasennaAnterior = document.getElementById('oldPassword');
    let nuevaContrasenna = document.getElementById('newPassword');
    let confirmarContrasenna = document.getElementById('confirmPassword');

    // Validar nueva contraseña
    if (!regex.test(nuevaContrasenna.value)) {
        nuevaContrasenna.classList.add('error');
        error = true;
    } else {
        nuevaContrasenna.classList.remove('error');
    }

    // Validar confirmación de nueva contraseña
    if (nuevaContrasenna.value !== confirmarContrasenna.value || !regex.test(confirmarContrasenna.value)) {
        confirmarContrasenna.classList.add('error');
        error = true;
    } else {
        confirmarContrasenna.classList.remove('error');
    }

    if (error) {
        Swal.fire({
            title: "Error",
            text: "Ingresa una contraseña válida.",
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "red",
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
            confirmButtonColor: "green",
            customClass: {
                icon: 'swal2-center',
            }
        });
    }
});
