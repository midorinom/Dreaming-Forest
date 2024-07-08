"use client";
import Image from "next/image";

export default function SideNav() {
  return (
    <div className="w-[4vw] h-[94vh]">
      <div className="relative flex flex-col w-full h-[31vh] gap-5 items-center justify-center">
        <div className="absolute w-full h-full bg-accent opacity-[.70]"></div>
        <Image
          src="/general/characters_icon.png"
          height={0}
          width={0}
          alt="Characters Button"
          sizes="100vw"
          className="relative w-[3vw] h-[5vh]"
        />
        <Image
          src="/general/dailies_icon.png"
          height={0}
          width={0}
          alt="Dailies Button"
          sizes="100vw"
          className="relative w-[3vw] h-[5vh]"
        />
        <Image
          src="/general/bosses_icon.png"
          height={0}
          width={0}
          alt="Bosses Button"
          sizes="100vw"
          className="relative w-[3vw] h-[5vh]"
        />
        <Image
          src="/general/progression_icon.png"
          height={0}
          width={0}
          alt="Progression Button"
          sizes="100vw"
          className="relative w-[3vw] h-[5vh]"
        />
      </div>
    </div>
  );
}
