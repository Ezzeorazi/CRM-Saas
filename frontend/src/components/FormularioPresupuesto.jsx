// Formulario de presupuestos para vincular con ventas.
// FormularioPresupuesto.jsx
import { useEffect, useState } from 'react';
import clienteAxios from '../api/clienteAxios';

function FormularioPresupuesto({ datos, setDatos, handleSubmit }) {
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [clientesDisponibles, setClientesDisponibles] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const token = localStorage.getItem('token');
        const [resProductos, resClientes] = await Promise.all([
          clienteAxios.get('/productos', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          clienteAxios.get('/clientes', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setProductosDisponibles(resProductos.data);
        setClientesDisponibles(resClientes.data);
      } catch (error) {
        console.error('Error al cargar datos del formulario', error);
      }
    };

    cargarDatos();
  }, []);

  const handleChangeProducto = (e, idx) => {
    const { name, value } = e.target;
    const productos = [...datos.productos];
    const field = name.split('.')[1];

    if (field === 'producto') {
      const productoSeleccionado = productosDisponibles.find(p => p._id === value);
      productos[idx].producto = value;
      productos[idx].nombre = productoSeleccionado?.nombre || '';
      productos[idx].precio = productoSeleccionado?.precio || 0;
    } else {
      productos[idx][field] = parseFloat(value);
    }

    productos[idx].subtotal = productos[idx].cantidad * productos[idx].precio;
    const total = productos.reduce((acc, p) => acc + p.subtotal, 0);
    setDatos({ ...datos, productos, total });
  };

  const agregarProducto = () => {
    setDatos({
      ...datos,
      productos: [...datos.productos, { producto: '', nombre: '', cantidad: 1, precio: 0, subtotal: 0 }]
    });
  };

  const quitarProducto = (index) => {
    const nuevos = datos.productos.filter((_, i) => i !== index);
    const total = nuevos.reduce((acc, p) => acc + p.subtotal, 0);
    setDatos({ ...datos, productos: nuevos, total });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Selección de cliente */}
      <div>
        <label className="block font-semibold mb-1">Cliente</label>
        <select
          name="cliente"
          value={datos.cliente}
          onChange={(e) => setDatos({ ...datos, cliente: e.target.value })}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Seleccionar cliente</option>
          {clientesDisponibles.map(c => (
            <option key={c._id} value={c._id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      {/* Encabezados tabla */}
      <div className="grid grid-cols-5 gap-2 font-semibold text-sm">
        <span>Producto</span>
        <span>Cantidad</span>
        <span>Precio</span>
        <span>Subtotal</span>
        <span>Acción</span>
      </div>

      {/* Productos */}
      {datos.productos.map((prod, idx) => (
        <div key={idx} className="grid grid-cols-5 gap-2 items-end">
          <select
            name="producto.producto"
            value={prod.producto}
            onChange={(e) => handleChangeProducto(e, idx)}
            className="p-2 border rounded"
            required
          >
            <option value="">Seleccionar</option>
            {productosDisponibles.map(p => (
              <option key={p._id} value={p._id}>{p.nombre}</option>
            ))}
          </select>

          <input
            type="number"
            name="producto.cantidad"
            min="1"
            value={prod.cantidad}
            onChange={(e) => handleChangeProducto(e, idx)}
            className="p-2 border rounded"
            required
          />

          <input
            type="number"
            name="producto.precio"
            min="0"
            step="0.01"
            value={prod.precio}
            onChange={(e) => handleChangeProducto(e, idx)}
            className="p-2 border rounded"
            required
          />

          <span className="self-center text-sm text-gray-600">${prod.subtotal.toFixed(2)}</span>

          <button
            type="button"
            onClick={() => quitarProducto(idx)}
            className="bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600"
          >
            ✕
          </button>
        </div>
      ))}

      {/* Botones */}
      <button
        type="button"
        onClick={agregarProducto}
        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
      >
        + Agregar producto
      </button>

      <div className="text-right font-semibold text-xl">
        Total: ${datos.total.toFixed(2)}
      </div>

      <button
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
      >
        Guardar presupuesto
      </button>
    </form>
  );
}

export default FormularioPresupuesto;
