import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { tempDataStore } from '../../lib/tempStore';
import type { CheckoutSessionData } from '../../types/stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(req: Request) {
  try {
    const { formData, amount, currency }: CheckoutSessionData = await req.json();

    if (!amount || !currency || typeof amount !== 'number' || typeof currency !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Store form data with the payment intent ID
    tempDataStore.set(paymentIntent.id, formData);

    // Log for debugging
    console.log('Stored form data with ID:', paymentIntent.id);
    console.log('TempDataStore contents:', [...tempDataStore.entries()]);

    // Return the client secret string directly
    return new Response(paymentIntent.client_secret);
  } catch (error) {
    console.error('Failed to create payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}