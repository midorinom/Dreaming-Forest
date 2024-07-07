import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./ui/globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Dreaming Forest",
  description: "Maplestory App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
