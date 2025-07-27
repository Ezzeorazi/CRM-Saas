// Formulario para crear un producto.
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import clienteAxios from '../../api/clienteAxios';
import { useNavigate } from 'react-router-dom';
import FormularioProducto from '../../components/FormularioProducto';

function NuevoProducto() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

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


  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      await clienteAxios.post('/productos', formulario, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      showNotification('success', 'Producto creado correctamente');
      setTimeout(() => navigate('/dashboard/productos'), 1500);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.mensaje || 'Error al crear producto');
      showNotification('error', error.response?.data?.mensaje || 'Error al crear producto');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Crear nuevo producto</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <FormularioProducto
        formulario={formulario}
        setFormulario={setFormulario}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default NuevoProducto;
