// Tener todas las referencias al DOM
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputUsername = document.getElementById("username");
const inputCorreo = document.getElementById("email");
const inputIdentificacion = document.getElementById("id");
const inputFechaNacimiento = document.getElementById("birthdate");
const formRegistro = document.getElementById("form"); // Selecciona el formulario

// Prevenir el comportamiento predeterminado del formulario
formRegistro.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario recargue la página

    // Validar y enviar los datos si todo está correcto
    enviarDatos();
});

// Función para validar campos vacíos
function validarCamposVacios() {
    let error = false;
    let campos_requeridos = document.querySelectorAll("#formularioRegistro [required]");
    
    for (let i = 0; i < campos_requeridos.length; i++) {
        if (campos_requeridos[i].value == "") {
            campos_requeridos[i].classList.add('error');
            error = true;
        } else {
            campos_requeridos[i].classList.remove('error');
            error=false
        }
    }
    return error;
}

// Función para validar el nombre
function validarNombreUsuario() {
    let error = false;
    let textoUsuario = inputNombre.value;
    let regex = /^[a-zA-Z]+$/ ;

    if (regex.test(textoUsuario) == false) {
        inputNombre.classList.add('error');
        error = true;
    } else {
        inputNombre.classList.remove('error');
        error = false;
    }
    return error;
}

// Función para validar el apellido
function validarApellidoUsuario() {
    let error = false;
    let textoUsuario = inputApellido.value;
    let regex = /^[a-zA-Z]+$/
    if(regex.test(textoUsuario)==false){
        inputApellido.classList.add('error')
        error = true
    }else{
        inputApellido.classList.remove('error')
        error = false
    }
     return error
}

   

// Función para validar el nombre de usuario
function validarUsername() {
    let error = false;
    let textoUsuario = inputUsername.value;
    let regex = /^[a-zA-Z0-9]{4,20}$/;

    if (regex.test(textoUsuario)== false) {
        inputUsername.classList.add('error');
        error = true;
    } else {
        inputUsername.classList.remove('error');
        error = false;
    }
    return error;
}

// Función para validar el correo electrónico
function validarCorreoElectronico() {
    let error = false;
    let textoUsuario = inputCorreo.value;
    let regex = /^[a-zA-Z0-9].+@[a-zA-Z0-9]+.[a-z]+$/
    if(regex.test(textoUsuario)==false){
        inputCorreo.classList.add('error')
        error = true
    }else{
        inputCorreo.classList.remove('error')
        error = false
    }

    return error
}




// Función para validar la identificación
function validarIdentificacion() {
    const tipoIdentificacion = document.querySelector('input[name="id-type"]:checked');
    let error = false;

    if (!tipoIdentificacion) {
        Swal.fire({
            title: "Error en la selección de identificación",
            text: "Por favor, selecciona un tipo de identificación.",
            icon: "warning",
            confirmButtonText: "Ok",
            confirmButtonColor: "#F8BB86"
        });
        return true; // Devuelve true para indicar que hay un error
    }

    let seleccionUsuario = tipoIdentificacion.value;
    let textoUsuario = inputIdentificacion.value;
    let regex;

    if (seleccionUsuario == "nacional") {
        regex = /^[1-7]{1}-[0-9]{4}-[0-9]{4}$/;
    } else if (seleccionUsuario == "dimex") {
        regex = /^[0-9]{11,12}$/;
    }

    if (regex && regex.test(textoUsuario) == false) {
        inputIdentificacion.classList.add('error');
        error = true;
    } else {
        inputIdentificacion.classList.remove('error');
    }
    return error;
}

// Función para validar la fecha de nacimiento
function validarFechaNacimiento() {
    let error = false;
    let fechaUsuario = inputFechaNacimiento.value;

    if (!Boolean(Date.parse(fechaUsuario))) {
        inputFechaNacimiento.classList.add('error');
        error = true;
    } else {
        inputFechaNacimiento.classList.remove('error');
    }
    return error;
}

