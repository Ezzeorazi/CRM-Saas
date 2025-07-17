import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import clienteAxios from '../../api/clienteAxios';
import { Link } from 'react-router-dom';

function Presupuestos() {
  const { token } = useContext(AuthContext);
  const [presupuestos, setPresupuestos] = useState([]);

  useEffect(() => {
    const obtener = async () => {
      try {
        const { data } = await clienteAxios.get('/presupuestos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPresupuestos(data);
      } catch (err) {
        console.error('Error al obtener presupuestos', err);
      }
    };
    obtener();
  }, [token]);

  const handleEliminar = async (id) => {
    if (!confirm('¿Eliminar este presupuesto?')) return;
    try {
      await clienteAxios.delete(`/presupuestos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPresupuestos(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      alert('Error al eliminar presupuesto');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Presupuestos</h2>
        <Link
          to="/dashboard/presupuestos/nuevo"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Nuevo Presupuesto
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
            {presupuestos.map(p => (
              <tr key={p._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{p.cliente}</td>
                <td className="p-3">{p.producto}</td>
                <td className="p-3">{p.cantidad}</td>
                <td className="p-3">${p.precio}</td>
                <td className="p-3 flex gap-2 text-sm">
                  <Link to={`/dashboard/presupuestos/editar/${p._id}`} className="text-blue-600 hover:underline">
                    Editar
                  </Link>
                  <button onClick={() => handleEliminar(p._id)} className="text-red-600 hover:underline">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {presupuestos.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No hay presupuestos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Presupuestos;
