import { getCart, saveCart } from "../utils/cartStorage.js";
import { getSession } from "../utils/sessionStorage.controller.js";

const tbody = document.getElementById("tbodyCarrito");
const carritoLleno = document.getElementById("carritoLleno");
const txtTotal = document.getElementById("txtTotal");
const btnComprar = document.getElementById("btnComprar");

const renderCarrito = () => {
  const carrito = getCart();

  if (!carrito || carrito.length === 0) {
    carritoLleno.classList.add("hidden");
    return;
  }

  carritoLleno.classList.remove("hidden");
  tbody.innerHTML = "";

  let total = 0;

  carrito.forEach((item) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td class="py-3 px-4">${item.nombre}</td>
      <td class="py-3 px-4">${item.cantidad}</td>
      <td class="py-3 px-4">$${item.precio}</td>
      <td class="py-3 px-4 font-semibold">$${item.precio * item.cantidad}</td>
    `;
    total += item.precio * item.cantidad;
    tbody.appendChild(fila);
  });

  txtTotal.textContent = total;
};

btnComprar.addEventListener("click", async () => {
  const carrito = getCart();
  const usuario = getSession();

  if (!usuario) {
    sessionStorage.setItem("next", "/pages/carrito.html");
    window.location.href = "/pages/login.html";
    return;
  }

  const token = sessionStorage.getItem("token");

  const body = {
    id_usuario: usuario.id,
    productos: carrito.map((p) => ({
      id_producto: p.id,
      cantidad: p.cantidad,
      precio: p.precio,
    })),
  };

  try {
    const response = await fetch("http://localhost:3000/api/ventas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
     
        Authorization: `Bearer ${token}`,

      },
      body: JSON.stringify(body),
    });

    if (response.status === 401) {
      alert("Tu sesión expiró, volvé a iniciar sesión");
      window.location.href = "/pages/login.html";
      return;
    }

    if (!response.ok) {
      alert("Error al procesar la compra");
      return;
    }

    alert("Compra realizada con éxito");

    saveCart([]);

    window.location.href = "/pages/home.html";
  } catch (error) {
    console.error(error);
    alert("Error al realizar la compra");
  }
});

renderCarrito();
