"use client";
import Image from "next/image";
import { Rouge_Script } from "next/font/google";

const rougeScript = Rouge_Script({ subsets: ["latin"], weight: "400" });

export default function TopNav() {
  return (
    <div className="relative flex w-full h-[6vh] items-center">
      <div className="absolute w-full h-full bg-info opacity-[.70]"></div>
      <div className="relative w-full h-full flex items-center gap-2">
        <Image
          src="/general/butterfly_logo.png"
          height={0}
          width={0}
          alt="Butterfly Logo"
          sizes="100vw"
          className="w-[3.5vw] h-[4vh] ml-3 mb-1.5"
        />
        <div className={`${rougeScript.className} text-primary text-3xl`}>
          Dreaming Forest
        </div>
      </div>
    </div>
  );
}
