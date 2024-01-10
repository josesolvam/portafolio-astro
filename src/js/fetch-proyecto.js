import {
  contenedorProyecto,
  errorFetchProyecto,
} from "./selectores/selectores.js";
import { MyError } from "./api/my-error.js";
import { fetchProyecto } from "./api/api.js";
import { mostrarAlertas } from "./funcionalidades/alertas.js";

const URL_API = import.meta.env.PUBLIC_URL_API;
const URL_IMAGENES = import.meta.env.PUBLIC_URL_IMAGENES;

document.addEventListener("DOMContentLoaded", function () {
  renderProyecto();
});

async function renderProyecto() {
  try {
    const id = checkUrl();
    const jsonData = await fetchProyecto(id);
    mostrarProyecto(jsonData.resultado.proyecto);
  } catch (err) {
    let arrayErrors;
    if (err instanceof MyError) {
      arrayErrors = JSON.parse(err.message);
    } else {
      arrayErrors = ["Error"];
    }
    mostrarAlertas("error", errorFetchProyecto, arrayErrors);
  }
}

function checkUrl() {
  let urlParams = location.hash;
  const id = urlParams.slice(2);
  if (!id) {
    throw new MyError(JSON.stringify(["Id del proyecto no especificado"]));
  }
  return id;
}

function mostrarProyecto(proyecto) {
  const { titulo, descripcion, imagen, fechaProyecto: fecha } = proyecto;
  const tituloProyecto = document.createElement("H2");
  tituloProyecto.classList.add("max-w-md", "titulo-proyecto");
  tituloProyecto.textContent = titulo;

  const divImgProyecto = document.createElement("DIV");
  divImgProyecto.classList.add("max-w-md", "imagen-proyecto");

  const imgProyecto = document.createElement("IMG");
  imgProyecto.setAttribute("src", `${URL_IMAGENES}/${imagen}`);
  imgProyecto.setAttribute("alt", `imagen de ${titulo}`);
  imgProyecto.setAttribute("loading", "lazy");
  divImgProyecto.appendChild(imgProyecto);

  const textoProyecto = document.createElement("DIV");
  textoProyecto.classList.add("max-w-md", "texto-proyecto");

  const fechaProyecto = document.createElement("P");
  fechaProyecto.classList.add("fecha-proyecto");
  fechaProyecto.innerHTML = `Fecha del proyecto: <span>${fecha}</span>`;

  const descripProyecto = document.createElement("P");
  descripProyecto.classList.add("descripcion-proyecto");
  descripProyecto.textContent = descripcion;
  textoProyecto.appendChild(fechaProyecto);
  textoProyecto.appendChild(descripProyecto);

  contenedorProyecto.appendChild(tituloProyecto);
  contenedorProyecto.appendChild(divImgProyecto);
  contenedorProyecto.appendChild(textoProyecto);
}
