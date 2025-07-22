// Controlador de ventas. Conecta Ventas.jsx con la base de datos
const Venta = require('../models/Venta');

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
  try {
    const venta = new Venta({ ...req.body, empresaId: req.empresaId });
    const ventaGuardada = await venta.save();
    res.status(201).json(ventaGuardada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear venta', error: error.message });
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

const Presupuesto = require('../models/Presupuesto');

const crearVentaDesdePresupuesto = async (req, res) => {
  try {
    const presupuesto = await Presupuesto.findOne({ _id: req.params.id, empresaId: req.empresaId })
      .populate('cliente')
      .populate('productos.producto');

    if (!presupuesto) {
      return res.status(404).json({ mensaje: 'Presupuesto no encontrado' });
    }

    if (presupuesto.estado !== 'aceptado') {
      return res.status(400).json({ mensaje: 'Solo se pueden convertir presupuestos aceptados en ventas' });
    }

    if (!presupuesto.cliente) {
      return res.status(400).json({ mensaje: 'El cliente asociado al presupuesto no existe' });
    }

    // Nos aseguramos de que todos los productos del presupuesto existan
    const productosConvertidos = [];
    for (const p of presupuesto.productos) {
      if (!p.producto) {
        return res.status(400).json({ mensaje: 'Uno o más productos ya no existen' });
      }
      productosConvertidos.push({
        producto: p.producto._id || p.producto,
        cantidad: p.cantidad,
        precio: p.precio,
        subtotal: p.subtotal
      });
    }

    const nuevaVenta = new Venta({
      empresaId: req.empresaId || presupuesto.empresaId,
      cliente: presupuesto.cliente._id,
      productos: productosConvertidos,
      total: presupuesto.total,
      presupuesto: presupuesto._id
    });

    const ventaGuardada = await nuevaVenta.save();

    return res.status(201).json({ mensaje: 'Venta creada con éxito', venta: ventaGuardada });
  } catch (error) {
    console.error('Error al convertir presupuesto:', error);
    return res.status(500).json({ mensaje: 'Error interno al convertir presupuesto en venta', error: error.message });
  }
};


module.exports = {
  obtenerVentas,
  obtenerVenta,
  crearVenta,
  actualizarVenta,
  eliminarVenta,
  crearVentaDesdePresupuesto
};
