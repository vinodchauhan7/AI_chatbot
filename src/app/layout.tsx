import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs"; 
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI- Chatbot",
  description: "A AI inspired chatbot for business owners to run their business smoothly with email marketing and campaigns' leads.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster />  
        </body>
      </html>
    </ClerkProvider>
  );
}
