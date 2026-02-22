import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider } from '@/contexts/AppContext';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { CookieBanner } from '@/components/layout/CookieBanner';
import HomePage from '@/pages/HomePage';
import CreatePage from '@/pages/CreatePage';
import PricingPage from '@/pages/PricingPage';
import AboutPage from '@/pages/AboutPage';
import GenerationsPage from '@/pages/account/GenerationsPage';
import SettingsPage from '@/pages/account/SettingsPage';
import LegalPage from '@/pages/legal/LegalPage';
import NotFound from '@/pages/NotFound';
import { AccountAuthGate } from '@/components/telegram/AccountAuthGate';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
          <SiteHeader />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/legal/:slug" element={<LegalPage />} />
              <Route
                path="/account/generations"
                element={
                  <AccountAuthGate>
                    <GenerationsPage />
                  </AccountAuthGate>
                }
              />
              <Route
                path="/account/settings"
                element={
                  <AccountAuthGate>
                    <SettingsPage />
                  </AccountAuthGate>
                }
              />
              <Route path="/account" element={<Navigate to="/account/generations" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <SiteFooter />
          <CookieBanner />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
