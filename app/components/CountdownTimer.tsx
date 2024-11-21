// components/SocialProof.tsx
'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';

const testimonials = [
 {
   id: 1,
   text: "Sent this to my brother pretending to be his old college roommate. His face when he got it was priceless! 😂",
   name: "Sarah M.",
   image: "/testimonial1.jpg",
   location: "New York, NY"
 },
 {
   id: 2,
   text: "Best Christmas prank ever! My mom was so confused trying to figure out who sent it. Totally worth it!",
   name: "Mike R.",
   image: "/testimonial2.jpg",
   location: "Los Angeles, CA"
 },
 {
   id: 3,
   text: "The handwriting looks so real! My friend spent weeks trying to figure out who their 'secret admirer' was.",
   name: "Jessica K.",
   image: "/testimonial3.jpg",
   location: "Chicago, IL"
 }
];

export const SocialProof = () => {
 const [hoveredId, setHoveredId] = useState<number | null>(null);

 const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
     opacity: 1,
     transition: {
       staggerChildren: 0.2
     }
   }
 };

 const itemVariants = {
   hidden: { y: 20, opacity: 0 },
   visible: { y: 0, opacity: 1 }
 };

 const statsVariants = {
   hidden: { scale: 0.8, opacity: 0 },
   visible: { scale: 1, opacity: 1 }
 };

 return (
   <section className="py-20 bg-gradient-to-b from-white to-gray-50">
     <motion.div
       initial="hidden"
       whileInView="visible"
       viewport={{ once: true }}
       variants={containerVariants}
       className="max-w-7xl mx-auto px-6"
     >
       {/* Stats */}
       <motion.div 
         variants={statsVariants}
         className="text-center mb-16"
       >
         <h2 className="font-['Almarena_Neue'] text-4xl md:text-5xl mb-6">
           Join Thousands of Pranksters
         </h2>
         <div className="flex justify-center gap-12 text-2xl">
           <div>
             <span className="block font-bold text-4xl text-blue-600">10K+</span>
             Pranks Sent
           </div>
           <div>
             <span className="block font-bold text-4xl text-green-600">98%</span>
             Happy Pranksters
           </div>
           <div>
             <span className="block font-bold text-4xl text-purple-600">4.9/5</span>
             Average Rating
           </div>
         </div>
       </motion.div>

       {/* Testimonials */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {testimonials.map((testimonial) => (
           <motion.div
             key={testimonial.id}
             variants={itemVariants}
             onHoverStart={() => setHoveredId(testimonial.id)}
             onHoverEnd={() => setHoveredId(null)}
             whileHover={{ y: -5 }}
             className="bg-white rounded-2xl shadow-lg p-6 transition-shadow hover:shadow-xl"
           >
             <div className="flex items-center mb-4">
               <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                 <img 
                   src={testimonial.image} 
                   alt={testimonial.name}
                   className="w-full h-full object-cover"
                 />
               </div>
               <div>
                 <h3 className="font-bold">{testimonial.name}</h3>
                 <p className="text-sm text-gray-500">{testimonial.location}</p>
               </div>
             </div>
             <motion.p 
               className="text-lg"
               animate={{
                 scale: hoveredId === testimonial.id ? 1.02 : 1
               }}
             >
               "{testimonial.text}"
             </motion.p>
             <motion.div 
               className="mt-4 flex items-center"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.2 }}
             >
               {[1, 2, 3, 4, 5].map((star) => (
                 <svg
                   key={star}
                   className="w-5 h-5 text-yellow-400"
                   fill="currentColor"
                   viewBox="0 0 20 20"
                 >
                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                 </svg>
               ))}
             </motion.div>
           </motion.div>
         ))}
       </div>
     </motion.div>
   </section>
 );
};