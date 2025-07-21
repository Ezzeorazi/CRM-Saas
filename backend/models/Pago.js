// Modelo de pago empleado en pagoController
const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
  empresaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empresa',
    required: true
  },
  factura: { type: mongoose.Schema.Types.ObjectId, ref: 'Factura', required: true },
  monto: { type: Number, required: true },
  metodo: { type: String, default: 'efectivo' },
  fecha: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pago', pagoSchema);
