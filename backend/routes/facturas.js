// Rutas de facturas. Usan facturaController.js y se muestran en Facturas.jsx
const express = require('express');
const router = express.Router();

const {
  obtenerFacturas,
  obtenerFactura,
  crearFactura,
  actualizarFactura,
  eliminarFactura
} = require('../controllers/facturaController');

const { verificarToken, permitirRoles } = require('../middleware/authMiddleware');

router.get('/', verificarToken, obtenerFacturas);
router.get('/:id', verificarToken, obtenerFactura);
router.post('/', verificarToken, permitirRoles('admin', 'ventas'), crearFactura);
router.put('/:id', verificarToken, permitirRoles('admin', 'ventas'), actualizarFactura);
router.delete('/:id', verificarToken, permitirRoles('admin'), eliminarFactura);

module.exports = router;
