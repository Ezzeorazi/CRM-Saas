import FormularioCliente from '../../components/FormularioCliente';
import clienteAxios from '../../api/clienteAxios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function NuevoCliente() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const crearCliente = async (datos) => {
    try {
      await clienteAxios.post('/clientes', datos, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard/clientes');
    } catch (error) {
      console.error(error);
      alert('Error al crear cliente');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Nuevo Cliente</h2>
      <FormularioCliente onSubmit={crearCliente} />
    </div>
  );
}

export default NuevoCliente;
