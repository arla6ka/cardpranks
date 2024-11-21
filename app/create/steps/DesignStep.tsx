// DesignStep.tsx
'use client'
import { useState, useEffect } from 'react';

interface DesignStepProps {
 initialData?: string;
 onNext: () => void;
 onBack: () => void;
 updateData: (data: any) => void;
}

interface Design {
 _id: string;
 name: string;
 preview_url: string;
}

export function DesignStep({ initialData, updateData }: DesignStepProps) {
 const [designs, setDesigns] = useState<Design[]>([]);
 const [selectedDesign, setSelectedDesign] = useState<string>(initialData || '');
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
   const fetchDesigns = async () => {
     try {
       setLoading(true);
       const response = await fetch('/api/stationery');
       if (!response.ok) {
         throw new Error('Failed to fetch designs');
       }
       const data = await response.json();
       console.log('Fetched designs:', data);
       setDesigns(data);
     } catch (error) {
       console.error('Error fetching designs:', error);
       setError(error instanceof Error ? error.message : 'Failed to load designs');
     } finally {
       setLoading(false);
     }
   };

   fetchDesigns();
 }, []);

 const handleSelect = (design: Design) => {
   console.log('Selected design:', design);
   setSelectedDesign(design._id);
   updateData(design._id);
 };

 if (loading) return <div className="text-center p-4">Loading designs...</div>;
 if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

 return (
   <div className="flex flex-col items-center px-6 max-w-[1344px] mx-auto">
     <h1 className="font-['Almarena_Neue'] text-4xl md:text-6xl mb-10 text-center">
       Choose a design for the back of your postcard
     </h1>
     
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
       {designs.map((design) => (
         <button
           key={design._id}
           onClick={() => handleSelect(design)}
           className={`relative rounded-xl overflow-hidden border-2 transition-all
             ${selectedDesign === design._id 
               ? 'border-blue-500 shadow-lg scale-105' 
               : 'border-transparent hover:border-gray-300'}`}
         >
           <img
             src={design.preview_url}
             alt={design.name}
             className="w-full aspect-[1.5] object-cover"
           />
           <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
             {design.name}
           </div>
         </button>
       ))}
     </div>
   </div>
 );
}