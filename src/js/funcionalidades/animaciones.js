import { allFadeIn } from "../selectores/selectores.js";
let elementosFadeIn = [];
allFadeIn.forEach((elemento) => {
  elementosFadeIn.push(elemento);
});

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
  // console.log(elementos);
  elementosFadeIn = elementos.map((elemento) => {
    if (
      elemento &&
      elemento.getBoundingClientRect().top < window.innerHeight - 40
    ) {
      elemento.classList.add("apply-fade-in");
      // console.log(`Eliminado del array el elemento: `, elemento.id);
      return null;
    }
    return elemento;
  });
}
