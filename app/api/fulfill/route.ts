import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { fulfillCheckout } from '../../lib/fulfillment';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === 'paid') {
      await fulfillCheckout(session);
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ status: 'pending' });
  } catch (error) {
    console.error('Fulfillment error:', error);
    return NextResponse.json({ error: 'Fulfillment failed' }, { status: 500 });
  }
} 