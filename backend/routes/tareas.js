const express = require('express');
const router = express.Router();

const {
  obtenerTareas,
  obtenerTarea,
  crearTarea,
  actualizarTarea,
  eliminarTarea
} = require('../controllers/tareaController');

const { verificarToken, permitirRoles } = require('../middleware/authMiddleware');

router.get('/', verificarToken, obtenerTareas);
router.get('/:id', verificarToken, obtenerTarea);
router.post('/', verificarToken, permitirRoles('admin', 'produccion', 'soporte'), crearTarea);
router.put('/:id', verificarToken, permitirRoles('admin', 'produccion', 'soporte'), actualizarTarea);
router.delete('/:id', verificarToken, permitirRoles('admin', 'produccion'), eliminarTarea);

module.exports = router;
