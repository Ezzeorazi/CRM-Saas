// Configuración de Axios.
// Adjunta el token al enviar solicitudes al backend.
import axios from 'axios';

const clienteAxios = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Adjunta automáticamente el token almacenado si existe
clienteAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default clienteAxios;