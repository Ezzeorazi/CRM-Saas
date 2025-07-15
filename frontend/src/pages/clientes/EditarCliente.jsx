import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import clienteAxios from '../../api/clienteAxios';
import { AuthContext } from '../../context/AuthContext';
import FormularioCliente from '../../components/FormularioCliente';

function EditarCliente() {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        const { data } = await clienteAxios.get(`/clientes/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCliente(data);
      } catch (error) {
        alert('Error al cargar cliente');
      }
    };
    obtenerCliente();
  }, [id, token]);

  const actualizarCliente = async (datos) => {
    try {
      await clienteAxios.put(`/clientes/${id}`, datos, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard/clientes');
    } catch (error) {
      alert('Error al actualizar cliente');
    }
  };

  if (!cliente) return <p>Cargando...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Editar Cliente</h2>
      <FormularioCliente clienteInicial={cliente} onSubmit={actualizarCliente} />
    </div>
  );
}

export default EditarCliente;
