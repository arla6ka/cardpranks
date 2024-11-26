import { NextResponse } from 'next/server';
import Stripe from 'stripe';
interface CheckoutSessionData {
  formData: any;
  amount: number;
  currency: string;
  customerId?: string; // Add this optional property
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

// app/api/checkout_sessions/route.ts
// app/api/checkout_sessions/route.ts
export async function POST(req: Request) {
  try {
    const { formData, amount, currency, customerId }: CheckoutSessionData = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: customerId || undefined, // Make it optional
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        formData: JSON.stringify(formData),
      }
    });

    return new Response(paymentIntent.client_secret);
  } catch (error) {
    console.error('Failed to create payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}