import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function DashboardLayout({ children }) {
  const { usuario, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar para escritorio */}
      <aside className="hidden md:flex md:flex-col w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Nimbus CRM</h2>
        <p className="mb-6">Hola, {usuario?.nombre}</p>
        <nav className="flex flex-col gap-2">
          <Link to="/dashboard" className="hover:text-blue-300">Inicio</Link>

          {(usuario?.rol === 'admin' || usuario?.rol === 'rrhh') && (
            <Link to="/dashboard/usuarios" className="hover:text-blue-300">Usuarios</Link>
          )}

          <Link to="/dashboard/productos" className="hover:text-blue-300">Productos</Link>
          <Link to="/dashboard/ventas" className="hover:text-blue-300">Ventas</Link>
          <Link to="/dashboard/clientes" className="hover:text-blue-300">Clientes</Link>
          <Link to="/dashboard/proveedores" className="hover:text-blue-300">Proveedores</Link>
        </nav>

        <button
          onClick={logout}
          className="mt-auto text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* Sidebar para móviles */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`fixed z-30 top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform md:hidden`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">CRM SaaS</h2>
          <XMarkIcon className="w-6 h-6 cursor-pointer" onClick={() => setSidebarOpen(false)} />
        </div>
        <p className="mb-6">Hola, {usuario?.nombre}</p>
        <nav className="flex flex-col gap-2">
          <Link to="/dashboard" className="hover:text-blue-300" onClick={() => setSidebarOpen(false)}>Inicio</Link>
          <Link to="/dashboard/usuarios" className="hover:text-blue-300" onClick={() => setSidebarOpen(false)}>Usuarios</Link>
          <Link to="/dashboard/productos" className="hover:text-blue-300" onClick={() => setSidebarOpen(false)}>Productos</Link>
          <Link to="/dashboard/ventas" className="hover:text-blue-300" onClick={() => setSidebarOpen(false)}>Ventas</Link>
        </nav>
        <button
          onClick={() => { logout(); setSidebarOpen(false); }}
          className="mt-10 text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow px-4 py-3 flex items-center justify-between md:hidden">
          <Bars3Icon className="w-6 h-6 cursor-pointer" onClick={() => setSidebarOpen(true)} />
          <h1 className="text-lg font-bold">Panel</h1>
          <span />
        </header>

        {/* Contenido */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
