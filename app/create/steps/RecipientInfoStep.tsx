'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Building2, MapPin } from 'lucide-react';
import { useLoadScript } from '@react-google-maps/api';

interface RecipientInfoStepProps {
  initialData?: FormState;
  onNext: () => void;
  onBack: () => void; // Add onBack
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
 id: string; // Changed from keyof FormState to string
 required?: boolean;
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
     { label: 'First Name', id: 'firstName', required: true },
     { label: 'Last Name', id: 'lastName', required: true },
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
     { label: 'Address Line 1', id: 'street1', required: true },
     { label: 'Address Line 2', id: 'street2' },
     { label: 'City', id: 'city', required: true },
     { label: 'State', id: 'state', required: true },
     { label: 'Zip Code', id: 'zip', required: true },
   ]
 }
];

export function RecipientInfoStep({ initialData, updateData }: RecipientInfoStepProps) {
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

 const { isLoaded } = useLoadScript({
   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
   libraries: ['places'],
 });

 useEffect(() => {
   if (isLoaded && window.google) {
     const addressInput = document.getElementById('street1');
     if (addressInput) {
       const autocomplete = new google.maps.places.Autocomplete(addressInput as HTMLInputElement, {
         componentRestrictions: { country: 'us' },
         fields: ['address_components'],
         types: ['address'],
       });

       autocomplete.addListener('place_changed', () => {
         const place = autocomplete.getPlace();
         if (place.address_components) {
           let streetNumber = '';
           let route = '';
           let newFormState = { ...formState };

           place.address_components.forEach((component) => {
             const type = component.types[0];
             switch (type) {
               case 'street_number':
                 streetNumber = component.long_name;
                 break;
               case 'route':
                 route = component.long_name;
                 break;
               case 'locality':
                 newFormState.city = component.long_name;
                 break;
               case 'administrative_area_level_1':
                 newFormState.state = component.short_name;
                 break;
               case 'postal_code':
                 newFormState.zip = component.long_name;
                 break;
             }
           });

           newFormState.street1 = `${streetNumber} ${route}`.trim();
           setFormState(newFormState);
           updateData(newFormState);
         }
       });
     }
   }
 }, [isLoaded]);

 const handleChange = (field: string, value: string) => { // Changed from keyof FormState to string
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
       Recipient Information
     </motion.h1>
     <motion.p 
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       transition={{ delay: 0.2 }}
       className="text-gray-600 text-lg mb-10 text-center"
     >
       Tell us where to send your prank postcard
     </motion.p>

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
                   {field.required && <span className="text-red-500 ml-1">*</span>}
                 </label>
                 <input
                   id={field.id}
                   type="text"
                   value={formState[field.id] || ''}
                   onChange={(e) => handleChange(field.id, e.target.value)}
                   required={field.required}
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