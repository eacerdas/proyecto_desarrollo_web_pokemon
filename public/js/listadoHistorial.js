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

    // Limpiar tabla
    cuerpoTabla.innerHTML = "";

    // Mostrar los datos en la tabla
    for (let i = 0; i < lista_historial_recuperado.length; i++) {
        let fila = cuerpoTabla.insertRow();

        // Datos recuperados de la lista
        const resultado = lista_historial_recuperado[i];
        
        const jugador1 = resultado['jugador1'];
        const jugador2 = resultado['jugador2'];

        if (jugador1 != currentUserName && jugador2 != currentUserName){
            continue;
        }

        const pokemon2 = resultado['pokemon2'];
        const pokemon1 = resultado['pokemon1'];
        const ganador = resultado['ganador']; // 'Pokémon 1' = "Victoria", 'Pokémon 2' = "Derrota", o 'Empate'

        // Insertar celdas en la fila
        fila.insertCell().innerHTML = jugador2;
        fila.insertCell().innerHTML = pokemon2;
        fila.insertCell().innerHTML = pokemon1;
        fila.insertCell().innerHTML = determinarResultado(ganador);
    }
};

// Llamar a la función para mostrar los datos
mostrar_datos_en_tabla();