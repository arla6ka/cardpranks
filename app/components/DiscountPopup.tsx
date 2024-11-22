'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export const DiscountPopup = () => {
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
             className="mb-4"
           >
             <span className="text-4xl font-bold text-red-500">20% OFF</span>
           </motion.div>

           <motion.div
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.4 }}
           >
             <h3 className="font-['Almarena_Neue'] text-2xl mb-2">
               Limited Time Offer!
             </h3>
             <p className="text-gray-600 mb-4">
               Get 20% off on all Christmas prank cards until November 31th
             </p>
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="w-full bg-black text-white py-3 px-6 rounded-full font-['Consolas'] hover:bg-gray-800 transition-colors"
             >
               Claim Discount
             </motion.button>
           </motion.div>
         </div>
       </motion.div>
     )}
   </AnimatePresence>
 );
};