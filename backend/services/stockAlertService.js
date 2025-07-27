const Producto = require('../models/Product');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Devuelve un objeto { empresaId: [productos...] } con stock bajo
const encontrarProductosCriticos = async () => {
  const productos = await Producto.find({
    $expr: { $lt: ['$stock', '$stockMinimo'] }
  }).lean();

  return productos.reduce((acc, prod) => {
    const id = prod.empresaId.toString();
    if (!acc[id]) acc[id] = [];
    acc[id].push(prod);
    return acc;
  }, {});
};

// Obtiene el correo del usuario administrador de una empresa
const obtenerEmailAdmin = async (empresaId) => {
  const admin = await User.findOne({ empresaId, rol: 'admin' }).lean();
  return admin ? admin.email : null;
};

// Envía un correo utilizando Nodemailer con los productos críticos
const enviarAlertaStock = async (destinatario, productos) => {
  if (!destinatario) return;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const lista = productos.map(p => `${p.nombre} (stock: ${p.stock})`).join('\n');

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: destinatario,
    subject: 'Alerta de stock bajo',
    text: `Los siguientes productos están por debajo del stock mínimo:\n\n${lista}`
  });
};

module.exports = {
  encontrarProductosCriticos,
  obtenerEmailAdmin,
  enviarAlertaStock
};
