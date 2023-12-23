import { contenedorProyectos, inputNombre } from "./selectores/selectores.js";
import { URL_API, URL_IMAGENES, URL_CLIENT } from "./config/constantes.js";
import srcLoading from "../assets/img/ti-rotateClockwise.svg";
document.addEventListener("DOMContentLoaded", function () {
  renderProyectos();
});

async function renderProyectos() {
  try {
    const resultado = await fetchProyectos();
    mostrarProyectos(resultado.resultado.proyectos);
  } catch (err) {
    console.log(err);
  }
}

async function fetchProyectos() {
  try {
    const url = `${URL_API}/proyectos`;
    const resultado = await fetch(url);
    return await resultado.json();
  } catch (err) {
    throw err;
  }
}
function mostrarProyectos(proyectos) {
  proyectos.forEach((proyecto) => {
    const {
      id,
      slug,
      titulo,
      descripcion,
      imagen,
      fechaProyecto: fecha,
    } = proyecto;

    const divImgProyecto = document.createElement("DIV");
    divImgProyecto.classList.add("imagen-proyecto");
    const imgProyecto = document.createElement("IMG");
    imgProyecto.setAttribute("src", `${URL_IMAGENES}/${imagen}`);
    imgProyecto.setAttribute("alt", `imagen de ${titulo}`);
    imgProyecto.setAttribute("loading", "lazy");
    divImgProyecto.appendChild(imgProyecto);

    const tituloProyecto = document.createElement("H3");
    tituloProyecto.classList.add("titulo-proyecto");
    tituloProyecto.textContent = titulo;

    const fechaProyecto = document.createElement("P");
    fechaProyecto.classList.add("fecha-proyecto");
    fechaProyecto.textContent = fecha;

    const descripProyecto = document.createElement("P");
    descripProyecto.classList.add("descripcion-proyecto");
    descripProyecto.textContent = descripcion;

    const textoProyecto = document.createElement("DIV");
    textoProyecto.classList.add("texto-proyecto");
    textoProyecto.appendChild(tituloProyecto);
    textoProyecto.appendChild(fechaProyecto);
    textoProyecto.appendChild(descripProyecto);

    const entradaProyectos = document.createElement("ARTICLE");
    entradaProyectos.classList.add("entrada-proyectos");
    entradaProyectos.appendChild(imgProyecto);
    entradaProyectos.appendChild(textoProyecto);
    // entradaProyectos.dataset.idServicio = id;
    // entradaProyectos.addEventListener("click", function () {
    //   console.log(`Id cliqueado: ${id}`);
    // });
    entradaProyectos.onclick = function () {
      location.href = `${URL_CLIENT}/proyecto?id=${id}`;
      // location.href = "http://localhost:4321/proyecto";
    };
    contenedorProyectos.appendChild(entradaProyectos);
  });
}
