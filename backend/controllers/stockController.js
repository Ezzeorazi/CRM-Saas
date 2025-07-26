const MovimientoStock = require('../models/MovimientoStock');
const Producto = require('../models/Product');

const registrarMovimiento = async (tipo, req, res) => {
  try {
    const { productoId, cantidad, motivo } = req.body;
    const producto = await Producto.findOne({ _id: productoId, empresaId: req.empresaId });
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });

    if (tipo === 'salida' && cantidad > producto.stock) {
      return res.status(400).json({ mensaje: 'Stock insuficiente' });
    }

    const movimiento = new MovimientoStock({
      productoId,
      tipo,
      cantidad,
      motivo,
      usuarioId: req.usuario.id,
      empresaId: req.empresaId
    });
    await movimiento.save();

    producto.stock += tipo === 'entrada' ? cantidad : -cantidad;
    await producto.save();

    res.status(201).json(movimiento);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar movimiento', error: error.message });
  }
};

const registrarEntrada = (req, res) => registrarMovimiento('entrada', req, res);
const registrarSalida = (req, res) => registrarMovimiento('salida', req, res);

const obtenerMovimientos = async (req, res) => {
  try {
    const { productoId, tipo, desde, hasta } = req.query;
    const filtro = { empresaId: req.empresaId };
    if (productoId) filtro.productoId = productoId;
    if (tipo) filtro.tipo = tipo;
    if (desde || hasta) {
      filtro.fecha = {};
      if (desde) filtro.fecha.$gte = new Date(desde);
      if (hasta) filtro.fecha.$lte = new Date(hasta);
    }

    const movimientos = await MovimientoStock.find(filtro)
      .populate('productoId')
      .populate('usuarioId')
      .sort({ fecha: -1 });

    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener movimientos', error: error.message });
  }
};

const productosStockBajo = async (req, res) => {
  try {
    const productos = await Producto.find({ empresaId: req.empresaId, $expr: { $lt: ['$stock', '$stockMinimo'] } });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
  }
};

const productosSinMovimientos = async (req, res) => {
  try {
    const dias = parseInt(req.params.dias, 10);
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - dias);

    const productosConMovs = await MovimientoStock.distinct('productoId', {
      empresaId: req.empresaId,
      fecha: { $gte: fechaLimite }
    });

    const productos = await Producto.find({
      empresaId: req.empresaId,
      _id: { $nin: productosConMovs }
    });

    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el reporte', error: error.message });
  }
};

const evolucionStock = async (req, res) => {
  try {
    const { productoId } = req.params;
    const movimientos = await MovimientoStock.find({ empresaId: req.empresaId, productoId }).sort({ fecha: 1 });
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener evolución', error: error.message });
  }
};

module.exports = {
  registrarEntrada,
  registrarSalida,
  obtenerMovimientos,
  productosStockBajo,
  productosSinMovimientos,
  evolucionStock
};
