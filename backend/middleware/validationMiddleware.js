const { validationResult } = require('express-validator');

// Middleware reusable para procesar resultados de express-validator
const validar = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  next();
};

module.exports = { validar };
