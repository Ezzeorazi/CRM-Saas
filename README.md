
# 🚀 CRM SaaS – Proyecto Completo

**CRM escalable en la nube para PYMEs**, desarrollado con el stack **MERN** (MongoDB, Express, React, Node.js). Permite gestionar áreas clave: ventas, compras, inventario, RRHH y producción.

---

## 📌 Características principales

- Autenticación segura con JWT y control por roles
- Gestión de usuarios y productos desde dashboard
- API RESTful con protección de rutas
- Gestión de clientes y proveedores
- Módulo de ventas con presupuestos y facturación
- Dashboard con KPIs
- Interfaz limpia, responsiva y escalable (React + Tailwind)
- Arquitectura modular preparada para crecimiento

---

## 🧱 Stack tecnológico

| Parte         | Tecnología         |
|---------------|--------------------|
| Backend       | Node.js + Express  |
| Base de datos | MongoDB Atlas      |
| Autenticación | JWT + BcryptJS     |
| Frontend      | React + Vite       |
| UI            | Tailwind CSS       |
| Hosting       | Render, Vercel     |

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
├── frontend/             # Interfaz React + Vite + Tailwind
│   ├── routes/
│   ├── layout/
│   ├── pages/
│   ├── api/
│   ├── components/
│   └── ...
├── README.md             # Este archivo
├── README_backend.md     # Documentación técnica del backend
├── README_frontend.md    # Documentación técnica del frontend
```

---

## 🚦 Estado actual

### ✅ Backend
- Registro/login con JWT
- CRUD de usuarios
- CRUD de productos
- CRUD de clientes
- CRUD de proveedores
- Presupuestos, facturas y ventas
- Protección por roles

### ✅ Frontend
- Login protegido con contexto
- Gestión de usuarios (alta, baja, edición)
- Gestión de productos
- Gestión de ventas con presupuestos y facturas
- Gestión de clientes y proveedores
- Panel de inicio con KPIs
- Navegación responsiva y diseño limpio

### 🧩 En desarrollo
- Módulo de inventario avanzado
- Panel de tareas y producción
- Estadísticas y gráficos
- Automatizaciones (alertas)

---

## 🧑‍💻 Autor

**Ezequiel** – Desarrollo Fullstack MERN  
Proyecto SaaS personal para empresas medianas.

---

## 📄 Licencia

Uso libre bajo responsabilidad del desarrollador.
