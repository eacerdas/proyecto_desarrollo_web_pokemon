const inputPassword = document.getElementById("password"); 
const btn_guardar_contrasenna = document.getElementById("btn_guardar_contrasenna");

let id = sessionStorage.getItem("id_mongo")

//Llenar los inputs con los datos de la persona
const llenar_campos = async()=>{
    let usuario = await recuperarUsuarioID(id)
    inputPassword.value = usuario.password
}

llenar_campos()

function validarCamposVacios() {
    let error = false;
    let campos_requiridos = [inputPassword];
    for (let i = 0; i < campos_requiridos.length; i++) {
        if (campos_requiridos[i].value === "") {
            campos_requiridos[i].classList.add('error');
            error = true;
        } else {
            campos_requiridos[i].classList.remove('error');
        }
    }
    return error;
}

function validarContrasenna() {
    let error = false;
    let textoUsuario = inputPassword.value;
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&()\-_=+{}[\]:;"',.<>?\\|]).{8,}$/;
    if (regex.test(textoUsuario) === false) {
      inputPassword.classList.add('error');
        error = true;
    } else {
      inputPassword.classList.remove('error');
    }
    return error;
}

function limpiarCampos() {
    inputPassword.value = "";
}

function actualizarContrasenna(event) {
    event.preventDefault(); 
    let errorCamposVacios = validarCamposVacios();
    let errorContrasenna = validarContrasenna();

    if (errorCamposVacios) {
        Swal.fire({
            title: "Dejaste campos en blanco.",
            text: "Por favor rellena todos los espacios.",
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#FF4E4E"
        });
    } else if (errorContrasenna) {
        Swal.fire({
            title: "Error",
            text: "Ingresa una contraseña válida.",
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#FF4E4E"
        });
    } else {
        const data = {
        password : inputPassword.value,
        }

        actualizarUsuario(id,data)

        limpiarCampos()
    }
}

btn_guardar_contrasenna.addEventListener('click', actualizarContrasenna);

function mostrarContra() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}
