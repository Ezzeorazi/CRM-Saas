// Rutas de clientes. Llaman a clienteController.js y se consumen en las páginas de clientes
const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const { verificarToken } = require('../middleware/authMiddleware');
const { check } = require('express-validator');
const { validar } = require('../middleware/validationMiddleware');

router.get('/', verificarToken, async (req, res) => {
  const clientes = await Cliente.find({ empresaId: req.empresaId }).sort({ createdAt: -1 });
  res.json(clientes);
});

router.post(
  '/',
  verificarToken,
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email').optional().isEmail(),
    check('telefono').optional().isString()
  ],
  validar,
  async (req, res) => {
    const cliente = new Cliente({ ...req.body, empresaId: req.empresaId });
    await cliente.save();
    res.status(201).json(cliente);
  }
);

router.get('/:id', verificarToken, async (req, res) => {
  const cliente = await Cliente.findOne({ _id: req.params.id, empresaId: req.empresaId });
  if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
  res.json(cliente);
});

router.put(
  '/:id',
  verificarToken,
  [
    check('email').optional().isEmail(),
    check('telefono').optional().isString()
  ],
  validar,
  async (req, res) => {
    const clienteActualizado = await Cliente.findOneAndUpdate({ _id: req.params.id, empresaId: req.empresaId }, req.body, { new: true });
    res.json(clienteActualizado);
  }
);

router.delete('/:id', verificarToken, async (req, res) => {
  await Cliente.findOneAndDelete({ _id: req.params.id, empresaId: req.empresaId });
  res.json({ mensaje: 'Cliente eliminado' });
});

module.exports = router;
