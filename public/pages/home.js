import { getSession, clearSession } from "../utils/sessionStorage.controller.js";

const user = getSession();
const txt = document.getElementById("txtSaludo");
const btnLogout = document.getElementById("btnLogout");

if (user) {
  txt.textContent = `Hola ${user.nombre} ${user.apellido}`;
} else {
  txt.textContent = "No hay sesión activa";
}

btnLogout.addEventListener("click", () => {
  clearSession();
  window.location.href = "/index.html";
});