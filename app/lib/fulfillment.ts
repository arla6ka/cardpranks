import { Stripe } from 'stripe';
import { getFormData, deleteFormData } from './formDataService';

function sanitizeText(text: string): string {
  return text
    .replace(/—/g, '-')
    .replace(/'/g, "'")
    .replace(/"/g, '"')
    .replace(/"/g, '"')
    .replace(/…/g, '...')
    .replace(/[^\x20-\x7E\n]/g, '');
}

export async function fulfillCheckout(session: Stripe.Checkout.Session) {
  console.log('Starting fulfillment for session:', {
    id: session.id,
    payment_status: session.payment_status,
    metadata: session.metadata
  });

  try {
    const formDataId = session.metadata?.formDataId;
    
    if (!formDataId) {
      throw new Error('No formDataId found in session metadata');
    }

    // Get form data from MongoDB
    const formData = await getFormData(formDataId);
    console.log('Retrieved form data:', formData);

    if (!formData) {
      throw new Error(`Form data not found for ID: ${formDataId}`);
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

    console.log('Sending request to Handwrite.io:', {
      url: 'https://api.handwrite.io/v1/send',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${process.env.HANDWRITE_API_KEY?.substring(0, 10)}...`,
      },
      body: requestBody,
    });

    const response = await fetch('https://api.handwrite.io/v1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.HANDWRITE_API_KEY!,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Handwrite API error response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: errorText,
      });
      throw new Error(`Handwrite API error: ${errorText}`);
    }

    const responseData = await response.json();
    console.log('Handwrite API success response:', responseData);

    // Clean up stored data after successful API call
    await deleteFormData(formDataId);
    
    console.log('Successfully sent postcard to Handwrite.io');
    return true;
  } catch (error) {
    console.error('Error fulfilling checkout:', error);
    throw error;
  }
} 