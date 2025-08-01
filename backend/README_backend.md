
# 📦 CRM SaaS – Backend (MERN)

CRM escalable en la nube para PYMEs, desarrollado con el stack **MERN** (MongoDB, Express, React, Node.js).

Este backend incluye:
- Registro y login de usuarios con JWT
- CRUD de usuarios, productos, clientes y proveedores
- Encriptación de contraseñas con bcrypt
- Middleware de autenticación y autorización por roles
- Módulo de ventas con presupuestos, facturación y pagos
- Inventario con movimientos de stock y reportes
- Tareas y órdenes de producción
- Exportación de presupuestos a PDF con logo corporativo (formato PNG)
- Job diario para enviar alertas de stock bajo por correo
- Estructura modular escalable

- Arquitectura multi-tenant con modelo `Empresa` y filtros por `empresaId`
---

## 🚀 Tecnologías utilizadas

- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT (jsonwebtoken)
- BcryptJS
- Dotenv
- Nodemon

---

## 📁 Estructura del proyecto

```
backend/
├── config/              # Configuraciones generales
├── controllers/         # Lógica de negocio (usuarios, productos, ventas, clientes, proveedores)
├── middleware/          # Autenticación y roles
├── models/              # Esquemas (User, Product, Cliente, Proveedor, Venta, Presupuesto, Factura, Pago, Empresa)
├── routes/              # Rutas Express
├── utils/               # Funciones auxiliares
├── .env                 # Variables de entorno
├── app.js               # App principal de Express
├── server.js            # Punto de entrada
├── package.json
```

---

## 🔐 Variables de entorno `.env`

```env
PORT=5000
MONGO_URI=tu_uri_de_mongodb_atlas
JWT_SECRET=supersecreto123
```

---
## 🏃‍♂️ Puesta en marcha

1. Instala las dependencias:
   ```bash
   cd backend && npm install
   ```
2. Crea el archivo `.env` con las variables indicadas arriba.
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Ejecuta las pruebas unitarias con:
   ```bash
   npm test
   ```

---
## Flujo multi-tenant
- Cada usuario pertenece a una empresa identificada por `empresaId`.
- Al iniciar sesión se genera un JWT con `empresaId`.
- El middleware establece `req.empresaId` para filtrar datos.

## 📌 Endpoints disponibles

### Empresas
- `POST /api/empresas` – Registrar empresa y usuario administrador (demo)
- `POST /api/empresa/logo` – Subir logo de la empresa

### Usuarios

- `POST /api/usuarios` – Crear usuario
- `GET /api/usuarios` – Listar usuarios (protegido)
- `GET /api/usuarios/:id` – Ver un usuario
- `PUT /api/usuarios/:id` – Editar usuario
- `DELETE /api/usuarios/:id` – Eliminar usuario

### Auth
- `POST /api/auth/login` – Login y entrega de token

### Productos
- `POST /api/productos` – Crear producto
- `GET /api/productos` – Listar productos
- `GET /api/productos/:id` – Ver producto
- `PUT /api/productos/:id` – Editar producto
- `DELETE /api/productos/:id` – Eliminar producto
- `POST /api/productos/importar` – Importar productos desde Excel
### Clientes
- `POST /api/clientes` – Crear cliente
- `GET /api/clientes` – Listar clientes
- `GET /api/clientes/:id` – Ver cliente
- `PUT /api/clientes/:id` – Editar cliente
- `DELETE /api/clientes/:id` – Eliminar cliente

### Proveedores
- `POST /api/proveedores` – Crear proveedor
- `GET /api/proveedores` – Listar proveedores
- `GET /api/proveedores/:id` – Ver proveedor
- `PUT /api/proveedores/:id` – Editar proveedor
- `DELETE /api/proveedores/:id` – Eliminar proveedor

### Ventas
- `POST /api/ventas` – Crear venta
- `GET /api/ventas` – Listar ventas
- `GET /api/ventas/:id` – Ver venta
- `PUT /api/ventas/:id` – Editar venta
- `DELETE /api/ventas/:id` – Eliminar venta
### Presupuestos
- `POST /api/presupuestos` – Crear presupuesto
- `GET /api/presupuestos` – Listar presupuestos
- `GET /api/presupuestos/:id` – Ver presupuesto
- `PUT /api/presupuestos/:id` – Editar presupuesto
- `DELETE /api/presupuestos/:id` – Eliminar presupuesto
- `GET /api/presupuestos/:id/pdf` – Descargar presupuesto en PDF

### Facturas
- `POST /api/facturas` – Crear factura
- `GET /api/facturas` – Listar facturas
- `GET /api/facturas/:id` – Ver factura
- `PUT /api/facturas/:id` – Editar factura
- `DELETE /api/facturas/:id` – Eliminar factura

### Pagos
- `GET /api/pagos/factura/:facturaId` – Pagos de una factura
- `POST /api/pagos` – Registrar pago

### Inventario
- `POST /api/movimientos/entrada` – Registrar entrada de stock
- `POST /api/movimientos/salida` – Registrar salida de stock
- `GET /api/movimientos` – Historial de movimientos
- `GET /api/movimientos/reportes/stock-bajo` – Productos con stock bajo
- `GET /api/movimientos/reportes/sin-movimientos/:dias` – Productos sin movimientos
- `GET /api/movimientos/reportes/evolucion/:productoId` – Evolución de stock de un producto

### Tareas
- `POST /api/tareas` – Crear tarea
- `GET /api/tareas` – Listar tareas
- `GET /api/tareas/:id` – Ver tarea
- `PUT /api/tareas/:id` – Editar tarea
- `DELETE /api/tareas/:id` – Eliminar tarea

### Órdenes de producción
- `POST /api/ordenes` – Crear orden
- `GET /api/ordenes` – Listar órdenes
- `GET /api/ordenes/:id` – Ver orden
- `PUT /api/ordenes/:id` – Editar orden
- `DELETE /api/ordenes/:id` – Eliminar orden

---

## 🧪 Middleware incluidos

- El token JWT incluye `empresaId` del usuario para filtrar datos
- Middleware agrega `req.empresaId` para usar en controladores
- `verificarToken`: verifica si el token JWT es válido
- `permitirRoles(...roles)`: limita acceso según el rol del usuario

---

## 📌 Roles disponibles

- `admin`
- `ventas`
- `compras`
- `inventario`
- `rrhh`
- `produccion`
- `soporte`

---

## ✅ Módulos activos

- Autenticación y usuarios
- Productos
- Modelo de empresas para gestionar múltiples organizaciones
- Importación masiva de productos vía Excel
- Clientes y proveedores
- Ventas, presupuestos y facturas
- Ventas creadas a partir de presupuestos aceptados
- Presupuestos descargables en PDF con logo corporativo (formato PNG)
- Pagos registrados
- Inventario con movimientos de stock y reportes
- Tareas y órdenes de producción
---

## 🧑‍💻 Autor

Ezequiel – Desarrollo Fullstack MERN

Para una descripción global del proyecto consulta `README_FUNCIONAMIENTO.md` en el directorio raíz.
