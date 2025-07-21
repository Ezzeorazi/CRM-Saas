// Rutas de usuarios. Usan userController.js
// Rutas de usuarios.
// Reciben solicitudes del frontend y llaman al userController.
// Protegidas por authMiddleware para verificar permisos.
const express = require('express');
const router = express.Router();
const {
  obtenerUsuarios,
  crearUsuario,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
} = require('../controllers/userController');
const { verificarToken } = require('../middleware/authMiddleware');

router.get('/', verificarToken, obtenerUsuarios);
router.post('/', verificarToken, crearUsuario);
router.get('/:id', verificarToken, obtenerUsuarioPorId);
router.put('/:id', verificarToken, actualizarUsuario);
router.delete('/:id', verificarToken, eliminarUsuario);

module.exports = router;
