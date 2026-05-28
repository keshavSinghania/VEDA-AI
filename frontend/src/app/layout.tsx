import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/Sidebar";
import { Bricolage_Grotesque } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VedaAI",
  description: "VedaAI Teacher Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`${bricolage.className} min-h-screen bg-gray-50`}
      >
        <div className="flex min-h-screen">

          {/* SIDEBAR */}
          <Sidebar />

          {/* MAIN CONTENT */}
          <main className="flex-1 overflow-auto p-4 lg:p-6">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}