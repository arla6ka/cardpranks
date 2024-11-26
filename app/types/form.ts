// app/types/form.ts
export interface FormData {
    recipient: {
      firstName: string;
      lastName: string;
      company?: string;
      street1: string;
      street2?: string;
      city: string;
      state: string;
      zip: string;
    };
    from?: {
      firstName: string;
      lastName: string;
      street1: string;
      street2?: string;
      city: string;
      state: string;
      zip: string;
    };
    message: string;
    handwriting: { _id: string } | null;
    card: { _id: string } | null;
  }