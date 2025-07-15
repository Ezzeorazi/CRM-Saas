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
