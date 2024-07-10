import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "@/app/ui/globals.css";

export const metadata: Metadata = {
  title: "Dreaming Forest",
  description: "Maplestory App",
};
const outfit = Outfit({ subsets: ["latin"], weight: "400" });

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
