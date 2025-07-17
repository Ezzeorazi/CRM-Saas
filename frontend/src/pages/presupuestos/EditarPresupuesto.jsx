import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../api/clienteAxios';
import { AuthContext } from '../../context/AuthContext';
import FormularioPresupuesto from '../../components/FormularioPresupuesto';

function EditarPresupuesto() {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [presupuesto, setPresupuesto] = useState({
    cliente: '',
    producto: '',
    cantidad: 1,
    precio: 0
  });
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [pres, prods] = await Promise.all([
          clienteAxios.get(`/presupuestos/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
          clienteAxios.get('/productos', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setPresupuesto({
          cliente: pres.data.cliente,
          producto: pres.data.producto,
          cantidad: pres.data.cantidad,
          precio: pres.data.precio
        });
        setProductos(prods.data);
      } catch (err) {
        setError('Error al cargar presupuesto');
      }
    };
    cargarDatos();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    try {
      await clienteAxios.put(`/presupuestos/${id}`, presupuesto, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensaje('Presupuesto actualizado');
      setTimeout(() => navigate('/dashboard/presupuestos'), 2000);
    } catch (err) {
      setError('Error al actualizar presupuesto');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Editar presupuesto</h2>
      {mensaje && <p className="text-green-600 mb-2">{mensaje}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <FormularioPresupuesto
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        productos={productos}
        handleSubmit={handleSubmit}
        esEdicion
      />
    </div>
  );
}

export default EditarPresupuesto;
