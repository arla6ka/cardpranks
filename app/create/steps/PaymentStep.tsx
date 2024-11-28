// app/create/steps/PaymentStep.tsx
'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import type { FormData } from '../../types/form';
import { motion } from 'framer-motion';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

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
      <div className="relative w-full max-w-[589px] aspect-[1.8] mx-auto">
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
                className="w-full h-full object-cover rounded-xl"
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

function CheckoutForm({ formData }: { formData: FormData }) {
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
      // First create or retrieve a customer
      const customerResponse = await fetch('/api/create-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          phone,
        }),
      });

      if (!customerResponse.ok) {
        throw new Error('Failed to create customer');
      }

      const { customerId } = await customerResponse.json();

      // Create a new payment intent with the customer ID
// In your PaymentStep.tsx component, update the createPaymentIntent call
const paymentResponse = await fetch('/api/checkout_sessions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    formData,
    amount: 898,
    currency: 'usd',
    customerId,
  }),
});

if (!paymentResponse.ok) {
  throw new Error('Failed to create payment intent');
}

const { clientSecret } = await paymentResponse.json(); // Parse the JSON response

      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw submitError;
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
          payment_method_data: {
            billing_details: {
              email,
              phone
            }
          }
        }
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
        {processing ? 'Processing...' : 'Pay $8.98'}
      </button>
    </form>
  );
}

export function PaymentStep({ formData }: PaymentStepProps) {
  return (
    <div className="flex flex-col items-center px-6 max-w-[917px] mx-auto">
      <h1 className="font-['Almarena_Neue'] text-4xl md:text-6xl mb-4 text-center">
        Complete Your Payment
      </h1>
      <div className="flex items-center gap-1 text-gray-600 text-lg mb-10 mr-[-30px] md:mr-[0px]">
        <span>Secure payment powered by</span>
        <div className="flex items-center gap-0 ">
          <img 
            src="/stripe.png" 
            alt="Stripe" 
            className="h-[100px] w-[80px] object-contain"
          />
        </div>
      </div>
      <EnvelopePreview formData={formData} />
      <div className="w-full max-w-[589px] p-6 rounded-xl border border-black border-solid bg-white bg-opacity-20 shadow-[0px_4px_4px_rgba(9,9,9,0.26)]">
        <Elements
          stripe={stripePromise}
          options={{
            mode: 'payment',
            amount: 898,
            currency: 'usd',
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
          <CheckoutForm formData={formData} />
        </Elements>
      </div>
    </div>
  );
}