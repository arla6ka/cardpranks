// components/PaymentStep.tsx
'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
  AddressElement
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface FormData {
  recipient: {
    firstName: string;
    lastName: string;
    street1: string;
    city: string;
    state: string;
    zip: string;
  };
  message: string;
}

interface PaymentStepProps {
  formData: FormData;
  onBack: () => void;
  onSuccess: () => void;
}

function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw submitError;
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
          payment_method_data: {
            billing_details: {
              email,
              phone
            }
          }
        },
      });

      if (confirmError) {
        throw confirmError;
      }

    } catch (err: any) {
      setError(err.message || 'An error occurred during payment');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            placeholder="+1 (555) 555-5555"
          />
        </div>
      </div>

      <PaymentElement 
        options={{
          layout: 'tabs'
        }}
      />

      {error && (
        <div className="text-red-600 bg-red-50 p-4 rounded-lg mt-4">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full px-8 py-3 rounded-full border border-black text-xl font-['Consolas'] bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? 'Processing...' : 'Pay $9.00'}
      </button>
    </form>
  );
}

export function PaymentStep({ formData, onSuccess }: PaymentStepProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function createPaymentIntent() {
      try {
        const response = await fetch('/api/checkout_sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formData,
            amount: 900,
            currency: 'usd',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const text = await response.text();
        setClientSecret(text);
      } catch (err) {
        console.error('Payment setup error:', err);
        setError(err instanceof Error ? err.message : 'Failed to setup payment');
      }
    }

    createPaymentIntent();
  }, [formData]);

  if (error) {
    return (
      <div className="text-red-600 bg-red-50 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-6 max-w-[917px] mx-auto">
      <h1 className="font-['Almarena_Neue'] text-4xl md:text-6xl mb-10 text-center">
        Complete Your Payment
      </h1>

      <div className="w-full max-w-[589px] p-6 rounded-xl border border-black border-solid bg-white bg-opacity-20 shadow-[0px_4px_4px_rgba(9,9,9,0.26)]">
        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: 'stripe',
                variables: {
                  colorPrimary: '#000000',
                  colorBackground: '#ffffff',
                  borderRadius: '12px',
                },
              }
            }}
          >
            <CheckoutForm onSuccess={onSuccess} />
          </Elements>
        )}
      </div>
    </div>
  );
}