'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { HANDWRITINGS } from '@/app/lib/constants/handwritings';

interface HandwritingStepProps {
  initialData?: string;
  updateData: (data: string) => void;
  onNext: () => void;
  onBack: () => void;
}

interface HandwritingStyle {
  _id: string;
  name: string;
  preview_url: string;
}

export function HandwritingStep({ initialData, updateData, onNext, onBack }: HandwritingStepProps) {
  const [selectedStyle, setSelectedStyle] = useState<string>(initialData || '');

  const handleSelect = (style: HandwritingStyle) => {
    setSelectedStyle(style._id);
    updateData(style._id);
  };

  return (
    <div className="flex flex-col items-center px-6 max-w-[1344px] mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 max-w-3xl"
      >
        <h1 className="font-['Almarena_Neue'] text-4xl md:text-6xl mb-6">
          Choose Your Handwriting Style
        </h1>

        <div className="relative w-full aspect-video mb-8 rounded-2xl overflow-hidden bg-gray-50">
  <img
    src="/handwriting.gif"
    alt="Robot handwriting demonstration"
    className="w-full h-full object-cover"
    onError={(e) => {
      e.currentTarget.style.display = 'none';
    }}
  />
</div>

        <div className="flex items-center justify-center gap-8 text-gray-700">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5 text-black" />
            <span>Real Pens</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5 text-black" />
            <span>Real Ink</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5 text-black" />
            <span>Real Stamps</span>
          </motion.div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {HANDWRITINGS.map((style, index) => (
          <motion.button
            key={style._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleSelect(style)}
            className={`
              group relative p-6 rounded-2xl border-2 transition-all duration-300
              ${selectedStyle === style._id 
                ? 'border-black shadow-xl scale-[1.02] bg-gray-50' 
                : 'border-gray-200 hover:border-black'}
            `}
          >
            <h3 className="text-xl font-medium mb-4">{style.name}</h3>
            <div className="relative rounded-xl overflow-hidden bg-white">
              <img
                src={style.preview_url}
                alt={`Handwriting style by ${style.name}`}
                className="w-full aspect-[2.12] object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {selectedStyle === style._id && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-black text-white text-sm rounded-full">
                  Selected
                </span>
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}