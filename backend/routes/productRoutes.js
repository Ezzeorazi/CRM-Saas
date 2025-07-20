
// Rutas de productos. Usan productController.js y se consultan en productos del frontend
// backend/routes/productoRoutes.js

const express = require('express');
const router = express.Router();

const {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  importarProductos
} = require('../controllers/productController');

const { verificarToken, permitirRoles } = require('../middleware/authMiddleware');

router.get('/', verificarToken, obtenerProductos);
router.get('/:id', verificarToken, obtenerProducto);
router.post('/', verificarToken, permitirRoles('admin', 'inventario'), crearProducto);
router.put('/:id', verificarToken, permitirRoles('admin', 'inventario'), actualizarProducto);
router.delete('/:id', verificarToken, permitirRoles('admin'), eliminarProducto);
router.post('/importar', verificarToken, permitirRoles('admin', 'inventario'), importarProductos);


module.exports = router;
