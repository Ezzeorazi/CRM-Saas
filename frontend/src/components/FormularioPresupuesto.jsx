function FormularioPresupuesto({ datos, setDatos, handleSubmit }) {
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name.startsWith('producto')) {
      const productos = [...datos.productos];
      const field = name.split('.')[1];
      productos[index][field] = value;
      setDatos({ ...datos, productos });
    } else {
      setDatos({ ...datos, [name]: value });
    }
  };

  const agregarProducto = () => {
    setDatos({
      ...datos,
      productos: [...datos.productos, { nombre: '', cantidad: 1, precio: 0, subtotal: 0 }]
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Cliente</label>
        <input
          type="text"
          name="cliente"
          value={datos.cliente}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {datos.productos.map((prod, idx) => (
        <div key={idx} className="grid grid-cols-4 gap-2 items-end">
          <input
            type="text"
            name={`producto.nombre`}
            placeholder="Producto"
            value={prod.nombre}
            onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'producto.nombre' } }, idx)}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name={`producto.cantidad`}
            placeholder="Cant"
            value={prod.cantidad}
            onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'producto.cantidad' } }, idx)}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name={`producto.precio`}
            placeholder="Precio"
            value={prod.precio}
            onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'producto.precio' } }, idx)}
            className="p-2 border rounded"
          />
        </div>
      ))}

      <button type="button" onClick={agregarProducto} className="bg-gray-200 px-3 py-1 rounded">
        + Producto
      </button>

      <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">Guardar</button>
    </form>
  );
}

export default FormularioPresupuesto;
