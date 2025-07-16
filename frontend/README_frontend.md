
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

### ✅ Interfaz general
- Dashboard responsivo con navegación lateral (mobile/desktop)
- Diseño limpio con Tailwind
- Placeholder y etiquetas para mejor experiencia UX

---

## 🧭 Rutas implementadas

- `/login`
- `/dashboard`
- `/dashboard/usuarios`
- `/dashboard/usuarios/nuevo`
- `/dashboard/usuarios/editar/:id`
- `/dashboard/productos`
- `/dashboard/productos/nuevo`
- `/dashboard/productos/editar/:id`
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
