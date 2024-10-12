"use client";
import { useState, useEffect, ReactElement } from "react";
import type { ViewCharactersProps } from "@/app/lib/definitions/characters-definitions";
import CharacterCard from "./CharacterCard";

export default function ViewCharacters({
  characters,
  currentPagePagination,
}: ViewCharactersProps) {
  const [characterCards, setCharacterCards] = useState<ReactElement[]>([]);

  useEffect(() => {
    if (characters.length > 0) {
      const characterCardsArray: ReactElement[] = [];
      const firstIndex = (currentPagePagination - 1) * 4;
      const lastIndex = Math.min(4 * currentPagePagination, characters.length);

      for (let i = firstIndex; i < lastIndex; i++) {
        characterCardsArray.push(
          <CharacterCard
            key={characters[i].characterId}
            characterProp={characters[i]}
          />,
        );
      }

      setCharacterCards(characterCardsArray);
    }
  }, [characters, currentPagePagination]);

  return (
    <div className="grid grid-cols-2 grid-rows-2 items-center justify-items-center gap-y-6">
      {characterCards.length > 0 &&
        characterCards.map((charactersCard) => charactersCard)}
    </div>
  );
}
