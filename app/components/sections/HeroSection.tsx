'use client'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CreatePostcardButton } from '../buttons/CreatePostcardButton';

export const HeroSection = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
    return (
      <motion.section 
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        className="flex flex-col justify-between items-center w-full px-6 md:px-8 pt-4 md:pt-8"
      >
        <motion.img 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          loading="lazy" 
          src="/herocard.png"
          alt="Christmas Postcard Preview"
          className="object-contain self-center mb-6 md:mb-10 w-full md:w-[600px] max-w-[90%] aspect-[1.4]" 
        />
  
        <h1 className="text-4xl md:text-6xl leading-[1.2] md:leading-[80px] text-center font-['Almarena_Neue'] px-4 md:px-0">
          Send a Fake Christmas Postcard <br className="hidden md:block" /> They'll Never Forget.
        </h1>
        <p className="mt-3 md:mt-4 text-xl md:text-2xl leading-tight text-center px-4 md:px-0">
          Custom Prank Christmas Postcards only for 9$
        </p>
        <div className="mt-6 md:mt-8" />
        <CreatePostcardButton 
          text="Create Your Prank Postcard"
          iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/08981e05ef22ce5015ae38ba835405218cbc428a2595a55bfae49d399dca3c1a"
        />
      </motion.section>
    );
  };