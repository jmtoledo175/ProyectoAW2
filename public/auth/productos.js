import { addToCart } from "../utils/cartStorage.js";
import { updateCartCount } from "./navbar.js";

let productos = [];
const lista = document.getElementById("listaProductos");

const cargarProductos = async () => {
  const res = await fetch("http://localhost:3000/api/productos");
  productos = await res.json();
  renderProductos(productos);
};

const renderProductos = (arr) => {
  lista.innerHTML = "";
  arr.forEach((p) => {
    lista.innerHTML += `
      <div class="bg-white p-4 rounded-xl shadow">
        <h3 class="text-lg font-semibold">${p.nombre}</h3>
        <p class="text-gray-500 text-sm">${p.categoria}</p>
        <p class="text-blue-600 font-bold mt-2">$${p.precio}</p>
        <button data-id="${p.id}"
          class="agregar bg-blue-600 text-white px-3 py-1 rounded-lg mt-3">
          Agregar al carrito
        </button>
      </div>
    `;
  });

  document.querySelectorAll(".agregar").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const prod = productos.find(p => p.id === id);
      addToCart(prod);
      updateCartCount();
      alert("Producto agregado");
    });
  });
};

cargarProductos();
