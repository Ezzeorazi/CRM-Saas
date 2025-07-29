// Controlador de presupuestos para Presupuestos.jsx
const Presupuesto = require('../models/Presupuesto');
const PDFDocument = require('pdfkit');
const Empresa = require('../models/Empresa');
const path = require('path');
const fs = require('fs');

const obtenerPresupuestos = async (req, res) => {
  try {
    const presupuestos = await Presupuesto.find({ empresaId: req.empresaId })
      .populate('cliente')
      .populate('productos.producto');
    res.json(presupuestos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener presupuestos', error: error.message });
  }
};

const obtenerPresupuesto = async (req, res) => {
  try {
    const presupuesto = await Presupuesto.findOne({ _id: req.params.id, empresaId: req.empresaId })
      .populate('cliente')
      .populate('productos.producto');
    if (!presupuesto) return res.status(404).json({ mensaje: 'Presupuesto no encontrado' });
    res.json(presupuesto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener presupuesto', error: error.message });
  }
};

const crearPresupuesto = async (req, res) => {
  try {
    const presupuesto = new Presupuesto({ ...req.body, empresaId: req.empresaId });
    const guardado = await presupuesto.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear presupuesto', error: error.message });
  }
};

const actualizarPresupuesto = async (req, res) => {
  try {
    const actualizado = await Presupuesto.findOneAndUpdate({ _id: req.params.id, empresaId: req.empresaId }, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ mensaje: 'Presupuesto no encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar presupuesto', error: error.message });
  }
};

const eliminarPresupuesto = async (req, res) => {
  try {
    const eliminado = await Presupuesto.findOneAndDelete({ _id: req.params.id, empresaId: req.empresaId });
    if (!eliminado) return res.status(404).json({ mensaje: 'Presupuesto no encontrado' });
    res.json({ mensaje: 'Presupuesto eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar presupuesto', error: error.message });
  }
};

const descargarPDF = async (req, res) => {
  try {
    const presupuesto = await Presupuesto.findOne({ _id: req.params.id, empresaId: req.empresaId })
      .populate('cliente')
      .populate('productos.producto');
    if (!presupuesto) return res.status(404).json({ mensaje: 'Presupuesto no encontrado' });

    const empresa = await Empresa.findById(req.empresaId);
    const formatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=presupuesto-${presupuesto._id}.pdf`);
    doc.pipe(res);

    if (empresa && empresa.logoUrl) {
      const logoPath = path.join(__dirname, '..', empresa.logoUrl);
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, { width: 120 });
      } else {
        doc.fontSize(18).text(empresa.nombre, { align: 'center' });
      }
    } else if (empresa) {
      doc.fontSize(18).text(empresa.nombre, { align: 'center' });
    }
    doc.moveDown();

    doc.fontSize(20).text('Presupuesto', { align: 'center' });
    doc.moveDown();

    if (presupuesto.cliente) {
      doc.fontSize(12).text(`Cliente: ${presupuesto.cliente.nombre}`);
    }
    doc.text(`Fecha: ${presupuesto.createdAt.toISOString().substring(0,10)}`);
    doc.moveDown();

    presupuesto.productos.forEach(p => {
      const nombre = p.producto ? p.producto.nombre : p.nombre;
      doc.text(`${nombre} x ${p.cantidad} - ${formatter.format(p.subtotal)}`);
    });
    doc.moveDown();
    doc.fontSize(14).text(`Total: ${formatter.format(presupuesto.total)}`, { align: 'right' });

    doc.moveDown();
    doc.fontSize(10).text('Presupuesto válido por 15 días', { align: 'center' });

    doc.end();
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al generar PDF', error: error.message });
  }
};

module.exports = {
  obtenerPresupuestos,
  obtenerPresupuesto,
  crearPresupuesto,
  actualizarPresupuesto,
  eliminarPresupuesto,
  descargarPDF
};
