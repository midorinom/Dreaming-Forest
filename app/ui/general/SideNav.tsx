"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SideNav() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const router = useRouter();

  function handleClick(url: string) {
    router.replace(url);
  }

  return (
    <div className="row-span-1 col-span-1 row-start-2 col-start-1">
      <div
        className="relative flex flex-col w-full h-[31vh] items-center justify-around"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`absolute w-full h-full bg-accent ${
            isHovered ? "opacity-100" : "opacity-[.60]"
          }`}
        ></div>
        <Image
          src="/general/characters_icon.png"
          height={0}
          width={0}
          alt="Characters Button"
          sizes="100vw"
          className="relative w-[3vw] h-[5vh] hover:cursor-pointer"
          onClick={() => handleClick("/characters")}
        />
        <Image
          src="/general/dailies_icon.png"
          height={0}
          width={0}
          alt="Dailies Button"
          sizes="100vw"
          className="relative w-[3vw] h-[5vh] hover:cursor-pointer"
          onClick={() => handleClick("/dailies-weeklies")}
        />
        <Image
          src="/general/bosses_icon.png"
          height={0}
          width={0}
          alt="Bosses Button"
          sizes="100vw"
          className="relative w-[3vw] h-[5vh] hover:cursor-pointer"
          onClick={() => handleClick("/bosses")}
        />
        <Image
          src="/general/progression_icon.png"
          height={0}
          width={0}
          alt="Progression Button"
          sizes="100vw"
          className="relative w-[3vw] h-[5vh] hover:cursor-pointer"
          onClick={() => handleClick("/progression")}
        />
      </div>
    </div>
  );
}
