import type { Metadata } from 'next';
import { inter } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Design System Demo',
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
        {children}
      </body>
    </html>
  );
}
