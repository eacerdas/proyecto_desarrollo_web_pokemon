document.addEventListener('DOMContentLoaded', async () => {
    const playButton = document.querySelector('.play-button');
    const linkButton = document.querySelector('.link-button');
    const listButton = document.querySelector('.list-button');
    const equiposContainer = document.querySelector('.team-list');
    const currentUserName = sessionStorage.getItem("nombre");

    if (!equiposContainer) {
        console.error("No se encontró el contenedor de la lista de equipos.");
        return;
    }

    try {
        const equipos = await listar_equipos();

        if (equipos.length > 0) {
            equiposContainer.innerHTML = ''; 

            equipos.forEach((equipo, index) => {
                if (equipo.usuario1 != currentUserName && equipo.usuario2 != currentUserName){
                    return;
                }
                const equipoElement = document.createElement('div');
                equipoElement.className = 'equipo-item';

                const checkbox = document.createElement('input');
                checkbox.type = 'radio'; // Usamos radio en lugar de checkbox para seleccionar solo uno
                checkbox.name = 'equipo-seleccionado'; // Todos los radios deben tener el mismo nombre
                checkbox.value = equipo.usuario2; // Aquí dejamos que el valor sea el nombre del usuario contra el que vamos a jugar
                checkbox.id = `equipo-${index}`;

                const label = document.createElement('label');
                label.setAttribute('for', `equipo-${index}`);
                label.textContent = `${equipo.nombreEquipo} (${equipo.usuario2})`; // Aquí hacemos que se muestre el nombre del equipo

                equipoElement.appendChild(checkbox);
                equipoElement.appendChild(label);

                equiposContainer.appendChild(equipoElement);
            });
        } else {
            equiposContainer.innerHTML = '<p>Lista de equipos vacía</p>';
        }
    } catch (error) {
        equiposContainer.innerHTML = '<p>Error al cargar la lista de equipos</p>';
        console.error("Error cargando equipos:", error);
    }

    playButton?.addEventListener('click', () => {
        const selectedEquipo = document.querySelector('input[name="equipo-seleccionado"]:checked');
        
        if (selectedEquipo) {
            const usuario2 = selectedEquipo.value;
            localStorage.setItem('usuario2', usuario2); // Guardamos usuario2 en el localStorage
            window.location.href = 'batalla.html'; // Redirigir a la página de batalla
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Equipo no seleccionado',
                text: 'Por favor selecciona un equipo antes de jugar.',
                confirmButtonColor: "#96C78C"
            });
        }
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

