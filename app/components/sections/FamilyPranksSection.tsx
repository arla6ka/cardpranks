"use client"
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";

const pranks = [
 { video: "/prank1.mp4" },
 { video: "/prank2.mp4" },
 { video: "/prank3.mp4" },
 { video: "/prank4.mp4" },
 { video: "/prank5.mp4" },
 { video: "/prank6.mp4" },
 { video: "/prank7.mp4" },
];

export const FamilyPranksSection = () => {
 const [canScrollLeft, setCanScrollLeft] = useState(false);
 const [canScrollRight, setCanScrollRight] = useState(true);
 const containerRef = useRef<HTMLDivElement>(null);

 const checkScrollability = () => {
   if (containerRef.current) {
     const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
     setCanScrollLeft(scrollLeft > 0);
     setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
   }
 };

 const scroll = (direction: 'left' | 'right') => {
   if (containerRef.current) {
     const offset = direction === 'left' ? -300 : 300;
     containerRef.current.scrollBy({ left: offset, behavior: "smooth" });
   }
 };

 useEffect(() => {
   checkScrollability();
 }, []);

 return (
   <motion.section 
     initial={{ opacity: 0 }}
     whileInView={{ opacity: 1 }}
     viewport={{ once: true }}
     className="w-full mt-20 bg-white"
   >
     <div className="max-w-7xl mx-auto px-6">
       <h2 className="font-['Almarena_Neue'] text-4xl md:text-6xl mb-10 text-center">
         Real Christmas Pranks
       </h2>
       
       <div 
         ref={containerRef}
         className="relative flex overflow-x-scroll scroll-smooth [scrollbar-width:none] gap-8 py-4"
         onScroll={checkScrollability}
       >
         {pranks.map((prank, idx) => (
           <div key={idx} className="flex-shrink-0">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               transition={{ delay: idx * 0.1 }}
               className="rounded-2xl overflow-hidden  w-[300px]"
             >
               <video 
                 autoPlay 
                 loop 
                 muted 
                 playsInline
                 className="w-full h-full object-cover"
               >
                 <source src={prank.video} type="video/mp4" />
               </video>
             </motion.div>
           </div>
         ))}
       </div>

       <div className="flex justify-end gap-2 mt-4">
         <button
           onClick={() => scroll('left')}
           disabled={!canScrollLeft}
           className="h-10 w-10 rounded-full bg-white border border-black flex items-center justify-center disabled:opacity-50 transition-colors"
         >
           <IconArrowNarrowLeft className="h-6 w-6" />
         </button>
         <button
           onClick={() => scroll('right')}
           disabled={!canScrollRight}
           className="h-10 w-10 rounded-full bg-white border border-black flex items-center justify-center disabled:opacity-50 transition-colors"
         >
           <IconArrowNarrowRight className="h-6 w-6" />
         </button>
       </div>
     </div>
   </motion.section>
 );
};