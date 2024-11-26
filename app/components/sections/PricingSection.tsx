import { motion } from 'framer-motion';
import { CreatePostcardButton } from '../CreatePostcardButton';
import { Truck, Clock, ShieldCheck } from 'lucide-react';

export const PricingSection = () => {
   return (
    <section className=" md:mt-20 w-full px-6 md:px-8 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h2 className="font-['Almarena_Neue'] mt-16 md:mt-12 text-4xl md:text-6xl mb-2">Pricing</h2>
      <p className="text-xl md:text-2xl">Quality Handwritten Cards, Fair Price</p>
    </motion.div>
    
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="flex flex-col mt-8 md:mt-10 w-[90%] md:max-w-[500px] mx-auto"
    >
         <div className="flex flex-col py-10 px-8 w-full border-2 border-black bg-white rounded-[35px] md:rounded-[45px] shadow-[0px_4px_20px_rgba(9,9,9,0.1)]">
         {/* Price */}
         <div className="flex flex-col items-center mb-8">
            <div className="flex items-baseline gap-4">
              <div className="flex items-baseline">
                <p className="font-['Almarena_Neue'] text-5xl md:text-7xl">$8</p>
                <span className="text-2xl">.90</span>
              </div>
              <span className="text-gray-400 line-through text-2xl">$13.00</span>
            </div>
            <p className="mt-2 text-lg md:text-xl text-gray-600">Limited time offer</p>
          </div>
           {/* Divider */}
           <div className="w-16 h-0.5 bg-gray-200 mx-auto mb-8"/>

           {/* Features */}
           <div className="space-y-6">
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="flex items-center justify-center gap-3"
             >
               <Truck className="w-5 h-5 text-gray-700" />
               <p className="text-lg">Free Delivery Included</p>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="flex items-center justify-center gap-3"
             >
               <Clock className="w-5 h-5 text-gray-700" />
               <p className="text-lg">Delivered in 1-3 Business Days</p>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="flex items-center justify-center gap-3"
             >
               <ShieldCheck className="w-5 h-5 text-gray-700" />
               <p className="text-lg">Premium Quality Stationery</p>
             </motion.div>
           </div>
         </div>

         {/* Volume info */}
         <p className="mt-4 text-sm text-gray-600">
           Planning to send multiple cards? Contact us for volume discounts.
         </p>
       </motion.div>
       
       <div className="text-center mt-8 md:mt-12">
         <CreatePostcardButton text="Create Your Prank Card" />
       </div>
     </section>
   );
};