// src/layout/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="http://ezequiel-orazi.online"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 transition"
          >
            Ezequiel Orazi
          </a>. Todos los derechos reservados.
        </p>

        <nav className="flex gap-4 flex-wrap justify-center md:justify-end">
          <Link to="/" className="hover:text-white transition">Inicio</Link>
          <a href="mailto:info@nimbuscrm.com" className="hover:text-white transition">Contacto</a>
          <Link to="/login" className="hover:text-white transition">Login</Link>
        </nav>
      </div>
    </footer>
  );
}
