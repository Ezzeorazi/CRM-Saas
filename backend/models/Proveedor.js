// models/Proveedor.js
const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: String,
  telefono: String,
  empresa: String,
  direccion: String,
  ciudad: String,
  pais: { type: String, default: 'Argentina' },
  cuit: String,
  activo: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Proveedor', proveedorSchema);
