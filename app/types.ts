// types.ts
import { ReactNode } from 'react';

// Base Props
interface BaseProps {
 onNext?: () => void;
 onBack?: () => void;
 updateData?: (data: Record<string, unknown>) => void;
 initialData?: Record<string, unknown>;
}

// Button Props
export interface ButtonProps {
 children: ReactNode;
 onClick?: () => void;
 disabled?: boolean;
 className?: string;
}

export interface CreatePostcardButtonProps {
 text: string;
 iconSrc?: string;
 onClick?: () => void;
}

// Section Props
export interface SectionHeaderProps {
 title: string;
 subtitle?: string;
}

export interface FamilyPranksSectionProps extends BaseProps {
 title: string;
 imageUrl: string;
 isVideo?: boolean;
}

// Form Props
export interface FormState {
 firstName: string;
 lastName: string;
 company?: string;
 street1: string;
 street2?: string;
 city: string;
 state: string;
 zip: string;
}

export interface RecipientInfoStepProps extends BaseProps {
 initialData?: FormState;
}

export interface ReturnAddressStepProps extends BaseProps {
 initialData?: FormState;
}

// Design & Handwriting Props
export interface Design {
 _id: string;
 name: string;
 preview_url: string;
}

export interface HandwritingStyle {
 _id: string;
 name: string;
 preview_url: string;
}

export interface DesignStepProps extends BaseProps {
 initialData?: string;
}

export interface HandwritingStepProps extends BaseProps {
 initialData?: string;
}

// Message Props
export interface MessageStepProps extends BaseProps {
 initialData?: string;
 handleSubmit: () => Promise<void>;
}

// FAQ Props
export interface FAQItemProps {
 question: string;
 answer: string;
}

export interface StepItemProps {
 number: string;
 title: string;
 description: string;
}

// API Response Types
export interface APIError {
 message: string;
 code?: string;
}

export interface APIResponse<T> {
 data?: T;
 error?: APIError;
}

// Handwrite.io API Types
export interface HandwriteRecipient {
 firstName: string;
 lastName: string;
 company?: string;
 street1: string;
 street2?: string;
 city: string;
 state: string;
 zip: string;
}

export interface HandwriteRequest {
 message: string;
 handwriting: string;
 card: string;
 recipients: HandwriteRecipient[];
 from?: HandwriteRecipient;
}

export interface HandwriteResponse {
 _id: string;
 status: 'processing' | 'written' | 'complete' | 'problem' | 'cancelled';
 createdAt: string;
}

// FAQ Data
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