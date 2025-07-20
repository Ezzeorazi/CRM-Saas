// Controlador de ventas. Conecta Ventas.jsx con la base de datos
const Venta = require('../models/Venta');

const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.find()
      .populate('cliente')
      .populate('productos.producto');
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener ventas', error: error.message });
  }
};

const obtenerVenta = async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id)
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
    const venta = new Venta(req.body);
    const ventaGuardada = await venta.save();
    res.status(201).json(ventaGuardada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear venta', error: error.message });
  }
};

const actualizarVenta = async (req, res) => {
  try {
    const ventaActualizada = await Venta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ventaActualizada) return res.status(404).json({ mensaje: 'Venta no encontrada' });
    res.json(ventaActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar venta', error: error.message });
  }
};

const eliminarVenta = async (req, res) => {
  try {
    const ventaEliminada = await Venta.findByIdAndDelete(req.params.id);
    if (!ventaEliminada) return res.status(404).json({ mensaje: 'Venta no encontrada' });
    res.json({ mensaje: 'Venta eliminada' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar venta', error: error.message });
  }
};

const Presupuesto = require('../models/Presupuesto');

const crearVentaDesdePresupuesto = async (req, res) => {
  try {
    const presupuesto = await Presupuesto.findById(req.params.id)
      .populate('cliente')
      .populate('productos.producto');

    if (!presupuesto) {
      return res.status(404).json({ mensaje: 'Presupuesto no encontrado' });
    }

    if (presupuesto.estado !== 'aceptado') {
      return res.status(400).json({ mensaje: 'Solo se pueden convertir presupuestos aceptados en ventas' });
    }

    const nuevaVenta = new Venta({
      cliente: presupuesto.cliente._id,
      productos: presupuesto.productos.map(p => ({
        producto: p.producto?._id,
        cantidad: p.cantidad,
        precio: p.precio,
        subtotal: p.subtotal
      })),
      total: presupuesto.total
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
