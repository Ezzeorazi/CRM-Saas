// Modelo de factura usado por facturaController
const mongoose = require('mongoose');

const facturaSchema = new mongoose.Schema({
  empresaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empresa',
    required: true
  },
  venta: { type: mongoose.Schema.Types.ObjectId, ref: 'Venta', required: true },
  numero: { type: Number, unique: true },
  subtotal: { type: Number, required: true },
  iva: { type: Number, required: true },
  total: { type: Number, required: true },
  estado: {
    type: String,
    enum: ['pendiente', 'pagada', 'parcial'],
    default: 'pendiente'
  },
  fecha: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('Factura', facturaSchema);
