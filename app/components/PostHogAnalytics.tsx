'use client';

import posthog from 'posthog-js';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY!;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST!;

export function PostHogAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if we're not in development
    if (process.env.NODE_ENV !== 'development') {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        person_profiles: 'identified_only',
        capture_pageview: false // We'll capture manually
      });
    }
  }, []);

  // Track page views
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      // Track page view
      posthog.capture('$pageview', {
        current_url: window.location.href,
        pathname: pathname,
        search: searchParams.toString(),
      });
    }
  }, [pathname, searchParams]);

  return null;
} 