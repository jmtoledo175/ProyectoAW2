import { getCart, saveCart } from "../utils/cartStorage.js";
import { getSession } from "../utils/sessionStorage.controller.js";

const tbody = document.getElementById("tbodyCarrito");
const txtTotal = document.getElementById("txtTotal");
const carritoVacio = document.getElementById("carritoVacio");
const carritoLleno = document.getElementById("carritoLleno");
const btnComprar = document.getElementById("btnComprar");

let carrito = getCart();

const renderCarrito = () => {
  if (!carrito.length) {
    carritoVacio.classList.remove("hidden");
    carritoLleno.classList.add("hidden");
    return;
  }

  carritoVacio.classList.add("hidden");
  carritoLleno.classList.remove("hidden");

  tbody.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="p-3">${item.nombre}</td>
      <td class="p-3">${item.cantidad}</td>
      <td class="p-3">$${item.precio}</td>
      <td class="p-3">$${subtotal}</td>
      <td class="p-3">
        <button data-index="${index}" class="bg-red-500 text-white px-2 py-1 rounded">
          X
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  txtTotal.textContent = total;

  document.querySelectorAll("button[data-index]").forEach(btn => {
    btn.addEventListener("click", () => {
      carrito.splice(btn.dataset.index, 1);
      saveCart(carrito);
      renderCarrito();
    });
  });
};


btnComprar.addEventListener("click", () => {
  const user = getSession();
  if (!user) {
    sessionStorage.setItem("next", "/pages/carrito.html");
    window.location.href = "/pages/login.html";
  }
});

renderCarrito();
