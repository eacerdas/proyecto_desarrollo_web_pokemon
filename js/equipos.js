const formTeam = document.querySelector('#addteam_window');
const formFriend = document.querySelector('#addfriend_window');
const userNameTeam = document.querySelector('#team');
const userNameFriend = document.querySelector('#friend');
const buttonTeam = document.querySelector('#openTeamButton');
const closebuttonTeam = document.querySelector('#closeTeamButton');
const buttonFriend = document.querySelector('#openFriendButton');
const closebuttonFriend = document.querySelector('#closeFriendButton');

// Función para abrir la ventana emergente de equipos
function openTeamPopup() {
    let popUpWindow = document.querySelector('#teamWindow');
    console.log(popUpWindow);
    popUpWindow.style.display = 'flex'; // Cambiar a display flex
}

// Función para cerrar la ventana emergente de equipos
function closeTeamPopup() {
    userNameTeam.value = "";
    let popUpWindow = document.getElementById('teamWindow');
    popUpWindow.style.display = 'none'; // Ocultar la ventana emergente
}

// Función para abrir la ventana emergente de amistades
function openFriendPopup() {
    console.log('Abriendo ventana de amistad');
    let popUpWindow = document.getElementById('friendWindow');
    popUpWindow.style.display = 'flex'; // Cambiar a display flex
}

// Función para cerrar la ventana emergente de amistades
function closeFriendPopup() {
    userNameFriend.value = "";
    let popUpWindow = document.getElementById('friendWindow');
    popUpWindow.style.display = 'none'; // Ocultar la ventana emergente
}

function isAlphanN (str) {
    const regex = /^[a-zA-Z0-9 ]+$/;
    return regex.test(str);
}

formTeam.addEventListener('submit', function (event) {
    event.preventDefault();

    // Validaciones
    let isValid = true;
    let errorMessage = '';
    console.log(userNameTeam.value);
    console.log(isAlphanN(userNameFriend.value.trim()));

    // Validar Nombre amistad
    if (userNameFriend && isAlphanN(userNameFriend.value.trim())) {
        userNameFriend.classList.remove('invalid');
    } else {
        isValid = false;
        errorMessage += 'Ingresa tu nombre.\n';
        userNameFriend.classList.add('invalid');
    }

    if (isValid) {
        // Redirigir a otra página si todas las validaciones son correctas
        window.location.href = '#'; // Reemplazar con la URL deseada
    } else {
        alert(errorMessage);
    }
});


buttonTeam.addEventListener("click", openTeamPopup);
buttonFriend.addEventListener("click", openFriendPopup);
closebuttonTeam.addEventListener("click", closeTeamPopup);
closebuttonFriend.addEventListener("click", closeFriendPopup);


