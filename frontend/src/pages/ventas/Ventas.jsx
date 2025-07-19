import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import clienteAxios from '../../api/clienteAxios';
import { Link } from 'react-router-dom';

function Ventas() {
  const { token } = useContext(AuthContext);
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
      alert('Error al eliminar venta');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Ventas</h2>
        <Link
          to="/dashboard/ventas/nueva"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Nueva Venta
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left">
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
            {ventas.map(venta => (
              <tr key={venta._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{venta.cliente}</td>
                <td className="p-3">{venta.producto}</td>
                <td className="p-3">{venta.cantidad}</td>
                <td className="p-3">${venta.precio}</td>
                <td className="p-3 flex gap-2 text-sm">
                  <Link to={`/dashboard/ventas/editar/${venta._id}`} className="text-blue-600 hover:underline">
                    Editar
                  </Link>
                  <button onClick={() => handleEliminar(venta._id)} className="text-red-600 hover:underline">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {ventas.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No hay ventas registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Ventas;
