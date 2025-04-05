import type { Metadata } from "next";
import { inter } from "./fonts";
import "./globals.css";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export const metadata: Metadata = {
  title: "Design System Demo",
  description: "Demo of a design system with theme switching using Shadcn UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <header className="border-b py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Design System</h1>
            <ThemeSwitcher />
          </div>
        </header>
        <main className="min-h-screen pb-8">
          {children}
        </main>
      </body>
    </html>
  );
}
