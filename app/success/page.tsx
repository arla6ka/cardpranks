// app/success/page.tsx
'use client';
import { Suspense } from 'react';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const payment_intent = searchParams.get('payment_intent');
  const [status, setStatus] = useState<string>('loading');

  useEffect(() => {
    if (!payment_intent) return;

    fetch(`/api/payment_status?payment_intent=${payment_intent}`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'succeeded') {
          setStatus('success');
        } else {
          setStatus('failed');
        }
      })
      .catch(() => setStatus('failed'));
  }, [payment_intent]);

  const handleReturnHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-4 p-8 rounded-2xl bg-white shadow-xl border border-gray-100"
      >
        {status === 'loading' && (
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <Loader2 className="w-16 h-16 text-black" />
            </motion.div>
            <h2 className="mt-6 text-2xl font-semibold text-gray-900">
              Processing your payment...
            </h2>
            <p className="mt-2 text-gray-600">
              Please wait while we confirm your order.
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Thank You!
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Your postcard has been ordered successfully.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Well notify your recipient as soon as it&quot;s delivered.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReturnHome}
                className="mt-8 px-8 py-3 rounded-full bg-black text-white font-['Consolas'] hover:bg-gray-800 transition-colors"
              >
                Return to Home
              </motion.button>
            </motion.div>
          </div>
        )}

        {status === 'failed' && (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <XCircle className="w-16 h-16 mx-auto text-red-500" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Oops! Something went wrong
              </h2>
              <p className="mt-4 text-gray-600">
                We couldn&quot;t process your payment. Please try again.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReturnHome}
                className="mt-8 px-8 py-3 rounded-full bg-black text-white font-['Consolas'] hover:bg-gray-800 transition-colors"
              >
                Return to Home
              </motion.button>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}