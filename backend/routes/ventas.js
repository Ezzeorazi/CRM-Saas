// Rutas de ventas. Usan ventaController.js y se muestran en Ventas.jsx
const express = require('express');
const router = express.Router();

const {
  obtenerVentas,
  obtenerVenta,
  crearVenta,
  actualizarVenta,
  eliminarVenta
} = require('../controllers/ventaController');

const { verificarToken, permitirRoles } = require('../middleware/authMiddleware');
const { check } = require('express-validator');
const { validar } = require('../middleware/validationMiddleware');

router.get('/', verificarToken, obtenerVentas);
router.get('/:id', verificarToken, obtenerVenta);
router.post(
  '/',
  verificarToken,
  permitirRoles('admin', 'ventas'),
  [
    check('cliente', 'Cliente requerido').not().isEmpty(),
    check('productos', 'Se requiere al menos un producto').isArray({ min: 1 }),
    check('productos.*.producto', 'ID de producto inválido').not().isEmpty(),
    check('productos.*.cantidad', 'Cantidad debe ser mayor a 0').isInt({ min: 1 }),
    check('total', 'Total requerido').isFloat({ min: 0 })
  ],
  validar,
  crearVenta
);
router.put(
  '/:id',
  verificarToken,
  permitirRoles('admin', 'ventas'),
  [
    check('productos').optional().isArray(),
    check('total').optional().isFloat({ min: 0 })
  ],
  validar,
  actualizarVenta
);
router.delete('/:id', verificarToken, permitirRoles('admin'), eliminarVenta);


module.exports = router;
