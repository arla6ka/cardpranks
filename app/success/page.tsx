// app/success/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

function SuccessContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: 8.98,
        currency: 'USD'
      });
    }
  }, []);

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/payment_status?session_id=${sessionId}`);
        const data = await response.json();
        
        if (data.payment_status === 'paid') {
          try {
            await fetch('/api/fulfill', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ sessionId }),
            });

            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'conversion', {
                'send_to': 'AW-16803060343/9Pf5CK6VlvEZe0qcw-',
                'value': 8.98,
                'currency': 'USD',
                'transaction_id': sessionId
              });
            }

            if (typeof window !== 'undefined' && (window as any).fbq) {
              (window as any).fbq('track', 'Purchase', {
                value: 8.98,
                currency: 'USD'
              });
            }

          } catch {
            console.error('Fulfillment attempt failed, webhook will handle it');
          }
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    };

    checkStatus();
  }, [sessionId]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
          <p className="text-gray-600 mb-6">Please try again or contact support if the problem persists.</p>
          <Link 
            href="/"
            className="inline-block px-6 py-3 rounded-full text-white bg-black hover:bg-gray-800 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto px-6"
      >
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-['Almarena_Neue'] mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-gray-600">
            We&apos;re excited to help you pull off an unforgettable prank.
          </p>
        </div>

        {/* What Happens Next Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-['Almarena_Neue'] mb-4">What happens next?</h2>
          <p className="text-gray-600 mb-4">
            Your card will ship within 5-7 business days.
          </p>
        </div>

        {/* Survey Section */}
        <SourceSurvey />

        {/* Tips Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-['Almarena_Neue'] mb-6">Want the perfect reaction?</h2>
          <div className="space-y-4">
            <p className="text-gray-600 font-medium">Here are some tips to ensure maximum confusion and fun:</p>
            <ul className="space-y-3 text-gray-600 list-disc pl-5">
              <li><strong>Keep tabs on their mail:</strong> Discreetly monitor the mail around the delivery window to ensure they receive the card.</li>
              <li><strong>Be present:</strong> Try to be nearby when they open their mail. A casual visit or hangout can help you witness the moment firsthand.</li>
              <li><strong>Surprise placement:</strong> Sneak the card into a spot they&apos;ll stumble upon—like their desk, bag, or even tucked into holiday décor.</li>
              <li><strong>Prompt with curiosity:</strong> Ask if they&apos;ve received any interesting holiday mail lately to steer them toward the card.</li>
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-['Almarena_Neue'] mb-4 flex items-center justify-center">
            🎄 Get Featured by CardPranks! 🎄
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Confused families = hilarious TikToks and Reels!
          </p>
          <ol className="space-y-3 text-gray-600 list-decimal pl-5">
            <li>Capture your recipient&apos;s reaction when they open their mystery CardPranks card.</li>
            <li>Share the video on TikTok or Instagram using #CardPranks and tag @CardPranks.</li>
            <li>We&apos;ll feature our favorite reactions on our page!</li>
          </ol>
          <p className="text-gray-600 text-center mt-6">
            Make your family famous for their holiday confusion. We can&apos;t wait to see how prank-tastic your CardPranks moment is! 😂
          </p>
        </div>


        {/* Footer Actions */}
        <div className="text-center space-y-6">
          <p className="text-gray-600">
            The magic is all in the reveal! We&apos;d love to hear how it goes—feel free to share your story with us.
          </p>
          <div>
            <Link 
              href="/"
              className="inline-block px-8 py-3 rounded-full border border-black text-xl font-['Consolas'] bg-white hover:bg-gray-50 transition-colors"
            >
              Send Another Prank
            </Link>
          </div>
          <div className="text-sm text-gray-500">
            Questions? <a href="mailto:support@cardpranks.com" className="underline hover:text-gray-700">Contact our support</a>
          </div>
          <p className="text-gray-500 pt-4">
            Happy Pranking!<br />
            <span className="font-medium">The CardPranks Team</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function SourceSurvey() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sources = [
    { id: 'instagram', label: 'Instagram', icon: '📸' },
    { id: 'tiktok', label: 'TikTok', icon: '🎵' },
    { id: 'google', label: 'Google Search', icon: '🔍' },
    { id: 'youtube', label: 'YouTube', icon: '▶️' },
    { id: 'facebook', label: 'Facebook', icon: '👥' },
    { id: 'other', label: 'Other', icon: '✨' },
  ];

  const handleSubmit = async (source: string) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ source }),
      });

      if (!response.ok) throw new Error('Failed to submit');
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Survey submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm mb-8 text-center">
        <h2 className="text-2xl font-['Almarena_Neue'] mb-4">Thanks for letting us know! 🙏</h2>
        <p className="text-gray-600">Your feedback helps us reach more pranksters like you!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
      <h2 className="text-2xl font-['Almarena_Neue'] mb-6 text-center">
        How did you hear about us? 🤔
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sources.map((source) => (
          <button
            key={source.id}
            onClick={() => handleSubmit(source.id)}
            disabled={isSubmitting}
            className="p-4 rounded-xl border-2 border-gray-200 hover:border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="text-2xl mb-2">{source.icon}</div>
            <div className="font-medium">{source.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}