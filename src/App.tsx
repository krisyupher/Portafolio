import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { ScrollToTop } from './components/common/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { PortfolioPage } from './pages/PortfolioPage';

const focusMain = (e: React.MouseEvent<HTMLAnchorElement>) => {
  // A plain #main href would be read as a route by the HashRouter.
  e.preventDefault();
  document.getElementById('main')?.focus();
};

export const App: React.FC = () => {
  const { pathname } = useLocation();

  // Start every route at the top of the page.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="relative isolate flex min-h-screen flex-col">
      {/* Page-top atmosphere; sits behind the transparent header as well as the page intro. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[56rem] overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent_78%)]" />
        <div className="absolute -top-40 right-[-12%] h-[34rem] w-[34rem] rounded-full bg-accent/[0.08] blur-[120px] sm:bg-accent/15" />
        <div className="absolute -top-48 left-[-18%] h-[30rem] w-[30rem] rounded-full bg-brand/[0.08] blur-[120px] sm:bg-brand/15" />
      </div>

      <a
        href="#main"
        onClick={focusMain}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<Navigate to="/home" replace />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default App;
