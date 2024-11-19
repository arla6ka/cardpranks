'use client'
import { HeroSection } from './components/sections/HeroSection';
import { FamilyPranksSection } from './components/sections/FamilyPranksSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { PricingSection } from './components/sections/PricingSection';
import { FAQSection } from './components/sections/FAQSection';
import { ContactSection } from './components/sections/ContactSection';
import { motion } from 'framer-motion';
import { Header } from './components/Header';

export default function PrankCardsPage() {
  return (
    <main className="flex overflow-hidden flex-col pt-6 bg-white font-['Consolas']">
      <Header/>
      <div className="flex flex-col items-center px-6">
        <HeroSection />
        <FamilyPranksSection 
          title="See How Other Families Got Pranked"
          imageUrl="/IMG_2148.MP4"
        />
        <HowItWorksSection />
        <PricingSection />
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
  );
}