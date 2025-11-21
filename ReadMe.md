Descripción General

Este proyecto corresponde a la materia Aplicaciones Web II y consiste en una tienda online con frontend y backend.
En esta versión final, el sistema fue migrado completamente a MongoDB, reemplazando el almacenamiento previo basado en archivos JSON.

El backend implementa:

API REST con Node.js + Express

Base de datos MongoDB utilizando Mongoose

CRUD de usuarios, productos y ventas

Sistema de autenticación con:

Encriptación de contraseñas (bcrypt)

Generación y validación de tokens JWT

Middleware de autenticación

Rutas protegidas (solo usuarios logueados pueden comprar)

Frontend simple en HTML + Tailwind + JavaScript

Tecnologías Utilizadas
Backend

Node.js

Express

MongoDB

Mongoose

bcrypt

JSON Web Tokens (JWT)

dotenv

Frontend

HTML

CSS (Tailwind)

JavaScript

Estructura del Proyecto
ProyectoAW2/
│
├── db/
│   └── mongo.js
│
├── models/
│   ├── usuario.js
│   ├── producto.js
│   └── venta.js
│
├── routes/
│   ├── usuarios.routes.js
│   ├── productos.routes.js
│   └── ventas.routes.js
│
├── utils/
│   ├── authMiddleware.js
│   ├── manejarArchivos.js  (ya no se utiliza)
│   ├── helpers.js          (ya no se utiliza)
│
├── public/
│   ├── pages/
│   ├── js/
│   ├── css/
│   └── assets/
│
├── index.js
├── package.json
└── README.md


Nota: Los módulos helpers.js y manejarArchivos.js son parte de la primera versión del proyecto que utilizaba JSON.
Ya no se utilizan en la migración a MongoDB, pero se mantienen en caso de necesitar referencia histórica.

Instalación y Ejecución
1. Instalar dependencias
npm install

2. Configurar archivo .env

Crear un archivo:

MONGODB_URI=mongodb://127.0.0.1:27017/proyectoAW2
JWT_SECRET=una_clave_segura
JWT_EXPIRES_IN=1h
PORT=3000

3. Iniciar servidor
npm run dev


El proyecto queda disponible en:
http://localhost:3000

Conexión a MongoDB

El archivo db/mongo.js gestiona la conexión mediante Mongoose:

await mongoose.connect(MONGODB_URI);


Si la conexión falla, el servidor no inicia.

Modelos (Mongoose)
Usuario
{
  nombre: String,
  email: String,
  contraseña: String  // encriptada con bcrypt
}

Producto
{
  nombre: String,
  precio: Number,
  stock: Number
}

Venta
{
  usuarioId: ObjectId (ref: Usuario),
  productos: [
    {
      id_producto: ObjectId (ref: Producto),
      cantidad: Number,
      precio: Number
    }
  ],
  fecha: Date
}

Autenticación y Seguridad
Registro de usuario

Endpoint:

POST /api/usuarios


Ejemplo body:

{
  "nombre": "Julieta",
  "email": "julieta@test.com",
  "password": "1234"
}


La contraseña se encripta con:

bcrypt.hash(plainPassword, 10)

Login
POST /api/usuarios/login


Si es correcto, devuelve:

{
  "usuario": {
    "id": "<ObjectId>",
    "nombre": "Julieta",
    "email": "julieta@test.com"
  },
  "token": "JWT..."
}


El frontend lo guarda en sessionStorage.

Middleware de Autorización

Archivo authMiddleware.js.

Valida el header:

Authorization: Bearer <token>


Si el token es válido:
→ se permite continuar
Si no:
→ responde 401

Rutas de la API
Usuarios
Método	Ruta	Descripción
GET	/api/usuarios	Listar usuarios (sin contraseña)
GET	/api/usuarios/:id	Buscar usuario por ID
POST	/api/usuarios	Registrar usuario
POST	/api/usuarios/login	Login + JWT
PUT	/api/usuarios/:id	Actualizar usuario
DELETE	/api/usuarios/:id	Eliminar usuario
Productos
Método	Ruta	Descripción
GET	/api/productos	Listar productos
GET	/api/productos/:id	Buscar producto
POST	/api/productos	Crear producto
PUT	/api/productos/:id	Actualizar
DELETE	/api/productos/:id	Eliminar
Ventas
Método	Ruta	Requiere JWT	Descripción
GET	/api/ventas	No	Listar ventas
GET	/api/ventas/:id	No	Buscar venta
POST	/api/ventas	Sí	Crear venta
POST	/api/ventas/buscarPorUsuario	No	Buscar ventas por usuario
PUT	/api/ventas/:id	No	Actualizar
DELETE	/api/ventas/:id	No	Eliminar
Crear una Venta (protegido)

Ejemplo de body:

{
  "productos": [
    {
      "id_producto": "678c3f31f80cbb3c8c485932",
      "cantidad": 2,
      "precio": 3000
    }
  ]
}


El backend agrega automáticamente:

ID del usuario (desde el token)

fecha de compra

Carrito de Compras (Frontend)

El carrito se maneja en localStorage.

Al presionar “Comprar”, el frontend envía:

fetch("/api/ventas", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body)
});


Si el token no existe → redirige al login.

Características Implementadas

CRUD completo de usuarios

CRUD de productos

Registro y login con JWT

Encriptación de contraseñas

Middleware de autorización

Carrito de compras en frontend

Ventas asociadas al usuario logueado

Migración completa a MongoDB con Mongoose

Rutas protegidas

Cómo Probar el Proyecto

Crear usuario (front o Postman)

Loguearse y obtener JWT

Navegar productos

Agregar al carrito

Comprar (requiere token)

Estado de la Migración

✔ JSON eliminado
✔ MongoDB funcionando
✔ Modelos Mongoose implementados
✔ Relaciones con ObjectId funcionando
✔ Próxima etapa lista para producción