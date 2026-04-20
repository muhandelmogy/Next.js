import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ME Store",
  description: "Your favorite online store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* BUG FIX: was bg-white text-neutral-950 — clashed with dark pages (404, 500) */}
      <body className="flex min-h-screen flex-col bg-neutral-950 font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}
