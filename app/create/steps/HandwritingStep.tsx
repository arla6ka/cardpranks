'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle } from 'lucide-react';

interface HandwritingStepProps {
  initialData?: string;
  onNext: () => void;
  onBack: () => void;
  updateData: (data: string) => void;
}

interface HandwritingStyle {
  _id: string;
  name: string;
  preview_url: string;
}

export function HandwritingStep({ initialData, updateData }: HandwritingStepProps) {
  const [styles, setStyles] = useState<HandwritingStyle[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>(initialData || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/handwriting');
        if (!response.ok) {
          throw new Error('Failed to fetch handwriting styles');
        }
        const data: HandwritingStyle[] = await response.json();
        setStyles(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load handwriting styles');
      } finally {
        setLoading(false);
      }
    };

    fetchStyles();
  }, []);

  const handleSelect = (style: HandwritingStyle) => {
    setSelectedStyle(style._id);
    updateData(style._id);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
        <p className="mt-4 text-gray-600">Loading handwriting styles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">Error: {error}</div>
    );
  }

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
        {styles.map((style, index) => (
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