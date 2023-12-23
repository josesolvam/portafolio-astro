import {
  resumenServicios,
  contenedorFormIndex,
  sobreMi,
  cardServicioFontend,
  cardServicioDesign,
  cardServicioApiDB,
  cardServicioDespliegue,
  cardServicioOptimizacion,
  cardServicioEconomico,
  contenedorFormContacto,
} from "../selectores/selectores.js";

let elementosFadeIn = [
  resumenServicios,
  contenedorFormIndex,
  sobreMi,
  cardServicioFontend,
  cardServicioDesign,
  cardServicioApiDB,
  cardServicioDespliegue,
  cardServicioOptimizacion,
  cardServicioEconomico,
  contenedorFormContacto,
];

export function animaciones() {
  fadeIn();
}
function fadeIn() {
  initFadein(elementosFadeIn);
  window.addEventListener("scroll", function () {
    fadeinExec(elementosFadeIn);
  });
}
function initFadein(elementos) {
  elementosFadeIn = elementos.map((elemento) => {
    if (elemento) {
      elemento.style.opacity = "0";
      if (elemento.getBoundingClientRect().top < window.innerHeight - 40) {
        elemento.style.opacity = "1";
        // console.log(`Eliminado del array el elemento: `, elemento.id);
        return null;
      }
    }
    return elemento;
  });
}
function fadeinExec(elementos) {
  elementosFadeIn = elementos.map((elemento) => {
    if (
      elemento &&
      elemento.getBoundingClientRect().top < window.innerHeight - 40
    ) {
      elemento.classList.add("fade-in");
      // console.log(`Eliminado del array el elemento: `, elemento.id);
      return null;
    }
    return elemento;
  });
}
