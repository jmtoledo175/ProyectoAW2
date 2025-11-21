import { Router } from "express";
import { Producto } from "../models/producto.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json("Producto no encontrado");
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener producto" });
  }
});

router.post("/", async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);

    res.status(201).json({
      message: "Producto agregado con éxito",
      producto: nuevoProducto
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!actualizado) {
      return res.status(404).json("Producto no encontrado");
    }

    res.json({
      message: "Producto actualizado",
      producto: actualizado
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await Producto.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return res.status(404).json("Producto no encontrado");
    }

    res.json("Producto eliminado");
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto" });
  }
});

export default router;
