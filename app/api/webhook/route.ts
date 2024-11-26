import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { tempDataStore } from '../../lib/tempStore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

function sanitizeText(text: string): string {
  return text
    .replace(/—/g, '-') // Replace em dashes with regular dashes
    .replace(/'/g, "'") // Replace smart quotes with regular quotes
    .replace(/"/g, '"')
    .replace(/"/g, '"')
    .replace(/…/g, '...') // Replace ellipsis with dots
    .replace(/[^\x20-\x7E\n]/g, ''); // Remove any non-ASCII characters except newlines
}

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const formDataId = paymentIntent.metadata.formDataId;
    const formData = tempDataStore.get(formDataId);

    if (formData) {
      try {
        // Prepare the request body with sanitized text
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

        const responseText = await response.text();
        console.log('Handwrite API Response:', responseText);

        if (!response.ok) {
          throw new Error(`Failed to send postcard: ${responseText}`);
        }

        tempDataStore.delete(formDataId);
        return NextResponse.json({ success: true });
      } catch (error) {
        console.error('Error sending postcard:', error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
      }
    } else {
      console.error('Form data not found for ID:', formDataId);
      return NextResponse.json({ error: 'Form data not found' }, { status: 400 });
    }
  }

  return NextResponse.json({ received: true });
}