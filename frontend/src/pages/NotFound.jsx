import { Link } from "react-router-dom";

// src/pages/NotFound.jsx
function NotFound() {
  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-lg text-gray-700">Página no encontrada</p>
      <Link to="/" className="hover:text-blue-300 pinter ">Volver al Home</Link>
    </div>
  );
}

export default NotFound;
