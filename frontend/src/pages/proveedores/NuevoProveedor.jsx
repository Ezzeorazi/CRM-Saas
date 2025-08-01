// Vista para registrar un nuevo proveedor.
import FormularioProveedor from '../../components/FormularioProveedor';
import clienteAxios from '../../api/clienteAxios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

function NuevoProveedor() {
  const { token } = useContext(AuthContext);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const crearProveedor = async (datos) => {
    try {
      await clienteAxios.post('/proveedores', datos, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard/proveedores');
    } catch (error) {
      console.error(error);
      showNotification('error', 'Error al crear proveedor');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Nuevo Proveedor</h2>
      <FormularioProveedor onSubmit={crearProveedor} />
    </div>
  );
}

export default NuevoProveedor;