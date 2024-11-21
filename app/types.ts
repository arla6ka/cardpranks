import { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export interface CreatePostcardButtonProps {
  text: string;
  iconSrc?: string;
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export interface FAQItemProps {
  question: string;
  answer: string;
}

export interface StepItemProps {
  number: string;
  title: string;
  description: string;
}

export interface FamilyPranksSectionProps {
  title: string;
  imageUrl: string;
  isVideo?: boolean;
}

export interface FormState {
  [key: string]: unknown; // Added index signature
  firstName: string;
  lastName: string;
  company?: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
}

export interface BaseProps {
  id?: string;
  className?: string;
}

export interface RecipientInfoStepProps extends BaseProps {
  initialData?: FormState;
}

// Add FAQ data
export const faqItems: FAQItemProps[] = [
  {
    question: "Will they know it's from me?",
    answer: "Only if you include your name! Otherwise, we keep your identity a secret.",
  },
  {
    question: "Can I schedule the delivery?",
    answer: "Yes! You can select a future date for the perfect holiday surprise.",
  },
  {
    question: "How long does delivery take?",
    answer: "We ship fast—usually within X days of your order.",
  },
  {
    question: "Do you only offer Christmas postcards?",
    answer: "Yes! We specialize in holiday pranks to keep the season festive and fun.",
  },
];
