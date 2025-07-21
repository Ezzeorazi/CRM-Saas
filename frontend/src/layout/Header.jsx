// Encabezado común del dashboard.
// Muestra la navegación y enlaces a distintas páginas.
import { Link } from 'react-router-dom'
import logo from '/imagenes/logo-nimbus.svg'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-8 px-4 text-center">
        {/* logo*/}
        <div className="flex justify-center mb-3">
        <img
          src={logo}
          alt="Logo Nimbus CRM"
          className="h-40 md:h-50 w-auto"
        />
      </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Nimbus CRM</h1>
        <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-6">
          Gestión empresarial flexible y poderosa para tu negocio. Personalizable, seguro y fácil de usar.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/demo"
            className="bg-blue-800 text-white px-6 py-3 rounded shadow hover:bg-blue-900"
          >
            Solicitar Demo
          </Link>
        </div>
      </header>
  )
}
