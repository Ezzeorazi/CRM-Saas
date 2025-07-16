import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import clienteAxios from '../../api/clienteAxios';
import { useNavigate } from 'react-router-dom';
import FormularioVenta from '../../components/FormularioVenta';

function NuevaVenta() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [venta, setVenta] = useState({
    cliente: '',
    producto: '',
    cantidad: 1,
    precio: 0
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      await clienteAxios.post('/ventas', venta, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensaje('Venta registrada correctamente');
      setTimeout(() => navigate('/dashboard/ventas'), 2000);
    } catch (err) {
      setError('Error al registrar venta');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Registrar venta</h2>
      {mensaje && <p className="text-green-600 mb-2">{mensaje}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <FormularioVenta venta={venta} setVenta={setVenta} handleSubmit={handleSubmit} />
    </div>
  );
}

export default NuevaVenta;
