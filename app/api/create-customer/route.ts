// app/api/create-customer/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(req: Request) {
  try {
    const { email, phone } = await req.json();

    // First, try to find an existing customer with this email
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    let customer;

    if (existingCustomers.data.length > 0) {
      // Update existing customer
      customer = await stripe.customers.update(
        existingCustomers.data[0].id,
        {
          phone: phone,
        }
      );
    } else {
      // Create new customer
      customer = await stripe.customers.create({
        email: email,
        phone: phone,
      });
    }

    return NextResponse.json({ customerId: customer.id });
  } catch (error) {
    console.error('Error creating/retrieving customer:', error);
    return NextResponse.json(
      { error: 'Failed to create/retrieve customer' },
      { status: 500 }
    );
  }
}