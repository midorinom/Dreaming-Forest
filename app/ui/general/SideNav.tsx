"use client";
import Image from "next/image";

export default function SideNav() {
  return (
    <div className="row-span-1 col-span-1 row-start-2 col-start-1">
      <div className="relative flex flex-col w-full h-[31vh] items-center justify-around">
        <div className="absolute w-full h-full bg-accent opacity-[.60]"></div>
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