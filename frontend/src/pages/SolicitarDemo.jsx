import { useState } from 'react';
import axios from 'axios';
import Header from '../layout/Header';
import { useNotification } from '../context/NotificationContext';

export default function SolicitarDemo() {
  const [formulario, setFormulario] = useState({
    nombreEmpresa: '',
    plan: 'demo',
    colorPrimario: '#4f46e5',
    subdominio: '',
    nombreUsuario: '',
    emailUsuario: '',
    contraseña: ''
  });
  const { showNotification } = useNotification();
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_BACKEND_URL;


  const handleChange = e => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = async e => {
  e.preventDefault();
  setError('');
  try {
    await axios.post(`${API_URL}/empresas`, {
      nombre: formulario.nombreEmpresa,
      plan: formulario.plan,
      colorPrimario: formulario.colorPrimario,
      subdominio: formulario.subdominio,
      nombreUsuario: formulario.nombreUsuario,
      emailUsuario: formulario.emailUsuario,
      contraseña: formulario.contraseña
    });
    showNotification('success', 'Empresa creada correctamente. Ya podés iniciar sesión.');
    setFormulario({
      nombreEmpresa: '',
      plan: 'demo',
      colorPrimario: '#4f46e5',
      subdominio: '',
      nombreUsuario: '',
      emailUsuario: '',
      contraseña: ''
    });
  } catch (err) {
    setError(err.response?.data?.mensaje || 'Error al crear empresa');
    showNotification('error', err.response?.data?.mensaje || 'Error al crear empresa');
  }
};
  return (
    <>
      <Header />
      <div className="max-w-xl mx-auto my-10 p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">Solicitar Demo</h2>
        {error && <div className="bg-red-100 p-3 mb-4 text-red-800 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Nombre de la empresa</label>
            <input
              type="text"
              name="nombreEmpresa"
              value={formulario.nombreEmpresa}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Subdominio deseado</label>
            <input
              type="text"
              name="subdominio"
              value={formulario.subdominio}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Nombre del usuario administrador</label>
            <input
              type="text"
              name="nombreUsuario"
              value={formulario.nombreUsuario}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="emailUsuario"
              value={formulario.emailUsuario}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Contraseña</label>
            <input
              type="password"
              name="contraseña"
              value={formulario.contraseña}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
            Crear empresa
          </button>
        </form>
      </div>
    </>
  );
}
