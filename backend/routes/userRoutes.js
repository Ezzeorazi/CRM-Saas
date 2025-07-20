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

router.get('/', obtenerUsuarios);
router.post('/', crearUsuario);
router.get('/:id', obtenerUsuarioPorId);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;
