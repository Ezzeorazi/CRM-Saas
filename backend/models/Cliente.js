// Modelo de cliente utilizado en clienteController
const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  empresaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empresa',
    required: true
  },
  nombre: { type: String, required: true },
  email: { type: String },
  telefono: { type: String },
  empresa: { type: String },
  direccion: { type: String },
  ciudad: { type: String },
  pais: { type: String, default: 'Argentina' },
  razonSocial: { type: String },
  cuil: { type: String },
  activo: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cliente', clienteSchema);
