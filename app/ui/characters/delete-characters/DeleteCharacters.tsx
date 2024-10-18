"use client";
import { useState, useEffect, ReactElement } from "react";
import { DeleteCharactersProps } from "@/app/lib/definitions/characters-definitions";
import DeleteCharacterCard from "./DeleteCharacterCard";

export default function DeleteCharacters({
  characters,
  setCharacters,
  currentPagePagination,
}: DeleteCharactersProps) {
  const [characterCards, setCharacterCards] = useState<ReactElement[]>([]);

  useEffect(() => {
    if (characters.length > 0) {
      const characterCardsArray: ReactElement[] = [];
      const firstIndex = (currentPagePagination - 1) * 10;
      const lastIndex = Math.min(10 * currentPagePagination, characters.length);

      for (let i = firstIndex; i < lastIndex; i++) {
        characterCardsArray.push(
          <DeleteCharacterCard
            key={characters[i].characterId}
            characterProp={characters[i]}
            characters={characters}
            setCharacters={setCharacters}
          />,
        );
      }

      setCharacterCards(characterCardsArray);
    }
  }, [characters, currentPagePagination]);

  return (
    <div className="grid grid-cols-5 grid-rows-2 items-center justify-items-center gap-y-6">
      {characterCards.length > 0 &&
        characterCards.map((charactersCard) => charactersCard)}
    </div>
  );
}
