# 📚 Funcionamiento Técnico del CRM SaaS

Este documento detalla el flujo completo de la aplicación utilizando terminología técnica.

## Arquitectura General

- **Full Stack MERN** (MongoDB, Express.js, React, Node.js).
- Patrón **RESTful** para la comunicación entre frontend y backend.
- Despliegue orientado a la nube: servidores Node en Railway y frontend estático en Netlify.

## Flujo de Autenticación

1. El usuario envía credenciales a `POST /api/auth/login`.
2. El backend valida y genera un **JWT** que incluye `empresaId` y roles.
3. El token se guarda en `localStorage` y se envía en el header `Authorization` en cada petición.
4. Middlewares de Express verifican la firma y asignan `req.empresaId` para aislamiento multi‑tenant.

## Gestión de Datos

- **Usuarios, productos, clientes y proveedores** se almacenan en MongoDB en colecciones separadas.
- Todas las consultas filtran por `empresaId` para garantizar la separación de datos.
- Los módulos de ventas, presupuestos y facturas se relacionan mediante referencias (`ObjectId`).
- El inventario registra movimientos de entrada y salida para mantener un historial auditado.

## Ciclo de Ventas

1. Se crea un **presupuesto** con listado de productos y precios.
2. Cuando el cliente acepta, se genera una **venta** y opcionalmente una **factura**.
3. Los pagos se registran en la colección `pagos` ligados a la factura correspondiente.
4. Cada venta reduce el stock mediante un movimiento de salida.

## Producción y Tareas

- Las **órdenes de producción** están enlazadas a productos finales y consumen materias primas mediante movimientos de inventario.
- Las **tareas** permiten asignar responsables y fechas de vencimiento, útiles para seguimiento interno.

## Frontend

- Construido con **React + Vite**. Usa **Context API** para manejar la sesión y roles del usuario.
- La navegación se gestiona con **React Router DOM**. Cada ruta privada verifica el token antes de renderizar.
- Los formularios aprovechan componentes controlados y llamadas a la API via **Axios**.

## Automatizaciones

- Un **cron job** diario detecta productos con stock bajo y envía un correo de alerta.
- Los presupuestos pueden exportarse a PDF utilizando `pdfkit` y el logo corporativo cargado por la empresa.

## Pruebas

- Se usan **Jest** y **Vitest** para las suites de backend y frontend respectivamente.
- Los tests verifican middleware de autenticación, controladores críticos y componentes de interfaz.

---

Consulta los archivos `README_backend.md` y `README_frontend.md` para detalles específicos de cada capa.
