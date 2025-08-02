import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import clienteAxios from '../api/clienteAxios'; // Asegurate que la ruta sea correcta
import { motion } from 'framer-motion';
import Header from '../layout/Header';

function Login() {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await clienteAxios.post('/auth/login', {
        email,
        contraseña,
      });

      login(data.usuario, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al iniciar sesión');
    }
  };

  return (
    <>
      <Header modoLanding={false} />
      <div className="flex flex-col items-center justify-center bg-gray-100 py-10 px-4 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-6 bg-white rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Iniciar sesión</h2>

          {error && (
            <div className="mb-4 text-red-600 text-sm text-center bg-red-100 p-2 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={contraseña}
              onChange={e => setContraseña(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Iniciar sesión
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default Login;
