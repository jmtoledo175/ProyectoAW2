import { getSession } from "../utils/sessionStorage.controller.js";

const txtSaludo = document.getElementById("txtSaludo");

const user = getSession(); 

if (user) {
  txtSaludo.textContent = `Hola ${user.nombre} ${user.apellido}`;
} else {
  txtSaludo.textContent = "No hay sesión activa";
}
