const URL_API = import.meta.env.PUBLIC_URL_API;
import { MyError } from "./my-error.js";

export async function fetchProyectos() {
  const url = `${URL_API}/proyectos`;
  return await processGetRequest(url);
}

export async function fetchProyecto(id) {
  const url = `${URL_API}/proyecto/${id}`;
  return await processGetRequest(url);
}

const processGetRequest = async (url) => {
  let resultadoClone;
  try {
    const resultado = await fetch(url);
    resultadoClone = resultado.clone();
    const jsonData = await resultado.json();
    // console.log(jsonData);
    if (jsonData.errores) {
      throw new MyError(JSON.stringify(jsonData.errores));
    }
    return jsonData;
  } catch (err) {
    console.log(await resultadoClone.text());
    throw err;
  }
};
