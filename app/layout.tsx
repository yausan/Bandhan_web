import React from "react";
import "./globals.css";
export const metadata = {
  title: "Bandhan",
  description: "Bandhan – Secure Connection Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-linear-to-br from-indigo-50 via-white to-purple-50 text-gray-900 min-h-screen">
        <header className="bg-indigo-600 text-white px-6 py-4 shadow-lg">
          <h1 className="text-2xl font-bold tracking-wide">Bandhan</h1>
        </header>
        <main className="flex justify-center items-center min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </body>
    </html>
  );
}
