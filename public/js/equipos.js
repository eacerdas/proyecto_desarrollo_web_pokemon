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

function disableCreateButton(state) {
    buttonTeam.disabled = state;
    buttonFriend.disabled = state;
}

// Función para abrir la ventana emergente de equipos
function openTeamPopup() {
    let popUpWindow = document.querySelector('#teamWindow');
    disableCreateButton(true);
    popUpWindow.style.display = 'flex';
}

// Función para cerrar la ventana emergente de equipos
function closeTeamPopup() {
    userNameTeam.value = "";
    let popUpWindow = document.getElementById('teamWindow');
    disableCreateButton(false);
    popUpWindow.style.display = 'none';
}

// Función para abrir la ventana emergente de amistades
function openFriendPopup() {
    let popUpWindow = document.getElementById('friendWindow');
    disableCreateButton(true);
    popUpWindow.style.display = 'flex';
}

// Función para cerrar la ventana emergente de amistades
function closeFriendPopup() {
    userNameFriend.value = "";
    let popUpWindow = document.getElementById('friendWindow');
    disableCreateButton(false);
    popUpWindow.style.display = 'none';
}

function isAlphanN(str) {
    const regex = /^[a-zA-Z0-9ñÑ ]+$/;
    return regex.test(str);
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

    let isValid = true;

    if (userNameTeam && isAlphanN(userNameTeam.value.trim())) {
        userNameTeam.classList.remove('invalid');
    } else {
        isValid = false;
        userNameTeam.classList.add('invalid');
    }

    if (isValid) {
        // Código relacionado con la gestión de equipos
        userNameTeam.value = "";
        closeTeamPopup();
        mostrarAlerta("¡Enhorabuena!", "Equipo agregado correctamente", "success", "Ok", "#96C78C");
    } else {
        mostrarAlerta("Error", "Nombre inválido, ingresa tu nombre sin caracteres especiales", "error", "Ok", "#FF4E4E");
    }
});

formFriend.addEventListener('submit', async function (event) {
    event.preventDefault();

    let isValid = true;

    if (userNameFriend && isAlphanN(userNameFriend.value.trim())) {
        userNameFriend.classList.remove('invalid');
    } else {
        isValid = false;
        userNameFriend.classList.add('invalid');
    }

    if (isValid) {
        const friendName = userNameFriend.value.trim();
        try {
            await registrar_amigo("Jugador1", friendName);

            userNameFriend.value = "";
            closeFriendPopup();
            mostrarAlerta("¡Enhorabuena!", "Amigo agregado correctamente", "success", "Ok", "#96C78C");
        } catch (error) {
            mostrarAlerta("Error", "No se pudo agregar el amigo", "error", "Ok", "#FF4E4E");
        }
    } else {
        mostrarAlerta("Error", "Nombre inválido, ingresa tu nombre sin caracteres especiales", "error", "Ok", "#FF4E4E");
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const amigos = await listar_amigos();
        amigos.forEach(amigo => {
            const newFriend = document.createElement("li");
            newFriend.textContent = amigo.usuario2;
            newFriend.dataset.id = amigo._id;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', async function () {
                await eliminarAmigo(newFriend.dataset.id);
                newFriend.remove();
                mostrarAlerta("¡Listo!", "Se ha borrado con éxito", "success", "Ok", "#96C78C");
            });

            newFriend.appendChild(deleteButton);
            friendList.appendChild(newFriend);
        });
    } catch (error) {
        mostrarAlerta("Error", "No se pudieron cargar los amigos", "error", "Ok", "#FF4E4E");
    }
});

buttonTeam.addEventListener("click", openTeamPopup);
buttonFriend.addEventListener("click", openFriendPopup);
closebuttonTeam.addEventListener("click", closeTeamPopup);
closebuttonFriend.addEventListener("click", closeFriendPopup);
