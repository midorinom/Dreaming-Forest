"use client";
import Image from "next/image";
import { Rouge_Script } from "next/font/google";

const rougeScript = Rouge_Script({ subsets: ["latin"], weight: "400" });

export default function TopNav() {
  return (
    <div className="relative flex w-full h-[6vh] items-center justify-between ">
      <div className="absolute w-full h-full bg-info opacity-[.70]"></div>
      <div className="relative flex items-center gap-2.5 left-3">
        <Image
          src="/general/butterfly_logo.png"
          height={0}
          width={0}
          alt="Butterfly Logo"
          sizes="100vw"
          className="w-[3.5vw] h-[4vh] mb-1"
        />
        <div
          className={`${rougeScript.className} text-primary text-3xl mt-0.5`}
        >
          Dreaming Forest
        </div>
      </div>
      <div className="relative flex gap-3 right-3">
        <Image
          src="/general/profile_icon.png"
          height={0}
          width={0}
          alt="Profile Button"
          sizes="100vw"
          className="w-[3.5vw] h-[4vh]"
        />
        <Image
          src="/general/settings_icon.png"
          height={0}
          width={0}
          alt="Settings Button"
          sizes="100vw"
          className="w-[3.5vw] h-[4vh]"
        />
      </div>
    </div>
  );
}
