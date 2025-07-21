// Modelo de venta consultado en ventaController
const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  empresaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empresa',
    required: true
  },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
      cantidad: { type: Number, required: true, min: 1 },
      precio: { type: Number, required: true }
    }
  ],
  presupuesto: { type: mongoose.Schema.Types.ObjectId, ref: 'Presupuesto' },
  estado: {
    type: String,
    enum: ['pendiente', 'procesando', 'completado', 'cancelado'],
    default: 'pendiente'
  },
  total: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
  notas: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Venta', ventaSchema);
