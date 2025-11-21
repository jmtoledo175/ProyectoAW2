import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario.js";

const router = Router();
const SALT_ROUNDS = 10;


router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-contraseña");
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select("-contraseña");

    if (!usuario) {
      return res.status(404).json("Usuario no encontrado");
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { nombre, email, password, contraseña } = req.body;
    const plainPassword = password || contraseña;

    if (!nombre || !email || !plainPassword) {
      return res.status(400).json({
        message: "nombre, email y contraseña son obligatorios",
      });
    }

  
    const existente = await Usuario.findOne({ email });
    if (existente) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

   
    const passwordHash = await bcrypt.hash(plainPassword, SALT_ROUNDS);


    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      contraseña: passwordHash,
    });

    res.status(201).json({
      id: nuevoUsuario._id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error al crear usuario" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password, contraseña } = req.body;
    const plainPassword = password || contraseña;

    if (!email || !plainPassword) {
      return res.status(400).json({
        message: "email y contraseña son obligatorios",
      });
    }

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }


    const coincide = await bcrypt.compare(
      plainPassword,
      usuario.contraseña
    );

    if (!coincide) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

  
    const token = jwt.sign(
      {
        id: usuario._id,
        email: usuario.email,
      },
      process.env.JWT_SECRET || "clave_por_defecto",
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    res.json({
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el login" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-contraseña");

    if (!actualizado) {
      return res.status(404).json("Usuario no encontrado");
    }

    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await Usuario.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return res.status(404).json("Usuario no encontrado");
    }

    res.json("Usuario eliminado");
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
});

export default router;
