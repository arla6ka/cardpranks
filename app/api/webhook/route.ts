// app/api/webhook/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { fulfillCheckout } from '../../lib/fulfillment';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

// This is your Stripe webhook secret for testing your endpoint locally
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const sig = headersList.get('stripe-signature');

    if (!sig || !endpointSecret) {
      console.error('Missing stripe signature or endpoint secret');
      // Return 200 even for validation errors
      return NextResponse.json(
        { error: 'Missing stripe signature or endpoint secret' },
        { status: 200 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
      console.log('Webhook event type:', event.type);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      // Return 200 for invalid signatures
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 200 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Processing completed session:', session.id);
        
        if (session.payment_status === 'paid') {
          try {
            await fulfillCheckout(session);
            console.log('Fulfillment completed for session:', session.id);
          } catch (fulfillError) {
            console.error('Fulfillment error:', fulfillError);
            // Still return 200 but log the error
          }
        } else {
          console.log('Session not paid yet:', session.payment_status);
        }
        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment succeeded:', paymentIntent.id);
        // Add any additional payment intent handling here
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Always return a 200 response to acknowledge receipt
    return NextResponse.json(
      { 
        received: true,
        type: event.type,
        id: event.id 
      }, 
      { status: 200 }
    );

  } catch (err) {
    console.error('Error processing webhook:', err);
    // Return 200 even for processing errors
    return NextResponse.json(
      { received: true, error: 'Webhook processed with errors' },
      { status: 200 }
    );
  }
}

// Needed for Stripe webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};