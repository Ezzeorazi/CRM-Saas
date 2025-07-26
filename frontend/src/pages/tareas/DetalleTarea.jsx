import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import clienteAxios from '../../api/clienteAxios';
import { AuthContext } from '../../context/AuthContext';

function DetalleTarea() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [tarea, setTarea] = useState(null);
  const [comentario, setComentario] = useState('');

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

  useEffect(() => { obtenerTarea(); }, [id, token]);

  const agregarComentario = async () => {
    const nueva = { ...tarea, comentarios: [...tarea.comentarios, { texto: comentario }] };
    try {
      await clienteAxios.put(`/tareas/${id}`, nueva, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComentario('');
      obtenerTarea();
    } catch (error) {
      alert('Error al comentar');
    }
  };

  const cambiarEstado = async e => {
    const nueva = { ...tarea, estado: e.target.value };
    try {
      await clienteAxios.put(`/tareas/${id}`, nueva, {
        headers: { Authorization: `Bearer ${token}` }
      });
      obtenerTarea();
    } catch (error) {
      console.error(error);
    }
  };

  if (!tarea) return <p>Cargando...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{tarea.titulo}</h2>
      <p>{tarea.descripcion}</p>
      <div>
        <label className="font-semibold mr-2">Estado:</label>
        <select value={tarea.estado} onChange={cambiarEstado} className="p-2 border rounded">
          <option value="pendiente">Pendiente</option>
          <option value="en_progreso">En progreso</option>
          <option value="completada">Completada</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Comentarios</h3>
        <ul className="space-y-1 mb-2">
          {tarea.comentarios.map((c, idx) => (
            <li key={idx} className="bg-gray-100 p-2 rounded">{c.texto}</li>
          ))}
          {tarea.comentarios.length === 0 && (
            <li className="text-sm text-gray-500">Sin comentarios</li>
          )}
        </ul>
        <div className="flex gap-2">
          <input
            type="text"
            value={comentario}
            onChange={e => setComentario(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={agregarComentario}
            className="bg-blue-600 text-white px-3 rounded"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetalleTarea;
