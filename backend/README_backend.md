
# 📦 CRM SaaS – Backend (MERN)

CRM escalable en la nube para PYMEs, desarrollado con el stack **MERN** (MongoDB, Express, React, Node.js).

Este backend incluye:
- Registro y login de usuarios con JWT
- CRUD de usuarios y productos
- Encriptación de contraseñas con bcrypt
- Middleware de autenticación y autorización por roles
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
├── controllers/         # Lógica de negocio (usuarios, productos)
├── middleware/          # Autenticación y roles
├── models/              # Esquemas Mongoose (User, Product)
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
- Productos (stock básico)

---

## 🧑‍💻 Autor

Ezequiel – Desarrollo Fullstack MERN
