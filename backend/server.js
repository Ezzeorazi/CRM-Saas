// Inicia el servidor Express y escucha conexiones del frontend.
// backend/server.js
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

// Iniciar tarea programada de alertas de stock
const iniciarAlertaStockJob = require('./jobs/stockAlertJob');
iniciarAlertaStockJob();
