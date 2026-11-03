import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ExploreSkillsPage } from './pages/ExploreSkillsPage';
import { SkillDetailPage } from './pages/SkillDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { GettingStartedPage } from './pages/GettingStartedPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors selection:bg-indigo-500/30 selection:text-indigo-200">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/skills" element={<ExploreSkillsPage />} />
              <Route path="/skills/:slug" element={<SkillDetailPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/getting-started" element={<GettingStartedPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

