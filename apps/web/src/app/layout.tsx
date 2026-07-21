import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cashipro - Crypto Exchange",
  description: "Professional Cryptocurrency Trading Platform",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#050505] text-white">
        {children}
      </body>
    </html>
  );
}
