import { Router } from "express";
import { authMiddleware } from "../utils/authMiddleware.js";
import { Venta } from "../models/venta.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const ventas = await Venta.find().populate("usuarioId", "nombre email");
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ventas" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id).populate(
      "usuarioId",
      "nombre email"
    );

    if (!venta) {
      return res.status(404).json("Venta no encontrada");
    }

    res.json(venta);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener venta" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { productos } = req.body;

    if (!Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ message: "No hay productos en la compra" });
    }

    const usuarioId = req.user.id; 

    const nuevaVenta = await Venta.create({
      usuarioId,
      productos,
      fecha: new Date(),
    });

    res.status(201).json(nuevaVenta);
  } catch (error) {
    console.error("Error al registrar venta", error);
    res.status(500).json({ message: "Error al registrar venta" });
  }
});

router.post("/buscarPorUsuario", async (req, res) => {
  try {
    const { id_usuario } = req.body;

    const ventas = await Venta.find({ usuarioId: id_usuario });

    res.json(ventas);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar ventas" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const venta = await Venta.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!venta) {
      return res.status(404).json("Venta no encontrada");
    }

    res.json(venta);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar venta" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const venta = await Venta.findByIdAndDelete(req.params.id);

    if (!venta) {
      return res.status(404).json("Venta no encontrada");
    }

    res.json("Venta eliminada");
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar venta" });
  }
});

export default router;
