import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProPricingModal from './components/ProPricingModal';

import HomePage from './pages/HomePage';
import HowToUsePage from './pages/HowToUsePage';
import SupportedFormatsPage from './pages/SupportedFormatsPage';
import FaqPage from './pages/FaqPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import ContactPage from './pages/ContactPage';

// Auto-scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [proModalOpen, setProModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-navy-950 text-slate-100 selection:bg-brand-violet/30 selection:text-white">
        {/* Navigation Bar */}
        <Navbar onOpenPro={() => setProModalOpen(true)} />

        {/* Main Content Pages */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onOpenPro={() => setProModalOpen(true)} />} />
            <Route path="/how-to-use" element={<HowToUsePage />} />
            <Route path="/supported-formats" element={<SupportedFormatsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Pro Tier Preview Modal */}
        <ProPricingModal
          isOpen={proModalOpen}
          onClose={() => setProModalOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}
