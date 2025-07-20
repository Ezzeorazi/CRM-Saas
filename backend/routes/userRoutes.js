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

// GET /api/usuarios
router.get('/', obtenerUsuarios);

// POST /api/usuarios
router.post('/', crearUsuario);

// GET /api/usuarios/:id ✅
router.get('/:id', obtenerUsuarioPorId);

// PUT /api/usuarios/:id ✅
router.put('/:id', actualizarUsuario);

// DELETE /api/usuarios/:id ✅
router.delete('/:id', eliminarUsuario);

module.exports = router;
