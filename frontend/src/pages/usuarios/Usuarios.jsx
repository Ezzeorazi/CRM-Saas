// Listado de usuarios administrado por roles.
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
    <div className="w-full relative">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold">Usuarios</h2>
        <Link
          to="/dashboard/usuarios/nuevo"
          className="hidden sm:inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Nuevo Usuario
        </Link>
      </div>

      {/* Tabla para pantallas medianas y grandes */}
      <div className="hidden sm:block overflow-x-auto bg-white rounded shadow">
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

      {/* Vista tipo tarjetas para móviles */}
      <div className="sm:hidden space-y-4">
        {usuarios.length > 0 ? usuarios.map((u) => (
          <div key={u._id} className="bg-white rounded shadow p-4 space-y-2">
            <p><span className="font-semibold">Nombre:</span> {u.nombre}</p>
            <p><span className="font-semibold">Email:</span> {u.email}</p>
            <p><span className="font-semibold">Rol:</span> <span className="capitalize">{u.rol}</span></p>
            <div className="flex gap-2 pt-2">
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
            </div>
          </div>
        )) : (
          <p className="text-center text-gray-500 py-6">No hay usuarios registrados.</p>
        )}
      </div>

      {/* Botón flotante para móviles */}
      <Link
        to="/dashboard/usuarios/nuevo"
        className="sm:hidden fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700"
      >
        +
      </Link>
    </div>
  );
}

export default Usuarios;
