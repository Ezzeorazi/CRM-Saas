
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
const { check } = require('express-validator');
const { validar } = require('../middleware/validationMiddleware');

router.get('/', verificarToken, obtenerProductos);
router.get('/:id', verificarToken, obtenerProducto);
router.post(
  '/',
  verificarToken,
  permitirRoles('admin', 'inventario'),
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('sku', 'SKU requerido').not().isEmpty(),
    check('stock', 'Stock debe ser número').isInt({ min: 0 }),
    check('precio', 'Precio debe ser numérico').isFloat({ min: 0 })
  ],
  validar,
  crearProducto
);
router.put(
  '/:id',
  verificarToken,
  permitirRoles('admin', 'inventario'),
  [
    check('stock').optional().isInt({ min: 0 }),
    check('precio').optional().isFloat({ min: 0 })
  ],
  validar,
  actualizarProducto
);
router.delete('/:id', verificarToken, permitirRoles('admin'), eliminarProducto);
router.post('/importar', verificarToken, permitirRoles('admin', 'inventario'), importarProductos);


module.exports = router;
