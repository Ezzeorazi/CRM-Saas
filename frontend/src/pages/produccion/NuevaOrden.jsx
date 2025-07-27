import { useContext } from 'react';
import clienteAxios from '../../api/clienteAxios';
import { AuthContext } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import FormularioOrden from '../../components/FormularioOrden';

function NuevaOrden() {
  const { token } = useContext(AuthContext);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const crearOrden = async datos => {
    try {
      await clienteAxios.post('/ordenes', datos, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard/produccion');
    } catch (error) {
      showNotification('error', 'Error al crear orden');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Nueva Orden</h2>
      <FormularioOrden onSubmit={crearOrden} />
    </div>
  );
}

export default NuevaOrden;
