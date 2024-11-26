import { NextResponse } from 'next/server';

const API_KEY = process.env.HANDWRITE_API_KEY!;

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const formattedData = {
      message: data.message,
      handwriting: data.handwriting, // Real handwriting ID
      card: data.card, // Real card ID
      recipients: [
        {
          firstName: data.recipient.firstName,
          lastName: data.recipient.lastName,
          company: data.recipient.company || undefined,
          street1: data.recipient.street1,
          street2: data.recipient.street2 || undefined,
          city: data.recipient.city,
          state: data.recipient.state,
          zip: data.recipient.zip,
        },
      ],
      from: data.from,
    };

    const response = await fetch('https://api.handwrite.io/v1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send postcard: ${errorText}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error sending postcard:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
