import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import clienteAxios from '../../api/clienteAxios';
import { AuthContext } from '../../context/AuthContext';
import FormularioProveedor from '../../components/FormularioProveedor';

function EditarProveedor() {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [proveedor, setProveedor] = useState(null);

  useEffect(() => {
    const obtenerProveedor = async () => {
      try {
        const { data } = await clienteAxios.get(`/proveedores/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProveedor(data);
      } catch (error) {
        console.error(error);
        alert('Error al cargar proveedor');
      }
    };
    obtenerProveedor();
  }, [id, token]);

  const actualizarProveedor = async (datos) => {
    try {
      await clienteAxios.put(`/proveedores/${id}`, datos, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard/proveedores');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar proveedor');
    }
  };

  if (!proveedor) return <p>Cargando...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Editar Proveedor</h2>
      <FormularioProveedor proveedorInicial={proveedor} onSubmit={actualizarProveedor} />
    </div>
  );
}

export default EditarProveedor;