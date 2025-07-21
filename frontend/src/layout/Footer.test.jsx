import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';

test('muestra enlace de contacto', () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
  expect(screen.getByText(/Contacto/i)).toBeInTheDocument();
});
