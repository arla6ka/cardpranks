import { NextResponse } from 'next/server';

const API_KEY = process.env.HANDWRITE_API_KEY!;

export async function GET() {
  try {
    const response = await fetch('https://api.handwrite.io/v1/handwriting', {
      method: 'GET',
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching handwriting:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}