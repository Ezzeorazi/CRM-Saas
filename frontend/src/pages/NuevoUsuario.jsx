import { useState, useContext } from 'react';
import clienteAxios from '../api/clienteAxios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function NuevoUsuario() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    rol: 'ventas'
  });

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      await clienteAxios.post('/usuarios', formulario, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensaje('✅ Usuario creado correctamente');
      setTimeout(() => navigate('/dashboard/usuarios'), 2000);
    } catch (err) {
      setError(err.response?.data?.mensaje || '❌ Error al crear usuario');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Crear nuevo usuario</h2>

        {mensaje && <div className="bg-green-100 text-green-800 p-3 rounded mb-4">{mensaje}</div>}
        {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              placeholder="Juan Pérez"
              value={formulario.nombre}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="usuario@empresa.com"
              value={formulario.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              name="contraseña"
              placeholder="••••••••"
              value={formulario.contraseña}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
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
              Crear usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NuevoUsuario;
