import { useEffect, useState, useContext } from 'react';
import clienteAxios from '../../api/clienteAxios';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const { data } = await clienteAxios.get('/usuarios', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsuarios(data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error.response?.data?.mensaje);
      }
    };

    obtenerUsuarios();
  }, [token]);

  const handleEliminar = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

    try {
      await clienteAxios.delete(`/usuarios/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsuarios(prev => prev.filter(u => u._id !== id));
    } catch (error) {
      console.error('Error al eliminar usuario:', error.response?.data?.mensaje);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold">Usuarios</h2>
        <Link
          to="/dashboard/usuarios/nuevo"
          className="mt-4 sm:mt-0 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Nuevo Usuario
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-left text-sm text-gray-600 uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Rol</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {usuarios.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3">{u.nombre}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3 capitalize">{u.rol}</td>
                <td className="px-4 py-3 flex flex-wrap justify-center gap-2">
                  <Link
                    to={`/dashboard/usuarios/editar/${u._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleEliminar(u._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {usuarios.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usuarios;
