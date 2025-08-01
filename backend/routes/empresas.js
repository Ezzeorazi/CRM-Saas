const express = require('express');
const router = express.Router();
const { crearEmpresaDemo } = require('../controllers/empresaController');
const { check } = require('express-validator');
const { validar } = require('../middleware/validationMiddleware');

router.post(
  '/',
  [
    check('nombre', 'Nombre obligatorio').not().isEmpty(),
    check('emailUsuario', 'Email inválido').isEmail(),
    check('contraseña', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 })
  ],
  validar,
  crearEmpresaDemo
);

module.exports = router;
