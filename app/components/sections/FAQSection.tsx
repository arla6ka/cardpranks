import { motion } from 'framer-motion';
import type { FAQItemProps } from '../../types';
import { CreatePostcardButton } from '../buttons/CreatePostcardButton';

const faqItems: FAQItemProps[] = [
  {
    question: "Will they know it's from me?",
    answer: "Only if you include your name! Otherwise, we keep your identity a secret."
  },
  {
    question: "How long does delivery take?",
    answer: "We ship fast—usually within X days of your order."
  },
  {
    question: "Do you only offer Christmas postcards?",
    answer: "Yes! We specialize in holiday pranks to keep the season festive and fun."
  }
];
export const FAQSection = () => {
    return (
      <section className="mt-16 md:mt-20 w-full px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-['Almarena_Neue'] text-4xl md:text-6xl mb-2">FAQ</h2>
          <p className="text-xl md:text-2xl">Everything You Need to Know</p>
        </motion.div>
        
        <div className="flex flex-col mt-8 md:mt-10 w-full max-w-2xl mx-auto">
          {faqItems.map((item: FAQItemProps, index: number) => (
            <FAQItem key={index} {...item} />
          ))}
        </div>
        <div className="text-center mt-8 md:mt-10">
          <CreatePostcardButton text="Start Your Prank Postcard Now" />
        </div>
      </section>
    );
 };   
   
 const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => (
  <motion.article 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-col mt-0 md:mt-8 w-full text-left"
  >
    <h3 className="font-['Almarena_Neue'] text-xl md:text-2xl font-semibold leading-tight">
      {question}
    </h3>
    <p className="mt-2 text-base md:text-lg leading-7 md:leading-8 text-gray-800">
      {answer}
    </p>
  </motion.article>
 );