// Script para probar la conexión a MongoDB en desarrollo
const mongoose = require('mongoose');
require('dotenv').config();

console.log('Conectando a:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error al conectar a MongoDB Atlas:', err.message);
    process.exit(1);
  });
