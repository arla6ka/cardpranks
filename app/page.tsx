'use client'
import { HeroSection } from './components/sections/HeroSection';
import { FamilyPranksSection } from './components/sections/FamilyPranksSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { PricingSection } from './components/sections/PricingSection';
import { FAQSection } from './components/sections/FAQSection';
import { ContactSection } from './components/sections/ContactSection';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { DiscountPopup } from './components/DiscountPopup';
import { InfiniteTestimonials } from './components/SocialProof';
import { HandwritingExplainer } from './components/sections/HandwritingExplainer';
import { Analytics } from "@vercel/analytics/react"
import { GoogleTagManager } from './components/GoogleTagManager';

export default function PrankCardsPage() {
  return (
    <>
      <GoogleTagManager />
      <main className="flex overflow-hidden flex-col pt-6 bg-white font-['Consolas']">
        <Header/>
        <div className="flex flex-col items-center px-6">
          <Analytics />
          <HeroSection />
          <InfiniteTestimonials />
          <DiscountPopup />
          <HandwritingExplainer />
          <HowItWorksSection />
          <PricingSection />
          <FamilyPranksSection 
          />
          <FAQSection />
          <ContactSection />
          <div className="relative w-screen -ml-[50vw] -mr-[50vw]">
            <motion.img 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              loading="lazy" 
              src="/end.png"
              alt="Footer decoration"
              className="w-full h-auto mt-6 object-cover"
            />
          </div>
        </div>
      </main>
    </>
  );
}