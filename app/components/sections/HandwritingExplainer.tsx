import { motion } from "framer-motion";
import { CreatePostcardButton } from "../CreatePostcardButton";

export const HandwritingExplainer = () => {
    return (
      <section className="py-20 mt-10">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-['Almarena_Neue'] text-4xl md:text-6xl mb-4">
              Real Robots, Real Writing
            </h2>
            <p className="text-xl text-gray-600">
              Our robots use real pens and ink to create authentic handwritten cards
            </p>
          </motion.div>
   
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* GIF/Video side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden bg-white shadow-xl"
            >
              <img
                src="/handwriting.gif"
                alt="Robot handwriting demonstration"
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
   
            {/* Features side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <Feature 
                  icon="✒️"
                  title="Real Pens"
                  description="Each card is written with actual pen and ink, not printed"
                />
                <Feature 
                  icon="📜"
                  title="Premium Paper"
                  description="High-quality stationery that feels personal and authentic"
                />
                <Feature 
                  icon="💌"
                  title="Real Stamps"
                  description="Genuine postage stamps, hand-affixed to every envelope"
                />
                <Feature 
                  icon="🤖"
                  title="Robot Precision"
                  description="Consistent, beautiful handwriting every time"
                />
              </div>
   
              <div className="pt-6 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                  Each card is individually handwritten by our robots, making every message unique 
                  and personal while maintaining perfect legibility.
                </p>
              </div>
              <div className="mt-6 md:mt-8" />
      <CreatePostcardButton 
        text="Create Your Prank Postcard Now"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/08981e05ef22ce5015ae38ba835405218cbc428a2595a55bfae49d399dca3c1a"
      />
            </motion.div>
          </div>
          
        </div>
        
      </section>
      
    );
   };
   
   interface FeatureProps {
    icon: string;
    title: string;
    description: string;
   }
   
   const Feature = ({ icon, title, description }: FeatureProps) => (
    <motion.div 
      whileHover={{ x: 5 }}
      className="flex items-start gap-4"
    >
      <div className="text-2xl">{icon}</div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
   );