const mongoose = require('mongoose');

const etapaSchema = new mongoose.Schema({
  nombre: String,
  estado: { type: String, enum: ['pendiente', 'en_progreso', 'completada'], default: 'pendiente' },
  responsable: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fechaInicio: Date,
  fechaFin: Date
});

const ordenProduccionSchema = new mongoose.Schema({
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  cantidad: { type: Number, required: true },
  etapas: [etapaSchema],
  ventaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Venta' },
  empresaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true },
  estadoGeneral: String,
  observaciones: String
}, {
  timestamps: true
});

module.exports = mongoose.model('OrdenProduccion', ordenProduccionSchema);
