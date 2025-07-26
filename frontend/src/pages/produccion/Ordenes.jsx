import { useContext, useEffect, useState } from 'react';
import clienteAxios from '../../api/clienteAxios';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function Ordenes() {
  const { token } = useContext(AuthContext);
  const [ordenes, setOrdenes] = useState([]);

  const obtenerOrdenes = async () => {
    try {
      const { data } = await clienteAxios.get('/ordenes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrdenes(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { obtenerOrdenes(); }, [token]);

  const progreso = etapas => {
    if (!etapas.length) return 0;
    const completadas = etapas.filter(e => e.estado === 'completada').length;
    return Math.round((completadas / etapas.length) * 100);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Órdenes de Producción</h2>
        <Link to="/dashboard/produccion/nueva" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Nueva Orden
        </Link>
      </div>
      <div className="space-y-4">
        {ordenes.map(orden => (
          <Link key={orden._id} to={`/dashboard/produccion/${orden._id}`} className="block bg-white p-4 rounded shadow hover:bg-gray-50">
            <p className="font-semibold">Producto: {orden.producto?.nombre || orden.producto}</p>
            <p>Cantidad: {orden.cantidad}</p>
            <div className="h-2 bg-gray-200 rounded mt-2">
              <div className="h-2 bg-blue-600 rounded" style={{ width: `${progreso(orden.etapas)}%` }} />
            </div>
          </Link>
        ))}
        {ordenes.length === 0 && <p className="text-gray-500">No hay órdenes registradas</p>}
      </div>
    </div>
  );
}

export default Ordenes;
