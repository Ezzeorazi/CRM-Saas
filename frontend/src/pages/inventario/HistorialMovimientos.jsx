import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import clienteAxios from '../../api/clienteAxios';
import { Link } from 'react-router-dom';

function HistorialMovimientos() {
  const { token } = useContext(AuthContext);
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    const obtener = async () => {
      try {
        const { data } = await clienteAxios.get('/movimientos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMovimientos(data);
      } catch (error) {
        console.error(error);
      }
    };
    obtener();
  }, [token]);

  return (
    <div className="relative">
      {/* Encabezado y acciones */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Inventario</h2>
        <div className="hidden sm:flex gap-2">
          <Link to="/dashboard/inventario/entrada" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            + Entrada
          </Link>
          <Link to="/dashboard/inventario/salida" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            - Salida
          </Link>
        </div>
      </div>

      {/* Tabla para pantallas grandes */}
      <div className="hidden sm:block overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Producto</th>
              <th className="p-3">Tipo</th>
              <th className="p-3">Cantidad</th>
              <th className="p-3">Motivo</th>
              <th className="p-3">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.length > 0 ? movimientos.map(m => (
              <tr key={m._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{m.productoId?.nombre || '—'}</td>
                <td className="p-3 capitalize">{m.tipo}</td>
                <td className="p-3">{m.cantidad}</td>
                <td className="p-3">{m.motivo || '—'}</td>
                <td className="p-3">{new Date(m.fecha).toLocaleDateString()}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No hay movimientos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Tarjetas para móviles */}
      <div className="sm:hidden space-y-4">
        {movimientos.length > 0 ? movimientos.map(m => (
          <div key={m._id} className="bg-white rounded shadow p-4 space-y-1 text-sm">
            <p><strong>Producto:</strong> {m.productoId?.nombre || '—'}</p>
            <p><strong>Tipo:</strong> <span className="capitalize">{m.tipo}</span></p>
            <p><strong>Cantidad:</strong> {m.cantidad}</p>
            <p><strong>Motivo:</strong> {m.motivo || '—'}</p>
            <p><strong>Fecha:</strong> {new Date(m.fecha).toLocaleDateString()}</p>
          </div>
        )) : (
          <p className="text-center text-gray-500 py-6">No hay movimientos</p>
        )}
      </div>

      {/* Botones flotantes para móviles */}
      <div className="sm:hidden fixed bottom-4 right-4 flex flex-col gap-2 z-10">
        <Link
          to="/dashboard/inventario/entrada"
          className="bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700 text-sm text-center"
        >
          + Entrada
        </Link>
        <Link
          to="/dashboard/inventario/salida"
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 text-sm text-center"
        >
          - Salida
        </Link>
      </div>
    </div>
  );
}

export default HistorialMovimientos;
