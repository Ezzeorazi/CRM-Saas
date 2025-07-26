const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  texto: String,
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fecha: { type: Date, default: Date.now }
});

const tareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: String,
  asignadoA: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  estado: {
    type: String,
    enum: ['pendiente', 'en_progreso', 'completada', 'cancelada'],
    default: 'pendiente'
  },
  prioridad: {
    type: String,
    enum: ['alta', 'media', 'baja'],
    default: 'media'
  },
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
  fechaInicio: Date,
  fechaVencimiento: Date,
  empresaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true },
  comentarios: [comentarioSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Tarea', tareaSchema);
