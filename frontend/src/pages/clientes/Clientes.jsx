// Listado de clientes obtenido desde /api/clientes.
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import clienteAxios from '../../api/clienteAxios';
import { Link } from 'react-router-dom';


function Clientes() {
  const { token } = useContext(AuthContext);
  const { showNotification } = useNotification();
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const { data } = await clienteAxios.get('/clientes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setClientes(data);
      } catch (error) {
        console.error('Error al obtener clientes', error);
      }
    };

    obtenerClientes();
  }, [token]);

  const handleEliminar = async (id) => {
    const confirmar = confirm('¿Estás seguro de eliminar este cliente?');
    if (!confirmar) return;
    try {
      await clienteAxios.delete(`/clientes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClientes(prev => prev.filter(c => c._id !== id));
    } catch (error) {
      console.error(error);
      showNotification('error', 'Error al eliminar cliente');
    }
  };


  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h2 className="text-2xl font-bold">Clientes</h2>
        <Link
          to="/dashboard/clientes/nuevo"
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          + Nuevo Cliente
        </Link>
      </div>

      {clientes.length === 0 ? (
        <p className="text-gray-500">No hay clientes cargados aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientes.map((cliente) => (
            <div key={cliente._id} className="bg-white rounded-2xl shadow p-5 space-y-2 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-800">{cliente.nombre}</h3>
              <p className="text-sm text-gray-600">{cliente.empresa}</p>
              <p className="text-sm text-gray-600">{cliente.email}</p>
              <p className="text-sm text-gray-600">{cliente.telefono}</p>
              <p className="text-sm text-gray-500">{cliente.ciudad}, {cliente.pais}</p>

              <div className="pt-3 flex justify-end gap-4 text-sm">
                <Link
                  to={`/dashboard/clientes/editar/${cliente._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleEliminar(cliente._id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Clientes;
