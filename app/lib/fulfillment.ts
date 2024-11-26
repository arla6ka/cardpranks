// app/lib/fulfillment.ts
import type { StripeCheckoutSession } from '../types/stripe';

export async function fulfillCheckout(session: StripeCheckoutSession, formData: any) {
  try {
    const requestBody = {
      message: formData.message,
      handwriting: formData.handwriting._id,
      card: formData.card._id,
      recipients: [
        {
          firstName: formData.recipient.firstName,
          lastName: formData.recipient.lastName,
          company: formData.recipient.company || '',
          street1: formData.recipient.street1,
          street2: formData.recipient.street2 || '',
          city: formData.recipient.city,
          state: formData.recipient.state,
          zip: formData.recipient.zip,
        },
      ],
      from: formData.from,
    };

    const response = await fetch('https://api.handwrite.io/v1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.HANDWRITE_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Failed to send postcard: ${await response.text()}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error in fulfillment:', error);
    throw error;
  }
}