const express = require('express');
const router = express.Router();
const { loginUsuario } = require('../controllers/authController');

router.post('/login', loginUsuario);

module.exports = router;
