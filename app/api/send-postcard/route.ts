// app/api/send-postcard/route.ts
import { NextResponse } from 'next/server';

const API_KEY = 'test_hw_d7137b5df0029b8602c2';

export async function POST(req: Request) {
    try {
      const data = await req.json();
      
      const formattedData = {
        message: data.message,
        handwriting: data.handwriting, // Now this should be a real ID
        card: data.card, // Now this should be a real ID
        recipients: [{
          firstName: data.recipient.firstName,
          lastName: data.recipient.lastName,
          company: data.recipient.company || undefined,
          street1: data.recipient.street1,
          street2: data.recipient.street2 || undefined,
          city: data.recipient.city,
          state: data.recipient.state,
          zip: data.recipient.zip
        }],
        from: data.from
      };
  
      const response = await fetch('https://api.handwrite.io/v1/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': API_KEY
        },
        body: JSON.stringify(formattedData)
      });
  
      const result = await response.json();
      return NextResponse.json(result);
    } catch (error) {
      return NextResponse.json({ error: String(error) }, { status: 500 });
    }
  }