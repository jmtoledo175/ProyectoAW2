import { Router } from "express";
import { leerArchivo, escribirArchivo } from "../utils/manejarArchivos.js";
import { getNextId } from "../utils/helpers.js";


const router = Router();
const ruta = "./data/ventas.json";


router.get("/", async (req, res) => {
const ventas = await leerArchivo(ruta);
res.json(ventas);
});


router.get("/:id", async (req, res) => {
const ventas = await leerArchivo(ruta);
const venta = ventas.find(v => v.id == req.params.id);
venta ? res.json(venta) : res.status(404).json("Venta no encontrada");
});


router.post("/", async (req, res) => {
const ventas = await leerArchivo(ruta);
const nueva = { id: getNextId(ventas), ...req.body };
ventas.push(nueva);
await escribirArchivo(ruta, ventas);
res.status(201).json("Venta registrada");
});


router.post("/buscarPorUsuario", async (req, res) => {
const ventas = await leerArchivo(ruta);
const resultado = ventas.filter(v => v.id_usuario == req.body.id_usuario);
res.json(resultado);
});

router.post("/", async (req, res) => {
  try {
    const ventas = await leerArchivo(ruta);

  
    const nuevaVenta = {
      id: getNextId(ventas),
      ...req.body,
      fecha: new Date().toISOString()
    };

    ventas.push(nuevaVenta);
    await escribirArchivo(ruta, ventas);

    res.status(201).json({
      message: "Venta registrada",
      venta: nuevaVenta
    });

  } catch (error) {
    console.error(error);
    res.status(500).json("Error al registrar la venta");
  }
});



router.put("/:id", async (req, res) => {
const ventas = await leerArchivo(ruta);
const index = ventas.findIndex(v => v.id == req.params.id);
if (index !== -1) {
ventas[index] = { ...ventas[index], ...req.body };
await escribirArchivo(ruta, ventas);
res.json("Venta actualizada");
} else {
res.status(404).json("Venta no encontrada");
}
});


router.delete("/:id", async (req, res) => {
const ventas = await leerArchivo(ruta);
const nuevas = ventas.filter(v => v.id != req.params.id);
if (nuevas.length === ventas.length) return res.status(404).json("Venta no encontrada");
await escribirArchivo(ruta, nuevas);
res.json("Venta eliminada");
});


export default router;