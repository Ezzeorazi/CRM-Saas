import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import clienteAxios from '../../api/clienteAxios';
import { Link } from 'react-router-dom';
import FiltrosProductos from './FiltrosProductos';

function Productos() {
  const { token } = useContext(AuthContext);
  const { showNotification } = useNotification();
  const [productos, setProductos] = useState([]);
  const [filtros, setFiltros] = useState({
    disponibilidad: '',
    busqueda: '',
    categoria: '',
    activo: '',
    precioMin: '',
    precioMax: '',
    orden: ''
  });

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const { data } = await clienteAxios.get('/productos', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const productosLimpios = data.map((p) => ({
          ...p,
          nombre: p.nombre || '',
          sku: p.sku || '',
          stock: p.stock ?? 0,
          stockMinimo: p.stockMinimo ?? 0,
          precio: p.precio ?? 0,
          categoria: p.categoria || '',
          activo: p.activo ?? true
        }));

        setProductos(productosLimpios);
      } catch (error) {
        console.error('Error al obtener productos:', error.response?.data?.mensaje);
      }
    };

    obtenerProductos();
  }, [token]);

  const productosFiltrados = productos
    .filter((p) => {
      const coincideBusqueda = p.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase());
      const coincideDisponibilidad =
        filtros.disponibilidad === '' ||
        (filtros.disponibilidad === 'disponible' && p.stock > 0) ||
        (filtros.disponibilidad === 'agotado' && p.stock === 0);
      const coincideCategoria =
        filtros.categoria === '' || p.categoria.toLowerCase().includes(filtros.categoria.toLowerCase());
      const coincideActivo =
        filtros.activo === '' ||
        (filtros.activo === 'activo' && p.activo) ||
        (filtros.activo === 'inactivo' && !p.activo);
      const coincidePrecioMin = filtros.precioMin === '' || p.precio >= Number(filtros.precioMin);
      const coincidePrecioMax = filtros.precioMax === '' || p.precio <= Number(filtros.precioMax);

      return (
        coincideBusqueda &&
        coincideDisponibilidad &&
        coincideCategoria &&
        coincideActivo &&
        coincidePrecioMin &&
        coincidePrecioMax
      );
    })
    .sort((a, b) => {
      if (filtros.orden === 'nombre') return a.nombre.localeCompare(b.nombre);
      if (filtros.orden === 'stock') return b.stock - a.stock;
      if (filtros.orden === 'precio') return b.precio - a.precio;
      return 0;
    });

  const handleEliminar = async (id) => {
    const confirmar = confirm('¿Estás seguro de eliminar este producto?');
    if (!confirmar) return;

    try {
      await clienteAxios.delete(`/productos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProductos(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error(error);
      showNotification('error', 'Error al eliminar producto');
    }
  };

  return (
    <div className="relative">
      {/* Encabezado y acciones */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h2 className="text-2xl font-bold">Productos</h2>
        <div className="hidden sm:flex gap-2">
          <Link
            to="/dashboard/productos/nuevo"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Nuevo Producto
          </Link>
          <Link
            to="/dashboard/productos/importar"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            📁 Importar Excel
          </Link>
        </div>
      </div>

      <FiltrosProductos filtros={filtros} setFiltros={setFiltros} />

      {/* Tabla para pantallas grandes */}
      <div className="hidden sm:block overflow-x-auto bg-white rounded shadow mt-4">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">SKU</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Stock mín.</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Categoría</th>
              <th className="p-3">Activo</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map(producto => (
                <tr key={producto._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{producto.nombre}</td>
                  <td className="p-3">{producto.sku}</td>
                  <td className="p-3">{producto.stock}</td>
                  <td className="p-3">{producto.stockMinimo}</td>
                  <td className="p-3">${producto.precio}</td>
                  <td className="p-3">{producto.categoria}</td>
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
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No se encontraron productos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Tarjetas para móviles */}
      <div className="sm:hidden mt-4 space-y-4">
        {productosFiltrados.length > 0 ? productosFiltrados.map(producto => (
          <div key={producto._id} className="bg-white rounded shadow p-4 space-y-2">
            <p><strong>Nombre:</strong> {producto.nombre}</p>
            <p><strong>SKU:</strong> {producto.sku}</p>
            <p><strong>Stock:</strong> {producto.stock}</p>
            <p><strong>Stock mín.:</strong> {producto.stockMinimo}</p>
            <p><strong>Precio:</strong> ${producto.precio}</p>
            <p><strong>Categoría:</strong> {producto.categoria}</p>
            <p><strong>Activo:</strong> {producto.activo ? 'Sí' : 'No'}</p>
            <div className="flex gap-3 pt-2 text-sm">
              <Link to={`/dashboard/productos/editar/${producto._id}`} className="text-blue-600 hover:underline">
                Editar
              </Link>
              <button onClick={() => handleEliminar(producto._id)} className="text-red-600 hover:underline">
                Eliminar
              </button>
            </div>
          </div>
        )) : (
          <p className="text-center text-gray-500">No se encontraron productos</p>
        )}
      </div>

      {/* Botón flotante para móviles */}
      <div className="sm:hidden fixed bottom-4 right-4 flex flex-col gap-2">
        <Link
          to="/dashboard/productos/nuevo"
          className="bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700"
        >
          +
        </Link>
        <Link
          to="/dashboard/productos/importar"
          className="bg-blue-600 text-white px-3 py-2 rounded-full shadow-lg hover:bg-blue-700 text-xs text-center"
        >
          📁
        </Link>
      </div>
    </div>
  );
}

export default Productos;
