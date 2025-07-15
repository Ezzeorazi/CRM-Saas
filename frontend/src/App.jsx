import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import DashboardLayout from './layout/DashboardLayout';
import Usuarios from './pages/Usuarios';
import NuevoUsuario from './pages/NuevoUsuario';
import EditarUsuario from './pages/EditarUsuario';
import NuevoProducto from './pages/NuevoProducto';
import EditarProducto from './pages/EditarProducto';
import Productos from './pages/Productos';

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
                <h1 className="text-2xl font-bold">Bienvenido al Panel</h1>
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/usuarios"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Usuarios />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/usuarios/nuevo"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <NuevoUsuario />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/usuarios/editar/:id"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <EditarUsuario />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/inventario"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <h1 className="text-xl font-bold">Inventario</h1>
              </DashboardLayout>
            </PrivateRoute>
          }
        />

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;
