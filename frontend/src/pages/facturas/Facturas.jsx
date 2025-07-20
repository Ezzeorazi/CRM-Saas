// Módulo de facturas que obtiene datos de /api/facturas.
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import clienteAxios from '../../api/clienteAxios';

function Facturas() {
  const { token } = useContext(AuthContext);
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    const obtener = async () => {
      try {
        const { data } = await clienteAxios.get('/facturas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFacturas(data);
      } catch (error) {
        console.error('Error al obtener facturas', error);
      }
    };
    obtener();
  }, [token]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Facturas</h2>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Número</th>
              <th className="p-3">Cliente</th>
              <th className="p-3">Total</th>
              <th className="p-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map(f => (
              <tr key={f._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{f.numero}</td>
                <td className="p-3">{f.venta?.cliente}</td>
                <td className="p-3">${f.total}</td>
                <td className="p-3">{f.estado}</td>
              </tr>
            ))}
            {facturas.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">No hay facturas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Facturas;
