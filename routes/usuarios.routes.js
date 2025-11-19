import { Router } from "express";
import { leerArchivo, escribirArchivo } from "../utils/manejarArchivos.js";
import { getNextId } from "../utils/helpers.js";


const router = Router();
const rutaUsuarios = "./data/usuarios.json";
const rutaVentas = "./data/ventas.json";


router.get("/", async (req, res) => {
const usuarios = await leerArchivo(rutaUsuarios);
res.json(usuarios);
});


router.get("/:id", async (req, res) => {
const usuarios = await leerArchivo(rutaUsuarios);
const usuario = usuarios.find(u => u.id == req.params.id);
usuario ? res.json(usuario) : res.status(404).json("Usuario no encontrado");
});


router.post("/", async (req, res) => {
const usuarios = await leerArchivo(rutaUsuarios);
const nuevo = { id: getNextId(usuarios), ...req.body };
usuarios.push(nuevo);
await escribirArchivo(rutaUsuarios, usuarios);
res.status(201).json("Usuario agregado");
});

router.post("/login", async (req, res) => {
  const { email, contraseña } = req.body;

  if (!email || !contraseña) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  const usuarios = await leerArchivo(rutaUsuarios);

  const usuarioEncontrado = usuarios.find(
    (u) => u.email === email && u.contraseña === contraseña
  );

  if (!usuarioEncontrado) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  res.json({
    message: "Login exitoso",
    usuario: usuarioEncontrado,
  });
});


router.put("/:id", async (req, res) => {
const usuarios = await leerArchivo(rutaUsuarios);
const index = usuarios.findIndex(u => u.id == req.params.id);
if (index !== -1) {
usuarios[index] = { ...usuarios[index], ...req.body };
await escribirArchivo(rutaUsuarios, usuarios);
res.json("Usuario actualizado");
} else {
res.status(404).json("Usuario no encontrado");
}
});


router.delete("/:id", async (req, res) => {
const usuarios = await leerArchivo(rutaUsuarios);
const ventas = await leerArchivo(rutaVentas);


const tieneVentas = ventas.some(v => v.id_usuario == req.params.id);
if (tieneVentas) return res.status(400).json("No se puede eliminar el usuario porque tiene ventas asociadas");


const nuevos = usuarios.filter(u => u.id != req.params.id);
if (nuevos.length === usuarios.length) return res.status(404).json("Usuario no encontrado");


await escribirArchivo(rutaUsuarios, nuevos);
res.json("Usuario eliminado");
});


export default router;