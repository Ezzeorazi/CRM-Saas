// Controlador de pagos. Procesa los pagos recibidos desde las rutas
const Pago = require('../models/Pago');
const Factura = require('../models/Factura');

const listarPagosPorFactura = async (req, res) => {
  try {
    const pagos = await Pago.find({ factura: req.params.facturaId, empresaId: req.empresaId });
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener pagos', error: error.message });
  }
};

const crearPago = async (req, res) => {
  try {
    const pago = new Pago({ ...req.body, empresaId: req.empresaId });
    const guardado = await pago.save();
    // actualizar estado factura
    const pagos = await Pago.find({ factura: pago.factura, empresaId: req.empresaId });
    const sum = pagos.reduce((acc, p) => acc + p.monto, 0);
    const factura = await Factura.findOne({ _id: pago.factura, empresaId: req.empresaId });
    if (!factura) return res.status(404).json({ mensaje: 'Factura no encontrada' });
    if (sum >= factura.total) factura.estado = 'pagada';
    else factura.estado = 'parcial';
    await factura.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar pago', error: error.message });
  }
};

module.exports = {
  listarPagosPorFactura,
  crearPago
};
