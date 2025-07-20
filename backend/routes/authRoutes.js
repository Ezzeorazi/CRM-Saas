// Rutas de autenticación. Conecta con authController.js y se usa en Login.jsx
const express = require('express');
const router = express.Router();
const { loginUsuario } = require('../controllers/authController');

router.post('/login', loginUsuario);

module.exports = router;
