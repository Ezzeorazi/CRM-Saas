// Formulario de proveedores gestionado desde Proveedores.jsx.
import { useState } from 'react';

function FormularioProveedor({ onSubmit, proveedorInicial = {} }) {
  const [formulario, setFormulario] = useState({
    nombre: proveedorInicial.nombre || '',
    email: proveedorInicial.email || '',
    telefono: proveedorInicial.telefono || '',
    empresa: proveedorInicial.empresa || '',
    direccion: proveedorInicial.direccion || '',
    ciudad: proveedorInicial.ciudad || '',
    pais: proveedorInicial.pais || 'Argentina',
    cuit: proveedorInicial.cuit || '',
    activo: proveedorInicial.activo ?? true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario({
      ...formulario,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formulario);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl mx-auto">
      <input name="nombre" placeholder="Nombre" value={formulario.nombre} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="empresa" placeholder="Empresa" value={formulario.empresa} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="email" placeholder="Email" value={formulario.email} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="telefono" placeholder="Teléfono" value={formulario.telefono} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="direccion" placeholder="Dirección" value={formulario.direccion} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="ciudad" placeholder="Ciudad" value={formulario.ciudad} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="pais" placeholder="País" value={formulario.pais} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="cuit" placeholder="CUIT" value={formulario.cuit} onChange={handleChange} className="w-full border p-2 rounded" />
      <label className="flex items-center space-x-2 text-sm">
        <input type="checkbox" name="activo" checked={formulario.activo} onChange={handleChange} />
        <span>Activo</span>
      </label>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar</button>
    </form>
  );
}

export default FormularioProveedor;