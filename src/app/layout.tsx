import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/providers/Web3Provider";
import { ToastProvider } from "@/components/ui/Toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PredictX - Web3 Prediction Markets",
  description: "Decentralized prediction market platform powered by blockchain technology. Trade on outcomes, earn rewards.",
  keywords: ["prediction markets", "web3", "crypto", "DeFi", "trading", "blockchain"],
  authors: [{ name: "PredictX" }],
  openGraph: {
    title: "PredictX - Web3 Prediction Markets",
    description: "Decentralized prediction market platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Web3Provider>
          <ToastProvider>
            <Navbar />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </ToastProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
