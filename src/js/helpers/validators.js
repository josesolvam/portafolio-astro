export function datoValido(dato, tipoDato) {
  if (tipoDato === "telefono") {
    return validarTelefono(dato);
  } else if (tipoDato === "correo") {
    return validarCorreo(dato);
  }
}
function validarTelefono(tel) {
  const regex = /^[0-9]+$/gm;
  // (tel === "" || regex.test(tel)) ? true : false;
  return regex.test(tel);
}
function validarCorreo(email) {
  const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  return regex.test(email);
}
