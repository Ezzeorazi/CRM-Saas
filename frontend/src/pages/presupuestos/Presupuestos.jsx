import { useEffect, useState, useContext } from 'react';
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
      } catch (error) {
        console.error('Error al obtener presupuestos', error);
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
    } catch (error) {
      console.error(error);
      alert('Error al eliminar presupuesto');
    }
  };

  const handleConvertirVenta = async (id) => {
    if (!confirm('¿Convertir este presupuesto en venta?')) return;
    try {
      await clienteAxios.post(`/ventas/desde-presupuesto/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Venta creada con éxito');
    } catch (error) {
      console.error('Error al convertir presupuesto en venta', error);
      alert('No se pudo crear la venta');
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h2 className="text-2xl font-bold">Presupuestos</h2>
        <Link
          to="/dashboard/presupuestos/nuevo"
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          + Nuevo Presupuesto
        </Link>
      </div>

      {presupuestos.length === 0 ? (
        <p className="text-gray-500">No hay presupuestos cargados aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {presupuestos.map(p => (
            <div key={p._id} className="bg-white rounded-2xl shadow p-5 space-y-2 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-800">{p.cliente?.nombre || 'Cliente no definido'}</h3>
              <p className="text-sm text-gray-600">Estado: {p.estado}</p>
              <p className="text-sm text-gray-600">Total: ${p.total}</p>

              <div className="pt-3 flex justify-end gap-4 text-sm">
                <button onClick={() => handleEliminar(p._id)} className="text-red-600 hover:underline">
                  Eliminar
                </button>

                {p.estado === 'aceptado' && (
                  <button
                    onClick={() => handleConvertirVenta(p._id)}
                    className="text-green-600 hover:underline"
                  >
                    Convertir en Venta
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Presupuestos;
