import {
  contenedorProyectos,
  errorFetchProyectos,
} from "./selectores/selectores.js";
const URL_IMAGENES = import.meta.env.PUBLIC_URL_IMAGENES;
const URL_CLIENT = import.meta.env.PUBLIC_URL_CLIENT;
import { MyError } from "./api/my-error.js";
import { fetchProyectos } from "./api/api.js";
import { mostrarAlertas } from "./funcionalidades/alertas.js";

document.addEventListener("DOMContentLoaded", function () {
  renderProyectos();
});

async function renderProyectos() {
  try {
    const jsonData = await fetchProyectos();
    mostrarProyectos(jsonData.resultado.proyectos);
  } catch (err) {
    let arrayErrors;
    if (err instanceof MyError) {
      arrayErrors = JSON.parse(err.message);
    } else {
      arrayErrors = ["Error"];
    }
    mostrarAlertas("error", errorFetchProyectos, arrayErrors);
  }
}

function mostrarProyectos(proyectos) {
  if (!proyectos.length) {
    throw new MyError(JSON.stringify(["No hay registros"]));
  }
  proyectos.forEach((proyecto) => {
    const { id, titulo, descripcion, imagen, fechaProyecto: fecha } = proyecto;

    const entradaProyectos = document.createElement("ARTICLE");
    entradaProyectos.classList.add("entrada-proyectos", "fade-in");

    const divImgProyecto = document.createElement("DIV");
    divImgProyecto.classList.add("imagen-proyecto");

    const imgProyecto = document.createElement("IMG");
    imgProyecto.setAttribute("src", `${URL_IMAGENES}/${imagen}`);
    imgProyecto.setAttribute("alt", `imagen de ${titulo}`);
    imgProyecto.setAttribute("loading", "lazy");
    divImgProyecto.appendChild(imgProyecto);

    const textoProyecto = document.createElement("DIV");
    textoProyecto.classList.add("texto-proyecto");

    const tituloProyecto = document.createElement("H3");
    tituloProyecto.classList.add("titulo-proyecto");
    tituloProyecto.textContent = titulo;

    const fechaProyecto = document.createElement("P");
    fechaProyecto.classList.add("fecha-proyecto");
    fechaProyecto.innerHTML = `Fecha proyecto: <span>${fecha}</span>`;

    const descripProyecto = document.createElement("P");
    descripProyecto.classList.add("descripcion-proyecto");
    descripProyecto.textContent = descripcion;

    textoProyecto.appendChild(tituloProyecto);
    textoProyecto.appendChild(fechaProyecto);
    textoProyecto.appendChild(descripProyecto);

    entradaProyectos.appendChild(divImgProyecto);
    entradaProyectos.appendChild(textoProyecto);
    // entradaProyectos.dataset.idServicio = id;
    // entradaProyectos.addEventListener("click", function () {
    //   console.log(`Id cliqueado: ${id}`);
    // });
    entradaProyectos.onclick = function () {
      location.href = `${URL_CLIENT}/proyecto/#/${id}`;
    };
    contenedorProyectos.appendChild(entradaProyectos);
  });
}
