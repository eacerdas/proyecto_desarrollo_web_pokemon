'use strict';
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

function disableCreateButton (state) {
    buttonTeam.disabled = state;
    buttonFriend.disabled = state;
}

// Función para abrir la ventana emergente de equipos
function openTeamPopup() {
    let popUpWindow = document.querySelector('#teamWindow');
    disableCreateButton(true);
    popUpWindow.style.display = 'flex'; // Cambiar a display flex
}

// Función para cerrar la ventana emergente de equipos
function closeTeamPopup() {
    userNameTeam.value = "";
    let popUpWindow = document.getElementById('teamWindow');
    disableCreateButton(false);
    popUpWindow.style.display = 'none'; // Ocultar la ventana emergente
}

// Función para abrir la ventana emergente de amistades
function openFriendPopup() {
    let popUpWindow = document.getElementById('friendWindow');
    disableCreateButton(true);
    popUpWindow.style.display = 'flex'; // Cambiar a display flex
}

// Función para cerrar la ventana emergente de amistades
function closeFriendPopup() {
    userNameFriend.value = "";
    let popUpWindow = document.getElementById('friendWindow');
    disableCreateButton(false);
    popUpWindow.style.display = 'none'; // Ocultar la ventana emergente
}

function isAlphanN(str) {
    const regex = /^[a-zA-Z0-9ñÑ ]+$/;
    return regex.test(str);
}

function deleteTeam(element) {
    // Remover el elemento de lista (li) del DOM
    element.remove();
}

function mostrarAlerta(title, message, icon, confirmButtonText, messagecolor) {
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        confirmButtonText: confirmButtonText,
        confirmButtonColor: messagecolor
    });
}

formTeam.addEventListener('submit', function (event) {
    event.preventDefault();

    // Validaciones
    let isValid = true;
    let errorMessage = '';
    console.log(userNameTeam.value);
    console.log(isAlphanN(userNameTeam.value.trim()));

    // Validar Nombre equipo
    if (userNameTeam && isAlphanN(userNameTeam.value.trim())) {
        userNameTeam.classList.remove('invalid');
    } else {
        isValid = false;
        userNameTeam.classList.add('invalid');
    }

    if (isValid) {
        // Redirigir a otra página si todas las validaciones son correctas
        window.location.href = '#'; // Reemplazar con la URL deseada
        const newTeam = document.createElement("li");
        newTeam.textContent = userNameTeam.value;
        teamList.appendChild(newTeam);

        // Crear el botón de eliminar
        const deleteButton = document.createElement("button");
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', function () {
            deleteTeam(newTeam); // Llama a la función deleteTeam pasando el elemento a eliminar
            mostrarAlerta("¡Listo!", "Se ha borrado con éxito\n", "Exitoso", "Ok", "#96C78C");
        });

        // Agregar el botón de eliminar al elemento de lista
        newTeam.appendChild(deleteButton);

        // Agregar el nuevo elemento de lista a teamList
        teamList.appendChild(newTeam);

        // Limpiar el campo de nombre de equipo y cerrar la ventana emergente
        userNameTeam.value = "";
        closeTeamPopup();
        mostrarAlerta("¡Enhorabuena!", "Nombre agregado a la lista\n", "Error", "Ok", "#96C78C");
    } else {
        mostrarAlerta("Error", "Nombre inválido, ingresa tu nombre sin caracteres especiales\n", "Error", "Ok", "#FF4E4E");
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

        // Crear el botón de eliminar
        const deleteButton = document.createElement("button");
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', function () {
            deleteTeam(newFriend); // Llama a la función deleteTeam pasando el elemento a eliminar
            mostrarAlerta("¡Listo!", "Se ha borrado con éxito\n", "Exitoso", "Ok", "#96C78C");
        });

        // Agregar el botón de eliminar al elemento de lista
        newFriend.appendChild(deleteButton);

        // Agregar el nuevo elemento de lista a teamList
        friendList.appendChild(newFriend);

        // Limpiar el campo de nombre de equipo y cerrar la ventana emergente
        userNameFriend.value = "";
        closeFriendPopup();
        mostrarAlerta("¡Enhorabuena!", "Nombre agregado a la lista\n", "Exitoso", "Ok", "#96C78C");
    } else {
        mostrarAlerta("Error", "Nombre inválido, ingresa tu nombre sin caracteres especiales\n", "Error", "Ok", "#FF4E4E");
    }
});


buttonTeam.addEventListener("click", openTeamPopup);
buttonFriend.addEventListener("click", openFriendPopup);
closebuttonTeam.addEventListener("click", closeTeamPopup);
closebuttonFriend.addEventListener("click", closeFriendPopup);


