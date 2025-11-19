Proyecto AW2 – Etapa 3 (Front + Back)

Este proyecto implementa un monorepo con backend en Node.js + Express y frontend estático con HTML, TailwindCSS y JavaScript.
El objetivo es integrar ambos módulos para mostrar productos, filtrarlos, gestionarlos en un carrito y generar una orden de compra.

## Cómo ejecutar el proyecto

Clonar el repositorio

Instalar dependencias:

npm install


Iniciar el servidor:

npm start


Abrir en el navegador:

http://localhost:3000

## API – Rutas disponibles
### Productos (/api/productos)
Método	Ruta	Descripción
GET	/api/productos	Obtener todos los productos
GET	/api/productos/:id	Obtener un producto por ID
POST	/api/productos	Crear un nuevo producto
PUT	/api/productos/:id	Actualizar producto
DELETE	/api/productos/:id	Eliminar producto
### Usuarios (/api/usuarios)
Método	Ruta	Descripción
GET	/api/usuarios	Obtener todos los usuarios
GET	/api/usuarios/:id	Obtener un usuario por ID
POST	/api/usuarios	Crear usuario
POST	/api/usuarios/login	Login por email + contraseña
PUT	/api/usuarios/:id	Actualizar usuario
DELETE	/api/usuarios/:id	Eliminar usuario (si no tiene ventas)
### Ventas (/api/ventas)
Método	Ruta	Descripción
GET	/api/ventas	Obtener todas las ventas
GET	/api/ventas/:id	Obtener venta por ID
POST	/api/ventas	Registrar una venta
POST	/api/ventas/buscarPorUsuario	Buscar ventas por ID de usuario
PUT	/api/ventas/:id	Actualizar venta
DELETE	/api/ventas/:id	Eliminar venta
## Etapa 3 – Front + Back

El frontend se encuentra dentro de la carpeta /public y se sirve mediante express.static.

### Páginas implementadas
✔ Home / Productos – public/index.html

Muestra todos los productos

Permite filtrar por categoría

Botón “Agregar al carrito”

Contador de carrito dinámico

Bootstrap visual con TailwindCSS

✔ Carrito – public/pages/carrito.html

Muestra productos del carrito (localStorage)

Calcula total dinámico

Permite eliminar ítems

Botón “Comprar”:

Si no hay usuario → redirige a login

Si hay usuario → registra la venta vía POST al backend

✔ Login – public/pages/login.html

Login simulado con JSON del backend

Guarda sesión con sessionStorage

Redirige al carrito o home del usuario

✔ Home del usuario – public/pages/home.html

Pantalla de bienvenida después de iniciar sesión

Botones:

Seguir comprando

Ir al carrito

Cerrar sesión

## Tecnologías utilizadas

Node.js + Express

HTML5 + CSS (Tailwind)

JavaScript ESModules

localStorage / sessionStorage

JSON como base de datos

Arquitectura monorepo