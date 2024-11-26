'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Building2, MapPin, Info } from 'lucide-react';

interface ReturnAddressStepProps {
 initialData?: FormState;
 onNext: () => void;
 onBack: () => void;
 updateData: (data: FormState) => void;
}

interface FormState {
 [key: string]: string | undefined;
 firstName: string;
 lastName: string;
 company?: string;
 street1: string;
 street2?: string;
 city: string;
 state: string;
 zip: string;
}

interface FormField {
 label: string;
 id: string;
}

interface FormSection {
 title: string;
 icon: React.ElementType;
 fields: FormField[];
}

const formSections: FormSection[] = [
 {
   title: 'Personal Information',
   icon: User,
   fields: [
     { label: 'First Name', id: 'firstName' },
     { label: 'Last Name', id: 'lastName' },
   ]
 },
 {
   title: 'Company Details',
   icon: Building2,
   fields: [
     { label: 'Company', id: 'company' },
   ]
 },
 {
   title: 'Address',
   icon: MapPin,
   fields: [
     { label: 'Address Line 1', id: 'street1' },
     { label: 'Address Line 2', id: 'street2' },
     { label: 'City', id: 'city' },
     { label: 'State', id: 'state' },
     { label: 'Zip Code', id: 'zip' },
   ]
 }
];

export function ReturnAddressStep({ initialData, updateData }: ReturnAddressStepProps) {
 const [formState, setFormState] = useState<FormState>({
   firstName: '',
   lastName: '',
   company: '',
   street1: '',
   street2: '',
   city: '',
   state: '',
   zip: '',
   ...initialData,
 });

 useEffect(() => {
   if (initialData) {
     setFormState((prev) => ({
       ...prev,
       ...initialData,
     }));
   }
 }, [initialData]);

 const handleChange = (field: string, value: string) => {
   const newState = { ...formState, [field]: value };
   setFormState(newState as FormState);
   updateData(newState as FormState);
 };

 return (
   <div className="flex flex-col items-center px-6 max-w-[917px] mx-auto">
     <motion.h1 
       initial={{ opacity: 0, y: -20 }}
       animate={{ opacity: 1, y: 0 }}
       className="font-['Almarena_Neue'] text-4xl md:text-6xl mb-4 text-center"
     >
       Return Address Information
     </motion.h1>
     
     <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       transition={{ delay: 0.2 }}
       className="flex items-center gap-2 text-gray-600 mb-10 bg-blue-50 px-4 py-2 rounded-full"
     >
       <Info className="w-4 h-4" />
       <p className="text-sm">
         Optional: Leave blank to keep your identity secret
       </p>
     </motion.div>

     <div className="w-full max-w-[640px] space-y-8">
       {formSections.map((section, sectionIndex) => (
         <motion.div
           key={section.title}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: sectionIndex * 0.1 }}
           className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
         >
           <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
             <section.icon className="w-5 h-5 text-gray-500" />
             <h2 className="font-semibold text-gray-700">{section.title}</h2>
           </div>
           
           <div className="p-6 space-y-4">
             {section.fields.map((field) => (
               <div key={field.id} className="space-y-1">
                 <label
                   htmlFor={field.id}
                   className="block text-sm font-medium text-gray-700"
                 >
                   {field.label}
                 </label>
                 <input
                   id={field.id}
                   type="text"
                   value={formState[field.id] || ''}
                   onChange={(e) => handleChange(field.id, e.target.value)}
                   className="w-full px-4 py-2.5 rounded-xl border border-gray-200 
                            focus:border-black focus:ring-1 focus:ring-black transition-colors
                            placeholder-gray-400 text-gray-900"
                   placeholder={`Enter ${field.label.toLowerCase()}`}
                 />
               </div>
             ))}
           </div>
         </motion.div>
       ))}
     </div>
   </div>
 );
}