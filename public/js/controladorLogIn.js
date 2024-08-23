function mostrarContra() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  //Validaciones para la landing page
  const inputCorreo = document.getElementById("correo");
  const inputPassword = document.getElementById("password");
  const btnLogIn = document.getElementById("btnLogIn");
  /*   const formulario = document.getElementById("formulario"); */

  function validarCamposVacios() {
      let error = false;
      let campos_requiridos = [inputCorreo, inputPassword];
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

  // Validar el correo
  function validarCorreoElectronico() {
      let error = false;
      let textoUsuario = inputCorreo.value;
      let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (regex.test(textoUsuario) === false) {
          inputCorreo.classList.add('error');
          error = true;
      } else {
          inputCorreo.classList.remove('error');
      }
      return error;
  }

  // Validar la contraseña
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

    /*function limpiarCampos() {
      inputCorreo.value = "";
      inputPassword.value = "";
    } */

  function iniciarSesion(event) {
      event.preventDefault();  // Prevenir el comportamiento por defecto del formulario
      let errorCamposVacios = validarCamposVacios();
      let errorCorreo = validarCorreoElectronico();
      let errorContrasenna = validarContrasenna();

      if (errorCamposVacios) {
          Swal.fire({
              title: "Dejaste campos en blanco.",
              text: "Por favor rellena todos los espacios.",
              icon: "error",
              confirmButtonText: "Ok",
              confirmButtonColor: "#FF4E4E"
          });
      } else if (errorCorreo) {
          Swal.fire({
              title: "Error",
              text: "Ingresa un email válido.",
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
        let correo = inputCorreo.value;
        let password = inputPassword.value;
        validarCredenciales(correo,password)
        /*limpiarCampos(); */
      }
  }

  btnLogIn.addEventListener('click', iniciarSesion);
