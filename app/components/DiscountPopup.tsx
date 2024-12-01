'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
export const DiscountPopup = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
 
  useEffect(() => {
    if (!hasBeenShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasBeenShown(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasBeenShown]);
  const handleOrderClick = () => {
    setIsVisible(false);
    router.push('/create');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ 
            x: window?.innerWidth >= 768 ? '100%' : 0,
            y: window?.innerWidth >= 768 ? 0 : '100%',
            opacity: 0 
          }}
          animate={{ 
            x: 0,
            y: 0,
            opacity: 1 
          }}
          exit={{ 
            x: window?.innerWidth >= 768 ? '100%' : 0,
            y: window?.innerWidth >= 768 ? 0 : '100%',
            opacity: 0 
          }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed md:bottom-8 md:right-8 bottom-0 border md:rounded-2xl border-black right-0 z-50 md:w-auto w-full"
        >
          <div className="bg-white md:rounded-2xl shadow-2xl p-6 max-w-full md:max-w-sm">
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4 flex items-baseline justify-center gap-3"
            >
              <span className="text-4xl font-bold">$8.98</span>
              <span className="text-xl text-gray-500 line-through">$14.99</span>
            </motion.div>
 
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-['Almarena_Neue'] text-2xl mb-2">
                Limited Time Price!
              </h3>
              <p className="text-gray-600 mb-2">
                Last chance to order at this price
              </p>
              <p className="text-sm text-red-600 mb-4">
                Offer ends December 4th
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOrderClick}
                className="w-full bg-black text-white py-3 px-6 rounded-full font-['Consolas'] hover:bg-gray-800 transition-colors"
              >
                Order Now
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
 };