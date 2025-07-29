
# 🚀 CRM SaaS – Proyecto Completo

**CRM escalable en la nube para PYMEs**, desarrollado con el stack **MERN** (MongoDB, Express, React, Node.js). Permite gestionar áreas clave: ventas, compras, inventario, RRHH y producción.

---

## 📌 Características principales

- Autenticación segura con JWT y control por roles
- Gestión de usuarios y productos desde dashboard
- Importación masiva de productos desde Excel
- API RESTful con protección de rutas
- Gestión de clientes y proveedores
- Módulo de ventas con presupuestos y facturación
- Inventario con entradas, salidas y reportes de stock
- Tareas y órdenes de producción
- Dashboard con KPIs
- Interfaz limpia, responsiva y escalable (React + Tailwind)
- Arquitectura modular preparada para crecimiento
- Soporte multi-tenant con modelo `Empresa` y datos aislados por `empresaId`

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

## ⚙️ Puesta en marcha

1. Clona el repositorio e instala las dependencias:
   ```bash
   npm install
   ```
2. Configura las variables de entorno en `backend/.env` (ver `README_backend.md`).
3. Inicia el backend y el frontend en terminales separadas:
   ```bash
   cd backend && npm run dev
   ```
   ```bash
   cd ../frontend && npm run dev
   ```
4. Ejecuta todas las pruebas con:
   ```bash
   npm test
   ```
   Consulta la documentación específica de cada parte para más detalles.

---

## 🚦 Estado actual

### ✅ Backend
- Registro/login con JWT
- CRUD de usuarios
- CRUD de productos
- Importación de productos por Excel
- CRUD de clientes
- CRUD de proveedores
- Presupuestos, facturas y ventas
- Ventas creadas a partir de presupuestos aceptados
- Presupuestos descargables en PDF con logo de la empresa (formato PNG)
- Inventario con movimientos de stock y reportes
- Tareas y órdenes de producción
- Automatización diaria de alerta de stock bajo por correo
- Protección por roles
- Flujo multi-tenant: usuarios y datos aislados por empresa

### ✅ Frontend
- Login protegido con contexto
- Gestión de usuarios (alta, baja, edición)
- Gestión de productos
- Importar productos desde Excel
- Gestión de ventas con presupuestos y facturas
- Vista detallada de cada venta
- Formulario de ventas carga automáticamente datos de un presupuesto aceptado
- Gestión de clientes y proveedores
- Panel de inicio con KPIs
- Navegación responsiva y diseño limpio
- Formulario “Solicitar Demo” para crear una empresa y admin inicial
- Gestión de inventario (entradas, salidas e historial)
- Gestión de tareas y órdenes de producción
- Notificaciones tipo toast y diálogos de confirmación reutilizables
- Navegación con breadcrumbs en el dashboard

### 🧩 En desarrollo
- Estadísticas y gráficos
- Automatizaciones (alertas)

---

## 🧑‍💻 Autor

**Ezequiel** – Desarrollo Fullstack MERN  
Proyecto SaaS personal para empresas medianas.

---

## 📄 Licencia

Uso libre bajo responsabilidad del desarrollador.
