import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Preloader from '@/components/landing/Preloader';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Problems from '@/components/landing/Problems';
import Services from '@/components/landing/Services';
import About from '@/components/landing/About';
import Cases from '@/components/landing/Cases';
import Process from '@/components/landing/Process';
import Pricing from '@/components/landing/Pricing';
import Reviews from '@/components/landing/Reviews';
import FAQ from '@/components/landing/FAQ';
import Contact from '@/components/landing/Contact';
import Footer from '@/components/landing/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Preloader isLoading={isLoading} />
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
          <Header />
          <main>
            <Hero />
            <Problems />
            <Services />
            <About />
            <Cases />
            <Process />
            <Pricing />
            <Reviews />
            <FAQ />
            <Contact />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
