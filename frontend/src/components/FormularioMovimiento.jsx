import { useEffect, useState } from 'react';
import clienteAxios from '../api/clienteAxios';

function FormularioMovimiento({ datos, setDatos, handleSubmit, tipo }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await clienteAxios.get('/productos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProductos(data);
      } catch (e) {
        console.error(e);
      }
    };
    cargar();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Producto</label>
        <select
          name="productoId"
          value={datos.productoId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Seleccionar</option>
          {productos.map(p => (
            <option key={p._id} value={p._id}>{p.nombre}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Cantidad</label>
          <input
            type="number"
            name="cantidad"
            value={datos.cantidad}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Motivo</label>
          <input
            type="text"
            name="motivo"
            value={datos.motivo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
        {tipo === 'entrada' ? 'Registrar entrada' : 'Registrar salida'}
      </button>
    </form>
  );
}

export default FormularioMovimiento;
