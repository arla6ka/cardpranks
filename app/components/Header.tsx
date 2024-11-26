'use client'
import { motion, useScroll } from 'framer-motion';
import { CreatePostcardButton } from './CreatePostcardButton';

export const Header = () => {
 const { scrollY } = useScroll();

 return (
   <>
     <motion.header
       style={{
         position: 'fixed',
         top: 0,
         left: 0,
         right: 0,
         zIndex: 50,
         backgroundColor: '#ffffff',
       }}
       initial={{ y: 0 }}
       animate={{ 
         y: 0,
         boxShadow: scrollY.get() > 0 ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'
       }}
     >
       <div className="flex items-center justify-between px-6 py-3 w-full max-w-[1796px] mx-auto">
         <h1 className="text-xl leading-none text-gray-900 font-['Almarena_Neue']">
           CardPranks
         </h1>
         <div className="ml-auto">
           <CreatePostcardButton text="Create a Postcard" />
         </div>
       </div>
       <div className="w-full border-b border-gray-900 border-solid" />
     </motion.header>
     <div className="h-[52px]" /> {/* Reduced spacer height */}
   </>
 );
};