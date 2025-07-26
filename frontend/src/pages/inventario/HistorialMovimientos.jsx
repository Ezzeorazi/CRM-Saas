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
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Inventario</h2>
        <div className="flex gap-2">
          <Link to="/dashboard/inventario/entrada" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">+ Entrada</Link>
          <Link to="/dashboard/inventario/salida" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">- Salida</Link>
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left">
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
            {movimientos.map(m => (
              <tr key={m._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{m.productoId?.nombre}</td>
                <td className="p-3">{m.tipo}</td>
                <td className="p-3">{m.cantidad}</td>
                <td className="p-3">{m.motivo}</td>
                <td className="p-3">{new Date(m.fecha).toLocaleDateString()}</td>
              </tr>
            ))}
            {movimientos.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No hay movimientos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistorialMovimientos;
