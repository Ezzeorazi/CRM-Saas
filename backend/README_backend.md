
# 📦 CRM SaaS – Backend (MERN)

CRM escalable en la nube para PYMEs, desarrollado con el stack **MERN** (MongoDB, Express, React, Node.js).

Este backend incluye:
- Registro de usuarios con roles
- Autenticación con JWT
- Encriptación de contraseñas con bcrypt
- Middleware de protección de rutas
- Control de acceso por rol

---

## 🚀 Tecnologías utilizadas

- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT (jsonwebtoken)
- BcryptJS
- Dotenv

---

## 📁 Estructura del proyecto

```
backend/
├── config/              # Configuraciones generales
├── controllers/         # Lógica de negocio (usuarios, auth)
├── middleware/          # Autenticación y roles
├── models/              # Esquemas Mongoose (User)
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

## 📌 Funcionalidades implementadas

### ✅ Registro de usuario (con contraseña encriptada)

`POST /api/usuarios`

```json
{
  "nombre": "Ezequiel",
  "email": "ezequiel@empresa.com",
  "contraseña": "123456",
  "rol": "admin"
}
```

---

### ✅ Login de usuario

`POST /api/auth/login`

```json
{
  "email": "ezequiel@empresa.com",
  "contraseña": "123456"
}
```

🔁 Devuelve un token JWT para usar en rutas protegidas.

---

### 🔐 Ruta protegida con token y control por rol

`GET /api/protegida`

Headers:

```
Authorization: Bearer <token>
```

✔️ Permitido solo para roles: `admin`, `rrhh`

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

## ✅ Próximos módulos a implementar

- Inventario (stock)
- Ventas y clientes
- Compras y proveedores
- Producción y materia prima
- Panel de tareas internas
- Automatización y alertas

---

## 🧑‍💻 Autor

Ezequiel – Desarrollo Fullstack MERN
