// Formulario para registrar una venta.
import { useContext, useEffect, useState } from 'react';
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
    if (!id) return;
    const pres = presupuestos.find(p => p._id === id);
    if (pres) {
      const prod = pres.productos?.[0] || {};
      setVenta({
        cliente: pres.cliente?.nombre || '',
        producto: prod.nombre || '',
        cantidad: prod.cantidad || 1,
        precio: prod.precio || 0
      });
    }
  };

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

      <FormularioVenta venta={venta} setVenta={setVenta} handleSubmit={handleSubmit} />
    </div>
  );
}

export default NuevaVenta;
