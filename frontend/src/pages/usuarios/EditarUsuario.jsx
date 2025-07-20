// Edición de datos de un usuario.
import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import clienteAxios from '../../api/clienteAxios';
import { AuthContext } from '../../context/AuthContext';

function EditarUsuario() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    rol: 'ventas',
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const { data } = await clienteAxios.get(`/usuarios/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormulario({
          nombre: data.nombre,
          email: data.email,
          rol: data.rol,
        });
      } catch (error) {
        console.error(error);
        setError('Error al cargar datos del usuario');
      }
    };

    obtenerUsuario();
  }, [id, token]);

  const handleChange = e => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      await clienteAxios.put(`/usuarios/${id}`, formulario, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensaje('✅ Usuario actualizado correctamente');
      setTimeout(() => navigate('/dashboard/usuarios'), 2000);
    } catch (error) {
      console.error(error);
      setError('❌ Error al actualizar usuario');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Editar Usuario</h2>

        {mensaje && <div className="bg-green-100 text-green-800 p-3 rounded mb-4">{mensaje}</div>}
        {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Juan Pérez"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formulario.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="usuario@empresa.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
            <select
              name="rol"
              value={formulario.rol}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="admin">Admin</option>
              <option value="ventas">Ventas</option>
              <option value="compras">Compras</option>
              <option value="inventario">Inventario</option>
              <option value="rrhh">RRHH</option>
              <option value="produccion">Producción</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 px-4 rounded transition font-medium"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarUsuario;
