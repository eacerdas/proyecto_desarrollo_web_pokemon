document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.querySelector('.play-button');
    const linkButton = document.querySelector('.link-button');
    const listButton = document.querySelector('.list-button');
   

    playButton.addEventListener('click', () => {
        
        window.location.href = 'batalla.html'; // para la pagina de juego
    });

    linkButton.addEventListener('click', () => {
        const link = '#'; //link para el invitado
        navigator.clipboard.writeText(link).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Enlace copiado',
                text: 'El enlace ha sido copiado al portapapeles.',
                confirmButton: "Ok",
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

    listButton.addEventListener('click', () => {
        fetchPokemonList();
    });

    function fetchPokemonList() {
        // para simular la llamada del API
        Swal.fire({
            icon: 'info',
            title: 'API de Pokémon',
            text: 'Esta funcionalidad estará disponible próximamente.',
            confirmButton: "Ok",
            confirmButtonColor: "#8CB7C7"
        });
        
    }

});