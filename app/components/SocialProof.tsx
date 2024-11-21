"use client";
import { cn } from "../lib/utils";
import React, { useEffect, useState } from "react";

const testimonials = [
 {
   quote: "Sent this to my brother pretending to be his old college roommate. His face when he got it was priceless! Best prank ever 😂",
   name: "Sarah M.",
   location: "New York",
   image: "/testimonial1.jpg"
 },
 {
   quote: "The handwriting looks so real! Made my mom spend weeks trying to figure out who her 'secret Christmas admirer' was.",
   name: "Mike R.", 
   location: "Los Angeles", 
   image: "/testimonial2.jpg"
 },
 {
   quote: "My friend was so confused getting a Christmas card from their 'childhood neighbor'. Worth every penny!",
   name: "Jessica K.",
   location: "Chicago",
   image: "/testimonial3.jpg"
 },
 {
   quote: "Used the AI to generate the perfect mysterious message. My sister is still trying to figure it out!",
   name: "David P.",
   location: "Boston",
   image: "/testimonial4.jpg"
 }
];

export const InfiniteTestimonials = () => {
    const [start, setStart] = useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);
   
    useEffect(() => {
      if (containerRef.current && scrollerRef.current) {
        const scrollerContent = Array.from(scrollerRef.current.children);
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          scrollerRef.current?.appendChild(duplicatedItem);
        });
   
        if (containerRef.current) {
          containerRef.current.style.setProperty(
            "--animation-direction",
            "forwards"
          );
          containerRef.current.style.setProperty(
            "--animation-duration", 
            "60s"
          );
        }
        setStart(true);
      }
    }, []);
   
    return (
      <div className="relative mt-[60px] bg-white overflow-visible ">
        <div
          ref={containerRef}
          className="relative z-20 max-w-7xl mx-auto overflow-visible"
        >
          <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]" />
          <ul
            ref={scrollerRef}
            className={cn(
              "flex min-w-full gap-8 py-4 w-max flex-nowrap overflow-visible",
              start && "animate-scroll",
              "hover:[animation-play-state]"
            )}
          >
            {testimonials.map((item, idx) => (
              <li
                key={idx}
                className="w-[350px] md:w-[450px] h-[250px] relative rounded-2xl border border-black flex-shrink-0 px-8 py-6 bg-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:z-10"
              >
                <blockquote className="h-full flex flex-col justify-between">
                  <p className="text-lg font-['Consolas'] text-gray-800 mb-6">
                    {item.quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className=""> 
                      <div className="font-['Almarena_Neue'] text-xl">
                        {item.name}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {item.location}
                      </div>
                    </div>
                  </div>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
   };