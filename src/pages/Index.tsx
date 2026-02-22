import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Services from '@/components/landing/Services';
import Pricing from '@/components/landing/Pricing';
import About from '@/components/landing/About';
import Contact from '@/components/landing/Contact';
import Footer from '@/components/landing/Footer';
import CookieBanner from '@/components/landing/CookieBanner';

const Index = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
          <Header />
          <main>
            <Hero />
            <Services />
            <Pricing />
            <About />
            <Contact />
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
