import { useContext, useEffect, useState } from 'react';
import clienteAxios from '../../api/clienteAxios';
import { AuthContext } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import FormularioTarea from '../../components/FormularioTarea';
import { Link } from 'react-router-dom';

const estados = ['pendiente', 'en_progreso', 'completada', 'cancelada'];

function Tareas() {
  const { token } = useContext(AuthContext);
  const { showNotification } = useNotification();
  const [tareas, setTareas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const obtenerTareas = async () => {
    try {
      const { data } = await clienteAxios.get('/tareas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTareas(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerTareas();
  }, [token]);

  const crearTarea = async datos => {
    try {
      await clienteAxios.post('/tareas', datos, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMostrarFormulario(false);
      obtenerTareas();
    } catch (error) {
      showNotification('error', 'Error al crear tarea');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Tareas</h2>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Nueva Tarea
        </button>
      </div>

      {mostrarFormulario && (
        <FormularioTarea onSubmit={crearTarea} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        {estados.map(estado => (
          <div key={estado} className="bg-gray-100 rounded p-2">
            <h3 className="text-center font-semibold capitalize mb-2">{estado.replace('_', ' ')}</h3>
            <div className="space-y-2">
              {tareas.filter(t => t.estado === estado).map(tarea => (
                <Link
                  key={tarea._id}
                  to={`/dashboard/tareas/${tarea._id}`}
                  className="block bg-white p-2 rounded shadow hover:bg-gray-50"
                >
                  <p className="font-medium">{tarea.titulo}</p>
                  <p className="text-sm text-gray-500">Prioridad: {tarea.prioridad}</p>
                </Link>
              ))}
              {tareas.filter(t => t.estado === estado).length === 0 && (
                <p className="text-sm text-gray-400 text-center">Sin tareas</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tareas;
