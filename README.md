
# 🚀 CRM SaaS – Proyecto Completo

**CRM escalable en la nube para PYMEs**, desarrollado con el stack **MERN** (MongoDB, Express, React, Node.js). Permite a empresas gestionar todas sus áreas clave: ventas, compras, inventario, RRHH y producción, con acceso por roles y desde cualquier dispositivo.

---

## 📌 Características principales

- Acceso seguro por roles (admin, ventas, compras, inventario, RRHH, producción)
- Backend con Express + MongoDB Atlas
- Autenticación con JWT y encriptación de contraseñas
- Rutas protegidas por token y por nivel de usuario
- Arquitectura escalable, preparada para módulos futuros
- Accesible desde web y móvil (vía frontend React/PWA)

---

## 🧱 Stack tecnológico

| Parte       | Tecnología        |
|-------------|-------------------|
| Backend     | Node.js + Express |
| Base de datos | MongoDB Atlas    |
| Autenticación | JWT + BcryptJS   |
| Frontend    | React (próximamente) |
| Hosting     | Render, Vercel, MongoDB Atlas |

---

## 📁 Estructura del proyecto

```
crm-saas/
├── backend/              # API y lógica del servidor
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── ...
├── frontend/             # (En desarrollo)
├── README.md             # Este archivo
└── README_backend.md     # Documentación técnica del backend
```

---

## 🚦 Estado del desarrollo

### ✅ Completado
- Configuración del backend
- Conexión a MongoDB Atlas
- Registro y login con JWT
- Middleware de autenticación y control por roles

### 🔜 En desarrollo
- Frontend con React
- Módulo de Inventario
- Módulo de Ventas y Clientes
- Módulo de Compras y Proveedores
- Módulo de Producción
- Automatizaciones y alertas internas

---

## 🧑‍💻 Autor

**Ezequiel** – Desarrollo Fullstack  
Proyecto personal de CRM SaaS para empresas medianas.

---

## 📄 Licencia

Uso personal, educativo y comercial bajo responsabilidad del desarrollador.
