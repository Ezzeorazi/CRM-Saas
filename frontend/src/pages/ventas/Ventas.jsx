import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import clienteAxios from '../../api/clienteAxios';
import { Link } from 'react-router-dom';

function Ventas() {
  const { token } = useContext(AuthContext);
  const { showNotification } = useNotification();
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const obtenerVentas = async () => {
      try {
        const { data } = await clienteAxios.get('/ventas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setVentas(data);
      } catch (error) {
        console.error('Error al obtener ventas', error);
      }
    };
    obtenerVentas();
  }, [token]);

  const handleEliminar = async (id) => {
    if (!confirm('¿Eliminar esta venta?')) return;
    try {
      await clienteAxios.delete(`/ventas/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVentas(prev => prev.filter(v => v._id !== id));
    } catch (error) {
      console.error(error);
      showNotification('error', 'Error al eliminar venta');
    }
  };

  return (
    <div className="relative">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Ventas</h2>
        <Link
          to="/dashboard/ventas/nueva"
          className="hidden sm:inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Nueva Venta
        </Link>
      </div>

      {/* Tabla para pantallas grandes */}
      <div className="hidden sm:block overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Cliente</th>
              <th className="p-3">Producto</th>
              <th className="p-3">Cantidad</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.length > 0 ? ventas.map(venta => (
              <tr key={venta._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  {venta.cliente?.nombre || venta.cliente?.razonSocial || venta.cliente?.email || '-'}
                </td>
                <td className="p-3">
                  {venta.productos && venta.productos.length > 0
                    ? venta.productos.map((p, idx) => (
                        <span key={idx} className="block">
                          {p.producto?.nombre || p.producto?.sku || '-'} x{p.cantidad}
                        </span>
                      ))
                    : '-'}
                </td>
                <td className="p-3">
                  {venta.productos?.reduce((acc, p) => acc + p.cantidad, 0) || 0}
                </td>
                <td className="p-3">
                  ${venta.total?.toFixed(2) || '0.00'}
                </td>
                <td className="p-3 flex gap-2 text-sm">
                  <Link to={`/dashboard/ventas/${venta._id}`} className="text-blue-600 hover:underline">
                    Ver
                  </Link>
                  <Link to={`/dashboard/ventas/editar/${venta._id}`} className="text-blue-600 hover:underline">
                    Editar
                  </Link>
                  <button onClick={() => handleEliminar(venta._id)} className="text-red-600 hover:underline">
                    Eliminar
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No hay ventas registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Tarjetas para móviles */}
      <div className="sm:hidden space-y-4">
        {ventas.length > 0 ? ventas.map(venta => (
          <div key={venta._id} className="bg-white rounded shadow p-4 text-sm space-y-2">
            <p><strong>Cliente:</strong> {venta.cliente?.nombre || venta.cliente?.razonSocial || venta.cliente?.email || '-'}</p>
            <div>
              <strong>Productos:</strong>
              {venta.productos?.length > 0 ? (
                <ul className="list-disc list-inside">
                  {venta.productos.map((p, idx) => (
                    <li key={idx}>
                      {p.producto?.nombre || p.producto?.sku || '-'} x{p.cantidad}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>-</p>
              )}
            </div>
            <p><strong>Total de unidades:</strong> {venta.productos?.reduce((acc, p) => acc + p.cantidad, 0) || 0}</p>
            <p><strong>Total:</strong> ${venta.total?.toFixed(2) || '0.00'}</p>
            <div className="flex gap-3 pt-2">
              <Link to={`/dashboard/ventas/${venta._id}`} className="text-blue-600 hover:underline">Ver</Link>
              <Link to={`/dashboard/ventas/editar/${venta._id}`} className="text-blue-600 hover:underline">Editar</Link>
              <button onClick={() => handleEliminar(venta._id)} className="text-red-600 hover:underline">Eliminar</button>
            </div>
          </div>
        )) : (
          <p className="text-center text-gray-500">No hay ventas registradas</p>
        )}
      </div>

      {/* Botón flotante para móviles */}
      <Link
        to="/dashboard/ventas/nueva"
        className="sm:hidden fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700 z-10"
      >
        +
      </Link>
    </div>
  );
}

export default Ventas;
