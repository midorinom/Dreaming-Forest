"use client";
import { useState, useEffect, ReactElement } from "react";
import Image from "next/image";
import { CharactersProps } from "@/app/lib/definitions/bosses-definitions";
import CharacterCard from "./CharacterCard";

export default function Characters({
  characters,
  currentPageCharacters,
  charactersPage,
  setCharactersPage,
}: CharactersProps) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [characterCards, setCharacterCards] = useState<ReactElement[]>([]);

  useEffect(() => {
    if (currentPageCharacters.length > 0) {
      const characterCardsArray: ReactElement[] = [];

      for (const character of currentPageCharacters) {
        characterCardsArray.push(
          <CharacterCard key={character.characterId} character={character} />,
        );
      }
      setCharacterCards(characterCardsArray);
    }
  }, [currentPageCharacters]);

  return (
    <div
      className="relative col-span-1 col-start-3 row-span-1 flex items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && charactersPage > 0 && (
        <Image
          src={"/general/ui_icons/left_arrow_icon.png"}
          height={0}
          width={0}
          alt="Left Arrow Button"
          sizes="100vw"
          className="absolute left-0 z-10 h-[45%] w-auto hover:cursor-pointer"
          onClick={() => setCharactersPage(charactersPage - 1)}
        />
      )}
      {characterCards.length > 0 &&
        characterCards.map((charactersCard) => charactersCard)}
      {hovered && charactersPage + 1 < Math.ceil(characters.length / 5) && (
        <Image
          src={"/general/ui_icons/right_arrow_icon.png"}
          height={0}
          width={0}
          alt="Left Arrow Button"
          sizes="100vw"
          className="absolute right-0 z-10 h-[45%] w-auto hover:cursor-pointer"
          onClick={() => setCharactersPage(charactersPage + 1)}
        />
      )}
    </div>
  );
}
