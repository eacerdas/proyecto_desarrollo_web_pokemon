document.addEventListener('DOMContentLoaded', async () => {
    const playButton = document.querySelector('.play-button');
    const linkButton = document.querySelector('.link-button');
    const listButton = document.querySelector('.list-button');
    const amigosContainer = document.querySelector('.team-list');

    if (!amigosContainer) {
        console.error("No se encontró el contenedor de la lista de amigos.");
        return;
    }

    try {
        const amigos = await listar_amigos();

        if (amigos.length > 0) {
            amigosContainer.innerHTML = ''; 

            amigos.forEach((amigo, index) => {
                const amigoElement = document.createElement('div');
                amigoElement.className = 'amigo-item';

                const checkbox = document.createElement('input');
                checkbox.type = 'radio'; // Usamos radio en lugar de checkbox para seleccionar solo uno
                checkbox.name = 'amigo-seleccionado'; // Todos los radios deben tener el mismo nombre
                checkbox.value = amigo.usuario2;
                checkbox.id = `amigo-${index}`;

                const label = document.createElement('label');
                label.setAttribute('for', `amigo-${index}`);
                label.textContent = amigo.usuario2;

                amigoElement.appendChild(checkbox);
                amigoElement.appendChild(label);

                amigosContainer.appendChild(amigoElement);
            });
        } else {
            amigosContainer.innerHTML = '<p>Lista de equipos vacía</p>';
        }
    } catch (error) {
        amigosContainer.innerHTML = '<p>Error al cargar la lista de amigos</p>';
        console.error("Error cargando amigos:", error);
    }

    playButton?.addEventListener('click', () => {
        window.location.href = 'batalla.html'; 
    });

    linkButton?.addEventListener('click', () => {
        const link = '#'; 
        navigator.clipboard.writeText(link).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Enlace copiado',
                text: 'El enlace ha sido copiado al portapapeles.',
                confirmButtonColor: "#96C78C"
            });
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al copiar el enlace: ' + err
            });
        });
    });

    listButton?.addEventListener('click', () => {
        fetchPokemonList();
    });

    function fetchPokemonList() {
        Swal.fire({
            icon: 'info',
            title: 'API de Pokémon',
            text: 'Esta funcionalidad estará disponible próximamente.',
            confirmButtonColor: "#8CB7C7"
        });
    }
});

