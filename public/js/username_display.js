// Obtenemos el valor de "username" desde sessionStorage
const username = sessionStorage.getItem('username');

// Si existe un valor en sessionStorage, lo mostramos en lugar de "About us"
if (username) {
    document.getElementById('username-display').textContent = "Sesión iniciada como: " + username;
} else {
    // Si no hay usuario en sessionStorage, mostramos el botón de "Iniciar sesión"
    const usernameDisplay = document.getElementById('username-display');
    usernameDisplay.innerHTML = '<button id="login-button" class="login-link">Iniciar sesión</button>';
    
    // Agregamos la funcionalidad de redirigir a la pantalla de inicio de sesión
    document.getElementById('login-button').addEventListener('click', function() {
        window.location.href = 'landingPage.html';
    });
}


