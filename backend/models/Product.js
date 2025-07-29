// Modelo de producto. Sirve a productController
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  empresaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empresa',
    required: true
  },
  nombre: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  stock: { type: Number, required: true, default: 0 },
  stockMinimo: { type: Number, default: 5 },
  precio: { type: Number, required: true },
  categoria: { type: String },
  activo: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Producto', productoSchema);
