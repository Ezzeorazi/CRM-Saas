const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const { verificarToken }= require('../middleware/authMiddleware'); // Asegurate de tener este middleware

// GET - Listar todos los clientes
router.get('/', verificarToken, async (req, res) => {
  const clientes = await Cliente.find().sort({ createdAt: -1 });
  res.json(clientes);
});

// POST - Crear nuevo cliente
router.post('/', verificarToken, async (req, res) => {
  const cliente = new Cliente(req.body);
  await cliente.save();
  res.status(201).json(cliente);
});

// GET - Obtener cliente por ID
router.get('/:id', verificarToken, async (req, res) => {
  const cliente = await Cliente.findById(req.params.id);
  if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
  res.json(cliente);
});

// PUT - Editar cliente
router.put('/:id', verificarToken, async (req, res) => {
  const clienteActualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(clienteActualizado);
});

// DELETE - Eliminar cliente
router.delete('/:id', verificarToken, async (req, res) => {
  await Cliente.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Cliente eliminado' });
});

module.exports = router;
