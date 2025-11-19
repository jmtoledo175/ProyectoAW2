import { addSession } from "../utils/sessionStorage.controller.js";

const auth = async (email, contraseña) => {
  const response = await fetch("http://localhost:3000/api/usuarios/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, contraseña }),
  });

  if (!response.ok) {
    throw new Error("Credenciales incorrectas");
  }

  const data = await response.json();
  return data.usuario;
};

document.getElementById("btnLogin").addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.getElementById("txtEmail").value.trim();
  const contraseña = document.getElementById("txtPass").value.trim();

  if (!email || !contraseña) {
    alert("Completa email y contraseña");
    return;
  }

  try {
    const usuario = await auth(email, contraseña);

    addSession(usuario); 

    window.location.href = "/pages/index.html";

  } catch (error) {
    alert("Usuario o contraseña incorrectos");
  }
});
