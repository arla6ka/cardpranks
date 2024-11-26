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
    className="w-full py-24"
  >
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <h2 className="font-['Almarena_Neue'] text-4xl md:text-6xl mb-4">
          Real Reactions
        </h2>
        <p className="text-xl text-gray-600">
          Watch how people react when they receive our mysterious Christmas cards
        </p>
      </motion.div>
      
      <div 
        ref={containerRef}
        className="relative flex overflow-x-scroll scroll-smooth [scrollbar-width:none] gap-8 py-4 pb-8"
        onScroll={checkScrollability}
      >
        {pranks.map((prank, idx) => (
          <div key={idx} className="flex-shrink-0">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl overflow-hidden w-[250px] shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full  object-cover"
              >
                <source src={prank.video} type="video/mp4" />
              </video>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className="h-12 w-12 rounded-full bg-white border-2 border-black flex items-center justify-center 
                     disabled:opacity-50 transition-all hover:bg-black hover:text-white disabled:hover:bg-white disabled:hover:text-black"
        >
          <IconArrowNarrowLeft className="h-6 w-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className="h-12 w-12 rounded-full bg-white border-2 border-black flex items-center justify-center 
                     disabled:opacity-50 transition-all hover:bg-black hover:text-white disabled:hover:bg-white disabled:hover:text-black"
        >
          <IconArrowNarrowRight className="h-6 w-6" />
        </motion.button>
      </div>
    </div>
  </motion.section>
);
};