// Función para limpiar campos del formulario
function limpiarCampos() {
    inputNombre.value = "";
    inputApellido.value = "";
    inputUsername.value = "";
    inputCorreo.value = "";
    inputIdentificacion.value = "";
    inputFechaNacimiento.value = "";
}
function esMayorDeEdad(birthdate) {
    // Convertir la fecha de nacimiento en un objeto Date
    const fechaNacimientoDate = new Date(birthdate);
    
    // Obtener la fecha actual
    const fechaActual = new Date();
    
    // Calcular la edad en años
    let edad = fechaActual.getFullYear() - fechaNacimientoDate.getFullYear();
    
    // Ajustar si la fecha de cumpleaños no ha ocurrido aún este año
    const mes = fechaActual.getMonth() - fechaNacimientoDate.getMonth();
    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimientoDate.getDate())) {
        edad--;
    }
    
    // Verificar si la edad es 18 o más
    return edad >= 18;
}

// Función para enviar datos
function enviarDatos() {
    let errorCamposVacios = validarCamposVacios();
    let errorNombreUsuario = validarNombreUsuario();
    let errorApellido = validarApellidoUsuario();
    let errorUsername = validarUsername();
    let errorCorreo = validarCorreoElectronico();
    let errorIdentificacion = validarIdentificacion();
    let errorFechaNacimiento = validarFechaNacimiento();
       // Obtener la fecha de nacimiento para validar la edad
       const birthdate = inputFechaNacimiento.value.trim();
       const esAdulto = esMayorDeEdad(birthdate);
       if (errorCamposVacios) {
        Swal.fire({
            title: "Campos vacíos",
            text: "Por favor, revisa los campos marcados",
            icon: "warning",
            confirmButtonText: "Ok",
            confirmButtonColor: "#F8BB86"
        });
    } else if (errorNombreUsuario) {
        Swal.fire({
            title: "Error en el nombre",
            text: "El nombre solo debe contener letras",
            icon: "warning",
            confirmButtonText: "Ok",
            confirmButtonColor: "#F8BB86"
        });
    } else if (errorApellido) {
        Swal.fire({
            title: "Error en el apellido",
            text: "El apellido solo debe contener letras",
            icon: "warning",
            confirmButtonText: "Ok",
            confirmButtonColor: "#F8BB86"
        });
    } else if (errorUsername) {
        Swal.fire({
            title: "Error en el nombre de usuario",
            text: "El nombre de usuario debe tener entre 4 y 20 caracteres, sin espacios.",
            icon: "warning",
            confirmButtonText: "Ok",
            confirmButtonColor: "#F8BB86"
        });
    } else if (errorCorreo) {
        Swal.fire({
            title: "Error en el correo electrónico",
            text: "Por favor, ingresa un correo electrónico válido.",
            icon: "warning",
            confirmButtonText: "Ok",
            confirmButtonColor: "#F8BB86"
        });
    } else if (errorIdentificacion) {
        Swal.fire({
            title: "Error en la identificación",
            text: "Revisa que el formato de identificación sea correcto.",
            icon: "warning",
            confirmButtonText: "Ok",
            confirmButtonColor: "#F8BB86"
        });
    } else if (errorFechaNacimiento) {
        Swal.fire({
            title: "Error en la fecha de nacimiento",
            text: "Por favor, ingresa una fecha de nacimiento válida.",
            icon: "warning",
            confirmButtonText: "Ok",
            confirmButtonColor: "#F8BB86"

        });
    } else if (!esAdulto) {
        Swal.fire({
            title: "Edad insuficiente",
            text: "Debes ser mayor de 18 años para registrarte.",
            icon: "error"
        });
    } else {
        // Si todas las validaciones pasan y el usuario es mayor de edad, se procede a enviar los datos
        const nombre = inputNombre.value.trim();
        const apellido = inputApellido.value.trim();
        const username = inputUsername.value.trim();
        const email = inputCorreo.value.trim();
        const idType = document.querySelector('input[name="id-type"]:checked').value;
        const id = inputIdentificacion.value.trim();

        registrar_usuario(nombre, apellido, username, email, idType, id, birthdate);

        limpiarCampos();
    }
}
    
btnRegistrar.addEventListener('click', enviarDatos);



