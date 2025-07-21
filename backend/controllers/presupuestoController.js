// Controlador de presupuestos para Presupuestos.jsx
const Presupuesto = require('../models/Presupuesto');

const obtenerPresupuestos = async (req, res) => {
  try {
    const presupuestos = await Presupuesto.find({ empresaId: req.empresaId })
      .populate('cliente')
      .populate('productos.producto');
    res.json(presupuestos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener presupuestos', error: error.message });
  }
};

const obtenerPresupuesto = async (req, res) => {
  try {
    const presupuesto = await Presupuesto.findOne({ _id: req.params.id, empresaId: req.empresaId })
      .populate('cliente')
      .populate('productos.producto');
    if (!presupuesto) return res.status(404).json({ mensaje: 'Presupuesto no encontrado' });
    res.json(presupuesto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener presupuesto', error: error.message });
  }
};

const crearPresupuesto = async (req, res) => {
  try {
    const presupuesto = new Presupuesto({ ...req.body, empresaId: req.empresaId });
    const guardado = await presupuesto.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear presupuesto', error: error.message });
  }
};

const actualizarPresupuesto = async (req, res) => {
  try {
    const actualizado = await Presupuesto.findOneAndUpdate({ _id: req.params.id, empresaId: req.empresaId }, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ mensaje: 'Presupuesto no encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar presupuesto', error: error.message });
  }
};

const eliminarPresupuesto = async (req, res) => {
  try {
    const eliminado = await Presupuesto.findOneAndDelete({ _id: req.params.id, empresaId: req.empresaId });
    if (!eliminado) return res.status(404).json({ mensaje: 'Presupuesto no encontrado' });
    res.json({ mensaje: 'Presupuesto eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar presupuesto', error: error.message });
  }
};

module.exports = {
  obtenerPresupuestos,
  obtenerPresupuesto,
  crearPresupuesto,
  actualizarPresupuesto,
  eliminarPresupuesto
};
