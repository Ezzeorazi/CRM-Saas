const express = require('express');
const router = express.Router();

const {
  obtenerOrdenes,
  obtenerOrden,
  crearOrden,
  actualizarOrden,
  eliminarOrden
} = require('../controllers/ordenProduccionController');

const { verificarToken, permitirRoles } = require('../middleware/authMiddleware');

router.get('/', verificarToken, obtenerOrdenes);
router.get('/:id', verificarToken, obtenerOrden);
router.post('/', verificarToken, permitirRoles('admin', 'produccion'), crearOrden);
router.put('/:id', verificarToken, permitirRoles('admin', 'produccion'), actualizarOrden);
router.delete('/:id', verificarToken, permitirRoles('admin', 'produccion'), eliminarOrden);

module.exports = router;
