// app/create/steps/PaymentStep.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { FormData } from '../../types/form';

interface PaymentStepProps {
  formData: FormData;
  onBack: () => void;
  onSuccess: () => void;
}

function EnvelopePreview({ formData }: { formData: FormData }) {
  const [view, setView] = useState<'front' | 'back' | 'envelope'>('front');

  return (
    <div className="w-full max-w-[589px] mb-8">
      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setView('front')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            view === 'front' 
              ? 'bg-black text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Message
        </button>
        <button
          onClick={() => setView('back')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            view === 'back' 
              ? 'bg-black text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Design
        </button>
        <button
          onClick={() => setView('envelope')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            view === 'envelope' 
              ? 'bg-black text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Envelope
        </button>
      </div>

      {/* Preview Container */}
      <div className="relative w-full max-w-[589px] aspect-[6/4] mx-auto">
        {/* Message Front */}
        <motion.div 
          initial={false}
          animate={{ 
            scale: view === 'front' ? 1 : 0.95,
            opacity: view === 'front' ? 1 : 0,
            zIndex: view === 'front' ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-white rounded-xl shadow-lg overflow-hidden p-8"
        >
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-800 font-['Consolas'] text-xs md:text-sm whitespace-pre-wrap text-left">
              {formData.message}
            </p>
          </div>
        </motion.div>

        {/* Design Back */}
        <motion.div 
          initial={false}
          animate={{ 
            scale: view === 'back' ? 1 : 0.95,
            opacity: view === 'back' ? 1 : 0,
            zIndex: view === 'back' ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {formData.card?.preview_url && (
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={formData.card.preview_url}
                alt={formData.card.name || "Card design"}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          {!formData.card?.preview_url && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <span>Selected Design Preview</span>
            </div>
          )}
        </motion.div>

        {/* Envelope */}
        <motion.div 
          initial={false}
          animate={{ 
            scale: view === 'envelope' ? 1 : 0.95,
            opacity: view === 'envelope' ? 1 : 0,
            zIndex: view === 'envelope' ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-8 h-full relative">
            {/* Return Address */}
            <div className="text-sm text-gray-600">
              {formData.from ? (
                <>
                  {formData.from.firstName} {formData.from.lastName}
                  <br />
                  {formData.from.street1}
                  {formData.from.street2 && <><br />{formData.from.street2}</>}
                  <br />
                  {formData.from.city}, {formData.from.state} {formData.from.zip}
                </>
              ) : (
                <span className="text-gray-400 italic">No return address</span>
              )}
            </div>

            {/* Stamp */}
            <div className="absolute top-8 right-8 w-16 h-16 bg-red-30 rounded-sm flex items-center justify-center border border-red-50">
              <div className="w-20 h-20 relative overflow-hidden">
                <img 
                  src="/usa-stamp.png" 
                  alt="US Postage"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.parentElement!.innerHTML = 'STAMP';
                  }}
                />
              </div>
            </div>

            {/* Recipient Address */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-black font-['Consolas'] space-y-1">
                {formData.recipient.firstName} {formData.recipient.lastName}
                <br />
                {formData.recipient.street1}
                {formData.recipient.street2 && <><br />{formData.recipient.street2}</>}
                <br />
                {formData.recipient.city}, {formData.recipient.state} {formData.recipient.zip}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="text-center mt-4 text-sm text-gray-500">
        Click buttons above to preview your postcard and envelope
      </div>
    </div>
  );
}

export function PaymentStep({ formData }: PaymentStepProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-6 max-w-[917px] mx-auto">
      <h1 className="font-['Almarena_Neue'] text-4xl md:text-6xl mb-4 text-center">
        Review Your Order
      </h1>
      <div className="flex items-center gap-1 text-gray-600 text-lg mb-10 mr-[-30px] md:mr-[0px]">
        <span>Secure payment powered by</span>
        <div className="flex items-center gap-0">
          <img 
            src="/stripe.png" 
            alt="Stripe" 
            className="h-[100px] w-[80px] object-contain"
          />
        </div>
      </div>
      <EnvelopePreview formData={formData} />
      <div className="w-full max-w-[589px] mt-6">
        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full px-8 py-3 rounded-full border border-black text-xl font-['Consolas'] bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Loading...' : 'Proceed to Payment'}
        </button>
      </div>
    </div>
  );
}