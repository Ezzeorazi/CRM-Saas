// src/App.jsx
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoute';
import Footer from './layout/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
        <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
