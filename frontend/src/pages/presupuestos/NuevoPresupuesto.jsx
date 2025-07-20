// Formulario para crear un presupuesto.
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
    productos: [{ producto: '', nombre: '', cantidad: 1, precio: 0, subtotal: 0 }],
    total: 0,
    estado: 'pendiente',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productos = datos.productos.map((p) => ({
        producto: p.producto,
        nombre: p.nombre,
        cantidad: p.cantidad,
        precio: p.precio,
        subtotal: p.cantidad * p.precio,
      }));

      const total = productos.reduce((acc, p) => acc + p.subtotal, 0);

      await clienteAxios.post(
        '/presupuestos',
        { cliente: datos.cliente, productos, total, estado: 'pendiente' },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate('/dashboard/presupuestos');
    } catch (error) {
      alert('Error al crear presupuesto');
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Nuevo Presupuesto</h2>
      <FormularioPresupuesto datos={datos} setDatos={setDatos} handleSubmit={handleSubmit} />
    </div>
  );
}

export default NuevoPresupuesto;