// Controlador de productos que interactúa con Product.js
const Producto = require('../models/Product');

// GET todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find({ empresaId: req.empresaId });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
  }
};

// GET uno por ID
const obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.findOne({ _id: req.params.id, empresaId: req.empresaId });
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar producto', error: error.message });
  }
};

// POST nuevo
const crearProducto = async (req, res) => {
  try {
    console.log('Body recibido:', req.body);
    console.log('EmpresaId recibido:', req.empresaId);
    const producto = new Producto({ ...req.body, empresaId: req.empresaId });
    await producto.save();
    res.status(201).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear producto', error: error.message });
  }
};

// PUT actualizar
const actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findOneAndUpdate({ _id: req.params.id, empresaId: req.empresaId }, req.body, {
      new: true,
      runValidators: true
    });
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar producto', error: error.message });
  }
};

// DELETE
const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findOneAndDelete({ _id: req.params.id, empresaId: req.empresaId });
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar producto', error: error.message });
  }
};

 const importarProductos = async (req, res) => {
  try {
    const productos = req.body;

    const insertables = productos.map(p => ({
      empresaId: req.empresaId,
      nombre: p.nombre || '',
      sku: p.sku || '',
      precio: Number(p.precio) || 0,
      stock: Number(p.stock) || 0,
      categoria: p.categoria || '',
      activo: p.activo === true || p.activo === 'true'
    }));

    const insertados = await Producto.insertMany(insertables, { ordered: false });
    res.json({ mensaje: 'Importación exitosa', insertados: insertados.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al importar productos', error: error.message });
  }
};



module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  importarProductos
};
