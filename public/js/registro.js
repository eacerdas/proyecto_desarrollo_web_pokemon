document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.registration-container form');
    const nameInput = form.querySelector('input[name="nombre"]');
    const surnameInput = form.querySelector('input[name="apellido"]');
    const usernameInput = form.querySelector('input[name="username"]');
    const emailInput = form.querySelector('input[name="email"]');
    const idInput = form.querySelector('input[name="id"]');
    const birthdateInput = form.querySelector('input[name="birthdate"]');
    const submitButton = form.querySelector('button[type="submit"]');

    function limpiarCampos() {
        nameInput.value = "";
        surnameInput.value = "";
        usernameInput.value = "";
        emailInput.value = "";
        idInput.value = "";
        birthdateInput.value = "";
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Validar Nombre
        if (!nameInput.value.trim()) {
            nameInput.classList.add('invalid');
            Swal.fire({
                icon: 'error',
                title: 'Error en el nombre.',
                text: 'Ingresa tu nombre.',
                confirmButton: "Ok",
                confirmButtonColor: "#FF4E4E"
            });
            return;
        } else {
            nameInput.classList.remove('invalid');
        }

        // Validar Apellido
        if (!surnameInput.value.trim()) {
            surnameInput.classList.add('invalid');
            Swal.fire({
                icon: 'error',
                title: 'Error en el apellido.',
                text: 'Ingresa tu apellido.',
                confirmButton: "Ok",
                confirmButtonColor: "#FF4E4E"
            });
            return;
        } else {
            surnameInput.classList.remove('invalid');
        }

        // Validar Nombre de Usuario
        if (!usernameInput.value.trim()) {
            usernameInput.classList.add('invalid');
            Swal.fire({
                icon: 'error',
                title: 'Error en el nombre de usuario.',
                text: 'Ingresa tu nombre de usuario.',
                confirmButton: "Ok",
                confirmButtonColor: "#FF4E4E"
            });
            return;
        } else {
            usernameInput.classList.remove('invalid');
        }

        // Validar Email
        if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
            emailInput.classList.add('invalid');
            Swal.fire({
                icon: 'error',
                title: 'Error en el correo electrónico.',
                text: 'Ingresa un correo electrónico válido.',
                confirmButton: "Ok",
                confirmButtonColor: "#FF4E4E"
            });
            return;
        } else {
            emailInput.classList.remove('invalid');
        }

        // Validar Cédula/DIMEX
        if (!idInput.value.trim()) {
            idInput.classList.add('invalid');
            Swal.fire({
                icon: 'error',
                title: 'Error en el campo de ID.',
                text: 'Ingresa tu cédula/DIMEX.',
                confirmButton: "Ok",
                confirmButtonColor: "#FF4E4E"
            });
            return;
        } else {
            idInput.classList.remove('invalid');
        }

        // Validar Fecha de Nacimiento
        if (!birthdateInput.value.trim() || !validateBirthdate(birthdateInput.value)) {
            birthdateInput.classList.add('invalid');
            Swal.fire({
                icon: 'error',
                title: 'Error en la fecha de nacimiento.',
                text: 'Ingresa una fecha de nacimiento válida en el formato DD/MM/AAAA.',
                confirmButton: "Ok",
                confirmButtonColor: "#FF4E4E"
            });
            return;
        } else {
            birthdateInput.classList.remove('invalid');
        }

        // Redirigir a otra página si todas las validaciones son correctas
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!.',
            text: 'Tu formulario ha sido enviado exitosamente.',
            confirmButton: "Ok",
            confirmButtonColor: "#96C78C"
        });
        limpiarCampos()
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validateBirthdate(date) {
        const re = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;
        if (!re.test(date)) {
            return false;
        }
        const parts = date.split('/');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Meses en JS son 0-11
        const year = parseInt(parts[2], 10);
        const dt = new Date(year, month, day);
        return (dt.getFullYear() === year && dt.getMonth() === month && dt.getDate() === day);
    }
});