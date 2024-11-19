// types.ts
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

// Add FAQ data
export const faqItems: FAQItemProps[] = [
 {
   question: "Will they know it's from me?",
   answer: "Only if you include your name! Otherwise, we keep your identity a secret."
 },
 {
   question: "Can I schedule the delivery?",
   answer: "Yes! You can select a future date for the perfect holiday surprise."
 },
 {
   question: "How long does delivery take?",
   answer: "We ship fast—usually within X days of your order."
 },
 {
   question: "Do you only offer Christmas postcards?",
   answer: "Yes! We specialize in holiday pranks to keep the season festive and fun."
 }
];