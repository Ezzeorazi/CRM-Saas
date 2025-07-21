const express = require('express');
const router = express.Router();
const { crearEmpresaDemo } = require('../controllers/empresaController');

router.post('/', crearEmpresaDemo);

module.exports = router;
