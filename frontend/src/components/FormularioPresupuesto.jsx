function FormularioPresupuesto({ presupuesto, setPresupuesto, productos, handleSubmit, esEdicion = false }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPresupuesto({
      ...presupuesto,
      [name]: value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Cliente</label>
        <input
          type="text"
          name="cliente"
          value={presupuesto.cliente}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Producto</label>
        <select
          name="producto"
          value={presupuesto.producto}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Seleccionar --</option>
          {productos.map((p) => (
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
            value={presupuesto.cantidad}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Precio</label>
          <input
            type="number"
            name="precio"
            value={presupuesto.precio}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>
      <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
        {esEdicion ? 'Guardar cambios' : 'Guardar presupuesto'}
      </button>
    </form>
  );
}

export default FormularioPresupuesto;
