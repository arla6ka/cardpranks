interface FormData {
  message: string;
  handwriting: { _id: string };
  card: { _id: string };
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
}

declare global {
  var globalTempStore: Map<string, FormData> | undefined;
}

if (typeof global !== 'undefined' && !global.globalTempStore) {
  global.globalTempStore = new Map<string, FormData>();
}

export const tempDataStore = global.globalTempStore || new Map<string, FormData>();