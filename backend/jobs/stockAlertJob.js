const cron = require('node-cron');
const {
  encontrarProductosCriticos,
  obtenerEmailAdmin,
  enviarAlertaStock
} = require('../services/stockAlertService');

// Ejecuta la revisión y envío de alertas
const ejecutarRevisionStock = async () => {
  const porEmpresa = await encontrarProductosCriticos();
  for (const [empresaId, productos] of Object.entries(porEmpresa)) {
    const email = await obtenerEmailAdmin(empresaId);
    if (email && productos.length) {
      await enviarAlertaStock(email, productos);
    }
  }
};

// Programa la tarea diaria a las 8am
const iniciarAlertaStockJob = () => {
  cron.schedule('0 8 * * *', () => {
    ejecutarRevisionStock().catch(err =>
      console.error('Error en alerta de stock:', err)
    );
  });
};

module.exports = iniciarAlertaStockJob;
