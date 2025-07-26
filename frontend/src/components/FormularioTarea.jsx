import { useState } from 'react';

function FormularioTarea({ tareaInicial = {}, onSubmit }) {
  const [tarea, setTarea] = useState({
    titulo: '',
    descripcion: '',
    prioridad: 'media',
    fechaVencimiento: '',
    ...tareaInicial
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setTarea(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(tarea);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <div>
        <label className="block font-semibold mb-1">Título</label>
        <input
          type="text"
          name="titulo"
          value={tarea.titulo}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Descripción</label>
        <textarea
          name="descripcion"
          value={tarea.descripcion}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Prioridad</label>
          <select
            name="prioridad"
            value={tarea.prioridad}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Vencimiento</label>
          <input
            type="date"
            name="fechaVencimiento"
            value={tarea.fechaVencimiento ? tarea.fechaVencimiento.substring(0,10) : ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Guardar Tarea
      </button>
    </form>
  );
}

export default FormularioTarea;
