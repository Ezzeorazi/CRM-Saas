import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import clienteAxios from '../../api/clienteAxios';
import { useNavigate } from 'react-router-dom';
import FormularioPresupuesto from '../../components/FormularioPresupuesto';

function NuevoPresupuesto() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    cliente: '',
    productos: [
      { nombre: '', cantidad: 1, precio: 0, subtotal: 0 }
    ],
    total: 0,
    estado: 'pendiente'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productos = datos.productos.map(p => ({ ...p, subtotal: p.cantidad * p.precio }));
      const total = productos.reduce((acc, p) => acc + p.subtotal, 0);
      await clienteAxios.post('/presupuestos', { ...datos, productos, total }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard/presupuestos');
    } catch (error) {
      alert('Error al crear presupuesto');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Nuevo Presupuesto</h2>
      <FormularioPresupuesto datos={datos} setDatos={setDatos} handleSubmit={handleSubmit} />
    </div>
  );
}

export default NuevoPresupuesto;
