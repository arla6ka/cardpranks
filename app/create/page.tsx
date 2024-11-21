'use client';
import { useState, useEffect } from 'react';
import { RecipientInfoStep } from './steps/RecipientInfoStep';
import { ReturnAddressStep } from './steps/ReturnAddressStep';
import { DesignStep } from './steps/DesignStep';
import { HandwritingStep } from './steps/HandwritingStep';
import { MessageStep } from './steps/MessageStep';

interface FormData {
  recipient: {
    firstName: string;
    lastName: string;
    company?: string;
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zip: string;
  };
  from?: {
    firstName: string;
    lastName: string;
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zip: string;
  };
  message: string;
  handwriting: { _id: string } | null;
  card: { _id: string } | null;
}

const INITIAL_FORM_DATA: FormData = {
  recipient: {
    firstName: '',
    lastName: '',
    street1: '',
    city: '',
    state: '',
    zip: '',
  },
  message: '',
  handwriting: null,
  card: null,
};

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('postcardForm');
      return saved ? JSON.parse(saved) : INITIAL_FORM_DATA;
    }
    return INITIAL_FORM_DATA;
  });

  useEffect(() => {
    localStorage.setItem('postcardForm', JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = async () => {
    try {
      const postData = {
        message: formData.message,
        handwriting: formData.handwriting?._id || '',
        card: formData.card?._id || '',
        recipient: formData.recipient,
        from: formData.from,
      };

      console.log('Submitting data:', postData);

      const response = await fetch('/api/send-postcard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send postcard');
      }

      const result = await response.json();
      console.log('Success:', result);
      localStorage.removeItem('postcardForm');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateFormSection = (section: keyof FormData, data: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [section]: data };
      localStorage.setItem('postcardForm', JSON.stringify(newData));
      return newData;
    });
  };

  return (
    <main className="min-h-screen bg-white pb-32">
      <div className="pt-10">
        {currentStep === 0 && (
          <RecipientInfoStep
            initialData={formData.recipient}
            updateData={(data) => updateFormSection('recipient', data)}
            onNext={() => setCurrentStep(1)}
          />
        )}
        {currentStep === 1 && (
          <ReturnAddressStep
            initialData={formData.from}
            updateData={(data) => updateFormSection('from', data)}
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
          />
        )}
        {currentStep === 2 && (
          <DesignStep
            initialData={formData.card?._id || undefined}
            updateData={(data) => updateFormSection('card', { _id: data })}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        )}
        {currentStep === 3 && (
          <HandwritingStep
            initialData={formData.handwriting?._id || undefined}
            updateData={(data) => updateFormSection('handwriting', { _id: data })}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        )}
        {currentStep === 4 && (
          <MessageStep
            initialData={formData.message}
            updateData={(data) => updateFormSection('message', data)}
            onBack={() => setCurrentStep(3)}
            handleSubmit={handleSubmit}
          />
        )}
      </div>

      {/* Fixed Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white">
        <div className="max-w-[1170px] mx-auto px-6">
          <div className="w-full border-t border-gray-900 border-solid" />
          <div className="flex justify-between py-6">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-8 py-3 rounded-full border border-black text-xl font-['Consolas'] bg-white hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            <div className="flex-1" />
            {currentStep < 4 && (
              <button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="px-8 py-3 rounded-full border border-black text-xl font-['Consolas'] bg-white hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
