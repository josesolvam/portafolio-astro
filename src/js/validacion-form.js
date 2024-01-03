import { datoValido } from "./helpers/validators.js";
import iconoLoading from "../assets/img/ti-rotateClockwise.svg";

import {
  inputNombre,
  inputTelefono,
  inputCorreo,
  inputMensaje,
  form,
  btnSubmit,
} from "./selectores/selectores.js";

document.addEventListener("DOMContentLoaded", function () {
  const divErrorTelOrCorreo = document.createElement("DIV");
  const puedeEnviarse = {
    nombre: false,
    telefono: false,
    correo: false,
    mensaje: false,
  };

  implementarElementosDOM();
  asignarEventos();
  // Inicializar el formulario en el caso de que se establezcan valores iniciales
  // resetFormulario();

  function implementarElementosDOM() {
    divErrorTelOrCorreo.setAttribute("id", "error-tel-correo");
    // alertaExito.textContent = "Mensaje enviado correctamente";
    inputCorreo.parentElement.appendChild(divErrorTelOrCorreo);
  }
  function asignarEventos() {
    inputNombre.addEventListener("blur", validar);
    inputTelefono.addEventListener("blur", validar);
    inputCorreo.addEventListener("blur", validar);
    inputMensaje.addEventListener("blur", validar);
    form.addEventListener("submit", enviarEmail);
  }

  function enviarEmail(event) {
    event.preventDefault();
    if (!formularioValido()) {
      return;
    }
    btnSubmit.disabled = true;
    const imgLoading = document.createElement("IMG");
    imgLoading.setAttribute("src", iconoLoading.src);
    imgLoading.setAttribute("alt", "icono de loading");
    imgLoading.classList.add("icono-loading");
    form.appendChild(imgLoading);

    setTimeout(() => {
      imgLoading.remove();

      // Crear una alerta
      const alertaExito = document.createElement("P");
      alertaExito.classList.add("alerta-exito");
      alertaExito.textContent = "Mensaje enviado correctamente";
      form.appendChild(alertaExito);
      resetFormulario();
      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 2000);
  }

  function validar(event) {
    const dato = event.target.value.trim();
    if (dato === "") {
      puedeEnviarse[event.target.name] = false;
      toggleSubmit();
    }
    if (event.target.name === "nombre" || event.target.name === "mensaje") {
      if (dato === "") {
        mostrarAlerta(
          `El ${event.target.name} es obligatorio`,
          event.target.parentElement,
        );
        return;
      }
      puedeEnviarse[event.target.name] = true;
      limpiarAlerta(event.target.parentElement);
      toggleSubmit();
      return;
    }
    if (event.target.name === "telefono" || event.target.name === "correo") {
      if (dato === "") {
        limpiarAlerta(event.target.parentElement);
        if (!algunCampoLLeno(event.target.name)) {
          mostrarAlerta("Teléfono o email requerido", divErrorTelOrCorreo);
        } else {
          limpiarAlerta(divErrorTelOrCorreo);
        }
        return;
      }
      limpiarAlerta(divErrorTelOrCorreo);
      if (!datoValido(dato, event.target.name)) {
        mostrarAlerta(
          event.target.name === "telefono"
            ? "Obligatorio formato numérico"
            : "El email no es válido",
          event.target.parentElement,
        );
        puedeEnviarse[event.target.name] = "error";
        toggleSubmit();
        return;
      }
      puedeEnviarse[event.target.name] = true;
      limpiarAlerta(event.target.parentElement);
      toggleSubmit();
    }
  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);

    // Generar alerta en HTML
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("alerta-error-form");

    // Inyectar el error al formulario
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    // Comprueba si ya existe una alerta
    const alerta = referencia.querySelector(".alerta-error-form");
    if (alerta) {
      alerta.remove();
    }
  }

  function formularioValido() {
    return (
      puedeEnviarse.nombre &&
      puedeEnviarse.telefono !== "error" &&
      puedeEnviarse.correo !== "error" &&
      (puedeEnviarse.telefono || puedeEnviarse.correo) &&
      puedeEnviarse.mensaje
    );
  }
  function algunCampoLLeno(tipoDatoVacio) {
    if (
      tipoDatoVacio === "telefono" &&
      (puedeEnviarse.correo === "error" || puedeEnviarse.correo)
    ) {
      return true;
    }

    return (
      tipoDatoVacio === "correo" &&
      (puedeEnviarse.telefono === "error" || puedeEnviarse.telefono)
    );
  }

  function toggleSubmit() {
    if (!formularioValido()) {
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.disabled = false;
  }

  function resetFormulario() {
    // Reiniciar el formulario:
    puedeEnviarse.nombre = false;
    puedeEnviarse.telefono = false;
    puedeEnviarse.correo = false;
    puedeEnviarse.mensaje = false;
    form.reset();
    toggleSubmit();

    // O establecer valores iniciales:
    // const formularioData = {
    //   nombre: "",
    //   telefono: "",
    //   correo: "",
    //   mensaje: "",
    // };
    // formularioData.nombre = "pr";
    // formularioData.telefono = "1234";
    // formularioData.correo = "jose@jose.com";
    // formularioData.mensaje = "pr";
    // inputNombre.value = formularioData.nombre;
    // inputTelefono.value = formularioData.telefono;
    // inputCorreo.value = formularioData.correo;
    // inputMensaje.value = formularioData.mensaje;
  }
});
