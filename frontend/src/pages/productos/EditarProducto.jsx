// Pantalla para actualizar un producto.
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import clienteAxios from '../../api/clienteAxios';
import { AuthContext } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import FormularioProducto from '../../components/FormularioProducto';

function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [formulario, setFormulario] = useState({
    nombre: '',
    sku: '',
    stock: 0,
    stockMinimo: 0,
    precio: 0,
    categoria: '',
    activo: true
  });

  const { showNotification } = useNotification();
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const { data } = await clienteAxios.get(`/productos/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormulario(data);
      } catch (error) {
        console.error(error);
        setError('Error al cargar el producto');
      }
    };

    cargarProducto();
  }, [id, token]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      await clienteAxios.put(`/productos/${id}`, formulario, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showNotification('success', 'Producto actualizado ✅');
      setTimeout(() => navigate('/dashboard/productos'), 1500);
    } catch (error) {
      console.error(error);
      setError('Error al actualizar');
      showNotification('error', 'Error al actualizar');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <FormularioProducto
        formulario={formulario}
        setFormulario={setFormulario}
        handleSubmit={handleSubmit}
        esEdicion={true}
      />
    </div>
  );
}

export default EditarProducto;
