"use client";
import { useState } from "react";
import Image from "next/image";
import { CharactersWheelProps } from "@/app/lib/definitions/dashboard-definitions";
import CharactersWheelCard from "./CharactersWheelCard";

export default function CharactersWheel({
  activeCharacter,
  setActiveCharacter,
  charactersProp,
}: CharactersWheelProps) {
  const [wheelHovered, setWheelHovered] = useState<boolean>(false);

  return (
    <div
      className="relative mx-16 mt-2 flex items-center justify-around"
      onMouseLeave={() => setWheelHovered(false)}
    >
      {wheelHovered ? (
        <>
          <Image
            src={"/general/ui_icons/left_arrow_icon.png"}
            height={0}
            width={0}
            alt="Left Arrow Button"
            sizes="100vw"
            className="h-[40%] w-auto hover:cursor-pointer"
          />
          <div className="grid h-full w-full grid-cols-4 items-center justify-items-center">
            <CharactersWheelCard />
          </div>
          <Image
            src={"/general/ui_icons/right_arrow_icon.png"}
            height={0}
            width={0}
            alt="Right Arrow Button"
            sizes="100vw"
            className="h-[40%] w-auto hover:cursor-pointer"
          />
        </>
      ) : (
        <Image
          src={"/general/ui_icons/switch_characters_icon.png"}
          height={0}
          width={0}
          alt="Switch Characters Button"
          sizes="100vw"
          className="mt-2 h-[40%] w-auto"
          onMouseEnter={() => setWheelHovered(true)}
        />
      )}
    </div>
  );
}
