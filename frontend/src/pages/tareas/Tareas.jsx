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
      showNotification('success', 'Tarea creada correctamente');
    } catch (error) {
      showNotification('error', 'Error al crear tarea');
    }
  };

  const prioridadColor = {
    alta: 'text-red-600',
    media: 'text-yellow-600',
    baja: 'text-green-600'
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Tareas</h2>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {mostrarFormulario ? 'Cancelar' : '+ Nueva Tarea'}
        </button>
      </div>

      {/* Formulario */}
      {mostrarFormulario && (
        <div className="bg-white p-4 rounded shadow">
          <FormularioTarea onSubmit={crearTarea} />
        </div>
      )}

      {/* Columnas por estado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {estados.map(estado => (
          <div key={estado} className="bg-gray-100 rounded shadow p-4 flex flex-col">
            <h3 className="text-center font-semibold text-gray-700 capitalize mb-4">
              {estado.replace('_', ' ')}
            </h3>
            <div className="space-y-3 overflow-y-auto max-h-[60vh]">
              {tareas.filter(t => t.estado === estado).map(tarea => (
                <Link
                  key={tarea._id}
                  to={`/dashboard/tareas/${tarea._id}`}
                  className="block bg-white rounded shadow p-3 hover:bg-gray-50 transition border border-gray-200"
                >
                  <p className="font-medium text-gray-800">{tarea.titulo}</p>
                  <p className={`text-sm ${prioridadColor[tarea.prioridad] || 'text-gray-500'}`}>
                    Prioridad: {tarea.prioridad}
                  </p>
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
