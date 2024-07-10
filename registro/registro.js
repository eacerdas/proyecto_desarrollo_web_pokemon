document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.registration-container form');
    const nameInput = form.querySelector('input[name="nombre"]');
    const surnameInput = form.querySelector('input[name="apellido"]');
    const usernameInput = form.querySelector('input[name="username"]');
    const emailInput = form.querySelector('input[type="email"]');
    const cedulaInput = form.querySelector('input[name="cedula"]');
    const birthdateInput = form.querySelector('input[name="birthdate"]');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Validaciones
        let isValid = true;
        let errorMessage = '';

        // Validar Nombre
        if (!nameInput.value.trim()) {
            isValid = false;
            nameInput.classList.add('invalid');
            errorMessage += 'Ingresa tu nombre.\n';
        } else {
            nameInput.classList.remove('invalid');
        }

        // Validar Apellido
        if (!surnameInput.value.trim()) {
            isValid = false;
            surnameInput.classList.add('invalid');
            errorMessage += 'Ingresa tu apellido.\n';
        } else {
            surnameInput.classList.remove('invalid');
        }

        // Validar Nombre de Usuario
        if (!usernameInput.value.trim()) {
            isValid = false;
            usernameInput.classList.add('invalid');
            errorMessage += 'Ingresa tu nombre de usuario.\n';
        } else {
            usernameInput.classList.remove('invalid');
        }

        // Validar Email
        if (!validateEmail(emailInput.value)) {
            isValid = false;
            emailInput.classList.add('invalid');
            errorMessage += 'Ingresa un correo electrónico válido.\n';
        } else {
            emailInput.classList.remove('invalid');
        }

        // Validar Cédula/DIMEX
        if (!cedulaInput.value.trim()) {
            isValid = false;
            cedulaInput.classList.add('invalid');
            errorMessage += 'Ingresa tu cédula/DIMEX.\n';
        } else {
            cedulaInput.classList.remove('invalid');
        }

        // Validar Fecha de Nacimiento
        if (!validateBirthdate(birthdateInput.value)) {
            isValid = false;
            birthdateInput.classList.add('invalid');
            errorMessage += 'Ingresa una fecha de nacimiento válida en el formato DD/MM/AAAA.\n';
        } else {
            birthdateInput.classList.remove('invalid');
        }

        if (isValid) {
            // Redirigir a otra página si todas las validaciones son correctas
            window.location.href = '#'; // Reemplazar con la URL deseada
        } else {
            alert(errorMessage);
        }
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
        const month = parseInt(parts[1], 10) - 1; 
        const year = parseInt(parts[2], 10);
        const dt = new Date(year, month, day);
        return (dt.getFullYear() === year && dt.getMonth() === month && dt.getDate() === day);
    }
});

