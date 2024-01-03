import { contenedorProyecto } from "./selectores/selectores.js";
const URL_API = import.meta.env.PUBLIC_URL_API;
const URL_IMAGENES = import.meta.env.PUBLIC_URL_IMAGENES;
const URL_CLIENT = import.meta.env.PUBLIC_URL_CLIENT;

export class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = "MyError";
  }
}
document.addEventListener("DOMContentLoaded", function () {
  renderProyecto();
});

async function renderProyecto() {
  try {
    const jsonData = await fetchProyecto();
    mostrarProyecto(jsonData.resultado.proyecto);
  } catch (err) {
    const divError = document.createElement("P");
    divError.style.textAlign = "center";
    if (err instanceof MyError) {
      divError.textContent = err.message;
    } else {
      console.log(err);
      divError.textContent = "Error en la petición";
    }
    contenedorProyecto.appendChild(divError);
  }
}

async function fetchProyecto() {
  // const urlParams = new URLSearchParams(location.search);
  let urlParams = location.hash;
  urlParams = urlParams.slice(2);
  // if (!urlParams.has("id")) {
  //   throw new MyError("Id del proyecto no especificado");
  // }
  // const id = urlParams.get("id");
  if (!urlParams) {
    throw new MyError("Id del proyecto no especificado");
  }
  const id = urlParams;
  const url = `${URL_API}/proyecto/${id}`;
  try {
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
function mostrarProyecto(proyecto) {
  const {
    id,
    slug,
    titulo,
    descripcion,
    imagen,
    fechaProyecto: fecha,
  } = proyecto;
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
