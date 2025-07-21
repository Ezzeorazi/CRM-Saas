// Controlador de facturas. Gestiona Factura.js y responde a las rutas de facturas
const Factura = require('../models/Factura');
const Pago = require('../models/Pago');

const obtenerFacturas = async (req, res) => {
  try {
    const facturas = await Factura.find({ empresaId: req.empresaId }).populate('venta');
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener facturas', error: error.message });
  }
};

const obtenerFactura = async (req, res) => {
  try {
    const factura = await Factura.findOne({ _id: req.params.id, empresaId: req.empresaId }).populate('venta');
    if (!factura) return res.status(404).json({ mensaje: 'Factura no encontrada' });
    res.json(factura);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener factura', error: error.message });
  }
};

const crearFactura = async (req, res) => {
  try {
    const ultima = await Factura.findOne({ empresaId: req.empresaId }).sort({ numero: -1 });
    const numero = ultima ? ultima.numero + 1 : 1;
    const factura = new Factura({ ...req.body, empresaId: req.empresaId, numero });
    const guardada = await factura.save();
    res.status(201).json(guardada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear factura', error: error.message });
  }
};

const actualizarFactura = async (req, res) => {
  try {
    const actualizada = await Factura.findOneAndUpdate({ _id: req.params.id, empresaId: req.empresaId }, req.body, { new: true });
    if (!actualizada) return res.status(404).json({ mensaje: 'Factura no encontrada' });
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar factura', error: error.message });
  }
};

const eliminarFactura = async (req, res) => {
  try {
    const eliminada = await Factura.findOneAndDelete({ _id: req.params.id, empresaId: req.empresaId });
    if (!eliminada) return res.status(404).json({ mensaje: 'Factura no encontrada' });
    await Pago.deleteMany({ factura: eliminada._id });
    res.json({ mensaje: 'Factura eliminada' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar factura', error: error.message });
  }
};

module.exports = {
  obtenerFacturas,
  obtenerFactura,
  crearFactura,
  actualizarFactura,
  eliminarFactura
};
