## Rutas disponibles


### Productos (`/api/productos`)


- GET `/api/productos` - Obtener todos los productos
- GET `/api/productos/:id` - Obtener un producto por ID
- POST `/api/productos` - Crear un nuevo producto (requiere JSON con los campos)
- PUT `/api/productos/:id` - Actualizar un producto por ID
- DELETE `/api/productos/:id` - Eliminar un producto por ID


### Usuarios (`/api/usuarios`)


- GET `/api/usuarios` - Obtener todos los usuarios
- GET `/api/usuarios/:id` - Obtener un usuario por ID
- POST `/api/usuarios` - Crear un nuevo usuario
- POST `/api/usuarios/login` - Simular login con email y contraseña
- PUT `/api/usuarios/:id` - Actualizar un usuario por ID
- DELETE `/api/usuarios/:id` - Eliminar un usuario por ID (solo si no tiene ventas asociadas)


### Ventas (`/api/ventas`)


- GET `/api/ventas` - Obtener todas las ventas
- GET `/api/ventas/:id` - Obtener una venta por ID
- POST `/api/ventas` - Crear una nueva venta (requiere ID de usuario, productos, etc.)
- POST `/api/ventas/usuario/:id` - Obtener ventas por ID de usuario
- PUT `/api/ventas/:id` - Actualizar una venta por ID
- DELETE `/api/ventas/:id` - Eliminar una venta por ID