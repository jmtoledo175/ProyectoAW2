const KEY = "carrito";

export const getCart = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const saveCart = (cart) => {
  localStorage.setItem(KEY, JSON.stringify(cart));
};

export const addToCart = (producto) => {
  const cart = getCart();
  const index = cart.findIndex((p) => p.id === producto.id);

  if (index >= 0) {
    cart[index].cantidad++;
  } else {
    cart.push({ ...producto, cantidad: 1 });
  }

  saveCart(cart);
};
