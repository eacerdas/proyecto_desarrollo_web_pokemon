document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.querySelector('.play-button');
    const linkButton = document.querySelector('.link-button');
    const listButton = document.querySelector('.list-button');
    const pokemonList = document.querySelector('.pokemon-list');

    playButton.addEventListener('click', (event) => {
        const selectedTeam = document.querySelector('input[name="team"]:checked');
        const selectedPokemon = document.querySelectorAll('input[name="pokemon"]:checked');

        if (!selectedTeam) {
            alert('Por favor, selecciona un equipo antes de jugar.');
            event.preventDefault();
        } else if (selectedPokemon.length === 0) {
            alert('Por favor, selecciona al menos un Pokémon antes de jugar.');
            event.preventDefault();
        } else {
            // Redirigir a la nueva página cuando esté lista
            window.location.href = '#'; // Reemplazar con el URL real
        }
    });

    linkButton.addEventListener('click', () => {
        const link = '#'; // Reemplazar con el enlace real
        navigator.clipboard.writeText(link).then(() => {
            alert('El enlace ha sido copiado al portapapeles.');
        }).catch(err => {
            alert('Error al copiar el enlace: ', err);
        });
    });

    listButton.addEventListener('click', () => {
        // Aquí es donde se hará la solicitud a la API en el futuro
        fetchPokemonList();
    });
//Función para el backend en espera de este
    function fetchPokemonList() {
        // Simulación de la llamada a la API
        alert('Esta funcionalidad estará disponible próximamente.');

        // para el futuro, reemplazar esto con la llamada real a la API
        // fetch('URL_DE_LA_API_DE_POKEMON')
        //     .then(response => response.json())
        //     .then(data => {
        //         // Procesa los datos de la API y actualiza la lista de Pokémones
        //         updatePokemonList(data);
        //     })
        //     .catch(error => {
        //         console.error('Error al cargar la lista de Pokémones:', error);
        //     });
    }

    function updatePokemonList(data) {
        // Limpia la lista actual
        pokemonList.innerHTML = '';

        // Actualiza la lista con los datos de la API
        data.forEach(pokemon => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="checkbox" name="pokemon" value="${pokemon.name}"> ${pokemon.name}`;
            pokemonList.appendChild(label);
        });
    }
});
