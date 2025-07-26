const OrdenProduccion = require('../models/OrdenProduccion');

const calcularEstado = (etapas = []) => {
  if (!etapas.length) return 'pendiente';
  if (etapas.every(e => e.estado === 'completada')) return 'completada';
  if (etapas.some(e => e.estado === 'en_progreso')) return 'en_progreso';
  return 'pendiente';
};

const obtenerOrdenes = async (req, res) => {
  try {
    const ordenes = await OrdenProduccion.find({ empresaId: req.empresaId }).populate('producto');
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener órdenes', error: error.message });
  }
};

const obtenerOrden = async (req, res) => {
  try {
    const orden = await OrdenProduccion.findOne({ _id: req.params.id, empresaId: req.empresaId }).populate('producto');
    if (!orden) return res.status(404).json({ mensaje: 'Orden no encontrada' });
    res.json(orden);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener orden', error: error.message });
  }
};

const crearOrden = async (req, res) => {
  try {
    const orden = new OrdenProduccion({ ...req.body, empresaId: req.empresaId });
    orden.estadoGeneral = calcularEstado(orden.etapas);
    await orden.save();
    res.status(201).json(orden);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear orden', error: error.message });
  }
};

const actualizarOrden = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.etapas) {
      data.estadoGeneral = calcularEstado(data.etapas);
    }
    const orden = await OrdenProduccion.findOneAndUpdate(
      { _id: req.params.id, empresaId: req.empresaId },
      data,
      { new: true, runValidators: true }
    );
    if (!orden) return res.status(404).json({ mensaje: 'Orden no encontrada' });
    res.json(orden);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar orden', error: error.message });
  }
};

const eliminarOrden = async (req, res) => {
  try {
    const orden = await OrdenProduccion.findOneAndDelete({ _id: req.params.id, empresaId: req.empresaId });
    if (!orden) return res.status(404).json({ mensaje: 'Orden no encontrada' });
    res.json({ mensaje: 'Orden eliminada' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar orden', error: error.message });
  }
};

module.exports = {
  obtenerOrdenes,
  obtenerOrden,
  crearOrden,
  actualizarOrden,
  eliminarOrden
};
