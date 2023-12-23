import "./paquetes/modernizr-custom.js";
import { navegacion, animaciones } from "./funcionalidades/index.js";

// console.log(window.Modernizr);

document.addEventListener("DOMContentLoaded", function () {
  navegacion();
  animaciones();
});
