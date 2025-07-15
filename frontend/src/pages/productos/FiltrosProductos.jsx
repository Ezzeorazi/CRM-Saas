function FiltrosProductos({ filtros, setFiltros }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
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
    </div>
  );
}

export default FiltrosProductos;
