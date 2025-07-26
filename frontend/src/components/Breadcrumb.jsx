import { Link, useLocation } from 'react-router-dom';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function Breadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);

  if (!segments.includes('dashboard')) return null;

  const nameMap = {
    dashboard: 'Dashboard',
    usuarios: 'Usuarios',
    productos: 'Productos',
    clientes: 'Clientes',
    proveedores: 'Proveedores',
    ventas: 'Ventas',
    inventario: 'Inventario',
    presupuestos: 'Presupuestos',
    facturas: 'Facturas',
    tareas: 'Tareas',
    produccion: 'Producción',
    nuevo: 'Nuevo',
    nueva: 'Nueva',
    editar: 'Editar',
    importar: 'Importar',
    entrada: 'Entrada',
    salida: 'Salida'
  };

  return (
    <nav className="text-gray-600 text-sm mb-4" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex">
        {segments.map((seg, idx) => {
          const path = '/' + segments.slice(0, idx + 1).join('/');
          const isLast = idx === segments.length - 1;
          const isId = /^[0-9a-fA-F]{24}$/.test(seg) || /^\d+$/.test(seg);
          const label = nameMap[seg] || (isId ? 'Detalle' : capitalize(seg));
          return (
            <li key={path} className="flex items-center">
              {!isLast ? (
                <>
                  <Link to={path} className="text-blue-600 hover:underline">
                    {label}
                  </Link>
                  <span className="mx-2">&gt;</span>
                </>
              ) : (
                <span>{label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
