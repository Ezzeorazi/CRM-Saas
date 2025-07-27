import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import clienteAxios from '../../api/clienteAxios';
import { useNavigate } from 'react-router-dom';
import FormularioMovimiento from '../../components/FormularioMovimiento';

function NuevaSalida() {
  const { token } = useContext(AuthContext);
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [datos, setDatos] = useState({ productoId: '', cantidad: 1, motivo: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await clienteAxios.post('/movimientos/salida', datos, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard/inventario');
    } catch (error) {
      console.error(error);
      showNotification('error', 'Error al registrar salida');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Salida de Stock</h2>
      <FormularioMovimiento datos={datos} setDatos={setDatos} handleSubmit={handleSubmit} tipo="salida" />
    </div>
  );
}

export default NuevaSalida;
