const express = require('express');
const router = express.Router();

const {
  registrarEntrada,
  registrarSalida,
  obtenerMovimientos,
  productosStockBajo,
  productosSinMovimientos,
  evolucionStock
} = require('../controllers/stockController');

const { verificarToken, permitirRoles } = require('../middleware/authMiddleware');

router.post('/entrada', verificarToken, permitirRoles('admin', 'inventario'), registrarEntrada);
router.post('/salida', verificarToken, permitirRoles('admin', 'inventario'), registrarSalida);
router.get('/', verificarToken, obtenerMovimientos);

router.get('/reportes/stock-bajo', verificarToken, productosStockBajo);
router.get('/reportes/sin-movimientos/:dias', verificarToken, productosSinMovimientos);
router.get('/reportes/evolucion/:productoId', verificarToken, evolucionStock);

module.exports = router;
