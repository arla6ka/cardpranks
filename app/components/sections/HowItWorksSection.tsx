import { motion } from 'framer-motion';
import type { StepItemProps } from '../../types';
import { CreatePostcardButton } from '../CreatePostcardButton';
import { PenLine, MessageSquare, Truck } from 'lucide-react';

const steps = [
 {
   number: "1",
   title: "Choose a Design",
   description: "Browse our Christmas-themed postcards: classic, quirky, or completely ridiculous.",
   icon: PenLine
 },
 {
   number: "2", 
   title: "Write a Message",
   description: "Add a festive note or a mysterious message that keeps them guessing who sent it.",
   icon: MessageSquare
 },
 {
   number: "3",
   title: "Enter the Address and Pay",
   description: "We handle the printing, stamping, and delivering, all while keeping you anonymous!",
   icon: Truck
 }
];

export const HowItWorksSection = () => {
   return (
     <section className="mt-16 md:mt-20 w-full px-6 md:px-8">
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="text-center"
       >
         <h2 className="font-['Almarena_Neue'] text-4xl md:text-6xl mb-2">How It Works?</h2>
         <p className="text-xl md:text-2xl text-gray-600">From Design to Delivery in Three Steps</p>
       </motion.div>
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 md:mt-16 max-w-6xl mx-auto">
         {steps.map((step, index) => (
           <StepItem 
             key={index} 
             {...step} 
             delay={index * 0.2}
           />
         ))}
       </div>

       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="text-center mt-12 md:mt-16"
       >
         <div className="max-w-xl mx-auto mb-8 px-6 py-4 bg-gray-50 rounded-2xl">
           <p className="text-gray-600">
             Limited time offer: Get your prank card for just <span className="text-black font-bold">$8.98</span> 
             <span className="text-gray-500 line-through ml-2">$14.99</span>
           </p>
         </div>
         <CreatePostcardButton text="Start Your Prank Postcard Now" />
       </motion.div>
     </section>
   );
};
  
interface ExtendedStepProps extends StepItemProps {
 icon: React.ElementType;
 delay: number;
}

const StepItem: React.FC<ExtendedStepProps> = ({ number, title, description, icon: Icon, delay }) => (
 <motion.article 
   initial={{ opacity: 0, y: 20 }}
   whileInView={{ opacity: 1, y: 0 }}
   viewport={{ once: true }}
   transition={{ delay }}
   className="relative flex flex-col items-center text-center group"
 >
   {/* Step Number with Icon */}
   <motion.div 
     whileHover={{ scale: 1.05 }}
     className="w-16 h-16 rounded-full bg-white border-2 border-black flex items-center justify-center mb-6 relative"
   >
     <Icon className="w-8 h-8" />
     <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-black text-white text-sm flex items-center justify-center">
       {number}
     </div>
   </motion.div>

   {/* Content */}
   <div className="relative">
     <h3 className="font-['Almarena_Neue'] text-xl md:text-2xl font-semibold mb-3">
       {title}
     </h3>
     <p className="text-gray-600 leading-relaxed px-4">
       {description}
     </p>
   </div>

   {/* Mobile Arrow */}
   {number !== "3" && (
     <div className="md:hidden mt-6">
       <svg width="24" height="24" fill="none" className="text-gray-400">
         <path
           d="M12 16L16 12L12 8M8 12H16"
           stroke="currentColor"
           strokeWidth="2"
           strokeLinecap="round"
           strokeLinejoin="round"
         />
       </svg>
     </div>
   )}
 </motion.article>
);