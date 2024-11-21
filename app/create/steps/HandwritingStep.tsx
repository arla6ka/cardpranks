
// HandwritingStep.tsx
'use client'
import { useState, useEffect } from 'react';

interface HandwritingStepProps {
 initialData?: string;
 onNext: () => void;
 onBack: () => void;
 updateData: (data: any) => void;
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
       const data = await response.json();
       console.log('Fetched handwriting styles:', data);
       setStyles(data);
     } catch (error) {
       console.error('Error fetching handwriting styles:', error);
       setError(error instanceof Error ? error.message : 'Failed to load handwriting styles');
     } finally {
       setLoading(false);
     }
   };

   fetchStyles();
 }, []);

 const handleSelect = (style: HandwritingStyle) => {
   console.log('Selected style:', style);
   setSelectedStyle(style._id);
   updateData(style._id);
 };

 if (loading) return <div className="text-center p-4">Loading handwriting styles...</div>;
 if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

 return (
   <div className="flex flex-col items-center px-6 max-w-[1344px] mx-auto">
     <h1 className="font-['Almarena_Neue'] text-4xl md:text-6xl mb-10 text-center">
       What style handwriting do you prefer?
     </h1>
     
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
       {styles.map((style) => (
         <button
           key={style._id}
           onClick={() => handleSelect(style)}
           className={`flex flex-col items-center p-6 rounded-xl border transition-all
             ${selectedStyle === style._id 
               ? 'border-blue-500 shadow-lg scale-105' 
               : 'border-black hover:border-gray-300'}`}
         >
           <h3 className="text-2xl font-['Consolas'] mb-4">{style.name}</h3>
           <img 
             src={style.preview_url}
             alt={`Handwriting style by ${style.name}`}
             className="w-full aspect-[2.12] object-contain" 
           />
         </button>
       ))}
     </div>
   </div>
 );
}