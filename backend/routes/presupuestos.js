// Rutas de presupuestos. Usan presupuestoController.js y llegan a Presupuestos.jsx
const express = require('express');
const router = express.Router();

const {
  obtenerPresupuestos,
  obtenerPresupuesto,
  crearPresupuesto,
  actualizarPresupuesto,
  eliminarPresupuesto,
  descargarPDF
} = require('../controllers/presupuestoController');

const { verificarToken, permitirRoles } = require('../middleware/authMiddleware');
const { check } = require('express-validator');
const { validar } = require('../middleware/validationMiddleware');

router.get('/', verificarToken, obtenerPresupuestos);
router.get('/:id/pdf', verificarToken, descargarPDF);
router.get('/:id', verificarToken, obtenerPresupuesto);
router.post(
  '/',
  verificarToken,
  permitirRoles('admin', 'ventas'),
  [
    check('cliente', 'Cliente requerido').not().isEmpty(),
    check('productos', 'Productos inválidos').isArray({ min: 1 }),
    check('productos.*.producto', 'ID de producto requerido').not().isEmpty(),
    check('productos.*.cantidad', 'Cantidad inválida').isInt({ min: 1 }),
    check('total', 'Total requerido').isFloat({ min: 0 })
  ],
  validar,
  crearPresupuesto
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
  actualizarPresupuesto
);
router.delete('/:id', verificarToken, permitirRoles('admin'), eliminarPresupuesto);


module.exports = router;
