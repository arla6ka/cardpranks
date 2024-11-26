// app/success/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SuccessPage() {
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
          setTimeout(() => router.push('/'), 3000);
        } else {
          setStatus('failed');
        }
      })
      .catch(() => setStatus('failed'));
  }, [payment_intent, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {status === 'loading' && <p>Processing your payment...</p>}
      {status === 'success' && <p>Payment successful! Redirecting...</p>}
      {status === 'failed' && <p>Payment failed. Please try again.</p>}
    </div>
  );
}