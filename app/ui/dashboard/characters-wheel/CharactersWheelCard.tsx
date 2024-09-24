"use client";
import { useState } from "react";
import Image from "next/image";
import { CharactersWheelCardProps } from "@/app/lib/definitions/dashboard-definitions";

export default function CharactersWheel({
  characterProp,
  setActiveCharacter,
}: CharactersWheelCardProps) {
  const [wheelHovered, setWheelHovered] = useState<boolean>(false);

  return (
    <>
      <Image
        src={"/general/naked_char.png"}
        height={0}
        width={0}
        alt="Naked Character"
        sizes="100vw"
        className="h-[50%] w-auto"
      />
    </>
  );
}
