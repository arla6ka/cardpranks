import type { Metadata } from "next";
import './globals.css'
import { consolas, almarenaNeue } from './fonts'


export const metadata: Metadata = {
  title: "CardPranks - Anonymous Christmas Cards",
  description: "Send anonymous prank Christmas cards to your friends and family",
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
  )
}