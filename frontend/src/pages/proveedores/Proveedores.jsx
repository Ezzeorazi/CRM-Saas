// Listado de proveedores obtenido desde /api/proveedores.
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import clienteAxios from '../../api/clienteAxios';
import { Link } from 'react-router-dom';

function Proveedores() {
  const { token } = useContext(AuthContext);
  const { showNotification } = useNotification();
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    const obtenerProveedores = async () => {
      try {
        const { data } = await clienteAxios.get('/proveedores', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProveedores(data);
      } catch (error) {
        console.error('Error al obtener proveedores', error);
      }
    };

    obtenerProveedores();
  }, [token]);

  const handleEliminar = async (id) => {
    const confirmar = confirm('¿Estás seguro de eliminar este proveedor?');
    if (!confirmar) return;
    try {
      await clienteAxios.delete(`/proveedores/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProveedores(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error(error);
      showNotification('error', 'Error al eliminar proveedor');
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h2 className="text-2xl font-bold">Proveedores</h2>
        <Link
          to="/dashboard/proveedores/nuevo"
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          + Nuevo Proveedor
        </Link>
      </div>

      {proveedores.length === 0 ? (
        <p className="text-gray-500">No hay proveedores cargados aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {proveedores.map((proveedor) => (
            <div key={proveedor._id} className="bg-white rounded-2xl shadow p-5 space-y-2 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-800">{proveedor.nombre}</h3>
              <p className="text-sm text-gray-600">{proveedor.empresa}</p>
              <p className="text-sm text-gray-600">{proveedor.email}</p>
              <p className="text-sm text-gray-600">{proveedor.telefono}</p>
              <p className="text-sm text-gray-500">{proveedor.ciudad}, {proveedor.pais}</p>

              <div className="pt-3 flex justify-end gap-4 text-sm">
                <Link to={`/dashboard/proveedores/editar/${proveedor._id}`} className="text-blue-600 hover:underline">
                  Editar
                </Link>
                <button onClick={() => handleEliminar(proveedor._id)} className="text-red-600 hover:underline">
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

export default Proveedores;