// Ruta protegida que verifica el token mediante authMiddleware
const express = require('express');
const router = express.Router();
const { verificarToken, permitirRoles } = require('../middleware/authMiddleware');

// Ruta solo para admin y rrhh
router.get('/', verificarToken, permitirRoles('admin', 'rrhh'), (req, res) => {
  res.json({
    mensaje: 'Acceso permitido a ruta protegida por rol ✅',
    usuario: req.usuario
  });
});

router.get(
  '/',
  verificarToken,
  permitirRoles('admin', 'ventas', 'soporte', 'marketing'),
  (req, res) => {
    res.json({
      mensaje: 'Acceso permitido a ruta protegida por rol ✅',
      usuario: req.usuario
    });
  }
);

module.exports = router;
