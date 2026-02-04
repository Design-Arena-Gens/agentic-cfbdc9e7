import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Agentic Solver",
  description: "Interactive walkthroughs that solve challenging questions with clarity.",
  metadataBase: new URL("https://agentic-cfbdc9e7.vercel.app")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-950">
      <body className={`${inter.className} min-h-screen antialiased`}>{children}</body>
    </html>
  );
}
