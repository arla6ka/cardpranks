// app/api/checkout_sessions/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { tempDataStore } from '../../lib/tempStore';

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

    // Generate a unique ID for the form data
    const formDataId = `form_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Store the form data first
    tempDataStore.set(formDataId, formData);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        formDataId // Store our generated ID
      }
    });

    console.log('Stored form data with ID:', formDataId);
    console.log('TempDataStore contents:', [...tempDataStore.entries()]);

    return new Response(paymentIntent.client_secret);
  } catch (error) {
    console.error('Failed to create payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}