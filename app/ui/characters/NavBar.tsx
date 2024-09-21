"use client";
import { useState } from "react";
import Image from "next/image";
import { NavBarProps } from "@/app/lib/definitions/characters-definitions";

export default function NavBar({currentPage, setCurrentPage}: NavBarProps) {
  const [buttonHovered, setButtonHovered] = useState<boolean>(false);

  return (
    <div className="relative flex h-[7vh] w-full items-center justify-around">
      <div
        className={`absolute h-full w-full bg-accent ${
          buttonHovered ? "opacity-100" : "opacity-[.60]"
        }`}
      ></div>
      <Image
        src="/general/ui_icons/rearrange_icon.png"
        height={0}
        width={0}
        alt="Rearrange Button"
        sizes="100vw"
        className="relative h-[5vh] w-[3vw] hover:cursor-pointer"
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
      />
      <Image
        src="/general/ui_icons/add_character_icon.png"
        height={0}
        width={0}
        alt="Add Character Button"
        sizes="100vw"
        className="relative h-[5vh] w-[3vw] hover:cursor-pointer"
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
      />
      <Image
        src="/general/ui_icons/delete_character_icon.png"
        height={0}
        width={0}
        alt="Delete Character Button"
        sizes="100vw"
        className="relative h-[5vh] w-[3vw] hover:cursor-pointer"
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
      />
    </div>
  );
}
