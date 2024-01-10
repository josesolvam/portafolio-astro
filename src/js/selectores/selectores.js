// Selectores navegacion
export const body = document.querySelector("body");
export const menuMovil = document.querySelector("#menu-movil");
export const navegacionPrincipal = document.querySelector(
  "#navegacion-principal",
);
export const sidebar = document.querySelector("#sidebar");
export const main = document.querySelector("main");
export const menuIcon = document.querySelector("#menu-icon");
export const closeMenuIcon = document.querySelector("#close-menu-icon");

// Selectores validación formularios
export const inputNombre = document.querySelector("#nombre");
export const inputTelefono = document.querySelector("#telefono");
export const inputCorreo = document.querySelector("#correo");
export const inputMensaje = document.querySelector("#mensaje");
export const form = document.querySelector("#formulario");
export const btnSubmit = document.querySelector(
  '#formulario button[type="submit"]',
);

// Selectores elementos animados
export const allFadeIn = document.querySelectorAll(".fade-in");

// Selectores elementos donde renderizar fetch
export const contenedorProyectos = document.querySelector("#proyectos");
export const errorFetchProyectos = document.querySelector(
  "#error-fetch-proyectos",
);
export const contenedorProyecto = document.querySelector("#proyecto");
export const errorFetchProyecto = document.querySelector(
  "#error-fetch-proyecto",
);
