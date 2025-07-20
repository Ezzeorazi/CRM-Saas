// Pie de página global.
// Se muestra al final de todas las vistas.
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-white py-6 mt-auto px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} <a className=" hover:text-blue-600" href="http://ezequiel.orazi-online">Ezequiel Orazi</a>. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <a href="mailto:info@nimbuscrm.com" className="hover:underline">
              Contacto
            </a>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
