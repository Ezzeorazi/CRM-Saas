const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  plan: String,
  colorPrimario: String,
  logoUrl: String,
  subdominio: {
    type: String,
    unique: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Empresa', empresaSchema);
