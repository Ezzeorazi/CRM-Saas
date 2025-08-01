import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import clienteAxios from '../../api/clienteAxios';
import { AuthContext } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

function DetalleTarea() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const { showNotification } = useNotification();
  const [tarea, setTarea] = useState(null);
  const [comentario, setComentario] = useState('');

  useEffect(() => {
    const obtenerTarea = async () => {
      try {
        const { data } = await clienteAxios.get(`/tareas/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTarea(data);
      } catch (error) {
        console.error(error);
      }
    };
    obtenerTarea();
  }, [id, token]);

  const agregarComentario = async () => {
    if (comentario.trim() === '') return;

    const nueva = {
      ...tarea,
      comentarios: [...tarea.comentarios, { texto: comentario }]
    };

    try {
      await clienteAxios.put(`/tareas/${id}`, nueva, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComentario('');
      showNotification('success', 'Comentario añadido');
      // Refrescar
      const { data } = await clienteAxios.get(`/tareas/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTarea(data);
    } catch (error) {
      showNotification('error', 'Error al comentar');
    }
  };

  const cambiarEstado = async e => {
    const nueva = { ...tarea, estado: e.target.value };
    try {
      await clienteAxios.put(`/tareas/${id}`, nueva, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showNotification('success', 'Estado actualizado');
      const { data } = await clienteAxios.get(`/tareas/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTarea(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!tarea) return <p className="text-gray-600 text-sm">Cargando tarea...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-6">
      {/* Título y descripción */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{tarea.titulo}</h2>
        <p className="text-gray-700">{tarea.descripcion || 'Sin descripción'}</p>
      </div>

      {/* Estado */}
      <div className="bg-white p-6 rounded shadow space-y-2">
        <label htmlFor="estado" className="block text-sm font-semibold text-gray-700">
          Estado de la tarea:
        </label>
        <select
          id="estado"
          value={tarea.estado}
          onChange={cambiarEstado}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="pendiente">Pendiente</option>
          <option value="en_progreso">En progreso</option>
          <option value="completada">Completada</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>

      {/* Comentarios */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Comentarios</h3>

        <ul className="space-y-2 mb-4 max-h-60 overflow-y-auto pr-2">
          {tarea.comentarios.length > 0 ? (
            tarea.comentarios.map((c, idx) => (
              <li key={idx} className="bg-gray-100 text-sm text-gray-800 p-3 rounded">
                {c.texto}
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-sm">Sin comentarios</li>
          )}
        </ul>

        <div className="flex gap-2">
          <input
            type="text"
            value={comentario}
            onChange={e => setComentario(e.target.value)}
            placeholder="Escribe un comentario..."
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={agregarComentario}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetalleTarea;
