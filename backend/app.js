// App principal de Express.
// Conecta con MongoDB y registra las rutas para enviar las peticiones a los controladores.
// backend/app.js
require('dotenv').config(); // 👈 ESTA LÍNEA ES CLAVE
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log('Intentando conectar a MongoDB con URI:', process.env.MONGO_URI);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Conectado a MongoDB desde app.js');
}).catch((err) => {
  console.error('❌ Error de conexión a MongoDB desde app.js:', err.message);
});

// Rutas
const userRoutes = require('./routes/userRoutes');
app.use('/api/usuarios', userRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const protegidaRoutes = require('./routes/protegidaRoutes');
app.use('/api/protegida', protegidaRoutes);

const productoRoutes = require('./routes/productRoutes');
app.use('/api/productos', productoRoutes);

const empresasRoutes = require('./routes/empresas');
app.use('/api/empresas', empresasRoutes);

const empresaRoutes = require('./routes/empresa');
app.use('/api/empresa', empresaRoutes);

const clientesRoutes = require('./routes/clientes');
app.use('/api/clientes', clientesRoutes);

const proveedoresRoutes = require('./routes/proveedores');
app.use('/api/proveedores', proveedoresRoutes);

const ventasRoutes = require('./routes/ventas');
app.use('/api/ventas', ventasRoutes);

const presupuestosRoutes = require('./routes/presupuestos');
app.use('/api/presupuestos', presupuestosRoutes);

const facturasRoutes = require('./routes/facturas');
app.use('/api/facturas', facturasRoutes);

const pagosRoutes = require('./routes/pagos');
app.use('/api/pagos', pagosRoutes);

const movimientosRoutes = require('./routes/movimientos');
app.use('/api/movimientos', movimientosRoutes);

const tareasRoutes = require('./routes/tareas');
app.use('/api/tareas', tareasRoutes);

const ordenesRoutes = require('./routes/ordenes');
app.use('/api/ordenes', ordenesRoutes);



module.exports = app;
