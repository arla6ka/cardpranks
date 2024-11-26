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
      case 0:
        return Boolean(
          formData.recipient.firstName &&
          formData.recipient.lastName &&
          formData.recipient.street1 &&
          formData.recipient.city &&
          formData.recipient.state &&
          formData.recipient.zip
        );
      case 1:
        return true; // Return address is optional
      case 2:
        return Boolean(formData.card);
      case 3:
        return Boolean(formData.handwriting);
      case 4:
        return Boolean(formData.message.trim());
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

    setCurrentStep(step);
  };

  const StepContent = useMemo(() => {
    switch (currentStep) {
      case 0:
        return (
          <RecipientInfoStep
            initialData={formData.recipient}
            updateData={(data) => updateFormSection('recipient', data)}
            onNext={() => setCurrentStep(1)}
          />
        );
      case 1:
        return (
          <ReturnAddressStep
            initialData={formData.from}
            updateData={(data) => updateFormSection('from', data)}
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
          />
        );
      case 2:
        return (
          <DesignStep
            initialData={formData.card?._id}
            updateData={(data) => updateFormSection('card', { _id: data })}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <HandwritingStep
            initialData={formData.handwriting?._id}
            updateData={(data) => updateFormSection('handwriting', { _id: data })}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <MessageStep
            initialData={formData.message}
            updateData={(data) => updateFormSection('message', data)}
            onNext={() => setCurrentStep(5)}
            onBack={() => setCurrentStep(3)}
          />
        );
        case 5:
          return (
            <PaymentStep
              formData={formData}
              onBack={() => setCurrentStep(4)}
              onSuccess={handleSubmit} // Add this line
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
                {currentStep === 4 ? 'Proceed to Payment' : 'Next'}
                <span className="text-lg">→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}