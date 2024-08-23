const buttonDuel = document.getElementById('start-duel-button')
const modoInvitadoFlag = localStorage.getItem("modoInvitado");

// Espera a que todo el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Leer el nombre del jugador 1 desde el session storage
    const nombreJugador1 = sessionStorage.getItem('nombre');
    // Leer el nombre del jugador 2 desde el local storage
    const nombreJugador2 = localStorage.getItem('usuario2');

    // Asignar los nombres a los elementos correspondientes en el HTML
    document.getElementById('nombre-jugador-1').textContent = nombreJugador1 || 'Desconocido';
    document.getElementById('nombre-jugador-2').textContent = nombreJugador2 || 'Desconocido';

    fetchAllPokemon(); // Llenar cada uno de los selects
    document.getElementById('pokemon-select-1').addEventListener('change', (event) => {
        const pokemonSelected = event.target.value;
        if (pokemonSelected) {
            fetchPokemon(pokemonSelected, 1);
        }
    });

    document.getElementById('pokemon-select-2').addEventListener('change', (event) => {
        const pokemonSelected = event.target.value;
        if (pokemonSelected) {
            fetchPokemon(pokemonSelected, 2);
        }
    });

    buttonDuel.addEventListener('click', startDuel);
});

// Función que recupera la información de TODOS los pokemones
async function fetchAllPokemon() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
    try {
        const response = await axios.get(url)
        const pokemonList = response.data.results
        populateDropdownMenu(pokemonList, 1)
        populateDropdownMenu(pokemonList, 2)

    } catch (error) {
        console.log('Ocurrió el siguiente error: ', error);
    }
}

// Función para popular los selectores para cada pokemon
function populateDropdownMenu(pokemonList, containerId) {
    const selectElement = document.getElementById(`pokemon-select-${containerId}`)
    pokemonList.forEach(pokemon => {
        const option = document.createElement('option')
        option.value = pokemon.name
        option.textContent = capitalizeFirstLetter(pokemon.name)
        selectElement.appendChild(option)
    })
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

// Función que devuelve la información de un Pokémon seleccionado
async function fetchPokemon(name, containerId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    try {
        const response = await axios.get(url);
        const pokemon = response.data;

        // Obtener los primeros 4 movimientos y sus poderes
        const moves = pokemon.moves.slice(0, 4);
        const attacks = await Promise.all(moves.map(async (moveInfo) => {
            const moveResponse = await axios.get(moveInfo.move.url);
            const power = moveResponse.data.power/5 || 0; // Si el poder es null, asigna 10 como valor predeterminado
            return {
                name: moveInfo.move.name,
                power: power
            };
        }));

        displayPokemonInfo(pokemon, attacks, containerId);

    } catch (error) {
        console.log("Ocurrió el siguiente error: ", error);
    }
}

function displayPokemonInfo(pokemon, attacks, containerId) {
    const dataContainer = document.getElementById(`pokemon-info-${containerId}`);

    const hpstats = pokemon.stats.find(stat => stat.stat.name == 'hp');
    const hp = hpstats ? hpstats.base_stat : 100;

    // Almacenar la vida máxima como atributo data
    dataContainer.dataset.maxHp = hp;
    dataContainer.dataset.hp = hp;

    dataContainer.innerHTML = `
    <h2>Información de Pokémon: ${capitalizeFirstLetter(pokemon.name)}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p><strong>Height: </strong>${pokemon.height} dm</p>
    <p><strong>Weight: </strong>${pokemon.weight} g</p>
    <p><strong>Type: </strong>${pokemon.types.map(typeInfo => typeInfo.type.name).join(' ')}</p>
    <p><strong>Abilities: </strong>${pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(' ')}</p>
    <p><strong>Base Stats: </strong></p>
    <ul>
        ${pokemon.stats.map(statInfo => `<li>${statInfo.stat.name}: ${statInfo.base_stat}</li>`).join('')}
    </ul>
    <p><strong>Moves: </strong></p>
    <div class="attacks-container">
        ${attacks.map(attack => `
        <div class="attack">
            <p>${capitalizeFirstLetter(attack.name)}</p>
            <p>Power: ${attack.power}</p>
        </div>`).join('')}
    </div>
    <p><strong>HP:</strong> <span id="hp-${containerId}">${hp}</span></p>
    <div class="health-bar-container">
        <div class="health-bar" id="health-bar-${containerId}" style="width: 100%;"></div>
    </div>
    `;

    dataContainer.dataset.attacks = JSON.stringify(attacks);
}

function startDuel() {
    const hp1Element = document.getElementById('hp-1');
    const hp2Element = document.getElementById('hp-2');

    const healthBar1 = document.getElementById('health-bar-1');
    const healthBar2 = document.getElementById('health-bar-2');

    const dataContainer1 = document.getElementById('pokemon-info-1');
    const dataContainer2 = document.getElementById('pokemon-info-2');

    let hp1 = parseInt(dataContainer1.dataset.hp);
    let hp2 = parseInt(dataContainer2.dataset.hp);

    const maxHp1 = parseInt(dataContainer1.dataset.maxHp);
    const maxHp2 = parseInt(dataContainer2.dataset.maxHp);

    const attackPokemon1 = JSON.parse(dataContainer1.dataset.attacks || '[]');
    const attackPokemon2 = JSON.parse(dataContainer2.dataset.attacks || '[]');

    if (attackPokemon1.length === 0 || attackPokemon2.length === 0) {
        Swal.fire({
            icon: 'error',
            text: 'Seleccione primero un Pokémon',
            confirmButtonText: "Ok",
            confirmButtonColor: "#FF4E4E"
        });
        return;
    }

    const attack1 = attackPokemon1[Math.floor(Math.random() * attackPokemon1.length)];
    const attack2 = attackPokemon2[Math.floor(Math.random() * attackPokemon2.length)];

    hp1 = Math.max(hp1 - attack2.power, 0);
    hp2 = Math.max(hp2 - attack1.power, 0);

    hp1Element.textContent = hp1;
    hp2Element.textContent = hp2;

    dataContainer1.dataset.hp = hp1;
    dataContainer2.dataset.hp = hp2;

    const hp1Percentage = (hp1 / maxHp1) * 100;
    const hp2Percentage = (hp2 / maxHp2) * 100;

    healthBar1.style.width = `${hp1Percentage}%`;
    healthBar2.style.width = `${hp2Percentage}%`;

    let ganador;
    let empate = false;

    if (hp1 === 0 && hp2 === 0) {
        ganador = 'Empate';
        empate = true;
        Swal.fire({
            icon: 'info',
            title: '¡Empate!',
            text: 'Ambos Pokémon han sido derrotados',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: "#3FC3EE"
        }).then(() => {
            disableDuelButton();
            showNewGameButton();
            registrarResultado(dataContainer1, dataContainer2, ganador, empate, modoInvitadoFlag);
        });
    } else if (hp1 === 0 || hp2 === 0) {
        ganador = hp1 > hp2 ? 'Pokémon 1' : 'Pokémon 2';
        Swal.fire({
            icon: 'success',
            title: '¡Batalla terminada!',
            text: `${ganador} ha ganado la batalla`,
            confirmButtonColor: "#96C78C",
            confirmButtonText: 'Aceptar'
        }).then(() => {
            disableDuelButton();
            showNewGameButton();
            registrarResultado(dataContainer1, dataContainer2, ganador, empate, modoInvitadoFlag);
        });
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Resultado del turno',
            confirmButtonText: "Ok",
            confirmButtonColor: "#3FC3EE",

            html: `
                <p>Pokémon 1 atacó con: ${attack1.name} y causó ${attack1.power} de daño</p>
                <p>Pokémon 2 atacó con: ${attack2.name} y causó ${attack2.power} de daño</p>
            `
        });
    }
}

