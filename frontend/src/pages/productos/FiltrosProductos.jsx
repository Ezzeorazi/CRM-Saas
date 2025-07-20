// Componente para filtrar productos en la tabla.
function FiltrosProductos({ filtros, setFiltros }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const resetFiltros = () => {
    setFiltros({
      disponibilidad: '',
      busqueda: '',
      categoria: '',
      activo: '',
      precioMin: '',
      precioMax: '',
      orden: ''
    });
  };

  return (
    <div className="bg-white rounded shadow p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Buscar por nombre</label>
        <input
          type="text"
          name="busqueda"
          value={filtros.busqueda}
          onChange={handleChange}
          placeholder="Ej: teclado"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Disponibilidad</label>
        <select
          name="disponibilidad"
          value={filtros.disponibilidad}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Todos</option>
          <option value="disponible">Disponible</option>
          <option value="agotado">Agotado</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <input
          type="text"
          name="categoria"
          value={filtros.categoria}
          onChange={handleChange}
          placeholder="Ej: accesorios"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Estado</label>
        <select
          name="activo"
          value={filtros.activo}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Todos</option>
          <option value="activo">Activos</option>
          <option value="inactivo">Inactivos</option>
        </select>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Precio mínimo</label>
          <input
            type="number"
            name="precioMin"
            value={filtros.precioMin}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Precio máximo</label>
          <input
            type="number"
            name="precioMax"
            value={filtros.precioMax}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Ordenar por</label>
        <select
          name="orden"
          value={filtros.orden}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="">-- Seleccionar --</option>
          <option value="nombre">Nombre (A-Z)</option>
          <option value="stock">Stock (mayor a menor)</option>
          <option value="precio">Precio (mayor a menor)</option>
        </select>
      </div>

      <div className="flex items-end">
        <button
          onClick={resetFiltros}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}

export default FiltrosProductos;
