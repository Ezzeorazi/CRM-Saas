import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNotification } from '../context/NotificationContext';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import Header from '../layout/Header';

export default function SolicitarDemo() {
  const [formulario, setFormulario] = useState({
    nombreEmpresa: '',
    plan: 'demo',
    colorPrimario: '#4f46e5',
    nombreUsuario: '',
    emailUsuario: '',
    contraseña: ''
  });

  const { showNotification } = useNotification();
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

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
        nombreUsuario: formulario.nombreUsuario,
        emailUsuario: formulario.emailUsuario,
        contraseña: formulario.contraseña
      });
      setExito(true);
      showNotification('success', 'Empresa creada correctamente. Ya podés iniciar sesión.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al crear empresa');
      showNotification('error', err.response?.data?.mensaje || 'Error al crear empresa');
    }
  };

  return (
    <>
    <Header modoLanding={false}/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl p-8 bg-white shadow-2xl rounded-2xl"
      >
        {exito ? (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="flex flex-col items-center text-center"
          >
            <CheckCircleIcon className="w-16 h-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">¡Listo!</h2>
            <p className="text-gray-600 mt-2">Tu demo fue creada con éxito. Redirigiendo...</p>
          </motion.div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Solicitar demo</h2>

            {error && (
              <div className="bg-red-100 text-red-800 text-sm p-3 rounded mb-4 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { label: 'Nombre de la empresa', name: 'nombreEmpresa', type: 'text' },
                { label: 'Nombre del usuario administrador', name: 'nombreUsuario', type: 'text' },
                { label: 'Correo electrónico', name: 'emailUsuario', type: 'email' },
                { label: 'Contraseña', name: 'contraseña', type: 'password' }
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block mb-1 font-medium text-gray-700">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={formulario[name]}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition"
              >
                Crear empresa
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
    </>
  );
}
