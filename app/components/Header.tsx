'use client'
import { motion, useScroll, useTransform } from 'framer-motion';
import { CreatePostcardButton } from './CreatePostcardButton';
import Link from 'next/link';

export const Header = () => {
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.98)']
  );
  const headerBlur = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(8px)']
  );

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <motion.header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: headerBg,
          backdropFilter: headerBlur,
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="flex items-center justify-between px-6 py-4 w-full max-w-[1796px] mx-auto">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Link href="/">
              <h1 className="text-2xl leading-none text-gray-900 font-['Almarena_Neue'] tracking-tight">
                CardPranks
              </h1>
            </Link>
          </motion.div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
              <motion.button 
                onClick={() => scrollToSection('features')}
                className="hover:text-black transition-colors"
                whileHover={{ y: -1 }}
              >
                How it works?
              </motion.button>
              
              <motion.button 
                onClick={() => scrollToSection('pricing')}
                className="hover:text-black transition-colors"
                whileHover={{ y: -1 }}
              >
                Pricing
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('FAQ')}
                className="hover:text-black transition-colors"
                whileHover={{ y: -1 }}
              >
                FAQ
              </motion.button>
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CreatePostcardButton text="Create a Postcard" />
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-900/10 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />
      </motion.header>
      <div className="h-[68px]" />
    </>
  );
};