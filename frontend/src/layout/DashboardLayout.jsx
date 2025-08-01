import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { Bars3Icon, XMarkIcon, HomeIcon, UserGroupIcon, ShoppingBagIcon, ArchiveBoxIcon, CurrencyDollarIcon, UsersIcon, ReceiptPercentIcon, ClipboardDocumentListIcon, TruckIcon, CalendarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const navItems = [
  { to: '/dashboard', label: 'Inicio', icon: HomeIcon },
  { to: '/dashboard/usuarios', label: 'Usuarios', icon: UserGroupIcon, roles: ['admin', 'rrhh'] },
  { to: '/dashboard/productos', label: 'Productos', icon: ShoppingBagIcon },
  { to: '/dashboard/inventario', label: 'Inventario', icon: ArchiveBoxIcon },
  { to: '/dashboard/ventas', label: 'Ventas', icon: CurrencyDollarIcon },
  { to: '/dashboard/clientes', label: 'Clientes', icon: UsersIcon },
  { to: '/dashboard/facturas', label: 'Facturas', icon: ReceiptPercentIcon },
  { to: '/dashboard/presupuestos', label: 'Presupuestos', icon: ClipboardDocumentListIcon },
  { to: '/dashboard/proveedores', label: 'Proveedores', icon: TruckIcon },
  { to: '/dashboard/tareas', label: 'Tareas', icon: CalendarIcon },
  { to: '/dashboard/produccion', label: 'Producción', icon: Cog6ToothIcon, roles: ['admin', 'produccion'] },
];

function DashboardLayout({ children }) {
  const { usuario, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderNav = (onClickLink) => (
    <nav className="flex flex-col gap-2 text-sm" role="navigation" aria-label="Menú principal">
      {navItems.map(({ to, label, icon: Icon, roles }) => {
        if (roles && !roles.includes(usuario?.rol)) return null;
        const isActive = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onClickLink}
            className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${isActive ? 'bg-gray-900 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar escritorio */}
      <aside className="hidden md:flex md:flex-col w-64 bg-gray-800 text-white p-4 shadow-inner space-y-6">
        <h2 className="text-2xl font-bold tracking-wide">🌀 Nimbus CRM</h2>
        <p className="text-sm text-gray-300">Hola, <span className="font-medium">{usuario?.nombre}</span></p>
        {renderNav()}
        <button
          onClick={logout}
          className="mt-auto text-sm bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* Overlay y sidebar móvil */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-20 md:hidden" onClick={toggleSidebar} />
      )}

      <aside className={`fixed z-30 top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Nimbus CRM</h2>
          <XMarkIcon className="w-6 h-6 cursor-pointer" onClick={toggleSidebar} />
        </div>
        <p className="mb-4 text-sm text-gray-300">Hola, <span className="font-medium">{usuario?.nombre}</span></p>
        {renderNav(toggleSidebar)}
        <button
          onClick={() => { logout(); setSidebarOpen(false); }}
          className="mt-10 text-sm bg-red-600 px-3 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Header móvil */}
        <header className="bg-white shadow px-4 py-3 flex items-center justify-between md:hidden">
          <Bars3Icon className="w-6 h-6 cursor-pointer" onClick={toggleSidebar} />
          <h1 className="text-lg font-bold">Panel</h1>
          <span />
        </header>

        {/* Contenido */}
        <main className="flex-1 p-6 overflow-auto">
          <Breadcrumb />
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;