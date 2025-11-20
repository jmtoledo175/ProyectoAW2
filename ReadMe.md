Descripción General del Proyecto

Este proyecto es un sistema de tienda online (front + backend) desarrollado para la materia Aplicaciones Web II.
Incluye:

Frontend con HTML, CSS (Tailwind), JavaScript.

Backend armado desde cero con Node.js + Express.

Persistencia de datos usando archivos JSON.

CRUD para usuarios, productos y ventas.

Carrito de compras funcional.

Sistema de login con:

Encriptación de contraseñas (bcrypt)

Tokens JWT

Middleware de autenticación

Restricción de rutas protegidas (solo usuarios logueados pueden comprar).

Este README documenta todo el proyecto desde la instalación hasta las funcionalidades implementadas.

// Estructura del Proyecto
ProyectoAW2/
│
├── data/
│   ├── usuarios.json
│   ├── productos.json
│   └── ventas.json
│
├── public/
│   ├── pages/
│   │   ├── home.html
│   │   ├── productos.html
│   │   ├── carrito.html
│   │   └── login.html
│   ├── js/
│   ├── css/
│   └── assets/
│
├── routes/
│   ├── usuarios.routes.js
│   ├── productos.routes.js
│   └── ventas.routes.js
│
├── utils/
│   ├── manejarArchivos.js
│   ├── helpers.js
│   ├── sessionStorage.controller.js
│   └── authMiddleware.js
│
├── server.js
├── package.json
└── README.md

// Instalación y Ejecución
1. Instalar dependencias
npm install

2. Iniciar el servidor
npm run dev


El proyecto se levanta en:
http://localhost:3000

// Base de Datos (JSON)

El proyecto usa 3 archivos JSON como "base de datos":

/data/usuarios.json

Guarda usuarios registrados.
Las contraseñas se guardan encriptadas (bcrypt).

/data/productos.json

Lista de productos disponibles.

/data/ventas.json

Historial de ventas.

// Gestión de Usuarios
// 1. Registro de usuarios

Endpoint:

POST /api/usuarios


Body:

{
  "nombre": "Julieta",
  "email": "julieta@test.com",
  "password": "1234"
}

Contraseña encriptada

La contraseña se encripta con bcrypt:

const passwordHash = await bcrypt.hash(plainPassword, 10);

// 2. Login de usuarios

Endpoint:

POST /api/usuarios/login


Body:

{
  "email": "julieta@test.com",
  "password": "1234"
}


Si es correcto, devuelve:

{
  "usuario": {
    "id": 1,
    "nombre": "Julieta",
    "email": "julieta@test.com"
  },
  "token": "JWT..."
}

// Sistema de Autenticación (JWT)

Cuando el usuario inicia sesión, el sistema genera un token JWT:

const token = jwt.sign(
  { id: usuario.id, email: usuario.email },
  process.env.JWT_SECRET || "clave_por_defecto",
  { expiresIn: "1h" }
);


El frontend guarda este token:

sessionStorage.setItem("token", data.token);

// Middleware de Autorización

El middleware verifica el token en las rutas protegidas:

export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ message: "Token no proporcionado" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "clave_por_defecto");
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};


Rutas que usan middleware:

router.post("/", authMiddleware, ...);

// Ruta Protegida: Ventas

Solo un usuario logueado puede realizar una compra.

Endpoint:

POST /api/ventas


Ejemplo de body enviado desde el frontend:

{
  "productos": [
    { "id_producto": 1, "cantidad": 2, "precio": 3000 },
    { "id_producto": 5, "cantidad": 1, "precio": 12000 }
  ]
}


El backend agrega automáticamente:

ID del usuario que compra

Fecha

ID de la venta

// Carrito de Compras (Frontend)

El carrito se guarda en localStorage.

Cuando se presiona Comprar, se envía:

fetch("http://localhost:3000/api/ventas", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body)
});


Si el token no está → redirige al login.
Si está bien → genera la venta y vacía el carrito.

// CRUD de Productos
Obtener productos
GET /api/productos

Buscar por ID
GET /api/productos/:id

Crear producto
POST /api/productos

Editar producto
PUT /api/productos/:id

Eliminar producto
DELETE /api/productos/:id

// CRUD de Ventas
Listar ventas
GET /api/ventas

Crear venta (protegido con JWT)
POST /api/ventas

Buscar ventas por usuario
POST /api/ventas/buscarPorUsuario

// Funcionalidades Principales del Proyecto
✔ Carrito de compras completo
✔ Login y Logout
✔ Manejo de sesión desde el front
✔ Rutas protegidas con JWT
✔ Encriptación de contraseñas
✔ Validación de usuario en cada compra
✔ CRUD completo de productos y ventas
✔ Datos persistentes en JSON
// Cómo Probar el Proyecto
1. Crear usuario

Via Postman o desde el front.

2. Login desde el front

Obtiene y guarda el token.

3. Agregar productos al carrito

Desde productos.html.

4. Comprar

El backend valida:

Token

Usuario correcto

Carrito no vacío

Si todo está OK, devuelve:

Compra realizada con éxito