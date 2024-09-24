"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CharactersWheelProps } from "@/app/lib/definitions/dashboard-definitions";

export default function CharactersWheel({
  activeCharacter,
  setActiveCharacter,
}: CharactersWheelProps) {
  const [wheelHovered, setWheelHovered] = useState<boolean>(false);

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseLeave={() => setWheelHovered(false)}
    >
      {wheelHovered ? (
        <div>Test</div>
      ) : (
        <Image
          src={"/general/ui_icons/switch_characters_icon.png"}
          height={0}
          width={0}
          alt="Active Character"
          sizes="100vw"
          className="absolute mt-2 h-[40%] w-auto hover:cursor-pointer"
          onMouseEnter={() => setWheelHovered(true)}
        />
      )}
    </div>
  );
}
