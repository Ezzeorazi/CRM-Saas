const express = require('express');
const router = express.Router();

const {
  obtenerPresupuestos,
  obtenerPresupuesto,
  crearPresupuesto,
  actualizarPresupuesto,
  eliminarPresupuesto
} = require('../controllers/presupuestoController');

const { verificarToken, permitirRoles } = require('../middleware/authMiddleware');

router.get('/', verificarToken, obtenerPresupuestos);
router.get('/:id', verificarToken, obtenerPresupuesto);
router.post('/', verificarToken, permitirRoles('admin', 'ventas'), crearPresupuesto);
router.put('/:id', verificarToken, permitirRoles('admin', 'ventas'), actualizarPresupuesto);
router.delete('/:id', verificarToken, permitirRoles('admin'), eliminarPresupuesto);


module.exports = router;
