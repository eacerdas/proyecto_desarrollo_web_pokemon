const formTeam = document.querySelector('#addteam_window');
const formFriend = document.querySelector('#addfriend_window');
const userNameTeam = document.querySelector('#team');
const userNameFriend = document.querySelector('#friend');
const buttonTeam = document.querySelector('#openTeamButton');
const closebuttonTeam = document.querySelector('#closeTeamButton');
const buttonFriend = document.querySelector('#openFriendButton');
const closebuttonFriend = document.querySelector('#closeFriendButton');
const teamList = document.querySelector('#teamList');
const friendList = document.querySelector('#friendList');

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
    console.log(isAlphanN(userNameTeam.value.trim()));

    // Validar Nombre amistad
    if (userNameTeam && isAlphanN(userNameTeam.value.trim())) {
        userNameTeam.classList.remove('invalid');
    } else {
        isValid = false;
        errorMessage += 'Ingresa tu nombre.\n';
        userNameTeam.classList.add('invalid');
    }

    if (isValid) {
        // Redirigir a otra página si todas las validaciones son correctas
        window.location.href = '#'; // Reemplazar con la URL deseada
        const newTeam = document.createElement("li");
        newTeam.textContent = userNameTeam.value;
        teamList.appendChild(newTeam);
        closeTeamPopup();
    } else {
        alert(errorMessage);
    }
});

formFriend.addEventListener('submit', function (event) {
    event.preventDefault();

    // Validaciones
    let isValid = true;
    let errorMessage = '';
    console.log(userNameFriend.value);
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
        const newFriend = document.createElement("li");
        newFriend.textContent = userNameFriend.value;
        friendList.appendChild(newFriend);
        closeFriendPopup();
    } else {
        alert(errorMessage);
    }
});


buttonTeam.addEventListener("click", openTeamPopup);
buttonFriend.addEventListener("click", openFriendPopup);
closebuttonTeam.addEventListener("click", closeTeamPopup);
closebuttonFriend.addEventListener("click", closeFriendPopup);

