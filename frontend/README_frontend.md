
# 🎨 CRM SaaS – Frontend (React + Vite + Tailwind)

Interfaz web del CRM para gestión empresarial, desarrollada con **React** y **Tailwind CSS**. Conecta con el backend mediante API REST autenticada con JWT.

---

## 🚀 Tecnologías utilizadas

- React + Vite
- React Router DOM
- Axios (API requests)
- Tailwind CSS (diseño responsivo)
- Context API (auth global)
- Heroicons (íconos)

---

## 📁 Estructura del frontend

```
frontend/
├── src/
│   ├── api/             # Configuración de Axios
│   ├── components/      # Componentes reutilizables
│   ├── context/         # Contexto de autenticación
│   ├── layout/          # Dashboard y navegación lateral
│   ├── pages/           # Páginas: login, usuarios, productos, etc.
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── vite.config.js
├── package.json
```

---

## ✨ Funcionalidades actuales

### ✅ Autenticación
- Login con JWT
- AuthContext para proteger rutas privadas
- Cierre de sesión

### ✅ Usuarios
- Crear, editar y eliminar usuarios
- Mostrar listado con diseño responsivo
- Control de acceso por rol

### ✅ Productos
- CRUD completo de productos (nombre, stock, precio)
- Formularios con validación básica
- Eliminación con confirmación
- Importar productos desde Excel
### ✅ Clientes
- Alta, edición y eliminación de clientes
- Listado con filtro básico

### ✅ Proveedores
- Alta, edición y eliminación de proveedores
- Listado ordenado por fecha

### ✅ Ventas y facturación
- Crear ventas con presupuestos y facturas
- Registrar pagos

### ✅ Interfaz general
- Dashboard responsivo con navegación lateral (mobile/desktop)
- Diseño limpio con Tailwind
- Placeholder y etiquetas para mejor experiencia UX
- Formulario de demo para registrar una empresa y administrador
- Panel con KPIs en la página principal

---

## 🧭 Rutas implementadas

- `/` (landing page)
- `/login`
- `/demo`
- `/dashboard`
- `/dashboard/usuarios`
- `/dashboard/usuarios/nuevo`
- `/dashboard/usuarios/editar/:id`
- `/dashboard/productos`
- `/dashboard/productos/nuevo`
- `/dashboard/productos/editar/:id`
- `/dashboard/productos/importar`
- `/dashboard/clientes`
- `/dashboard/clientes/nuevo`
- `/dashboard/clientes/editar/:id`
- `/dashboard/proveedores`
- `/dashboard/proveedores/nuevo`
- `/dashboard/proveedores/editar/:id`
- `/dashboard/presupuestos`
- `/dashboard/presupuestos/nuevo`
- `/dashboard/facturas`
- `/dashboard/ventas`
- `/dashboard/ventas/nueva`
- `/dashboard/ventas/editar/:id`

---

## 📌 Por implementar

- Módulo de inventario avanzado
- Búsqueda y filtros
- Responsive PWA (instalable)
- Roles visibles en frontend
- Gráficos y estadísticas

---

## 🧑‍💻 Autor

**Ezequiel** – Desarrollo Fullstack MERN
