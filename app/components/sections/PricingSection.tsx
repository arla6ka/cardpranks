import { motion } from 'framer-motion';
import { CreatePostcardButton } from '../buttons/CreatePostcardButton';

export const PricingSection = () => {
    return (
      <section className="mt-16 md:mt-20 w-full px-6 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-['Almarena_Neue'] text-4xl md:text-6xl mb-2">Pricing</h2>
          <p className="text-xl md:text-2xl">Holiday Fun, Made Affordable</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col mt-8 md:mt-10 w-[90%] md:max-w-[418px] mx-auto leading-none"
        >
          <div className="flex overflow-hidden gap-1 justify-center items-center py-8 md:py-10 w-full border border-black border-solid bg-white bg-opacity-20 rounded-[35px] md:rounded-[45px] shadow-[0px_4px_4px_rgba(9,9,9,0.26)]">
            <div className="flex flex-col items-center w-full">
              <p className="font-['Almarena_Neue'] text-4xl md:text-6xl">9.00$</p>
              <p className="mt-2 text-lg md:text-xl">single card</p>
            </div>
          </div>
        </motion.div>
        
        <div className="text-center mt-8 md:mt-12">
          <CreatePostcardButton text="Start Sending Postcard Now" />
        </div>
      </section>
    );
 };