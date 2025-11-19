export const addSession = (usuario) => {
  sessionStorage.setItem("usuario", JSON.stringify(usuario));
};

export const getSession = () => {
  return JSON.parse(sessionStorage.getItem("usuario"));
};
