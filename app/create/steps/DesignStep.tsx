// DesignStep.tsx
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';
import { DESIGNS } from '@/app/lib/constants/designs';

interface Design {
  _id: string;
  name: string;
  preview_url: string;
  category: 'christmas' | 'other';
}

interface CardData {
  _id: string;
  preview_url: string;
  name: string;
}

interface DesignStepProps {
  initialData?: string;
  updateData: (data: CardData) => void;
}

interface DesignFromAPI {
  _id: string;
  name: string;
  preview_url: string;
}

export function DesignStep({ initialData, updateData }: DesignStepProps) {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<string>(initialData || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = (design: Design) => {
    setSelectedDesign(design._id);
    updateData({
      _id: design._id,
      preview_url: design.preview_url,
      name: design.name
    });
  };

  const PRIORITY_DESIGNS = [
    'Cherished Moments',
    'Family First',
    'Festive Family',
    'Celebrating Kwanzaa',
  ];

  const CHRISTMAS_DESIGNS = [
    'Cherished Moments',
    'Family First',
    'Festive Family',
    'Celebrating Kwanzaa',
    'Happy Holidays',
    'Merry Christmas',
    'Xmas',
    'Eco Holidays',
    'Holiday Season',
    'Merry Christmas',
  ];

  useEffect(() => {
    try {
      setLoading(true);
      const designsWithCategories = (DESIGNS as DesignFromAPI[]).map(design => ({
        ...design,
        category: CHRISTMAS_DESIGNS.includes(design.name)
          ? 'christmas' as const 
          : 'other' as const
      }));
      setDesigns(designsWithCategories);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load designs');
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
        <p className="mt-4 text-gray-600">Loading amazing designs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-center p-6 bg-red-50 rounded-2xl max-w-md">
          <p className="text-red-600 mb-2">Oops! Something went wrong</p>
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  const christmasDesigns = designs
    .filter(design => design.category === 'christmas')
    .sort((a, b) => {
      const aIndex = PRIORITY_DESIGNS.indexOf(a.name);
      const bIndex = PRIORITY_DESIGNS.indexOf(b.name);
      if (aIndex === -1 && bIndex === -1) return 0;
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
  const otherDesigns = designs.filter(design => design.category === 'other');

  return (
    <div className="flex flex-col items-center px-6 max-w-[1344px] mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="font-['Almarena_Neue'] text-4xl md:text-6xl mb-4">
          Choose Your Design
        </h1>
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Sparkles className="w-4 h-4" />
          <p className="text-lg">Pick a style that will make them wonder</p>
        </div>
      </motion.div>

      {/* Christmas Designs Section */}
      <div className="w-full mb-16">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-medium mb-8 text-center"
        >
          <span className="inline-flex items-center gap-2">
            🎄 Christmas Collection
          </span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {christmasDesigns.map((design, index) => (
            <motion.button
              key={design._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSelect(design)}
              className={`
                group relative rounded-2xl overflow-hidden border-2 transition-all duration-300
                ${selectedDesign === design._id 
                  ? 'border-black shadow-xl scale-[1.02]' 
                  : 'border-transparent hover:border-gray-200'}
              `}
            >
              <div className="aspect-[1.5] overflow-hidden">
                <img
                  src={design.preview_url}
                  alt={design.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div 
                className={`
                  absolute bottom-0 left-0 right-0 p-4 transition-all duration-300
                  bg-gradient-to-t from-black/80 to-transparent
                  ${selectedDesign === design._id ? 'h-full flex items-end' : 'h-20'}
                `}
              >
                <p className="text-white text-lg font-medium">{design.name}</p>
              </div>
              
              {selectedDesign === design._id && (
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

      {/* Other Designs Section */}
      <div className="w-full">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-medium mb-8 text-center"
        >
          <span className="inline-flex items-center gap-2">
            ✨ Classic Collection
          </span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherDesigns.map((design, index) => (
            <motion.button
              key={design._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSelect(design)}
              className={`
                group relative rounded-2xl overflow-hidden border-2 transition-all duration-300
                ${selectedDesign === design._id 
                  ? 'border-black shadow-xl scale-[1.02]' 
                  : 'border-transparent hover:border-gray-200'}
              `}
            >
              <div className="aspect-[1.5] overflow-hidden">
                <img
                  src={design.preview_url}
                  alt={design.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div 
                className={`
                  absolute bottom-0 left-0 right-0 p-4 transition-all duration-300
                  bg-gradient-to-t from-black/80 to-transparent
                  ${selectedDesign === design._id ? 'h-full flex items-end' : 'h-20'}
                `}
              >
                <p className="text-white text-lg font-medium">{design.name}</p>
              </div>
              
              {selectedDesign === design._id && (
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

      
    </div>
  );
}