import { Router } from "express";
import { leerArchivo, escribirArchivo } from "../utils/manejarArchivos.js";
import { getNextId } from "../utils/helpers.js";


const router = Router();
const ruta = "./data/productos.json";


router.get("/", async (req, res) => {
const productos = await leerArchivo(ruta);
res.json(productos);
});


router.get("/:id", async (req, res) => {
const productos = await leerArchivo(ruta);
const prod = productos.find(p => p.id == req.params.id);
prod ? res.json(prod) : res.status(404).json("Producto no encontrado");
});


router.post("/", async (req, res) => {
const productos = await leerArchivo(ruta);
const nuevo = { id: getNextId(productos), ...req.body };
productos.push(nuevo);
await escribirArchivo(ruta, productos);
res.status(201).json("Producto agregado");
});


router.put("/:id", async (req, res) => {
const productos = await leerArchivo(ruta);
const index = productos.findIndex(p => p.id == req.params.id);
if (index !== -1) {
productos[index] = { ...productos[index], ...req.body };
await escribirArchivo(ruta, productos);
res.json("Producto actualizado");
} else {
res.status(404).json("Producto no encontrado");
}
});


router.delete("/:id", async (req, res) => {
const productos = await leerArchivo(ruta);
const nuevos = productos.filter(p => p.id != req.params.id);
if (nuevos.length === productos.length) return res.status(404).json("No existe");
await escribirArchivo(ruta, nuevos);
res.json("Producto eliminado");
});


export default router;