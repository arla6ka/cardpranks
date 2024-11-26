// app/api/webhook/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { getFormData, deleteFormData } from '../../lib/formDataService';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

function sanitizeText(text: string): string {
  return text
    .replace(/—/g, '-')
    .replace(/'/g, "'")
    .replace(/"/g, '"')
    .replace(/"/g, '"')
    .replace(/…/g, '...')
    .replace(/[^\x20-\x7E\n]/g, '');
}

export async function POST(req: Request) {
  const payload = await req.text();
  const headerList = await headers();
  const sig = headerList.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'No signature found' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    
    try {
      // Get form data from MongoDB using the ID from metadata
      const formData = await getFormData(paymentIntent.metadata.formDataId);

      if (!formData) {
        throw new Error(`Form data not found for ID: ${paymentIntent.metadata.formDataId}`);
      }

      const requestBody = {
        message: sanitizeText(formData.message),
        handwriting: formData.handwriting._id,
        card: formData.card._id,
        recipients: [{
          firstName: sanitizeText(formData.recipient.firstName),
          lastName: sanitizeText(formData.recipient.lastName),
          company: formData.recipient.company ? sanitizeText(formData.recipient.company) : undefined,
          street1: sanitizeText(formData.recipient.street1),
          street2: formData.recipient.street2 ? sanitizeText(formData.recipient.street2) : undefined,
          city: sanitizeText(formData.recipient.city),
          state: sanitizeText(formData.recipient.state),
          zip: formData.recipient.zip,
        }],
        from: formData.from ? {
          firstName: sanitizeText(formData.from.firstName),
          lastName: sanitizeText(formData.from.lastName),
          street1: sanitizeText(formData.from.street1),
          street2: formData.from.street2 ? sanitizeText(formData.from.street2) : undefined,
          city: sanitizeText(formData.from.city),
          state: sanitizeText(formData.from.state),
          zip: formData.from.zip,
        } : undefined,
      };

      const response = await fetch('https://api.handwrite.io/v1/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': process.env.HANDWRITE_API_KEY || '',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Handwrite API error: ${await response.text()}`);
      }

      // Clean up stored data after successful API call
      await deleteFormData(paymentIntent.metadata.formDataId);
      return NextResponse.json({ success: true });

    } catch (error) {
      console.error('Error processing payment:', error);
      return NextResponse.json(
        { error: 'Failed to process payment' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}