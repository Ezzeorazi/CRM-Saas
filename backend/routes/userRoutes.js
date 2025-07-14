// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { obtenerUsuarios, crearUsuario } = require('../controllers/userController');

// GET /api/usuarios
router.get('/', obtenerUsuarios);

// POST /api/usuarios
router.post('/', crearUsuario);

module.exports = router;
