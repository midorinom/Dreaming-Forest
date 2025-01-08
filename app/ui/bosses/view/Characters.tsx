"use client";
import { useState } from "react";
import Image from "next/image";
import { CharactersProps } from "@/app/lib/definitions/bosses-definitions";
import { Character } from "@/app/lib/definitions/general-definitions";
import CharacterCard from "./CharacterCard";

export default function Characters({
  characters,
  setCurrentPageCharacters,
  charactersPage,
  setCharactersPage,
}: CharactersProps) {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      className="relative col-start-2 row-span-1 flex items-center justify-around"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <Image
          src={"/general/ui_icons/left_arrow_icon.png"}
          height={0}
          width={0}
          alt="Left Arrow Button"
          sizes="100vw"
          className="absolute left-0 z-10 h-[40%] w-auto hover:cursor-pointer"
          onClick={() => setCharactersPage(charactersPage - 1)}
        />
      )}
      <CharacterCard character={characters[0]} />
      <CharacterCard character={characters[0]} />
      <CharacterCard character={characters[0]} />
      <CharacterCard character={characters[0]} />
      <CharacterCard character={characters[0]} />
      {hovered && (
        <Image
          src={"/general/ui_icons/right_arrow_icon.png"}
          height={0}
          width={0}
          alt="Left Arrow Button"
          sizes="100vw"
          className="absolute right-0 z-10 h-[40%] w-auto hover:cursor-pointer"
          onClick={() => setCharactersPage(charactersPage + 1)}
        />
      )}
    </div>
  );
}
