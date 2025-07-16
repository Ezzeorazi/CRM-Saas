const Proveedor = require('../models/Proveedor');

const obtenerProveedores = async (req, res) => {
  const proveedores = await Proveedor.find().sort({ createdAt: -1 });
  res.json(proveedores);
};

const crearProveedor = async (req, res) => {
  try {
    const proveedor = new Proveedor(req.body);
    const proveedorGuardado = await proveedor.save();
    res.status(201).json(proveedorGuardado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear proveedor', error: error.message });
  }
};

const obtenerProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor) return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener proveedor', error: error.message });
  }
};

const actualizarProveedor = async (req, res) => {
  try {
    const proveedorActualizado = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(proveedorActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar proveedor', error: error.message });
  }
};

const eliminarProveedor = async (req, res) => {
  try {
    await Proveedor.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Proveedor eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar proveedor', error: error.message });
  }
};

module.exports = {
  obtenerProveedores,
  crearProveedor,
  obtenerProveedor,
  actualizarProveedor,
  eliminarProveedor
};
