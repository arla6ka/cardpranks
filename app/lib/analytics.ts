import posthog from 'posthog-js';

export const captureEvent = (eventName: string, properties?: Record<string, any>) => {
  if (process.env.NODE_ENV !== 'development') {
    posthog.capture(eventName, properties);
  }
};

export const identify = (distinctId: string, properties?: Record<string, any>) => {
  if (process.env.NODE_ENV !== 'development') {
    posthog.identify(distinctId, properties);
  }
}; 