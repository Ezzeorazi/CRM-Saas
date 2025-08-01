// Controlador de ventas. Conecta Ventas.jsx con la base de datos
const Venta = require('../models/Venta');
const Producto = require('../models/Product'); 

const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.find({ empresaId: req.empresaId })
      .populate('cliente')
      .populate('productos.producto');
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener ventas', error: error.message });
  }
};

const obtenerVenta = async (req, res) => {
  try {
    const venta = await Venta.findOne({ _id: req.params.id, empresaId: req.empresaId })
      .populate('cliente')
      .populate('productos.producto');
    if (!venta) return res.status(404).json({ mensaje: 'Venta no encontrada' });
    res.json(venta);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener venta', error: error.message });
  }
};

const crearVenta = async (req, res) => {
  const session = await Venta.startSession();
  session.startTransaction();
  try {
    if (!Array.isArray(req.body.productos) || req.body.productos.length === 0) {
      return res.status(400).json({ mensaje: 'La venta debe tener al menos un producto.' });
    }

    const venta = new Venta({ ...req.body, empresaId: req.empresaId });

    for (const item of venta.productos) {
      const producto = await Producto.findById(item.producto).session(session);
      if (!producto) throw new Error('Producto no encontrado');
      if (producto.stock < item.cantidad) throw new Error(`Stock insuficiente para ${producto.nombre}`);
      producto.stock -= item.cantidad;
      await producto.save({ session });
    }

    const ventaGuardada = await venta.save({ session });
    await session.commitTransaction();
    res.status(201).json(ventaGuardada);
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ mensaje: 'Error al crear venta', error: error.message });
  } finally {
    session.endSession();
  }
};

const actualizarVenta = async (req, res) => {
  try {
    const ventaActualizada = await Venta.findOneAndUpdate({ _id: req.params.id, empresaId: req.empresaId }, req.body, { new: true });
    if (!ventaActualizada) return res.status(404).json({ mensaje: 'Venta no encontrada' });
    res.json(ventaActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar venta', error: error.message });
  }
};

const eliminarVenta = async (req, res) => {
  try {
    const ventaEliminada = await Venta.findOneAndDelete({ _id: req.params.id, empresaId: req.empresaId });
    if (!ventaEliminada) return res.status(404).json({ mensaje: 'Venta no encontrada' });
    res.json({ mensaje: 'Venta eliminada' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar venta', error: error.message });
  }
};



module.exports = {
  obtenerVentas,
  obtenerVenta,
  crearVenta,
  actualizarVenta,
  eliminarVenta
};
