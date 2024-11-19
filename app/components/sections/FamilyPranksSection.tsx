import { motion } from 'framer-motion';
import type { FamilyPranksSectionProps } from '../../types';

export const FamilyPranksSection = ({ title, imageUrl, isVideo = false }: FamilyPranksSectionProps) => {
    return (
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col items-center mt-20 w-full text-center max-md:mt-10"
      >
        <h2 className="mx-auto font-['Almarena_Neue'] text-4xl md:text-6xl leading-[80px] max-md:text-4xl max-md:leading-10">
        See How Other <br/>Families Got Pranked
        </h2>
        {isVideo ? (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="mx-auto mt-10 max-w-full rounded-[30px] w-[400px] max-md:mt-8"
          >
            <source src={imageUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img 
            loading="lazy" 
            src={imageUrl}
            alt="Family getting pranked" 
            className="object-contain mx-auto mt-10 max-w-full aspect-[0.56] rounded-[30px] w-[576px] max-md:mt-8" 
          />
        )}
      </motion.section>
    );
  };