import { useState } from 'react';

function FormularioOrden({ ordenInicial = {}, onSubmit }) {
  const [orden, setOrden] = useState({
    producto: '',
    cantidad: 1,
    observaciones: '',
    ...ordenInicial
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setOrden(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(orden);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <div>
        <label className="block font-semibold mb-1">Producto</label>
        <input
          type="text"
          name="producto"
          value={orden.producto}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Cantidad</label>
        <input
          type="number"
          name="cantidad"
          value={orden.cantidad}
          onChange={handleChange}
          min="1"
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Observaciones</label>
        <textarea
          name="observaciones"
          value={orden.observaciones}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Guardar Orden
      </button>
    </form>
  );
}

export default FormularioOrden;
