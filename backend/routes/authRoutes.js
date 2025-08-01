// Rutas de autenticación. Conecta con authController.js y se usa en Login.jsx
const express = require('express');
const router = express.Router();
const { loginUsuario } = require('../controllers/authController');
const { check } = require('express-validator');
const { validar } = require('../middleware/validationMiddleware');

router.post(
  '/login',
  [
    check('email', 'Email inválido').isEmail(),
    check('contraseña', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 })
  ],
  validar,
  loginUsuario
);

module.exports = router;
