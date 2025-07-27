import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../api/clienteAxios';
import { AuthContext } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

function DetalleOrden() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const { showNotification } = useNotification();
  const [orden, setOrden] = useState(null);
  const navigate = useNavigate();

  const obtenerOrden = async () => {
    try {
      const { data } = await clienteAxios.get(`/ordenes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrden(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { obtenerOrden(); }, [id, token]);

  const handleEtapaChange = (index, field, value) => {
    setOrden(prev => {
      const etapas = [...prev.etapas];
      etapas[index] = { ...etapas[index], [field]: value };
      return { ...prev, etapas };
    });
  };

  const guardarCambios = async () => {
    try {
      await clienteAxios.put(`/ordenes/${id}`, orden, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard/produccion');
    } catch (error) {
      showNotification('error', 'Error al guardar');
    }
  };

  if (!orden) return <p>Cargando...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Orden de Producción</h2>
      <p>Producto: {orden.producto?.nombre || orden.producto}</p>
      <p>Cantidad: {orden.cantidad}</p>

      <h3 className="font-semibold">Etapas</h3>
      <div className="space-y-2">
        {orden.etapas.map((etapa, idx) => (
          <div key={idx} className="bg-gray-100 p-2 rounded space-y-1">
            <input
              type="text"
              value={etapa.nombre}
              onChange={e => handleEtapaChange(idx, 'nombre', e.target.value)}
              className="w-full p-1 border rounded"
              placeholder="Nombre"
            />
            <select
              value={etapa.estado}
              onChange={e => handleEtapaChange(idx, 'estado', e.target.value)}
              className="w-full p-1 border rounded"
            >
              <option value="pendiente">Pendiente</option>
              <option value="en_progreso">En progreso</option>
              <option value="completada">Completada</option>
            </select>
          </div>
        ))}
        {orden.etapas.length === 0 && <p className="text-sm text-gray-500">Sin etapas</p>}
      </div>

      <button onClick={guardarCambios} className="bg-blue-600 text-white px-4 py-2 rounded">
        Guardar Cambios
      </button>
    </div>
  );
}

export default DetalleOrden;
