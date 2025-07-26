const mongoose = require('mongoose');

const movimientoStockSchema = new mongoose.Schema({
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  tipo: { type: String, enum: ['entrada', 'salida'], required: true },
  cantidad: { type: Number, required: true },
  motivo: { type: String },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  empresaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true },
  fecha: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('MovimientoStock', movimientoStockSchema);
