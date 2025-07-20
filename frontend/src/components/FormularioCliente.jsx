// Formulario para crear y editar clientes.
import { useState } from 'react';

function FormularioCliente({ clienteInicial = {}, onSubmit }) {
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    direccion: '',
    ciudad: '',
    pais: 'Argentina',
    razonSocial: '',
    cuil: '',
    activo: true,
    ...clienteInicial
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formulario);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: 'nombre', placeholder: 'Nombre', required: true },
          { name: 'email', placeholder: 'Email', type: 'email' },
          { name: 'telefono', placeholder: 'Teléfono' },
          { name: 'empresa', placeholder: 'Empresa' },
          { name: 'direccion', placeholder: 'Dirección' },
          { name: 'ciudad', placeholder: 'Ciudad' },
          { name: 'pais', placeholder: 'País' },
          { name: 'razonSocial', placeholder: 'Razón Social' },
          { name: 'cuil', placeholder: 'CUIL' },
        ].map((input) => (
          <input
            key={input.name}
            type={input.type || 'text'}
            name={input.name}
            placeholder={input.placeholder}
            required={input.required}
            value={formulario[input.name]}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="activo"
          checked={formulario.activo}
          onChange={handleChange}
        />
        <span className="text-sm text-gray-700">Activo</span>
      </label>

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
      >
        Guardar Cliente
      </button>
    </form>
  );
}

export default FormularioCliente;
