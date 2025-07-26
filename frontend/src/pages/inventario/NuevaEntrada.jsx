import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import clienteAxios from '../../api/clienteAxios';
import { useNavigate } from 'react-router-dom';
import FormularioMovimiento from '../../components/FormularioMovimiento';

function NuevaEntrada() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [datos, setDatos] = useState({ productoId: '', cantidad: 1, motivo: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await clienteAxios.post('/movimientos/entrada', datos, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard/inventario');
    } catch (error) {
      console.error(error);
      alert('Error al registrar entrada');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Entrada de Stock</h2>
      <FormularioMovimiento datos={datos} setDatos={setDatos} handleSubmit={handleSubmit} tipo="entrada" />
    </div>
  );
}

export default NuevaEntrada;
