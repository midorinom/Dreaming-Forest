import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./ui/globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "TFT Senpai",
  description: "Teamfight Tactics app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="pastel">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
