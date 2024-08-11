// hacer un controlador para el listado del historial
//referencias al DOM
const cuerpoTabla = document.querySelector("#tabla-historial tbody")

let lista_historial_recuperado = []

const mostrar_datos_en_tabla = async()=>{
    lista_historial_recuperado = await listar_resultados()

    //limpiar tabla
    cuerpoTabla.innerHTML=""

    for(let i=0; i<lista_historial_recuperado.length;i++){
        let fila = cuerpoTabla.insertRow()

        fila.insertCell().innerHTML = lista_historial_recuperado[i]['jugador2']
        fila.insertCell().innerHTML = lista_historial_recuperado[i]['pokemon2']
        fila.insertCell().innerHTML = lista_historial_recuperado[i]['pokemon1']
        fila.insertCell().innerHTML = lista_historial_recuperado[i]['ganador']

    }

}

mostrar_datos_en_tabla()