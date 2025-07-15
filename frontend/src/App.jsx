import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import RolProtectedRoute from './components/RolProtectedRoute'; // 👈 nuevo
import DashboardLayout from './layout/DashboardLayout';
import Usuarios from './pages/usuarios/Usuarios';
import NuevoUsuario from './pages/usuarios/NuevoUsuario';
import EditarUsuario from './pages/usuarios/EditarUsuario';
import NuevoProducto from './pages/productos/NuevoProducto';
import EditarProducto from './pages/productos/EditarProducto';
import Productos from './pages/productos/Productos';
import DashboardKPIs from './components/DashboardKPIs';
import Clientes from './pages/clientes/Clientes'
import NuevoCliente from './pages/clientes/NuevoCliente';
import EditarCliente from './pages/clientes/EditarCliente';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

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

        {/* ✅ Rutas de usuarios protegidas por rol */}
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

        {/* ✅ Rutas de productos accesibles para todos los usuarios autenticados */}
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
      </Routes>

      
    </BrowserRouter>
  );
}

export default App;
