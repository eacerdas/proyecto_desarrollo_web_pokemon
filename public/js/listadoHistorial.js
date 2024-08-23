const cuerpoTabla = document.querySelector("#tabla-historial tbody");
const currentUserName = sessionStorage.getItem("nombre");

let lista_historial_recuperado = [];

// Función para determinar el resultado del duelo 
const determinarResultado = (ganador) => {
    if (ganador === 'Pokémon 1') {
        return 'Victoria';
    } else if (ganador === 'Pokémon 2') {
        return 'Derrota';
    } else if (ganador === 'Empate') {
        return 'Empate';
    } else {
        return 'Desconocido'; // Para cualquier caso inesperado
    }
};

// Función para mostrar los datos en la tabla
const mostrar_datos_en_tabla = async () => {
    lista_historial_recuperado = await listar_resultados();

    // Variables para las estadísticas
    let total_jugadas = 0;
    let total_ganadas = 0;
    let total_perdidas = 0;
    let total_empatadas = 0;
    let pokemon_usado = {};

    // Limpiar tabla
    cuerpoTabla.innerHTML = "";

    // Mostrar los datos en la tabla
    for (let i = 0; i < lista_historial_recuperado.length; i++) {
        const resultado = lista_historial_recuperado[i];
        
        const jugador1 = resultado['jugador1'];
        const jugador2 = resultado['jugador2'];

        if (jugador1 != currentUserName && jugador2 != currentUserName){
            continue;
        }

        total_jugadas++;
        
        const pokemon1 = resultado['pokemon1'];
        const pokemon2 = resultado['pokemon2'];
        const ganador = resultado['ganador'];

        // Contabilizar estadísticas
        if (ganador === 'Pokémon 1') {
            total_ganadas++;
        } else if (ganador === 'Pokémon 2') {
            total_perdidas++;
        } else if (ganador === 'Empate') {
            total_empatadas++;
        }

        // Contabilizar Pokémon más utilizado
        pokemon_usado[pokemon1] = (pokemon_usado[pokemon1] || 0) + 1;

        let fila = cuerpoTabla.insertRow();
        fila.insertCell().innerHTML = jugador2;
        fila.insertCell().innerHTML = pokemon2;
        fila.insertCell().innerHTML = pokemon1;
        fila.insertCell().innerHTML = determinarResultado(ganador);
    }

    // Calcular el Pokémon más utilizado
    let max_usos = 0;
    let pokemon_mas_utilizado = 'N/A';
    for (const [pokemon, usos] of Object.entries(pokemon_usado)) {
        if (usos > max_usos) {
            max_usos = usos;
            pokemon_mas_utilizado = pokemon;
        }
    }

    // Actualizar las estadísticas en la interfaz
    document.getElementById('total-partidas-jugadas').textContent = `Total de partidas jugadas: ${total_jugadas}`;
    document.getElementById('total-partidas-ganadas').textContent = `Total de partidas ganadas: ${total_ganadas}`;
    document.getElementById('total-partidas-perdidas').textContent = `Total de partidas perdidas: ${total_perdidas}`;
    document.getElementById('total-partidas-empates').textContent = `Total de partidas empatadas: ${total_empatadas}`;
    document.getElementById('pokemon-mas-utilizado').textContent = `Pokémon más utilizado: ${pokemon_mas_utilizado}`;
};

// Llamar a la función para mostrar los datos
mostrar_datos_en_tabla();