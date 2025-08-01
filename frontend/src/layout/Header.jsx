import { Link, useLocation } from 'react-router-dom';
import logo from '/imagenes/logo-nimbus.svg';
import { motion } from 'framer-motion';

export default function Header({ modoLanding = true }) {
  const location = useLocation();
  const isLanding = modoLanding && location.pathname === '/';

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`w-full text-center ${isLanding ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-10' : 'bg-white py-4 border-b'}`}
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* Logo */}
        <div className="flex justify-center items-center mb-4">
          <img
            src={logo}
            alt="Logo Nimbus CRM"
            className={`${isLanding ? 'h-32' : 'h-12'} transition-all duration-300`}
          />
        </div>

        {/* Solo en landing */}
        {isLanding && (
          <>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Nimbus CRM</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
              Gestión empresarial flexible y poderosa para tu negocio.
              Personalizable, seguro y fácil de usar.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/login"
                className="bg-white text-blue-600 font-semibold px-6 py-2 rounded shadow hover:bg-gray-100 transition"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/solicitar-demo"
                className="bg-blue-800 text-white px-6 py-2 rounded shadow hover:bg-blue-900 transition"
              >
                Solicitar Demo
              </Link>
            </div>
          </>
        )}
      </div>
    </motion.header>
  );
}
