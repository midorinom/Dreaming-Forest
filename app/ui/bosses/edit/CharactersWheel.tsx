"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CharactersWheelProps } from "@/app/lib/definitions/dashboard-definitions";
import { Character } from "@/app/lib/definitions/general-definitions";
import CharactersWheelCard from "./CharactersWheelCard";

export default function CharactersWheel({
  activeCharacter,
  setActiveCharacter,
  charactersProp,
}: CharactersWheelProps) {
  const [wheelHovered, setWheelHovered] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    if (charactersProp) {
      const charactersWithoutActiveChar = charactersProp.filter(
        (character) => character.characterId !== activeCharacter.characterId,
      );
      setCharacters(charactersWithoutActiveChar);
    }
  }, [activeCharacter]);

  return (
    <div
      className="relative flex h-full w-2/3 items-center justify-around"
      onMouseLeave={() => setWheelHovered(false)}
    >
      {characters.length >= 1 && wheelHovered ? (
        <>
          {currentPage !== 0 && (
            <Image
              src={"/general/ui_icons/left_arrow_icon.png"}
              height={0}
              width={0}
              alt="Left Arrow Button"
              sizes="100vw"
              className="mb-1 h-[40%] w-auto hover:cursor-pointer"
              onClick={() => setCurrentPage(currentPage - 1)}
            />
          )}
          <div className="grid h-full w-full grid-cols-4 items-center justify-items-center">
            {characters &&
              characters.map((character, index) => {
                if (Math.trunc(index / 4) === currentPage)
                  return (
                    <CharactersWheelCard
                      key={character.characterId}
                      characterProp={character}
                      setActiveCharacter={setActiveCharacter}
                    />
                  );
              })}
          </div>
          {currentPage < Math.trunc((characters.length - 1) / 4) && (
            <Image
              src={"/general/ui_icons/right_arrow_icon.png"}
              height={0}
              width={0}
              alt="Right Arrow Button"
              sizes="100vw"
              className="mb-1 h-[40%] w-auto hover:cursor-pointer"
              onClick={() => setCurrentPage(currentPage + 1)}
            />
          )}
        </>
      ) : (
        characters.length >= 1 && (
          <Image
            src={"/general/ui_icons/switch_characters_icon.png"}
            height={0}
            width={0}
            alt="Switch Characters Button"
            sizes="100vw"
            className="mb-1 h-3/5 w-auto"
            onMouseEnter={() => setWheelHovered(true)}
          />
        )
      )}
    </div>
  );
}
