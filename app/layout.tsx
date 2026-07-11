import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "V.K. Medical Center | Gastroenterology & Neurosurgery",
    template: "%s | V.K. Medical Center",
  },
  description: "Super-specialty Gastroenterology and Neurosurgery consultations by KGMU and AIIMS Delhi alum specialists in Akbarpur, Ambedkar Nagar. +91 9450987101, +91 9839454508.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] antialiased`}>
        {children}
      </body>
    </html>
  );
}
