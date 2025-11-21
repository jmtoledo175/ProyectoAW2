import express from "express";
import productosRouter from "./routes/productos.routes.js";
import usuariosRouter from "./routes/usuarios.routes.js";
import ventasRouter from "./routes/ventas.routes.js";
import "dotenv/config";
import { connectDB } from "./db/mongo.js";

const app = express();
app.use(express.json());


const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use("/api/productos", productosRouter);
app.use("/api/usuarios", usuariosRouter);
app.use("/api/ventas", ventasRouter);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Servidor levantado en puerto ${PORT}`);
  });
};

startServer();