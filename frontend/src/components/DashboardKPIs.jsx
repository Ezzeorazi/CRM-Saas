import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserIcon, CubeIcon } from '@heroicons/react/24/solid';

function DashboardKPIs() {
  const [usuarios, setUsuarios] = useState(0);
  const [productos, setProductos] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        const [resUsuarios, resProductos] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/usuarios`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/productos`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
        ]);
        setUsuarios(resUsuarios.data.length);
        setProductos(resProductos.data.length);
      } catch (error) {
        console.error('Error al obtener KPIs', error);
      }
    };

    fetchData();
  }, []);

  const kpiCard = (title, count, Icon, color) => (
    <div className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4">
      <div className={`p-2 rounded-full ${color} text-white`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold">{count}</p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {kpiCard('Usuarios registrados', usuarios, UserIcon, 'bg-blue-500')}
      {kpiCard('Productos registrados', productos, CubeIcon, 'bg-green-500')}
    </div>
  );
}

export default DashboardKPIs;
