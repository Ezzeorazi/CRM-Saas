import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
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
    precio: 0,
    categoria: '',
    activo: true
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormulario({
      ...formulario,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      await clienteAxios.post('/productos', formulario, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMensaje('Producto creado correctamente');
      setTimeout(() => navigate('/dashboard/productos'), 2000);
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al crear producto');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Crear nuevo producto</h2>

      {mensaje && <p className="text-green-600 mb-2">{mensaje}</p>}
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
