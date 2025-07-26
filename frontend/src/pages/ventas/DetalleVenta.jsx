import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../../api/clienteAxios';
import { AuthContext } from '../../context/AuthContext';

function DetalleVenta() {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const [venta, setVenta] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVenta = async () => {
      try {
        const { data } = await clienteAxios.get(`/ventas/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setVenta(data);
      } catch (err) {
        setError('No se pudo cargar la venta');
      }
    };
    fetchVenta();
  }, [id, token]);

  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!venta) return <div className="p-4">Cargando...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Detalle de Venta</h2>
      <div className="mb-2"><b>Cliente:</b> {venta.cliente?.nombre || venta.cliente?.razonSocial || venta.cliente?.email || '-'}</div>
      <div className="mb-2"><b>Fecha:</b> {new Date(venta.createdAt).toLocaleString()}</div>
      <div className="mb-2"><b>Estado:</b> {venta.estado}</div>
      <div className="mb-4">
        <b>Productos:</b>
        <ul className="list-disc pl-6">
          {venta.productos.map((p, idx) => (
            <li key={idx}>
              {p.producto?.nombre || p.producto?.sku || '-'} - Cantidad: {p.cantidad} - Precio: ${p.precio} - Subtotal: ${(p.cantidad * p.precio).toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-2 text-right font-bold text-lg">
        Total: ${venta.total?.toFixed(2)}
      </div>
      <Link to="/dashboard/ventas" className="text-blue-600 hover:underline">Volver</Link>
    </div>
  );
}

export default DetalleVenta;