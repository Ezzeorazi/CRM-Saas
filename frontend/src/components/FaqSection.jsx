import { useState } from 'react';

export default function FaqSection() {
  // Lista de preguntas frecuentes. Para agregar más, sumá nuevos objetos con 'question' y 'answer'.
  const faqs = [
    {
      question: '¿Qué es Nimbus CRM?',
      answer: 'Nimbus CRM es una plataforma para gestionar clientes, ventas y procesos de tu empresa de forma centralizada.'
    },
    {
      question: '¿Puedo usarlo desde el celular?',
      answer: 'Sí, la aplicación es responsive y se adapta a cualquier tamaño de pantalla.'
    },
    {
      question: '¿Cómo solicito una demo?',
      answer: 'Hacé clic en el enlace "Escribinos" de la sección de contacto o enviá un correo a info@nimbuscrm.com.'
    },
    {
      question: '¿Qué tan seguro es Nimbus CRM?',
      answer: 'Contamos con autenticación por roles y tokens JWT para proteger tus datos.'
    },
    {
      question: '¿Se pueden agregar módulos a medida?',
      answer: 'Sí, el sistema es modular y permite integrar nuevas funcionalidades según lo necesites.'
    }
    // Ejemplo para agregar otra pregunta:
    // { question: 'Nueva pregunta', answer: 'Respuesta correspondiente.' }
  ];

  // Estados para controlar qué pregunta está abierta
  const [open, setOpen] = useState(faqs.map(() => false));

  const toggle = index => {
    setOpen(prev => prev.map((value, i) => (i === index ? !value : value)));
  };

  return (
    <section id="faq" className="py-16 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center">Preguntas frecuentes</h2>
      <div className="max-w-3xl mx-auto divide-y divide-gray-200">
        {faqs.map((faq, index) => (
          <div key={index} className="py-4">
            <button
              className="w-full flex justify-between items-center text-left font-medium cursor-pointer"
              onClick={() => toggle(index)}
            >
              <span>{faq.question}</span>
              <span className="text-xl">{open[index] ? '-' : '+'}</span>
            </button>
            {open[index] && (
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
