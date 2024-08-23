const inputPassword = document.getElementById("password"); 
const btn_guardar_contrasenna = document.getElementById("btn_guardar_contrasenna");

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
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*?])[A-Za-z\d!@#$%&*?]{8,}$/;
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

function enviarDatos(event) {
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
        Swal.fire({
            text: "Contraseña actualizada exitosamente.",
            icon: "success",
            confirmButton: "Ok",
            confirmButtonColor: "#FF4E4E"
          });
          limpiarCampos()
          setTimeout(() => {
            window.location.href = "landingPage.html"
          }, 1500);
    }
}

btn_guardar_contrasenna.addEventListener('click', enviarDatos);

function mostrarContra() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
