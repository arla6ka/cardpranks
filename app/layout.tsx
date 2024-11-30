import type { Metadata } from "next";
import './globals.css'
import { consolas, almarenaNeue } from './fonts'

export const metadata: Metadata = {
  title: "CardPranks - Anonymous Christmas Cards",
  description: "Send anonymous prank Christmas cards to your friends and family. Create confusion and laughter with handwritten mystery cards!",
  keywords: ["prank cards", "anonymous cards", "christmas pranks", "mystery cards", "handwritten cards"],
  openGraph: {
    title: 'CardPranks - Anonymous Christmas Cards',
    description: 'Create confusion and laughter with handwritten mystery cards! Perfect for holiday pranks.',
    url: 'https://cardpranks.com',
    siteName: 'CardPranks',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CardPranks Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CardPranks - Anonymous Christmas Cards',
    description: 'Create confusion and laughter with handwritten mystery cards! Perfect for holiday pranks.',
    images: ['/og-image.jpg'],
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${consolas.variable} ${almarenaNeue.variable}`}>
      <body>{children}</body>
    </html>
  );
}