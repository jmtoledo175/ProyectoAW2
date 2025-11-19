import { getCart } from "../utils/cartStorage.js";
import { getSession, clearSession } from "../utils/sessionStorage.controller.js";


const cart = getCart();
const cartCount = document.getElementById("cartCount");
if (cartCount) cartCount.textContent = cart.length;

const user = getSession();
const btnLogout = document.getElementById("btnLogout");

if (user && btnLogout) {
  btnLogout.classList.remove("hidden");

  btnLogout.addEventListener("click", () => {
    clearSession();
    window.location.href = "/index.html";
  });
}

export const updateCartCount = () => {
  const cart = getCart();
  const cartCount = document.getElementById("cartCount");
  if (cartCount) cartCount.textContent = cart.length;
};
