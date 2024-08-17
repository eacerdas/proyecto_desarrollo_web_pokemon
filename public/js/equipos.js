'use strict';
let isEdit = false;
let teamToEdit = null;
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
const memberDropdown = document.querySelector('#teamMember');
const currentUserName = sessionStorage.getItem("nombre");

function disableCreateButton(state) {
    buttonTeam.disabled = state;
    buttonFriend.disabled = state;
}

// Función para abrir la ventana emergente de equipos
function openTeamPopup() {
    let popUpWindow = document.querySelector('#teamWindow');
    disableCreateButton(true);
    popUpWindow.style.display = 'flex';
    if (isEdit) {
        memberDropdown.style.visibility = "hidden";
    }
}

// Función para cerrar la ventana emergente de equipos
function closeTeamPopup() {
    userNameTeam.value = "";
    isEdit = false;
    teamToEdit = null;
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

// Gestión de equipos
formTeam.addEventListener('submit', async function (event) {
    event.preventDefault();
    let errorMessage = "";

    let isValid = true;

    if (userNameTeam && isAlphanN(userNameTeam.value.trim())) {
        userNameTeam.classList.remove('invalid');
    } else {
        isValid = false;
        userNameTeam.classList.add('invalid');
        errorMessage = "Nombre inválido, ingresa tu nombre sin caracteres especiales.";
    }

    if (memberDropdown.value == "empty" && !isEdit) {
        isValid = false;
        errorMessage = errorMessage.length == 0 ?"": errorMessage.concat(" ");
        errorMessage = errorMessage.concat("El campo de seleccione amistad es requerido.");
    }

    if (isValid) {
        const teamName = userNameTeam.value.trim();
        if (isEdit && teamToEdit != null){
            try {
                await modificarEquipo(teamName,teamToEdit.usuario1, teamToEdit.usuario2, teamToEdit.id); // AQUI CAMBIAR "jugador1" por la constante que trae el id del usuario registrado
                userNameTeam.value = "";
                closeTeamPopup();
                mostrarAlerta("¡Enhorabuena!", "Equipo modificado correctamente", "success", "Ok", "#96C78C");
            } catch (error) {
                mostrarAlerta("Error", "No se pudo modificar el equipo", "error", "Ok", "#FF4E4E");
            }
        }
        else {
            const teamOption = memberDropdown.value;
            try {
                await registrar_equipo(teamName,currentUserName??"Jugador 1", teamOption); // Reemplaza con la lógica de registrar equipo
                userNameTeam.value = "";
                memberDropdown.value ="";
                closeTeamPopup();
                mostrarAlerta("¡Enhorabuena!", "Equipo agregado correctamente", "success", "Ok", "#96C78C");
            } catch (error) {
                mostrarAlerta("Error", "No se pudo agregar el equipo", "error", "Ok", "#FF4E4E");
            }
        }
    } else {
        mostrarAlerta("Error", errorMessage, "error", "Ok", "#FF4E4E");
    }
});

// Gestión de amistades
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


// Carga de amigos y equipos
document.addEventListener('DOMContentLoaded', async () => {
    // carga de equipos
    try {
        const equipos = await listar_equipos(); // Reemplaza con la lógica de listar equipos
        equipos.forEach(equipo => {
            const newTeam = document.createElement("li");
            newTeam.dataset.id = equipo._id;
            
            const contentLabel = document.createElement("div");
            contentLabel.classList.add("contentLabel");
            const versusPlayer = document.createElement("span");
            const teamNameSpan = document.createElement("span");
            
            teamNameSpan.textContent = equipo.nombreEquipo;
            versusPlayer.innerHTML = `${equipo.usuario1} <b>vs</b> ${equipo.usuario2}`;

            contentLabel.appendChild(teamNameSpan);
            contentLabel.appendChild(versusPlayer);

            const actionContainer = document.createElement("div");
            actionContainer.classList.add("actionContainer");

            // boton de eliminar
            const deleteButton = document.createElement("button");
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', async function () {
                await eliminarEquipo(newTeam.dataset.id); // Reemplaza con la lógica de eliminar equipo
                newTeam.remove();
                mostrarAlerta("¡Listo!", "Equipo borrado con éxito", "success", "Ok", "#96C78C");
            });
            
            // boton de editar
            const editButton = document.createElement("button");
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', function () {
                isEdit =true;
                teamToEdit = {id:newTeam.dataset.id,nombreEquipo: equipo.nombreEquipo, usuario1: equipo.usuario1, usuario2: equipo.usuario2}; //EN ESTA CAMBIAR usuario1: POR EL USUARIO DEL JUEGO
                openTeamPopup();
            });

            actionContainer.appendChild(editButton);
            actionContainer.appendChild(deleteButton);

            newTeam.appendChild(contentLabel);
            newTeam.appendChild(actionContainer);
            teamList.appendChild(newTeam);
        });
    } catch (error) {
        mostrarAlerta("Error", "No se pudieron cargar los equipos", "error", "Ok", "#FF4E4E");
    }

    // carga de amigos
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
                mostrarAlerta("¡Listo!", "Amigo borrado con éxito", "success", "Ok", "#96C78C");
            });

            const option = document.createElement("option");
            option.text = amigo.usuario2;
            option.value = amigo.usuario2; //preguntar a Edward si hacemos directamente con el ID para poder hacer la relación, habría que cambiar el modelo de equipos para que venga anidado la info dle usuario 1 y 2
            memberDropdown.appendChild(option);
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
