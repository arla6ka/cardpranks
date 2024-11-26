// app/api/checkout_sessions/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { storeFormData } from '../../lib/formDataService';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

interface CheckoutSessionData {
  formData: any;
  amount: number;
  currency: string;
  customerId?: string;
}

export async function POST(req: Request) {
  try {
    const { formData, amount, currency, customerId }: CheckoutSessionData = await req.json();

    // Store form data in MongoDB
    const formDataId = await storeFormData(formData);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        formDataId // Store MongoDB document ID
      }
    });

    // Return the client secret as JSON instead of plain text
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Failed to create payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}