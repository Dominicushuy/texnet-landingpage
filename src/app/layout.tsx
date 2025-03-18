// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
});

const openSans = Open_Sans({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "B2B Fashion Landing Page",
  description: "Giải pháp May mặc & Giặt là Công nghiệp Hàng đầu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${inter.variable} ${openSans.variable}`}>
      <body className="min-h-screen bg-background" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
