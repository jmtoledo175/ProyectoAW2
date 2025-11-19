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
    const response = await fetch("http://localhost:3000/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, contraseña }),
    });

    if (!response.ok) {
      showAlert("Credenciales incorrectas");
      throw new Error("Login incorrecto");
    }

    const data = await response.json();
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

    try {
      const usuario = await auth(email, contraseña);
      addSession(usuario);
      window.location.href = "/pages/home.html";

    } catch (error) {
      showAlert("Usuario o contraseña incorrectos");
    }
  });

});
