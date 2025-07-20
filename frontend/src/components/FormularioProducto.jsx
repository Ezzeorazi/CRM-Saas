// Formulario de productos que envía datos al backend.
function FormularioProducto({ formulario, setFormulario, handleSubmit, esEdicion = false }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario({
      ...formulario,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Nombre del producto</label>
        <input
          type="text"
          name="nombre"
          placeholder="Ej: Remera blanca"
          value={formulario.nombre}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">SKU</label>
        <input
          type="text"
          name="sku"
          placeholder="Ej: SKU-0001"
          value={formulario.sku}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            placeholder="Cantidad en stock"
            value={formulario.stock}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Precio</label>
          <input
            type="number"
            name="precio"
            placeholder="Ej: 1500"
            value={formulario.precio}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-1">Categoría</label>
        <input
          type="text"
          name="categoria"
          placeholder="Ej: Indumentaria"
          value={formulario.categoria}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="activo"
          checked={formulario.activo}
          onChange={handleChange}
        />
        <label>Producto activo</label>
      </div>

      <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
        {esEdicion ? 'Guardar cambios' : 'Crear producto'}
      </button>
    </form>
  );
}

export default FormularioProducto;
