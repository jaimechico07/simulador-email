document.addEventListener("DOMContentLoaded", function () {
  const email = {
    email: "",
    emailExtra: "",
    asunto: "",
    mensaje: "",
  };

  //Seleccionar los elementos de la interfaz
  const inputEmail = document.querySelector("#email");
  const inputEmailExtra = document.querySelector("#emailExtra");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector("#spinner");

  //asignar eventos
  inputEmail.addEventListener("blur", validar);
  inputEmailExtra.addEventListener("blur", validar);
  inputAsunto.addEventListener("blur", validar);
  inputMensaje.addEventListener("blur", validar);

  formulario.addEventListener("submit", enviarEmail);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault;

    //reiniciar el objeto
    resetearFormulario();
  });

  function enviarEmail(e) {
    e.preventDefault();
    spinner.classList.add("flex");
    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.remove("flex");
      spinner.classList.add("hidden");

      //reiniciar el objeto
      resetearFormulario();

      //Crear Alerta
      const alertaExito = document.createElement("P");
      alertaExito.classList.add(
        "bg-green-500",
        "text-white",
        "p-2",
        "text-center",
        "rounded-lg",
        "mt-10",
        "font-bold",
        "text-sm",
        "uppercase"
      );
      alertaExito.textContent = "Mensaje Enviado exitosamente";

      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 3000);
  }

  function validar(e) {
    if (e.target.value.trim() === "") {
      mostrarAlerta(
        `El Campo ${e.target.id} es Obligatorio`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    //validando que el email sea válido
    if (
      (e.target.id === "email" || e.target.id === "emailExtra") &&
      !validarEmail(e.target.value)
    ) {
      mostrarAlerta("El email no es válido", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    limpiarAlerta(e.target.parentElement);

    //asigna valores
    email[e.target.name] = e.target.value.trim().toLowerCase();

    // comprobar objeto de email
    comprobarEmail();
  }

  function mostrarAlerta(mensaje, referencia) {
    //Comprueba si ya existe una alerta
    limpiarAlerta(referencia);

    //Generar alerta en html
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p-2", "text-center");

    //Inyectar el error al formulario
    referencia.appendChild(error);
  }

  //quita alerta si el campo esta llenado
  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  //validar Email
  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  function comprobarEmail() {
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
  }

  function resetearFormulario() {
    //reiniciar el objeto
    email.email = "";
    email.emailExtra = "";
    email.asunto = "";
    email.mensaje = "";

    formulario.reset();
    comprobarEmail();
  }
});
