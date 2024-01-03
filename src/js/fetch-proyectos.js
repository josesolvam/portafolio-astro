import { contenedorProyectos } from "./selectores/selectores.js";
const URL_API = import.meta.env.PUBLIC_URL_API;
const URL_IMAGENES = import.meta.env.PUBLIC_URL_IMAGENES;
const URL_CLIENT = import.meta.env.PUBLIC_URL_CLIENT;
// console.log("URL_API", URL_API);
// console.log("URL_IMAGENES", URL_IMAGENES);
// console.log("URL_CLIENT", URL_CLIENT);

export class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = "MyError";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderProyectos();
});

async function renderProyectos() {
  try {
    const jsonData = await fetchProyectos();
    mostrarProyectos(jsonData.resultado.proyectos);
  } catch (err) {
    const divError = document.createElement("P");
    divError.style.textAlign = "center";
    if (err instanceof MyError) {
      divError.textContent = err.message;
    } else {
      console.log(err);
      divError.textContent = "Error en la petición";
    }
    contenedorProyectos.appendChild(divError);
  }
}

async function fetchProyectos() {
  try {
    const url = `${URL_API}/proyectos`;
    console.log(url);
    const resultado = await fetch(url);
    const jsonData = await resultado.json();
    if (jsonData.errores) {
      throw new MyError(jsonData.errores.toString());
    }
    return jsonData;
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

    const entradaProyectos = document.createElement("ARTICLE");
    entradaProyectos.classList.add("entrada-proyectos");

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
      // location.href = "http://localhost:4321/proyecto";
    };
    contenedorProyectos.appendChild(entradaProyectos);
  });
}
