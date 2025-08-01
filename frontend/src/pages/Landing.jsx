// Página de bienvenida antes de iniciar sesión.
import { motion } from 'framer-motion';
import Header from '../layout/Header';
import FaqSection from '../components/FaqSection';

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Hero Section */}
      <Header modoLanding/>

      {/* Características */}
      <section className="py-16 px-6 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-6"
        >
          ¿Por qué elegir Nimbus?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {[{
            titulo: 'Modular',
            texto: 'Agregá o quitá funcionalidades según las necesidades de tu empresa.'
          }, {
            titulo: 'Acceso seguro',
            texto: 'Control de accesos por roles y autenticación JWT integrada.'
          }, {
            titulo: 'Diseñado por programadores',
            texto: 'Construido con código limpio, rendimiento y escalabilidad en mente.'
          }].map(({ titulo, texto }, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="p-6 border rounded-lg shadow bg-white"
            >
              <h3 className="text-xl font-semibold mb-2">{titulo}</h3>
              <p>{texto}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Fundador / Filosofía Personal */}
      <section className="py-16 px-6 bg-gray-50 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-6"
        >
          Desde la experiencia real, para negocios reales
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-3xl mx-auto text-lg text-gray-700 space-y-4"
        >
          <p>
            Soy Ezequiel. Técnico electromecánico, comunicador, y durante más de 10 años trabajé en empresas desde todos los ángulos:
            administración, compras, ventas, contaduría, depósitos y hasta en planta como operario.
          </p>
          <p>
            Por eso entiendo los verdaderos problemas que viven los equipos: las planillas eternas, el desorden en el stock, la falta de seguimiento a los clientes,
            y la frustración de no tener un sistema que se adapte al trabajo diario.
          </p>
          <p>
            Hoy como desarrollador independiente, creo herramientas prácticas para optimizar esos procesos. Con enfoque técnico, sí —pero también con empatía y visión de negocio.
            El CRM que estás viendo no fue creado en un laboratorio: fue pensado para mejorar el trabajo real, de empresas reales, como la tuya.
          </p>
          <p>
            Incluso estoy integrando Machine Learning para automatizar y anticipar tareas, sin que tengas que ser una gran empresa para acceder a esa tecnología.
          </p>
          <p className="font-semibold text-gray-900">
            Este CRM no es solo software. Es una forma distinta de hacer que tu negocio funcione mejor, con alguien que estuvo en tu lugar.
          </p>
        </motion.div>
      </section>

      {/* Preguntas frecuentes */}
      <FaqSection />

      {/* Llamado a la acción */}
      <motion.section
        id="contacto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-16 px-6 bg-gray-100 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">¿Querés ver cómo funciona?</h2>
        <p className="mb-6">Contactanos y te armamos una demo adaptada a tu negocio.</p>
        <a
          href="mailto:info@nimbuscrm.com"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700"
        >
          Escribinos
        </a>
      </motion.section>
    </div>
  );
}
