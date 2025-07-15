import axios from 'axios';

const clienteAxios = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default clienteAxios;
