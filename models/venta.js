import mongoose from "mongoose";

const productoVentaSchema = new mongoose.Schema(
  {
    id_producto: { type: Number, required: true }, // id numérico que ya usás
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true },
  },
  { _id: false } // para que no genere _id por cada producto
);

const ventaSchema = new mongoose.Schema(
  {
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    productos: { type: [productoVentaSchema], required: true },
    fecha: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Venta = mongoose.model("Venta", ventaSchema);