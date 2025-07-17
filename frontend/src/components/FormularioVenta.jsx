function FormularioVenta({ venta, setVenta, handleSubmit, esEdicion = false }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenta({
      ...venta,
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
          value={venta.cliente}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Producto</label>
        <input
          type="text"
          name="producto"
          value={venta.producto}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Cantidad</label>
          <input
            type="number"
            name="cantidad"
            value={venta.cantidad}
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
            value={venta.precio}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>
      <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
        {esEdicion ? 'Guardar cambios' : 'Registrar venta'}
      </button>
    </form>
  );
}

export default FormularioVenta;
