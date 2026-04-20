import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GROVE — Shop with intention",
  description: "Curated goods for people with taste.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-[#0f0f0f] font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}
