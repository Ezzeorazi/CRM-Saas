// Rutas de pagos. Usan pagoController.js
const express = require('express');
const router = express.Router();

const { listarPagosPorFactura, crearPago } = require('../controllers/pagoController');

const { verificarToken, permitirRoles } = require('../middleware/authMiddleware');

router.get('/factura/:facturaId', verificarToken, listarPagosPorFactura);
router.post('/', verificarToken, permitirRoles('admin', 'ventas'), crearPago);

module.exports = router;
