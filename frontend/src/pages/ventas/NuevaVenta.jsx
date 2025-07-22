// Formulario para registrar una venta.
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import clienteAxios from '../../api/clienteAxios';
import { useNavigate } from 'react-router-dom';
// Ya no usamos FormularioVenta porque la venta se crea a partir de un presupuesto

function NuevaVenta() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [venta, setVenta] = useState({
    cliente: '',
    productos: [],
    total: 0,
    presupuesto: ''
  });
  const [presupuestos, setPresupuestos] = useState([]);
  const [presupuestoId, setPresupuestoId] = useState('');

  useEffect(() => {
    const obtenerPresupuestos = async () => {
      try {
        const { data } = await clienteAxios.get('/presupuestos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPresupuestos(data.filter(p => p.estado === 'aceptado'));
      } catch (err) {
        console.error('Error al cargar presupuestos', err);
      }
    };
    obtenerPresupuestos();
  }, [token]);

  const handleSelectPresupuesto = (e) => {
    const id = e.target.value;
    setPresupuestoId(id);
    if (!id) {
      setVenta({ cliente: '', productos: [], total: 0, presupuesto: '' });
      return;
    }
    const pres = presupuestos.find(p => p._id === id);
    if (pres) {
      setVenta({
        cliente: pres.cliente?._id || pres.cliente,
        productos: pres.productos.map(pr => ({
          producto: pr.producto?._id || pr.producto,
          nombre: pr.nombre || pr.producto?.nombre || '',
          cantidad: pr.cantidad,
          precio: pr.precio
        })),
        total: pres.total,
        presupuesto: pres._id
      });
    }
  };

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    const datos = {
      cliente: venta.cliente,
      productos: venta.productos.map(p => ({
        producto: p.producto,
        cantidad: p.cantidad,
        precio: p.precio
      })),
      total: venta.productos.reduce((acc, p) => acc + p.cantidad * p.precio, 0),
      presupuesto: venta.presupuesto || undefined
    };

    try {
      await clienteAxios.post('/ventas', datos, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensaje('Venta registrada correctamente');
      setTimeout(() => navigate('/dashboard/ventas'), 2000);
    } catch (error) {
      console.error(error);
      setError('Error al registrar venta');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Registrar venta</h2>
      {mensaje && <p className="text-green-600 mb-2">{mensaje}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <div className="mb-4">
        <label className="block font-semibold mb-1">Presupuesto</label>
        <select
          value={presupuestoId}
          onChange={handleSelectPresupuesto}
          className="w-full p-2 border rounded"
        >
          <option value="">Sin presupuesto</option>
          {presupuestos.map(p => (
            <option key={p._id} value={p._id}>
              {p.cliente?.nombre || p._id}
            </option>
          ))}
        </select>
      </div>

      {venta.productos.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-4 gap-2 font-semibold text-sm mb-2">
            <span>Producto</span>
            <span>Cant.</span>
            <span>Precio</span>
            <span>Subtotal</span>
          </div>
          {venta.productos.map((prod, idx) => (
            <div key={idx} className="grid grid-cols-4 gap-2 text-sm py-1">
              <span>{prod.nombre}</span>
              <span>{prod.cantidad}</span>
              <span>${prod.precio}</span>
              <span>${(prod.cantidad * prod.precio).toFixed(2)}</span>
            </div>
          ))}
          <div className="text-right font-semibold mt-2">
            Total: ${venta.total.toFixed(2)}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          Registrar venta
        </button>
      </form>
    </div>
  );
}

export default NuevaVenta;
