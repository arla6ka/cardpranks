import { motion } from 'framer-motion';

export const ContactSection = () => {
    return (
      <footer className="mt-16 md:mt-20 w-full text-center px-6 md:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto font-['Almarena_Neue'] text-3xl md:text-6xl max-md:[500px] leading-[1.2] md:leading-[80px]"
        >
          Make their Christmas one <br className="hidden md:block"/>
           to remember—start your <br className="hidden md:block"/>
           prank postcard!
        </motion.h2>
        <motion.address 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 md:mt-8 text-lg md:text-2xl leading-8 md:leading-10 not-italic"
        >
          Contact Us: <br />
          <a 
            href="mailto:name@email.com" 
            className="hover:text-gray-600 transition-colors block md:inline-block"
          >
            name@email.com
          </a> <br className="md:hidden"/>
          <a 
            href="tel:+17007007070" 
            className="hover:text-gray-600 transition-colors block mt-2 max-md:mt-[-30px] md:inline-block"
          >
            +1 (700) 700 - 7070
          </a>
        </motion.address>
      </footer>
    );
 };