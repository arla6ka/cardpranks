// app/types/stripe.d.ts
import { Stripe } from 'stripe';

declare global {
  var tempDataStore: Map<string, any>;
}

export interface CheckoutSessionData {
  formData: any;
  amount: number;
  currency: string;
}

export type StripeCheckoutSession = Stripe.Checkout.Session;