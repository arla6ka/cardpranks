// app/api/webhook/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { tempDataStore } from '../../lib/tempStore';

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

// app/api/webhook/route.ts (relevant part)
if (event.type === 'payment_intent.succeeded') {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  
  // Get form data from tempStore using formDataId from metadata
  const formDataId = paymentIntent.metadata.formDataId;
  const formData = tempDataStore.get(formDataId);

  if (!formData) {
    console.error('Form data not found for ID:', formDataId);
    console.error('Available keys:', [...tempDataStore.keys()]);
    return NextResponse.json(
      { error: `Form data not found for ID: ${formDataId}` },
      { status: 400 }
    );
  }

  // ... rest of the webhook handler remains the same

    try {
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

      console.log('Sending to Handwrite:', JSON.stringify(requestBody, null, 2));

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
      tempDataStore.delete(paymentIntent.id);
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error sending to Handwrite:', error);
      return NextResponse.json(
        { error: 'Failed to send order to Handwrite.io' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}