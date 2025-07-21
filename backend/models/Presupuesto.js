// Modelo de presupuesto manejado en presupuestoController
const mongoose = require('mongoose');

const presupuestoSchema = new mongoose.Schema({
  empresaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empresa',
    required: true
  },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
      nombre: String,
      cantidad: { type: Number, required: true },
      precio: { type: Number, required: true },
      subtotal: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  validez: { type: Date },
  estado: {
    type: String,
    enum: ['pendiente', 'aceptado', 'rechazado'],
    default: 'pendiente'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Presupuesto', presupuestoSchema);
