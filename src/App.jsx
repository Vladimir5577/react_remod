import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import CookieBanner from './components/layout/CookieBanner.jsx';
import HomePage from './pages/HomePage.jsx';
import KejsyPage from './pages/KejsyPage.jsx';
import CaseDetailPage from './pages/CaseDetailPage.jsx';
import OcenkaPage from './pages/OcenkaPage.jsx';
import PaketyPage from './pages/PaketyPage.jsx';
import OKompaniiPage from './pages/OKompaniiPage.jsx';
import KontaktyPage from './pages/KontaktyPage.jsx';
import PolitikaPage from './pages/PolitikaPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Header />
        <main className="pb-20 md:pb-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/kejsy" element={<KejsyPage />} />
            <Route path="/kejsy/:slug" element={<CaseDetailPage />} />
            <Route path="/ocenka" element={<OcenkaPage />} />
            <Route path="/pakety" element={<PaketyPage />} />
            <Route path="/o-kompanii" element={<OKompaniiPage />} />
            <Route path="/kontakty" element={<KontaktyPage />} />
            <Route path="/politika" element={<PolitikaPage />} />
          </Routes>
        </main>
        <Footer />
        <CookieBanner />
      </ThemeProvider>
    </BrowserRouter>
  );
}
