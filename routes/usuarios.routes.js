import { Router } from "express";
import { leerArchivo, escribirArchivo } from "../utils/manejarArchivos.js";
import { getNextId } from "../utils/helpers.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
const rutaUsuarios = "./data/usuarios.json";
const rutaVentas = "./data/ventas.json";

router.get("/", async (req, res) => {
  const usuarios = await leerArchivo(rutaUsuarios);
  res.json(usuarios);
});

router.get("/:id", async (req, res) => {
  const usuarios = await leerArchivo(rutaUsuarios);
  const usuario = usuarios.find((u) => u.id == req.params.id);
  usuario ? res.json(usuario) : res.status(404).json("Usuario no encontrado");
});

const SALT_ROUNDS = 10;

router.post("/", async (req, res) => {
  try {
    const usuarios = await leerArchivo(rutaUsuarios);

    const { nombre, email, password, contraseña } = req.body;
    const plainPassword = password || contraseña;

    if (!nombre || !email || !plainPassword) {
      return res
        .status(400)
        .json({ message: "nombre, email y contraseña son obligatorios" });
    }

    const existente = usuarios.find((u) => u.email === email);
    if (existente) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const passwordHash = await bcrypt.hash(plainPassword, SALT_ROUNDS);

    const nuevoUsuario = {
      id: getNextId(usuarios),
      nombre,
      email,
      contraseña: passwordHash,
    };

    usuarios.push(nuevoUsuario);
    await escribirArchivo(rutaUsuarios, usuarios);

    const { contraseña: _, ...usuarioSinPassword } = nuevoUsuario;

    res.status(201).json(usuarioSinPassword);
  } catch (error) {
    console.error("Error al crear usuario", error);
    res.status(500).json({ message: "Error al crear usuario" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password, contraseña } = req.body;

    const plainPassword = password || contraseña;

    console.log("📌 Password enviado:", plainPassword);

    const usuarios = await leerArchivo(rutaUsuarios);
    const usuario = usuarios.find((u) => u.email === email);

    if (!usuario) {
      console.log("⚠️ Usuario no encontrado");
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    console.log("📌 Hash guardado:", usuario.contraseña);

    const coincide = await bcrypt.compare(plainPassword, usuario.contraseña);

    console.log("📌 ¿Coincide bcrypt?:", coincide);

    if (!coincide) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET || "clave_por_defecto",
      { expiresIn: "1h" }
    );

    res.json({ usuario, token });
  } catch (error) {
    console.error("🔥 Error en login:", error);
    res.status(500).json({ message: "Error en el login" });
  }
});


router.put("/:id", async (req, res) => {
  const usuarios = await leerArchivo(rutaUsuarios);
  const index = usuarios.findIndex((u) => u.id == req.params.id);
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

  const tieneVentas = ventas.some((v) => v.id_usuario == req.params.id);
  if (tieneVentas)
    return res
      .status(400)
      .json("No se puede eliminar el usuario porque tiene ventas asociadas");

  const nuevos = usuarios.filter((u) => u.id != req.params.id);
  if (nuevos.length === usuarios.length)
    return res.status(404).json("Usuario no encontrado");

  await escribirArchivo(rutaUsuarios, nuevos);
  res.json("Usuario eliminado");
});

export default router;
