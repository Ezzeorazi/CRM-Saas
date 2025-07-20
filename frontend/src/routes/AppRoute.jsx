// Define todas las rutas de la aplicación para React Router.
// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import RolProtectedRoute from '../components/RolProtectedRoute';
import DashboardLayout from '../layout/DashboardLayout';

import Login from '../pages/Login';
import Landing from '../pages/Landing';

import Usuarios from '../pages/usuarios/Usuarios';
import NuevoUsuario from '../pages/usuarios/NuevoUsuario';
import EditarUsuario from '../pages/usuarios/EditarUsuario';

import Productos from '../pages/productos/Productos';
import NuevoProducto from '../pages/productos/NuevoProducto';
import EditarProducto from '../pages/productos/EditarProducto';
import ImportarProductos from '../pages/productos/ImportarProductos'

import Clientes from '../pages/clientes/Clientes';
import NuevoCliente from '../pages/clientes/NuevoCliente';
import EditarCliente from '../pages/clientes/EditarCliente';

import DashboardKPIs from '../components/DashboardKPIs';
import NotFound from '../pages/NotFound';
import Proveedores from '../pages/proveedores/Proveedores';
import EditarProveedor from '../pages/proveedores/EditarProveedores';
import NuevoProveedor from '../pages/proveedores/NuevoProveedor';
import Ventas from '../pages/ventas/Ventas';
import NuevaVenta from '../pages/ventas/NuevaVenta';
import EditarVenta from '../pages/ventas/EditarVenta';
import Presupuestos from '../pages/presupuestos/Presupuestos';
import NuevoPresupuesto from '../pages/presupuestos/NuevoPresupuesto';
import Facturas from '../pages/facturas/Facturas';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard principal con KPIs */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <h1 className="text-2xl font-bold mb-4">Bienvenido al Panel</h1>
              <DashboardKPIs />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      {/* Usuarios (solo admin y rrhh) */}
      <Route
        path="/dashboard/usuarios"
        element={
          <PrivateRoute>
            <RolProtectedRoute rolesPermitidos={['admin', 'rrhh']}>
              <DashboardLayout>
                <Usuarios />
              </DashboardLayout>
            </RolProtectedRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/usuarios/nuevo"
        element={
          <PrivateRoute>
            <RolProtectedRoute rolesPermitidos={['admin', 'rrhh']}>
              <DashboardLayout>
                <NuevoUsuario />
              </DashboardLayout>
            </RolProtectedRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/usuarios/editar/:id"
        element={
          <PrivateRoute>
            <RolProtectedRoute rolesPermitidos={['admin', 'rrhh']}>
              <DashboardLayout>
                <EditarUsuario />
              </DashboardLayout>
            </RolProtectedRoute>
          </PrivateRoute>
        }
      />

      {/* Productos (acceso general autenticado) */}
      <Route
        path="/dashboard/productos"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Productos />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/productos/nuevo"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <NuevoProducto />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/productos/editar/:id"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <EditarProducto />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      {/* Clientes (no accesible para rrhh) */}
      <Route
        path="/dashboard/clientes"
        element={
          <PrivateRoute>
            <RolProtectedRoute rolesPermitidos={['admin', 'ventas', 'soporte']}>
              <DashboardLayout>
                <Clientes />
              </DashboardLayout>
            </RolProtectedRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/clientes/nuevo"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <NuevoCliente />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/clientes/editar/:id"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <EditarCliente />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/proveedores"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Proveedores />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/proveedores/nuevo"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <NuevoProveedor />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/proveedores/editar/:id"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <EditarProveedor />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/ventas"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Ventas />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/ventas/nueva"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <NuevaVenta />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/ventas/editar/:id"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <EditarVenta />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/presupuestos"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Presupuestos />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/presupuestos/nuevo"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <NuevoPresupuesto />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/facturas"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Facturas />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/productos/importar"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <ImportarProductos />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
