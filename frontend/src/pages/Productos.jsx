import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import clienteAxios from '../api/clienteAxios';
import { Link } from 'react-router-dom';

function Productos() {
  const { token } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const { data } = await clienteAxios.get('/productos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener productos:', error.response?.data?.mensaje);
      }
    };
    obtenerProductos();
  }, [token]);

  const handleEliminar = async (id) => {
    const confirmar = confirm('¿Estás seguro de eliminar este producto?');
    if (!confirmar) return;

    try {
      await clienteAxios.delete(`/productos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProductos(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      alert('Error al eliminar producto');
    }
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Productos</h2>
        <Link
          to="/dashboard/productos/nuevo"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Nuevo Producto
        </Link>
      </div>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">SKU</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Activo</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(producto => (
              <tr key={producto._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{producto.nombre}</td>
                <td className="p-3">{producto.sku}</td>
                <td className="p-3">{producto.stock}</td>
                <td className="p-3">${producto.precio}</td>
                <td className="p-3">{producto.activo ? 'Sí' : 'No'}</td>
                <td className="p-3 flex gap-2 text-sm">
                  <Link to={`/dashboard/productos/editar/${producto._id}`} className="text-blue-600 hover:underline">
                    Editar
                  </Link>
                  <button
                    onClick={() => handleEliminar(producto._id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Productos;
