"use client";
import { useState } from "react";
import Image from "next/image";
import { CharactersWheelCardProps } from "@/app/lib/definitions/dashboard-definitions";

export default function CharactersWheel({
  characterProp,
  setActiveCharacter,
}: CharactersWheelCardProps) {
  const [characterHovered, setCharacterHovered] = useState<boolean>(false);

  return (
    <>
      <Image
        src={
          characterProp.image ? characterProp.image : "/general/naked_char.png"
        }
        height={0}
        width={0}
        alt="Naked Character"
        sizes="100vw"
        className={`h-${characterHovered ? "4/5" : "3/5"} w-auto hover:cursor-pointer`}
        onMouseEnter={() => setCharacterHovered(true)}
        onMouseLeave={() => setCharacterHovered(false)}
        onClick={() => setActiveCharacter(characterProp)}
      />
    </>
  );
}
