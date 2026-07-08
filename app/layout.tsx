import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "St. Marina General",
    template: "%s | St. Marina General",
  },
  description: "Modern healthcare portal built from Stitch screens.",
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
