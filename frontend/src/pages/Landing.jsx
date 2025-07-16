import Header from '../layout/Header';

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Hero Section */}
      <Header/>

      {/* Características */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">¿Por qué elegir Nimbus?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 border rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Modular</h3>
            <p>Agregá o quitá funcionalidades según las necesidades de tu empresa.</p>
          </div>
          <div className="p-6 border rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Acceso seguro</h3>
            <p>Control de accesos por roles y autenticación JWT integrada.</p>
          </div>
          <div className="p-6 border rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Diseñado por programadores</h3>
            <p>Construido con código limpio, rendimiento y escalabilidad en mente.</p>
          </div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section id="contacto" className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-4">¿Querés ver cómo funciona?</h2>
        <p className="mb-6">Contactanos y te armamos una demo adaptada a tu negocio.</p>
        <a
          href="mailto:info@nimbuscrm.com"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700"
        >
          Escribinos
        </a>
      </section>
    </div>
  );
}
