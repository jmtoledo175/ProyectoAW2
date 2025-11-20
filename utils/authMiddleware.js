import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {

  console.log("---------- MIDDLEWARE EJECUTADO ----------");

  const authHeader = req.headers.authorization;

  console.log("📌 Header Authorization recibido:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];
  console.log("📌 Token extraído:", token);

  try {
    const secret = process.env.JWT_SECRET || "clave_por_defecto";
    console.log("📌 Usando SECRET:", secret);

    const decoded = jwt.verify(token, secret);

    req.user = decoded;

    next();

  } catch (error) {
    console.log("❌ Error verificando token:", error.message);
    return res.status(401).json({ message: "Token inválido" });
  }
};