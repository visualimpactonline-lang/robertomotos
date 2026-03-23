import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import MotorcycleDetailPage from './pages/MotorcycleDetailPage.jsx';
import { Toaster } from '@/components/ui/toaster';
import AdminPage from './pages/AdminPage.jsx';
import AdminProtectedRoute from './components/AdminProtectedRoute.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="/moto/:id" element={<MotorcycleDetailPage />} />
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-background">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                <p className="text-xl text-muted-foreground mb-6">Página não encontrada</p>
                <a href="/" className="text-primary hover:underline">
                  Voltar para home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;