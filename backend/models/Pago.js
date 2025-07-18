const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
  factura: { type: mongoose.Schema.Types.ObjectId, ref: 'Factura', required: true },
  monto: { type: Number, required: true },
  metodo: { type: String, default: 'efectivo' },
  fecha: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pago', pagoSchema);
