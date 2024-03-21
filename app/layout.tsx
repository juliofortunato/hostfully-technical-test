import { cn } from "@/lib/utils";
import { HomeIcon } from "lucide-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Booking Manager",
  description: "Manage all your properties booking in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <header className="border-b">
          <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-4 px-4 h-[64px]">
            <div className="flex items-center gap-2">
              <HomeIcon className="h-6 w-6" />
              <h1 className="text-xl font-semibold">Booking Manager</h1>
            </div>
          </div>
        </header>
        <main className="w-full max-w-6xl mx-auto">{children}</main>
        <footer>© {new Date().getFullYear()} - All rights reserved</footer>
      </body>
    </html>
  );
}
