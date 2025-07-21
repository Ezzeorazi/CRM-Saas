// Controlador de clientes. Maneja las operaciones con el modelo Cliente
const Cliente = require('../models/Cliente');

const obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find({ empresaId: req.empresaId });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener clientes', error: error.message });
  }
};

module.exports = { obtenerClientes };
