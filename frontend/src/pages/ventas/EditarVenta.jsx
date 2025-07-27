// Modificación de una venta existente.
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../api/clienteAxios';
import { AuthContext } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import FormularioVenta from '../../components/FormularioVenta';

function EditarVenta() {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [venta, setVenta] = useState({
    cliente: '',
    producto: '',
    cantidad: 1,
    precio: 0
  });

  const { showNotification } = useNotification();
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerVenta = async () => {
      try {
        const { data } = await clienteAxios.get(`/ventas/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setVenta({
          cliente: data.cliente,
          producto: data.producto,
          cantidad: data.cantidad,
          precio: data.precio
        });
      } catch (error) {
        console.error(error);
        setError('Error al cargar la venta');
      }
    };
    obtenerVenta();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await clienteAxios.put(`/ventas/${id}`, venta, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showNotification('success', 'Venta actualizada');
      setTimeout(() => navigate('/dashboard/ventas'), 1500);
    } catch (error) {
      console.error(error);
      setError('Error al actualizar venta');
      showNotification('error', 'Error al actualizar venta');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Editar venta</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <FormularioVenta venta={venta} setVenta={setVenta} handleSubmit={handleSubmit} esEdicion />
    </div>
  );
}

export default EditarVenta;
