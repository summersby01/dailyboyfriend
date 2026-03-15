import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daily Boyfriend",
  description: "Press START to meet your boyfriend of the day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
