import { addSession } from "../utils/sessionStorage.controller.js";
import { alert } from "../components/alerts.js"; 

document.addEventListener("DOMContentLoaded", () => {


  document.getElementById("alertContainer").innerHTML = alert();

 
  const btnClose = document.getElementById("btnCloseAlert");
  btnClose.addEventListener("click", () => {
    document.getElementById("alert").classList.add("hidden");
  });

  const showAlert = (msg) => {
    const alertDiv = document.getElementById("alert");
    const alertText = document.getElementById("txtAlert");

    alertText.textContent = msg;
    alertDiv.classList.remove("hidden");
  };

const auth = async (email, contraseña) => {
  const resp = await fetch("/api/usuarios/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: contraseña }),
  });

  const data = await resp.json();

  if (!resp.ok) {
    showAlert(data.message || "Error al iniciar sesión");
    return null;
  }

  sessionStorage.setItem("usuario", JSON.stringify(data.usuario));
  sessionStorage.setItem("token", data.token);

  return data.usuario;
};

document.getElementById("btnLogin").addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.getElementById("txtEmail").value.trim();
  const contraseña = document.getElementById("txtPass").value.trim();

  if (!email || !contraseña) {
    showAlert("Completa email y contraseña");
    return;
  }

  const usuario = await auth(email, contraseña);

  if (usuario) {
    addSession(usuario);
    window.location.href = "/pages/home.html";
  } else {
    showAlert("Usuario o contraseña incorrectos");
  }
});


});
