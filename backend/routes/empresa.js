const express = require('express');
const router = express.Router();
const { subirLogo, uploadLogo } = require('../controllers/empresaController');
const { verificarToken } = require('../middleware/authMiddleware');

router.post('/logo', verificarToken, uploadLogo.single('logo'), subirLogo);

module.exports = router;
