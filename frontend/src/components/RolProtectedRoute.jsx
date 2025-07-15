import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function RolProtectedRoute({ children, rolesPermitidos = [] }) {
  const { usuario } = useContext(AuthContext);

  if (!usuario || !rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RolProtectedRoute;
