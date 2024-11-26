import { motion } from 'framer-motion';
import type { FAQItemProps } from '../../types';
import { CreatePostcardButton } from '../CreatePostcardButton';

const faqItems: FAQItemProps[] = [
  {
    question: "How quickly do you send out my cards?",
    answer: "Fast! Cards are typically mailed within 1 business day and delivered over the following 1-3 days."
  },
  {
    question: "Will they know it&apos;s from me?",
    answer: "Only if you include your name! All cards are signed as CRDPK to maintain anonymity."
  },  
  {
    question: "How much does it cost?",
    answer: "Our cards are just $8.90 including postage. For bulk orders, please contact us."
  },
  {
    question: "What kind of stationery do you use?",
    answer: "We use premium, luxurious stationery that &quot;screams&quot; quality to your recipients."
  },
  {
    question: "Can you ship the cards to me?",
    answer: "Sure! Simply let us know and we&apos;ll deliver them to you, ready to go."
  },
  {
    question: "Can I choose different styles?",
    answer: "Yes! We offer several authentic handwriting styles to make your message more personal and believable."
  }
];

export const FAQSection = () => {
  return (
    <section className="mt-2 md:mt-6 w-full px-6 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="font-['Almarena_Neue'] text-4xl md:text-6xl mb-2">Questions?<br/>We&apos;ve got you.</h2>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-8 md:mt-16 w-full max-w-6xl mx-auto">
        {faqItems.map((item: FAQItemProps, index: number) => (
          <FAQItem key={index} {...item} />
        ))}
      </div>
      <div className="text-center mt-12 md:mt-16">
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
    className="flex flex-col w-full text-left"
  >
    <h3 className="font-['Almarena_Neue'] text-xl md:text-2xl font-semibold leading-tight text-black">
      {question}
    </h3>
    <p className="mt-2 text-base md:text-lg leading-7 md:leading-8 text-gray-600">
      {answer}
    </p>
  </motion.article>
);