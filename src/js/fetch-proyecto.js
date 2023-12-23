import { contenedorProyectos, inputNombre } from "./selectores/selectores.js";
import { URL_API, URL_IMAGENES, URL_CLIENT } from "./config/constantes.js";
import srcLoading from "../assets/img/ti-rotateClockwise.svg";
document.addEventListener("DOMContentLoaded", function () {
  renderProyecto();
});

async function renderProyecto() {
  try {
    const resultado = await fetchProyecto();
    mostrarProyecto(resultado.resultado.proyecto);
  } catch (err) {
    console.log(err);
  }
}

async function fetchProyecto() {
  const urlParams = new URLSearchParams(location.search);
  if (!urlParams.has("id")) {
    throw new Error("Id del proyecto no especificado");
  }
  const id = urlParams.get("id");
  try {
    const url = `${URL_API}/proyecto/${id}`;
    const resultado = await fetch(url);
    return await resultado.json();
  } catch (err) {
    throw err;
  }
}
function mostrarProyecto(proyecto) {
  const {
    id,
    slug,
    titulo,
    descripcion,
    imagen,
    fechaProyecto: fecha,
  } = proyecto;
  console.log(proyecto);
}
