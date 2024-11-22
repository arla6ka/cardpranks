import { motion } from 'framer-motion';
import type { StepItemProps } from '../../types';
import { CreatePostcardButton } from '../buttons/CreatePostcardButton';

const steps = [
  {
    number: "1",
    title: "Choose a Design",
    description: "Browse our Christmas-themed postcards: classic, quirky, or completely ridiculous."
  },
  {
    number: "2",
    title: "Write a Message",
    description: "Add a festive note or a mysterious message that keeps them guessing who sent it."
  },
  {
    number: "3",
    title: "Enter the Address and Pay",
    description: "We handle the printing, stamping, and delivering, all while keeping you anonymous!"
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
          <p className="text-xl md:text-2xl">Your Prank in <br/>Three Simple Steps</p>
        </motion.div>
        
        <div className="flex flex-col mt-8 md:mt-10 w-full max-w-2xl mx-auto text-lg md:text-2xl">
          {steps.map((step, index) => (
            <StepItem key={index} {...step} />
          ))}
        </div>
        <div className="text-center mt-8 md:mt-10">
          <CreatePostcardButton text="Start Your Prank Postcard Now" />
        </div>
      </section>
    );
 };
   
 const StepItem: React.FC<StepItemProps> = ({ number, title, description }) => (
  <motion.article 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex flex-col mt-6 md:mt-8 w-full text-left"
  >
    <h3 className="font-['Almarena_Neue'] text-xl md:text-2xl font-semibold leading-tight">
      {number}. {title}
    </h3>
    <p className="mt-2 leading-7 md:leading-8 text-base md:text-lg">
      {description}
    </p>
  </motion.article>
 );