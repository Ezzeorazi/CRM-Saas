
# 📦 CRM SaaS – Backend (MERN)

CRM escalable en la nube para PYMEs, desarrollado con el stack **MERN** (MongoDB, Express, React, Node.js).

Este backend incluye:
- Registro y login de usuarios con JWT
- CRUD de usuarios, productos, clientes y proveedores
- Encriptación de contraseñas con bcrypt
- Middleware de autenticación y autorización por roles
- Módulo de ventas con presupuestos, facturación y pagos
- Estructura modular escalable

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
├── models/              # Esquemas (User, Product, Cliente, Proveedor, Venta, Presupuesto, Factura, Pago)
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

## 📌 Endpoints disponibles

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
- `POST /api/ventas/desde-presupuesto/:id` – Generar venta desde presupuesto
### Presupuestos
- `POST /api/presupuestos` – Crear presupuesto
- `GET /api/presupuestos` – Listar presupuestos
- `GET /api/presupuestos/:id` – Ver presupuesto
- `PUT /api/presupuestos/:id` – Editar presupuesto
- `DELETE /api/presupuestos/:id` – Eliminar presupuesto

### Facturas
- `POST /api/facturas` – Crear factura
- `GET /api/facturas` – Listar facturas
- `GET /api/facturas/:id` – Ver factura
- `PUT /api/facturas/:id` – Editar factura
- `DELETE /api/facturas/:id` – Eliminar factura

### Pagos
- `GET /api/pagos/factura/:facturaId` – Pagos de una factura
- `POST /api/pagos` – Registrar pago

---

## 🧪 Middleware incluidos

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

---

## ✅ Módulos activos

- Autenticación y usuarios
- Productos
- Importación masiva de productos vía Excel
- Clientes y proveedores
- Ventas, presupuestos y facturas
- Pagos registrados
---

## 🧑‍💻 Autor

Ezequiel – Desarrollo Fullstack MERN
