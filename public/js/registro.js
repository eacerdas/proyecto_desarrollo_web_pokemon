// Tener todas las referencias al DOM
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputUsername = document.getElementById("username");
const inputCorreo = document.getElementById("email");
const inputIdentificacion = document.getElementById("id");
const inputFechaNacimiento = document.getElementById("birthdate");
const btnRegistrar = document.getElementById("btnRegistrar");

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
    let seleccionUsuario = tipoIdentificacion.value
    let textoUsuario = inputIdentificacion.value;
    let regex;
    let error = false;

    if (seleccionUsuario == "nacional") {
        regex = /^[1-7]{1}-[0-9]{4}-[0-9]{4}$/;
    } else if (seleccionUsuario == "dimex") {
        regex = /^[0-9]{11,12}$/;
    }

    if (regex.test(textoUsuario) == false) {
        inputIdentificacion.classList.add('error');
        error = true;
    } else {
        inputIdentificacion.classList.remove('error');
        error = false;
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

// Función para enviar datos
function enviarDatos() {
    let errorCamposVacios = validarCamposVacios();
    let errorNombreUsuario = validarNombreUsuario();
    let errorApellido = validarApellidoUsuario();
    let errorUsername = validarUsername();
    let errorCorreo = validarCorreoElectronico();
    let errorIdentificacion = validarIdentificacion();
    let errorFechaNacimiento = validarFechaNacimiento();

    if (errorCamposVacios) {
        Swal.fire({
            title: "Campos vacíos",
            text: "Por favor, revisa los campos marcados",
            icon: "warning"
        });
    } else if (errorNombreUsuario) {
        Swal.fire({
            title: "Error en el nombre",
            text: "El nombre solo debe contener letras",
            icon: "warning"
        });
    } else if (errorApellido) {
        Swal.fire({
            title: "Error en el apellido",
            text: "El apellido solo debe contener letras",
            icon: "warning"
        });
    } else if (errorUsername) {
        Swal.fire({
            title: "Error en el nombre de usuario",
            text: "El nombre de usuario debe tener entre 4 y 20 caracteres, sin espacios.",
            icon: "warning"
        });
    } else if (errorCorreo) {
        Swal.fire({
            title: "Error en el correo electrónico",
            text: "Por favor, ingresa un correo electrónico válido.",
            icon: "warning"
        });
    } else if (errorIdentificacion) {
        Swal.fire({
            title: "Error en la identificación",
            text: "Revisa que el formato de identificación sea correcto.",
            icon: "warning"
        });
    } else if (errorFechaNacimiento) {
        Swal.fire({
            title: "Error en la fecha de nacimiento",
            text: "Por favor, ingresa una fecha de nacimiento válida.",
            icon: "warning"
        });
    } else {
        // Si todas las validaciones pasan, se procede a enviar los datos
        const nombre = inputNombre.value.trim();
        const apellido = inputApellido.value.trim();
        const username = inputUsername.value.trim();
        const correo = inputCorreo.value.trim();
        const tipoCedula = document.querySelector('input[name="id-type"]:checked').value;
        const identificacion = inputIdentificacion.value.trim();
        const fechaNacimiento = inputFechaNacimiento.value.trim();

        registrar_usuario(nombre, apellido, username, correo, identificacion, tipoCedula, fechaNacimiento)
            .then((res) => {
                if (res.resultado) {
                    Swal.fire({
                        title: "¡Registro exitoso!",
                        text: "Revisa tu correo para más detalles.",
                        icon: "success"
                    })
                } else {
                    Swal.fire({
                        title: "Error en el registro",
                        text: res.mensajeError || "Ocurrió un error durante el registro.",
                        icon: "error"
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error de conexión",
                    text: "No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.",
                    icon: "error"
                });
            });

        limpiarCampos();
    }
}

btnRegistrar.addEventListener('click', enviarDatos);



