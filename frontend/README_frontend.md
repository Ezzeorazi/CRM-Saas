
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
## 🏃‍♂️ Puesta en marcha

1. Instala las dependencias del frontend:
   ```bash
   cd frontend && npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Ejecuta las pruebas de la interfaz con:
   ```bash
   npm test
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
- Formulario de ventas puede cargar automáticamente un presupuesto aceptado
- Ver detalle de cada venta
- Descargar presupuestos en PDF

### ✅ Inventario
- Registrar entradas y salidas de stock
- Historial de movimientos

### ✅ Tareas
- Crear y actualizar tareas
- Vista agrupada por estado

### ✅ Producción
- Crear órdenes de producción
- Seguimiento de etapas y detalles

### ✅ Interfaz general
- Dashboard responsivo con navegación lateral (mobile/desktop)
- Diseño limpio con Tailwind
- Placeholder y etiquetas para mejor experiencia UX
- Breadcrumbs para indicar la ubicación actual
- Formulario de demo para registrar una empresa y administrador
- Notificaciones tipo toast y cuadros de confirmación reutilizables
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
- `/dashboard/ventas/:id`
- `/dashboard/inventario`
- `/dashboard/inventario/entrada`
- `/dashboard/inventario/salida`
- `/dashboard/tareas`
- `/dashboard/tareas/:id`
- `/dashboard/produccion`
- `/dashboard/produccion/nueva`
- `/dashboard/produccion/:id`

---

## 📌 Por implementar

- Responsive PWA (instalable)
- Roles visibles en frontend
- Gráficos y estadísticas

---

## 🧑‍💻 Autor

**Ezequiel** – Desarrollo Fullstack MERN

Para una descripción completa de la arquitectura revisa `README_FUNCIONAMIENTO.md` en la raíz del repositorio.
