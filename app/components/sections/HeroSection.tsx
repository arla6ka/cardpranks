'use client'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CreatePostcardButton } from '../CreatePostcardButton';

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

      <h1 className="text-6xl leading-[80px] text-center font-['Almarena_Neue'] max-md:text-4xl max-md:w-[350px] max-md:leading-10">
        Send a Fake Christmas Postcard <br /> They&apos;ll Never Forget.
      </h1>
      <div className="mt-3 md:mt-4 text-xl md:text-2xl leading-tight text-center px-4 md:px-0 space-y-2">
        <p className="flex items-center justify-center gap-3">
          <span className="text-3xl font-bold">$8.98</span>
          <span className="text-gray-500 line-through">$14.99</span>
          <span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">Limited Time!</span>
        </p>
        <p className="text-gray-600 text-base">Price goes up on November 30th</p>
      </div>
      <div className="mt-6 md:mt-8" />
      <CreatePostcardButton 
        text="Create Your Prank Postcard Now"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/08981e05ef22ce5015ae38ba835405218cbc428a2595a55bfae49d399dca3c1a"
      />
    </motion.section>
  );
};