function registrarResultado(dataContainer1, dataContainer2, ganador, empate, modoInvitadoFlag) {

    if(modoInvitadoFlag == "true"){
        Swal.fire({
            icon: 'success',
            title: '¡Recuerda!',
            text: 'El resultado no se guarda debido al modo invitado.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: "#96C78C",
        });
    } 
    else if (modoInvitadoFlag == "false"){
        const jugador1 = sessionStorage.getItem('nombre'); 
        const jugador2 = localStorage.getItem('usuario2');
        const pokemon1 = dataContainer1.querySelector('h2').textContent.split(': ')[1];
        const pokemon2 = dataContainer2.querySelector('h2').textContent.split(': ')[1];

        registrar_resultado(jugador1, jugador2, pokemon1, pokemon2, ganador, empate);
    }
}

function disableDuelButton() {
    buttonDuel.disabled = true;
    buttonDuel.style.backgroundColor = '#aaa';
    buttonDuel.style.cursor = 'not-allowed';
}

function showNewGameButton() {
    const newGameButton = document.createElement('button');
    newGameButton.textContent = 'Nueva Partida';
    newGameButton.style.fontWeight = 'bold';
    newGameButton.style.backgroundColor = '#da3335';
    newGameButton.style.color = 'white';
    newGameButton.style.fontSize = '24px';
    newGameButton.style.padding = '15px 30px';
    newGameButton.style.border = 'none';
    newGameButton.style.borderRadius = '10px';
    newGameButton.style.cursor = 'pointer';
    newGameButton.style.marginTop = '20px';

    newGameButton.addEventListener('click', () => {
        location.reload(); // Recargar la página para comenzar una nueva partida
    });

    document.querySelector('.duel-container').appendChild(newGameButton);
}
