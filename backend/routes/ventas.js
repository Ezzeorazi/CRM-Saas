const express = require('express');
const router = express.Router();

const {
  obtenerVentas,
  obtenerVenta,
  crearVenta,
  actualizarVenta,
  eliminarVenta,
  crearVentaDesdePresupuesto
} = require('../controllers/ventaController');

const { verificarToken, permitirRoles } = require('../middleware/authMiddleware');

router.get('/', verificarToken, obtenerVentas);
router.get('/:id', verificarToken, obtenerVenta);
router.post('/', verificarToken, permitirRoles('admin', 'ventas'), crearVenta);
router.put('/:id', verificarToken, permitirRoles('admin', 'ventas'), actualizarVenta);
router.delete('/:id', verificarToken, permitirRoles('admin'), eliminarVenta);
router.post('/desde-presupuesto/:id', verificarToken, permitirRoles('admin', 'ventas'), crearVentaDesdePresupuesto);


module.exports = router;
