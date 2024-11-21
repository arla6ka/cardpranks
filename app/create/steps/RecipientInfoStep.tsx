// RecipientInfoStep.tsx
'use client'
import { useState, useEffect } from 'react';

interface RecipientInfoStepProps {
 initialData?: {
   firstName: string;
   lastName: string;
   company?: string;
   street1: string;
   street2?: string;
   city: string;
   state: string;
   zip: string;
 };
 onNext: () => void;
 updateData: (data: any) => void;
}

interface FormState {
 firstName: string;
 lastName: string;
 company: string;
 street1: string;
 street2: string;
 city: string;
 state: string;
 zip: string;
}

const formFields = [
 { label: 'First Name', id: 'firstName', required: true },
 { label: 'Last Name', id: 'lastName', required: true },
 { label: 'Company', id: 'company' },
 { label: 'Address line 1', id: 'street1', required: true },
 { label: 'Address line 2', id: 'street2' },
 { label: 'City', id: 'city', required: true },
 { label: 'State', id: 'state', required: true },
 { label: 'Zip Code', id: 'zip', required: true }
];

export function RecipientInfoStep({ initialData, updateData }: RecipientInfoStepProps) {
 const [formState, setFormState] = useState<FormState>({
   firstName: initialData?.firstName || '',
   lastName: initialData?.lastName || '',
   company: initialData?.company || '',
   street1: initialData?.street1 || '',
   street2: initialData?.street2 || '',
   city: initialData?.city || '',
   state: initialData?.state || '',
   zip: initialData?.zip || ''
 });

 useEffect(() => {
   if (initialData) {
     setFormState(prev => ({
       ...prev,
       ...initialData,
       company: initialData.company || '',
       street2: initialData.street2 || ''
     }));
   }
 }, [initialData]);

 const handleChange = (field: keyof FormState, value: string) => {
   const newState = { ...formState, [field]: value };
   setFormState(newState);
   updateData(newState);
 };

 return (
   <div className="flex flex-col items-center px-6 max-w-[917px] mx-auto">
     <h1 className="font-['Almarena_Neue'] text-4xl md:text-6xl mb-10 text-center">
       Recipient Information
     </h1>
     
     <form className="w-full max-w-[589px] p-6 rounded-xl border border-black border-solid bg-white bg-opacity-20 shadow-[0px_4px_4px_rgba(9,9,9,0.26)]">
       <div className="space-y-6">
         {formFields.map((field) => (
           <div key={field.id} className="flex flex-col md:flex-row items-center gap-4">
             <label 
               htmlFor={field.id} 
               className="w-[106px] text-left font-['Consolas']"
             >
               {field.label}
               {field.required && '*'}
             </label>
             <input
               id={field.id}
               type="text"
               value={formState[field.id as keyof FormState]}
               onChange={(e) => handleChange(field.id as keyof FormState, e.target.value)}
               required={field.required}
               className="flex-1 h-[50px] px-4 rounded-xl border border-black border-solid bg-white bg-opacity-20 font-['Consolas'] min-w-[240px]"
             />
           </div>
         ))}
       </div>
     </form>
   </div>
 );
}