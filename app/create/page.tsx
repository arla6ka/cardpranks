// app/create/page.tsx
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { FormData } from '../types/form';
import { RecipientInfoStep } from './steps/RecipientInfoStep';
import { ReturnAddressStep } from './steps/ReturnAddressStep';
import { DesignStep } from './steps/DesignStep';
import { HandwritingStep } from './steps/HandwritingStep';
import { MessageStep } from './steps/MessageStep';
import { PaymentStep } from './steps/PaymentStep';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  useEffect(() => {
    const saved = localStorage.getItem('postcardForm');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('postcardForm', JSON.stringify(formData));
  }, [formData]);

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0: // Design
        return Boolean(formData.card);
      case 1: // Handwriting
        return Boolean(formData.handwriting);
      case 2: // Message
        return Boolean(formData.message.trim());
      case 3: // Recipient Info
        return Boolean(
          formData.recipient.firstName &&
          formData.recipient.lastName &&
          formData.recipient.street1 &&
          formData.recipient.city &&
          formData.recipient.state &&
          formData.recipient.zip
        );
      case 4: // Return Address
        return Boolean(
          formData.from?.firstName &&
          formData.from?.lastName &&
          formData.from?.street1 &&
          formData.from?.city &&
          formData.from?.state &&
          formData.from?.zip
        );
      default:
        return false;
    }
  };


  const handleSubmit = useCallback(async () => {
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
      router.push('/success');
    } catch (error) {
      console.error('Error:', error);
    }
  }, [formData, router]);

  const updateFormSection = (section: keyof FormData, data: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [section]: data };
      localStorage.setItem('postcardForm', JSON.stringify(newData));
      return newData;
    });
  };

  const goToStep = (step: number) => {
    if (step > currentStep + 1) return;

    if (step > currentStep && !isStepValid(currentStep)) {
      alert('Please complete all required fields before proceeding.');
      return;
    }

    window.scrollTo(0, 0);
    setCurrentStep(step);
  };

// app/create/page.tsx
// app/create/page.tsx
const StepContent = useMemo(() => {
  switch (currentStep) {
    case 0: // Design
      return (
        <DesignStep
          initialData={formData.card?._id}
          updateData={(data) => updateFormSection('card', data)}
          onComplete={() => {
            window.scrollTo(0, 0);
            setCurrentStep(1);
          }}
        />
      );
    case 1: // Handwriting
      return (
        <HandwritingStep
          initialData={formData.handwriting?._id}
          updateData={(data) => updateFormSection('handwriting', { _id: data })}
          onComplete={() => {
            window.scrollTo(0, 0);
            setCurrentStep(2);
          }}
        />
      );
    case 2: // Message
      return (
        <MessageStep
          initialData={formData.message}
          updateData={(data) => updateFormSection('message', data)}
          onNext={() => setCurrentStep(3)}
          onBack={() => setCurrentStep(1)}
        />
      );
    case 3: // Recipient Info
      return (
        <RecipientInfoStep
          initialData={formData.recipient}
          updateData={(data) => updateFormSection('recipient', data)}
          onNext={() => setCurrentStep(4)}
          onBack={() => setCurrentStep(2)}
        />
      );
    case 4: // Return Address
      return (
        <ReturnAddressStep
          initialData={formData.from}
          updateData={(data) => updateFormSection('from', data)}
        />
      );
    case 5: // Payment
      return (
        <PaymentStep
          formData={formData}
          onBack={() => setCurrentStep(4)}
          onSuccess={handleSubmit}
        />
      );
    default:
      return null;
  }
}, [currentStep, formData, handleSubmit]);

  return (
    <main className="min-h-screen bg-white pb-32">
      <div className="pt-10">{StepContent}</div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-[1170px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {currentStep > 0 && (
              <button
                onClick={() => goToStep(currentStep - 1)}
                className="text-gray-600 hover:text-black transition-colors flex items-center gap-2"
              >
                <span className="text-lg">←</span>
                Back
              </button>
            )}
            <div className="flex-1" />
            {currentStep < 5 && (
              <button
                onClick={() => goToStep(currentStep + 1)}
                disabled={!isStepValid(currentStep)}
                className="px-6 py-2 bg-black text-white rounded-full flex items-center gap-2 
                            disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 
                            transition-colors font-medium"
              >
                {currentStep === 4 ? 'Proceed to Preview' : 'Next'}
                <span className="text-lg">→</span>
              </button>
            )}
            {currentStep === 5 && (
              <button
                onClick={() => document.getElementById('checkout-button')?.click()}
                className="px-6 py-2 bg-black text-white rounded-full flex items-center gap-2 
                          hover:bg-gray-800 transition-colors font-medium"
              >
                Proceed to Payment
                <span className="text-lg">→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}