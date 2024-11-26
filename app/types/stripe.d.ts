// app/types/stripe.d.ts
import { Stripe } from 'stripe';

declare global {
  let tempDataStore: Map<string, any>; // Changed from var to let
}

export interface CheckoutSessionData {
  formData: any;
  amount: number;
  currency: string;
}

export type StripeCheckoutSession = Stripe.Checkout.Session;