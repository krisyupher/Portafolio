import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { AboutPage } from './pages/AboutPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { FilosofyPage } from './pages/FilosofyPage';

export const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-800">
      {/* Sticky Global Header */}
      <Header />

      {/* Main Content Viewport */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<AboutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/filosofy" element={<FilosofyPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>

      {/* Floating Scroll to Top */}
      <ScrollToTop />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default App;
