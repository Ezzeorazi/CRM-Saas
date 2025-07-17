import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import clienteAxios from '../../api/clienteAxios';
import { useNavigate } from 'react-router-dom';
import FormularioPresupuesto from '../../components/FormularioPresupuesto';

function NuevoPresupuesto() {
  const { token } = useContext(AuthContext);
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
    const cargarProductos = async () => {
      try {
        const { data } = await clienteAxios.get('/productos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProductos(data);
      } catch (err) {
        console.error(err);
      }
    };
    cargarProductos();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    try {
      await clienteAxios.post('/presupuestos', presupuesto, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensaje('Presupuesto guardado');
      setTimeout(() => navigate('/dashboard/presupuestos'), 2000);
    } catch (err) {
      setError('Error al guardar presupuesto');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Nuevo presupuesto</h2>
      {mensaje && <p className="text-green-600 mb-2">{mensaje}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <FormularioPresupuesto
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        productos={productos}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default NuevoPresupuesto;
