const buttonDuel = document.getElementById('start-duel-button')

//Espera a que todo el contenido del DOM este cargado
document.addEventListener('DOMContentLoaded',()=>{
    fetchAllPokemon()//llenar cada uno de los selects
    document.getElementById('pokemon-select-1').addEventListener('change',(event)=>{
        //console.log(event.target.value);
        const pokemonSelected = event.target.value
        if(pokemonSelected){
            fetchPokemon(pokemonSelected,1)
        }
    })

    document.getElementById('pokemon-select-2').addEventListener('change',(event)=>{
        //console.log(event.target.value);
        const pokemonSelected = event.target.value
        if(pokemonSelected){
            fetchPokemon(pokemonSelected,2)
        }
    })

    buttonDuel.addEventListener('click',startDuel)
})


//funcion que recupera la informacion de TODOS los pokemones
//url: https://pokeapi.co/api/v2/pokemon?limit=151
async function fetchAllPokemon(){
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
    try{
        //solicitud GET al api
        const response = await axios.get(url)
        //console.log(response);
        const pokemonList = response.data.results//aca es donde se almacena los datos de los 151 pokemons
        //console.log(pokemonList);
        populateDropdownMenu(pokemonList,1)
        populateDropdownMenu(pokemonList,2)

    }catch(error){
        //manejo de errores
        console.log('Ocurrio el siguiente error: ',error);
    }
}

//Funcion para popular los selectores para cada pokemon
function populateDropdownMenu(pokemonList,containerId){
    //referenciar el select de forma dinamica
    const selectElement = document.getElementById(`pokemon-select-${containerId}`)
    //vamos a recorrer la lista donde estan los nombres de los pokemones
    pokemonList.forEach(pokemon=>{
        const option = document.createElement('option')
        option.value = pokemon.name
        option.textContent = capitalizeFirstLetter(pokemon.name)
        selectElement.appendChild(option)
    })

    
    
}

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1)
}

//funcion que devuelve la informacion de un pokemon seleccionado
//url:https://pokeapi.co/api/v2/pokemon/venusaur
async function fetchPokemon(name,containerId){
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    try {
        //realizar la consulta a la api
        const response = await axios.get(url)
        const pokemon = response.data
        //console.log(pokemon);
        displayPokemonInfo(pokemon,containerId)

    } catch (error) {
        console.log("Ocurrio el siguiente error: ",error);
        
    }
    
}

function displayPokemonInfo(pokemon, containerId) {
    const dataContainer = document.getElementById(`pokemon-info-${containerId}`);

    const hpstats = pokemon.stats.find(stat => stat.stat.name == 'hp');
    const hp = hpstats ? hpstats.base_stat : 100;

    const attacks = pokemon.moves.slice(0, 4).map(moveInfo => ({
        name: moveInfo.move.name,
        power: moveInfo.move.power || 50
    }));

    // Almacenar la vida máxima como atributo data
    dataContainer.dataset.maxHp = hp;
    dataContainer.dataset.hp = hp;

    dataContainer.innerHTML = `
    <h2>Informacion de Pokemon: ${capitalizeFirstLetter(pokemon.name)}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p><strong>Height: </strong>${pokemon.height}dm</p>
    <p><strong>Weight: </strong>${pokemon.weight} g</p>
    <p><strong>Type: </strong>${pokemon.types.map(typeInfo => typeInfo.type.name).join(' ')}</p>
    <p><strong>Abilities: </strong>${pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(' ')}</p>
    <p><strong>Bases Stats: </strong></p>
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

    if (attackPokemon1.length == 0 || attackPokemon2.length == 0) {
        Swal.fire({
            icon: 'error',
            text: 'Seleccione primero un pokemon'
        });
        return;
    }

    const attack1 = attackPokemon1[Math.floor(Math.random() * attackPokemon1.length)];
    const attack2 = attackPokemon2[Math.floor(Math.random() * attackPokemon2.length)];

    hp1 = Math.max(hp1 - attack2.power, 0);  // No permitir que hp sea menor que 0
    hp2 = Math.max(hp2 - attack1.power, 0);  // No permitir que hp sea menor que 0

    hp1Element.textContent = hp1;
    hp2Element.textContent = hp2;

    dataContainer1.dataset.hp = hp1;
    dataContainer2.dataset.hp = hp2;

    const hp1Percentage = (hp1 / maxHp1) * 100;
    const hp2Percentage = (hp2 / maxHp2) * 100;

    healthBar1.style.width = `${hp1Percentage}%`;
    healthBar2.style.width = `${hp2Percentage}%`;

    Swal.fire({
        icon: 'info',
        title: 'Resultado del duelo',
        html: `
            <p>Pokemon 1 atacó con: ${attack1.name} y causó ${attack1.power} de daño</p>
            <p>Pokemon 2 atacó con: ${attack2.name} y causó ${attack2.power} de daño</p>
        `
    });
}




