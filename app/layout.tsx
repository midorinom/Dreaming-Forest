import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "@/app/ui/globals.css";
import TopNav from "@/app/ui/general/TopNav";
import SideNav from "@/app/ui/general/SideNav";

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
      <body
        className={`${outfit.className} grid grid-rows-[6vh_94vh] grid-cols-[4vw_1fr] bg-lucid_background bg-cover bg-center w-screen h-screen`}
        data-theme="dreamy"
      >
        <TopNav />
        <SideNav />
        {children}
      </body>
    </html>
  );
}
