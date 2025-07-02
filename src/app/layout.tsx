import type { Metadata } from 'next';
import { inter } from './fonts';
import './globals.css';
import { SessionProvider } from '@/contexts/SessionContext';
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: 'Coaching Simulator',
  description: 'Demo of a design system using Shadcn UI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <SessionProvider>
          {children}
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
